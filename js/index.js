$(function(){

	// SPプルダウンメニュー
	$("#js_spNav").css("display","none");
	$("#js_headNavButton").on("click", function() {
		var hasclass = $(".menu-trigger").hasClass("active");
		if(hasclass) {
			$(".menu-trigger").removeClass("active");
		}else{
			$(".menu-trigger").addClass("active");
		}
		$("#js_spNav").slideToggle();
	});

	// スクロール固定メニュー
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 100) {
			$('.header').addClass('fixed');
		} else {
			$('.header').removeClass('fixed');
		}
	});

	// ページトップへ戻る
	// js_backToTopを消す
	$('#js_backToTop').hide();
	// スクロールが十分されたらjs_backToTopを表示、スクロールが戻ったら非表示する
	$(window).scroll(function() {
		$('#pos').text($(this).scrollTop());
		if ($(this).scrollTop() > 60) {
			$('#js_backToTop').fadeIn();
		} else {
			$('#js_backToTop').fadeOut();
		}
	});
	// js_backToTopがクリックされたら上に戻る
	$('#js_backToTop').click(function() {
	$('body').animate({
		scrollTop: 0
	}, 500);
		return false;
	});

	// もっと見る
	$(function(){
		$('.content:not(.content:first-of-type)').css('display','none');//一番上の要素以外を非表示
		$('.more').nextAll('.more').css('display','none');//ボタンを非表示
		$('.more').on('click', function() {
			$(this).css('display','none');//押したボタンを非表示
			$(this).next('.content').slideDown('fast');
			$(this).nextAll('.more:first').css('display','block'); //次のボタンを表示
		});
	});

	$(window).on('load',function(){
		var $frame = $('.frame');
		var innerHeight = $frame.get(0).contentWindow.document.body.scrollHeight;
		var innerWidth = $frame.get(0).contentWindow.document.body.scrollWidth;
		console.log(innerHeight);
		$frame.attr('height', innerHeight + 'px');
		$frame.attr('width', innerWidth + 'px');
	});
});