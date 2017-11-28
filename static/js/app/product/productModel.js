$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "所属产品",
        field: "modelCode",
        type: "select",
        listCode: "620012",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        search: true
    }, {
        field: 'pic',
        title: '缩略图',
        formatter: function(v, data) {
            return v && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + v + '" >' || "-"
        }
    }, {
        title: "UI位置",
        field: "location",
        type: 'select',
        data: {
            "0": "普通",
            "1": "热门"
        },
        search: true
    }, {
        field: "orderNo",
        title: "UI次序"
    }, {
        title: "状态",
        field: "status",
        type: "select",
        data: {
            "0": "未上架",
            "1": "上架",
            "2": "下架"
        },
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '620270',
        beforeDelete: function(data) {
            if (data.status != 0) {
                toastr.warning("只有未上架状态，才可以删除");
                return;
            }
            confirm("确定删除？").then(function() {
                reqApi({
                    code: '620261',
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
            window.location.href = "productModel_addedit.html?code=" + data.code;
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
            window.location.href = "productModel_up.html?code=" + selRecords[0].code;
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
                    code: '620264',
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

});