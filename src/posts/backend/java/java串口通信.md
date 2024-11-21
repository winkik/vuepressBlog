---
title: java使用jSerialComm进行串口通信
date: 2024-11-20
article: true
---
# java使用jSerialComm进行串口通信
## 引入依赖
```xml
    <dependency>
        <groupId>com.fazecast</groupId>
        <artifactId>jSerialComm</artifactId>
        <version>2.9.2</version>
    </dependency>
```
## 编写配置类
```java
@Configuration
public class SerialConfig {
    @Bean
    public SerialPort serialPort(){
        SerialPort serialPort = SerialPort.getCommPort("COM2");
        // 配置波特率，数据位，停止位和校验位
        serialPort.setBaudRate(9600);
        serialPort.setNumDataBits(8);
        //serialPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_BLOCKING,1000,1000);
        serialPort.setNumStopBits(SerialPort.ONE_STOP_BIT);
        serialPort.setParity(SerialPort.NO_PARITY);
        return serialPort;
    }
}
```
## 编写相关功能
```java
@Component
public class SerialService {
    @Resource
    private SerialPort serialPort;

    // 打开串口
    public boolean openPort() {
        boolean result = false;
        if(!serialPort.isOpen()){
            result = serialPort.openPort();
        }
        return result;
    }

    // 关闭串口
    public void closePort() {
        serialPort.closePort();
    }

    // 发送数据
    public void sendData(String data) {
//        serialPort.flushIOBuffers();
        if (serialPort.isOpen()) {
            serialPort.flushIOBuffers(); //清除缓冲区
            byte[] buffer = data.getBytes();
            serialPort.writeBytes(buffer, buffer.length);
        } else {
            throw new IllegalStateException("Serial port is not open");
        }
    }

    // 接收数据
    public  String receiveData() {
        if (serialPort.isOpen()) {
            serialPort.flushIOBuffers();
            StringBuilder dataBuffer = new StringBuilder(); // 缓存数据
            try {
                while (true) {
                    // 读取单字节数据
                    byte[] readBuffer = new byte[1];
                    int numRead = serialPort.readBytes(readBuffer, readBuffer.length);

                    if (numRead > 0) {
                        char receivedChar = (char) readBuffer[0]; // 转换为字符
                        if (receivedChar == '*') {
                            // 遇到*，结束读取
                            //这里*为自定义的每行语句的结束符
                            String res = dataBuffer.toString();

                            System.out.println("收到完整数据：" + res);
                            dataBuffer.setLength(0); // 清空缓冲区
                            return res;
                        } else {
                            dataBuffer.append(receivedChar); // 添加到缓冲区
                        }
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new IllegalStateException("Serial port is not open");
        }
    }

    /**
     * 发送和接收数据
     */
    public synchronized String  sendAndRecvSync(String data){
        closePort();
        openPort();
        sendData(data);
        String res = receiveData();
        return res;
    }
}
```