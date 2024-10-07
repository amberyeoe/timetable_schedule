import e, { useEffect as t, useRef as n, useLayoutEffect as r, useState as o, createElement as i, createContext as s, useContext as a, Fragment as c, Component as l, useCallback as d, useMemo as u } from "react";

import { aq as p } from "./chunk1.mjs";

import { useMemo as g, useCallback as f } from "use-memo-one";

import { Provider as m, connect as b } from "react-redux";

import { createStore as h, applyMiddleware as v, compose as y, bindActionCreators as D } from "redux";

import I from "raf-schd";

import x from "memoize-one";

import { getRect as C, expand as w, offset as E, withScroll as A, calculateBox as S, getBox as B, createBox as N } from "css-box-model";

import P from "react-dom";

import R from "@babel/runtime/helpers/extends";

import "react-dom/client";

import "tslib";

import "rxjs";

import "rxjs/operators";

import "i18next";

import "react-i18next";

import "react-focus-lock";

import "classnames";

import "framer-motion";

import "polished";

import "axios";

import "reselect";

import "./i18n/nova_i18n.mjs";

import "react-popper";

import "@popperjs/core";

import "handlebars";

import "zod";

import "@tanstack/react-query";

import "react-cropper";

import "redux-observable";

import "@redux-devtools/extension";

const O = `\n  Press space bar to start a drag.\n  When dragging you can use the arrow keys to move the item around and escape to cancel.\n  Some screen readers may require you to be in focus mode or to use your pass through key\n`;

const T = e => e + 1;

const L = e => `\n  You have lifted an item in position ${T(e.source.index)}\n`;

const G = (e, t) => {
    const n = e.droppableId === t.droppableId;
    const r = T(e.index);
    const o = T(t.index);
    if (n) {
        return `\n      You have moved the item from position ${r}\n      to position ${o}\n    `;
    }
    return `\n    You have moved the item from position ${r}\n    in list ${e.droppableId}\n    to list ${t.droppableId}\n    in position ${o}\n  `;
};

const M = (e, t, n) => {
    const r = t.droppableId === n.droppableId;
    if (r) {
        return `\n      The item ${e}\n      has been combined with ${n.draggableId}`;
    }
    return `\n      The item ${e}\n      in list ${t.droppableId}\n      has been combined with ${n.draggableId}\n      in list ${n.droppableId}\n    `;
};

const _ = e => {
    const t = e.destination;
    if (t) {
        return G(e.source, t);
    }
    const n = e.combine;
    if (n) {
        return M(e.draggableId, e.source, n);
    }
    return "You are over an area that cannot be dropped on";
};

const $ = e => `\n  The item has returned to its starting position\n  of ${T(e.index)}\n`;

const F = e => {
    if (e.reason === "CANCEL") {
        return `\n      Movement cancelled.\n      ${$(e.source)}\n    `;
    }
    const t = e.destination;
    const n = e.combine;
    if (t) {
        return `\n      You have dropped the item.\n      ${G(e.source, t)}\n    `;
    }
    if (n) {
        return `\n      You have dropped the item.\n      ${M(e.draggableId, e.source, n)}\n    `;
    }
    return `\n    The item has been dropped while not over a drop area.\n    ${$(e.source)}\n  `;
};

const k = {
    dragHandleUsageInstructions: O,
    onDragStart: L,
    onDragUpdate: _,
    onDragEnd: F
};

var U = k;

let W = 0;

const H = {
    separator: "::"
};

function j() {
    W = 0;
}

function V(e, t = H) {
    return g((() => `${e}${t.separator}${W++}`), [ t.separator, e ]);
}

function q(e, t) {
    {
        return;
    }
}

const z = q.bind(null, "warn");

q.bind(null, "error");

const Y = "production" === "production";

const J = "Invariant failed";

class X {
    constructor(e) {
        this.message = e;
    }
}

X.prototype.toString = function e() {
    return this.message;
};

function K(e, t) {
    if (e) {
        return;
    }
    if (Y) {
        throw new X(J);
    } else {
        throw new X(`${J}: ${t || ""}`);
    }
}

const Q = e => ({
    type: "BEFORE_INITIAL_CAPTURE",
    payload: e
});

const Z = e => ({
    type: "LIFT",
    payload: e
});

const ee = e => ({
    type: "INITIAL_PUBLISH",
    payload: e
});

const te = e => ({
    type: "PUBLISH_WHILE_DRAGGING",
    payload: e
});

const ne = () => ({
    type: "COLLECTION_STARTING",
    payload: null
});

const re = e => ({
    type: "UPDATE_DROPPABLE_SCROLL",
    payload: e
});

const oe = e => ({
    type: "UPDATE_DROPPABLE_IS_ENABLED",
    payload: e
});

const ie = e => ({
    type: "UPDATE_DROPPABLE_IS_COMBINE_ENABLED",
    payload: e
});

const se = e => ({
    type: "MOVE",
    payload: e
});

const ae = e => ({
    type: "MOVE_BY_WINDOW_SCROLL",
    payload: e
});

const ce = e => ({
    type: "UPDATE_VIEWPORT_MAX_SCROLL",
    payload: e
});

const le = () => ({
    type: "MOVE_UP",
    payload: null
});

const de = () => ({
    type: "MOVE_DOWN",
    payload: null
});

const ue = () => ({
    type: "MOVE_RIGHT",
    payload: null
});

const pe = () => ({
    type: "MOVE_LEFT",
    payload: null
});

const ge = () => ({
    type: "FLUSH",
    payload: null
});

const fe = e => ({
    type: "DROP_ANIMATE",
    payload: e
});

const me = e => ({
    type: "DROP_COMPLETE",
    payload: e
});

const be = e => ({
    type: "DROP",
    payload: e
});

const he = e => ({
    type: "DROP_PENDING",
    payload: e
});

const ve = () => ({
    type: "DROP_ANIMATION_FINISHED",
    payload: null
});

const ye = e => {};

const De = e => {};

var Ie = e => {
    const t = e.at;
    if (!t) {
        return null;
    }
    if (t.type === "REORDER") {
        return t.destination.droppableId;
    }
    return t.combine.droppableId;
};

function xe(e) {
    if (Object.values) {
        return Object.values(e);
    }
    return Object.keys(e).map((t => e[t]));
}

function Ce(e, t) {
    if (e.findIndex) {
        return e.findIndex(t);
    }
    for (let n = 0; n < e.length; n++) {
        if (t(e[n])) {
            return n;
        }
    }
    return -1;
}

function we(e, t) {
    if (e.find) {
        return e.find(t);
    }
    const n = Ce(e, t);
    if (n !== -1) {
        return e[n];
    }
    return undefined;
}

function Ee(e) {
    return Array.prototype.slice.call(e);
}

const Ae = x((e => e.reduce(((e, t) => {
    e[t.descriptor.id] = t;
    return e;
}), {})));

const Se = x((e => e.reduce(((e, t) => {
    e[t.descriptor.id] = t;
    return e;
}), {})));

const Be = x((e => xe(e)));

const Ne = x((e => xe(e)));

var Pe = (e, t) => n => e <= n && n <= t;

function Re(e) {
    const t = Pe(e.top, e.bottom);
    const n = Pe(e.left, e.right);
    return function e(r) {
        return t(r.y) && n(r.x);
    };
}

const Oe = x((e => Be(e).filter((e => {
    if (!e.isEnabled) {
        return false;
    }
    if (!e.frame) {
        return false;
    }
    return true;
}))));

const Te = (e, t) => {
    const n = we(Oe(t), (t => {
        K(t.frame, "Invalid result");
        return Re(t.frame.pageMarginBox)(e);
    }));
    return n;
};

var Le = ({center: e, destination: t, droppables: n}) => {
    if (t) {
        const e = n[t];
        if (!e.frame) {
            return null;
        }
        return e;
    }
    const r = Te(e, n);
    return r;
};

const Ge = {
    x: 0,
    y: 0
};

const Me = (e, t) => ({
    x: e.x + t.x,
    y: e.y + t.y
});

const _e = (e, t) => ({
    x: e.x - t.x,
    y: e.y - t.y
});

const $e = (e, t) => e.x === t.x && e.y === t.y;

const Fe = e => ({
    x: e.x !== 0 ? -e.x : 0,
    y: e.y !== 0 ? -e.y : 0
});

const ke = (e, t, n = 0) => {
    if (e === "x") {
        return {
            x: t,
            y: n
        };
    }
    return {
        x: n,
        y: t
    };
};

const Ue = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));

const We = (e, t) => Math.min(...t.map((t => Ue(e, t))));

const He = e => t => ({
    x: e(t.x),
    y: e(t.y)
});

const je = He((e => {
    if (e === 0) {
        return 0;
    }
    return e > 0 ? 1 : -1;
}));

const Ve = (() => {
    const e = (e, t) => {
        if (e < 0) {
            return e;
        }
        if (e > t) {
            return e - t;
        }
        return 0;
    };
    return ({current: t, max: n, change: r}) => {
        const o = Me(t, r);
        const i = {
            x: e(o.x, n.x),
            y: e(o.y, n.y)
        };
        if ($e(i, Ge)) {
            return null;
        }
        return i;
    };
})();

const qe = ({max: e, current: t, change: n}) => {
    const r = {
        x: Math.max(t.x, e.x),
        y: Math.max(t.y, e.y)
    };
    const o = je(n);
    const i = Ve({
        max: r,
        current: t,
        change: o
    });
    if (!i) {
        return true;
    }
    if (o.x !== 0 && i.x === 0) {
        return true;
    }
    if (o.y !== 0 && i.y === 0) {
        return true;
    }
    return false;
};

const ze = (e, t) => qe({
    current: e.scroll.current,
    max: e.scroll.max,
    change: t
});

const Ye = (e, t) => {
    if (!ze(e, t)) {
        return null;
    }
    const n = e.scroll.max;
    const r = e.scroll.current;
    return Ve({
        current: r,
        max: n,
        change: t
    });
};

const Je = (e, t) => {
    const n = e.frame;
    if (!n) {
        return false;
    }
    return qe({
        current: n.scroll.current,
        max: n.scroll.max,
        change: t
    });
};

const Xe = (e, t) => {
    const n = e.frame;
    if (!n) {
        return null;
    }
    if (!Je(e, t)) {
        return null;
    }
    return Ve({
        current: n.scroll.current,
        max: n.scroll.max,
        change: t
    });
};

const Ke = {
    direction: "vertical",
    line: "y",
    crossAxisLine: "x",
    start: "top",
    end: "bottom",
    size: "height",
    crossAxisStart: "left",
    crossAxisEnd: "right",
    crossAxisSize: "width"
};

const Qe = {
    direction: "horizontal",
    line: "x",
    crossAxisLine: "y",
    start: "left",
    end: "right",
    size: "width",
    crossAxisStart: "top",
    crossAxisEnd: "bottom",
    crossAxisSize: "height"
};

var Ze = ({container: e, subject: t, proposedScroll: n}) => {
    const r = t.height > e.height;
    const o = t.width > e.width;
    if (!o && !r) {
        return n;
    }
    if (o && r) {
        return null;
    }
    return {
        x: o ? 0 : n.x,
        y: r ? 0 : n.y
    };
};

const et = {
    startFromPercentage: .25,
    maxScrollAtPercentage: .05,
    maxPixelScroll: 28,
    ease: e => Math.pow(e, 2),
    durationDampening: {
        stopDampeningAt: 1200,
        accelerateAt: 360
    }
};

var tt = (e, t) => {
    const n = e[t.size] * et.startFromPercentage;
    const r = e[t.size] * et.maxScrollAtPercentage;
    const o = {
        startScrollingFrom: n,
        maxScrollValueAt: r
    };
    return o;
};

var nt = ({startOfRange: e, endOfRange: t, current: n}) => {
    const r = t - e;
    if (r === 0) {
        z(`\n      Detected distance range of 0 in the fluid auto scroller\n      This is unexpected and would cause a divide by 0 issue.\n      Not allowing an auto scroll\n    `);
        return 0;
    }
    const o = n - e;
    const i = o / r;
    return i;
};

var rt = 1;

const ot = et.durationDampening.accelerateAt;

const it = et.durationDampening.stopDampeningAt;

var st = (e, t) => {
    const n = t;
    const r = it;
    const o = Date.now();
    const i = o - n;
    if (i >= it) {
        return e;
    }
    if (i < ot) {
        return rt;
    }
    const s = nt({
        startOfRange: ot,
        endOfRange: r,
        current: i
    });
    const a = e * et.ease(s);
    return Math.ceil(a);
};

var at = (e, t) => {
    if (e > t.startScrollingFrom) {
        return 0;
    }
    if (e <= t.maxScrollValueAt) {
        return et.maxPixelScroll;
    }
    if (e === t.startScrollingFrom) {
        return rt;
    }
    const n = nt({
        startOfRange: t.maxScrollValueAt,
        endOfRange: t.startScrollingFrom,
        current: e
    });
    const r = 1 - n;
    const o = et.maxPixelScroll * et.ease(r);
    return Math.ceil(o);
};

var ct = ({distanceToEdge: e, thresholds: t, dragStartTime: n, shouldUseTimeDampening: r}) => {
    const o = at(e, t);
    if (o === 0) {
        return 0;
    }
    if (!r) {
        return o;
    }
    return Math.max(st(o, n), rt);
};

var lt = ({container: e, distanceToEdges: t, dragStartTime: n, axis: r, shouldUseTimeDampening: o}) => {
    const i = tt(e, r);
    const s = t[r.end] < t[r.start];
    if (s) {
        return ct({
            distanceToEdge: t[r.end],
            thresholds: i,
            dragStartTime: n,
            shouldUseTimeDampening: o
        });
    }
    return -1 * ct({
        distanceToEdge: t[r.start],
        thresholds: i,
        dragStartTime: n,
        shouldUseTimeDampening: o
    });
};

const dt = He((e => e === 0 ? 0 : e));

var ut = ({dragStartTime: e, container: t, subject: n, center: r, shouldUseTimeDampening: o}) => {
    const i = {
        top: r.y - t.top,
        right: t.right - r.x,
        bottom: t.bottom - r.y,
        left: r.x - t.left
    };
    const s = lt({
        container: t,
        distanceToEdges: i,
        dragStartTime: e,
        axis: Ke,
        shouldUseTimeDampening: o
    });
    const a = lt({
        container: t,
        distanceToEdges: i,
        dragStartTime: e,
        axis: Qe,
        shouldUseTimeDampening: o
    });
    const c = dt({
        x: a,
        y: s
    });
    if ($e(c, Ge)) {
        return null;
    }
    const l = Ze({
        container: t,
        subject: n,
        proposedScroll: c
    });
    if (!l) {
        return null;
    }
    return $e(l, Ge) ? null : l;
};

var pt = ({droppable: e, subject: t, center: n, dragStartTime: r, shouldUseTimeDampening: o}) => {
    const i = e.frame;
    if (!i) {
        return null;
    }
    const s = ut({
        dragStartTime: r,
        container: i.pageMarginBox,
        subject: t,
        center: n,
        shouldUseTimeDampening: o
    });
    return s && Je(e, s) ? s : null;
};

var gt = ({viewport: e, subject: t, center: n, dragStartTime: r, shouldUseTimeDampening: o}) => {
    const i = ut({
        dragStartTime: r,
        container: e.frame,
        subject: t,
        center: n,
        shouldUseTimeDampening: o
    });
    return i && ze(e, i) ? i : null;
};

var ft = ({state: e, dragStartTime: t, shouldUseTimeDampening: n, scrollWindow: r, scrollDroppable: o}) => {
    const i = e.current.page.borderBoxCenter;
    const s = e.dimensions.draggables[e.critical.draggable.id];
    const a = s.page.marginBox;
    if (e.isWindowScrollAllowed) {
        const o = e.viewport;
        const s = gt({
            dragStartTime: t,
            viewport: o,
            subject: a,
            center: i,
            shouldUseTimeDampening: n
        });
        if (s) {
            r(s);
            return;
        }
    }
    const c = Le({
        center: i,
        destination: Ie(e.impact),
        droppables: e.dimensions.droppables
    });
    if (!c) {
        return;
    }
    const l = pt({
        dragStartTime: t,
        droppable: c,
        subject: a,
        center: i,
        shouldUseTimeDampening: n
    });
    if (l) {
        o(c.descriptor.id, l);
    }
};

var mt = ({scrollWindow: e, scrollDroppable: t}) => {
    const n = I(e);
    const r = I(t);
    let o = null;
    const i = e => {
        K(o, "Cannot fluid scroll if not dragging");
        const {shouldUseTimeDampening: t, dragStartTime: i} = o;
        ft({
            state: e,
            scrollWindow: n,
            scrollDroppable: r,
            dragStartTime: i,
            shouldUseTimeDampening: t
        });
    };
    const s = e => {
        K(!o, "Cannot start auto scrolling when already started");
        const t = Date.now();
        let n = false;
        const r = () => {
            n = true;
        };
        ft({
            state: e,
            dragStartTime: 0,
            shouldUseTimeDampening: false,
            scrollWindow: r,
            scrollDroppable: r
        });
        o = {
            dragStartTime: t,
            shouldUseTimeDampening: n
        };
        if (n) {
            i(e);
        }
    };
    const a = () => {
        if (!o) {
            return;
        }
        n.cancel();
        r.cancel();
        o = null;
    };
    return {
        start: s,
        stop: a,
        scroll: i
    };
};

var bt = ({move: e, scrollDroppable: t, scrollWindow: n}) => {
    const r = (t, n) => {
        const r = Me(t.current.client.selection, n);
        e({
            client: r
        });
    };
    const o = (e, n) => {
        if (!Je(e, n)) {
            return n;
        }
        const r = Xe(e, n);
        if (!r) {
            t(e.descriptor.id, n);
            return null;
        }
        const o = _e(n, r);
        t(e.descriptor.id, o);
        const i = _e(n, o);
        return i;
    };
    const i = (e, t, r) => {
        if (!e) {
            return r;
        }
        if (!ze(t, r)) {
            return r;
        }
        const o = Ye(t, r);
        if (!o) {
            n(r);
            return null;
        }
        const i = _e(r, o);
        n(i);
        const s = _e(r, i);
        return s;
    };
    const s = e => {
        const t = e.scrollJumpRequest;
        if (!t) {
            return;
        }
        const n = Ie(e.impact);
        K(n, "Cannot perform a jump scroll when there is no destination");
        const s = o(e.dimensions.droppables[n], t);
        if (!s) {
            return;
        }
        const a = e.viewport;
        const c = i(e.isWindowScrollAllowed, a, s);
        if (!c) {
            return;
        }
        r(e, c);
    };
    return s;
};

var ht = ({scrollDroppable: e, scrollWindow: t, move: n}) => {
    const r = mt({
        scrollWindow: t,
        scrollDroppable: e
    });
    const o = bt({
        move: n,
        scrollWindow: t,
        scrollDroppable: e
    });
    const i = e => {
        if (e.phase !== "DRAGGING") {
            return;
        }
        if (e.movementMode === "FLUID") {
            r.scroll(e);
            return;
        }
        if (!e.scrollJumpRequest) {
            return;
        }
        o(e);
    };
    const s = {
        scroll: i,
        start: r.start,
        stop: r.stop
    };
    return s;
};

var vt = (e, t) => {
    if (e.phase === "IDLE") {
        return true;
    }
    if (e.phase !== "DROP_ANIMATING") {
        return false;
    }
    if (e.completed.result.draggableId === t) {
        return false;
    }
    return e.completed.result.reason === "DROP";
};

const yt = e => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH";

var Dt = e => t => n => r => {
    if (yt(r)) {
        e.stop();
        n(r);
        return;
    }
    if (r.type === "INITIAL_PUBLISH") {
        n(r);
        const o = t.getState();
        K(o.phase === "DRAGGING", "Expected phase to be DRAGGING after INITIAL_PUBLISH");
        e.start(o);
        return;
    }
    n(r);
    e.scroll(t.getState());
};

var It = e => () => t => n => {
    if (n.type === "DROP_COMPLETE" || n.type === "FLUSH" || n.type === "DROP_ANIMATE") {
        e.stopPublishing();
    }
    t(n);
};

var xt = e => t => n => {
    if (n.type !== "DROP_ANIMATION_FINISHED") {
        t(n);
        return;
    }
    const r = e.getState();
    K(r.phase === "DROP_ANIMATING", "Cannot finish a drop animating when no drop is occurring");
    e.dispatch(me({
        completed: r.completed
    }));
};

function Ct(e, t) {
    return {
        ...e,
        ...t
    };
}

function wt(e, t, n) {
    const r = t.map((t => {
        const r = Ct(n, t.options);
        e.addEventListener(t.eventName, t.fn, r);
        return function n() {
            e.removeEventListener(t.eventName, t.fn, r);
        };
    }));
    return function e() {
        r.forEach((e => {
            e();
        }));
    };
}

var Et = e => {
    let t = null;
    let n = null;
    function r() {
        if (n) {
            cancelAnimationFrame(n);
            n = null;
        }
        if (t) {
            t();
            t = null;
        }
    }
    return o => i => {
        if (i.type === "FLUSH" || i.type === "DROP_COMPLETE" || i.type === "DROP_ANIMATION_FINISHED") {
            r();
        }
        o(i);
        if (i.type !== "DROP_ANIMATE") {
            return;
        }
        const s = {
            eventName: "scroll",
            options: {
                capture: true,
                passive: false,
                once: true
            },
            fn: function t() {
                const n = e.getState();
                if (n.phase === "DROP_ANIMATING") {
                    e.dispatch(ve());
                }
            }
        };
        n = requestAnimationFrame((() => {
            n = null;
            t = wt(window, [ s ]);
        }));
    };
};

function At(e) {
    if (e.at && e.at.type === "REORDER") {
        return e.at.destination;
    }
    return null;
}

function St(e) {
    if (e.at && e.at.type === "COMBINE") {
        return e.at.combine;
    }
    return null;
}

const Bt = {
    outOfTheWay: "cubic-bezier(0.2, 0, 0, 1)",
    drop: "cubic-bezier(.2,1,.1,1)"
};

const Nt = {
    opacity: {
        drop: 0,
        combining: .7
    },
    scale: {
        drop: .75
    }
};

const Pt = {
    outOfTheWay: .2,
    minDropTime: .33,
    maxDropTime: .55
};

const Rt = `${Pt.outOfTheWay}s ${Bt.outOfTheWay}`;

const Ot = {
    fluid: `opacity ${Rt}`,
    snap: `transform ${Rt}, opacity ${Rt}`,
    drop: e => {
        const t = `${e}s ${Bt.drop}`;
        return `transform ${t}, opacity ${t}`;
    },
    outOfTheWay: `transform ${Rt}`,
    placeholder: `height ${Rt}, width ${Rt}, margin ${Rt}`
};

const Tt = e => $e(e, Ge) ? undefined : `translate(${e.x}px, ${e.y}px)`;

const Lt = {
    moveTo: Tt,
    drop: (e, t) => {
        const n = Tt(e);
        if (!n) {
            return undefined;
        }
        if (!t) {
            return n;
        }
        return `${n} scale(${Nt.scale.drop})`;
    }
};

const {minDropTime: Gt, maxDropTime: Mt} = Pt;

const _t = Mt - Gt;

const $t = 1500;

const Ft = .6;

var kt = ({current: e, destination: t, reason: n}) => {
    const r = Ue(e, t);
    if (r <= 0) {
        return Gt;
    }
    if (r >= $t) {
        return Mt;
    }
    const o = r / $t;
    const i = Gt + _t * o;
    const s = n === "CANCEL" ? i * Ft : i;
    return Number(s.toFixed(2));
};

const Ut = {
    point: Ge,
    value: 0
};

const Wt = {
    invisible: {},
    visible: {},
    all: []
};

const Ht = {
    displaced: Wt,
    displacedBy: Ut,
    at: null
};

var jt = Ht;

const Vt = (e, t) => ({
    top: e.top + t.y,
    left: e.left + t.x,
    bottom: e.bottom + t.y,
    right: e.right + t.x
});

const qt = e => [ {
    x: e.left,
    y: e.top
}, {
    x: e.right,
    y: e.top
}, {
    x: e.left,
    y: e.bottom
}, {
    x: e.right,
    y: e.bottom
} ];

const zt = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

var Yt = e => {
    const t = Pe(e.top, e.bottom);
    const n = Pe(e.left, e.right);
    return r => {
        const o = t(r.top) && t(r.bottom) && n(r.left) && n(r.right);
        if (o) {
            return true;
        }
        const i = t(r.top) || t(r.bottom);
        const s = n(r.left) || n(r.right);
        const a = i && s;
        if (a) {
            return true;
        }
        const c = r.top < e.top && r.bottom > e.bottom;
        const l = r.left < e.left && r.right > e.right;
        const d = c && l;
        if (d) {
            return true;
        }
        const u = c && s || l && i;
        return u;
    };
};

var Jt = e => {
    const t = Pe(e.top, e.bottom);
    const n = Pe(e.left, e.right);
    return e => {
        const r = t(e.top) && t(e.bottom) && n(e.left) && n(e.right);
        return r;
    };
};

var Xt = e => t => {
    const n = Pe(t.top, t.bottom);
    const r = Pe(t.left, t.right);
    return t => {
        if (e === Ke) {
            return n(t.top) && n(t.bottom);
        }
        return r(t.left) && r(t.right);
    };
};

const Kt = (e, t) => {
    const n = t.frame ? t.frame.scroll.diff.displacement : Ge;
    return Vt(e, n);
};

const Qt = (e, t, n) => {
    if (!t.subject.active) {
        return false;
    }
    return n(t.subject.active)(e);
};

const Zt = (e, t, n) => n(t)(e);

const en = ({target: e, destination: t, viewport: n, withDroppableDisplacement: r, isVisibleThroughFrameFn: o}) => {
    const i = r ? Kt(e, t) : e;
    return Qt(i, t, o) && Zt(i, n, o);
};

const tn = e => en({
    ...e,
    isVisibleThroughFrameFn: Yt
});

const nn = e => en({
    ...e,
    isVisibleThroughFrameFn: Jt
});

const rn = e => en({
    ...e,
    isVisibleThroughFrameFn: Xt(e.destination.axis)
});

const on = (e, t, n) => {
    if (typeof n === "boolean") {
        return n;
    }
    if (!t) {
        return true;
    }
    const {invisible: r, visible: o} = t;
    if (r[e]) {
        return false;
    }
    const i = o[e];
    return i ? i.shouldAnimate : true;
};

function sn(e, t) {
    const n = e.page.marginBox;
    const r = {
        top: t.point.y,
        right: 0,
        bottom: 0,
        left: t.point.x
    };
    return C(w(n, r));
}

function an({afterDragging: e, destination: t, displacedBy: n, viewport: r, forceShouldAnimate: o, last: i}) {
    return e.reduce((function e(s, a) {
        const c = sn(a, n);
        const l = a.descriptor.id;
        s.all.push(l);
        const d = tn({
            target: c,
            destination: t,
            viewport: r,
            withDroppableDisplacement: true
        });
        if (!d) {
            s.invisible[a.descriptor.id] = true;
            return s;
        }
        const u = on(l, i, o);
        const p = {
            draggableId: l,
            shouldAnimate: u
        };
        s.visible[l] = p;
        return s;
    }), {
        all: [],
        visible: {},
        invisible: {}
    });
}

function cn(e, t) {
    return e.map((e => t[e]));
}

var ln = ({impact: e, viewport: t, draggables: n, destination: r, forceShouldAnimate: o}) => {
    const i = e.displaced;
    const s = cn(i.all, n);
    const a = an({
        afterDragging: s,
        destination: r,
        displacedBy: e.displacedBy,
        viewport: t.frame,
        forceShouldAnimate: o,
        last: i
    });
    return {
        ...e,
        displaced: a
    };
};

var dn = ({draggables: e, reason: t, lastImpact: n, home: r, viewport: o, onLiftImpact: i}) => {
    if (!n.at || t !== "DROP") {
        const t = ln({
            draggables: e,
            impact: i,
            destination: r,
            viewport: o,
            forceShouldAnimate: true
        });
        return {
            impact: t,
            didDropInsideDroppable: false
        };
    }
    if (n.at.type === "REORDER") {
        return {
            impact: n,
            didDropInsideDroppable: true
        };
    }
    const s = {
        ...n,
        displaced: Wt
    };
    return {
        impact: s,
        didDropInsideDroppable: true
    };
};

var un = (e, t) => {
    const n = e.frame;
    if (!n) {
        return t;
    }
    return Me(t, n.scroll.diff.displacement);
};

function pn(e, t) {
    return Boolean(t.effected[e]);
}

var gn = ({displaced: e, afterCritical: t, combineWith: n, displacedBy: r}) => {
    const o = Boolean(e.visible[n] || e.invisible[n]);
    if (pn(n, t)) {
        return o ? Ge : Fe(r.point);
    }
    return o ? r.point : Ge;
};

var fn = ({afterCritical: e, impact: t, draggables: n}) => {
    const r = St(t);
    K(r);
    const o = r.draggableId;
    const i = n[o].page.borderBox.center;
    const s = gn({
        displaced: t.displaced,
        afterCritical: e,
        combineWith: o,
        displacedBy: t.displacedBy
    });
    return Me(i, s);
};

var mn = x(((e, t) => {
    const n = Ne(t).filter((t => e === t.descriptor.droppableId)).sort(((e, t) => e.descriptor.index - t.descriptor.index));
    return n;
}));

const bn = (e, t) => t.margin[e.start] + t.borderBox[e.size] / 2;

const hn = (e, t) => t.margin[e.end] + t.borderBox[e.size] / 2;

const vn = (e, t, n) => t[e.crossAxisStart] + n.margin[e.crossAxisStart] + n.borderBox[e.crossAxisSize] / 2;

const yn = ({axis: e, moveRelativeTo: t, isMoving: n}) => ke(e.line, t.marginBox[e.end] + bn(e, n), vn(e, t.marginBox, n));

const Dn = ({axis: e, moveRelativeTo: t, isMoving: n}) => ke(e.line, t.marginBox[e.start] - hn(e, n), vn(e, t.marginBox, n));

const In = ({axis: e, moveInto: t, isMoving: n}) => ke(e.line, t.contentBox[e.start] + bn(e, n), vn(e, t.contentBox, n));

var xn = ({impact: e, draggable: t, draggables: n, droppable: r, afterCritical: o}) => {
    const i = mn(r.descriptor.id, n);
    const s = t.page;
    const a = r.axis;
    if (!i.length) {
        return In({
            axis: a,
            moveInto: r.page,
            isMoving: s
        });
    }
    const {displaced: c, displacedBy: l} = e;
    const d = c.all[0];
    if (d) {
        const e = n[d];
        if (pn(d, o)) {
            return Dn({
                axis: a,
                moveRelativeTo: e.page,
                isMoving: s
            });
        }
        const t = E(e.page, l.point);
        return Dn({
            axis: a,
            moveRelativeTo: t,
            isMoving: s
        });
    }
    const u = i[i.length - 1];
    if (u.descriptor.id === t.descriptor.id) {
        return s.borderBox.center;
    }
    if (pn(u.descriptor.id, o)) {
        const e = E(u.page, Fe(o.displacedBy.point));
        return yn({
            axis: a,
            moveRelativeTo: e,
            isMoving: s
        });
    }
    return yn({
        axis: a,
        moveRelativeTo: u.page,
        isMoving: s
    });
};

const Cn = ({impact: e, draggable: t, droppable: n, draggables: r, afterCritical: o}) => {
    const i = t.page.borderBox.center;
    const s = e.at;
    if (!n) {
        return i;
    }
    if (!s) {
        return i;
    }
    if (s.type === "REORDER") {
        return xn({
            impact: e,
            draggable: t,
            draggables: r,
            droppable: n,
            afterCritical: o
        });
    }
    return fn({
        impact: e,
        draggables: r,
        afterCritical: o
    });
};

var wn = e => {
    const t = Cn(e);
    const n = e.droppable;
    const r = n ? un(n, t) : t;
    return r;
};

var En = (e, t) => Me(e.scroll.diff.displacement, t);

var An = ({pageBorderBoxCenter: e, draggable: t, viewport: n}) => {
    const r = En(n, e);
    const o = _e(r, t.page.borderBox.center);
    return Me(t.client.borderBox.center, o);
};

var Sn = ({impact: e, draggable: t, droppable: n, draggables: r, viewport: o, afterCritical: i}) => {
    const s = wn({
        impact: e,
        draggable: t,
        draggables: r,
        droppable: n,
        afterCritical: i
    });
    return An({
        pageBorderBoxCenter: s,
        draggable: t,
        viewport: o
    });
};

var Bn = ({impact: e, draggable: t, dimensions: n, viewport: r, afterCritical: o}) => {
    const {draggables: i, droppables: s} = n;
    const a = Ie(e);
    const c = a ? s[a] : null;
    const l = s[t.descriptor.droppableId];
    const d = Sn({
        impact: e,
        draggable: t,
        draggables: i,
        afterCritical: o,
        droppable: c || l,
        viewport: r
    });
    const u = _e(d, t.client.borderBox.center);
    return u;
};

var Nn = ({getState: e, dispatch: t}) => n => r => {
    if (r.type !== "DROP") {
        n(r);
        return;
    }
    const o = e();
    const i = r.payload.reason;
    if (o.phase === "COLLECTING") {
        t(he({
            reason: i
        }));
        return;
    }
    if (o.phase === "IDLE") {
        return;
    }
    const s = o.phase === "DROP_PENDING" && o.isWaiting;
    K(!s, "A DROP action occurred while DROP_PENDING and still waiting");
    K(o.phase === "DRAGGING" || o.phase === "DROP_PENDING", `Cannot drop in phase: ${o.phase}`);
    const a = o;
    const c = a.critical;
    const l = o.dimensions;
    const d = l.draggables[a.critical.draggable.id];
    const {impact: u, didDropInsideDroppable: p} = dn({
        reason: i,
        lastImpact: a.impact,
        afterCritical: a.afterCritical,
        onLiftImpact: a.onLiftImpact,
        home: a.dimensions.droppables[a.critical.droppable.id],
        viewport: a.viewport,
        draggables: a.dimensions.draggables
    });
    const g = p ? At(u) : null;
    const f = p ? St(u) : null;
    const m = {
        index: c.draggable.index,
        droppableId: c.droppable.id
    };
    const b = {
        draggableId: d.descriptor.id,
        type: d.descriptor.type,
        source: m,
        reason: i,
        mode: a.movementMode,
        destination: g,
        combine: f
    };
    const h = Bn({
        impact: u,
        draggable: d,
        dimensions: l,
        viewport: a.viewport,
        afterCritical: a.afterCritical
    });
    const v = {
        critical: a.critical,
        afterCritical: a.afterCritical,
        result: b,
        impact: u
    };
    const y = !$e(a.current.client.offset, h) || Boolean(b.combine);
    if (!y) {
        t(me({
            completed: v
        }));
        return;
    }
    const D = kt({
        current: a.current.client.offset,
        destination: h,
        reason: i
    });
    const I = {
        newHomeClientOffset: h,
        dropDuration: D,
        completed: v
    };
    t(fe(I));
};

var Pn = e => {
    let t = false;
    return () => n => r => {
        if (r.type === "INITIAL_PUBLISH") {
            t = true;
            e.tryRecordFocus(r.payload.critical.draggable.id);
            n(r);
            e.tryRestoreFocusRecorded();
            return;
        }
        n(r);
        if (!t) {
            return;
        }
        if (r.type === "FLUSH") {
            t = false;
            e.tryRestoreFocusRecorded();
            return;
        }
        if (r.type === "DROP_COMPLETE") {
            t = false;
            const n = r.payload.completed.result;
            if (n.combine) {
                e.tryShiftRecord(n.draggableId, n.combine.draggableId);
            }
            e.tryRestoreFocusRecorded();
        }
    };
};

var Rn = e => ({getState: t, dispatch: n}) => r => o => {
    if (o.type !== "LIFT") {
        r(o);
        return;
    }
    const {id: i, clientSelection: s, movementMode: a} = o.payload;
    const c = t();
    if (c.phase === "DROP_ANIMATING") {
        n(me({
            completed: c.completed
        }));
    }
    K(t().phase === "IDLE", "Unexpected phase to start a drag");
    n(ge());
    n(Q({
        draggableId: i,
        movementMode: a
    }));
    const l = {
        shouldPublishImmediately: a === "SNAP"
    };
    const d = {
        draggableId: i,
        scrollOptions: l
    };
    const {critical: u, dimensions: p, viewport: g} = e.startPublishing(d);
    n(ee({
        critical: u,
        dimensions: p,
        clientSelection: s,
        movementMode: a,
        viewport: g
    }));
};

var On = e => t => n => {
    t(n);
    if (n.type !== "PUBLISH_WHILE_DRAGGING") {
        return;
    }
    const r = e.getState();
    if (r.phase !== "DROP_PENDING") {
        return;
    }
    if (r.isWaiting) {
        return;
    }
    e.dispatch(be({
        reason: r.reason
    }));
};

var Tn = () => {
    const e = [];
    const t = t => {
        const n = Ce(e, (e => e.timerId === t));
        K(n !== -1, "Could not find timer");
        const [r] = e.splice(n, 1);
        r.callback();
    };
    const n = n => {
        const r = setTimeout((() => t(r)));
        const o = {
            timerId: r,
            callback: n
        };
        e.push(o);
    };
    const r = () => {
        if (!e.length) {
            return;
        }
        const t = [ ...e ];
        e.length = 0;
        t.forEach((e => {
            clearTimeout(e.timerId);
            e.callback();
        }));
    };
    return {
        add: n,
        flush: r
    };
};

var Ln = e => {
    let t = false;
    let n = false;
    const r = setTimeout((() => {
        n = true;
    }));
    const o = o => {
        if (t) {
            z("Announcement already made. Not making a second announcement");
            return;
        }
        if (n) {
            z(`\n        Announcements cannot be made asynchronously.\n        Default message has already been announced.\n      `);
            return;
        }
        t = true;
        e(o);
        clearTimeout(r);
    };
    o.wasCalled = () => t;
    return o;
};

const Gn = (e, t) => {
    if (!e && !t) {
        return true;
    }
    if (!e || !t) {
        return false;
    }
    return e.droppableId === t.droppableId && e.index === t.index;
};

const Mn = (e, t) => {
    if (!e && !t) {
        return true;
    }
    if (!e || !t) {
        return false;
    }
    return e.draggableId === t.draggableId && e.droppableId === t.droppableId;
};

const _n = (e, t) => {
    if (e === t) {
        return true;
    }
    const n = e.draggable.id === t.draggable.id && e.draggable.droppableId === t.draggable.droppableId && e.draggable.type === t.draggable.type && e.draggable.index === t.draggable.index;
    const r = e.droppable.id === t.droppable.id && e.droppable.type === t.droppable.type;
    return n && r;
};

const $n = (e, t) => {
    t();
};

const Fn = (e, t) => ({
    draggableId: e.draggable.id,
    type: e.droppable.type,
    source: {
        droppableId: e.droppable.id,
        index: e.draggable.index
    },
    mode: t
});

const kn = (e, t, n, r) => {
    if (!e) {
        n(r(t));
        return;
    }
    const o = Ln(n);
    const i = {
        announce: o
    };
    e(t, i);
    if (!o.wasCalled()) {
        n(r(t));
    }
};

var Un = (e, t) => {
    const n = Tn();
    let r = null;
    const o = (t, n) => {
        K(!r, "Cannot fire onBeforeCapture as a drag start has already been published");
        $n("onBeforeCapture", (() => {
            const r = e().onBeforeCapture;
            if (r) {
                const e = {
                    draggableId: t,
                    mode: n
                };
                r(e);
            }
        }));
    };
    const i = (t, n) => {
        K(!r, "Cannot fire onBeforeDragStart as a drag start has already been published");
        $n("onBeforeDragStart", (() => {
            const r = e().onBeforeDragStart;
            if (r) {
                r(Fn(t, n));
            }
        }));
    };
    const s = (o, i) => {
        K(!r, "Cannot fire onBeforeDragStart as a drag start has already been published");
        const s = Fn(o, i);
        r = {
            mode: i,
            lastCritical: o,
            lastLocation: s.source,
            lastCombine: null
        };
        n.add((() => {
            $n("onDragStart", (() => kn(e().onDragStart, s, t, U.onDragStart)));
        }));
    };
    const a = (o, i) => {
        const s = At(i);
        const a = St(i);
        K(r, "Cannot fire onDragMove when onDragStart has not been called");
        const c = !_n(o, r.lastCritical);
        if (c) {
            r.lastCritical = o;
        }
        const l = !Gn(r.lastLocation, s);
        if (l) {
            r.lastLocation = s;
        }
        const d = !Mn(r.lastCombine, a);
        if (d) {
            r.lastCombine = a;
        }
        if (!c && !l && !d) {
            return;
        }
        const u = {
            ...Fn(o, r.mode),
            combine: a,
            destination: s
        };
        n.add((() => {
            $n("onDragUpdate", (() => kn(e().onDragUpdate, u, t, U.onDragUpdate)));
        }));
    };
    const c = () => {
        K(r, "Can only flush responders while dragging");
        n.flush();
    };
    const l = n => {
        K(r, "Cannot fire onDragEnd when there is no matching onDragStart");
        r = null;
        $n("onDragEnd", (() => kn(e().onDragEnd, n, t, U.onDragEnd)));
    };
    const d = () => {
        if (!r) {
            return;
        }
        const e = {
            ...Fn(r.lastCritical, r.mode),
            combine: null,
            destination: null,
            reason: "CANCEL"
        };
        l(e);
    };
    return {
        beforeCapture: o,
        beforeStart: i,
        start: s,
        update: a,
        flush: c,
        drop: l,
        abort: d
    };
};

var Wn = (e, t) => {
    const n = Un(e, t);
    return e => t => r => {
        if (r.type === "BEFORE_INITIAL_CAPTURE") {
            n.beforeCapture(r.payload.draggableId, r.payload.movementMode);
            return;
        }
        if (r.type === "INITIAL_PUBLISH") {
            const e = r.payload.critical;
            n.beforeStart(e, r.payload.movementMode);
            t(r);
            n.start(e, r.payload.movementMode);
            return;
        }
        if (r.type === "DROP_COMPLETE") {
            const e = r.payload.completed.result;
            n.flush();
            t(r);
            n.drop(e);
            return;
        }
        t(r);
        if (r.type === "FLUSH") {
            n.abort();
            return;
        }
        const o = e.getState();
        if (o.phase === "DRAGGING") {
            n.update(o.critical, o.impact);
        }
    };
};

function Hn() {}

var jn = () => ({
    x: window.pageXOffset,
    y: window.pageYOffset
});

function Vn(e) {
    return {
        eventName: "scroll",
        options: {
            passive: true,
            capture: false
        },
        fn: t => {
            if (t.target !== window && t.target !== window.document) {
                return;
            }
            e();
        }
    };
}

function qn({onWindowScroll: e}) {
    function t() {
        e(jn());
    }
    const n = I(t);
    const r = Vn(n);
    let o = Hn;
    function i() {
        return o !== Hn;
    }
    function s() {
        K(!i(), "Cannot start scroll listener when already active");
        o = wt(window, [ r ]);
    }
    function a() {
        K(i(), "Cannot stop scroll listener when not active");
        n.cancel();
        o();
        o = Hn;
    }
    return {
        start: s,
        stop: a,
        isActive: i
    };
}

const zn = e => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH";

var Yn = e => {
    const t = qn({
        onWindowScroll: t => {
            e.dispatch(ae({
                newScroll: t
            }));
        }
    });
    return e => n => {
        if (!t.isActive() && n.type === "INITIAL_PUBLISH") {
            t.start();
        }
        if (t.isActive() && zn(n)) {
            t.stop();
        }
        e(n);
    };
};

var Jn = e => () => t => n => {
    if (n.type === "INITIAL_PUBLISH") {
        e.dragging();
    }
    if (n.type === "DROP_ANIMATE") {
        e.dropping(n.payload.completed.result.reason);
    }
    if (n.type === "FLUSH" || n.type === "DROP_COMPLETE") {
        e.resting();
    }
    t(n);
};

const Xn = e => e.isDragging;

var Kn = (e, t) => {
    const n = C({
        top: Math.max(t.top, e.top),
        right: Math.min(t.right, e.right),
        bottom: Math.min(t.bottom, e.bottom),
        left: Math.max(t.left, e.left)
    });
    if (n.width <= 0 || n.height <= 0) {
        return null;
    }
    return n;
};

const Qn = (e, t) => {
    if (!t) {
        return e;
    }
    return Vt(e, t.scroll.diff.displacement);
};

const Zn = (e, t, n) => {
    if (n && n.increasedBy) {
        return {
            ...e,
            [t.end]: e[t.end] + n.increasedBy[t.line]
        };
    }
    return e;
};

const er = (e, t) => {
    if (t && t.shouldClipSubject) {
        return Kn(t.pageMarginBox, e);
    }
    return C(e);
};

var tr = ({page: e, withPlaceholder: t, axis: n, frame: r}) => {
    const o = Qn(e.marginBox, r);
    const i = Zn(o, n, t);
    const s = er(i, r);
    return {
        page: e,
        withPlaceholder: t,
        active: s
    };
};

var nr = (e, t) => {
    K(e.frame);
    const n = e.frame;
    const r = _e(t, n.scroll.initial);
    const o = Fe(r);
    const i = {
        ...n,
        scroll: {
            initial: n.scroll.initial,
            current: t,
            diff: {
                value: r,
                displacement: o
            },
            max: n.scroll.max
        }
    };
    const s = tr({
        page: e.subject.page,
        withPlaceholder: e.subject.withPlaceholder,
        axis: e.axis,
        frame: i
    });
    const a = {
        ...e,
        frame: i,
        subject: s
    };
    return a;
};

var rr = x((function e(t, n) {
    const r = n[t.line];
    return {
        value: r,
        point: ke(t.line, r)
    };
}));

var or = e => ({
    index: e.index,
    droppableId: e.droppableId
});

var ir = ({draggable: e, home: t, draggables: n, viewport: r}) => {
    const o = rr(t.axis, e.displaceBy);
    const i = mn(t.descriptor.id, n);
    const s = i.indexOf(e);
    K(s !== -1, "Expected draggable to be inside home list");
    const a = i.slice(s + 1);
    const c = a.reduce(((e, t) => {
        e[t.descriptor.id] = true;
        return e;
    }), {});
    const l = {
        inVirtualList: t.descriptor.mode === "virtual",
        displacedBy: o,
        effected: c
    };
    const d = an({
        afterDragging: a,
        destination: t,
        displacedBy: o,
        last: null,
        viewport: r.frame,
        forceShouldAnimate: false
    });
    const u = {
        displaced: d,
        displacedBy: o,
        at: {
            type: "REORDER",
            destination: or(e.descriptor)
        }
    };
    return {
        impact: u,
        afterCritical: l
    };
};

function sr(e) {
    return e.phase === "DRAGGING" || e.phase === "COLLECTING";
}

const ar = e => {
    const t = e.subject.active;
    K(t, "Cannot get clipped area from droppable");
    return t;
};

var cr = ({isMovingForward: e, pageBorderBoxCenter: t, source: n, droppables: r, viewport: o}) => {
    const i = n.subject.active;
    if (!i) {
        return null;
    }
    const s = n.axis;
    const a = Pe(i[s.start], i[s.end]);
    const c = Be(r).filter((e => e !== n)).filter((e => e.isEnabled)).filter((e => Boolean(e.subject.active))).filter((e => Yt(o.frame)(ar(e)))).filter((t => {
        const n = ar(t);
        if (e) {
            return i[s.crossAxisEnd] < n[s.crossAxisEnd];
        }
        return n[s.crossAxisStart] < i[s.crossAxisStart];
    })).filter((e => {
        const t = ar(e);
        const n = Pe(t[s.start], t[s.end]);
        return a(t[s.start]) || a(t[s.end]) || n(i[s.start]) || n(i[s.end]);
    })).sort(((t, n) => {
        const r = ar(t)[s.crossAxisStart];
        const o = ar(n)[s.crossAxisStart];
        if (e) {
            return r - o;
        }
        return o - r;
    })).filter(((e, t, n) => ar(e)[s.crossAxisStart] === ar(n[0])[s.crossAxisStart]));
    if (!c.length) {
        return null;
    }
    if (c.length === 1) {
        return c[0];
    }
    const l = c.filter((e => {
        const n = Pe(ar(e)[s.start], ar(e)[s.end]);
        return n(t[s.line]);
    }));
    if (l.length === 1) {
        return l[0];
    }
    if (l.length > 1) {
        return l.sort(((e, t) => ar(e)[s.start] - ar(t)[s.start]))[0];
    }
    return c.sort(((e, n) => {
        const r = We(t, qt(ar(e)));
        const o = We(t, qt(ar(n)));
        if (r !== o) {
            return r - o;
        }
        return ar(e)[s.start] - ar(n)[s.start];
    }))[0];
};

const lr = (e, t) => {
    const n = e.page.borderBox.center;
    return pn(e.descriptor.id, t) ? _e(n, t.displacedBy.point) : n;
};

const dr = (e, t) => {
    const n = e.page.borderBox;
    return pn(e.descriptor.id, t) ? Vt(n, Fe(t.displacedBy.point)) : n;
};

var ur = ({pageBorderBoxCenter: e, viewport: t, destination: n, insideDestination: r, afterCritical: o}) => {
    const i = r.filter((e => nn({
        target: dr(e, o),
        destination: n,
        viewport: t.frame,
        withDroppableDisplacement: true
    }))).sort(((t, r) => {
        const i = Ue(e, un(n, lr(t, o)));
        const s = Ue(e, un(n, lr(r, o)));
        if (i < s) {
            return -1;
        }
        if (s < i) {
            return 1;
        }
        return t.descriptor.index - r.descriptor.index;
    }));
    return i[0] || null;
};

var pr = (e, t) => e.descriptor.droppableId === t.descriptor.id;

var gr = x(((e, t) => t.filter((t => t.descriptor.id !== e.descriptor.id))));

function fr(e, t) {
    if (!e.length) {
        return 0;
    }
    const n = e[e.length - 1].descriptor.index;
    return t.inHomeList ? n : n + 1;
}

function mr({insideDestination: e, inHomeList: t, displacedBy: n, destination: r}) {
    const o = fr(e, {
        inHomeList: t
    });
    return {
        displaced: Wt,
        displacedBy: n,
        at: {
            type: "REORDER",
            destination: {
                droppableId: r.descriptor.id,
                index: o
            }
        }
    };
}

function br({draggable: e, insideDestination: t, destination: n, viewport: r, displacedBy: o, last: i, index: s, forceShouldAnimate: a}) {
    const c = pr(e, n);
    if (s === null) {
        return mr({
            insideDestination: t,
            inHomeList: c,
            displacedBy: o,
            destination: n
        });
    }
    const l = we(t, (e => e.descriptor.index === s));
    if (!l) {
        return mr({
            insideDestination: t,
            inHomeList: c,
            displacedBy: o,
            destination: n
        });
    }
    const d = gr(e, t);
    const u = t.indexOf(l);
    const p = d.slice(u);
    const g = an({
        afterDragging: p,
        destination: n,
        displacedBy: o,
        last: i,
        viewport: r.frame,
        forceShouldAnimate: a
    });
    return {
        displaced: g,
        displacedBy: o,
        at: {
            type: "REORDER",
            destination: {
                droppableId: n.descriptor.id,
                index: s
            }
        }
    };
}

const hr = (e, t, n) => {
    const r = e.axis;
    if (e.descriptor.mode === "virtual") {
        return ke(r.line, t[r.line]);
    }
    const o = e.subject.page.contentBox[r.size];
    const i = mn(e.descriptor.id, n);
    const s = i.reduce(((e, t) => e + t.client.marginBox[r.size]), 0);
    const a = s + t[r.line];
    const c = a - o;
    if (c <= 0) {
        return null;
    }
    return ke(r.line, c);
};

const vr = (e, t) => ({
    ...e,
    scroll: {
        ...e.scroll,
        max: t
    }
});

const yr = (e, t, n) => {
    const r = e.frame;
    K(!pr(t, e), "Should not add placeholder space to home list");
    K(!e.subject.withPlaceholder, "Cannot add placeholder size to a subject when it already has one");
    const o = rr(e.axis, t.displaceBy).point;
    const i = hr(e, o, n);
    const s = {
        placeholderSize: o,
        increasedBy: i,
        oldFrameMaxScroll: e.frame ? e.frame.scroll.max : null
    };
    if (!r) {
        const t = tr({
            page: e.subject.page,
            withPlaceholder: s,
            axis: e.axis,
            frame: e.frame
        });
        return {
            ...e,
            subject: t
        };
    }
    const a = i ? Me(r.scroll.max, i) : r.scroll.max;
    const c = vr(r, a);
    const l = tr({
        page: e.subject.page,
        withPlaceholder: s,
        axis: e.axis,
        frame: c
    });
    return {
        ...e,
        subject: l,
        frame: c
    };
};

const Dr = e => {
    const t = e.subject.withPlaceholder;
    K(t, "Cannot remove placeholder form subject when there was none");
    const n = e.frame;
    if (!n) {
        const t = tr({
            page: e.subject.page,
            axis: e.axis,
            frame: null,
            withPlaceholder: null
        });
        return {
            ...e,
            subject: t
        };
    }
    const r = t.oldFrameMaxScroll;
    K(r, "Expected droppable with frame to have old max frame scroll when removing placeholder");
    const o = vr(n, r);
    const i = tr({
        page: e.subject.page,
        axis: e.axis,
        frame: o,
        withPlaceholder: null
    });
    return {
        ...e,
        subject: i,
        frame: o
    };
};

var Ir = ({draggable: e, destination: t, newPageBorderBoxCenter: n, viewport: r, withDroppableDisplacement: o, onlyOnMainAxis: i = false}) => {
    const s = _e(n, e.page.borderBox.center);
    const a = Vt(e.page.borderBox, s);
    const c = {
        target: a,
        destination: t,
        withDroppableDisplacement: o,
        viewport: r
    };
    return i ? rn(c) : nn(c);
};

var xr = ({previousPageBorderBoxCenter: e, moveRelativeTo: t, insideDestination: n, draggable: r, draggables: o, destination: i, viewport: s, afterCritical: a}) => {
    if (!t) {
        if (n.length) {
            return null;
        }
        const e = {
            displaced: Wt,
            displacedBy: Ut,
            at: {
                type: "REORDER",
                destination: {
                    droppableId: i.descriptor.id,
                    index: 0
                }
            }
        };
        const t = wn({
            impact: e,
            draggable: r,
            droppable: i,
            draggables: o,
            afterCritical: a
        });
        const c = pr(r, i) ? i : yr(i, r, o);
        const l = Ir({
            draggable: r,
            destination: c,
            newPageBorderBoxCenter: t,
            viewport: s.frame,
            withDroppableDisplacement: false,
            onlyOnMainAxis: true
        });
        return l ? e : null;
    }
    const c = Boolean(e[i.axis.line] <= t.page.borderBox.center[i.axis.line]);
    const l = (() => {
        const e = t.descriptor.index;
        if (t.descriptor.id === r.descriptor.id) {
            return e;
        }
        if (c) {
            return e;
        }
        return e + 1;
    })();
    const d = rr(i.axis, r.displaceBy);
    return br({
        draggable: r,
        insideDestination: n,
        destination: i,
        viewport: s,
        displacedBy: d,
        last: Wt,
        index: l
    });
};

var Cr = ({isMovingForward: e, previousPageBorderBoxCenter: t, draggable: n, isOver: r, draggables: o, droppables: i, viewport: s, afterCritical: a}) => {
    const c = cr({
        isMovingForward: e,
        pageBorderBoxCenter: t,
        source: r,
        droppables: i,
        viewport: s
    });
    if (!c) {
        return null;
    }
    const l = mn(c.descriptor.id, o);
    const d = ur({
        pageBorderBoxCenter: t,
        viewport: s,
        destination: c,
        insideDestination: l,
        afterCritical: a
    });
    const u = xr({
        previousPageBorderBoxCenter: t,
        destination: c,
        draggable: n,
        draggables: o,
        moveRelativeTo: d,
        insideDestination: l,
        viewport: s,
        afterCritical: a
    });
    if (!u) {
        return null;
    }
    const p = wn({
        impact: u,
        draggable: n,
        droppable: c,
        draggables: o,
        afterCritical: a
    });
    const g = An({
        pageBorderBoxCenter: p,
        draggable: n,
        viewport: s
    });
    return {
        clientSelection: g,
        impact: u,
        scrollJumpRequest: null
    };
};

var wr = (e, t) => {
    const n = _e(t, e.scroll.initial);
    const r = Fe(n);
    const o = C({
        top: t.y,
        bottom: t.y + e.frame.height,
        left: t.x,
        right: t.x + e.frame.width
    });
    const i = {
        frame: o,
        scroll: {
            initial: e.scroll.initial,
            max: e.scroll.max,
            current: t,
            diff: {
                value: n,
                displacement: r
            }
        }
    };
    return i;
};

function Er(e, t) {
    return e.map((e => t[e]));
}

function Ar(e, t) {
    for (let n = 0; n < t.length; n++) {
        const r = t[n].visible[e];
        if (r) {
            return r;
        }
    }
    return null;
}

var Sr = ({impact: e, viewport: t, destination: n, draggables: r, maxScrollChange: o}) => {
    const i = wr(t, Me(t.scroll.current, o));
    const s = n.frame ? nr(n, Me(n.frame.scroll.current, o)) : n;
    const a = e.displaced;
    const c = an({
        afterDragging: Er(a.all, r),
        destination: n,
        displacedBy: e.displacedBy,
        viewport: i.frame,
        last: a,
        forceShouldAnimate: false
    });
    const l = an({
        afterDragging: Er(a.all, r),
        destination: s,
        displacedBy: e.displacedBy,
        viewport: t.frame,
        last: a,
        forceShouldAnimate: false
    });
    const d = {};
    const u = {};
    const p = [ a, c, l ];
    a.all.forEach((e => {
        const t = Ar(e, p);
        if (t) {
            u[e] = t;
            return;
        }
        d[e] = true;
    }));
    const g = {
        ...e,
        displaced: {
            all: a.all,
            invisible: d,
            visible: u
        }
    };
    return g;
};

var Br = ({isMovingForward: e, draggable: t, destination: n, insideDestination: r, previousImpact: o}) => {
    if (!n.isCombineEnabled) {
        return null;
    }
    const i = At(o);
    if (!i) {
        return null;
    }
    function s(e) {
        const t = {
            type: "COMBINE",
            combine: {
                draggableId: e,
                droppableId: n.descriptor.id
            }
        };
        return {
            ...o,
            at: t
        };
    }
    const a = o.displaced.all;
    const c = a.length ? a[0] : null;
    if (e) {
        return c ? s(c) : null;
    }
    const l = gr(t, r);
    if (!c) {
        if (!l.length) {
            return null;
        }
        const e = l[l.length - 1];
        return s(e.descriptor.id);
    }
    const d = Ce(l, (e => e.descriptor.id === c));
    K(d !== -1, "Could not find displaced item in set");
    const u = d - 1;
    if (u < 0) {
        return null;
    }
    const p = l[u];
    return s(p.descriptor.id);
};

var Nr = ({isMovingForward: e, destination: t, draggables: n, combine: r, afterCritical: o}) => {
    if (!t.isCombineEnabled) {
        return null;
    }
    const i = r.draggableId;
    const s = n[i];
    const a = s.descriptor.index;
    const c = pn(i, o);
    if (c) {
        if (e) {
            return a;
        }
        return a - 1;
    }
    if (e) {
        return a + 1;
    }
    return a;
};

var Pr = ({isMovingForward: e, isInHomeList: t, insideDestination: n, location: r}) => {
    if (!n.length) {
        return null;
    }
    const o = r.index;
    const i = e ? o + 1 : o - 1;
    const s = n[0].descriptor.index;
    const a = n[n.length - 1].descriptor.index;
    const c = t ? a : a + 1;
    if (i < s) {
        return null;
    }
    if (i > c) {
        return null;
    }
    return i;
};

const Rr = e => e.type === "REORDER";

var Or = ({isMovingForward: e, isInHomeList: t, draggable: n, draggables: r, destination: o, insideDestination: i, previousImpact: s, viewport: a, afterCritical: c}) => {
    const l = s.at;
    K(l, "Cannot move in direction without previous impact location");
    if (Rr(l)) {
        const r = Pr({
            isMovingForward: e,
            isInHomeList: t,
            location: l.destination,
            insideDestination: i
        });
        if (r === null) {
            return null;
        }
        return br({
            draggable: n,
            insideDestination: i,
            destination: o,
            viewport: a,
            last: s.displaced,
            displacedBy: s.displacedBy,
            index: r
        });
    }
    const d = Nr({
        isMovingForward: e,
        destination: o,
        displaced: s.displaced,
        draggables: r,
        combine: l.combine,
        afterCritical: c
    });
    if (d === null) {
        return null;
    }
    return br({
        draggable: n,
        insideDestination: i,
        destination: o,
        viewport: a,
        last: s.displaced,
        displacedBy: s.displacedBy,
        index: d
    });
};

var Tr = ({isMovingForward: e, draggable: t, destination: n, draggables: r, previousImpact: o, viewport: i, previousPageBorderBoxCenter: s, previousClientSelection: a, afterCritical: c}) => {
    if (!n.isEnabled) {
        return null;
    }
    const l = mn(n.descriptor.id, r);
    const d = pr(t, n);
    const u = Br({
        isMovingForward: e,
        draggable: t,
        destination: n,
        insideDestination: l,
        previousImpact: o
    }) || Or({
        isMovingForward: e,
        isInHomeList: d,
        draggable: t,
        draggables: r,
        destination: n,
        insideDestination: l,
        previousImpact: o,
        viewport: i,
        afterCritical: c
    });
    if (!u) {
        return null;
    }
    const p = wn({
        impact: u,
        draggable: t,
        droppable: n,
        draggables: r,
        afterCritical: c
    });
    const g = Ir({
        draggable: t,
        destination: n,
        newPageBorderBoxCenter: p,
        viewport: i.frame,
        withDroppableDisplacement: false,
        onlyOnMainAxis: true
    });
    if (g) {
        const e = An({
            pageBorderBoxCenter: p,
            draggable: t,
            viewport: i
        });
        return {
            clientSelection: e,
            impact: u,
            scrollJumpRequest: null
        };
    }
    const f = _e(p, s);
    const m = Sr({
        impact: u,
        viewport: i,
        destination: n,
        draggables: r,
        maxScrollChange: f
    });
    return {
        clientSelection: a,
        impact: m,
        scrollJumpRequest: f
    };
};

const Lr = (e, t) => {
    const n = Ie(e);
    return n ? t[n] : null;
};

var Gr = ({state: e, type: t}) => {
    const n = Lr(e.impact, e.dimensions.droppables);
    const r = Boolean(n);
    const o = e.dimensions.droppables[e.critical.droppable.id];
    const i = n || o;
    const s = i.axis.direction;
    const a = s === "vertical" && (t === "MOVE_UP" || t === "MOVE_DOWN") || s === "horizontal" && (t === "MOVE_LEFT" || t === "MOVE_RIGHT");
    if (a && !r) {
        return null;
    }
    const c = t === "MOVE_DOWN" || t === "MOVE_RIGHT";
    const l = e.dimensions.draggables[e.critical.draggable.id];
    const d = e.current.page.borderBoxCenter;
    const {draggables: u, droppables: p} = e.dimensions;
    return a ? Tr({
        isMovingForward: c,
        previousPageBorderBoxCenter: d,
        draggable: l,
        destination: i,
        draggables: u,
        viewport: e.viewport,
        previousClientSelection: e.current.client.selection,
        previousImpact: e.impact,
        afterCritical: e.afterCritical
    }) : Cr({
        isMovingForward: c,
        previousPageBorderBoxCenter: d,
        draggable: l,
        isOver: i,
        draggables: u,
        droppables: p,
        viewport: e.viewport,
        afterCritical: e.afterCritical
    });
};

var Mr = (e, t) => ({
    ...e,
    [t.descriptor.id]: t
});

var _r = (e, t) => ({
    draggables: e.draggables,
    droppables: Mr(e.droppables, t)
});

function $r(e, t) {
    return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}

function Fr({pageBorderBox: e, draggable: t, candidates: n}) {
    const r = t.page.borderBox.center;
    const o = n.map((t => {
        const n = t.axis;
        const o = ke(t.axis.line, e.center[n.line], t.page.borderBox.center[n.crossAxisLine]);
        return {
            id: t.descriptor.id,
            distance: Ue(r, o)
        };
    })).sort(((e, t) => t.distance - e.distance));
    return o[0] ? o[0].id : null;
}

function kr({pageBorderBox: e, draggable: t, droppables: n}) {
    const r = Be(n).filter((t => {
        if (!t.isEnabled) {
            return false;
        }
        const n = t.subject.active;
        if (!n) {
            return false;
        }
        if (!$r(e, n)) {
            return false;
        }
        if (Re(n)(e.center)) {
            return true;
        }
        const r = t.axis;
        const o = n.center[r.crossAxisLine];
        const i = e[r.crossAxisStart];
        const s = e[r.crossAxisEnd];
        const a = Pe(n[r.crossAxisStart], n[r.crossAxisEnd]);
        const c = a(i);
        const l = a(s);
        if (!c && !l) {
            return true;
        }
        if (c) {
            return i < o;
        }
        return s > o;
    }));
    if (!r.length) {
        return null;
    }
    if (r.length === 1) {
        return r[0].descriptor.id;
    }
    return Fr({
        pageBorderBox: e,
        draggable: t,
        candidates: r
    });
}

const Ur = (e, t) => C(Vt(e, t));

var Wr = (e, t) => {
    const n = e.frame;
    if (!n) {
        return t;
    }
    return Ur(t, n.scroll.diff.value);
};

function Hr({displaced: e, id: t}) {
    return Boolean(e.visible[t] || e.invisible[t]);
}

const jr = 4;

var Vr = ({draggable: e, pageBorderBoxWithDroppableScroll: t, previousImpact: n, destination: r, insideDestination: o, afterCritical: i}) => {
    if (!r.isCombineEnabled) {
        return null;
    }
    const s = r.axis;
    const a = rr(r.axis, e.displaceBy);
    const c = a.value;
    const l = t[s.start];
    const d = t[s.end];
    const u = gr(e, o);
    const p = we(u, (e => {
        const t = e.descriptor.id;
        const r = e.page.borderBox;
        const o = r[s.size];
        const a = o / jr;
        const u = pn(t, i);
        const p = Hr({
            displaced: n.displaced,
            id: t
        });
        if (u) {
            if (p) {
                return d > r[s.start] + a && d < r[s.end] - a;
            }
            return l > r[s.start] - c + a && l < r[s.end] - c - a;
        }
        if (p) {
            return d > r[s.start] + c + a && d < r[s.end] + c - a;
        }
        return l > r[s.start] + a && l < r[s.end] - a;
    }));
    if (!p) {
        return null;
    }
    const g = {
        displacedBy: a,
        displaced: n.displaced,
        at: {
            type: "COMBINE",
            combine: {
                draggableId: p.descriptor.id,
                droppableId: r.descriptor.id
            }
        }
    };
    return g;
};

function qr({draggable: e, closest: t, inHomeList: n}) {
    if (!t) {
        return null;
    }
    if (!n) {
        return t.descriptor.index;
    }
    if (t.descriptor.index > e.descriptor.index) {
        return t.descriptor.index - 1;
    }
    return t.descriptor.index;
}

var zr = ({pageBorderBoxWithDroppableScroll: e, draggable: t, destination: n, insideDestination: r, last: o, viewport: i, afterCritical: s}) => {
    const a = n.axis;
    const c = rr(n.axis, t.displaceBy);
    const l = c.value;
    const d = e[a.start];
    const u = e[a.end];
    const p = gr(t, r);
    const g = we(p, (e => {
        const t = e.descriptor.id;
        const n = e.page.borderBox.center[a.line];
        const r = e.page.borderBox[a.line === "y" ? "top" : "left"];
        const i = e.page.borderBox[a.line === "y" ? "bottom" : "right"];
        const c = pn(t, s);
        const p = Hr({
            displaced: o,
            id: t
        });
        if (c) {
            if (p) {
                return a.line === "y" ? d <= r : u <= n;
            }
            return a.line === "y" ? d < r : d < n - l;
        }
        if (p) {
            return a.line === "y" ? d <= i : u <= n + l;
        }
        return a.line === "y" ? d < i : d < n;
    }));
    const f = qr({
        draggable: t,
        closest: g,
        inHomeList: pr(t, n)
    });
    return br({
        draggable: t,
        insideDestination: r,
        destination: n,
        viewport: i,
        last: o,
        displacedBy: c,
        index: f
    });
};

var Yr = ({pageOffset: e, draggable: t, draggables: n, droppables: r, previousImpact: o, viewport: i, afterCritical: s}) => {
    const a = Ur(t.page.borderBox, e);
    const c = kr({
        pageBorderBox: a,
        draggable: t,
        droppables: r
    });
    if (!c) {
        return jt;
    }
    const l = r[c];
    const d = mn(l.descriptor.id, n);
    const u = Wr(l, a);
    return Vr({
        pageBorderBoxWithDroppableScroll: u,
        draggable: t,
        previousImpact: o,
        destination: l,
        insideDestination: d,
        afterCritical: s
    }) || zr({
        pageBorderBoxWithDroppableScroll: u,
        draggable: t,
        destination: l,
        insideDestination: d,
        last: o.displaced,
        viewport: i,
        afterCritical: s
    });
};

const Jr = ({previousImpact: e, impact: t, droppables: n}) => {
    const r = Ie(e);
    const o = Ie(t);
    if (!r) {
        return n;
    }
    if (r === o) {
        return n;
    }
    const i = n[r];
    if (!i.subject.withPlaceholder) {
        return n;
    }
    const s = Dr(i);
    return Mr(n, s);
};

var Xr = ({draggable: e, draggables: t, droppables: n, previousImpact: r, impact: o}) => {
    const i = Jr({
        previousImpact: r,
        impact: o,
        droppables: n
    });
    const s = Ie(o);
    if (!s) {
        return i;
    }
    const a = n[s];
    if (pr(e, a)) {
        return i;
    }
    if (a.subject.withPlaceholder) {
        return i;
    }
    const c = yr(a, e, t);
    return Mr(i, c);
};

var Kr = ({state: e, clientSelection: t, dimensions: n, viewport: r, impact: o, scrollJumpRequest: i}) => {
    const s = r || e.viewport;
    const a = n || e.dimensions;
    const c = t || e.current.client.selection;
    const l = _e(c, e.initial.client.selection);
    const d = {
        offset: l,
        selection: c,
        borderBoxCenter: Me(e.initial.client.borderBoxCenter, l)
    };
    const u = {
        selection: Me(d.selection, s.scroll.current),
        borderBoxCenter: Me(d.borderBoxCenter, s.scroll.current),
        offset: Me(d.offset, s.scroll.diff.value)
    };
    const p = {
        client: d,
        page: u
    };
    if (e.phase === "COLLECTING") {
        return {
            ...e,
            dimensions: a,
            viewport: s,
            current: p
        };
    }
    const g = a.draggables[e.critical.draggable.id];
    const f = o || Yr({
        pageOffset: u.offset,
        draggable: g,
        draggables: a.draggables,
        droppables: a.droppables,
        previousImpact: e.impact,
        viewport: s,
        afterCritical: e.afterCritical
    });
    const m = Xr({
        draggable: g,
        impact: f,
        previousImpact: e.impact,
        draggables: a.draggables,
        droppables: a.droppables
    });
    const b = {
        ...e,
        current: p,
        dimensions: {
            draggables: a.draggables,
            droppables: m
        },
        impact: f,
        viewport: s,
        scrollJumpRequest: i || null,
        forceShouldAnimate: i ? false : null
    };
    return b;
};

var Qr = ({state: e, dimensions: t, viewport: n}) => {
    K(e.movementMode === "SNAP");
    const r = e.impact;
    const o = n || e.viewport;
    const i = t || e.dimensions;
    const {draggables: s, droppables: a} = i;
    const c = s[e.critical.draggable.id];
    const l = Ie(r);
    K(l, "Must be over a destination in SNAP movement mode");
    const d = a[l];
    const u = ln({
        impact: r,
        viewport: o,
        destination: d,
        draggables: s
    });
    const p = Sn({
        impact: u,
        draggable: c,
        droppable: d,
        draggables: s,
        viewport: o,
        afterCritical: e.afterCritical
    });
    return Kr({
        impact: u,
        clientSelection: p,
        state: e,
        dimensions: i,
        viewport: o
    });
};

var Zr = e => {
    const t = e.frame;
    K(t, "Expected Droppable to have a frame");
    return t;
};

var eo = ({draggable: e, offset: t, initialWindowScroll: n}) => {
    const r = E(e.client, t);
    const o = A(r, n);
    const i = {
        ...e,
        placeholder: {
            ...e.placeholder,
            client: r
        },
        client: r,
        page: o
    };
    return i;
};

var to = ({additions: e, updatedDroppables: t, viewport: n}) => {
    const r = n.scroll.diff.value;
    return e.map((e => {
        const o = e.descriptor.droppableId;
        const i = t[o];
        const s = Zr(i);
        const a = s.scroll.diff.value;
        const c = Me(r, a);
        const l = eo({
            draggable: e,
            offset: c,
            initialWindowScroll: n.scroll.initial
        });
        return l;
    }));
};

const no = "Processing dynamic changes";

var ro = ({state: e, published: t}) => {
    ye(no);
    const n = t.modified.map((t => {
        const n = e.dimensions.droppables[t.droppableId];
        const r = nr(n, t.scroll);
        return r;
    }));
    const r = {
        ...e.dimensions.droppables,
        ...Ae(n)
    };
    const o = Se(to({
        additions: t.additions,
        updatedDroppables: r,
        viewport: e.viewport
    }));
    const i = {
        ...e.dimensions.draggables,
        ...o
    };
    t.removals.forEach((e => {
        delete i[e];
    }));
    const s = {
        droppables: r,
        draggables: i
    };
    const a = Ie(e.impact);
    const c = a ? s.droppables[a] : null;
    const l = s.draggables[e.critical.draggable.id];
    const d = s.droppables[e.critical.droppable.id];
    const {impact: u, afterCritical: p} = ir({
        draggable: l,
        home: d,
        draggables: i,
        viewport: e.viewport
    });
    const g = c && c.isCombineEnabled ? e.impact : u;
    const f = Yr({
        pageOffset: e.current.page.offset,
        draggable: s.draggables[e.critical.draggable.id],
        draggables: s.draggables,
        droppables: s.droppables,
        previousImpact: g,
        viewport: e.viewport,
        afterCritical: p
    });
    De(no);
    const m = {
        ...e,
        phase: "DRAGGING",
        impact: f,
        onLiftImpact: u,
        dimensions: s,
        afterCritical: p,
        forceShouldAnimate: false
    };
    if (e.phase === "COLLECTING") {
        return m;
    }
    const b = {
        ...m,
        phase: "DROP_PENDING",
        reason: e.reason,
        isWaiting: false
    };
    return b;
};

const oo = e => e.movementMode === "SNAP";

const io = (e, t, n) => {
    const r = _r(e.dimensions, t);
    if (!oo(e) || n) {
        return Kr({
            state: e,
            dimensions: r
        });
    }
    return Qr({
        state: e,
        dimensions: r
    });
};

function so(e) {
    if (Xn(e) && e.movementMode === "SNAP") {
        return {
            ...e,
            scrollJumpRequest: null
        };
    }
    return e;
}

const ao = {
    phase: "IDLE",
    completed: null,
    shouldFlush: false
};

var co = (e = ao, t) => {
    if (t.type === "FLUSH") {
        return {
            ...ao,
            shouldFlush: true
        };
    }
    if (t.type === "INITIAL_PUBLISH") {
        K(e.phase === "IDLE", "INITIAL_PUBLISH must come after a IDLE phase");
        const {critical: n, clientSelection: r, viewport: o, dimensions: i, movementMode: s} = t.payload;
        const a = i.draggables[n.draggable.id];
        const c = i.droppables[n.droppable.id];
        const l = {
            selection: r,
            borderBoxCenter: a.client.borderBox.center,
            offset: Ge
        };
        const d = {
            client: l,
            page: {
                selection: Me(l.selection, o.scroll.initial),
                borderBoxCenter: Me(l.selection, o.scroll.initial),
                offset: Me(l.selection, o.scroll.diff.value)
            }
        };
        const u = Be(i.droppables).every((e => !e.isFixedOnPage));
        const {impact: p, afterCritical: g} = ir({
            draggable: a,
            home: c,
            draggables: i.draggables,
            viewport: o
        });
        const f = {
            phase: "DRAGGING",
            isDragging: true,
            critical: n,
            movementMode: s,
            dimensions: i,
            initial: d,
            current: d,
            isWindowScrollAllowed: u,
            impact: p,
            afterCritical: g,
            onLiftImpact: p,
            viewport: o,
            scrollJumpRequest: null,
            forceShouldAnimate: null
        };
        return f;
    }
    if (t.type === "COLLECTION_STARTING") {
        if (e.phase === "COLLECTING" || e.phase === "DROP_PENDING") {
            return e;
        }
        K(e.phase === "DRAGGING", `Collection cannot start from phase ${e.phase}`);
        const t = {
            ...e,
            phase: "COLLECTING"
        };
        return t;
    }
    if (t.type === "PUBLISH_WHILE_DRAGGING") {
        K(e.phase === "COLLECTING" || e.phase === "DROP_PENDING", `Unexpected ${t.type} received in phase ${e.phase}`);
        return ro({
            state: e,
            published: t.payload
        });
    }
    if (t.type === "MOVE") {
        if (e.phase === "DROP_PENDING") {
            return e;
        }
        K(sr(e), `${t.type} not permitted in phase ${e.phase}`);
        const {client: n} = t.payload;
        const r = e;
        if ($e(n, r.current.client.selection)) {
            return e;
        }
        return Kr({
            state: r,
            clientSelection: n,
            impact: oo(r) ? r.impact : null
        });
    }
    if (t.type === "UPDATE_DROPPABLE_SCROLL") {
        if (e.phase === "DROP_PENDING") {
            return so(e);
        }
        if (e.phase === "COLLECTING") {
            return so(e);
        }
        K(sr(e), `${t.type} not permitted in phase ${e.phase}`);
        const n = e;
        const {id: r, newScroll: o} = t.payload;
        const i = n.dimensions.droppables[r];
        if (!i) {
            return e;
        }
        const s = nr(i, o);
        return io(n, s, false);
    }
    if (t.type === "UPDATE_DROPPABLE_IS_ENABLED") {
        if (e.phase === "DROP_PENDING") {
            return e;
        }
        K(sr(e), `Attempting to move in an unsupported phase ${e.phase}`);
        const n = e;
        const {id: r, isEnabled: o} = t.payload;
        const i = n.dimensions.droppables[r];
        K(i, `Cannot find Droppable[id: ${r}] to toggle its enabled state`);
        K(i.isEnabled !== o, `Trying to set droppable isEnabled to ${String(o)}\n      but it is already ${String(i.isEnabled)}`);
        const s = {
            ...i,
            isEnabled: o
        };
        return io(n, s, true);
    }
    if (t.type === "UPDATE_DROPPABLE_IS_COMBINE_ENABLED") {
        if (e.phase === "DROP_PENDING") {
            return e;
        }
        K(sr(e), `Attempting to move in an unsupported phase ${e.phase}`);
        const n = e;
        const {id: r, isCombineEnabled: o} = t.payload;
        const i = n.dimensions.droppables[r];
        K(i, `Cannot find Droppable[id: ${r}] to toggle its isCombineEnabled state`);
        const s = i;
        K(s.isCombineEnabled !== o, `Trying to set droppable isCombineEnabled to ${String(o)}\n      but it is already ${String(s.isCombineEnabled)}`);
        const a = {
            ...s,
            isCombineEnabled: o
        };
        return io(n, a, true);
    }
    if (t.type === "MOVE_BY_WINDOW_SCROLL") {
        if (e.phase === "DROP_PENDING" || e.phase === "DROP_ANIMATING") {
            return e;
        }
        K(sr(e), `Cannot move by window in phase ${e.phase}`);
        const n = e;
        K(n.isWindowScrollAllowed, "Window scrolling is currently not supported for fixed lists");
        const r = t.payload.newScroll;
        if ($e(n.viewport.scroll.current, r)) {
            return so(e);
        }
        const o = wr(n.viewport, r);
        if (oo(n)) {
            return Qr({
                state: n,
                viewport: o
            });
        }
        return Kr({
            state: n,
            viewport: o
        });
    }
    if (t.type === "UPDATE_VIEWPORT_MAX_SCROLL") {
        if (!sr(e)) {
            return e;
        }
        const n = e;
        const r = t.payload.maxScroll;
        if ($e(r, n.viewport.scroll.max)) {
            return e;
        }
        const o = {
            ...n.viewport,
            scroll: {
                ...n.viewport.scroll,
                max: r
            }
        };
        return {
            ...n,
            viewport: o
        };
    }
    if (t.type === "MOVE_UP" || t.type === "MOVE_DOWN" || t.type === "MOVE_LEFT" || t.type === "MOVE_RIGHT") {
        if (e.phase === "COLLECTING" || e.phase === "DROP_PENDING") {
            return e;
        }
        K(e.phase === "DRAGGING", `${t.type} received while not in DRAGGING phase`);
        const n = Gr({
            state: e,
            type: t.type
        });
        if (!n) {
            return e;
        }
        return Kr({
            state: e,
            impact: n.impact,
            clientSelection: n.clientSelection,
            scrollJumpRequest: n.scrollJumpRequest
        });
    }
    if (t.type === "DROP_PENDING") {
        const n = t.payload.reason;
        K(e.phase === "COLLECTING", "Can only move into the DROP_PENDING phase from the COLLECTING phase");
        const r = {
            ...e,
            phase: "DROP_PENDING",
            isWaiting: true,
            reason: n
        };
        return r;
    }
    if (t.type === "DROP_ANIMATE") {
        const {completed: n, dropDuration: r, newHomeClientOffset: o} = t.payload;
        K(e.phase === "DRAGGING" || e.phase === "DROP_PENDING", `Cannot animate drop from phase ${e.phase}`);
        const i = {
            phase: "DROP_ANIMATING",
            completed: n,
            dropDuration: r,
            newHomeClientOffset: o,
            dimensions: e.dimensions
        };
        return i;
    }
    if (t.type === "DROP_COMPLETE") {
        const {completed: e} = t.payload;
        return {
            phase: "IDLE",
            completed: e,
            shouldFlush: false
        };
    }
    return e;
};

const lo = y;

var uo = ({dimensionMarshal: e, focusMarshal: t, styleMarshal: n, getResponders: r, announce: o, autoScroller: i}) => h(co, lo(v(Jn(n), It(e), Rn(e), Nn, xt, Et, On, Dt(i), Yn, Pn(t), Wn(r, o))));

var po = () => {
    const e = document.documentElement;
    K(e, "Cannot find document.documentElement");
    return e;
};

var go = ({scrollHeight: e, scrollWidth: t, height: n, width: r}) => {
    const o = _e({
        x: t,
        y: e
    }, {
        x: r,
        y: n
    });
    const i = {
        x: Math.max(0, o.x),
        y: Math.max(0, o.y)
    };
    return i;
};

var fo = () => {
    const e = po();
    const t = go({
        scrollHeight: e.scrollHeight,
        scrollWidth: e.scrollWidth,
        width: e.clientWidth,
        height: e.clientHeight
    });
    return t;
};

var mo = () => {
    const e = jn();
    const t = fo();
    const n = e.y;
    const r = e.x;
    const o = po();
    const i = o.clientWidth;
    const s = o.clientHeight;
    const a = r + i;
    const c = n + s;
    const l = C({
        top: n,
        left: r,
        right: a,
        bottom: c
    });
    const d = {
        frame: l,
        scroll: {
            initial: e,
            current: e,
            max: t,
            diff: {
                value: Ge,
                displacement: Ge
            }
        }
    };
    return d;
};

var bo = ({critical: e, scrollOptions: t, registry: n}) => {
    const r = mo();
    const o = r.scroll.current;
    const i = e.droppable;
    const s = n.droppable.getAllByType(i.type).map((e => e.callbacks.getDimensionAndWatchScroll(o, t)));
    const a = n.draggable.getAllByType(e.draggable.type).map((e => e.getDimension(o)));
    const c = {
        draggables: Se(a),
        droppables: Ae(s)
    };
    const l = {
        dimensions: c,
        critical: e,
        viewport: r
    };
    return l;
};

const ho = () => ({
    additions: {},
    removals: {},
    modified: {}
});

function vo({registry: e, callbacks: t}) {
    let n = ho();
    let r = null;
    const o = () => {
        if (r) {
            return;
        }
        t.collectionStarting();
        r = requestAnimationFrame((() => {
            r = null;
            const {additions: o, removals: i, modified: s} = n;
            const a = Object.keys(o).map((t => e.draggable.getById(t).getDimension(Ge))).sort(((e, t) => e.descriptor.index - t.descriptor.index));
            const c = Object.keys(s).map((t => {
                const n = e.droppable.getById(t);
                const r = n.callbacks.getScrollWhileDragging();
                return {
                    droppableId: t,
                    scroll: r
                };
            }));
            const l = {
                additions: a,
                removals: Object.keys(i),
                modified: c
            };
            n = ho();
            t.publish(l);
        }));
    };
    const i = e => {
        const t = e.descriptor.id;
        n.additions[t] = e;
        n.modified[e.descriptor.droppableId] = true;
        if (n.removals[t]) {
            delete n.removals[t];
        }
        o();
    };
    const s = e => {
        const t = e.descriptor;
        n.removals[t.id] = true;
        n.modified[t.droppableId] = true;
        if (n.additions[t.id]) {
            delete n.additions[t.id];
        }
        o();
    };
    const a = () => {
        if (!r) {
            return;
        }
        cancelAnimationFrame(r);
        r = null;
        n = ho();
    };
    return {
        add: i,
        remove: s,
        stop: a
    };
}

function yo(e, t, n) {
    if (n.descriptor.id === t.id) {
        return false;
    }
    if (n.descriptor.type !== t.type) {
        return false;
    }
    const r = e.droppable.getById(n.descriptor.droppableId);
    if (r.descriptor.mode !== "virtual") {
        z(`\n      You are attempting to add or remove a Draggable [id: ${n.descriptor.id}]\n      while a drag is occurring. This is only supported for virtual lists.\n\n      See https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/virtual-lists.md\n    `);
        return false;
    }
    return true;
}

var Do = (e, t) => {
    let n = null;
    const r = vo({
        callbacks: {
            publish: t.publishWhileDragging,
            collectionStarting: t.collectionStarting
        },
        registry: e
    });
    const o = (r, o) => {
        K(e.droppable.exists(r), `Cannot update is enabled flag of Droppable ${r} as it is not registered`);
        if (!n) {
            return;
        }
        t.updateDroppableIsEnabled({
            id: r,
            isEnabled: o
        });
    };
    const i = (r, o) => {
        if (!n) {
            return;
        }
        K(e.droppable.exists(r), `Cannot update isCombineEnabled flag of Droppable ${r} as it is not registered`);
        t.updateDroppableIsCombineEnabled({
            id: r,
            isCombineEnabled: o
        });
    };
    const s = (r, o) => {
        if (!n) {
            return;
        }
        K(e.droppable.exists(r), `Cannot update the scroll on Droppable ${r} as it is not registered`);
        t.updateDroppableScroll({
            id: r,
            newScroll: o
        });
    };
    const a = (t, r) => {
        if (!n) {
            return;
        }
        e.droppable.getById(t).callbacks.scroll(r);
    };
    const c = () => {
        if (!n) {
            return;
        }
        r.stop();
        const t = n.critical.droppable;
        e.droppable.getAllByType(t.type).forEach((e => e.callbacks.dragStopped()));
        n.unsubscribe();
        n = null;
    };
    const l = t => {
        K(n, "Should only be subscribed when a collection is occurring");
        const o = n.critical.draggable;
        if (t.type === "ADDITION") {
            if (yo(e, o, t.value)) {
                r.add(t.value);
            }
        }
        if (t.type === "REMOVAL") {
            if (yo(e, o, t.value)) {
                r.remove(t.value);
            }
        }
    };
    const d = t => {
        K(!n, "Cannot start capturing critical dimensions as there is already a collection");
        const r = e.draggable.getById(t.draggableId);
        const o = e.droppable.getById(r.descriptor.droppableId);
        const i = {
            draggable: r.descriptor,
            droppable: o.descriptor
        };
        const s = e.subscribe(l);
        n = {
            critical: i,
            unsubscribe: s
        };
        return bo({
            critical: i,
            registry: e,
            scrollOptions: t.scrollOptions
        });
    };
    const u = {
        updateDroppableIsEnabled: o,
        updateDroppableIsCombineEnabled: i,
        scrollDroppable: a,
        updateDroppableScroll: s,
        startPublishing: d,
        stopPublishing: c
    };
    return u;
};

function Io() {
    const e = {
        draggables: {},
        droppables: {}
    };
    const t = [];
    function n(e) {
        t.push(e);
        return function n() {
            const r = t.indexOf(e);
            if (r === -1) {
                return;
            }
            t.splice(r, 1);
        };
    }
    function r(e) {
        if (t.length) {
            t.forEach((t => t(e)));
        }
    }
    function o(t) {
        return e.draggables[t] || null;
    }
    function i(e) {
        const t = o(e);
        K(t, `Cannot find draggable entry with id [${e}]`);
        return t;
    }
    const s = {
        register: t => {
            e.draggables[t.descriptor.id] = t;
            r({
                type: "ADDITION",
                value: t
            });
        },
        update: (t, n) => {
            const r = e.draggables[n.descriptor.id];
            if (!r) {
                return;
            }
            if (r.uniqueId !== t.uniqueId) {
                return;
            }
            delete e.draggables[n.descriptor.id];
            e.draggables[t.descriptor.id] = t;
        },
        unregister: t => {
            const n = t.descriptor.id;
            const i = o(n);
            if (!i) {
                return;
            }
            if (t.uniqueId !== i.uniqueId) {
                return;
            }
            delete e.draggables[n];
            r({
                type: "REMOVAL",
                value: t
            });
        },
        getById: i,
        findById: o,
        exists: e => Boolean(o(e)),
        getAllByType: t => xe(e.draggables).filter((e => e.descriptor.type === t))
    };
    function a(t) {
        return e.droppables[t] || null;
    }
    function c(e) {
        const t = a(e);
        K(t, `Cannot find droppable entry with id [${e}]`);
        return t;
    }
    const l = {
        register: t => {
            e.droppables[t.descriptor.id] = t;
        },
        unregister: t => {
            const n = a(t.descriptor.id);
            if (!n) {
                return;
            }
            if (t.uniqueId !== n.uniqueId) {
                return;
            }
            delete e.droppables[t.descriptor.id];
        },
        getById: c,
        findById: a,
        exists: e => Boolean(a(e)),
        getAllByType: t => xe(e.droppables).filter((e => e.descriptor.type === t))
    };
    function d() {
        e.draggables = {};
        e.droppables = {};
        t.length = 0;
    }
    return {
        draggable: s,
        droppable: l,
        subscribe: n,
        clean: d
    };
}

function xo() {
    const e = g(Io, []);
    t((() => function t() {
        requestAnimationFrame(e.clean);
    }), [ e ]);
    return e;
}

var Co = e.createContext(null);

var wo = e.createContext(null);

var Eo = () => {
    const e = document.body;
    K(e, "Cannot find document.body");
    return e;
};

const Ao = {
    position: "absolute",
    width: "1px",
    height: "1px",
    margin: "-1px",
    border: "0",
    padding: "0",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    "clip-path": "inset(100%)"
};

var So = Ao;

const Bo = e => `rbd-announcement-${e}`;

function No(e) {
    const r = g((() => Bo(e)), [ e ]);
    const o = n(null);
    t((function e() {
        const t = document.createElement("div");
        o.current = t;
        t.id = r;
        t.setAttribute("aria-live", "assertive");
        t.setAttribute("aria-atomic", "true");
        Object.assign(t.style, So);
        Eo().appendChild(t);
        return function e() {
            setTimeout((function e() {
                const n = Eo();
                if (n.contains(t)) {
                    n.removeChild(t);
                }
                if (t === o.current) {
                    o.current = null;
                }
            }));
        };
    }), [ r ]);
    const i = f((e => {
        const t = o.current;
        if (t) {
            t.textContent = e;
            return;
        }
        z(`\n      A screen reader message was trying to be announced but it was unable to do so.\n      This can occur if you unmount your <DragDropContext /> in your onDragEnd.\n      Consider calling provided.announce() before the unmount so that the instruction will\n      not be lost for users relying on a screen reader.\n\n      Message not passed to screen reader:\n\n      "${e}"\n    `);
    }), []);
    return i;
}

const Po = "data-rbd";

const Ro = (() => {
    const e = `${Po}-drag-handle`;
    return {
        base: e,
        draggableId: `${e}-draggable-id`,
        contextId: `${e}-context-id`
    };
})();

const Oo = (() => {
    const e = `${Po}-draggable`;
    return {
        base: e,
        contextId: `${e}-context-id`,
        id: `${e}-id`
    };
})();

const To = (() => {
    const e = `${Po}-droppable`;
    return {
        base: e,
        contextId: `${e}-context-id`,
        id: `${e}-id`
    };
})();

const Lo = {
    contextId: `${Po}-scroll-container-context-id`
};

var Go = e => e && e.ownerDocument ? e.ownerDocument.defaultView : window;

function Mo(e) {
    return e instanceof Go(e).HTMLElement;
}

function _o(e, t) {
    const n = `[${Ro.contextId}="${e}"]`;
    const r = Ee(document.querySelectorAll(n));
    if (!r.length) {
        z(`Unable to find any drag handles in the context "${e}"`);
        return null;
    }
    const o = we(r, (e => e.getAttribute(Ro.draggableId) === t));
    if (!o) {
        z(`Unable to find drag handle with id "${t}" as no handle with a matching id was found`);
        return null;
    }
    if (!Mo(o)) {
        z("drag handle needs to be a HTMLElement");
        return null;
    }
    return o;
}

const $o = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? r : t;

var Fo = $o;

function ko(e) {
    const t = n({});
    const r = n(null);
    const o = n(null);
    const i = n(false);
    const s = f((function e(n, r) {
        const o = {
            id: n,
            focus: r
        };
        t.current[n] = o;
        return function e() {
            const r = t.current;
            const i = r[n];
            if (i !== o) {
                delete r[n];
            }
        };
    }), []);
    const a = f((function t(n) {
        const r = _o(e, n);
        if (r && r !== document.activeElement) {
            r.focus();
        }
    }), [ e ]);
    const c = f((function e(t, n) {
        if (r.current === t) {
            r.current = n;
        }
    }), []);
    const l = f((function e() {
        if (o.current) {
            return;
        }
        if (!i.current) {
            return;
        }
        o.current = requestAnimationFrame((() => {
            o.current = null;
            const e = r.current;
            if (e) {
                a(e);
            }
        }));
    }), [ a ]);
    const d = f((function e(t) {
        r.current = null;
        const n = document.activeElement;
        if (!n) {
            return;
        }
        if (n.getAttribute(Ro.draggableId) !== t) {
            return;
        }
        r.current = t;
    }), []);
    Fo((() => {
        i.current = true;
        return function e() {
            i.current = false;
            const t = o.current;
            if (t) {
                cancelAnimationFrame(t);
            }
        };
    }), []);
    const u = g((() => ({
        register: s,
        tryRecordFocus: d,
        tryRestoreFocusRecorded: l,
        tryShiftRecord: c
    })), [ s, d, l, c ]);
    return u;
}

function Uo({contextId: e, uniqueId: t}) {
    return `rbd-hidden-text-${e}-${t}`;
}

function Wo({contextId: e, text: n}) {
    const r = V("hidden-text", {
        separator: "-"
    });
    const o = g((() => Uo({
        contextId: e,
        uniqueId: r
    })), [ r, e ]);
    t((function e() {
        const t = document.createElement("div");
        t.id = o;
        t.textContent = n;
        t.style.display = "none";
        Eo().appendChild(t);
        return function e() {
            const n = Eo();
            if (n.contains(t)) {
                n.removeChild(t);
            }
        };
    }), [ o, n ]);
    return o;
}

function Ho(e) {
    const r = n(e);
    t((() => {
        r.current = e;
    }));
    return r;
}

var jo = e => C(e.getBoundingClientRect()).center;

function Vo(e, t) {
    const n = `[${Oo.contextId}="${e}"]`;
    const r = Ee(document.querySelectorAll(n));
    const o = we(r, (e => e.getAttribute(Oo.id) === t));
    if (!o) {
        return null;
    }
    if (!Mo(o)) {
        z("Draggable element is not a HTMLElement");
        return null;
    }
    return o;
}

function qo(e) {
    return e instanceof Go(e).Element;
}

const zo = (() => {
    const e = "matches";
    if (typeof document === "undefined") {
        return e;
    }
    const t = [ e, "msMatchesSelector", "webkitMatchesSelector" ];
    const n = we(t, (e => e in Element.prototype));
    return n ?? e;
})();

function Yo(e, t) {
    if (!e) {
        return null;
    }
    const n = e[zo];
    if (n(t)) {
        return e;
    }
    return Yo(e.parentElement, t);
}

function Jo(e, t) {
    if (e.closest) {
        return e.closest(t);
    }
    return Yo(e, t);
}

function Xo(e) {
    return `[${Ro.contextId}="${e}"]`;
}

function Ko(e, t) {
    const n = t.target;
    if (!qo(n)) {
        z("event.target must be a Element");
        return null;
    }
    const r = n;
    const o = Xo(e);
    const i = Jo(r, o);
    if (!i) {
        return null;
    }
    if (!Mo(i)) {
        z("drag handle must be a HTMLElement");
        return null;
    }
    return i;
}

function Qo(e, t) {
    const n = Ko(e, t);
    if (!n) {
        return null;
    }
    return n.getAttribute(Ro.draggableId);
}

const Zo = {
    input: true,
    button: true,
    textarea: true,
    select: true,
    option: true,
    optgroup: true,
    video: true,
    audio: true
};

function ei(e, t) {
    if (!t) {
        return false;
    }
    const n = Boolean(Zo[t.tagName.toLowerCase()]);
    if (n) {
        return true;
    }
    const r = t.getAttribute("contenteditable");
    if (r === "true" || r === "") {
        return true;
    }
    if (t === e) {
        return false;
    }
    return ei(e, t.parentElement);
}

function ti(e, t) {
    const n = t.target;
    if (!Mo(n)) {
        return false;
    }
    return ei(e, n);
}

function ni() {
    let e = null;
    function t() {
        return Boolean(e);
    }
    function n(t) {
        return t === e;
    }
    function r(t) {
        K(!e, "Cannot claim lock as it is already claimed");
        const n = {
            abandon: t
        };
        e = n;
        return n;
    }
    function o() {
        K(e, "Cannot release lock when there is no lock");
        e = null;
    }
    function i() {
        if (e) {
            e.abandon();
            o();
        }
    }
    return {
        isClaimed: t,
        isActive: n,
        claim: r,
        release: o,
        tryAbandon: i
    };
}

const ri = 9;

const oi = 13;

const ii = 27;

const si = 32;

const ai = 33;

const ci = 34;

const li = 35;

const di = 36;

const ui = 37;

const pi = 38;

const gi = 39;

const fi = 40;

const mi = {
    [oi]: true,
    [ri]: true
};

var bi = e => {
    if (mi[e.keyCode]) {
        e.preventDefault();
    }
};

const hi = (() => {
    const e = "visibilitychange";
    if (typeof document === "undefined") {
        return e;
    }
    const t = [ e, `ms${e}`, `webkit${e}`, `moz${e}`, `o${e}` ];
    const n = we(t, (e => `on${e}` in document));
    return n || e;
})();

const vi = 0;

const yi = 5;

function Di(e, t) {
    return Math.abs(t.x - e.x) >= yi || Math.abs(t.y - e.y) >= yi;
}

const Ii = {
    type: "IDLE"
};

function xi({cancel: e, completed: t, getPhase: n, setPhase: r}) {
    return [ {
        eventName: "mousemove",
        fn: e => {
            const {button: t, clientX: o, clientY: i} = e;
            if (t !== vi) {
                return;
            }
            const s = {
                x: o,
                y: i
            };
            const a = n();
            if (a.type === "DRAGGING") {
                e.preventDefault();
                a.actions.move(s);
                return;
            }
            K(a.type === "PENDING", "Cannot be IDLE");
            const c = a.point;
            if (!Di(c, s)) {
                return;
            }
            e.preventDefault();
            const l = a.actions.fluidLift(s);
            r({
                type: "DRAGGING",
                actions: l
            });
        }
    }, {
        eventName: "mouseup",
        fn: r => {
            const o = n();
            if (o.type !== "DRAGGING") {
                e();
                return;
            }
            r.preventDefault();
            o.actions.drop({
                shouldBlockNextClick: true
            });
            t();
        }
    }, {
        eventName: "mousedown",
        fn: t => {
            if (n().type === "DRAGGING") {
                t.preventDefault();
            }
            e();
        }
    }, {
        eventName: "keydown",
        fn: t => {
            const r = n();
            if (r.type === "PENDING") {
                e();
                return;
            }
            if (t.keyCode === ii) {
                t.preventDefault();
                e();
                return;
            }
            bi(t);
        }
    }, {
        eventName: "resize",
        fn: e
    }, {
        eventName: "scroll",
        options: {
            passive: true,
            capture: false
        },
        fn: () => {
            if (n().type === "PENDING") {
                e();
            }
        }
    }, {
        eventName: "webkitmouseforcedown",
        fn: t => {
            const r = n();
            K(r.type !== "IDLE", "Unexpected phase");
            if (r.actions.shouldRespectForcePress()) {
                e();
                return;
            }
            t.preventDefault();
        }
    }, {
        eventName: hi,
        fn: e
    } ];
}

function Ci(e) {
    const t = n(Ii);
    const r = n(Hn);
    const o = g((() => ({
        eventName: "mousedown",
        fn: function t(n) {
            if (n.defaultPrevented) {
                return;
            }
            if (n.button !== vi) {
                return;
            }
            if (n.ctrlKey || n.metaKey || n.shiftKey || n.altKey) {
                return;
            }
            const o = e.findClosestDraggableId(n);
            if (!o) {
                return;
            }
            const i = e.tryGetLock(o, a, {
                sourceEvent: n
            });
            if (!i) {
                return;
            }
            const s = {
                x: n.clientX,
                y: n.clientY
            };
            r.current();
            d(i, s);
        }
    })), [ e ]);
    const i = g((() => ({
        eventName: "webkitmouseforcewillbegin",
        fn: t => {
            if (t.defaultPrevented) {
                return;
            }
            const n = e.findClosestDraggableId(t);
            if (!n) {
                return;
            }
            const r = e.findOptionsForDraggable(n);
            if (!r) {
                return;
            }
            if (r.shouldRespectForcePress) {
                return;
            }
            if (!e.canGetLock(n)) {
                return;
            }
            t.preventDefault();
        }
    })), [ e ]);
    const s = f((function e() {
        const t = {
            passive: false,
            capture: true
        };
        r.current = wt(window, [ i, o ], t);
    }), [ i, o ]);
    const a = f((() => {
        const e = t.current;
        if (e.type === "IDLE") {
            return;
        }
        t.current = Ii;
        r.current();
        s();
    }), [ s ]);
    const c = f((() => {
        const e = t.current;
        a();
        if (e.type === "DRAGGING") {
            e.actions.cancel({
                shouldBlockNextClick: true
            });
        }
        if (e.type === "PENDING") {
            e.actions.abort();
        }
    }), [ a ]);
    const l = f((function e() {
        const n = {
            capture: true,
            passive: false
        };
        const o = xi({
            cancel: c,
            completed: a,
            getPhase: () => t.current,
            setPhase: e => {
                t.current = e;
            }
        });
        r.current = wt(window, o, n);
    }), [ c, a ]);
    const d = f((function e(n, r) {
        K(t.current.type === "IDLE", "Expected to move from IDLE to PENDING drag");
        t.current = {
            type: "PENDING",
            point: r,
            actions: n
        };
        l();
    }), [ l ]);
    Fo((function e() {
        s();
        return function e() {
            r.current();
        };
    }), [ s ]);
}

const wi = {
    type: "IDLE"
};

const Ei = 120;

const Ai = .15;

function Si({cancel: e, getPhase: t}) {
    return [ {
        eventName: "orientationchange",
        fn: e
    }, {
        eventName: "resize",
        fn: e
    }, {
        eventName: "contextmenu",
        fn: e => {
            e.preventDefault();
        }
    }, {
        eventName: "keydown",
        fn: n => {
            if (t().type !== "DRAGGING") {
                e();
                return;
            }
            if (n.keyCode === ii) {
                n.preventDefault();
            }
            e();
        }
    }, {
        eventName: hi,
        fn: e
    } ];
}

function Bi({cancel: e, completed: t, getPhase: n}) {
    return [ {
        eventName: "touchmove",
        options: {
            capture: false
        },
        fn: t => {
            const r = n();
            if (r.type !== "DRAGGING") {
                e();
                return;
            }
            r.hasMoved = true;
            const {clientX: o, clientY: i} = t.touches[0];
            const s = {
                x: o,
                y: i
            };
            t.preventDefault();
            r.actions.move(s);
        }
    }, {
        eventName: "touchend",
        fn: r => {
            const o = n();
            if (o.type !== "DRAGGING") {
                e();
                return;
            }
            r.preventDefault();
            o.actions.drop({
                shouldBlockNextClick: true
            });
            t();
        }
    }, {
        eventName: "touchcancel",
        fn: t => {
            if (n().type !== "DRAGGING") {
                e();
                return;
            }
            t.preventDefault();
            e();
        }
    }, {
        eventName: "touchforcechange",
        fn: t => {
            const r = n();
            K(r.type !== "IDLE");
            const o = t.touches[0];
            if (!o) {
                return;
            }
            const i = o.force >= Ai;
            if (!i) {
                return;
            }
            const s = r.actions.shouldRespectForcePress();
            if (r.type === "PENDING") {
                if (s) {
                    e();
                }
                return;
            }
            if (s) {
                if (r.hasMoved) {
                    t.preventDefault();
                    return;
                }
                e();
                return;
            }
            t.preventDefault();
        }
    }, {
        eventName: hi,
        fn: e
    } ];
}

function Ni(e) {
    const t = n(wi);
    const r = n(Hn);
    const o = f((function e() {
        return t.current;
    }), []);
    const i = f((function e(n) {
        t.current = n;
    }), []);
    const s = g((() => ({
        eventName: "touchstart",
        fn: function t(n) {
            if (n.defaultPrevented) {
                return;
            }
            const o = e.findClosestDraggableId(n);
            if (!o) {
                return;
            }
            const i = e.tryGetLock(o, c, {
                sourceEvent: n
            });
            if (!i) {
                return;
            }
            const s = n.touches[0];
            const {clientX: a, clientY: l} = s;
            const d = {
                x: a,
                y: l
            };
            r.current();
            p(i, d);
        }
    })), [ e ]);
    const a = f((function e() {
        const t = {
            capture: true,
            passive: false
        };
        r.current = wt(window, [ s ], t);
    }), [ s ]);
    const c = f((() => {
        const e = t.current;
        if (e.type === "IDLE") {
            return;
        }
        if (e.type === "PENDING") {
            clearTimeout(e.longPressTimerId);
        }
        i(wi);
        r.current();
        a();
    }), [ a, i ]);
    const l = f((() => {
        const e = t.current;
        c();
        if (e.type === "DRAGGING") {
            e.actions.cancel({
                shouldBlockNextClick: true
            });
        }
        if (e.type === "PENDING") {
            e.actions.abort();
        }
    }), [ c ]);
    const d = f((function e() {
        const t = {
            capture: true,
            passive: false
        };
        const n = {
            cancel: l,
            completed: c,
            getPhase: o
        };
        const i = wt(window, Bi(n), t);
        const s = wt(window, Si(n), t);
        r.current = function e() {
            i();
            s();
        };
    }), [ l, o, c ]);
    const u = f((function e() {
        const t = o();
        K(t.type === "PENDING", `Cannot start dragging from phase ${t.type}`);
        const n = t.actions.fluidLift(t.point);
        i({
            type: "DRAGGING",
            actions: n,
            hasMoved: false
        });
    }), [ o, i ]);
    const p = f((function e(t, n) {
        K(o().type === "IDLE", "Expected to move from IDLE to PENDING drag");
        const r = window.setTimeout(u, Ei);
        i({
            type: "PENDING",
            point: n,
            actions: t,
            longPressTimerId: r
        });
        d();
    }), [ d, o, i, u ]);
    Fo((function e() {
        a();
        return function e() {
            r.current();
            const t = o();
            if (t.type === "PENDING") {
                clearTimeout(t.longPressTimerId);
                i(wi);
            }
        };
    }), [ o, a, i ]);
    Fo((function e() {
        const t = wt(window, [ {
            eventName: "touchmove",
            fn: () => {},
            options: {
                capture: false,
                passive: false
            }
        } ]);
        return t;
    }), []);
}

function Pi(e) {
    e.preventDefault();
}

function Ri({expected: e, phase: t, isLockActive: n, shouldWarn: r}) {
    if (!n()) {
        if (r) {
            z(`\n        Cannot perform action.\n        The sensor no longer has an action lock.\n\n        Tips:\n\n        - Throw away your action handlers when forceStop() is called\n        - Check actions.isActive() if you really need to\n      `);
        }
        return false;
    }
    if (e !== t) {
        if (r) {
            z(`\n        Cannot perform action.\n        The actions you used belong to an outdated phase\n\n        Current phase: ${e}\n        You called an action from outdated phase: ${t}\n\n        Tips:\n\n        - Do not use preDragActions actions after calling preDragActions.lift()\n      `);
        }
        return false;
    }
    return true;
}

function Oi({lockAPI: e, store: t, registry: n, draggableId: r}) {
    if (e.isClaimed()) {
        return false;
    }
    const o = n.draggable.findById(r);
    if (!o) {
        z(`Unable to find draggable with id: ${r}`);
        return false;
    }
    if (!o.options.isEnabled) {
        return false;
    }
    if (!vt(t.getState(), r)) {
        return false;
    }
    return true;
}

function Ti({lockAPI: e, contextId: t, store: n, registry: r, draggableId: o, forceSensorStop: i, sourceEvent: s}) {
    const a = Oi({
        lockAPI: e,
        store: n,
        registry: r,
        draggableId: o
    });
    if (!a) {
        return null;
    }
    const c = r.draggable.getById(o);
    const l = Vo(t, c.descriptor.id);
    if (!l) {
        z(`Unable to find draggable element with id: ${o}`);
        return null;
    }
    if (s && !c.options.canDragInteractiveElements && ti(l, s)) {
        return null;
    }
    const d = e.claim(i || Hn);
    let u = "PRE_DRAG";
    function p() {
        return c.options.shouldRespectForcePress;
    }
    function g() {
        return e.isActive(d);
    }
    function f(e, t) {
        if (Ri({
            expected: e,
            phase: u,
            isLockActive: g,
            shouldWarn: true
        })) {
            n.dispatch(t());
        }
    }
    const m = f.bind(null, "DRAGGING");
    function b(t) {
        function r() {
            e.release();
            u = "COMPLETED";
        }
        if (u !== "PRE_DRAG") {
            r();
            K(u === "PRE_DRAG", `Cannot lift in phase ${u}`);
        }
        n.dispatch(Z(t.liftActionArgs));
        u = "DRAGGING";
        function o(e, o = {
            shouldBlockNextClick: false
        }) {
            t.cleanup();
            if (o.shouldBlockNextClick) {
                const e = wt(window, [ {
                    eventName: "click",
                    fn: Pi,
                    options: {
                        once: true,
                        passive: false,
                        capture: true
                    }
                } ]);
                setTimeout(e);
            }
            r();
            n.dispatch(be({
                reason: e
            }));
        }
        return {
            isActive: () => Ri({
                expected: "DRAGGING",
                phase: u,
                isLockActive: g,
                shouldWarn: false
            }),
            shouldRespectForcePress: p,
            drop: e => o("DROP", e),
            cancel: e => o("CANCEL", e),
            ...t.actions
        };
    }
    function h(e) {
        const t = I((e => {
            m((() => se({
                client: e
            })));
        }));
        const n = b({
            liftActionArgs: {
                id: o,
                clientSelection: e,
                movementMode: "FLUID"
            },
            cleanup: () => t.cancel(),
            actions: {
                move: t
            }
        });
        return {
            ...n,
            move: t
        };
    }
    function v() {
        const e = {
            moveUp: () => m(le),
            moveRight: () => m(ue),
            moveDown: () => m(de),
            moveLeft: () => m(pe)
        };
        return b({
            liftActionArgs: {
                id: o,
                clientSelection: jo(l),
                movementMode: "SNAP"
            },
            cleanup: Hn,
            actions: e
        });
    }
    function y() {
        const t = Ri({
            expected: "PRE_DRAG",
            phase: u,
            isLockActive: g,
            shouldWarn: true
        });
        if (t) {
            e.release();
        }
    }
    const D = {
        isActive: () => Ri({
            expected: "PRE_DRAG",
            phase: u,
            isLockActive: g,
            shouldWarn: false
        }),
        shouldRespectForcePress: p,
        fluidLift: h,
        snapLift: v,
        abort: y
    };
    return D;
}

const Li = [ Ci, Ni ];

function Gi({contextId: e, store: t, registry: n, customSensors: r, enableDefaultSensors: i}) {
    const s = [ ...i ? Li : [], ...r || [] ];
    const a = o((() => ni()))[0];
    const c = f((function e(t, n) {
        if (t.isDragging && !n.isDragging) {
            a.tryAbandon();
        }
    }), [ a ]);
    Fo((function e() {
        let n = t.getState();
        const r = t.subscribe((() => {
            const e = t.getState();
            c(n, e);
            n = e;
        }));
        return r;
    }), [ a, t, c ]);
    Fo((() => a.tryAbandon), [ a.tryAbandon ]);
    const l = f((e => Oi({
        lockAPI: a,
        registry: n,
        store: t,
        draggableId: e
    })), [ a, n, t ]);
    const d = f(((r, o, i) => Ti({
        lockAPI: a,
        registry: n,
        contextId: e,
        store: t,
        draggableId: r,
        forceSensorStop: o,
        sourceEvent: i && i.sourceEvent ? i.sourceEvent : null
    })), [ e, a, n, t ]);
    const u = f((t => Qo(e, t)), [ e ]);
    const p = f((e => {
        const t = n.draggable.findById(e);
        return t ? t.options : null;
    }), [ n.draggable ]);
    const m = f((function e() {
        if (!a.isClaimed()) {
            return;
        }
        a.tryAbandon();
        if (t.getState().phase !== "IDLE") {
            t.dispatch(ge());
        }
    }), [ a, t ]);
    const b = f((() => a.isClaimed()), [ a ]);
    const h = g((() => ({
        canGetLock: l,
        tryGetLock: d,
        findClosestDraggableId: u,
        findOptionsForDraggable: p,
        tryReleaseLock: m,
        isLockClaimed: b
    })), [ l, d, u, p, m, b ]);
    for (let e = 0; e < s.length; e++) {
        s[e](h);
    }
}

const Mi = e => t => `[${t}="${e}"]`;

const _i = (e, t) => e.map((e => {
    const n = e.styles[t];
    if (!n) {
        return "";
    }
    return `${e.selector} { ${n} }`;
})).join(" ");

const $i = "pointer-events: none;";

var Fi = e => {
    const t = Mi(e);
    const n = (() => {
        const e = `\n      cursor: -webkit-grab;\n      cursor: grab;\n    `;
        return {
            selector: t(Ro.contextId),
            styles: {
                always: `\n          -webkit-touch-callout: none;\n          -webkit-tap-highlight-color: rgba(0,0,0,0);\n          touch-action: manipulation;\n        `,
                resting: e,
                dragging: $i,
                dropAnimating: e
            }
        };
    })();
    const r = (() => {
        const e = `\n      transition: ${Ot.outOfTheWay};\n    `;
        return {
            selector: t(Oo.contextId),
            styles: {
                dragging: e,
                dropAnimating: e,
                userCancel: e
            }
        };
    })();
    const o = {
        selector: t(To.contextId),
        styles: {
            always: `overflow-anchor: none;`
        }
    };
    const i = {
        selector: "body",
        styles: {
            dragging: `\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        overflow-anchor: none;\n      `
        }
    };
    const s = [ r, n, o, i ];
    return {
        always: _i(s, "always"),
        resting: _i(s, "resting"),
        dragging: _i(s, "dragging"),
        dropAnimating: _i(s, "dropAnimating"),
        userCancel: _i(s, "userCancel")
    };
};

const ki = () => {
    const e = document.querySelector("head");
    K(e, "Cannot find the head to append a style to");
    return e;
};

const Ui = e => {
    const t = document.createElement("style");
    if (e) {
        t.setAttribute("nonce", e);
    }
    t.type = "text/css";
    return t;
};

function Wi(e, t) {
    const r = g((() => Fi(e)), [ e ]);
    const o = n(null);
    const i = n(null);
    const s = f(x((e => {
        const t = i.current;
        K(t, "Cannot set dynamic style element if it is not set");
        t.textContent = e;
    })), []);
    const a = f((e => {
        const t = o.current;
        K(t, "Cannot set dynamic style element if it is not set");
        t.textContent = e;
    }), []);
    Fo((() => {
        K(!o.current && !i.current, "style elements already mounted");
        const n = Ui(t);
        const c = Ui(t);
        o.current = n;
        i.current = c;
        n.setAttribute(`${Po}-always`, e);
        c.setAttribute(`${Po}-dynamic`, e);
        ki().appendChild(n);
        ki().appendChild(c);
        a(r.always);
        s(r.resting);
        return () => {
            const e = e => {
                const t = e.current;
                K(t, "Cannot unmount ref as it is not set");
                ki().removeChild(t);
                e.current = null;
            };
            e(o);
            e(i);
        };
    }), [ t, a, s, r.always, r.resting, e ]);
    const c = f((() => s(r.dragging)), [ s, r.dragging ]);
    const l = f((e => {
        if (e === "DROP") {
            s(r.dropAnimating);
            return;
        }
        s(r.userCancel);
    }), [ s, r.dropAnimating, r.userCancel ]);
    const d = f((() => {
        if (!i.current) {
            return;
        }
        s(r.resting);
    }), [ s, r.resting ]);
    const u = g((() => ({
        dragging: c,
        dropping: l,
        resting: d
    })), [ c, l, d ]);
    return u;
}

var Hi = e => {
    window.scrollBy(e.x, e.y);
};

const ji = e => ({
    onBeforeCapture: e.onBeforeCapture,
    onBeforeDragStart: e.onBeforeDragStart,
    onDragStart: e.onDragStart,
    onDragEnd: e.onDragEnd,
    onDragUpdate: e.onDragUpdate
});

function Vi(e) {
    K(e.current, "Could not find store from lazy ref");
    return e.current;
}

function qi(e) {
    const {contextId: r, setCallbacks: o, sensors: s, nonce: a, dragHandleUsageInstructions: c} = e;
    const l = n(null);
    const d = Ho(e);
    const u = f((() => ji(d.current)), [ d ]);
    const p = No(r);
    const b = Wo({
        contextId: r,
        text: c
    });
    const h = Wi(r, a);
    const v = f((e => Vi(l).dispatch(e)), []);
    const y = g((() => D({
        publishWhileDragging: te,
        updateDroppableScroll: re,
        updateDroppableIsEnabled: oe,
        updateDroppableIsCombineEnabled: ie,
        collectionStarting: ne
    }, v)), [ v ]);
    const I = xo();
    const x = g((() => Do(I, y)), [ I, y ]);
    const C = g((() => ht({
        scrollWindow: Hi,
        scrollDroppable: x.scrollDroppable,
        ...D({
            move: se
        }, v)
    })), [ x.scrollDroppable, v ]);
    const w = ko(r);
    const E = g((() => uo({
        announce: p,
        autoScroller: C,
        dimensionMarshal: x,
        focusMarshal: w,
        getResponders: u,
        styleMarshal: h
    })), [ p, C, x, w, u, h ]);
    l.current = E;
    const A = f((() => {
        const e = Vi(l);
        const t = e.getState();
        if (t.phase !== "IDLE") {
            e.dispatch(ge());
        }
    }), []);
    const S = f((() => {
        const e = Vi(l).getState();
        return e.isDragging || e.phase === "DROP_ANIMATING";
    }), []);
    const B = g((() => ({
        isDragging: S,
        tryAbort: A
    })), [ S, A ]);
    o(B);
    const N = f((e => vt(Vi(l).getState(), e)), []);
    const P = f((() => sr(Vi(l).getState())), []);
    const R = g((() => ({
        marshal: x,
        focus: w,
        contextId: r,
        canLift: N,
        isMovementAllowed: P,
        dragHandleUsageInstructionsId: b,
        registry: I
    })), [ r, x, b, w, N, P, I ]);
    Gi({
        contextId: r,
        store: E,
        registry: I,
        customSensors: s,
        enableDefaultSensors: e.enableDefaultSensors !== false
    });
    t((() => A), [ A ]);
    return i(Co.Provider, {
        value: R
    }, i(m, {
        context: wo,
        store: E
    }, e.children));
}

const zi = s(null);

let Yi = function(e) {
    e[e["DragStart"] = 0] = "DragStart";
    e[e["DragUpdate"] = 1] = "DragUpdate";
    e[e["DragEnd"] = 2] = "DragEnd";
    e[e["BeforeDragStart"] = 3] = "BeforeDragStart";
    e[e["BeforeCapture"] = 4] = "BeforeCapture";
    return e;
}({});

function Ji() {
    return a(zi);
}

const Xi = function(e) {
    const n = Ji();
    t((() => {
        if (n) {
            const t = e.onDragStart && n.registerDragStart(e.onDragStart);
            const r = e.onDragUpdate && n.registerDragUpdate(e.onDragUpdate);
            const o = e.onDragEnd && n.registerDragEnd(e.onDragEnd);
            const i = e.onBeforeDragStart && n.registerBeforeDragStart(e.onBeforeDragStart);
            const s = e.onBeforeCapture && n.registerBeforeCapture(e.onBeforeCapture);
            return () => {
                t?.();
                r?.();
                o?.();
                i?.();
                s?.();
            };
        }
    }), [ n, e ]);
    return i(c, null, e.children);
};

class Ki extends l {
    callbacks=null;
    unbind=Hn;
    componentDidMount() {
        this.unbind = wt(window, [ {
            eventName: "error",
            fn: this.onWindowError
        } ]);
    }
    componentDidCatch(e) {
        if (e instanceof X) {
            this.setState({});
            return;
        }
        throw e;
    }
    componentWillUnmount() {
        this.unbind();
    }
    onWindowError=e => {
        const t = this.getCallbacks();
        if (t.isDragging()) {
            t.tryAbort();
            z(`\n        An error was caught by our window 'error' event listener while a drag was occurring.\n        The active drag has been aborted.\n      `);
        }
        const n = e.error;
        if (n instanceof X) {
            e.preventDefault();
        }
    };
    getCallbacks=() => {
        if (!this.callbacks) {
            throw new Error("Unable to find AppCallbacks in <ErrorBoundary/>");
        }
        return this.callbacks;
    };
    setCallbacks=e => {
        this.callbacks = e;
    };
    render() {
        return this.props.children(this.setCallbacks);
    }
}

let Qi = 0;

function Zi() {
    Qi = 0;
}

function es() {
    return g((() => `${Qi++}`), []);
}

function ts() {
    Zi();
    j();
}

function ns(e) {
    const t = es();
    const r = e.dragHandleUsageInstructions || U.dragHandleUsageInstructions;
    const o = n((() => {
        const e = new Map;
        e.set(Yi.DragStart, []);
        e.set(Yi.DragUpdate, []);
        e.set(Yi.DragEnd, []);
        e.set(Yi.BeforeDragStart, []);
        e.set(Yi.BeforeCapture, []);
        return e;
    })());
    const s = d(((e, t) => {
        const n = o.current.get(e);
        n?.push(t);
        return () => {
            o.current.set(e, o.current.get(e)?.filter((e => t !== e)) || []);
        };
    }), []);
    const a = d(((e, ...t) => {
        o.current.get(e)?.forEach((e => e(...t)));
    }), []);
    const c = u((() => ({
        registerDragEnd: e => s(Yi.DragEnd, e),
        registerDragStart: e => s(Yi.DragStart, e),
        registerDragUpdate: e => s(Yi.DragUpdate, e),
        registerBeforeDragStart: e => s(Yi.BeforeDragStart, e),
        registerBeforeCapture: e => s(Yi.BeforeCapture, e)
    })), [ s ]);
    const l = Ji();
    return !!l ? i(Xi, e, e.children) : i(zi.Provider, {
        value: c
    }, i(Ki, null, (n => i(qi, {
        nonce: e.nonce ?? p(),
        contextId: t,
        setCallbacks: n,
        dragHandleUsageInstructions: r,
        enableDefaultSensors: e.enableDefaultSensors,
        sensors: e.sensors,
        onBeforeCapture: t => {
            e.onBeforeCapture?.(t);
            a(Yi.BeforeCapture, t);
        },
        onBeforeDragStart: t => {
            e.onBeforeDragStart?.(t);
            a(Yi.BeforeDragStart, t);
        },
        onDragStart: (t, n) => {
            e.onDragStart?.(t, n);
            a(Yi.DragStart, t, n);
        },
        onDragUpdate: (t, n) => {
            e.onDragUpdate?.(t, n);
            a(Yi.DragUpdate, t, n);
        },
        onDragEnd: (t, n) => {
            e.onDragEnd(t, n);
            a(Yi.DragEnd, t, n);
        }
    }, e.children))));
}

var rs = e => {
    const {combine: t, destination: n} = e;
    if (n) {
        return n.droppableId;
    }
    if (t) {
        return t.droppableId;
    }
    return null;
};

var os = (e, t) => e === t;

class is extends e.PureComponent {
    state={
        isVisible: Boolean(this.props.on),
        data: this.props.on,
        animate: this.props.shouldAnimate && this.props.on ? "open" : "none"
    };
    static getDerivedStateFromProps(e, t) {
        if (!e.shouldAnimate) {
            return {
                isVisible: Boolean(e.on),
                data: e.on,
                animate: "none"
            };
        }
        if (e.on) {
            return {
                isVisible: true,
                data: e.on,
                animate: "open"
            };
        }
        if (t.isVisible) {
            return {
                isVisible: true,
                data: t.data,
                animate: "close"
            };
        }
        return {
            isVisible: false,
            animate: "close",
            data: null
        };
    }
    onClose=() => {
        if (this.state.animate !== "close") {
            return;
        }
        this.setState({
            isVisible: false
        });
    };
    render() {
        if (!this.state.isVisible) {
            return null;
        }
        const e = {
            onClose: this.onClose,
            data: this.state.data,
            animate: this.state.animate
        };
        return this.props.children(e);
    }
}

var ss = e.createContext(null);

function as(e) {
    const t = a(e);
    K(t, "Could not find required context");
    return t;
}

function cs(e, t, n = Ge) {
    const r = window.getComputedStyle(t);
    const o = t.getBoundingClientRect();
    const i = S(o, r);
    const s = A(i, n);
    const a = {
        client: i,
        tagName: t.tagName.toLowerCase(),
        display: r.display
    };
    const c = {
        x: i.marginBox.width,
        y: i.marginBox.height
    };
    const l = {
        descriptor: e,
        placeholder: a,
        displaceBy: c,
        client: i,
        page: s
    };
    return l;
}

function ls(e) {
    const t = V("draggable");
    const {descriptor: r, registry: o, getDraggableRef: i, canDragInteractiveElements: s, shouldRespectForcePress: a, isEnabled: c} = e;
    const l = g((() => ({
        canDragInteractiveElements: s,
        shouldRespectForcePress: a,
        isEnabled: c
    })), [ s, c, a ]);
    const d = f((e => {
        const t = i();
        K(t, "Cannot get dimension when no ref is set");
        return cs(r, t, e);
    }), [ r, i ]);
    const u = g((() => ({
        uniqueId: t,
        descriptor: r,
        options: l,
        getDimension: d
    })), [ r, d, l, t ]);
    const p = n(u);
    const m = n(true);
    Fo((() => {
        o.draggable.register(p.current);
        return () => o.draggable.unregister(p.current);
    }), [ o.draggable ]);
    Fo((() => {
        if (m.current) {
            m.current = false;
            return;
        }
        const e = p.current;
        p.current = u;
        o.draggable.update(u, e);
    }), [ u, o.draggable ]);
}

const ds = {
    dragging: 5e3,
    dropAnimating: 4500
};

const us = (e, t) => {
    if (t) {
        return Ot.drop(t.duration);
    }
    if (e) {
        return Ot.snap;
    }
    return Ot.fluid;
};

const ps = (e, t) => {
    if (!e) {
        return undefined;
    }
    return t ? Nt.opacity.drop : Nt.opacity.combining;
};

const gs = e => {
    if (e.forceShouldAnimate !== null && e.forceShouldAnimate !== undefined) {
        return e.forceShouldAnimate;
    }
    return e.mode === "SNAP";
};

function fs(e) {
    const t = e.dimension;
    const n = t.client;
    const {offset: r, combineWith: o, dropping: i} = e;
    const s = Boolean(o);
    const a = gs(e);
    const c = Boolean(i);
    const l = c ? Lt.drop(r, s) : Lt.moveTo(r);
    const d = {
        position: "fixed",
        top: n.marginBox.top,
        left: n.marginBox.left,
        boxSizing: "border-box",
        width: n.borderBox.width,
        height: n.borderBox.height,
        transition: us(a, i),
        transform: l,
        opacity: ps(s, c),
        zIndex: c ? ds.dropAnimating : ds.dragging,
        pointerEvents: "none"
    };
    return d;
}

function ms(e) {
    return {
        transform: Lt.moveTo(e.offset),
        transition: e.shouldAnimateDisplacement ? undefined : "none"
    };
}

function bs(e) {
    return e.type === "DRAGGING" ? fs(e) : ms(e);
}

function hs(e) {
    e.preventDefault();
}

function vs(e) {
    const t = n(null);
    const r = f((e => {
        t.current = e;
    }), []);
    const o = f((() => t.current), []);
    const {contextId: i, registry: s} = as(Co);
    const {type: a, droppableId: c} = as(ss);
    const l = g((() => ({
        id: e.draggableId,
        index: e.index,
        type: a,
        droppableId: c
    })), [ e.draggableId, e.index, a, c ]);
    const {children: d, draggableId: u, isEnabled: p, shouldRespectForcePress: m, canDragInteractiveElements: b, isClone: h, mapped: v, dropAnimationFinished: y} = e;
    if (!h) {
        const e = g((() => ({
            descriptor: l,
            registry: s,
            getDraggableRef: o,
            canDragInteractiveElements: b,
            shouldRespectForcePress: m,
            isEnabled: p
        })), [ l, s, o, b, m, p ]);
        ls(e);
    }
    const D = g((() => p ? {
        tabIndex: 0,
        "data-rbd-drag-handle-draggable-id": u,
        "data-rbd-drag-handle-context-id": i,
        draggable: false,
        onDragStart: hs
    } : null), [ i, u, p ]);
    const I = f((e => {
        if (v.type !== "DRAGGING") {
            return;
        }
        if (!v.dropping) {
            return;
        }
        if (e.propertyName !== "transform") {
            return;
        }
        y();
    }), [ y, v ]);
    const x = g((() => {
        const e = bs(v);
        const t = v.type === "DRAGGING" && v.dropping ? I : undefined;
        const n = {
            innerRef: r,
            draggableProps: {
                "data-rbd-draggable-context-id": i,
                "data-rbd-draggable-id": u,
                style: e,
                onTransitionEnd: t
            },
            dragHandleProps: D
        };
        return n;
    }), [ i, D, u, v, I, r ]);
    const C = g((() => ({
        draggableId: l.id,
        type: l.type,
        source: {
            index: l.index,
            droppableId: l.droppableId
        }
    })), [ l.droppableId, l.id, l.index, l.type ]);
    return d(x, v.snapshot, C);
}

const ys = e => e.combine ? e.combine.draggableId : null;

const Ds = e => e.at && e.at.type === "COMBINE" ? e.at.combine.draggableId : null;

function Is() {
    const e = x(((e, t) => ({
        x: e,
        y: t
    })));
    const t = x(((e, t, n, r, o) => ({
        isDragging: true,
        isClone: t,
        isDropAnimating: Boolean(o),
        dropAnimation: o,
        mode: e,
        draggingOver: n,
        combineWith: r,
        combineTargetFor: null
    })));
    const n = x(((e, n, r, o, i, s, a) => ({
        mapped: {
            type: "DRAGGING",
            dropping: null,
            draggingOver: i,
            combineWith: s,
            mode: n,
            offset: e,
            dimension: r,
            forceShouldAnimate: a,
            snapshot: t(n, o, i, s, null)
        }
    })));
    const r = (r, o) => {
        if (r.phase === "DRAGGING") {
            if (r.critical.draggable.id !== o.draggableId) {
                return null;
            }
            const t = r.current.client.offset;
            const i = r.dimensions.draggables[o.draggableId];
            const s = Ie(r.impact);
            const a = Ds(r.impact);
            const c = r.forceShouldAnimate;
            return n(e(t.x, t.y), r.movementMode, i, o.isClone, s, a, c);
        }
        if (r.phase === "DROP_ANIMATING") {
            const e = r.completed;
            if (e.result.draggableId !== o.draggableId) {
                return null;
            }
            const n = o.isClone;
            const i = r.dimensions.draggables[o.draggableId];
            const s = e.result;
            const a = s.mode;
            const c = rs(s);
            const l = ys(s);
            const d = r.dropDuration;
            const u = {
                duration: d,
                curve: Bt.drop,
                moveTo: r.newHomeClientOffset,
                opacity: l ? Nt.opacity.drop : null,
                scale: l ? Nt.scale.drop : null
            };
            return {
                mapped: {
                    type: "DRAGGING",
                    offset: r.newHomeClientOffset,
                    dimension: i,
                    dropping: u,
                    draggingOver: c,
                    combineWith: l,
                    mode: a,
                    forceShouldAnimate: null,
                    snapshot: t(a, n, c, l, u)
                }
            };
        }
        return null;
    };
    return r;
}

function xs(e) {
    return {
        isDragging: false,
        isDropAnimating: false,
        isClone: false,
        dropAnimation: null,
        mode: null,
        draggingOver: null,
        combineTargetFor: e,
        combineWith: null
    };
}

const Cs = {
    mapped: {
        type: "SECONDARY",
        offset: Ge,
        combineTargetFor: null,
        shouldAnimateDisplacement: true,
        snapshot: xs(null)
    }
};

function ws() {
    const e = x(((e, t) => ({
        x: e,
        y: t
    })));
    const t = x(xs);
    const n = x(((e, n = null, r) => ({
        mapped: {
            type: "SECONDARY",
            offset: e,
            combineTargetFor: n,
            shouldAnimateDisplacement: r,
            snapshot: t(n)
        }
    })));
    const r = e => e ? n(Ge, e, true) : null;
    const o = (t, o, i, s) => {
        const a = i.displaced.visible[t];
        const c = Boolean(s.inVirtualList && s.effected[t]);
        const l = St(i);
        const d = l && l.draggableId === t ? o : null;
        if (!a) {
            if (!c) {
                return r(d);
            }
            if (i.displaced.invisible[t]) {
                return null;
            }
            const o = Fe(s.displacedBy.point);
            const a = e(o.x, o.y);
            return n(a, d, true);
        }
        if (c) {
            return r(d);
        }
        const u = i.displacedBy.point;
        const p = e(u.x, u.y);
        return n(p, d, a.shouldAnimate);
    };
    const i = (e, t) => {
        if (e.phase === "DRAGGING") {
            if (e.critical.draggable.id === t.draggableId) {
                return null;
            }
            return o(t.draggableId, e.critical.draggable.id, e.impact, e.afterCritical);
        }
        if (e.phase === "DROP_ANIMATING") {
            const n = e.completed;
            if (n.result.draggableId === t.draggableId) {
                return null;
            }
            return o(t.draggableId, n.result.draggableId, n.impact, n.afterCritical);
        }
        return null;
    };
    return i;
}

const Es = () => {
    const e = Is();
    const t = ws();
    const n = (n, r) => e(n, r) || t(n, r) || Cs;
    return n;
};

const As = {
    dropAnimationFinished: ve
};

const Ss = b(Es, As, null, {
    context: wo,
    areStatePropsEqual: os
})(vs);

function Bs(e) {
    const t = as(ss);
    const n = t.isUsingCloneFor;
    if (n === e.draggableId && !e.isClone) {
        return null;
    }
    return i(Ss, e);
}

function Ns(e) {
    const t = typeof e.isDragDisabled === "boolean" ? !e.isDragDisabled : true;
    const n = Boolean(e.disableInteractiveElementBlocking);
    const r = Boolean(e.shouldRespectForcePress);
    return i(Bs, R({}, e, {
        isClone: false,
        isEnabled: t,
        canDragInteractiveElements: n,
        shouldRespectForcePress: r
    }));
}

function Ps() {}

const Rs = {
    width: 0,
    height: 0,
    margin: zt
};

const Os = ({isAnimatingOpenOnMount: e, placeholder: t, animate: n}) => {
    if (e) {
        return Rs;
    }
    if (n === "close") {
        return Rs;
    }
    return {
        height: t.client.borderBox.height,
        width: t.client.borderBox.width,
        margin: t.client.margin
    };
};

const Ts = ({isAnimatingOpenOnMount: e, placeholder: t, animate: n}) => {
    const r = Os({
        isAnimatingOpenOnMount: e,
        placeholder: t,
        animate: n
    });
    return {
        display: t.display,
        boxSizing: "border-box",
        width: r.width,
        height: r.height,
        marginTop: r.margin.top,
        marginRight: r.margin.right,
        marginBottom: r.margin.bottom,
        marginLeft: r.margin.left,
        flexShrink: "0",
        flexGrow: "0",
        pointerEvents: "none",
        transition: n !== "none" ? Ot.placeholder : null
    };
};

function Ls(r) {
    const i = n(null);
    const s = f((() => {
        if (!i.current) {
            return;
        }
        clearTimeout(i.current);
        i.current = null;
    }), []);
    const {animate: a, onTransitionEnd: c, onClose: l, contextId: d} = r;
    const [u, p] = o(r.animate === "open");
    t((() => {
        if (!u) {
            return Ps;
        }
        if (a !== "open") {
            s();
            p(false);
            return Ps;
        }
        if (i.current) {
            return Ps;
        }
        i.current = setTimeout((() => {
            i.current = null;
            p(false);
        }));
        return s;
    }), [ a, u, s ]);
    const g = f((e => {
        if (e.propertyName !== "height") {
            return;
        }
        c();
        if (a === "close") {
            l();
        }
    }), [ a, l, c ]);
    const m = Ts({
        isAnimatingOpenOnMount: u,
        animate: r.animate,
        placeholder: r.placeholder
    });
    return e.createElement(r.placeholder.tagName, {
        style: m,
        "data-rbd-placeholder-context-id": d,
        onTransitionEnd: g,
        ref: r.innerRef
    });
}

var Gs = e.memo(Ls);

const Ms = e => t => e === t;

const _s = Ms("scroll");

const $s = Ms("auto");

const Fs = (e, t) => t(e.overflowX) || t(e.overflowY);

const ks = e => {
    const t = window.getComputedStyle(e);
    const n = {
        overflowX: t.overflowX,
        overflowY: t.overflowY
    };
    return Fs(n, _s) || Fs(n, $s);
};

const Us = () => {
    {
        return false;
    }
};

const Ws = e => {
    if (!e) {
        return null;
    }
    if (e === document.body) {
        return Us() ? e : null;
    }
    if (e === document.documentElement) {
        return null;
    }
    if (!ks(e)) {
        return Ws(e.parentElement);
    }
    return e;
};

var Hs = ({descriptor: e, isEnabled: t, isCombineEnabled: n, isFixedOnPage: r, direction: o, client: i, page: s, closest: a}) => {
    const c = (() => {
        if (!a) {
            return null;
        }
        const {scrollSize: e, client: t} = a;
        const n = go({
            scrollHeight: e.scrollHeight,
            scrollWidth: e.scrollWidth,
            height: t.paddingBox.height,
            width: t.paddingBox.width
        });
        return {
            pageMarginBox: a.page.marginBox,
            frameClient: t,
            scrollSize: e,
            shouldClipSubject: a.shouldClipSubject,
            scroll: {
                initial: a.scroll,
                current: a.scroll,
                max: n,
                diff: {
                    value: Ge,
                    displacement: Ge
                }
            }
        };
    })();
    const l = o === "vertical" ? Ke : Qe;
    const d = tr({
        page: s,
        withPlaceholder: null,
        axis: l,
        frame: c
    });
    const u = {
        descriptor: e,
        isCombineEnabled: n,
        isFixedOnPage: r,
        axis: l,
        isEnabled: t,
        client: i,
        page: s,
        frame: c,
        subject: d
    };
    return u;
};

var js = e => ({
    x: e.scrollLeft,
    y: e.scrollTop
});

const Vs = (e, t) => {
    const n = B(e);
    if (!t) {
        return n;
    }
    if (e !== t) {
        return n;
    }
    const r = n.paddingBox.top - t.scrollTop;
    const o = n.paddingBox.left - t.scrollLeft;
    const i = r + t.scrollHeight;
    const s = o + t.scrollWidth;
    const a = {
        top: r,
        right: s,
        bottom: i,
        left: o
    };
    const c = w(a, n.border);
    const l = N({
        borderBox: c,
        margin: n.margin,
        border: n.border,
        padding: n.padding
    });
    return l;
};

var qs = ({ref: e, descriptor: t, env: n, windowScroll: r, direction: o, isDropDisabled: i, isCombineEnabled: s, shouldClipSubject: a}) => {
    const c = n.closestScrollable;
    const l = Vs(e, c);
    const d = A(l, r);
    const u = (() => {
        if (!c) {
            return null;
        }
        const e = B(c);
        const t = {
            scrollHeight: c.scrollHeight,
            scrollWidth: c.scrollWidth
        };
        return {
            client: e,
            page: A(e, r),
            scroll: js(c),
            scrollSize: t,
            shouldClipSubject: a
        };
    })();
    const p = Hs({
        descriptor: t,
        isEnabled: !i,
        isCombineEnabled: s,
        isFixedOnPage: n.isFixedOnPage,
        direction: o,
        client: l,
        page: d,
        closest: u
    });
    return p;
};

const zs = e => {
    if (!e) {
        return false;
    }
    const t = window.getComputedStyle(e);
    if (t.position === "fixed") {
        return true;
    }
    return zs(e.parentElement);
};

var Ys = e => {
    const t = Ws(e);
    const n = zs(e);
    return {
        closestScrollable: t,
        isFixedOnPage: n
    };
};

const Js = {
    passive: false
};

const Xs = {
    passive: true
};

var Ks = e => e.shouldPublishImmediately ? Js : Xs;

const Qs = e => e && e.env.closestScrollable || null;

function Zs(e) {
    const t = n(null);
    const r = as(Co);
    const o = V("droppable");
    const {registry: i, marshal: s} = r;
    const a = Ho(e);
    const c = g((() => ({
        id: e.droppableId,
        type: e.type,
        mode: e.mode
    })), [ e.droppableId, e.mode, e.type ]);
    const l = n(c);
    const d = g((() => x(((e, n) => {
        K(t.current, "Can only update scroll when dragging");
        const r = {
            x: e,
            y: n
        };
        s.updateDroppableScroll(c.id, r);
    }))), [ c.id, s ]);
    const u = f((() => {
        const e = t.current;
        if (!e || !e.env.closestScrollable) {
            return Ge;
        }
        return js(e.env.closestScrollable);
    }), []);
    const p = f((() => {
        const e = u();
        d(e.x, e.y);
    }), [ u, d ]);
    const m = g((() => I(p)), [ p ]);
    const b = f((() => {
        const e = t.current;
        const n = Qs(e);
        K(e && n, "Could not find scroll options while scrolling");
        const r = e.scrollOptions;
        if (r.shouldPublishImmediately) {
            p();
            return;
        }
        m();
    }), [ m, p ]);
    const h = f(((e, n) => {
        K(!t.current, "Cannot collect a droppable while a drag is occurring");
        const o = a.current;
        const i = o.getDroppableRef();
        K(i, "Cannot collect without a droppable ref");
        const s = i;
        const l = Ys(s);
        const d = {
            ref: s,
            descriptor: c,
            env: l,
            scrollOptions: n
        };
        t.current = d;
        const u = qs({
            ref: s,
            descriptor: c,
            env: l,
            windowScroll: e,
            direction: o.direction,
            isDropDisabled: o.isDropDisabled,
            isCombineEnabled: o.isCombineEnabled,
            shouldClipSubject: !o.ignoreContainerClipping
        });
        const p = l.closestScrollable;
        if (p) {
            p.setAttribute(Lo.contextId, r.contextId);
            p.addEventListener("scroll", b, Ks(d.scrollOptions));
        }
        return u;
    }), [ r.contextId, c, b, a ]);
    const v = f((() => {
        const e = t.current;
        const n = Qs(e);
        K(e && n, "Can only recollect Droppable client for Droppables that have a scroll container");
        return js(n);
    }), []);
    const y = f((() => {
        const e = t.current;
        K(e, "Cannot stop drag when no active drag");
        const n = e;
        const r = Qs(n);
        t.current = null;
        if (!r) {
            return;
        }
        m.cancel();
        r.removeAttribute(Lo.contextId);
        r.removeEventListener("scroll", b, Ks(n.scrollOptions));
    }), [ b, m ]);
    const D = f((e => {
        const n = t.current;
        K(n, "Cannot scroll when there is no drag");
        const r = Qs(n);
        K(r, "Cannot scroll a droppable with no closest scrollable");
        r.scrollTop += e.y;
        r.scrollLeft += e.x;
    }), []);
    const C = g((() => ({
        getDimensionAndWatchScroll: h,
        getScrollWhileDragging: v,
        dragStopped: y,
        scroll: D
    })), [ y, h, v, D ]);
    const w = g((() => ({
        uniqueId: o,
        descriptor: c,
        callbacks: C
    })), [ C, c, o ]);
    Fo((() => {
        l.current = w.descriptor;
        i.droppable.register(w);
        return () => {
            if (t.current) {
                z("Unsupported: changing the droppableId or type of a Droppable during a drag");
                y();
            }
            i.droppable.unregister(w);
        };
    }), [ C, c, y, w, s, i.droppable ]);
    Fo((() => {
        if (!t.current) {
            return;
        }
        s.updateDroppableIsEnabled(l.current.id, !e.isDropDisabled);
    }), [ e.isDropDisabled, s ]);
    Fo((() => {
        if (!t.current) {
            return;
        }
        s.updateDroppableIsCombineEnabled(l.current.id, e.isCombineEnabled);
    }), [ e.isCombineEnabled, s ]);
}

function ea(e) {
    const t = a(Co);
    K(t, "Could not find app context");
    const {contextId: r, isMovementAllowed: o} = t;
    const s = n(null);
    const c = n(null);
    const {children: l, droppableId: d, type: u, mode: p, direction: m, ignoreContainerClipping: b, isDropDisabled: h, isCombineEnabled: v, snapshot: y, useClone: D, updateViewportMaxScroll: I, getContainerForClone: x} = e;
    const C = f((() => s.current), []);
    const w = f((e => {
        s.current = e;
    }), []);
    f((() => c.current), []);
    const E = f((e => {
        c.current = e;
    }), []);
    const A = f((() => {
        if (o()) {
            I({
                maxScroll: fo()
            });
        }
    }), [ o, I ]);
    Zs({
        droppableId: d,
        type: u,
        mode: p,
        direction: m,
        isDropDisabled: h,
        isCombineEnabled: v,
        ignoreContainerClipping: b,
        getDroppableRef: C
    });
    const S = g((() => i(is, {
        on: e.placeholder,
        shouldAnimate: e.shouldAnimatePlaceholder
    }, (({onClose: e, data: t, animate: n}) => i(Gs, {
        placeholder: t,
        onClose: e,
        innerRef: E,
        animate: n,
        contextId: r,
        onTransitionEnd: A
    })))), [ r, A, e.placeholder, e.shouldAnimatePlaceholder, E ]);
    const B = g((() => ({
        innerRef: w,
        placeholder: S,
        droppableProps: {
            "data-rbd-droppable-id": d,
            "data-rbd-droppable-context-id": r
        }
    })), [ r, d, S, w ]);
    const N = D ? D.dragging.draggableId : null;
    const R = g((() => ({
        droppableId: d,
        type: u,
        isUsingCloneFor: N
    })), [ d, N, u ]);
    function O() {
        if (!D) {
            return null;
        }
        const {dragging: e, render: t} = D;
        const n = i(Bs, {
            draggableId: e.draggableId,
            index: e.source.index,
            isClone: true,
            isEnabled: true,
            shouldRespectForcePress: false,
            canDragInteractiveElements: true
        }, ((n, r) => t(n, r, e)));
        return P.createPortal(n, x());
    }
    return i(ss.Provider, {
        value: R
    }, l(B, y), O());
}

const ta = (e, t) => e === t.droppable.type;

const na = (e, t) => t.draggables[e.draggable.id];

const ra = () => {
    const e = {
        placeholder: null,
        shouldAnimatePlaceholder: true,
        snapshot: {
            isDraggingOver: false,
            draggingOverWith: null,
            draggingFromThisWith: null,
            isUsingPlaceholder: false
        },
        useClone: null
    };
    const t = {
        ...e,
        shouldAnimatePlaceholder: false
    };
    const n = x((e => ({
        draggableId: e.id,
        type: e.type,
        source: {
            index: e.index,
            droppableId: e.droppableId
        }
    })));
    const r = x(((r, o, i, s, a, c) => {
        const l = a.descriptor.id;
        const d = a.descriptor.droppableId === r;
        if (d) {
            const e = c ? {
                render: c,
                dragging: n(a.descriptor)
            } : null;
            const t = {
                isDraggingOver: i,
                draggingOverWith: i ? l : null,
                draggingFromThisWith: l,
                isUsingPlaceholder: true
            };
            return {
                placeholder: a.placeholder,
                shouldAnimatePlaceholder: false,
                snapshot: t,
                useClone: e
            };
        }
        if (!o) {
            return t;
        }
        if (!s) {
            return e;
        }
        const u = {
            isDraggingOver: i,
            draggingOverWith: l,
            draggingFromThisWith: null,
            isUsingPlaceholder: true
        };
        return {
            placeholder: a.placeholder,
            shouldAnimatePlaceholder: true,
            snapshot: u,
            useClone: null
        };
    }));
    const o = e => e.isDragging;
    const i = (n, i) => {
        const s = i.droppableId;
        const a = i.type;
        const c = !i.isDropDisabled;
        const l = i.renderClone;
        if (o(n)) {
            const e = n.critical;
            if (!ta(a, e)) {
                return t;
            }
            const o = na(e, n.dimensions);
            const i = Ie(n.impact) === s;
            return r(s, c, i, i, o, l);
        }
        if (n.phase === "DROP_ANIMATING") {
            const e = n.completed;
            if (!ta(a, e.critical)) {
                return t;
            }
            const o = na(e.critical, n.dimensions);
            return r(s, c, rs(e.result) === s, Ie(e.impact) === s, o, l);
        }
        if (n.phase === "IDLE" && n.completed && !n.shouldFlush) {
            const r = n.completed;
            if (!ta(a, r.critical)) {
                return t;
            }
            const o = Ie(r.impact) === s;
            const i = Boolean(r.impact.at && r.impact.at.type === "COMBINE");
            const c = r.critical.droppable.id === s;
            if (o) {
                return i ? e : t;
            }
            if (c) {
                return e;
            }
            return t;
        }
        return t;
    };
    return i;
};

const oa = {
    updateViewportMaxScroll: ce
};

function ia() {
    K(document.body, "document.body is not ready");
    return document.body;
}

const sa = {
    mode: "standard",
    type: "DEFAULT",
    direction: "vertical",
    isDropDisabled: false,
    isCombineEnabled: false,
    ignoreContainerClipping: false,
    renderClone: null,
    getContainerForClone: ia
};

const aa = b(ra, oa, null, {
    context: wo,
    areStatePropsEqual: os
})(ea);

aa.defaultProps = sa;

const ca = aa;

var la = ca;

function da() {}

const ua = {
    [ci]: true,
    [ai]: true,
    [di]: true,
    [li]: true
};

function pa(e, t) {
    function n() {
        t();
        e.cancel();
    }
    function r() {
        t();
        e.drop();
    }
    return [ {
        eventName: "keydown",
        fn: t => {
            if (t.keyCode === ii) {
                t.preventDefault();
                n();
                return;
            }
            if (t.keyCode === si) {
                t.preventDefault();
                r();
                return;
            }
            if (t.keyCode === fi) {
                t.preventDefault();
                e.moveDown();
                return;
            }
            if (t.keyCode === pi) {
                t.preventDefault();
                e.moveUp();
                return;
            }
            if (t.keyCode === gi) {
                t.preventDefault();
                e.moveRight();
                return;
            }
            if (t.keyCode === ui) {
                t.preventDefault();
                e.moveLeft();
                return;
            }
            if (ua[t.keyCode]) {
                t.preventDefault();
                return;
            }
            bi(t);
        }
    }, {
        eventName: "mousedown",
        fn: n
    }, {
        eventName: "mouseup",
        fn: n
    }, {
        eventName: "click",
        fn: n
    }, {
        eventName: "touchstart",
        fn: n
    }, {
        eventName: "resize",
        fn: n
    }, {
        eventName: "wheel",
        fn: n,
        options: {
            passive: true
        }
    }, {
        eventName: hi,
        fn: n
    } ];
}

function ga(e) {
    const t = n(da);
    const r = g((() => ({
        eventName: "keydown",
        fn: function n(r) {
            if (r.defaultPrevented) {
                return;
            }
            if (r.keyCode !== si) {
                return;
            }
            const i = e.findClosestDraggableId(r);
            if (!i) {
                return;
            }
            const s = e.tryGetLock(i, l, {
                sourceEvent: r
            });
            if (!s) {
                return;
            }
            r.preventDefault();
            let a = true;
            const c = s.snapLift();
            t.current();
            function l() {
                K(a, "Cannot stop capturing a keyboard drag when not capturing");
                a = false;
                t.current();
                o();
            }
            t.current = wt(window, pa(c, l), {
                capture: true,
                passive: false
            });
        }
    })), [ e ]);
    const o = f((function e() {
        const n = {
            passive: false,
            capture: true
        };
        t.current = wt(window, [ r ], n);
    }), [ r ]);
    Fo((function e() {
        o();
        return function e() {
            t.current();
        };
    }), [ o ]);
}

export { ns as DragDropContext, Ns as Draggable, la as Droppable, ts as resetServerContext, ga as useKeyboardSensor, Ci as useMouseSensor, Ni as useTouchSensor };
