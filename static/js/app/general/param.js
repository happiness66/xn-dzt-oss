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
        router: 'param',
        columns: columns,
        pageCode: '805915',
        searchParams: {
            type: "1"
        }
    });
});