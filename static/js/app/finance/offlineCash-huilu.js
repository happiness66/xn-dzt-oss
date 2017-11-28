$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('detail');

    var approveNoteField = {
        title: '支付说明',
        field: 'payNote',
        maxlength: 250,
        required: true,
        readonly: false
    };

    var payList = [approveNoteField]

    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.payResult = '1';
                data.payUser = getUserName();
                data.codeList = [data.code];
                reqApi({
                    code: '802753',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.payResult = '0';
                data.payUser = getUserName();
                data.codeList = [data.code];
                reqApi({
                    code: '802753',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    if (isDetail) {
        approveNoteField = {};
        payList = [{
            field: 'approveUser',
            title: '审核人'
        }, {
            field: 'approveDatetime',
            title: '审核时间',
            formatter: dateTimeFormat
        }, {
            field: 'approveNote',
            title: '审核意见'
        }, {
            field: 'payUser',
            title: '回录人'
        }, {
            field: 'payDatetime',
            title: '回录时间',
            formatter: dateTimeFormat
        }, {
            field: 'payNote',
            title: '回录说明',
        }]
        buttons = "";
    }

    var fields = [{
        title: '编号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        title: '账号',
        field: 'accountNumber',
        required: true
    }, {
        title: '户名',
        field: 'accountName',
        required: true
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat
    }, {
        field: 'channelType',
        title: '支付渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        field: 'payCardInfo',
        title: '开户行'
    }, {
        field: 'payCardNo',
        title: '银行卡号',
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status'),
        search: true
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
            if (data.user.kind == 'P') {
                return data.user.loginName;
            } else {
                return data.user.mobile;
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
    }];


    fields = fields.concat(payList)

    var options = {
        fields: fields,
        code: code,
        detailCode: '802756',
        view: true,
        buttons: buttons
    };

    buildDetail(options);
});