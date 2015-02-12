chrome.browserAction.onClicked.addListener(function() {
  //chrome.windows.create('background.html', {'width': 600, 'height': 380});
    //window.open('background.html', '_blank', 'width=600, height=380, top='+top+', left='+left);
    
        var url = "background.html";
        var title = "Countersign";
        var w = 800;
        var h = 390;
        var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);

});



//function popUp(url) {
//	console.log(url);
//	chrome.windows.create({
//		url: url,
//		type: 'panel',
//		width: 600,
//		height: 380
//	});
//}
//
//chrome.browserAction.onClicked.addListener(function() {
//	var url = "background.html";
//    popUp(url);
//});