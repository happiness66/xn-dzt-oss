$(function() {
    var code = getQueryString('userId');
    var view = !!getQueryString('v');

    var loginNameView = {
        field: 'loginName1',
        title: "登录名",
        readonly: true,
        formatter: function(v, data) {
            return data.loginName
        }
    };
    var loginNameEdit = {
        field: 'loginName',
        title: "登录名",
        maxlength: 32,
        required: true
    };

    if (code) {
        loginNameView.hidden = false;
        loginNameEdit.hidden = true;
    } else {
        loginNameView.hidden = true;
    }


    var fields = [{
            field: "kind",
            value: "PA",
            type: "hidden",
            required: true
        }, loginNameView, loginNameEdit,
        {
            field: 'realName',
            title: "合伙人姓名",
            maxlength: 32,
            required: true,
            readonly: view
        }, {
            field: 'province1',
            title: '辖区',
            required: true,
            type: 'citySelect',
            afterSet: function(v, data) {
                if (code) {
                    if (data.province == data.city && data.city == data.area) {
                        data.city = "";
                        data.area = "";
                    } else if (data.province == data.city && data.city != data.area) {
                        data.city = data.area;
                    }
                    $('#province').val(data.province);
                    $("#province").trigger("change");
                    data.city && $('#city').val(data.city);
                    data.area && $('#area').val(data.area);
                    data.city ? $('#city').trigger('change') : $('#province').trigger('change');
                    data.area && $('#area').val(data.area);
                }
            }
        }, {
            field: 'mobile',
            title: '手机号',
            mobile: true,
            required: true,
            readonly: view
        }, {
            field: 'idNo',
            idCard: true,
            title: '身份证号码',
            required: true,
            readonly: view
        }
    ];

    var options = {
        fields: fields,
        code: {
            userId: code
        },
        addCode: '805042',
        editCode: "805095",
        detailCode: "805121",
        view: view,
        beforeSubmit: function(data) {
            if (code) {
                data.userId = code;
                return data;
            } else {
                return data
            }
        }
    };
    buildDetail(options);

});