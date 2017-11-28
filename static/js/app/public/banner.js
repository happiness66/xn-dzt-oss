$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "belong",
        title: '类型',
        type: "select",
        data: {
            "0": "C端用户",
            "1": "量体师端用户"
        },
    }, {
        title: 'banner名称',
        field: 'name',
        search: true
    }, {
        title: '位置',
        field: 'location',
        formatter: function(v) {
            if (v == "index_banner") {
                return '首页';
            }
        },

    }, {
        title: '顺序',
        field: 'orderNo',

    }, {
        title: '备注',
        field: 'remark',
    }];
    buildList({
        router: 'banner',
        columns: columns,
        pageCode: '805805',
        deleteCode: '805801',
        searchParams: {
            companyCode: 0,
            type: 2,
            systemCode: "CD-CLW000005",
        }
    });

});