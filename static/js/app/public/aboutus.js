$(function() {
    var code;
    reqApi({
        code: "805917",
        json: {
            ckey: "aboutUs"
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });

    var fields = [{
        title: '关于我们',
        field: 'cvalue',
        type: "textarea",
    }, {
        field: 'remark',
        value: "关于我们",
        type: 'hidden'
    }, {
        field: "id",
        value: code,
        hidden: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '805916',
        buttons: [{
            title: "确定",
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = {};
                    data["cvalue"] = $("#cvalue").val();
                    data["remark"] = $("#remark").val();
                    data["id"] = $("#id").val();
                    reqApi({
                        code: "805911",
                        json: data
                    }).done(function() {
                        toastr.info("操作成功");
                    });
                }
            }
        }]
    };
    buildDetail(options);
});