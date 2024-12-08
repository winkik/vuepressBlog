---
title: Lambda表达式与函数式接口
date: 2024-12-08
article: true
---



# Lambda表达式与函数式接口

## Lambda表达式

### 定义

Lambda是一个匿名函数，它允许将函数作为方法的参数传递

结构如下：

```java
(parameters) -> {statements}
//  参数列表		lambda体
```

- 若`parameters` 只有一个参数，则`()`为可选地。

- 若`statements`只包含一个语句，则`{}`为可选的，同时不必显式返回

- Lambda的参数类型及返回值类型可以自动推断



### 方法引用

方法引用是一种更简洁的Lambda表达式，它允许直接访问类或实例已经存在的方法或构造方法

结构如下：

```java
类名/实例名 :: 方法名
```

构造函数语法格式：

```java
类名 ::new 
 
//  Function<String, Integer> stringToInteger = (String s) -> Integer.parseInt(s) = Integer::parseInt;
```

- Lambda体中调用方法的参数列表与返回值类型，要与函数式接口中抽象方法的函数列表和返回值类型保存一致
- 若Lambda参数列表中的第一个参数是实例方法的调用者，而第二个参数是实例方法的参数时，可以使用ClassName::method

##  函数式接口

### 定义

有且仅有一个抽象方法的接口被称为函数式接口（不包括static、default以及Object类所有的方法），可以使用lambda表达式创建一个函数式接口的对象。

语法格式：

```java
@FunctionalInterface
 修饰符 interface 接口名称 {
    返回值类型 方法名称(可选参数信息);
    // 其他非抽象方法内容
 }
```



### @FunctionalInterface注解

Java8中专门为函数式接口提供的注解，当该注解作用于一个接口时，编译器会强制检查该接口是否有且仅有一个抽象方法，否则会报错，`非必须`。

### 常用函数式接口

#### `Consumer<T>`: 消费型接口

**抽象方法**：` void accept(T t)`, 接收一个参数进行消费，但无需返回结果

**例**：

```java
  Consumer consumer = System.out::println;
  consumer.accept("hello function");
// System.out::println 即为accept()方法的具体实现
```

**默认方法** ：`public Consumer<T> andThen(@NotNull  Consumer<? super T> after )`

**例**

```java
consumer1.andThen(consumer2).accept()
//andThen()和accept的顺序不能颠倒。
```



**执行顺序**：先执行`consumer1`的`accept()`方法，接着执行`andThen()`中`consumer2`的`accept()`方法

#### `Supplier<T>` : 供给型接口

**抽象方法** ：`T get()`,无参有返回值

**例**：

```java
 Supplier<String> supplier = () -> "test";
 System.out.println(supplier.get()); //test
```

#### `Function<T,R>`:函数型接口

**抽象方法** : `R apply(T t)`,传入一个参数并返回结果

**例**：

```java
 Function<Integer, Integer> function1 = e -> e * 6;
 System.out.println(function1.apply(2));//12
```

**默认方法**：

`public <V> Function<V, R> compose( @NotNull  Function<? super V, ? extends T> before )`

**例**：

```java
function1.compose(function2).apply(param1)
```

**执行顺序**：

先执行`function2`的`apply(param1)`方法，得到`param2`,接着执行`function1`中的`apply(param2)`

#### `Predicate<T>`:断言型接口

**抽象方法** ：`boolean test(T t)` ,传入一个参数返回布尔值

**例**：

```java
 Predicate<Integer> predicate = t -> t > 0;
 boolean test = predicate.test(1);//true
```

**默认方法**：

- `public Predicate<T> and( @NotNull  Predicate<? super T> other )` 相当于`&&` 
- `public Predicate<T> or( @NotNull  Predicate<? super T> other )` 相当于`||`
- `public Predicate<T> negate()` 相当于 `!`(取反)

