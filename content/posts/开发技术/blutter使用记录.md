---
title: blutter使用记录
date: 2025-02-08
categories:
  - 开发技术
tags:
  - blog
  - 开发技术
lastmod: 2025-05-06T00:30:04.505Z
---
# 1. ubuntu20环境安装(失败，直接跳debian部分)

* win10子系统Ubuntu20.04

## 1.1. 安装GCC 13或Clang 16

```bash
# 1. 更新系统并安装基础编译工具
sudo apt update
sudo apt upgrade -y
sudo apt install -y build-essential software-properties-common

# 2. 安装 GCC 13（推荐方式）
sudo add-apt-repository -y ppa:ubuntu-toolchain-r/test
sudo apt update
sudo apt install -y gcc-13 g++-13

# 配置 GCC 13 为默认编译器
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-13 90 \
                         --slave /usr/bin/g++ g++ /usr/bin/g++-13 \
                         --slave /usr/bin/gcov gcov /usr/bin/gcov-13

# 或者选择安装 Clang 16（二选一）
# 先安装 LLVM 仓库的 GPG 密钥
wget -qO- https://apt.llvm.org/llvm.sh | sudo bash -s 16

# 安装 Clang 16 组件
sudo apt install -y clang-16 lldb-16 lld-16 clangd-16 libc++-16-dev

# 配置 Clang 16 为默认编译器
sudo update-alternatives --install /usr/bin/clang clang /usr/bin/clang-16 90 \
                         --slave /usr/bin/clang++ clang++ /usr/bin/clang++-16

# 3. 验证编译器版本（任选一个）
g++ --version  # 应该显示 13.x.x
# 或
clang++ --version  # 应该显示 16.x.x

# 4. 安装其他构建工具
sudo apt install -y cmake ninja-build

# 5. 测试 C++20 编译（可选）
echo '#include <format>
#include <iostream>
int main() {
    std::cout << std::format("Hello {}!", "C++20");
}' > test.cpp

# 编译测试（GCC）
g++ -std=c++20 test.cpp -o test_gcc
# 或（Clang）
clang++ -std=c++20 -stdlib=libc++ test.cpp -o test_clang

# 运行测试
./test_gcc || ./test_clang

```

**验证上述版本**\
`g++ --version` 或 `clang++ --version`

## 1.2. 安装python3.10

由于默认使用的python版本是python3.8，不升级使用blutter会报错（如下）

```
Traceback (most recent call last):
  File "blutter/blutter.py", line 12, in <module>
    from dartvm_fetch_build import DartLibInfo
  File "/home/sikuai/blutter/dartvm_fetch_build.py", line 34, in <module>
    class DartLibInfo:
  File "/home/sikuai/blutter/dartvm_fetch_build.py", line 35, in DartLibInfo
    def __init__(self, version: str, os_name: str, arch: str, has_compressed_ptrs: bool | None = None, snapshot_hash: str | None = None):
TypeError: unsupported operand type(s) for |: 'type' and 'NoneType'
```

**安装python3.10**

```bash
# 检查 Python 版本
python3 --version

# 如果版本 < 3.10，需升级（Ubuntu 20.04 默认 Python 3.8）
# 添加 deadsnakes PPA 安装 Python 3.10
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.10

# 创建虚拟环境（推荐）
python3.10 -m venv myenv
source myenv/bin/activate
```

**验证python版本**\
`python3.10 -V`

## 1.3. 更新git版本（github网络问题）

```
root@DESKTOP-C6PKJ30:/home/sikuai# python3.10 blutter/blutter.py arm64-v8a/  out/
Dart version: 3.4.4, Snapshot: d20a1be77c3d3c41b2a5accaee1ce549, Target: android arm64
flags: product no-code_comments dwarf_stack_traces_mode no-lazy_dispatchers dedup_instructions no-tsan no-asserts arm64 android compressed-pointers null-safety
Cloning into '/home/sikuai/blutter/dartsdk/v3.4.4'...
fatal: cannot change to 'https://github.com/dart-lang/sdk.git': No such file or directory
error: failed to initialize sparse-checkout
```

**解决办法：watt或者fastgithub等代理加速**

## 1.4. 更新cmake版本

```
CMake Error at CMakeLists.txt:3 (cmake_minimum_required): CMake 3.20 or higher is required. You are running version 3.16.3
```

```bash
# 验证版本
cmake --version  # 输出应显示 3.16.3

# 卸载旧版
sudo apt remove --purge cmake -y
sudo apt autoremove -y

# 通过 Kitware 官方仓库安装新版 CMake
# 添加 Kitware 签名密钥
wget -qO- https://apt.kitware.com/keys/kitware-archive-latest.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/kitware.gpg

# 添加仓库
sudo apt-add-repository "deb https://apt.kitware.com/ubuntu/ $(lsb_release -cs) main"

# 安装 CMake
sudo apt update
sudo apt install cmake -y

# 验证版本
cmake --version  # 应该显示 3.28.x 或更高
```

# 2. debian unstable

## 2.1. 换源

默认wsl2的debian是稳定版，vim修改

```bash
# 编辑 sources.list
sudo vim /etc/apt/sources.list

```

```text
# 主仓库
deb http://deb.debian.org/debian sid main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian sid main contrib non-free non-free-firmware
```

## 2.2. 安装gcc

```bash
# 更新
sudo apt update  
sudo apt upgrade -y

# 更新gcc
# 安装编译器
sudo apt install gcc-13 g++-13

# 设置默认版本
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-13 13
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-13 13

# 验证 C++20 支持
echo '#include <format>
int main() { std::println("Hello C++20!"); }' > test.cpp
g++ -std=c++20 -o test test.cpp  # 应无报错
```

## 2.3. 安装其他

```bash
# 环境安装
apt install python3-pyelftools python3-requests git cmake ninja-build build-essential pkg-config libicu-dev libcapstone-dev
```

## 2.4. 验证

```bash
# 验证 GCC 版本
gcc --version | grep "13."
g++ --version | grep "13."

# 验证 Debian 版本
lsb_release -a | grep "Codename"  # 应显示 sid

# 验证关键工具
cmake --version
ninja --version
```
