
(function($){
	$.fn.extend({
		mangaviewer:function(options){
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


				var windowWidth = $(window).width();
				$(".slider").width(windowWidth);
				if (windowWidth >= 813) {
					// PC表示
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
						} else {
							$('#'+ejections["sheet_num"]).prepend('<div class="image"><img id="page'+ i +'" src="' + o.options.path + '/' + i + '.' + o.options.ext + '"></div>');
						}
						$("#page" + i).parent().css(
							{
								"width" : windowWidth / 2,
							}
						)
					}
				} else if (windowWidth >= 414) {
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
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
							$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
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
					var imageHeight = $(".sheet").innerHeight()
					$(".slider").css({
						"height" : imageHeight,
						"padding-top" : (windowHeight - imageHeight) / 2
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
				// ボタン生成
				$('div.btn-group').prepend('<div id="btn-prev" class="btn next left_arrow"></div>');
				$('div.btn-group').prepend('<div id="btn-next" class="btn prev right_arrow"></div>');

				// ボタンクリック処理
				var clickCount = 0;
				$("#btn-next").on("click",function(){
					if (windowWidth >= 414) {
						if(clickCount <= (o.options.page / 2) - 1) {
							clickCount++;
						}
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})

					} else {
						if(clickCount <= (o.options.page) - 1) {
							clickCount++;
						}
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})
					}
				});
				$("#btn-prev").on("click",function(){
					if(clickCount > 0) {
						clickCount--;
					}
					if (windowWidth >= 414) {
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})

					} else {
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})
					}
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
					var memory = $(".image").data("memory")
					var left = $(".sheet").position().left;
					if (pos.x < memory){
						move = "left";
						$(".sheet").css({
							"left" : left - (pos.x * 2),
							"right" : "auto"
						});
					} else {
						move = "right";
						$(".sheet").css({
							"left" : left + (pos.x * 2),
							"right" : "auto"
						});
					}


				}

				/*
				* 指を離す
				*/
				function TouchLeave( event ) {
					if (move === "left") {
						if (windowWidth >= 414) {
							if(clickCount <= (o.options.page / 2) - 1) {
								clickCount++;
							}
						} else {
							if(clickCount <= (o.options.page) - 1) {
								clickCount++;
							}
						}
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})
					} else if (move === "right") {
						if(clickCount > 0) {
							clickCount--;
						}
						$(".sheet").css({
							"left" : -windowWidth * clickCount,
							"right" : "auto"
						})
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

				var windowWidth = $(window).width();
				$(".slider").width(windowWidth);
				if (windowWidth >= 813) {
					// PC表示
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
						} else {
							$('#'+ejections["sheet_num"]).prepend('<div class="image"><img id="page'+ i +'" src="' + o.options.path + '/' + i + '.' + o.options.ext + '"></div>');
						}
						$("#page" + i).parent().css(
							{
								"width" : windowWidth / 2,
							}
						)
					}
				} else if (windowWidth >= 414) {
					for (var i = o.options.page + 1; 1 <= i; i--) {
						if(i === o.options.page + 1) {
							$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
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
							$('#'+ejections["sheet_num"]).prepend('<div class="image close"><a id="page' + i + '" onClick="window.close();return false;">閉じる</a></div>');
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
					var imageHeight = $(".sheet").innerHeight()
					$(".slider").css({
						"height" : imageHeight,
						"padding-top" : (windowHeight - imageHeight) / 2
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
				// ボタン生成
				$('div.btn-group').prepend('<div id="btn-prev" class="btn prev right_arrow"></div>');
				$('div.btn-group').prepend('<div id="btn-next" class="btn next left_arrow"></div>');

				// ボタンクリック処理
				var clickCount = 0;
				$("#btn-next").on("click",function(){
					if (windowWidth >= 414) {
						if(clickCount <= (o.options.page / 2) - 1) {
							clickCount++;
						}
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})
					} else {
						if(clickCount <= (o.options.page) - 1) {
							clickCount++;
						}
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})
					}
				});
				$("#btn-prev").on("click",function(){
					if(clickCount > 0) {
						clickCount--;
					}
					if (windowWidth >= 414) {
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})

					} else {
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})

					}
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
					if (move === "right") {
						if (windowWidth >= 414) {
							if(clickCount <= (o.options.page / 2) - 1) {
								clickCount++;
							}
						} else {
							if(clickCount <= (o.options.page) - 1) {
								clickCount++;
							}
						}
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})

					} else if (move === "left") {
						if(clickCount > 0) {
								clickCount--;
						}
						$(".sheet").css({
							"right" : -windowWidth * clickCount,
							"left" : "auto"
						})
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

				// ページャーが生成。既に生成済みの場合アクティブボタンを変更
				if ($('#page-list')) {

					$('button.active').removeClass("active");
					$('button.' + sheet_num).addClass('active');

				} else {

					// 最大ページ数を設定
					var max_view =Math.ceil(o.options.page / 2);

					// ページャーを生成。現在ページはアクティブに
					for(i=1;i<=max_view;i++){
						if (o.options.page_ejection == "left") {
							$('#page-list').prepend('<button class="btn ' + i +'" rel="' + i +'">'+ i +'</button>');
						}else{
							$('#page-list').append('<button class="btn ' + i +'" rel="' + i +'">'+ i +'</button>');
						}
						if (sheet_num == i) {
							$('button.' + i).addClass('active');
						}
					}
				}
			}

			//-------------------------------------
			// ページ更新処理
			o.paging =function(i){
				if (i) {
					$('div.sheet').attr('id', i);
					o.view_create(o);
					o.pager_create(o);
				}
			}

			// 初期化処理
			o.init_set(o);

		}
	});

})(jQuery);

