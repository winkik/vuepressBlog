---
title: hello
---
完整步骤
bash
复制代码
git init                                 # 初始化 Git 仓库（如果之前还未初始化）
git remote add origin https://github.com/winkik/vuepressBlog.git
git add .                                # 添加所有文件
git commit -m "Initial commit"           # 创建首次提交
git branch -M main                       # 将当前分支重命名为 main
git push -u origin main                  # 推送到远程 main 分支