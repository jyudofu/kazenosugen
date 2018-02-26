$(function(){
	function valChange (){
		$(function() {
		var hairetu = [];
		for(var i = 0; i < $(".buy_itemu_menu").length; i++){

			var select_name = $("select").eq(i).attr("name");
			var item_name = $(".buy_itemu_menu").eq(i).data("name");
			var item_price = $(".buy_itemu_menu").eq(i).data("price");
			var item_select = $(".buy_itemu_menu").eq(i).nextAll(".select_inner").find("option:selected").data("num");
			var item_total = item_price * item_select

			hairetu.push({name:select_name, item:item_name, val:item_select, price: item_total});
		}
		// 全体合計値
		var priceTotal = 0;
		var selectTotal = 0;
		//　キャラクターTシャツ
		var character_t_price = 0;
		var character_t_select = 0;
		//　ライブTシャツ
		var live_t_price = 0;
		var live_t_select = 0;
		//　ライブパーカー
		var live_parker_price = 0;
		var live_parker_select = 0;
		//　マフラータオル
		var muffler_towel_price = 0;
		var muffler_towel_select = 0;
		//　トートバッグ
		var toto_bag_price = 0;
		var toto_bag_select = 0;
		//　ハーフリストバンド
		var half_band_price = 0;
		var half_band_select = 0;
		//　ラバーキーホルダー
		var rubber_key_holder_price = 0;
		var rubber_key_holder_select = 0;
		//　クリアファイルセット
		var clear_file_price = 0;
		var clear_file_select = 0;
		//　ペンライト
		var　pen_wright_price = 0;
		var　pen_wright_select = 0;
		//　ひなシンフォギあられ
		var　hinaarare_price = 0;
		var　hinaarare_select = 0;
		//　PLAYBUTTON
		var　play_button_price = 0;
		var　play_button_select = 0;
		//　モバイルバッテリー
		var　mobile_battery_price = 0;
		var　mobile_battery_select = 0;
		for(var j = 0; j < hairetu.length; j++){
			// キャラクターTシャツ
			if (hairetu[j].item === "character_t") {
				character_t_price += hairetu[j].price;
				character_t_select += hairetu[j].val;
			}
			// ライブTシャツ
			if (hairetu[j].item === "live_t") {
				live_t_price += hairetu[j].price;
				live_t_select += hairetu[j].val;
			}
			// ライブパーカー
			if (hairetu[j].item === "live_parker") {
				live_parker_price += hairetu[j].price;
				live_parker_select += hairetu[j].val;
			}
			// マフラータオル
			if (hairetu[j].item === "muffler_towel") {
				muffler_towel_price += hairetu[j].price;
				muffler_towel_select += hairetu[j].val;
			}
			// トートバッグ
			if (hairetu[j].item === "toto_bag") {
				toto_bag_price += hairetu[j].price;
				toto_bag_select += hairetu[j].val;
			}
			// ハーフリストバンド
			if (hairetu[j].item === "half_band") {
				half_band_price += hairetu[j].price;
				half_band_select += hairetu[j].val;
			}
			// ラバーキーホルダー
			if (hairetu[j].item === "rubber_key_holder") {
				rubber_key_holder_price += hairetu[j].price;
				rubber_key_holder_select += hairetu[j].val;
			}
			// クリアファイルセット
			if (hairetu[j].item === "clear_file") {
				clear_file_price += hairetu[j].price;
				clear_file_select += hairetu[j].val;
			}
			// ペンライト
			if (hairetu[j].item === "pen_wright") {
				pen_wright_price += hairetu[j].price;
				pen_wright_select += hairetu[j].val;
			}
			// ひなシンフォギあられ
			if (hairetu[j].item === "hinaarare") {
				hinaarare_price += hairetu[j].price;
				hinaarare_select += hairetu[j].val;
			}
			// PLAYBUTTON
			if (hairetu[j].item === "play_button") {
				play_button_price += hairetu[j].price;
				play_button_select += hairetu[j].val;
			}
			// モバイルバッテリー
			if (hairetu[j].item === "mobile_battery") {
				mobile_battery_price += hairetu[j].price;
				mobile_battery_select += hairetu[j].val;
			}
			priceTotal += hairetu[j].price;
			selectTotal += hairetu[j].val;
			if (selectTotal > 0) {
				$(".listButton").removeClass("disable")
			} else {
				$(".listButton").addClass("disable")
			}
			if (hairetu[j].val >= 1) {
				var thisName = "." + hairetu[j].name;
				$(thisName).removeClass('hide')
				$(thisName).addClass('show')
				$(thisName + " .num").html(hairetu[j].val + "個")
				if(hairetu[j].name === "character_t_hibiki" || hairetu[j].name === "character_t_tsubasa" || hairetu[j].name === "character_t_chris" || hairetu[j].name === "character_t_maria" || hairetu[j].name === "character_t_sirabe" || hairetu[j].name === "character_t_kirika" || hairetu[j].name === "character_t_miku" || hairetu[j].name === "character_t_san" || hairetu[j].name === "character_t_kari" || hairetu[j].name === "character_t_pure") {
					$(".character_t").removeClass('hide')
					$(".character_t").addClass('show')
				}
				if (hairetu[j].name === "live_t_S" || hairetu[j].name === "live_t_M" || hairetu[j].name === "live_t_L" || hairetu[j].name === "live_t_XL") {
					$(".live_t").removeClass('hide')
					$(".live_t").addClass('show')
				}
				if (hairetu[j].name === "live_parker_M" || hairetu[j].name === "live_parker_L") {
					$(".live_parker").removeClass('hide')
					$(".live_parker").addClass('show')
				}
				if (hairetu[j].name === "muffler_towel") {
					$(".muffler_towel").removeClass('hide')
					$(".muffler_towel").addClass('show')
				}
				if (hairetu[j].name === "toto_bag") {
					$(".toto_bag").removeClass('hide')
					$(".toto_bag").addClass('show')
				}
				if(hairetu[j].name === "half_band_hibiki" || hairetu[j].name === "half_band_tsubasa" || hairetu[j].name === "half_band_chris" || hairetu[j].name === "half_band_maria" || hairetu[j].name === "half_band_sirabe" || hairetu[j].name === "half_band_kirika" || hairetu[j].name === "half_band_miku" || hairetu[j].name === "half_band_gold") {
					$(".half_band").removeClass('hide')
					$(".half_band").addClass('show')
				}
				if(hairetu[j].name === "rubber_key_holder_hibiki" || hairetu[j].name === "rubber_key_holder_tsubasa" || hairetu[j].name === "rubber_key_holder_chris" || hairetu[j].name === "rubber_key_holder_maria" || hairetu[j].name === "rubber_key_holder_sirabe" || hairetu[j].name === "rubber_key_holder_kirika" || hairetu[j].name === "rubber_key_holder_miku" || hairetu[j].name === "rubber_key_holder_san" || hairetu[j].name === "rubber_key_holder_kari" || hairetu[j].name === "rubber_key_holder_pure") {
					$(".rubber_key_holder").removeClass('hide')
					$(".rubber_key_holder").addClass('show')
				}
				if (hairetu[j].name === "clear_file") {
					$(".clear_file").removeClass('hide')
					$(".clear_file").addClass('show')
				}
				if (hairetu[j].name === "pen_wright") {
					$(".pen_wright").removeClass('hide')
					$(".pen_wright").addClass('show')
				}
				if (hairetu[j].name === "hinaarare") {
					$(".hinaarare").removeClass('hide')
					$(".hinaarare").addClass('show')
				}
				if (hairetu[j].name === "mobile_battery") {
					$(".mobile_battery").removeClass('hide')
					$(".mobile_battery").addClass('show')
				}
				$(".check_list .character_t .total .num").html("￥" + character_t_price);
				$(".check_list .live_t .total .num").html("￥" + live_t_price);
				$(".check_list .live_parker .total .num").html("￥" + live_parker_price);
				$(".check_list .muffler_towel .total .num").html("￥" + muffler_towel_price);
				$(".check_list .toto_bag .total .num").html("￥" + toto_bag_price);
				$(".check_list .half_band .total .num").html("￥" + half_band_price);
				$(".check_list .rubber_key_holder .total .num").html("￥" + rubber_key_holder_price);
				$(".check_list .clear_file .total .num").html("￥" + clear_file_price);
				$(".check_list .hinaarare .total .num").html("￥" + hinaarare_price);
				$(".check_list .play_button .total .num").html("￥" + play_button_price);
				$(".check_list .mobile_battery .total .num").html("￥" + mobile_battery_price);
			}
		}
		//　キャラクターTシャツ
		$(".character_t .item_val .num").html(character_t_select + "個");
		$(".character_t .item_total .num").html("￥" + character_t_price);
		//　ライブTシャツ
		$(".live_t .item_val .num").html(live_t_select + "個");
		$(".live_t .item_total .num").html("￥" + live_t_price);
		//　ライブパーカー
		$(".live_parker .item_val .num").html(live_parker_select + "個");
		$(".live_parker .item_total .num").html("￥" + live_parker_price);
		//　マフラータオル
		$(".muffler_towel .item_total .num").html("￥" + muffler_towel_price);
		//　トートバッグ
		$(".toto_bag .item_total .num").html("￥" + toto_bag_price);
		//　ハーフリストバンド
		$(".half_band .item_val .num").html(half_band_select + "個");
		$(".half_band .item_total .num").html("￥" + half_band_price);
		//　ラバーキーホルダー
		$(".rubber_key_holder .item_val .num").html(rubber_key_holder_select + "個");
		$(".rubber_key_holder .item_total .num").html("￥" + rubber_key_holder_price);
		//　クリアファイルセット
		$(".clear_file .item_total .num").html("￥" + clear_file_price);
		//　ペンライト
		$(".pen_wright .item_total .num").html("￥" + pen_wright_price);
		//　ひなシンフォギあられ
		$(".hinaarare .item_total .num").html("￥" + hinaarare_price);
		//　PLAYBUTTON
		$(".play_button .item_total .num").html("￥" + play_button_price);
		//　モバイルバッテリー
		$(".mobile_battery .item_total .num").html("￥" + mobile_battery_price);
		//　全体合計値
		$(".total_all_val .num").html(selectTotal + "個");
		$(".total_all_price .num").html(priceTotal + "円");

	});
	}
	$(".all_check-character_t").click(function() {
		$(".check-character_t").val("1個")
		valChange()
	});
	$(".all_check-half_band").click(function() {
		$(".check-half_band").val("1個")
		valChange()
	});
	$(".all_check-rubber_key_holder").click(function() {
		$(".check-rubber_key_holder").val("1個")
		valChange()
	});
	$("select").change(valChange)
	$(".listButton").click(function() {
		$(".wrapper").fadeOut(500)
		$(".wrapper_list").fadeIn(500)
	});
	$(".formButton").click(function() {
		$(".wrapper").fadeIn(500)
		$(".wrapper_list").fadeOut(500)
	});
});