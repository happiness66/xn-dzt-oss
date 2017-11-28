$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
    }, {
        field: 'accountName',
        title: '户名',
        search: true
    }, {
        field: 'amount',
        title: '充值金额',
        formatter: moneyFormat
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        data: {
            "CNY": "人民币"
        }
    }, {
        field: 'channelType',
        title: '支付渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type')
    }, {
        field: 'payCardInfo',
        title: '开户行'
    }, {
        field: 'payCardNo',
        title: '银行卡号',
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
        title: '申请日期',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请日期',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }, {
        field: 'payUser',
        title: '审核人'
    }, {
        field: 'payDatetime',
        title: '审核日期',
        formatter: dateTimeFormat,
        field1: 'payDateStart',
        title1: '审核日期',
        type: 'date',
        field2: 'payDateEnd',
        search: true,
        twoDate: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'charge_status',
        formatter: Dict.getNameForList('charge_status'),
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '802705',
        searchParams: {
            channelType: '90',
            companyCode: OSS.companyCode,
            currency: "CNY"
        },
        beforeDetail: function(data) {
            location.href = "offlineRecharge_check.html?code=" + data.code + "&detail=1";
        }
    });
    //审核
    $('#multiCheckBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 && selRecords[0].status == 1) {
            window.location.href = "offlineRecharge_check.html?Code=" + selRecords[0].code;
        } else {
            var dataCode = []
            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 1) {
                    toastr.info(selRecords[i].code + "状态不能审核!");
                    return;
                }
            }

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量支付</li></ul>' +
                    '</form>'
            });

            dw.showModal();
            buildDetail({
                fields: [{
                    field: 'payNote',
                    title: '审核意见',
                    required: true,
                    maxlength: 250
                }],
                buttons: [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.codeList = dataCode;
                        data.payResult = "1";
                        data.payUser = getUserName();
                        reqApi({
                            code: '802701',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");

                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var data = [];
                        data.codeList = dataCode;
                        data.payResult = "1";
                        data.payUser = getUserName();
                        reqApi({
                            code: '802701',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");
                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });

            dw.__center();
        }
    });
});