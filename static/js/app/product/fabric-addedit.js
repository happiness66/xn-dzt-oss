$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: "所属规格",
        field: "modelSpecsCode",
        type: "select",
        listCode: "620287",
        keyName: "code",
        valueName: "{{name.DATA}}--{{modelName.DATA}}",
        searchName: "name",
        required: true,
        readonly: view,
        help: "第一列是规格名称，第二列是他所属的产品"
    }, {
        title: "品牌",
        field: "brand",
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: "产地",
        field: "area",
        type: "select",
        key: "produce_area",
        required: true,
        readonly: view
    }, {
        title: "类型",
        field: "type",
        type: "select",
        key: "fabric_type",
        required: true,
        readonly: view
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true,
        single: true,
        readonly: view,
        help: "缩略图展示在商品列表页"
    }, {
        title: "广告图",
        field: "advPic",
        type: "img",
        required: true,
        readonly: view,
        help: "广告图商品详情页上面的banner"
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        title: "色系",
        field: "color",
        type: "select",
        key: "fabric_color",
        required: true,
        readonly: view
    }, {
        title: "花色",
        field: "flowers",
        type: "select",
        key: "fabric_design",
        required: true,
        readonly: view
    }, {
        title: "成分",
        field: "form",
        type: "select",
        key: "fabric_divide",
        required: true,
        readonly: view
    }, {
        title: "规格编号",
        field: "modelNum",
        maxlength: 255,
        required: true,
        readonly: view,
        help: "请输入面料唯一的规格编号，用于识别面料"
    }, {
        title: "纱支",
        field: "yarn",
        type: "select",
        key: "fabric_yarn",
        required: true,
        readonly: view
    }, {
        title: "重量(g)",
        field: "weight",
        maxlength: 255,
        required: true,
        readonly: view
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255,
        readonly: view
    }];
    var viewList = [{
        field: 'status',
        title: '状态',
        readonly: view,
        type: 'select',
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "下架"
        }
    }]
    if (view) {
        fields = fields.concat(viewList)
    }
    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "620020",
        detailCode: "620031",
        editCode: '620022'
    });
});