/*
	From hex to opcodes
*/


function processsHexcode (_hexcode)
{
    //processs _hexcode
    return [{
    opcode:"PUSH",hexCode:"0x60", data:"0x01" ,"class":"push"
    },
    {
    opcode:"SLOAD",hexCode:"0x54", "class":"sload"
    }
    ];
}

$("#hexcode").bind("input propertychange", function() {

    $("#opcodes").css("color", "red");
    $("#opcodes").html("<em>#RETURN:</em>");
});
