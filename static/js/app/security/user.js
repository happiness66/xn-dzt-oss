$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'loginName',
        title: '用户名',
        search: true
    }, {
        field: 'status',
        title: '状态',
        formatter: Dict.getNameForList('user_status'),
        type: 'select',
        key: 'user_status'
    }, {
        field: 'roleCode',
        title: '角色',
        type: 'select',
        listCode: '805021',
        keyName: 'code',
        valueName: 'name'
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        router: 'user',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: 'P',
            companyCode: OSS.companyCode
        }
    });
    //设置角色
    $('#assignBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "user_role.html?userId=" + selRecords[0].userId + "&loginName=" + encodeURI(encodeURI(selRecords[0].loginName)) + "&kind=" + selRecords[0].kind;
    });
    //修改
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "user_role.html?userId=" + selRecords[0].userId + "&loginName=" + encodeURI(encodeURI(selRecords[0].loginName)) + "&kind=" + selRecords[0].kind;
    });
    //重置
    $('#resetBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        location.href = "user_pwd_reset.html?userId=" + selRecords[0].userId + '&loginName=' + selRecords[0].loginName;
    });
    //注销
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var status = selRecords[0].status,
            toStatus;
        status == 0 ? toStatus = 2 : toStatus = 0;
        reqApi({
            code: '805091',
            json: {
                userId: selRecords[0].userId,
                toStatus: toStatus
            }
        }).then(function() {
            sucList();
        });
    });
    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        reqApi({
            code: '805091',
            json: {
                userId: selRecords[0].userId,
                toStatus: '0'
            }
        }).then(function() {
            sucList();
        });
    });

});