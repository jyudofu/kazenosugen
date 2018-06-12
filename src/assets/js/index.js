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
		$('<img>').ready(function() {
			var progress = 0;
			var allImg = $('img');
			var imgCount = allImg.length;
			$("img").each(function(){
				var src = $(this).attr('src');
				$("<img>").attr('src',src).on('load',function(){
					progress++;
				});
			});
			var loading = setInterval(function(){
				$(".loadingBar").css({
					'width': Math.floor((progress / imgCount) * 100) + '%'
				});
				$(".loadingTxt").text(Math.floor((progress / imgCount) * 100) + '%');
				if((progress / imgCount) * 100 === 100) {
					$('.loader').delay(1500).fadeOut(800);
					$('.content').delay(1500).fadeIn(800);
				}
			}, 1);
			//10秒たったら強制的にロード画面を非表示
			$(function(){
				setTimeout(function () {
					$('.loader').delay(1500).fadeOut(800);
					$('.content').delay(1500).fadeIn(800);
					stopTimer()
				}, 10000);
			});
			function stopTimer(){
				$(".loadingBar").css({
					'width': '100%'
				});
				$(".loadingTxt").text('100%')
				clearInterval(loading);
			}

		})
	});


});