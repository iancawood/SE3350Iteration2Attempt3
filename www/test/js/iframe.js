/**
 * Copyright Digital Engagement Xperience 2015
 * Created by  shawn on 15-03-13.
 * @description
 */
/*jslint node: true */
"use strict";


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var iframeTest = {};

iframeTest._source = '';
iframeTest._registeredName = '';

iframeTest.testSendExtractData= function(iframe, origin) {

    var data = {
        type: 'dexit.sdk.xkb.plugins.extractData',
        messageId: guid(),
        name: iframeTest._registeredName
    };
    alert('sending extractData');
    iframe.postMessage(JSON.stringify(data),origin);

};

iframeTest.receiver = function(e) {
    console.log(e);

    var data = JSON.parse(e.data);


    if (data.type === 'dexit.sdk.xkb.plugins.registration') {
        console.log('received registration');
        alert('got registration');
        var source = e.source;
        iframeTest._source = source;
        iframeTest._registeredName = data.data.name;
        setTimeout(function() {
            iframeTest.testSendExtractData(source, e.origin);
        }, 5000)


    }else if (data.type === 'dexit.sdk.xkb.plugins.extractDataResponse') {
        //simulate extract
        console.log("everything is working...successfully received extract data response:"+data.data);
        alert('got extract data response:'+JSON.stringify(data.data));
    }


}





