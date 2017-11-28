$(function() {
    var commenter = getQueryString('commenter');
    var receiver = getQueryString('receiver');
    var code = getQueryString('code');
    if (commenter == "0") {
        commenter = receiver;
    }

    var commentData = {};
    reqApi({
        code: '620149',
        json: {
            companyCode: OSS.company,
            type: "0",
            receiver: "0",
            commenter: commenter,
            limit: "100",
            start: "0"
        },
        sync: true
    }).then(function(data) {
        commentData = data.list.reverse();
        var html = '';
        commentData.forEach(function(d, i) {
            if (d.commenter == '0') {
                html += '<div class="commenter"><label class="commentTitle">回复人:平台</label>' +
                    '<div class="commentContent" id="content">回复内容:' + d.content + '</div></div>';

            } else {
                html += '<div class="commenter"><label class="commentTitle">留言人:' + d.commentName + '</label>' +
                    '<div class="commentContent" id="content">留言内容:' + d.content + '</div></div>';

            }
        });

        html += '<label  class="commentTitle">回复：</label><textarea id="contentHF" name="content" class="commentReceiver"></textarea><input type="button" id="submit" class="btn margin-left-20 goBack" value="确定">' +
            '<input type="button" id="goBackBtn" class="btn margin-left-20 goBack" value="返回">';
        $('.content').html(html)
        $("#submit").click(function() {
            var content = $("#contentHF").val();
            if (content == "") {
                toastr.warning("回复内容必填");
                return "";
            }

            var data = {};
            data["commenter"] = "0";
            data["content"] = content;
            data["receiver"] = commenter;
            reqApi({
                code: "620141",
                json: data
            }).done(function() {
                sucDetail();
            });
        })
        $("#goBackBtn").click(function() {
            window.location.href = "complain.html";
        });

    });
});