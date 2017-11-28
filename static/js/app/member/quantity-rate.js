$(function() {
    var code = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        title: "设置等级",
        field: "level",
        type: "select",
        required: true,
        key: "lt_level"
    }];

    var options = {
        fields: fields,
        code: code,
        code: {
            userId: code
        },
        detailCode: "805121",
        view: view,
    };
    options.buttons = [{
        title: '保存',
        handler: function() {
            var data = {};
            data['userId'] = code;
            data['level'] = $("#level").val();
            reqApi({
                code: "805094",
                json: data
            }).done(function() {
                sucDetail();
            });
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);
});