/**
 * trans/app.js
 *
 * Copyright © 2018 daisuke.t.
 */

var APP = {};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 画像名
APP.IMAGE_DOOR_CLOSED = "image/monty-hall-door-closed.png";



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
APP.mSprite;
APP.mSprite2;
APP.mSprite3;
APP.mSprite4;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 操作
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化する
 */
APP.Init = function(mode)
{
	var systemParam = HIRSystemParameter.Default();
	systemParam.mDebug = true;
	systemParam.mCanvasColor = HIRColor.Black();
	systemParam.mCallbackUpdate = APP.Update;
	HIRSystemManager.Init(systemParam);


	/**
	 * 画像ロード
	 */
	// リクエスト追加
	HIRImageManager.RequestAdd(APP.IMAGE_DOOR_CLOSED);

	// ロード開始
	HIRImageManager.LoadStart(APP.Start);
}

/**
 * 開始する
 */
APP.Start = function()
{
	var sprite = HIRSpriteManager.Create();
	sprite.mType = HIRSprite.TYPE.RECT;
	sprite.mIsVisible = true;
	sprite.mWidth = 128;
	sprite.mHeight = 64;
	sprite.mX = 	64;
	sprite.mY = 	64;
	sprite.mColor = HIRColor.Red();
	sprite.mIsAffine = true;
	APP.mSprite = sprite;
	
	
	var sprite2 = HIRSpriteManager.Create();
	sprite2.mType = HIRSprite.TYPE.ARC;
	sprite2.mIsVisible = true;
	sprite2.mRadius = 64;
	sprite2.mX = 64;
	sprite2.mY = 264;
	sprite2.mColor = HIRColor.Green();
	sprite2.mIsAffine = true;
	APP.mSprite2 = sprite2;
	
	var sprite3 = HIRSpriteManager.Create();
	sprite3.mType = HIRSprite.TYPE.IMAGE;
	sprite3.mIsVisible = true;
	sprite3.mImage = HIRImageManager.Image(APP.IMAGE_DOOR_CLOSED);
	sprite3.mWidth = sprite3.mImage.width * 0.3;
	sprite3.mHeight = sprite3.mImage.height * 0.3;
	sprite3.mX = 64;
	sprite3.mY = 464;
	sprite3.mIsAffine = true;
	APP.mSprite3 = sprite3;
	
	var sprite4 = HIRSpriteManager.Create();
	sprite4.mType = HIRSprite.TYPE.LINE;
	sprite4.mIsVisible = true;
	sprite4.mWidth = 10;
	sprite4.mColor = HIRColor.Blue();
	sprite4.mX = 160;
	sprite4.mY = 32;
	sprite4.mX2 = 256;
	sprite4.mY2 = 256;
	sprite4.mIsAffine = true;
	APP.mSprite4 = sprite4;


	HIRSystemManager.StateSet(HIRCommon.STATE.RUNNING);
}

APP.Update = function()
{
	APP.mSprite.mRotate += 3;
	APP.mSprite.mRotate = HIRCommon.Round(APP.mSprite.mRotate, 0, 360);	
	APP.mSprite.mColor.mAlpha = HIRCommon.LerpArc(APP.mSprite.mRotate / 360);
	APP.mSprite.mColor.mAlpha = HIRCommon.Round(APP.mSprite.mColor.mAlpha, 0, 1.0);
	HIRSprite.ScaleSet(APP.mSprite, HIRCommon.LerpArc(APP.mSprite.mRotate / 360 * 1.5));


	APP.mSprite2.mColor.mAlpha = APP.mSprite.mColor.mAlpha;
	HIRSprite.ScaleSet(APP.mSprite2, APP.mSprite.mScaleX);


	APP.mSprite3.mRotate = APP.mSprite.mRotate;
	APP.mSprite3.mColor.mAlpha = APP.mSprite.mColor.mAlpha;
	HIRSprite.ScaleSet(APP.mSprite3, APP.mSprite.mScaleX);


	APP.mSprite4.mColor.mAlpha = APP.mSprite.mColor.mAlpha;
}


