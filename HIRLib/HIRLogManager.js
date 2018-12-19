/**
 * HIRLogManager.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIRLogManager = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// メソッド
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 初期化
 */
HIRLogManager.Init = function()
{
}

/**
 * デバッグログ
 */
HIRLogManager.LogDev = function()
{
    console.log.apply(console, arguments);
}

/**
 * 情報ログ
 */
HIRLogManager.LogInfo = function()
{
    console.info.apply(console, arguments);
}

/**
 * 警告ログ
 */
HIRLogManager.LogWarn = function()
{
    console.warn.apply(console, arguments);
}

/**
 * エラーログ
 */
HIRLogManager.LogErr = function()
{
    console.error.apply(console, arguments);
}


