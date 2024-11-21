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
### commit message格式
      ```bash
      <type>(<scope>): <subject>
      例：feat(miniprogram): 增加了小程序模板消息相关功能
      ```
`scope` : commit作用范围 
`subject` : 描述
`type` : 提交类型，分类如下：
- feat - 新功能 feature
- fix - 修复 bug
- docs - 文档注释
- style - 代码格式(不影响代码运行的变动)
- refactor - 重构、优化(既不增加新功能，也不是修复bug)
- perf - 性能优化
- test - 增加测试
- chore - 构建过程或辅助工具的变动
- revert - 回退
- build - 打包
  
## 分支管理
1. 创建分支
   ```bash
   git branch dev
   ```
2. 切换到指定分支
   ```bash
   git checkout dev
   or
   git switch dev
   ```
> 以上两步可以合并为：
```bash
   git checkout -b dev
```
3. 查看当前分支：
   ```bash
   git branch
   * dev  #'*' 标记当前所在分支
   master
   ```
4. 合并指定分支到当前分支上：
   ```bash
   git merge dev #将dev分支合并到master分支
   ```
5. 删除分支：
   ```bash
   git branch -d dev
   ```