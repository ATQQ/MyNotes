
$(document).ready(function () {
    
    // var baseUrl = window.parent.baseUrl;

    var baseUrl = 'null';

    var uploader = WebUploader.create({

        // 开起分片上传。
         chunked: true,
        // sendAsBinary:true,

        //选择完文件或是否自动上传
        auto: false,
        //swf文件路径
        swf: 'Uploader.swf',
	     // 如果要分片，分多大一片？ 默认大小为5M.
	     chunkSize: 5 * 1024 * 1024,
	     // 上传并发数。允许同时最大上传进程数[默认值：3]   即上传文件数
	     threads: 3,
        //文件接收服务端
	     server: baseUrl+"uploadFile",

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#picker',
        method:"POST",
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        formData: {
            proid: 1234,//上传文件对应的项目id
            guid: Math.random()//分片文件临时存放路径
        }
    });
    // 当有文件被添加进队列的时候
    uploader.on('fileQueued', function (file) {
        var $list = $('#thelist');
        $list.append('<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
            '</div>');
    });
    // 文件上传过程中创建进度条实时显示。
    // uploader.on('uploadProgress', function (file, percentage) {
    //     var $li = $('#' + file.id),
    //         $percent = $li.find('.progress .progress-bar');

    //     // 避免重复创建
    //     if (!$percent.length) {
    //         $percent = $('<div class="progress progress-striped active">' +
    //             '<div class="progress-bar" role="progressbar" style="width: 0%">' +
    //             '</div>' +
    //             '</div>').appendTo($li).find('.progress-bar');
    //     }

    //     $li.find('p.state').text('上传中');
    //     // console.log(percentage);
    //     // progress.set(percentage);
    //     // $percent.css('width', percentage * 100 + '%');
    // });


    // uploader.on('fileQueued', function (file) {
    //     uploader.md5File(file)

    //         // 及时显示进度
    //         .progress(function (percentage) {
    //             console.log('Percentage:', percentage);
    //             progress.set(percentage);
    //         })

    //         // 完成
    //         .then(function (val) {
    //             console.log('md5 result:', val);
    //         });

    // });


    // 文件上传成功处理。
    uploader.on('uploadSuccess', function (file, response) {
        //合并文件
        $.post(
        	baseUrl+"mergeFile",
            //发送到后台的参数
            {
                guid: uploader.options.formData.guid,
                chunks: Math.ceil(file.size / (5 * 1024 * 1024)),
                fileFileName: file.name,
                proid : 'upload_prj'//
                
            },
            function(data){

            });

        $('#' + file.id).find('p.state').text('已上传');
    });

    uploader.on('uploadError', function (file) {
        $('#' + file.id).find('p.state').text('上传出错');
    });

    uploader.on('uploadComplete', function (file) {
        //$('#' + file.id).find('.progress').fadeOut();
    });
    // 开始上传
    $('#uploadBtn').on('click', function (e) {
        uploader.upload();
    });

    //上传之前
    uploader.on('uploadBeforeSend', function (block, data) {

        var file=block.file;
        //设置上传文件附带的参数
    	file.proid=13141;
    	file.guid=Math.random();
    	
    	console.log(block);

        //Nowuploadid = upload_prj;

        // Nowuploadid = upload_prj;


    });


});