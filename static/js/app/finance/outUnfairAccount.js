$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号'
    }, {
        field: 'direction',
        title: '方向',
        type: 'select',
        data: {
            '0': '红冲',
            '1': '蓝补'
        },
        search: true
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat
    }, {
        field: 'applyUser',
        title: '申请人'
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核日期',
        formatter: dateTimeFormat,
        field1: 'approveDateStart',
        title1: '审核日期',
        type: 'date',
        field2: 'approveDateEnd',
        twoDate: true,
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'hl_status',
        formatter: Dict.getNameForList('hl_status'),
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '802805',
        searchParams: {
            'channelType': 'out',
            companyCode: OSS.companyCode
        }
    });
    //审核
    $("#examineBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 1) {
            toastr.info("不是可审批的状态");
            return;
        }
        window.location.href = "outUnfairAccount_check.html?Code=" + selRecords[0].code;
    })


});