$(function() {

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
        field: 'applyName',
        title: '下单用户',
        search: true
    }, {
        title: "联系方式",
        field: "applyMobile"
    }, {
        title: '量体师',
        field: "ltName",
        search: true,
        visible: false
    }, {
        field: 'ltDatetime',
        title: '预约量体时间',
        type: "date",
        formatter: dateFormat,
        search: true
    }, {
        title: "量体师",
        field: "ltUser",
        formatter: function(v, data) {
            if (data.ltUserDO) {
                return data.ltUserDO.realName
            } else {
                return "-"
            }
        }
    }, {
        title: "订单金额",
        field: "amount",
        formatter: moneyFormat
    }, {
        title: "订单状态",
        field: "status",
        type: "select",
        data: {
            "10": "已归档",
            "11": "取消订单"
        },
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: 'orderSearch',
        columns: columns,
        pageCode: '620230',
        searchParams: { statusList: ["10", "11"] },
        beforeSearch: function(data) {
            if (data.ltDatetime) {
                console.log(data.ltDatetime)
                data.ltDatetime = data.ltDatetime.concat(" 00:00:00")
                return data;
            } else {
                return data;
            }
        },
    });
});