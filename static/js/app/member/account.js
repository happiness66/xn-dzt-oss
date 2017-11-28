$(function() {
    var userId = getQueryString('userId') || '';
    var kind = getQueryString('kind') || '';
    var searchParams;
    if (kind == "C") {
        searchParams = {
            userId: userId
        }
    } else {
        searchParams = {
            userId: userId,
            currency: "CNY"
        }
    }

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名'
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'currency_type',
        formatter: Dict.getNameForList('currency_type')
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amount',
        title: '余额',
        formatter: moneyFormat
    }, {
        field: 'frozenAmount',
        title: '冻结金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'account_status',
        formatter: Dict.getNameForList('account_status')
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'account',
        columns: columns,
        pageCode: '802503',
        searchParams: searchParams
    });


    $('.tools .toolbar').html('<li style="display:block;" id="ledgerBtn"><span><img src="/static/images/t01.png"></span>查看明细</li><li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>');

    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "ledger.html?accountNumber=" + selRecords[0].accountNumber + "&kind=" + selRecords[0].currency;
    });
    $('#goBackBtn').click(function() {
        if (kind == "B") {
            window.location.href = "quantity.html";
        } else if (kind == "C") {
            window.location.href = "custom.html";
        } else if (kind == "PA") {
            window.location.href = "partner.html";
        }
    });
});