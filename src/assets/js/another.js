$(function(){
	$("select").change(function() {
		var hairetu = [];
		for(var i = 0; i < $(".buy_itemu_menu").length; i++){
			
			var item_name = $(".buy_itemu_menu").eq(i).data("name");
			var item_price = $(".buy_itemu_menu").eq(i).data("price");
			var item_select = $(".buy_itemu_menu").eq(i).nextAll(".select_inner").find("option:selected").data("num");
			var item_total = item_price * item_select
			console.log(item_name)

			hairetu.push({item:item_name, val:item_select, price: item_total});
		}
		console.log(hairetu)
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
		}
		console.log(character_t_price)	
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
});