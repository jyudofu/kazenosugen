
(function($){
	$.fn.extend({
		mangaviewer:function(options){
			var clickCount = 0;
			var windowWidth = $(window).width();
			var old_window;
			var o =this;
			o.options =options;
			// ChromeのPull-to-Refleshから逃げるためにビューアーはスクロールを禁止
			$('#viewer').on('touchmove.noScroll', function(e) {
				e.preventDefault();
			});
			// ページャーの生成元要素
			$(".slider").remove();
			$(o).append('<div class="slider"><div class="sheet clearfix"></div><div id="page-link" class="btn-toolbar"><div class="btn-group"></div><div id="page-list"></div></div></div>');
			//-------------------------------------
			// 初期化処理
			o.init_set =function(o){
				o.view_create(o);
				o.pager_create(o);
			}
			//-------------------------------------
			// ページ表示処理
			o.view_create =function(o){
				// ページ送り番号の取得
				var ejections =o.get_ejection_num();
				// 表示要素の生成
				if (o.options.page_ejection == "left") {
					o.view_obj_create_left(o, ejections);
				} else {
					o.view_obj_create_right(o, ejections);
				}

			}
			//-------------------------------------
			// ページ送り番号取得
			o.get_ejection_num =function(){

				var ejections =new Array();

				// シートから現在ページを取得
				ejections["sheet_num"] =parseInt($('div.sheet').attr('id'));

				// シートが無い場合初期値を設定
				if (!ejections["sheet_num"]) {
					ejections["sheet_num"] =1;
				}
				// 実ページ数を取得
				var current_num =ejections["sheet_num"] * 2;

				// 現在ページから表示するページを判定
				ejections["above_num"] =current_num;
				ejections["below_num"] =current_num - 1;

				// 最大ページ数を設定
				var max_view =Math.ceil(o.options.page / 2);

				// 次のページと前のページを取得
				ejections["next_page"] =ejections["sheet_num"] + 1;
				ejections["prev_page"] =ejections["sheet_num"] - 1;
				// 存在しないページが設定されている場合は空に
				if (max_view < ejections["next_page"]) {
					ejections["next_page"] ="";
				}
				if (1  > ejections["prev_page"]) {
					ejections["prev_page"] ="";
				}

				return ejections;
			}

			//-------------------------------------
			// 表示要素生成(左送り)
			o.view_obj_create_left =function(o, ejections){
				// 画像表示
				$('div.sheet').attr("id", ejections["sheet_num"]).children().remove();
				$('div.sheet').addClass("left");
				$("div").css({
					"direction" : "ltr",
					"unicode-bidi": "isolate"
				});
				$("#page-list").css({
					"direction" : "rtl"
				})


				$(".slider").width(windowWidth);
				if (windowWidth >= 414) {
					// PC表示
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							if(o.options.next_page === '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a></div>');
							}
							if(o.options.next_page === '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a></div>');
							}
						} else {
							$('#'+ejections["sheet_num"]).prepend('<div class="image"><img id="page'+ i +'" src="' + o.options.path + '/' + i + '.' + o.options.ext + '"></div>');
						}
						$("#page" + i).parent().css(
							{
								"width" : windowWidth / 2,
							}
						)
					}
				} else {
					// SP表示
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							if(o.options.next_page === '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a></div>');
							}
							if(o.options.next_page === '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a></div>');
							}
						} else {
							$('#'+ejections["sheet_num"]).prepend('<div class="image"><img id="page'+ i +'" src="' + o.options.path + '/' + i + '.' + o.options.ext + '"></div>');
						}
						$("#page" + i).parent().css(
							{
								"width" : windowWidth,
							}
						)
					}
				}
				$("img").bind("load",function(){
					var windowHeight = $(window).height();
					var imageHeight = $(".sheet").innerHeight();
					var pagerHeight = $(".page_slide").innerHeight();
					$(".slider").css({
						"height" : imageHeight,
						"padding-top" : (windowHeight - imageHeight - pagerHeight) / 2
					})
					$(".close").css({
						"line-height" : imageHeight + "px"
					})
					if (imageHeight >= windowHeight) {
						$(".image img").css({
							"width" : "auto",
							"height" : windowHeight
						})
					}
				})

				// 画面リサイズ処理
				if (windowWidth <= 414) {
					if(old_window >= 414) {
						clickCount = clickCount * 2
					}
					$(".sheet").css({
						"left" : -windowWidth * clickCount,
						"right" : "auto"
					})
				} else {
					if (old_window <= 414) {
						clickCount = Math.floor(clickCount / 2);
					}
					$(".sheet").css({
						"left" : -windowWidth * clickCount,
						"right" : "auto"
					})
				}
				// ボタン生成
				$('div.btn-group').children().remove();
				$('div.btn-group').prepend('<div id="btn-next" class="btn prev right_arrow"></div>');
				$('div.btn-group').prepend('<div id="btn-prev" class="btn next left_arrow"></div>');
				if (clickCount === 0){
					$("#btn-prev").hide();
					$("#btn-next").show();
				}
				else if(clickCount > (o.options.page / 2) - 1){
					$("#btn-prev").show();
					$("#btn-next").hide();
				}
				else {
					$("#btn-prev").show();
					$("#btn-next").show();
				}

				// ボタンクリック処理
				$("#btn-next").on("click",function(){
					if(clickCount < (o.options.page / 2) - 1.5) {
						$("#btn-prev").show();
						$("#btn-next").show();
						clickCount++;
					} else if(clickCount >= (o.options.page / 2) - 1.5){
						$("#btn-prev").show();
						$("#btn-next").hide();
						clickCount++;
					}
					$(".sheet").css({
						"left" : -windowWidth * clickCount,
						"right" : "auto"
					})
					var slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
				});
				$("#btn-prev").on("click",function(){
					if(clickCount > 1) {
						$("#btn-prev").show();
						$("#btn-next").show();
						clickCount--;
					} else if (clickCount <= 1){
						$("#btn-prev").hide();
						$("#btn-next").show();
						clickCount--;
					}
					$(".sheet").css({
						"left" : -windowWidth * clickCount,
						"right" : "auto"
					})
					var slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
				});
				var move = 'null';
				/*
				* タップ、スワイプ、指を離した時のイベントハンドラ
				*/
				$(".image").bind("touchstart", TouchStart);
				$(".image").bind("touchmove" , TouchMove);
				$(".image").bind("touchend" , TouchLeave);

				/*
				* タップした位置をメモリーする
				*/
				function TouchStart( event ) {
					var pos = Position(event);
					$(".image").data("memory",pos.x);
					move = "null"
				}

				/*
				* スワイプ
				* タップした位置からプラスかマイナスかで左右移動を判断
				*/
				function TouchMove( event ) {
					var pos = Position(event); //X,Yを得る
					var memory = $(".image").data("memory");
					var left = parseInt($(".sheet").css("left"));
					if (pos.x < memory){
						move = "left";
						$(".sheet").css({
							"left" : left + (pos.x * 2),
							"right" : "auto"
						});
					} else {
						move = "right";
						$(".sheet").css({
							"left" : left - (pos.x * 2),
							"right" : "auto"
						});
					}
				}

				/*
				* 指を離す
				*/
				function TouchLeave( event ) {
					var slide_handle = 0;
					if (move === "right") {
						if (windowWidth >= 414) {
							if(clickCount <= (o.options.page / 2) - 1) {
								clickCount++;
							}
							slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
						} else {
							if(clickCount <= (o.options.page) - 1) {
								clickCount++;
							}
							slide_handle = (clickCount / Math.floor(o.options.page)) * 100;
						}
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})
						$(".slide_bar_range").css({
							"width" : 100 - slide_handle + '%'
						})
						$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
					} else if (move === "left") {
						if(clickCount > 0) {
								clickCount--;
						}
						if (windowWidth >= 414) {
							slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
						} else {
							slide_handle = (clickCount / Math.floor(o.options.page)) * 100;
						}
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})
						$(".slide_bar_range").css({
							"width" : 100 - slide_handle + '%'
						})
						$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
					}
				}

				/*
				* 現在位置を得る
				*/
				function Position(e){
					var x = e.originalEvent.touches[0].pageX;
					var y = e.originalEvent.touches[0].pageY;
					x = Math.floor(x);
					y = Math.floor(y);
					var pos = {'x':x , 'y':y};
					return pos;
				}

			}

			//-------------------------------------
			// 表示要素生成(右送り)
			o.view_obj_create_right =function(o, ejections){

				// 画像表示
				$('div.sheet').attr("id", ejections["sheet_num"]).children().remove();
				$('div.sheet').addClass("right");
				$("div").css({
					"direction" : "rtl",
					"unicode-bidi": "isolate"
				});
				$("#page-list").css({
					"direction" : "ltr"
				})

				$(".slider").width(windowWidth);
				if (windowWidth >= 414) {
					// PC表示
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							if(o.options.next_page === '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a></div>');
							}
							if(o.options.next_page === '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a></div>');
							}
						} else {
							$('#'+ejections["sheet_num"]).prepend('<div class="image"><img id="page'+ i +'" src="' + o.options.path + '/' + i + '.' + o.options.ext + '"></div>');
						}
						$("#page" + i).parent().css(
							{
								"width" : windowWidth / 2,
							}
						)
					}
				} else {
					// SP表示
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							if(o.options.next_page === '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page === '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a></div>');
							}
							if(o.options.next_page === '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a></div>');
							}
							if(o.options.next_page !== '' && o.options.prev_page !== '') {
								$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" href="' + o.options.next_page + '">' + o.options.next_title + '</a><a id="page' + i + '" href="' + o.options.prev_page + '">' + o.options.prev_title + '</a></div>');
							}
						} else {
							$('#'+ejections["sheet_num"]).prepend('<div class="image"><img id="page'+ i +'" src="' + o.options.path + '/' + i + '.' + o.options.ext + '"></div>');
						}
						$("#page" + i).parent().css(
							{
								"width" : windowWidth,
							}
						)
					}
				}

				$("img").bind("load",function(){
					var windowHeight = $(window).height();
					var imageHeight = $(".sheet").innerHeight();
					var pagerHeight = $(".page_slide").innerHeight();
					$(".slider").css({
						"height" : imageHeight,
						"padding-top" : (windowHeight - imageHeight - pagerHeight) / 2
					})
					$(".close").css({
						"line-height" : imageHeight + "px"
					})
					if (imageHeight >= windowHeight) {
						$(".image img").css({
							"width" : "auto",
							"height" : windowHeight
						})
					}
				})
				// 画面リサイズ処理
				if (windowWidth <= 414) {
					if(old_window >= 414) {
						clickCount = clickCount * 2
					}
					$(".sheet").css({
						"right" : -windowWidth * clickCount,
						"left" : "auto"
					})
				} else {
					if (old_window <= 414) {
						clickCount = Math.floor(clickCount / 2);
					}
					$(".sheet").css({
						"right" : -windowWidth * clickCount,
						"left" : "auto"
					})
				}
				// ボタン生成
				$('div.btn-group').children().remove();
				$('div.btn-group').prepend('<div id="btn-prev" class="btn prev right_arrow"></div>');
				$('div.btn-group').prepend('<div id="btn-next" class="btn next left_arrow"></div>');
				if (clickCount === 0){
					$("#btn-prev").hide();
					$("#btn-next").show();
				}
				else if(clickCount > (o.options.page / 2) - 1){
					$("#btn-prev").show();
					$("#btn-next").hide();
				}
				else {
					$("#btn-prev").show();
					$("#btn-next").show();
				}


				// ボタンクリック処理
				$("#btn-next").on("click",function(){
					if(clickCount < (o.options.page / 2) - 1.5) {
						$("#btn-prev").show();
						$("#btn-next").show();
						clickCount++;
					} else if(clickCount >= (o.options.page / 2) - 1.5){
						$("#btn-prev").show();
						$("#btn-next").hide();
						clickCount++;
					}
					$(".sheet").css({
						"right" : -windowWidth * clickCount,
						"left" : "auto"
					})
					var slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
				});
				$("#btn-prev").on("click",function(){
					if(clickCount > 1) {
						$("#btn-prev").show();
						$("#btn-next").show();
						clickCount--;
					} else if (clickCount <= 1){
						$("#btn-prev").hide();
						$("#btn-next").show();
						clickCount--;
					}
					$(".sheet").css({
						"right" : -windowWidth * clickCount,
						"left" : "auto"
					})
					var slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_bar_range").css({
						"width" : 100 - slide_handle + '%'
					})
					$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
				});
				var move = 'null';
				/*
				* タップ、スワイプ、指を離した時のイベントハンドラ
				*/
				$(".image").bind("touchstart", TouchStart);
				$(".image").bind("touchmove" , TouchMove);
				$(".image").bind("touchend" , TouchLeave);

				/*
				* タップした位置をメモリーする
				*/
				function TouchStart( event ) {
					var pos = Position(event);
					$(".image").data("memory",pos.x);
					move = "null"
				}

				/*
				* スワイプ
				* タップした位置からプラスかマイナスかで左右移動を判断
				*/
				function TouchMove( event ) {
					var pos = Position(event); //X,Yを得る
					var memory = $(".image").data("memory");
					var right = parseInt($(".sheet").css("right"));
					if (pos.x < memory){
						move = "left";
						$(".sheet").css({
							"right" : right + (pos.x * 2),
							"left" : "auto"
						});
					} else {
						move = "right";
						$(".sheet").css({
							"right" : right - (pos.x * 2),
							"left" : "auto"
						});
					}
				}

				/*
				* 指を離す
				*/
				function TouchLeave( event ) {
					var slide_handle = 0;
					if (move === "right") {
						if (windowWidth >= 414) {
							if(clickCount <= (o.options.page / 2) - 1) {
								clickCount++;
							}
							slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
						} else {
							if(clickCount <= (o.options.page) - 1) {
								clickCount++;
							}
							slide_handle = (clickCount / Math.floor(o.options.page)) * 100;
						}
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})
						$(".slide_bar_range").css({
							"width" : 100 - slide_handle + '%'
						})
						$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
					} else if (move === "left") {
						if(clickCount > 0) {
								clickCount--;
						}
						if (windowWidth >= 414) {
							slide_handle = (clickCount / Math.floor(o.options.page / 2)) * 100;
						} else {
							slide_handle = (clickCount / Math.floor(o.options.page)) * 100;
						}
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})
						$(".slide_bar_range").css({
							"width" : 100 - slide_handle + '%'
						})
						$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
					}
				}

				/*
				* 現在位置を得る
				*/
				function Position(e){
					var x = e.originalEvent.touches[0].pageX;
					var y = e.originalEvent.touches[0].pageY;
					x = Math.floor(x);
					y = Math.floor(y);
					var pos = {'x':x , 'y':y};
					return pos;
				}

			}

			//-------------------------------------
			// ページャー生成処理
			o.pager_create =function(o){

				// シートから現在ページを取得
				var sheet_num =$('div.sheet').attr('id');

				var max_view = 0;
				var page_list = [0]
				if (windowWidth >= 414) {
					if (( o.options.page % 2 ) == 0 ) {
						max_view = Math.ceil(o.options.page / 2) + 1;
					} else {
						max_view = Math.ceil(o.options.page / 2);
					}
					pages = Math.ceil(o.options.page / 2) - 1;

				} else {
					max_view = Math.ceil(o.options.page) + 1;
					pages = Math.ceil(o.options.page);
				}
				for(var i =1; i <= pages; i++) {
					var page_split = (100 / pages);
					var set_pages = Math.floor(page_split * i)
					page_list.push(set_pages)
				}
				page_list = page_list.reverse()
				$('#page-list').children().remove();
				$('#page-list').prepend('<div class="page_slide first"><div class="slider_wrapper"><div class="max_page">'+ max_view +'</div><div class="slide_bar"><span class="slide_bar_range"><span class="slide_num">0</span></span></div><div class="min_page">1</div></div></div>');
				$(function(){
					setTimeout(function(){
						$(".page_slide").removeClass("first");
					},2000);
				});
				if (o.options.page_ejection === "left") {
					$(".slide_bar_range").addClass("left")
				} else {
					$(".slide_bar_range").addClass("right")
				}
				$('.slide_bar').on('click', function(e) {
					var widthPosition =  Math.floor(e.offsetX / $(this).width() * 100);
					var diff = [];
					var index = 0;
					$(page_list).each(function(i,val){
						diff[i] = Math.abs(widthPosition - val);
						index = (diff[index] < diff[i]) ? index : i;
					});
					$(".slide_bar_range").css({
						"width" : page_list[index] + '%'
					})
					clickCount = index;
					if (o.options.page_ejection === "left") {
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})
					} else {
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})
					}
					if (page_list[index] === 0) {
						$("#btn-next").hide();
						$("#btn-prev").show();
					} else if (page_list[index] === 100) {
						$("#btn-next").show();
						$("#btn-prev").hide();
					} else {
						$("#btn-next").show();
						$("#btn-prev").show();
					}
					$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
				});
				$(".slide_bar_range").mousedown(function(e){
					$(document).on('mousemove.slide_bar_range', function(e) {
						var moveWidth = (e.offsetX / $('.slide_bar').width() * 100);
						$(".slide_bar_range").css({
							"width" : moveWidth + '%'
						})
						var diff = [];
						var index = 0;
						$(page_list).each(function(i,val){
							diff[i] = Math.abs(moveWidth - val);
							index = (diff[index] < diff[i]) ? index : i;
						});
						clickCount = index
						$(".slide_num").text(clickCount + 1).stop().fadeIn(300);
					}).one('mouseup', function(e) {
						$(document).off('mousemove.slide_bar_range');
						var widthPosition =  (e.offsetX / $(this).width() * 100);
						var diff = [];
						var index = 0;
						$(page_list).each(function(i,val){
							diff[i] = Math.abs(widthPosition - val);
							index = (diff[index] < diff[i]) ? index : i;
						});
						$(".slide_bar_range").css({
							"width" : page_list[index] + '%'
						})
						clickCount = index;
						if (o.options.page_ejection === "left") {
							$(".sheet").css({
								"left" : -windowWidth * clickCount,
								"right" : "auto"
							})
						} else {
							$(".sheet").css({
								"right" : -windowWidth * clickCount,
								"left" : "auto"
							})
						}
						$(".slide_num").text(clickCount + 1).stop().fadeOut(300);
					});
					return false;
				});
				// タッチ操作
				var widthPosition;
				$(".slide_bar_range").bind("touchstart", TouchStart);
				$(".slide_bar_range").bind("touchmove" , TouchMove);
				$(".slide_bar_range").bind("touchend" , TouchLeave);
				function TouchStart( event ) {
					var pos = Position(event);
				}
				function TouchMove( event ) {
					var pos = Position(event); //X,Yを得る
					var slideWidth = $(".slide_bar").width();
					var marginRatio = Math.floor((windowWidth - slideWidth) / 2);
					widthPosition = Math.floor(((pos.x - marginRatio) / $('.slide_bar').width()) * 100);
					console.log(widthPosition)
					$(".slide_bar_range").css({
						"width" : widthPosition + '%'
					})
					var diff = [];
					var index = 0;
					$(page_list).each(function(i,val){
						diff[i] = Math.abs(widthPosition - val);
						index = (diff[index] < diff[i]) ? index : i;
					});
					clickCount = index
					$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
			}
				function TouchLeave() {
					var diff = [];
					var index = 0;
					$(page_list).each(function(i,val){
						diff[i] = Math.abs(widthPosition - val);
						index = (diff[index] < diff[i]) ? index : i;
					});
					$(".slide_bar_range").css({
						"width" : page_list[index] + '%'
					})
					clickCount = index
					$(".sheet").css({
						"right" : -windowWidth * clickCount,
						"left" : "auto"
					})
					$(".slide_num").text(clickCount + 1).stop().fadeIn(300).delay(500).fadeOut(300);
				}
				function Position(e){
					var x = e.originalEvent.touches[0].pageX;
					var y = e.originalEvent.touches[0].pageY;
					x = Math.floor(x);
					y = Math.floor(y);
					var pos = {'x':x , 'y':y};
					return pos;
				}
				$(".slide_bar_range").css({
					"width" : page_list[clickCount] + '%'
				})
			}

			//-------------------------------------
			// ページ更新処理
			$(window).on('resize', function() {
				old_window = windowWidth;
				windowWidth = $(window).width();
				o.view_create(o);
				o.pager_create(o);
			})

			// 初期化処理
			o.init_set(o);

		}
	});

})(jQuery);

