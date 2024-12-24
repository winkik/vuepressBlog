---
title: Dubbo相关
date: 2024-12-24
article: true
---
# 什么是Dubbo?

Apache Dubbo 是一个易于使用的 Web 和 RPC 框架，为通信、服务发现、流量管理、可观察性、安全、工具以及构建企业级微服务的最佳实践提供了多种语言实现（Java、Go、Rust、Node.js、Web）。

**Dubbo不仅是一个高性能的RPC框架，同时也和Spring Cloud一样提供了一套微服务整体解决方案(如服务发现、负载均衡、动态配置等)**

![Dubbo与Spring Cloud的关系](https://winkik.github.io/picx-images-hosting/image.361mzzi27t.webp)

# 核心概念与架构

![Dubbo架构](https://winkik.github.io/picx-images-hosting/image.4jo640nu3z.webp)

如图所示，Dubbo从抽象架构上分为两层：**服务治理抽象控制面** 和 **Dubbo 数据面** 。

- **服务治理控制面**：对 Dubbo 治理体系的抽象表达。包含协调服务发现的注册中心、流量管控策略、Dubbo Admin 控制台等。
- **Dubbo 数据面**：数据面代表集群部署的所有 Dubbo 进程，进程之间通过 RPC 协议实现数据交换，Dubbo 定义了微服务应用开发与调用规范并负责完成数据传输的编解码工作。
  - 服务消费者 (Dubbo Consumer)，发起业务调用或 RPC 通信的 Dubbo 进程
  - 服务提供者 (Dubbo Provider)，接收业务调用或 RPC 通信的 Dubbo 进程

# 与Spring Boot整合

## 引入依赖

使用Dubbo Spring Boot Starter，首先引入以下 Maven 依赖

```xml
<!-- 统一定义Dubbo各组件的版本号-->    
<dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.apache.dubbo</groupId>
                <artifactId>dubbo-bom</artifactId>
                <version>3.3.0</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

然后，在相应模块的 pom 中增加必要的 starter 依赖：

```xml
    <dependencies>
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
        </dependency>
        <!-- 使用zk作为注册中心 -->
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-zookeeper-spring-boot-starter</artifactId>
        </dependency>
        <!-- 使用nacos作为注册中心 -->
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-nacos-spring-boot-starter</artifactId>
        </dependency>
    </dependencies>
```

> 如果使用zk作为注册中心，请注意选择合适的版本

![](https://winkik.github.io/picx-images-hosting/image.1zibs5tlpg.webp)

## application.yml配置

示例如下：

```yml
dubbo:
  application:
      name: dubbo-springboot-demo-provider
      logger: slf4j 
  protocol:
    name: dubbo #配置采用的RPC协议
    port: 50052 
  registry:
    address: ddress: nacos://localhost:8848?username=nacos&password=nacos #注册中心地址
    # address: zookeeper://localhost:2181 使用zk
```

[查看全部可用配置参数](https://cn.dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/config/spring/spring-boot/#applicationyaml)

service、reference 组件也可以通过 `id` 与 application 中的全局组件做关联，以下面配置为例。如果要扩展 service 或 reference 的注解配置，则需要增加 `dubbo.properties` 配置文件或使用其他非注解如 Java Config 方式。

```yaml
dubbo:
  application:
    name: dubbo-springboot-demo-provider
  protocol:
    name: tri
    port: -1
  registry:
    id: zk-registry
    address: zookeeper://127.0.0.1:2181
```

通过注解将 service 关联到上文定义的特定注册中心（通过id关联）

```java
@DubboService(registry="zk-registry")
public class DemoServiceImpl implements DemoService {}
```

通过 Java Config 配置进行关联也是同样道理

```java
@Configuration
public class ProviderConfiguration {
    @Bean
    public ServiceConfig demoService() {
        ServiceConfig service = new ServiceConfig();
        service.setRegistry("zk-registry");
        return service;
    }
}
```

## 注解使用

`@DubboService`、`@DubboReference` 与 `EnableDubbo` 注解。其中 `@DubboService` 与 `@DubboReference` 用于标记 Dubbo 服务，`EnableDubbo` 启动 Dubbo 相关配置并指定 Spring Boot 扫描包路径。

### @DubboService 注解

> `@Service` 注解从 3.0 版本开始就已经废弃，改用 `@DubboService`，以区别于 Spring 的 `@Service` 注解

定义好 Dubbo 服务接口后，提供服务接口的实现逻辑，并用 `@DubboService` 注解标记，就可以实现 Dubbo 的服务暴露

```java
@DubboService
public class DemoServiceImpl implements DemoService {}
```

如果要设置服务参数，`@DubboService` 也提供了常用参数的设置方式。如果有更复杂的参数设置需求，则可以考虑使用其他设置方式

```java
@DubboService(version = "1.0.0", group = "dev", timeout = 5000)
public class DemoServiceImpl implements DemoService {}
```

### @DubboReference 注解

> `@Reference` 注解从 3.0 版本开始就已经废弃，改用 `@DubboReference`，以区别于 Spring 的 `@Reference` 注解

```java
@Component
public class DemoClient {
    @DubboReference
    private DemoService demoService;
}
```

`@DubboReference` 注解将自动注入为 Dubbo 服务代理实例，使用 demoService 即可发起远程服务调用

### @EnableDubbo 注解

`@EnableDubbo` 注解必须配置，否则将无法加载 Dubbo 注解定义的服务，`@EnableDubbo` 可以定义在主类上

```java
@SpringBootApplication
@EnableDubbo
public class ProviderApplication {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(ProviderApplication.class, args);
    }
}
```

Spring Boot 注解默认只会扫描 main 类所在的 package，如果服务定义在其它 package 中，需要增加配置 `EnableDubbo(scanBasePackages = {"org.apache.dubbo.springboot.demo.provider"})`

### 扩展注解配置

虽然可以通过 `@DubboService` 和 `DubboReference` 调整配置参数（如下代码片段所示），但总体来说注解是为易用性设计的，其提供的仅仅是 80% 场景下常用的配置项。在这种情况下，如果有更复杂的参数设置需求，可以使用 `Java Config` 或 `dubbo.properties` 两种方式。

```java
@DubboService(version = "1.0.0", group = "dev", timeout = 5000)
@DubboReference(version = "1.0.0", group = "dev", timeout = 5000)
```

### 使用 Java Config 代替注解

注意，Java Config 是 `DubboService` 或 `DubboReference` 的替代方式，对于有复杂配置需求的服务建议使用这种方式。

```java
@Configuration
public class ProviderConfiguration {
    @Bean
    public ServiceBean demoService() {
        ServiceBean service = new ServiceBean();
        service.setInterface(DemoService.class);
        service.setRef(new DemoServiceImpl());
        service.setGroup("dev");
        service.setVersion("1.0.0");
        Map<String, String> parameters = new HashMap<>();
        service.setParameters(parameters);
        return service;
    }
}
```
