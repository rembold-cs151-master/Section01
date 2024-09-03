
"use strict";

function MysteryDemo() {
    new MysteryTrace();
}

class MysteryTrace extends KarelTrace {

    constructor() {
        super("Mystery");
        this.install();
    }

    setParameters() {
        this.setMaxStackDepth(1);
        this.setFrameHeight(MysteryTrace.FRAME_HEIGHT);
        this.setFrameDeltas(MysteryTrace.FRAME_DX,
                            MysteryTrace.FRAME_DY);
        this.keepLastFrame(true);
    }

    defineFunctions() {
        this.defineFunction("mystery", new Mystery());
    }

    run() {
        this.call("mystery");
    }

    init() {
        let world = new KarelWorld(8, 5);
        let karel = world.getKarel();
        karel.setBeepersInBag(100);
        this._world = world;
        this._karel = karel;
    }

}

MysteryTrace.FRAME_HEIGHT = 370;
MysteryTrace.FRAME_DX = 16;
MysteryTrace.FRAME_DY = 62;


class Mystery extends CTFunction {

    constructor() {
        super(Mystery.HTML);
    }

    async run(ct) {
        let world = ct._world;
        let view = ct._view;
        let karel = world.getKarel();
        await ct.traceStep("#1");
        for (let i = 0; i < 4; i++) {
	    await ct.traceStep("#1a");
	    await ct.traceStep("#2");
            while (await ct.traceStep("#2a", ct.frontIsClear)) {
                await ct.traceStep("#3", ct.putBeeper);
                await ct.traceStep("#4", ct.move);
            }
            await ct.traceStep("#5", ct.turnLeft);
        }
    }

}

Mystery.HTML =
    "<span class='keyword'>import</span> karel\n\n" +
    "<span class='skeyword'>def</span> " +
        "<span class='funcname'>mystery</span>():\n" +
    "    <span class='#1'><span class='keyword'>for</span> " +
         "<span class='#1a'>i <span class='keyword'>in</span> " +
         "<span class='builtin'>range</span>(4)</span>:</span>\n" +
    "        <span class='#2'><span class='keyword'>while</span> " +
         "<span class='#2a'>front<span class='u'>_</span>is" +
         "<span class='u'>_</span>clear()</span>:</span>\n" +
    "            <span class='#3'>put<span class='u'>_</span>" +
         "beeper()</span>\n" +
    "            <span class='#4'>move()</span>\n" +
    "        <span class='#5'>turn<span class='u'>_</span>left()</span>\n";
