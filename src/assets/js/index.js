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
		$('body, html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});

	// もっと見る
	// $(function(){
	// 	$('.content:not(.content:first-of-type)').css('display','none');//一番上の要素以外を非表示
	// 	$('.more').nextAll('.more').css('display','none');//ボタンを非表示
	// 	$('.more').on('click', function() {
	// 		$(this).css('display','none');//押したボタンを非表示
	// 		$(this).next('.content').slideDown('fast');
	// 		$(this).nextAll('.more:first').css('display','block'); //次のボタンを表示
	// 	});
	// });

	// 漫画ページジャンル選択
	$("#js_touhou").click(function() {
		$(".selectGenrebox").css({
			height: 40,
			"line-height": "40px",
			"border-radius": "10px 10px 0 0"
		})
		$("#symphogear").fadeOut(500);
		$("#touhou").fadeIn(2000);
		$(this).addClass("selected").removeClass("firstSelect");
		$("#js_symphogear").removeClass("selected");
		$("#js_symphogear").removeClass("firstSelect");
	});
	$("#js_symphogear").click(function() {
		$(".selectGenrebox").css({
			height: 40,
			"line-height": "40px",
			"border-radius": "10px 10px 0 0"
		})
		$("#touhou").fadeOut(500);
		$("#symphogear").fadeIn(2000);
		$(this).addClass("selected").removeClass("firstSelect");
		$("#js_touhou").removeClass("selected");
		$("#js_touhou").removeClass("firstSelect");
	});
	// ローダー
	$(window).on('load', function () {
		$('.loader').delay(1500).fadeOut(800);
		$('.content').delay(1500).fadeIn(800);
	});

	//10秒たったら強制的にロード画面を非表示
	$(function(){
		setTimeout('stopload()',10000);
	});

	function stopload(){
		$('.loader').delay(1500).fadeOut(800);
		$('.content').delay(1500).fadeIn(800);
	}
	var progress = 0;
	var imgCount = $('img').length;
	$("img").each(function(){
		var src = $(this).attr('src');
		$("<img>").attr('src',src).on('load',function(){
			progress++;
		});
	});
	setInterval(function(){
		$(".loadingBar").css({
			'width': (progress / imgCount) * 100 + '%'
		});
	}, 1);

});