/*
 * File: kareltrace.js
 * -------------------
 * This file implements a CodeTrace subclass for Karel.
 */

"use strict";

class KarelTrace extends CodeTrace {

    constructor(title) {
        super(title);
        this.reset();
    }

    reset() {
        super.reset();
        let parent = document.getElementById(this._title + "World");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        let view = new KarelWorldView(this._world);
        view.install(this._title + "World");
        this._view = view;
    }

    move(ct) {
        ct._karel.move();
        ct._view.repaint();
    }

    turnLeft(ct) {
        ct._karel.turnLeft();
        ct._view.repaint();
    }

    turnRight(ct) {
        ct._karel.turnRight();
        ct._view.repaint();
    }

    turnAround(ct) {
        ct._karel.turnAround();
        ct._view.repaint();
    }

    pickBeeper(ct) {
        ct._karel.pickBeeper();
        ct._view.repaint();
    }

    putBeeper(ct) {
        ct._karel.putBeeper();
        ct._view.repaint();
    }

    frontIsClear(ct) {
        return ct._karel.frontIsClear();
    }

    leftIsClear(ct) {
        return ct._karel.leftIsClear();
    }

    rightIsClear(ct) {
        return ct._karel.rightIsClear();
    }

    frontIsBlocked(ct) {
        return ct._karel.frontIsBlocked();
    }

    leftIsBlocked(ct) {
        return ct._karel.leftIsBlocked();
    }

    rightIsBlocked(ct) {
        return ct._karel.rightIsBlocked();
    }

    beepersPresent(ct) {
        return ct._karel.beepersPresent();
    }

    beepersInBag(ct) {
        return ct._karel.beepersInBag();
    }

}
