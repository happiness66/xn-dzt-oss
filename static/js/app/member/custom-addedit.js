$(function() {
    var userId = getQueryString('userId');
    var view = 1;
    var tjKind = {
        "C": "会员",
        "B": "量体师"
    };
    var fields = [{
        field: 'nickname',
        title: '微信昵称',
    }, {
        field: 'mobile',
        title: '手机号',
    }, {
        title: "推荐人类型",
        field: "22",
        type: "select",
        formatter: function(v, data) {
            if (data.refereeUser) {
                return tjKind[data.refereeUser.kind]
            }
        }
    }, {
        field: 'refereeUser',
        title: '推荐人',
        formatter: function(v, data) {
            if (data.refereeUser) {
                return data.refereeUser.realName;
            } else {
                return "";
            }
        }
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat
    }, {
        title: "用户等级",
        field: "level",
        type: "select",
        key: "user_level",
        formatter: Dict.getNameForList("user_level"),
        search: true
    }, {
        title: "用户活跃度",
        field: "frequent",
        type: "select",
        key: "user_frequent",
        formatter: Dict.getNameForList("user_frequent")
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
    }, {
        field: 'bankcardList',
        title: '银行卡信息',
        type: 'o2m',
        pageCode: '802015',
        o2mvalue: {
            'userId': userId
        },
        columns: [{
            field: 'realName',
            title: '真实名称',
        }, {
            field: 'bankcardNumber',
            title: '银行卡号',
        }, {
            field: 'bankName',
            title: '银行名称',
        }, {
            field: 'subbranch',
            title: '开户支行',
        }, {
            field: 'bindMobile',
            title: '预留手机号',
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }]
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        view: view,
        detailCode: '805121'
    });


});