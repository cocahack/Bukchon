function resizeWidth(target,mul){
    viewWidth = $(window).width();
    target.css('width',viewWidth*mul);
}
function resizeHeight(target){
    viewHeight = $(window).height();
    target.css('height',viewHeight);
}
function nextMove(){
    var $allLi = $('#carousel li');
    var $targetInner = $('#carouselInner'); 
    var w = $('#carousel img').outerWidth(true);
    $targetInner.animate({left:(w*-1)+"px"},2000, 'easieEaseIn', function(){
        $allLi.first().appendTo($targetInner);
                $(this).css({left:0+"px"});  
  });
}
function placement(target,h,viewWidth,viewHeight,option){
    if(viewWidth/viewHeight<=1.5){
        target.css({'top':(viewWidth*(2/3))*(3/4)});        
    }
    else{
        target.css({'top':$mainImage.outerHeight()-h-option});  
    }
}
function animateNav(blockIndex,animationType){
    $navli = $('#menu1 li');
    if(animationType==null||animationType=='reduce'){
        $navli.eq(blockIndex).find('div').animate(
        {scale:0.5},
        {   
            duration: 400
            ,easing: 'swing'
            ,step:function(now,fx) {
                scaleVal  = now;
                fx.start = 1;
            $(this).css({'-webkit-transform':'scale('+scaleVal+')','-moz-transform':'scale('+scaleVal+')','-ms-transform':'scale('+scaleVal+')'}); 
            }
        }
    );    
    }
    else if(animationType=='expand'){
        $navli.eq(blockIndex).find('div').animate(
        {scale:1},
        {   
            duration: 400
            ,easing: 'swing'
            ,step:function(now,fx) {
                scaleVal  = now;
                fx.start = 0.5;
            $(this).css({'-webkit-transform':'scale('+scaleVal+')','-moz-transform':'scale('+scaleVal+')','-ms-transform':'scale('+scaleVal+')'}); 
            }
        }
    );    
    }
}
function calY(coordinateY){
    var blockIndex;
    $(locY).each(function(index,item){
        if(item==coordinateY){
            blockIndex = index;
            return false;
        }
        else if(item>coordinateY){
            blockIndex = index-1;
            return false;
        }
        blockIndex = index;
    });
    return blockIndex;
}
var viewWidth, viewHeight, h, $mainImage, locY;
$(document).ready(function(){
//    scrollSpeed();
    scrollAnimation();
    // declare a variable 
    var $wrap = $('#wrap');
    var $block = $('.block');
    var $introduction = $('#introduction');
    var $body = $('body');
    var $scrollarea = $('.scrollarea');
    var $googlemap = $('#map_canvas');
    var $menu1 = $('#menu1');
    var $plus = $('.plus');
    var $navli;
    var $closeModeless = $('#closeModeless');
    var $targetViews;
    var $targetViewsModaless;
    var returnobj;
    var map ;
    var arrmarker ;
    var movePath;
    var anchorFlag = false;
    var moveAfterFlag = false;
    var locations = [
       ['Jaedong Tourist information centers',37.579231, 126.985121],
       ['Bukchon 1 view', 37.579282,126.988577],
       ['Bukchon 2 view', 37.583430, 126.989021],
       ['Bukchon 3 view', 37.582564, 126.985719],
       ['Bukchon 4 view', 37.582596, 126.983034],
       ['Bukchon 5 view', 37.582718, 126.983573],
       ['Bukchon 6 view', 37.583191, 126.983402],
       ['Bukchon 7 view', 37.583292, 126.983036],
       ['Bukchon 8 view', 37.584512, 126.982555],
    ];
    $body.on('selectstart',function(){
        return false;
    });
    // initialize
    var $introBlock = $('#introduction');
    viewWidth = $(window).width();
    viewHeight = $(window).height();
    $mainImage = $('#carouselInner img');
    $('#logo').css('fontSize',viewWidth/21+'px');
    //width, height 조정
//    if(viewWidth/viewHeight<1.5)//모바일
    if(viewWidth<1025)
    {
        $('#mobilemenu ul').css('height',viewHeight);
        $mainImage.css('width',$('#carousel').width());
        $('#carouselInner').css('width',viewWidth*3);
        h = $mainImage.outerHeight()-viewHeight;
        placement($('#logo'),h,viewWidth,viewHeight,150);
        $(window).off('scroll');
        $googlemap.css({'width':0,'height':0});
        $('.modaless ._background').css('width',viewWidth);
        $('._modal img').css('width',viewWidth);
        $('._modal ul li').css('width',viewWidth);
        $('.modalessBG').css({'width':viewWidth,'height':viewHeight});
        $('#section1').css('top',0);
    }
    else{     
       returnobj = initGoogleMap(viewWidth,locations);
       map = returnobj[0];
       arrmarker = returnobj[1];
       movePath = returnobj[2]; $('.block,.scrollarea,.modalessBG').css({'width':viewWidth,'height':viewHeight});
//        $scrollarea.css({'width':viewWidth,'height':viewHeight});
        $mainImage.css('width',$('#carousel').width());
        $('#carouselInner').css('width',viewWidth*3);
        h = $mainImage.outerHeight()-viewHeight;
        placement($('#logo'),h,viewWidth,viewHeight,150);
        placement($('#linkset'),h,viewWidth,viewHeight,175);
        $('#section1').css('top',($introBlock.height()/2)-($('#section1').outerHeight()/2)-30);
         $('.modaless ._background').css('width','768');
        $('._modal img').css('width','768');
        $('._modal ul li').css('width','768');
        $('#footerWrap').css('margin-left',(viewWidth-$('#footerWrap').width())/2+50);
    }
        if(viewWidth>768&&viewWidth<1025){
            $('.modaless ._background').css('width','650');
            $('._modal img').css('width','650');
            $('._modal ul li').css('width','650');
        }
    var eleWidth= $("._modal ul li").width();
    $('#menu1').css('height',$('#menu1>ul').height());
        $menu1.css({'top':(viewHeight/2)-($('#menu1>ul').outerHeight()/2),'right':0,'bottom':0});
        $('#introduction li').css({'width':viewWidth});
        $('#intro_carousel').css('width',viewWidth*2);
        $('#introduction>a').css('top',$introBlock.height()-200);
    //resize
    $( window ).resize(function(){
        $('#logo').css('fontSize',viewWidth/21+'px');
            resizeWidth($mainImage,1);
            resizeWidth($('#carouselInner'),3);
        locY = [];
    var tempLoc = 0;
    $(arrBlock).each(function(index,item){
        tempLoc = $(item).offset().top;
        locY.push(tempLoc); 
    });
//            if()
        if(viewWidth>768&&viewWidth<1025){
            $('.modaless ._background').css('width','650');
            $('._modal img').css('width','650');
            $('._modal ul li').css('width','650');
            eleWidth = 650;
        }
        else{
            $('.modaless ._background').css('width',viewWidth);
                $('._modal img').css('width',viewWidth);
                $('._modal ul li').css('width',viewWidth);
        }
            if(viewWidth<1025)
            {
                $('#section1').css('top',0);
                $(window).off('scroll');
                $('#main').removeAttr('style');
                $('#wrap>div').eq(1).removeClass('block');
                $('#wrap>div').eq(1).removeAttr('style');
//                $block.css({'width':viewWidth,'height':viewWidth*(2/3)});
//                $('#wrap>div').removeAttr('style');
                $block.removeAttr('style');
                resizeWidth($block,1);
                $('#introduction li').css({'width':viewWidth});
                $googlemap.css({'width':0,'height':0});
                $('#footerWrap').removeAttr('style');
            }
            /*else if(viewWidth>1024&&viewWidth/viewHeight<1.5){
                $block.css({'width':viewWidth,'height':viewWidth*(2/3)});
                returnobj = initGoogleMap(viewWidth,locations);
                map = returnobj[0];
                arrmarker = returnobj[1];
                movePath = returnobj[2];
                $googlemap.css({'width':viewWidth,'height':viewHeight});
                $('#wrap>div').removeAttr('style');
                $('.modaless ._background').css('width','768');
        $('._modal img').css('width','768');
        $('._modal ul li').css('width','768');
            }*/
            else{
                scrollAnimation();
                returnobj = initGoogleMap(viewWidth,locations);
                map = returnobj[0];
                arrmarker = returnobj[1];
                movePath = returnobj[2];
                $googlemap.css({'width':viewWidth,'height':viewHeight});
                $('#section1').css('top',($introBlock.height()/2)-($('#section1').outerHeight()/2)-30);
                resizeWidth($block,1);
                resizeHeight($block);  
                $('#footerWrap').css('margin-left',(viewWidth-$('#footerWrap').width())/2+50);
            }
            $menu1.css('top',(viewHeight/2)-($('#menu1>ul').outerHeight()/2));
            h = $mainImage.outerHeight()-viewHeight; 
            placement($('#logo'),h,viewWidth,viewHeight,150);
            placement($('#linkset'),h,viewWidth,viewHeight,175);
            $('#introduction li').css({'width':viewWidth});
            $('#intro_carousel').css({'width':viewWidth*2,'left':0});
            $('#introduction>a').css('top',$('#introduction').height()-200);
            $('#intro_left').css('visibility','hidden');
            $('#intro_right').css('visibility','visible');
            eleWidth= $("._modal ul li").width();
    });
    //main carousel move
    var settingInterval = setInterval(function(){
        nextMove();
    },4000);
    //a 이벤트 제거
    $('#introduction a').click(function(e){
        e.preventDefault();
    });
    //intro slider
    $('#intro_left').css('visibility','hidden');
    $('#intro_left').on('click keypress',function(){
        $('#intro_carousel').animate({left:0+"px"},2000, 'easieEaseIn', function(){});
        $(this).css('visibility','hidden');
        $('#intro_right').css('visibility','visible');
    });
    $('#intro_right').on('click keypress',function(){
        $('#intro_carousel').animate({left:(viewWidth*-1)+"px"},2000, 'easieEaseIn', function(){});
        $(this).css('visibility','hidden');
        $('#intro_left').css('visibility','visible');
    });  
    // get block height
    var arrBlock = $('#wrap>.block');
//    locY = [0];
    locY = [];
    var tempLoc = 0;
    $(arrBlock).each(function(index,item){
        tempLoc = $(item).offset().top;
        locY.push(tempLoc); 
    });
 var coordinateY = $(document).scrollTop();
    var beforeNav = calY(coordinateY);//index 리턴
    //nav circle animate
    animateNav(beforeNav,'reduce');
    $(document).on('scroll',function(){
        coordinateY = $(document).scrollTop();
        var currentIndex = calY(coordinateY);
        if(beforeNav>currentIndex){
            animateNav(beforeNav,'expand');
            animateNav(currentIndex,'reduce');
            beforeNav = currentIndex;
        }
        else if(currentIndex>beforeNav){
            animateNav(beforeNav,'expand');
            animateNav(currentIndex,'reduce');
            beforeNav = currentIndex;
        }
    
    });
    // nav text animate 
    $navText = $('#menu1 a');
    $navText.on('focus mouseover',function(){
        $(this).find('span').animate({opacity:1},500,'swing');
    });
    $navText.on('blur mouseleave',function(){
        $(this).find('span').animate({opacity:0},500,'swing');
    });
    // google map api
     $googlemap.css({'width':viewWidth,'height':viewHeight});
     $(window).resize(function(){
         viewWidth = $(window).width();
         viewHeight = $(window).height();
         $googlemap.css({'width':viewWidth,'height':viewHeight});
     });
    
   $menu1.find('a').on('click',function(e){
       var t=$(this);
       anchorFlag = true;
       moveAfterFlag = true;
       $('html, body').animate({
           scrollTop: $( $.attr(this, 'href') ).offset().top
       }, 1000,'swing'
        ,function(){
           anchorFlag=false;
           $('html, body').animate({
           scrollTop: colY+1
       }, 10,'swing',function(){moveAfterFlag = false;});   
       });
       
       var loc=$('#menu1 a').index(t)-1;
        
       attachSecretMessage(arrmarker[loc],"click",arrmarker,locations,map);
      animateCircle(movePath);
       return false;
   });
    var $views = $('.views');
    var wrapChild = $('#wrap>div');
//    var startHeight = wrapChild.eq(0).height()+wrapChild.eq(1).height();
    var startHeight = $googlemap.offset().top;
    var nav = $('#map');
    var scrollFlag = false;
    
    var scrollOffset = [[0,15.95]
                        ,[15.95,42.2]
                        ,[42.2,66.05]
                        ,[66.05,85.9]
                        ,[85.9,88.55]
                        ,[88.55,91.2]
                        ,[91.2,92.9]
                        ,[92.9,100]
                       ];
    var scrollareaY = [];
     var setOffset;
    var scope = [];
    $scrollarea.each(function(index,item){
        scrollareaY.push($(item).offset().top-$googlemap.height());
    });
     var viewsCoordinateY=[];
    var viewsCoordinateEndY = [];
    var effectFlag = false;
    $views.each(function(index,item){
         viewsCoordinateY.push($(item).offset().top-$googlemap.height());
        viewsCoordinateEndY.push($(item).offset().top);
     });
    var viewsIndex;
    var colY;
    function scrollAnimation(){
        $(window).scroll(function () {
        colY = $(this).scrollTop();
        if($(this).scrollTop()>=$($scrollarea[0]).scrollTop()&&$(this).scrollTop()<$($scrollarea[0]).scrollTop()+200){
            $(arrmarker[0]).trigger('click');
        }
        if ($(this).scrollTop() >  startHeight) {
            $menu1.find('span').css('color','#0f0e0a');
            $(viewsCoordinateY).each(function(index,item){
               /*if(item-colY>0&&item-colY<200){
                   blockWheel();
                   $('html body').animate({scrollTop:item+1},400,'swing',playWheel());
               }*/ if(colY>=item&&colY<=viewsCoordinateEndY[index]&&effectFlag==false&&anchorFlag==false){
                    $googlemap.addClass('bgblack')
                              .animate({'opacity':0.4},400,'swing');
                    $(arrmarker[index+1]).trigger('click');
                    effectFlag = true;
                }
            });
        // Google Map BG black effect
            $('#map_wrapper').css({'position':'fixed','top':0});
            
            $(scrollareaY).each(function(index,item){
            var itemend = item+$scrollarea.height();
            if(colY>item&&colY<itemend){
                if(effectFlag==true&&moveAfterFlag==false){
                $googlemap.removeClass('bgblack')
                              .animate({'opacity':1},400,'swing');
                    effectFlag=false;
                }
                setOffset = scrollOffset[index];
                scope=[item,itemend];
                return false;
            }
            });
            if(scrollFlag==false){
                /*polylineOption.icons = [{icon: lineSymbol,offset:   setOffset[0]+'%'}];
                movePath = new google.maps.Polyline(polylineOption);
                movePath.setMap(map);*/
                scrollFlag = true;
            }
            animateCircle(movePath,colY);
        }
        else{
            $('#map_wrapper').css({'position':'static'});
            $menu1.find('span').css('color','lightgrey');
            scrollFlag = false;
        }
        
    });    
    }
      function animateCircle(movePath,colY) {
//          var endHeight = $(document).height()-$wrap.find('div').last().height();
//          var scopeScroll = endHeight-startHeight;
//          var deltaoffset = ((colY-startHeight)/scopeScroll)*100;
          if(colY>=scope[0]&&colY<=scope[1]){
              var icons = movePath.get('icons');
              var offsetScope = setOffset[1]-setOffset[0];
              icons[0].offset = (colY-scope[0])*(offsetScope/$scrollarea.height()) + setOffset[0]+ '%';
              movePath.set('icons', icons);
          }
              
        }  // animateCircle
    $('.views a').on('click keypress',function(e){
        e.preventDefault();
    });
    //modal buttom
    
    $('.viewImgtag,.plus').on('mouseover focusin',function(e){
        $plus.css('visibility','visible');
    });
    $('.viewImgtag,.plus').on('mouseleave focusout',function(e){
        $plus.css('visibility','hidden');
    });
    // show modaless
    $plus.on('click keypress',function(){
        var buttonIndex = $plus.index($(this));
        $targetViews = $($views[buttonIndex]);
        $targetViewsModaless = $targetViews.find('.modaless');
        blockWheel();
        $targetViews.find('.modalessBG')
                            .css({'display':'block','position':'fixed'
                                  ,'top':0})
                            .addClass('bgblack')
                            .animate({'opacity':0.9},400,'swing'
                                    ,function(){});
        $targetViewsModaless.css({'display':'block','position':'fixed'
                                 ,'top':0 });
        $targetViewsModaless.css({'top':viewHeight/2-$targetViewsModaless.height()/2 ,'left':viewWidth/2-$targetViewsModaless.width()/2});
        $closeModeless.css('display','block');
    });
    $closeModeless.find('a').on('click keypress',function(e)
        {
            e.preventDefault();
            $targetViews.find('.modalessBG')
                        .css({'display':'none','position':'fixed','top':0})
                        .animate({'opacity':1},400,'swing',function(){playWheel();})
                        .removeClass('bgblack');
            $targetViewsModaless.css({'display':'none'});
            $closeModeless.css('display','none');
        });
    var $mobilemenuli = $('#mobilemenu li');
    $mobilemenuli = $.grep($mobilemenuli,function(value){
       return  value != $mobilemenuli[0];
    });
    $($mobilemenuli).on('touchstart',function(){
        $(this).css('backgroundColor','#5f6f81')
            .find('span')
            .css('color','white');
    });
        $($mobilemenuli).on('touchend',function(){
            $(this).css('backgroundColor','white')
                .find('span')
                .css('color','black')
                .trigger('click');
        });
    
    $($mobilemenuli).find('span').on('click',function(e){
        var index = $($mobilemenuli).index($(this).parent());
        $('html,body').animate({scrollTop:($($block[index]).offset().top)},5);
        $('#menuclose').trigger('click');
    });
    var $mobilemenu = $('#mobilemenu');
    var initPositionMobileMenu = -1*$mobilemenu.width();
    $mobilemenu.css('left',initPositionMobileMenu);
    $('#mobilediv').on('click touchstart',function(){
        blockWheel();
        $('#slideBg').css({'width':viewWidth,'height':viewHeight})
                    .addClass('bgblack')
                    .animate({opacity:0.4},200,'swing');
        $mobilemenu.animate({'left':0},500,'swing',function(){playWheel()});
    });
    $('#menuclose').on('click touchstart',function(){
        $('#slideBg').css({'width':0,'height':0})
                    .removeClass('bgblack')
                    .animate({opacity:1},200,'swing');
        $mobilemenu.animate({'left':initPositionMobileMenu},500,'swing');
    });
    $(".left").click(function(){
            left($(this),eleWidth);
    });
    
    $(".right").click(function(){
            right($(this),eleWidth);
    });
}); // ready end
 function right(target,eleWidth){
        var eventTarget =target.parent().parent().parent().find('._background ul');
        eventTarget.animate({left:eleWidth*-1},500,"swing",function(){
            $(this).children("li:first").appendTo($(this));
            $(this).css({left:0});
            state=false;
        });
    }
    
    function left(target,eleWidth){
        var eventTarget =target.parent().parent().parent().find('._background ul');
        eventTarget.find('li').last().prependTo(eventTarget);
        eventTarget.css({left:eleWidth*-1});
        eventTarget.animate({left:0},500,"swing",function(){
            state = false;
        });
    }
    
    
