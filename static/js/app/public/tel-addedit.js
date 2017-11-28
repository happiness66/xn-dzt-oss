$(function() {
    var code;
    reqApi({
        code: '805917',
        json: {
            ckey: 'telephone'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });

    var fields = [{
        field: 'cvalue',
        title: '服务热线',
        required: true
    }, {
        title: '服务热线',
        field: 'remark',
        type: "hidden"
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '805916',
        buttons: [{
            title: '保存',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['id'] = data['code'];
                    reqApi({
                        code: '805911',
                        json: data
                    }).done(function(data) {
                        toastr.success('操作成功');
                    });
                }
            }
        }]
    };

    buildDetail(options);
});