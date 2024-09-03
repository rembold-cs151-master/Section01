/*
 * File: karel.js
 * --------------
 * This file implements a class for displaying Karel execution in a
 * <CANVAS> element.
 */

"use strict";

class KC { /* Empty */ }

KC.INFINITE = 99999999;
KC.PLUS1 = -1;
KC.MINUS1 = -2;
KC.BLANKB = -3;

KC.SIMPLE = 0;
KC.FANCY = 1;

KC.MAX_APPLICATION_WIDTH = 1200;
KC.MAX_APPLICATION_HEIGHT = 800;
KC.SCREEN_WIDTH_MARGIN = 20;
KC.SCREEN_HEIGHT_MARGIN = 60;
KC.WORLD_WIDTH = 400;
KC.WORLD_HEIGHT = 400;
KC.CONSOLE_WIDTH = 400;
KC.CONSOLE_HEIGHT = 100;
KC.EDITOR_WIDTH = 400;
KC.EDITOR_HEIGHT = 510;
KC.LEFT_MARGIN = 10;
KC.RIGHT_MARGIN = 10;
KC.TOP_MARGIN = 10;
KC.BOTTOM_MARGIN = 10;
KC.COMPONENT_SEP = 10;

KC.LEFT_NUMBER_MARGIN = 30;
KC.BOTTOM_NUMBER_MARGIN = 36;
KC.DOUBLE_WALL_THRESHOLD = 24;
KC.CROSS_THRESHOLD = 11;
KC.NUMBER_THRESHOLD = 15;
KC.RESIZE_BG_DX = -2;
KC.RESIZE_BG_DY = -10;
KC.RESIZE_BG_DW = 4;
KC.RESIZE_BG_HEIGHT = 12;

KC.EDITOR_FONT = "18px 'Menlo','Courier New',Monospace";
KC.CONSOLE_FONT = "18px 'Menlo','Courier New',Monospace";
KC.NUMBER_FONT = "40px 'Times New Roman',Serif";
KC.RESIZE_FONT = "40px 'Times New Roman',Serif";
KC.RESIZE_X_FONT = "40px  'Helvetica Neue',Sans-Serif";
KC.RESIZE_BG = "#FFCCFF";

KC.TICK_FRACTION = 0.20;
KC.WALL_FRACTION = 0.30;
KC.WALL_TOLERANCE = 0.15;

KC.MAX_WIDTH = 50;
KC.MAX_HEIGHT = 50;

KC.TOKEN_TRACE = false;
KC.MAX_TRACE_SPEED = 80;

KC.BEEPER_FILL_COLOR = "#66d9ef";
KC.KAREL_FILL_COLOR = "#ffe792";
KC.WALL_COLOR = "#a6e22e";
KC.APPLICATION_BACKGROUND = "#272822";
KC.MARKED_COLOR = "DarkGray";
KC.INFINITY_SYMBOL = "\u221E";
KC.BEEPER_FONT_FAMILY = "'Times New Roman','Times',serif";
KC.BEEPER_BORDER = 1;
KC.MIN_FANCY = 20;
KC.MIN_BEEPER = 4;
KC.MIN_LABEL = 15;
KC.KAREL_FRACTION = 0.55;
KC.BEEPER_FRACTION = 0.70;
KC.SIMPLE_FRACTION = 0.70;
KC.BEEPER_LABEL_FRACTION = 0.60;
KC.BEEPER_LABEL_DROP = 0.35;
KC.BEEPER_LABEL_MAX_SIZE = 32;
KC.BEEPER_LABEL_MIN_SIZE = 6;

KC.KAREL_INSET = 7;
KC.BODY_OFFSET_X = -0.20;
KC.BODY_OFFSET_Y = -0.33;
KC.BODY_WIDTH = 0.60;
KC.BODY_HEIGHT = 0.80;
KC.UPPER_NOTCH = 0.15;
KC.LOWER_NOTCH = 0.10;
KC.SCREEN_OFFSET_X = -0.07;
KC.SCREEN_OFFSET_Y = -0.05;
KC.SCREEN_WIDTH = 0.30;
KC.SCREEN_HEIGHT = 0.40;
KC.SLOT_WIDTH = 0.15;
KC.FOOT_WIDTH = 0.08;
KC.FOOT_LENGTH = 0.20;
KC.UPPER_ANKLE = 0.08;
KC.LOWER_ANKLE = 0.08;

KC.SELECTED_BORDER_COLOR = "Blue";
KC.SELECTED_BORDER_WIDTH = 2;
KC.BIG_TOOL_SIZE = 24;
KC.WALL_TOOL_SIZE = 24;
KC.KAREL_TOOL_SIZE = 32;
KC.COLOR_TOOL_SIZE = 24;
KC.BEEPER_TOOL_SIZE = 26;
KC.ARC_DX_FRACTION = -0.05;
KC.ARC_DY_FRACTION = 0.13;
KC.ARC_RADIUS_FRACTION = 0.28;
KC.ARC_ARROW_SIZE_FRACTION = 0.18;
KC.EXIT_TOOL_SIZE = 24;
KC.EXIT_CHECK_FRACTION = 0.65;
KC.CHECK_LINEWIDTH = 3;
KC.TOOL_SEP = 7;
KC.TOOL_Y_DELTA = 12;
KC.TOOL_MARGIN = 20;
KC.TOOL_X = 24;
KC.TOOL_Y = 3;
KC.LABEL_SEP = 5;
KC.WALL_TOOL_LENGTH = 12;
KC.WALL_LINEWIDTH = 4;
KC.COLOR_KAREL_TOOL_SIZE = 20;
KC.COLOR_BEEPER_TOOL_SIZE = 22;
KC.COLOR_EXIT_TOOL_SIZE = 20;
KC.DISK_SIZE = 14;
KC.DISK_CORNER = 3;
KC.DISK_MASK_X = 2;
KC.DISK_MASK_Y = 1;
KC.DISK_MASK_WIDTH = 11;
KC.DISK_MASK_HEIGHT = 6;
KC.DISK_SLOT_X = 9;
KC.DISK_SLOT_Y = 2;
KC.DISK_SLOT_WIDTH = 2;
KC.DISK_SLOT_HEIGHT = 4;
KC.CROSS_SIZE = 10;
KC.CROSS_LINEWIDTH = 3;
KC.BEEPER_BAG_WIDTH = 35;
KC.BEEPER_BAG_HEIGHT = 47;
KC.BAG_LABEL_DELTA_Y = 28;
KC.RESIZE_TOOL_SIZE = 46;
KC.RESIZE_DY = 4;

KC.COLORS = [
    null,
    "Black",
    "DarkGray",
    "Gray",
    "LightGray",
    "White",
    "Red",
    "Pink",
    "Orange",
    "Yellow",
    "Green",
    "Cyan",
    "Blue",
    "Magenta"
];

class Direction { /* Empty */ }

Direction.directionName = function(dir) {
    switch (dir) {
      case Direction.NORTH: return "NORTH";
      case Direction.EAST:  return "EAST";
      case Direction.SOUTH: return "SOUTH";
      case Direction.WEST:  return "WEST";
    }
    return null;
};

Direction.leftFrom = function(dir) {
    switch (dir) {
      case Direction.NORTH: return Direction.WEST;
      case Direction.EAST:  return Direction.NORTH;
      case Direction.SOUTH: return Direction.EAST;
      case Direction.WEST:  return Direction.SOUTH;
    }
    throw new RuntimeException("Illegal direction");
};

Direction.rightFrom = function(dir) {
    switch (dir) {
      case Direction.NORTH: return Direction.EAST;
      case Direction.EAST:  return Direction.SOUTH;
      case Direction.SOUTH: return Direction.WEST;
      case Direction.WEST:  return Direction.NORTH;
    }
    throw new RuntimeException("Illegal direction");
};

Direction.oppositeDirection = function(dir) {
    switch (dir) {
      case Direction.NORTH: return Direction.SOUTH;
      case Direction.EAST:  return Direction.WEST;
      case Direction.SOUTH: return Direction.NORTH;
      case Direction.WEST:  return Direction.EAST;
    }
    throw new RuntimeException("Illegal direction");
};

Direction.adjacentPoint = function(pt, dir) {
    switch (dir) {
      case Direction.NORTH: return new Point(pt.x, pt.y + 1);
      case Direction.EAST:  return new Point(pt.x + 1, pt.y);
      case Direction.SOUTH: return new Point(pt.x, pt.y - 1);
      case Direction.WEST:  return new Point(pt.x - 1, pt.y);
    }
    throw new RuntimeException("Illegal direction");
};

Direction.getRotationAngle = function(dir) {
    switch (dir) {
      case Direction.EAST:  return 0;
      case Direction.NORTH: return 90 * Math.PI / 180;
      case Direction.WEST:  return 180 * Math.PI / 180;
      case Direction.SOUTH: return 270 * Math.PI / 180;
    }
    throw new RuntimeException("Illegal direction");
};

Direction.NORTH = 0;
Direction.EAST = 1;
Direction.SOUTH = 2;
Direction.WEST = 3;

class Point {

    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    distanceToOrigin() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

class Karel {

    constructor() {
        this._x = 1;
        this._y = 1;
        this._dir = Direction.EAST;
        this._world = null;
        this._beepers = KC.INFINITE;
    }

    run() {
        /* Empty */
    }

    move() {
        this.checkWorld("move");
        if (this._world.checkWall(this._x, this._y, this._dir)) {
            throw RuntimeException("Karel is blocked");
        }
        let pt = Direction.adjacentPoint(new Point(this._x, this._y),
                                         this._dir);
        this.setLocation(pt.x, pt.y);
        this._world.trace();
    }

    turnLeft() {
        this.checkWorld("turnLeft");
        this.setDirection(Direction.leftFrom(this._dir));
        this._world.trace();
    }

    turnRight() {
        this.checkWorld("turnRight");
        this.setDirection(Direction.rightFrom(this._dir));
        this._world.trace();
    }

    turnAround() {
        this.checkWorld("turnAround");
        this.setDirection(Direction.oppositeDirection(this._dir));
        this._world.trace();
    }

    pickBeeper() {
        this.checkWorld("pickBeeper");
        let nb = this._world.getBeepersOnCorner(this._x, this._y);
        if (nb < 1) {
            throw RuntimeException("No beepers on this corner");
        }
        this._world.setBeepersOnCorner(this._x, this._y,
                                       KarelWorld.adjustBeepers(nb, -1));
        this.setBeepersInBag(KarelWorld.adjustBeepers(this.getBeepersInBag(),
                                                      +1));
        this._world.trace();
    }

    putBeeper() {
        this.checkWorld("putBeeper");
        let nb = this.getBeepersInBag();
        if (nb < 1) throw RuntimeException("No beepers in bag");
        let cb = KarelWorld.adjustBeepers(
                     this._world.getBeepersOnCorner(this._x, this._y), +1);
        this._world.setBeepersOnCorner(this._x, this._y, cb);
        this.setBeepersInBag(KarelWorld.adjustBeepers(nb, -1));
        this._world.trace();
    }

    frontIsClear() {
        this.checkWorld("frontIsClear");
        return !this._world.checkWall(this._x, this._y, this._dir);
    }

    frontIsBlocked() {
        this.checkWorld("frontIsBlocked");
        return this._world.checkWall(this._x, this._y, this._dir);
    }

    leftIsClear() {
        this.checkWorld("leftIsClear");
        return !this._world.checkWall(this._x, this._y,
                                      Direction.leftFrom(this._dir));
    }

    leftIsBlocked() {
        this.checkWorld("leftIsBlocked");
        return this._world.checkWall(this._x, this._y,
                                     Direction.leftFrom(this._dir));
    }

    rightIsClear() {
        this.checkWorld("rightIsClear");
        return !this._world.checkWall(this._x, this._y,
                                      Direction.rightFrom(this._dir));
    }

    rightIsBlocked() {
        this.checkWorld("rightIsBlocked");
        return this._world.checkWall(this._x, this._y,
                                     Direction.rightFrom(this._dir));
    }

    beepersPresent() {
        this.checkWorld("beepersPresent");
        return this._world.getBeepersOnCorner(this._x, this._y) > 0;
    }

    noBeepersPresent() {
        this.checkWorld("noBeepersPresent");
        return this._world.getBeepersOnCorner(this._x, this._y) === 0;
    }

    beepersInBag() {
        this.checkWorld("beepersInBag");
        return this.getBeepersInBag() > 0;
    }

    noBeepersInBag() {
        this.checkWorld("noBeepersInBag");
        return this.getBeepersInBag() === 0;
    }

    facingNorth() {
        this.checkWorld("facingNorth");
        return this._dir === Direction.NORTH;
    }

    facingEast() {
        this.checkWorld("facingEast");
        return this._dir === Direction.EAST;
    }

    facingSouth() {
        this.checkWorld("facingSouth");
        return this._dir === Direction.SOUTH;
    }

    facingWest() {
        this.checkWorld("facingWest");
        return this._dir === Direction.WEST;
    }

    notFacingNorth() {
        this.checkWorld("notFacingNorth");
        return this._dir !== Direction.NORTH;
    }

    notFacingEast() {
        this.checkWorld("notFacingEast");
        return this._dir !== Direction.EAST;
    }

    notFacingSouth() {
        this.checkWorld("notFacingSouth");
        return this._dir !== Direction.SOUTH;
    }

    notFacingWest() {
        this.checkWorld("notFacingWest");
        return this._dir !== Direction.WEST;
    }

    getLocation() {
        return new Point(this._x, this._y);
    }

    setLocation(x, y) {
        if (this._world !== null) {
            if (this._world.outOfBounds(x, y)) {
                throw RuntimeException("setLocation: Out of bounds");
            }
        }
        this._x = x;
        this._y = y;
    }

    getDirection() {
        return this._dir;
    }

    setDirection(dir) {
        this._dir = dir;
        if (this._world !== null) {
            this._world.fireChangeListeners();
        }
    }

    getBeepersInBag() {
        return this._beepers;
    }

    setBeepersInBag(nBeepers) {
        this._beepers = nBeepers;
    }

    getWorld() {
        return this._world;
    }

    setWorld(world) {
        this._world = world;
    }

    checkWorld(caller) {
        if (this._world === null) {
            throw RuntimeException(caller + ": Karel is not in a world");
        }
    }

}

class KarelWorld {

    constructor(width=10, height=10) {
        this._karel = new Karel();
        this._karel.setWorld(this);
        this._speed = 0.50;
        this._color = "None";
        this._listeners = [ ];
        this.resize(width, height)
    }

    resize(width, height) {
        let map = [ ];
        for (let x = 0; x <= width + 1; x++) {
            let slice = [ ];
            for (let y = 0; y <= height + 1; y++) {
                slice.push(new Corner());
            }
            map.push(slice);
        }
        for (let x = 1; x <= width + 1; x++) {
            for (let y = 1; y <= height + 1; y++) {
                map[x][y].wallSouth = (y === 1) || (y === height + 1);
                map[x][y].wallWest = (x === 1) || (x === width + 1);
                map[x][y].color = "None";
                map[x][y].nBeepers = 0;
            }
        }
        this._width = width;
        this._height = height;
        this._map = map;
        this._karel.setLocation(1, 1);
        this._karel.setDirection(Direction.EAST);
        this.update();
    }

    getKarel() {
        return this._karel;
    }

    reset() {
        /* Empty */
    }

    getNCols() {
        return this._width;
    }

    getNRows() {
        return this._height;
    }

    outOfBounds(x, y) {
        return x < 1 || x > this._width || y < 1 || y > this._height;
    }

    getBeepersOnCorner(x, y) {
        return this._map[x][y].nBeepers;
    }

    setBeepersOnCorner(x, y, nBeepers) {
        this._map[x][y].nBeepers = nBeepers;
        this.update();
    }

    getPaintColor() {
        return this._color;
    }

    setPaintColor(color) {
        this._color = color;
    }

    getCornerColor(x, y) {
        return this._map[x][y].color;
    }

    setCornerColor(x, y, color) {
        this._map[x][y].color = color;
        this.update();
    }

    checkWall(x, y, dir) {
        switch (dir) {
          case Direction.SOUTH: return this._map[x][y].wallSouth;
          case Direction.WEST:  return this._map[x][y].wallWest;
          case Direction.NORTH: return this._map[x][y + 1].wallSouth;
          case Direction.EAST:  return this._map[x + 1][y].wallWest;
        }
        return false;
    }

    setWall(x, y, dir) {
        switch (dir) {
          case Direction.SOUTH: this._map[x][y].wallSouth = true; break;
          case Direction.WEST:  this._map[x][y].wallWest = true; break;
          case Direction.NORTH: this._map[x][y + 1].wallSouth = true; break;
          case Direction.EAST:  this._map[x + 1][y].wallWest = true; break;
        }
        this.update();
    }

    clearWall(x, y, dir) {
        switch (dir) {
          case Direction.SOUTH: this._map[x][y].wallSouth = false; break;
          case Direction.WEST:  this._map[x][y].wallWest = false; break;
          case Direction.NORTH: this._map[x][y + 1].wallSouth = false; break;
          case Direction.EAST:  this._map[x + 1][y].wallWest = false; break;
        }
        this.update();
    }

    trace() {
        this.update();
    }

    addChangeListener(listener) {
        this._listeners.push(listener);
    }

    removeChangeListener(listener) {
        this._listeners.remove(listener);
    }

    update() {
        this.fireChangeListeners();
    }

    fireChangeListeners() {
        for (let listener of this._listeners) {
            listener.stateChanged();
        }
    }

    setSpeed(speed) {
        this._speed = speed;
    }

    getSpeed() {
        return this._speed;
    }

/* // text loading eventually

    load(str) {
        loadInProgress = true;
        let scanner = TokenScanner();
        scanner.ignoreWhitespace();
        scanner.ignoreComments();
        scanner.scanNumbers();
        scanner.scanStrings();
        scanner.addOperator(EOL);
        scanner.setInput(str);
        while (readMapLine(scanner)) {
        }
        loadInProgress = false;
        update();
    }

    readMapLine(scanner) {
        let cmd = scanner.nextToken().toLowerCase();
        if (cmd.equals("")) return false;
        if (cmd.equals(EOL)) return true;
        scanner.verifyToken(":");
        if (cmd.equals("dimension")) {
            dimensionCommand(scanner);
        } else if (cmd.equals("karel")) {
            karelCommand(scanner);
        } else if (cmd.equals("wall")) {
            wallCommand(scanner);
        } else if (cmd.equals("color")) {
            setColorCommand(scanner);
        } else if (cmd.equals("speed")) {
            speedCommand(scanner);
        } else if (cmd.equals("beeper")) {
            beeperCommand(scanner);
        } else if (cmd.equals("beeperbag")) {
            beeperBagCommand(scanner);
        } else {
            throw RuntimeException("Illegal command: " + cmd);
        }
        return true;
    }

    dimensionCommand(scanner) {
        let pt = scanPoint(scanner);
        scanner.verifyToken(EOL);
        resize(pt.x, pt.y);
    }

    karelCommand(scanner) {
        let pt = scanPoint(scanner);
        let dir = scanDirection(scanner);
        scanner.verifyToken(EOL);
        karel.setLocation(pt.x, pt.y);
        karel.setDirection(dir);
    }

    wallCommand(scanner) {
        let pt = scanPoint(scanner);
        let dir = scanDirection(scanner);
        scanner.verifyToken(EOL);
        setWall(pt.x, pt.y, dir);
    }

    setColorCommand(scanner) {
        let pt = scanPoint(scanner);
        let colorName = scanner.nextToken().toLowerCase();
        scanner.verifyToken(EOL);
        setCornerColor(pt.x, pt.y, colorName);
    }

    speedCommand(scanner) {
        let speed = scanDouble(scanner);
        scanner.verifyToken(EOL);
        setSpeed(speed);
    }

    beeperCommand(scanner) {
        let pt = scanPoint(scanner);
        let nBeepers = scanBeeperCount(scanner);
        scanner.verifyToken(EOL);
        setBeepersOnCorner(pt.x, pt.y, nBeepers);
    }

    beeperBagCommand(scanner) {
        let nBeepers = scanBeeperCount(scanner);
        scanner.verifyToken(EOL);
        karel.setBeepersInBag(nBeepers);
    }

    scanInt(scanner) {
        let token = scanner.nextToken();
        if (token.equals(EOL)) {
            throw RuntimeException("Missing integer value");
        }
        try {
            return Integer.parseInt(token);
        } catch (NumberFormatException ex) {
            throw RuntimeException("Illegal integer");
        }
    }

    scanDouble(scanner) {
        let token = scanner.nextToken();
        if (token.equals(EOL)) {
            throw RuntimeException("Missing floating-point value");
        }
        try {
            return Double.parseDouble(token);
        } catch (NumberFormatException ex) {
            throw RuntimeException("Illegal floating-point value");
        }
    }

    scanBeeperCount(scanner) {
        let token = scanner.nextToken().toLowerCase();
        if (token.equals(EOL)) {
            scanner.saveToken(token);
            return 1;
        }
        if ("infinite".startsWith(token) || "infinity".startsWith(token)) {
            return KC.INFINITE;
        } else {
            scanner.saveToken(token);
            return scanInt(scanner);
        }
    }

    scanPoint(scanner) {
        let pt = new Point(0, 0);
        scanner.verifyToken("(");
        pt.x = scanInt(scanner);
        scanner.verifyToken(",");
        pt.y = scanInt(scanner);
        scanner.verifyToken(")");
        return pt;
    }

    scanDirection(scanner) {
        let token = scanner.nextToken().toLowerCase();
        if (token.equals(EOL)) {
            throw RuntimeException("Missing direction specification");
        }
        if ("north".startsWith(token)) {
            return Direction.NORTH;
        } else if ("east".startsWith(token)) {
            return Direction.EAST;
        } else if ("south".startsWith(token)) {
            return Direction.SOUTH;
        } else if ("west".startsWith(token)) {
            return Direction.WEST;
        } else {
            throw RuntimeException("Illegal direction " + token);
        }
    }

const EOL = "\n";

*/

}

KarelWorld.adjustBeepers = function(nBeepers, delta) {
    if (nBeepers === KC.INFINITE) {
        return KC.INFINITE;
    }
    return Math.max(nBeepers + delta, 0);
};

KarelWorld.setBeepers = function(nBeepers, delta) {
    if (delta === KC.INFINITE) {
        return KC.INFINITE;
    }
    if (delta === KC.PLUS1) {
        return (nBeepers === KC.INFINITE) ? KC.INFINITE : nBeepers + 1;
    }
    if (delta === KC.MINUS1) {
        if (nBeepers === 0) {
            return 0;
        }
        return (nBeepers === KC.INFINITE) ? KC.INFINITE : nBeepers - 1;
    }
    return delta;
};

class KarelWorldView {

    constructor(world) {
        this._world = world;
        this._look = KC.SIMPLE;
        this._numberSquaresFlag = true;
        this._displayOneFlag = false;
    }

    getWorld() {
        return this._world;
    }

    setDisplayParameters() {
        this._nRows = this._world.getNRows();
        this._nCols = this._world.getNCols();
        let width = this._canvas.width -
                ((this._numberSquaresFlag) ? KC.LEFT_NUMBER_MARGIN : 2);
        let height = this._canvas.height -
                ((this._numberSquaresFlag) ? KC.BOTTOM_NUMBER_MARGIN : 0) - 2;
        this._sqSize = Math.min(Math.floor(width / this._nCols),
                                Math.floor(height / this._nRows));
        this._width = this._nCols * this._sqSize;
        this._height = this._nRows * this._sqSize;
        this._x0 = (this._numberSquaresFlag) ? KC.LEFT_NUMBER_MARGIN : 2;
        this._y0 = 2;
    }

    setNumberSquaresFlag(flag) {
        this._numberSquaresFlag = flag;
    }

    getNumberSquaresFlag() {
        return this._numberSquaresFlag;
    }

    setDisplayOneFlag(flag) {
        this._displayOneFlag = flag;
    }

    getDisplayOneFlag() {
        return this._displayOneFlag;
    }

    install(id) {
        let parent = document.getElementById(id);
        let styles = window.getComputedStyle(parent);
        let canvas = document.createElement("canvas");
        canvas.width = parseInt(styles.width);
        canvas.height = parseInt(styles.height);
        canvas.style.width = styles.width;
        canvas.style.height = styles.height;
        parent.appendChild(canvas);
        this._canvas = canvas;
        this.setDisplayParameters();
        this.repaint();
    }

    repaint() {
        let view = this;
        let world = view._world;
        let kpt = world.getKarel().getLocation();
        let nRows = view._nRows;
        let nCols = view._nCols;
        let x0 = view._x0;
        let y0 = view._y0;
        let sqSize = view._sqSize;
        let ctx = view._canvas.getContext("2d");
        ctx.fillStyle = KC.APPLICATION_BACKGROUND;
        ctx.fillRect(0, 0, view._canvas.width, view._canvas.height);
        drawOutline();
        drawWalls();
        drawBeepers();
        drawKarel();

        function drawLine(x1, y1, x2, y2) {
            ctx.strokeStyle = KC.WALL_COLOR;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        function drawHorizontalWall(kx, ky) {
            ctx.lineWidth = 4;
            drawLine(kx, ky, kx + sqSize, ky);
            ctx.lineWidth = 1;
        }

        function drawVerticalWall(kx, ky) {
            ctx.lineWidth = 4;
            drawLine(kx, ky, kx, ky + sqSize);
            ctx.lineWidth = 1;
        }

        function drawOutline() {
            if (sqSize > KC.NUMBER_THRESHOLD && view._numberSquaresFlag) {
                ctx.font = KC.NUMBER_FONT;
                ctx.fillStyle = KC.WALL_COLOR;
                let metrics = ctx.measureText("1");
                let x = x0 + sqSize / 2;
                let y = y0 + nRows * sqSize +
                        metrics.actualBoundingBoxAscent + 7;
                for (let ix = 1; ix <= nCols; ix++) {
                    let label = "" + ix;
                    let w = ctx.measureText(label).width;
                    ctx.fillText(label, x - w / 2, y);
                    x += sqSize;
                }
                x = x0 - 4;
                y = y0 + nRows * sqSize - sqSize / 2 + 7;
                for (let iy = 1; iy <= nRows; iy++) {
                    let label = "" + iy;
                    let w = ctx.measureText(label).width;
                    ctx.fillText(label, x - w, y);
                    y -= sqSize;
                }
            }
        }

        function drawWalls() {
            let tick = Math.floor(KC.TICK_FRACTION * sqSize);
            for (let x = 1; x <= nCols; x++) {
                let kx = x0 + x * sqSize;
                let xc = kx - sqSize / 2;
                for (let y = 1; y <= nRows; y++) {
                    let ky = y0 + (nRows - y) * sqSize;
                    let yc = ky + sqSize / 2;
                    let here = (kpt.x === x && kpt.y === y);
                    if (!here) {
                        let c = world.getCornerColor(x, y);
                        if (c === null || c.toLowerCase() === "none") {
                            drawLine(xc - tick / 2, yc, xc + tick / 2, yc);
                            drawLine(xc, yc - tick / 2, xc, yc + tick / 2);
                        }
                    }
                    if (x === 1 && world.checkWall(x, y, Direction.WEST)) {
                        drawVerticalWall(kx - sqSize, ky);
                    }
                    if (world.checkWall(x, y, Direction.EAST)) {
                        drawVerticalWall(kx, ky);
                    }
                    if (y === 1 && world.checkWall(x, y, Direction.SOUTH)) {
                        drawHorizontalWall(kx - sqSize, ky + sqSize);
                    }
                    if (world.checkWall(x, y, Direction.NORTH)) {
                        drawHorizontalWall(kx - sqSize, ky);
                    }
                }
            }
        }

        function drawKarel() {
            let karel = world.getKarel();
            let kpt = karel.getLocation();
            let xc = Math.round(x0 + (kpt.x - 0.5) * sqSize);
            let yc = Math.round(y0 + (nRows - kpt.y + 0.5) * sqSize);
            let ksize = Math.round(sqSize * KC.KAREL_FRACTION);
            ctx.save();
            ctx.translate(xc, yc);
            ctx.rotate(-Direction.getRotationAngle(karel.getDirection()));
            ctx.beginPath()
            ctx.moveTo(-ksize / 2, -ksize / 2);
            ctx.lineTo(-ksize / 2, ksize / 2);
            ctx.lineTo(0, ksize / 2);
            ctx.lineTo(ksize / 2, 0);
            ctx.lineTo(0, -ksize / 2);
            ctx.lineTo(-ksize / 2, -ksize / 2);
            ctx.fillStyle = KC.KAREL_FILL_COLOR;
            ctx.fill();
            ctx.strokeStyle = "Black";
            ctx.stroke();
            ctx.restore();
        }

        function drawBeepers() {
            let bsize = Math.round(sqSize * KC.BEEPER_FRACTION);
            for (let x = 1; x <= nCols; x++) {
                let xc = Math.round(x0 + (x - 0.5) * sqSize);
                for (let y = 1; y <= nRows; y++) {
                    let yc = Math.round(y0 + (nRows - y + 0.5) * sqSize);
                    let nBeepers = world.getBeepersOnCorner(x, y);
                    if (nBeepers > 0) {
                        let label = "" + nBeepers;
                        if (nBeepers === 1 && !view._displayOneFlag) {
                            label = "";
                        }
                        if (nBeepers === KC.INFINITE) {
                            label = KC.INFINITY_SYMBOL;
                        }
                        drawBeeper(xc, yc, bsize, null, label);
                    }
                }
            }
        }

        function drawBeeper(x, y, bsize, bg, label) {
            let ps = Math.round(bsize * KC.BEEPER_LABEL_FRACTION);
            ps = Math.min(ps, KC.BEEPER_LABEL_MAX_SIZE);
            if (ps < KC.BEEPER_LABEL_MIN_SIZE) {
                ps = 0;
            }
            ctx.beginPath();
            ctx.moveTo(x - bsize / 2, y);
            ctx.lineTo(x, y + bsize / 2);
            ctx.lineTo(x + bsize / 2, y);
            ctx.lineTo(x, y - bsize / 2);
            ctx.lineTo(x - bsize / 2, y);
            ctx.fillStyle = (bg === null) ? KC.BEEPER_FILL_COLOR : bg;
            ctx.fill();
            ctx.strokeStyle = "Black";
            ctx.stroke();
            if (ps > 0 && label.length > 0) {
                ctx.font = ps + "px " + KC.BEEPER_FONT_FAMILY;
                ctx.fillStyle = "Black";
                let metrics = ctx.measureText(label);
                let bx = x - metrics.width / 2 ;
                let by = y + metrics.actualBoundingBoxAscent / 2;
                ctx.fillText(label, bx, by);
            }
        }

    }

/*

function paintComponent(g) {
        synchronized (world) {
            setDisplayParameters();
            paintOutline(g);
            paintCorners(g);
            paintWalls(g);
            paintBeepers(g);
            paintKarel(g);
        }
    }

function setLook(look) {
        this.look = look;
    }

function getLook() {
        return look;
    }

function drawKarel(g, x, int y, int sqSize, int dir) {
        if (sqSize < KC.MIN_FANCY || look === KC.SIMPLE) {
            let karelSize = (int) Math.round(sqSize * KC.KAREL_FRACTION);
            KarelGraphics.drawSimpleKarel(g, x, y, karelSize, dir, null);
        } else {
            let karelSize = sqSize - KC.KAREL_INSET;
            KarelGraphics.drawFancyKarel(g, x, y, karelSize, dir, null);
        }
    }

function paintOutline(g) {
        g.setColor(Color.WHITE);
        g.fillRect(x0, y0, nCols * sqSize, nRows * sqSize);
        g.setColor(Color.BLACK);
        if (sqSize > KC.NUMBER_THRESHOLD && numberSquaresFlag) {
            g.setFont(KC.NUMBER_FONT);
            let fm = g.getFontMetrics();
            let x = x0 + sqSize / 2;
            let y = y0 + nRows * sqSize + fm.getAscent() + 2;
            for (let ix = 1; ix <= nCols; ix++) {
                let label = "" + ix;
                g.drawString(label, x - fm.stringWidth(label) / 2, y);
                x += sqSize;
            }
            x = x0 - 2;
            y = y0 + nRows * sqSize - sqSize / 2 + 2;
            for (let iy = 1; iy <= nRows; iy++) {
                let label = "" + iy;
                g.drawString(label, x - fm.stringWidth(label), y);
                y -= sqSize;
            }
        }
    }

function paintCorners(g) {
        let saveColor = g.getColor();
        for (let x = 1; x <= nCols; x++) {
            let xc = (int) Math.round(x0 + (x - 1) * sqSize);
            for (let y = 1; y <= nRows; y++) {
                let yc = (int) Math.round(y0 + (nRows - y) * sqSize);
                let c = world.getCornerColor(x, y);
                if (c !== null && c.toLowerCase() === "none") {
                    g.setColor(c);
                    g.fillRect(xc, yc, sqSize, sqSize);
                }
            }
        }
        g.setColor(saveColor);
    }

function paintWalls(g) {
        let tick = (int) Math.round(KC.TICK_FRACTION * sqSize);
        for (let x = 1; x <= nCols; x++) {
            let kx = x0 + x * sqSize;
            let xc = kx - sqSize / 2;
            for (let y = 1; y <= nRows; y++) {
                let ky = y0 + (nRows - y) * sqSize;
                let yc = ky + sqSize / 2;
                let kpt = world.getKarel().getLocation();
                let here = (kpt.x === x && kpt.y === y);
                if (!here) {
                    let cname = world.getCornerColor(x, y);
                    if (cname === null || cname.equalsIgnoreCase("None")) {
                        g.drawLine(xc - tick / 2, yc, xc + tick / 2, yc);
                        g.drawLine(xc, yc - tick / 2, xc, yc + tick / 2);
                    }
                }
                if (x === 1 && world.checkWall(x, y, Direction.WEST)) {
                    KarelGraphics.drawVerticalWall(g, kx - sqSize, ky, sqSize);
                }
                if (world.checkWall(x, y, Direction.EAST)) {
                    KarelGraphics.drawVerticalWall(g, kx, ky, sqSize);
                }
                if (y === 1 && world.checkWall(x, y, Direction.SOUTH)) {
                    KarelGraphics.drawHorizontalWall(g, kx - sqSize,
                                                     ky + sqSize, sqSize);
                }
                if (world.checkWall(x, y, Direction.NORTH)) {
                    KarelGraphics.drawHorizontalWall(g, kx - sqSize, ky,
                                                     sqSize);
                }
            }
        }
    }

function checkForWallClick(mx, my) {
        let sx = (mx - x0 + 0.5 * sqSize) / sqSize;
        let sy = (double) (y0 + nRows * sqSize - my + sqSize / 2) / sqSize;
        let tx = (int) (sx + 0.5);
        let ty = (int) (sy + 0.5);
        if (Math.abs(sx - tx) > KC.WALL_TOLERANCE &&
            Math.abs(sy - ty) < KC.WALL_FRACTION) {
            if (tx > sx) tx--;
            if (tx < 0 || tx > nCols || ty < 1 || ty > nRows) return;
            monitor.wallAction(tx, ty, Direction.EAST);
        } else if (Math.abs(sy - ty) > KC.WALL_TOLERANCE &&
                   Math.abs(sx - tx) < KC.WALL_FRACTION) {
            if (ty > sy) ty--;
            if (tx < 1 || tx > nCols || ty < 0 || ty > nRows) return;
            monitor.wallAction(tx, ty, Direction.NORTH);
        }
    }

*/

}

class Corner {
    constructor() {
        this.color = "White";
        this.wallSouth = false;
        this.wallWest = false;
        this.nBeepers = 0;
    }
}
