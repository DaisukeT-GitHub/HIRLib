/**
 * HIRTextManager.js
 *
 * Copyright © 2018 tetsugaku.info.
 */
var HIRTextManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRTextManager.mArray;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRTextManager.Init = function()
{
	HIRTextManager.mArray = new Array();
}

/**
 * 描画
 */
HIRTextManager.Draw = function(ctx, priority)
{
	for(var i = 0; i < HIRTextManager.mArray.length; i++)
	{
		var elm = HIRTextManager.mArray[i];
		if(elm.mPriority != priority) continue;

		HIRText.Draw(ctx, elm);
	}
}

/**
 * 要素を作成する
 */
HIRTextManager.Create = function()
{
	var res = new HIRText();

	HIRTextManager.mArray.push(res);

	// デフォルトパラメーター設定
	res.mIsVisible = false;
	res.mPriority = HIRDrawManager.PRIORITY_DEFAULT;
	res.mBaseline = HIRText.BASELINE_DEFAULT;
	res.mFont = HIRText.FONT_DEFAULT;

	return res;
}

/**
 * 要素を削除する
 */
HIRTextManager.Delete = function(elm)
{
	var index = HIRTextManager.mArray.indexOf(elm);
	if(index < 0) return;
	
	HIRTextManager.mArray.splice(index, 1);
}


