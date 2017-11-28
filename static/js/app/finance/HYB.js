$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
            if (data.toUser) {
                return data.toUser.nickname;
            }
        }
    }, {
        field: 'fromAmount',
        title: '充值数量',
        formatter: moneyFormat
    }, {
        field: 'fromCurrency',
        title: '币种',
        type: 'select',
        data: {
            "HYB": "合衣币"
        }
    }, {
        field: 'payType',
        title: '支付渠道',
        type: 'select',
        data: {
            "dbhz": "同币种划转"
        }
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '创建时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "1": "已支付"
        }
    }];
    buildList({
        columns: columns,
        pageCode: '802415',
        searchParams: {
            channelType: '90',
            companyCode: OSS.companyCode,
            currency: "HYB"
        },
        beforeDetail: function(data) {
            window.location.href = "./HYB_detail.html?&v=1&code=" + data.code;
        }
    });
});