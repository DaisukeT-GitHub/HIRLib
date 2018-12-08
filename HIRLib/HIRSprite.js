/**
 * HIRSprite.js
 *
 * Copyright © 2018 tetsugaku.info.
 */
var HIRSprite = {};
HIRSprite = function(){}	// new 演算子用コンストラクタ



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 種別
HIRSprite.TYPE = 
{
	IMAGE : 0,
	LINE : 1,
	RECT : 2,
	ARC : 3,
};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRSprite.mType;
HIRSprite.mX;
HIRSprite.mY;
HIRSprite.mX2;
HIRSprite.mY2;
HIRSprite.mWidth;
HIRSprite.mHeight;
HIRSprite.mRadius;
HIRSprite.mColor;
HIRSprite.mImage;
HIRSprite.mIsVisible;
HIRSprite.mPriority;
HIRSprite.mRotate;	// デグリー角
HIRSprite.mScaleX;
HIRSprite.mScaleY;
HIRSprite.mIsAffine;	// アフィン変換が有効か



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 描画
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 描画する
 */
HIRSprite.Draw = function(ctx, elm)
{
	if(!elm.mIsVisible) return;		// 非表示設定

	if(elm.mType == HIRSprite.TYPE.IMAGE)
	{
		HIRSprite.DrawImage(ctx, elm);
	} 
	else if(elm.mType == HIRSprite.TYPE.LINE)
	{
		HIRSprite.DrawLine(ctx, elm);
	} 
	else if(elm.mType == HIRSprite.TYPE.RECT)
	{
		HIRSprite.DrawRect(ctx, elm);
	} 
	else if(elm.mType == HIRSprite.TYPE.ARC)
	{
		HIRSprite.DrawArc(ctx, elm);
	} 
}

/**
 * 描画する（線）
 */
HIRSprite.DrawLine = function(ctx, elm)
{
	ctx.save();	// コンテキスト状態を保存

	// パス設定
	ctx.beginPath();
	ctx.moveTo(elm.mX, elm.mY);
	ctx.lineTo(elm.mX2, elm.mY2);
	ctx.closePath();
	
	// 描画
	ctx.strokeStyle = HIRColor.CSS(elm.mColor);
	ctx.lineWidth = elm.mWidth;
	ctx.stroke();

	ctx.restore();	// コンテキスト状態を復帰
}

/**
 * 描画する（矩形）
 */
HIRSprite.DrawRect = function(ctx, elm)
{
	var width_half = elm.mWidth >> 1;
	var height_half = elm.mHeight >> 1;

	ctx.save();	// コンテキスト状態を保存

	if(elm.mIsAffine)
	{
		// アフィン変換
		ctx.translate(elm.mX + width_half, elm.mY + height_half); 
		ctx.rotate(HIRCommon.Deg2Rad(elm.mRotate)) ;
		ctx.scale(elm.mScaleX, elm.mScaleY) ;
		ctx.translate(-(elm.mX + width_half), -(elm.mY + height_half)); 
	}

	// 描画
	ctx.fillStyle = HIRColor.CSS(elm.mColor);
	ctx.fillRect(elm.mX, elm.mY, elm.mWidth, elm.mHeight);

	ctx.restore();	// コンテキスト状態を復帰
}

/**
 * 描画する（円）
 */
HIRSprite.DrawArc = function(ctx, elm)
{
	var radius_half = elm.mRadius >> 1;

	ctx.save();	// コンテキスト状態を保存

	if(elm.mIsAffine)
	{
		// アフィン変換
		ctx.translate(elm.mX + radius_half, elm.mY + radius_half); 
		ctx.rotate(HIRCommon.Deg2Rad(elm.mRotate)) ;
		ctx.scale(elm.mScaleX, elm.mScaleY) ;
		ctx.translate(-(elm.mX + radius_half), -(elm.mY + radius_half)); 
	}

	// パス設定
	ctx.beginPath();
	ctx.arc(elm.mX + radius_half, 
				elm.mY + radius_half, 
				elm.mRadius,
				0,
				HIRCommon.Deg2Rad(360),
				true);
	ctx.closePath();

	// 描画
	ctx.fillStyle = HIRColor.CSS(elm.mColor);
	ctx.fill();
	
	ctx.restore();	// コンテキスト状態を復帰
}

/**
 * 描画する（画像）
 */
HIRSprite.DrawImage = function(ctx, elm)
{
	if(elm.mImage == null) return;

	var width_half = elm.mWidth >> 1;
	var height_half = elm.mHeight >> 1;

	ctx.save();	// コンテキスト状態を保存

	if(elm.mIsAffine)
	{
		// アフィン変換
		ctx.translate(elm.mX + width_half, elm.mY + height_half); 
		ctx.rotate(HIRCommon.Deg2Rad(elm.mRotate)) ;
		ctx.scale(elm.mScaleX, elm.mScaleY) ;
		ctx.translate(-(elm.mX + width_half), -(elm.mY + height_half)); 
	}

	ctx.globalAlpha = elm.mColor.mAlpha;
	ctx.drawImage(elm.mImage, elm.mX, elm.mY, elm.mWidth, elm.mHeight);
	
	ctx.restore();	// コンテキスト状態を復帰
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// プロパティ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * スケール設定
 */
HIRSprite.ScaleSet = function(elm, scale)
{
	elm.mScaleX = scale;
	elm.mScaleY = scale;
}

