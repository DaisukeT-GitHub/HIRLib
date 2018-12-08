/**
 * HIRSystemManager.js
 *
 * Copyright © 2018 tetsugaku.info.
 */
var HIRSystemManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRSystemManager.mState;
HIRSystemManager.mParam;
HIRSystemManager.mTimer;
HIRSystemManager.mFPSText;	// FPS 用テキスト
HIRSystemManager.mFPSCnt;	// FPS 用カウンタ
HIRSystemManager.mFPSTime;	// FPS 用時間



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRSystemManager.Init = function(param)
{
	HIRSystemManager.mParam = param;	// パラメータを控える
	
	HIRLogManager.Init();			// ログマネージャーを初期化する
	HIRMouseManager.Init();	// マウスマネージャーを初期化する

	// キャンバスを初期化する
	HIRCanvasManager.Init(HIRSystemManager.mParam.mCanvasPrimaryID,
											HIRSystemManager.mParam.mCanvasBackID,
											HIRSystemManager.mParam.mCanvasWidth,
											HIRSystemManager.mParam.mCanvasHeight,
											HIRSystemManager.mParam.mCanvasColor);	

	HIRImageManager.Init();	// 画像マネージャーを初期化する
	HIRDrawManager.Init();	// 描画マネージャーを初期化する
	HIRSpriteManager.Init();	// スプライトマネージャーを初期化する
	HIRTextManager.Init();		// テキストマネージャーを初期化する

	HIRSystemManager.FPSInit();	// FPS を初期化する

	HIRSystemManager.StateSet(HIRCommon.STATE.READY);	// 状態を準備中にする
	HIRSystemManager.TimerInit();	// タイマーを初期化する
}

/**
 * 更新
 */
HIRSystemManager.Update = function()
{
	HIRSystemManager.FPSUpdate();	// FPS を更新する
	
	if(HIRSystemManager.State() != HIRCommon.STATE.RUNNING) return;	// 実行中状態ではない
		
	// 更新コールバック
	if(HIRSystemManager.mParam.mCallbackUpdate != null)
	{
		HIRSystemManager.mParam.mCallbackUpdate();
	}

	// 描画
	HIRCanvasManager.Clear(HIRCanvasManager.TYPE.BACK);		// キャンバスをクリアする
	var ctx = HIRCanvasManager.Context(HIRCanvasManager.TYPE.BACK);	// バックバッファを得る

	HIRDrawManager.Draw(ctx);	// バックバッファへ描画する

	HIRCanvasManager.Back2Primary();	// バックバッファの内容をプライマリに反映する
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 状態
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 状態を返す
 */
HIRSystemManager.State = function()
{
	return HIRSystemManager.mState;
}

/**
 * 状態を設定する
 */
HIRSystemManager.StateSet = function(state)
{
	HIRSystemManager.mState = state;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// タイマ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRSystemManager.TimerInit = function()
{
	// FPS タイマを開始する
	var interval = 1000 / HIRSystemManager.mParam.mFPS;
	HIRSystemManager.mTimer = setInterval("HIRSystemManager.TimerFunction()", interval);
}

/**
 * タイマ
 */
HIRSystemManager.TimerFunction = function()
{
	HIRSystemManager.Update();
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// FPS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * FPS を初期化する
 */
HIRSystemManager.FPSInit = function()
{
	HIRSystemManager.mFPSCnt = 0;
	HIRSystemManager.mFPSTime = HIRCommon.UnixTime();
	
	HIRSystemManager.mFPSText =  HIRTextManager.Create();
	HIRSystemManager.mFPSText.mStr = "...";
	HIRSystemManager.mFPSText.mColor = HIRColor.Gray();
	HIRSystemManager.mFPSText.mBaseline = HIRText.BASELINE.TOP;
	HIRSystemManager.mFPSText.mX = 0;
	HIRSystemManager.mFPSText.mY = 0;
	HIRSystemManager.mFPSText.mIsVisible = HIRSystemManager.mParam.mDebug;
}

/**
 * FPS を更新する
 */
HIRSystemManager.FPSUpdate = function()
{
	HIRSystemManager.mFPSCnt++;
	
	var time = HIRCommon.UnixTime();
	if(time >= HIRSystemManager.mFPSTime + 1000)
	{
		var str = HIRCommon.Format("FPS[{0}]", HIRSystemManager.mFPSCnt);
		HIRSystemManager.mFPSText.mStr = str;

		HIRSystemManager.mFPSCnt = 0;
		HIRSystemManager.mFPSTime = time;
	}
}


