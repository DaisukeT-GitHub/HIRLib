/**
 * text/app.js
 *
 * Copyright © 2018 daisuke.t.
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
	text.mStr = "Big Text";
	text.mFont = "36pt Times";
	text.mColor = HIRColor.Red();
	text.mBaseline = HIRText.BASELINE.TOP;
	text.mX = 0;
	text.mY = 0;
	text.mIsVisible = true;
	var size = HIRText.Size(HIRCanvasManager.Context(HIRCanvasManager.TYPE.BACK), text);

	var sprite = HIRSpriteManager.Create();
	sprite.mType = HIRSprite.TYPE.RECT;
	sprite.mPriority = HIRDrawManager.PRIORITY_LOW;
	sprite.mX = 0;
	sprite.mY = 0;
	sprite.mWidth = size.mWidth;
	sprite.mHeight = size.mHeight;
	sprite.mColor = HIRColor.Gray();
	sprite.mIsVisible = true;

	var text2 = HIRTextManager.Create();
	text2.mFont = HIRText.FONT_DEFAULT_SMALL;
	text2.mStr = "app.js";
	text2.mColor = HIRColor.Green();
	text2.mBaseline = HIRText.BASELINE.TOP;
	text2.mX = 0;
	text2.mY = 30;
	text2.mIsVisible = true;
	var size2 = HIRText.Size(HIRCanvasManager.Context(HIRCanvasManager.TYPE.BACK), text2);

	var text3 = HIRTextManager.Create();
	text3.mFont = HIRText.FONT_DEFAULT_LARGE;
	text3.mStr = "app.js";
	text3.mColor = HIRColor.Blue();
	text3.mBaseline = HIRText.BASELINE.TOP;
	text3.mX = 0;
	text3.mY = 60;
	text3.mIsVisible = true;
	var size3 = HIRText.Size(HIRCanvasManager.Context(HIRCanvasManager.TYPE.BACK), text3);

	HIRSystemManager.StateSet(HIRCommon.STATE.RUNNING);
}
