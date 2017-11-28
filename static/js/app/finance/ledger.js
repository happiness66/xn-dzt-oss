$(function() {
    var currency = getQueryString('currency') || "";
    var accountNumber = getQueryString('accountNumber') || "";
    var kind = getQueryString('kind') || "";
    var bizTypeDictCNY = {
        "11": "充值",
        "-11": "取现",
        "HL": "红冲蓝补",
        "201": "同币种的划转",
        "200": "币种兑换",
        "206": "C端用户间转账",
        "XXFK": "线下付款",
        "GW": "购物付款",
        "GWTK": "购物退款",
        "HHRFC": "合伙人分成",
        "LTSFC": "量体师分成",
        "HYCZ": "会员购买"
    };
    var bizTypeDictJF = {
        "01": "注册送积分",
        "02": "每日签到",
        "SCTJ": "推荐首次送积分",
        "DCTJ": "会员多次下单成功送积分",
        "YHHD": "会员消费送积分",
        "DZT_TJSJF": "推荐送积分"
    };
    var bizTypeDictJYZ = {
        "CZSJY": "充值送经验",
        "HSCJY": "首次推荐送经验",
        "HDCJY": "会员推荐加经验",
        "FDCJY": "非会员多次推荐送经验",
        "YHJY": "会员消费送经验"
    };
    var bizTypeDictHYB = {
        "201": "同币种划转",
        "GW": "购物付款",
        "GWTK": "购物退款",
        "11": "线下充值",
        "HYCZ": "会员充值"
    };
    if (kind == "CNY" || kind == "TG") {
        bizTypeDict = bizTypeDictCNY;
    } else if (kind == "JF") {
        bizTypeDict = bizTypeDictJF;
    } else if (kind == "HYB") {
        bizTypeDict = bizTypeDictHYB;
    } else if (kind == "JYZ") {
        bizTypeDict = bizTypeDictJYZ;
    } else {
        bizTypeDict = Dict.getNameForList('biz_type');
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

    // $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#goBackBtn').on('click', function() {
        goBack();
    });
});