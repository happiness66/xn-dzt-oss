$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "所属规格",
        field: "modelSpecsCode",
        type: "select",
        listCode: "620287",
        keyName: "code",
        valueName: "{{name.DATA}}--{{modelName.DATA}}",
        searchName: "name",
        search: true
    }, {
        title: '父类',
        field: 'parentKey',
        type: 'select',
        listCode: '620257',
        keyName: 'dkey',
        valueName: 'dvalue',
        searchName: "dvalue",
        search: true
    }, {
        title: "类别",
        field: "kind",
        type: "select",
        key: "category_kind",
        formatter: Dict.getNameForList("category_kind"),
        search: true
    }, {
        title: '类别英文名称',
        field: 'dkey',
    }, {
        title: '类别中文名称',
        field: 'dvalue'
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '620255',
        deleteCode: '620251',
        searchParams: {
            companyCode: OSS.companyCode
        }
    });
});