/*
	From hex to opcodes
*/

$("#hexcode").bind("input propertychange", function() {

    $("#opcodes").css("color", "red");
    $("#opcodes").html("<em>#RETURN:</em>");
});
