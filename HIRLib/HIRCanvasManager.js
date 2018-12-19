/**
 * HIRCanvasManager.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIRCanvasManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 種別
HIRCanvasManager.TYPE =
{
	PRIMARY : 0,
	BACK : 1,
}; 


 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化する
 */
HIRCanvasManager.Init = function(primaryID, backID, width, height, color)
{
	// 設定
	HIRCanvasManager.mPrimaryID = primaryID;
	HIRCanvasManager.mBackID = backID;
	HIRCanvasManager.mWidth = width;
	HIRCanvasManager.mHeight = height;
	HIRCanvasManager.mColor = color;
	HIRCanvasManager.mCallbackMap = {};

	// プライマリ
	HIRCanvasManager.InitPrimary(width, height);

	// バックバッファ
	HIRCanvasManager.InitBack(width, height);
}

/**
 * 初期化する（プライマリバッファ）
 */
HIRCanvasManager.InitPrimary = function(width, height)
{
	var canvas = HIRCanvasManager.Canvas(HIRCanvasManager.TYPE.PRIMARY);
	canvas.width = width;
	canvas.height = height;
	HIRCanvasManager.Clear(HIRCanvasManager.TYPE.PRIMARY);
	
	// イベントを登録する
	canvas.addEventListener(HIRMouseManager.EVENT_NAME.CLICK, HIRCanvasManager.MouseEventOnClick, false);
	canvas.addEventListener(HIRMouseManager.EVENT_NAME.OVER, HIRCanvasManager.MouseEventOnOver, false);
	canvas.addEventListener(HIRMouseManager.EVENT_NAME.OUT, HIRCanvasManager.MouseEventOnOut, false);
	canvas.addEventListener(HIRMouseManager.EVENT_NAME.MOVE, HIRCanvasManager.MouseEventOnMove, false);
	canvas.addEventListener(HIRMouseManager.EVENT_NAME.UP, HIRCanvasManager.MouseEventOnUp, false);
	canvas.addEventListener(HIRMouseManager.EVENT_NAME.DOWN, HIRCanvasManager.MouseEventOnDown, false);
}

/**
 * 初期化する（バックバッファ）
 */
HIRCanvasManager.InitBack = function(width, height)
{
	var canvas = HIRCanvasManager.Canvas(HIRCanvasManager.TYPE.BACK);
	canvas.width = width;
	canvas.height = height;
	canvas.style.display = "none";
	HIRCanvasManager.Clear(HIRCanvasManager.TYPE.BACK);
}

/**
 * クリアする
 */
HIRCanvasManager.Clear = function(type)
{
	var ctx = HIRCanvasManager.Context(type);
	ctx.fillStyle = HIRColor.CSS(HIRCanvasManager.mColor);
	ctx.fillRect(0, 0, HIRCanvasManager.mWidth, HIRCanvasManager.mHeight);
}

/**
 * バックの内容をプライマリに反映
 */
HIRCanvasManager.Back2Primary = function()
{
	var ctxBack = HIRCanvasManager.Context(HIRCanvasManager.TYPE.BACK);
	var data = ctxBack.getImageData(0, 0, HIRCanvasManager.mWidth, HIRCanvasManager.mHeight);
	
	var ctxPrimary = HIRCanvasManager.Context(HIRCanvasManager.TYPE.PRIMARY);
	ctxPrimary.putImageData(data, 0, 0);
}
  
/**
 * キャンバス
 */
HIRCanvasManager.Canvas = function(type)
{
	var map = {};
	map[HIRCanvasManager.TYPE.PRIMARY] = HIRCanvasManager.mPrimaryID;
	map[HIRCanvasManager.TYPE.BACK] = HIRCanvasManager.mBackID;
	
	var canvasID = map[type];
	var canvas = $(canvasID);

	return canvas[0];
}
 
/**
 * キャンバスのコンテキスト
 */
HIRCanvasManager.Context = function(type)
{
	return HIRCanvasManager.Canvas(type).getContext('2d');
}

/**
 * キャンバスのサイズ
 */
HIRCanvasManager.Size = function()
{
	var res = {};
	res.mWidth = HIRCanvasManager.mWidth;
	res.mHeight = HIRCanvasManager.mHeight;
	
	return res;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// イベント
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * イベントコールバックを設定する
 */
HIRCanvasManager.MouseEventSetCallback = function(name, callback)
{
	HIRCanvasManager.mCallbackMap[name] = callback;
}

HIRCanvasManager.MouseEventOnClick = function(event)
{
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
    
	// HIRLogManager.LogDev("mouseclick[%d,%d]", x, y);
	
	if(HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.CLICK] == null) return;
	HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.CLICK](x, y);
}

HIRCanvasManager.MouseEventOnOver = function(event)
{
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
    
	// HIRLogManager.LogDev("mouseover[%d,%d]", x, y);

	if(HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.OVER] == null) return;
	HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.OVER](x, y);
}

HIRCanvasManager.MouseEventOnOut = function(event)
{
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
    
	// HIRLogManager.LogDev("mouseout[%d,%d]", x, y);

	if(HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.OUT] == null) return;
	HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.OUT](x, y);
}

HIRCanvasManager.MouseEventOnMove = function(event)
{
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
    
	// HIRLogManager.LogDev("mousemove[%d,%d]", x, y);

	if(HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.MOVE] == null) return;
	HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.MOVE](x, y);
}

HIRCanvasManager.MouseEventOnUp = function(event)
{
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
    
	// HIRLogManager.LogDev("mouseup[%d,%d]", x, y);

	if(HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.UP] == null) return;
	HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.UP](x, y);
}

HIRCanvasManager.MouseEventOnDown = function(event)
{
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;

	// HIRLogManager.LogDev("mousedown[%d,%d]", x, y);

	if(HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.DOWN] == null) return;
	HIRCanvasManager.mCallbackMap[HIRMouseManager.EVENT_NAME.DOWN](x, y);
}
