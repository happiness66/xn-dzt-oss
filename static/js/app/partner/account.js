$(function() {
    var accountNumberCNY;
    var kind = getQueryString('kind') || "";

    var accountAmount;
    reqApi({
        code: '802503',
        json: {
            userId: sessionStorage.getItem('userId')
        }
    }).done(function(data) {
        accountAmount = moneyFormat(data[0].amount);
        $("#amount-CNY").text("￥" + accountAmount);
        accountNumberCNY = data[0].accountNumber;
    });


    $("#accouBtn").click(function() {
        window.location.href = 'account_quxian.html?accountNumber=' + accountNumberCNY + "&accountAmount=" + accountAmount + "&kind=" + kind;
    });

    $("#accoutBtn").click(function() {
        if (kind == "Bl") {
            window.location.href = '../finance/ledgerLT.html?accountNumber=' + accountNumberCNY + "&kind=CNY";
        } else {
            window.location.href = '../finance/ledger.html?accountNumber=' + accountNumberCNY + "&kind=CNY";
        }

    });

});