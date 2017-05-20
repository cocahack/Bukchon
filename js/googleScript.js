function initGoogleMap(viewWidth,location){ 
var locations = location;
var zoomLevel ;
    if(viewWidth>=1025&&viewWidth<1440){
        zoomLevel = 16;
    }
    else{
        zoomLevel = 17;
    }
    var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: zoomLevel,
      center: new google.maps.LatLng(37.581753, 126.989358)
      ,mapTypeId: google.maps.MapTypeId.ROADMAP
      ,draggable: false
      ,disableDefaultUI: true
      ,disableDoubleClickZoom: false
      ,draggableCursor: false
      ,keyboardShortcuts: false
      ,scrollwheel:false
    });    

     var marker;
     var arrmarker=[];    
     var i;
       
    for (i = 0; i < locations.length; i++) { 
       marker= new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon:'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png'
       });
        arrmarker.push(marker);
     
        attachSecretMessage(marker,null,arrmarker,locations,map);
    
    } //marker 생성
        
   
    var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#393'
    } 
    var polylineOption ={
       path: [
           {lat:37.579231, lng:126.985121}, // jaedong
           {lat:37.579078,lng: 126.985202},
           {lat:37.579295, lng:126.986291},
       {lat:37.579282,lng:126.988577} // view1
        ,{lat:37.5792876, lng:126.989249}
        ,{lat:37.583430,lng:126.989021} //view2
        ,{lat:37.583801, lng:126.988968}  
        ,{lat:37.582917, lng:126.989226}
        ,{lat:37.583111, lng:126.986445}
        ,{lat:37.582797, lng:126.986187}
        ,{lat:37.582564, lng:126.985719} //view3
        ,{lat:37.581874, lng:126.985748}
        ,{lat:37.581717, lng:126.985040}
        ,{lat:37.581409, lng:126.985048}
       ,{lat:37.582596,lng:126.983034} // view4
        ,{lat:37.582718,lng:126.983573}//view5
        ,{lat:37.583191,lng:126.983402}//view6
        ,{lat:37.583292,lng:126.983036}//view7
        ,{lat:37.584512,lng:126.982555}//view8
    ]
       ,geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons:[{icon: lineSymbol,offset: '0%'}]
   };
   var movePath = new google.maps.Polyline(polylineOption);
     movePath.setMap(map);
    var returnobject = [map,arrmarker,movePath];
    return returnobject;
     }  
     function attachSecretMessage(mark,event,arrmarker,locations,map)
    {
        
     var infowindow = new google.maps.InfoWindow();
        

    google.maps.event.addDomListener(mark,'click', function(){
    
        var index=$(arrmarker).index(this);
    
        for (i = 0; i < locations.length; i++) { 
            arrmarker[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png');
            arrmarker[i].setAnimation(null);
             setTimeout(function () { infowindow.close(); }, 2000);
        
            } //선택 전 값 초기화
        
            infowindow.setContent('<span style="color:black">'+locations[index][0]+'</span>');
            infowindow.open(map, mark);
            mark.setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_white.png');
            mark.setAnimation(google.maps.Animation.BOUNCE);
      });
        
       if(event!=null)
        {
           $(mark).trigger('click');
          
        }
    }