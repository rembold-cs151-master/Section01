
"use strict";

//Beeper line should already have been loaded, but in case it is not
if (typeof PutBeeperLine !== 'function') {

    class PutBeeperLine extends CTFunction {

        constructor() {
            super(PutBeeperLine.HTML);
        }
        
        async run(ct) {
            let world = ct._world;
            let view = ct._view;
            let karel = world.getKarel();
            await ct.traceStep("#1");
        while (await ct.traceStep("#1a", ct.frontIsClear)) {
            await ct.traceStep("#2", ct.putBeeper);
                await ct.traceStep("#3", ct.move);
            }
            await ct.traceStep("#4", ct.putBeeper);
            await ct.traceStep(null);
                
        }

    }

    PutBeeperLine.HTML =
        "<span class='keyword'>def</span> " +
            "put<span class='u'>_</span>beeper<span class='u'>_</span>line():\n" +
            "    <span class='#1'><span class='keyword'>while</span> " +
                 "<span class='#1a'>front<span class='u'>_</span>" +
                 "is<span class='u'>_</span>clear()</span>:</span>\n" +
            "        <span class='#2'>put<span class='u'>_</span>" +
                 "beeper()</span>\n" +
            "        <span class='#3'>move()</span>\n" +
            "    <span class='#4'>put<span class=u>_</span>beeper()</span>\n";
}

function PutBeeperBorderDemo() {
    new PutBeeperBorderTrace();
}

class PutBeeperBorderTrace extends KarelTrace {

    constructor() {
        super("PutBeeperBorder");
        this.install();
    }

    setParameters() {
        this.setMaxStackDepth(2);
        this.setFrameHeight(PutBeeperBorderTrace.FRAME_HEIGHT);
        this.setFrameDeltas(PutBeeperBorderTrace.FRAME_DX,
                            PutBeeperBorderTrace.FRAME_DY);
        this.keepLastFrame(true);
    }

    defineFunctions() {
        this.defineFunction("put_beeper_border", new PutBeeperBorder());
        this.defineFunction("put_beeper_line", new PutBeeperLine());
    }

    run() {
        this.call("put_beeper_border");
    }

    init() {
        let world = new KarelWorld(8, 5);
        let karel = world.getKarel();
        karel.setBeepersInBag(100);
        this._world = world;
        this._karel = karel;
    }

}

PutBeeperBorderTrace.FRAME_HEIGHT = 370;
PutBeeperBorderTrace.FRAME_DX = 16;
PutBeeperBorderTrace.FRAME_DY = 62;


class PutBeeperBorder extends CTFunction {

    constructor() {
        super(PutBeeperBorder.HTML);
    }

    async run(ct) {
        let world = ct._world;
        let view = ct._view;
        let karel = world.getKarel();
        await ct.traceStep("#1");
        for (let i = 0; i < 4; i++) {
	    await ct.traceStep("#1a");
            await ct.traceStep("#2", ct.move);
            await ct.traceStep("#3", async function() {
                                           await ct.call("put_beeper_line");
                                       });
            await ct.traceStep("#4", ct.turnLeft);
        }
    }
}

PutBeeperBorder.HTML =
    "<span class='keyword'>import</span> karel\n\n" +
    "<span class='skeyword'>def</span> " +
        "<span class='funcname'>put_beeper_border</span>():\n" +
    "    <span class='#1'><span class='keyword'>for</span> " +
         "<span class='#1a'>i <span class='keyword'>in</span> " +
         "<span class='builtin'>range</span>(4)</span>:</span>\n" +
    "        <span class='#2'>move()</span>\n" +
    "        <span class='#3'>put<span class='u'>_</span>beeper" +
         "<span class='u'>_</span>line()</span>:</span>\n" +
    "        <span class='#4'>turn<span class='u'>_</span>left()</span>\n";
