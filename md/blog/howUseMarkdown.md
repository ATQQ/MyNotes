## 编写使用的工具
* [VS Code](https://code.visualstudio.com/ "拥有丰富插件支持的代码编辑器")  拥有丰富插件支持的代码编辑器,当然也支持markdown   

  
* [MdEditor](https://www.mdeditor.com/ "一款在线编辑markdown网站")一款在线编辑markdown网站
  
***

## 1.标题

* 示例:
  
    #&emsp;一级标题 <br>
    ##&emsp;二级标题 <br>
    ###&emsp;三级标题 <br>
    以此类推
* 效果
    # 一级标题
    ## 二级标题
    ### 三级标题
---
## 2. 引用
* 示例
  
  \>一级引用的内容<br>
  \>>二级引用的内容<br>
  \>>>三级引用的内容<br>
* 效果
  >一级引用的内容
  >>二级引用的内容
  >>>三级引用的内容

---
## 3. 字体

1. 粗体
   * 示例
    
    \*\*加粗的内容**
   * 效果
  
    **加粗的内容**

2. 斜体
   * 示例
    
   \*斜体的内容*
   * 效果
  
    *斜体的内容*
3. 粗斜体
   * 示例
    
    \*\*\*粗斜体的内容***
   * 效果
  
    **粗斜体的内容**
4. 删除线
   * 示例
    
    \~~删除的的内容~~
   * 效果
  
    ~~删除的的内容~~

---
## 4. 分割线
* 示例
  1. 第一种<br>
  \---
  2. 第二种<br>
  \***

* 效果
  
  ---
  ***

---
## 5.换行
**由于编辑器的不同,在换行的处理上有细微差异**

  1. 行尾自动换行
  2. 两次回车换行
  3. 回车自动换行
  4. 使用HTML中的\<br>标签强制换行 

---
## 6.列表
   1. 无序列表<br>
    **使用\* \+ \- 都可实现无序列表**
        * 示例<br>
  
            \*&nbsp;内容1<br>
            \*&nbsp;内容2<br>
            \*&nbsp;内容3

            \-&nbsp;内容1<br>
            \-&nbsp;内容2<br>
            \-&nbsp;内容3

            \+&nbsp;内容1<br>
            \+&nbsp;内容2<br>
            \+&nbsp;内容3
        * 效果

           * 内容1
           * 内容2
           * 内容3
   2. 有序列表<br>
        * 示例<br>
  
            1.&nbsp;内容1<br>
            2.&nbsp;内容2<br>
            3.&nbsp;内容3
        * 效果
  
           1. 内容1
           2. 内容2
           3. 内容3

---
## 7.空格缩进
* 示例(带分号)
  1. \&ensp;   一个空格
  2. \&emsp;    两个空格
  3. \&nbsp; 一个空格不会触发换行

---
## 8.超链接
* 格式
  
  \[name](url "title")
  * name 显示的名称
  * url 跳转的链接
  * title 鼠标悬停时提示的内容 可以省略
  
1. 示例(带title)
   
   \[百度](http://www.baidu.com "百度一下,你就知道")
   * 效果
    
        [百度](http://www.baidu.com "百度一下,你就知道")

2. 示例(不带title)

     \[百度](http://www.baidu.com)
   * 效果
    
        [百度](http://www.baidu.com)

---
## 9.图片
**图片地址推荐使用网络上的,易于分享**
### 推荐一个图像存储的工具
  &emsp;&emsp;[七牛云存储](https://www.qiniu.com/) 提供免费的对象存储空间,可以保存图片资源
* 格式
  
  \!\[name](url "title")
  * name 链接失效时显示的名称
  * url 图片的链接
  * title 鼠标悬停时提示的内容 可以省略
  
1. 示例
   
     \!\[哔哩哔哩](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2810627290,1080409091&fm=58&s=8197C732C535FA313E526557030030BB&bpow=121&bpoh=75 "bilibili")
2. 效果
   
    ![哔哩哔哩](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2810627290,1080409091&fm=58&s=8197C732C535FA313E526557030030BB&bpow=121&bpoh=75 "bilibili")

---
## 10.表格
* 格式
  
  \| colums1 | colunms2 |<br>
  \| :-----: | :------: |<br>
  \|  cell1  |  cell2   |

* 示例
  
    \|  key  | value |<br>
    \| :---: | :---: |<br>
    \| Happy | 开心  |<br>
    \| angry | 生气  |

* 效果

    |  key  | value |
    | :---: | :---: |
    | Happy | 开心  |
    | angry | 生气  |

---
## 11.代码
> [点击查看插入代码的语言类型](https://blog.csdn.net/zhangyu4863/article/details/84422335)
* 格式
  
  \``` language<br>
  context<br>
  \```
* 示例
  
  \```javascript<br>
    var test="123";<br>
    console.log(test);<br>
    $.ajax({<br>
        url:'xxxx',<br>
        data:{<br>
<br>
        },<br>
        success:function(data){<br>
<br>
        }<br>
    })<br>
  \```
  
* 效果

```javascript
    var test="123";
    console.log(test);
    $.ajax({
        url:'xxxx',
        data:{

        },
        success:function(data){

        }
    })
  ```
---
