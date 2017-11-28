$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'title',
        title: '资讯名称',
        maxlength: 255,
        search: true
    }, {
        field: 'orderNo',
        title: 'UI次序'
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "下架"
        }
    }, {
        field: 'updater',
        title: '最近更新人'
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildList({
        columns: columns,
        pageCode: '620120',
        searchParams: {
            companyCode: OSS.companyCode
        },
        beforeDelete: function(data) {
            if (data.status != 0) {
                toastr.warning("不是可以删除的状态");
                return;
            }
            confirm("确认是否删除该记录？").then(function() {
                reqApi({
                    code: '620111',
                    json: data
                }).done(function(data) {
                    sucList();
                });
            });
        },
        beforeEdit: function(data) {
            if (data.status == 0 || data.status == 2) {
                window.location.href = 'information_addedit.html?code=' + data.code;
            } else {
                toastr.warning('只有草稿和已下架的状态才可以修改信息');
                return;
            }
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
            window.location.href = "information_up.html?code=" + selRecords[0].code;
        } else {
            toastr.warning('该资讯不是可以上架的状态');
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
            confirm("确定下架该资讯？").then(function() {
                reqApi({
                    code: '620114',
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