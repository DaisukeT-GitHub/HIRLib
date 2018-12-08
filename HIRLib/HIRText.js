/**
 * HIRText.js
 *
 * Copyright © 2018 tetsugaku.info.
 */
var HIRText = {};
HIRText = function(){}	// new 演算子用コンストラクタ



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// ベースライン
HIRText.BASELINE = 
{
	TOP : "top",
	BOTTOM : "bottom",
	HANGING : "hanging",
	MIDDLE : "middle",
	ALPHABETIC : "alphabetic",
	IDEOGRAPHIC : "ideographic",
};
HIRText.BASELINE_DEFAULT = HIRText.BASELINE.TOP;


// フォント
HIRText.FONT_DEFAULT = '18pt Arial';
HIRText.FONT_DEFAULT_SMALL = '12pt Arial';
HIRText.FONT_DEFAULT_LARGE = '24pt Arial';



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRText.mStr;
HIRText.mFont;
HIRText.mColor;
HIRText.mBaseline;
HIRText.mX;
HIRText.mY;
HIRText.mIsVisible;
HIRText.mPriority;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 描画する
 */
HIRText.Draw = function(ctx, elm)
{
	if(!elm.mIsVisible) return;		// 非表示設定
	if(HIRString.IsEmpty(elm.mStr)) return;	// 文字列が空

	HIRText.DrawPrivate(ctx, elm, false);
}

/**
 * 描画する（内部用）
 */
HIRText.DrawPrivate = function(ctx, elm, isMeasure)
{
	var res = 0;

	ctx.save();	// コンテキスト状態を保存

	ctx.textAligh = "left";
	ctx.textBaseline = elm.mBaseline;	// ベースライン設定
	ctx.font = elm.mFont;	// フォント設定

	ctx.fillStyle = HIRColor.CSS(elm.mColor);	// 色設定
	ctx.fillText(elm.mStr, elm.mX, elm.mY); 	// テキスト設定

	if(isMeasure)
	{
		// 幅を計算する
		res = ctx.measureText(elm.mStr).width;
	}

	ctx.restore();	// コンテキスト状態を復帰

	return res;
}

/**
 * テキストのサイズを返す
 */
HIRText.Size = function(ctx, elm)
{
	var res = new HIRSize();

	res.mWidth = HIRText.DrawPrivate(ctx, elm, true);
	res.mHeight = HIRText.Height(elm.mFont);

	return res;
}

/**
 * テキストの高さを返す
 */
HIRText.Height = function(font)
{
	var text = $('<span>Hg</span>').css({ fontFamily: font });
	var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

	var div = $('<div></div>');
	div.append(text, block);

	var body = $('body');
	body.append(div);


	//var res = {};
	var res = 0;
	try
	{
		/*
		block.css({ verticalAlign: 'baseline' });
		res.ascent = block.offset().top - text.offset().top;

		block.css({ verticalAlign: 'bottom' });
		res.height = block.offset().top - text.offset().top;

		res.descent = res.height - res.ascent;
		*/

		block.css({ verticalAlign: 'bottom' });
		res = block.offset().top - text.offset().top;
	}
	finally
	{
		div.remove();
	}


	return res;
}
