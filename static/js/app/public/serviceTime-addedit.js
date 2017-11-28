$(function() {
    var code;
    reqApi({
        code: '805917',
        json: {
            ckey: 'serviceTime'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });

    var fields = [{
        title: "服务时间",
        field: 'cvalue',
        required: true
    }, {
        title: '时间',
        field: 'remark',
        hidden: true
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