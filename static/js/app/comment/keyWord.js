$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'word',
        title: '关键字',
        search: true
    }, {
        field: 'updater',
        title: '最近修改人'
    }, {
        field: 'updateDatetime',
        title: '最近修改时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];


    buildList({
        columns: columns,
        pageCode: "620155",
        deleteCode: "620151",
        getImportData: function(list) {
            var reqList = list;
            for (var i = 0, length = reqList.length; i < length; i++) {
                reqList[i].updater = getUserName();
                reqList[i].weight = "1";
                reqList[i].level = "0";
                reqList[i].reaction = "3";
            }
            reqApi({
                code: "620153",
                json: { reqList: reqList }
            }).then(function() {
                sucList();
            })

        }
    });
});