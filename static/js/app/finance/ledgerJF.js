$(function() {
    var currency = getQueryString('currency') || "";
    var accountNumber = getQueryString('accountNumber') || "";
    var kind = getQueryString('kind') || "";
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        search: true,
        formatter: Dict.getNameForList('channel_type')
    }, {
        title: "币种",
        field: "currency",
        type: "select",
        key: "currency_type",
        formatter: Dict.getNameForList("currency_type")
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        search: true,
        data: {
            "01": "注册送积分",
            "02": "每日签到",
            "SCTJ": "推荐首次送积分",
            "DCTJ": "会员多次下单成功送积分",
            "YHHD": "会员消费送积分",
            "DZT_TJSJF": "推荐送积分"
        }
    }, {
        field: 'transAmount',
        title: '变动金额',
        // formatter: moneyFormat
        formatter: function(v, data) {
            return parseInt(v / 1000) + ".00"
        }
    }, {
        field: 'preAmount',
        title: '变动前金额',
        // formatter: moneyFormat
        formatter: function(v, data) {
            return parseInt(v / 1000) + ".00"
        }
    }, {
        field: 'postAmount',
        title: '变动后金额',
        // formatter: moneyFormat
        formatter: function(v, data) {
            return parseInt(v / 1000) + ".00"
        }
    }, {
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        search: true,
        formatter: Dict.getNameForList('jour_status'),
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: "802524",
        searchParams: {
            currency: currency,
            userId: accountNumber ? "" : getUserId(),
            accountNumber: accountNumber,
            companyCode: OSS.companyCode
        }
    });

    // $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#goBackBtn').on('click', function() {
        goBack();
    });
});