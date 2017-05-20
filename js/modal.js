$(function(){
//    var eleWidth= $("._modal ul li").innerWidth();
//    var eleWidth= $("._modal ul li").width();
    var state = false;
    var playOn = false;
    function right(target){
        var eventTarget =target.parent().parent().parent().find('._background ul');
        eventTarget.animate({left:eleWidth*-1},500,"swing",function(){
            $(this).children("li:first").appendTo($(this));
            $(this).css({left:0});
            state=false;
        });
//        $("#_text > ul").animate({left:pWidth*-1},300,"swing",function(){
//            $(this).children("li:first").insertAfter($(this).children("li:last"));
//            $(this).css({left:0});
//            state=false;
//        });
    }
    
    function left(target){
        var eventTarget =target.parent().parent().parent().find('._background ul');
        eventTarget.find('li').last().prependTo(eventTarget);
        eventTarget.css({left:eleWidth*-1});
        eventTarget.animate({left:0},500,"swing",function(){
            state = false;
        });
    }
    
    $(".left").click(function(){
            left($(this));
    });
    
    $(".right").click(function(){
            right($(this));
    });
    
});
    