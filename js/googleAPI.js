 $(document).ready(function(){
     var viewWidth = $(window).width();
     var viewHeight = $(window).height();
     var $googlemap = $('#map_canvas');
     $googlemap.css({'width':viewWidth,'height':viewHeight});
     $(window).resize(function(){
         viewWidth = $(window).width();
         viewHeight = $(window).height();
         $googlemap.css({'width':viewWidth,'height':viewHeight});
     });
         var locations = [
       ['북촌1경', 37.579282,126.988577],
       ['북촌2경', 37.583430, 126.989021],
       ['북촌3경', 37.582564, 126.985719],
       ['북촌4경', 37.582596, 126.983034],
       ['북촌5경', 37.582718, 126.983573],
       ['북촌6경', 37.583191, 126.983402],
       ['북촌7경', 37.583292, 126.983036],
       ['북촌8경', 37.584512, 126.982555],
    ];
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 17,
      center: new google.maps.LatLng(37.582524, 126.987640)
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
     
        attachSecretMessage(marker);
    
    } //marker 생성
        
    function attachSecretMessage(mark,eve)
    {
        
     var infowindow = new google.maps.InfoWindow();
        

        
    google.maps.event.addDomListener(mark,'click', function(){
    
        var index=$(arrmarker).index(this);
           
    
        for (i = 0; i < locations.length; i++) { 
            arrmarker[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png');
            arrmarker[i].setAnimation(null);
           
//           mark.infowindow.close();
             setTimeout(function () { infowindow.close(); }, 2000);
           $('#menu1 li').find('a').css('color','black');
        
    } //선택 전 값 초기화
    
            var position = $('#banner .vis_frame').find('div').eq(index).offset(); // 위치값
            $('html,body').animate({ scrollTop : position.top }, 500); // 이동
        
            infowindow.setContent(locations[index][0]);
            infowindow.open(map, mark);
            mark.setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_white.png');
            mark.setAnimation(google.maps.Animation.BOUNCE);
         
          console.log('event doing');
          $('#menu1 li a').eq(index).css('color','red');
      });
        
       if(eve!=null)
        {
           $(mark).trigger('click');
          
        }
      
        /*google.maps.event.addListener(mark, 'click', 
     (function(mark, i)
        {
        return function() {
           
          infowindow.setContent(locations[i][0]);
         
          infowindow.open(map, mark);
mark.setIcon('http://maps.google.com/mapfiles/marker_white.png'); 
     
        
        }
    })(mark, i)); //addListener -말풍선 추가
   */
        
    }
        
    var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#393'
    } 
   var movePath = new google.maps.Polyline({
       path: [
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
        strokeWeight: 2
       ,icons: [{
      icon: lineSymbol,
      offset: '0%'
        }]
   });
     movePath.setMap(map);
       
   $('#menu1').find('a').on('click',function(e){
       var t=$(this);
       
      $('#menu1 li').find('a').css('color','black');
      
       
       $(this).css('color','red');
        var loc=$('#menu1  a').index(t);
 
       attachSecretMessage(arrmarker[loc],"click");
      animateCircle(movePath,index);
       // $(arrmarker[loc]).trigger('click');
   });
       
    var nav = $('#map');
    $(window).scroll(function () {
        var colY = $(this).scrollTop();
        if ($(this).scrollTop() > 1500) {
            nav.addClass("float-menu");
        }else {
            nav.removeClass("float-menu");
        }
        animateCircle(movePath,colY);
    });     
      function animateCircle(line,colY) {
    var count = 0;
          var docHeight = $(document).height();
          var viewHeight = $(window).height();
          var deltaoffset = (colY/docHeight)*100;
          console.log('active');
    /*window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 20);*/
        var icons = line.get('icons');
      icons[0].offset = deltaoffset + '%';
      line.set('icons', icons);
          
}  
        
    });
     