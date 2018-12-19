/**
 * HIRSpriteManager.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIRSpriteManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRSpriteManager.mArray;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRSpriteManager.Init = function()
{
	HIRSpriteManager.mArray = new Array();
}

/**
 * 描画
 */
HIRSpriteManager.Draw = function(ctx, priority)
{
	for(var i = 0; i < HIRSpriteManager.mArray.length; i++)
	{
		var elm = HIRSpriteManager.mArray[i];
		if(elm.mPriority != priority) continue;

		HIRSprite.Draw(ctx, elm);
	}
}

/**
 * 要素を作成する
 */
HIRSpriteManager.Create = function()
{
	var res = new HIRSprite();
	
	HIRSpriteManager.mArray.push(res);
	
	// デフォルトパラメーター設定
	res.mIsVisible = false;
	res.mPriority = HIRDrawManager.PRIORITY_DEFAULT;
	res.mRotate = 0;
	HIRSprite.ScaleSet(res, 1.0, 1.0);
	res.mColor = HIRColor.White();
	res.mIsAffine = false;
	
	return res;
}

/**
 * 要素を削除する
 */
HIRSpriteManager.Delete = function(elm)
{
	var index = HIRSpriteManager.mArray.indexOf(elm);
	if(index < 0) return;
	
	HIRSpriteManager.mArray.splice(index, 1);
}


