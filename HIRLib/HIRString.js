/**
 * HIRString.js
 *
 * Copyright © 2018 daisuke.t.
 */
var HIRString = {};
 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 列挙、定数
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 一般
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * 空かどうか
 */
HIRString.IsEmpty = function(str)
{
	if(!str) return true;
	if(str.length === 0) return true;
	
	return false;
}
