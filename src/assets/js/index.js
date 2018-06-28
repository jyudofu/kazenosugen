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
		$("#js_symphogear").removeClass("selected").addClass("unSelected");
		$(this).removeClass("unSelected").addClass("selected");
		$("#symphogear").fadeOut(500);
		$("#touhou").fadeIn(500);
		$("#js_symphogear").removeClass("selected");
		$(".selectButton").fadeIn(500);
	});
	$("#js_symphogear").click(function() {
		$("#js_touhou").removeClass("selected").removeClass("selected").addClass("unSelected");
		$(this).removeClass("unSelected").addClass("selected");
		$("#touhou").fadeOut(500);
		$("#symphogear").fadeIn(500);
		$("#js_touhou").removeClass("selected");
		$(".selectButton").fadeIn(500);
	});
	$("#return_select").click(function() {
		$("#js_touhou").removeClass("selected").removeClass("unSelected");
		$("#js_symphogear").removeClass("selected").removeClass("unSelected");
		$(".selectButton").fadeOut(500);
	})
	$('.loader').show();
	$('html, body').css('overflow', 'hidden');
	$(".doujin, .circle").click(function() {
		if($(window).width() <= 812) {
			$(this).children(".history").slideToggle();
		}
	})
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
			// 画像がロードできたら画面を表示
			var loading = setInterval(function(){
				$(".loadingBar").css({
					'width': Math.floor((progress / imgCount) * 100) + '%'
				});
				$(".loadingTxt").text(Math.floor((progress / imgCount) * 100) + '%');
				if((progress / imgCount) * 100 === 100) {
					$('.loader').delay(500).fadeOut(800);
					$('.content').delay(500).fadeIn(800);
					$('html, body').removeAttr("style");
				}
			}, 1);
			//5秒たったら強制的にロード画面を非表示
			$(function(){
				setTimeout(function () {
					$('.loader').delay(500).fadeOut(800);
					$('.content').delay(500).fadeIn(800);
					$('html, body').removeAttr("style");
					$(".loadingBar").css({
						'width': '100%'
					});
					$(".loadingTxt").text('100%')
					stopTimer()
				}, 5000);
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
	//10秒たったら強制的にロード画面を非表示
	$(function(){
		setTimeout(function () {
			$('.loader').delay(500).fadeOut(800);
			$('.content').delay(500).fadeIn(800);
			$('html, body').removeAttr("style");
			$(".loadingBar").css({
				'width': '100%'
			});
			$(".loadingTxt").text('100%')
		}, 10000);
	});

});