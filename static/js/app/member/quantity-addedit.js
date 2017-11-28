$(function() {
    var code = getQueryString('userId');
    var view = !!getQueryString('v');
    var mobileView = {
        field: 'mobile1',
        title: "登录名/手机号",
        readonly: true,
        formatter: function(v, data) {
            return data.mobile
        }
    };
    var mobileEdit = {
        field: 'mobile',
        title: "登录名/手机号",
        mobile: true,
        required: true
    };
    if (code) {
        mobileView.hidden = false;
        mobileEdit.hidden = true;
    } else {
        mobileView.hidden = true;
    }

    var fields = [{
        field: "userReferee",
        value: sessionStorage.getItem('userId'),
        type: "hidden",
        required: true
    }, {
        field: "kind",
        value: 'B',
        type: 'hidden',
        required: true
    }, mobileView, mobileEdit, {
        field: 'realName',
        title: "量体师姓名",
        maxlength: 32,
        required: true,
        readonly: view
    }, {
        field: 'province1',
        title: '辖区',
        required: true,
        type: "citySelect",
        readonly: view,
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
        field: 'idNo',
        idCard: true,
        title: '身份证号码',
        required: true,
        readonly: view
    }];

    var options = {
        fields: fields,
        code: code,
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
                data.loginName = $("#mobile").val();
                return data
            }
        }
    };

    buildDetail(options);
});