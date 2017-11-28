$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';

    var fields = [{
        field: 'bizType',
        type: 'hidden',
        value: '-11'
    }, {
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'select',
        pageCode: '802500',
        dict: [
            ['type', 'account_kind'],
            ['currency', 'currency_type']
        ],
        params: {
            currency: 'CNY',
            userId: userId
        },
        keyName: 'accountNumber',
        valueName: '{{realName.DATA}} - {{typeName.DATA}}-{{currencyName.DATA}}',
        searchName: 'realName',
        help: '支持户名查询'
    }, {
        field: 'amount',
        title: '取现金额',
        required: true,
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '开户行',
        required: true,
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '银行卡号',
        required: true,
        bankCard: true,
    }];

    var options = {
        fields: fields,
        code: code,
        addCode: '802751',
        detailCode: '802756',
        view: view,
        beforeSubmit: function(data) {
            data.applyUser = getUserId();
            return data;
        }
    };

    buildDetail(options);

});