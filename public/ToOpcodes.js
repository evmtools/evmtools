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

$("#target1").click( function() {

    var i = 0;
    var results = processsHexcode($("#hexcode").val());
/*
    $("#opcodes").html("");
    while(i<results.length){
        $("#opcodes").append("<tr><td>"+asHex(results[i].pc)+"</td><td>"+padName(results[i].name)+"</td><td>("+asHex(results[i].opcode)+")</td><td>"+asHex(results[i].param) +"</td></tr>");
        i++;
    }
*/

    var container = $('#opcodes'),
    table = $('<table class="table">');
    container.html("");
    results.forEach(function(result) {
      var tr = $('<tr>');
      ['pc', 'name', 'opcode','param'].forEach(function(attr) {
        tr.append('<td>' + (attr=="name" ? padName(result[attr]) : (attr=="param" ? result[attr] : asHex(result[attr])) + '</td>'));
      });
      table.append(tr);
    });

    container.append(table);
    $("</tr></table>");
});
