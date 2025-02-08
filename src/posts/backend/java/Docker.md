# 架构
![](https://cdn.nlark.com/yuque/0/2024/png/42693057/1717634953280-4b220ea8-eb0b-4876-8d7f-af57097b00ec.png)、

```shell
docker build 构建镜像
docker pull 从仓库拉取镜像
docker run 运行镜像
```

# 安装（debian）
详见  

[https://docs.docker.com/engine/install/debian/](https://docs.docker.com/engine/install/debian/)

1. 卸载冲突包

```shell
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

2. 设置docker的apt存储库

```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

3. 安装docker包

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4. 验证

```shell
sudo docker run hello-world
```

此命令下载测试映像并在容器中运行。容器运行时，它会打印一条确认消息并退出。

5. 更换镜像

可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://qnmufcit.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

# 常见命令
### 基本操作
1.  **查看 Docker 版本** 

```bash
docker --version
```

2.  **查看 Docker 系统信息** 

```bash
docker info
```



3.  **列出所有 Docker 命令** 

```bash
docker --help
```

### 镜像管理
1.  **搜索镜像** 

```bash
docker search [镜像名]
```

2.  **拉取镜像** 

```bash
docker pull [镜像名]:[标签]
```

3.  **列出本地镜像** 

```bash
docker images
```

4.  **删除本地镜像** 

```bash
docker rmi [镜像ID]
```

5.  **构建镜像** 

```bash
docker build -t [镜像名]:[标签] [Dockerfile路径]
```

### 容器管理
1.  **运行容器** 

```bash
docker run [选项] [镜像名]
-d //后台运行
-t //分配伪终端
-i //交互模式
-it //交互模式和伪终端
--name container_name //指定容器名称
-p host_port:container_port // 端口映射
-e "ENV_VAR_NAME=value" //环境变量 可覆盖ENV中同名变量
-v /host/path:/container/path 挂载券
-w /path/in/container //设置工作目录
--memory="1g" //设置工作内存
--cpus="0.5" 限制cpu数量
--rm //容器停止后自动删除
```

2.  **列出运行中的容器** 

```bash
docker ps
```

3.  **列出所有容器（包括停止的）** 

```bash
docker ps -a
```

4.  **停止容器** 

```bash
docker stop [容器ID]
```

5.  **启动容器** 

```bash
docker start [容器ID]
```

6.  **重启容器** 

```bash
docker restart [容器ID]
```

7.  **删除容器** 

```bash
docker rm [容器ID]
```

8.  **查看容器日志** 

```bash
docker logs [容器ID]
```

9.  **进入容器** 

```bash
docker exec -it [容器ID] /bin/bash
```

### 网络管理
1.  **列出网络** 

```bash
docker network ls
```

2.  **创建网络** 

```bash
docker network create [网络名]
```

3.  **删除网络** 

```bash
docker network rm [网络名]
```

4.  **连接容器到网络** 

```bash
docker network connect [网络名] [容器ID]
```

5.  **断开容器与网络的连接** 

```bash
docker network disconnect [网络名] [容器ID]
```

### 卷管理
1.  **列出卷** 

```bash
docker volume ls
```

2.  **创建卷** 

```bash
docker volume create [卷名]
```

3.  **删除卷** 

```bash
docker volume rm [卷名]
```

4.  **查看卷详细信息** 

```bash
docker volume inspect [卷名]
```

# 使用Dockerfile构建镜像
## 流程
1.  创建一个目录  

```bash
mkdir my-docker-app
cd my-docker-app
```

2. 创建Dockerfile

```bash
touch Dockerfile
```

3. 编写dockerfile
4.  构建镜像  

```bash
docker build -t my-python-app .
-t 指定tag标签
. 表示Dockerfile所在的当前目录
```

##  常用指令  
Dockerfile 是用来定义 Docker 镜像构建过程的文件。以下是一些常用的 Dockerfile 指令及其详细解释。

1.  **FROM** 

```bash
FROM <image>[:<tag>]
# 指定基础镜像，通常是 Dockerfile 的第一条指令。 
FROM python:3.9-slim
```

2.  **LABEL** 

```dockerfile
LABEL <key>=<value> ...
# 添加元数据到镜像中，例如维护者信息。
LABEL maintainer="you@example.com"
```

3.  **RUN** 

```dockerfile
RUN <command> [param1 param2 ...]
# 在构建镜像时执行的命令。通常用于安装软件包。
RUN apt-get update && apt-get install -y curl
```

4.  **CMD** 

```dockerfile
CMD ["executable","param1","param2"]
# 指定容器启动时要运行的命令。可以被 docker run 命令行参数覆盖。
CMD ["python", "app.py"]
```

5.  **EXPOSE** 

```dockerfile
EXPOSE <port> [<port>/<protocol>...]
# 声明容器运行时监听的端口。
EXPOSE 80
```

6.  **ENV** 

```dockerfile
ENV <key>=<value> ...
# 设置环境变量。
ENV DEBUG=true
```

7.  **ADD** 

```dockerfile
ADD <src>... <dest>
# 将文件、目录或远程文件 URL 的内容复制到镜像中。
ADD . /app
```

8.  **COPY** 

```dockerfile
COPY <src>... <dest>
# 将文件和目录复制到镜像中（与 ADD 类似，但不支持 URL）。
COPY . /app
```

9.  **ENTRYPOINT** 

```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
# 配置容器启动时运行的主命令，不会被 docker run 命令行参数覆盖。
ENTRYPOINT ["python", "app.py"]
```

10.  **VOLUME** 

```dockerfile
VOLUME [""/path/in/container""]
# 创建挂载点，将主机目录或其他容器目录挂载到容器中。
VOLUME ["/myvol"]
```

11.  **WORKDIR** 

```dockerfile
WORKDIR /path/to/workdir
# 设置工作目录，用于 RUN, CMD, ENTRYPOINT, COPY 和 ADD 指令。
WORKDIR /app
```

 

12.  **USER** 

```dockerfile
USER <username|uid>[:<group|gid>]
# 设置执行后续指令的用户和可选的用户组。
USER appuser
```

 

13.  **ARG** 

```dockerfile
ARG <name>[=<default value>]
# 定义在构建时可以传递的变量。
ARG build_version
```

 

14.  **ONBUILD** 

```dockerfile
ONBUILD <INSTRUCTION>
# 设置触发指令，当构建一个继承自这个镜像的镜像时执行。
ONBUILD ADD . /app/src
```

## 例
```dockerfile
# 使用官方的 Node.js 镜像作为基础镜像
FROM node:14

# 设置维护者信息
LABEL maintainer="you@example.com"

# 设置环境变量
ENV NODE_ENV=production

# 设置工作目录
WORKDIR /usr/src/app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装应用依赖
RUN npm install

# 将应用代码复制到工作目录
COPY . .

# 暴露应用运行端口
EXPOSE 8080

# 定义容器启动时运行的命令
CMD ["node", "server.js"]
```

## 将镜像发布到阿里云
1. 访问[阿里云容器镜像服务](https://cr.console.aliyun.com/cn-hangzhou/instances)，开通个人实例
2. 创建命名空间和镜像仓库
3. 详见仓库操作示例

