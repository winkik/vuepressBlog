---
title: Lombok实现原理
date: 2024-12-15
article: true
---



> 转自 <https://www.cnblogs.com/jing99/p/13785684.html>

# Lombok实现原理

`Lombok`使用的过程中，只需要添加相应的注解，无需再为此写任何代码。但是自动生成的代码到底是如何产生的呢？

**核心之处就是对于注解的解析上**。`JDK5`引入了注解的同时，也提供了两种解析方式。

## 运行时解析：

运行时能够解析的注解，必须将`@Retention`设置为`RUNTIME`，这样就可以通过反射拿到该注解。`java.lang.reflect`反射包中提供了一个接口`AnnotatedElement`，该接口定义了获取注解信息的几个方法，`Class`、`Constructor`、`Field`、`Method`、`Package`等都实现了该接口，对反射熟悉的朋友应该都会很熟悉这种解析方式。

## 编译时解析

　　编译时解析有两种机制，分别简单描述下：

- `Annotation Processing Tool`：`apt`自`JDK5`产生，`JDK7`已标记为过期，不推荐使用，`JDK8`中已彻底删除，自`JDK6`开始，可以使用`Pluggable Annotation Processing API`来替换它，apt被替换主要有2点原因：`api`都在`com.sun.mirror`非标准包下；没有集成到`javac`中，需要额外运行。

- `Pluggable Annotation Processing API`：**`JSR 269`**自`JDK6`加入，作为`apt`的替代方案，它解决了`apt`的两个问题，`javac`在执行的时候会调用实现了该`API`的程序，这样我们就可以对编译器做一些增强，这时`javac`执行的过程如下： 

　　　　　　![img](https://winkik.github.io/picx-images-hosting/image.92q6vlm33l.webp)

　　`Lombok`本质上就是一个实现了[`JSR 269 API`](https://www.jcp.org/en/jsr/detail?id=269)的程序。在使用`javac`的过程中，它产生作用的具体流程如下：

- `javac`对源代码进行分析，生成了一棵抽象语法树（`AST`）
- 运行过程中调用实现了`JSR 269 API`的`Lombok`程序
- 此时`Lombok`就对第一步骤得到的`AST`进行处理，找到@Data注解所在类对应的语法树（`AST`），然后修改该语法树（`AST`），增加`getter`和`setter`方法定义的相应树节点
- `javac`使用修改后的抽象语法树（`AST`）生成字节码文件，即给class增加新的节点（代码块）

　　拜读了`Lombok`源码，对应注解的实现都在`HandleXXX`中，比如`@Getter`注解的实现是`HandleGetter.handle()`。还有一些其它类库使用这种方式实现，比如[Google Auto](https://github.com/google/auto)、[Dagger](http://square.github.io/dagger/)等等。