---
title: Java日志框架
date: 2024-12-15
article: true
---



# Java日志框架

当前Java日志主要结构为`日志门面`+`日志实现`，基于门面基本可分为两大阵营：`Commons Logging`阵营和`Slf4j`阵营。

## 门面模式

**定义**：

门面模式（Facade），为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。

**图例**：

![门面模式示例](https://winkik.github.io/picx-images-hosting/image.4jo5scjl8p.png)

**`Facade`为门面对象，主要特征为**：

- 了解所有子系统的功能和责任
- 将`Client`发来的请求委派到子系统中
- 自身没有业务逻辑也不参与子系统内部的业务逻辑实现

即客户端只需与门面类`Facade`交互，而不需要知道子系统中的功能。

## 日志门面

**提供统一的日志输出接口(Facade)**

- `SLF4j（Simple Logging Facade For Java）`：一个为 Java 程序提供的统一日志输出接口，就是一个接口，

- `Commons Logging（Jaka Commons Logging, Apache Commons Logging）`：Apache 提供的一个日志门面，提供统一的对外接口。

## 日志实现

**具体实现日志输出的逻辑(Client)**

- `JUL（Java util Logging）`：**Java 原生的日志框架，使用时不需要引用第三方类库，使用方便**。
  - 7 个日志级别（从高到低）：**SEVERE、WARNING、INFO、CONFIG、FINE、FINER、FINEST**。
  - 同时还有 **OFF、ALL 两个特别的日志级别，用来 关闭/打开 所有的日志**。

- `log4j`：**Apache 的一个开源项目**。
  - 7 个日志级别（从高到低）：**OFF、FATAL、ERROR、WARN、INFO、DEBUG、ALL**。

| 日志级别 | 日志介绍                                     |
| -------- | -------------------------------------------- |
| OFF      | 最高日志级别，关闭所有日志                   |
| FATAL    | 将会导致引用程序退出的错误                   |
| ERROR    | 发生错误事件，但仍不影响系统的继续运行       |
| WARN     | 警告，存在潜在的错误                         |
| INFO     | 一般用在粗粒度级别上，强调应用程序的运行全程 |
| DEBUG    | 一般用在细粒度级别上，用于调试应用程序       |
| ALL      | 最低日志级别，打开所有日志                   |

- `log4j2`：**log4j 的升级版，参考了 logback 的设计，同时进行了问题修复**。

  - **异常优化**：提供了一些异常处理机制，来解决在 logback 中，应用无法感知到 Appener 异常。

  - **性能提升**：相较于 log4j 和 logback，性能都有明显的提升。

  - **自动重载配置**：参考 logback 的参数修改自动更新机制，提供自动刷新参数的设置。

  - **无垃圾机制**：可以使用其设计的一套无垃圾机制（对象重用、内存缓冲），避免频繁的日志记录导致 JVM gc 压力过大。

- `logback`：**SpringBoot 默认的日志框架**。

  - 由三个模块组成：
    - logback-core：logback 核心包，开发人员可以以次为基础搭建自身模块。
    - logback-classic：**logback 对于 SLF4j 的实现，其中依赖了 logback-core 包**。
    - logback-access：集成 Servlet 容器，实现 HTTP 访问日志的功能。

  - **可以输出日志到文件、数据库、控制台中，还可以将日志文件进行压缩，功能很丰富**。

  - 日志级别（从高到低）：**FATAL、ERROR、WARNING、INFO、DEBUG、TRACE**。

| 日志级别 | 日志介绍                                                     |
| -------- | ------------------------------------------------------------ |
| TRACE    | 在线调试，默认不输出到控制台和文件                           |
| DEBUG    | 在线调试、终端查看，默认输出到控制台，用于开发者查看日志流水 |
| INFO     | 报告程序进度、查看程序状态，用于跟踪程序进展                 |
| WARNING  | 警告，程序出现错误，但是程序可以恢复，程序仍是正常状态       |
| ERROR    | 错误，程序发生错误后还可以运行，但是程序极有可能处于非正常状态，功能可能无法全部完成 |
| FATAL    | 致命错误，程序必须马上终止                                   |

## 使用

> 引入依赖

```xml
		<!-- 日志门面 -->
		<dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.25</version>
        </dependency>
		<!-- 日志实现 -->
		<!-- 按需导入一个即可 -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.25</version>
        </dependency>
		<!--log4j并不直接实现slf4j，但是有专门的一层桥接slf4j-log4j12来实现slf4j -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.21</version>
        </dependency>
```

> 代码使用

```java
public void testSlf4j() {
      Logger logger = LoggerFactory.getLogger(Object.class);
      logger.error("123");
  }
```

> 使用`Lombok`的`@Slf4j`注解
**Spring中使用lombok仍需引入日志门面**
```xml
		<!--引入Lombok依赖 -->
		<dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.36</version>
        </dependency>
```



```java
@Slf4j
public void testSlf4j() {
      log.error("123");
  }
```

**注意**：

- **Spring-boot-starter中已存在日志实现相关依赖，无需再手动引入**

![](https://winkik.github.io/picx-images-hosting/image.2krz273unc.webp)

- **若要使用`@Slf4j`注解，需要确保idea中已安装Lombok插件**

  ![](https://winkik.github.io/picx-images-hosting/image.1vypi6qys5.webp)

> 参考

<https://juejin.cn/post/7205192064212074556>

<https://www.cnblogs.com/xrq730/p/8619156.html>

<https://www.cnblogs.com/luler/p/15232704.html>

<https://www.cnblogs.com/luler/p/15272105.html>