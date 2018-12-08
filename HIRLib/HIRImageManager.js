/**
 * HIRImageManager.js
 *
 * Copyright © 2018 tetsugaku.info.
 */
var HIRImageManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メンバ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
HIRImageManager.mMap = {};
HIRImageManager.mCallback;



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRImageManager.Init = function()
{
	HIRImageManager.mMap = {};
}

/**
 * 取得
 */
HIRImageManager.Image = function(key)
{
	var res = HIRImageManager.mMap[key];
	
	return res;
}

/**
 * 要素数を返す
 */
HIRImageManager.Num = function()
{
	var res = Object.keys(HIRImageManager.mMap).length;
	
	return res;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// ロード
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * ロードリクエスト追加
 */
HIRImageManager.RequestAdd = function(file)
{
	HIRImageManager.mMap[file] = null;
}

/**
 * ロード開始
 */
HIRImageManager.LoadStart = function(callback)
{
	if(callback == null)
	{
		// コールバックが無効
		HIRCommon.LogWarn("callbak is null.");
		return;
	}
	
	HIRImageManager.mCallback = callback;

	HIRImageManager.LoadIndexRecursive(0);
}

/**
 * インデックスから再帰的にロードする
 */
HIRImageManager.LoadIndexRecursive = function(index)
{
	if(index >= HIRImageManager.Num())
	{
		// 終了
		HIRImageManager.mCallback();
		return;
	}
	
	// キーを準備する
	var key = Object.keys(HIRImageManager.mMap)[index];
	var key2 = HIRCommon.Format("{0}?_={1}",  key, HIRCommon.UnixTime());

	// ロードする
	var image = new Image();
	image.src = key2;
	image.onload = function() {
		// ロード完了
		// -> 次のロードへ遷移する
		HIRImageManager.mMap[key] = image;
		HIRImageManager.LoadIndexRecursive(++index);
	}
}


