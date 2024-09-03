
"use strict";


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
    "<span class='skeyword'>def</span> " +
        "<span class='funcname'>put<span class='u'>_</span>beeper<span class='u'>_</span>line</span>():\n" +
        "    <span class='#1'><span class='keyword'>while</span> " +
             "<span class='#1a'>front<span class='u'>_</span>" +
             "is<span class='u'>_</span>clear()</span>:</span>\n" +
        "        <span class='#2'>put<span class='u'>_</span>" +
             "beeper()</span>\n" +
        "        <span class='#3'>move()</span>\n" +
        "    <span class='#4'>put<span class=u>_</span>beeper()</span>\n";

function BuggyPutBeeperBorderDemo() {
    new BuggyPutBeeperBorderTrace();
}

class BuggyPutBeeperBorderTrace extends KarelTrace {

    constructor() {
        super("BuggyPutBeeperBorder");
        this.install();
    }

    setParameters() {
        this.setMaxStackDepth(2);
        this.setFrameHeight(BuggyPutBeeperBorderTrace.FRAME_HEIGHT);
        this.setFrameDeltas(BuggyPutBeeperBorderTrace.FRAME_DX,
                            BuggyPutBeeperBorderTrace.FRAME_DY);
        this.keepLastFrame(true);
    }

    defineFunctions() {
        this.defineFunction("put_beeper_border", new BuggyPutBeeperBorder());
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

BuggyPutBeeperBorderTrace.FRAME_HEIGHT = 370;
BuggyPutBeeperBorderTrace.FRAME_DX = 16;
BuggyPutBeeperBorderTrace.FRAME_DY = 62;


class BuggyPutBeeperBorder extends CTFunction {

    constructor() {
        super(BuggyPutBeeperBorder.HTML);
    }

    async run(ct) {
        let world = ct._world;
        let view = ct._view;
        let karel = world.getKarel();
        await ct.traceStep("#1");
        for (let i = 0; i < 4; i++) {
	    await ct.traceStep("#1a");
            await ct.traceStep("#2", async function() {
                                           await ct.call("put_beeper_line");
                                       });
            await ct.traceStep("#3", ct.turnLeft);
        }
    }
}

BuggyPutBeeperBorder.HTML =
    "<span class='keyword'>import</span> karel\n\n" +
    "<span class='skeyword'>def</span> " +
        "<span class='funcname'>put_beeper_border</span>():\n" +
    "    <span class='#1'><span class='keyword'>for</span> " +
         "<span class='#1a'>i <span class='keyword'>in</span> " +
         "<span class='builtin'>range</span>(4)</span>:</span>\n" +
    "        <span class='#2'>put<span class='u'>_</span>beeper" +
         "<span class='u'>_</span>line()</span>:</span>\n" +
    "        <span class='#3'>turn<span class='u'>_</span>left()</span>\n";

PutBeeperLine.HTML =
    "<span class='skeyword'>def</span> " +
        "<span class='funcname'>put<span class='u'>_</span>beeper<span class='u'>_</span>line</span>():\n" +
        "    <span class='#1'><span class='keyword'>while</span> " +
             "<span class='#1a'>front<span class='u'>_</span>" +
             "is<span class='u'>_</span>clear()</span>:</span>\n" +
        "        <span class='#2'>put<span class='u'>_</span>" +
             "beeper()</span>\n" +
        "        <span class='#3'>move()</span>\n" +
        "    <span class='#4'>put<span class=u>_</span>beeper()</span>\n";
