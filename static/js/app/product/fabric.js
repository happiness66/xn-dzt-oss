$(function() {
    //面料
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "所属规格",
        field: "modelSpecsCode",
        type: "select",
        listCode: "620287",
        keyName: "code",
        valueName: "{{name.DATA}}--{{modelName.DATA}}",
        searchName: "name",
        search: true
    }, {
        title: "品牌",
        field: "brand",
        required: true,
        maxlength: 255
    }, {
        title: "类型",
        field: "type",
        type: "select",
        key: "fabric_type",
        formatter: Dict.getNameForList("fabric_type"),
        search: true
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat
    }, {
        title: "色系",
        field: "color",
        type: "select",
        key: "fabric_color",
        formatter: Dict.getNameForList("fabric_color"),
        search: true
    }, {
        title: "花色",
        field: "flowers",
        type: "select",
        key: "fabric_design",
        formatter: Dict.getNameForList("fabric_design"),
        search: true
    }, {
        title: "成分",
        field: "form",
        type: "select",
        key: "fabric_divide",
        formatter: Dict.getNameForList("fabric_divide"),
        search: true
    }, {
        title: "规格编号",
        field: "modelNum",
        maxlength: 255,
        required: true,
        search: true
    }, {
        title: "重量(g)",
        field: "weight"
    }, {
        title: "纱支",
        field: "yarn",
        type: "select",
        key: "fabric_yarn",
        formatter: Dict.getNameForList("fabric_yarn"),
        search: true
    }, {
        title: "产地",
        field: "area",
        type: "select",
        key: "produce_area",
        formatter: Dict.getNameForList("produce_area"),
        search: true
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
        columns: columns,
        pageCode: '620030',
        singleSelect: false,
        beforeDelete: function(data) {
            if (data.status != 0) {
                toastr.warning("只有草稿状态，才可以删除");
                return;
            }
            confirm("确定删除？").then(function() {
                reqApi({
                    code: '620021',
                    json: { "code": data.code }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        },
        beforeEdit: function(data) {
            if (data.status == 1) {
                toastr.warning("已上架，不可修改");
                return;
            }
            window.location.href = "fabric_addedit.html?code=" + data.code;
        }
    });
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.info("请选择一条记录");
            return;
        }
        if (selRecords[0].status == 0 || selRecords[0].status == 2) {
            confirm("确定上架？").then(function() {
                reqApi({
                    code: '620023',
                    json: { "codeList": [selRecords[0].code], location: "0", orderNo: "0", remark: "上架" }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
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
        if (selRecords.length > 1) {
            toastr.info("请选择一条记录");
            return;
        }
        if (selRecords[0].status == 1) {
            confirm("确定下架？").then(function() {
                reqApi({
                    code: '620024',
                    json: { "codeList": [selRecords[0].code], updater: getUserName(), remark: "下架" }
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
    //批量上架
    $("#multipleUpBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        var codeList = [];
        for (var i = 0; i < selRecords.length; i++) {
            codeList.push(selRecords[i].code)
            if (selRecords[i].status == 1) {
                toastr.warning("面料规格是：" + selRecords[i].modelNum + "&nbsp;&nbsp;的记录已上架，无需再次上架");
                return;
            }
        };
        confirm("确定批量上架？").then(function() {
            reqApi({
                code: '620023',
                json: { "codeList": codeList, location: "0", orderNo: "0", remark: "批量上架" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});
    });
    //批量下架
    $("#multipleDownBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        var codeList = [];
        for (var i = 0; i < selRecords.length; i++) {
            codeList.push(selRecords[i].code)
            if (selRecords[i].status != 1) {
                toastr.warning("面料规格是：" + selRecords[i].modelNum + "&nbsp;&nbsp;的记录不是可以下架的状态!");
                return;
            }
        };
        confirm("确定批量下架？").then(function() {
            reqApi({
                code: '620024',
                json: { "codeList": codeList, location: "0", orderNo: "0", remark: "批量下架" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});
    });
});