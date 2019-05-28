# 利用[WebUploader](https://fex.baidu.com/webuploader/)插件上传图片文件完整前端示例demo,服务端使用SpringMVC接收

#### [Webuploader](https://fex.baidu.com/webuploader/)简介
>&emsp;&emsp;WebUploader是由Baidu WebFE(FEX)团队开发的一个简单的以HTML5为主，FLASH为辅的现代文件上传组件。在现代的浏览器里面能充分发挥HTML5的优势，同时又不摒弃主流IE浏览器，沿用原来的FLASH运行时，兼容IE6+，iOS 6+, android 4+。两套运行时，同样的调用方式，可供用户任意选用。<br>
>采用大文件分片并发上传，极大的提高了文件上传效率。


### demo效果图
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190517005443465-1610326836.png)

>Tip:**底部附完整demo源码地址链接**

***
**详细前端demo源码部分(复制粘贴可直接使用)**


## HTML 部分
```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WebUploader示例</title>
    <link rel="stylesheet" href="webuploader.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="uploadArea">
        <div style="display: flex;justify-content: center;">
            <div id="imagePicker">选择图片</div>
            <button id="sureUpload">
                确认上传
            </button>
        </div>
        <ul id="imagesList">
            <!-- 各种状态图片示例部分 -->
            <li>
                <div class="wait state">等待上传</div>
                <span class="delete">×</span>
                <img src="https://avatars0.githubusercontent.com/u/42485491?s=60&v=4" alt="图片">
                <p class="filename">xxxxxxxxxxxxxxxxxx.png</p>
            </li>
            <li>
                <div class="error state">上传出错</div>
                <span class="delete">×</span>
                <img src="https://avatars0.githubusercontent.com/u/42485491?s=60&v=4" alt="图片">
                <p class="filename">xxxxxx.png</p>
            </li>
            <li>
                <div class="success state">上传成功</div>
                <span class="delete">×</span>
                <img src="https://avatars0.githubusercontent.com/u/42485491?s=60&v=4" alt="图片">
                <p class="filename">xxxxxx.png</p>
            </li>
            <li>
                <div class="progress state">上传中</div>
                <span class="delete">×</span>
                <img src="https://avatars0.githubusercontent.com/u/42485491?s=60&v=4" alt="图片">
                <p class="filename">xxxxxx.png</p>
            </li>
        </ul>
    </div>

    <!-- 引入jQuery -->
    <script src="js/jquery.min.js"></script>
    <!-- 引入Webuploader -->
    <script src="js/webuploader.js"></script>
    <!-- 引入上传图片的js片段 -->
    <script src="js/upload.js"></script>
</body>

</html>
```
## JS部分
### upload.js
```javascript
$(function () {
    var baseUrl="http://localhost:8080/Test/";
    /**
     * 创建的WebUploadr对象
     */
    var imageUploader = WebUploader.create({

        // 是否开起分片上传。
        chunked: false,
        //选择完文件或是否自动上传
        auto: false,
        //swf文件路径
        swf: 'Uploader.swf',
        // 上传并发数。允许同时最大上传进程数[默认值：3]   即上传文件数
        threads: 3,
        //文件接收服务端接口
        server: baseUrl + "file/save",
        // 选择文件的按钮
        pick: '#imagePicker',
        //上传请求的方法
        method: "POST",
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        //指定接受哪些类型的文件
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    /**
     * 文件被添加进队列的时候
     */
    imageUploader.on('fileQueued', function (file) {
        var $list = $('#imagesList');
        var $li = $(' <li id="'+file.id+'">'+
            '<div class= "wait state">等待上传</div>'+
            '<span class="delete">×</span>'+
            '<img src="" alt="图片">'+
                '<p class="filename">'+file.name+'</p>'+
            '</li>'),
            $img = $li.find('img');
        $list.append($li);
        //创建图片预览
        imageUploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不支持格式,不能预览</span>');
                return;
            }
            $img.attr('src', src);
        });
    });

    //移除选择的图片
    $('#imagesList').on('click', '.delete', function () {
        var fileId = $(this).parents('li').attr('id');
        if (confirm("确认移除次图片吗?")) {
            // 从上传队列中移除
            imageUploader.removeFile(fileId, true);
            // 从视图中移除缩略图
            $(this).parents('li').remove();
        }
    });

    // 文件上传过程中创建进度条实时显示。
    imageUploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $progress = $li.find('div.progress');
        // 避免重复创建
        if (!$progress.length) {
            $li.children('div.state').remove();
            $progress = $('<div class="progress state"></div>').appendTo($li);
        }
        $progress.text('上传中');
    });


    // 文件上传成功处理。
    imageUploader.on('uploadSuccess', function (file, response) {
        var $li = $('#' + file.id),
            $success = $li.find('div.success');
        // 避免重复创建
        if (!$success.length) {
            $li.children('div.state').remove();
            $success = $('<div class="success"></div>').appendTo($li);
        }
        $success.text('上传成功');

    });

    //上传出错
    imageUploader.on('uploadError', function (file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');
        // 避免重复创建
        if (!$error.length) {
            // 移除原来的
            $li.children('div.state').remove();
            // 创建新的状态进度条
            $error = $('<div class="error"></div>').appendTo($li);
        }
        $error.text('上传出错');
    });


    /**
     * 确认上传
     */
    $("#sureUpload").on('click', function () {
        imageUploader.upload();
    })
})
```

## Spring MVC部分
```JAVA
    /**
     * 保存文件file/image
     * @param request
     * @return
     */
    @RequestMapping(value = "save",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveFile(HttpServletRequest request){

        //获取项目根路径(web.xml中需先设置才能使用这个获取项目路径)
        String rootpath=System.getProperty("rootpath");

        MultipartHttpServletRequest req= (MultipartHttpServletRequest) request;
        MultipartFile multipartFile=req.getFile("file");

        //保存路径
        String realPath=rootpath+"../upload/images";

        //获取上传的源文件名
        String filename = multipartFile.getOriginalFilename();

        //文件类型(.xxxx)
        String contentType=filename.substring(filename.lastIndexOf("."));

        try{
            //判断文件夹是否存在
            File dir=new File(realPath);
            // 不存在则创建
            if(!dir.exists()){
                dir.mkdirs();
            }
             //保存图片
             File file = new File(realPath, filename);
             //写出文件
             multipartFile.transferTo(file);
        }catch (Exception e){
            e.printStackTrace();
        }

        return "success";
    }
```

## 样式部分
### webuploader.css
```CSS
.webuploader-container {
    position: relative;
}
.webuploader-element-invisible {
    position: absolute !important;
	width: 100%;
    display: block;
    height: 100%;
    opacity: 0;
}

/* 所见上传按钮效果关键样式部分 */
.webuploader-pick {
    position: relative;
    display: inline-block;
    cursor: pointer;
    background: #00b7ee;
    padding: 9px 20px;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
}
.webuploader-pick-hover {
    background: #00a2d4;
}

.webuploader-pick-disable {
    opacity: 0.6;
    pointer-events:none;
}

```

### style.css
```CSS

* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

/* 图片上传区域 */
#uploadArea {
  width: 888px;
}

/* 承载Webuploader按钮的标签 */
#imagePicker {
  display: block;
  margin: 6px;
}

#imagesList {
  position: relative;
  overflow: hidden;
}

#imagesList li {
  display: block;
  position: relative;
  width: 110px;
  height: 140px;
  margin: 10px;
  float: left;
}

/* 确认上传按钮 */
#sureUpload {
  margin: 6px;
  height: 38px;
  padding: 0 20px;
  display: block;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background-color: rgba(76, 175, 80, .9);
  border: none;
}

/* 图片删除按钮 */
#imagesList li span.delete {
  z-index: 10;
  width: 18px;
  height: 18px;
  background-color: red;
  display: block;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  color: #fff;
  cursor: pointer;
  position: absolute;
  right: -4px;
  top: -10px;
}

/* 预览图片大小 */
#imagesList li img {
  width: 100%;
}

/* 文件名 */
#imagesList li p.filename {
  text-align: center;

/* 多的内容换行 */
  /* word-wrap: break-word;
            word-break: break-all; */
  /* 多的部分截断 用...代替*/
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* 上传进度条状态样式 */
.wait,
.error,
.success,
.progress {
  width: 100%;
  text-align: center;
  font-weight: bold;
  position: absolute;
  top: -1px;
  left: 0;
}

/* 等待上传 */
.wait {
  background-color: rgba(158, 158, 158, .5);
}

/* 上传出错 */
.error {
  background-color: rgba(255, 0, 0, .5);
  color: #fff;
}

/* 上传成功 */
.success {
  background-color: rgba(76, 175, 80, .9);
  color: #fff;
}

/* 上传中 */
.progress {
  background-color: rgba(255, 235, 59, .7);
  color: #fff;
}

```

>源码链接[戳我查看](https://github.com/ATQQ/MyNotes/tree/master/md/demo/webuoloader/imageDemo)

