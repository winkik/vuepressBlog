---
title: springboot整合mybatis
date: 2024-11-20
article: true
---
# springboot整合mybatis
## 引入依赖
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>3.0.3</version>
        </dependency>

        <!-- MySQL Connector -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>
```
## 添加数据库配置信息
```yml
spring:
  datasource:
    url: jdbc:mysql://101.35.217.89:3306/air_fryer?useUnicode=true&characterEncoding=utf-8&useSSL=true
    username: root
    password: xxxx
    driver-class-name: com.mysql.cj.jdbc.Driver
```

## mybatis相关配置
1. 在 `resources/`目录下创建`mybatis`文件夹,包含`config`和`mapper`两个子文件夹：
   结构如下：
   ```
   resources
    │--application.yml
    │
    └─mybatis
        ├─config
        │      mybatis-config.xml //mybatis配置文件，或者在yml中配置
        │
        └─mapper  //mapper文件存放地址
                Env_Mapper.xml 
    ```
2. 在application.yml中填加相关配置信息：
```yml
mybatis:
  mapper-locations: classpath:/mybatis/mapper/*.xml
  config-location:  classpath:/mybatis/config/mybatis-config.xml
```
**常用配置：**
config.xml配置文件形式：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 开启驼峰转换 -->
    <settings>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    <!-- 配置别名 -->
    <typeAliases>
        <package name="com.example.entity"/>
    </typeAliases>

</configuration>
```
yml配置文件形式：
```yml
mybatis:
  type-aliases-package: com.example.entity
  configuration:
    map-underscore-to-camel-case: true
```
3. 配置扫描mapper接口类
   - 在启动类上加入`@MapperScan("接口路径")`
   - 在每个接口类中加入`@Mapper()`注解

4. 编写xml文件
   >
   > namespace指向对应的接口类的路径
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    <mapper namespace="com.winkky.cloud.airfryer.dao.IEnvDao"></mapper>
    ```
    