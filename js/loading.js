'use strict'

 // setInterval(ajaxRequest, 1000, 'GET','php/request.php/photos/', loadPhotos);
 authentication();
 //setInterval(ajaxRequest, 1000, 'GET','php/request.php/photos/', displayErrors);

 ajaxRequest('GET','php/request.php/photos/',displayPhotos);

function displayPhotos(responseText){
  var data=JSON.parse(responseText);
  for(var i=0;i<data.length;i++){
    /*var div=document.getElementById("div");
    var element;*/
    var div= document.createElement("div");
    var a=document.createElement("a");
    var img=document.createElement("img");
    a.appendChild(img);
    div.appendChild(a);
    div.className="col-xs-2 col-md-2";
    a.href="#";
    a.target="_self";
    a.className="thumbnail";

    img.src=data[i].src;
    img.id="photo-"+data[i].id;
    img.alt=data[i].title;
    img.title = img.alt;
    img.style.width="100%";
    img.addEventListener("click",function(event){
      event.preventDefault();
      var id=event.target.id.substr(6);
      ajaxRequest('GET','php/request.php/photos/'+id,loadPhoto);
    });
    document.getElementById("thumbnails").appendChild(div);
  }
};

function loadPhoto(responseText){
  console.log(responseText);
  var data=JSON.parse(responseText);
  //var div= document.createElement("div");
  //div.className="panel panel-default";
  //div.hinnerHTML='<div class="panel-body"><h2>'+data[i].title+'</h2><div class="row"><div class="col-xs-12 col-md-12"><a href="#" class="thumbnail"><img src="'+data[i].src+'"></a></div></div></div>';
  //document.getElementById("photo").appendChild(div);
  var text="<a href='#' class='thumbnail'><img id="+"photo-"+data[0].id+" src="+data[0].src+"></a>";

  console.log(data[0].id);
  $('#photo2').html(text);
  $('#photo').attr('photoid', data[0].id);
}


function loadPhoto(responseText){
  console.log(responseText);
  var data=JSON.parse(responseText);
  //var div= document.createElement("div");
  //div.className="panel panel-default";
  //div.hinnerHTML='<div class="panel-body"><h2>'+data[i].title+'</h2><div class="row"><div class="col-xs-12 col-md-12"><a href="#" class="thumbnail"><img src="'+data[i].src+'"></a></div></div></div>';
  //document.getElementById("photo").appendChild(div);
  var text="<a href='#' class='thumbnail'><img id="+"photo-"+data[0].id+" src="+data[0].src+"></a>";

  console.log(data[0].id);
  $('#photo2').html(text);
  $('#photo').attr('photoid', data[0].id);
}
