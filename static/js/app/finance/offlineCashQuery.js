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
        title: '金额',
        formatter: moneyFormat
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
        title: '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        search: true,
        twoDate: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status'),
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
        search: true,
        twoDate: true
    }, {
        field: 'payUser',
        title: '回录人',
        formatter: function(v, data) {
            if (v == "CDZT201700000000000001") {
                return 'admin';
            } else {
                return v
            }
        }
    }, {
        field: 'payDatetime',
        title: '回录时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802755',
        searchParams: {
            channelType: '90',
            companyCode: OSS.companyCode,
            statusList: ["2", "4", "5"]
        },
        // singleSelect: false,
        beforeDetail: function(data) {
            location.href = "offlineCash_check.html?code=" + data.code + "&detail=1";
        }
    });

    $("#huiluBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length == 1 && selRecords[0].status == 3) {
            window.location.href = "offlineCash_huilu.html?code=" + selRecords[0].code;
        } else {
            var dataCode = []
            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)
                if (selRecords[i].status != 3) {
                    toastr.info(selRecords[i].code + "状态不能回录!");
                    return;
                }
            }

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量回录</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                fields: [{
                    field: 'payNote',
                    title: '回录说明',
                    required: true,
                    maxlength: 250
                }],
                container: $('#formContainer'),
                buttons: [{
                    title: '通过',
                    handler: function() {
                        var payNote = $("#payNote").val();
                        if (payNote == "") {
                            toastr.warning("回录说明必须填写！")
                        } else {
                            var data = $('#popForm').serializeObject();
                            data.codeList = dataCode;
                            data.payResult = "1";
                            data.payUser = getUserName();
                            data.payNote = payNote;
                            reqApi({
                                code: '802753',
                                json: data
                            }).done(function(data) {
                                toastr.info("操作成功");
                                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                                setTimeout(function() {
                                    dw.close().remove();
                                }, 500)
                            });
                        }
                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var payNote = $("#payNote").val();
                        if (payNote == "") {
                            toastr.warning("回录说明必须填写！")
                        } else {
                            var data = [];
                            data.codeList = dataCode;
                            data.payResult = '0';
                            data.payUser = getUserName();
                            data.payNote = payNote;
                            reqApi({
                                code: '802753',
                                json: data
                            }).done(function(data) {
                                toastr.info("操作成功");
                                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                                setTimeout(function() {
                                    dw.close().remove();
                                }, 500)
                            });
                        }
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

    //审核
    $('#multiCheckBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length == 1 && selRecords[0].status == 1) {
            window.location.href = "offlineCash_check.html?Code=" + selRecords[0].code;
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
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量审核</li></ul>' +
                    '</form>'
            });
            dw.showModal();
            buildDetail({
                fields: [{
                    field: 'approveNote',
                    title: '审核意见',
                    required: true,
                    maxlength: 250
                }],
                buttons: [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.codeList = dataCode;
                        data.approveResult = "1";
                        data.approveUser = getUserName();
                        reqApi({
                            code: '802752',
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
                        data.approveResult = "1";
                        data.approveUser = getUserName();
                        reqApi({
                            code: '802752',
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