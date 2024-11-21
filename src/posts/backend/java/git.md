---
title: git常用指令
data: 2024-11-20
article: true
---
# git相关
## 安装
> <https://git-scm.com/downloads>
## 初始化与设置远程
1. 初始化仓库：
    ```bash
    git init
    ```
2. 添加远程仓库：
    ```bash
    git remote add origin https://github.com/winkik/foo.git
    ```
3. 将工作区的修改添加到暂存区
   ```bash
   git add .
   ```
4. 将暂存区中的修改提交到版本库：
   ```bash
   git commit -m "Initial commit"
   ```
5. 将当前分支重命名为main
   ```bash
   git branch -M main
   ```
6. 将代码推送到远程main分支并与当前分支绑定
   ```bash
   git push -u origin main 
   ```

## 提交规范