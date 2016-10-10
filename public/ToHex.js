/*
	From opcodes to hex
*/

var generateByteCode1 = function(op, params, pc, labels, warnMissingLabel) {

        if (op === 'JUMPDEST') {
            labels[params] = pc.toString(16);
            params = '';
        }

        if (op === 'JUMP' || op === 'JUMPI') {
/*
            debugger;

            if (warnMissingLabel && !labels[params]) {
                throw new Error(`Cannot find destinaton for label ${params}`);
            }
            let dest = labels[params] || '0x00';
            let push = this.generateByteCode('PUSH', dest, 0, {});
*/
            let i = asHex(inst.getCode(op));

            return i;
        }

        const p = params.replace(/^0x/, '');//parseInt(params.replace(/^0x/, ''), 16).toString(16);
        const l = p.length / 2;
        const ll = Math.ceil(l);

        if (op === 'PUSH') {
            op = op + ll;
        }

        let i = inst.getCode(op);
debugger;
        if (i==undefined) {
            console.log("op: "+JSON.stringify(op));
            console.log("op: "+op);
            console.log("i: "+i);
            throw new Error(`Unknown instruction ${op}. Maybe it does not need params?`)
        }
        if (isNaN(parseInt(p, 16)) && params) {
            throw new Error(`Unable to parse params: ${params}`);
        }
        if (isNaN(parseInt(p, 16))) {
            return asHex(i).replace(/^0x/, '');
        }
        return asHex(i).replace(/^0x/, '') + ((l !== ll) ? `0${p}` : p);
    }



var result = function(code) {
debugger;
    let opcodes = code
        .split('\n')
        // Remove comments
        .map((line) => line.replace(/#.+/, ''))
        // Remove whitespace
        .map((line) => line.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/, ' '))
        .filter((line) => line)
        .map((line) => {
            let params = line.split(' ');
            const op = params.shift().toUpperCase();
            params = params.join('');
            return {
                op, params
            };
        });

    let labels = {};
    // Fill the labels
/*
    opcodes.reduce((code, opc) => {
        const pc = code.length / 2;
        return code + this.generateByteCode1(opc.op, opc.params, pc, labels, false);
    }, '');
*/

    //debugger;
    // Second time - labels filled properly
    return opcodes.reduce((code, opc) => {
        const pc = code.length / 2;
        return code + this.generateByteCode1(opc.op, opc.params, pc, labels, true);
    }, '');


}

$("#target1").click( function() {
    $("#hex").html("0x"+result($('#opcodes').val()));
});

