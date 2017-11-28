$(function() {
    var currency = getQueryString('currency') || "";
    var accountNumber = getQueryString('accountNumber') || "";
    var bizTypeDict = {
        "11": "充值",
        "-11": "取现",
        "19": "蓝补",
        "-19": "红冲",
        "GW": "购物付款",
        "GWTK": "购物退款",
        "LTSFC": "量体师分成",
        "SCTJ": "首次推荐加积分",
        "DCTJ": "多次推荐加积分",
        "YHJY": "用户消费送积分",
        "02": "每日签到",
        "HL": "红冲蓝补",
        "201": "同币种的划转",
        "200": "币种兑换"
    };



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
        data: bizTypeDict
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
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


    $('#goBackBtn').on('click', function() {
        goBack();
    });
});