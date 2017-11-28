$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'parentKey',
        title: '种类',
        search: true,
        type: 'select',
        listCode: '620906',
        params: {
            type: 0
        },
        keyName: 'dkey',
        valueName: 'dvalue'
    }, {
        field: 'dkey',
        title: '字典键'
    }, {
        field: 'dvalue',
        title: '体型信息'
    }, {
        title: '是否必填',
        field: 'remark',
        type: "select",
        data: {
            "1": "是",
            "0": "否"
        }
    }];
    buildList({
        columns: columns,
        pageCode: '620905',
        searchParams: {
            companyCode: OSS.companyCode
        }
    });
});