# JS笔记
**记录前端学习过程中所碰到的一切js相关问题**

## 原生js实现文件下载并设置请求头header
```js
const token="自行定义";//如果有
/**
* 向指定路径发送下载请求
* @param{String} url 请求路径
*/
function downLoadByUrl(url){
        var xhr = new XMLHttpRequest();
        //GET请求,请求路径url,async(是否异步)
        xhr.open('GET', url, true);
        //设置请求头参数的方式,如果没有可忽略此行代码
        // xhr.setRequestHeader("token", token);
        //设置响应类型为 blob
        xhr.responseType = 'blob';
        //关键部分
        xhr.onload = function (e) {
            //如果请求执行成功
            if (this.status == 200) {
                var blob = this.response;
                var filename = "我是文件名.xxx";//如123.xls
                var a = document.createElement('a');

                blob.type = "application/octet-stream";
                //创键临时url对象
                var url = URL.createObjectURL(blob);

                a.href = url;
                a.download=filename;
                a.click();
                //释放之前创建的URL对象
                window.URL.revokeObjectURL(url);
            }
        };
        //发送请求
        xhr.send();
}

```

---
# 方法
* >[join()](http://www.w3school.com.cn/jsref/jsref_join.asp)
  * **定义与用法:**
  
    &emsp;&emsp;join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
    
  * **语法**
  
  ```javascript
        arrayObject.join(separator)
  ```
  |   param   |                           description                            |
  | :-------: | :--------------------------------------------------------------: |
  | separator | 可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。 |
  |           |
    * **返回值**    
    &emsp;&emsp;返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 separator 字符串而生成的。

---
* >[slice()](http://www.w3school.com.cn/js/jsref_slice_array.asp)
  * **定义与用法:**
  
    &emsp;&emsp;slice() 方法可从已有的数组中返回选定的元素。
    
  * **语法**
  
  ```javascript
        arrayObject.slice(start,end)
  ```
  | param |                                                                                          description                                                                                          |
  | :---: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  | start |                            必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。                             |
  |  end  | 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。 |
  |       |

    * **返回值**    
    &emsp;&emsp;返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

---
* >[charAt()](http://www.w3school.com.cn/jsref/jsref_charAt.asp)
  * **定义与用法:**
  
    &emsp;&emsp;charAt() 方法可返回指定位置的字符。
    
  * **语法**
  
  ```javascript
        stringObject.charAt(index)
  ```
  | param |                        description                         |
  | :---: | :--------------------------------------------------------: |
  | ndex  | 必需。表示字符串中某个位置的数字，即字符在字符串中的下标。 |
  |       |

    * **返回值**    
    &emsp;&emsp;返回的字符是长度为 1 的字符串

---

---
* >[toUpperCase()](http://www.w3school.com.cn/jsref/jsref_toUpperCase.asp)
  ><br>toLowerCase()同理
  * **定义与用法:**
  
    &emsp;&emsp;toUpperCase() 方法用于把字符串转换为大写。
    
  * **语法**
  
  ```javascript
        stringObject.toUpperCase()
  ```


    * **返回值**    
    &emsp;&emsp;一个新的字符串，在其中 stringObject 的所有小写字符全部被转换为了大写字符。

---

* >[splice()](http://www.w3school.com.cn/jsref/jsref_splice.asp)
  * **定义与用法:**
  
    &emsp;&emsp;splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
    
  * **语法**
  
  ```javascript
        arrayObject.splice(index,howmany,item1,.....,itemX)
  ```
  |        param         |                              description                              |
  | :------------------: | :-------------------------------------------------------------------: |
  |        index         | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。 |
  |        hwmany        |        必需。要删除的项目数量。如果设置为 0，则不会删除项目。         |
  | item1,item2,item3... |                      可选。向数组添加的新项目。                       |
  |                      |
    * **返回值**    
    &emsp;&emsp;	包含被删除项目的新数组，如果有的话。

---