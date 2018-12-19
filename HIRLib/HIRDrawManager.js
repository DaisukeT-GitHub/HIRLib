/**
 * HIRDrawManager.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIRDrawManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 優先度
HIRDrawManager.PRIORITY_MIN = 0;
HIRDrawManager.PRIORITY_LOW = 8;
HIRDrawManager.PRIORITY_MIDDLE = 16;
HIRDrawManager.PRIORITY_HIGH = 24;
HIRDrawManager.PRIORITY_MAX = 32;

HIRDrawManager.PRIORITY_DEFAULT = HIRDrawManager.PRIORITY_MIDDLE;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRDrawManager.Init = function()
{
}

/**
 * 描画
 */
HIRDrawManager.Draw = function(ctx)
{
    for(var i = HIRDrawManager.PRIORITY_MIN; i <= HIRDrawManager.PRIORITY_MAX; i++)
    {
    	HIRDrawManager.DrawSprite(ctx, i);
	    HIRDrawManager.DrawText(ctx, i);
	}
}

/**
 * スプライトを描画する
 */
HIRDrawManager.DrawSprite = function(ctx, priority)
{
   	HIRSpriteManager.Draw(ctx, priority);
}

/**
 * テキストを描画する
 */
HIRDrawManager.DrawText = function(ctx, priority)
{
	HIRTextManager.Draw(ctx, priority);
}


