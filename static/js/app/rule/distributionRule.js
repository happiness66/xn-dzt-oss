$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'ckey',
        title: '参数键',
        search: true
    }, {
        field: 'cvalue',
        title: '参数值'
    }, {
        field: 'remark',
        title: '参数说明'
    }];
    buildList({
        router: "memberRule",
        columns: columns,
        pageCode: '620915',
        searchParams: {
            companyCode: OSS.companyCode,
            type: "3"
        }
    });
});