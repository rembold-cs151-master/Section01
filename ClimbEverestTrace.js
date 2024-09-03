
"use strict";

if (typeof StepUp !== 'function') {
    class StepUp extends CTFunction {

        constructor() {
            super(StepUp.HTML);
        }

        async run(ct) {
            let world = ct._world;
            let view = ct._view;
            let karel = world.getKarel();
            let cf = ct.getCurrentFrame();
            await ct.traceStep("#1", ct.turnLeft);
            await ct.traceStep("#2", ct.move);
            await ct.traceStep("#3", async function() {
                                            await ct.call("turn_right");
                                        });
            await ct.traceStep("#4", ct.move);
        }

    }

    StepUp.HTML =
        "<span class='keyword'>def</span> step<span class='u'>_</span>up():\n" +
        "    <span class='#1'>turn<span class='u'>_</span>left()</span>\n" +
        "    <span class='#2'>move()</span>\n" +
        "    <span class='#3'>turn<span class='u'>_</span>right()</span>\n" +
        "    <span class='#4'>move()</span>\n";
}

if (typeof TurnRight !== 'function') {
    class TurnRight extends CTFunction {

        constructor() {
            super(TurnRight.HTML);
        }

        async run(ct) {
            let world = ct._world;
            let view = ct._view;
            let karel = world.getKarel();
            let cf = ct.getCurrentFrame();
            await ct.traceStep("#1", ct.turnLeft);
            await ct.traceStep("#2", ct.turnLeft);
            await ct.traceStep("#3", ct.turnLeft);
        }

    }

    TurnRight.HTML =
        "<span class='keyword'>def</span> turn<span class='u'>_</span>right():\n" +
        "    <span class='#1'>turn<span class='u'>_</span>left()</span>\n" +
        "    <span class='#2'>turn<span class='u'>_</span>left()</span>\n" +
        "    <span class='#3'>turn<span class='u'>_</span>left()</span>\n";
}

if (typeof DropDown !== 'function') {
    class DropDown extends CTFunction {

        constructor() {
            super(DropDown.HTML);
        }

        async run(ct) {
            let world = ct._world;
            let view = ct._view;
            let karel = world.getKarel();
            let cf = ct.getCurrentFrame();
            await ct.traceStep("#1", async function() {
                                            await ct.call("turn_right");
                                        });
            await ct.traceStep("#2", ct.move);
            await ct.traceStep("#3", ct.turnLeft);
            if (await ct.traceStep("#4", ct.frontIsClear)) {
            await ct.traceStep("#5", ct.move);
            }
        }

    }

    DropDown.HTML =
        "<span class='keyword'>def</span> drop<span class='u'>_</span>down():\n" +
        "    <span class='#1'>turn<span class='u'>_</span>right()</span>\n" +
        "    <span class='#2'>move()</span>\n" +
        "    <span class='#3'>turn<span class='u'>_</span>left()</span>\n" +
        "    <span class='#4'><span class='keyword'>if</span> " +
             "front<span class='u'>_</span>is" +
             "<span class='u'>_</span>clear():</span>\n" +
        "        <span class='#5'>move()</span>\n";
}

if (typeof MoveToWall !== 'function') {
    class MoveToWall extends CTFunction {

        constructor() {
            super(MoveToWall.HTML);
        }

        async run(ct) {
            let world = ct._world;
            let view = ct._view;
            let karel = world.getKarel();
            await ct.traceStep("#1");
        while (await ct.traceStep("#1a", ct.frontIsClear)) {
            await ct.traceStep("#2", ct.move);
            }
            await ct.traceStep("#3");
        }

    }

    MoveToWall.HTML =
        "<span class='keyword'>def</span> move<span class='u'>_</span>" +
             "to<span class='u'>_</span>wall():\n" +
        "    <span class='#1'><span class='keyword'>while</span> " +
             "<span class='#1a'>front<span class='u'>_</span>is" +
             "<span class='u'>_</span>clear()</span>:</span>\n" +
        "        <span class='#2'>move()</span>\n" +
        "<span class='#3'> </span>\n";
}

function ClimbMountainDemo() {
    new ClimbMountainTrace();
}

if (typeof ClimbMountainTrace !== 'function') {
    class ClimbMountainTrace extends KarelTrace {

        constructor(title="ClimbMountain") {
            super(title);
            this.install();
        }

        setParameters() {
            this.setMaxStackDepth(3);
            this.setFrameHeight(ClimbMountainTrace.FRAME_HEIGHT);
            this.setFrameDeltas(ClimbMountainTrace.FRAME_DX,
                                ClimbMountainTrace.FRAME_DY);
            this.keepLastFrame(true);
        }

        defineFunctions() {
            this.defineFunction("climb_mountain", new ClimbMountain());
            this.defineFunction("step_up", new StepUp());
            this.defineFunction("drop_down", new DropDown());
            this.defineFunction("move_to_wall", new MoveToWall());
            this.defineFunction("turn_right", new TurnRight());
        }

        run() {
            this.call("climb_mountain");
        }

        init() {
            let world = new KarelWorld(11, 6);
            let karel = world.getKarel();
            world.setWall(3, 1, Direction.WEST);
            world.setWall(3, 2, Direction.SOUTH);
            world.setWall(4, 2, Direction.WEST);
            world.setWall(4, 3, Direction.SOUTH);
            world.setWall(5, 3, Direction.WEST);
            world.setWall(5, 4, Direction.SOUTH);
            world.setWall(6, 4, Direction.WEST);
            world.setWall(6, 5, Direction.SOUTH);
            world.setWall(7, 4, Direction.WEST);
            world.setWall(7, 4, Direction.SOUTH);
            world.setWall(8, 3, Direction.WEST);
            world.setWall(8, 3, Direction.SOUTH);
            world.setWall(9, 2, Direction.WEST);
            world.setWall(9, 2, Direction.SOUTH);
            world.setWall(10, 1, Direction.WEST);
            karel.setBeepersInBag(1);
            this._world = world;
            this._karel = karel;
        }

    }

    ClimbMountainTrace.FRAME_HEIGHT = 625;
    ClimbMountainTrace.FRAME_DX = 16;
    ClimbMountainTrace.FRAME_DY = 62;
}

if (typeof ClimbMountain !== 'function') {
    class ClimbMountain extends CTFunction {

        constructor() {
            super(ClimbMountain.HTML);
        }

        async run(ct) {
            let world = ct._world;
            let view = ct._view;
            let karel = world.getKarel();
            await ct.traceStep("#1", async function() {
                                               await ct.call("move_to_wall");
                                           });
            await ct.traceStep("#2");
            while (await ct.traceStep("#2a", ct.frontIsBlocked)) {
            await ct.traceStep("#3", async function() {
                                             await ct.call("step_up");
                                         });
            }
            await ct.traceStep("#4", ct.putBeeper);
            await ct.traceStep("#5", ct.move);
            await ct.traceStep("#6");
            while (await ct.traceStep("#6a", ct.rightIsClear)) {
            await ct.traceStep("#7", async function() {
                                             await ct.call("drop_down");
                                         });
            }
            await ct.traceStep("#8", async function() {
                                               await ct.call("move_to_wall");
                                           });
        }
    }

    ClimbMountain.HTML =
        "<span class='keyword'>import</span> karel\n\n" +
        "<span class='skeyword'>def</span> " +
            "<span class='funcname'>climb<span class='u'>_</span>mountain</span>():\n" +
        "    <span class='#1'>move<span class='u'>_</span>to" +
             "<span class='u'>_</span>wall()</span>\n" +
        "    <span class='#2'><span class='keyword'>while</span> " +
             "<span class='#2a'>front<span class='u'>_</span>is" +
             "<span class='u'>_</span>blocked()</span>:</span>\n" +
        "        <span class='#3'>step<span class='u'>_</span>up()</span>\n" +
        "    <span class='#4'>put<span class='u'>_</span>beeper()</span>\n" +
        "    <span class='#5'>move()</span>\n" +
        "    <span class='#6'><span class='keyword'>while</span> " +
             "<span class='#6a'>right<span class='u'>_</span>is" +
             "<span class='u'>_</span>clear()</span>:</span>\n" +
        "        <span class='#7'>drop<span class='u'>_</span>down()</span>\n" +
        "    <span class='#8'>move<span class='u'>_</span>to" +
             "<span class='u'>_</span>wall()\n";
}

function ClimbEverestDemo() {
    new ClimbEverestTrace();
}

class ClimbEverestTrace extends ClimbMountainTrace {

    constructor() {
        super("ClimbEverest");
    }

    init() {
        let world = new KarelWorld(15, 8);
        let karel = world.getKarel();
	world.setWall(2, 1, Direction.WEST);
	world.setWall(2, 2, Direction.SOUTH);
	world.setWall(3, 2, Direction.WEST);
	world.setWall(3, 3, Direction.SOUTH);
	world.setWall(4, 3, Direction.WEST);
	world.setWall(4, 4, Direction.SOUTH);
	world.setWall(5, 4, Direction.WEST);
	world.setWall(5, 5, Direction.SOUTH);
	world.setWall(6, 5, Direction.WEST);
	world.setWall(6, 6, Direction.SOUTH);
	world.setWall(7, 6, Direction.WEST);
	world.setWall(7, 7, Direction.SOUTH);
	world.setWall(8, 7, Direction.WEST);
	world.setWall(8, 8, Direction.SOUTH);
	world.setWall(9, 7, Direction.WEST);
	world.setWall(9, 7, Direction.SOUTH);
	world.setWall(10, 6, Direction.WEST);
	world.setWall(10, 6, Direction.SOUTH);
	world.setWall(11, 5, Direction.WEST);
	world.setWall(11, 5, Direction.SOUTH);
	world.setWall(12, 4, Direction.WEST);
	world.setWall(12, 4, Direction.SOUTH);
	world.setWall(13, 3, Direction.WEST);
	world.setWall(13, 3, Direction.SOUTH);
	world.setWall(14, 2, Direction.WEST);
	world.setWall(14, 2, Direction.SOUTH);
	world.setWall(15, 1, Direction.WEST);
        karel.setBeepersInBag(1);
        this._world = world;
        this._karel = karel;
    }

}

