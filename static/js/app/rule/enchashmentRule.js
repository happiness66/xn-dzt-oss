$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '参数名',
        field: 'ckey',
        search: true
    }, {
        title: '参数值',
        field: 'cvalue',
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: "802025",
        searchParams: {
            type: "0",
            companyCode: OSS.companyCode
        }
    });
});