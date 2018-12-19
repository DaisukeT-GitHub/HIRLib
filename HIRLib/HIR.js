/**
 * HIR.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIR = {};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * HIR JavaScript ファイルをインポートする
 */
HIR.Import = function()
{
	var array = new Array(
		'../../HIRLib/HIRCommon.js',
		'../../HIRLib/HIRLogManager.js',
		'../../HIRLib/HIRType.js',
		'../../HIRLib/HIRColor.js',
		'../../HIRLib/HIRString.js',
		'../../HIRLib/HIRMouseManager.js',
		'../../HIRLib/HIRImageManager.js',
		'../../HIRLib/HIRCanvasManager.js',
		'../../HIRLib/HIRText.js',
		'../../HIRLib/HIRTextManager.js',
		'../../HIRLib/HIRSprite.js',
		'../../HIRLib/HIRSpriteManager.js',
		'../../HIRLib/HIRDrawManager.js',
		'../../HIRLib/HIRSystemParameter.js',
		'../../HIRLib/HIRSystemManager.js',
	);

	for(var i = 0; i < array.length; i++) 
	{
		document.write('<script type="text/javascript" src="' + array[i] +'" charset="utf-8"></script>');
	}
}

HIR.Import();


