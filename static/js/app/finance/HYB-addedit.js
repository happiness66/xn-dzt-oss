$(function() {
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';

    var fields = [{
        field: 'toUserId',
        title: '申请人',
        required: true,
        type: 'select',
        pageCode: userId ? '802503' : '802500',
        dict: [
            ['type', 'account_kind'],
            ['currency', 'currency_type']
        ],
        params: {
            currencyList: ["HYB"],
            userId: userId,
            updater: ""
        },
        keyName: 'userId',
        valueName: '{{realName.DATA}} - {{typeName.DATA}}--{{currencyName.DATA}}',
        searchName: 'realName',
        readonly: view
    }, {
        field: 'amount',
        title: '充值数量',
        required: true,
        amount: true,
        formatter: moneyFormat,
        readonly: view
    }];

    var options = {
        fields: fields,
        addCode: '802413',
        detailCode: "802416",
        view: view,
        beforeSubmit: function(data) {
            data.fromUserId = OSS.SYS_USER;
            data.fromCurrency = "HYB";
            data.toCurrency = "HYB";
            data.tranAmount = data.amount;
            return data;
        }
    };
    buildDetail(options);
});