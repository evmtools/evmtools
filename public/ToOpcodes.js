/*
	From hex to opcodes
*/

/*
//example

var code= '0x6001600054016000556000600060006000600073bbbf5374fce5edbc8e2a8697c15331677e6ebf0b610401600054046001036127105a0302f16001556103e860005402600101600255';
processsHexcode(code);

*/
function processsHexcode (_hexcode)
{

    var code = _hexcode.replace(/^0x/, '').replace(/\s/g, '');
    // Try to parse code
    var bytes = _.chunk(code, 2).map((x) => x.join(''));

    return parseCode(bytes);
/*
    //processs _hexcode
    return [{
    opcode:"PUSH",hexCode:"0x60", data:"0x01" ,"class":"push"
    },
    {
    opcode:"SLOAD",hexCode:"0x54", "class":"sload"
    }
    ];*/
}

$("#hexcode").bind("input propertychange", function() {

    var i = 0;
    var results = processsHexcode($("#hexcode").val());


    while(i<results.length){
        $("#opcodes").append("<tr><td>  "+asHex(results[i].pc)+"</td><td>  "+results[i].name+"</td><td>("+asHex(results[i].opcode)+")</td><td>  "+asHex(results[i].param) +"</td></tr>");
        i++;
    }
});
