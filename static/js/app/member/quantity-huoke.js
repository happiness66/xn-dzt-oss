$(function() {
    var userId = getQueryString('userId');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "昵称",
        field: "nickname"
    }, {
        title: '手机号',
        field: 'mobile'
    }, {
        title: "手机号",
        field: "mobileForQuery",
        search: true,
        visible: false
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
        formatter: Dict.getNameForList("user_frequent"),
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
        search: true
    }, {
        title: "注册时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }];
    buildList({
        // router: 'quantity',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            userReferee: userId,
            companyCode: OSS.companyCode
        },
        beforeDetail: function(data) {
            window.location.href = "quantity_addedit.html?v=1&userId=" + data.userId;
        }
    });
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        goBack();
    });
});