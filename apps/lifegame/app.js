/**
 * lifegame/app.js
 *
 * Copyright © 2018 tetsugaku.info.
 */

var APP = {};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
APP.ANIM_CNT_MAX = 60;		// アニメカウンタ最大値
APP.ANIM_END_WAIT_CNT_MAX = 90;	// アニメ終了後のウェイトカウンタ最大値
APP.RESET_GENERATION = (APP.ANIM_CNT_MAX + APP.ANIM_END_WAIT_CNT_MAX) * 200;

// モード
APP.MODE =
{
	CLASSIC : 0,
	PASTEL : 1,
};

// 状態
APP.STATE = 
{
	NONE : 0,	// なし
	ANIM : 1,		// アニメ中
	ANIM_END_WAIT : 2,		// アニメ終了後のウェイト
};



/**
 * セル
 */
// サイズ
APP.CELL_WIDTH = 24;
APP.CELL_HEIGHT = 24;

// 個数
APP.CELL_NUM_X = 24;
APP.CELL_NUM_Y = 24;
APP.CELL_NUM = APP.CELL_NUM_X * APP.CELL_NUM_Y;

// 密度
APP.CELL_DENSITY = 0.3888;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
APP.mMode;		// モード
APP.mCells;			// セル
APP.mTimer;		// タイマ
APP.mState;		// 状態
APP.mCnt;			// カウンタ
APP.mResetGenerationCnt;	// リセットカウンタ



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// セル
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * セル　クラス
 */
APP.Cell = function()
{
	this.mState = HIRCommon.STATE.READY;			// 状態
	this.mNextState = HIRCommon.STATE.READY;	// 次の状態
	this.mColor = APP.CellColor(APP.mMode);		// 色
	this.mRate = 1.0;		// レート
	this.mSprite;			// スプライト
}

/**
 *  初期化
 */
APP.CellInit = function()
{
	APP.mCells = new Array();

	for(i = 0; i < APP.CELL_NUM; i++)
	{
		var elm = new APP.Cell();
		elm.mState = HIRCommon.STATE.READY;
		elm.mSprite = HIRSpriteManager.Create();
		elm.mSprite.mIsVisible = false;

		APP.mCells.push(elm);
	}
}

/**
 * 解放
 */
APP.CellRelease = function()
{
	for(i = 0; i < APP.CELL_NUM; i++)
	{
		var elm = APP.mCells[i];
		HIRSpriteManager.Delete(elm.mSprite);
	}
}

/**
 * ランダムに配置
 */
APP.CellRandomSet = function()
{
	for(i = 0; i < APP.CELL_NUM; i++)
	{
		var rnd = Math.random();

		var elm = APP.mCells[i];
		elm.mState = HIRCommon.STATE.READY;

		if(rnd > APP.CELL_DENSITY) continue;

		elm.mState = HIRCommon.STATE.RUNNING;
	}
}

/**
 * セルを更新する
 */
APP.CellUpdate = function()
{
	if(APP.mState == APP.STATE.NONE)
	{
		APP.CellUpdateState();
	}
	if(APP.mState == APP.STATE.ANIM)
	{
		APP.CellUpdateAnim();
	}
	if(APP.mState == APP.STATE.ANIM_END_WAIT)
	{
		APP.CellUpdateAnimEndWait();
	}
	
	APP.CellUpdateSprite();
}

/**
 * セルの状態更新をする
 */
APP.CellUpdateState = function()
{
	for(y = 0; y < APP.CELL_NUM_Y; y++)
	{
	 	var yIndex = y * APP.CELL_NUM_X;

		for(x = 0; x < APP.CELL_NUM_X; x++)
		{
			var elm = APP.mCells[ yIndex + x ];

			// 周囲の生存しているセルの数を得る
			var num = APP.CellAroundLiveNum(x, y);

			// 次の状態を設定する
			elm.mNextState = APP.CellState(elm.mState, num);
		}
	}
	
	APP.mState = APP.STATE.ANIM;
}

/**
 * 現在のセルの状態、周囲の生存数から新しい状態を返す
 */
APP.CellState = function(state, aroundNum)
{
	var res = HIRCommon.STATE.READY;

	if(state == HIRCommon.STATE.RUNNING)
	{
		// 対象セルが生存
		if(aroundNum == 2 || aroundNum == 3)
		{
			// 生存
			res = HIRCommon.STATE.RUNNING;
		}
		else
		{
			// 過疎 or 過密
			res = HIRCommon.STATE.READY;
		}
	}
	else
	{
		// 対象セルが死滅
		if(aroundNum == 3)
		{
			// 誕生
			res = HIRCommon.STATE.RUNNING;
		}
		else
		{
			// 変化なし
			res = HIRCommon.STATE.READY;
		}
	}
 
	return res; 	
}

/**
 * 周囲の生存しているセルの数を返す
 */
APP.CellAroundLiveNum = function(x, y)
{
	var res = 0;

	for(i = -1; i <= 1; i++)
	{
		var yIndex = (y + i) * APP.CELL_NUM_X;

		for(j = -1; j <= 1; j++)
		{
			if(i == 0 && j == 0) continue;
			if(x + j < 0) continue;
			if(x + j >= APP.CELL_NUM_X) continue;
			if(y + i < 0) continue;
			if(y + i >= APP.CELL_NUM_Y) continue;

			var elm = APP.mCells[yIndex + x + j];
			if(elm.mState == HIRCommon.STATE.READY) continue;

			res++;
		}
	}

	return res;
}

/**
 * セルのアニメ更新をする
 */
APP.CellUpdateAnim = function()
{
	/**
	 * アルファ値を更新する
	 */
	var rate = APP.mCnt / APP.ANIM_CNT_MAX;
	rate = HIRCommon.Clamp(rate, 0.0, 1.0);

	$.each(APP.mCells, function(i, elm) {
		if(elm.mState == elm.mNextState) return;

		if(elm.mNextState == HIRCommon.STATE.RUNNING)
		{
			elm.mRate = HIRCommon.LerpSFS(rate);
		}
		else if(elm.mNextState == HIRCommon.STATE.READY)
		{
			elm.mRate = HIRCommon.LerpSFS(1.0 - rate);
		}

	});
	
	
	if(APP.mCnt++ > APP.ANIM_CNT_MAX)
	{
		// アニメ終了
		APP.mCnt = 0;
		APP.mState = APP.STATE.ANIM_END_WAIT;
		
		$.each(APP.mCells, function(i, elm) {
			elm.mRate  = 1.0;
			
			elm.mState = elm.mNextState;
		});
	}
}

/**
 * アニメ終了後のウェイトを更新する
 */
APP.CellUpdateAnimEndWait = function()
{
	if(APP.mCnt++ < APP.ANIM_END_WAIT_CNT_MAX) return;
	
	APP.mCnt = 0;
	APP.mState = APP.STATE.NONE;
}



/**
 * スプライトを更新する
 */
 APP.CellUpdateSprite = function()
{
	for(y = 0; y < APP.CELL_NUM_Y; y++)
	{
 	 	var yIndex = y * APP.CELL_NUM_X;

		for(x = 0; x < APP.CELL_NUM_X; x++)
		{
			var elm = APP.mCells[ yIndex + x ]; 	 		
			APP.CellUpdateSpriteElement(APP.mMode, x, y, elm);
		}
	}
}

/**
 * スプライトを更新する（セル要素）
 */
APP.CellUpdateSpriteElement = function(mode, x, y, elm)
{
	if(elm.mState == HIRCommon.STATE.READY && elm.mNextState == HIRCommon.STATE.READY)
	{
		// 非表示
		elm.mSprite.mIsVisible = false;
		return;
	}

	elm.mSprite.mIsVisible = true;
	
	if(mode == APP.MODE.PASTEL)
	{
		/**
		 * パステル
		 */
		elm.mSprite.mType = HIRSprite.TYPE.ARC;
		elm.mSprite.mColor = HIRColor.RGB(elm.mColor.mRed, elm.mColor.mGreen, elm.mColor.mBlue);
		elm.mSprite.mX = x * APP.CELL_WIDTH + (APP.CELL_WIDTH * 0.5);
		elm.mSprite.mY = y * APP.CELL_HEIGHT + (APP.CELL_HEIGHT * 0.5);
		elm.mSprite.mRadius = APP.CELL_WIDTH * 0.5 * elm.mRate;
		
		return;
	}


	// デフォルト
	elm.mSprite.mType = HIRSprite.TYPE.RECT;
	elm.mSprite.mColor = HIRColor.RGBA(elm.mColor.mRed, elm.mColor.mGreen, elm.mColor.mBlue, elm.mRate);	
	elm.mSprite.mX = x * APP.CELL_WIDTH;
	elm.mSprite.mY = y * APP.CELL_HEIGHT;
	elm.mSprite.mWidth = APP.CELL_WIDTH;
	elm.mSprite.mHeight = APP.CELL_HEIGHT;
}



/**
 * セルの色
 */
APP.CellColor = function(mode)
{
	var res = 	HIRColor.Green();

	if(mode == APP.MODE.PASTEL)
	{
		// 	パステルカラー
		var array = APP.CellColorsPastel();
		var rnd = HIRCommon.Random(array.length);
		
		res = array[rnd];
	}

	return res;
}

/**
 * セルのパステルカラー配列
 */
APP.CellColorsPastel = function()
{
	var res = [
		HIRColor.RGB(255, 127, 127),
		HIRColor.RGB(255, 127, 191),
		HIRColor.RGB(255, 127, 255),
		HIRColor.RGB(191, 127, 255),
		HIRColor.RGB(127, 127, 255),
		HIRColor.RGB(127, 191, 255),
		HIRColor.RGB(127, 255, 255),
		HIRColor.RGB(127, 255, 191),
		HIRColor.RGB(127, 255, 127),
		HIRColor.RGB(191, 255, 127),
		HIRColor.RGB(255, 255, 127),
		HIRColor.RGB(255, 191, 127),
	];
	
	return res;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 操作
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化する
 */
APP.Init = function(str)
{
	var mode = APP.String2Mode(str);
	
	// システムを初期化する
	var sysParam = HIRSystemParameter.Default();
	// sysParam.mDebug = true;
	sysParam.mCallbackUpdate = APP.Update;
	sysParam.mCanvasWidth = APP.CELL_WIDTH * APP.CELL_NUM_X;
	sysParam.mCanvasHeight = APP.CELL_HEIGHT * APP.CELL_NUM_Y;
	sysParam.mCanvasColor = APP.CanvasColor(mode);
	HIRSystemManager.Init(sysParam);


	// アプリ系初期化する
	APP.mMode = mode;
	APP.mState = APP.STATE.NONE;
	APP.mCnt = 0;
	APP.mResetGenerationCnt = 0;
	APP.CellInit();					// セルを初期化する
	APP.CellRandomSet();		// セルをランダムセットする


	// システムを開始状態にする
	HIRSystemManager.StateSet(HIRCommon.STATE.RUNNING);
}

/**
 * 更新する
 */
APP.Update = function()
{
	APP.CellUpdate();		// セルを更新する

	if(APP.mResetGenerationCnt++ < APP.RESET_GENERATION) return;
	
	// リセット
	APP.mState = APP.STATE.NONE;
	APP.mCnt = 0;
	APP.mResetGenerationCnt = 0;
	APP.CellRelease();			// セルを解放する
	APP.CellInit();					// セルを初期化する
	APP.CellRandomSet();		// セルをランダムセットする
}

/**
 * 文字列 -> モード
 */
APP.String2Mode = function(str)
{
	if(str == "pastel") return APP.MODE.PASTEL;
	
	return APP.MODE.CLASSIC;
}

/**
 * キャンバスの色
 */
APP.CanvasColor = function(mode)
{
	var map = {};
	map[APP.MODE.CLASSIC] = HIRColor.Black();
	map[APP.MODE.PASTEL] = HIRColor.White();

	var res = map[mode];
	
	return res;	
}
 