

var instructionToName =(function ()  {
	return _.zipObject(_.values(opcodes), _.keys(opcodes));
})();

var inst ={


"getName": function  (i) {
	return instructionToName[i];
}

,"getCode": function  (name) {
	return opcodes[name];
}

,"isPush": function  (i) {
	return i <= opcodes.PUSH32 && i >= opcodes.PUSH1;
}

,"getPushBytes":function  (i) {
	return i - opcodes.PUSH1 + 1;
}

}


var asHex2=function (i) {

	return '0x'+i.toUpperCase();
}

var asHex =function asHex(i) {
	let x = i.toString(16);
	if (x.length < 2) {
		return '0x0'+x;
	}
	return '0x'+x;
}

var padName =function (n) {
	return _.padEnd(n, 7, '\u00a0');
}



var	parseCode=function(bytes) {
		var pc = 0;
		var result = [];
		while (pc < bytes.length) {
			var i = parseInt(bytes[pc], 16);
			var name = inst.getName(i);
			if (!name) {
				var e = new Error('Unknown instruction: '+bytes[pc]+' at '+pc+'.');
				e.pos = pc;
				throw e;
			}
			var instruction = {
				pc: pc,
				name: inst.getName(i),
				opcode: i,
				param: ''
			};
			if (inst.isPush(i)) {
				var b = inst.getPushBytes(i);
				var info=bytes.slice(pc + 1, pc + b + 1).join('');
				var word = info;// parseInt(info, 16);
				//--console.log("info: "+info)
				//--console.log("word: "+word)
				///console.log("word: "+ asHex(word))
				instruction.param = asHex2(word);
				pc += b;
			}
			result.push(instruction);
			pc += 1;
		}


		return result;
	}