$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    var accountNumberJYZ;
    var accountNumberHYB;
    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER
        }
    }).done(function(data) {

        accountNumberCNY = data[0].accountNumber;
        $("#amount-CNY").text("￥" + moneyFormat(data[0].amount));
        accountNumberJF = data[1].accountNumber;
        $("#amount-JF").text("￥" + parseInt(data[1].amount / 1000) + ".00");
        accountNumberJYZ = data[2].accountNumber;
        $("#amount-JYZ").text("￥" + moneyFormat(data[2].amount));
        accountNumberHYB = data[3].accountNumber;
        $("#amount-HYB").text("￥" + moneyFormat(data[3].amount));
    });

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER + "_TG"
        }
    }).then(function(data) {
        $("#amount-TG").text("￥" + moneyFormat(data[0].amount));
        accountNumberTG = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY + "&kind=CNY";
    });

    $("#JFls-Btn").click(function() {
        location.href = "ledgerJF.html?accountNumber=" + accountNumberJF + "&kind=JF";
    });
    $("#JYZ-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberJYZ + "&kind=JYZ";
    });
    $("#HYB-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberHYB + "&kind=HYB";
    });
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG + "&kind=TG";
    });
    $("#accouBtn").click(function() {
        window.location.href = 'account_enchashment.html?accountNumber=' + accountNumberTG;
    });

});