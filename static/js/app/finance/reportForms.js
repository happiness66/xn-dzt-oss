$(function() {


    reqApi({
        code: '802900',
        json: {
            "bizTypeList": ["GW", "HYCZ"],
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-totle").text("￥" + moneyFormat(data.totalAmount));
    });
    reqApi({
        code: '802900',
        json: {
            "bizTypeList": ["GW", "HYCZ"],
            "accountNumber": "DZTA2017100000000000003"
        }
    }).done(function(data) {
        $("#amount-totleHYB").text("￥" + moneyFormat(data.totalAmount));
    });

    reqApi({
        code: '802900',
        json: {
            "bizType": "11",
            "accountNumber": OSS.companyCode
        }
    }).done(function(data) {
        $("#amount-access").text("￥" + moneyFormat(data.totalAmount));
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "HHRFC",
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-Hhaccess").text("￥" + moneyFormat(data.totalAmount));
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "LTSFC",
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-ltaccess").text("￥" + moneyFormat(data.totalAmount));
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "GWTK",
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-quaccess").text("￥" + moneyFormat(data.totalAmount));
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "-11",
            "accountNumber": OSS.companyCode
        }
    }).done(function(data) {
        $("#amount-quxianaccess").text("￥" + moneyFormat(data.totalAmount));
    });
    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER
        }
    }).done(function(data) {
        $("#amount-PTquaccess").text("￥" + moneyFormat(data[0].amount));
    });
});