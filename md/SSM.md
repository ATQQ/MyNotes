# SSM 框架配置
* IDE
  * [IntelliJ IDEA](http://www.jetbrains.com/idea/)
  
* applicationContext.xml
    1. 约束
  ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
  ```
  
    2. 读取数据库配置文件
  ```xml
  <!--读取数据库配置文件-->
      <context:property-placeholder location="classpath:config/db.properties"/>
  ```

    3. 配置数据源
    ```xml
    <!-- 配置数据源 -->
    <bean name="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driverClass}"/>
        <property name="jdbcUrl" value="${jdbc.jdbcUrl}"/>
        <property name="user" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    ```
    
    4. 开启注解扫描
    ```xml
        <!--开启注解扫描-->
    <context:component-scan base-package="com.sugar"></context:component-scan>
    ```

    5. 事务核心管理器
    ```xml
        <!-- 事务核心管理器 -->
    <bean name="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 开启注解事务 -->
    <tx:annotation-driven/>
    ```

    6. 配置Mybatis
    
    ```xml
    <!-- 配置mybatis -->
    <bean name="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="typeAliasesPackage" value="com.sugar.bean"/>
        <!--<property name="configLocation" value="classpath:sqlMapperConfig.xml"/>-->
    </bean>

    <!-- mapper工厂 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.sugar.mapper"/>
    </bean>
    ```

* db.proporties
    ```
    jdbc.driverClass=com.mysql.jdbc.Driver
    jdbc.jdbcUrl=jdbc:mysql://localhost:3306/wechat?useSSl=false
    jdbc.user=root
    jdbc.password=a123456
    ```

* web.xml
    ```xml
     <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--读取配置文件-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:config/applicationContext.xml</param-value>
        </init-param>
    </servlet>
    <!-- 配置过滤器，解决post的乱码问题 -->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <!--拦截规则
        1: *.htm *.do *.action 以扩展名方式进行拦截,不拦截静态资源 .jpg .css .js .png.....
        2: / 不拦截 jsp 拦截静态资源                 Restful 风格 静态资源进行放行
        3: */ 全部拦截
        -->
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    ```