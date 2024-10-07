import { createElement as r } from "react";

import { t, v as o, M as e } from "./chunk1.mjs";

import "@babel/runtime/helpers/extends";

import "react-dom/client";

import "tslib";

import "rxjs";

import "rxjs/operators";

import "i18next";

import "react-i18next";

import "react-dom";

import "react-focus-lock";

import "classnames";

import "framer-motion";

import "polished";

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

const i = i => {
    const p = t("Settings");
    const {CLOSE: m} = o();
    return r(e, {
        type: "error",
        isOpen: true,
        title: p("settings.invertApplicationColorsError.dialog.title"),
        text: p("settings.invertApplicationColorsError.error.msg"),
        dismissAction: {
            text: m,
            onPress: () => i.onClose(),
            isDefault: true
        }
    });
};

export { i as default };
