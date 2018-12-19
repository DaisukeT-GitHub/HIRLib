/**
 * HIRMouseManager.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIRMouseManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// コンストラクタ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// スタイル
HIRMouseManager.STYLE = 
{
	AUTO : "auto",
	POINTER : "pointer",
};

// イベント名
HIRMouseManager.EVENT_NAME =
{
	CLICK : "click",
	OVER : "mouseover",
	OUT : "mouseout",
	MOVE : "mousemove",
	UP : "up",
	DOWN : "down",
};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRMouseManager.Init = function()
{
}
 
/**
 * スタイルを設定する
 */
HIRMouseManager.StyleSet = function(style)
{
	document.body.style.cursor = style;
}


