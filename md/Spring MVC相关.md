# 解决Spring MVC无法接收AJAX使用PUT与DELETE请求传输的内容

### 解决方案
在 Web.xml文件中 加入以下代码
```xml
    <!--解决ajax Put与Del请求无法接收到传输的内容-->
    <filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <!-- 备注，这边的名称必须和配置'springmvc'的servlet名称一样 -->
        <servlet-name>springmvc</servlet-name>
    </filter-mapping>
```

# Spring MVC中获取当前项目的路径
1. 在web.xml中加入以下内容
    ```xml
    <!--获取项目路径-->
    <context-param>
        <param-name>webAppRootKey</param-name>
        <param-value>rootpath</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.util.WebAppRootListener</listener-class>
    </listener>
    ```
2. 代码中获取项目路径的方式
   ```java
     String rootPath=System.getProperty("rootpath");
   ```

# 利用WebUploader上传图片文件SpringMVC接收



***
> 小弟最近正在写的一个工具类网站有兴趣的朋友看看 [EasyPicker](https://github.com/ATQQ/reportsPicker)
