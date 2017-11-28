$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'commentName',
        title: '留言人',
        formatter: function(v, data) {
            if (v) {
                return v
            } else if (data.commenter == "0") {
                return "平台"
            }
        }
    }, {
        field: "content",
        title: "内容",
        type: "textarea"
    }, {
        title: "接收人",
        field: "receiveName",
        formatter: function(v, data) {
            if (v) {
                return v
            } else if (data.receiver == "0") {
                return "平台"
            }
        }
    }];

    buildList({
        columns: columns,
        pageCode: '620148',
        searchParams: {
            companyCode: OSS.company,
            type: "0",
            receiver: "0"
        }
    });
    //回复
    $('#replyBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = './complain_addedit.html?code=' + selRecords[0].code + "&receiver=" + selRecords[0].receiver + "&commenter=" + selRecords[0].commenter;
    });
});