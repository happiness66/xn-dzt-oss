$(function() {
    var code = getQueryString('code');
    var name = getQueryString('name');
    var modelCode = getQueryString('modelCode');
    $("#name").text("产品名称：" + name);

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "规格名称",
        field: "name"
    }, {
        field: 'pic',
        title: '缩略图',
        formatter: function(v, data) {
            return v && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + v + '" >' || "-"
        }
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '620285',
        beforeDelete: function(data) {
            confirm("确定删除？").then(function() {
                reqApi({
                    code: '620281',
                    json: { "code": data.code }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        },
        beforeEdit: function(data) {
            window.location.href = "productSize_addedit.html?&modelCode=" + modelCode + "&code=" + data.code;
        },
        searchParams: {
            modelCode: modelCode
        }
    });
    //新增
    $('#add2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        window.location.href = "productSize_addedit.html?&modelCode=" + modelCode;
    });
    //返回
    $('#goBackBtn').click(function() {
        window.location.href = "./product.html"
    });

    $('#addBtn').remove();
    //上架
    $('#upBtn').remove();
    //下架
    $('#downBtn').remove();
    $('#sizeBtn').remove();
});