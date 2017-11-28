$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '针对内容',
        field: 'name'
    }, {
        field: 'content',
        title: '评论内容',
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "D": "被过滤"
        }
    }, {
        field: 'commerRealName',
        title: '评论人'
    }, {
        field: 'commentDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: "620170",
        searchParams: {
            companyCode: OSS.company,
            status: "D"
        },
        //审核
        beforeEdit: function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            window.location.href = 'comment_addedit.html?code=' + selRecords[0].code;
        }
    });

})