import { u as e, m as t, R as r, _ as n, P as i, O as o, n as a, p as c, T as s, L as m, q as p, r as u } from "./chunk1.mjs";

import l, { useState as h, useEffect as d } from "react";

import { R as f } from "./chunk3.mjs";

import "polished";

import "react-i18next";

import "i18next";

import "react-dom/client";

import "tslib";

import "rxjs";

import "rxjs/operators";

import "@babel/runtime/helpers/extends";

import "react-dom";

import "react-focus-lock";

import "classnames";

import "framer-motion";

import "axios";

import "reselect";

import "./i18n/nova_i18n.mjs";

import "react-popper";

import "@popperjs/core";

import "memoize-one";

import "handlebars";

import "zod";

import "use-memo-one";

import "@tanstack/react-query";

import "react-cropper";

import "redux-observable";

import "redux";

import "@redux-devtools/extension";

import "react-redux";

const E = ({message: e}) => l.createElement(i, {
    style: {
        display: "flex",
        flexShrink: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
}, l.createElement(o, {
    text: e,
    mode: "error"
}));

const g = t => {
    const [r, n] = h();
    const [i, o] = h();
    const [p] = a();
    const g = e();
    d((() => c(t.url, t.authenticationType).subscribe((e => {
        if (e.error) {
            o(e.error);
            return;
        }
        if (e.status !== "initalizing") {
            n(e.status === "authorized");
        }
        o(undefined);
    }))), [ t.url, t.authenticationType ]);
    let y = t.children;
    if (i) {
        y = l.createElement(s, {
            currentTheme: p
        }, l.createElement(E, {
            message: i
        }));
    } else if (r === undefined) {
        y = l.createElement(s, {
            currentTheme: p
        }, l.createElement(u, null));
    } else if (r === false) {
        y = l.createElement(s, {
            currentTheme: p
        }, l.createElement(m, {
            url: t.url,
            authenticationType: t.authenticationType
        }));
    }
    return l.createElement(f, {
        className: g
    }, y);
};

const y = n => {
    const [i, o] = h();
    const a = e();
    if (i || "packageUri" in n) {
        return l.createElement(f, {
            className: a
        }, l.createElement(E, {
            message: i || t["SASReport.genericError.msg"]()
        }));
    } else {
        return l.createElement(g, {
            url: n.url,
            authenticationType: n.authenticationType
        }, l.createElement(r, {
            mobileView: true,
            reportUri: n.reportUri,
            host: n.url,
            authenticationType: n.authenticationType,
            onError: e => o(e || t["SASReport.genericError.msg"]())
        }));
    }
};

const T = n => {
    const [i, o] = h();
    const a = e();
    if (i || "packageUri" in n) {
        return l.createElement(f, {
            className: a
        }, l.createElement(E, {
            message: i || t["SASReport.genericError.msg"]()
        }));
    } else {
        return l.createElement(g, {
            url: n.url,
            authenticationType: n.authenticationType
        }, l.createElement(r, {
            mobileView: true,
            reportUri: n.reportUri,
            host: n.url,
            authenticationType: n.authenticationType,
            objectName: n.objectName || "",
            onError: e => o(e || t["SASReport.genericError.msg"]())
        }));
    }
};

async function x(e, t, r, n) {
    const i = {};
    i.headers = {};
    if (n) {
        i.headers.Authorization = n;
        i.credentials = "omit";
    }
    const o = await fetch(`${e}${t}/content/elements`, i);
    const a = await o.json();
    const c = a?.items?.filter((e => e?.type === "Section"))?.findIndex((e => e?.name === r));
    if (c === undefined || c === -1) {
        throw new Error(`Unable to find Section with name ${r}`);
    }
    return c;
}

const S = e => {
    const [t, n] = h("pageIndex" in e ? e.pageIndex : undefined);
    const i = "pageName" in e ? e.pageName : undefined;
    d((() => {
        if (!i) {
            return;
        }
        let t = false;
        e.authenticationType === "guest" ? p(e.url).then((r => {
            if (t) {
                return;
            }
            x(e.url, e.reportUri, i, r).then((e => {
                if (t) {
                    return;
                }
                n(e);
            }));
        })) : x(e.url, e.reportUri, i).then((e => {
            if (t) {
                return;
            }
            n(e);
        }));
        return () => {
            t = true;
        };
    }), [ i, e.url, e.reportUri, e.authenticationType ]);
    if (t === undefined) {
        return l.createElement(u, null);
    } else {
        return l.createElement(r, {
            mobileView: true,
            reportUri: e.reportUri,
            host: e.url,
            authenticationType: e.authenticationType,
            sectionIndex: t,
            onError: e.onError
        });
    }
};

const b = r => {
    const [i, o] = h();
    const a = e();
    if (i || "packageUri" in r) {
        return l.createElement(f, {
            className: a
        }, l.createElement(E, {
            message: i || t["SASReport.genericError.msg"]()
        }));
    } else {
        return l.createElement(g, {
            url: r.url,
            authenticationType: r.authenticationType
        }, l.createElement(S, n({}, r, {
            onError: e => o(e || t["SASReport.genericError.msg"]())
        })));
    }
};

export { y as SASReport, T as SASReportObject, b as SASReportPage };
