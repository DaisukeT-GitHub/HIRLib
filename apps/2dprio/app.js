/**
 * 2dprio/app.js
 *
 * Copyright © 2018 tetsugaku.info.
 */

var APP = {};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 操作
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化する
 */
APP.Init = function(mode)
{
	var systemParam = HIRSystemParameter.Default();
	HIRSystemManager.Init(systemParam);


	var text = HIRTextManager.Create();
	text.mStr = "TEST";
	text.mColor = HIRColor.Red();
	text.mX = 0;
	text.mY = 0;
	text.mIsVisible = true;
	text.mPriority = HIRDrawManager.PRIORITY_MAX;

	var text2 = HIRTextManager.Create();
	text2.mStr = "TEST";
	text2.mColor = HIRColor.Blue();
	text2.mX = 0;
	text2.mY = 5;
	text2.mIsVisible = true;
	text2.mPriority = HIRDrawManager.PRIORITY_MIN;

	var sprite = HIRSpriteManager.Create();
	sprite.mType = HIRSprite.TYPE.RECT;
	sprite.mX = 5;
	sprite.mY = 5;
	sprite.mWidth = 64;
	sprite.mHeight = 30;
	sprite.mColor = HIRColor.White();
	sprite.mColor.mAlpha = 0.5;
	sprite.mIsVisible = true;
	sprite.mPriority = HIRDrawManager.PRIORITY_MIDDLE;
		
	HIRSystemManager.StateSet(HIRCommon.STATE.RUNNING);
}
