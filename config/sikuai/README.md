# Sikuai 自定义Hugo配置

这个目录包含四块博客的自定义配置环境。

## 如何使用这个配置

### 本地开发

在本地开发时，使用以下命令指定使用这个配置：

```bash
cd blog
hugo server --environment sikuai
```

### 构建网站

构建网站时使用：

```bash
cd blog
hugo --environment sikuai
```

### GitHub Actions 或 Cloudflare Pages

在CI/CD环境中，可以设置环境变量：

```yaml
# GitHub Action 示例
- name: Build
  run: hugo --environment sikuai
  env:
    HUGO_ENVIRONMENT: sikuai
```

```toml
# Cloudflare Pages 配置示例
[build]
  command = "hugo --environment sikuai"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.110.0" 
  HUGO_ENVIRONMENT = "sikuai"
```

## 配置特点

这个配置环境具有以下特点：

1. 使用YAML格式单文件配置，更清晰易读
2. 包含完整的注释说明，便于维护
3. 可与默认配置共存，不会互相干扰

## 环境配置优先级说明

Hugo配置优先级从高到低：

1. 命令行标志
2. 环境变量
3. 当前环境配置 (`config/sikuai/`)
4. 默认配置 (`config/_default/`)

这意味着`sikuai`环境中的配置会覆盖`_default`中的同名配置，但不会替换没有定义的配置。 