$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: "所属产品",
        field: "modelCode",
        type: "select",
        listCode: "620012",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        required: true,
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true,
        readonly: view,
        single: true,
        help: "缩略图展示在商品列表页"
    }, {
        title: "广告图",
        field: "advPic",
        type: "img",
        required: true,
        readonly: view,
        help: "广告图商品详情页上面的banner"
    }, {
        title: "图文详述",
        field: "description",
        type: "textarea",
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
        readonly: true,
        type: 'select',
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "下架"
        }
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data: {
            "1": "热门",
            "0": "普通"
        },
        readonly: true
    }, {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        readonly: true
    }]
    if (view) {
        fields = fields.concat(viewList)
    }
    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "620260",
        detailCode: "620271",
        editCode: '620262'
    });
});