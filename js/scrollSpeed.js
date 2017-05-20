function scrollSpeed(){
$(window).on('mousewheel', function(e){
	if(e.originalEvent.wheelDelta < 0) {
		//scroll down
        wheelflag = true;
		$('html, body').stop().animate({
			scrollTop : '+=100px'
		},80);
	}else {
		//scroll up
		$('html, body').stop().animate({
			scrollTop : '-=100px'
		},80);
	}
	//prevent page fom scrolling
	return false;
});
    }
function scrollRemove(){
    $(document).on('scroll touchmove mousewheel'), function(e) {
   e.preventDefault();
   e.stopPropagation(); 
   return false;
    }
}
function blockWheel()
{
	$(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
		e.preventDefault();
		return;
	});

	$(window).on("keydown.disableScroll", function(e) {
		var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
		for (var i = 0; i < eventKeyArray.length; i++) {
			if (e.keyCode === eventKeyArray [i]) {
				e.preventDefault();
				return;
			}
		}
	});
}
function playWheel()
{
	$(window).off(".disableScroll");
}