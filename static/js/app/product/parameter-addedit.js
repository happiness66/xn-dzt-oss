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
        onChange: function(v, data) {
            reqApi({
                code: '620257',
                json: {
                    modelSpecsCode: v
                },
                sync: true
            }).done(function(d) {
                var data1 = {};
                if (d.length && v) {
                    d.forEach(function(v, i) {
                        data1[v.dkey] = v.dvalue;
                    })
                }
                $("#type").renderDropdown2(data1);
            });
        },
        help: "第一列是规格名称，第二列是他所属的产品"
    }, {
        field: 'type',
        title: '工艺类型',
        type: "select",
        required: true,
        formatter: function(v, data) {
            if (view != null) {
                return data.productCategoryName;
            } else {
                return v
            }
        }
    }, {
        title: "是否撞色",
        type: "select",
        field: "isHit",
        defaultValue: "0",
        data: {
            "0": "否",
            "1": "是"
        },
        required: true,
        help: "例：无口袋工艺不需要颜色撞色，则选“无”；<br>标准口袋工艺需要颜色撞色则选“是”。"
    }, {
        title: "是否默认",
        type: "select",
        field: "isDefault",
        defaultValue: "0",
        data: {
            "0": "否",
            "1": "是"
        },
        required: true
    }, {
        title: "工艺名称",
        field: "name",
        maxlength: 255,
        required: true
    }, {
        title: "工艺费",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true
    }, {
        title: "工艺图片",
        field: "pic",
        type: "img",
        required: true,
        single: true
    }, {
        title: "工艺选中图片",
        field: "selected",
        type: "img",
        required: true,
        single: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
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
    }]
    if (view) {
        fields = fields.concat(viewList)
    }
    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "620040",
        detailCode: "620051",
        editCode: '620042'
    });

});