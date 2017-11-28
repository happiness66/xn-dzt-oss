$(function() {
    //产品
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "类型",
        field: "type",
        type: "select",
        data: {
            "0": "衬衫",
            "1": "H+产品"
        },
        search: true
    }, {
        field: 'name',
        title: '名称'
    }, {
        title: "类别",
        field: "kind",
        type: "select",
        data: {
            "0": "单品",
            "1": "套装"
        },
        required: true
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        formatter: function(v, data) {
            return v && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + v + '" >' || "-"
        }
    }, {
        title: "UI次序",
        field: "orderNo"
    }, {
        title: "状态",
        field: "status",
        type: "select",
        data: {
            '0': "待上架",
            "1": "已上架",
            "2": "已下架"
        },
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: 'product',
        columns: columns,
        pageCode: '620010',
        beforeDelete: function(data) {
            if (data.status != 0) {
                toastr.warning("只有草稿状态，才可以删除");
                return;
            }
            confirm("确定删除？").then(function() {
                reqApi({
                    code: '620001',
                    json: { "code": data.code }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        },
        beforeEdit: function(data) {
            if (data.status == 1) {
                toastr.warning("上架中不可修改");
                return;
            }
            window.location.href = "product_addedit.html?code=" + data.code;
        }
    });
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0 || selRecords[0].status == 2) {
            window.location.href = "product_up.html?code=" + selRecords[0].code;
        } else {
            toastr.warning('不是可以上架的状态');
            return;
        }

    });
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            confirm("确定下架？").then(function() {
                reqApi({
                    code: '620004',
                    json: { "code": selRecords[0].code, updater: getUserName(), remark: "下架" }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});

        } else {
            toastr.warning('不是可以下架的状态');
            return;
        }

    });
    //规格
    $('#sizeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "productSize.html?&modelCode=" + selRecords[0].code + "&name=" + selRecords[0].name;
    });
    $('#add2Btn').remove();
    $('#goBackBtn').remove();
});