/**
 * HIRColor.js
 *
 * Copyright © 2018 tetsugaku.info.
 */
var HIRColor = {};
HIRColor = function(){}	// new 演算子用コンストラクタ



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRColor.mRed;
HIRColor.mGreen;
HIRColor.mBlue;
HIRColor.mAlpha;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * RGB を指定して生成
 */
HIRColor.RGB = function(r, g, b)
{
	var res = new HIRColor.RGBA(r, g, b, 1.0);
	
	return res;
}

/**
 * RGBA を指定して生成
 */
HIRColor.RGBA = function(r, g, b, a)
{
	var res = new HIRColor();

	res.mRed = r;
	res.mGreen = g;
	res.mBlue = b;
	res.mAlpha = a;
	
	return res;
}

/**
 * CSS オブジェクトを返す
 */
HIRColor.CSS = function(rgba)
{
	var res = "rgba(" + rgba.mRed + "," + rgba.mGreen + "," + rgba.mBlue + "," + rgba.mAlpha + ")";

	return res;
}

/**
 * 白を返す
 */
HIRColor.White = function()
{
	var res = HIRColor.RGB(255, 255, 255);

	return res;
}

/**
 * グレイを返す
 */
HIRColor.Gray = function()
{
	var res = HIRColor.RGB(128, 128, 128);

	return res;
}

/**
 * 黒を返す
 */
HIRColor.Black = function()
{
	var res = HIRColor.RGB(0, 0, 0);

	return res;
}

/**
 * 赤を返す
 */
HIRColor.Red = function()
{
	var res = HIRColor.RGB(255, 0, 0);

	return res;
}

/**
 * 緑を返す
 */
HIRColor.Green = function()
{
	var res = HIRColor.RGB(0, 255, 0);

	return res;
}

/**
 * 青を返す
 */
HIRColor.Blue = function()
{
	var res = HIRColor.RGB(0, 0, 255);

	return res;
}


