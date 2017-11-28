$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '登录名',
        field: 'loginName'
    }, {
        title: "登录名",
        field: "loginNameForQuery",
        search: true,
        visible: false
    }, {
        title: "姓名",
        field: "realName"
    }, {
        title: "姓名",
        field: "realNameForQuery",
        search: true,
        visible: false
    }, {
        title: "辖区",
        type: "select",
        field: "province",
        formatter: function(v, data) {
            if (data.province == data.city && data.city == data.area) {
                data.city = "";
                data.area = "";
            } else if (data.province == data.city && data.city != data.area) {
                data.city = '';
            }
            var result = (data.province || "") + (data.city || "") + (data.area || "");
            return result || "-";
        }
    }, {
        title: "身份证号",
        field: "idNo",
    }, {
        title: '手机号',
        field: 'mobile'
    }, {
        title: '手机号',
        field: 'mobileForQuery',
        visible: false,
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "partner_status",
        formatter: Dict.getNameForList("partner_status"),
        search: true
    }, {
        field: 'createDatetime',
        title: '加入时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'partner',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: "PA",
            companyCode: OSS.companyCode
        },
        beforeEdit: function(data) {
            window.location.href = "partner_addedit.html?userId=" + data.userId;
        }
    });
    //注销
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            toastr.info("该账户已被注销");
            return;
        }
        var status = selRecords[0].status,
            toStatus;
        status == 0 ? toStatus = 2 : toStatus = 0;
        confirm("确定注销该账户？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: toStatus
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });

    });
    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.info("该账户是已正常状态");
            return;
        }
        confirm("确定激活该账户？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0'
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });
    });
    //业绩
    $("#achieveBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "partner_achieve.html?userId=" + selRecords[0].userId;

    });
    //账户
    $("#accountBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "account.html?userId=" + selRecords[0].userId + "&kind=PA";

    });
});