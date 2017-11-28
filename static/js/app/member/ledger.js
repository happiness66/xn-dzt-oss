$(function() {
    var accountNumber = getQueryString('accountNumber') || '';
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
        "GW": "购物付款",
        "GWTK": "购物退款",
        "11": "线下充值",
        "HYCZ": "会员充值"
    };
    if (kind == "CNY") {
        bizTypeDict = bizTypeDictCNY;
    } else if (kind == "JF") {
        bizTypeDict = bizTypeDictJF;
    } else if (kind == "HYB") {
        bizTypeDict = bizTypeDictHYB;
    } else if (kind == "JY") {
        bizTypeDict = bizTypeDictJYZ;
    } else {
        bizTypeDict = Dict.getNameForList('biz_type');
    };

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: "realName",
            title: "用户名"
        },
        {
            field: 'channelType',
            title: '渠道类型',
            type: "select",
            key: "channel_type",
            formatter: Dict.getNameForList('channel_type'),
            search: true,
        }, {
            field: 'bizType',
            title: '业务类型',
            data: bizTypeDict,
            search: true,
            type: 'select'
        }, {
            field: 'status',
            title: '流水状态',
            type: 'select',
            key: "jour_status",
            formatter: Dict.getNameForList("jour_status"),
            search: true
        }, {
            field: 'transAmount',
            title: '变动金额',
            formatter: moneyFormat
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }, {
            field: 'bizNote',
            title: "备注"
        }
    ];

    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams: {
            accountNumber: accountNumber,
            companyCode: OSS.companyCode
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        goBack();
    });

});