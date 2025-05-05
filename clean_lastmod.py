import os
import re
import yaml
from pathlib import Path
from datetime import datetime

def process_files(content_dir):
    """处理博客内容目录中的所有Markdown文件，清理lastmod字段。"""
    print(f"开始扫描目录: {content_dir}")
    content_path = Path(content_dir)
    
    if not content_path.exists():
        print(f"错误: 目录不存在 - {content_dir}")
        return
        
    # 计数器
    total_files = 0
    modified_files = 0
    
    # 遍历所有markdown文件
    for md_file in content_path.glob('**/*.md'):
        # 跳过模板文件
        if 'Templates' in str(md_file) and not 'post_template.md' in str(md_file):
            continue
            
        total_files += 1
        print(f"处理文件 [{total_files}]: {md_file}")
        if clean_lastmod(md_file):
            modified_files += 1
    
    print(f"总计处理文件: {total_files}，修改文件: {modified_files}")

def clean_lastmod(file_path):
    """清理文件中的lastmod字段，如果修改返回True"""
    modified = False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  读取文件出错: {e}")
        return False
    
    # 检查文件是否有元数据块
    metadata_pattern = r'^---\s*\n(.*?)\n---\s*\n'
    metadata_match = re.search(metadata_pattern, content, re.DOTALL)
    
    if metadata_match:
        try:
            metadata_text = metadata_match.group(1)
            metadata = yaml.safe_load(metadata_text)
            
            if metadata is None:
                metadata = {}
            
            # 检查是否有lastmod字段并处理
            if 'lastmod' in metadata:
                lastmod_value = metadata['lastmod']
                
                # 对于字符串类型的日期，转换为简单格式
                if isinstance(lastmod_value, str):
                    try:
                        # 尝试解析常见日期格式
                        if 'T' in lastmod_value:  # ISO格式
                            dt = datetime.fromisoformat(lastmod_value.replace('Z', '+00:00'))
                            metadata['lastmod'] = dt.strftime('%Y-%m-%d')
                            modified = True
                    except:
                        # 如果解析失败，直接移除
                        del metadata['lastmod']
                        modified = True
                        print(f"  无法解析lastmod字段，已移除: {lastmod_value}")
                
                # 对于datetime对象，转换为简单格式
                elif isinstance(lastmod_value, datetime):
                    metadata['lastmod'] = lastmod_value.strftime('%Y-%m-%d')
                    modified = True
                    
                # 完全删除lastmod字段
                del metadata['lastmod']
                modified = True
                print(f"  已删除lastmod字段")
                
                # 生成新的元数据文本并替换
                if modified:
                    new_metadata_text = yaml.dump(metadata, allow_unicode=True, sort_keys=False)
                    new_content = f"---\n{new_metadata_text}---\n" + content[metadata_match.end():]
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"  已更新文件元数据")
            else:
                print(f"  没有lastmod字段，无需修改")
                
        except yaml.YAMLError as e:
            print(f"  YAML解析错误: {e}")
    else:
        print(f"  没有找到元数据块，无需修改")
    
    return modified

if __name__ == "__main__":
    # 在Cloudflare Pages上，脚本和内容位于同一目录
    # 当前脚本目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # 博客内容目录
    content_dir = os.path.join(script_dir, "content", "posts")
    print(f"脚本目录: {script_dir}")
    print(f"内容目录: {content_dir}")
    process_files(content_dir)
    print("lastmod清理完成!") 