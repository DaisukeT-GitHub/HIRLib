/**
 * HIRCommon.js
 *
 * Copyright © 2018 tetsugaku.info.
 */
var HIRCommon = {};

// 状態
HIRCommon.STATE =
{
	READY : 0,			// 準備完了
	RUNNING : 1,		// 実行中
	COMPLETE : 2,	// 完了
}; 
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 一般
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * クランプ
 */
HIRCommon.Clamp = function(val, min, max) 
{
	if (val < min) return min;
	if (val > max) return max;
	
	return val;
}

/**
 * ラウンド
 */
HIRCommon.Round = function (val, min, max) 
{
	if (val < min) return max - (min - val);
	if (val > max) return min + (val - max);

	return val;
}

/**
 * フォーマット
 */
HIRCommon.Format = function(format) 
{
	for (var i = 1; i < arguments.length; i++) 
	{
		var reg = new RegExp('\\{' + (i - 1) + '\\}', 'g');
		format = format.replace(reg, arguments[i]);
	}

	return format;
}

/**
 * ディープコピー
 */
HIRCommon.DeepCopy = function(x)
{
	var res = $.extend(true, {}, x);
	
	return res;
}

/**
 * 点が矩形の中にあるか
 */
HIRCommon.IsPointInRect = function(px, py, rx, ry, rw, rh)
{
	if(px < rx) return false;
	if(py < ry) return false;
	if(px >= rx + rw) return false;
	if(py >= ry + rh) return false;
	
	return true;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Math
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * デグリー -> ラジアン
 */
HIRCommon.Deg2Rad = function(x)
{
	var res = ( x * Math.PI ) / 180;
	
	return res;
}

/**
 * ラジアン -> デグリー
 */
HIRCommon.Rad2Deg = function(x)
{
	var res = ( x * 180 ) / Math.PI;
	
	return res;
}

/**
 * sin 関数（デグリー）
 */
HIRCommon.Sin = function(x)
{
	var rad = HIRCommon.Deg2Rad(x);
	var res = Math.sin(rad);
	
	return res;
}

/**
 * cos 関数（デグリー）
 */
HIRCommon.Cos = function(x)
{
	var rad = HIRCommon.Deg2Rad(x);
	var res = Math.cos(rad);
	
	return res;
}

/**
 * 0 から x 未満の乱数を返す
 */
HIRCommon.Random = function(x)
{
	var res = Math.floor(Math.random() * x);

	return res;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 補間
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 線形
 */
HIRCommon.LerpST = function(x)
{
	return x;
}

/**
 * 早い -> 遅い
 */
HIRCommon.LerpFS = function(x)
{
	var res = HIRCommon.Sin(x * 90.0);

	return res;
}

/**
 * 遅い -> 早い
 */
HIRCommon.LerpSF = function(x)
{
	var res = 1.0 - HIRCommon.Cos(x * 90.0);

	return res;
}

/**
 * 円弧運動
 */
HIRCommon.LerpArc = function(x)
{
	var res = HIRCommon.Sin(x * 180.0);

	return res;
}

/**
 * 早い -> 遅い -> 早い
 */
HIRCommon.LerpFSF = function(x)
{
	var res;
	
	if(x < 0.5)
	{
		res = HIRCommon.Sin(x * 180.0) * 0.5;
	}
	else
	{
		res =  ( 1.0 - HIRCommon.Sin( x * 180.0 ) ) * 0.5 + 0.5; 
	}

	return res;
}

/**
 * 遅い -> 早い -> 遅い
 */
HIRCommon.LerpSFS = function(x)
{
	var res;
	
	if(x < 0.5)
	{
		res = ( 1.0 - HIRCommon.Cos( x * 180.0 ) ) * 0.5;
	}
	else
	{
		res =  HIRCommon.Cos( x * 180.0 ) * -0.5 + 0.5; 
	}

	return res;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 日時
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * UNIX 時間を返す
 */
HIRCommon.UnixTime = function()
{
	var date = new Date();
	var res = date.getTime();

	return res;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// ウェブ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * クエリのマップ
 */
HIRCommon.QueryMap = function()
{
	var res = {};
	var array  = window.location.search.slice(1).split('&');    

	for(var i = 0; i < array.length; i++)
	{
		var elm = array[i].split('=');
		res[elm[0]] = elm[1];
	}

    return res;
}



