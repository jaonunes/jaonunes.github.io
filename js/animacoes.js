var root = document.documentElement;
root.className += ' js';



 
function boxTop(idBox) {
	var boxOffset = $(idBox).offset().top;
	return boxOffset;
}
$(document).ready(function() {
	var $target = $('.anime'),
			animationClass = 'anime-init',
			windowHeight = $(window).height(),
			offset = windowHeight - (windowHeight/10);
	document.body.onresize = function() {
				windowHeight = $(window).height();
				offset = windowHeight - (windowHeight/10);
			 };
			 

	function animeScroll() {
		var documentTop = $(document).scrollTop();
		$target.each(function() {
			if (documentTop > boxTop(this) - offset) {
				$(this).addClass(animationClass);
			} else {
				$(this).removeClass(animationClass);
			}
		});
	}
	animeScroll();

	$(document).scroll(function() {
		setTimeout(function() {animeScroll()}, 150);
	});
});
