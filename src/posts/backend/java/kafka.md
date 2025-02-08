---
title: kafka
date: 2025-02-08
article: true
---

# kafka

## 什么是kafka?

> kafka是一个开源的分布式流处理平台，用于构建可扩展、高吞吐、低延迟的应用程序,由通过高性能TCP网络协议进行通信的服务器和客户端组成。

**kafka集成了三大核心功能：**

1. 发布（写入）和订阅（读取）事件流，包括从其他系统持续导入/导出数据；

2. 按需持久化、可靠地存储事件流；

3. 实时或回溯处理事件流。

## 核心概念

### 事件

即消息，它代表一个`kafka`集群中数据的最小单元，被组织并持久存储在主题中，**包括以下属性：**

- 键（Key）：可选字段，用于分区路由（相同键的事件会被分配到同一分区）。
- 值（Value）：事件的主体内容（如 JSON、二进制数据等）。
- 时间戳（Timestamp）：事件的生成时间（由生产者定义或 Kafka 自动生成）。
- 头信息（Headers）：可附加的元数据（如跟踪 ID、版本号等），用于辅助处理。

### Topic - 主题

`kafka`集群中数据的容器，它代表一个逻辑的流，可以包含多个`partition`。

### Partition - 分区

`kafka`集群中数据的物理容器，它代表一个逻辑的流，可以包含多个消息。

- Kafka 通过分区来实现数据冗余和伸缩性。
- 消息以追加的方式写入分区，然后以先入先出的顺序读取。
- 无法在整个`topic`范围内保证消息的顺序，但可以保证消息在单个分区内的顺序。在需要严格保证消息的消费顺序的场景下，需要将`partition`数目设为1。
![](https://winkik.github.io/picx-images-hosting/image.67xkw8ifv0.webp)

### Producer - 生产者

用于创建消息，并将消息发布到`kafka`的`topic`中,broker接收到生产者发送的消息后，会将该消息写入对应`topic`的分区中。

- 默认情况下通过轮询把消息均衡地分布到`topic`的所有分区上。
- 生产者可将消息直接写到指定的分区，通常可以通过消息键和分区器来实现。分区器为键生成一个散列值，并将其映射到指定的分区上。这样可以保证包含同一个键的消息会被写到同一个分区上。

### Consumer - 消费者

用于消费消息，消费者订阅一个或多个主题，并按照消息生成的顺序读取它们。

- 消费者通过检查消息的偏移量来区分已经读取过的消息。在创建消息时，`Kafka`会把偏移量添加到消息里。在给定的分区中，每个消息的偏移量都是唯一的。消费者把每个分区最后读取的消息偏移量保存在Zookeeper 或`Kafka` 上，如果消费者关闭或重启，它的读取状态不会丢失。
- 消费者是消费组的一部分。群组保证每个分区只能被一个消费者使用。如果一个消费者失效，消费组里的其他消费者可以接管失效消费者的工作，再平衡，分区重新分配。
![](https://winkik.github.io/picx-images-hosting/image.8vn16la8z6.webp)

### Broker

一个独立的`Kafka` 服务器被称为`broker`,`broker` 为消费者提供服务，对读取分区的请求作出响应，返回已经提交到磁盘上的消息。
![](https://winkik.github.io/picx-images-hosting/image.13lw6yibru.webp)

### Replicas - 副本

分区的备份，保存 在broker 上，每个broker 可以保存成百上千个属于不同主题和分区的副本，共有两种类型：
- `leader`：所有生产者请求和消费者请求都会经过这个副本.
- `follower`：不处理来自客户端的请求，它们唯一的任务就是从首领那里复制消息，保持与首领一致的状态。如果首领发生崩溃，其中的一个跟随者会被提升为新首领

## docker部署kafka

1. 拉取镜像

```bash
docker pull wurstmeister/kafka
docker pull wurstmeister/zookeeper
```

2. 启动Zookeeper

```bash
docker run -d --name zookeeper -p 2181:2181 -t wurstmeister/zookeeper
```

3. 启动Kafka

```bash
docker run -d --name kafka \
-p 9092:9092 \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_ZOOKEEPER_CONNECT=换成你的服务器IP:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://换成你的服务器IP:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 wurstmeister/kafka
```

4. 开放服务端口

```bash
firewall-cmd --zone=public --add-port=2181/tcp --permanent
firewall-cmd --zone=public --add-port=9092/tcp --permanent
firewall-cmd --reload
```

**不行的话需要检查服务器控制台是否已开放对应端口**

5. 进入kafka控制台

```bash
docker exec -it [容器ID] /bin/bash
```

6. 创建主题

```bash
bin/kafka-topics.sh --create --zookeeper 你的zookeeper所在服务器ip:2181 --replication-factor 1 --partitions 1 --topic 
topic名称
```

```bash
--replication-factor 1 # 副本因子，每个分区只有一个副本
--partitions 1 # 分区数量，只有一个分区
```

```bash
bin/kafka-topics.sh --list --zookeeper zk所在服务器ip:2181 # 查看主题
```
7. 发送消息

```bash
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic Hello-Kafka
```

8. 接收消息

```bash
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic Hello-Kafka --from-beginning
```

## Spring Boot集成kafka

1. 添加依赖
   
```xml
<dependency>
<groupId>org.springframework.kafka</groupId>
<artifactId>spring-kafka</artifactId>
</dependency>
```

2. application.yml 配置 kafka

```yml
spring:
  kafka:
    bootstrap-servers: 服务器ip:9092
    producer:
      # 发生错误后，消息重发的次数。
      retries: 1
      #当有多个消息需要被发送到同一个分区时，生产者会把它们放在同一个批次里。该参数指定了一个批次可以使用的内存大小，按照字节数计算。
      batch-size: 16384
      # 设置生产者内存缓冲区的大小。
      buffer-memory: 33554432
      # 键的序列化方式
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      # 值的序列化方式
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
      # acks=0 ： 生产者在成功写入消息之前不会等待任何来自服务器的响应。
      # acks=1 ： 只要集群的首领节点收到消息，生产者就会收到一个来自服务器成功响应。
      # acks=all ：只有当所有参与复制的节点全部收到消息时，生产者才会收到一个来自服务器的成功响应。
      acks: 1
    consumer:
      # 自动提交的时间间隔 在spring boot 2.X 版本中这里采用的是值的类型为Duration 需要符合特定的格式，如1S,1M,2H,5D
      auto-commit-interval: 1S
      # 该属性指定了消费者在读取一个没有偏移量的分区或者偏移量无效的情况下该作何处理：
      # latest（默认值）在偏移量无效的情况下，消费者将从最新的记录开始读取数据（在消费者启动之后生成的记录）
      # earliest ：在偏移量无效的情况下，消费者将从起始位置读取分区的记录
      auto-offset-reset: earliest
      # 是否自动提交偏移量，默认值是true,为了避免出现重复数据和数据丢失，可以把它设置为false,然后手动提交偏移量
      enable-auto-commit: false
      # 键的反序列化方式
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      # 值的反序列化方式
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
    listener:
      # 在侦听器容器中运行的线程数。
      concurrency: 5
      #listner负责ack，每调用一次，就立即commit
      ack-mode: manual_immediate
      missing-topics-fatal: false
```

3. 创建消息生产者

```java
@Component
public class KafkaProducer {

    private Logger logger = LoggerFactory.getLogger(KafkaProducer.class);

    @Resource
    private KafkaTemplate<String, Object> kafkaTemplate;

    public static final String TOPIC_TEST = "Hello-Kafka";

    public static final String TOPIC_GROUP = "test-consumer-group";

    public void send(Object obj) {
        String obj2String = JSON.toJSONString(obj);
        logger.info("准备发送消息为：{}", obj2String);

        // 发送消息
        ListenableFuture<SendResult<String, Object>> future = kafkaTemplate.send(TOPIC_TEST, obj);
        future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
            @Override
            public void onFailure(Throwable throwable) {
                //发送失败的处理
                logger.info(TOPIC_TEST + " - 生产者 发送消息失败：" + throwable.getMessage());
            }

            @Override
            public void onSuccess(SendResult<String, Object> stringObjectSendResult) {
                //成功的处理
                logger.info(TOPIC_TEST + " - 生产者 发送消息成功：" + stringObjectSendResult.toString());
            }
        });
    }

}
```

4. 创建消息消费者

```java
@Component
public class KafkaConsumer {

    private Logger logger = LoggerFactory.getLogger(KafkaConsumer.class);

    @KafkaListener(topics = KafkaProducer.TOPIC_TEST, groupId = KafkaProducer.TOPIC_GROUP)
    public void topicTest(ConsumerRecord<?, ?> record, Acknowledgment ack, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        Optional<?> message = Optional.ofNullable(record.value());
        if (message.isPresent()) {
            Object msg = message.get();
            logger.info("topic_test 消费了： Topic:" + topic + ",Message:" + msg);
            ack.acknowledge();
        }
    }

}
```

> 参考：

<https://www.51cto.com/article/756995.html>