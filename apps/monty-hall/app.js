/**
 * monty-hall/app.js
 *
 * Copyright © 2018 daisuke.t.
 */

var APP = {};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 状態
APP.STATE = 
{
	SELECT_FIRST : 0,			// 最初の選択
	OPEN_ANOTHER : 1,			// ひとつを開けられる
	SELECT_SECOND : 2,		// ２回目の選択
	END : 3,	// 終了
};

// 最初にあたり		SELECT_FIRST -> END
// ２回目にあたり	SELECT_FIRST -> OPEN_ANOTHER -> SELECT_SECOND -> END
// ２回目に外れ		SELECT_FIRST -> OPEN_ANOTHER -> SELECT_SECOND -> END

APP.AUTO_TEST_NUM = 10000;	// 自動選択の試行回数

// モード
APP.MODE =
{
	MANUAL : 0,	// 手動
	AUTO : 1,			// 自動
};


// 画像名
APP.IMAGE_DOOR_CLOSED = "image/monty-hall-door-closed.png";
APP.IMAGE_DOOR_OPEND_LOSE = "image/monty-hall-door-opend-lose.png";
APP.IMAGE_DOOR_OPEND_WIN = "image/monty-hall-door-opend-win.png";


/**
 * キャンバス
 */
// サイズ
APP.CANVAS_WIDTH = 640;
APP.CANVAS_HEIGHT = 480;


/**
 * ドア
 */
// サイズ
APP.DOOR_WIDTH = 240 * 0.3;
APP.DOOR_HEIGHT = 400 * 0.3;
APP.MARGIN = 64;	// マージン

// 個数
APP.DOOR_NUM = 3;

// 状態
APP.DOOR_STATE = 
{
	CLOSED : 0,
	OPENED : 1,
};

// ドアの結果
APP.DOOR_RESULT= 
{
	LOSE : 0,
	WIN : 1,
};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
APP.mMode;			// モード
APP.mState;			// 状態
APP.mDoors;			// ドア
APP.mTotalNum;			// 回数
APP.mTotalWinNum;	// あたりの回数



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// ドア
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * ドア　クラス
 */
APP.Door = function()
{
	this.mState = APP.DOOR_STATE.CLOSED;	// 状態
	this.mResult = APP.DOOR_RESULT.LOSE;	// 結果
	this.mSprite;	// スプライト
}

/**
 *  初期化
 */
APP.DoorInit = function()
{
	APP.mDoors = new Array();

	for(i = 0; i < APP.DOOR_NUM; i++)
	{
		// ドア要素を準備する
		var elm = new APP.Door();
		elm.mState = APP.DOOR_STATE.CLOSED;
		elm.mResult = APP.DOOR_RESULT.LOSE;

		// スプライトを準備する
		var rect = APP.DoorRect(i);
		var sprite = HIRSpriteManager.Create();
		sprite.mType = HIRSprite.TYPE.IMAGE;
		sprite.mX = rect.x;
		sprite.mY = rect.y;
		sprite.mWidth = rect.w;
		sprite.mHeight = rect.h;
		sprite.mIsVisible = true;
		elm.mSprite = sprite;

		APP.mDoors.push(elm);
	}
}

/**
 * ランダムに結果を設定
 */
APP.DoorRandomSetResult = function()
{
	var rnd = HIRCommon.Random(APP.DOOR_NUM);

	var elm = APP.mDoors[rnd];
	elm.mResult = APP.DOOR_RESULT.WIN;
}

/**
 * ドアの矩形を返す
 */
APP.DoorRect = function(no)
{	
	var canvasWidth = HIRCanvasManager.Size().mWidth;
	var canvasHeight = HIRCanvasManager.Size().mHeight;
	
	var orignX = (canvasWidth - (APP.DOOR_WIDTH * APP.DOOR_NUM) - (APP.MARGIN * (APP.DOOR_NUM -1) ) ) / 2;
	x = orignX + (APP.DOOR_WIDTH * no) + (APP.MARGIN * no);
	var y = (canvasHeight - APP.DOOR_HEIGHT) / 2;
	
	var res = {};
	res.x = x;
	res.y = y;
	res.w = APP.DOOR_WIDTH;
	res.h = APP.DOOR_HEIGHT;

	return res;
}

/**
 * ドア更新
 */
APP.DoorUpdate = function()
{
	for(i = 0; i < APP.mDoors.length; i++)
	{
		var elm = APP.mDoors[i];
		var image = APP.DoorImage(elm);
		elm.mSprite.mImage = image;
	}
}

/**
 * ドア画像を返す
 */
APP.DoorImage = function(elm)
{
	if(elm.mState == APP.DOOR_STATE.CLOSED)
	{
		return HIRImageManager.Image(APP.IMAGE_DOOR_CLOSED);
	}
	
	if(elm.mResult == APP.DOOR_RESULT.LOSE)
	{
		return HIRImageManager.Image(APP.IMAGE_DOOR_OPEND_LOSE);
	}

	return HIRImageManager.Image(APP.IMAGE_DOOR_OPEND_WIN);
}

/**
 * 点が含まれる矩形のドアを返す
 */
APP.DoorPointInRect = function(x, y)
{
	var res = null;
	
	for(var i = 0; i < APP.mDoors.length; i++)
	{
		var elm = APP.mDoors[i];
				
		var inRect = HIRCommon.IsPointInRect(x, y, elm.mSprite.mX, elm.mSprite.mY, elm.mSprite.mWidth, elm.mSprite.mHeight);
		if(inRect == false) continue;
		
		res = elm;
		break;
	}
	
	return res;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// マウスイベント
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
APP.MouseEventOnClick = function(x, y)
{
	var elm = APP.DoorPointInRect(x, y);
	if(elm == null || elm.mState == APP.DOOR_STATE.OPENED)
	{
		return;
	}

	elm.mState = APP.DOOR_STATE.OPENED;
}

APP.MouseEventOnMove = function(x, y)
{
	var elm = APP.DoorPointInRect(x, y);
	if(elm == null || elm.mState == APP.DOOR_STATE.OPENED)
	{
		HIRMouseManager.StyleSet(HIRMouseManager.STYLE.AUTO);
		return;
	}

	HIRMouseManager.StyleSet(HIRMouseManager.STYLE.POINTER);
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 操作
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化する
 */
APP.Init = function()
{
	// システムを初期化する
	var sysParam = HIRSystemParameter.Default();
	sysParam.mCallbackUpdate = APP.Update;
	sysParam.mCanvasWidth = APP.CANVAS_WIDTH;
	sysParam.mCanvasHeight = APP.CANVAS_HEIGHT;
	sysParam.mCanvasColor = HIRColor.RGB(247,247,247);
	HIRSystemManager.Init(sysParam);
	
	
	// キャンバスのイベントにコールバックを設定する
	HIRCanvasManager.MouseEventSetCallback(HIRMouseManager.EVENT_NAME.CLICK, APP.MouseEventOnClick);
	HIRCanvasManager.MouseEventSetCallback(HIRMouseManager.EVENT_NAME.MOVE, APP.MouseEventOnMove);
	
	
	/**
	 * 画像ロード
	 */
	// リクエスト追加
	HIRImageManager.RequestAdd(APP.IMAGE_DOOR_CLOSED);
	HIRImageManager.RequestAdd(APP.IMAGE_DOOR_OPEND_LOSE);
	HIRImageManager.RequestAdd(APP.IMAGE_DOOR_OPEND_WIN);

	// ロード開始
	HIRImageManager.LoadStart(APP.Start);
}

/**
 * 開始する
 */
APP.Start = function()
{
	// ドアを初期化する
	APP.DoorInit();	
	APP.DoorRandomSetResult();		// ドアをランダムセットする
	APP.DoorUpdate();	

	// システムを開始状態にする
	HIRSystemManager.StateSet(HIRCommon.STATE.RUNNING);
}

/**
 * 更新する
 */
APP.Update = function()
{
	APP.DoorUpdate();		// ドアを更新する
}


