$(function() {
    var userId = getQueryString('userId');
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "订单编号",
        field: "code"
    }, {
        title: "订单编号",
        field: "codeForQuery",
        search: true,
        visible: false
    }, {
        title: "订单状态",
        field: "status",
        type: "select",
        key: "order_status",
        formatter: Dict.getNameForList("order_status"),
        search: true
    }, {
        field: 'applyName',
        title: '下单用户'
    }, {
        title: "联系方式",
        field: "applyMobile"
    }, {
        field: 'ltDatetime',
        title: '预约量体时间',
        formatter: dateFormat
    }, {
        title: "量体师",
        field: "ltUser",
        formatter: function(v, data) {
            if (data.ltUserDO) {
                return data.ltUserDO.realName
            } else {
                return "-"
            }
        },

    }, {
        title: "订单金额",
        field: "amount",
        formatter: moneyFormat
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '620230',
        searchParams: {
            ltUser: userId
        }
    });
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li><li style="display:block;" id="detailBtn"><span><img src="/static/images/t01.png"></span>详情</li>');
    $('#backBtn').on('click', function() {
        window.location.href = "quantity.html";
    });
    $('#detailBtn').on('click', function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = '../product/orderSearch_addedit.html?code=' + selRecords[0].code;
    });
});