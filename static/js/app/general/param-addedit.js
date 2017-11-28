$(function() {
    var code = getQueryString('code');
    var noteConfig = {
        title: '参数值',
        field: 'cvalue',
        required: true
    };
    reqApi({
        code: '805916',
        json: {
            id: code
        },
        sync: true
    }).then(function(data) {
        if (data.ckey == "memIntro" || data.ckey == "memWelfare" || "commend") {
            noteConfig.type = "textarea";
        }
    })

    var fields = [{
        title: '参数键',
        field: 'ckey',
        required: true,
        readonly: true,
        maxlength: 20
    }, noteConfig, {
        title: '参数说明',
        field: 'remark',
        required: true,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: "805910",
        detailCode: '805916',
        editCode: '805911'
    });
});