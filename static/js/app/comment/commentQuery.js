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
        search: true,
        data: {
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过"
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
        router: 'comment',
        columns: columns,
        pageCode: "620170",
        searchParams: {
            companyCode: OSS.company,
            statusList: ["A", "B", "C"]
        }
    });
})