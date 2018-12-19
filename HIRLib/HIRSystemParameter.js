/**
 * HIRSystemParameter.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIRSystemParameter = {};
HIRSystemParameter = function(){}	// new 演算子用コンストラクタ



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRSystemParameter.FPS_DEFAULT = 60;
HIRSystemParameter.CANVAS_ID_PRIMARY_DEFAULT = "#canvas";
HIRSystemParameter.CANVAS_ID_BACK_DEFAULT = "#canvas_back";
HIRSystemParameter.CANVAS_WIDTH_DEFAULT = 800;
HIRSystemParameter.CANVAS_HEIGHT_DEFAULT = 600;
HIRSystemParameter.CANVAS_COLOR_DEFAULT = HIRColor.White();



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRSystemParameter.mDebug;
HIRSystemParameter.mFPS;
HIRSystemParameter.mCanvasPrimaryID;
HIRSystemParameter.mCanvasBackID;
HIRSystemParameter.mCanvasWidth;
HIRSystemParameter.mCanvasHeight;
HIRSystemParameter.mCanvasColor;
HIRSystemParameter.mCallbackUpdate;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * デフォルト設定のパラメーターを得る
 */
HIRSystemParameter.Default = function()
{
	var res = new HIRSystemParameter();
	
	res.mDebug = false;
	res.mFPS = HIRSystemParameter.FPS_DEFAULT;
	res.mCanvasPrimaryID = HIRSystemParameter.CANVAS_ID_PRIMARY_DEFAULT;
	res.mCanvasBackID = HIRSystemParameter.CANVAS_ID_BACK_DEFAULT;
	res.mCanvasWidth = HIRSystemParameter.CANVAS_WIDTH_DEFAULT;
	res.mCanvasHeight = HIRSystemParameter.CANVAS_HEIGHT_DEFAULT;
	res.mCanvasColor = HIRSystemParameter.CANVAS_COLOR_DEFAULT;
	res.mCallbackUpdate = null;
	
	return res;
}

