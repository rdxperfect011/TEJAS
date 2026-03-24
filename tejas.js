const m = "classList", v = "style", fa = "unset", ma = "html-wrapper", x = (s = "div") => document.createElement(s);
class ga {
  static render(e, t) {
    const n = x();
    n.id = "error-view", n.innerText = t, e.replaceChildren(n);
  }
}
class Gi {
  static onLoad(e) {
    e.innerHTML = '<div id="loading-validate-key-property"></div>';
  }
  static createElements() {
    const e = x();
    return e.id = "validate-property-key-view", e;
  }
  static render(e, t, n) {
    const i = Gi.createElements(), r = {
      onSuccess: t,
      onFail: ga.render.bind(this, e, "Your 'key' has failed authentication"),
      onLoad: Gi.onLoad.bind(this, i)
    };
    n.key && n.verifyKey(n.key, r), e.replaceChildren(i);
  }
}
const oe = "service", h = "text", L = "html", f = "error", X = "https://deepchat.dev/docs/", te = "ai", F = "user", mt = "assistant", zi = "error-message-text", Li = "tejas-outer-container-role-", kr = "empty-message", Rs = "tejas-top-message", Pr = "tejas-middle-message", Is = "tejas-bottom-message", T = "src", E = "type", ne = "file", b = "files", j = "image", Q = "images", De = "camera", xn = "gifs", q = "audio", at = "microphone", ko = "mixedFiles", sn = "any", Po = "file-message", $t = "start", Lo = "end", Oo = "messages", Lr = "0", Or = "1", C = "role", ye = "string", ce = (s) => JSON.stringify(s), A = (s) => JSON.parse(ce(s));
function Nr(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function ba(s) {
  return s && ce(s);
}
function nr(s, e, t, n) {
  const i = `
${Nr(e)} message: ${ce(s)} 
`, r = t ? `${Nr(e)} message after interceptor: ${ba(n)} 
` : "";
  return i + r;
}
function _a(s, e, t, n) {
  return `${nr(s, e, t, n)}Make sure the ${e} message is using the Response format: ${X}connect/#Response 
You can also augment it using the responseInterceptor property: ${X}interceptors#responseInterceptor`;
}
function ya(s, e, t) {
  const n = "response";
  return `${nr(s, n, e, t)}Make sure the ${n} message is using the {text: string} format, e.g: {text: "Model Response"}`;
}
function Ea(s, e) {
  const t = "request";
  return `${nr(s, t, e)}Make sure the ${t} message is using the {body: {text: string}} format, e.g: {body: {text: "Model Response"}}`;
}
function va(s) {
  return `${s} failed - please wait for chat view to render before calling this property.`;
}
const wn = _a, Sa = Ea, Ca = ya, Br = va, ue = "Invalid API Key", Fe = "Failed to connect", Ue = "Request settings have not been set up", gs = "No file was added", ir = "Image was not found", No = "Multi-response arrays are not supported for streaming", Bo = `Make sure the events are using {text: string} or {html: string} format.
You can also augment them using the responseInterceptor property: ${X}interceptors#responseInterceptor`, xa = "Cannot mix {text: string} and {html: string} responses.", wa = `No valid stream events were sent.
${Bo}`, Aa = "Readable Stream connection error.", qt = "Please define a `function_handler` property inside the service config.", rn = "Function tool response must be an array or contain a text property", Do = "Failed to fetch history", Tn = "inside-start", pt = "inside-end", Pe = "outside-start", Ee = "outside-end", Qe = "dropup-menu", w = "default", Be = "hover", Z = "click", H = "active", $ = "disabled", z = "svg", Ot = "unavailable", R = "styles", Ii = "mouseenter", on = "mouseleave", Ta = "mousedown", Ra = "mouseup", nt = "submit", Rt = "loading", Ns = "stop";
class ae {
  static unsetStyle(e, t) {
    const n = Object.keys(t).reduce((i, r) => (i[r] = "", i), {});
    Object.assign(e[v], n);
  }
  static unsetActivityCSSMouseStates(e, t) {
    t[Z] && ae.unsetStyle(e, t[Z]), t[Be] && ae.unsetStyle(e, t[Be]);
  }
  static unsetAllCSSMouseStates(e, t) {
    ae.unsetActivityCSSMouseStates(e, t), t[w] && ae.unsetStyle(e, t[w]);
  }
  // if you want to asdd default styling - use pure css classes
  static processStateful(e) {
    const t = e[w] || {}, n = Object.assign(A(t), e == null ? void 0 : e[Be]), i = Object.assign(A(n), e == null ? void 0 : e[Z]);
    return { [w]: t, [Be]: n, [Z]: i };
  }
  static mergeStatefulStyles(e) {
    const t = { [w]: {}, [Be]: {}, [Z]: {} };
    return e.forEach((n) => {
      t[w] = Object.assign(t[w], n[w]), t[Be] = Object.assign(t[Be], n[Be]), t[Z] = Object.assign(t[Z], n[Z]);
    }), t;
  }
  static overwriteDefaultWithAlreadyApplied(e, t) {
    Object.keys(e[w] || []).forEach((n) => {
      var r;
      const i = n;
      t[v][i] && (r = e[w]) != null && r[i] && (e[w][n] = t[v][i]);
    });
  }
  static applyToStyleIfNotDefined(e, t) {
    for (const n in t) {
      const i = t[n];
      e[n] === "" && i && (e[n] = i);
    }
  }
}
const Kt = class Kt {
  static attemptAppendStyleSheetToHead(e) {
    if (e.fontFamily && e.fontFamily !== Kt.DEFAULT_FONT_FAMILY) return;
    const t = document.getElementsByTagName("head")[0];
    if (!Array.from(t.getElementsByTagName("link")).some(
      (i) => i.getAttribute("href") === Kt.FONT_URL
    )) {
      const i = x("link");
      i.rel = "stylesheet", i.href = Kt.FONT_URL, t.appendChild(i);
    }
  }
};
Kt.FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap", Kt.DEFAULT_FONT_FAMILY = "'Inter', sans-serif, Avenir, Helvetica, Arial";
let Vi = Kt;
const yn = class yn {
  static apply(e, t) {
    if (t)
      try {
        yn.applyStyleSheet(e, t);
      } catch {
        yn.addStyleElement(e, t);
      }
  }
  static applyStyleSheet(e, t) {
    const n = new CSSStyleSheet();
    n.replaceSync(e), t.adoptedStyleSheets.push(n);
  }
  static addStyleElement(e, t) {
    const n = x("style");
    n.innerHTML = e, t.appendChild(n);
  }
  static applyDefaultStyleToComponent(e, t) {
    t && ae.applyToStyleIfNotDefined(e, t), ae.applyToStyleIfNotDefined(e, yn.DEFAULT_COMPONENT_STYLE);
  }
};
yn.DEFAULT_COMPONENT_STYLE = {
  height: "350px",
  width: "320px",
  borderTop: "1px solid #cacaca",
  borderRight: "1px solid #cacaca",
  borderLeft: "1px solid #cacaca",
  borderBottom: "1px solid #cacaca",
  fontFamily: Vi.DEFAULT_FONT_FAMILY,
  fontSize: "0.9rem",
  backgroundColor: "white",
  position: "relative",
  // this is used to prevent inputAreaStyle background color from going beyond the container's rounded border
  // it will cause issues if there are elements that are meant to be outside of the chat component and in
  // that instance they should overwrite this
  overflow: "hidden"
};
let ci = yn;
const jt = class jt {
  static buildElement() {
    const e = x();
    e[m].add("tooltip");
    const t = x("span");
    return t[m].add("tooltip-text"), e.appendChild(t), e;
  }
  static tryCreateConfig(e, t) {
    if (t)
      return typeof t == "boolean" ? { [h]: e } : {
        [h]: t[h] || e,
        timeout: t.timeout || 0,
        style: t[v]
      };
  }
  static traverseParentUntilContainer(e) {
    let t = e;
    for (; t.parentElement; )
      t = t.parentElement;
    return t;
  }
  static setPosition(e, t) {
    const i = t.getRootNode().host.getBoundingClientRect(), r = e.getBoundingClientRect(), a = t.getBoundingClientRect().width / 2, c = r.left + r.width / 2;
    t[v].left = `${c - a - i.left}px`, t[v].top = `${r.top - 36 - i.top}px`;
    const l = t.getBoundingClientRect();
    l.left < i.left ? t[v].left = `${jt.OVERFLOW_NEW_POSITION_PX}px` : l.right > i.right && (t[v].left = `${i.width - l.width - jt.OVERFLOW_NEW_POSITION_PX}px`);
  }
  static display(e, t, n) {
    return n || (n = jt.traverseParentUntilContainer(e).nextSibling), t[h] && (n.children[0].textContent = t[h]), { timeout: setTimeout(() => {
      n[v].visibility = "visible", jt.setPosition(e, n), t[v] && Object.assign(n[v], t[v]);
    }, t.timeout || 0), element: n };
  }
  static hide(e, t) {
    clearTimeout(e.timeout), e.element[v].visibility = "hidden", t[v] && ae.unsetStyle(e.element, t[v]), e.element[v].left = "", e.element[v].top = "";
  }
};
jt.OVERFLOW_NEW_POSITION_PX = 4;
let ht = jt;
const fi = class fi {
};
fi.IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), fi.IS_CHROMIUM = window.chrome, fi.IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let $e = fi;
var _e = /* @__PURE__ */ ((s) => (s.ESCAPE = "Escape", s.ENTER = "Enter", s.TAB = "Tab", s.ARROW_UP = "ArrowUp", s.ARROW_DOWN = "ArrowDown", s.ARROW_RIGHT = "ArrowRight", s.ARROW_LEFT = "ArrowLeft", s.BACKSPACE = "Backspace", s.DELETE = "Delete", s.META = "Meta", s.CONTROL = "Control", s))(_e || {});
const Xt = class Xt {
  // prettier-ignore
  static add(e, t, n, i) {
    n !== void 0 && e.addEventListener("keydown", Xt.onKeyDown.bind(this, n)), e.oninput = Xt.onInput.bind(this, n, i), e.addEventListener("paste", (r) => {
      var o;
      r.preventDefault(), (o = r.clipboardData) != null && o[b].length && t.addFilesToAnyType(Array.from(r.clipboardData[b]));
    });
  }
  // preventing insertion early for a nicer UX
  // prettier-ignore
  static onKeyDown(e, t) {
    const i = t.target.textContent;
    i && i.length >= e && !Xt.PERMITTED_KEYS.has(t.key) && !Xt.isKeyCombinationPermitted(t) && t.preventDefault();
  }
  static isKeyCombinationPermitted(e) {
    return e.key === "a" ? e.ctrlKey || e.metaKey : !1;
  }
  static onInput(e, t, n) {
    const i = n.target, r = i.textContent || "";
    e !== void 0 && r.length > e && (i.textContent = r.substring(0, e), an.focusEndOfInput(i)), t == null || t();
  }
};
Xt.PERMITTED_KEYS = /* @__PURE__ */ new Set([
  _e.BACKSPACE,
  _e.DELETE,
  _e.ARROW_RIGHT,
  _e.ARROW_LEFT,
  _e.ARROW_DOWN,
  _e.ARROW_UP,
  _e.META,
  _e.CONTROL,
  _e.ENTER
]);
let Bs = Xt;
class Ia {
  static sanitizePastedTextContent(e) {
    var n, i;
    e.preventDefault();
    const t = (n = e.clipboardData) == null ? void 0 : n.getData("text/plain");
    t && ((i = document.execCommand) == null || i.call(document, "insertText", !1, t));
  }
}
const Nt = class Nt {
  constructor(e, t, n, i) {
    var o, a, c, l;
    this._isComposing = !1;
    const r = Nt.processConfig(t, e.textInput);
    this.elementRef = Nt.createContainerElement((o = r == null ? void 0 : r[R]) == null ? void 0 : o.container), this._config = r, this.inputElementRef = this.createInputElement((a = e.defaultInput) == null ? void 0 : a[h], i), Nt.addFilesToAnyType(n, (c = e.defaultInput) == null ? void 0 : c[b]), this.elementRef.appendChild(this.inputElementRef), e.setPlaceholderText = this.setPlaceholderText.bind(this), e.setPlaceholderText(((l = this._config.placeholder) == null ? void 0 : l[h]) || "Ask me anything!"), this._browserStorage = i, setTimeout(() => {
      Bs.add(this.inputElementRef, n, this._config.characterLimit, e._validationHandler), this._onInput = t.onInput;
    });
  }
  static processConfig(e, t) {
    var n;
    return t ?? (t = {}), t[$] ?? (t[$] = e.isTextInputDisabled), t.placeholder ?? (t.placeholder = {}), (n = t.placeholder)[h] ?? (n[h] = e.textInputPlaceholderText), t;
  }
  static createContainerElement(e) {
    const t = x();
    return t.id = "text-input-container", Object.assign(t[v], e), t;
  }
  // this is is a bug fix where if the browser is scrolled down and the user types in text that creates new line
  // the browser scrollbar will move up which leads to undesirable UX.
  // More details in this Stack Overflow question:
  // https://stackoverflow.com/questions/76285135/prevent-automatic-scroll-when-text-is-inserted-into-contenteditable-div
  // prettier-ignore
  static preventAutomaticScrollUpOnNewLine(e) {
    let t;
    e.addEventListener("keydown", () => {
      t = window.scrollY;
    }), e.addEventListener("input", () => {
      t !== window.scrollY && window.scrollTo({ top: t });
    });
  }
  // this also similarly prevents scroll up
  clear() {
    var t, n, i;
    const e = window.scrollY;
    this.inputElementRef[m].contains(`text-input-${$}`) || (Object.assign(this.inputElementRef[v], (t = this._config.placeholder) == null ? void 0 : t[v]), this.inputElementRef.textContent = "", an.focusEndOfInput(this.inputElementRef), (n = this._onInput) == null || n.call(this, !1), (i = this._browserStorage) == null || i.addInputText("")), $e.IS_CHROMIUM && window.scrollTo({ top: e });
  }
  createInputElement(e, t) {
    var i, r, o, a;
    const n = x();
    return n.id = Nt.TEXT_INPUT_ID, n[m].add("text-input-styling"), n[C] = "textbox", typeof e == "string" ? n.innerText = e : t != null && t.trackInputText && (n.innerText = t.get().inputText || ""), $e.IS_MOBILE && n.setAttribute("tabindex", "0"), $e.IS_CHROMIUM && Nt.preventAutomaticScrollUpOnNewLine(n), typeof this._config[$] == "boolean" && this._config[$] === !0 ? (n.contentEditable = "false", n[m].add(`text-input-${$}`), n.setAttribute(`aria-${$}`, "true")) : (n.contentEditable = "true", n.removeAttribute(`aria-${$}`), this.addEventListeners(n)), Object.assign(n[v], (i = this._config[R]) == null ? void 0 : i[h]), Object.assign(n[v], (r = this._config.placeholder) == null ? void 0 : r[v]), (a = (o = this._config.placeholder) == null ? void 0 : o[v]) != null && a.color || n.setAttribute("textcolor", ""), n;
  }
  static addFilesToAnyType(e, t) {
    t && e.addFilesToAnyType(Array.from(t).map((n) => n));
  }
  removePlaceholderStyle() {
    var e, t, n, i;
    !this.inputElementRef[m].contains(`text-input-${$}`) && ((e = this._config.placeholder) != null && e[v]) && (ae.unsetStyle(this.inputElementRef, (t = this._config.placeholder) == null ? void 0 : t[v]), Object.assign(this.inputElementRef[v], (i = (n = this._config) == null ? void 0 : n[R]) == null ? void 0 : i[h]));
  }
  addEventListeners(e) {
    var t, n;
    (t = this._config[R]) != null && t.focus && (e.onfocus = () => {
      var i;
      return Object.assign(this.elementRef[v], (i = this._config[R]) == null ? void 0 : i.focus);
    }, e.onblur = this.onBlur.bind(this, this._config[R].focus, (n = this._config[R]) == null ? void 0 : n.container)), e.addEventListener("keydown", this.onKeydown.bind(this)), e.addEventListener("input", this.onInput.bind(this)), e.addEventListener("paste", Ia.sanitizePastedTextContent), e.addEventListener("compositionstart", () => this._isComposing = !0), e.addEventListener("compositionend", () => this._isComposing = !1);
  }
  onBlur(e, t) {
    ae.unsetStyle(this.elementRef, e), t && Object.assign(this.elementRef[v], t);
  }
  onKeydown(e) {
    var t;
    e.key === _e.ENTER && !$e.IS_MOBILE && !this._isComposing && !e.ctrlKey && !e.shiftKey && (e.preventDefault(), (t = this.submit) == null || t.call(this));
  }
  onInput() {
    var e, t;
    this.isTextInputEmpty() ? Object.assign(this.inputElementRef[v], (e = this._config.placeholder) == null ? void 0 : e[v]) : this.removePlaceholderStyle(), (t = this._onInput) == null || t.call(this, !0);
  }
  setPlaceholderText(e) {
    this.inputElementRef.setAttribute("tejas-placeholder-text", e), this.inputElementRef.setAttribute("aria-label", e);
  }
  isTextInputEmpty() {
    return this.inputElementRef.textContent === "";
  }
};
Nt.TEXT_INPUT_ID = "text-input";
let Wi = Nt;
class an {
  static focusEndOfInput(e) {
    const t = document.createRange();
    t.selectNodeContents(e), t.collapse(!1);
    const n = window.getSelection();
    n == null || n.removeAllRanges(), n == null || n.addRange(t), ($e.IS_MOBILE || $e.IS_SAFARI) && e.focus();
  }
  static focusFromParentElement(e) {
    const t = e.querySelector(`#${Wi.TEXT_INPUT_ID}`);
    t && an.focusEndOfInput(t);
  }
}
const Fo = "Authentication", de = "Authorization", Ma = "authorization", bs = "Unauthorized", sr = "Authorization header", Gt = "Invalid", Mi = "Incorrect", Ae = "authentication_error", it = "invalid_request_error", G = "Content-Type", ka = "content-type", ee = "application/json", U = "object", rr = "completed", we = "Bearer ", he = "GET", be = "POST", or = "Upload an audio file", Hi = "function_call", tn = "input_audio", qe = "image_url", Rn = "system", us = class us {
  static addElements(e, ...t) {
    t.forEach((n) => e.appendChild(n));
  }
  static isScrollbarAtBottomOfElement(e, t = us.CODE_SNIPPET_GENERATION_JUMP) {
    const n = e.scrollHeight, i = e.clientHeight, r = e.scrollTop, o = n - i;
    return r >= o - t;
  }
  static cloneElement(e) {
    const t = e.cloneNode(!0);
    return e.parentNode.replaceChild(t, e), t;
  }
  static scrollToBottom(e, t = !1, n) {
    e.scrollButton && e.scrollButton.hiddenElements.size > 0 && e.scrollButton.clearHidden(), n ? e.elementRef.scrollTo({ left: 0, top: n.offsetTop }) : t ? e.elementRef.scrollTo({ left: 0, top: e.elementRef.scrollHeight, behavior: "smooth" }) : e.elementRef.scrollTop = e.elementRef.scrollHeight;
  }
  static scrollToTop(e) {
    e.scrollTop = 0;
  }
  static isVisibleInParent(e, t) {
    const n = e.getBoundingClientRect(), i = t.getBoundingClientRect();
    return n.bottom > i.top && n.top < i.bottom;
  }
  static waitForScrollEnd(e, t) {
    let n = -1, i = 0;
    const r = () => {
      const o = e.scrollTop;
      if (o === n) {
        if (i++, i > 2) {
          t();
          return;
        }
      } else
        i = 0, n = o;
      requestAnimationFrame(r);
    };
    requestAnimationFrame(r);
  }
  static assignButtonEvents(e, t) {
    e.onclick = t, e.onkeydown = (n) => {
      n.key === _e.ENTER && setTimeout(t);
    };
  }
};
us.CODE_SNIPPET_GENERATION_JUMP = 1;
let V = us;
const ps = class ps {
  static speak(e, t) {
    if (!t.audio && window.SpeechSynthesisUtterance) {
      const n = new SpeechSynthesisUtterance(e);
      Object.assign(n, t), speechSynthesis.speak(n);
    }
  }
  static processConfig(e, t) {
    const n = {};
    setTimeout(() => {
      if (typeof e == "object" && (e.audio && (n.audio = e.audio), e.lang && (n.lang = e.lang), e.pitch && (n.pitch = e.pitch), e.rate && (n.rate = e.rate), e.volume && (n.volume = e.volume), e.voiceName)) {
        const i = window.speechSynthesis.getVoices().find((r) => {
          var o;
          return r.name.toLocaleLowerCase() === ((o = e.voiceName) == null ? void 0 : o.toLocaleLowerCase());
        });
        i && (n.voice = i);
      }
      t(n);
    }, ps.LOAD_VOICES_MS);
  }
};
ps.LOAD_VOICES_MS = 200;
let An = ps;
const En = class En {
  static colorToHex(e) {
    const t = x();
    return t[v].color = e, document.body.appendChild(t), `#${window.getComputedStyle(t).color.match(/\d+/g).map((r) => parseInt(r).toString(16).padStart(2, "0")).join("")}`;
  }
  static setDots(e, t) {
    var n, i;
    if ((i = (n = t == null ? void 0 : t[R]) == null ? void 0 : n.bubble) != null && i.color) {
      const r = En.colorToHex(t[R].bubble.color);
      e[v].setProperty("--loading-message-color", r), e[v].setProperty("--loading-message-color-fade", `${r}33`);
    } else
      e[v].setProperty("--loading-message-color", "#848484"), e[v].setProperty("--loading-message-color-fade", "#55555533");
  }
  static setRing(e, t) {
    const { color: n, width: i, height: r, margin: o, border: a } = t || {};
    if (n) {
      const c = En.colorToHex(n);
      e[v].setProperty("--loading-history-color", c);
    } else
      e[v].setProperty("--loading-history-color", "#dbdbdb");
    e[v].setProperty("--loading-history-height", r || "57px"), e[v].setProperty("--loading-history-width", i || "57px"), e[v].setProperty("--loading-history-margin", o || "7px"), e[v].setProperty("--loading-history-border", a || "6px solid");
  }
};
En.BUBBLE_CLASS = "tejas-loading-message-bubble", En.DOTS_CONTAINER_CLASS = "tejas-loading-message-dots-container";
let ft = En;
class le {
  static checkForContainerStyles(e, t) {
    const n = e.containerStyle;
    n && (Object.assign(t[v], n), console[f](`The containerStyle property${Ye}1.3.14.`), console[f](`${zt}the style property instead: ${X}styles#style`));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handleResponseProperty(e) {
    return console[f](`The {result: ....} response object type${Ye}1.3.0.`), console[f](`${zt}the new response object: ${X}connect#Response`), e.result;
  }
  static processHistory(e) {
    const t = e.initialMessages;
    if (t)
      return console[f](`The initialMessages property${Ye}2.0.0.`), console[f](`${zt}the history property instead: ${X}messages/#history`), t;
  }
  static processHistoryFile(e) {
    const t = e[ne];
    t && (console[f](`The file property in MessageContent${Ye}1.3.17.`), console[f](`${zt}the files array property: ${X}messages/#MessageContent`), e[b] = [t]);
  }
  static processValidateInput(e) {
    const t = e.validateMessageBeforeSending;
    if (t)
      return console[f](`The validateMessageBeforeSending property${Ye}1.3.24.`), console[f](`${zt}validateInput: ${X}interceptors#validateInput`), t;
  }
  static processSubmitUserMessage(e) {
    return console[f](`The submitUserMessage(text: string) argument string type${Ye}1.4.4.`), console[f](`${zt}the new argument type: ${X}methods#submitUserMessage`), { [h]: e };
  }
  static flagHTMLUpdateClass(e) {
    var t;
    (t = e.children[0]) != null && t[m].contains("tejas-update-message") && (console[f](`The "tejas-update-message" html class${Ye}1.4.4.`), console[f](`${zt}using {..., overwrite: true} object: ${X}connect#Response`));
  }
  static processConnect(e) {
    const t = e;
    t.request && (t.connect ? Object.assign(t.connect, t.request) : t.connect = t.request, console[f](`The request property${Ye}2.0.0.`), console[f](`${Oi}connect object: ${X}connect#connect-1`));
  }
  static checkForStream(e) {
    const t = e.stream;
    if (t)
      return console[f](`The stream property${Fr}the connect object in version 2.0.0.`), console[f](`${Oi}connect object: ${X}connect#connect-1`), t;
  }
  static fireOnNewMessage(e, t) {
    var i;
    const n = e;
    n.onNewMessage && (console[f](`The onNewMessage event${Ye}2.0.0.`), console[f](`${Oi}onMessage event: ${X}events#onMessage`), (i = n.onNewMessage) == null || i.call(n, t)), e.dispatchEvent(new CustomEvent("new-message", { detail: t }));
  }
  static processFileConfigConnect(e) {
    const t = e;
    t.request && (console[f](`The request property in file configuration${Ye}2.0.0.`), console[f](`Please use the connect property instead: ${X}files`), t.connect || (t.connect = t.request));
  }
  static processMessageStyles(e) {
    if (!e) return;
    const t = A(e), n = t.loading;
    return n && (n.outerContainer || n.innerContainer || n.bubble || n.media) && (console[f](`The loading message styles are defined using LoadingMessageStyles interface${bn}2.1.0.`), console[f](`Check it out here: ${X}messages/styles#LoadingMessageStyles`), t.loading = { message: { styles: n } }), t;
  }
  static processDemo(e) {
    return typeof e == "boolean" || e.displayLoadingBubble && (console[f](`The demo displayLoadingBubble property${Ye}2.1.0.`), console[f](`Please use displayLoading instead: ${X}modes#demo`), e.displayLoading = { message: !0 }), e;
  }
  static processCohere(e) {
    const t = e, n = `${Oi}official documentation: ${X}directConnection/Cohere`;
    return t.chat && (console[f](`Cohere chat property${Ye}2.2.3.`), console[f](n), delete t.chat), t.textGeneration ? (console[f](`Cohere textGeneration${Dr}2.2.3.`), console[f](n), delete t.textGeneration, !1) : t.summarization ? (console[f](`Cohere summarization${Dr}2.2.3.`), console[f](n), delete t.summarization, !1) : !0;
  }
  static processStreamHTMLWrappers(e) {
    if (!e || typeof e !== U) return;
    const t = e.htmlWrappers;
    if (t)
      return console[f](`The htmlWrappers property${Fr}Deep Chat's base${bn}2.3.0.`), console[f](`Check it out here: ${X}messages/HTML#htmlWrappers`), t;
  }
  static processFocusMode(e) {
    return !e || typeof e == "boolean" || e.scroll && (console[f](`The scroll property in focusMode has been changed to smoothScroll${bn}2.3.0.`), console[f](`Check it out here: ${X}modes#focusMode`), e.smoothScroll = !0), e;
  }
  static processPosition(e) {
    if (!e) return e;
    const t = `Position names have been updated${bn}2.3.1.`;
    return e === "inside-left" ? (console[f](t), Tn) : e === "inside-right" ? (console[f](t), pt) : e === "outside-left" ? (console[f](t), Pe) : e === "outside-right" ? (console[f](t), Ee) : e;
  }
  static processBrowserStorage(e) {
    const t = e.get();
    t && Array.isArray(t) && e.addMessages(t);
  }
}
const bn = " since version ", Ye = ` is deprecated ${bn}`, zt = "Please change to using ", Oi = "Please see the ", Dr = ` is not supported ${bn}`, Fr = " has been moved to ";
class Tt {
  static mouseUp(e, t) {
    ae.unsetAllCSSMouseStates(e, t), Object.assign(e[v], t[w]), Object.assign(e[v], t[Be]);
  }
  static mouseDown(e, t) {
    Object.assign(e[v], t[Z]);
  }
  static mouseLeave(e, t) {
    ae.unsetAllCSSMouseStates(e, t), Object.assign(e[v], t[w]);
  }
  static mouseEnter(e, t) {
    Object.assign(e[v], t[Be]);
  }
  static add(e, t) {
    e.addEventListener(Ii, Tt.mouseEnter.bind(this, e, t)), e.addEventListener(on, Tt.mouseLeave.bind(this, e, t)), e.addEventListener(Ta, Tt.mouseDown.bind(this, e, t)), e.addEventListener(Ra, Tt.mouseUp.bind(this, e, t));
  }
}
const Pa = "tejas-temporary-message", La = "tejas-suggestion-button", Ds = {
  "tejas-button": {
    styles: {
      [w]: {
        backgroundColor: "white",
        padding: "5px",
        paddingLeft: "7px",
        paddingRight: "7px",
        border: "1px solid #c2c2c2",
        borderRadius: "6px",
        cursor: "pointer"
      },
      [Be]: {
        backgroundColor: "#fafafa"
      },
      [Z]: {
        backgroundColor: "#f1f1f1"
      }
    }
  }
}, Ur = Object.keys(Ds);
class gt {
  static applySuggestionEvent(e, t) {
    setTimeout(() => {
      t.addEventListener(Z, () => {
        var n, i;
        (i = e.submitUserMessage) == null || i.call(e, { [h]: ((n = t.textContent) == null ? void 0 : n.trim()) || "" });
      });
    });
  }
  static isElementTemporary(e) {
    var t;
    return e ? (t = e.bubbleElement.children[0]) == null ? void 0 : t[m].contains(Pa) : !1;
  }
  static doesElementContainTejasClass(e) {
    return Ur.find((t) => e[m].contains(t));
  }
  static applyEvents(e, t) {
    const n = Ds[t].events;
    Object.keys(n || []).forEach((i) => {
      e.addEventListener(i, n == null ? void 0 : n[i]);
    });
  }
  static getProcessedStyles(e, t, n) {
    const i = Array.from(t[m]).reduce((a, c) => {
      var d;
      const l = (d = e[c]) == null ? void 0 : d[R];
      return l && e[c][R] && a.push(l), a;
    }, []), r = Ds[n][R];
    if (r) {
      const a = A(r);
      a[w] && ae.overwriteDefaultWithAlreadyApplied(a, t), i.unshift(a);
    }
    const o = ae.mergeStatefulStyles(i);
    return ae.processStateful(o);
  }
  static applyTejasUtilities(e, t, n) {
    Ur.forEach((r) => {
      const o = n.getElementsByClassName(r);
      Array.from(o || []).forEach((a) => {
        const c = gt.getProcessedStyles(t, a, r);
        re.applyStylesToElement(a, c), gt.applyEvents(a, r);
      });
    });
    const i = n.getElementsByClassName(La);
    Array.from(i).forEach((r) => gt.applySuggestionEvent(e, r));
  }
}
class re {
  static applyStylesToElement(e, t) {
    const n = ae.processStateful(t);
    Tt.add(e, n), Object.assign(e[v], n[w]);
  }
  static applyEventsToElement(e, t) {
    Object.keys(t).forEach((n) => {
      const i = t[n];
      i && e.addEventListener(n, i);
    });
  }
  static applyClassUtilitiesToElement(e, t) {
    const { events: n, styles: i } = t;
    n && re.applyEventsToElement(e, n), i && !gt.doesElementContainTejasClass(e) && re.applyStylesToElement(e, i);
  }
  static applyCustomClassUtilities(e, t) {
    Object.keys(e).forEach((n) => {
      const i = t.getElementsByClassName(n);
      Array.from(i).forEach((r) => {
        e[n] && re.applyClassUtilitiesToElement(r, e[n]);
      });
    });
  }
  static apply(e, t) {
    gt.applyTejasUtilities(e, e.htmlClassUtilities, t), re.applyCustomClassUtilities(e.htmlClassUtilities, t);
  }
  static traverseNodes(e, t) {
    e.nodeType === Node.ELEMENT_NODE && t.push(e.outerHTML), e.childNodes.forEach((n) => {
      re.traverseNodes(n, t);
    });
  }
  static splitHTML(e) {
    const n = new DOMParser().parseFromString(e, "text/html"), i = [];
    return n.body.childNodes.forEach((r) => {
      re.traverseNodes(r, i);
    }), i;
  }
  static isTemporaryBasedOnHTML(e) {
    const t = x();
    return t.innerHTML = e, gt.isElementTemporary({
      outerContainer: t,
      bubbleElement: t,
      innerContainer: t
    });
  }
  // useful for removing event listeners
  static replaceElementWithNewClone(e, t) {
    var i;
    const n = (t || e).cloneNode(!0);
    return (i = e.parentNode) == null || i.replaceChild(n, e), n;
  }
  static tryAddWrapper(e, t, n, i) {
    if (t && i) {
      const r = (n == null ? void 0 : n[i]) || (n == null ? void 0 : n[w]);
      if (r)
        return e.innerHTML = r, { contentEl: re.getTargetWrapper(e), wrapper: !0 };
    }
    return { contentEl: e, wrapper: !1 };
  }
  static getTargetWrapper(e) {
    return e.getElementsByClassName(ma)[0] || e;
  }
}
const Bt = class Bt {
  static createElements(e, t, n, i, r = !1) {
    const o = e.createMessageElementsOnOrientation("", n, i, r);
    o.bubbleElement[m].add(Bt.HTML_BUBBLE_CLASS);
    const { contentEl: a } = re.tryAddWrapper(o.bubbleElement, t, e._customWrappers, n);
    return a.innerHTML = t, o;
  }
  static overwriteElements(e, t, n) {
    n.bubbleElement.innerHTML = t, re.apply(e, n.outerContainer), le.flagHTMLUpdateClass(n.bubbleElement);
  }
  // prettier-ignore
  static overwrite(e, t, n, i) {
    const { messageToElements: r } = e, o = B.overwriteMessage(
      r,
      i,
      t,
      n,
      L,
      Bt.HTML_BUBBLE_CLASS
    );
    return o && Bt.overwriteElements(e, t, o), o;
  }
  static create(e, t, n, i = !1) {
    var o;
    const r = Bt.createElements(e, t, n, i);
    return B.fillEmptyMessageElement(r.bubbleElement, t), re.apply(e, r.outerContainer), le.flagHTMLUpdateClass(r.bubbleElement), e.applyCustomStyles(r, n, !1, (o = e.messageStyles) == null ? void 0 : o[L]), r;
  }
  static add(e, t, n, i, r = !1) {
    if (i != null && i.status) {
      const a = this.overwrite(e, t, n, e.messageElementRefs);
      if (a) return a;
      i.status = !1;
    }
    if (r && e.messageElementRefs.length > 0 && re.isTemporaryBasedOnHTML(t))
      return;
    const o = Bt.create(e, t, n, r);
    return r || e.appendOuterContainerElemet(o.outerContainer), o;
  }
};
Bt.HTML_BUBBLE_CLASS = "html-message";
let bt = Bt;
class Oa {
  static katex(e, t, n) {
    const a = (n || {}).delimiter || "$";
    if (a.length !== 1)
      throw new Error("invalid delimiter");
    const c = (p, u) => {
      var g;
      return ((g = window.katex) == null ? void 0 : g.renderToString(p, { displayMode: u, throwOnError: !1, output: "mathml", ...e })) || "";
    }, l = (p, u, g) => {
      let _ = !1, y = p.bMarks[u] + p.tShift[u], S = p.eMarks[u];
      if (y + 1 > S)
        return !1;
      const M = p[T].charAt(y);
      if (M !== a)
        return !1;
      let K = y;
      y = p.skipChars(y, M);
      let ie = y - K;
      if (ie !== 2)
        return !1;
      let se = u;
      for (; ++se, !(se >= g || (y = K = p.bMarks[se] + p.tShift[se], S = p.eMarks[se], y < S && p.tShift[se] < p.blkIndent)); )
        if (p[T].charAt(y) === a && !(p.tShift[se] - p.blkIndent >= 4) && (y = p.skipChars(y, M), !(y - K < ie) && (y = p.skipSpaces(y), !(y < S)))) {
          _ = !0;
          break;
        }
      ie = p.tShift[u], p.line = se + (_ ? 1 : 0);
      const Te = p.getLines(u + 1, se, ie, !0).replace(/[ \n]+/g, " ").trim();
      return p.tokens.push({
        type: "katex",
        params: null,
        content: Te,
        lines: [u, p.line],
        level: p.level,
        block: !0
      }), !0;
    }, d = (p, u) => {
      const g = p.pos, _ = p.posMax;
      let y = g;
      if (p[T].charAt(y) !== a)
        return !1;
      for (++y; y < _ && p[T].charAt(y) === a; )
        ++y;
      const S = p[T].slice(g, y);
      if (S.length > 2)
        return !1;
      const M = y;
      let K = 0;
      for (; y < _; ) {
        const ie = p[T].charAt(y);
        if (ie === "{" && (y === 0 || p[T].charAt(y - 1) !== "\\"))
          K += 1;
        else if (ie === "}" && (y === 0 || p[T].charAt(y - 1) !== "\\")) {
          if (K -= 1, K < 0)
            return !1;
        } else if (ie === a && K === 0) {
          const se = y;
          let Te = y + 1;
          for (; Te < _ && p[T].charAt(Te) === a; )
            ++Te;
          if (Te - se === S.length) {
            if (!u) {
              const Pt = p[T].slice(M, se).replace(/[ \n]+/g, " ").trim();
              p.push({ type: "katex", content: Pt, block: S.length > 1, level: p.level });
            }
            return p.pos = Te, !0;
          }
        }
        y += 1;
      }
      return u || (p.pending += S), p.pos += S.length, !0;
    };
    t.inline.ruler.push("katex", d, n), t.block.ruler.push("katex", l, n), t.renderer.rules.katex = (p, u) => c(p[u].content, p[u].block), t.renderer.rules.katex.delimiter = a;
  }
}
var Ni;
function Uo(s) {
  return Ni = Ni || document.createElement("textarea"), Ni.innerHTML = "&" + s + ";", Ni.value;
}
var Na = Object.prototype.hasOwnProperty;
function Ba(s, e) {
  return s ? Na.call(s, e) : !1;
}
function Ho(s) {
  var e = [].slice.call(arguments, 1);
  return e.forEach(function(t) {
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be object");
      Object.keys(t).forEach(function(n) {
        s[n] = t[n];
      });
    }
  }), s;
}
var Da = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function vi(s) {
  return s.indexOf("\\") < 0 ? s : s.replace(Da, "$1");
}
function $o(s) {
  return !(s >= 55296 && s <= 57343 || s >= 64976 && s <= 65007 || (s & 65535) === 65535 || (s & 65535) === 65534 || s >= 0 && s <= 8 || s === 11 || s >= 14 && s <= 31 || s >= 127 && s <= 159 || s > 1114111);
}
function Fs(s) {
  if (s > 65535) {
    s -= 65536;
    var e = 55296 + (s >> 10), t = 56320 + (s & 1023);
    return String.fromCharCode(e, t);
  }
  return String.fromCharCode(s);
}
var Fa = /&([a-z#][a-z0-9]{1,31});/gi, Ua = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
function Ha(s, e) {
  var t = 0, n = Uo(e);
  return e !== n ? n : e.charCodeAt(0) === 35 && Ua.test(e) && (t = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), $o(t)) ? Fs(t) : s;
}
function cn(s) {
  return s.indexOf("&") < 0 ? s : s.replace(Fa, Ha);
}
var $a = /[&<>"]/, qa = /[&<>"]/g, Ga = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function za(s) {
  return Ga[s];
}
function Ge(s) {
  return $a.test(s) ? s.replace(qa, za) : s;
}
var I = {};
I.blockquote_open = function() {
  return `<blockquote>
`;
};
I.blockquote_close = function(s, e) {
  return "</blockquote>" + hn(s, e);
};
I.code = function(s, e) {
  return s[e].block ? "<pre><code>" + Ge(s[e].content) + "</code></pre>" + hn(s, e) : "<code>" + Ge(s[e].content) + "</code>";
};
I.fence = function(s, e, t, n, i) {
  var r = s[e], o = "", a = t.langPrefix, c = "", l, d, p;
  if (r.params) {
    if (l = r.params.split(/\s+/g), d = l.join(" "), Ba(i.rules.fence_custom, l[0]))
      return i.rules.fence_custom[l[0]](s, e, t, n, i);
    c = Ge(cn(vi(d))), o = ' class="' + a + c + '"';
  }
  return t.highlight ? p = t.highlight.apply(t.highlight, [r.content].concat(l)) || Ge(r.content) : p = Ge(r.content), "<pre><code" + o + ">" + p + "</code></pre>" + hn(s, e);
};
I.fence_custom = {};
I.heading_open = function(s, e) {
  return "<h" + s[e].hLevel + ">";
};
I.heading_close = function(s, e) {
  return "</h" + s[e].hLevel + `>
`;
};
I.hr = function(s, e, t) {
  return (t.xhtmlOut ? "<hr />" : "<hr>") + hn(s, e);
};
I.bullet_list_open = function() {
  return `<ul>
`;
};
I.bullet_list_close = function(s, e) {
  return "</ul>" + hn(s, e);
};
I.list_item_open = function() {
  return "<li>";
};
I.list_item_close = function() {
  return `</li>
`;
};
I.ordered_list_open = function(s, e) {
  var t = s[e], n = t.order > 1 ? ' start="' + t.order + '"' : "";
  return "<ol" + n + `>
`;
};
I.ordered_list_close = function(s, e) {
  return "</ol>" + hn(s, e);
};
I.paragraph_open = function(s, e) {
  return s[e].tight ? "" : "<p>";
};
I.paragraph_close = function(s, e) {
  var t = !(s[e].tight && e && s[e - 1].type === "inline" && !s[e - 1].content);
  return (s[e].tight ? "" : "</p>") + (t ? hn(s, e) : "");
};
I.link_open = function(s, e, t) {
  var n = s[e].title ? ' title="' + Ge(cn(s[e].title)) + '"' : "", i = t.linkTarget ? ' target="' + t.linkTarget + '"' : "";
  return '<a href="' + Ge(s[e].href) + '"' + n + i + ">";
};
I.link_close = function() {
  return "</a>";
};
I.image = function(s, e, t) {
  var n = ' src="' + Ge(s[e].src) + '"', i = s[e].title ? ' title="' + Ge(cn(s[e].title)) + '"' : "", r = ' alt="' + (s[e].alt ? Ge(cn(vi(s[e].alt))) : "") + '"', o = t.xhtmlOut ? " /" : "";
  return "<img" + n + r + i + o + ">";
};
I.table_open = function() {
  return `<table>
`;
};
I.table_close = function() {
  return `</table>
`;
};
I.thead_open = function() {
  return `<thead>
`;
};
I.thead_close = function() {
  return `</thead>
`;
};
I.tbody_open = function() {
  return `<tbody>
`;
};
I.tbody_close = function() {
  return `</tbody>
`;
};
I.tr_open = function() {
  return "<tr>";
};
I.tr_close = function() {
  return `</tr>
`;
};
I.th_open = function(s, e) {
  var t = s[e];
  return "<th" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
I.th_close = function() {
  return "</th>";
};
I.td_open = function(s, e) {
  var t = s[e];
  return "<td" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
I.td_close = function() {
  return "</td>";
};
I.strong_open = function() {
  return "<strong>";
};
I.strong_close = function() {
  return "</strong>";
};
I.em_open = function() {
  return "<em>";
};
I.em_close = function() {
  return "</em>";
};
I.del_open = function() {
  return "<del>";
};
I.del_close = function() {
  return "</del>";
};
I.ins_open = function() {
  return "<ins>";
};
I.ins_close = function() {
  return "</ins>";
};
I.mark_open = function() {
  return "<mark>";
};
I.mark_close = function() {
  return "</mark>";
};
I.sub = function(s, e) {
  return "<sub>" + Ge(s[e].content) + "</sub>";
};
I.sup = function(s, e) {
  return "<sup>" + Ge(s[e].content) + "</sup>";
};
I.hardbreak = function(s, e, t) {
  return t.xhtmlOut ? `<br />
` : `<br>
`;
};
I.softbreak = function(s, e, t) {
  return t.breaks ? t.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
I.text = function(s, e) {
  return Ge(s[e].content);
};
I.htmlblock = function(s, e) {
  return s[e].content;
};
I.htmltag = function(s, e) {
  return s[e].content;
};
I.abbr_open = function(s, e) {
  return '<abbr title="' + Ge(cn(s[e].title)) + '">';
};
I.abbr_close = function() {
  return "</abbr>";
};
I.footnote_ref = function(s, e) {
  var t = Number(s[e].id + 1).toString(), n = "fnref" + t;
  return s[e].subId > 0 && (n += ":" + s[e].subId), '<sup class="footnote-ref"><a href="#fn' + t + '" id="' + n + '">[' + t + "]</a></sup>";
};
I.footnote_block_open = function(s, e, t) {
  var n = t.xhtmlOut ? `<hr class="footnotes-sep" />
` : `<hr class="footnotes-sep">
`;
  return n + `<section class="footnotes">
<ol class="footnotes-list">
`;
};
I.footnote_block_close = function() {
  return `</ol>
</section>
`;
};
I.footnote_open = function(s, e) {
  var t = Number(s[e].id + 1).toString();
  return '<li id="fn' + t + '"  class="footnote-item">';
};
I.footnote_close = function() {
  return `</li>
`;
};
I.footnote_anchor = function(s, e) {
  var t = Number(s[e].id + 1).toString(), n = "fnref" + t;
  return s[e].subId > 0 && (n += ":" + s[e].subId), ' <a href="#' + n + '" class="footnote-backref">↩</a>';
};
I.dl_open = function() {
  return `<dl>
`;
};
I.dt_open = function() {
  return "<dt>";
};
I.dd_open = function() {
  return "<dd>";
};
I.dl_close = function() {
  return `</dl>
`;
};
I.dt_close = function() {
  return `</dt>
`;
};
I.dd_close = function() {
  return `</dd>
`;
};
function qo(s, e) {
  return ++e >= s.length - 2 ? e : s[e].type === "paragraph_open" && s[e].tight && s[e + 1].type === "inline" && s[e + 1].content.length === 0 && s[e + 2].type === "paragraph_close" && s[e + 2].tight ? qo(s, e + 2) : e;
}
var hn = I.getBreak = function(e, t) {
  return t = qo(e, t), t < e.length && e[t].type === "list_item_close" ? "" : `
`;
};
function ar() {
  this.rules = Ho({}, I), this.getBreak = I.getBreak;
}
ar.prototype.renderInline = function(s, e, t) {
  for (var n = this.rules, i = s.length, r = 0, o = ""; i--; )
    o += n[s[r].type](s, r++, e, t, this);
  return o;
};
ar.prototype.render = function(s, e, t) {
  for (var n = this.rules, i = s.length, r = -1, o = ""; ++r < i; )
    s[r].type === "inline" ? o += this.renderInline(s[r].children, e, t) : o += n[s[r].type](s, r, e, t, this);
  return o;
};
function Xe() {
  this.__rules__ = [], this.__cache__ = null;
}
Xe.prototype.__find__ = function(s) {
  for (var e = this.__rules__.length, t = -1; e--; )
    if (this.__rules__[++t].name === s)
      return t;
  return -1;
};
Xe.prototype.__compile__ = function() {
  var s = this, e = [""];
  s.__rules__.forEach(function(t) {
    t.enabled && t.alt.forEach(function(n) {
      e.indexOf(n) < 0 && e.push(n);
    });
  }), s.__cache__ = {}, e.forEach(function(t) {
    s.__cache__[t] = [], s.__rules__.forEach(function(n) {
      n.enabled && (t && n.alt.indexOf(t) < 0 || s.__cache__[t].push(n.fn));
    });
  });
};
Xe.prototype.at = function(s, e, t) {
  var n = this.__find__(s), i = t || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + s);
  this.__rules__[n].fn = e, this.__rules__[n].alt = i.alt || [], this.__cache__ = null;
};
Xe.prototype.before = function(s, e, t, n) {
  var i = this.__find__(s), r = n || {};
  if (i === -1)
    throw new Error("Parser rule not found: " + s);
  this.__rules__.splice(i, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
Xe.prototype.after = function(s, e, t, n) {
  var i = this.__find__(s), r = n || {};
  if (i === -1)
    throw new Error("Parser rule not found: " + s);
  this.__rules__.splice(i + 1, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
Xe.prototype.push = function(s, e, t) {
  var n = t || {};
  this.__rules__.push({
    name: s,
    enabled: !0,
    fn: e,
    alt: n.alt || []
  }), this.__cache__ = null;
};
Xe.prototype.enable = function(s, e) {
  s = Array.isArray(s) ? s : [s], e && this.__rules__.forEach(function(t) {
    t.enabled = !1;
  }), s.forEach(function(t) {
    var n = this.__find__(t);
    if (n < 0)
      throw new Error("Rules manager: invalid rule name " + t);
    this.__rules__[n].enabled = !0;
  }, this), this.__cache__ = null;
};
Xe.prototype.disable = function(s) {
  s = Array.isArray(s) ? s : [s], s.forEach(function(e) {
    var t = this.__find__(e);
    if (t < 0)
      throw new Error("Rules manager: invalid rule name " + e);
    this.__rules__[t].enabled = !1;
  }, this), this.__cache__ = null;
};
Xe.prototype.getRules = function(s) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[s] || [];
};
function Va(s) {
  s.inlineMode ? s.tokens.push({
    type: "inline",
    content: s.src.replace(/\n/g, " ").trim(),
    level: 0,
    lines: [0, 1],
    children: []
  }) : s.block.parse(s.src, s.options, s.env, s.tokens);
}
function un(s, e, t, n, i) {
  this.src = s, this.env = n, this.options = t, this.parser = e, this.tokens = i, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = [], this.isInLabel = !1, this.linkLevel = 0, this.linkContent = "", this.labelUnmatchedScopes = 0;
}
un.prototype.pushPending = function() {
  this.tokens.push({
    type: "text",
    content: this.pending,
    level: this.pendingLevel
  }), this.pending = "";
};
un.prototype.push = function(s) {
  this.pending && this.pushPending(), this.tokens.push(s), this.pendingLevel = this.level;
};
un.prototype.cacheSet = function(s, e) {
  for (var t = this.cache.length; t <= s; t++)
    this.cache.push(0);
  this.cache[s] = e;
};
un.prototype.cacheGet = function(s) {
  return s < this.cache.length ? this.cache[s] : 0;
};
function Si(s, e) {
  var t, n, i, r = -1, o = s.posMax, a = s.pos, c = s.isInLabel;
  if (s.isInLabel)
    return -1;
  if (s.labelUnmatchedScopes)
    return s.labelUnmatchedScopes--, -1;
  for (s.pos = e + 1, s.isInLabel = !0, t = 1; s.pos < o; ) {
    if (i = s.src.charCodeAt(s.pos), i === 91)
      t++;
    else if (i === 93 && (t--, t === 0)) {
      n = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return n ? (r = s.pos, s.labelUnmatchedScopes = 0) : s.labelUnmatchedScopes = t - 1, s.pos = a, s.isInLabel = c, r;
}
function Wa(s, e, t, n) {
  var i, r, o, a, c, l;
  if (s.charCodeAt(0) !== 42 || s.charCodeAt(1) !== 91 || s.indexOf("]:") === -1 || (i = new un(s, e, t, n, []), r = Si(i, 1), r < 0 || s.charCodeAt(r + 1) !== 58))
    return -1;
  for (a = i.posMax, o = r + 2; o < a && i.src.charCodeAt(o) !== 10; o++)
    ;
  return c = s.slice(2, r), l = s.slice(r + 2, o).trim(), l.length === 0 ? -1 : (n.abbreviations || (n.abbreviations = {}), typeof n.abbreviations[":" + c] > "u" && (n.abbreviations[":" + c] = l), o);
}
function Ka(s) {
  var e = s.tokens, t, n, i, r;
  if (!s.inlineMode) {
    for (t = 1, n = e.length - 1; t < n; t++)
      if (e[t - 1].type === "paragraph_open" && e[t].type === "inline" && e[t + 1].type === "paragraph_close") {
        for (i = e[t].content; i.length && (r = Wa(i, s.inline, s.options, s.env), !(r < 0)); )
          i = i.slice(r).trim();
        e[t].content = i, i.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
      }
  }
}
function Us(s) {
  var e = cn(s);
  try {
    e = decodeURI(e);
  } catch {
  }
  return encodeURI(e);
}
function Go(s, e) {
  var t, n, i, r = e, o = s.posMax;
  if (s.src.charCodeAt(e) === 60) {
    for (e++; e < o; ) {
      if (t = s.src.charCodeAt(e), t === 10)
        return !1;
      if (t === 62)
        return i = Us(vi(s.src.slice(r + 1, e))), s.parser.validateLink(i) ? (s.pos = e + 1, s.linkContent = i, !0) : !1;
      if (t === 92 && e + 1 < o) {
        e += 2;
        continue;
      }
      e++;
    }
    return !1;
  }
  for (n = 0; e < o && (t = s.src.charCodeAt(e), !(t === 32 || t < 32 || t === 127)); ) {
    if (t === 92 && e + 1 < o) {
      e += 2;
      continue;
    }
    if (t === 40 && (n++, n > 1) || t === 41 && (n--, n < 0))
      break;
    e++;
  }
  return r === e || (i = vi(s.src.slice(r, e)), !s.parser.validateLink(i)) ? !1 : (s.linkContent = i, s.pos = e, !0);
}
function zo(s, e) {
  var t, n = e, i = s.posMax, r = s.src.charCodeAt(e);
  if (r !== 34 && r !== 39 && r !== 40)
    return !1;
  for (e++, r === 40 && (r = 41); e < i; ) {
    if (t = s.src.charCodeAt(e), t === r)
      return s.pos = e + 1, s.linkContent = vi(s.src.slice(n + 1, e)), !0;
    if (t === 92 && e + 1 < i) {
      e += 2;
      continue;
    }
    e++;
  }
  return !1;
}
function Vo(s) {
  return s.trim().replace(/\s+/g, " ").toUpperCase();
}
function ja(s, e, t, n) {
  var i, r, o, a, c, l, d, p, u;
  if (s.charCodeAt(0) !== 91 || s.indexOf("]:") === -1 || (i = new un(s, e, t, n, []), r = Si(i, 0), r < 0 || s.charCodeAt(r + 1) !== 58))
    return -1;
  for (a = i.posMax, o = r + 2; o < a && (c = i.src.charCodeAt(o), !(c !== 32 && c !== 10)); o++)
    ;
  if (!Go(i, o))
    return -1;
  for (d = i.linkContent, o = i.pos, l = o, o = o + 1; o < a && (c = i.src.charCodeAt(o), !(c !== 32 && c !== 10)); o++)
    ;
  for (o < a && l !== o && zo(i, o) ? (p = i.linkContent, o = i.pos) : (p = "", o = l); o < a && i.src.charCodeAt(o) === 32; )
    o++;
  return o < a && i.src.charCodeAt(o) !== 10 ? -1 : (u = Vo(s.slice(1, r)), typeof n.references[u] > "u" && (n.references[u] = { title: p, href: d }), o);
}
function Xa(s) {
  var e = s.tokens, t, n, i, r;
  if (s.env.references = s.env.references || {}, !s.inlineMode) {
    for (t = 1, n = e.length - 1; t < n; t++)
      if (e[t].type === "inline" && e[t - 1].type === "paragraph_open" && e[t + 1].type === "paragraph_close") {
        for (i = e[t].content; i.length && (r = ja(i, s.inline, s.options, s.env), !(r < 0)); )
          i = i.slice(r).trim();
        e[t].content = i, i.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
      }
  }
}
function Ya(s) {
  var e = s.tokens, t, n, i;
  for (n = 0, i = e.length; n < i; n++)
    t = e[n], t.type === "inline" && s.inline.parse(t.content, s.options, s.env, t.children);
}
function Za(s) {
  var e, t, n, i, r, o, a, c, l, d = 0, p = !1, u = {};
  if (s.env.footnotes && (s.tokens = s.tokens.filter(function(g) {
    return g.type === "footnote_reference_open" ? (p = !0, c = [], l = g.label, !1) : g.type === "footnote_reference_close" ? (p = !1, u[":" + l] = c, !1) : (p && c.push(g), !p);
  }), !!s.env.footnotes.list)) {
    for (o = s.env.footnotes.list, s.tokens.push({
      type: "footnote_block_open",
      level: d++
    }), e = 0, t = o.length; e < t; e++) {
      for (s.tokens.push({
        type: "footnote_open",
        id: e,
        level: d++
      }), o[e].tokens ? (a = [], a.push({
        type: "paragraph_open",
        tight: !1,
        level: d++
      }), a.push({
        type: "inline",
        content: "",
        level: d,
        children: o[e].tokens
      }), a.push({
        type: "paragraph_close",
        tight: !1,
        level: --d
      })) : o[e].label && (a = u[":" + o[e].label]), s.tokens = s.tokens.concat(a), s.tokens[s.tokens.length - 1].type === "paragraph_close" ? r = s.tokens.pop() : r = null, i = o[e].count > 0 ? o[e].count : 1, n = 0; n < i; n++)
        s.tokens.push({
          type: "footnote_anchor",
          id: e,
          subId: n,
          level: d
        });
      r && s.tokens.push(r), s.tokens.push({
        type: "footnote_close",
        level: --d
      });
    }
    s.tokens.push({
      type: "footnote_block_close",
      level: --d
    });
  }
}
var Hr = ` 
()[]'".,!?-`;
function Ms(s) {
  return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1");
}
function Ja(s) {
  var e, t, n, i, r, o, a, c, l, d, p, u, g = s.tokens;
  if (s.env.abbreviations) {
    for (s.env.abbrRegExp || (u = "(^|[" + Hr.split("").map(Ms).join("") + "])(" + Object.keys(s.env.abbreviations).map(function(_) {
      return _.substr(1);
    }).sort(function(_, y) {
      return y.length - _.length;
    }).map(Ms).join("|") + ")($|[" + Hr.split("").map(Ms).join("") + "])", s.env.abbrRegExp = new RegExp(u, "g")), d = s.env.abbrRegExp, t = 0, n = g.length; t < n; t++)
      if (g[t].type === "inline") {
        for (i = g[t].children, e = i.length - 1; e >= 0; e--)
          if (r = i[e], r.type === "text") {
            for (c = 0, o = r.content, d.lastIndex = 0, l = r.level, a = []; p = d.exec(o); )
              d.lastIndex > c && a.push({
                type: "text",
                content: o.slice(c, p.index + p[1].length),
                level: l
              }), a.push({
                type: "abbr_open",
                title: s.env.abbreviations[":" + p[2]],
                level: l++
              }), a.push({
                type: "text",
                content: p[2],
                level: l
              }), a.push({
                type: "abbr_close",
                level: --l
              }), c = d.lastIndex - p[3].length;
            a.length && (c < o.length && a.push({
              type: "text",
              content: o.slice(c),
              level: l
            }), g[t].children = i = [].concat(i.slice(0, e), a, i.slice(e + 1)));
          }
      }
  }
}
var Qa = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, ec = /\((c|tm|r|p)\)/ig, tc = {
  c: "©",
  r: "®",
  p: "§",
  tm: "™"
};
function nc(s) {
  return s.indexOf("(") < 0 ? s : s.replace(ec, function(e, t) {
    return tc[t.toLowerCase()];
  });
}
function ic(s) {
  var e, t, n, i, r;
  if (s.options.typographer) {
    for (r = s.tokens.length - 1; r >= 0; r--)
      if (s.tokens[r].type === "inline")
        for (i = s.tokens[r].children, e = i.length - 1; e >= 0; e--)
          t = i[e], t.type === "text" && (n = t.content, n = nc(n), Qa.test(n) && (n = n.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/mg, "$1—$2").replace(/(^|\s)--(\s|$)/mg, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/mg, "$1–$2")), t.content = n);
  }
}
var sc = /['"]/, $r = /['"]/g, rc = /[-\s()\[\]]/, qr = "’";
function Gr(s, e) {
  return e < 0 || e >= s.length ? !1 : !rc.test(s[e]);
}
function mn(s, e, t) {
  return s.substr(0, e) + t + s.substr(e + 1);
}
function oc(s) {
  var e, t, n, i, r, o, a, c, l, d, p, u, g, _, y, S, M;
  if (s.options.typographer) {
    for (M = [], y = s.tokens.length - 1; y >= 0; y--)
      if (s.tokens[y].type === "inline") {
        for (S = s.tokens[y].children, M.length = 0, e = 0; e < S.length; e++)
          if (t = S[e], !(t.type !== "text" || sc.test(t.text))) {
            for (a = S[e].level, g = M.length - 1; g >= 0 && !(M[g].level <= a); g--)
              ;
            M.length = g + 1, n = t.content, r = 0, o = n.length;
            e:
              for (; r < o && ($r.lastIndex = r, i = $r.exec(n), !!i); ) {
                if (c = !Gr(n, i.index - 1), r = i.index + 1, _ = i[0] === "'", l = !Gr(n, r), !l && !c) {
                  _ && (t.content = mn(t.content, i.index, qr));
                  continue;
                }
                if (p = !l, u = !c, u) {
                  for (g = M.length - 1; g >= 0 && (d = M[g], !(M[g].level < a)); g--)
                    if (d.single === _ && M[g].level === a) {
                      d = M[g], _ ? (S[d.token].content = mn(S[d.token].content, d.pos, s.options.quotes[2]), t.content = mn(t.content, i.index, s.options.quotes[3])) : (S[d.token].content = mn(S[d.token].content, d.pos, s.options.quotes[0]), t.content = mn(t.content, i.index, s.options.quotes[1])), M.length = g;
                      continue e;
                    }
                }
                p ? M.push({
                  token: e,
                  pos: i.index,
                  single: _,
                  level: a
                }) : u && _ && (t.content = mn(t.content, i.index, qr));
              }
          }
      }
  }
}
var ks = [
  ["block", Va],
  ["abbr", Ka],
  ["references", Xa],
  ["inline", Ya],
  ["footnote_tail", Za],
  ["abbr2", Ja],
  ["replacements", ic],
  ["smartquotes", oc]
];
function Wo() {
  this.options = {}, this.ruler = new Xe();
  for (var s = 0; s < ks.length; s++)
    this.ruler.push(ks[s][0], ks[s][1]);
}
Wo.prototype.process = function(s) {
  var e, t, n;
  for (n = this.ruler.getRules(""), e = 0, t = n.length; e < t; e++)
    n[e](s);
};
function pn(s, e, t, n, i) {
  var r, o, a, c, l, d, p;
  for (this.src = s, this.parser = e, this.options = t, this.env = n, this.tokens = i, this.bMarks = [], this.eMarks = [], this.tShift = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, this.level = 0, this.result = "", o = this.src, d = 0, p = !1, a = c = d = 0, l = o.length; c < l; c++) {
    if (r = o.charCodeAt(c), !p)
      if (r === 32) {
        d++;
        continue;
      } else
        p = !0;
    (r === 10 || c === l - 1) && (r !== 10 && c++, this.bMarks.push(a), this.eMarks.push(c), this.tShift.push(d), p = !1, d = 0, a = c + 1);
  }
  this.bMarks.push(o.length), this.eMarks.push(o.length), this.tShift.push(0), this.lineMax = this.bMarks.length - 1;
}
pn.prototype.isEmpty = function(e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
pn.prototype.skipEmptyLines = function(e) {
  for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
    ;
  return e;
};
pn.prototype.skipSpaces = function(e) {
  for (var t = this.src.length; e < t && this.src.charCodeAt(e) === 32; e++)
    ;
  return e;
};
pn.prototype.skipChars = function(e, t) {
  for (var n = this.src.length; e < n && this.src.charCodeAt(e) === t; e++)
    ;
  return e;
};
pn.prototype.skipCharsBack = function(e, t, n) {
  if (e <= n)
    return e;
  for (; e > n; )
    if (t !== this.src.charCodeAt(--e))
      return e + 1;
  return e;
};
pn.prototype.getLines = function(e, t, n, i) {
  var r, o, a, c, l, d = e;
  if (e >= t)
    return "";
  if (d + 1 === t)
    return o = this.bMarks[d] + Math.min(this.tShift[d], n), a = i ? this.eMarks[d] + 1 : this.eMarks[d], this.src.slice(o, a);
  for (c = new Array(t - e), r = 0; d < t; d++, r++)
    l = this.tShift[d], l > n && (l = n), l < 0 && (l = 0), o = this.bMarks[d] + l, d + 1 < t || i ? a = this.eMarks[d] + 1 : a = this.eMarks[d], c[r] = this.src.slice(o, a);
  return c.join("");
};
function ac(s, e, t) {
  var n, i;
  if (s.tShift[e] - s.blkIndent < 4)
    return !1;
  for (i = n = e + 1; n < t; ) {
    if (s.isEmpty(n)) {
      n++;
      continue;
    }
    if (s.tShift[n] - s.blkIndent >= 4) {
      n++, i = n;
      continue;
    }
    break;
  }
  return s.line = n, s.tokens.push({
    type: "code",
    content: s.getLines(e, i, 4 + s.blkIndent, !0),
    block: !0,
    lines: [e, s.line],
    level: s.level
  }), !0;
}
function cc(s, e, t, n) {
  var i, r, o, a, c, l = !1, d = s.bMarks[e] + s.tShift[e], p = s.eMarks[e];
  if (d + 3 > p || (i = s.src.charCodeAt(d), i !== 126 && i !== 96) || (c = d, d = s.skipChars(d, i), r = d - c, r < 3) || (o = s.src.slice(d, p).trim(), o.indexOf("`") >= 0))
    return !1;
  if (n)
    return !0;
  for (a = e; a++, !(a >= t || (d = c = s.bMarks[a] + s.tShift[a], p = s.eMarks[a], d < p && s.tShift[a] < s.blkIndent)); )
    if (s.src.charCodeAt(d) === i && !(s.tShift[a] - s.blkIndent >= 4) && (d = s.skipChars(d, i), !(d - c < r) && (d = s.skipSpaces(d), !(d < p)))) {
      l = !0;
      break;
    }
  return r = s.tShift[e], s.line = a + (l ? 1 : 0), s.tokens.push({
    type: "fence",
    params: o,
    content: s.getLines(e + 1, a, r, !0),
    lines: [e, s.line],
    level: s.level
  }), !0;
}
function lc(s, e, t, n) {
  var i, r, o, a, c, l, d, p, u, g, _, y = s.bMarks[e] + s.tShift[e], S = s.eMarks[e];
  if (y > S || s.src.charCodeAt(y++) !== 62 || s.level >= s.options.maxNesting)
    return !1;
  if (n)
    return !0;
  for (s.src.charCodeAt(y) === 32 && y++, c = s.blkIndent, s.blkIndent = 0, a = [s.bMarks[e]], s.bMarks[e] = y, y = y < S ? s.skipSpaces(y) : y, r = y >= S, o = [s.tShift[e]], s.tShift[e] = y - s.bMarks[e], p = s.parser.ruler.getRules("blockquote"), i = e + 1; i < t && (y = s.bMarks[i] + s.tShift[i], S = s.eMarks[i], !(y >= S)); i++) {
    if (s.src.charCodeAt(y++) === 62) {
      s.src.charCodeAt(y) === 32 && y++, a.push(s.bMarks[i]), s.bMarks[i] = y, y = y < S ? s.skipSpaces(y) : y, r = y >= S, o.push(s.tShift[i]), s.tShift[i] = y - s.bMarks[i];
      continue;
    }
    if (r)
      break;
    for (_ = !1, u = 0, g = p.length; u < g; u++)
      if (p[u](s, i, t, !0)) {
        _ = !0;
        break;
      }
    if (_)
      break;
    a.push(s.bMarks[i]), o.push(s.tShift[i]), s.tShift[i] = -1337;
  }
  for (l = s.parentType, s.parentType = "blockquote", s.tokens.push({
    type: "blockquote_open",
    lines: d = [e, 0],
    level: s.level++
  }), s.parser.tokenize(s, e, i), s.tokens.push({
    type: "blockquote_close",
    level: --s.level
  }), s.parentType = l, d[1] = s.line, u = 0; u < o.length; u++)
    s.bMarks[u + e] = a[u], s.tShift[u + e] = o[u];
  return s.blkIndent = c, !0;
}
function dc(s, e, t, n) {
  var i, r, o, a = s.bMarks[e], c = s.eMarks[e];
  if (a += s.tShift[e], a > c || (i = s.src.charCodeAt(a++), i !== 42 && i !== 45 && i !== 95))
    return !1;
  for (r = 1; a < c; ) {
    if (o = s.src.charCodeAt(a++), o !== i && o !== 32)
      return !1;
    o === i && r++;
  }
  return r < 3 ? !1 : (n || (s.line = e + 1, s.tokens.push({
    type: "hr",
    lines: [e, s.line],
    level: s.level
  })), !0);
}
function zr(s, e) {
  var t, n, i;
  return n = s.bMarks[e] + s.tShift[e], i = s.eMarks[e], n >= i || (t = s.src.charCodeAt(n++), t !== 42 && t !== 45 && t !== 43) || n < i && s.src.charCodeAt(n) !== 32 ? -1 : n;
}
function Vr(s, e) {
  var t, n = s.bMarks[e] + s.tShift[e], i = s.eMarks[e];
  if (n + 1 >= i || (t = s.src.charCodeAt(n++), t < 48 || t > 57))
    return -1;
  for (; ; ) {
    if (n >= i)
      return -1;
    if (t = s.src.charCodeAt(n++), !(t >= 48 && t <= 57)) {
      if (t === 41 || t === 46)
        break;
      return -1;
    }
  }
  return n < i && s.src.charCodeAt(n) !== 32 ? -1 : n;
}
function hc(s, e) {
  var t, n, i = s.level + 2;
  for (t = e + 2, n = s.tokens.length - 2; t < n; t++)
    s.tokens[t].level === i && s.tokens[t].type === "paragraph_open" && (s.tokens[t + 2].tight = !0, s.tokens[t].tight = !0, t += 2);
}
function uc(s, e, t, n) {
  var i, r, o, a, c, l, d, p, u, g, _, y, S, M, K, ie, se, Te, Pt = !0, Lt, Ve, Mr, Ts;
  if ((p = Vr(s, e)) >= 0)
    S = !0;
  else if ((p = zr(s, e)) >= 0)
    S = !1;
  else
    return !1;
  if (s.level >= s.options.maxNesting)
    return !1;
  if (y = s.src.charCodeAt(p - 1), n)
    return !0;
  for (K = s.tokens.length, S ? (d = s.bMarks[e] + s.tShift[e], _ = Number(s.src.substr(d, p - d - 1)), s.tokens.push({
    type: "ordered_list_open",
    order: _,
    lines: se = [e, 0],
    level: s.level++
  })) : s.tokens.push({
    type: "bullet_list_open",
    lines: se = [e, 0],
    level: s.level++
  }), i = e, ie = !1, Lt = s.parser.ruler.getRules("list"); i < t && (M = s.skipSpaces(p), u = s.eMarks[i], M >= u ? g = 1 : g = M - p, g > 4 && (g = 1), g < 1 && (g = 1), r = p - s.bMarks[i] + g, s.tokens.push({
    type: "list_item_open",
    lines: Te = [e, 0],
    level: s.level++
  }), a = s.blkIndent, c = s.tight, o = s.tShift[e], l = s.parentType, s.tShift[e] = M - s.bMarks[e], s.blkIndent = r, s.tight = !0, s.parentType = "list", s.parser.tokenize(s, e, t, !0), (!s.tight || ie) && (Pt = !1), ie = s.line - e > 1 && s.isEmpty(s.line - 1), s.blkIndent = a, s.tShift[e] = o, s.tight = c, s.parentType = l, s.tokens.push({
    type: "list_item_close",
    level: --s.level
  }), i = e = s.line, Te[1] = i, M = s.bMarks[e], !(i >= t || s.isEmpty(i) || s.tShift[i] < s.blkIndent)); ) {
    for (Ts = !1, Ve = 0, Mr = Lt.length; Ve < Mr; Ve++)
      if (Lt[Ve](s, i, t, !0)) {
        Ts = !0;
        break;
      }
    if (Ts)
      break;
    if (S) {
      if (p = Vr(s, i), p < 0)
        break;
    } else if (p = zr(s, i), p < 0)
      break;
    if (y !== s.src.charCodeAt(p - 1))
      break;
  }
  return s.tokens.push({
    type: S ? "ordered_list_close" : "bullet_list_close",
    level: --s.level
  }), se[1] = i, s.line = i, Pt && hc(s, K), !0;
}
function pc(s, e, t, n) {
  var i, r, o, a, c, l = s.bMarks[e] + s.tShift[e], d = s.eMarks[e];
  if (l + 4 > d || s.src.charCodeAt(l) !== 91 || s.src.charCodeAt(l + 1) !== 94 || s.level >= s.options.maxNesting)
    return !1;
  for (a = l + 2; a < d; a++) {
    if (s.src.charCodeAt(a) === 32)
      return !1;
    if (s.src.charCodeAt(a) === 93)
      break;
  }
  return a === l + 2 || a + 1 >= d || s.src.charCodeAt(++a) !== 58 ? !1 : (n || (a++, s.env.footnotes || (s.env.footnotes = {}), s.env.footnotes.refs || (s.env.footnotes.refs = {}), c = s.src.slice(l + 2, a - 2), s.env.footnotes.refs[":" + c] = -1, s.tokens.push({
    type: "footnote_reference_open",
    label: c,
    level: s.level++
  }), i = s.bMarks[e], r = s.tShift[e], o = s.parentType, s.tShift[e] = s.skipSpaces(a) - a, s.bMarks[e] = a, s.blkIndent += 4, s.parentType = "footnote", s.tShift[e] < s.blkIndent && (s.tShift[e] += s.blkIndent, s.bMarks[e] -= s.blkIndent), s.parser.tokenize(s, e, t, !0), s.parentType = o, s.blkIndent -= 4, s.tShift[e] = r, s.bMarks[e] = i, s.tokens.push({
    type: "footnote_reference_close",
    level: --s.level
  })), !0);
}
function fc(s, e, t, n) {
  var i, r, o, a = s.bMarks[e] + s.tShift[e], c = s.eMarks[e];
  if (a >= c || (i = s.src.charCodeAt(a), i !== 35 || a >= c))
    return !1;
  for (r = 1, i = s.src.charCodeAt(++a); i === 35 && a < c && r <= 6; )
    r++, i = s.src.charCodeAt(++a);
  return r > 6 || a < c && i !== 32 ? !1 : (n || (c = s.skipCharsBack(c, 32, a), o = s.skipCharsBack(c, 35, a), o > a && s.src.charCodeAt(o - 1) === 32 && (c = o), s.line = e + 1, s.tokens.push({
    type: "heading_open",
    hLevel: r,
    lines: [e, s.line],
    level: s.level
  }), a < c && s.tokens.push({
    type: "inline",
    content: s.src.slice(a, c).trim(),
    level: s.level + 1,
    lines: [e, s.line],
    children: []
  }), s.tokens.push({ type: "heading_close", hLevel: r, level: s.level })), !0);
}
function mc(s, e, t) {
  var n, i, r, o = e + 1;
  return o >= t || s.tShift[o] < s.blkIndent || s.tShift[o] - s.blkIndent > 3 || (i = s.bMarks[o] + s.tShift[o], r = s.eMarks[o], i >= r) || (n = s.src.charCodeAt(i), n !== 45 && n !== 61) || (i = s.skipChars(i, n), i = s.skipSpaces(i), i < r) ? !1 : (i = s.bMarks[e] + s.tShift[e], s.line = o + 1, s.tokens.push({
    type: "heading_open",
    hLevel: n === 61 ? 1 : 2,
    lines: [e, s.line],
    level: s.level
  }), s.tokens.push({
    type: "inline",
    content: s.src.slice(i, s.eMarks[e]).trim(),
    level: s.level + 1,
    lines: [e, s.line - 1],
    children: []
  }), s.tokens.push({
    type: "heading_close",
    hLevel: n === 61 ? 1 : 2,
    level: s.level
  }), !0);
}
var Ko = {};
[
  "article",
  "aside",
  "button",
  "blockquote",
  "body",
  "canvas",
  "caption",
  "col",
  "colgroup",
  "dd",
  "div",
  "dl",
  "dt",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "iframe",
  "li",
  "map",
  "object",
  "ol",
  "output",
  "p",
  "pre",
  "progress",
  "script",
  "section",
  "style",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "tr",
  "thead",
  "ul",
  "video"
].forEach(function(s) {
  Ko[s] = !0;
});
var gc = /^<([a-zA-Z]{1,15})[\s\/>]/, bc = /^<\/([a-zA-Z]{1,15})[\s>]/;
function _c(s) {
  var e = s | 32;
  return e >= 97 && e <= 122;
}
function yc(s, e, t, n) {
  var i, r, o, a = s.bMarks[e], c = s.eMarks[e], l = s.tShift[e];
  if (a += l, !s.options.html || l > 3 || a + 2 >= c || s.src.charCodeAt(a) !== 60)
    return !1;
  if (i = s.src.charCodeAt(a + 1), i === 33 || i === 63) {
    if (n)
      return !0;
  } else if (i === 47 || _c(i)) {
    if (i === 47) {
      if (r = s.src.slice(a, c).match(bc), !r)
        return !1;
    } else if (r = s.src.slice(a, c).match(gc), !r)
      return !1;
    if (Ko[r[1].toLowerCase()] !== !0)
      return !1;
    if (n)
      return !0;
  } else
    return !1;
  for (o = e + 1; o < s.lineMax && !s.isEmpty(o); )
    o++;
  return s.line = o, s.tokens.push({
    type: "htmlblock",
    level: s.level,
    lines: [e, s.line],
    content: s.getLines(e, o, 0, !0)
  }), !0;
}
function Ps(s, e) {
  var t = s.bMarks[e] + s.blkIndent, n = s.eMarks[e];
  return s.src.substr(t, n - t);
}
function Ec(s, e, t, n) {
  var i, r, o, a, c, l, d, p, u, g, _;
  if (e + 2 > t || (c = e + 1, s.tShift[c] < s.blkIndent) || (o = s.bMarks[c] + s.tShift[c], o >= s.eMarks[c]) || (i = s.src.charCodeAt(o), i !== 124 && i !== 45 && i !== 58) || (r = Ps(s, e + 1), !/^[-:| ]+$/.test(r)) || (l = r.split("|"), l <= 2))
    return !1;
  for (p = [], a = 0; a < l.length; a++) {
    if (u = l[a].trim(), !u) {
      if (a === 0 || a === l.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(u))
      return !1;
    u.charCodeAt(u.length - 1) === 58 ? p.push(u.charCodeAt(0) === 58 ? "center" : "right") : u.charCodeAt(0) === 58 ? p.push("left") : p.push("");
  }
  if (r = Ps(s, e).trim(), r.indexOf("|") === -1 || (l = r.replace(/^\||\|$/g, "").split("|"), p.length !== l.length))
    return !1;
  if (n)
    return !0;
  for (s.tokens.push({
    type: "table_open",
    lines: g = [e, 0],
    level: s.level++
  }), s.tokens.push({
    type: "thead_open",
    lines: [e, e + 1],
    level: s.level++
  }), s.tokens.push({
    type: "tr_open",
    lines: [e, e + 1],
    level: s.level++
  }), a = 0; a < l.length; a++)
    s.tokens.push({
      type: "th_open",
      align: p[a],
      lines: [e, e + 1],
      level: s.level++
    }), s.tokens.push({
      type: "inline",
      content: l[a].trim(),
      lines: [e, e + 1],
      level: s.level,
      children: []
    }), s.tokens.push({ type: "th_close", level: --s.level });
  for (s.tokens.push({ type: "tr_close", level: --s.level }), s.tokens.push({ type: "thead_close", level: --s.level }), s.tokens.push({
    type: "tbody_open",
    lines: _ = [e + 2, 0],
    level: s.level++
  }), c = e + 2; c < t && !(s.tShift[c] < s.blkIndent || (r = Ps(s, c).trim(), r.indexOf("|") === -1)); c++) {
    for (l = r.replace(/^\||\|$/g, "").split("|"), s.tokens.push({ type: "tr_open", level: s.level++ }), a = 0; a < l.length; a++)
      s.tokens.push({ type: "td_open", align: p[a], level: s.level++ }), d = l[a].substring(
        l[a].charCodeAt(0) === 124 ? 1 : 0,
        l[a].charCodeAt(l[a].length - 1) === 124 ? l[a].length - 1 : l[a].length
      ).trim(), s.tokens.push({
        type: "inline",
        content: d,
        level: s.level,
        children: []
      }), s.tokens.push({ type: "td_close", level: --s.level });
    s.tokens.push({ type: "tr_close", level: --s.level });
  }
  return s.tokens.push({ type: "tbody_close", level: --s.level }), s.tokens.push({ type: "table_close", level: --s.level }), g[1] = _[1] = c, s.line = c, !0;
}
function Bi(s, e) {
  var t, n, i = s.bMarks[e] + s.tShift[e], r = s.eMarks[e];
  return i >= r || (n = s.src.charCodeAt(i++), n !== 126 && n !== 58) || (t = s.skipSpaces(i), i === t) || t >= r ? -1 : t;
}
function vc(s, e) {
  var t, n, i = s.level + 2;
  for (t = e + 2, n = s.tokens.length - 2; t < n; t++)
    s.tokens[t].level === i && s.tokens[t].type === "paragraph_open" && (s.tokens[t + 2].tight = !0, s.tokens[t].tight = !0, t += 2);
}
function Sc(s, e, t, n) {
  var i, r, o, a, c, l, d, p, u, g, _, y, S, M;
  if (n)
    return s.ddIndent < 0 ? !1 : Bi(s, e) >= 0;
  if (d = e + 1, s.isEmpty(d) && ++d > t || s.tShift[d] < s.blkIndent || (i = Bi(s, d), i < 0) || s.level >= s.options.maxNesting)
    return !1;
  l = s.tokens.length, s.tokens.push({
    type: "dl_open",
    lines: c = [e, 0],
    level: s.level++
  }), o = e, r = d;
  e:
    for (; ; ) {
      for (M = !0, S = !1, s.tokens.push({
        type: "dt_open",
        lines: [o, o],
        level: s.level++
      }), s.tokens.push({
        type: "inline",
        content: s.getLines(o, o + 1, s.blkIndent, !1).trim(),
        level: s.level + 1,
        lines: [o, o],
        children: []
      }), s.tokens.push({
        type: "dt_close",
        level: --s.level
      }); ; ) {
        if (s.tokens.push({
          type: "dd_open",
          lines: a = [d, 0],
          level: s.level++
        }), y = s.tight, u = s.ddIndent, p = s.blkIndent, _ = s.tShift[r], g = s.parentType, s.blkIndent = s.ddIndent = s.tShift[r] + 2, s.tShift[r] = i - s.bMarks[r], s.tight = !0, s.parentType = "deflist", s.parser.tokenize(s, r, t, !0), (!s.tight || S) && (M = !1), S = s.line - r > 1 && s.isEmpty(s.line - 1), s.tShift[r] = _, s.tight = y, s.parentType = g, s.blkIndent = p, s.ddIndent = u, s.tokens.push({
          type: "dd_close",
          level: --s.level
        }), a[1] = d = s.line, d >= t || s.tShift[d] < s.blkIndent)
          break e;
        if (i = Bi(s, d), i < 0)
          break;
        r = d;
      }
      if (d >= t || (o = d, s.isEmpty(o)) || s.tShift[o] < s.blkIndent || (r = o + 1, r >= t) || (s.isEmpty(r) && r++, r >= t) || s.tShift[r] < s.blkIndent || (i = Bi(s, r), i < 0))
        break;
    }
  return s.tokens.push({
    type: "dl_close",
    level: --s.level
  }), c[1] = d, s.line = d, M && vc(s, l), !0;
}
function Cc(s, e) {
  var t, n, i, r, o, a = e + 1, c;
  if (t = s.lineMax, a < t && !s.isEmpty(a)) {
    for (c = s.parser.ruler.getRules("paragraph"); a < t && !s.isEmpty(a); a++)
      if (!(s.tShift[a] - s.blkIndent > 3)) {
        for (i = !1, r = 0, o = c.length; r < o; r++)
          if (c[r](s, a, t, !0)) {
            i = !0;
            break;
          }
        if (i)
          break;
      }
  }
  return n = s.getLines(e, a, s.blkIndent, !1).trim(), s.line = a, n.length && (s.tokens.push({
    type: "paragraph_open",
    tight: !1,
    lines: [e, s.line],
    level: s.level
  }), s.tokens.push({
    type: "inline",
    content: n,
    level: s.level + 1,
    lines: [e, s.line],
    children: []
  }), s.tokens.push({
    type: "paragraph_close",
    tight: !1,
    level: s.level
  })), !0;
}
var Di = [
  ["code", ac],
  ["fences", cc, ["paragraph", "blockquote", "list"]],
  ["blockquote", lc, ["paragraph", "blockquote", "list"]],
  ["hr", dc, ["paragraph", "blockquote", "list"]],
  ["list", uc, ["paragraph", "blockquote"]],
  ["footnote", pc, ["paragraph"]],
  ["heading", fc, ["paragraph", "blockquote"]],
  ["lheading", mc],
  ["htmlblock", yc, ["paragraph", "blockquote"]],
  ["table", Ec, ["paragraph"]],
  ["deflist", Sc, ["paragraph"]],
  ["paragraph", Cc]
];
function cr() {
  this.ruler = new Xe();
  for (var s = 0; s < Di.length; s++)
    this.ruler.push(Di[s][0], Di[s][1], {
      alt: (Di[s][2] || []).slice()
    });
}
cr.prototype.tokenize = function(s, e, t) {
  for (var n = this.ruler.getRules(""), i = n.length, r = e, o = !1, a, c; r < t && (s.line = r = s.skipEmptyLines(r), !(r >= t || s.tShift[r] < s.blkIndent)); ) {
    for (c = 0; c < i && (a = n[c](s, r, t, !1), !a); c++)
      ;
    if (s.tight = !o, s.isEmpty(s.line - 1) && (o = !0), r = s.line, r < t && s.isEmpty(r)) {
      if (o = !0, r++, r < t && s.parentType === "list" && s.isEmpty(r))
        break;
      s.line = r;
    }
  }
};
var xc = /[\n\t]/g, wc = /\r[\n\u0085]|[\u2424\u2028\u0085]/g, Ac = /\u00a0/g;
cr.prototype.parse = function(s, e, t, n) {
  var i, r = 0, o = 0;
  if (!s)
    return [];
  s = s.replace(Ac, " "), s = s.replace(wc, `
`), s.indexOf("	") >= 0 && (s = s.replace(xc, function(a, c) {
    var l;
    return s.charCodeAt(c) === 10 ? (r = c + 1, o = 0, a) : (l = "    ".slice((c - r - o) % 4), o = c - r + 1, l);
  })), i = new pn(s, this, e, t, n), this.tokenize(i, i.line, i.lineMax);
};
function Tc(s) {
  switch (s) {
    case 10:
    case 92:
    case 96:
    case 42:
    case 95:
    case 94:
    case 91:
    case 93:
    case 33:
    case 38:
    case 60:
    case 62:
    case 123:
    case 125:
    case 36:
    case 37:
    case 64:
    case 126:
    case 43:
    case 61:
    case 58:
      return !0;
    default:
      return !1;
  }
}
function Rc(s, e) {
  for (var t = s.pos; t < s.posMax && !Tc(s.src.charCodeAt(t)); )
    t++;
  return t === s.pos ? !1 : (e || (s.pending += s.src.slice(s.pos, t)), s.pos = t, !0);
}
function Ic(s, e) {
  var t, n, i = s.pos;
  if (s.src.charCodeAt(i) !== 10)
    return !1;
  if (t = s.pending.length - 1, n = s.posMax, !e)
    if (t >= 0 && s.pending.charCodeAt(t) === 32)
      if (t >= 1 && s.pending.charCodeAt(t - 1) === 32) {
        for (var r = t - 2; r >= 0; r--)
          if (s.pending.charCodeAt(r) !== 32) {
            s.pending = s.pending.substring(0, r + 1);
            break;
          }
        s.push({
          type: "hardbreak",
          level: s.level
        });
      } else
        s.pending = s.pending.slice(0, -1), s.push({
          type: "softbreak",
          level: s.level
        });
    else
      s.push({
        type: "softbreak",
        level: s.level
      });
  for (i++; i < n && s.src.charCodeAt(i) === 32; )
    i++;
  return s.pos = i, !0;
}
var lr = [];
for (var Wr = 0; Wr < 256; Wr++)
  lr.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(s) {
  lr[s.charCodeAt(0)] = 1;
});
function Mc(s, e) {
  var t, n = s.pos, i = s.posMax;
  if (s.src.charCodeAt(n) !== 92)
    return !1;
  if (n++, n < i) {
    if (t = s.src.charCodeAt(n), t < 256 && lr[t] !== 0)
      return e || (s.pending += s.src[n]), s.pos += 2, !0;
    if (t === 10) {
      for (e || s.push({
        type: "hardbreak",
        level: s.level
      }), n++; n < i && s.src.charCodeAt(n) === 32; )
        n++;
      return s.pos = n, !0;
    }
  }
  return e || (s.pending += "\\"), s.pos++, !0;
}
function kc(s, e) {
  var t, n, i, r, o, a = s.pos, c = s.src.charCodeAt(a);
  if (c !== 96)
    return !1;
  for (t = a, a++, n = s.posMax; a < n && s.src.charCodeAt(a) === 96; )
    a++;
  for (i = s.src.slice(t, a), r = o = a; (r = s.src.indexOf("`", o)) !== -1; ) {
    for (o = r + 1; o < n && s.src.charCodeAt(o) === 96; )
      o++;
    if (o - r === i.length)
      return e || s.push({
        type: "code",
        content: s.src.slice(a, r).replace(/[ \n]+/g, " ").trim(),
        block: !1,
        level: s.level
      }), s.pos = o, !0;
  }
  return e || (s.pending += i), s.pos += i.length, !0;
}
function Pc(s, e) {
  var t, n, i, r = s.posMax, o = s.pos, a, c;
  if (s.src.charCodeAt(o) !== 126 || e || o + 4 >= r || s.src.charCodeAt(o + 1) !== 126 || s.level >= s.options.maxNesting || (a = o > 0 ? s.src.charCodeAt(o - 1) : -1, c = s.src.charCodeAt(o + 2), a === 126) || c === 126 || c === 32 || c === 10)
    return !1;
  for (n = o + 2; n < r && s.src.charCodeAt(n) === 126; )
    n++;
  if (n > o + 3)
    return s.pos += n - o, e || (s.pending += s.src.slice(o, n)), !0;
  for (s.pos = o + 2, i = 1; s.pos + 1 < r; ) {
    if (s.src.charCodeAt(s.pos) === 126 && s.src.charCodeAt(s.pos + 1) === 126 && (a = s.src.charCodeAt(s.pos - 1), c = s.pos + 2 < r ? s.src.charCodeAt(s.pos + 2) : -1, c !== 126 && a !== 126 && (a !== 32 && a !== 10 ? i-- : c !== 32 && c !== 10 && i++, i <= 0))) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return t ? (s.posMax = s.pos, s.pos = o + 2, e || (s.push({ type: "del_open", level: s.level++ }), s.parser.tokenize(s), s.push({ type: "del_close", level: --s.level })), s.pos = s.posMax + 2, s.posMax = r, !0) : (s.pos = o, !1);
}
function Lc(s, e) {
  var t, n, i, r = s.posMax, o = s.pos, a, c;
  if (s.src.charCodeAt(o) !== 43 || e || o + 4 >= r || s.src.charCodeAt(o + 1) !== 43 || s.level >= s.options.maxNesting || (a = o > 0 ? s.src.charCodeAt(o - 1) : -1, c = s.src.charCodeAt(o + 2), a === 43) || c === 43 || c === 32 || c === 10)
    return !1;
  for (n = o + 2; n < r && s.src.charCodeAt(n) === 43; )
    n++;
  if (n !== o + 2)
    return s.pos += n - o, e || (s.pending += s.src.slice(o, n)), !0;
  for (s.pos = o + 2, i = 1; s.pos + 1 < r; ) {
    if (s.src.charCodeAt(s.pos) === 43 && s.src.charCodeAt(s.pos + 1) === 43 && (a = s.src.charCodeAt(s.pos - 1), c = s.pos + 2 < r ? s.src.charCodeAt(s.pos + 2) : -1, c !== 43 && a !== 43 && (a !== 32 && a !== 10 ? i-- : c !== 32 && c !== 10 && i++, i <= 0))) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return t ? (s.posMax = s.pos, s.pos = o + 2, e || (s.push({ type: "ins_open", level: s.level++ }), s.parser.tokenize(s), s.push({ type: "ins_close", level: --s.level })), s.pos = s.posMax + 2, s.posMax = r, !0) : (s.pos = o, !1);
}
function Oc(s, e) {
  var t, n, i, r = s.posMax, o = s.pos, a, c;
  if (s.src.charCodeAt(o) !== 61 || e || o + 4 >= r || s.src.charCodeAt(o + 1) !== 61 || s.level >= s.options.maxNesting || (a = o > 0 ? s.src.charCodeAt(o - 1) : -1, c = s.src.charCodeAt(o + 2), a === 61) || c === 61 || c === 32 || c === 10)
    return !1;
  for (n = o + 2; n < r && s.src.charCodeAt(n) === 61; )
    n++;
  if (n !== o + 2)
    return s.pos += n - o, e || (s.pending += s.src.slice(o, n)), !0;
  for (s.pos = o + 2, i = 1; s.pos + 1 < r; ) {
    if (s.src.charCodeAt(s.pos) === 61 && s.src.charCodeAt(s.pos + 1) === 61 && (a = s.src.charCodeAt(s.pos - 1), c = s.pos + 2 < r ? s.src.charCodeAt(s.pos + 2) : -1, c !== 61 && a !== 61 && (a !== 32 && a !== 10 ? i-- : c !== 32 && c !== 10 && i++, i <= 0))) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return t ? (s.posMax = s.pos, s.pos = o + 2, e || (s.push({ type: "mark_open", level: s.level++ }), s.parser.tokenize(s), s.push({ type: "mark_close", level: --s.level })), s.pos = s.posMax + 2, s.posMax = r, !0) : (s.pos = o, !1);
}
function Kr(s) {
  return s >= 48 && s <= 57 || s >= 65 && s <= 90 || s >= 97 && s <= 122;
}
function jr(s, e) {
  var t = e, n, i, r, o = !0, a = !0, c = s.posMax, l = s.src.charCodeAt(e);
  for (n = e > 0 ? s.src.charCodeAt(e - 1) : -1; t < c && s.src.charCodeAt(t) === l; )
    t++;
  return t >= c && (o = !1), r = t - e, r >= 4 ? o = a = !1 : (i = t < c ? s.src.charCodeAt(t) : -1, (i === 32 || i === 10) && (o = !1), (n === 32 || n === 10) && (a = !1), l === 95 && (Kr(n) && (o = !1), Kr(i) && (a = !1))), {
    can_open: o,
    can_close: a,
    delims: r
  };
}
function Nc(s, e) {
  var t, n, i, r, o, a, c, l = s.posMax, d = s.pos, p = s.src.charCodeAt(d);
  if (p !== 95 && p !== 42 || e)
    return !1;
  if (c = jr(s, d), t = c.delims, !c.can_open)
    return s.pos += t, e || (s.pending += s.src.slice(d, s.pos)), !0;
  if (s.level >= s.options.maxNesting)
    return !1;
  for (s.pos = d + t, a = [t]; s.pos < l; ) {
    if (s.src.charCodeAt(s.pos) === p) {
      if (c = jr(s, s.pos), n = c.delims, c.can_close) {
        for (r = a.pop(), o = n; r !== o; ) {
          if (o < r) {
            a.push(r - o);
            break;
          }
          if (o -= r, a.length === 0)
            break;
          s.pos += r, r = a.pop();
        }
        if (a.length === 0) {
          t = r, i = !0;
          break;
        }
        s.pos += n;
        continue;
      }
      c.can_open && a.push(n), s.pos += n;
      continue;
    }
    s.parser.skipToken(s);
  }
  return i ? (s.posMax = s.pos, s.pos = d + t, e || ((t === 2 || t === 3) && s.push({ type: "strong_open", level: s.level++ }), (t === 1 || t === 3) && s.push({ type: "em_open", level: s.level++ }), s.parser.tokenize(s), (t === 1 || t === 3) && s.push({ type: "em_close", level: --s.level }), (t === 2 || t === 3) && s.push({ type: "strong_close", level: --s.level })), s.pos = s.posMax + t, s.posMax = l, !0) : (s.pos = d, !1);
}
var Bc = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function Dc(s, e) {
  var t, n, i = s.posMax, r = s.pos;
  if (s.src.charCodeAt(r) !== 126 || e || r + 2 >= i || s.level >= s.options.maxNesting)
    return !1;
  for (s.pos = r + 1; s.pos < i; ) {
    if (s.src.charCodeAt(s.pos) === 126) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return !t || r + 1 === s.pos || (n = s.src.slice(r + 1, s.pos), n.match(/(^|[^\\])(\\\\)*\s/)) ? (s.pos = r, !1) : (s.posMax = s.pos, s.pos = r + 1, e || s.push({
    type: "sub",
    level: s.level,
    content: n.replace(Bc, "$1")
  }), s.pos = s.posMax + 1, s.posMax = i, !0);
}
var Fc = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function Uc(s, e) {
  var t, n, i = s.posMax, r = s.pos;
  if (s.src.charCodeAt(r) !== 94 || e || r + 2 >= i || s.level >= s.options.maxNesting)
    return !1;
  for (s.pos = r + 1; s.pos < i; ) {
    if (s.src.charCodeAt(s.pos) === 94) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return !t || r + 1 === s.pos || (n = s.src.slice(r + 1, s.pos), n.match(/(^|[^\\])(\\\\)*\s/)) ? (s.pos = r, !1) : (s.posMax = s.pos, s.pos = r + 1, e || s.push({
    type: "sup",
    level: s.level,
    content: n.replace(Fc, "$1")
  }), s.pos = s.posMax + 1, s.posMax = i, !0);
}
function Hc(s, e) {
  var t, n, i, r, o, a, c, l, d = !1, p = s.pos, u = s.posMax, g = s.pos, _ = s.src.charCodeAt(g);
  if (_ === 33 && (d = !0, _ = s.src.charCodeAt(++g)), _ !== 91 || s.level >= s.options.maxNesting || (t = g + 1, n = Si(s, g), n < 0))
    return !1;
  if (a = n + 1, a < u && s.src.charCodeAt(a) === 40) {
    for (a++; a < u && (l = s.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++)
      ;
    if (a >= u)
      return !1;
    for (g = a, Go(s, a) ? (r = s.linkContent, a = s.pos) : r = "", g = a; a < u && (l = s.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++)
      ;
    if (a < u && g !== a && zo(s, a))
      for (o = s.linkContent, a = s.pos; a < u && (l = s.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++)
        ;
    else
      o = "";
    if (a >= u || s.src.charCodeAt(a) !== 41)
      return s.pos = p, !1;
    a++;
  } else {
    if (s.linkLevel > 0)
      return !1;
    for (; a < u && (l = s.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++)
      ;
    if (a < u && s.src.charCodeAt(a) === 91 && (g = a + 1, a = Si(s, a), a >= 0 ? i = s.src.slice(g, a++) : a = g - 1), i || (typeof i > "u" && (a = n + 1), i = s.src.slice(t, n)), c = s.env.references[Vo(i)], !c)
      return s.pos = p, !1;
    r = c.href, o = c.title;
  }
  return e || (s.pos = t, s.posMax = n, d ? s.push({
    type: "image",
    src: r,
    title: o,
    alt: s.src.substr(t, n - t),
    level: s.level
  }) : (s.push({
    type: "link_open",
    href: r,
    title: o,
    level: s.level++
  }), s.linkLevel++, s.parser.tokenize(s), s.linkLevel--, s.push({ type: "link_close", level: --s.level }))), s.pos = a, s.posMax = u, !0;
}
function $c(s, e) {
  var t, n, i, r, o = s.posMax, a = s.pos;
  return a + 2 >= o || s.src.charCodeAt(a) !== 94 || s.src.charCodeAt(a + 1) !== 91 || s.level >= s.options.maxNesting || (t = a + 2, n = Si(s, a + 1), n < 0) ? !1 : (e || (s.env.footnotes || (s.env.footnotes = {}), s.env.footnotes.list || (s.env.footnotes.list = []), i = s.env.footnotes.list.length, s.pos = t, s.posMax = n, s.push({
    type: "footnote_ref",
    id: i,
    level: s.level
  }), s.linkLevel++, r = s.tokens.length, s.parser.tokenize(s), s.env.footnotes.list[i] = { tokens: s.tokens.splice(r) }, s.linkLevel--), s.pos = n + 1, s.posMax = o, !0);
}
function qc(s, e) {
  var t, n, i, r, o = s.posMax, a = s.pos;
  if (a + 3 > o || !s.env.footnotes || !s.env.footnotes.refs || s.src.charCodeAt(a) !== 91 || s.src.charCodeAt(a + 1) !== 94 || s.level >= s.options.maxNesting)
    return !1;
  for (n = a + 2; n < o; n++) {
    if (s.src.charCodeAt(n) === 32 || s.src.charCodeAt(n) === 10)
      return !1;
    if (s.src.charCodeAt(n) === 93)
      break;
  }
  return n === a + 2 || n >= o || (n++, t = s.src.slice(a + 2, n - 1), typeof s.env.footnotes.refs[":" + t] > "u") ? !1 : (e || (s.env.footnotes.list || (s.env.footnotes.list = []), s.env.footnotes.refs[":" + t] < 0 ? (i = s.env.footnotes.list.length, s.env.footnotes.list[i] = { label: t, count: 0 }, s.env.footnotes.refs[":" + t] = i) : i = s.env.footnotes.refs[":" + t], r = s.env.footnotes.list[i].count, s.env.footnotes.list[i].count++, s.push({
    type: "footnote_ref",
    id: i,
    subId: r,
    level: s.level
  })), s.pos = n, s.posMax = o, !0);
}
var Gc = [
  "coap",
  "doi",
  "javascript",
  "aaa",
  "aaas",
  "about",
  "acap",
  "cap",
  "cid",
  "crid",
  "data",
  "dav",
  "dict",
  "dns",
  "file",
  "ftp",
  "geo",
  "go",
  "gopher",
  "h323",
  "http",
  "https",
  "iax",
  "icap",
  "im",
  "imap",
  "info",
  "ipp",
  "iris",
  "iris.beep",
  "iris.xpc",
  "iris.xpcs",
  "iris.lwz",
  "ldap",
  "mailto",
  "mid",
  "msrp",
  "msrps",
  "mtqp",
  "mupdate",
  "news",
  "nfs",
  "ni",
  "nih",
  "nntp",
  "opaquelocktoken",
  "pop",
  "pres",
  "rtsp",
  "service",
  "session",
  "shttp",
  "sieve",
  "sip",
  "sips",
  "sms",
  "snmp",
  "soap.beep",
  "soap.beeps",
  "tag",
  "tel",
  "telnet",
  "tftp",
  "thismessage",
  "tn3270",
  "tip",
  "tv",
  "urn",
  "vemmi",
  "ws",
  "wss",
  "xcon",
  "xcon-userid",
  "xmlrpc.beep",
  "xmlrpc.beeps",
  "xmpp",
  "z39.50r",
  "z39.50s",
  "adiumxtra",
  "afp",
  "afs",
  "aim",
  "apt",
  "attachment",
  "aw",
  "beshare",
  "bitcoin",
  "bolo",
  "callto",
  "chrome",
  "chrome-extension",
  "com-eventbrite-attendee",
  "content",
  "cvs",
  "dlna-playsingle",
  "dlna-playcontainer",
  "dtn",
  "dvb",
  "ed2k",
  "facetime",
  "feed",
  "finger",
  "fish",
  "gg",
  "git",
  "gizmoproject",
  "gtalk",
  "hcp",
  "icon",
  "ipn",
  "irc",
  "irc6",
  "ircs",
  "itms",
  "jar",
  "jms",
  "keyparc",
  "lastfm",
  "ldaps",
  "magnet",
  "maps",
  "market",
  "message",
  "mms",
  "ms-help",
  "msnim",
  "mumble",
  "mvn",
  "notes",
  "oid",
  "palm",
  "paparazzi",
  "platform",
  "proxy",
  "psyc",
  "query",
  "res",
  "resource",
  "rmi",
  "rsync",
  "rtmp",
  "secondlife",
  "sftp",
  "sgn",
  "skype",
  "smb",
  "soldat",
  "spotify",
  "ssh",
  "steam",
  "svn",
  "teamspeak",
  "things",
  "udp",
  "unreal",
  "ut2004",
  "ventrilo",
  "view-source",
  "webcal",
  "wtai",
  "wyciwyg",
  "xfire",
  "xri",
  "ymsgr"
], zc = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/, Vc = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
function Wc(s, e) {
  var t, n, i, r, o, a = s.pos;
  return s.src.charCodeAt(a) !== 60 || (t = s.src.slice(a), t.indexOf(">") < 0) ? !1 : (n = t.match(Vc), n ? Gc.indexOf(n[1].toLowerCase()) < 0 || (r = n[0].slice(1, -1), o = Us(r), !s.parser.validateLink(r)) ? !1 : (e || (s.push({
    type: "link_open",
    href: o,
    level: s.level
  }), s.push({
    type: "text",
    content: r,
    level: s.level + 1
  }), s.push({ type: "link_close", level: s.level })), s.pos += n[0].length, !0) : (i = t.match(zc), i ? (r = i[0].slice(1, -1), o = Us("mailto:" + r), s.parser.validateLink(o) ? (e || (s.push({
    type: "link_open",
    href: o,
    level: s.level
  }), s.push({
    type: "text",
    content: r,
    level: s.level + 1
  }), s.push({ type: "link_close", level: s.level })), s.pos += i[0].length, !0) : !1) : !1));
}
function _s(s, e) {
  return s = s.source, e = e || "", function t(n, i) {
    return n ? (i = i.source || i, s = s.replace(n, i), t) : new RegExp(s, e);
  };
}
var Kc = /[a-zA-Z_:][a-zA-Z0-9:._-]*/, jc = /[^"'=<>`\x00-\x20]+/, Xc = /'[^']*'/, Yc = /"[^"]*"/, Zc = _s(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", jc)("single_quoted", Xc)("double_quoted", Yc)(), Jc = _s(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", Kc)("attr_value", Zc)(), Qc = _s(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", Jc)(), el = /<\/[A-Za-z][A-Za-z0-9]*\s*>/, tl = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/, nl = /<[?].*?[?]>/, il = /<![A-Z]+\s+[^>]*>/, sl = /<!\[CDATA\[[\s\S]*?\]\]>/, rl = _s(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", Qc)("close_tag", el)("comment", tl)("processing", nl)("declaration", il)("cdata", sl)();
function ol(s) {
  var e = s | 32;
  return e >= 97 && e <= 122;
}
function al(s, e) {
  var t, n, i, r = s.pos;
  return !s.options.html || (i = s.posMax, s.src.charCodeAt(r) !== 60 || r + 2 >= i) || (t = s.src.charCodeAt(r + 1), t !== 33 && t !== 63 && t !== 47 && !ol(t)) || (n = s.src.slice(r).match(rl), !n) ? !1 : (e || s.push({
    type: "htmltag",
    content: s.src.slice(r, r + n[0].length),
    level: s.level
  }), s.pos += n[0].length, !0);
}
var cl = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i, ll = /^&([a-z][a-z0-9]{1,31});/i;
function dl(s, e) {
  var t, n, i, r = s.pos, o = s.posMax;
  if (s.src.charCodeAt(r) !== 38)
    return !1;
  if (r + 1 < o) {
    if (t = s.src.charCodeAt(r + 1), t === 35) {
      if (i = s.src.slice(r).match(cl), i)
        return e || (n = i[1][0].toLowerCase() === "x" ? parseInt(i[1].slice(1), 16) : parseInt(i[1], 10), s.pending += $o(n) ? Fs(n) : Fs(65533)), s.pos += i[0].length, !0;
    } else if (i = s.src.slice(r).match(ll), i) {
      var a = Uo(i[1]);
      if (i[1] !== a)
        return e || (s.pending += a), s.pos += i[0].length, !0;
    }
  }
  return e || (s.pending += "&"), s.pos++, !0;
}
var Ls = [
  ["text", Rc],
  ["newline", Ic],
  ["escape", Mc],
  ["backticks", kc],
  ["del", Pc],
  ["ins", Lc],
  ["mark", Oc],
  ["emphasis", Nc],
  ["sub", Dc],
  ["sup", Uc],
  ["links", Hc],
  ["footnote_inline", $c],
  ["footnote_ref", qc],
  ["autolink", Wc],
  ["htmltag", al],
  ["entity", dl]
];
function ys() {
  this.ruler = new Xe();
  for (var s = 0; s < Ls.length; s++)
    this.ruler.push(Ls[s][0], Ls[s][1]);
  this.validateLink = hl;
}
ys.prototype.skipToken = function(s) {
  var e = this.ruler.getRules(""), t = e.length, n = s.pos, i, r;
  if ((r = s.cacheGet(n)) > 0) {
    s.pos = r;
    return;
  }
  for (i = 0; i < t; i++)
    if (e[i](s, !0)) {
      s.cacheSet(n, s.pos);
      return;
    }
  s.pos++, s.cacheSet(n, s.pos);
};
ys.prototype.tokenize = function(s) {
  for (var e = this.ruler.getRules(""), t = e.length, n = s.posMax, i, r; s.pos < n; ) {
    for (r = 0; r < t && (i = e[r](s, !1), !i); r++)
      ;
    if (i) {
      if (s.pos >= n)
        break;
      continue;
    }
    s.pending += s.src[s.pos++];
  }
  s.pending && s.pushPending();
};
ys.prototype.parse = function(s, e, t, n) {
  var i = new un(s, this, e, t, n);
  this.tokenize(i);
};
function hl(s) {
  var e = ["vbscript", "javascript", "file", "data"], t = s.trim().toLowerCase();
  return t = cn(t), !(t.indexOf(":") !== -1 && e.indexOf(t.split(":")[0]) !== -1);
}
var ul = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkTarget: "",
    // set target to open link in
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: "“”‘’",
    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "block",
        "inline",
        "references",
        "replacements",
        "smartquotes",
        "references",
        "abbr2",
        "footnote_tail"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fences",
        "footnote",
        "heading",
        "hr",
        "htmlblock",
        "lheading",
        "list",
        "paragraph",
        "table"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "del",
        "emphasis",
        "entity",
        "escape",
        "footnote_ref",
        "htmltag",
        "links",
        "newline",
        "text"
      ]
    }
  }
}, pl = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkTarget: "",
    // set target to open link in
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: "“”‘’",
    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    // Don't restrict core/block/inline rules
    core: {},
    block: {},
    inline: {}
  }
}, fl = {
  options: {
    html: !0,
    // Enable HTML tags in source
    xhtmlOut: !0,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkTarget: "",
    // set target to open link in
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: "“”‘’",
    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "block",
        "inline",
        "references",
        "abbr2"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fences",
        "heading",
        "hr",
        "htmlblock",
        "lheading",
        "list",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "htmltag",
        "links",
        "newline",
        "text"
      ]
    }
  }
}, ml = {
  default: ul,
  full: pl,
  commonmark: fl
};
function jo(s, e, t) {
  this.src = e, this.env = t, this.options = s.options, this.tokens = [], this.inlineMode = !1, this.inline = s.inline, this.block = s.block, this.renderer = s.renderer, this.typographer = s.typographer;
}
function _t(s, e) {
  typeof s != "string" && (e = s, s = "default"), e && e.linkify != null && console.warn(
    `linkify option is removed. Use linkify plugin instead:

import Remarkable from 'remarkable';
import linkify from 'remarkable/linkify';
new Remarkable().use(linkify)
`
  ), this.inline = new ys(), this.block = new cr(), this.core = new Wo(), this.renderer = new ar(), this.ruler = new Xe(), this.options = {}, this.configure(ml[s]), this.set(e || {});
}
_t.prototype.set = function(s) {
  Ho(this.options, s);
};
_t.prototype.configure = function(s) {
  var e = this;
  if (!s)
    throw new Error("Wrong `remarkable` preset, check name/content");
  s.options && e.set(s.options), s.components && Object.keys(s.components).forEach(function(t) {
    s.components[t].rules && e[t].ruler.enable(s.components[t].rules, !0);
  });
};
_t.prototype.use = function(s, e) {
  return s(this, e), this;
};
_t.prototype.parse = function(s, e) {
  var t = new jo(this, s, e);
  return this.core.process(t), t.tokens;
};
_t.prototype.render = function(s, e) {
  return e = e || {}, this.renderer.render(this.parse(s, e), this.options, e);
};
_t.prototype.parseInline = function(s, e) {
  var t = new jo(this, s, e);
  return t.inlineMode = !0, this.core.process(t), t.tokens;
};
_t.prototype.renderInline = function(s, e) {
  return e = e || {}, this.renderer.render(this.parseInline(s, e), this.options, e);
};
const Yt = class Yt {
  static addPlugins(e, t) {
    const n = window.remarkable_plugins;
    if (n && n.forEach((i) => {
      e.use(i.plugin, i.options);
    }), t != null && t.math) {
      window.katex || (console.warn("window.katex not found, use chatElementRef.refreshMessages to re-render messages"), console.warn("See https://deepchat.dev/examples/externalModules"));
      const i = typeof t.math == "object" ? t.math.delimiter : "", r = typeof t.math == "object" && t.math.options ? t.math.options : {};
      e.use(Oa.katex.bind(this, r), { delimiter: i });
    }
  }
  static instantiate(e) {
    if (e)
      return new _t({ ...Yt.DEFAULT_PROPERTIES, ...e });
    if (window.hljs) {
      const t = window.hljs;
      return new _t({
        highlight: function(n, i) {
          if (i && t.getLanguage(i))
            try {
              return t.highlight(n, { language: i }).value;
            } catch {
              console[f]("failed to setup the highlight dependency");
            }
          try {
            return t.highlightAuto(n).value;
          } catch {
            console[f]("failed to automatically highlight messages");
          }
          return "";
        },
        html: !1,
        // Enable HTML tags in source
        xhtmlOut: !1,
        // Use '/' to close single tags (<br />)
        breaks: !0,
        // Convert '\n' in paragraphs into <br>
        langPrefix: "language-",
        // CSS language prefix for fenced blocks
        linkTarget: "_blank",
        // set target to open in a new tab
        typographer: !0
        // Enable smartypants and other sweet transforms
      });
    } else
      return new _t(Yt.DEFAULT_PROPERTIES);
  }
  static createNew(e) {
    const t = Yt.instantiate(e);
    return Yt.addPlugins(t, e), t.inline.validateLink = () => !0, t;
  }
};
Yt.DEFAULT_PROPERTIES = {
  breaks: !0,
  linkTarget: "_blank"
  // set target to open in a new tab
};
let Ci = Yt;
class gl {
  constructor(e) {
    this.storageKey = "tejas-storage", this.maxMessages = 1e3, this.trackInputText = !1, this.trackScrollHeight = !1, typeof e == "object" && (e.key && (this.storageKey = e.key), e.maxMessages && (this.maxMessages = e.maxMessages), e.inputText !== void 0 && (this.trackInputText = e.inputText), e.scrollHeight !== void 0 && (this.trackScrollHeight = e.scrollHeight), e.clear = this.clear.bind(this), le.processBrowserStorage(this));
  }
  get() {
    const e = localStorage.getItem(this.storageKey);
    return e ? JSON.parse(e) : { messages: [] };
  }
  set(e, t, n) {
    const i = { messages: e, inputText: t, scrollHeight: n };
    localStorage.setItem(this.storageKey, ce(i));
  }
  addMessages(e) {
    let t = e.length - this.maxMessages;
    t < 0 && (t = 0);
    const n = e.slice(t, e.length), i = this.trackInputText || this.trackScrollHeight ? localStorage.getItem(this.storageKey) : void 0, r = i ? JSON.parse(i) : void 0;
    this.set(
      n,
      this.trackInputText ? r == null ? void 0 : r.inputText : void 0,
      this.trackScrollHeight ? r == null ? void 0 : r.scrollHeight : void 0
    );
  }
  addInputText(e) {
    if (!this.trackInputText) return;
    const t = localStorage.getItem(this.storageKey), n = t ? JSON.parse(t) : void 0;
    this.set(
      (n == null ? void 0 : n.messages) || [],
      e,
      this.trackScrollHeight ? n == null ? void 0 : n.scrollHeight : void 0
    );
  }
  addScrollHeight(e) {
    if (!this.trackScrollHeight) return;
    const t = localStorage.getItem(this.storageKey), n = t ? JSON.parse(t) : void 0;
    this.set(
      (n == null ? void 0 : n.messages) || [],
      this.trackInputText ? n == null ? void 0 : n.inputText : void 0,
      e
    );
  }
  clear() {
    localStorage.removeItem(this.storageKey);
  }
}
class Ne {
  static applyCustomStylesToElements(e, t, n) {
    if (n && (Object.assign(e.outerContainer[v], n.outerContainer), Object.assign(e.innerContainer[v], n.innerContainer), Object.assign(e.bubbleElement[v], n.bubble), t)) {
      const i = e.bubbleElement.children[0], r = i.tagName.toLocaleLowerCase() !== "a" ? i : i.children[0];
      Object.assign(r[v], n.media);
    }
  }
  static applySideStyles(e, t, n, i) {
    i && (Ne.applyCustomStylesToElements(e, n, i.shared), t === F ? Ne.applyCustomStylesToElements(e, n, i.user) : (Ne.applyCustomStylesToElements(e, n, i.ai), Ne.applyCustomStylesToElements(e, n, i[t])));
  }
  static isElementsStyles(e) {
    return !!(e.outerContainer || e.innerContainer || e.bubble || e.media);
  }
  // prettier-ignore
  static applyCustomStyles(e, t, n, i, r) {
    var o;
    r && e[w] !== r ? Ne.isElementsStyles(r) ? (Ne.applyCustomStylesToElements(t, i, (o = e[w]) == null ? void 0 : o.shared), Ne.applyCustomStylesToElements(t, i, r)) : (Ne.applySideStyles(t, n, i, e[w]), Ne.applySideStyles(t, n, i, r)) : Ne.applySideStyles(t, n, i, e[w]);
  }
  // prettier-ignore
  static extractParticularSharedStyles(e, t) {
    if (!(t != null && t.shared)) return;
    const n = t.shared, i = {
      outerContainer: {},
      innerContainer: {},
      bubble: {},
      media: {}
    };
    return e.forEach((r) => {
      var o, a, c, l;
      i.outerContainer[r] = ((o = n.outerContainer) == null ? void 0 : o[r]) || "", i.innerContainer[r] = ((a = n.innerContainer) == null ? void 0 : a[r]) || "", i.bubble[r] = ((c = n.bubble) == null ? void 0 : c[r]) || "", i.media[r] = ((l = n.media) == null ? void 0 : l[r]) || "";
    }), i;
  }
}
class ve {
  // prettier-ignore
  static setElementProps(e, t, n, i) {
    var r;
    n !== Rt && (e.applyCustomStyles(t, i, !0, (r = e.messageStyles) == null ? void 0 : r[n]), t.bubbleElement[m].add(Po));
  }
  // prettier-ignore
  static addMessage(e, t, n, i, r) {
    ve.setElementProps(e, t, n, i), r ? e.elementRef.insertBefore(t.outerContainer, e.elementRef.firstChild) : e.appendOuterContainerElemet(t.outerContainer);
  }
  static wrapInLink(e, t, n) {
    const i = x("a");
    return i.href = t, i.download = n || ne, i.target = "_blank", i.appendChild(e), i;
  }
  static isNonLinkableDataUrl(e, t) {
    return !t.startsWith("data") || e === j ? !1 : e === sn && t.startsWith("data:text/javascript") || !t.startsWith("data:image") && !t.startsWith("data:application");
  }
  static processContent(e, t, n, i) {
    return !n || ve.isNonLinkableDataUrl(e, n) ? t : ve.wrapInLink(t, n, i);
  }
  static waitToLoadThenScroll(e) {
    setTimeout(() => {
      e();
    }, 60);
  }
  static scrollDownOnImageLoad(e, t) {
    if (e.startsWith("data"))
      ve.waitToLoadThenScroll(t);
    else
      try {
        fetch(e, { mode: "no-cors" }).catch(() => {
        }).finally(() => {
          ve.waitToLoadThenScroll(t);
        });
      } catch {
        t();
      }
  }
  // The strategy is to emit the actual file reference in the `onMessage` event for the user to inspect it
  // But it is not actually used by anything in the chat, hence it is removed when adding a message
  // after the body has been stringified and parsed - the file reference will disappear, hence this readds it
  static reAddFileRefToObject(e, t) {
    var n;
    (n = e[b]) == null || n.forEach((i, r) => {
      var o;
      i.ref && ((o = t[b]) != null && o[r]) && (t[b][r].ref = i.ref);
    });
  }
  // the chat does not use the actual file
  static removeFileRef(e) {
    const t = { ...e };
    return delete t.ref, t;
  }
  static isAudioFile(e) {
    const t = /\.(mp3|ogg|wav|aac|webm|4a)$/i, { type: n, src: i } = e;
    return n === q || (i == null ? void 0 : i.startsWith("data:audio")) || i && t.test(i);
  }
  static isImageFile(e) {
    const { type: t, src: n } = e;
    return t === j || (n == null ? void 0 : n.startsWith("data:image")) || n && ve.isImageFileExtension(n);
  }
  static isImageFileExtension(e) {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(e);
  }
}
class ln {
  static onMessage(e, t, n) {
    var r;
    const i = A({ message: t, isHistory: n, isInitial: n });
    ve.reAddFileRefToObject(t, i.message), (r = e.onMessage) == null || r.call(e, i), e.dispatchEvent(new CustomEvent("message", { detail: i })), le.fireOnNewMessage(e, i);
  }
  static onClearMessages(e) {
    var t;
    (t = e.onClearMessages) == null || t.call(e), e.dispatchEvent(new CustomEvent("clear-messages"));
  }
  static onRender(e) {
    var t;
    (t = e.onComponentRender) == null || t.call(e, e), e.dispatchEvent(new CustomEvent("render", { detail: e }));
  }
  static onInput(e, t, n) {
    var r, o;
    const i = A({ content: t, isUser: n });
    t[b] && ve.reAddFileRefToObject({ [b]: (r = t[b]) == null ? void 0 : r.map((a) => ({ ref: a })) }, i.content), (o = e.onInput) == null || o.call(e, i), e.dispatchEvent(new CustomEvent("input", { detail: i }));
  }
  static onError(e, t) {
    var n;
    (n = e.onError) == null || n.call(e, t), e.dispatchEvent(new CustomEvent(f, { detail: t }));
  }
}
const xe = class xe {
  static generateLoadingRingElement() {
    const e = x();
    return e[m].add("loading-history"), e.appendChild(x()), e.appendChild(x()), e.appendChild(x()), e.appendChild(x()), e;
  }
  static apply(e, t, n) {
    ft.setRing(t.bubbleElement, n == null ? void 0 : n.bubble), n != null && n.bubble && (n = A(n), delete n.bubble), e.applyCustomStyles(t, "history", !1, n);
  }
  static addLoadHistoryMessage(e, t, n = !0) {
    var a, c, l, d, p, u, g, _;
    e.bubbleElement[m].add(xe.CLASS);
    const i = n ? xe.FULL_VIEW_CLASS : xe.SMALL_CLASS;
    e.outerContainer[m].add(i);
    const r = n ? (d = (l = (c = (a = t.messageStyles) == null ? void 0 : a.loading) == null ? void 0 : c.history) == null ? void 0 : l.full) == null ? void 0 : d[R] : (_ = (g = (u = (p = t.messageStyles) == null ? void 0 : p.loading) == null ? void 0 : u.history) == null ? void 0 : g.small) == null ? void 0 : _[R];
    xe.apply(t, e, r);
    let o = t.elementRef;
    n && t.elementRef.id !== Oo && (o = t.elementRef.parentElement), o == null || o.prepend(e.outerContainer);
  }
  static createDefaultElements(e) {
    const t = e.createMessageElements("", te), { bubbleElement: n } = t, i = xe.generateLoadingRingElement();
    return n.appendChild(i), t;
  }
  static addMessage(e, t = !0) {
    var r, o, a, c;
    const n = (c = (a = (o = (r = e.messageStyles) == null ? void 0 : r.loading) == null ? void 0 : o.history) == null ? void 0 : a.full) == null ? void 0 : c[L], i = n ? bt.createElements(e, n, te, !0, !0) : xe.createDefaultElements(e);
    return xe.addLoadHistoryMessage(i, e, t), B.softRemRoleElements(i.innerContainer, e.avatar, e.name), i;
  }
  static tryChangeViewToSmall(e, t) {
    var n, i, r, o, a, c, l, d;
    if (t != null && t.outerContainer[m].contains(xe.FULL_VIEW_CLASS)) {
      t.outerContainer[m].replace(xe.FULL_VIEW_CLASS, xe.SMALL_CLASS);
      const p = (o = (r = (i = (n = e.messageStyles) == null ? void 0 : n.loading) == null ? void 0 : i.history) == null ? void 0 : r.small) == null ? void 0 : o[R];
      p && xe.apply(e, t, p);
      const u = (d = (l = (c = (a = e.messageStyles) == null ? void 0 : a.loading) == null ? void 0 : c.history) == null ? void 0 : l.small) == null ? void 0 : d[L];
      return u && (t.bubbleElement.innerHTML = u), !0;
    }
    return !1;
  }
  static changeFullViewToSmall(e) {
    const t = e.messageElementRefs[e.messageElementRefs.length - 1];
    xe.tryChangeViewToSmall(e, t) || xe.tryChangeViewToSmall(e, e.messageElementRefs[0]);
  }
};
xe.CLASS = "loading-history-message", xe.FULL_VIEW_CLASS = "loading-history-message-full-view", xe.SMALL_CLASS = "loading-history-message-small";
let It = xe;
const mi = class mi {
  static setFade(e, t) {
    e[v].transitionDuration = typeof t == "number" ? `${t}ms` : `${mi.DEFAULT_FADE_MS}ms`;
  }
  static async fadeAnimation(e, t) {
    e[v].opacity = "0";
    const n = typeof t == "number" ? t : mi.DEFAULT_FADE_MS;
    await new Promise((i) => {
      setTimeout(() => i(), n);
    }), e[v].opacity = "1";
  }
};
mi.DEFAULT_FADE_MS = 500;
let Ki = mi;
class Vt {
  constructor(e, t, n) {
    if (this.hiddenElements = /* @__PURE__ */ new Set(), this.isScrollButton = !1, this.isScrollingToBottom = !1, this._messages = e, t) {
      let i = {};
      typeof t == "object" && (i = A(t), i.onUpdate = t.onUpdate), i[R] ?? (i[R] = {});
      const r = "fit-content";
      i[R].default = { borderRadius: "10px", width: r, height: r, ...i[R].default }, this.hiddenMessagesConfig = i, this.io = this.initIntersectionObserver(this._messages.elementRef);
    }
    if (n) {
      const i = typeof n == "object" ? A(n) : {};
      i[R] ?? (i[R] = {}), i[R].default = { borderRadius: "50%", width: "1.4rem", height: "1.4rem", ...i[R].default }, this.scrollButtonConfig = i;
    }
    this.element = this.createElement(), this._messages.elementRef.appendChild(this.element);
  }
  static displayElement(e) {
    e[v].opacity = Or, e[v].pointerEvents = "auto";
  }
  static hideElement(e) {
    e[v].opacity = Lr, e[v].pointerEvents = "none";
  }
  initIntersectionObserver(e) {
    return new IntersectionObserver(
      (t) => {
        t.forEach((n) => {
          var i;
          n.isIntersecting && this.hiddenElements.has(n.target) && (this.hiddenElements.delete(n.target), (i = this.io) == null || i.unobserve(n.target), this.updateHiddenElement());
        });
      },
      { root: e, threshold: 0.1 }
    );
  }
  createElement() {
    const e = x();
    return e.id = "scroll-button", V.assignButtonEvents(e, () => {
      var i, r, o;
      const t = this.isScrollButton ? (i = this.scrollButtonConfig) == null ? void 0 : i.smoothScroll : (r = this.hiddenMessagesConfig) == null ? void 0 : r.smoothScroll, n = typeof t == "boolean" ? t : !0;
      if (this.isScrollButton || ((o = this.hiddenMessagesConfig) == null ? void 0 : o.clickScroll) === "last")
        V.scrollToBottom(this._messages, n), n && this.element && (Vt.hideElement(this.element), this.isScrollingToBottom = !0, V.waitForScrollEnd(this._messages.elementRef, () => {
          this.isScrollingToBottom = !1;
        }));
      else {
        const a = this.hiddenElements.values().next().value;
        a && this._messages.elementRef.scrollTo({
          left: 0,
          top: a.offsetTop,
          behavior: n ? "smooth" : "auto"
        });
      }
    }), re.apply(this._messages, e), e;
  }
  assignStyles(e) {
    if (!this.element) return;
    Object.assign(this.element[v], e[w]);
    const t = ae.processStateful(e);
    Tt.add(this.element, t);
  }
  updateHiddenElement() {
    var e, t;
    if (this.element) {
      this.isScrollButton = !1;
      const n = this.hiddenElements.size;
      if (n === 0) {
        Vt.hideElement(this.element);
        return;
      }
      const i = `${n} new message${n === 1 ? "" : "s"}`;
      if ((e = this.hiddenMessagesConfig) != null && e.onUpdate) {
        const r = this.hiddenMessagesConfig.onUpdate(i, n);
        this.element.innerHTML = r, re.apply(this._messages, this.element);
      } else
        this.element.innerHTML = i;
      (t = this.hiddenMessagesConfig) != null && t[R] && this.assignStyles(this.hiddenMessagesConfig[R]), Vt.displayElement(this.element);
    }
  }
  updateHidden() {
    var e, t;
    if (!this.isScrollingToBottom)
      if (this.hiddenMessagesConfig) {
        const n = (e = this._messages.getFirstMessageContentEl()) == null ? void 0 : e.outerContainer;
        n && !V.isVisibleInParent(n, this._messages.elementRef) && (this.hiddenElements.add(n), (t = this.io) == null || t.observe(n), this.updateHiddenElement());
      } else
        this.updateScroll();
  }
  clearHidden() {
    this.hiddenElements.forEach((e) => {
      var t;
      return (t = this.io) == null ? void 0 : t.unobserve(e);
    }), this.hiddenElements.clear(), this.updateHiddenElement();
  }
  displayScroll() {
    var e, t;
    this.element && this.element[v].opacity !== Or && (Vt.displayElement(this.element), this.element.innerHTML = ((e = this.scrollButtonConfig) == null ? void 0 : e.content) || '<span style="font-size: 1.2rem; user-select: none;">&darr;</span>', (t = this.scrollButtonConfig) != null && t[R] && this.assignStyles(this.scrollButtonConfig[R]));
  }
  updateScroll() {
    var e;
    this.isScrollingToBottom || !this.scrollButtonConfig || (V.isScrollbarAtBottomOfElement(this._messages.elementRef, ((e = this.scrollButtonConfig) == null ? void 0 : e.scrollDelta) || 80) ? this.element && this.element[v].opacity !== Lr && Vt.hideElement(this.element) : (this.displayScroll(), this.isScrollButton = !0));
  }
}
class Xo {
  constructor(e) {
    this.className = e;
  }
  getAvatarContainer(e) {
    return e.getElementsByClassName(this.className)[0];
  }
  tryHide(e) {
    var t;
    (t = this.getAvatarContainer(e)[v]).visibility || (t.visibility = "hidden");
  }
  tryReveal(e) {
    this.getAvatarContainer(e)[v].visibility = "";
  }
  trySoftRem(e) {
    this.getAvatarContainer(e)[m].add("role-hidden");
  }
}
const Xr = "https://img.icons8.com/color/48/000000/bot.png", Yr = "https://img.icons8.com/ios-filled/50/cccccc/user-male-circle.png";
class Et extends Xo {
  constructor(e) {
    super("avatar-container"), this._avatars = e;
  }
  addBesideBubble(e, t) {
    const n = typeof this._avatars == "boolean" ? void 0 : this._avatars, i = this.createAvatar(t, n), r = this.getPosition(t, n);
    i[m].add(r === $t ? "start-item-position" : "end-item-position"), e.insertAdjacentElement(r === $t ? "beforebegin" : "afterend", i);
  }
  createAvatar(e, t) {
    var r, o, a, c, l;
    const n = x("img");
    e === F ? (n[T] = ((r = t == null ? void 0 : t[F]) == null ? void 0 : r[T]) || ((o = t == null ? void 0 : t[w]) == null ? void 0 : o[T]) || Yr, n.onerror = Et.errorFallback.bind(this, Yr)) : (n[T] = ((a = t == null ? void 0 : t[e]) == null ? void 0 : a[T]) || ((c = t == null ? void 0 : t[te]) == null ? void 0 : c[T]) || ((l = t == null ? void 0 : t[w]) == null ? void 0 : l[T]) || Xr, n.onerror = Et.errorFallback.bind(this, Xr)), n[m].add("avatar"), n.alt = `${e} avatar`;
    const i = x();
    return i[m].add(this.className), i.appendChild(n), t && Et.applyCustomStyles(i, n, t, e), i;
  }
  getPosition(e, t) {
    var i, r, o, a, c, l;
    let n = le.processPosition((r = (i = t == null ? void 0 : t[e]) == null ? void 0 : i[R]) == null ? void 0 : r.position);
    return e !== F && (n ?? (n = (a = (o = t == null ? void 0 : t.ai) == null ? void 0 : o[R]) == null ? void 0 : a.position)), n ?? (n = (l = (c = t == null ? void 0 : t[w]) == null ? void 0 : c[R]) == null ? void 0 : l.position), n ?? (n = e === F ? Lo : $t), n;
  }
  static errorFallback(e, t) {
    const n = t.target;
    n.onerror = null, n[T] = e;
  }
  static applyCustomStylesToElements(e, t, n) {
    Object.assign(e[v], n.container), Object.assign(t[v], n.avatar);
  }
  static applyCustomStyles(e, t, n, i) {
    var r, o, a, c;
    if ((r = n[w]) != null && r[R] && Et.applyCustomStylesToElements(e, t, n[w][R]), i === F)
      (o = n.user) != null && o[R] && Et.applyCustomStylesToElements(e, t, n.user[R]);
    else {
      (a = n.ai) != null && a[R] && Et.applyCustomStylesToElements(e, t, n.ai[R]);
      const l = (c = n[i]) == null ? void 0 : c[R];
      l && Et.applyCustomStylesToElements(e, t, l);
    }
  }
}
class li extends Xo {
  constructor(e) {
    super("name"), this._names = e;
  }
  addBesideBubble(e, t) {
    const n = typeof this._names == "boolean" ? {} : this._names, i = this.createName(t, n), r = li.getPosition(t, n);
    i[m].add(r === $t ? "start-item-position" : "end-item-position"), e.insertAdjacentElement(r === $t ? "beforebegin" : "afterend", i);
  }
  createName(e, t) {
    const n = x();
    return n[m].add(this.className), n.textContent = li.getNameText(e, t), li.applyStyle(n, e, t), n;
  }
  static getPosition(e, t) {
    var i, r, o;
    let n = le.processPosition((i = t == null ? void 0 : t[e]) == null ? void 0 : i.position);
    return e !== F && (n ?? (n = (r = t == null ? void 0 : t[te]) == null ? void 0 : r.position)), n ?? (n = (o = t == null ? void 0 : t[w]) == null ? void 0 : o.position), n ?? (n = e === F ? Lo : $t), n;
  }
  static applyStyle(e, t, n) {
    var i, r, o, a;
    Object.assign(e[v], (i = n[w]) == null ? void 0 : i[v]), t === F ? Object.assign(e[v], (r = n[F]) == null ? void 0 : r[v]) : (Object.assign(e[v], (o = n[te]) == null ? void 0 : o[v]), Object.assign(e[v], (a = n[t]) == null ? void 0 : a[v]));
  }
  static getNameText(e, t) {
    var n, i, r, o, a, c;
    return e === F ? ((n = t[F]) == null ? void 0 : n[h]) || ((i = t[w]) == null ? void 0 : i[h]) || "User" : e === te ? ((r = t[te]) == null ? void 0 : r[h]) || ((o = t[w]) == null ? void 0 : o[h]) || "AI" : ((a = t[e]) == null ? void 0 : a[h]) || ((c = t[w]) == null ? void 0 : c[h]) || e;
  }
}
const He = class He {
  constructor(e) {
    var t, n, i, r;
    this.messageElementRefs = [], this.htmlClassUtilities = {}, this.messageToElements = [], this.maxVisibleMessages = 4e3, this.autoScrollAllowed = !0, this.elementRef = He.createContainerElement(), this.messageStyles = le.processMessageStyles(e.messageStyles), this._remarkable = Ci.createNew(e.remarkable), this._applyHTMLToRemarkable = (t = e.remarkable) == null ? void 0 : t.applyHTML, e.avatars && (this.avatar = new Et(e.avatars)), e.names && (this.name = new li(e.names)), e.browserStorage && (this.browserStorage = new gl(e.browserStorage)), this._onMessage = ln.onMessage.bind(this, e), e.htmlClassUtilities && (this.htmlClassUtilities = e.htmlClassUtilities), (e.hiddenMessages || e.scrollButton) && (this.scrollButton = new Vt(this, e.hiddenMessages, e.scrollButton)), this.focusMode = le.processFocusMode(e.focusMode), this.focusMode || (this._lastGroupMessagesElement = x(), this.elementRef.appendChild(this._lastGroupMessagesElement), e.upwardsMode && (this.elementRef = this._lastGroupMessagesElement)), typeof this.focusMode != "boolean" && ((n = this.focusMode) != null && n.fade) && Ki.setFade(this.elementRef, this.focusMode.fade), this._customWrappers = e.htmlWrappers || le.processStreamHTMLWrappers((i = e.connect) == null ? void 0 : i.stream), typeof this.focusMode != "boolean" && ((r = this.focusMode) == null ? void 0 : r.streamAutoScroll) === !1 && (this.autoScrollAllowed = !1), e.maxVisibleMessages && (this.maxVisibleMessages = e.maxVisibleMessages), setTimeout(() => {
      this.submitUserMessage = e.submitUserMessage;
    });
  }
  static createContainerElement() {
    const e = x();
    return e.id = Oo, e;
  }
  addNewTextMessage(e, t, n, i = !1) {
    if (n != null && n.status) {
      const o = this.overwriteText(t, e, this.messageElementRefs);
      if (o) return o;
      n.status = !1;
    }
    const r = i ? this.createAndPrependNewMessageElement(e, t, i) : this.createAndAppendNewMessageElement(e, t);
    return r.bubbleElement[m].add(He.TEXT_BUBBLE_CLASS), this.applyCustomStyles(r, t, !1), B.fillEmptyMessageElement(r.bubbleElement, e), r;
  }
  // prettier-ignore
  overwriteText(e, t, n) {
    const i = B.overwriteMessage(
      this.messageToElements,
      n,
      t,
      e,
      "text",
      He.TEXT_BUBBLE_CLASS
    );
    return i && this.renderText(i.bubbleElement, t, e), i;
  }
  createAndAppendNewMessageElement(e, t) {
    const n = this.createNewMessageElement(e, t);
    return this.appendOuterContainerElemet(n.outerContainer, this.focusMode ? t : void 0), n;
  }
  createNewGroupElementFocusMode() {
    var t;
    (t = this._lastGroupMessagesElement) == null || t[m].remove(He.LAST_GROUP_MESSAGES_ACTIVE);
    const e = x();
    (this.messageToElements.length > 1 || this.messageToElements.length === 1 && this.messageToElements[0][0][C] !== F) && e[m].add(He.LAST_GROUP_MESSAGES_ACTIVE), this._lastGroupMessagesElement = e;
  }
  appendOuterContainerElemet(e, t) {
    var n;
    this.focusMode && (t === F || !this._lastGroupMessagesElement) && this.createNewGroupElementFocusMode(), (n = this._lastGroupMessagesElement) == null || n.appendChild(e), this._lastGroupMessagesElement && (this.focusMode || !this.elementRef.contains(this._lastGroupMessagesElement)) && this.elementRef.appendChild(this._lastGroupMessagesElement);
  }
  createAndPrependNewMessageElement(e, t, n, i = !1) {
    var o;
    const r = this.createNewMessageElement(e, t, n, i);
    if (n && ((o = this.elementRef.firstChild) != null && o[m].contains(He.INTRO_CLASS))) {
      this.elementRef.firstChild.insertAdjacentElement("afterend", r.outerContainer);
      const a = this.messageElementRefs[0];
      this.messageElementRefs[0] = this.messageElementRefs[1], this.messageElementRefs[1] = a;
    } else
      this.elementRef.insertBefore(r.outerContainer, this.elementRef.firstChild);
    return r;
  }
  createMessageElementsOnOrientation(e, t, n, i = !1) {
    return n ? this.createAndPrependNewMessageElement(e, t, n, i) : this.createNewMessageElement(e, t, n, i);
  }
  getNumberOfContentMessages() {
    var t, n;
    const e = this.messageElementRefs.length;
    return (n = (t = this.messageElementRefs[e - 1]) == null ? void 0 : t.bubbleElement) != null && n[m].contains(ft.BUBBLE_CLASS) ? e - 1 : e;
  }
  createNewMessageElement(e, t, n = !1, i = !1) {
    var o;
    !i && this.getNumberOfContentMessages() >= this.maxVisibleMessages && setTimeout(() => this.removeFirstMessage()), i || (o = this._introPanel) == null || o.hide();
    const r = this.messageElementRefs[this.messageElementRefs.length - 1];
    return It.changeFullViewToSmall(this), !n && He.isTemporaryElement(r) && (this.revealRoleElementsIfTempRemoved(r, t), this.removeLastMessage()), this.createMessageElements(e, t, n);
  }
  // this can be tested by having an ai message, then a temp ai message with html that submits new user message:
  // https://github.com/OvidijusParsiunas/tejas/issues/258
  // prettier-ignore
  revealRoleElementsIfTempRemoved(e, t) {
    if ((this.avatar || this.name) && gt.isElementTemporary(e)) {
      const n = this.messageElementRefs[this.messageElementRefs.length - 2];
      n && this.messageToElements.length > 0 && !e.bubbleElement[m].contains(B.getRoleClass(t)) && B.revealRoleElements(n.innerContainer, this.avatar, this.name);
    }
  }
  static isTemporaryElement(e) {
    return He.isLoadingMessage(e) || gt.isElementTemporary(e);
  }
  createElements(e, t) {
    const n = He.createBaseElements(t), { outerContainer: i, innerContainer: r, bubbleElement: o } = n;
    return i.appendChild(r), this.addInnerContainerElements(o, e, t), n;
  }
  createMessageElements(e, t, n = !1) {
    const i = this.createElements(e, t);
    return B.updateRefArr(this.messageElementRefs, i, n), B.classifyRoleMessages(this.messageElementRefs, t), i;
  }
  static createBaseElements(e) {
    const t = x(), n = x();
    n[m].add("inner-message-container"), t.appendChild(n), t[m].add("outer-message-container"), t[m].add(B.buildRoleOuterContainerClass(e));
    const i = x();
    return i[m].add("message-bubble"), n.appendChild(i), { outerContainer: t, innerContainer: n, bubbleElement: i };
  }
  // prettier-ignore
  addInnerContainerElements(e, t, n) {
    const i = this.messageElementRefs[this.messageElementRefs.length - 1];
    return B.areOuterContainerClassRolesSame(n, i) && !this.isLastMessageError() && B.hideRoleElements(i.innerContainer, this.avatar, this.name), e[m].add(
      "message-bubble",
      B.getRoleClass(n),
      n === F ? "user-message-text" : "ai-message-text"
    ), this.renderText(e, t, n), B.addRoleElements(e, n, this.avatar, this.name), { bubbleElement: e };
  }
  // prettier-ignore
  applyCustomStyles(e, t, n, i) {
    e && this.messageStyles && Ne.applyCustomStyles(this.messageStyles, e, t, n, i);
  }
  static createMessageContent(e) {
    const { text: t, files: n, html: i, custom: r, _sessionId: o, role: a } = e, c = { [C]: a || te };
    return t && (c[h] = t), n && (c[b] = n), i && (c[L] = i), !t && !n && !i && (c[h] = ""), r && (c.custom = r), o && (c._sessionId = o), c;
  }
  removeMessage(e) {
    e.outerContainer.remove();
    const t = this.messageElementRefs.findIndex((n) => n === e);
    this.messageElementRefs.splice(t, 1);
  }
  removeFirstMessage() {
    this.messageElementRefs[0].outerContainer.remove(), this.messageElementRefs.shift();
  }
  removeLastMessage() {
    this.messageElementRefs[this.messageElementRefs.length - 1].outerContainer.remove(), this.messageElementRefs.pop();
  }
  isLastMessageError() {
    var e;
    return (e = B.getLastMessageBubbleElement(this.elementRef)) == null ? void 0 : e[m].contains(zi);
  }
  static isLoadingMessage(e) {
    return e == null ? void 0 : e.bubbleElement[m].contains(ft.BUBBLE_CLASS);
  }
  sendClientUpdate(e, t = !1) {
    var n;
    (n = this._onMessage) == null || n.call(this, e, t);
  }
  // role is optional to not add wrapper to error
  renderText(e, t, n) {
    const { contentEl: i, wrapper: r } = re.tryAddWrapper(e, t, this._customWrappers, n);
    r && re.apply(this, e), i.innerHTML = this._remarkable.render(t), this._applyHTMLToRemarkable && re.apply(this, i), i.innerText.trim().length === 0 && i.children.length > 0 && i.children[0].tagName !== "P" && (i.innerText = t);
  }
  // this is mostly used for enabling highlight.js to highlight code if it downloads later
  refreshTextMessages(e) {
    this._remarkable = Ci.createNew(e), this.messageToElements.forEach((t) => {
      t[1][h] && t[0][h] && this.renderText(t[1][h].bubbleElement, t[0][h], t[0][C]);
    });
  }
  getFirstMessageContentEl() {
    const { text: e, html: t, files: n } = this.messageToElements[this.messageToElements.length - 1][1];
    return e || t || (n == null ? void 0 : n[0]);
  }
  scrollToFirstElement(e, t) {
    var n;
    if (e === F) {
      const i = typeof this.focusMode != "boolean" && ((n = this.focusMode) == null ? void 0 : n.smoothScroll);
      V.scrollToBottom(this, i);
    } else if (t && this.autoScrollAllowed) {
      const i = this.getFirstMessageContentEl();
      V.scrollToBottom(this, !1, i == null ? void 0 : i.outerContainer);
    }
  }
};
He.TEXT_BUBBLE_CLASS = "text-message", He.INTRO_CLASS = "tejas-intro", He.LAST_GROUP_MESSAGES_ACTIVE = "tejas-last-group-messages-active";
let tt = He;
class B {
  static getLastElementsByClass(e, t, n) {
    for (let i = e.length - 1; i >= 0; i -= 1) {
      const r = e[i];
      if (r.bubbleElement[m].contains(t[0]) && !t.slice(1).find((a) => !r.bubbleElement[m].contains(a)))
        if (n) {
          if (!n.find((c) => r.bubbleElement[m].contains(c))) return r;
        } else
          return r;
    }
  }
  static getLastMessage(e, t, n) {
    for (let i = e.length - 1; i >= 0; i -= 1)
      if (e[i][0][C] === t)
        if (n) {
          if (e[i][0][n]) return e[i][0];
        } else
          return e[i][0];
  }
  static getLastTextToElement(e, t) {
    for (let n = e.length - 1; n >= 0; n -= 1)
      if (e[n][0] === t)
        return e[n];
  }
  // IMPORTANT: If the overwrite message does not contain a role property it will look for the last 'ai' role message
  // and if messages have custom roles, it will still look to update the last 'ai' role message
  // prettier-ignore
  static overwriteMessage(e, t, n, i, r, o) {
    const a = B.getLastElementsByClass(
      t,
      [B.getRoleClass(i), o],
      [ft.BUBBLE_CLASS]
    ), c = B.getLastMessage(e, i, r);
    return c && (c[r] = n), a;
  }
  static getRoleClass(e) {
    return `${e}-message`;
  }
  // makes sure the bubble has dimensions when there is no text
  static fillEmptyMessageElement(e, t) {
    t.trim().length === 0 && (e[m].add(kr), e.innerHTML = '<div style="color:#00000000">.</div>');
  }
  static unfillEmptyMessageElement(e, t) {
    e[m].contains(kr) && t.trim().length > 0 && e.replaceChildren();
  }
  static getLastMessageBubbleElement(e) {
    var t, n, i;
    return Array.from(((i = (n = (t = B.getLastMessageElement(e)) == null ? void 0 : t.children) == null ? void 0 : n[0]) == null ? void 0 : i.children) || []).find((r) => r[m].contains("message-bubble"));
  }
  static getLastMessageElement(e) {
    var n;
    const t = (n = e.children[e.children.length - 1]) == null ? void 0 : n.children;
    return t == null ? void 0 : t[t.length - 1];
  }
  static addRoleElements(e, t, n, i) {
    n == null || n.addBesideBubble(e, t), i == null || i.addBesideBubble(e, t);
  }
  static hideRoleElements(e, t, n) {
    t == null || t.tryHide(e), n == null || n.tryHide(e);
  }
  static revealRoleElements(e, t, n) {
    t == null || t.tryReveal(e), n == null || n.tryReveal(e);
  }
  static softRemRoleElements(e, t, n) {
    t == null || t.trySoftRem(e), n == null || n.trySoftRem(e);
  }
  static updateRefArr(e, t, n) {
    n ? e.unshift(t) : e.push(t);
  }
  static buildRoleOuterContainerClass(e) {
    return `${Li}${e}`;
  }
  static addNewPositionClasses(e, t) {
    e.outerContainer[m].remove(
      Rs,
      Pr,
      Is
    ), e.outerContainer[m].add(...t);
  }
  static getNumberOfElements(e) {
    let t = 0;
    return e[h] !== void 0 && (t += 1), e[L] !== void 0 && (t += 1), e[b] && (t += e[b].length), t;
  }
  static filterdMessageElements(e, t) {
    return e.filter((n) => n.bubbleElement[m].contains(t));
  }
  static findMessageElements(e, t) {
    return e.find((n) => n.bubbleElement[m].contains(t));
  }
  static generateMessageBodyElements(e, t) {
    const n = {};
    return e[h] && (n[h] = B.findMessageElements(t, tt.TEXT_BUBBLE_CLASS)), e[L] && (n[L] = B.findMessageElements(t, bt.HTML_BUBBLE_CLASS)), e[b] && (n[b] = B.filterdMessageElements(t, Po)), n;
  }
  static generateMessageBody(e, t, n = !1) {
    const i = B.getNumberOfElements(e), r = n ? t.slice(0, i) : t.slice(t.length - i);
    return B.generateMessageBodyElements(e, r);
  }
  // if role not present - traverse all, if present - traverse last messages
  static classifyRoleMessages(e, t) {
    let n = t ? B.buildRoleOuterContainerClass(t) : void 0;
    for (let i = e.length - 1; i >= 0; i -= 1) {
      if (t || (n = Array.from(e[i].outerContainer[m]).find(
        (p) => p.startsWith(Li)
      )), !n) continue;
      const r = e[i], o = r.outerContainer[m].contains(n), a = e[i - 1], c = e[i + 1], l = a == null ? void 0 : a.outerContainer[m].contains(n), d = c == null ? void 0 : c.outerContainer[m].contains(n);
      if (o)
        !l && d ? B.addNewPositionClasses(r, [Rs]) : l && d ? B.addNewPositionClasses(r, [Pr]) : l && !d ? B.addNewPositionClasses(r, [Is]) : !l && !d && B.addNewPositionClasses(r, [Rs, Is]);
      else if (t)
        break;
    }
  }
  static areOuterContainerClassRolesSame(e, t) {
    return t ? Array.from(t.outerContainer[m]).find(
      (i) => i.startsWith(Li)
    ) === B.buildRoleOuterContainerClass(e) : !1;
  }
  static resetAllRoleElements(e, t, n) {
    if (!t && !n) return;
    let i = "";
    e.forEach((r, o) => {
      r.bubbleElement[m].contains(zi) || B.revealRoleElements(r.innerContainer, t, n);
      const a = Array.from(r.outerContainer[m]).find(
        (c) => c.startsWith(Li)
      );
      i === a && B.hideRoleElements(e[o - 1].innerContainer, t, n), i = a;
    });
  }
  // this is a workaround to prevent JSON.parse(JSON.stringify()) from removing the files' 'ref' property values
  // and 'custom' property value if it is not shallow copyable
  // note - structuredClone can fix this but it doesn't have good legacy compatibility
  static deepCloneMessagesWithReferences(e) {
    return e.map((t) => B.processMessageContent(t));
  }
  static processMessageContent(e) {
    if (e == null || typeof e !== U) return e;
    if (Array.isArray(e))
      return e.map((n) => B.processMessageContent(n));
    const t = {};
    return Object.entries(e).forEach(([n, i]) => {
      n === "ref" && i instanceof File || n === "custom" ? t[n] = i : i !== null && typeof i === U ? t[n] = B.processMessageContent(i) : t[n] = i;
    }), t;
  }
}
const St = class St {
  constructor(e, t) {
    this._fileAdded = !1, this._streamType = "", this._hasStreamEnded = !1, this._partialContent = "", this._messages = e, typeof t == "object" && (this._partialRender = t.partialRender);
  }
  upsertStreamedMessage(e) {
    if (this._hasStreamEnded) return;
    if ((e == null ? void 0 : e[h]) === void 0 && (e == null ? void 0 : e[L]) === void 0)
      return console[f](Bo);
    const t = (e == null ? void 0 : e[h]) || (e == null ? void 0 : e[L]) || "", n = V.isScrollbarAtBottomOfElement(this._messages.elementRef), i = (e == null ? void 0 : e[h]) !== void 0 ? h : L;
    if (!this._elements && !this._message)
      this.setInitialState(i, t, e == null ? void 0 : e[C]);
    else {
      if (this._streamType !== i)
        return console[f](xa);
      e != null && e[C] && (e == null ? void 0 : e[C]) !== this._activeMessageRole ? (this.finaliseStreamedMessage(!1), this.setInitialState(i, t, e == null ? void 0 : e[C])) : this.updateBasedOnType(t, i, e == null ? void 0 : e.overwrite);
    }
    e != null && e._sessionId && (this._sessionId = e == null ? void 0 : e._sessionId), e != null && e.custom && this._message && (this._message.custom = e.custom), n && this._messages.autoScrollAllowed && V.scrollToBottom(this._messages);
  }
  setInitialState(e, t, n) {
    var o, a, c;
    this._streamType = e, this._targetWrapper = void 0, this._fileAdded = !1, this._partialContent = "", this._partialBubble = void 0, n ?? (n = te);
    const i = ((o = this._messages._customWrappers) == null ? void 0 : o[n]) || ((a = this._messages._customWrappers) == null ? void 0 : a[w]), r = i ? "" : t;
    this._elements = e === h ? this._messages.addNewTextMessage(r, n) : bt.add(this._messages, r, n), this._elements && (this._elements.bubbleElement[m].add(St.MESSAGE_CLASS), this._activeMessageRole = n, this._message = { [C]: this._activeMessageRole, [e]: r }, this._messages.messageToElements.push([this._message, { [e]: this._elements }]), i && this.setTargetWrapperIfNeeded(this._elements, t, this._streamType, i), (c = this._messages.scrollButton) == null || c.updateHidden());
  }
  // not using existing htmlUtils htmlWrappers logic to be able to stream html
  setTargetWrapperIfNeeded(e, t, n, i) {
    e.bubbleElement.innerHTML = i, this._targetWrapper = re.getTargetWrapper(e.bubbleElement), this._elements && re.apply(this._messages, this._elements.bubbleElement), this.updateBasedOnType(t, n);
  }
  updateBasedOnType(e, t, n = !1) {
    var o;
    const i = this._targetWrapper || ((o = this._elements) == null ? void 0 : o.bubbleElement);
    this._partialRender || B.unfillEmptyMessageElement(i, e), (t === h ? this.updateText : this.updateHTML).bind(this)(e, i, n);
  }
  updateText(e, t, n) {
    this._message && (this._message[h] = n ? e : this._message[h] + e, this._partialRender && this.isNewPartialRenderParagraph(t, n) && this.partialRenderNewParagraph(t), this._partialBubble ? this.updatePartialRenderBubble(e) : this._messages.renderText(t, this._message[h]));
  }
  containsPartialRenderMark(e) {
    const t = e.indexOf(St.PARTIAL_RENDER_MARK);
    return t === -1 ? !1 : !e.substring(t + St.PARTIAL_RENDER_MARK.length).startsWith("---");
  }
  isNewPartialRenderParagraph(e, t) {
    var i;
    if (t)
      return e.innerHTML = "", !0;
    const n = this._streamType;
    if (!this._partialBubble) {
      const r = (i = this._message) == null ? void 0 : i[n];
      return !!r && this.containsPartialRenderMark(r);
    }
    return !!this._partialContent && this.containsPartialRenderMark(this._partialContent);
  }
  partialRenderNewParagraph(e) {
    this._partialContent = "", this._partialBubble = x(), this._partialBubble[m].add("partial-render-message"), e.appendChild(this._partialBubble);
  }
  updatePartialRenderBubble(e) {
    this._partialContent += e, this._streamType === h ? this._messages.renderText(this._partialBubble, this._partialContent) : this._partialBubble.innerHTML = this._partialContent;
  }
  updateHTML(e, t, n) {
    if (this._message)
      if (this._message[L] = n ? e : (this._message[L] || "") + e, this._partialRender && this.isNewPartialRenderParagraph(t, n) && this.partialRenderNewParagraph(t), this._partialBubble)
        this.updatePartialRenderBubble(e);
      else if (n)
        t.innerHTML = e;
      else {
        const i = x("span");
        i.innerHTML = e, t.appendChild(i);
      }
  }
  finaliseStreamedMessage(e = !0) {
    var t, n;
    if (!this._endStreamAfterOperation && !(this._fileAdded && !this._elements)) {
      if (!this._elements) throw Error(wa);
      this._message && (t = this._elements.bubbleElement) != null && t[m].contains(St.MESSAGE_CLASS) && (this._streamType === h ? this._messages.textToSpeech && An.speak(this._message[h] || "", this._messages.textToSpeech) : this._streamType === L && this._elements && re.apply(this._messages, this._elements.outerContainer), this._elements.bubbleElement[m].remove(St.MESSAGE_CLASS), this._message && (this._sessionId && (this._message._sessionId = this._sessionId), this._messages.sendClientUpdate(tt.createMessageContent(this._message), !1), (n = this._messages.browserStorage) == null || n.addMessages(this._messages.messageToElements.map(([i]) => i))), this._hasStreamEnded = e);
    }
  }
  markFileAdded() {
    this._fileAdded = !0;
  }
  // prettier-ignore
  async endStreamAfterFileDownloaded(e, t) {
    this._endStreamAfterOperation = !0;
    const { text: n, files: i } = await t();
    n && this.updateBasedOnType(n, h, !0), this._endStreamAfterOperation = !1, this.finaliseStreamedMessage(), i && e.addNewMessage({ [b]: i });
  }
};
St.MESSAGE_CLASS = "streamed-message", St.PARTIAL_RENDER_MARK = `

`;
let dt = St;
class D {
  // need to pass stringifyBody boolean separately as binding is throwing an error for some reason
  // prettier-ignore
  static async tempRemoveContentHeader(e, t, n) {
    if (!(e != null && e.headers)) throw new Error(Ue);
    const i = e.headers[G];
    delete e.headers[G];
    let r;
    try {
      r = await t(n);
    } catch (o) {
      throw e.headers[G] = i, o;
    }
    return e.headers[G] = i, r;
  }
  static displayError(e, t, n = "Service error, please try again.") {
    if (console[f](t), typeof t === U)
      return t instanceof Error ? e.addNewErrorMessage(oe, t.message) : Array.isArray(t) || typeof t[f] === ye ? e.addNewErrorMessage(oe, t) : Object.keys(t).length === 0 ? e.addNewErrorMessage(oe, n) : e.addNewErrorMessage(oe, ce(t));
    e.addNewErrorMessage(oe, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fetch(e, t, n, i) {
    var o, a;
    const r = { method: ((o = e.connectSettings) == null ? void 0 : o.method) || be, headers: t };
    return r.method !== he && (r.body = n ? ce(i) : i), e.connectSettings.credentials && (r.credentials = e.connectSettings.credentials), fetch(((a = e.connectSettings) == null ? void 0 : a.url) || e.url || "", r);
  }
  static processResponseByType(e) {
    const t = e.headers.get("content-type");
    return t != null && t.includes(ee) ? e.json() : t != null && t.includes("text/plain") || !t ? e : e.blob();
  }
  static async processRequestInterceptor(e, t) {
    var o;
    const n = await ((o = e.requestInterceptor) == null ? void 0 : o.call(e, t)) || t, i = n, r = n;
    return { body: i.body, headers: i.headers, error: r[f] };
  }
  static validateResponseFormat(e, t) {
    if (!e) return !1;
    const n = Array.isArray(e) ? e : [e];
    return t && n.length > 1 ? (console[f](No), !1) : !n.find(
      (r) => typeof r != "object" || !(typeof r[f] === ye || typeof r[h] === ye || typeof r[L] === ye || Array.isArray(r[b]))
    );
  }
  static onInterceptorError(e, t, n) {
    e.addNewErrorMessage(oe, t), n == null || n();
  }
  // prettier-ignore
  static async basicResponseProcessing(e, t, n = {}) {
    const { io: i, displayError: r = !0, useRI: o = !0 } = n;
    if (!(i != null && i.extractResultData)) return t;
    const a = o ? i.tejas.responseInterceptor : void 0, c = await (a == null ? void 0 : a(t)) || t, l = await i.extractResultData(c);
    if (!l || typeof l != "object" && !Array.isArray(l)) {
      if (r) {
        const d = wn(t, "response", !!a, c);
        D.displayError(e, d);
      }
      return;
    }
    return l;
  }
}
async function bl(s, e) {
  const t = s.getReader();
  let n;
  for (; !(n = await t.read()).done; )
    e(n.value);
}
function _l(s) {
  let e, t, n, i = !1;
  return function(o) {
    e === void 0 ? (e = o, t = 0, n = -1) : e = El(e, o);
    const a = e.length;
    let c = 0;
    for (; t < a; ) {
      i && (e[t] === 10 && (c = ++t), i = !1);
      let l = -1;
      for (; t < a && l === -1; ++t)
        switch (e[t]) {
          case 58:
            n === -1 && (n = t - c);
            break;
          case 13:
            i = !0;
          case 10:
            l = t;
            break;
        }
      if (l === -1)
        break;
      s(e.subarray(c, l), n), c = t, n = -1;
    }
    c === a ? e = void 0 : c !== 0 && (e = e.subarray(c), t -= c);
  };
}
function yl(s, e, t) {
  let n = Zr();
  const i = new TextDecoder();
  return function(o, a) {
    if (o.length === 0)
      t == null || t(n), n = Zr();
    else if (a > 0) {
      const c = i.decode(o.subarray(0, a)), l = a + (o[a + 1] === 32 ? 2 : 1), d = i.decode(o.subarray(l));
      switch (c) {
        case "data":
          n.data = n.data ? n.data + `
` + d : d;
          break;
        case "event":
          n.event = d;
          break;
        case "id":
          s(n.id = d);
          break;
        case "retry":
          const p = parseInt(d, 10);
          isNaN(p) || e(n.retry = p);
          break;
      }
    }
  };
}
function El(s, e) {
  const t = new Uint8Array(s.length + e.length);
  return t.set(s), t.set(e, s.length), t;
}
function Zr() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}
var vl = function(s, e) {
  var t = {};
  for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && e.indexOf(n) < 0 && (t[n] = s[n]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(s); i < n.length; i++)
      e.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, n[i]) && (t[n[i]] = s[n[i]]);
  return t;
};
const Hs = "text/event-stream", Sl = 1e3, Jr = "last-event-id";
function Cl(s, e) {
  var { signal: t, headers: n, onopen: i, onmessage: r, onclose: o, onerror: a, openWhenHidden: c, fetch: l } = e, d = vl(e, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise((p, u) => {
    const g = Object.assign({}, n);
    g.accept || (g.accept = Hs);
    let _;
    function y() {
      _.abort(), document.hidden || Te();
    }
    c || document.addEventListener("visibilitychange", y);
    let S = Sl, M = 0;
    function K() {
      document.removeEventListener("visibilitychange", y), window.clearTimeout(M), _.abort();
    }
    t == null || t.addEventListener("abort", () => {
      K(), p();
    });
    const ie = l ?? window.fetch, se = i ?? xl;
    async function Te() {
      var Pt;
      _ = new AbortController();
      try {
        const Lt = await ie(s, Object.assign(Object.assign({}, d), { headers: g, signal: _.signal }));
        await se(Lt), await bl(Lt.body, _l(yl((Ve) => {
          Ve ? g[Jr] = Ve : delete g[Jr];
        }, (Ve) => {
          S = Ve;
        }, r))), o == null || o(), K(), p();
      } catch (Lt) {
        if (!_.signal.aborted)
          try {
            const Ve = (Pt = a == null ? void 0 : a(Lt)) !== null && Pt !== void 0 ? Pt : S;
            window.clearTimeout(M), M = window.setTimeout(Te, Ve);
          } catch (Ve) {
            K(), u(Ve);
          }
      }
    }
    Te();
  });
}
function xl(s) {
  const e = s.headers.get("content-type");
  if (!(e != null && e.startsWith(Hs)))
    throw new Error(`Expected content-type to be ${Hs}, Actual: ${e}`);
}
class W {
  // prettier-ignore
  static async request(e, t, n, i = !0, r = !1) {
    var u, g, _, y, S;
    const o = { body: t, headers: (u = e.connectSettings) == null ? void 0 : u.headers }, { body: a, headers: c, error: l } = await D.processRequestInterceptor(e.tejas, o);
    if (l) return D.onInterceptorError(n, l, e.streamHandlers.onClose);
    if ((g = e.connectSettings) != null && g.handler) return lt.stream(e, a, n);
    if (((_ = e.connectSettings) == null ? void 0 : _.url) === ut.URL) return ut.requestStream(n, e);
    const d = new dt(n, e.stream), p = {
      method: ((y = e.connectSettings) == null ? void 0 : y.method) || be,
      headers: c,
      credentials: (S = e.connectSettings) == null ? void 0 : S.credentials,
      body: i ? ce(a) : a
    };
    return typeof e.stream == "object" && e.stream.readable ? W.handleReadableStream(e, n, d, p, r, a) : W.handleEventStream(e, n, d, p, r, a), d;
  }
  // prettier-ignore
  static handleReadableStream(e, t, n, i, r, o) {
    var d;
    const { onOpen: a, onClose: c } = e.streamHandlers;
    let l = !1;
    fetch(((d = e.connectSettings) == null ? void 0 : d.url) || e.url || "", i).then(async (p) => {
      var y, S;
      if (!p.body) throw new Error(Aa);
      const u = p.body.getReader(), g = new TextDecoder();
      a();
      let _ = !1;
      for (; !_ && !l; ) {
        const { value: M, done: K } = await u.read();
        if (_ = K, _)
          W.handleClose(e, n, c, r);
        else {
          const ie = g.decode(M, { stream: !0 }), se = await ((S = (y = e.tejas).responseInterceptor) == null ? void 0 : S.call(y, ie)) || ie, Te = typeof se == "object" ? se : { [h]: ie };
          W.handleMessage(e, t, n, Te, o);
        }
      }
    }).catch((p) => {
      W.handleError(e, t, p);
    }), e.streamHandlers.onAbort = () => {
      n.finaliseStreamedMessage(), e.streamHandlers.onClose(), l = !0;
    };
  }
  // prettier-ignore
  static handleEventStream(e, t, n, i, r, o) {
    var d;
    const { onOpen: a, onClose: c } = e.streamHandlers, l = new AbortController();
    e.streamHandlers.onAbort = () => {
      n.finaliseStreamedMessage(), e.streamHandlers.onClose(), l.abort();
    }, Cl(((d = e.connectSettings) == null ? void 0 : d.url) || e.url || "", {
      ...i,
      openWhenHidden: !0,
      // keep stream open when browser tab not open
      async onopen(p) {
        if (p.ok)
          return a();
        throw await D.processResponseByType(p);
      },
      async onmessage(p) {
        var u, g;
        if (ce(p.data) !== ce("[DONE]")) {
          let _;
          try {
            _ = JSON.parse(p.data);
          } catch {
            _ = {};
          }
          const y = await ((g = (u = e.tejas).responseInterceptor) == null ? void 0 : g.call(u, _)) || _;
          W.handleMessage(e, t, n, y, o);
        }
      },
      onerror(p) {
        throw c(), p;
      },
      onclose() {
        W.handleClose(e, n, c, r);
      },
      signal: l.signal
    }).catch((p) => {
      W.handleError(e, t, p);
    });
  }
  //prettier-ignore
  static handleMessage(e, t, n, i, r) {
    var o;
    (o = e.extractResultData) == null || o.call(e, i, r).then((a) => {
      W.upsertContent(t, n.upsertStreamedMessage.bind(n), n, a), t.removeError();
    }).catch(
      (a) => {
        t.isLastMessageError() || D.displayError(t, a);
      }
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handleError(e, t, n) {
    var i;
    t.isLastMessageError() || (i = e.extractResultData) == null || i.call(e, n).then(() => {
      D.displayError(t, n);
    }).catch((r) => {
      D.displayError(t, r);
    });
  }
  static handleClose(e, t, n, i) {
    if (e.asyncCallInProgress) {
      e.asyncCallInProgress = !1;
      return;
    }
    try {
      t.finaliseStreamedMessage(), n();
    } catch (r) {
      if (!i) throw r;
    }
  }
  // io is only passed for demo to simulate a real stream
  static async simulate(e, t, n, i) {
    if (!await D.basicResponseProcessing(e, n, { io: i, useRI: !1 })) return t.onClose();
    if (Array.isArray(n) && (n = n[0]), n[L]) {
      t.onOpen();
      let r = re.splitHTML(n[L]);
      r.length === 0 && (r = n[L].split(""));
      const o = new dt(e, i == null ? void 0 : i.stream);
      W.populateMessages(e, r, o, t, L, 0, i);
    }
    if (n[b]) {
      const r = await D.basicResponseProcessing(e, { [b]: n[b] }, { io: i });
      e.addNewMessage({ sendUpdate: !1, ...r }), !n[L] && !n[h] && (new dt(e, i == null ? void 0 : i.stream).finaliseStreamedMessage(), t.onClose());
    }
    if (n[h]) {
      t.onOpen();
      const r = n[h].split(""), o = new dt(e, i == null ? void 0 : i.stream);
      W.populateMessages(e, r, o, t, h, 0, i);
    }
    n[f] && (D.displayError(e, n[f]), t.onClose()), t.onAbort = () => {
      t.onClose();
    };
  }
  // prettier-ignore
  // io is only passed for demo to simulate a real stream
  static async populateMessages(e, t, n, i, r, o, a) {
    const c = t[o];
    if (c) {
      try {
        const d = await D.basicResponseProcessing(e, { [r]: c }, { io: a });
        W.upsertContent(e, n.upsertStreamedMessage.bind(n), n, d), e.removeError();
      } catch (d) {
        e.isLastMessageError() || D.displayError(e, d);
      }
      const l = setTimeout(() => {
        W.populateMessages(e, t, n, i, r, o + 1, a);
      }, i.simulationInterim || 6);
      i.onAbort = () => {
        W.abort(l, n, i.onClose);
      };
    } else
      n.finaliseStreamedMessage(), i.onClose();
  }
  static isSimulation(e) {
    return typeof e == "object" && !!e.simulation;
  }
  static isSimulatable(e, t) {
    return W.isSimulation(e) && t && (t[h] || t[L]);
  }
  static abort(e, t, n) {
    clearTimeout(e), t.finaliseStreamedMessage(), n();
  }
  static upsertContent(e, t, n, i) {
    if (i && Array.isArray(i) && (i = i[0]), i != null && i[h] || i != null && i[L]) {
      const r = t(i);
      n ?? (n = r || void 0);
    }
    if (i != null && i[b] && (e.addNewMessage({ [b]: i[b] }), n == null || n.markFileAdded()), i != null && i[f])
      throw i[f];
  }
}
const Zt = class Zt {
  static generateResponse(e) {
    const t = e[e.length - 1][0];
    if (t[b] && t[b].length > 0) {
      if (t[b].length > 1)
        return "These are interesting files!";
      const n = t[b][0];
      return n[T] && n[T].startsWith("data:image/gif") ? "That is a nice gif!" : n[E] === j ? "That is a nice image!" : n[E] === q ? "I like the sound of that!" : "That is an interesting file!";
    }
    if (t[h]) {
      if (t[h].charAt(t[h].length - 1) === "?")
        return "I'm sorry but I can't answer that question...";
      if (t[h].includes("updog"))
        return "What's updog?";
    }
    return "Hi there! This is a demo response!";
  }
  static getCustomResponse(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  static getResponse({ customDemoResponse: e, messageToElements: t }) {
    return e ? Zt.getCustomResponse(e, t[t.length - 1][0]) : { [h]: Zt.generateResponse(t) };
  }
  // timeout is used to simulate a timeout for a response to come back
  static request(e, t) {
    const n = Zt.getResponse(t);
    setTimeout(async () => {
      const i = await D.basicResponseProcessing(t, n, { io: e });
      if (!i) return e.completionsHandlers.onFinish();
      const r = Array.isArray(i) ? i : [i], o = r.find((a) => typeof a[f] === ye);
      o ? (t.addNewErrorMessage(oe, o[f]), e.completionsHandlers.onFinish()) : W.isSimulatable(e.stream, i) ? W.simulate(t, e.streamHandlers, i) : (r.forEach((a) => t.addNewMessage(a)), e.completionsHandlers.onFinish());
    }, 400);
  }
  // timeout is used to simulate a timeout for a response to come back
  static requestStream(e, t) {
    setTimeout(() => {
      const n = Zt.getResponse(e);
      W.simulate(e, t.streamHandlers, n, t);
    }, 400);
  }
};
Zt.URL = "tejas-demo";
let ut = Zt;
class Me {
  static setup(e) {
    e.permittedErrorPrefixes = ["Connection error", "Error in server message"], e.websocket = "pending";
  }
  static isElementPresentInDOM(e) {
    return e.getRootNode({ composed: !0 }) instanceof Document;
  }
  static createConnection(e, t) {
    if (!Me.isElementPresentInDOM(e.tejas)) return;
    const n = e.connectSettings.websocket;
    if (n) {
      if (e.connectSettings.handler) return lt.websocket(e, t);
      try {
        const i = typeof n != "boolean" ? n : void 0, r = new WebSocket(e.connectSettings.url || "", i);
        e.websocket = r, e.websocket.onopen = () => {
          var o, a;
          t.removeError(), e.websocket && typeof e.websocket === U && Me.assignListeners(e, r, t), (a = (o = e.tejas)._validationHandler) == null || a.call(o);
        }, e.websocket.onerror = (o) => {
          console[f](o), Me.retryConnection(e, t);
        };
      } catch (i) {
        console[f](i), Me.retryConnection(e, t);
      }
    }
  }
  static retryConnection(e, t) {
    var n, i;
    (i = (n = e.tejas)._validationHandler) == null || i.call(n), Me.isElementPresentInDOM(e.tejas) && (e.websocket = "pending", t.isLastMessageError() || t.addNewErrorMessage(oe, "Connection error"), setTimeout(() => {
      Me.createConnection(e, t);
    }, 5e3));
  }
  static assignListeners(e, t, n) {
    const i = {};
    t.onmessage = async (r) => {
      if (e.extractResultData)
        try {
          const o = JSON.parse(r.data), a = await D.basicResponseProcessing(n, o, { io: e, displayError: !1 });
          if (!a)
            throw Error(wn(o, "server", !!e.tejas.responseInterceptor, a));
          if (W.isSimulation(e.stream)) {
            const c = Me.stream.bind(this, e, n, i), l = i[o[C] || te];
            W.upsertContent(n, c, l, a);
          } else {
            const c = Array.isArray(a) ? a : [a], l = c.find((d) => typeof d[f] === ye);
            if (l) throw l[f];
            c.forEach((d) => n.addNewMessage(d));
          }
        } catch (o) {
          D.displayError(n, o, "Error in server message");
        }
    }, t.onclose = () => {
      var r, o;
      console[f]("Connection closed"), n.isLastMessageError() || n.addNewErrorMessage(oe, "Connection error"), e.stream && ((o = (r = e.streamHandlers).onAbort) == null || o.call(r)), Me.createConnection(e, n);
    };
  }
  static async sendWebsocket(e, t, n, i = !0) {
    var d, p;
    if (((d = e.connectSettings) == null ? void 0 : d.url) === ut.URL) return ut.request(e, n);
    const r = e.websocket;
    if (!r || r === "pending") return;
    const o = { body: t, headers: (p = e.connectSettings) == null ? void 0 : p.headers }, { body: a, error: c } = await D.processRequestInterceptor(e.tejas, o);
    if (c) return n.addNewErrorMessage(oe, c);
    if (!Me.isWebSocket(r)) return r.newUserMessage.listener(a);
    const l = i ? ce(a) : a;
    r.readyState === void 0 || r.readyState !== r.OPEN ? (console[f]("Connection is not open"), n.isLastMessageError() || n.addNewErrorMessage(oe, "Connection error")) : (r.send(ce(l)), e.completionsHandlers.onFinish());
  }
  static canSendMessage(e) {
    return e ? e === "pending" ? !1 : Me.isWebSocket(e) ? e.readyState !== void 0 && e.readyState === e.OPEN : e.isOpen : !0;
  }
  // if false then it is the internal websocket handler
  static isWebSocket(e) {
    return e.send !== void 0;
  }
  static stream(e, t, n, i) {
    if (!i) return;
    const r = e.stream.simulation;
    if (typeof r === ye) {
      const o = i[C] || te, a = n[o];
      i[h] === r || i[L] === r ? (a == null || a.finaliseStreamedMessage(), delete n[o]) : (n[o] ?? (n[o] = new dt(t, e.stream)), n[o].upsertStreamedMessage(i));
    } else
      W.simulate(t, e.streamHandlers, i);
  }
}
class lt {
  static async request(e, t, n) {
    var a, c;
    let i = !0;
    const r = async (l) => {
      if (!i) return;
      i = !1;
      const d = await D.basicResponseProcessing(n, l, { io: e, displayError: !1 });
      if (!d)
        console[f](wn(l, "server", !!e.tejas.responseInterceptor, d)), n.addNewErrorMessage(oe, "Error in server message"), e.completionsHandlers.onFinish();
      else {
        const p = Array.isArray(d) ? d : [d], u = p.find((g) => typeof g[f] === ye);
        u ? (console[f](u[f]), n.addNewErrorMessage(oe, u[f]), e.completionsHandlers.onFinish()) : W.isSimulatable(e.stream, d) ? W.simulate(n, e.streamHandlers, d) : (p.forEach((g) => n.addNewMessage(g)), e.completionsHandlers.onFinish());
      }
    }, o = lt.generateOptionalSignals();
    (c = (a = e.connectSettings).handler) == null || c.call(a, t, { ...o, onResponse: r });
  }
  static attemptToFinaliseStream(e, t) {
    try {
      const n = t.messageElementRefs[t.messageElementRefs.length - 1];
      tt.isLoadingMessage(n) ? t.removeLastMessage() : e.finaliseStreamedMessage();
    } catch (n) {
      console[f](n), t.addNewErrorMessage(oe, n);
    }
  }
  // prettier-ignore
  static stream(e, t, n) {
    var p, u;
    let i = !0, r = !1;
    const o = new dt(n, e.stream), a = () => {
      r || !i || (e.streamHandlers.onOpen(), r = !0);
    }, c = () => {
      i && (lt.attemptToFinaliseStream(o, n), e.streamHandlers.onClose(), i = !1);
    }, l = async (g) => {
      if (!i) return;
      const _ = await D.basicResponseProcessing(n, g, { io: e, displayError: !1 });
      if (_)
        _[f] ? (lt.streamError(_[f], o, e, n), i = !1) : W.upsertContent(n, o.upsertStreamedMessage.bind(o), o, _);
      else {
        const y = wn(g, "server", !!e.tejas.responseInterceptor, _);
        lt.streamError(y, o, e, n), i = !1;
      }
    };
    e.streamHandlers.onAbort = () => {
      lt.attemptToFinaliseStream(o, n), e.streamHandlers.onClose(), i = !1;
    };
    const d = lt.generateOptionalSignals();
    (u = (p = e.connectSettings).handler) == null || u.call(
      p,
      t,
      { ...d, onOpen: a, onResponse: l, onClose: c, stopClicked: e.streamHandlers.stopClicked }
    );
  }
  static streamError(e, t, n, i) {
    console[f](e), t.finaliseStreamedMessage(), i.addNewErrorMessage(oe, e), n.streamHandlers.onClose();
  }
  // prettier-ignore
  static websocket(e, t) {
    var c, l;
    const n = { isOpen: !1, newUserMessage: { listener: () => {
    } }, roleToStream: {} };
    e.websocket = n;
    const i = () => {
      t.removeError(), n.isOpen = !0;
    }, r = () => {
      n.isOpen = !1;
    }, o = async (d) => {
      const p = await D.basicResponseProcessing(t, d, { io: e, displayError: !1 });
      if (!p)
        console[f](wn(d, "server", !!e.tejas.responseInterceptor, p)), t.addNewErrorMessage(oe, "Error in server message");
      else {
        const u = Array.isArray(p) ? p : [p], g = u.find((_) => typeof _[f] === ye);
        if (g)
          console[f](g[f]), t.isLastMessageError() || t.addNewErrorMessage(oe, g[f]);
        else if (W.isSimulation(e.stream)) {
          const _ = p, y = Me.stream.bind(this, e, t, n.roleToStream), S = n.roleToStream[_[C] || te];
          W.upsertContent(t, y, S, _);
        } else
          u.forEach((_) => t.addNewMessage(_));
      }
    }, a = lt.generateOptionalSignals();
    (l = (c = e.connectSettings).handler) == null || l.call(
      c,
      void 0,
      { ...a, onOpen: i, onResponse: o, onClose: r, newUserMessage: n.newUserMessage }
    );
  }
  static generateOptionalSignals() {
    return { onClose: () => {
    }, onOpen: () => {
    }, stopClicked: { listener: () => {
    } }, newUserMessage: { listener: () => {
    } } };
  }
}
class me {
  // prettier-ignore
  static async request(e, t, n, i = !0) {
    var p, u, g;
    const r = { body: t, headers: (p = e.connectSettings) == null ? void 0 : p.headers }, { body: o, headers: a, error: c } = await D.processRequestInterceptor(e.tejas, r), { onFinish: l } = e.completionsHandlers;
    if (c) return D.onInterceptorError(n, c, l);
    if ((u = e.connectSettings) != null && u.handler) return lt.request(e, o, n);
    if (((g = e.connectSettings) == null ? void 0 : g.url) === ut.URL) return ut.request(e, n);
    let d = !0;
    D.fetch(e, a, i, o).then((_) => (d = !!_.ok, _)).then((_) => D.processResponseByType(_)).then(async (_) => {
      var M, K;
      if (!e.extractResultData) return;
      const y = await ((K = (M = e.tejas).responseInterceptor) == null ? void 0 : K.call(M, _)) || _, S = await e.extractResultData(y, o);
      if (!d) throw _;
      if (!S || typeof S !== U && !Array.isArray(S))
        throw Error(wn(_, "response", !!e.tejas.responseInterceptor, y));
      if (S[f]) throw S[f];
      if (e.asyncCallInProgress) {
        e.asyncCallInProgress = !1;
        return;
      }
      W.isSimulatable(e.stream, S) ? W.simulate(n, e.streamHandlers, S) : ((Array.isArray(S) ? S : [S]).forEach((se) => n.addNewMessage(se)), l());
    }).catch((_) => {
      D.displayError(n, _), l();
    });
  }
  static executePollRequest(e, t, n, i) {
    const { onFinish: r } = e.completionsHandlers;
    fetch(t, n).then((o) => o.json()).then(async (o) => {
      var c, l;
      if (!e.extractPollResultData) return;
      const a = await e.extractPollResultData(await ((l = (c = e.tejas).responseInterceptor) == null ? void 0 : l.call(c, o)) || o);
      a.timeoutMS ? setTimeout(() => {
        me.executePollRequest(e, t, n, i);
      }, a.timeoutMS) : W.isSimulatable(e.stream, a) ? W.simulate(i, e.streamHandlers, a) : (i.addNewMessage(a), r());
    }).catch((o) => {
      D.displayError(i, o), r();
    });
  }
  // prettier-ignore
  static async poll(e, t, n, i = !0) {
    var g, _, y;
    const r = { body: t, headers: (g = e.connectSettings) == null ? void 0 : g.headers }, { body: o, headers: a, error: c } = await D.processRequestInterceptor(e.tejas, r);
    if (c) return D.onInterceptorError(n, c);
    const l = ((_ = e.connectSettings) == null ? void 0 : _.url) || e.url || "", d = ((y = e.connectSettings) == null ? void 0 : y.method) || be, p = i ? ce(o) : o, u = { method: d, body: p, headers: a };
    e.connectSettings.credentials && (u.credentials = e.connectSettings.credentials), me.executePollRequest(e, l, u, n);
  }
  // prettier-ignore
  static verifyKey(e, t, n, i, r, o, a, c, l) {
    if (e === "") return o(ue);
    a(), fetch(t, { method: i, headers: n, body: l || null }).then((d) => D.processResponseByType(d)).then((d) => {
      c(d, e, r, o);
    }).catch((d) => {
      o(Fe), console[f](d);
    });
  }
}
class In {
  static getCharacterLimitMessages(e, t) {
    var r;
    if (t === -1) return e;
    let n = 0, i = e.length - 1;
    for (i; i >= 0; i -= 1) {
      const o = (r = e[i]) == null ? void 0 : r[h];
      if (o !== void 0 && (n += o.length, n > t)) {
        e[i][h] = o.substring(0, o.length - (n - t));
        break;
      }
    }
    return e.slice(Math.max(i, 0));
  }
  static getMaxMessages(e, t) {
    return e.slice(Math.max(e.length - t, 0));
  }
  // if maxMessages is not defined we send all messages
  // if maxMessages above 0 we send that number
  // if maxMessages 0 or below we send only what is in the request
  static processMessages(e, t, n) {
    return t !== void 0 ? t > 0 && (e = In.getMaxMessages(e, t)) : e = [e[e.length - 1]], e = A(e), n === void 0 ? e : In.getCharacterLimitMessages(e, n);
  }
}
const Dt = class Dt {
  constructor(e, t, n) {
    this._isLoading = !1, this._isPaginationComplete = !1, this._index = 0, this._messages = t, n.fetchHistory && this.fetchHistory(n.fetchHistory), this.setupInitialHistory(e);
  }
  async fetchHistory(e) {
    const t = It.addMessage(this._messages), n = await e();
    this._messages.removeMessage(t), Dt.displayIntroMessages(this._messages.messageElementRefs), n.forEach((i) => this._messages.addAnyMessage(i, !0)), setTimeout(() => V.scrollToBottom(this._messages), 0);
  }
  scrollToPreloadFirstEl(e, t) {
    this._messages.elementRef.scrollTop = t + e.offsetTop - 40;
  }
  processLoadedHistory(e) {
    var a;
    const { messageElementRefs: t, messageToElements: n, elementRef: i } = this._messages, r = (a = t.find(
      (c) => !c.outerContainer[m].contains(tt.INTRO_CLASS)
    )) == null ? void 0 : a.outerContainer, o = i.scrollTop;
    e == null || e.reverse().map((c) => {
      const l = this._messages.addAnyMessage({ ...c, sendUpdate: !0 }, !0, !0);
      if (l) {
        const d = B.generateMessageBody(l, t, !0);
        n.unshift([l, d]);
      }
      return l;
    }).filter((c) => !!c).reverse().forEach((c) => this._messages.sendClientUpdate(c, !0)), r && (this._messages.messageElementRefs.length >= this._messages.maxVisibleMessages ? setTimeout(() => this.scrollToPreloadFirstEl(r, o)) : this.scrollToPreloadFirstEl(r, o));
  }
  populateMessages(e, t) {
    this._messages.removeMessage(e), this._isPaginationComplete = t.findIndex((a) => !a) < 0;
    const n = t.filter((a) => !!a);
    this.processLoadedHistory(n);
    const { messageElementRefs: i, avatar: r, name: o } = this._messages;
    B.resetAllRoleElements(i, r, o);
  }
  async loadHistoryOnScroll(e) {
    this._messages.elementRef.onscroll = async () => {
      if (!this._isLoading && !this._isPaginationComplete && this._messages.elementRef.scrollTop === 0) {
        this._isLoading = !0;
        const t = It.addMessage(this._messages, !1);
        try {
          const n = await e(this._index++);
          this.populateMessages(t, n), this._isLoading = !1;
        } catch (n) {
          this._messages.removeMessage(t), this._isPaginationComplete = !0, this._messages.addNewErrorMessage(oe, Dt.FAILED_ERROR_MESSAGE, !0), console[f](n);
        }
      }
    };
  }
  populateInitialHistory(e) {
    e.forEach((t) => {
      le.processHistoryFile(t), this._messages.addAnyMessage(t, !0);
    });
  }
  async loadInitialHistory(e) {
    this._isLoading = !0;
    const t = It.addMessage(this._messages);
    try {
      const n = await e(this._index++), i = this._messages.elementRef.scrollTop;
      this.populateMessages(t, n), this.restoreScrollOrScrollToBottom(i === 0);
    } catch (n) {
      this._messages.removeMessage(t), this._isPaginationComplete = !0, this._messages.addNewErrorMessage(oe, Dt.FAILED_ERROR_MESSAGE, !0), console[f](n);
    }
    Dt.displayIntroMessages(this._messages.messageElementRefs), this._isLoading = !1;
  }
  async setupInitialHistory(e) {
    var i;
    e.loadHistory && this.loadInitialHistory(e.loadHistory);
    const t = (i = this._messages.browserStorage) == null ? void 0 : i.get(), n = e.history || le.processHistory(e) || (t == null ? void 0 : t.messages);
    n && (this.populateInitialHistory(n), this.restoreScrollOrScrollToBottom(!0), this._index += 1);
  }
  restoreScrollOrScrollToBottom(e) {
    var n, i, r;
    const t = (i = (n = this._messages.browserStorage) == null ? void 0 : n.get()) == null ? void 0 : i.scrollHeight;
    t !== void 0 && ((r = this._messages.browserStorage) != null && r.trackScrollHeight) ? setTimeout(() => {
      this._messages.elementRef.scrollTop = t;
    }, 0) : e && setTimeout(() => V.scrollToBottom(this._messages), 0);
  }
  static addErrorPrefix(e) {
    e.permittedErrorPrefixes ?? (e.permittedErrorPrefixes = []), e.permittedErrorPrefixes.push(Dt.FAILED_ERROR_MESSAGE);
  }
  static displayIntroMessages(e) {
    for (let t = 0; t < e.length; t += 1) {
      const n = e[0];
      if (n.outerContainer[m].contains(tt.INTRO_CLASS))
        n.outerContainer[v].display = "";
      else
        break;
    }
  }
};
Dt.FAILED_ERROR_MESSAGE = "Failed to load history";
let xi = Dt;
class Ce {
  static parseConfig(e, t, n) {
    var r;
    const i = { files: e };
    if (typeof n == "object") {
      le.processFileConfigConnect(n);
      const { files: o, connect: a, button: c } = n;
      o && (o.infoModal && (i[b].infoModal = o.infoModal, (r = o.infoModal) != null && r.textMarkDown && (i.infoModalTextMarkUp = t.render(o.infoModal.textMarkDown))), o.acceptedFormats && (i[b].acceptedFormats = o.acceptedFormats), o.maxNumberOfFiles && (i[b].maxNumberOfFiles = o.maxNumberOfFiles)), i.button = c, a && Object.keys(a).length > 0 && (i.connect = a);
    }
    return i;
  }
  static processMixedFiles(e, t, n) {
    if (n) {
      const i = { acceptedFormats: "" };
      e.fileTypes.mixedFiles = Ce.parseConfig(i, t, n);
    }
  }
  // needs to be set after audio to overwrite maxNumberOfFiles
  // prettier-ignore
  static processMicrophone(e, t, n, i) {
    var a, c, l, d, p, u;
    const o = { acceptedFormats: "audio/*", ...((a = e.fileTypes[q]) == null ? void 0 : a[b]) || {} };
    n && (navigator.mediaDevices.getUserMedia !== void 0 ? (e.recordAudio = Ce.parseConfig(o, t, n), typeof n == "object" && n[b] && ((c = e.recordAudio)[b] ?? (c[b] = {}), e.recordAudio[b].format = (l = n[b]) == null ? void 0 : l.format, e.recordAudio[b].maxDurationSeconds = (d = n[b]) == null ? void 0 : d.maxDurationSeconds, (p = e.fileTypes[q]) != null && p[b] && ((u = e.fileTypes[q][b]).maxNumberOfFiles ?? (u.maxNumberOfFiles = n[b].maxNumberOfFiles)))) : i || (e.fileTypes[q] = Ce.parseConfig(o, t, n)));
  }
  // prettier-ignore
  static processAudioConfig(e, t, n, i) {
    if (!n && !i) return;
    const o = { acceptedFormats: "audio/*", ...(i == null ? void 0 : i[b]) || {} };
    e.fileTypes[q] = Ce.parseConfig(o, t, n);
  }
  // prettier-ignore
  static processGifConfig(e, t, n, i) {
    if (!n && !i) return;
    const o = { acceptedFormats: "image/gif", ...(i == null ? void 0 : i[b]) || {} };
    e.fileTypes[xn] = Ce.parseConfig(o, t, n);
  }
  // needs to be set after images to overwrite maxNumberOfFiles
  // prettier-ignore
  static processCamera(e, t, n, i) {
    var a, c, l, d;
    const o = { acceptedFormats: "image/*", ...((a = e.fileTypes[Q]) == null ? void 0 : a[b]) || {} };
    n && (navigator.mediaDevices.getUserMedia !== void 0 ? (e[De] = Ce.parseConfig(o, t, n), typeof n == "object" && (e[De].modalContainerStyle = n.modalContainerStyle, n[b] && ((c = e[De])[b] ?? (c[b] = {}), e[De][b].format = (l = n[b]) == null ? void 0 : l.format, e[De][b].dimensions = (d = n[b]) == null ? void 0 : d.dimensions))) : i || (e.fileTypes[Q] = Ce.parseConfig(o, t, n)));
  }
  // prettier-ignore
  static processImagesConfig(e, t, n, i) {
    if (!n && !i) return;
    const o = { acceptedFormats: "image/*", ...(i == null ? void 0 : i[b]) || {} };
    e.fileTypes[Q] = Ce.parseConfig(o, t, n);
  }
  // default for direct service
  static populateDefaultFileIO(e, t) {
    var n, i;
    e && (e[b] ?? (e[b] = {}), (n = e[b]).acceptedFormats ?? (n.acceptedFormats = t), (i = e[b]).maxNumberOfFiles ?? (i.maxNumberOfFiles = 1));
  }
  static set(e, t, n) {
    Ce.populateDefaultFileIO(n == null ? void 0 : n[q], ".4a,.mp3,.webm,.mp4,.mpga,.wav,.mpeg,.m4a"), Ce.populateDefaultFileIO(n == null ? void 0 : n[Q], ".png,.jpg");
    const i = Ci.createNew(e.remarkable);
    Ce.processImagesConfig(t, i, e[Q], n == null ? void 0 : n[Q]), Ce.processCamera(t, i, e[De], e[Q]), Ce.processGifConfig(t, i, e[xn], n == null ? void 0 : n[xn]), Ce.processAudioConfig(t, i, e[q], n == null ? void 0 : n[q]), Ce.processMicrophone(t, i, e[at], e[q]), Ce.processMixedFiles(t, i, e[ko]);
  }
}
class dn {
  constructor(e, t, n) {
    var i, r, o, a, c;
    this.rawBody = {}, this.validateKeyProperty = !1, this.canSendMessage = dn.canSendMessage, this.connectSettings = {}, this.fileTypes = {}, this.completionsHandlers = {}, this.streamHandlers = {}, this.tejas = e, this.demo = n, Object.assign(this.rawBody, (i = e.connect) == null ? void 0 : i.additionalBodyProps), this.totalMessagesMaxCharLength = (r = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : r.totalMessagesMaxCharLength, this.maxMessages = (o = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : o.maxMessages, Ce.set(e, this, t), e.connect && (this.connectSettings = e.connect), this.demo && ((a = this.connectSettings).url ?? (a.url = ut.URL)), this.connectSettings.websocket && Me.setup(this), this.stream = ((c = this.tejas.connect) == null ? void 0 : c.stream) || le.checkForStream(this.tejas), e.loadHistory && xi.addErrorPrefix(this);
  }
  static canSendMessage(e, t, n) {
    return n ? !0 : !!(e && e.trim() !== "") || !!(t && t.length > 0);
  }
  verifyKey(e, t) {
  }
  static createCustomFormDataBody(e, t, n) {
    const i = new FormData();
    n.forEach((a) => i.append("files", a)), Object.keys(e).forEach((a) => i.append(a, String(e[a])));
    let r = 0;
    t.slice(0, t.length - 1).forEach((a) => {
      i.append(`message${r += 1}`, ce(a));
    });
    const o = t[t.length - 1];
    return o[h] && (delete o[b], i.append(`message${r += 1}`, ce(o))), i;
  }
  getServiceIOByType(e) {
    if (e[E].startsWith(q) && this.fileTypes[q])
      return this.fileTypes[q];
    if (e[E].startsWith(j)) {
      if (this.fileTypes[xn] && e[E].endsWith("/gif")) return this.fileTypes[xn];
      if (this.fileTypes[Q]) return this.fileTypes[Q];
      if (this[De]) return this[De];
    }
    return this.fileTypes[ko];
  }
  async request(e, t, n = !0) {
    return this.stream && !W.isSimulation(this.stream) ? W.request(this, e, t, n) : me.request(this, e, t, n);
  }
  async callAPIWithText(e, t) {
    var r, o, a, c;
    const n = { messages: t, ...this.rawBody };
    let i = !1;
    (r = this.connectSettings.headers) != null && r[G] || ((o = this.connectSettings).headers ?? (o.headers = {}), (a = this.connectSettings.headers)[G] ?? (a[G] = ee), i = !0), await this.request(n, e), i && ((c = this.connectSettings.headers) == null || delete c[G]);
  }
  async callApiWithFiles(e, t, n) {
    const i = dn.createCustomFormDataBody(this.rawBody, t, n), r = this.connectSettings, o = this.getServiceIOByType(n[0]);
    this.connectSettings = (o == null ? void 0 : o.connect) || this.connectSettings, await this.request(i, e, !1), this.connectSettings = r;
  }
  async callServiceAPI(e, t, n) {
    n ? this.callApiWithFiles(e, t, n) : this.callAPIWithText(e, t);
  }
  // prettier-ignore
  async callAPI(e, t) {
    var i;
    if (!this.connectSettings) throw new Error(Ue);
    const n = In.processMessages(
      t.messageToElements.map(([r]) => r),
      this.maxMessages,
      this.totalMessagesMaxCharLength
    );
    if (this.connectSettings.websocket && (!this.connectSettings.handler || this.connectSettings.url !== ut.URL)) {
      const r = { messages: n, ...this.rawBody };
      e[b] && ((i = this.getServiceIOByType(e[b][0])) != null && i.connect) ? this.callApiWithFiles(t, n, e[b]) : Me.sendWebsocket(this, r, t, !1);
    } else
      this.callServiceAPI(t, n, e[b]);
  }
  async extractResultData(e) {
    if (e.result) return le.handleResponseProperty(e);
    if (D.validateResponseFormat(e, !!this.stream))
      return e;
  }
  isDirectConnection() {
    return !1;
  }
  isWebModel() {
    return !1;
  }
  isCustomView() {
    return !1;
  }
}
class k extends dn {
  // prettier-ignore
  constructor(e, t, n, i, r) {
    var o;
    super(e, r), this.insertKeyPlaceholderText = "API Key", this.keyHelpUrl = "", this.asyncCallInProgress = !1, this.systemMessage = "", Object.assign(this.rawBody, (o = e.connect) == null ? void 0 : o.additionalBodyProps), this._keyVerificationDetails = t, this._buildHeadersFunc = n, i && this.setApiKeyProperties(i), this.connectSettings = this.buildConnectSettings(this.key || "", e.connect);
  }
  setApiKeyProperties(e) {
    this.key = e.key, e.validateKeyProperty && (this.validateKeyProperty = e.validateKeyProperty);
  }
  buildConnectSettings(e, t) {
    const n = t ?? {};
    return n.headers ?? (n.headers = {}), Object.assign(n.headers, this._buildHeadersFunc(e)), n;
  }
  completeConfig(e, t) {
    e.system_prompt && (this.systemMessage = e.system_prompt), t && (this.functionHandler = t), delete e.system_prompt, delete e.key, delete e.function_handler, Object.assign(this.rawBody, e);
  }
  keyAuthenticated(e, t) {
    this.connectSettings = this.buildConnectSettings(t, this.connectSettings), this.key = t, e();
  }
  // prettier-ignore
  verifyKey(e, t) {
    const { url: n, method: i, handleVerificationResult: r, createHeaders: o, body: a, augmentUrl: c } = this._keyVerificationDetails, l = (o == null ? void 0 : o(e)) || this._buildHeadersFunc(e), d = (c == null ? void 0 : c(e)) || n;
    me.verifyKey(
      e,
      d,
      l,
      i,
      this.keyAuthenticated.bind(this, t.onSuccess),
      t.onFail,
      t.onLoad,
      r,
      a
    );
  }
  isDirectConnection() {
    return !0;
  }
  static getRoleViaUser(e) {
    return e === F ? F : mt;
  }
  static getRoleViaAI(e) {
    return e === te ? mt : F;
  }
  processMessages(e) {
    return In.getCharacterLimitMessages(
      e,
      this.totalMessagesMaxCharLength ? this.totalMessagesMaxCharLength - this.systemMessage.length : -1
    );
  }
  addSystemMessage(e) {
    this.systemMessage && e.unshift({ [C]: Rn, content: this.systemMessage });
  }
  async callDirectServiceServiceAPI(e, t, n, i, r) {
    if (!this.connectSettings) throw new Error(Ue);
    const o = n(this.rawBody, t), a = i ? this.stream : !1;
    if (a && (typeof a !== U || !a.simulation) || o.stream)
      o.stream = !0, i != null && i.readable && (this.stream = { readable: !0 }), W.request(this, o, e);
    else
      return await me.request(this, o, e, r);
  }
  async callToolFunction(e, t) {
    var r, o;
    this.asyncCallInProgress = !0;
    const n = await e(t);
    if (!Array.isArray(n)) {
      if (n[h]) {
        const a = { [h]: n[h] }, c = await ((o = (r = this.tejas).responseInterceptor) == null ? void 0 : o.call(r, a)) || a;
        if (Array.isArray(c)) throw Error("Function tool response interceptor cannot return an array");
        return { processedResponse: c };
      }
      throw Error(rn);
    }
    return { responses: await Promise.all(n) };
  }
  makeAnotherRequest(e, t, n) {
    try {
      return t && (this.stream ? W.request(this, e, t) : me.request(this, e, t)), { [h]: n || "" };
    } catch (i) {
      throw this.asyncCallInProgress = !1, i;
    }
  }
  genereteAPIKeyName(e) {
    return `${e} API Key`;
  }
  static getImageContent(e) {
    return e.filter((t) => t[E] === j).map((t) => ({
      [E]: qe,
      [qe]: {
        url: t[T] || ""
      }
    })).filter((t) => t[qe].url.length > 0);
  }
  static getTextWImagesContent(e) {
    if (e[b] && e[b].length > 0) {
      const t = this.getImageContent(e[b]);
      return e[h] && e[h].trim().length > 0 && t.unshift({ [E]: h, [h]: e[h] }), t.length > 0 ? t : e[h] || "";
    }
    return e[h] || "";
  }
  static getTextWFilesContent(e, t) {
    if (e[b] && e[b].length > 0) {
      const n = t(e[b]);
      return e[h] && e[h].trim().length > 0 && n.unshift({ [E]: h, [h]: e[h] }), n;
    }
    return e[h] || "";
  }
  async extractStreamResultWToolsGeneric(e, t, n, i, r) {
    const { delta: o, finish_reason: a } = t;
    if (a === "tool_calls") {
      const c = { tool_calls: e._streamToolCalls };
      return e._streamToolCalls = void 0, this.handleToolsGeneric(c, n, e.messages, i, r);
    } else o != null && o.tool_calls && (e._streamToolCalls ? o.tool_calls.forEach((c, l) => {
      e._streamToolCalls && (e._streamToolCalls[l].function.arguments += c.function.arguments);
    }) : e._streamToolCalls = o.tool_calls);
    return { [h]: (o == null ? void 0 : o.content) || "" };
  }
  async handleToolsGeneric(e, t, n, i, r) {
    if (!e.tool_calls || !i || !t)
      throw Error(qt);
    const o = A(i), a = e.tool_calls.map((d) => ({ name: d.function.name, arguments: d.function.arguments })), { responses: c, processedResponse: l } = await this.callToolFunction(t, a);
    if (l) return l;
    if (r && (o.messages = o.messages.slice(o.messages.length - 1), r.message && o.messages.unshift({ [C]: Rn, content: r.message })), o.messages.push({ tool_calls: e.tool_calls, [C]: mt, content: null }), !c.find(({ response: d }) => typeof d !== ye) && a.length === c.length)
      return c.forEach((d, p) => {
        var g;
        const u = (g = e.tool_calls) == null ? void 0 : g[p];
        o == null || o.messages.push({
          [C]: "tool",
          tool_call_id: u == null ? void 0 : u.id,
          name: u == null ? void 0 : u.function.name,
          content: d.response
        });
      }), this.makeAnotherRequest(o, n);
    throw Error(rn);
  }
  updateSessionId(e) {
    this.messages && this.messages.messageToElements.length > 0 && (this.messages.messageToElements[this.messages.messageToElements.length - 1][0]._sessionId = e);
  }
}
class ji {
  static waitForPropertiesToBeUpdatedBeforeRender(e) {
    e._propUpdated_ = !1, setTimeout(() => {
      e._propUpdated_ ? ji.waitForPropertiesToBeUpdatedBeforeRender(e) : (e._waitingToRender_ = !1, e.onRender());
    });
  }
  static attemptRender(e) {
    e._propUpdated_ = !0, e._waitingToRender_ || (e._waitingToRender_ = !0, ji.waitForPropertiesToBeUpdatedBeforeRender(e));
  }
}
const Ct = class Ct extends HTMLElement {
  // If this is not working, try using propertyName directly
  constructor() {
    super(), this._waitingToRender_ = !1, this._propUpdated_ = !1, Object.keys(Ct._attributeToProperty_).forEach((e) => {
      const t = Ct._attributeToProperty_[e];
      this.constructPropertyAccessors(t), this.hasOwnProperty(e) || this.constructPropertyAccessors(t, e);
    });
  }
  static get observedAttributes() {
    return Object.keys(Ct._attributes_) || [];
  }
  // need to be called here as accessors need to be set for the class instance
  constructPropertyAccessors(e, t) {
    let n;
    Object.defineProperty(this, t || e, {
      get: function() {
        return n;
      },
      set: function(o) {
        n = o, t ? this[e] = o : ji.attemptRender(this);
      }
    });
  }
  attributeChangedCallback(e, t, n) {
    if (t === n) return;
    const i = Ct._attributes_[e](n), r = Ct._attributeToProperty_[e];
    this[r] = i;
  }
  onRender() {
  }
};
Ct._attributes_ = {}, Ct._attributeToProperty_ = {};
let $s = Ct;
const wl = `<?xml version="1.0" standalone="no"?>
<svg version="1.1"
	xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.9em" height="0.9em"
	viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200">
		<path d="
			M669.727,273.516c-22.891-2.476-46.15-3.895-69.727-4.248c-103.025,0.457-209.823,25.517-310.913,73.536
			c-75.058,37.122-148.173,89.529-211.67,154.174C46.232,529.978,6.431,577.76,0,628.74c0.76,44.162,48.153,98.67,77.417,131.764
			c59.543,62.106,130.754,113.013,211.67,154.174c2.75,1.335,5.51,2.654,8.276,3.955l-75.072,131.102l102.005,60.286l551.416-960.033
			l-98.186-60.008L669.727,273.516z M902.563,338.995l-74.927,129.857c34.47,44.782,54.932,100.006,54.932,159.888
			c0,149.257-126.522,270.264-282.642,270.264c-6.749,0-13.29-0.728-19.922-1.172l-49.585,85.84c22.868,2.449,45.99,4.233,69.58,4.541
			c103.123-0.463,209.861-25.812,310.84-73.535c75.058-37.122,148.246-89.529,211.743-154.174
			c31.186-32.999,70.985-80.782,77.417-131.764c-0.76-44.161-48.153-98.669-77.417-131.763
			c-59.543-62.106-130.827-113.013-211.743-154.175C908.108,341.478,905.312,340.287,902.563,338.995L902.563,338.995z
			M599.927,358.478c6.846,0,13.638,0.274,20.361,0.732l-58.081,100.561c-81.514,16.526-142.676,85.88-142.676,168.897
			c0,20.854,3.841,40.819,10.913,59.325c0.008,0.021-0.008,0.053,0,0.074l-58.228,100.854
			c-34.551-44.823-54.932-100.229-54.932-160.182C317.285,479.484,443.808,358.477,599.927,358.478L599.927,358.478z M768.896,570.513
			L638.013,797.271c81.076-16.837,141.797-85.875,141.797-168.603C779.81,608.194,775.724,588.729,768.896,570.513L768.896,570.513z"
			/>
</svg>
`, Al = `<?xml version="1.0" standalone="no"?>
<svg version="1.1"
	xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.9em" height="0.9em"
	viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200">
		<path id="path6686" inkscape:connector-curvature="0" d="M779.843,599.925c0,95.331-80.664,172.612-180.169,172.612
			c-99.504,0-180.168-77.281-180.168-172.612c0-95.332,80.664-172.612,180.168-172.612
			C699.179,427.312,779.843,504.594,779.843,599.925z M600,240.521c-103.025,0.457-209.814,25.538-310.904,73.557
			c-75.058,37.122-148.206,89.496-211.702,154.141C46.208,501.218,6.431,549,0,599.981c0.76,44.161,48.13,98.669,77.394,131.763
			c59.543,62.106,130.786,113.018,211.702,154.179c94.271,45.751,198.616,72.092,310.904,73.557
			c103.123-0.464,209.888-25.834,310.866-73.557c75.058-37.122,148.243-89.534,211.74-154.179
			c31.185-32.999,70.962-80.782,77.394-131.763c-0.76-44.161-48.13-98.671-77.394-131.764
			c-59.543-62.106-130.824-112.979-211.74-154.141C816.644,268.36,712.042,242.2,600,240.521z M599.924,329.769
			c156.119,0,282.675,120.994,282.675,270.251c0,149.256-126.556,270.25-282.675,270.25S317.249,749.275,317.249,600.02
			C317.249,450.763,443.805,329.769,599.924,329.769L599.924,329.769z"/>
</svg>
`;
class Mt {
  static createSVGElement(e) {
    return new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
  }
}
const Ft = class Ft {
  // prettier-ignore
  static changeVisibility(e, t, n, i) {
    i.target.id === Ft.VISIBLE_ICON_ID ? (t[v].display = "none", n[v].display = "block", e[E] = "password") : (t[v].display = "block", n[v].display = "none", e[E] = h);
  }
  static createIconElement(e, t) {
    const n = Mt.createSVGElement(e);
    return n.id = t, n[m].add("visibility-icon"), n;
  }
  // prettier-ignore
  static create(e) {
    const t = x();
    t.id = "visibility-icon-container";
    const n = Ft.createIconElement(Al, Ft.VISIBLE_ICON_ID);
    n[v].display = "none", t.appendChild(n);
    const i = Ft.createIconElement(wl, "not-visible-icon");
    return t.appendChild(i), t.onclick = Ft.changeVisibility.bind(
      this,
      e,
      n,
      i
    ), t;
  }
};
Ft.VISIBLE_ICON_ID = "visible-icon";
let qs = Ft;
class Le {
  static createCautionText() {
    const e = x("a");
    return e[m].add("insert-key-input-help-text"), e.innerText = "Please exercise CAUTION when inserting your API key outside of deepchat.dev or localhost!!", e;
  }
  static createHelpLink(e) {
    const t = x("a");
    return t[m].add("insert-key-input-help-text"), t.href = e, t.innerText = "Find more info here", t.target = "_blank", t;
  }
  static createFailText() {
    const e = x();
    return e.id = "insert-key-input-invalid-text", e[v].display = "none", e;
  }
  static createHelpTextContainer(e, t = !0) {
    const n = x();
    n.id = "insert-key-help-text-container";
    const i = x();
    i.id = "insert-key-help-text-contents";
    const r = Le.createFailText();
    if (i.appendChild(r), e) {
      const o = Le.createHelpLink(e);
      i.appendChild(o);
    }
    if (t === !0) {
      const o = Le.createCautionText();
      i.appendChild(o);
    }
    return n.appendChild(i), { helpTextContainerElement: n, failTextElement: r };
  }
  static onFail(e, t, n, i) {
    e[m].replace("insert-key-input-valid", "insert-key-input-invalid"), n.innerText = i, n[v].display = "block", t.innerText = "Start", e[m].remove(Rt);
  }
  static onLoad(e, t) {
    e[m].add(Rt), t.innerHTML = '<div id="loading-key"></div>';
  }
  // prettier-ignore
  static verifyKey(e, t, n) {
    const i = e.value.trim();
    n.verifyKey(i, t);
  }
  // prettier-ignore
  static addVerificationEvents(e, t, n, i, r) {
    const o = {
      onSuccess: i,
      onFail: Le.onFail.bind(this, e, t, n),
      onLoad: Le.onLoad.bind(this, e, t)
    }, a = Le.verifyKey.bind(this, e, o, r);
    t.onclick = a, e.onkeydown = (c) => {
      !e[m].contains(Rt) && c.key === _e.ENTER && a();
    };
  }
  static createStartButton() {
    const e = x();
    return e.id = "start-button", e.innerText = "Start", e;
  }
  static onInputFocus(e) {
    e.target[m].replace("insert-key-input-invalid", "insert-key-input-valid");
  }
  static createInput(e) {
    const t = x();
    t.id = "insert-key-input-container";
    const n = x("input");
    return n.id = "insert-key-input", n.placeholder = e || "API Key", n[E] = "password", n[m].add("insert-key-input-valid"), n.onfocus = Le.onInputFocus, t.appendChild(n), t;
  }
  // prettier-ignore
  static createContents(e, t) {
    var d;
    const n = x();
    n.id = "insert-key-contents";
    const i = Le.createInput(t.insertKeyPlaceholderText), r = i.children[0], o = qs.create(r);
    i.appendChild(o), n.appendChild(i);
    const a = Le.createStartButton(), { helpTextContainerElement: c, failTextElement: l } = Le.createHelpTextContainer(
      t.keyHelpUrl,
      (d = t.tejas._insertKeyViewStyles) == null ? void 0 : d.displayCautionText
    );
    return n.appendChild(a), n.appendChild(c), Le.addVerificationEvents(r, a, l, e, t), n;
  }
  static createElements(e, t) {
    const n = x();
    n.id = "insert-key-view";
    const i = Le.createContents(e, t);
    return n.appendChild(i), n;
  }
  static render(e, t, n) {
    const i = Le.createElements(t, n);
    e.replaceChildren(i);
  }
}
const We = class We {
  static enableButtons(e, t, n = 0) {
    window.webLLM ? (e && (e[$] = !1), t && (t[$] = !1)) : n < wi.MODULE_SEARCH_LIMIT_S * 4 && setTimeout(() => We.enableButtons(e, t, n + 1), 250);
  }
  // prettier-ignore
  static setUpInitial(e, t, n, i) {
    const r = (t == null ? void 0 : t.downloadClass) || We.DOWNLOAD_BUTTON_CLASS, o = (t == null ? void 0 : t.uploadClass) || We.UPLOAD_BUTTON_CLASS, a = (t == null ? void 0 : t.fileInputClass) || We.FILE_INPUT_CLASS;
    return setTimeout(() => {
      const c = n == null ? void 0 : n.getElementsByClassName(r)[0], l = n == null ? void 0 : n.getElementsByClassName(a)[0], d = n == null ? void 0 : n.getElementsByClassName(o)[0];
      c && (c.onclick = () => e()), l && (l.onchange = () => {
        l[b] && l[b].length > 0 && e(l[b]);
      }), d && (d.onclick = () => l[Z]()), (c || d) && We.enableButtons(c, d);
    }), (t == null ? void 0 : t.initialHtml) || `<div>
        Download or upload a web model that will run entirely on your browser: <br/> 
        <button disabled class="${r} tejas-button tejas-web-model-button">Download</button>
        ${i ? "" : `<input type="file" class="${a}" hidden multiple />
          <button disabled class="${o} tejas-button tejas-web-model-button">Upload</button>`}
      </div>`;
  }
  static exportFile(e) {
    const t = x("a"), n = 4;
    for (let i = 0; i < e.length / n; i += 1)
      setTimeout(() => {
        const r = i * n;
        for (let o = r; o < Math.min(r + n, e.length); o += 1) {
          const a = URL.createObjectURL(e[o]);
          t.href = a, t.download = e[o].name, document.body.appendChild(t), t[Z](), URL.revokeObjectURL(a);
        }
      }, 500 * i);
  }
  // prettier-ignore
  static setUpAfterLoad(e, t, n, i) {
    const r = (t == null ? void 0 : t.exportFilesClass) || We.EXPORT_BUTTON_CLASS;
    return setTimeout(() => {
      const o = n == null ? void 0 : n.getElementsByClassName(r)[0];
      o && (o.onclick = () => We.exportFile(e));
    }), (t == null ? void 0 : t.afterLoadHtml) || `<div>
        Model loaded successfully and has been cached for future requests.
        ${i ? "" : `<br/> <button style="margin-top: 5px" class="${r} tejas-button">Export</button>`}
      </div>`;
  }
};
We.DOWNLOAD_BUTTON_CLASS = "tejas-download-button", We.UPLOAD_BUTTON_CLASS = "tejas-upload-button", We.FILE_INPUT_CLASS = "tejas-file-input", We.EXPORT_BUTTON_CLASS = "tejas-export-button";
let Xi = We;
const Qr = {
  model_list: [
    // Llama-2
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f32_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f32_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 9109.03,
      low_resource_required: !1
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 6749.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f16_1-ctx1k-webgpu.wasm",
      vram_required_MB: 4618.52,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-13b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf/Llama-2-13b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 11814.09,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-70b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-70b-chat-hf-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-70b-chat-hf/Llama-2-70b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 43729.05,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    // RedPajama
    {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f16_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f16_1-ctx2k-webgpu.wasm",
      vram_required_MB: 2972.09,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx2k-webgpu.wasm",
      vram_required_MB: 3928.09,
      low_resource_required: !1
    },
    {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f16_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f16_1-ctx1k-webgpu.wasm",
      vram_required_MB: 2041.09,
      low_resource_required: !0,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx1k-webgpu.wasm",
      vram_required_MB: 2558.09,
      low_resource_required: !0
    },
    // Mistral variants
    {
      model_url: "https://huggingface.co/mlc-ai/WizardMath-7B-V1.1-q4f16_1-MLC/resolve/main/",
      local_id: "WizardMath-7B-V1.1-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.2-q4f16_1-MLC/resolve/main/",
      local_id: "Mistral-7B-Instruct-v0.2-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/OpenHermes-2.5-Mistral-7B-q4f16_1-MLC/resolve/main/",
      local_id: "OpenHermes-2.5-Mistral-7B-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/NeuralHermes-2.5-Mistral-7B-q4f16_1-MLC/resolve/main/",
      local_id: "NeuralHermes-2.5-Mistral-7B-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    // TinyLlama
    {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q0f16-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q0f16",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q0f16-ctx2k-webgpu.wasm",
      vram_required_MB: 5063.52,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q0f32-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q0f32",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q0f32-ctx2k-webgpu.wasm",
      vram_required_MB: 5394.53,
      low_resource_required: !1
    },
    {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q4f16_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q4f16_1-ctx1k-webgpu.wasm",
      vram_required_MB: 899.11,
      low_resource_required: !0,
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q4f32_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q4f32_1-ctx1k-webgpu.wasm",
      vram_required_MB: 992.11,
      low_resource_required: !0
    }
  ],
  use_web_worker: !0
}, Y = class Y extends dn {
  constructor(e) {
    var t, n;
    super(e), this._isModelLoaded = !1, this._isModelLoading = !1, this._loadOnFirstMessage = !1, this._webModel = {}, this.permittedErrorPrefixes = [Y.MULTIPLE_MODELS_ERROR, Y.WEB_LLM_NOT_FOUND_ERROR, Y.GENERIC_ERROR], this._conversationHistory = [], typeof e.webModel == "object" && (this._webModel = e.webModel), (t = this._webModel.load) != null && t.clearCache && Y.clearAllCache(), this.findModelInWindow(e), this.canSendMessage = this.canSubmit.bind(this), this._chatEl = (n = e.shadowRoot) == null ? void 0 : n.children[0], e.history && Y.setUpHistory(this._conversationHistory, e.history);
  }
  // need ref of messages object as web model exhibits unique behaviour to manipulate chat
  setUpMessages(e) {
    this._messages = e, this._removeIntro = () => {
      e.removeIntroductoryMessage(), this._removeIntro = void 0;
    };
  }
  static setUpHistory(e, t) {
    t.forEach((n, i) => {
      if (n[C] === F && n[h]) {
        const r = t[i + 1];
        r != null && r[h] && r[C] !== F && e.push([n[h], r[h]]);
      }
    });
  }
  findModelInWindow(e, t = 0) {
    var n;
    window.webLLM ? this.configureInit(this.shouldAddIntroMessage(e.introMessage)) : t > Y.MODULE_SEARCH_LIMIT_S ? ((n = this._messages) == null || n.addNewErrorMessage(oe, Y.WEB_LLM_NOT_FOUND_ERROR), console[f](
      "The tejas-web-llm module has not been attached to the window object. Please see the following guide:"
    ), console[f]("https://deepchat.dev/examples/externalModules")) : setTimeout(() => this.findModelInWindow(e, t + 1), 1e3);
  }
  shouldAddIntroMessage(e) {
    var t;
    return !e && this._webModel && ((t = this._webModel.introMessage) == null ? void 0 : t.displayed) !== !1;
  }
  scrollToTop(e) {
    var t;
    ((t = this._webModel.introMessage) == null ? void 0 : t.autoScroll) !== !1 && setTimeout(() => {
      var n, i;
      (n = this._messages) != null && n.elementRef && V.scrollToTop((i = this._messages) == null ? void 0 : i.elementRef);
    }, e);
  }
  // prettier-ignore
  getIntroMessage(e) {
    if (!this.shouldAddIntroMessage(e) || !this._chatEl) return;
    const t = Xi.setUpInitial(
      this.init.bind(this),
      this._webModel.introMessage,
      this._chatEl,
      !!this._webModel.worker
    );
    return this.scrollToTop(1), { [C]: te, html: t, sendUpdate: !1 };
  }
  async configureInit(e) {
    const { load: t } = this._webModel;
    if (t) {
      if (t.onInit) {
        this.init();
        return;
      }
      if (t.onMessage) {
        this._loadOnFirstMessage = !0;
        return;
      }
    }
    e || this.init();
  }
  async init(e) {
    var n;
    (n = this._messages) == null || n.removeError();
    const t = this.attemptToCreateChat();
    t && await this.loadModel(t, e);
  }
  attemptToCreateChat() {
    var t;
    if (Y.chat) {
      (t = this._messages) == null || t.addNewErrorMessage(oe, Y.MULTIPLE_MODELS_ERROR), console[f](Y.MULTIPLE_MODELS_ERROR);
      return;
    }
    if (this._isModelLoaded || this._isModelLoading) return;
    const { worker: e } = this._webModel;
    return Qr.use_web_worker && e ? new window.webLLM.ChatWorkerClient(e) : new window.webLLM.ChatModule();
  }
  getConfig() {
    var n;
    let e = Y.DEFAULT_MODEL;
    this._webModel.model && (e = this._webModel.model);
    const t = A(Qr);
    if (this._webModel.urls) {
      const i = t.model_list.find((r) => r.local_id = e);
      i && (this._webModel.urls.model && (i.model_url = this._webModel.urls.model), this._webModel.urls.wasm && (i.model_lib_url = this._webModel.urls.wasm));
    }
    return (n = this._webModel.load) != null && n.skipCache && (t.use_cache = !1), { model: e, appConfig: t };
  }
  // prettier-ignore
  async loadModel(e, t) {
    var o, a, c, l, d, p, u;
    this.scrollToTop(), Y.chat = e, this._isModelLoading = !0;
    let n = ((o = this._webModel.introMessage) == null ? void 0 : o.displayed) === !1;
    const i = (g) => {
      var _;
      (_ = this._messages) == null || _.addNewMessage({ html: `<div>${g[h]}</div>`, overwrite: !0, sendUpdate: !1 }), n && (setTimeout(() => V.scrollToBottom(this._messages)), n = !1);
    };
    Y.chat.setInitProgressCallback(i);
    let r;
    try {
      const { model: g, appConfig: _ } = this.getConfig(), y = {};
      this._webModel.instruction && (y.conv_config = { [Rn]: this._webModel.instruction }), this._conversationHistory.length > 0 && (y.conversation_history = this._conversationHistory), r = await Y.chat.reload(g, y, _, t);
    } catch (g) {
      return this.unloadChat(g);
    }
    if ((c = (a = this.tejas)._validationHandler) == null || c.call(a), (l = this._webModel.introMessage) != null && l.removeAfterLoad)
      this._webModel.introMessage.displayed === !1 ? (p = this._messages) == null || p.removeLastMessage() : (u = this._removeIntro) == null || u.call(this);
    else {
      const g = Xi.setUpAfterLoad(
        r,
        this._webModel.introMessage,
        this._chatEl,
        !!this._webModel.worker
      );
      (d = this._messages) == null || d.addNewMessage({ html: g, overwrite: !0, sendUpdate: !1 });
    }
    this._isModelLoaded = !0, this._isModelLoading = !1;
  }
  async unloadChat(e) {
    var t;
    (t = this._messages) == null || t.addNewErrorMessage(oe, Y.GENERIC_ERROR), console[f](e), this._isModelLoaded = !1, this._isModelLoading = !1, Y.chat && (await Y.chat.unload(), Y.chat = void 0);
  }
  async immediateResp(e, t, n) {
    const i = { [h]: await n.generate(t, void 0, 0) }, r = await Y.processResponse(this.tejas, e, i);
    r && r.forEach((o) => e.addNewMessage(o)), this.completionsHandlers.onFinish();
  }
  async streamResp(e, t, n) {
    this.streamHandlers.onAbort = () => {
      n.interruptGenerate();
    }, this.streamHandlers.onOpen();
    const i = new dt(e);
    await n.generate(t, async (r, o) => {
      const a = await Y.processResponse(this.tejas, e, { [h]: o });
      a && i.upsertStreamedMessage({ [h]: a[0][h], overwrite: !0 });
    }), i.finaliseStreamedMessage(), this.streamHandlers.onClose();
  }
  async generateRespByType(e, t, n, i) {
    var r;
    try {
      n ? await this.streamResp(e, t, i) : await this.immediateResp(e, t, i);
    } catch (o) {
      (r = this._messages) == null || r.addNewErrorMessage(oe), console.log(o);
    }
  }
  async generateResp(e, t, n) {
    const i = t[t.length - 1][h], { body: r, error: o } = await D.processRequestInterceptor(this.tejas, { body: { [h]: i } }), a = !!this.stream;
    try {
      if (o)
        D.displayError(e, new Error(o)), (a ? this.streamHandlers.onClose : this.completionsHandlers.onFinish)();
      else if (!r || !r[h]) {
        const c = Sa({ body: r }, !1);
        console[f](c);
        const l = a ? this.streamHandlers.onClose : this.completionsHandlers.onFinish;
        D.onInterceptorError(e, c, l);
      } else
        this.generateRespByType(e, r[h], !!this.stream, n);
    } catch (c) {
      this.unloadChat(c);
    }
  }
  async callServiceAPI(e, t) {
    var n, i;
    if (!this._isModelLoaded)
      if (this._loadOnFirstMessage)
        await this.init();
      else
        return;
    !Y.chat || this._isModelLoading || ((n = this._webModel.introMessage) != null && n.removeAfterMessage && ((i = this._removeIntro) == null || i.call(this)), e.addLoadingMessage(), this.generateResp(e, t, Y.chat));
  }
  canSubmit(e) {
    return !(e != null && e.trim()) || this._isModelLoading ? !1 : this._loadOnFirstMessage ? !0 : !!this._isModelLoaded;
  }
  static async processResponse(e, t, n) {
    var a, c;
    const i = await ((a = e.responseInterceptor) == null ? void 0 : a.call(e, n)) || n;
    if ((c = e.connect) != null && c.stream && Array.isArray(i) && i.length > 1) {
      console[f](No);
      return;
    }
    const r = Array.isArray(i) ? i : [i], o = r.find((l) => typeof l[f] === ye);
    if (o) {
      D.displayError(t, new Error(o[f]));
      return;
    } else if (r.find((d) => !d || !d[h])) {
      const d = Ca(n, !!e.responseInterceptor, i);
      D.displayError(t, new Error(d));
      return;
    }
    return r;
  }
  isWebModel() {
    return !0;
  }
  static clearAllCache() {
    Y.clearCache("webllm/model"), Y.clearCache("webllm/wasm");
  }
  static clearCache(e) {
    caches.open(e).then((t) => {
      t.keys().then((n) => {
        n.forEach((i) => {
          t.delete(i);
        });
      });
    });
  }
};
Y.GENERIC_ERROR = `Error, please check the [troubleshooting](${X}webModel#troubleshooting) section of documentation for help.`, Y.MULTIPLE_MODELS_ERROR = "Cannot run multiple web models", Y.WEB_LLM_NOT_FOUND_ERROR = "WebLLM module not found", Y.DEFAULT_MODEL = "Llama-2-7b-chat-hf-q4f32_1", Y.MODULE_SEARCH_LIMIT_S = 5;
let wi = Y;
const ge = (s, e, t, n) => ({
  url: s,
  method: e,
  handleVerificationResult: t,
  augmentUrl: n
}), Tl = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
  // bigcode/santacoder expects this so adding just-in-case
}), Rl = (s, e, t, n) => {
  const i = s;
  Array.isArray(i[f]) && i[f][0] === "Error in `parameters`: field required" ? t(e) : n(ue);
}, Il = () => ge(
  "https://api-inference.huggingface.co/models/gpt2",
  be,
  Rl
), gi = class gi extends k {
  // prettier-ignore
  constructor(e, t, n, i, r, o) {
    super(
      e,
      Il(),
      Tl,
      r,
      o
    ), this.insertKeyPlaceholderText = "Hugging Face Token", this.keyHelpUrl = "https://huggingface.co/settings/tokens", this.permittedErrorPrefixes = [sr], this.url = `${gi.URL_PREFIX}${n}`, this.textInputPlaceholderText = t, typeof i == "object" && (i.model && (this.url = `${gi.URL_PREFIX}${i.model}`), i.options && (this.rawBody.options = i.options), i.parameters && (this.rawBody.parameters = i.parameters));
  }
  preprocessBody(e, t, n) {
    const i = A(e), r = t[t.length - 1][h];
    if (r)
      return i.options ?? (i.options = {}), i.options.wait_for_model = !0, { inputs: r, ...i };
  }
  async callServiceAPI(e, t, n) {
    if (!this.connectSettings) throw new Error(Ue);
    const i = this.preprocessBody(this.rawBody, t, n);
    me.request(this, i, e);
  }
};
gi.URL_PREFIX = "https://api-inference.huggingface.co/models/";
let kt = gi;
class ki extends kt {
  // prettier-ignore
  constructor(e, t, n, i, r, o) {
    super(e, t, n, i, r, o), this.isTextInputDisabled = !0, this.canSendMessage = ki.canSendFile;
  }
  static canSendFile(e, t) {
    return !!(t != null && t[0]);
  }
  preprocessBody(e, t, n) {
    return n[0];
  }
  // prettier-ignore
  async callServiceAPI(e, t, n) {
    if (!this.connectSettings) throw new Error(Ue);
    if (!(n != null && n[0])) throw new Error(gs);
    me.poll(this, n[0], e, !1);
  }
}
class Ml extends ki {
  // prettier-ignore
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.audioClassification, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(
      e,
      `Attach an audio ${ne}`,
      "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition",
      t,
      n,
      { audio: {} }
    );
  }
  async extractPollResultData(e) {
    var t;
    if (e.estimated_time) return { timeoutMS: (e.estimated_time + 1) * 1e3 };
    if (e[f]) throw e[f];
    return { [h]: ((t = e[0]) == null ? void 0 : t.label) || "" };
  }
}
class kl extends ki {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.imageClassification, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, `Attach an image ${ne}`, "google/vit-base-patch16-224", t, n, { images: {} });
  }
  async extractPollResultData(e) {
    var t;
    if (e.estimated_time) return { timeoutMS: (e.estimated_time + 1) * 1e3 };
    if (e[f]) throw e[f];
    return { [h]: ((t = e[0]) == null ? void 0 : t.label) || "" };
  }
}
const Es = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), Pl = (s, e, t, n) => {
  s.message ? n(ue) : t(e);
}, vs = () => ge("https://api.stability.ai/v1/engines/list", he, Pl), Pn = "data:image/png;base64,";
class Ss extends k {
  // prettier-ignore
  constructor(e, t, n, i, r) {
    super(e, t, n, i, r), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Stability AI"), this.keyHelpUrl = "https://platform.stability.ai/docs/getting-started/authentication", this.permittedErrorPrefixes = [Mi, "invalid_"];
  }
}
class Yi extends Ss {
  constructor(e) {
    var o;
    const t = A(e.directConnection), n = t == null ? void 0 : t.stabilityAI, i = { images: { files: { acceptedFormats: ".png", maxNumberOfFiles: 1 } } };
    super(e, vs(), Es, n, i), this.url = "https://api.stability.ai/v1/generation/esrgan-v1-x2plus/image-to-image/upscale", this.textInputPlaceholderText = "Describe image changes";
    const r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageUpscale;
    typeof r == "object" && (r.engine_id && (this.url = `https://api.stability.ai/v1/generation/${r.engine_id}/image-to-image/upscale`), Yi.cleanConfig(r), Object.assign(this.rawBody, r)), this.canSendMessage = Yi.canSendFileMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id;
  }
  static canSendFileMessage(e, t) {
    return !!(t != null && t[0]);
  }
  createFormDataBody(e, t) {
    const n = new FormData();
    return n.append(j, t), Object.keys(e).forEach((i) => {
      n.append(i, String(e[i]));
    }), n;
  }
  // prettier-ignore
  async callServiceAPI(e, t, n) {
    if (!this.connectSettings) throw new Error(Ue);
    if (!n) throw new Error(ir);
    const i = this.createFormDataBody(this.rawBody, n[0]);
    D.tempRemoveContentHeader(
      this.connectSettings,
      me.request.bind(this, this, i, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e.message) throw e.message;
    const t = e.artifacts.map((n) => ({ [T]: `${Pn}${n.base64}`, [E]: j }));
    return { [b]: t };
  }
}
class Zi extends Ss {
  constructor(e) {
    var o;
    const t = A(e.directConnection), n = t == null ? void 0 : t.stabilityAI, i = { [Q]: { [b]: { acceptedFormats: ".png", maxNumberOfFiles: 2 } } };
    super(e, vs(), Es, n, i), this.url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image/masking", this._maskSource = "MASK_IMAGE_WHITE", this.textInputPlaceholderText = "Describe image changes";
    const r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageMasking;
    typeof r == "object" && (r.engine_id && (this.url = `https://api.stability.ai/v1/generation/${r.engine_id}/image-to-image/masking`), r.weight !== void 0 && r.weight !== null && (this._imageWeight = r.weight), r.mask_source !== void 0 && r.mask_source !== null && (this._maskSource = r.mask_source), Zi.cleanConfig(r), Object.assign(this.rawBody, r)), this.canSendMessage = Zi.canSendFileTextMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id, delete e.weight;
  }
  static canSendFileTextMessage(e, t) {
    return !!(t != null && t[0]) && !!(e && e.trim() !== "");
  }
  createFormDataBody(e, t, n, i) {
    const r = new FormData();
    return r.append("init_image", t), r.append("mask_source", String(this._maskSource)), r.append("mask_image", n), i && i !== "" && r.append("text_prompts[0][text]", i), this._imageWeight !== void 0 && this._imageWeight !== null && r.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach((o) => {
      r.append(o, String(e[o]));
    }), r.get("weight") === void 0 && r.append("weight", String(1)), r;
  }
  // prettier-ignore
  async callServiceAPI(e, t, n) {
    var o, a;
    if (!this.connectSettings) throw new Error(Ue);
    if (!n || !n[0] || !n[1]) throw new Error(ir);
    const i = (a = (o = t[t.length - 1]) == null ? void 0 : o[h]) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, n[0], n[1], i);
    D.tempRemoveContentHeader(
      this.connectSettings,
      me.request.bind(this, this, r, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e.message) throw e.message;
    const t = e.artifacts.map((n) => ({ [T]: `${Pn}${n.base64}`, [E]: j }));
    return { [b]: t };
  }
}
class Ll extends ki {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.audioSpeechRecognition, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, `Attach an audio ${ne}`, "facebook/wav2vec2-large-960h-lv60-self", t, n, { audio: {} });
  }
  async extractPollResultData(e) {
    if (e.estimated_time) return { timeoutMS: (e.estimated_time + 1) * 1e3 };
    if (e[f]) throw e[f];
    return { [h]: e[h] || "" };
  }
}
class Ol extends kt {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.textGeneration, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Once upon a time", "gpt2", t, n);
  }
  async extractResultData(e) {
    var t;
    if (e[f]) throw e[f];
    return { [h]: ((t = e[0]) == null ? void 0 : t.generated_text) || "" };
  }
}
class Nl extends kt {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.questionAnswer, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Ask a question", "bert-large-uncased-whole-word-masking-finetuned-squad", t, n), this.permittedErrorPrefixes = [sr, "Error in"], this._context = t.context;
  }
  preprocessBody(e, t) {
    const n = t[t.length - 1][h];
    if (n)
      return {
        inputs: { question: n, context: this._context, options: { wait_for_model: !0 } }
      };
  }
  async extractResultData(e) {
    if (e[f]) throw e[f];
    return { [h]: e.answer || "" };
  }
}
class Bl extends kt {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.summarization, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Insert text to summarize", "facebook/bart-large-cnn", t, n);
  }
  async extractResultData(e) {
    var t;
    if (e[f]) throw e[f];
    return { [h]: ((t = e[0]) == null ? void 0 : t.summary_text) || "" };
  }
}
class Dl extends kt {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.conversation, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Ask me anything!", "facebook/blenderbot-400M-distill", t, n), this.maxMessages ?? (this.maxMessages = -1);
  }
  // prettier-ignore
  processMessagesI(e) {
    const t = e.filter((a) => a[h]), n = t[t.length - 1][h], i = t.slice(0, t.length - 1);
    if (!n) return;
    const r = i.filter((a) => a[C] === F).map((a) => a[h]), o = i.filter((a) => a[C] === te).map((a) => a[h]);
    return { past_user_inputs: r, generated_responses: o, mostRecentMessageText: n };
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessagesI(t);
    if (i)
      return n.options ?? (n.options = {}), n.options.wait_for_model = !0, {
        inputs: {
          past_user_inputs: i.past_user_inputs,
          generated_responses: i.generated_responses,
          [h]: i.mostRecentMessageText
        },
        ...n
      };
  }
  async extractResultData(e) {
    if (e[f]) throw e[f];
    return { [h]: e.generated_text || "" };
  }
}
class Ji extends Ss {
  constructor(e) {
    var o;
    const t = A(e.directConnection), n = t.stabilityAI, i = { [Q]: { [b]: { acceptedFormats: ".png", maxNumberOfFiles: 1 } } };
    super(e, vs(), Es, n, i), this.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image", this.textInputPlaceholderText = "Describe image changes";
    const r = (o = t.stabilityAI) == null ? void 0 : o.imageToImage;
    typeof r == "object" && (r.engine_id && (this.url = `https://api.stability.ai/v1/generation/${r.engine_id}/text-to-image`), r.weight !== void 0 && r.weight !== null && (this._imageWeight = r.weight), Ji.cleanConfig(r), Object.assign(this.rawBody, r)), this.canSendMessage = Ji.canSendFileTextMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id, delete e.weight;
  }
  static canSendFileTextMessage(e, t) {
    return !!(t != null && t[0]) && !!(e && e.trim() !== "");
  }
  createFormDataBody(e, t, n) {
    const i = new FormData();
    return i.append("init_image", t), n && n !== "" && i.append("text_prompts[0][text]", n), this._imageWeight !== void 0 && this._imageWeight !== null && i.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach((r) => {
      i.append(r, String(e[r]));
    }), i.get("weight") === void 0 && i.append("weight", String(1)), i;
  }
  // prettier-ignore
  async callServiceAPI(e, t, n) {
    var o, a;
    if (!this.connectSettings) throw new Error(Ue);
    if (!n) throw new Error(ir);
    const i = (a = (o = t[t.length - 1]) == null ? void 0 : o[h]) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, n[0], i);
    D.tempRemoveContentHeader(
      this.connectSettings,
      me.request.bind(this, this, r, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e.message) throw e.message;
    const t = e.artifacts.map((n) => ({ [T]: `${Pn}${n.base64}`, [E]: j }));
    return { [b]: t };
  }
}
class Fl extends kt {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.translation, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Insert text to translate", "Helsinki-NLP/opus-tatoeba-en-ja", t, n);
  }
  async extractResultData(e) {
    var t;
    if (e[f]) throw e[f];
    return { [h]: ((t = e[0]) == null ? void 0 : t.translation_text) || "" };
  }
}
class Qi extends Ss {
  constructor(e) {
    var r;
    const t = A(e.directConnection), n = t.stabilityAI;
    super(e, vs(), Es, n), this.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", this.textInputPlaceholderText = "Describe an image";
    const i = (r = t.stabilityAI) == null ? void 0 : r.textToImage;
    typeof i == "object" && (i.engine_id && (this.url = `https://api.stability.ai/v1/generation/${i.engine_id}/text-to-image`), i.weight !== void 0 && i.weight !== null && (this._imageWeight = i.weight), Qi.cleanConfig(i), Object.assign(this.rawBody, i)), this.canSendMessage = Qi.canSendTextMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id, delete e.weight;
  }
  static canSendTextMessage(e) {
    return !!(e && e.trim() !== "");
  }
  preprocessBody(e, t) {
    const n = t[t.length - 1][h], i = A(e), r = { [h]: n };
    return this._imageWeight && (r.weight = this._imageWeight), i.text_prompts = [r], i;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    if (e.message) throw e.message;
    const t = e.artifacts.map((n) => ({ [T]: `${Pn}${n.base64}`, [E]: j }));
    return { [b]: t };
  }
}
class Ul extends kt {
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.huggingFace) == null ? void 0 : r.fillMask, n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "The goal of life is [MASK].", "bert-base-uncased", t, n), this.permittedErrorPrefixes = [sr, "No mask_token"];
  }
  async extractResultData(e) {
    var t;
    if (e[f]) throw e[f];
    return { [h]: ((t = e[0]) == null ? void 0 : t.sequence) || "" };
  }
}
const dr = (s) => ({
  [G]: ee,
  [de]: `${we}${s}`
}), Hl = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f].message === bs ? n(ue) : n(Fe) : t(e);
}, hr = () => ge(
  "https://open.bigmodel.cn/api/paas/v4/models",
  he,
  Hl
);
class $l extends k {
  constructor(e) {
    var r, o, a;
    const t = A(e.directConnection), n = t.bigModel;
    super(e, hr(), dr, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("BigModel"), this.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", this.url = "https://open.bigmodel.cn/api/paas/v4/audio/speech", this.permittedErrorPrefixes = [de, Ae];
    const i = (r = t.bigModel) == null ? void 0 : r.textToSpeech;
    typeof i === U && (this.cleanConfig(i), Object.assign(this.rawBody, i)), (o = this.rawBody).model ?? (o.model = "cogtts"), (a = this.rawBody).voice ?? (a.voice = "tongtong");
  }
  cleanConfig(e) {
    delete e.key;
  }
  preprocessBody(e, t) {
    const n = A(e), i = t[t.length - 1];
    return n.input = (i == null ? void 0 : i[h]) || "", n;
  }
  async callServiceAPI(e, t) {
    return this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    const t = new Blob([e], { [E]: "audio/mpeg" }), n = URL.createObjectURL(t);
    return { [b]: [{ [T]: n, [E]: q }] };
  }
}
const ur = (s) => ({
  [G]: ee,
  [de]: `${we}${s}`
}), ql = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f].message === bs ? n(ue) : n(Fe) : t(e);
}, pr = () => ge("https://api.together.xyz/v1/models", he, ql);
class Gl extends k {
  constructor(e) {
    var r, o, a;
    const t = A(e.directConnection), n = t.together;
    super(e, pr(), ur, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Together AI"), this.keyHelpUrl = "https://api.together.xyz/settings/api-keys", this.url = "https://api.together.xyz/v1/audio/speech", this.permittedErrorPrefixes = [it, Ae];
    const i = (r = t.together) == null ? void 0 : r.textToSpeech;
    typeof i === U && this.completeConfig(i), (o = this.rawBody).model ?? (o.model = "cartesia/sonic"), (a = this.rawBody).voice ?? (a.voice = "laidback woman");
  }
  preprocessBody(e, t) {
    const n = A(e), i = t[t.length - 1];
    return n.input = (i == null ? void 0 : i[h]) || "", n;
  }
  async callServiceAPI(e, t) {
    return this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    const t = new Blob([e], { [E]: "audio/mpeg" }), n = URL.createObjectURL(t);
    return { [b]: [{ [T]: n, [E]: q }] };
  }
}
const ze = "https://api.openai.com/v1/", Ln = "https://platform.openai.com/account/api-keys", Gs = "input_text", eo = "input_image", to = "output_text", Os = "image_generation_call", Yo = "function_call_output", Dn = "response", On = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), Zo = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f].code === "invalid_api_key" ? n(ue) : n(Fe) : t(e);
}, Nn = () => ge(`${ze}models`, he, Zo), Ht = async (s, e, t, n = !0) => {
  const { connectSettings: i, tejas: r, completionsHandlers: o, messages: a } = s;
  i.method = t;
  const c = { body: e, headers: i.headers }, { body: l, headers: d, error: p } = await D.processRequestInterceptor(r, c), { onFinish: u } = o;
  if (p && a) return D.onInterceptorError(a, p, u);
  const g = await D.fetch(s, d, n, l).then(
    (_) => D.processResponseByType(_)
  );
  if (g[f]) throw g[f].message;
  return g;
}, Ke = class Ke {
  static async storeFiles(e, t, n, i) {
    const r = e.connectSettings.headers;
    if (!r) return;
    e.url = i;
    const o = r[G];
    delete r[G];
    const a = n.map(async (c) => {
      const l = new FormData();
      return l.append("purpose", "assistants"), l.append("file", c), new Promise((d) => {
        d(Ht(e, l, be, !1));
      });
    });
    try {
      const c = (await Promise.all(a)).map((l) => ({ id: l.id, name: l.filename }));
      return r[G] = o, c;
    } catch (c) {
      throw r[G] = o, D.displayError(t, c), e.completionsHandlers.onFinish(), c;
    }
  }
  static getType(e, t) {
    const { path: n } = e[t];
    return !n || n.endsWith("png") ? j : sn;
  }
  static async getFiles(e, t, n, i) {
    const r = t.map(({ fileId: c }) => (e.url = `${n}${c}${i}`, new Promise((l) => {
      l(Ht(e, void 0, "GET", !1));
    }))), a = (await Promise.all(r)).map((c, l) => new Promise((d) => {
      const p = new FileReader();
      p.readAsDataURL(c), p.onload = (u) => {
        d({
          [T]: u.target.result,
          name: t[l].name,
          [E]: Ke.getType(t, l)
        });
      };
    }));
    return await Promise.all(a);
  }
  static getFileName(e) {
    const t = e.split("/");
    return t[t.length - 1];
  }
  // prettier-ignore
  static async getFilesAndNewText(e, t, n, i, r) {
    var l, d;
    let o;
    const { getFilesPrefix: a, getFilesPostfix: c } = n;
    return t.length > 0 && (o = await Ke.getFiles(e, t, a, c), (l = r == null ? void 0 : r[h]) != null && l.value && o.forEach((p, u) => {
      var _;
      if (!p[T]) return;
      const g = t[u].path;
      (_ = r == null ? void 0 : r[h]) != null && _.value && g && (r[h].value = r[h].value.replace(g, p[T]));
    })), (d = r == null ? void 0 : r[h]) != null && d.value ? { [h]: r[h].value, [C]: i } : { [b]: o, [C]: i };
  }
  // Noticed an issue where text contains a sandbox hyperlink to a csv, but no annotation provided
  // To reproduce use the following text:
  // give example data for a csv and create a suitable bar chart for it with a link
  // Don't think it can be fixed and it is something on OpenAI side of things
  // prettier-ignore
  static getFileDetails(e, t) {
    var i;
    const n = [];
    return (i = t == null ? void 0 : t[h]) != null && i.value && e.content.forEach((r) => {
      var o, a;
      (a = (o = r[h]) == null ? void 0 : o.annotations) == null || a.forEach((c) => {
        var l;
        c[h] && c[h].startsWith("sandbox:") && ((l = c.file_path) != null && l.file_id) && n.push({
          path: c[h],
          fileId: c.file_path.file_id,
          name: Ke.getFileName(c[h])
        });
      });
    }), t != null && t.image_file && n.push({
      fileId: t.image_file.file_id
    }), n;
  }
  // prettier-ignore
  static async getFilesAndText(e, t, n, i) {
    const r = Ke.getFileDetails(t, i);
    return await Ke.getFilesAndNewText(e, r, n, t.role, i);
  }
  static parseResult(e, t) {
    let n = [];
    if (t)
      n = e.data;
    else
      for (let i = 0; i < e.data.length; i += 1) {
        const r = e.data[i];
        if (r.role === mt)
          n.push(r);
        else
          break;
      }
    return n.reverse();
  }
  // test this using this prompt and it should give 2 text mesages and a file:
  // "give example data for a csv and create a suitable bar chart"
  static parseMessages(e, t, n) {
    const i = [];
    return t.forEach(async (r) => {
      r.content.filter((o) => !!o[h] || !!o.image_file).sort((o) => o[h] ? -1 : o.image_file ? 1 : 0).forEach(async (o) => {
        i.push(Ke.getFilesAndText(e, r, n, o));
      });
    }), Promise.all(i);
  }
  static async processStreamMessages(e, t, n) {
    return Ke.parseMessages(e, [{ content: t, role: mt }], n);
  }
  // prettier-ignore
  static async processAPIMessages(e, t, n, i) {
    const r = Ke.parseResult(t, n);
    return Ke.parseMessages(e, r, i);
  }
};
Ke.FILES_WITH_TEXT_ERROR = "content with type `text` must have `text` values", Ke.FUNCTION_TOOL_RESP_ERROR = `Response must contain an array of strings for each individual function/tool_call, see ${X}directConnection/OpenAI/#assistant-functions.`;
let vt = Ke;
const Ut = class Ut extends k {
  // prettier-ignore
  constructor(e, t, n, i, r, o) {
    if (super(e, i, r, o), this.insertKeyPlaceholderText = this.genereteAPIKeyName("OpenAI"), this.keyHelpUrl = Ln, this.url = "", this.permittedErrorPrefixes = [Mi, "Please send text", xi.FAILED_ERROR_MESSAGE], this.shouldFetchHistory = !1, this._searchedForThreadId = !1, this._config = {}, this._newAssistantDetails = { model: "gpt-4" }, this._waitingForStreamResponse = !1, this._isSSEStream = !1, this.urlSegments = n, typeof t == "object") {
      this._config = t;
      const { new_assistant: a, thread_id: c, load_thread_history: l } = this._config;
      Object.assign(this._newAssistantDetails, a), c && (this.sessionId = c), l && (this.shouldFetchHistory = !0);
    }
    this.maxMessages = 1, this._isSSEStream = !!(this.stream && (typeof this.stream != "object" || !this.stream.simulation));
  }
  async fetchHistoryFunc() {
    setTimeout(() => this.tejas.disableSubmitButton(), 2);
    try {
      const e = await this.getThreadMessages(this.sessionId, !0);
      return this.tejas.disableSubmitButton(!1), e;
    } catch {
      return [{ [f]: Do }];
    }
  }
  static processImageMessage(e, t) {
    const n = t == null ? void 0 : t.filter((i) => ve.isImageFileExtension(i.name)).map((i) => ({ [E]: "image_file", image_file: { file_id: i.id } }));
    if (n && n.length > 0)
      return e[h] && e[h].length > 0 && n.push({ [E]: h, [h]: e[h] }), { content: n, [C]: F };
  }
  static processAttachmentsMessage(e, t, n) {
    return { attachments: t.map((r) => ({ tools: [{ [E]: n }], file_id: r.id })), content: [{ [E]: h, [h]: e[h] }], [C]: F };
  }
  processMessage(e, t) {
    const n = this.totalMessagesMaxCharLength || -1, i = In.getCharacterLimitMessages(e, n)[0];
    if (t && t.length > 0) {
      let r = this.filesToolType;
      if (typeof this.filesToolType == "function") {
        const a = this.filesToolType(t.map(({ name: c }) => c));
        a === "code_interpreter" || a === "file_search" || a === Q ? r = a : (console[f](`Tool type "${a}" is not valid`), console[f]('Expected "code_interpreter" or "file_search" or "images". Going to default to "images"'));
      }
      if (r === "file_search")
        return Ut.processAttachmentsMessage(i, t, "file_search");
      if (r === "code_interpreter")
        return Ut.processAttachmentsMessage(i, t, "code_interpreter");
      if (t.find(({ name: a }) => !ve.isImageFileExtension(a)))
        console[f]("The uploaded files contained a non-image file"), console[f](
          'Make sure only images can be uploaded or define a "code_interpreter" or "file_search" value in the "files_tool_type" property'
        ), console.warn(
          'Make sure your existing assistant supports these "tools" or specify them in the "new_assistant" property'
        );
      else {
        const a = Ut.processImageMessage(i, t);
        if (a) return a;
      }
    }
    return { content: i[h] || "", [C]: F };
  }
  createNewThreadMessages(e, t, n) {
    const i = A(e), r = this.processMessage(t, n);
    return i.thread = { messages: [r] }, i;
  }
  callService(e, t, n) {
    if (this.messages = e, this.sessionId) {
      this.url = `${this.urlSegments.threadsPrefix}/${this.sessionId}/messages${this.urlSegments.createMessagePostfix}`;
      const i = this.processMessage(t, n);
      me.request(this, i, e);
    } else {
      this.url = `${this.urlSegments.threadsPrefix}/runs${this.urlSegments.threadsPosfix}`;
      const i = this.createNewThreadMessages(this.rawBody, t, n);
      this._isSSEStream ? this.createStreamRun(i) : me.request(this, i, e);
    }
  }
  async callServiceAPI(e, t, n) {
    var r;
    if (this._waitingForStreamResponse = !1, !this.connectSettings) throw new Error(Ue);
    (r = this.rawBody).assistant_id ?? (r.assistant_id = this._config.assistant_id || await this.createNewAssistant()), this._searchedForThreadId || this.searchPreviousMessagesForThreadId(e.messageToElements);
    const i = n ? await vt.storeFiles(this, e, n, this.urlSegments.storeFiles) : void 0;
    this.connectSettings.method = be, this.callService(e, t, i);
  }
  async createNewAssistant() {
    try {
      this.url = this.urlSegments.newAssistantUrl;
      const e = await Ht(this, A(this._newAssistantDetails), be);
      return this._config.assistant_id = e.id, this._config.assistant_id;
    } catch (e) {
      console[f](e), console[f]("Failed to create a new assistant");
    }
  }
  searchPreviousMessagesForThreadId(e) {
    const t = e.find(([n]) => n._sessionId);
    t && (this.sessionId = t[0]._sessionId), this._searchedForThreadId = !0;
  }
  async extractResultData(e) {
    var i;
    if (this._waitingForStreamResponse || this._isSSEStream && this.sessionId)
      return await this.handleStream(e);
    if (e[f])
      throw e[f].message.startsWith(vt.FILES_WITH_TEXT_ERROR) ? Error("Please send text with your file(s)") : e[f].message;
    this.asyncCallInProgress = !0, await this.assignThreadAndRun(e);
    const t = `${this.urlSegments.threadsPrefix}/${this.sessionId}/runs/${this.run_id}${this.urlSegments.threadsPosfix}`, n = { method: he, headers: (i = this.connectSettings) == null ? void 0 : i.headers };
    return me.executePollRequest(this, t, n, this.messages), { [h]: "" };
  }
  async assignThreadAndRun(e) {
    if (this.sessionId) {
      this.url = `${this.urlSegments.threadsPrefix}/${this.sessionId}/runs${this.urlSegments.threadsPosfix}`;
      const t = await Ht(this, A(this.rawBody), be);
      this.run_id = t.id;
    } else
      this.sessionId = e.thread_id, this.run_id = e.id, this.updateSessionId(this.sessionId);
  }
  async getThreadMessages(e, t = !1) {
    var i, r;
    this.url = `${this.urlSegments.threadsPrefix}/${e}/messages?${this.urlSegments.listMessagesPostfix}`;
    let n = await Ht(this, {}, he);
    return !t && this.tejas.responseInterceptor && (n = await ((r = (i = this.tejas).responseInterceptor) == null ? void 0 : r.call(i, n))), vt.processAPIMessages(this, n, t, this.urlSegments);
  }
  async extractPollResultData(e) {
    var r;
    const { status: t, required_action: n } = e;
    if (t === "queued" || t === "in_progress") return { timeoutMS: Ut.POLLING_TIMEOUT_MS };
    if (t === rr && this.messages) {
      const o = await this.getThreadMessages(e.thread_id), { text: a, files: c } = o.shift();
      return setTimeout(() => {
        o.forEach((l) => this.tejas.addMessage(l));
      }), { text: a, _sessionId: this.sessionId, [b]: c };
    }
    const i = (r = n == null ? void 0 : n.submit_tool_outputs) == null ? void 0 : r.tool_calls;
    if (t === "requires_action" && i)
      return await this.handleTools(i);
    throw Error(`Thread run status: ${t}`);
  }
  // prettier-ignore
  async handleTools(e) {
    if (!this._functionHandlerI)
      throw Error(qt);
    const t = e.map((c) => ({ name: c.function.name, arguments: c.function.arguments })), n = await this._functionHandlerI(t);
    if (!Array.isArray(n) || e.length !== n.length)
      throw Error(vt.FUNCTION_TOOL_RESP_ERROR);
    const i = await Promise.all(n);
    if (i.find((c) => typeof c !== ye))
      throw Error(vt.FUNCTION_TOOL_RESP_ERROR);
    const r = i.map((c, l) => ({ tool_call_id: e[l].id, output: c })), o = `${this.urlSegments.threadsPrefix}/${this.sessionId}`, a = `/runs/${this.run_id}/submit_tool_outputs${this.urlSegments.threadsPosfix}`;
    return this.url = `${o}${a}`, this._isSSEStream ? await this.createStreamRun({ tool_outputs: r }) : await Ht(this, { tool_outputs: r }, be), { timeoutMS: Ut.POLLING_TIMEOUT_MS };
  }
  async handleStream(e) {
    var n, i;
    const t = (i = (n = e.required_action) == null ? void 0 : n.submit_tool_outputs) == null ? void 0 : i.tool_calls;
    if (e.status === "requires_action" && t)
      return this.run_id = e.id, await this.handleTools(t);
    if (this._waitingForStreamResponse)
      return this.parseStreamResult(e);
    if (this._isSSEStream && this.sessionId) {
      this.asyncCallInProgress = !0, this.url = `${this.urlSegments.threadsPrefix}/${this.sessionId}/runs${this.urlSegments.threadsPosfix}`;
      const r = A(this.rawBody);
      this.createStreamRun(r);
    }
    return { [h]: "" };
  }
  // prettier-ignore
  async parseStreamResult(e) {
    var t, n, i, r, o;
    if (e.content && e.content.length > 0 && this.messages) {
      const a = e.content.find((c) => c[h]);
      if ((t = a == null ? void 0 : a[h]) != null && t.annotations && a[h].annotations.length > 0) {
        const c = e.content.find((d) => !!d[h]) || e.content[0], l = vt.getFilesAndText.bind(
          this,
          this,
          { [C]: mt, content: e.content },
          this.urlSegments,
          c
        );
        return (n = this._messageStream) == null || n.endStreamAfterFileDownloaded(this.messages, l), { [h]: "" };
      }
    }
    if ((i = e.delta) != null && i.content) {
      if (e.delta.content.length > 1) {
        const a = e.delta.content.find((c) => c[h]);
        if ((r = a == null ? void 0 : a[h]) != null && r.annotations && a[h].annotations.length === 0) {
          const c = await vt.processStreamMessages(this, e.delta.content, this.urlSegments);
          return { [h]: c[0][h], [b]: c[1][b] };
        }
      }
      return { [h]: (o = e.delta.content[0][h]) == null ? void 0 : o.value };
    }
    return !this.sessionId && e.thread_id && (this.sessionId = e.thread_id), { [h]: "" };
  }
  // https://platform.openai.com/docs/api-reference/assistants-streaming
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createStreamRun(e) {
    e.stream = !0, this._waitingForStreamResponse = !0, this._messageStream = await W.request(this, e, this.messages, !0, !0);
  }
};
Ut.POLLING_TIMEOUT_MS = 500;
let es = Ut;
class fr extends es {
  constructor(e) {
    var o, a, c, l, d;
    const t = A(e.directConnection), n = t.openAI, i = (o = t.openAI) == null ? void 0 : o.assistant, r = fr.buildUrlSegments(i);
    if (super(e, i, r, Nn(), On, n), (a = this.connectSettings).headers ?? (a.headers = {}), (c = this.connectSettings.headers)["OpenAI-Beta"] ?? (c["OpenAI-Beta"] = "assistants=v2"), this.shouldFetchHistory && this.sessionId && (this.fetchHistory = this.fetchHistoryFunc.bind(this)), typeof i === U) {
      const { function_handler: p, files_tool_type: u } = (d = (l = e.directConnection) == null ? void 0 : l.openAI) == null ? void 0 : d.assistant;
      p && (this._functionHandlerI = p), u && (this.filesToolType = u);
    }
  }
  static buildUrlSegments(e) {
    const t = typeof e == "object" && e.custom_base_url || ze;
    return {
      threadsPrefix: `${t}/threads`,
      threadsPosfix: "",
      newAssistantUrl: `${t}/assistants`,
      createMessagePostfix: "",
      listMessagesPostfix: "order=desc",
      storeFiles: `${t}/${b}`,
      getFilesPrefix: `${t}/${b}/`,
      getFilesPostfix: "/content"
    };
  }
}
const ts = `Please define the Azure URL Details. [More Information](${X}directConnection/Azure)`, Jo = (s) => ({
  "api-key": s,
  [G]: ee
}), Qo = (s) => ge(
  `${s.endpoint}/openai/models?api-version=${s.version}`,
  he,
  Zo
), ea = (s) => {
  const { endpoint: e, version: t, deploymentId: n } = s;
  return e && t && n;
}, vn = class vn extends es {
  constructor(e) {
    var l, d, p, u, g, _, y, S;
    const t = A(e.directConnection), n = t.azure, i = (l = t.azure) == null ? void 0 : l.openAI, r = (i == null ? void 0 : i.urlDetails) || {}, o = `${(d = i == null ? void 0 : i.urlDetails) == null ? void 0 : d.endpoint}/openai/`, a = `?api-version=${(p = i == null ? void 0 : i.urlDetails) == null ? void 0 : p.version}`, c = {
      threadsPrefix: `${o}${vn.THREAD_RESOURCE}`,
      threadsPosfix: a,
      newAssistantUrl: `${o}${vn.NEW_ASSISTANT_RESOURCE}${a}`,
      createMessagePostfix: a,
      listMessagesPostfix: `order=desc&api-version=${(u = i == null ? void 0 : i.urlDetails) == null ? void 0 : u.version}`,
      storeFiles: `${o}${b}${a}`,
      getFilesPrefix: `${o}${b}/`,
      getFilesPostfix: `/content${a}`
    };
    if (super(
      e,
      i == null ? void 0 : i.assistant,
      c,
      Qo(r),
      Jo,
      n
    ), this.permittedErrorPrefixes = [ts], this.insertKeyPlaceholderText = this.genereteAPIKeyName("Azure OpenAI"), this.keyHelpUrl = "https://learn.microsoft.com/en-us/answers/questions/1193991/how-to-get-the-value-of-openai-api-key", this.isTextInputDisabled = !1, typeof (i == null ? void 0 : i.assistant) === U) {
      const { function_handler: M, files_tool_type: K } = (y = (_ = (g = e.directConnection) == null ? void 0 : g.azure) == null ? void 0 : _.openAI) == null ? void 0 : y.assistant;
      M && (this._functionHandlerI = M), K && (this.filesToolType = K);
    }
    ea(r) ? (S = this.connectSettings).headers ?? (S.headers = {}) : (this.isTextInputDisabled = !0, this.canSendMessage = () => !1, setTimeout(() => {
      e.addMessage({ [f]: ts });
    }));
  }
};
vn.THREAD_RESOURCE = "threads", vn.NEW_ASSISTANT_RESOURCE = "assistants";
let zs = vn;
const zl = "sts-session-started", Vl = "sts-session-stopped";
class fe {
  static addAttributes(e) {
    e[C] = "button", e.setAttribute("tabindex", "0");
  }
  static addAriaBusy(e) {
    e.setAttribute("aria-busy", "true");
  }
  static removeAriaBusy(e) {
    e.removeAttribute("aria-busy");
  }
  static addAriaDisabled(e) {
    e.setAttribute(`aria-${$}`, "true");
  }
  static removeAriaDisabled(e) {
    e.removeAttribute(`aria-${$}`);
  }
  static removeAriaAttributes(e) {
    fe.removeAriaBusy(e), fe.removeAriaDisabled(e);
  }
}
const ta = `<?xml version="1.0" encoding="iso-8859-1"?>
<svg height="1.4em" width="1.4em" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 490.9 490.9" xml:space="preserve">
	<g>
		<g>
			<path d="M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5
				C149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5
				c0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z"/>
			<path d="M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3
				s5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8
				c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9
				C106.6,220,101.2,214.5,94.4,214.5z"/>
		</g>
	</g>
</svg>
`, je = class je {
  static createTextElement(e) {
    const t = x();
    return t[m].add(je.INPUT_BUTTON_INNER_TEXT_CLASS), t.innerText = e, t;
  }
  static tryAddSVGElement(e, t, n, i) {
    n ? e.push(Mt.createSVGElement(n)) : n !== "" && i && e.push(t);
  }
  static createCustomElements(e, t, n) {
    var c, l;
    const i = n == null ? void 0 : n[e], r = (c = i == null ? void 0 : i[h]) == null ? void 0 : c.content, o = (l = i == null ? void 0 : i[z]) == null ? void 0 : l.content, a = [];
    return je.tryAddSVGElement(a, t, o, r), r && a.push(je.createTextElement(r)), a.length > 0 ? a : void 0;
  }
  static reassignClassBasedOnChildren(e, t) {
    e[m].remove(
      je.INPUT_BUTTON_SVG_CLASS,
      je.INPUT_BUTTON_SVG_TEXT_CLASS
    ), t.find((n) => n[m].contains(je.INPUT_BUTTON_INNER_TEXT_CLASS)) ? t.length > 1 && e[m].add(je.INPUT_BUTTON_SVG_TEXT_CLASS) : e[m].add(je.INPUT_BUTTON_SVG_CLASS);
  }
};
je.INPUT_BUTTON_SVG_TEXT_CLASS = "input-button-svg-text", je.INPUT_BUTTON_INNER_TEXT_CLASS = "text-button", je.INPUT_BUTTON_SVG_CLASS = "input-button-svg";
let yt = je;
class di {
  static parseSVGTextElements(e) {
    return {
      [z]: e.find((t) => t.tagName.toLowerCase() === z),
      [h]: e.find((t) => t.tagName.toLowerCase() === "div")
    };
  }
}
class Se {
  static unsetAllCSS(e, t) {
    var r, o;
    t.container && ae.unsetAllCSSMouseStates(e, t.container);
    const { svg: n, text: i } = di.parseSVGTextElements(Array.from(e.children));
    (r = t[z]) != null && r[R] && n && ae.unsetAllCSSMouseStates(n, t[z][R]), (o = t[h]) != null && o[R] && i && ae.unsetAllCSSMouseStates(i, t[h][R]);
  }
  static unsetActionCSS(e, t) {
    var r, o;
    t.container && ae.unsetActivityCSSMouseStates(e, t.container);
    const { svg: n, text: i } = di.parseSVGTextElements(Array.from(e.children));
    (r = t[z]) != null && r[R] && n && ae.unsetActivityCSSMouseStates(n, t[z][R]), (o = t[h]) != null && o[R] && i && ae.unsetActivityCSSMouseStates(i, t[h][R]);
  }
  static setElementsCSS(e, t, n) {
    var o, a, c, l, d;
    Object.assign(e[v], (o = t.container) == null ? void 0 : o[n]);
    const { svg: i, text: r } = di.parseSVGTextElements(Array.from(e.children));
    i && Object.assign(i[v], (c = (a = t[z]) == null ? void 0 : a[R]) == null ? void 0 : c[n]), r && Object.assign(r[v], (d = (l = t[h]) == null ? void 0 : l[R]) == null ? void 0 : d[n]);
  }
  static setElementCssUpToState(e, t, n) {
    Se.setElementsCSS(e, t, w), n !== w && (Se.setElementsCSS(e, t, Be), n !== Be && Se.setElementsCSS(e, t, Z));
  }
}
class fn {
  // prettier-ignore
  constructor(e, t, n, i, r, o) {
    this._mouseState = { state: "default" }, this.isCustom = !1, fe.addAttributes(e), this.elementRef = e, this[z] = Mt.createSVGElement(t), this.customStyles = r, this.position = le.processPosition(n), this._tooltipSettings = i, this.dropupText = o;
  }
  buttonMouseLeave(e) {
    var t;
    this._mouseState.state = w, ((t = this._activeTooltip) == null ? void 0 : t.element[v].visibility) === "visible" && this._tooltipSettings && ht.hide(this._activeTooltip, this._tooltipSettings), e && (Se.unsetAllCSS(this.elementRef, e), Se.setElementsCSS(this.elementRef, e, w));
  }
  buttonMouseEnter(e) {
    var t;
    this._mouseState.state = Be, this._tooltipSettings && (this._activeTooltip = ht.display(this.elementRef, this._tooltipSettings, (t = this._activeTooltip) == null ? void 0 : t.element)), e && Se.setElementsCSS(this.elementRef, e, Be);
  }
  buttonMouseUp(e) {
    e && Se.unsetActionCSS(this.elementRef, e), this.buttonMouseEnter(e);
  }
  buttonMouseDown(e) {
    this._mouseState.state = Z, e && Se.setElementsCSS(this.elementRef, e, Z);
  }
  // be careful not to use onclick as that is used for button functionality
  setEvents(e) {
    this.elementRef.onmousedown = this.buttonMouseDown.bind(this, e), this.elementRef.onmouseup = this.buttonMouseUp.bind(this, e), this.elementRef.onmouseenter = this.buttonMouseEnter.bind(this, e), this.elementRef.onmouseleave = this.buttonMouseLeave.bind(this, e);
  }
  unsetCustomStateStyles(e) {
    if (this.customStyles)
      for (let t = 0; t < e.length; t += 1) {
        const n = e[t], i = n && this.customStyles[n];
        i && Se.unsetActionCSS(this.elementRef, i);
      }
  }
  reapplyStateStyle(e, t) {
    if (!this.customStyles) return;
    t && this.unsetCustomStateStyles(t);
    const n = this.customStyles[e];
    n && Se.setElementCssUpToState(this.elementRef, n, this._mouseState.state), this.setEvents(n);
  }
  changeElementsByState(e) {
    this.elementRef.replaceChildren(...e), yt.reassignClassBasedOnChildren(this.elementRef, e);
  }
  buildDefaultIconElement(e) {
    const t = this[z].cloneNode(!0);
    return t.id = e, [t];
  }
  createInnerElements(e, t, n) {
    const i = yt.createCustomElements(t, this[z], n);
    if (i && i.length > 0) {
      if (this.position === Qe) {
        const r = i[0].cloneNode(!0);
        r.id = i[0] === this[z] ? e : "dropup-menu-item-icon-element-custom", i[0] = r;
      }
      return i;
    }
    return this.buildDefaultIconElement(e);
  }
}
const fs = class fs extends fn {
  constructor(e) {
    var n, i;
    const t = ((i = (n = e == null ? void 0 : e[w]) == null ? void 0 : n[z]) == null ? void 0 : i.content) || fs.EMPTY_SVG;
    super(x(), t, void 0, void 0, e), this.isActive = !1, this._innerElements = this.createInnerElementsForStates(this.customStyles), this.changeToDefault();
  }
  createInnerElementsForStates(e) {
    return {
      [w]: this.createInnerButtonElements(w, e),
      [H]: this.createInnerButtonElements(H, e),
      [Ot]: this.createInnerButtonElements(Ot, e)
    };
  }
  createInnerButtonElements(e, t) {
    return yt.createCustomElements(e, this[z], t) || [this[z]];
  }
  changeState(e) {
    this.changeElementsByState(e), this.elementRef[m].replace(yt.INPUT_BUTTON_SVG_CLASS, "tejas-openai-realtime-button");
  }
  changeToActive() {
    this.changeState(this._innerElements[H]), this.reapplyStateStyle(H, [Ot, w]), this.isActive = !0;
  }
  changeToDefault() {
    var e, t, n, i;
    this.changeState(this._innerElements[w]), (e = this.customStyles) != null && e[H] && Se.unsetAllCSS(this.elementRef, (t = this.customStyles) == null ? void 0 : t[H]), (n = this.customStyles) != null && n[Ot] && Se.unsetAllCSS(this.elementRef, (i = this.customStyles) == null ? void 0 : i[Ot]), this.reapplyStateStyle(w, [H, Ot]), this.isActive = !1;
  }
  changeToUnavailable() {
    var e, t, n, i;
    this.changeState(this._innerElements[Ot]), (e = this.customStyles) != null && e[H] && Se.unsetAllCSS(this.elementRef, (t = this.customStyles) == null ? void 0 : t[H]), (n = this.customStyles) != null && n[w] && Se.unsetAllCSS(this.elementRef, (i = this.customStyles) == null ? void 0 : i[w]), this.reapplyStateStyle(Ot, [w, H]), this.isActive = !1;
  }
};
fs.EMPTY_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>';
let ns = fs;
class ke {
  static setPropertyValueIfDoesNotExist(e, t, n) {
    const i = t[0];
    t.length === 1 ? e[i] ?? (e[i] = n) : (e[i] ?? (e[i] = {}), t.shift(), ke.setPropertyValueIfDoesNotExist(e[i], t, n));
  }
  static setPropertyValue(e, t, n) {
    const i = t[0];
    t.length === 1 ? e[i] = n : (e[i] ?? (e[i] = {}), t.shift(), ke.setPropertyValue(e[i], t, n));
  }
  static getObjectValue(e, t) {
    const n = t[0], i = e[n];
    return i === void 0 || t.length === 1 ? i : ke.getObjectValue(i, t.slice(1));
  }
  static overwritePropertyObjectFromAnother(e, t, n) {
    const i = ke.getObjectValue(t, n);
    if (i) {
      const r = { ...i, ...ke.getObjectValue(e, n) || {} };
      ke.setPropertyValue(e, n, r);
    }
  }
  static isJson(e) {
    try {
      return ce(e), !0;
    } catch {
      return !1;
    }
  }
  // prettier-ignore
  static assignPropertyFromOneToAnother(e, t, n) {
    t[e] ?? (t[e] = {}), Object.assign(t[e], n == null ? void 0 : n[e]);
  }
}
const na = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"></path>
</svg>`, Vs = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"></path>
</svg>`, Wl = "https://img.icons8.com/color/48/000000/bot.png", J = class J extends k {
  constructor(e) {
    var r, o, a, c, l;
    const t = A(e.directConnection), n = J.getKey(e);
    super(e, Nn(), On, { key: n }), this.insertKeyPlaceholderText = this.genereteAPIKeyName("OpenAI"), this.keyHelpUrl = Ln, this._microphoneButton = null, this._toggleButton = null, this._errorElement = null, this._loadingElement = null, this._pc = null, this._mediaStream = null, this._isMuted = !1;
    const i = (r = t.openAI) == null ? void 0 : r.realtime;
    if (typeof i === U) {
      this._avatarConfig = i.avatar, this._ephemeralKey = i.ephemeralKey, this._errorConfig = i[f], this._loadingConfig = i.loading, Object.assign(this.rawBody, i.config);
      const d = (a = (o = e.directConnection) == null ? void 0 : o.openAI) == null ? void 0 : a.realtime, { function_handler: p } = d.config || {};
      p && (this._functionHandlerI = p), this._events = i.events, d.methods = this.generateMethods(), this.setInputAudioTranscribe(e, (c = d.config) == null ? void 0 : c.input_audio_transcription);
    }
    (l = this.rawBody).model ?? (l.model = "gpt-4o-realtime-preview-2025-06-03"), this._avatarConfig = J.buildAvatarConfig(i), this._buttonsConfig = J.buildButtonsConfig(i), this._avatarEl = J.createAvatar(this._avatarConfig), this._containerEl = this.createContainer(), this._tejas = e;
  }
  static getKey(e) {
    const t = e.directConnection.openAI;
    if (t != null && t.key) return t.key;
    const n = t == null ? void 0 : t.realtime;
    if (typeof n == "object" && (n.ephemeralKey || n.fetchEphemeralKey))
      return "placeholder";
  }
  // https://community.openai.com/t/unable-to-access-user-audio-transcript-in-realtime-api/1001570/3
  setInputAudioTranscribe(e, t) {
    if (t) {
      const n = "whisper-1";
      typeof t == "object" ? this.rawBody.input_audio_transcription = {
        model: t.model || n,
        language: t.language,
        prompt: t.prompt
      } : this.rawBody.input_audio_transcription = {
        model: n
      };
    } else e.onMessage && (console.warn("To get user audio transcription, set `input_audio_transcription` in the `realtime` config."), console.warn(`See: ${X}directConnection/OpenAI/OpenAIRealtime#OpenAIRealtimeConfig`));
  }
  // called after API key was inserted
  setUpView(e, t) {
    e[v].display = "none", t.appendChild(this._containerEl), this.setup();
  }
  async setup() {
    var i;
    const e = (i = this._tejas.directConnection) == null ? void 0 : i.openAI;
    if (!e) return;
    const t = e == null ? void 0 : e.realtime;
    if (typeof t != "object" || !t.autoStart && !t.autoFetchEphemeralKey) return;
    const n = this.key || e.key;
    (t.fetchEphemeralKey || n) && t.autoStart && (this.changeToUnavailable(), this.displayLoading()), this.fetchEphemeralKey(t.autoStart);
  }
  async fetchEphemeralKey(e) {
    var o;
    const t = (o = this._tejas.directConnection) == null ? void 0 : o.openAI, n = typeof (t == null ? void 0 : t.realtime) == "object" ? t == null ? void 0 : t.realtime.fetchEphemeralKey : void 0, i = t == null ? void 0 : t.realtime, r = this.key || t.key;
    if (typeof i == "object") {
      if (!this._ephemeralKey)
        try {
          if (n) {
            const a = n();
            a.then && (this._retrievingEphemeralKey = a), this._ephemeralKey = await a;
          } else r && (this._retrievingEphemeralKey = this.getEphemeralKey(r), this._ephemeralKey = await this._retrievingEphemeralKey);
        } catch (a) {
          this.displayFailedToRetrieveEphemeralKey(a);
        }
      this._ephemeralKey && (e ? this.init(this._ephemeralKey) : this.changeToAvailable());
    } else if (r)
      try {
        this._retrievingEphemeralKey = this.getEphemeralKey(r), this._ephemeralKey = await this._retrievingEphemeralKey, e && this.init(this._ephemeralKey);
      } catch (a) {
        this.displayFailedToRetrieveEphemeralKey(a);
      }
  }
  async getEphemeralKey(e) {
    return (await (await fetch(`${ze}realtime/sessions`, {
      method: be,
      body: ce(this.rawBody),
      headers: {
        [G]: ee,
        [de]: `${we}${e}`
      }
    })).json()).client_secret.value;
  }
  generateMethods() {
    return {
      updateConfig: (e) => {
        var t;
        (t = this._dc) == null || t.send(ce({ [E]: "session.update", session: e }));
      },
      sendMessage: (e, t) => {
        const n = t || Rn, i = [{ [E]: n === Rn || n === F ? Gs : h, text: e }], r = { [C]: n, [E]: "message", content: i };
        this.sendMessage(r);
      }
    };
  }
  static buildAvatarConfig(e) {
    const t = typeof e == "object" && e.avatar ? A(e.avatar) : {};
    return t.maxScale = t.maxScale && t.maxScale >= 1 ? t.maxScale : 2.5, t;
  }
  static buildButtonsConfig(e) {
    var n, i, r, o, a, c, l, d, p, u, g, _, y, S, M;
    const t = typeof e == "object" && e.buttons ? A(e.buttons) : {};
    return (r = (i = (n = t[at]) == null ? void 0 : n[w]) == null ? void 0 : i[h]) != null && r.content || (t[at] ?? (t[at] = {}), (o = t[at])[w] ?? (o[w] = {}), (a = t[at][w])[z] ?? (a[z] = {}), (c = t[at][w][z]).content ?? (c.content = ta)), (p = (d = (l = t.toggle) == null ? void 0 : l[w]) == null ? void 0 : d[h]) != null && p.content || (t.toggle ?? (t.toggle = {}), (u = t.toggle)[w] ?? (u[w] = {}), (g = t.toggle[w])[z] ?? (g[z] = {}), (_ = t.toggle[w][z]).content ?? (_.content = na), (y = t.toggle)[H] ?? (y[H] = {}), (S = t.toggle[H])[z] ?? (S[z] = {}), (M = t.toggle[H][z]).content ?? (M.content = Vs)), t;
  }
  createContainer() {
    const e = x();
    return e.id = "tejas-openai-realtime-container", e.appendChild(this.createAvatarContainer()), e.appendChild(this.createButtonsContainer()), e.appendChild(this.createError()), e;
  }
  createAvatarContainer() {
    var t, n;
    const e = x();
    return e.id = "tejas-openai-realtime-avatar-container", Object.assign(e[v], (n = (t = this._avatarConfig) == null ? void 0 : t[R]) == null ? void 0 : n.container), e.appendChild(this._avatarEl), e;
  }
  static createAvatar(e) {
    var n;
    const t = x("img");
    return t.id = "tejas-openai-realtime-avatar", Object.assign(t[v], (n = e == null ? void 0 : e[R]) == null ? void 0 : n[j]), t[T] = (e == null ? void 0 : e[T]) || Wl, t;
  }
  createButtonsContainer() {
    var i;
    const e = x();
    e.id = "tejas-openai-realtime-buttons-container", Object.assign(e[v], (i = this._buttonsConfig) == null ? void 0 : i.container), this._microphoneButton = this.createMicophoneButton();
    const t = J.createButtonContainer(this._microphoneButton.elementRef);
    this._toggleButton = this.createToggleButton();
    const n = J.createButtonContainer(this._toggleButton.elementRef);
    return e.appendChild(t), e.appendChild(n), e.appendChild(this.createLoading()), e;
  }
  static createButtonContainer(e) {
    const t = x();
    return t[m].add("tejas-openai-realtime-button-container"), t.appendChild(e), t;
  }
  createMicophoneButton() {
    var t;
    const e = new ns((t = this._buttonsConfig) == null ? void 0 : t[at]);
    return e.elementRef[m].add(J.BUTTON_DEFAULT, "tejas-openai-realtime-microphone"), V.assignButtonEvents(e.elementRef, () => {
      e.isActive ? (this.toggleMicorphone(!0), e.elementRef[m].replace(
        J.MICROPHONE_ACTIVE,
        J.BUTTON_DEFAULT
      ), e.changeToDefault(), this._isMuted = !1) : (this.toggleMicorphone(!1), e.elementRef[m].replace(
        J.BUTTON_DEFAULT,
        J.MICROPHONE_ACTIVE
      ), fe.removeAriaAttributes(e.elementRef), e.changeToActive(), this._isMuted = !0);
    }), e;
  }
  toggleMicorphone(e) {
    var t;
    (t = this._mediaStream) == null || t.getAudioTracks().forEach((n) => n.enabled = e);
  }
  createToggleButton() {
    var t;
    const e = new ns((t = this._buttonsConfig) == null ? void 0 : t.toggle);
    return e.elementRef[m].add(J.BUTTON_DEFAULT, "tejas-openai-realtime-toggle"), V.assignButtonEvents(e.elementRef, async () => {
      var n;
      if (e.isActive)
        e.changeToDefault(), this.stop();
      else
        try {
          if (this._ephemeralKey)
            this.displayLoading(), await this.init(this._ephemeralKey);
          else if (this._retrievingEphemeralKey) {
            this.displayLoading();
            const i = await this._retrievingEphemeralKey;
            (n = this._toggleButton) != null && n.isActive && await this.init(i);
          } else
            this.displayLoading(), await this.fetchEphemeralKey(!0);
        } catch (i) {
          console[f]("Failed to start conversation:", i), this.displayError(), this.hideLoading();
        }
    }), e;
  }
  async init(e) {
    const t = new RTCPeerConnection();
    this._pc = t;
    const n = x(q);
    n.autoplay = !0;
    const i = new AudioContext(), r = i.createAnalyser();
    r.fftSize = 256;
    const o = new Uint8Array(r.frequencyBinCount);
    this._pc.ontrack = async (a) => {
      if (a.streams[0]) {
        n.srcObject = a.streams[0];
        const c = i.createMediaStreamSource(a.streams[0]);
        i.state === "suspended" && await i.resume(), c.connect(r), this.monitorFrequencies(r, o);
      } else
        console[f]("No streams found in the ontrack event."), this.displayError();
    }, await navigator.mediaDevices.getUserMedia({
      audio: !0
    }).then((a) => {
      var c;
      t === this._pc && (this._mediaStream = a, (c = this._pc) == null || c.addTrack(this._mediaStream.getTracks()[0]), this._isMuted && this.toggleMicorphone(!1));
    }).catch((a) => {
      console[f]("Error accessing microphone:", a), this.displayError();
    }), this._dc = this._pc.createDataChannel("oai-events"), this._dc.addEventListener("message", async (a) => {
      var l, d, p;
      const c = JSON.parse(a.data);
      if (c[E] === "session.created")
        this.removeUnavailable(), this._toggleButton && (fe.removeAriaAttributes(this._toggleButton.elementRef), this._toggleButton.changeToActive()), (d = (l = this._events) == null ? void 0 : l.started) == null || d.call(l), this._tejas.dispatchEvent(new CustomEvent(zl)), this.hideLoading();
      else if (c[E] === "response.done") {
        const g = (p = JSON.parse(a.data).response.output) == null ? void 0 : p[0];
        if ((g == null ? void 0 : g[E]) === Hi) {
          const { name: _, call_id: y } = g;
          try {
            await this.handleTool(_, g.arguments, y);
          } catch (S) {
            this.stopOnError(S);
          }
        }
      } else c[E] === f ? this.stopOnError(c[f].message) : c[E] === it ? this.stopOnError(c.message) : c[E] === "response.audio_transcript.delta" || (c[E] === "response.audio_transcript.done" ? c.transcript && ln.onMessage(this._tejas, { [C]: te, [h]: c.transcript }, !1) : c[E] === "conversation.item.input_audio_transcription.completed" && c.transcript && ln.onMessage(this._tejas, { [C]: F, [h]: c.transcript }, !1));
    });
    try {
      const a = await this._pc.createOffer();
      if (t !== this._pc || (await this._pc.setLocalDescription(a), t !== this._pc)) return;
      const c = await fetch(`${ze}realtime`, {
        method: be,
        body: a.sdp,
        headers: {
          [de]: `${we}${e}`,
          [G]: "application/sdp"
        }
      });
      if (t !== this._pc) return;
      const l = {
        [E]: "answer",
        sdp: await c[h]()
      };
      if (t !== this._pc || (await this._pc.setRemoteDescription(l), t !== this._pc)) return;
    } catch (a) {
      console[f](a), this.displayError();
    }
  }
  // there is a bug where sometimes upon refreshing the browser too many times the frequencyData is all 0s
  // in such instance please wait and refresh at a later time
  monitorFrequencies(e, t) {
    const n = () => {
      var l;
      e.getByteFrequencyData(t);
      const i = t.reduce((d, p) => d + p, 0), r = t.length * 255, o = i / r * 100, a = 1, c = a + o / 100 * (((l = this._avatarConfig) == null ? void 0 : l.maxScale) - a);
      this._avatarEl[v].transform = `scale(${c})`, requestAnimationFrame(n);
    };
    n();
  }
  stopOnError(e) {
    this.stop(), console[f](e), this.displayError();
  }
  stop() {
    var e, t, n;
    (e = this._mediaStream) == null || e.getTracks().forEach((i) => i.stop()), this._mediaStream = null, this._pc && (this._pc.close(), this._pc = null, (n = (t = this._events) == null ? void 0 : t.stopped) == null || n.call(t), this._tejas.dispatchEvent(new CustomEvent(Vl)), this._dc = void 0);
  }
  changeToUnavailable() {
    this._microphoneButton && J.changeButtonToUnavailable(this._microphoneButton), this._toggleButton && J.changeButtonToUnavailable(this._toggleButton);
  }
  static changeButtonToUnavailable(e) {
    e.elementRef[m].add(J.UNAVAILABLE), fe.removeAriaBusy(e.elementRef), fe.addAriaDisabled(e.elementRef), e.changeToUnavailable();
  }
  changeToAvailable() {
    this._microphoneButton && J.changeButtonToAvailable(this._microphoneButton), this._toggleButton && J.changeButtonToAvailable(this._toggleButton);
  }
  static changeButtonToAvailable(e) {
    J.removeButtonUnavailable(e), e.changeToDefault();
  }
  removeUnavailable() {
    this._microphoneButton && J.removeButtonUnavailable(this._microphoneButton), this._toggleButton && J.removeButtonUnavailable(this._toggleButton);
  }
  static removeButtonUnavailable(e) {
    fe.removeAriaDisabled(e.elementRef), e.elementRef[m].remove(J.UNAVAILABLE);
  }
  createError() {
    var t;
    const e = x();
    return e.id = "tejas-openai-realtime-error", Object.assign(e[v], (t = this._errorConfig) == null ? void 0 : t[v]), this._errorElement = e, e;
  }
  displayFailedToRetrieveEphemeralKey(e) {
    console[f]("Failed to retrieve ephemeral key"), console[f](e), this.displayError();
  }
  displayError() {
    var e;
    this._errorElement && (this._errorElement[v].display = "block", this._errorElement.textContent = ((e = this._errorConfig) == null ? void 0 : e[h]) || "Error", this.changeToUnavailable()), this.hideLoading();
  }
  createLoading() {
    var t, n;
    const e = x();
    return e.id = "tejas-openai-realtime-loading", this._loadingElement = e, (t = this._loadingConfig) != null && t[L] && (this._loadingElement.innerHTML = this._loadingConfig[L]), Object.assign(e[v], (n = this._loadingConfig) == null ? void 0 : n[v]), e[v].display = "none", e;
  }
  displayLoading() {
    var e, t, n;
    this._toggleButton && (this._toggleButton.changeToActive(), this._toggleButton.elementRef[m].add(J.BUTTON_LOADING), fe.removeAriaDisabled(this._toggleButton.elementRef), fe.addAriaBusy(this._toggleButton.elementRef)), (typeof ((e = this._loadingConfig) == null ? void 0 : e.display) != "boolean" || this._loadingConfig.display) && this._loadingElement && (this._loadingElement[v].display = "block", (t = this._loadingConfig) != null && t[L] || (this._loadingElement.textContent = ((n = this._loadingConfig) == null ? void 0 : n[h]) || "Loading"));
  }
  hideLoading() {
    this._toggleButton && (this._toggleButton.elementRef[m].remove(J.BUTTON_LOADING), fe.removeAriaBusy(this._toggleButton.elementRef)), this._loadingElement && (this._loadingElement[v].display = "none");
  }
  // https://platform.openai.com/docs/guides/function-calling?api-mode=responses
  async handleTool(e, t, n) {
    if (!this._functionHandlerI)
      throw Error(qt);
    const i = await this._functionHandlerI({ name: e, arguments: t });
    if (typeof i != "object" || !ke.isJson(i))
      throw Error('The `function_handler` response must be a JSON object, e.g. {response: "My response"}');
    const r = { [E]: Yo, call_id: n, output: ce(i) };
    this.sendMessage(r);
  }
  // https://platform.openai.com/docs/api-reference/realtime-client-events/conversation/item/create
  sendMessage(e) {
    if (!this._dc) return;
    const t = ce({ [E]: "conversation.item.create", item: e });
    this._dc.send(t);
    const n = { [E]: "response.create" };
    this._dc.send(ce(n));
  }
  isCustomView() {
    return !0;
  }
};
J.BUTTON_DEFAULT = "tejas-openai-realtime-button-default", J.BUTTON_LOADING = "tejas-openai-realtime-button-loading", J.MICROPHONE_ACTIVE = "tejas-openai-realtime-microphone-active", J.UNAVAILABLE = "tejas-openai-realtime-button-unavailable";
let Ws = J;
const Sn = class Sn extends k {
  constructor(e) {
    var r, o, a;
    const t = A(e.directConnection), n = t == null ? void 0 : t.openAI;
    super(e, Nn(), On, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("OpenAI"), this.keyHelpUrl = Ln, this.url = `${ze}audio/speech`, this.permittedErrorPrefixes = [Gt];
    const i = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r.textToSpeech;
    typeof i === U && Object.assign(this.rawBody, i), (o = this.rawBody).model ?? (o.model = Sn.DEFAULT_MODEL), (a = this.rawBody).voice ?? (a.voice = Sn.DEFAULT_VOIDE), this.textInputPlaceholderText = "Insert text to generate audio", this.rawBody.response_format = "mp3";
  }
  preprocessBody(e, t) {
    var r, o;
    const n = A(e), i = (o = (r = t[t.length - 1]) == null ? void 0 : r[h]) == null ? void 0 : o.trim();
    return i && i !== "" && (n.input = i), n;
  }
  async callServiceAPI(e, t) {
    this.url = this.connectSettings.url || this.url, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    if (e instanceof Blob)
      return new Promise((t) => {
        const n = new FileReader();
        n.readAsDataURL(e), n.onload = (i) => {
          t({ [b]: [{ [T]: i.target.result, [E]: q }] });
        };
      });
    if (e[f]) throw e[f].message;
    return { [f]: f };
  }
};
Sn.DEFAULT_MODEL = "tts-1", Sn.DEFAULT_VOIDE = "alloy";
let Ks = Sn;
const st = class st extends k {
  constructor(e) {
    var r, o;
    const t = A(e.directConnection), n = t == null ? void 0 : t.openAI;
    super(e, Nn(), On, n, { audio: {} }), this.insertKeyPlaceholderText = this.genereteAPIKeyName("OpenAI"), this.keyHelpUrl = Ln, this.url = "", this.permittedErrorPrefixes = [Gt], this.textInputPlaceholderText = or, this._service_url = st.AUDIO_TRANSCRIPTIONS_URL;
    const i = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r[q];
    typeof i == "object" && (this.processConfig(i), st.cleanConfig(i), Object.assign(this.rawBody, i)), (o = this.rawBody).model ?? (o.model = st.DEFAULT_MODEL), this.rawBody.response_format = "json", this.canSendMessage = st.canSendFileMessage;
  }
  static canSendFileMessage(e, t) {
    return !!(t != null && t[0]);
  }
  processConfig(e) {
    e != null && e[E] && e[E] === "translation" && (this._service_url = st.AUDIO_TRANSLATIONS_URL, delete e.language);
  }
  static cleanConfig(e) {
    delete e[E];
  }
  static createFormDataBody(e, t) {
    const n = new FormData();
    return n.append(ne, t), Object.keys(e).forEach((i) => {
      n.append(i, String(e[i]));
    }), n;
  }
  preprocessBody(e, t) {
    var r, o;
    const n = A(e), i = (o = (r = t[t.length - 1]) == null ? void 0 : r[h]) == null ? void 0 : o.trim();
    return i && i !== "" && (n.prompt = i), n;
  }
  // prettier-ignore
  async callServiceAPI(e, t, n) {
    var o;
    if (!((o = this.connectSettings) != null && o.headers)) throw new Error(Ue);
    if (!(n != null && n[0])) throw new Error(gs);
    this.url = this.connectSettings.url || this._service_url;
    const i = this.preprocessBody(this.rawBody, t), r = st.createFormDataBody(i, n[0]);
    D.tempRemoveContentHeader(
      this.connectSettings,
      me.request.bind(this, this, r, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e[f]) throw e[f].message;
    return { [h]: e[h] };
  }
};
st.AUDIO_TRANSCRIPTIONS_URL = `${ze}audio/transcriptions`, st.AUDIO_TRANSLATIONS_URL = `${ze}audio/translations`, st.DEFAULT_MODEL = "whisper-1";
let js = st;
const Bn = "Ocp-Apim-Subscription-Key", ia = (
  // eslint-disable-next-line max-len
  "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal"
), Kl = (s, e) => ({
  [Bn]: e,
  [G]: "application/ssml+xml",
  "X-Microsoft-OutputFormat": s
}), jl = (s) => ({
  [Bn]: s,
  Accept: ee
}), Xl = (s, e, t, n) => {
  s[f] ? n(ue) : t(e);
}, Yl = (s) => ({
  url: `https://${s}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`,
  method: be,
  createHeaders: (e) => ({ [Bn]: `${e}` }),
  handleVerificationResult: Xl
}), Zl = (s) => ({
  [Bn]: s,
  [G]: ee
}), Jl = (s, e, t, n) => {
  var r;
  ((r = s[f]) == null ? void 0 : r.code) === "401" ? n(ue) : t(e);
}, Ql = (s) => ({
  url: `${s}/language/analyze-text/jobs?api-version=2022-10-01-preview`,
  method: be,
  createHeaders: (e) => ({ [Bn]: `${e}` }),
  handleVerificationResult: Jl
}), ed = (s, e, t, n) => {
  s.json().then((r) => {
    !Array.isArray(r) && r[f].code === 401e3 ? n(ue) : t(e);
  });
}, td = (s) => ({
  url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es",
  method: be,
  createHeaders: (e) => sa(s, e),
  handleVerificationResult: ed
}), sa = (s, e) => {
  const t = {
    [Bn]: e,
    [G]: ee
  };
  return s && (t["Ocp-Apim-Subscription-Region"] = s), t;
};
class nd extends k {
  // prettier-ignore
  constructor(e, t, n, i, r) {
    super(
      e,
      Ql(n),
      t,
      i,
      r
    ), this.insertKeyPlaceholderText = "Azure Language Subscription Key", this.keyHelpUrl = ia, this.permittedErrorPrefixes = ["Access"];
  }
}
const bi = class bi extends nd {
  constructor(e) {
    var i, r, o, a;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.azure) == null ? void 0 : r.summarization, n = (o = e.directConnection) == null ? void 0 : o.azure;
    super(e, Zl, t.endpoint, n), this.permittedErrorPrefixes = [bi.ENDPOINT_ERROR_MESSAGE], this.url = "", this.textInputPlaceholderText = "Insert text to summarize", this.isTextInputDisabled = !1, t.endpoint ? ((a = this.rawBody).language ?? (a.language = "en"), Object.assign(this.rawBody, t), this.url = `${t.endpoint}/language/analyze-text/jobs?api-version=2022-10-01-preview`) : (this.isTextInputDisabled = !0, this.canSendMessage = () => !1, setTimeout(() => {
      e.addMessage({ [f]: bi.ENDPOINT_ERROR_MESSAGE });
    }));
  }
  preprocessBody(e, t) {
    const n = t[t.length - 1][h];
    if (n)
      return {
        analysisInput: {
          documents: [
            {
              id: "1",
              language: e.language,
              [h]: n
            }
          ]
        },
        tasks: [
          {
            kind: "ExtractiveSummarization"
          }
        ]
      };
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)), this.messages = e;
  }
  async extractResultData(e) {
    var t;
    if (e[f]) throw e[f].message;
    if (this.messages && this.completionsHandlers) {
      this.asyncCallInProgress = !0;
      const n = e.headers.get("operation-location"), i = { method: he, headers: (t = this.connectSettings) == null ? void 0 : t.headers };
      me.executePollRequest(this, n, i, this.messages);
    }
    return { [h]: "" };
  }
  async extractPollResultData(e) {
    if (e[f]) throw e[f];
    if (e.status === "running" || e.status === "notStarted") return { timeoutMS: 2e3 };
    if (e.errors.length > 0) throw e.errors[0];
    if (e.tasks.items[0].results.errors.length > 0) throw e.tasks.items[0].results.errors[0];
    let t = "";
    for (const n of e.tasks.items[0].results.documents[0].sentences)
      t += n[h];
    return { [h]: t || "" };
  }
};
bi.ENDPOINT_ERROR_MESSAGE = // eslint-disable-next-line max-len
`Please define the azure endpoint. [More Information](${X}directConnection/Azure#Summarization)`;
let Xs = bi;
const id = async (s, e) => {
  const t = {
    [Ma]: s,
    [ka]: ee
  }, o = `https://api.assemblyai.com/v2/transcript/${(await (await fetch("https://api.assemblyai.com/v2/transcript", {
    method: be,
    body: ce({ audio_url: e }),
    headers: t
  })).json()).id}`;
  let a;
  for (; !a; ) {
    const l = await (await fetch(o, { headers: t })).json();
    if (l.status === rr)
      a = l;
    else {
      if (l.status === f)
        throw new Error(`Transcription failed: ${l[f]}`);
      await new Promise((d) => setTimeout(d, 3e3));
    }
  }
  return a;
}, sd = (s) => ({
  [de]: s,
  [G]: "application/octet-stream"
}), rd = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f].code === "invalid_api_key" ? n(ue) : n(Fe) : t(e);
}, od = () => ge("https://api.assemblyai.com/v2/upload", be, rd);
class mr extends k {
  constructor(e) {
    var n;
    const t = (n = e.directConnection) == null ? void 0 : n.assemblyAI;
    super(e, od(), sd, t, { audio: {} }), this.insertKeyPlaceholderText = this.genereteAPIKeyName("AssemblyAI"), this.keyHelpUrl = "https://www.assemblyai.com/app/account", this.url = "https://api.assemblyai.com/v2/upload", this.isTextInputDisabled = !0, this.textInputPlaceholderText = or, this.permittedErrorPrefixes = [Fo, Gt], this.canSendMessage = mr.canFileSendMessage;
  }
  static canFileSendMessage(e, t) {
    return !!(t != null && t[0]);
  }
  async callServiceAPI(e, t, n) {
    var i;
    if (!((i = this.connectSettings) != null && i.headers)) throw new Error(Ue);
    if (!(n != null && n[0])) throw new Error(gs);
    me.request(this, n[0], e, !1);
  }
  async extractResultData(e) {
    var i, r;
    if (e[f]) throw e[f];
    const t = (r = (i = this.connectSettings) == null ? void 0 : i.headers) == null ? void 0 : r[de], n = await id(t, e.upload_url);
    return { [h]: n[h] };
  }
}
class is extends k {
  // prettier-ignore
  constructor(e, t, n, i, r) {
    var p, u;
    const o = A(e.directConnection), a = t || Nn(), c = n || On, l = i || o.openAI;
    super(e, a, c, l), this.insertKeyPlaceholderText = this.genereteAPIKeyName("OpenAI"), this.keyHelpUrl = "https://platform.openai.com/account/api-keys", this.permittedErrorPrefixes = [Mi, "Invalid value"];
    const d = r || ((p = o.openAI) == null ? void 0 : p.chat);
    typeof d === U && this.processConfig(d, e), this.maxMessages ?? (this.maxMessages = -1), (u = this.rawBody).model ?? (u.model = "gpt-4o");
  }
  processConfig(e, t) {
    var n, i, r;
    this.completeConfig(e, (r = (i = (n = t.directConnection) == null ? void 0 : n.openAI) == null ? void 0 : i.chat) == null ? void 0 : r.function_handler);
  }
  static getBaseFileContent(e) {
    return e.map((t) => {
      var n, i, r;
      if (t[E] === q) {
        const o = (n = t[T]) == null ? void 0 : n.split(",")[1], a = ((r = (i = t.name) == null ? void 0 : i.split(".").pop()) == null ? void 0 : r.toLowerCase()) || "wav";
        return { [E]: tn, [tn]: { data: o, format: a } };
      }
      return t;
    });
  }
  static getBaseContent(e, t = !0) {
    if (t && e[b] && e[b].length > 0) {
      const i = this.getBaseFileContent(e[b]);
      return e[h] && e[h].trim().length > 0 && i.unshift({ [E]: h, [h]: e[h] }), i;
    }
    return e[h];
  }
}
class ss extends is {
  constructor() {
    super(...arguments), this.url = `${ze}chat/completions`;
  }
  static getFileContent(e) {
    return is.getBaseFileContent(e).map((n) => n[E] === tn ? n : { [E]: qe, [qe]: { url: n[T] } });
  }
  static getContent(e) {
    if (e[b] && e[b].length > 0) {
      const t = ss.getFileContent(e[b]);
      return e[h] && e[h].trim().length > 0 && t.unshift({ [E]: h, [h]: e[h] }), t;
    }
    return e[h];
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: ss.getContent(r),
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    var n, i, r, o, a, c;
    if (e[f]) throw e[f].message;
    if ((i = (n = e.choices) == null ? void 0 : n[0]) != null && i.delta)
      return this.extractStreamResult(e.choices[0], t);
    if ((o = (r = e.choices) == null ? void 0 : r[0]) != null && o.message) {
      if (e.choices[0].message.tool_calls)
        return this.handleToolsGeneric(e.choices[0].message, this.functionHandler, this.messages, t);
      if ((a = e.choices[0].message) != null && a[q]) {
        const l = this.tejas.textToSpeech, d = typeof l == "object" && typeof ((c = l == null ? void 0 : l[q]) == null ? void 0 : c.displayText) == "boolean";
        return {
          [b]: [{ [T]: `data:audio/wav;base64,${e.choices[0].message[q].data}`, [E]: q }],
          [h]: d ? e.choices[0].message[q].transcript : void 0
        };
      }
      return { [h]: e.choices[0].message.content };
    }
    return { [h]: "" };
  }
  async extractStreamResult(e, t) {
    return this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t);
  }
}
const Rr = class Rr extends k {
  // prettier-ignore
  constructor(e, t, n, i, r) {
    super(
      e,
      Yl(n),
      t,
      i,
      r
    ), this.insertKeyPlaceholderText = "Azure Speech Subscription Key", this.keyHelpUrl = ia;
  }
};
Rr.REGION_ERROR_PREFIX = `Please define a region config property. [More Information](${X}directConnection/Azure#`;
let Mn = Rr;
const _i = class _i extends Mn {
  // prettier-ignore
  constructor(e) {
    var i, r, o, a, c, l;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.azure) == null ? void 0 : r.textToSpeech, n = (o = e.directConnection) == null ? void 0 : o.azure;
    super(
      e,
      Kl.bind({}, (t == null ? void 0 : t.outputFormat) || "audio-16khz-128kbitrate-mono-mp3"),
      t.region,
      n
    ), this.permittedErrorPrefixes = [_i.REGION_ERROR_MESSAGE], this.isTextInputDisabled = !1, this.url = "", t.region ? (Object.assign(this.rawBody, t), (a = this.rawBody).lang ?? (a.lang = "en-US"), (c = this.rawBody).name ?? (c.name = "en-US-JennyNeural"), (l = this.rawBody).gender ?? (l.gender = "Female"), this.url = `https://${t.region}.tts.speech.microsoft.com/cognitiveservices/v1`) : (this.isTextInputDisabled = !0, this.canSendMessage = () => !1, setTimeout(() => {
      e.addMessage({ [f]: _i.REGION_ERROR_MESSAGE });
    }));
  }
  preprocessBody(e, t) {
    const n = t[t.length - 1][h];
    if (n)
      return `<speak version='1.0' xml:lang='${e.lang}'>
      <voice xml:lang='${e.lang}' xml:gender='${e.gender}' name='${e.name}'>
        ${n}
      </voice>
    </speak>`;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), void 0, !1);
  }
  async extractResultData(e) {
    return new Promise((t) => {
      const n = new FileReader();
      n.readAsDataURL(e), n.onload = (i) => {
        t({ [b]: [{ [T]: i.target.result, [E]: q }] });
      };
    });
  }
};
_i.REGION_ERROR_MESSAGE = `${Mn.REGION_ERROR_PREFIX}TextToSpeech)`;
let Ys = _i;
const Cn = class Cn extends Mn {
  constructor(e) {
    var r, o, a;
    const t = (o = (r = e.directConnection) == null ? void 0 : r.azure) == null ? void 0 : o.speechToText, n = (a = e.directConnection) == null ? void 0 : a.azure, i = { audio: { [b]: { acceptedFormats: ".wav,.ogg" } } };
    if (super(e, jl, t.region, n, i), this.permittedErrorPrefixes = [Cn.REGION_ERROR_MESSAGE], this.url = "", this.isTextInputDisabled = !0, this.textInputPlaceholderText = or, !t.region)
      this.isTextInputDisabled = !0, this.canSendMessage = () => !1, setTimeout(() => {
        e.addMessage({ [f]: Cn.REGION_ERROR_MESSAGE });
      });
    else {
      this.canSendMessage = Cn.canFileSendMessage;
      const c = t.lang || "en-US";
      this.url = `https://${t.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${c}&format=detailed`, this.recordAudio = void 0;
    }
  }
  static canFileSendMessage(e, t) {
    return !!(t != null && t[0]);
  }
  async callServiceAPI(e, t, n) {
    var i, r;
    if (!((i = this.connectSettings) != null && i.headers)) throw new Error(Ue);
    if (!(n != null && n[0])) throw new Error(gs);
    (r = this.connectSettings) != null && r.headers && (this.connectSettings.headers[G] = n[0].name.toLocaleLowerCase().endsWith(".wav") ? "audio/wav; codecs=audio/pcm; samplerate=16000" : "audio/ogg; codecs=opus"), me.request(this, n[0], e, !1);
  }
  async extractResultData(e) {
    if (e[f]) throw e[f];
    return { [h]: e.DisplayText || "" };
  }
};
Cn.REGION_ERROR_MESSAGE = `${Mn.REGION_ERROR_PREFIX}SpeechToText)`;
let Zs = Cn;
class ad extends k {
  // prettier-ignore
  constructor(e) {
    var i, r, o;
    const t = (r = (i = e.directConnection) == null ? void 0 : i.azure) == null ? void 0 : r.translation, n = (o = e.directConnection) == null ? void 0 : o.azure;
    super(
      e,
      td(t.region),
      sa.bind({}, t == null ? void 0 : t.region),
      n
    ), this.insertKeyPlaceholderText = "Azure Translate Subscription Key", this.keyHelpUrl = // eslint-disable-next-line max-len
    "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal", this.url = "", this.url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${t.language || "es"}`;
  }
  preprocessBody(e) {
    const t = e[e.length - 1][h];
    if (t)
      return [{ Text: t }];
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    var t;
    if (Array.isArray(e))
      return { [h]: ((t = e[0].translations) == null ? void 0 : t[0][h]) || "" };
    throw e[f];
  }
}
class cd extends k {
  constructor(e) {
    var r, o;
    const t = A(e.directConnection), n = t.bigModel;
    super(e, hr(), dr, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("BigModel"), this.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", this.url = "https://open.bigmodel.cn/api/paas/v4/images/generations", this.permittedErrorPrefixes = [de, Ae];
    const i = (r = t.bigModel) == null ? void 0 : r[Q];
    typeof i === U && (this.cleanConfig(i), Object.assign(this.rawBody, i)), (o = this.rawBody).model ?? (o.model = "cogview-4-250304");
  }
  cleanConfig(e) {
    delete e.key;
  }
  preprocessBody(e, t) {
    const n = A(e), i = t[t.length - 1];
    return n.prompt = (i == null ? void 0 : i[h]) || "", n;
  }
  async callServiceAPI(e, t) {
    return this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    const t = e.data.map((n) => n != null && n.url ? { [T]: n.url, [E]: j } : { [T]: "", [E]: j });
    return { [b]: t };
  }
}
const ra = (s) => ({
  [G]: ee,
  [de]: `${we}${s}`
}), ld = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f].message === bs ? n(ue) : n(Fe) : t(e);
}, oa = () => ge("https://api.groq.com/openai/v1/models", he, ld);
class dd extends k {
  constructor(e) {
    var r, o, a, c;
    const t = A(e.directConnection), n = t.groq;
    super(e, oa(), ra, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Groq"), this.keyHelpUrl = "https://console.groq.com/keys", this.url = "https://api.groq.com/openai/v1/audio/speech", this.permittedErrorPrefixes = [Gt, "property"];
    const i = (r = t.groq) == null ? void 0 : r.textToSpeech;
    typeof i === U && this.completeConfig(i), (o = this.rawBody).model ?? (o.model = "playai-tts"), (a = this.rawBody).voice ?? (a.voice = "Fritz-PlayAI"), (c = this.rawBody).response_format ?? (c.response_format = "mp3");
  }
  preprocessBody(e, t) {
    const n = A(e), i = t[t.length - 1];
    return n.input = (i == null ? void 0 : i[h]) || "", n;
  }
  async callServiceAPI(e, t) {
    return this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    const t = this.rawBody.response_format || "mp3", n = new Blob([e], { [E]: `audio/${t}` }), i = URL.createObjectURL(n);
    return { [b]: [{ [T]: i, [E]: q }] };
  }
}
class hd extends k {
  constructor(e) {
    var r, o;
    const t = A(e.directConnection), n = t.together;
    super(e, pr(), ur, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Together AI"), this.keyHelpUrl = "https://api.together.xyz/settings/api-keys", this.url = "https://api.together.xyz/v1/images/generations", this.permittedErrorPrefixes = [it, Ae];
    const i = (r = t.together) == null ? void 0 : r[Q];
    typeof i === U && this.completeConfig(i), (o = this.rawBody).model ?? (o.model = "black-forest-labs/FLUX.1-schnell-Free");
  }
  preprocessBody(e, t) {
    const n = A(e), i = t[t.length - 1];
    return n.prompt = (i == null ? void 0 : i[h]) || "", n;
  }
  async callServiceAPI(e, t) {
    return this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    const t = e.data.map((n) => n != null && n.url ? { [T]: n.url, [E]: j } : n != null && n.b64_json ? { [T]: `data:image/png;base64,${n.b64_json}`, [E]: j } : { [T]: "", [E]: j });
    return { [b]: t };
  }
}
const Je = class Je extends is {
  // https://platform.openai.com/docs/models/gpt-4o-audio-preview
  // prettier-ignore
  constructor(e, t, n, i, r) {
    var a, c;
    super(e, t, n, i, r), this.keyHelpUrl = Ln, this.url = `${ze}responses`, this._functionStreamInProgress = !1, this._useConversation = !1, this._conversationLoadLimit = 50;
    const o = r || ((c = (a = e.directConnection) == null ? void 0 : a.openAI) == null ? void 0 : c.chat);
    typeof o === U && o !== !0 && o && (o.conversation && (this._useConversation = !0, typeof o.conversation == "string" && (this._conversationId = o.conversation)), typeof o.conversationLoadLimit == "number" && (this._conversationLoadLimit = o.conversationLoadLimit), this.cleanConfig(o)), this._conversationId && (this.fetchHistory = this.fetchHistoryFunc.bind(this));
  }
  processConfig(e, t) {
    super.processConfig(e, t);
  }
  cleanConfig(e) {
    delete e.conversation, delete e.conversationLoadLimit;
  }
  static getFileContent(e) {
    return is.getBaseFileContent(e).map((n) => n[E] === tn ? n : { detail: "auto", [E]: eo, [qe]: n[T] });
  }
  static getContent(e) {
    if (e[C] === F && e[b] && e[b].length > 0) {
      const n = Je.getFileContent(e[b]);
      return e[h] && e[h].trim().length > 0 && n.unshift({ [E]: Gs, [h]: e[h] }), n;
    }
    return e[h];
  }
  async fetchHistoryFunc() {
    setTimeout(() => this.tejas.disableSubmitButton(), 2);
    try {
      const e = this.url;
      this.url = `${ze}conversations/${this._conversationId}/items?limit=${this._conversationLoadLimit}`;
      const t = await Ht(this, {}, he);
      return this.connectSettings.method = be, this.url = e, this.tejas.disableSubmitButton(!1), this.processConversationHistory(t);
    } catch {
      return this.tejas.disableSubmitButton(!1), [{ [f]: Do }];
    }
  }
  static filterCompleted(e) {
    return (e == null ? void 0 : e.filter((t) => t.status === rr)) || [];
  }
  processConversationHistory(e) {
    if (!e.data || !Array.isArray(e.data)) return [];
    const t = [];
    for (const n of Je.filterCompleted(e.data.reverse()))
      if (n[E] === "message" && n.content && Array.isArray(n.content))
        for (const i of n.content)
          (i[E] === Gs || i[E] === to) && i[h] ? t.push({ [C]: n[C], [h]: i[h] }) : i[E] === eo && t.push({
            [C]: n[C],
            [b]: Je.generateImageFile(i[qe] || "")
          });
      else n[E] === Os && t.push({
        [C]: te,
        [b]: Je.generateImageFile(n.result)
      });
    return t;
  }
  preprocessBody(e, t) {
    const n = A(e);
    t = this.processMessages(t), t = this._useConversation ? [t[t.length - 1]] : t;
    const i = t.map((r) => ({
      content: Je.getContent(r),
      [C]: k.getRoleViaUser(r[C])
    }));
    return n.input = i, this._conversationId && (n.conversation = this._conversationId), n;
  }
  async createConversation() {
    try {
      const e = this.url;
      this.url = `${ze}conversations`;
      const t = await Ht(this, {}, be);
      return this.url = e, t.id;
    } catch (e) {
      throw console[f]("Failed to create conversation:", e), e;
    }
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this._useConversation && !this._conversationId && (this._conversationId = await this.createConversation()), this._conversationId && this.updateSessionId(this._conversationId), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    const n = await this.extractResult(e, t);
    return this._conversationId && (n._sessionId = this._conversationId), n;
  }
  async extractResult(e, t) {
    var n, i, r, o;
    if (e[f]) throw e[f].message;
    if (e.status) {
      const a = Je.filterCompleted(e.output);
      if (a.length > 0) {
        const c = (r = (i = (n = a.find((p) => {
          var u, g;
          return typeof ((g = (u = p.content) == null ? void 0 : u[0]) == null ? void 0 : g[h]) === ye;
        })) == null ? void 0 : n.content) == null ? void 0 : i[0]) == null ? void 0 : r[h], l = await this.handleResponsesFunctionCalls(a, t, c);
        if (l) return l;
        const d = this.handleFileGenerationResponse(a, c);
        return d || { [h]: c };
      }
      return { [h]: "" };
    }
    return ((o = e.item) == null ? void 0 : o[E]) === Hi && e[E] ? this.handleStreamedResponsesFunctionCall(e, t) : e[E] === `${Dn}.${Os}.partial_image` && e.partial_image_b64 ? { [b]: [{ [T]: `${Je.IMAGE_BASE64_PREFIX}${e.partial_image_b64}`, [E]: j }] } : e.delta && !this._functionStreamInProgress && e[E] === `${Dn}.${to}.delta` ? { [h]: e.delta } : { [h]: "" };
  }
  async handleStreamedResponsesFunctionCall(e, t) {
    var n;
    if (e[E] === `${Dn}.output_item.done`) {
      if (this._functionStreamInProgress = !1, ((n = e.item) == null ? void 0 : n[E]) === Hi)
        return this.handleResponsesFunctionCalls([e.item], t);
    } else e[E] === `${Dn}.output_item.added` && (this._functionStreamInProgress = !0);
    return { [h]: "" };
  }
  handleFileGenerationResponse(e, t) {
    const n = e.find(
      (i) => i[E] === Os
    );
    return n ? {
      [b]: Je.generateImageFile(n.result),
      [h]: t
    } : null;
  }
  static generateImageFile(e) {
    return [{ [T]: `${Je.IMAGE_BASE64_PREFIX}${e}`, [E]: j }];
  }
  async handleResponsesFunctionCalls(e, t, n) {
    const i = e.filter((l) => l[E] === Hi);
    if (i.length === 0) return null;
    if (!t || !this.functionHandler) throw Error(qt);
    const r = i.map((l) => ({ name: l.name, arguments: l.arguments })), { responses: o, processedResponse: a } = await this.callToolFunction(this.functionHandler, r);
    if (a) return a;
    const c = A(t);
    if (c.input && (i.forEach((l) => c.input.push(l)), !o.find(({ response: l }) => typeof l !== ye) && r.length === o.length))
      return o.forEach((l, d) => {
        const p = i[d];
        c.input.push({ [E]: Yo, call_id: p.call_id, output: l[Dn] });
      }), this.makeAnotherRequest(c, this.messages, n);
    throw Error(rn);
  }
};
Je.IMAGE_BASE64_PREFIX = "data:image/png;base64,";
let rs = Je;
class gr extends rs {
  constructor(e) {
    var o, a, c, l, d, p, u;
    const t = A(e.directConnection), n = t.azure, i = ((a = (o = t.azure) == null ? void 0 : o.openAI) == null ? void 0 : a.urlDetails) || {}, r = (l = (c = t.azure) == null ? void 0 : c.openAI) == null ? void 0 : l.chat;
    if (super(e, Qo(i), Jo, n, r), this.permittedErrorPrefixes = [ts], this.isTextInputDisabled = !1, typeof r === U) {
      const { function_handler: g } = (u = (p = (d = e.directConnection) == null ? void 0 : d.azure) == null ? void 0 : p.openAI) == null ? void 0 : u.chat;
      g && (this.functionHandler = g);
    }
    ea(i) ? this.url = gr.buildURL(i) : (this.isTextInputDisabled = !0, this.canSendMessage = () => !1, setTimeout(() => {
      e.addMessage({ [f]: ts });
    }));
  }
  static buildURL(e) {
    const { endpoint: t, deploymentId: n, version: i } = e;
    return `${t}/openai/deployments/${n}/chat/completions?api-version=${i}`;
  }
}
class os extends k {
  constructor(e) {
    var r, o, a, c, l;
    const t = A(e.directConnection), n = t.bigModel;
    super(e, hr(), dr, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("BigModel"), this.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", this.url = "https://open.bigmodel.cn/api/paas/v4/chat/completions", this.permittedErrorPrefixes = [de, Ae];
    const i = (r = t.bigModel) == null ? void 0 : r.chat;
    typeof i === U && this.completeConfig(i, (c = (a = (o = e.directConnection) == null ? void 0 : o.bigModel) == null ? void 0 : a.chat) == null ? void 0 : c.function_handler), this.maxMessages ?? (this.maxMessages = -1), (l = this.rawBody).model ?? (l.model = "glm-4.5");
  }
  static getFileContent(e) {
    return e.map((t) => t[E] === j ? { [E]: qe, [qe]: { url: t[T] || "" } } : { [E]: ne, file_url: { url: t[T] || "" } });
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: os.getTextWFilesContent(r, os.getFileContent),
      [C]: k.getRoleViaAI(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    if (e[f]) throw e[f].message;
    if (e.choices.length > 0) {
      if (e.choices[0].delta !== void 0)
        return this.extractStreamResult(e.choices[0], t);
      if (e.choices[0].message !== void 0) {
        const n = e.choices[0].message;
        return n.tool_calls ? this.handleToolsGeneric({ tool_calls: n.tool_calls }, this.functionHandler, this.messages, t) : { [h]: n.content };
      }
    }
    return { [h]: "" };
  }
  async extractStreamResult(e, t) {
    var o, a, c, l;
    const { delta: n, finish_reason: i } = e, r = (o = this.messages) == null ? void 0 : o.messageToElements[this.messages.messageToElements.length - 2];
    if ((r == null ? void 0 : r[0][C]) === te && ((a = r == null ? void 0 : r[0][h]) == null ? void 0 : a.replace(/\n/g, "").trim().length) === 0 && ((c = this.messages) == null || c.removeMessage(r[1][h]), (l = this.messages) == null || l.messageToElements.splice(this.messages.messageToElements.length - 2, 1)), i === "tool_calls") {
      if (n.tool_calls) {
        const d = { tool_calls: n.tool_calls };
        return this.handleToolsGeneric(d, this.functionHandler, this.messages, t);
      }
      return { [h]: (n == null ? void 0 : n.content) || "" };
    }
    return { [h]: (n == null ? void 0 : n.content) || "" };
  }
}
class ud extends k {
  constructor(e) {
    var r, o;
    const t = A(e.directConnection), n = t.together;
    super(e, pr(), ur, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Together AI"), this.keyHelpUrl = "https://api.together.xyz/settings/api-keys", this.url = "https://api.together.xyz/v1/chat/completions", this.permittedErrorPrefixes = [it, Ae];
    const i = (r = t.together) == null ? void 0 : r.chat;
    typeof i === U && this.completeConfig(i), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo");
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: r[h] || "",
      [C]: r[C] === te ? mt : r[C]
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e) {
    if (e[f]) throw e[f].message;
    if (e.choices.length > 0) {
      if (e.choices[0].message !== void 0)
        return { [h]: e.choices[0].message.content };
      if (e.choices[0].delta !== void 0)
        return { [h]: e.choices[0].delta.content };
    }
    return { [h]: "" };
  }
}
const rt = class rt extends k {
  constructor(e) {
    var o;
    const { directConnection: t } = e, n = t == null ? void 0 : t.openAI, i = { images: { [b]: { acceptedFormats: ".png", maxNumberOfFiles: 2 } } };
    super(e, Nn(), On, n, i), this.insertKeyPlaceholderText = this.genereteAPIKeyName("OpenAI"), this.keyHelpUrl = Ln, this.url = "", this.permittedErrorPrefixes = [Mi, "Invalid input image"];
    const r = (o = t == null ? void 0 : t.openAI) == null ? void 0 : o[Q];
    if (this[De]) {
      const a = typeof r == "object" && r.size ? Number.parseInt(r.size) : 1024;
      this[De][b] = { dimensions: { width: a, height: a } };
    }
    typeof r === U && Object.assign(this.rawBody, r), this.canSendMessage = rt.canFileSendMessage;
  }
  static canFileSendMessage(e, t) {
    return !!(t != null && t[0]) || !!(e && e.trim() !== "");
  }
  static createFormDataBody(e, t, n) {
    const i = new FormData();
    return i.append(j, t), n && i.append("mask", n), Object.keys(e).forEach((r) => {
      i.append(r, String(e[r]));
    }), i;
  }
  preprocessBody(e, t) {
    const n = A(e);
    return t && t !== "" && (n.prompt = t), n;
  }
  // prettier-ignore
  callApiWithImage(e, t, n) {
    var o, a;
    let i;
    const r = (a = (o = t[t.length - 1]) == null ? void 0 : o[h]) == null ? void 0 : a.trim();
    if (n[1] || r && r !== "") {
      this.url = rt.IMAGE_EDIT_URL;
      const c = this.preprocessBody(this.rawBody, r);
      i = rt.createFormDataBody(c, n[0], n[1]);
    } else
      this.url = rt.IMAGE_VARIATIONS_URL, i = rt.createFormDataBody(this.rawBody, n[0]);
    D.tempRemoveContentHeader(
      this.connectSettings,
      me.request.bind(this, this, i, e),
      !1
    );
  }
  async callServiceAPI(e, t, n) {
    var i;
    if (!((i = this.connectSettings) != null && i.headers)) throw new Error(Ue);
    if (n != null && n[0])
      this.callApiWithImage(e, t, n);
    else {
      if (!this.connectSettings) throw new Error(Ue);
      this.url = rt.IMAGE_GENERATION_URL;
      const r = this.preprocessBody(this.rawBody, t[t.length - 1][h]);
      me.request(this, r, e);
    }
  }
  async extractResultData(e) {
    if (e[f]) throw e[f].message;
    const t = e.data.map((n) => n.url ? { [T]: n.url, [E]: j } : { [T]: `${Pn}${n.b64_json}`, [E]: j });
    return { [b]: t };
  }
  // private static readonly MODAL_MARKDOWN = `
  // 1 image:
  // - With text - edits image based on the text
  // - No text - creates a variation of the image
  // 2 images:
  // - The second image needs to be a copy of the first with a transparent area where the edit should take place.
  // Add text to describe the required modification.
  // Click here for [more info](https://platform.openai.com/docs/guides/images/introduction).
  //   `;
};
rt.IMAGE_GENERATION_URL = `${ze}images/generations`, rt.IMAGE_VARIATIONS_URL = `${ze}images/variations`, rt.IMAGE_EDIT_URL = `${ze}images/edits`;
let Js = rt;
const pd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), fd = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f][E] === Ae ? n(ue) : n(Fe) : t(e);
}, md = () => ge("https://openrouter.ai/api/v1/key", he, fd);
class hi extends k {
  constructor(e) {
    var i, r, o, a;
    const n = A(e.directConnection).openRouter;
    super(e, md(), pd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("OpenRouter"), this.keyHelpUrl = "https://openrouter.ai/keys", this.url = "https://openrouter.ai/api/v1/chat/completions", this.permittedErrorPrefixes = [it, Ae], typeof n === U && this.completeConfig(n, (r = (i = e.directConnection) == null ? void 0 : i.openRouter) == null ? void 0 : r.function_handler), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "openai/gpt-4o"), (a = this.rawBody).max_tokens ?? (a.max_tokens = 1e3);
  }
  static getAudioContent(e) {
    return e.filter((t) => t[E] === q).map((t) => {
      var r, o, a;
      const n = (r = t[T]) == null ? void 0 : r.split(",")[1], i = (a = (o = t[T]) == null ? void 0 : o.match(/data:audio\/([^;]+)/)) == null ? void 0 : a[1];
      return {
        [E]: tn,
        [tn]: {
          data: n || "",
          format: i === "wav" || i === "mp3" ? i : "mp3"
        }
      };
    }).filter((t) => t[tn].data.length > 0);
  }
  static getContent(e) {
    if (e[b] && e[b].length > 0) {
      const t = [
        ...hi.getImageContent(e[b]),
        ...hi.getAudioContent(e[b])
      ];
      return e[h] && e[h].trim().length > 0 && t.unshift({ [E]: h, [h]: e[h] }), t.length > 0 ? t : e[h] || "";
    }
    return e[h] || "";
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((o) => ({
      content: hi.getContent(o),
      [C]: k.getRoleViaUser(o[C])
    })), r = [];
    return this.systemMessage && r.push({ [C]: Rn, content: this.systemMessage }), r.push(...i), n.messages = r, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    var n, i, r, o;
    if (e[f]) throw e[f].message;
    if (e.object === "chat.completion.chunk") {
      const a = (n = e.choices) == null ? void 0 : n[0];
      if (a != null && a.delta)
        return this.extractStreamResult(a, t);
      if ((i = e.message) != null && i[Q]) {
        const c = e.message[Q].map((l) => ({
          [T]: l[qe].url
        }));
        return {
          [h]: e.message.content || "",
          [b]: c
        };
      }
      return { [h]: "" };
    }
    if (e.object === "chat.completion") {
      const a = (r = e.choices) == null ? void 0 : r[0];
      if (a != null && a.message) {
        if (a.message.tool_calls)
          return this.handleToolsGeneric(
            { tool_calls: a.message.tool_calls },
            this.functionHandler,
            this.messages,
            t
          );
        const c = ((o = a.message[Q]) == null ? void 0 : o.map((l) => ({
          [T]: l[qe].url
        }))) || [];
        return {
          [h]: a.message.content || "",
          files: c
        };
      }
    }
    return { [h]: "" };
  }
  async extractStreamResult(e, t) {
    const { delta: n } = e;
    if (n != null && n[Q]) {
      const i = n[Q].map((r) => ({
        [T]: r[qe].url
      }));
      return {
        [h]: n.content || "",
        [b]: i
      };
    }
    return this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t);
  }
}
const gd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), bd = (s, e, t, n) => {
  s[f] ? n(ue) : t(e);
}, _d = () => ge("https://api.perplexity.ai/chat/completions", be, bd);
class yd extends k {
  constructor(e) {
    var i;
    const n = A(e.directConnection).perplexity;
    super(e, _d(), gd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Perplexity"), this.keyHelpUrl = "https://www.perplexity.ai/settings/api", this.url = "https://api.perplexity.ai/chat/completions", this.permittedErrorPrefixes = [Gt, Fo, "Permission denied"], typeof n === U && this.completeConfig(n), this.maxMessages ?? (this.maxMessages = -1), (i = this.rawBody).model ?? (i.model = "sonar");
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: r[h] || "",
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e) {
    if (e[f]) throw e[f].message;
    if (e.choices && e.choices.length > 0) {
      const t = e.choices[0];
      if (t.delta && t.delta.content)
        return { [h]: t.delta.content };
      if (t.message && t.message.content)
        return { [h]: t.message.content };
    }
    return { [h]: "" };
  }
}
const Ed = (s) => ({
  [de]: `Bearer ${s}`,
  [G]: ee
}), vd = (s, e, t, n) => {
  const i = s;
  i.detail ? n(i.detail) : t(e);
}, Sd = () => ge("http://localhost:3000/api/v1/models", he, vd);
class Cd extends k {
  constructor(e) {
    var i, r, o, a;
    const n = A(e.directConnection).openWebUI;
    super(e, Sd(), Ed, n), this.insertKeyPlaceholderText = "Open WebUI API Key", this.keyHelpUrl = "https://docs.openwebui.com/getting-started/api-endpoints/", this.url = "http://localhost:3000/api/chat/completions", this.permittedErrorPrefixes = ["Error"], typeof n === U && (this.completeConfig(n, (r = (i = e.directConnection) == null ? void 0 : i.openWebUI) == null ? void 0 : r.function_handler), n[b] && n[b].length > 0 && (this.rawBody[b] = n[b])), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "llama3.2"), (a = this.rawBody).stream ?? (a.stream = !1);
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: k.getTextWImagesContent(r),
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), { readable: !0 });
  }
  async extractResultData(e, t) {
    var n;
    if (e[f]) throw e[f].message;
    if (e[h]) {
      const i = e[h].trim();
      return this.processStreamingResponse(i, t);
    }
    if (e.choices && ((n = e.choices[0]) != null && n.message)) {
      const i = e.choices[0].message;
      return i.tool_calls ? this.handleTools({ tool_calls: i.tool_calls }, t) : { [h]: i.content || "" };
    }
    return { [h]: "" };
  }
  async processStreamingResponse(e, t) {
    var r;
    const n = e.split(`
`).filter((o) => o.trim() !== "");
    let i = "";
    for (const o of n) {
      let a = o.trim();
      if (a.startsWith("data: ") && (a = a.substring(6)), a !== "[DONE]")
        try {
          const c = JSON.parse(a);
          if (c.choices && ((r = c.choices[0]) != null && r.delta)) {
            const l = c.choices[0].delta;
            if (l.tool_calls)
              return this.handleTools({ tool_calls: l.tool_calls }, t);
            l.content && (i += l.content);
          }
        } catch {
          continue;
        }
    }
    return { [h]: i };
  }
  async handleTools(e, t) {
    if (!e.tool_calls || !t || !this.functionHandler)
      throw Error(qt);
    const n = A(t), i = e.tool_calls.map((a) => ({ name: a.function.name, arguments: a.function.arguments })), { responses: r, processedResponse: o } = await this.callToolFunction(this.functionHandler, i);
    if (o) return o;
    if (n.messages.push({ tool_calls: e.tool_calls, [C]: mt, content: "" }), !r.find(({ response: a }) => typeof a !== ye) && i.length === r.length)
      return r.forEach((a, c) => {
        var d;
        const l = (d = e.tool_calls) == null ? void 0 : d[c];
        n == null || n.messages.push({
          [C]: "tool",
          tool_name: l == null ? void 0 : l.function.name,
          content: a.response
        });
      }), this.makeAnotherRequest(n, this.messages);
    throw Error(rn);
  }
}
const xd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), wd = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f][E] === Ae ? n(ue) : n(Fe) : t(e);
}, Ad = () => ge("https://api.deepseek.com/models", he, wd);
class Td extends k {
  constructor(e) {
    var i, r, o;
    const n = A(e.directConnection).deepSeek;
    super(e, Ad(), xd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("DeepSeek"), this.keyHelpUrl = "https://platform.deepseek.com/api_keys", this.url = "https://api.deepseek.com/v1/chat/completions", this.permittedErrorPrefixes = [it, Ae], typeof n === U && this.completeConfig(n), this.maxMessages ?? (this.maxMessages = -1), (i = this.rawBody).model ?? (i.model = "deepseek-chat"), (r = this.rawBody).temperature ?? (r.temperature = 1), (o = this.rawBody).max_tokens ?? (o.max_tokens = 4096);
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: r[h] || "",
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e) {
    if (e[f]) throw e[f].message;
    if (e.choices && e.choices.length > 0) {
      const t = e.choices[0];
      if (t.delta && t.delta.content)
        return { [h]: t.delta.content };
      if (t.message && t.message.content)
        return { [h]: t.message.content };
    }
    return { [h]: "" };
  }
}
const Rd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), Id = (s, e, t, n) => {
  var r;
  ((r = s.base_resp) == null ? void 0 : r.status_code) === 1004 ? n(ue) : t(e);
}, Md = () => ge(
  "https://api.minimax.io/v1/files/delete",
  be,
  Id
);
class kd extends k {
  constructor(e) {
    var i;
    const n = A(e.directConnection).miniMax;
    super(e, Md(), Rd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("MiniMax"), this.keyHelpUrl = "https://www.minimaxi.com", this.url = "https://api.minimax.io/v1/text/chatcompletion_v2", this.permittedErrorPrefixes = [it, Ae, "insufficient balance"], typeof n === U && this.completeConfig(n), this.maxMessages ?? (this.maxMessages = -1), (i = this.rawBody).model ?? (i.model = "MiniMax-M1");
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: r[h] || "",
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e) {
    var t;
    if (e[f]) throw e[f].message;
    if (e.choices && e.choices.length > 0) {
      const n = e.choices[0];
      if (n.delta && n.delta.content)
        return { [h]: n.delta.content };
      if (n.message && n.message.content)
        return { [h]: n.message.content };
    }
    if (typeof ((t = e.base_resp) == null ? void 0 : t.status_code) == "number" && e.base_resp.status_code > 0)
      throw e.base_resp.status_msg;
    return { [h]: "" };
  }
}
const Pd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee,
  accept: ee
}), Ld = (s, e, t, n) => {
  s.detail ? n(ue) : t(e);
}, Od = () => ge("https://api.mistral.ai/v1/models", he, Ld);
class br extends k {
  constructor(e) {
    var i, r, o;
    const n = A(e.directConnection).mistral;
    super(e, Od(), Pd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Mistral"), this.keyHelpUrl = "https://console.mistral.ai/api-keys/", this.url = "https://api.mistral.ai/v1/chat/completions", this.permittedErrorPrefixes = [Gt], typeof n === U && this.completeConfig(n, (r = (i = e.directConnection) == null ? void 0 : i.mistral) == null ? void 0 : r.function_handler), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "mistral-small-latest");
  }
  static getFileContent(e) {
    return e.map((t) => t[E] === j ? { [E]: qe, [qe]: t[T] || "" } : { [E]: h, [h]: `[Unsupported ${ne} ${E}: ${t[E]}]` });
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      [C]: k.getRoleViaAI(r[C]),
      content: k.getTextWFilesContent(r, br.getFileContent)
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    if (e.message) throw e.message;
    if (e[f]) throw e[f].message;
    if (e.choices && e.choices.length > 0) {
      const n = e.choices[0];
      if (n.delta)
        return this.extractStreamResult(n, t);
      if (n.message)
        return n.message.tool_calls ? this.handleToolsGeneric(
          { tool_calls: n.message.tool_calls },
          this.functionHandler,
          this.messages,
          t
        ) : { [h]: n.message.content || "" };
    }
    return { [h]: "" };
  }
  async extractStreamResult(e, t) {
    const { delta: n, finish_reason: i } = e;
    if (i === "tool_calls" && (n != null && n.tool_calls)) {
      const r = { tool_calls: n.tool_calls };
      return this.handleToolsGeneric(r, this.functionHandler, this.messages, t);
    }
    return { [h]: (n == null ? void 0 : n.content) || "" };
  }
}
class _r extends k {
  constructor(e) {
    var r, o, a, c, l;
    const t = A(e.directConnection), n = t.groq;
    super(e, oa(), ra, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Groq"), this.keyHelpUrl = "https://console.groq.com/keys", this.url = "https://api.groq.com/openai/v1/chat/completions", this.permittedErrorPrefixes = [Gt, "property"];
    const i = (r = t.groq) == null ? void 0 : r.chat;
    typeof i === U && this.completeConfig(i, (c = (a = (o = e.directConnection) == null ? void 0 : o.groq) == null ? void 0 : a.chat) == null ? void 0 : c.function_handler), this.maxMessages ?? (this.maxMessages = -1), (l = this.rawBody).model ?? (l.model = "llama-3.3-70b-versatile");
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: _r.getTextWImagesContent(r),
      [C]: r[C] === te ? mt : r[C]
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    var n, i, r, o;
    if (e[f]) throw e[f].message;
    return (i = (n = e.choices) == null ? void 0 : n[0]) != null && i.delta ? this.extractStreamResult(e.choices[0], t) : (o = (r = e.choices) == null ? void 0 : r[0]) != null && o.message ? e.choices[0].message.tool_calls ? this.handleToolsGeneric(e.choices[0].message, this.functionHandler, this.messages, t, {
      message: this.systemMessage
    }) : { [h]: e.choices[0].message.content || "" } : { [h]: "" };
  }
  // https://console.groq.com/docs/tool-use
  async extractStreamResult(e, t) {
    return this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t);
  }
}
const Nd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee,
  accept: ee
}), Bd = (s, e, t, n) => {
  typeof s.message === ye ? n(ue) : t(e);
}, Dd = () => ge("https://api.cohere.ai/v1/models", he, Bd);
class as extends k {
  constructor(e) {
    var i;
    const n = A(e.directConnection).cohere;
    if (super(e, Dd(), Nd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Cohere"), this.keyHelpUrl = "https://dashboard.cohere.ai/api-keys", this.permittedErrorPrefixes = ["invalid"], this.url = "https://api.cohere.com/v2/chat", typeof n === U) {
      const r = le.processCohere(n);
      this.canSendMessage = () => r, this.cleanConfig(n), Object.assign(this.rawBody, n);
    }
    this.maxMessages ?? (this.maxMessages = -1), (i = this.rawBody).model ?? (i.model = "command-a-03-2025");
  }
  cleanConfig(e) {
    delete e.key;
  }
  preprocessBody(e, t) {
    const n = A(e), i = t.filter((r) => r[h]);
    return n.messages = i.map((r) => ({
      [C]: k.getRoleViaAI(r[C]),
      content: r[h]
    })), n;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), { readable: !0 });
  }
  async extractResultData(e) {
    var t, n, i;
    if (typeof e.message == "string") throw e.message;
    if (this.stream && e[h]) {
      const r = as.parseBundledEvents(e[h]);
      return { text: as.aggregateBundledEventsText(r) };
    }
    if ("message" in e && ((i = (n = (t = e.message) == null ? void 0 : t.content) == null ? void 0 : n[0]) != null && i[h]))
      return { [h]: e.message.content[0][h] };
    throw new Error("Invalid response format from Cohere API");
  }
  static parseBundledEvents(e) {
    const t = e.trim().split(`
`), n = [];
    for (const i of t)
      if (i.trim())
        try {
          const r = JSON.parse(i);
          n.push(r);
        } catch (r) {
          console[f]("Failed to parse line:", i, r);
        }
    return n;
  }
  static aggregateBundledEventsText(e) {
    return e.filter((t) => {
      var n, i, r;
      return t[E] === "content-delta" && ((r = (i = (n = t.delta) == null ? void 0 : n.message) == null ? void 0 : i.content) == null ? void 0 : r[h]);
    }).map((t) => {
      var n, i, r;
      return (r = (i = (n = t.delta) == null ? void 0 : n.message) == null ? void 0 : i.content) == null ? void 0 : r[h];
    }).join("");
  }
}
const Fd = () => ({
  [G]: ee
}), Ud = (s, e, t, n) => {
  var r;
  const i = s;
  i[f] ? i[f].code === 403 || (r = i[f].message) != null && r.includes("API key") ? n(ue) : n(Fe) : t(e);
}, Hd = () => {
  const s = "https://generativelanguage.googleapis.com/v1beta/models?key=";
  return ge(s, he, Ud, (e) => `${s}${e}`);
};
class yr extends k {
  constructor(e) {
    var i, r;
    const n = A(e.directConnection).gemini;
    if (super(e, Hd(), Fd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Gemini"), this.keyHelpUrl = "https://aistudio.google.com/app/apikey", this.urlPrefix = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", this.url = "", this.permittedErrorPrefixes = ["API_KEY_INVALID"], typeof n === U) {
      const o = n;
      o.model && (this.urlPrefix = `https://generativelanguage.googleapis.com/v1beta/models/${o.model}:generateContent`), this.cleanConfig(o), this.completeConfig(o, (r = (i = e.directConnection) == null ? void 0 : i.gemini) == null ? void 0 : r.function_handler);
    }
    this.maxMessages ?? (this.maxMessages = -1);
  }
  cleanConfig(e) {
    delete e.model;
  }
  static getContent(e) {
    const t = [];
    return e[h] && e[h].trim().length > 0 && t.push({ [h]: e[h] }), e[b] && e[b].length > 0 && e[b].forEach((n) => {
      if (n[T] && n[T].includes("data:")) {
        const [i, r] = n[T].split(",");
        t.push({
          inlineData: {
            mimeType: i.replace("data:", "").replace(";base64", ""),
            data: r
          }
        });
      }
    }), {
      parts: t,
      [C]: e[C] === F ? F : "model"
    };
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => yr.getContent(r));
    return n.contents = i, this.systemMessage && (n.systemInstruction = { parts: [{ [h]: this.systemMessage }] }), n;
  }
  async callServiceAPI(e, t) {
    if (!this.connectSettings) throw new Error(Ue);
    this.messages ?? (this.messages = e);
    const n = this.preprocessBody(this.rawBody, t), i = this.stream;
    i && (typeof i !== U || !i.simulation) || n.stream ? (this.url = `${this.urlPrefix.replace(":generateContent", ":streamGenerateContent")}?alt=sse&key=${this.key}`, W.request(this, n, e)) : (this.url = `${this.urlPrefix}?key=${this.key}`, me.request(this, n, e));
  }
  // https://ai.google.dev/gemini-api/docs/function-calling?example=weather
  async extractResultData(e, t) {
    var n, i, r, o;
    if (e[f]) throw e[f].message || "Gemini API Error";
    if ((r = (i = (n = e.candidates) == null ? void 0 : n[0]) == null ? void 0 : i.content) != null && r.parts) {
      const a = e.candidates[0].content.parts, c = a.find((p) => p.functionCall);
      if (c != null && c.functionCall)
        return this.handleTools([c.functionCall], t);
      const l = a.find((p) => p[h]), d = a.find((p) => {
        var u;
        return ((u = p.inlineData) == null ? void 0 : u.mimeType) === "image/png";
      });
      return {
        [h]: (l == null ? void 0 : l[h]) || "",
        [b]: (o = d == null ? void 0 : d.inlineData) != null && o.data ? [{ [T]: `data:image/png;base64,${d.inlineData.data}` }] : []
      };
    }
    return { [h]: "" };
  }
  async handleTools(e, t) {
    if (!e || !t || !this.functionHandler)
      throw Error(qt);
    const n = A(t), i = e.map((c) => ({ name: c.name, arguments: ce(c.args) })), { responses: r, processedResponse: o } = await this.callToolFunction(this.functionHandler, i);
    if (o) return o;
    const a = {
      parts: e.map((c) => ({
        functionCall: {
          name: c.name,
          args: c.args
        }
      })),
      [C]: "model"
    };
    if (n.contents.push(a), !r.find(({ response: c }) => typeof c !== ye) && i.length === r.length) {
      const c = {
        parts: r.map((l, d) => ({
          functionResponse: {
            name: e[d].name,
            response: {
              result: l.response
            }
          }
        })),
        [C]: F
      };
      return n.contents.push(c), this.makeAnotherRequest(n, this.messages);
    }
    throw Error(rn);
  }
}
const $d = (s) => ({
  "x-api-key": s,
  [G]: ee,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true"
}), qd = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f][E] === Ae ? n(ue) : n(Fe) : t(e);
}, Gd = () => ge("https://api.anthropic.com/v1/models", he, qd);
class cs extends k {
  constructor(e) {
    var i, r, o, a;
    const n = A(e.directConnection).claude;
    super(e, Gd(), $d, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Claude"), this.keyHelpUrl = "https://console.anthropic.com/settings/keys", this.url = "https://api.anthropic.com/v1/messages", this.permittedErrorPrefixes = [Ae, it], this._streamToolCalls = { [E]: "tool_use", id: "", name: "", input: "" }, typeof n === U && this.completeConfig(n, (r = (i = e.directConnection) == null ? void 0 : i.claude) == null ? void 0 : r.function_handler), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "claude-sonnet-4-5-20250929"), (a = this.rawBody).max_tokens ?? (a.max_tokens = 4096);
  }
  static getFileContent(e) {
    return e.map((t) => {
      var n, i, r;
      if (t[E] === j) {
        const o = (n = t[T]) == null ? void 0 : n.split(",")[1], a = ((r = (i = t[T]) == null ? void 0 : i.match(/data:([^;]+)/)) == null ? void 0 : r[1]) || "image/jpeg";
        return { [E]: j, source: { [E]: "base64", media_type: a, data: o || "" } };
      }
      return { [E]: h, [h]: `[Unsupported ${ne} ${E}: ${t[E]}]` };
    });
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: cs.getTextWFilesContent(r, cs.getFileContent),
      [C]: k.getRoleViaUser(r[C])
    }));
    return n.messages = i, this.systemMessage && (n.system = this.systemMessage), n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    var n, i, r;
    if (e[f]) throw e[f].message;
    if (e.content && e.content.length > 0) {
      const o = e.content.find((c) => c[E] === "tool_use");
      if (o)
        return this.handleTools([o], t);
      const a = e.content.find((c) => c[E] === h);
      if (a)
        return { [h]: a[h] };
    }
    if (e[E] === "content_block_delta" && e.delta && e.delta[E] === "text_delta")
      return { [h]: e.delta[h] || "" };
    if (e[E] === "content_block_start" && ((n = e.content_block) == null ? void 0 : n[E]) === "tool_use")
      this._streamToolCalls = e.content_block, this._streamToolCalls.input = "";
    else if (e[E] === "content_block_delta" && ((i = e.delta) == null ? void 0 : i[E]) === "input_json_delta")
      this._streamToolCalls.input += e.delta.partial_json || "";
    else if (e[E] === "message_delta" && ((r = e.delta) == null ? void 0 : r.stop_reason) === "tool_use")
      return this._streamToolCalls.input = JSON.parse(this._streamToolCalls.input), this.handleTools([this._streamToolCalls], t);
    return { [h]: "" };
  }
  async handleTools(e, t) {
    if (!e || !t || !this.functionHandler)
      throw Error(qt);
    const n = A(t), i = e.map((c) => ({ name: c.name, arguments: ce(c.input) })), { responses: r, processedResponse: o } = await this.callToolFunction(this.functionHandler, i);
    if (o) return o;
    const a = e.map((c) => ({
      [E]: "tool_use",
      id: c.id,
      name: c.name,
      input: c.input
    }));
    if (n.messages.push({
      [C]: "assistant",
      content: a
    }), !r.find(({ response: c }) => typeof c !== ye) && i.length === r.length) {
      const c = r.map((l, d) => ({
        [E]: "tool_result",
        tool_use_id: e[d].id,
        content: l.response
      }));
      return n.messages.push({ [C]: F, content: c }), this.makeAnotherRequest(n, this.messages);
    }
    throw Error(rn);
  }
}
const zd = () => ({}), Vd = () => {
}, Wd = () => ge("", he, Vd), yi = class yi extends k {
  constructor(e) {
    var i, r, o, a;
    const t = A(e.directConnection);
    super(e, Wd(), zd, { key: "placeholder" }), this.insertKeyPlaceholderText = "", this.keyHelpUrl = "", this.validateKeyProperty = !1, this.url = "http://localhost:11434/api/chat", this.permittedErrorPrefixes = ["Error"];
    const n = t.ollama;
    typeof n === U && this.completeConfig(n, (r = (i = e.directConnection) == null ? void 0 : i.ollama) == null ? void 0 : r.function_handler), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "llama3.2"), (a = this.rawBody).stream ?? (a.stream = !1);
  }
  static getImageData(e) {
    return e.filter((t) => t[E] === j).map((t) => {
      var i;
      return ((i = t[T]) == null ? void 0 : i.split(",")[1]) || "";
    }).filter((t) => t.length > 0);
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => {
      const o = {
        content: r[h] || "",
        [C]: k.getRoleViaUser(r[C])
      };
      if (r[b] && r[b].length > 0) {
        const a = yi.getImageData(r[b]);
        a.length > 0 && (o[Q] = a);
      }
      return o;
    });
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), { readable: !0 });
  }
  parseMessage(e) {
    return e.split(`
`).filter((t) => t.trim()).map((t) => JSON.parse(t));
  }
  async extractResultData(e, t) {
    var n, i;
    if (e[f]) throw e[f].message;
    if (e[h]) {
      const r = this.parseMessage(e[h]), o = [];
      for (const l of r)
        (n = l.message) != null && n.tool_calls && o.push(await this.handleTools({ tool_calls: l.message.tool_calls }, t)), o.push({ [h]: ((i = l.message) == null ? void 0 : i.content) || "" });
      const a = o.map((l) => l[h]), c = a.lastIndexOf(yi.THINK_END);
      return c === -1 || t != null && t.think ? { [h]: a.join("") } : { [h]: a.slice(c + 1).join(""), overwrite: !0 };
    }
    return e.message ? e.message.tool_calls ? this.handleTools({ tool_calls: e.message.tool_calls }, t) : { [h]: e.message.content || "" } : { [h]: "" };
  }
  async handleTools(e, t) {
    if (!e.tool_calls || !t || !this.functionHandler)
      throw Error(qt);
    const n = A(t), i = e.tool_calls.map((a) => ({ name: a.function.name, arguments: ce(a.function.arguments) })), { responses: r, processedResponse: o } = await this.callToolFunction(this.functionHandler, i);
    if (o) return o;
    if (n.messages.push({ tool_calls: e.tool_calls, [C]: mt, content: "" }), !r.find(({ response: a }) => typeof a !== ye) && i.length === r.length)
      return r.forEach((a, c) => {
        var d;
        const l = (d = e.tool_calls) == null ? void 0 : d[c];
        n == null || n.messages.push({
          [C]: "tool",
          tool_name: l == null ? void 0 : l.function.name,
          content: a.response
        });
      }), this.makeAnotherRequest(n, this.messages);
    throw Error(rn);
  }
};
yi.THINK_END = "</think>";
let Qs = yi;
const aa = (s) => ({
  Authorization: `${we}${s}`,
  [G]: ee
}), Kd = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f][E] === Ae || i[f][E] === it ? n(ue) : n(Fe) : t(e);
}, ca = () => ge("https://api.x.ai/v1/models", he, Kd), ms = class ms extends k {
  constructor(e) {
    var r, o;
    const { directConnection: t } = e, n = t == null ? void 0 : t.x;
    super(e, ca(), aa, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("X"), this.keyHelpUrl = "https://console.x.ai/team/default/api-keys", this.url = ms.IMAGE_GENERATION_URL, this.permittedErrorPrefixes = [it, Ae];
    const i = (r = t == null ? void 0 : t.x) == null ? void 0 : r[Q];
    typeof i === U && Object.assign(this.rawBody, i), (o = this.rawBody).model ?? (o.model = "grok-2-image");
  }
  preprocessBody(e, t) {
    const n = t[t.length - 1][h], i = A(e);
    return n && n !== "" && (i.prompt = n), i;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
  }
  async extractResultData(e) {
    if (e[f]) throw e[f].message;
    const t = e.data.map((n) => n.url ? { [T]: n.url, [E]: j } : { [T]: `${Pn}${n.b64_json}`, [E]: j });
    return { [b]: t };
  }
};
ms.IMAGE_GENERATION_URL = "https://api.x.ai/v1/images/generations";
let er = ms;
const jd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), Xd = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f][E] === it ? n(ue) : n(Fe) : t(e);
}, Yd = () => ge(
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
  he,
  Xd
);
class Er extends k {
  constructor(e) {
    var i, r, o;
    const n = A(e.directConnection).qwen;
    super(e, Yd(), jd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Qwen"), this.keyHelpUrl = "https://www.alibabacloud.com/help/en/model-studio/get-api-key", this.url = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions", this.permittedErrorPrefixes = ["No static", "The model", Mi], typeof n === U && this.completeConfig(n, (r = (i = e.directConnection) == null ? void 0 : i.qwen) == null ? void 0 : r.function_handler), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "qwen-plus");
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: Er.getTextWImagesContent(r),
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    if (e[f]) throw e[f].message;
    if (e.choices && e.choices.length > 0) {
      const n = e.choices[0];
      if (n.delta)
        return this.extractStreamResult(n, t);
      if (n.message)
        return n.message.tool_calls ? this.handleToolsGeneric(
          { tool_calls: n.message.tool_calls },
          this.functionHandler,
          this.messages,
          t
        ) : { [h]: n.message.content || "" };
    }
    return { [h]: "" };
  }
  async extractStreamResult(e, t) {
    return this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t);
  }
}
const Zd = (s) => ({
  [de]: `${we}${s}`,
  [G]: ee
}), Jd = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f][E] === Ae ? n(ue) : n(Fe) : t(e);
}, Qd = () => ge("https://api.moonshot.ai/v1/models", he, Jd);
class vr extends k {
  constructor(e) {
    var i, r, o;
    const n = A(e.directConnection).kimi;
    super(e, Qd(), Zd, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Kimi"), this.keyHelpUrl = "https://platform.moonshot.ai/console/api-keys", this.url = "https://api.moonshot.ai/v1/chat/completions", this.permittedErrorPrefixes = [Gt, "Not found"], typeof n === U && this.completeConfig(n, (r = (i = e.directConnection) == null ? void 0 : i.kimi) == null ? void 0 : r.function_handler), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "moonshot-v1-8k");
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: vr.getTextWImagesContent(r),
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.messages ?? (this.messages = e), this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e, t) {
    if (e[f]) throw e[f].message;
    if (e.choices && e.choices.length > 0) {
      const n = e.choices[0];
      if (n.delta)
        return this.extractStreamResult(n, t);
      if (n.message)
        return n.message.tool_calls ? this.handleToolsGeneric(
          { tool_calls: n.message.tool_calls },
          this.functionHandler,
          this.messages,
          t
        ) : { [h]: n.message.content || "" };
    }
    return { [h]: "" };
  }
  async extractStreamResult(e, t) {
    return this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t);
  }
}
class eh extends k {
  constructor(e) {
    var r, o;
    const t = A(e.directConnection), n = t.x;
    super(e, ca(), aa, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("X"), this.keyHelpUrl = "https://console.x.ai/team/default/api-keys", this.url = "https://api.x.ai/v1/chat/completions", this.permittedErrorPrefixes = [it, Ae];
    const i = (r = t.x) == null ? void 0 : r.chat;
    typeof i === U && this.completeConfig(i), this.maxMessages ?? (this.maxMessages = -1), (o = this.rawBody).model ?? (o.model = "grok-3-latest");
  }
  preprocessBody(e, t) {
    const n = A(e), i = this.processMessages(t).map((r) => ({
      content: r[h] || "",
      [C]: k.getRoleViaUser(r[C])
    }));
    return this.addSystemMessage(i), n.messages = i, n;
  }
  async callServiceAPI(e, t) {
    this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
  }
  async extractResultData(e) {
    var t, n, i, r;
    if (e[f]) throw e[f].message;
    if (e.object === "chat.completion.chunk") {
      const o = (t = e.choices) == null ? void 0 : t[0];
      return (n = o == null ? void 0 : o.delta) != null && n.content ? { [h]: o.delta.content } : { [h]: "" };
    }
    return e.object === "chat.completion" && ((r = (i = e.choices) == null ? void 0 : i[0]) != null && r.message) ? { [h]: e.choices[0].message.content || "" } : { [h]: "" };
  }
}
var $i = /* @__PURE__ */ ((s) => (s.BLOCKING = "blocking", s.STREAMING = "streaming", s))($i || {}), gn = /* @__PURE__ */ ((s) => (s.MESSAGE = "message", s.AGENT_MESSAGE = "agent_message", s.WORKFLOW_FINISHED = "workflow_finished", s.ERROR = "error", s))(gn || {});
const th = "image/", nh = "data:", ih = (s, e) => ({
  type: e,
  transfer_method: "local_file",
  upload_file_id: s
}), sh = (s) => {
  const e = s.trim();
  if (!e.startsWith(nh)) return null;
  const t = e.replace(/^data:\s*/, "").trim();
  return t ? JSON.parse(t) : null;
};
async function rh(s, e) {
  const t = new FormData();
  t.append(ne, s), t.append(F, e[F]);
  const { [G]: n, ...i } = e.headers, r = await fetch(e.url, { method: be, headers: i, body: t });
  if (!r.ok) {
    const a = await r.text();
    throw new Error(a);
  }
  const o = await r.json();
  if (!o.id) throw new Error("Upload response missing file ID");
  return o.id;
}
async function oh(s, e) {
  if (s.length === 0) return [];
  const t = s.map(async (i) => {
    const r = await rh(i, e), o = i[E].startsWith(th) ? j : ne;
    return ih(r, o);
  });
  return (await Promise.all(t)).filter((i) => i !== null);
}
function ah(s, e) {
  return s.conversation_id && e(s.conversation_id), s.code && s.message && !s.answer ? { [f]: s.message } : { [h]: s.answer || "" };
}
const ch = (s, e, t) => {
  var n, i;
  switch (!e.conversationIdSet && s.conversation_id && (t(s.conversation_id), e.conversationIdSet = !0), s.event) {
    case gn.MESSAGE:
    case gn.AGENT_MESSAGE:
      e.fullAnswer += s.answer || "";
      break;
    case gn.WORKFLOW_FINISHED:
      !e.fullAnswer && ((i = (n = s.data) == null ? void 0 : n.outputs) != null && i.answer) && (e.fullAnswer = s.data.outputs.answer);
      break;
    case gn.ERROR:
      e.errorMessage = s.message || gn.ERROR;
      break;
  }
};
async function lh(s, e) {
  const t = { fullAnswer: "", conversationIdSet: !1, errorMessage: "" }, i = (await s.text()).split(/\r?\n\r?\n/);
  for (const r of i) {
    const o = sh(r);
    o && ch(o, t, e);
  }
  return t.errorMessage ? { [f]: t.errorMessage } : { [h]: t.fullAnswer };
}
const dh = (s) => ({
  [G]: ee,
  [de]: `${we}${s}`
}), hh = (s, e, t, n) => {
  const i = s;
  i[f] ? i[f].message === bs ? n(ue) : n(Fe) : "user_input_form" in s || "opening_statement" in s || "file_upload" in s ? t(e) : n(Fe);
}, uh = (s) => ge(`${s}/parameters`, he, hh);
class ph extends k {
  constructor(e) {
    var r;
    const t = A(e.directConnection), n = t == null ? void 0 : t.dify, i = ((r = e.connect) == null ? void 0 : r.url) ?? "https://api.dify.ai/v1";
    super(e, uh(i), dh, n), this.insertKeyPlaceholderText = this.genereteAPIKeyName("Dify"), this.keyHelpUrl = "https://docs.dify.ai/en/use-dify/publish/developing-with-apis", this.permittedErrorPrefixes = [Ae], this._conversationId = "", this._user = F, this._inputs = {}, this.url = `${i}/chat-messages`, this._uploadUrl = `${i}/${b}/upload`, typeof n === U && (n[F] && (this._user = n[F]), n.inputs && (this._inputs = n.inputs), this.completeConfig(n)), this.maxMessages ?? (this.maxMessages = -1), this._mode = this.stream ? $i.STREAMING : $i.BLOCKING;
  }
  preprocessBody(e, t, n) {
    const i = this.processMessages(t), r = i[i.length - 1], o = (r == null ? void 0 : r[h]) || " ", a = { inputs: this._inputs, query: o, response_mode: this._mode, [F]: this._user };
    return this._conversationId && (a.conversation_id = this._conversationId), n && n.length > 0 && (a[b] = n), a;
  }
  async callServiceAPI(e, t, n) {
    this.messages ?? (this.messages = e);
    let i = [];
    n && n.length > 0 && (i = await oh(n, {
      url: this._uploadUrl,
      [F]: this._user,
      headers: this.connectSettings.headers
    })), this.callDirectServiceServiceAPI(
      e,
      t,
      (r, o) => this.preprocessBody(r, o, i)
    );
  }
  async extractResultData(e) {
    const t = (n) => {
      this._conversationId = n;
    };
    return this._mode === $i.BLOCKING && !this.stream ? ah(e, t) : lh(e, t);
  }
}
class fh {
  // this should only be called when no _activeService is set or is demo as otherwise we don't want to reconnect
  static create(e) {
    const { directConnection: t, connect: n, demo: i, webModel: r } = e;
    if (r)
      return new wi(e);
    if (t) {
      if (t.openAI)
        return t.openAI[Q] ? new Js(e) : t.openAI.speechToText ? new js(e) : t.openAI.textToSpeech ? new Ks(e) : t.openAI.assistant ? new fr(e) : t.openAI.realtime ? new Ws(e) : t.openAI.completions ? new ss(e) : new rs(e);
      if (t.assemblyAI)
        return new mr(e);
      if (t.cohere)
        return new as(e);
      if (t.huggingFace)
        return t.huggingFace.textGeneration ? new Ol(e) : t.huggingFace.summarization ? new Bl(e) : t.huggingFace.translation ? new Fl(e) : t.huggingFace.fillMask ? new Ul(e) : t.huggingFace.questionAnswer ? new Nl(e) : t.huggingFace.audioSpeechRecognition ? new Ll(e) : t.huggingFace.audioClassification ? new Ml(e) : t.huggingFace.imageClassification ? new kl(e) : new Dl(e);
      if (t.azure) {
        if (t.azure.openAI) {
          if (t.azure.openAI.chat)
            return new gr(e);
          if (t.azure.openAI.assistant)
            return new zs(e);
        }
        if (t.azure.speechToText)
          return new Zs(e);
        if (t.azure.textToSpeech)
          return new Ys(e);
        if (t.azure.summarization)
          return new Xs(e);
        if (t.azure.translation)
          return new ad(e);
      }
      if (t.stabilityAI)
        return t.stabilityAI.imageToImage ? new Ji(e) : t.stabilityAI.imageToImageUpscale ? new Yi(e) : t.stabilityAI.imageToImageMasking ? new Zi(e) : new Qi(e);
      if (t.mistral)
        return new br(e);
      if (t.gemini)
        return new yr(e);
      if (t.claude)
        return new cs(e);
      if (t.deepSeek)
        return new Td(e);
      if (t.miniMax)
        return new kd(e);
      if (t.openRouter)
        return new hi(e);
      if (t.kimi)
        return new vr(e);
      if (t.x)
        return t.x[Q] ? new er(e) : new eh(e);
      if (t.qwen)
        return new Er(e);
      if (t.together)
        return t.together[Q] ? new hd(e) : t.together.textToSpeech ? new Gl(e) : new ud(e);
      if (t.bigModel)
        return t.bigModel[Q] ? new cd(e) : t.bigModel.textToSpeech ? new $l(e) : new os(e);
      if (t.groq)
        return t.groq.textToSpeech ? new dd(e) : new _r(e);
      if (t.perplexity)
        return new yd(e);
      if (t.ollama)
        return new Qs(e);
      if (t.openWebUI)
        return new Cd(e);
      if (t.dify)
        return new ph(e);
    }
    return n && Object.keys(n).length > 0 && !i ? new dn(e) : new dn(e, void 0, i || !0);
  }
}
const Ir = class Ir {
};
Ir.attibutes = {
  string: (e) => e,
  number: (e) => parseFloat(e),
  boolean: (e) => e === "true",
  object: (e) => JSON.parse(e),
  array: (e) => JSON.parse(e),
  function: (e) => new Function(`return ${e}`)()
};
let tr = Ir;
function O(s) {
  return function(e, t) {
    Object.defineProperty(e, t, {});
    const n = e.constructor, i = t.toLocaleLowerCase();
    n._attributes_[i] = tr.attibutes[s], n._attributeToProperty_[i] = t;
  };
}
const mh = "tejas-downwards-mode", gh = "tejas-upwards-mode", Fn = "submit-button", Fi = "loading-button", Un = "disabled-button", no = "text-input-container-start-adjustment", io = "text-input-container-end-adjustment", so = "text-input-container-start-small-adjustment", ro = "text-input-container-end-small-adjustment";
class Sr {
  constructor(e) {
    this._isDisplayed = !1, this._elementRef = this.createIntroPanelWithChild(e), this._isDisplayed = !0;
  }
  static createIntroPanel() {
    const e = x();
    return e[m].add("intro-panel"), Object.assign(e[v]), e;
  }
  createIntroPanelWithChild(e) {
    const t = Sr.createIntroPanel();
    return e[v].display === "none" && (e[v].display = "block"), t.appendChild(e), t;
  }
  hide() {
    this._isDisplayed && (this._elementRef[v].display = "none", this._isDisplayed = !1);
  }
  display() {
    this._isDisplayed || (this._elementRef[v].display = "", this._isDisplayed = !0);
  }
}
const bh = `<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="50 30 420 450" xml:space="preserve">
<g filter="brightness(0) saturate(100%) invert(16%) sepia(0%) saturate(1942%) hue-rotate(215deg) brightness(99%) contrast(93%)">
	<g>
		<path d="M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008
			C350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237
			h333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931
			l50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278
			c-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239
			h66.527V486.763z"/>
	</g>
</g>
<g>
	<g>
		<path d="M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175
			c6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z"/>
	</g>
</g>
<g>
	<g>
		<path d="M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175
			c6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z"/>
	</g>
</g>
<g>
	<g>
		<path d="M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175
			c6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z"/>
	</g>
</g>
<g>
	<g>
		<path d="M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256
			c6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z"/>
	</g>
</g>
</svg>`, Re = class Re {
  static createImage(e, t) {
    const n = new Image();
    return n[T] = e[T], t && ve.scrollDownOnImageLoad(n[T], t), ve.processContent(j, n, n[T], e.name);
  }
  // WORK - image still does not scroll down when loaded
  static createImageMessage(e, t, n, i, r) {
    const o = e.createNewMessageElement("", n, i), a = !i && r ? e.scrollToFirstElement.bind(e, n, r) : void 0, c = Re.createImage(t, a);
    return o.bubbleElement.appendChild(c), o.bubbleElement[m].add(Re.IMAGE_BUBBLE_CLASS), { [E]: j, elements: o };
  }
  static createAudioElement(e, t) {
    const n = x(q);
    return n[T] = e[T], n[m].add("audio-player"), n.controls = !0, $e.IS_SAFARI && (n[m].add("audio-player-safari"), n[m].add(t === F ? "audio-player-safari-end" : "audio-player-safari-start")), n;
  }
  static autoPlayAudio(e) {
    e.addEventListener("loadeddata", () => {
      e.play().catch((t) => {
        console.warn("Auto-play failed:", t);
      });
    });
  }
  static createNewAudioMessage(e, t, n, i) {
    const r = Re.createAudioElement(t, n), o = e.createMessageElementsOnOrientation("", n, i);
    return o.bubbleElement.appendChild(r), o.bubbleElement[m].add(Re.AUDIO_BUBBLE_CLASS), { [E]: q, elements: o, audioElement: r };
  }
  static createAnyFile(e) {
    const t = x();
    t[m].add("any-file-message-contents");
    const n = x();
    n[m].add("any-file-message-icon-container");
    const i = Mt.createSVGElement(bh);
    i[m].add("any-file-message-icon"), n.appendChild(i);
    const r = x();
    return r[m].add("any-file-message-text"), r.textContent = e.name || ne, t.appendChild(n), t.appendChild(r), ve.processContent(sn, t, e[T], r.textContent);
  }
  static createNewAnyFileMessage(e, t, n, i) {
    const r = e.createMessageElementsOnOrientation("", n, i), o = Re.createAnyFile(t);
    return r.bubbleElement[m].add(Re.ANY_FILE_BUBBLE_CLASS), r.bubbleElement.appendChild(o), { [E]: ne, elements: r };
  }
  static createMessages(e, t, n, i, r = !1) {
    return t.map((o, a) => {
      var c;
      if (o.ref && (o = ve.removeFileRef(o)), ve.isAudioFile(o)) {
        const l = Re.createNewAudioMessage(e, o, n, r), d = (c = e.textToSpeech) == null ? void 0 : c.audio;
        return d && (d.autoPlay && Re.autoPlayAudio(l.audioElement), typeof d.displayAudio == "boolean" && !d.displayAudio) ? void 0 : l;
      }
      return ve.isImageFile(o) ? Re.createImageMessage(e, o, n, r, i && a === 0) : Re.createNewAnyFileMessage(e, o, n, r);
    }).filter((o) => o !== void 0);
  }
  // no overwrite previous message logic as it is complex to track which files are to be overwritten
  static addMessages(e, t, n, i, r) {
    Re.createMessages(e, t, n, i, r).filter((a) => a !== void 0).forEach(({ [E]: a, elements: c }) => {
      ve.addMessage(e, c, a, n, r);
    });
  }
};
Re.IMAGE_BUBBLE_CLASS = "image-message", Re.AUDIO_BUBBLE_CLASS = "audio-message", Re.ANY_FILE_BUBBLE_CLASS = "any-file-message";
let ls = Re;
class Ze {
  static removeElements(e, t) {
    if (!t) return;
    const n = e.findIndex((i) => i === t);
    e.splice(n, 1), t == null || t.outerContainer.remove();
  }
  static removeFilesMessages(e, t) {
    var n;
    (n = t[1][b]) == null || n.forEach((i) => {
      Ze.removeElements(e.messageElementRefs, i);
    }), delete t[0][b], delete t[1][b];
  }
  static removeTextHTMLMessage(e, t, n) {
    const i = t[1][n];
    Ze.removeElements(e.messageElementRefs, i), delete t[0][n], delete t[1][n];
  }
  static updateHTMLMessage(e, t, n) {
    var i, r, o;
    if (t[1][L])
      bt.overwriteElements(e, n, t[1][L]);
    else {
      const a = bt.create(e, n, t[0][C]), c = ((r = t[1][b]) == null ? void 0 : r[((i = t[1][b]) == null ? void 0 : i.length) - 1]) || t[1][h], { nextSibling: l } = c.outerContainer;
      (o = l == null ? void 0 : l.parentElement) == null || o.insertBefore(a.outerContainer, l), e.messageElementRefs.splice(e.messageElementRefs.length - 1, 1);
      const d = e.messageElementRefs.findIndex((p) => p === c);
      e.messageElementRefs.splice(d + 1, 0, a), t[1][L] = a;
    }
    t[0][L] = n;
  }
  // finds beforeElement, creates new elements, remove old and adds new ones
  static updateFileMessages(e, t, n) {
    var p, u;
    const i = t[0][C], r = ls.createMessages(e, n, i, !1), o = t[1][L], a = ((u = t[1][b]) == null ? void 0 : u[((p = t[1][b]) == null ? void 0 : p.length) - 1]) || t[1][h], c = o || a;
    let l = e.messageElementRefs.findIndex((g) => g === c);
    a && (l += 1);
    const d = (o == null ? void 0 : o.outerContainer) || (a == null ? void 0 : a.outerContainer.nextSibling);
    r.forEach(({ type: g, elements: _ }, y) => {
      var S;
      ve.setElementProps(e, _, g, i), (S = d.parentElement) == null || S.insertBefore(_.outerContainer, d), e.messageElementRefs.splice(e.messageElementRefs.length - 1, 1), e.messageElementRefs.splice(l + y, 0, _);
    }), Ze.removeFilesMessages(e, t), t[1][b] = r.map(({ elements: g }) => g), t[0][b] = n;
  }
  static updateTextMessage(e, t, n) {
    var i, r;
    if (t[1][h])
      e.renderText(t[1][h].bubbleElement, n, t[0][C]);
    else {
      const o = e.createElements(n, t[0][C]), a = ((i = t[1][b]) == null ? void 0 : i[0]) || t[1][L];
      (r = a.outerContainer.parentElement) == null || r.insertBefore(o.outerContainer, a.outerContainer);
      const c = e.messageElementRefs.findIndex((l) => l === a);
      e.messageElementRefs.splice(c, 0, o), t[1][h] = o;
    }
    t[0][h] = n;
  }
  static isElementActive(e) {
    var t, n;
    return et.isActiveElement((t = e[h]) == null ? void 0 : t.bubbleElement[m]) || et.isActiveElement((n = e[L]) == null ? void 0 : n.bubbleElement[m]);
  }
  // note that overwrite and 'tejas-temporary-message' are used to remove a message
  static update(e, t, n) {
    const i = e.messageToElements[n];
    if (i) {
      if (Ze.isElementActive(i[1]))
        return console[f]("Cannot update a message that is being streamed");
      t[h] && Ze.updateTextMessage(e, i, t[h]), t[b] ? Ze.updateFileMessages(e, i, t[b]) : Ze.removeFilesMessages(e, i), t[L] && Ze.updateHTMLMessage(e, i, t[L]), !t[h] && i[1][h] && Ze.removeTextHTMLMessage(e, i, h), !t[L] && i[1][L] && Ze.removeTextHTMLMessage(e, i, L);
      const { messageElementRefs: r, avatar: o, name: a } = e;
      B.classifyRoleMessages(r), B.resetAllRoleElements(r, o, a);
    } else
      console[f]("Message index not found. Please use the `getMessages` method to find the correct index");
  }
}
class _h {
  static getText(e, t) {
    var n, i;
    if (!e.directConnection && !e.connect && !e.webModel && !e.demo)
      return `Connect to any API using the [connect](${X}connect#connect-1) property or a popular service via [directConnection](${X}directConnection/#directConnection).
 Host AI entirely on your browser via a [webModel](${X}webModel).
 To get started checkout the [Start](https://deepchat.dev/start) page and live code [examples](https://deepchat.dev/examples/frameworks).
 To remove this message set the [demo](${X}modes#demo) property to true.`;
    if (e.directConnection) {
      if (!t.isDirectConnection())
        return `Please define a valid service inside
          the [directConnection](${X}directConnection/#directConnection) object.`;
      const r = (n = e.directConnection.openAI) == null ? void 0 : n.chat;
      if (typeof r == "object" && ((i = r.tools) != null && i.find((o) => o[E] === "function")) && !r.function_handler)
        return `Please define the \`function_handler\` property inside the openAI [chat](${X}directConnection/openAI#Chat) object.`;
    } else if (e.connect && !e.connect.url && !e.connect.handler)
      return `Please define a \`url\` or a \`handler\` property inside the [connect](${X}connect#connect-1) object.`;
    return null;
  }
}
class et extends tt {
  constructor(e, t, n) {
    var a, c;
    super(e);
    const { permittedErrorPrefixes: i, demo: r } = t;
    this._errorMessageOverrides = (a = e.errorMessages) == null ? void 0 : a.overrides, this._onClearMessages = ln.onClearMessages.bind(this, e), this._onError = ln.onError.bind(this, e), this._isLoadingMessageAllowed = et.getDefaultDisplayLoadingMessage(e, t), typeof e.displayLoadingBubble == "object" && e.displayLoadingBubble.toggle && (e.displayLoadingBubble.toggle = this.setLoadingToggle.bind(this)), this._permittedErrorPrefixes = i, this.addSetupMessageIfNeeded(e, t) || this.populateIntroPanel(n), r && this.prepareDemo(le.processDemo(r), e.loadHistory), this.addIntroductoryMessages(e, t);
    const o = new xi(e, this, t);
    this._displayServiceErrorMessages = (c = e.errorMessages) == null ? void 0 : c.displayServiceErrorMessages, e.getMessages = () => B.deepCloneMessagesWithReferences(this.messageToElements.map(([l]) => l)), e.clearMessages = this.clearMessages.bind(this, t), e.refreshMessages = this.refreshTextMessages.bind(this, e.remarkable), e.scrollToBottom = V.scrollToBottom.bind(this, this), e.addMessage = (l, d) => {
      this.addAnyMessage({ ...l, sendUpdate: !!d }, !d);
    }, e.updateMessage = (l, d) => Ze.update(this, l, d), t.isWebModel() && t.setUpMessages(this), e.textToSpeech && An.processConfig(e.textToSpeech, (l) => {
      this.textToSpeech = l;
    }), this.elementRef.onscroll = async () => {
      var l, d;
      e.loadHistory && o.loadHistoryOnScroll(e.loadHistory), (l = this.scrollButton) == null || l.updateScroll(), (d = this.browserStorage) != null && d.trackScrollHeight && this.browserStorage.addScrollHeight(this.elementRef.scrollTop);
    };
  }
  static getDefaultDisplayLoadingMessage(e, t) {
    return typeof e.displayLoadingBubble == "object" && e.displayLoadingBubble.toggle ? !1 : t.websocket ? typeof e.displayLoadingBubble === U ? !1 : !!e.displayLoadingBubble : (typeof e.displayLoadingBubble === U || e.displayLoadingBubble) ?? !0;
  }
  setLoadingToggle(e) {
    const t = this.messageElementRefs[this.messageElementRefs.length - 1], n = tt.isLoadingMessage(t);
    if (!e && n)
      this.removeLastMessage(), delete this._activeLoadingConfig;
    else {
      if (this._activeLoadingConfig && n) {
        const i = re.getTargetWrapper(t.bubbleElement);
        if (i)
          return this._activeLoadingConfig = e || {}, this.updateLoadingMessage(i);
        this.removeLastMessage();
      }
      this._activeLoadingConfig = e || {}, this.addLoadingMessage(!0);
    }
  }
  prepareDemo(e, t) {
    var n;
    if (typeof e == "object") {
      if (!t && e.displayLoading) {
        const { history: i } = e.displayLoading;
        i != null && i.small && It.addMessage(this, !1), i != null && i.full && It.addMessage(this);
      }
      e.displayErrors && (e.displayErrors[w] && this.addNewErrorMessage("", ""), e.displayErrors.service && this.addNewErrorMessage(oe, ""), e.displayErrors.speechToText && this.addNewErrorMessage("speechToText", "")), (n = e.displayLoading) != null && n.message && this.addLoadingMessage(), e.response && (this.customDemoResponse = e.response);
    }
  }
  addSetupMessageIfNeeded(e, t) {
    const n = _h.getText(e, t);
    if (n) {
      const i = this.createAndAppendNewMessageElement(n, te);
      this.applyCustomStyles(i, te, !1);
    }
    return !!n;
  }
  // WORK - const file for deep chat classes
  addIntroductoryMessages(e, t) {
    e != null && e.shadowRoot && (this._introMessage = e.introMessage);
    let n = this._introMessage;
    t != null && t.isWebModel() && (n ?? (n = t.getIntroMessage(n)));
    const i = !(e != null && e.history) && !!(e != null && e.loadHistory || t != null && t.fetchHistory);
    n && (Array.isArray(n) ? n.forEach((r, o) => {
      if (o !== 0) {
        const a = this.messageElementRefs[this.messageElementRefs.length - 1].innerContainer;
        B.hideRoleElements(a, this.avatar, this.name);
      }
      this.addIntroductoryMessage(r, i);
    }) : this.addIntroductoryMessage(n, i));
  }
  addIntroductoryMessage(e, t) {
    var i;
    let n;
    return e != null && e[h] ? n = this.createAndAppendNewMessageElement(e[h], te) : e != null && e[L] && (n = bt.add(this, e[L], te)), n && (this.applyCustomStyles(n, te, !1, (i = this.messageStyles) == null ? void 0 : i.intro), n.outerContainer[m].add(tt.INTRO_CLASS), t && (n.outerContainer[v].display = "none")), n;
  }
  removeIntroductoryMessage() {
    const e = this.messageElementRefs[0];
    e.outerContainer[m].contains(tt.INTRO_CLASS) && (e.outerContainer.remove(), this.messageElementRefs.shift());
  }
  addAnyMessage(e, t = !1, n = !1) {
    return e[f] ? this.addNewErrorMessage(oe, e[f], n) : this.addNewMessage(e, t, n);
  }
  tryAddTextMessage(e, t, n, i = !1, r = !1) {
    e[h] !== void 0 && n[h] !== null && (this.addNewTextMessage(e[h], e[C], t, r), !i && this.textToSpeech && e[C] !== F && An.speak(e[h], this.textToSpeech));
  }
  tryAddFileMessages(e, t, n = !1) {
    e[b] && Array.isArray(e[b]) && ls.addMessages(this, e[b], e[C], t, n);
  }
  tryAddHTMLMessage(e, t, n = !1) {
    if (e[L] !== void 0 && e[L] !== null) {
      const i = bt.add(this, e[L], e[C], t, n);
      !n && gt.isElementTemporary(i) && delete e[L];
    }
  }
  // this should not be activated by streamed messages
  addNewMessage(e, t = !1, n = !1) {
    var c, l, d, p;
    e[C] !== F && ((c = this._hiddenAttachments) == null || c.removeHiddenFiles());
    const i = et.createMessageContent(e), r = (d = (l = this.textToSpeech) == null ? void 0 : l.audio) == null ? void 0 : d.displayText;
    typeof r == "boolean" && !r && delete i[h];
    const o = V.isScrollbarAtBottomOfElement(this.elementRef), a = { status: e.overwrite };
    return n ? (this.tryAddFileMessages(i, o, n), this.tryAddHTMLMessage(i, a, n), this.tryAddTextMessage(i, a, e, t, n)) : (this.tryAddTextMessage(i, a, e, t, n), this.tryAddHTMLMessage(i, a, n), this.tryAddFileMessages(i, o, n)), this.isValidMessageContent(i) && !n && (this.updateStateOnMessage(i, e.overwrite, e.sendUpdate, t), a.status || setTimeout(() => this.scrollToFirstElement(i[C], o)), t || (p = this.browserStorage) == null || p.addMessages(this.messageToElements.map(([u]) => u)), this.scrollButton && i[C] !== F && this.tryUpdateHiddenMessageCount(t, e)), this._activeLoadingConfig && this.addLoadingMessage(!1), i;
  }
  tryUpdateHiddenMessageCount(e, t) {
    (!e || t.sendUpdate !== void 0) && setTimeout(() => {
      var n, i;
      return (i = (n = this.scrollButton) == null ? void 0 : n.updateHidden) == null ? void 0 : i.call(n);
    });
  }
  isValidMessageContent(e) {
    return e[h] || e[L] || e[b] && e[b].length > 0;
  }
  updateStateOnMessage(e, t, n = !0, i = !1) {
    if (!t) {
      const r = B.generateMessageBody(e, this.messageElementRefs);
      this.messageToElements.push([e, r]);
    }
    n && this.sendClientUpdate(e, i);
  }
  // prettier-ignore
  removeMessageOnError() {
    const e = this.messageElementRefs[this.messageElementRefs.length - 1], t = e == null ? void 0 : e.bubbleElement;
    (t != null && t[m].contains(dt.MESSAGE_CLASS) && t.textContent === "" || et.isTemporaryElement(e)) && this.removeLastMessage();
  }
  // prettier-ignore
  addNewErrorMessage(e, t, n = !1) {
    var l, d, p, u, g, _;
    (l = this._hiddenAttachments) == null || l.readdHiddenFiles(), this.removeMessageOnError();
    const i = this.getPermittedMessage(t) || ((d = this._errorMessageOverrides) == null ? void 0 : d[e]) || ((p = this._errorMessageOverrides) == null ? void 0 : p[w]) || "Error, please try again.", r = this.createMessageElementsOnOrientation(i, f, n);
    B.hideRoleElements(r.innerContainer, this.avatar, this.name);
    const { bubbleElement: o, outerContainer: a } = r;
    o[m].add(zi), this.renderText(o, i);
    const c = Ne.extractParticularSharedStyles(
      ["fontSize", "fontFamily"],
      (u = this.messageStyles) == null ? void 0 : u[w]
    );
    Ne.applyCustomStylesToElements(r, !1, c), Ne.applyCustomStylesToElements(r, !1, (g = this.messageStyles) == null ? void 0 : g[f]), n || this.appendOuterContainerElemet(a), this.textToSpeech && An.speak(i, this.textToSpeech), (_ = this._onError) == null || _.call(this, i), setTimeout(() => V.scrollToBottom(this));
  }
  static checkPermittedErrorPrefixes(e, t) {
    for (let n = 0; n < e.length; n += 1)
      if (t.startsWith(e[n])) return t;
  }
  static extractErrorMessages(e) {
    return Array.isArray(e) ? e : e instanceof Error ? [e.message] : typeof e == "string" ? [e] : typeof e == "object" && e[f] ? [e[f]] : [];
  }
  getPermittedMessage(e) {
    if (e) {
      const t = et.extractErrorMessages(e);
      for (let n = 0; n < t.length; n += 1) {
        const i = t[n];
        if (typeof i === ye) {
          if (this._displayServiceErrorMessages) return i;
          if (this._permittedErrorPrefixes) {
            const r = et.checkPermittedErrorPrefixes(this._permittedErrorPrefixes, i);
            if (r) return r;
          }
        }
      }
    }
  }
  removeError() {
    this.isLastMessageError() && B.getLastMessageElement(this.elementRef).remove();
  }
  addDefaultLoadingMessage(e, t = te) {
    const n = this.createMessageElements("", t), { bubbleElement: i } = n;
    n.bubbleElement[m].add(ft.DOTS_CONTAINER_CLASS);
    const r = x();
    return r[m].add("loading-message-dots"), i.appendChild(r), ft.setDots(i, e), n;
  }
  // prettier-ignore
  addLoadingMessage(e = !1) {
    var a, c, l, d, p, u;
    if (tt.isLoadingMessage(this.messageElementRefs[this.messageElementRefs.length - 1]) || !this._activeLoadingConfig && !e && !this._isLoadingMessageAllowed) return;
    const t = ((a = this._activeLoadingConfig) == null ? void 0 : a[C]) || te, n = ((c = this._activeLoadingConfig) == null ? void 0 : c[v]) || ((d = (l = this.messageStyles) == null ? void 0 : l.loading) == null ? void 0 : d.message), i = n == null ? void 0 : n[L], r = i ? bt.createElements(this, i, t, !1) : this.addDefaultLoadingMessage(n, t);
    this.appendOuterContainerElemet(r.outerContainer), r.bubbleElement[m].add(ft.BUBBLE_CLASS), this.applyCustomStyles(r, t, !1, n == null ? void 0 : n[R]), (u = (p = this.avatar) == null ? void 0 : p.getAvatarContainer(r.innerContainer)) == null || u[m].add("loading-avatar-container"), !this.focusMode && V.isScrollbarAtBottomOfElement(this.elementRef) && V.scrollToBottom(this);
  }
  // this is a special method not to constantly refresh loading animations
  updateLoadingMessage(e) {
    var i;
    const t = (i = this._activeLoadingConfig) == null ? void 0 : i[v], n = t == null ? void 0 : t[L];
    e.innerHTML = n || "";
  }
  populateIntroPanel(e) {
    e && (this._introPanel = new Sr(e), re.apply(this, this._introPanel._elementRef), this.elementRef.appendChild(this._introPanel._elementRef));
  }
  async addMultipleFiles(e, t) {
    return this._hiddenAttachments = t, Promise.all(
      (e || []).map((n) => new Promise((i) => {
        if (!n[E] || n[E] === sn) {
          const r = n[ne].name || ne;
          i({ name: r, [E]: sn, ref: n[ne] });
        } else {
          const r = new FileReader();
          r.readAsDataURL(n[ne]), r.onload = () => {
            const o = n[ne].name;
            i({ [T]: r.result, name: o, [E]: n[E], ref: n[ne] });
          };
        }
      }))
    );
  }
  static isActiveElement(e) {
    return e ? e.contains(ft.BUBBLE_CLASS) || e.contains(It.CLASS) || e.contains(dt.MESSAGE_CLASS) : !1;
  }
  // WORK - update all message classes to use tejas prefix
  clearMessages(e, t) {
    var r, o, a, c;
    const n = [];
    this.messageElementRefs.forEach((l) => {
      et.isActiveElement(l.bubbleElement[m]) ? n.push(l) : l.outerContainer.remove();
    }), Array.from(this.elementRef.children).forEach((l) => {
      var p;
      const d = (p = l.children[0]) == null ? void 0 : p.children[0];
      d != null && d[m].contains(zi) && l.remove();
    }), this.messageElementRefs = n;
    const i = this.messageToElements.filter((l) => l[1][h] && et.isActiveElement(l[1][h].bubbleElement[m]) || l[1][L] && et.isActiveElement(l[1][L].bubbleElement[m]));
    this.messageToElements.splice(0, this.messageToElements.length, ...i), t !== !1 && ((r = this._introPanel) != null && r._elementRef && this._introPanel.display(), this.addIntroductoryMessages()), (o = this.browserStorage) == null || o.clear(), (a = this.scrollButton) == null || a.clearHidden(), (c = this._onClearMessages) == null || c.call(this), delete e.sessionId;
  }
}
class ui {
  static adjustInputPadding(e, t) {
    t[Tn].length > 0 && e[m].add("text-input-inner-start-adjustment"), t[pt].length > 0 && e[m].add("text-input-inner-end-adjustment");
  }
  static adjustForOutsideButton(e, t, n) {
    n[Ee].length === 0 && n[Pe].length > 0 ? (e[0][m].add(so), t[m].add(so)) : n[Pe].length === 0 && n[Ee].length > 0 && (e[3][m].add(ro), t[m].add(ro));
  }
  // when submit is the only button
  // when submit button is outside by itself - we increase the height for a better look
  static adjustOutsideSubmit(e, t, n) {
    if (!(n[Tn].length > 0 || n[pt].length > 0)) {
      if (n[Ee].length === 0 && n[Pe].length > 0)
        return e[0][m].add(no), t[m].add(no), n[Pe].map((i) => i.button.elementRef[m].add("submit-button-enlarged"));
      if (n[Pe].length === 0 && n[Ee].length > 0)
        return e[3][m].add(io), t[m].add(io), n[Ee].map((i) => i.button.elementRef[m].add("submit-button-enlarged"));
    }
  }
  // prettier-ignore
  static set(e, t, n, i) {
    !!ui.adjustOutsideSubmit(t, n, i) || ui.adjustForOutsideButton(t, n, i), ui.adjustInputPadding(e, i);
  }
}
class kn {
  static create() {
    return Array.from({ length: 4 }).map((e, t) => {
      const n = x();
      return n[m].add("input-button-container"), (t === 0 || t === 3) && n[m].add("outer-button-container"), (t === 1 || t === 2) && n[m].add("inner-button-container"), n;
    });
  }
  static add(e, t) {
    e.insertBefore(t[1], e.firstChild), e.insertBefore(t[0], e.firstChild), e.appendChild(t[2]), e.appendChild(t[3]);
  }
  static getContainerIndex(e) {
    return e === Pe ? 0 : e === Tn ? 1 : e === pt ? 2 : 3;
  }
  static addButton(e, t, n) {
    t[m].add(n);
    const i = kn.getContainerIndex(n);
    e[i].appendChild(t), i === 3 && t[m].add(Ee);
  }
}
const oo = [
  "camera",
  "gifs",
  "images",
  "audio",
  "mixedFiles",
  nt,
  "microphone"
], yh = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
  <rect x="2.5" y="2.5" width="17" height="17" rx="2" stroke="#000000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, Ie = class Ie {
  static addHighlightEvents(e, t) {
    t.addEventListener(Ii, (n) => {
      e.highlightedItem = n.target;
    }), t.addEventListener(on, () => {
      e.highlightedItem = void 0;
    });
  }
  static addItemEvents(e, t, n, i) {
    Tt.add(t, i), t.addEventListener(Z, () => {
      n[Z]();
    }), Ie.addHighlightEvents(e, t);
  }
  static createItemText(e, t) {
    const n = x();
    return Object.assign(n[v], t), n[m].add(Ie.TEXT_CLASS), n.textContent = e || "File", n;
  }
  static createItemIcon(e, t) {
    const n = x();
    return Object.assign(n[v], t), n[m].add(Ie.ICON_CLASS), n.appendChild(e), n;
  }
  static populateItem(e, t, n) {
    const { elementRef: i, dropupText: r, svg: o, customStyles: a } = e, c = i.children[0], l = a && Object.values(a).find((d) => {
      var p;
      return ((p = d[z]) == null ? void 0 : p.content) === "";
    });
    c[m].contains(yt.INPUT_BUTTON_INNER_TEXT_CLASS) ? (l || t.appendChild(Ie.createItemIcon(o, n == null ? void 0 : n.iconContainer)), t.appendChild(Ie.createItemText(c.textContent, n == null ? void 0 : n[h]))) : (l || t.appendChild(Ie.createItemIcon(i.children[0], n == null ? void 0 : n.iconContainer)), t.appendChild(Ie.createItemText(r, n == null ? void 0 : n[h])));
  }
  static createItem(e, t, n) {
    var o;
    const i = x();
    Object.assign(i[v], (o = n == null ? void 0 : n.item) == null ? void 0 : o[w]), Ie.populateItem(t, i, n), i[m].add(Ie.MENU_ITEM_CLASS), i.tabIndex = 0;
    const { elementRef: r } = t;
    if (t.isCustom)
      t.setDropupItem(e, i);
    else {
      const a = ae.processStateful((n == null ? void 0 : n.item) || {});
      Ie.addItemEvents(e, i, r, a);
    }
    return i;
  }
};
Ie.MENU_ITEM_CLASS = "dropup-menu-item", Ie.CUSTOM_BUTTON_ITEM_CLASS = "dropup-menu-item-custom-button", Ie.TEXT_CLASS = "dropup-menu-item-text", Ie.ICON_CLASS = "dropup-menu-item-icon";
let ct = Ie;
const pe = class pe extends fn {
  // prettier-ignore
  constructor(e, t, n, i) {
    var c, l, d, p, u, g;
    const r = ((p = (d = (l = (c = e == null ? void 0 : e[R]) == null ? void 0 : c.button) == null ? void 0 : l[w]) == null ? void 0 : d[h]) == null ? void 0 : p.content) || `Custom ${t}`, o = yh, a = ht.tryCreateConfig(`Custom ${t}`, e == null ? void 0 : e.tooltip);
    super(
      pe.createButtonElement(),
      o,
      e == null ? void 0 : e.position,
      a,
      ((u = e == null ? void 0 : e[R]) == null ? void 0 : u.button) || a && {},
      r
    ), this._state = w, this.isCustom = !0, this._innerElements = this.createInnerElementsForStates(this.customStyles), this._menuStyles = i, this._onClick = e.onClick, this._dropupStyles = (g = e[R]) == null ? void 0 : g.dropup, this.setSetState(e), this.addClickListener(n), this.changeState(e.initialState, !0);
  }
  static createButtonElement() {
    const e = x();
    return e[m].add("input-button", pe.BUTTON_CLASS), e;
  }
  createInnerElementsForStates(e) {
    const t = "custom-icon", n = this.createInnerElements(t, w, e);
    return {
      [w]: n,
      [H]: this.genStateInnerElements(t, H, n, e),
      [$]: this.genStateInnerElements(t, $, n, e)
    };
  }
  setSetState(e) {
    e.setState = (t) => {
      t === w && this.changeToDefault(), t === H && this.changeToActive(), t === $ && this.changeToDisabled();
    };
  }
  addClickListener(e) {
    V.assignButtonEvents(this.elementRef, () => {
      var n;
      const t = (n = this._onClick) == null ? void 0 : n.call(this, this._state);
      e == null || e(), (t === w || t === H || t === $) && this.changeState(t);
    });
  }
  changeState(e, t) {
    e === $ ? this.changeToDisabled(t) : e === H ? this.changeToActive(t) : this.changeToDefault(t);
  }
  applyDropupContentStyles(e) {
    const t = Array.from(this.elementRef.children);
    if (e != null && e[h]) {
      const n = t.find(
        (i) => i[m].contains(ct.TEXT_CLASS)
      );
      n && Object.assign(n[v], e[h]);
    }
    if (e != null && e.iconContainer) {
      const n = t.find(
        (i) => i[m].contains(ct.ICON_CLASS)
      );
      n && Object.assign(n[v], e.iconContainer);
    }
  }
  resetDropupItem(e) {
    var n, i, r;
    this.elementRef = re.replaceElementWithNewClone(this.elementRef, this._originalElementRef), this.elementRef.innerHTML = "", ((n = e == null ? void 0 : e[z]) == null ? void 0 : n.content) === "" || this.elementRef.appendChild(ct.createItemIcon(this[z], (i = this._menuStyles) == null ? void 0 : i.iconContainer)), this.elementRef.appendChild(ct.createItemText(this.dropupText, (r = this._menuStyles) == null ? void 0 : r[h]));
  }
  assignDropupItemStyle(e, t) {
    var i;
    this.elementRef.parentElement && this._originalElementRef && this.resetDropupItem(t), ct.addHighlightEvents(this._menu, this.elementRef), this.applyDropupContentStyles(e), Object.assign(this.elementRef[v], (i = e == null ? void 0 : e.item) == null ? void 0 : i[w]);
    const n = ae.processStateful((e == null ? void 0 : e.item) || {});
    Tt.add(this.elementRef, n), this.addClickListener();
  }
  changeToDefault(e) {
    var t, n, i, r, o, a;
    !e && this._state === w || (this.elementRef[m].contains(ct.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t[w], (n = this.customStyles) == null ? void 0 : n[w]) : (this.changeElementsByState(this._innerElements[w]), (i = this.customStyles) != null && i[H] && Se.unsetAllCSS(this.elementRef, (r = this.customStyles) == null ? void 0 : r[H]), (o = this.customStyles) != null && o[$] && Se.unsetAllCSS(this.elementRef, (a = this.customStyles) == null ? void 0 : a[$]), this.reapplyStateStyle(w, [H, $])), this.elementRef[m].remove(pe.DISABLED_CONTAINER_CLASS, pe.ACTIVE_CONTAINER_CLASS), this.elementRef[m].add(pe.DEFAULT_CONTAINER_CLASS), fe.removeAriaDisabled(this.elementRef), this._state = w);
  }
  changeToActive(e) {
    var t, n;
    !e && this._state === H || (this.elementRef[m].contains(ct.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t[H], (n = this.customStyles) == null ? void 0 : n[H]) : (this.changeElementsByState(this._innerElements[H]), this.reapplyStateStyle(H, [$, w])), this.elementRef[m].remove(pe.DISABLED_CONTAINER_CLASS, pe.DEFAULT_CONTAINER_CLASS), this.elementRef[m].add(pe.ACTIVE_CONTAINER_CLASS), fe.removeAriaDisabled(this.elementRef), this._state = H);
  }
  changeToDisabled(e) {
    var t, n, i, r, o, a;
    !e && this._state === $ || (this.elementRef[m].contains(ct.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t[$], (n = this.customStyles) == null ? void 0 : n[$]) : (this.changeElementsByState(this._innerElements[$]), (i = this.customStyles) != null && i[H] && Se.unsetAllCSS(this.elementRef, (r = this.customStyles) == null ? void 0 : r[H]), (o = this.customStyles) != null && o[w] && Se.unsetAllCSS(this.elementRef, (a = this.customStyles) == null ? void 0 : a[w]), this.reapplyStateStyle($, [w, H])), this.elementRef[m].remove(pe.ACTIVE_CONTAINER_CLASS, pe.DEFAULT_CONTAINER_CLASS), this.elementRef[m].add(pe.DISABLED_CONTAINER_CLASS), fe.addAriaDisabled(this.elementRef), this._state = $);
  }
  // called after class is initialised
  setDropupItem(e, t) {
    this._menu = e, this.elementRef = t, this._originalElementRef = t.cloneNode(!0), this.changeState(this._state, !0);
  }
  genStateInnerElements(e, t, n, i) {
    var c, l, d, p;
    let r = this.createInnerElements(e, t, i);
    const o = (l = (c = i == null ? void 0 : i[t]) == null ? void 0 : c[z]) == null ? void 0 : l.content, a = (p = (d = i == null ? void 0 : i[t]) == null ? void 0 : d[h]) == null ? void 0 : p.content;
    if (o === void 0 || a === void 0) {
      const { svg: u, [h]: g } = di.parseSVGTextElements(n), { svg: _, [h]: y } = di.parseSVGTextElements(r), S = [];
      pe.addToInnerElements(S, o, u, _), pe.addToInnerElements(S, a, g, y), r = S;
    }
    return r;
  }
  static addToInnerElements(e, t, n, i) {
    t === void 0 && n ? e.push(n.cloneNode(!0)) : i && e.push(i);
  }
  static add(e, t) {
    const { customButtons: n, focusInput: i, dropupStyles: r } = e;
    n == null || n.forEach((o, a) => {
      const c = { button: new pe(o, a + 1, i, r == null ? void 0 : r.menu) };
      t[`${pe.INDICATOR_PREFIX}${a + 1}`] = c;
    });
  }
};
pe.INDICATOR_PREFIX = "custom", pe.BUTTON_CLASS = "custom-button", pe.DISABLED_CONTAINER_CLASS = "custom-button-container-disabled", pe.DEFAULT_CONTAINER_CLASS = "custom-button-container-default", pe.ACTIVE_CONTAINER_CLASS = "custom-button-container-active";
let nn = pe;
const Eh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
</svg>`;
class Ai {
  static focusItemWhenOnEdge(e, t) {
    const n = e.elementRef, i = t ? n.children[0] : n.children[n.children.length - 1];
    Ai.focusSiblingItem(e, i, t, !0);
  }
  // isEdgeItem means is it a start or end item
  static focusSiblingItem(e, t, n, i = !1) {
    const r = i ? t : t[n ? "nextSibling" : "previousSibling"];
    r ? (t.dispatchEvent(new MouseEvent(on)), r.dispatchEvent(new MouseEvent(Ii)), r.focus()) : (t.dispatchEvent(new MouseEvent(on)), Ai.focusItemWhenOnEdge(e, n));
  }
}
class Cr {
  constructor(e, t) {
    var n;
    this._isOpen = !0, this._styles = t, this.elementRef = Cr.createElement((n = this._styles) == null ? void 0 : n.container), this.close(), setTimeout(() => this.addWindowEvents(e));
  }
  static createElement(e) {
    const t = x();
    return t.id = Qe, Object.assign(t[v], e), t;
  }
  open() {
    this.elementRef[v].display = "block", this._isOpen = !0;
  }
  close() {
    this._isOpen && (this.elementRef[v].display = "none", this._isOpen = !1);
  }
  toggle() {
    this._isOpen ? this.close() : this.open();
  }
  addItem(e) {
    const t = ct.createItem(this, e, this._styles);
    this.elementRef.appendChild(t);
  }
  // prettier-ignore
  addWindowEvents(e) {
    this.clickEvent = this.windowClick.bind(this, e), window.addEventListener(Z, this.clickEvent), this.keyDownEvent = this.windowKeyDown.bind(this, e), window.addEventListener("keydown", this.keyDownEvent);
  }
  windowClick(e, t) {
    var n;
    !e.isConnected && this.clickEvent ? window.removeEventListener(Z, this.clickEvent) : e.parentElement !== ((n = t.target.shadowRoot) == null ? void 0 : n.children[0]) && this.close();
  }
  // prettier-ignore
  windowKeyDown(e, t) {
    var n, i, r;
    !e.isConnected && this.keyDownEvent ? window.removeEventListener("keydown", this.keyDownEvent) : this._isOpen && (t.key === _e.ESCAPE ? (this.close(), (n = this.highlightedItem) == null || n.dispatchEvent(new MouseEvent(on))) : t.key === _e.ENTER ? ((i = this.highlightedItem) == null || i[Z](), (r = this.highlightedItem) == null || r.dispatchEvent(new MouseEvent(on))) : t.key === _e.ARROW_DOWN ? Ai.focusSiblingItem(
      this,
      this.highlightedItem || this.elementRef.children[this.elementRef.children.length - 1],
      !0
    ) : t.key === _e.ARROW_UP && Ai.focusSiblingItem(
      this,
      this.highlightedItem || this.elementRef.children[0],
      !1
    ));
  }
}
const Jt = class Jt extends fn {
  constructor(e, t) {
    var r, o;
    const n = ht.tryCreateConfig("Options", (r = t == null ? void 0 : t.button) == null ? void 0 : r.tooltip);
    super(Jt.createButtonElement(), Eh, void 0, n, { [R]: (o = t == null ? void 0 : t.button) == null ? void 0 : o[R] });
    const i = this.createInnerElementsForStates(this.customStyles);
    this._menu = new Cr(e, t == null ? void 0 : t.menu), this.addClickEvent(), this.buttonContainer = Jt.createButtonContainer(), this.changeElementsByState(i[R]), this.buttonContainer.appendChild(this.elementRef), this.elementRef[m].add(Jt.BUTTON_ICON_CLASS), this.buttonContainer.appendChild(this._menu.elementRef), this.reapplyStateStyle(R), this.addContainerEvents(e);
  }
  static createButtonElement() {
    const e = x();
    return e[m].add("input-button"), e;
  }
  createInnerElementsForStates(e) {
    return {
      [R]: this.createInnerElements("dropup-icon", R, e)
    };
  }
  addClickEvent() {
    this.elementRef.onclick = this._menu.toggle.bind(this._menu), this.elementRef.onkeydown = (e) => {
      e.key === _e.ENTER && setTimeout(() => {
        this._menu.toggle();
        const t = this._menu.elementRef.children[0];
        t.focus(), t.dispatchEvent(new MouseEvent(Ii));
      });
    };
  }
  static createButtonContainer() {
    const e = x();
    return e.id = "dropup-container", e;
  }
  addItem(e) {
    this._menu.addItem(e);
  }
  addContainerEvents(e) {
    e.addEventListener(Z, (t) => {
      const n = t.target[m];
      !n.contains(Jt.BUTTON_ICON_CLASS) && !n.contains(nn.DISABLED_CONTAINER_CLASS) && this._menu.close();
    });
  }
  static getPosition(e, t) {
    var n, i;
    return (n = t == null ? void 0 : t.button) != null && n.position ? le.processPosition((i = t == null ? void 0 : t.button) == null ? void 0 : i.position) : e[Pe].length > 0 && e[Ee].length === 0 ? Ee : Pe;
  }
};
Jt.BUTTON_ICON_CLASS = "dropup-button";
let ds = Jt;
class Oe {
  // prettier-ignore
  static addToDropup(e, t, n, i) {
    const r = new ds(n, i);
    oo.forEach((a) => {
      const c = t[Qe].findIndex((d) => d.buttonType === a), l = t[Qe][c];
      l && (r.addItem(l.button), t[Qe].splice(c, 1));
    }), t[Qe].forEach(({ button: a }) => r.addItem(a));
    const o = ds.getPosition(t, i);
    kn.addButton(e, r.buttonContainer, o), t[o].push({});
  }
  static addToSideContainer(e, t) {
    [Tn, pt, Pe, Ee].forEach((i) => {
      const r = i;
      t[r].forEach((o) => {
        kn.addButton(e, o.button.elementRef, r);
      });
    });
  }
  static setPosition(e, t, n) {
    const i = { ...e[t], buttonType: t };
    n.push(i), delete e[t];
  }
  static createPositionsToButtonsObj() {
    return {
      [Qe]: [],
      [Pe]: [],
      [Tn]: [],
      [pt]: [],
      [Ee]: []
    };
  }
  // prettier-ignore
  static generatePositionToButtons(e) {
    const t = Oe.createPositionsToButtonsObj();
    Object.keys(e).forEach((i) => {
      var o;
      const r = (o = e[i]) == null ? void 0 : o.button.position;
      r && Oe.setPosition(e, i, t[r]);
    }), t[pt].length === 0 && e.submit && Oe.setPosition(e, nt, t[pt]), t[Ee].length === 0 && (e.submit ? Oe.setPosition(e, nt, t[Ee]) : e.microphone ? Oe.setPosition(e, at, t[Ee]) : e.camera ? Oe.setPosition(e, De, t[Ee]) : e[`${nn.INDICATOR_PREFIX}1`] && Oe.setPosition(e, `${nn.INDICATOR_PREFIX}1`, t[Ee])), e.submit && Oe.setPosition(
      e,
      nt,
      t[Pe].length === 0 ? t[Pe] : t[pt]
    ), e.microphone && Oe.setPosition(
      e,
      at,
      t[Pe].length === 0 ? t[Pe] : t[pt]
    );
    const n = Object.keys(e);
    return n.length > 1 || t[Qe].length > 0 ? (oo.forEach((i) => {
      e[i] && t[Qe].push({ ...e[i], buttonType: i });
    }), n.forEach((i) => {
      const r = i;
      r.startsWith(nn.INDICATOR_PREFIX) && e[r] && t[Qe].push({ ...e[r], customType: r });
    })) : n.length === 1 && Oe.setPosition(
      e,
      n[0],
      t[Ee].length === 0 ? t[Ee] : t[Pe]
    ), t;
  }
  // prettier-ignore
  static addButtons(e, t, n, i) {
    const r = Oe.generatePositionToButtons(t);
    return Oe.addToSideContainer(e, r), r[Qe].length > 0 && Oe.addToDropup(e, r, n, i), r;
  }
}
const vh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`, Sh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M20,15.2928932 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,12.2928932 L7.14644661,9.14644661 C7.34170876,8.95118446 7.65829124,8.95118446 7.85355339,9.14644661 L13.5,14.7928932 L16.1464466,12.1464466 C16.3417088,11.9511845 16.6582912,11.9511845 16.8535534,12.1464466 L20,15.2928932 Z M20,16.7071068 L16.5,13.2071068 L13.8535534,15.8535534 C13.6582912,16.0488155 13.3417088,16.0488155 13.1464466,15.8535534 L7.5,10.2071068 L4,13.7071068 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,16.7071068 Z M3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 Z M15,6 L17,6 C17.5522847,6 18,6.44771525 18,7 L18,9 C18,9.55228475 17.5522847,10 17,10 L15,10 C14.4477153,10 14,9.55228475 14,9 L14,7 C14,6.44771525 14.4477153,6 15,6 Z M15,7 L15,9 L17,9 L17,7 L15,7 Z"/>
</svg>
`, Ch = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-49.49 -49.49 593.87 593.87" stroke-width="3.95908" transform="rotate(0)">
  <g stroke-width="0"></g>
  <g stroke-linecap="round" stroke-linejoin="round" stroke-width="0.98977"></g>
  <g>
    <g>
      <g>
        <path d="M163.205,76.413v293.301c-3.434-3.058-7.241-5.867-11.486-8.339c-21.38-12.452-49.663-15.298-77.567-7.846 c-49.038,13.096-80.904,54.519-71.038,92.337c4.019,15.404,14.188,28.221,29.404,37.087c13.553,7.894,29.87,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.447-4.087c42.74-11.406,72.411-44.344,72.807-77.654h0.011v-0.162c0.002-0.166,0-0.331,0-0.496V187.072 l290.971-67.3v178.082c-3.433-3.055-7.238-5.863-11.481-8.334c-21.385-12.452-49.654-15.308-77.567-7.846 c-49.038,13.087-80.904,54.519-71.038,92.356c4.019,15.385,14.183,28.212,29.404,37.067c13.548,7.894,29.875,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.452-4.087c42.74-11.413,72.411-44.346,72.804-77.654h0.004v-0.065c0.003-0.236,0.001-0.469,0-0.704V0 L163.205,76.413z M104.999,471.779c-22.543,6.038-45.942,3.846-62.572-5.846c-10.587-6.163-17.591-14.817-20.255-25.038 c-7.144-27.375,18.452-58.029,57.062-68.346c8.409-2.25,16.938-3.346,25.188-3.346c13.87,0,26.962,3.115,37.389,9.192 c10.587,6.163,17.591,14.817,20.255,25.029c0.809,3.102,1.142,6.248,1.139,9.4v0.321h0.014 C162.99,437.714,139.082,462.678,104.999,471.779z M182.898,166.853V92.067l290.971-67.298v74.784L182.898,166.853z M415.677,399.923c-22.558,6.038-45.942,3.837-62.587-5.846c-10.587-6.163-17.587-14.817-20.25-25.019 c-7.144-27.385,18.452-58.058,57.058-68.365c8.414-2.25,16.942-3.346,25.192-3.346c13.875,0,26.962,3.115,37.385,9.192 c10.596,6.163,17.596,14.817,20.26,25.029v0.01c0.796,3.05,1.124,6.144,1.135,9.244v0.468h0.02 C473.668,365.851,449.763,390.814,415.677,399.923z">
        </path>
      </g>
    </g>
  </g>
</svg>`, xh = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 5.9266752 5.6408391" height="21.31971" width="22.4">
  <g>
    <path d="m 5.2564627,1.548212 c -3.1136005,-0.4796804 -1.5568006,-0.2398402 0,0 z M 2.0001198,2.0922063 c 0.1556781,0 0.2657489,0.020893 0.3917849,0.080366 0.081154,0.038347 0.1153492,0.134065 0.076377,0.2138602 -0.038973,0.07979 -0.1363527,0.1134129 -0.2175069,0.075091 -0.078199,-0.036919 -0.1407455,-0.048792 -0.250655,-0.048792 -0.2260486,0 -0.3921482,0.2042182 -0.3921482,0.4801409 0,0.2761822 0.1663188,0.4810688 0.3921482,0.4810688 0.1117901,0 0.2064255,-0.046133 0.255659,-0.1284198 l 0.00162,-0.00389 V 3.0534032 l -0.098011,1.75e-4 c -0.081844,0 -0.1495979,-0.059305 -0.1612403,-0.1365887 l -0.00175,-0.023683 c 0,-0.08047 0.060311,-0.1470874 0.1389194,-0.1585331 l 0.024085,-0.00195 h 0.2612303 c 0.081842,0 0.149598,0.059305 0.1612404,0.1365891 l 0.00175,0.023683 -3.398e-4,0.3968809 v 0 l -0.00168,0.014211 v 0 l -0.00553,0.023034 v 0 l -0.00532,0.014145 c -0.098178,0.22826 -0.3236506,0.3528713 -0.5706303,0.3528713 -0.4240855,0 -0.7181621,-0.3622714 -0.7181621,-0.8016063 0,-0.4391857 0.2940275,-0.8006848 0.7181621,-0.8006848 z m 1.2034759,0.031275 c 0.081843,0 0.1495977,0.059305 0.1612403,0.1365891 l 0.00175,0.023683 v 1.2211775 c 0,0.088516 -0.07298,0.1602721 -0.1630073,0.1602721 -0.081841,0 -0.1495972,-0.059305 -0.1612397,-0.1365892 L 3.040589,3.5049308 V 2.2837527 c 0,-0.088516 0.07298,-0.1602721 0.1630067,-0.1602714 z m 0.7813442,0 0.5209469,0.00195 c 0.090025,3.048e-4 0.1627543,0.072306 0.1624458,0.1608234 -2.809e-4,0.08047 -0.06083,0.1468798 -0.1394772,0.158066 l -0.024092,0.00195 -0.3575326,-0.0013 v 0.4497782 l 0.2928918,2.27e-4 c 0.081842,0 0.1495979,0.059305 0.1612403,0.136589 l 0.00175,0.023683 c 0,0.080469 -0.06031,0.1470871 -0.1389193,0.1585393 l -0.024092,0.00195 -0.2928919,-2.336e-4 1.563e-4,0.2860316 c 0,0.080471 -0.06031,0.1470873 -0.1389193,0.1585395 l -0.024085,0.00195 c -0.081843,0 -0.1495979,-0.059305 -0.1612403,-0.1365826 l -0.00175,-0.023691 V 2.2841354 c 2.798e-4,-0.08047 0.060829,-0.1468797 0.1394758,-0.1580594 z"/>
    <path d="m 5.0894191,1.0943261 c 0,-0.21918999 -0.177687,-0.39686999 -0.396876,-0.39686999 h -3.43959 c -0.2191879,0 -0.391262,0.1777519 -0.3968759,0.39686999 l -0.027082,3.4379266 c 0.040152,0.2939927 0.4235456,0.409415 0.4235456,0.409415 l 3.4785583,-0.00851 c 0,0 0.3008506,-0.1402998 0.3236271,-0.4201576 0.042911,-0.5272495 0.034693,-1.6106146 0.034693,-3.4186761 z m -4.49792494,0 c 0,-0.36530999 0.29614504,-0.66145999 0.66145894,-0.66145999 h 3.43959 c 0.365314,0 0.66146,0.29615 0.66146,0.66145999 v 3.43959 c 0,0.36532 -0.296146,0.66146 -0.66146,0.66146 h -3.43959 c -0.3653139,0 -0.66145894,-0.29614 -0.66145894,-0.66146 z"/>
  </g>
</svg>
`, wh = {
  [Q]: { id: "upload-images-icon", svgString: Sh, dropupText: "Image" },
  [xn]: { id: "upload-gifs-icon", svgString: xh, dropupText: "GIF" },
  [q]: { id: "upload-audio-icon", svgString: Ch, dropupText: "Audio" },
  mixedFiles: { id: "upload-mixed-files-icon", svgString: vh, dropupText: "File" }
};
class Cs extends fn {
  constructor(e) {
    (e == null ? void 0 : e.position) === Qe && (e.position = Ee);
    const t = ht.tryCreateConfig("Microphone", e == null ? void 0 : e.tooltip);
    super(Cs.createMicrophoneElement(), ta, e == null ? void 0 : e.position, t, e), this.isActive = !1, this._innerElements = this.createInnerElementsForStates(this.customStyles), this.changeToDefault();
  }
  createInnerElementsForStates(e) {
    const t = "microphone-icon";
    return {
      [w]: this.createInnerElements(t, w, e),
      [H]: this.createInnerElements(t, H, e),
      unsupported: this.createInnerElements(t, "unsupported", e),
      commandMode: this.createInnerElements(t, "commandMode", e)
    };
  }
  static createMicrophoneElement() {
    const e = x();
    return e.id = "microphone-button", e[m].add("input-button"), e;
  }
  changeToActive() {
    this.changeElementsByState(this._innerElements[H]), this.toggleIconFilter(H), this.reapplyStateStyle(H, [w, "commandMode"]), this.isActive = !0;
  }
  changeToDefault() {
    this.changeElementsByState(this._innerElements[w]), this.toggleIconFilter(w), this.reapplyStateStyle(w, [H, "commandMode"]), this.isActive = !1;
  }
  changeToCommandMode() {
    this.changeElementsByState(this._innerElements.commandMode), this.toggleIconFilter("command"), this.reapplyStateStyle("commandMode", [H]);
  }
  changeToUnsupported() {
    this.changeElementsByState(this._innerElements.unsupported), this.elementRef[m].add("unsupported-microphone"), this.reapplyStateStyle("unsupported", [H]);
  }
  toggleIconFilter(e) {
    const t = this.elementRef.children[0];
    if (t.tagName.toLocaleLowerCase() === z)
      switch (e) {
        case w:
          t[m].remove("active-microphone-icon", "command-microphone-icon"), t[m].add("default-microphone-icon");
          break;
        case H:
          t[m].remove("default-microphone-icon", "command-microphone-icon"), t[m].add("active-microphone-icon");
          break;
        case "command":
          t[m].remove("active-microphone-icon", "default-microphone-icon"), t[m].add("command-microphone-icon");
          break;
      }
  }
}
function Ah(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ui = {}, Hn = {}, $n = {}, qn = {}, Gn = {}, ao;
function xs() {
  if (ao) return Gn;
  ao = 1, Object.defineProperty(Gn, "__esModule", { value: !0 }), Gn.Text = void 0;
  class s {
    static capitalize(t) {
      return t.replace(s.FIRST_CHAR_REGEX, (n) => n.toUpperCase());
    }
    static lineBreak(t) {
      return t.replace(s.DOUBLE_LINE, "<p></p>").replace(s.ONE_LINE, "<br>");
    }
    static isCharDefined(t) {
      return t !== void 0 && t !== " " && t !== " " && t !== `
` && t !== "";
    }
    static breakupIntoWordsArr(t) {
      return t.split(/(\W+)/);
    }
  }
  return Gn.Text = s, s.FIRST_CHAR_REGEX = /\S/, s.DOUBLE_LINE = /\n\n/g, s.ONE_LINE = /\n/g, Gn;
}
var co;
function la() {
  if (co) return qn;
  co = 1, Object.defineProperty(qn, "__esModule", { value: !0 }), qn.Translate = void 0;
  const s = xs();
  class e {
    static translate(n, i) {
      const r = s.Text.breakupIntoWordsArr(n);
      for (let o = 0; o < r.length; o += 1)
        i[r[o]] && (r[o] = i[r[o]]);
      return r.join("");
    }
  }
  return qn.Translate = e, qn;
}
var lo;
function Th() {
  if (lo) return $n;
  lo = 1, Object.defineProperty($n, "__esModule", { value: !0 }), $n.WebSpeechTranscript = void 0;
  const s = la();
  class e {
    static extract(n, i, r) {
      let o = "";
      for (let a = n.resultIndex; a < n.results.length; ++a) {
        let c = n.results[a][0].transcript;
        r && (c = s.Translate.translate(c, r)), n.results[a].isFinal ? i += c : o += c;
      }
      return { interimTranscript: o, finalTranscript: i, newText: o || i };
    }
    static extractSafari(n, i, r) {
      let o = "";
      for (let c = n.resultIndex; c < n.results.length; ++c) {
        let l = n.results[c][0].transcript;
        r && (l = s.Translate.translate(l, r)), o += l;
      }
      return { interimTranscript: "", finalTranscript: o, newText: o };
    }
  }
  return $n.WebSpeechTranscript = e, $n;
}
var zn = {}, ho;
function xr() {
  if (ho) return zn;
  ho = 1, Object.defineProperty(zn, "__esModule", { value: !0 }), zn.Browser = void 0;
  class s {
  }
  return zn.Browser = s, s.IS_SAFARI = () => (s._IS_SAFARI === void 0 && (s._IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)), s._IS_SAFARI), zn;
}
var Vn = {}, Wn = {}, uo;
function Rh() {
  if (uo) return Wn;
  uo = 1, Object.defineProperty(Wn, "__esModule", { value: !0 }), Wn.EventListeners = void 0;
  class s {
    static getElementIfFocusedOnAvailable(t, n) {
      return Array.isArray(t) ? t.find((i) => n === i) : n === t ? t : void 0;
    }
    static keyDownWindow(t) {
      t.element && s.getElementIfFocusedOnAvailable(t.element, document.activeElement) && (s.KEY_DOWN_TIMEOUT !== null && clearTimeout(s.KEY_DOWN_TIMEOUT), s.KEY_DOWN_TIMEOUT = setTimeout(() => {
        s.KEY_DOWN_TIMEOUT = null, this.resetRecording(t);
      }, 500));
    }
    static mouseDownWindow(t, n) {
      this.mouseDownElement = s.getElementIfFocusedOnAvailable(t, n.target);
    }
    static mouseUpWindow(t) {
      this.mouseDownElement && this.resetRecording(t), this.mouseDownElement = void 0;
    }
    static add(t, n) {
      const i = (n == null ? void 0 : n.insertInCursorLocation) === void 0 || (n == null ? void 0 : n.insertInCursorLocation);
      n != null && n.element && i && (t.mouseDownEvent = s.mouseDownWindow.bind(t, n.element), document.addEventListener("mousedown", t.mouseDownEvent), t.mouseUpEvent = s.mouseUpWindow.bind(t, n), document.addEventListener("mouseup", t.mouseUpEvent), t.keyDownEvent = s.keyDownWindow.bind(t, n), document.addEventListener("keydown", t.keyDownEvent));
    }
    static remove(t) {
      document.removeEventListener("mousedown", t.mouseDownEvent), document.removeEventListener("mouseup", t.mouseUpEvent), document.removeEventListener("keydown", t.keyDownEvent);
    }
  }
  return Wn.EventListeners = s, s.KEY_DOWN_TIMEOUT = null, Wn;
}
var Kn = {}, po;
function Ih() {
  if (po) return Kn;
  po = 1, Object.defineProperty(Kn, "__esModule", { value: !0 }), Kn.PreResultUtils = void 0;
  class s {
    static process(t, n, i, r, o) {
      const a = r == null ? void 0 : r(n, i);
      return a ? (setTimeout(() => {
        a.restart ? t.resetRecording(o) : a.stop && t.stop();
      }), (a.stop || a.restart) && a.removeNewText) : !1;
    }
  }
  return Kn.PreResultUtils = s, Kn;
}
var jn = {}, Xn = {}, fo;
function da() {
  if (fo) return Xn;
  fo = 1, Object.defineProperty(Xn, "__esModule", { value: !0 }), Xn.AutoScroll = void 0;
  class s {
    static changeStateIfNeeded(t, n) {
      n && !t.isCursorAtEnd && (t.endPadding = "", t.scrollingSpan.innerHTML = "&nbsp;");
    }
    static scrollGeneric(t, n) {
      t.isCursorAtEnd ? n.scrollTop = n.scrollHeight : t.scrollingSpan.scrollIntoView({ block: "nearest" });
    }
    // primitives don't need to be scrolled except in safari
    // they can only safely be scrolled to the end
    static scrollSafariPrimitiveToEnd(t) {
      t.scrollLeft = t.scrollWidth, t.scrollTop = t.scrollHeight;
    }
    static isElementOverflown(t) {
      return t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth;
    }
    static isRequired(t, n) {
      return t && s.isElementOverflown(n);
    }
  }
  return Xn.AutoScroll = s, Xn;
}
var Yn = {}, mo;
function ws() {
  if (mo) return Yn;
  mo = 1, Object.defineProperty(Yn, "__esModule", { value: !0 }), Yn.Elements = void 0;
  class s {
    static isPrimitiveElement(t) {
      return t.tagName === "INPUT" || t.tagName === "TEXTAREA";
    }
    static createInterimSpan() {
      const t = document.createElement("span");
      return t.style.color = "grey", t.style.pointerEvents = "none", t;
    }
    static createGenericSpan() {
      const t = document.createElement("span");
      return t.style.pointerEvents = "none", t;
    }
    static appendSpans(t, n) {
      if (t.spansPopulated = !0, t.insertInCursorLocation && document.activeElement === n) {
        const i = window.getSelection();
        if (i != null && i.focusNode) {
          const r = i.getRangeAt(0);
          r.insertNode(t.scrollingSpan), r.insertNode(t.interimSpan), r.insertNode(t.finalSpan), r.collapse(!1), i.removeAllRanges(), i.addRange(r);
          return;
        }
      }
      n.appendChild(t.finalSpan), n.appendChild(t.interimSpan), n.appendChild(t.scrollingSpan);
    }
    static applyCustomColors(t, n) {
      n.interim && (t.interimSpan.style.color = n.interim), n.final && (t.finalSpan.style.color = n.final);
    }
    static isInsideShadowDOM(t) {
      return t.getRootNode() instanceof ShadowRoot;
    }
  }
  return Yn.Elements = s, Yn;
}
var Zn = {}, go;
function As() {
  if (go) return Zn;
  go = 1, Object.defineProperty(Zn, "__esModule", { value: !0 }), Zn.Cursor = void 0;
  class s {
    static setOffsetForGeneric(t, n, i = 0) {
      let r = 0;
      for (let o = 0; o < t.childNodes.length; o += 1) {
        const a = t.childNodes[o];
        if (a.childNodes.length > 0) {
          const c = s.setOffsetForGeneric(a, n, i);
          if (c === -1)
            return -1;
          i += c;
        } else if (a.textContent !== null) {
          if (i + a.textContent.length > n) {
            const c = document.createRange();
            c.setStart(a, n - i), c.collapse(!0);
            const l = window.getSelection();
            return l == null || l.removeAllRanges(), l == null || l.addRange(c), t.focus(), -1;
          }
          i += a.textContent.length, r += a.textContent.length;
        }
      }
      return r;
    }
    static focusEndOfGeneric(t) {
      const n = document.createRange();
      n.selectNodeContents(t), n.collapse(!1);
      const i = window.getSelection();
      i && (i.removeAllRanges(), i.addRange(n));
    }
    static setOffsetForSafariGeneric(t, n) {
      const i = window.getSelection();
      if (i) {
        const r = s.getGenericElementCursorOffset(t, i, !0);
        s.setOffsetForGeneric(t, r + n);
      }
    }
    // set to automatically scroll to cursor (scroll does not work in Safari)
    static setOffsetForPrimitive(t, n, i) {
      i && t.blur(), t.setSelectionRange(n, n), t.focus();
    }
    // Scroll Input in Safari - does not work for TextArea and uses span which can have a different style
    // private static getCursorOffsetFromLeft(inputElement: HTMLInputElement, position: number) {
    //   // Get the value of the input element up to the cursor position
    //   const valueUpToCursor = inputElement.value.substring(0, position);
    //   // Create a temporary span element to measure the width of the text
    //   const tempSpan = document.createElement('span');
    //   tempSpan.textContent = valueUpToCursor;
    //   tempSpan.style.visibility = 'hidden';
    //   tempSpan.style.position = 'absolute';
    //   document.body.appendChild(tempSpan);
    //   // Measure the width of the text up to the cursor position
    //   const offsetWidth = tempSpan.offsetWidth;
    //   const offsetHeight = tempSpan.offsetHeight;
    //   // Clean up the temporary span element
    //   document.body.removeChild(tempSpan);
    //   return {left: offsetWidth, top: offsetHeight};
    // }
    static getGenericElementCursorOffset(t, n, i) {
      let r = 0;
      if (n.rangeCount > 0) {
        const o = n.getRangeAt(0), a = o.cloneRange();
        a.selectNodeContents(t), i ? a.setEnd(o.startContainer, o.startOffset) : a.setEnd(o.endContainer, o.endOffset), r = a.toString().length;
      }
      return r;
    }
  }
  return Zn.Cursor = s, Zn;
}
var bo;
function ha() {
  if (bo) return jn;
  bo = 1, Object.defineProperty(jn, "__esModule", { value: !0 }), jn.CommandUtils = void 0;
  const s = da(), e = ws(), t = xr(), n = As(), i = xs();
  class r {
    static processCommand(a, c) {
      return (!c || !c.caseSensitive) && (a = a.toLowerCase()), (c == null ? void 0 : c.substrings) === !1 ? i.Text.breakupIntoWordsArr(a) : a;
    }
    static process(a) {
      var c;
      return ((c = a.settings) === null || c === void 0 ? void 0 : c.caseSensitive) === !0 ? a : Object.keys(a).reduce((d, p) => {
        const u = a[p];
        return d[p] = typeof u == "string" ? r.processCommand(u, a.settings) : u, d;
      }, {});
    }
    static toggleCommandModeOn(a) {
      var c;
      a.isWaitingForCommand = !0, (c = a.onCommandModeTrigger) === null || c === void 0 || c.call(a, !0);
    }
    static toggleCommandModeOff(a) {
      var c;
      a.isWaitingForCommand && ((c = a.onCommandModeTrigger) === null || c === void 0 || c.call(a, !1), a.isWaitingForCommand = !1);
    }
    static setText(a, c, l, d) {
      r.toggleCommandModeOff(a), e.Elements.isPrimitiveElement(d) ? (d.value = l, a.isTargetInShadow || n.Cursor.setOffsetForPrimitive(d, l.length, !0), t.Browser.IS_SAFARI() && a.autoScroll && s.AutoScroll.scrollSafariPrimitiveToEnd(d)) : (d.textContent = l, a.isTargetInShadow || n.Cursor.focusEndOfGeneric(d), setTimeout(() => s.AutoScroll.scrollGeneric(a, d))), a.resetRecording(c);
    }
    static checkIfMatchesSubstring(a, c) {
      return c.includes(a);
    }
    static checkIfMatchesWord(a, c, l) {
      const d = a;
      for (let p = l.length - 1; p >= 0; p -= 1) {
        let u = p, g = d.length - 1;
        for (; l[u] === d[g] && g >= 0; )
          u -= 1, g -= 1;
        if (g < 0)
          return !0;
      }
      return !1;
    }
    // prettier-ignore
    static execCommand(a, c, l, d, p) {
      var u, g, _;
      const y = a.commands;
      if (!y || !d || !l)
        return;
      const S = ((u = y.settings) === null || u === void 0 ? void 0 : u.caseSensitive) === !0 ? c : c.toLowerCase(), M = i.Text.breakupIntoWordsArr(S), K = ((g = y.settings) === null || g === void 0 ? void 0 : g.substrings) === !1 ? r.checkIfMatchesWord : r.checkIfMatchesSubstring;
      if (y.commandMode && K(y.commandMode, S, M))
        return a.setInterimColorToFinal(), setTimeout(() => r.toggleCommandModeOn(a)), { doNotProcessTranscription: !1 };
      if (!(y.commandMode && !a.isWaitingForCommand)) {
        if (y.stop && K(y.stop, S, M))
          return r.toggleCommandModeOff(a), setTimeout(() => a.stop()), { doNotProcessTranscription: !1 };
        if (y.pause && K(y.pause, S, M))
          return r.toggleCommandModeOff(a), a.setInterimColorToFinal(), setTimeout(() => {
            var ie;
            a.isPaused = !0, (ie = a.onPauseTrigger) === null || ie === void 0 || ie.call(a, !0);
          }), { doNotProcessTranscription: !1 };
        if (y.resume && K(y.resume, S, M))
          return a.isPaused = !1, (_ = a.onPauseTrigger) === null || _ === void 0 || _.call(a, !1), r.toggleCommandModeOff(a), a.resetRecording(l), { doNotProcessTranscription: !0 };
        if (y.reset && K(y.reset, S, M))
          return p !== void 0 && r.setText(a, l, p, d), { doNotProcessTranscription: !0 };
        if (y.removeAllText && K(y.removeAllText, S, M))
          return r.setText(a, l, "", d), { doNotProcessTranscription: !0 };
      }
    }
  }
  return jn.CommandUtils = r, jn;
}
var Jn = {}, _o;
function Mh() {
  if (_o) return Jn;
  _o = 1, Object.defineProperty(Jn, "__esModule", { value: !0 }), Jn.Highlight = void 0;
  const s = ws(), e = As();
  class t {
    static setStateForPrimitive(i, r) {
      let o, a;
      r.selectionStart !== null && (o = r.selectionStart), r.selectionEnd !== null && (a = r.selectionEnd), i.isHighlighted = o !== a;
    }
    static setStateForGeneric(i, r) {
      const o = window.getSelection();
      if (o != null && o.focusNode) {
        const a = e.Cursor.getGenericElementCursorOffset(r, o, !0), c = e.Cursor.getGenericElementCursorOffset(r, o, !1);
        i.isHighlighted = a !== c;
      }
    }
    static setState(i, r) {
      document.activeElement === r && (s.Elements.isPrimitiveElement(r) ? t.setStateForPrimitive(i, r) : t.setStateForGeneric(i, r));
    }
    static removeForGeneric(i, r) {
      const o = window.getSelection();
      if (o) {
        const a = e.Cursor.getGenericElementCursorOffset(r, o, !0);
        o.deleteFromDocument(), e.Cursor.setOffsetForGeneric(r, a), i.isHighlighted = !1;
      }
    }
    static removeForPrimitive(i, r) {
      const o = r.selectionStart, a = r.selectionEnd, c = r.value;
      if (o && a) {
        const l = c.substring(0, o) + c.substring(a);
        r.value = l, e.Cursor.setOffsetForPrimitive(r, o, i.autoScroll);
      }
      i.isHighlighted = !1;
    }
  }
  return Jn.Highlight = t, Jn;
}
var Qn = {}, yo;
function kh() {
  if (yo) return Qn;
  yo = 1, Object.defineProperty(Qn, "__esModule", { value: !0 }), Qn.Padding = void 0;
  const s = ws(), e = As(), t = xs();
  class n {
    static setStateForPrimitiveElement(r, o) {
      if (document.activeElement === o && o.selectionStart !== null) {
        const c = o.selectionStart, l = o.value[c - 1], d = o.selectionEnd === null ? c : o.selectionEnd, p = o.value[d];
        t.Text.isCharDefined(l) && (r.startPadding = " ", r.numberOfSpacesBeforeNewText = 1), t.Text.isCharDefined(p) && (r.endPadding = " ", r.numberOfSpacesAfterNewText = 1), r.isCursorAtEnd = o.value.length === d;
        return;
      }
      const a = o.value[o.value.length - 1];
      t.Text.isCharDefined(a) && (r.startPadding = " ", r.numberOfSpacesBeforeNewText = 1), r.isCursorAtEnd = !0;
    }
    static setStateForGenericElement(r, o) {
      var a, c, l;
      if (document.activeElement === o) {
        const p = window.getSelection();
        if (p != null && p.focusNode) {
          const u = e.Cursor.getGenericElementCursorOffset(o, p, !0), g = (a = o.textContent) === null || a === void 0 ? void 0 : a[u - 1], _ = e.Cursor.getGenericElementCursorOffset(o, p, !1), y = (c = o.textContent) === null || c === void 0 ? void 0 : c[_];
          t.Text.isCharDefined(g) && (r.startPadding = " "), t.Text.isCharDefined(y) && (r.endPadding = " "), r.isCursorAtEnd = ((l = o.textContent) === null || l === void 0 ? void 0 : l.length) === _;
          return;
        }
      }
      const d = o.innerText.charAt(o.innerText.length - 1);
      t.Text.isCharDefined(d) && (r.startPadding = " "), r.isCursorAtEnd = !0;
    }
    static setState(r, o) {
      s.Elements.isPrimitiveElement(o) ? n.setStateForPrimitiveElement(r, o) : n.setStateForGenericElement(r, o);
    }
    static adjustStateAfterRecodingPrimitiveElement(r, o) {
      if (r.primitiveTextRecorded = !0, r.insertInCursorLocation && document.activeElement === o && (o.selectionEnd !== null && (r.endPadding = r.endPadding + o.value.slice(o.selectionEnd)), o.selectionStart !== null)) {
        r.startPadding = o.value.slice(0, o.selectionStart) + r.startPadding;
        return;
      }
      r.startPadding = o.value + r.startPadding;
    }
    static adjustSateForNoTextPrimitiveElement(r) {
      r.numberOfSpacesBeforeNewText === 1 && (r.startPadding = r.startPadding.substring(0, r.startPadding.length - 1), r.numberOfSpacesBeforeNewText = 0), r.numberOfSpacesAfterNewText === 1 && (r.endPadding = r.endPadding.substring(1), r.numberOfSpacesAfterNewText = 0);
    }
  }
  return Qn.Padding = n, Qn;
}
var Eo;
function ua() {
  if (Eo) return Vn;
  Eo = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.Speech = void 0;
  const s = Rh(), e = Ih(), t = ha(), n = da(), i = Mh(), r = ws(), o = kh(), a = xr(), c = As(), l = xs();
  class d {
    constructor() {
      this.finalTranscript = "", this.interimSpan = r.Elements.createInterimSpan(), this.finalSpan = r.Elements.createGenericSpan(), this.scrollingSpan = r.Elements.createGenericSpan(), this.isCursorAtEnd = !1, this.spansPopulated = !1, this.startPadding = "", this.endPadding = "", this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.recognizing = !1, this._displayInterimResults = !0, this.insertInCursorLocation = !0, this.autoScroll = !0, this.isRestarting = !1, this.isPaused = !1, this.isWaitingForCommand = !1, this.isTargetInShadow = !1, this.cannotBeStopped = !1, this.resetState();
    }
    prepareBeforeStart(u) {
      var g, _;
      if (u != null && u.element)
        if (s.EventListeners.add(this, u), Array.isArray(u.element)) {
          const S = u.element.find((M) => M === document.activeElement) || u.element[0];
          if (!S)
            return;
          this.prepare(S);
        } else
          this.prepare(u.element);
      (u == null ? void 0 : u.displayInterimResults) !== void 0 && (this._displayInterimResults = u.displayInterimResults), u != null && u.textColor && (this._finalTextColor = (g = u == null ? void 0 : u.textColor) === null || g === void 0 ? void 0 : g.final, r.Elements.applyCustomColors(this, u.textColor)), (u == null ? void 0 : u.insertInCursorLocation) !== void 0 && (this.insertInCursorLocation = u.insertInCursorLocation), (u == null ? void 0 : u.autoScroll) !== void 0 && (this.autoScroll = u.autoScroll), this._onResult = u == null ? void 0 : u.onResult, this._onPreResult = u == null ? void 0 : u.onPreResult, this._onStart = u == null ? void 0 : u.onStart, this._onStop = u == null ? void 0 : u.onStop, this._onError = u == null ? void 0 : u.onError, this.onCommandModeTrigger = u == null ? void 0 : u.onCommandModeTrigger, this.onPauseTrigger = u == null ? void 0 : u.onPauseTrigger, this._options = u, !((_ = this._options) === null || _ === void 0) && _.commands && (this.commands = t.CommandUtils.process(this._options.commands));
    }
    prepare(u) {
      o.Padding.setState(this, u), i.Highlight.setState(this, u), this.isTargetInShadow = r.Elements.isInsideShadowDOM(u), r.Elements.isPrimitiveElement(u) ? (this._primitiveElement = u, this._originalText = this._primitiveElement.value) : (this._genericElement = u, this._originalText = this._genericElement.textContent);
    }
    // there was an attempt to optimize this by not having to restart the service and just reset state:
    // unfortunately it did not work because the service would still continue firing the intermediate and final results
    // into the new position
    resetRecording(u) {
      this.isRestarting = !0, this.stop(!0), this.resetState(!0), this.start(u, !0);
    }
    // prettier-ignore
    updateElements(u, g, _) {
      var y;
      const S = l.Text.capitalize(g);
      if (this.finalTranscript === S && u === "")
        return;
      e.PreResultUtils.process(this, _, u === "", this._onPreResult, this._options) && (u = "", _ = "");
      const M = this.commands && t.CommandUtils.execCommand(this, _, this._options, this._primitiveElement || this._genericElement, this._originalText);
      if (M) {
        if (M.doNotProcessTranscription)
          return;
        u = "", _ = "";
      }
      if (this.isPaused || this.isWaitingForCommand)
        return;
      (y = this._onResult) === null || y === void 0 || y.call(this, _, u === ""), this.finalTranscript = S, this._displayInterimResults || (u = "");
      const K = this.finalTranscript === "" && u === "";
      this._primitiveElement ? this.updatePrimitiveElement(this._primitiveElement, u, K) : this._genericElement && this.updateGenericElement(this._genericElement, u, K);
    }
    // prettier-ignore
    // remember that padding values here contain actual text left and right
    updatePrimitiveElement(u, g, _) {
      this.isHighlighted && i.Highlight.removeForPrimitive(this, u), this.primitiveTextRecorded || o.Padding.adjustStateAfterRecodingPrimitiveElement(this, u), _ && o.Padding.adjustSateForNoTextPrimitiveElement(this);
      const y = this.startPadding + this.finalTranscript + g;
      if (u.value = y + this.endPadding, !this.isTargetInShadow) {
        const S = y.length + this.numberOfSpacesAfterNewText;
        c.Cursor.setOffsetForPrimitive(u, S, this.autoScroll);
      }
      this.autoScroll && a.Browser.IS_SAFARI() && this.isCursorAtEnd && n.AutoScroll.scrollSafariPrimitiveToEnd(u);
    }
    updateGenericElement(u, g, _) {
      this.isHighlighted && i.Highlight.removeForGeneric(this, u), this.spansPopulated || r.Elements.appendSpans(this, u);
      const y = (_ ? "" : this.startPadding) + l.Text.lineBreak(this.finalTranscript);
      this.finalSpan.innerHTML = y;
      const S = n.AutoScroll.isRequired(this.autoScroll, u);
      n.AutoScroll.changeStateIfNeeded(this, S);
      const M = l.Text.lineBreak(g) + (_ ? "" : this.endPadding);
      this.interimSpan.innerHTML = M, a.Browser.IS_SAFARI() && this.insertInCursorLocation && c.Cursor.setOffsetForSafariGeneric(u, y.length + M.length), S && n.AutoScroll.scrollGeneric(this, u), _ && (this.scrollingSpan.innerHTML = "");
    }
    finalise(u) {
      this._genericElement && (u ? (this.finalSpan = r.Elements.createGenericSpan(), this.setInterimColorToFinal(), this.interimSpan = r.Elements.createInterimSpan(), this.scrollingSpan = r.Elements.createGenericSpan()) : this._genericElement.textContent = this._genericElement.textContent, this.spansPopulated = !1), s.EventListeners.remove(this);
    }
    setInterimColorToFinal() {
      this.interimSpan.style.color = this._finalTextColor || "black";
    }
    resetState(u) {
      this._primitiveElement = void 0, this._genericElement = void 0, this.finalTranscript = "", this.finalSpan.innerHTML = "", this.interimSpan.innerHTML = "", this.scrollingSpan.innerHTML = "", this.startPadding = "", this.endPadding = "", this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, u || (this.stopTimeout = void 0);
    }
    setStateOnStart() {
      var u;
      this.recognizing = !0, this.isRestarting ? this.isRestarting = !1 : (u = this._onStart) === null || u === void 0 || u.call(this);
    }
    setStateOnStop() {
      var u;
      this.recognizing = !1, this.isRestarting || (u = this._onStop) === null || u === void 0 || u.call(this);
    }
    setStateOnError(u) {
      var g;
      (g = this._onError) === null || g === void 0 || g.call(this, u), this.recognizing = !1;
    }
  }
  return Vn.Speech = d, Vn;
}
var vo;
function Ph() {
  if (vo) return Hn;
  vo = 1, Object.defineProperty(Hn, "__esModule", { value: !0 }), Hn.WebSpeech = void 0;
  const s = Th(), e = xr(), t = ua();
  class n extends t.Speech {
    constructor() {
      super();
    }
    start(r) {
      var o;
      this._extractText === void 0 && (this._extractText = e.Browser.IS_SAFARI() ? s.WebSpeechTranscript.extractSafari : s.WebSpeechTranscript.extract), this.validate() && (this.prepareBeforeStart(r), this.instantiateService(r), (o = this._service) === null || o === void 0 || o.start(), this._translations = r == null ? void 0 : r.translations);
    }
    validate() {
      return n.getAPI() ? !0 : (this.error("Speech Recognition is unsupported"), !1);
    }
    instantiateService(r) {
      var o, a;
      const c = n.getAPI();
      this._service = new c(), this._service.continuous = !0, this._service.interimResults = (o = r == null ? void 0 : r.displayInterimResults) !== null && o !== void 0 ? o : !0, this._service.lang = ((a = r == null ? void 0 : r.language) === null || a === void 0 ? void 0 : a.trim()) || "en-US", this.setEvents();
    }
    setEvents() {
      this._service && (this._service.onstart = () => {
        this.setStateOnStart();
      }, this._service.onerror = (r) => {
        e.Browser.IS_SAFARI() && r.message === "Another request is started" || r.error === "aborted" && this.isRestarting || r.error !== "no-speech" && this.error(r.message || r.error);
      }, this._service.onaudioend = () => {
        this.setStateOnStop();
      }, this._service.onend = () => {
        this._stopping = !1;
      }, this._service.onresult = (r) => {
        if (typeof r.results > "u" && this._service)
          this._service.onend = null, this._service.stop();
        else if (this._extractText && !this._stopping) {
          const { interimTranscript: o, finalTranscript: a, newText: c } = this._extractText(r, this.finalTranscript, this._translations);
          this.updateElements(o, a, c);
        }
      });
    }
    stop(r) {
      var o;
      this._stopping = !0, (o = this._service) === null || o === void 0 || o.stop(), this.finalise(r);
    }
    static getAPI() {
      return window.webkitSpeechRecognition || window.SpeechRecognition;
    }
    error(r) {
      console.error(r), this.setStateOnError(r), this.stop();
    }
  }
  return Hn.WebSpeech = n, Hn;
}
var ei = {}, So;
function Lh() {
  if (So) return ei;
  So = 1, Object.defineProperty(ei, "__esModule", { value: !0 }), ei.GlobalState = void 0;
  class s {
    static doubleClickDetector() {
      return s.doubleClickPending ? !0 : (s.doubleClickPending = !0, setTimeout(() => {
        s.doubleClickPending = !1;
      }, 300), !1);
    }
  }
  return ei.GlobalState = s, s.doubleClickPending = !1, ei;
}
var ti = {}, ni = {}, Co;
function Oh() {
  if (Co) return ni;
  Co = 1, Object.defineProperty(ni, "__esModule", { value: !0 }), ni.PreventConnectionStop = void 0;
  class s {
    static applyPrevention(t) {
      clearTimeout(t._manualConnectionStopPrevention), t.cannotBeStopped = !0, t._manualConnectionStopPrevention = setTimeout(() => {
        t.cannotBeStopped = !1;
      }, 800);
    }
    static clearPrevention(t) {
      clearTimeout(t._manualConnectionStopPrevention), t.cannotBeStopped = !1;
    }
  }
  return ni.PreventConnectionStop = s, ni;
}
var ii = {}, si = {}, xo;
function Nh() {
  return xo || (xo = 1, Object.defineProperty(si, "__esModule", { value: !0 }), si.README_URL = void 0, si.README_URL = "https://github.com/OvidijusParsiunas/speech-to-element"), si;
}
var wo;
function Bh() {
  if (wo) return ii;
  wo = 1, Object.defineProperty(ii, "__esModule", { value: !0 }), ii.AzureSpeechConfig = void 0;
  const s = Nh();
  class e {
    static validateOptions(n, i) {
      return i ? !i.subscriptionKey && !i.token && !i.retrieveToken ? (n(`Please define a 'subscriptionKey', 'token' or 'retrieveToken' property - more info: ${s.README_URL}`), !1) : i.region ? !0 : (n(`Please define a 'region' property - more info: ${s.README_URL}`), !1) : (n(`Please provide subscription details - more info: ${s.README_URL}`), !1);
    }
    static async getNewSpeechConfig(n, i) {
      if (i.region)
        return i.subscriptionKey ? n.fromSubscription(i.subscriptionKey.trim(), i.region.trim()) : i.token ? n.fromAuthorizationToken(i.token.trim(), i.region.trim()) : i.retrieveToken ? i.retrieveToken().then((r) => i.region ? n.fromAuthorizationToken((r == null ? void 0 : r.trim()) || "", i.region.trim()) : null).catch((r) => (console.error(r), null)) : null;
    }
    static process(n, i) {
      i.endpointId && (n.endpointId = i.endpointId.trim()), i.language && (n.speechRecognitionLanguage = i.language.trim());
    }
    static async get(n, i) {
      const r = await e.getNewSpeechConfig(n, i);
      return r && e.process(r, i), r;
    }
  }
  return ii.AzureSpeechConfig = e, ii;
}
var ri = {}, Ao;
function Dh() {
  if (Ao) return ri;
  Ao = 1, Object.defineProperty(ri, "__esModule", { value: !0 }), ri.StopTimeout = void 0;
  class s {
    static set(t) {
      t.stopTimeout = setTimeout(() => t.stop(), t.stopTimeoutMS);
    }
    static reset(t, n) {
      t.stopTimeoutMS = n || s.DEFAULT_MS, s.stop(t), s.set(t);
    }
    static stop(t) {
      t.stopTimeout && clearTimeout(t.stopTimeout);
    }
  }
  return ri.StopTimeout = s, s.DEFAULT_MS = 2e4, ri;
}
var oi = {}, To;
function Fh() {
  if (To) return oi;
  To = 1, Object.defineProperty(oi, "__esModule", { value: !0 }), oi.AzureAudioConfig = void 0;
  class s {
    static get(t, n) {
      return n ? t.fromMicrophoneInput(n) : t.fromDefaultMicrophoneInput();
    }
  }
  return oi.AzureAudioConfig = s, oi;
}
var ai = {}, Ro;
function Uh() {
  if (Ro) return ai;
  Ro = 1, Object.defineProperty(ai, "__esModule", { value: !0 }), ai.AzureTranscript = void 0;
  const s = la();
  class e {
    // newText is used to only send new text in onResult as finalTranscript is continuously accumulated
    static extract(n, i, r, o) {
      return o && (n = s.Translate.translate(n, o)), r ? { interimTranscript: "", finalTranscript: i + n, newText: n } : { interimTranscript: n, finalTranscript: i, newText: n };
    }
  }
  return ai.AzureTranscript = e, ai;
}
var Io;
function Hh() {
  if (Io) return ti;
  Io = 1, Object.defineProperty(ti, "__esModule", { value: !0 }), ti.Azure = void 0;
  const s = Oh(), e = Bh(), t = Dh(), n = Fh(), i = Uh(), r = ua();
  class o extends r.Speech {
    constructor() {
      super(...arguments), this._newTextPadding = "";
    }
    start(c, l) {
      this._newTextPadding = "", this.stopTimeout === void 0 && t.StopTimeout.reset(this, c == null ? void 0 : c.stopAfterSilenceMs), this.prepareBeforeStart(c), this.startAsync(c), l || s.PreventConnectionStop.applyPrevention(this);
    }
    async startAsync(c) {
      var l;
      this.validate(c) && (await this.instantiateService(c), this._translations = c == null ? void 0 : c.translations, (l = this._service) === null || l === void 0 || l.startContinuousRecognitionAsync(() => {
      }, this.error));
    }
    validate(c) {
      return o.getAPI() ? e.AzureSpeechConfig.validateOptions(this.error.bind(this), c) : (this.moduleNotFound(), !1);
    }
    async instantiateService(c) {
      const l = o.getAPI(), d = n.AzureAudioConfig.get(l.AudioConfig, c.deviceId), p = await e.AzureSpeechConfig.get(l.SpeechConfig, c);
      if (p) {
        let u;
        if (c.autoLanguage && c.autoLanguage.languages.length > 0) {
          const { type: g, languages: _ } = c.autoLanguage, y = _.slice(0, g === "Continuous" ? 10 : 4), S = l.AutoDetectSourceLanguageConfig.fromLanguages(y);
          g === "Continuous" && (S.mode = 1), u = l.SpeechRecognizer.FromConfig(p, S, d);
        } else
          u = new l.SpeechRecognizer(p, d);
        this.setEvents(u), this._service = u, c.retrieveToken && this.retrieveTokenInterval(c.retrieveToken);
      } else
        this.error("Unable to contact Azure server");
    }
    setEvents(c) {
      c.recognizing = this.onRecognizing.bind(this), c.recognized = this.onRecognized.bind(this), c.sessionStarted = this.onSessionStarted.bind(this), c.canceled = this.onCanceled.bind(this), c.sessionStopped = this.onSessionStopped.bind(this);
    }
    // prettier-ignore
    onRecognizing(c, l) {
      if (this._stopping)
        return;
      const { interimTranscript: d, finalTranscript: p, newText: u } = i.AzureTranscript.extract(this._newTextPadding + l.result.text, this.finalTranscript, !1, this._translations);
      t.StopTimeout.reset(this, this.stopTimeoutMS), this.updateElements(d, p, u);
    }
    // prettier-ignore
    onRecognized(c, l) {
      const d = l.result;
      switch (d.reason) {
        case window.SpeechSDK.ResultReason.Canceled:
          break;
        case window.SpeechSDK.ResultReason.RecognizedSpeech:
          if (d.text && !this._stopping) {
            const { interimTranscript: p, finalTranscript: u, newText: g } = i.AzureTranscript.extract(this._newTextPadding + d.text, this.finalTranscript, !0, this._translations);
            t.StopTimeout.reset(this, this.stopTimeoutMS), this.updateElements(p, u, g), u !== "" && (this._newTextPadding = " ");
          }
          break;
      }
    }
    onCanceled(c, l) {
      l.reason === window.SpeechSDK.CancellationReason.Error && this.error(l.errorDetails);
    }
    onSessionStarted() {
      s.PreventConnectionStop.clearPrevention(this), this.setStateOnStart();
    }
    onSessionStopped() {
      this._retrieveTokenInterval || clearInterval(this._retrieveTokenInterval), this._stopping = !1, this.setStateOnStop();
    }
    retrieveTokenInterval(c) {
      this._retrieveTokenInterval = setInterval(() => {
        c == null || c().then((l) => {
          this._service && (this._service.authorizationToken = (l == null ? void 0 : l.trim()) || "");
        }).catch((l) => {
          this.error(l);
        });
      }, 1e4);
    }
    stop(c) {
      var l;
      !c && this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), this._stopping = !0, (l = this._service) === null || l === void 0 || l.stopContinuousRecognitionAsync(), t.StopTimeout.stop(this), this.finalise(c);
    }
    static getAPI() {
      return window.SpeechSDK;
    }
    moduleNotFound() {
      console.error("speech recognition module not found:"), console.error(`please install the 'microsoft-cognitiveservices-speech-sdk' npm package or add a script tag: <script src="https://aka.ms/csspeech/jsbrowserpackageraw"><\/script>`), this.setStateOnError("speech recognition module not found");
    }
    error(c) {
      this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), console.error(c), this.setStateOnError(c), this.stop();
    }
  }
  return ti.Azure = o, ti;
}
var Mo;
function $h() {
  if (Mo) return Ui;
  Mo = 1, Object.defineProperty(Ui, "__esModule", { value: !0 });
  const s = Ph(), e = ha(), t = Lh(), n = Hh();
  class i {
    static toggle(o, a) {
      var c, l;
      const d = o.toLocaleLowerCase().trim();
      !((c = t.GlobalState.service) === null || c === void 0) && c.recognizing ? this.stop() : d === "webspeech" ? i.startWebSpeech(a) : d === "azure" ? i.startAzure(a) : (console.error("service not found - must be either 'webspeech' or 'azure'"), (l = a == null ? void 0 : a.onError) === null || l === void 0 || l.call(a, "service not found - must be either 'webspeech' or 'azure'"));
    }
    static startWebSpeech(o) {
      i.stop() || (t.GlobalState.service = new s.WebSpeech(), t.GlobalState.service.start(o));
    }
    static isWebSpeechSupported() {
      return !!s.WebSpeech.getAPI();
    }
    static startAzure(o) {
      var a;
      i.stop() || !((a = t.GlobalState.service) === null || a === void 0) && a.cannotBeStopped || (t.GlobalState.service = new n.Azure(), t.GlobalState.service.start(o));
    }
    static stop() {
      var o;
      return t.GlobalState.doubleClickDetector() ? !0 : (!((o = t.GlobalState.service) === null || o === void 0) && o.recognizing && t.GlobalState.service.stop(), !1);
    }
    static endCommandMode() {
      t.GlobalState.service && e.CommandUtils.toggleCommandModeOff(t.GlobalState.service);
    }
  }
  return Ui.default = i, Ui;
}
var qh = $h();
const qi = /* @__PURE__ */ Ah(qh);
class Gh {
  constructor(e, t) {
    this._silenceMS = 2e3, this._stop = !0, typeof t == "boolean" && t === !1 && (this._stop = !1), typeof e == "number" && (this._silenceMS = e);
  }
  setSilenceTimeout(e, t) {
    this._silenceTimeout = setTimeout(() => {
      var n;
      (n = e.submit) == null || n.call(e), qi.stop(), this._stop || setTimeout(t, Ti.MICROPHONE_RESET_TIMEOUT_MS);
    }, this._silenceMS);
  }
  clearSilenceTimeout() {
    this._silenceTimeout && clearTimeout(this._silenceTimeout);
  }
  resetSilenceTimeout(e, t) {
    this.clearSilenceTimeout(), this.setSilenceTimeout(e, t);
  }
  onPause(e, t, n) {
    e ? this.resetSilenceTimeout(t, n) : this.clearSilenceTimeout();
  }
}
const Ei = class Ei extends Cs {
  constructor(e, t, n) {
    const i = typeof e.speechToText == "object" ? e.speechToText : {};
    super(i == null ? void 0 : i.button);
    const { serviceName: r, processedConfig: o } = this.processConfiguration(t, e.speechToText);
    if (this._addErrorMessage = n, r === "webspeech" && !qi.isWebSpeechSupported())
      this.changeToUnsupported();
    else {
      const a = !e.textInput || !e.textInput[$];
      V.assignButtonEvents(
        this.elementRef,
        this.buttonClick.bind(this, t, a, r, o)
      );
    }
    setTimeout(() => {
      this._validationHandler = e._validationHandler;
    });
  }
  // prettier-ignore
  processConfiguration(e, t) {
    var l;
    const n = typeof t == "object" ? t : {}, i = typeof n.webSpeech == "object" ? n.webSpeech : {}, r = n.azure || {}, o = {
      displayInterimResults: n.displayInterimResults ?? void 0,
      textColor: n.textColor ?? void 0,
      translations: n.translations ?? void 0,
      commands: n.commands ?? void 0,
      events: n.events ?? void 0,
      ...i,
      ...r
    }, a = (l = n.commands) == null ? void 0 : l.submit;
    return a && (o.onPreResult = (d) => d.toLowerCase().includes(a) ? (setTimeout(() => {
      var p;
      return (p = e.submit) == null ? void 0 : p.call(e);
    }), qi.endCommandMode(), { restart: !0, removeNewText: !0 }) : null), n.submitAfterSilence && (this._silenceSubmit = new Gh(n.submitAfterSilence, n.stopAfterSubmit)), { serviceName: Ei.getServiceName(n), processedConfig: o };
  }
  static getServiceName(e) {
    return e.azure ? "azure" : "webspeech";
  }
  buttonClick(e, t, n, i) {
    const r = i == null ? void 0 : i.events;
    e.removePlaceholderStyle(), qi.toggle(n, {
      insertInCursorLocation: !1,
      element: t ? e.inputElementRef : void 0,
      onError: () => {
        var o;
        this.onError(), (o = this._silenceSubmit) == null || o.clearSilenceTimeout();
      },
      onStart: () => {
        var o;
        this.changeToActive(), (o = r == null ? void 0 : r.onStart) == null || o.call(r);
      },
      onStop: () => {
        var o, a, c;
        (o = this._validationHandler) == null || o.call(this), (a = this._silenceSubmit) == null || a.clearSilenceTimeout(), this.changeToDefault(), (c = r == null ? void 0 : r.onStop) == null || c.call(r);
      },
      onPauseTrigger: (o) => {
        var a, c;
        (a = this._silenceSubmit) == null || a.onPause(o, e, this.elementRef.onclick), (c = r == null ? void 0 : r.onPauseTrigger) == null || c.call(r, o);
      },
      onPreResult: (o, a) => {
        var c;
        (c = r == null ? void 0 : r.onPreResult) == null || c.call(r, o, a);
      },
      onResult: (o, a) => {
        var c, l, d;
        a && ((c = this._validationHandler) == null || c.call(this)), (l = this._silenceSubmit) == null || l.resetSilenceTimeout(e, this.elementRef.onclick), (d = r == null ? void 0 : r.onResult) == null || d.call(r, o, a);
      },
      onCommandModeTrigger: (o) => {
        var a;
        this.onCommandModeTrigger(o), (a = r == null ? void 0 : r.onCommandModeTrigger) == null || a.call(r, o);
      },
      ...i
    });
  }
  onCommandModeTrigger(e) {
    e ? this.changeToCommandMode() : this.changeToActive();
  }
  onError() {
    this._addErrorMessage("speechToText", "speech input error");
  }
  static toggleSpeechAfterSubmit(e, t = !0) {
    e[Z](), t || setTimeout(() => e[Z](), Ei.MICROPHONE_RESET_TIMEOUT_MS);
  }
};
Ei.MICROPHONE_RESET_TIMEOUT_MS = 300;
let Ti = Ei;
class At {
  // prettier-ignore
  constructor(e, t, n, i, r) {
    this._attachments = [], this._fileCountLimit = 99, this._acceptedFormat = "", this._hiddenAttachments = /* @__PURE__ */ new Set(), n.maxNumberOfFiles && (this._fileCountLimit = n.maxNumberOfFiles), this._toggleContainerDisplay = i, this._fileAttachmentsContainerRef = r, n.acceptedFormats && (this._acceptedFormat = n.acceptedFormats), setTimeout(() => {
      this._validationHandler = e._validationHandler, this._onInput = t.onInput;
    });
  }
  attemptAddFile(e, t) {
    var n;
    return At.isFileTypeValid(e, this._acceptedFormat) ? (this.addAttachmentBasedOnType(e, t, !0), (n = this._onInput) == null || n.call(this, !0), !0) : !1;
  }
  static isFileTypeValid(e, t) {
    if (t === "") return !0;
    const n = t.split(",");
    for (let i = 0; i < n.length; i++) {
      const r = n[i].trim();
      if (e[E] === r)
        return !0;
      if (r.startsWith(".")) {
        const o = r.slice(1);
        if (e.name.endsWith(o))
          return !0;
      } else {
        if (e.name.endsWith(r))
          return !0;
        if (r.endsWith("/*") && e[E].startsWith(r.slice(0, -2)))
          return !0;
      }
    }
    return !1;
  }
  static getTypeFromBlob(e) {
    const { type: t } = e;
    return t.startsWith(j) ? j : t.startsWith(q) ? q : sn;
  }
  addAttachmentBasedOnType(e, t, n) {
    const i = At.getTypeFromBlob(e);
    if (i === j) {
      const r = At.createImageAttachment(t);
      this.addFileAttachment(e, j, r, n);
    } else if (i === q) {
      const r = Ri.createAudioAttachment(t);
      this.addFileAttachment(e, q, r, n);
    } else {
      const r = At.createAnyFileAttachment(e.name);
      this.addFileAttachment(e, sn, r, n);
    }
  }
  static createImageAttachment(e) {
    const t = new Image();
    return t[T] = e, t[m].add("image-attachment"), t;
  }
  static createAnyFileAttachment(e) {
    const t = x();
    t[m].add("border-bound-attachment"), $e.IS_SAFARI && t[m].add("border-bound-attachment-safari");
    const n = x();
    n[m].add("any-file-attachment-text");
    const i = x();
    return i[m].add("file-attachment-text-container"), i.appendChild(n), n.textContent = e, t.appendChild(i), t;
  }
  addFileAttachment(e, t, n, i) {
    var a;
    const r = At.createContainer(n);
    if (this._attachments.length >= this._fileCountLimit) {
      const c = this._attachments[this._attachments.length - 1].removeButton;
      c == null || c[Z]();
      const l = this._fileAttachmentsContainerRef.children;
      this._fileAttachmentsContainerRef.insertBefore(r, l[0]);
    } else
      this._fileAttachmentsContainerRef.appendChild(r);
    const o = { file: e, attachmentContainerElement: r, fileType: t };
    return i && (o.removeButton = this.createRemoveAttachmentButton(o), r.appendChild(o.removeButton)), this._toggleContainerDisplay(!0), this._attachments.push(o), this._fileAttachmentsContainerRef.scrollTop = this._fileAttachmentsContainerRef.scrollHeight, (a = this._validationHandler) == null || a.call(this), o;
  }
  static createContainer(e) {
    const t = x();
    return t[m].add("file-attachment"), t.appendChild(e), t;
  }
  createRemoveAttachmentButton(e) {
    const t = x();
    t[m].add("remove-file-attachment-button"), t.onclick = this.removeAttachment.bind(this, e);
    const n = x();
    return n[m].add("x-icon"), n.innerText = "×", t.appendChild(n), t;
  }
  removeAttachment(e, t) {
    var r, o;
    const n = this._attachments.findIndex((a) => a === e);
    if (n < 0) return;
    (r = this._onInput) == null || r.call(this, !!(t != null && t.isTrusted));
    const i = this._attachments[n].attachmentContainerElement;
    this._attachments.splice(n, 1), Ri.stopAttachmentPlayback(i), i.remove(), this._toggleContainerDisplay(!1), (o = this._validationHandler) == null || o.call(this);
  }
  getFiles() {
    return Array.from(this._attachments).map((e) => ({ [ne]: e[ne], [E]: e.fileType }));
  }
  hideAttachments() {
    this._hiddenAttachments.clear(), this._attachments.forEach((e) => {
      setTimeout(() => {
        var t;
        return (t = e.removeButton) == null ? void 0 : t[Z]();
      }), this._hiddenAttachments.add(e);
    });
  }
  removeAttachments() {
    this._attachments.forEach((e) => {
      setTimeout(() => {
        var t;
        return (t = e.removeButton) == null ? void 0 : t[Z]();
      });
    }), this._hiddenAttachments.clear();
  }
  readdAttachments() {
    var e;
    Array.from(this._hiddenAttachments).forEach((t) => {
      this._fileAttachmentsContainerRef.appendChild(t.attachmentContainerElement), this._attachments.push(t);
    }), (e = this._onInput) == null || e.call(this, !1), this._hiddenAttachments.clear();
  }
}
const xt = class xt extends At {
  // prettier-ignore
  constructor(e, t, n, i, r) {
    super(e, t, n, i, r);
  }
  static createAudioContainer() {
    const e = x();
    return e[m].add("border-bound-attachment", "audio-attachment-icon-container"), $e.IS_SAFARI && e[m].add("border-bound-attachment-safari"), e;
  }
  static addAudioElements(e, t) {
    const n = e.parentElement ? V.cloneElement(e) : e, i = x(q);
    i[T] = t;
    const r = Mt.createSVGElement(na);
    r[m].add("attachment-icon", "play-icon");
    const o = Mt.createSVGElement(Vs);
    o[m].add("attachment-icon", "stop-icon"), n.replaceChildren(r), i.onplay = () => {
      n.replaceChildren(o);
    }, i.onpause = () => {
      n.replaceChildren(r), i.currentTime = 0;
    }, i.onended = () => {
      n.replaceChildren(r);
    }, V.assignButtonEvents(n, () => {
      i.paused ? i.play() : i.pause();
    });
  }
  static createAudioAttachment(e) {
    const t = xt.createAudioContainer();
    return xt.addAudioElements(t, e), t;
  }
  createTimer(e, t) {
    let n = 0;
    const i = t !== void 0 && t < xt.TIMER_LIMIT_S ? t : xt.TIMER_LIMIT_S;
    return setInterval(() => {
      var a;
      n += 1, n === i && ((a = this.stopPlaceholderCallback) == null || a.call(this), this.clearTimer()), n === 600 && e[m].add("audio-placeholder-text-4-digits");
      const r = Math.floor(n / 60), o = (n % 60).toString().padStart(2, "0");
      e.textContent = `${r}:${o}`;
    }, 1e3);
  }
  createPlaceholderAudioAttachment(e) {
    const t = xt.createAudioContainer(), n = x();
    n[m].add("audio-placeholder-text-3-digits");
    const i = x();
    i[m].add("file-attachment-text-container", "audio-placeholder-text-3-digits-container"), i.appendChild(n);
    const r = Mt.createSVGElement(Vs);
    return r[m].add("attachment-icon", "stop-icon", "not-removable-attachment-icon"), n.textContent = "0:00", this._activePlaceholderTimer = this.createTimer(n, e), t.appendChild(i), this.addPlaceholderAudioAttachmentEvents(t, r, i), t;
  }
  addPlaceholderAudioAttachmentEvents(e, t, n) {
    const i = () => e.replaceChildren(t);
    e.addEventListener(Ii, i);
    const r = () => e.replaceChildren(n);
    e.addEventListener(on, r);
    const o = () => {
      var a;
      return (a = this.stopPlaceholderCallback) == null ? void 0 : a.call(this);
    };
    e.addEventListener(Z, o);
  }
  addPlaceholderAttachment(e, t) {
    const n = this.createPlaceholderAudioAttachment(t);
    this._activePlaceholderAttachment = this.addFileAttachment(new File([], ""), q, n, !1), this.stopPlaceholderCallback = e;
  }
  // prettier-ignore
  completePlaceholderAttachment(e, t) {
    const n = this._activePlaceholderAttachment;
    n && (n[ne] = e, xt.addAudioElements(
      n.attachmentContainerElement.children[0],
      t
    ), n.removeButton = this.createRemoveAttachmentButton(n), n.attachmentContainerElement.appendChild(n.removeButton), this._activePlaceholderAttachment = void 0, this.clearTimer());
  }
  removePlaceholderAttachment() {
    this._activePlaceholderAttachment && (this.removeAttachment(this._activePlaceholderAttachment), this._activePlaceholderAttachment = void 0, this.clearTimer());
  }
  clearTimer() {
    this._activePlaceholderTimer !== void 0 && (clearInterval(this._activePlaceholderTimer), this._activePlaceholderTimer = void 0, this.stopPlaceholderCallback = void 0);
  }
  static stopAttachmentPlayback(e) {
    var t, n, i;
    (i = (n = (t = e.children[0]) == null ? void 0 : t.children) == null ? void 0 : n[0]) != null && i[m].contains("stop-icon") && e.children[0][Z]();
  }
};
xt.TIMER_LIMIT_S = 5999;
let Ri = xt;
class zh {
  // prettier-ignore
  static create(e, t, n, i, r, o) {
    return o === q ? new Ri(e, t, n, i, r) : new At(e, t, n, i, r);
  }
}
class Pi {
  constructor(e, t, n) {
    this._fileAttachmentsTypes = [], this.elementRef = this.createAttachmentContainer();
    const i = typeof n == "object" && !!n.displayFileAttachmentContainer;
    this.toggleContainerDisplay(i), e.appendChild(this.elementRef), t && Object.assign(this.elementRef[v], t);
  }
  // prettier-ignore
  addType(e, t, n, i) {
    const r = zh.create(
      e,
      t,
      n,
      this.toggleContainerDisplay.bind(this),
      this.elementRef,
      i
    );
    return this._fileAttachmentsTypes.push(r), r;
  }
  createAttachmentContainer() {
    const e = x();
    return e.id = "file-attachment-container", e;
  }
  toggleContainerDisplay(e) {
    e ? this.elementRef[v].display = "block" : this.elementRef.children.length === 0 && (this.elementRef[v].display = "none");
  }
  getAllFileData() {
    const e = this._fileAttachmentsTypes.map((t) => t.getFiles()).flat();
    return e.length > 0 ? e : void 0;
  }
  async completePlaceholders() {
    await Promise.all(
      this._fileAttachmentsTypes.map(
        async (e) => {
          var t;
          return (t = e.stopPlaceholderCallback) == null ? void 0 : t.call(e);
        }
      )
    );
  }
  static addFilesToType(e, t) {
    e.forEach((n) => {
      const i = new FileReader();
      i.readAsDataURL(n), i.onload = (r) => {
        for (let o = 0; o < t.length && !t[o].attemptAddFile(n, r.target.result); o += 1)
          ;
      };
    });
  }
  addFilesToAnyType(e) {
    Pi.addFilesToType(e, this._fileAttachmentsTypes);
  }
  hideFiles() {
    this._fileAttachmentsTypes.forEach((e) => e.hideAttachments()), this.elementRef.replaceChildren(), this.toggleContainerDisplay(!1);
  }
  removeHiddenFiles() {
    this._fileAttachmentsTypes.forEach((e) => e.removeAttachments());
  }
  readdHiddenFiles() {
    this._fileAttachmentsTypes.forEach((e) => e.readdAttachments()), this.toggleContainerDisplay(!0);
  }
  getNumberOfTypes() {
    return this._fileAttachmentsTypes.length;
  }
}
const ot = class ot {
  constructor(e, t, n) {
    this._isOpen = !1, this._contentRef = ot.createModalContent(t, n == null ? void 0 : n.backgroundColor), this._buttonPanel = ot.createButtonPanel(n == null ? void 0 : n.backgroundColor), this._elementRef = ot.createContainer(this._contentRef, n), this._elementRef.appendChild(this._buttonPanel), e.appendChild(this._elementRef), this._backgroundPanelRef = ot.createDarkBackgroundPanel(), e.appendChild(this._backgroundPanelRef), this.addWindowEvents(e);
  }
  isOpen() {
    return this._isOpen;
  }
  static createContainer(e, t) {
    const n = x();
    return n[m].add("modal"), n.appendChild(e), t && delete t.backgroundColor, Object.assign(n[v], t), n;
  }
  static createModalContent(e, t) {
    const n = x();
    return n[m].add(...e), t && (n[v].backgroundColor = t), x().appendChild(n), n;
  }
  static createButtonPanel(e) {
    const t = x();
    return t[m].add("modal-button-panel"), e && (t[v].backgroundColor = e), t;
  }
  static createDarkBackgroundPanel() {
    const e = x();
    return e.id = "modal-background-panel", e;
  }
  addButtons(...e) {
    e.forEach((t) => {
      fe.addAttributes(t), this._buttonPanel.appendChild(t);
    });
  }
  static createTextButton(e) {
    const t = x();
    return t[m].add("modal-button"), t.textContent = e, t;
  }
  static createSVGButton(e) {
    const t = x();
    t[m].add("modal-button", "modal-svg-button");
    const n = Mt.createSVGElement(e);
    return n[m].add("modal-svg-button-icon"), t.appendChild(n), t;
  }
  close() {
    this._elementRef[m].remove("show-modal"), this._elementRef[m].add("hide-modal"), this._backgroundPanelRef[m].remove("show-modal-background"), this._backgroundPanelRef[m].add("hide-modal-background"), this._isOpen = !1, setTimeout(() => {
      this._elementRef[v].display = "none", this._backgroundPanelRef[v].display = "none";
    }, ot.MODAL_CLOSE_TIMEOUT_MS);
  }
  displayModalElements() {
    this._elementRef[v].display = "flex", this._elementRef[m].remove("hide-modal"), this._elementRef[m].add("show-modal"), this._backgroundPanelRef[v].display = "block", this._backgroundPanelRef[m].remove("hide-modal-background"), this._backgroundPanelRef[m].add("show-modal-background"), this._isOpen = !0;
  }
  openTextModal(e) {
    this._contentRef.innerHTML = e, this.displayModalElements();
  }
  addCloseButton(e, t, n) {
    const i = t ? ot.createSVGButton(e) : ot.createTextButton(e);
    return this.addButtons(i), V.assignButtonEvents(i, () => {
      this.close(), setTimeout(() => {
        n == null || n();
      }, 140);
    }), i;
  }
  static createTextModalFunc(e, t, n) {
    var i;
    if (typeof t == "object" && ((i = t[b]) != null && i.infoModal)) {
      const r = new ot(e, ["modal-content"], t[b].infoModal.containerStyle);
      return r.addCloseButton("OK", !1, n), r.openTextModal.bind(r, t.infoModalTextMarkUp || "");
    }
  }
  addWindowEvents(e) {
    this.keyDownEvent = this.windowKeyDown.bind(this, e), window.addEventListener("keydown", this.keyDownEvent);
  }
  windowKeyDown(e, t) {
    var n, i;
    !e.isConnected && this.keyDownEvent ? window.removeEventListener("keydown", this.keyDownEvent) : this._isOpen && (t.key === _e.ESCAPE ? (this.close(), (n = this.extensionCloseCallback) == null || n.call(this)) : t.key === _e.ENTER && (this.close(), (i = this.extensionCloseCallback) == null || i.call(this)));
  }
};
ot.MODAL_CLOSE_TIMEOUT_MS = 190;
let Qt = ot;
class hs extends fn {
  // prettier-ignore
  constructor(e, t, n, i, r, o) {
    var p, u, g, _, y, S, M, K, ie, se;
    const a = le.processPosition((p = n == null ? void 0 : n.button) == null ? void 0 : p.position), c = ((_ = (g = (u = n == null ? void 0 : n.button) == null ? void 0 : u[R]) == null ? void 0 : g[h]) == null ? void 0 : _.content) || o, l = ht.tryCreateConfig("Upload File", (y = n == null ? void 0 : n.button) == null ? void 0 : y.tooltip);
    super(
      hs.createButtonElement(),
      r,
      a,
      l,
      n.button,
      c
    );
    const d = this.createInnerElementsForStates(i, this.customStyles);
    this._inputElement = hs.createInputElement((S = n == null ? void 0 : n[b]) == null ? void 0 : S.acceptedFormats), this.addClickEvent(e, n), this.changeElementsByState(d[R]), this.reapplyStateStyle(R), this._fileAttachmentsType = t, this._openModalOnce = ((K = (M = n[b]) == null ? void 0 : M.infoModal) == null ? void 0 : K.openModalOnce) === !1 || (se = (ie = n[b]) == null ? void 0 : ie.infoModal) == null ? void 0 : se.openModalOnce;
  }
  createInnerElementsForStates(e, t) {
    return {
      [R]: this.createInnerElements(e, R, t)
    };
  }
  triggerImportPrompt(e) {
    e.onchange = this.import.bind(this, e), e[Z]();
  }
  import(e) {
    Pi.addFilesToType(Array.from(e[b] || []), [this._fileAttachmentsType]), e.value = "";
  }
  static createInputElement(e) {
    const t = x("input");
    return t[E] = ne, t.accept = e || "", t.hidden = !0, t.multiple = !0, t;
  }
  static createButtonElement() {
    const e = x();
    return e[m].add("input-button"), e;
  }
  addClickEvent(e, t) {
    const n = this.triggerImportPrompt.bind(this, this._inputElement), i = Qt.createTextModalFunc(e, t, n);
    this.elementRef.onclick = this[Z].bind(this, i);
  }
  click(e) {
    e && (this._openModalOnce === void 0 || this._openModalOnce === !0) ? (e(), this._openModalOnce === !0 && (this._openModalOnce = !1)) : this.triggerImportPrompt(this._inputElement);
  }
}
class wt {
  static create(e, t, n) {
    const i = wt.createElement(n);
    wt.addEvents(i, e, t), e.appendChild(i);
  }
  static createElement(e) {
    const t = x();
    return t.id = "drag-and-drop", typeof e === U && Object.assign(t[v], e), t;
  }
  static addEvents(e, t, n) {
    t.ondragenter = (i) => {
      i.preventDefault(), wt.display(e);
    }, e.ondragleave = (i) => {
      i.preventDefault(), wt.hide(e);
    }, e.ondragover = (i) => {
      i.preventDefault();
    }, e.ondrop = (i) => {
      i.preventDefault(), wt.uploadFile(n, i), wt.hide(e);
    };
  }
  static uploadFile(e, t) {
    var i;
    const n = (i = t.dataTransfer) == null ? void 0 : i[b];
    n && e.addFilesToAnyType(Array.from(n));
  }
  static display(e) {
    e[v].display = "block";
  }
  static hide(e) {
    e[v].display = "none";
  }
  static isEnabled(e, t) {
    return t !== void 0 && t === !1 ? !1 : !!t || e.getNumberOfTypes() > 0;
  }
}
class Wt {
  // prettier-ignore
  static validate(e, t, n, i, r, o, a) {
    const c = n.isSubmitProgrammaticallyDisabled ? !1 : e(i, r, a);
    return c ? t.changeToSubmitIcon() : t.changeToDisabledIcon(), o == null || o.addInputText(i || ""), c;
  }
  // prettier-ignore
  static async useValidationFunc(e, t, n, i, r, o) {
    const a = t.isTextInputEmpty() ? "" : t.inputElementRef.textContent;
    await n.completePlaceholders();
    const c = n.getAllFileData(), l = c == null ? void 0 : c.map((d) => d[ne]);
    return Wt.validate(e, i, r, a, l, o);
  }
  // prettier-ignore
  static async useValidationFuncProgrammatic(e, t, n, i, r) {
    var a;
    const o = (a = t[b]) == null ? void 0 : a.map((c) => c[ne]);
    return Wt.validate(e, n, i, t[h], o, r, !0);
  }
  static validateWebsocket(e, t) {
    const { websocket: n, connectSettings: i } = e;
    return n && i.url !== ut.URL && !Me.canSendMessage(n) ? (t.changeToDisabledIcon(), !1) : !0;
  }
  // prettier-ignore
  static attach(e, t, n, i, r, o) {
    const a = e.validateInput || le.processValidateInput(e);
    e._validationHandler = async (c) => {
      if (r.status.loadingActive || r.status.requestInProgress || !Wt.validateWebsocket(t, r)) return !1;
      const l = a || t.canSendMessage;
      return l ? c ? Wt.useValidationFuncProgrammatic(l, c, r, t, o) : Wt.useValidationFunc(l, n, i, r, t, o) : null;
    };
  }
}
class pa {
  static getFileName(e, t) {
    const n = /* @__PURE__ */ new Date(), i = String(n.getHours()).padStart(2, "0"), r = String(n.getMinutes()).padStart(2, "0"), o = String(n.getSeconds()).padStart(2, "0");
    return `${e}-${i}-${r}-${o}.${t}`;
  }
}
class Vh extends Cs {
  constructor(e, t) {
    var n, i;
    super(t.button), this._waitingForBrowserApproval = !1, this._audioType = e, this._extension = ((n = t[b]) == null ? void 0 : n.format) || "mp3", this._maxDurationSeconds = (i = t[b]) == null ? void 0 : i.maxDurationSeconds, V.assignButtonEvents(this.elementRef, this.buttonClick.bind(this));
  }
  buttonClick() {
    this._waitingForBrowserApproval || (this.isActive ? this.stop() : (this._waitingForBrowserApproval = !0, this.record()));
  }
  stop() {
    return new Promise((e) => {
      var t, n;
      this.changeToDefault(), (t = this._mediaRecorder) == null || t.stop(), (n = this._mediaStream) == null || n.getTracks().forEach((i) => i.stop()), setTimeout(() => {
        e();
      }, 10);
    });
  }
  record() {
    navigator.mediaDevices.getUserMedia({ audio: !0 }).then((e) => {
      this.changeToActive(), this._mediaRecorder = new MediaRecorder(e), this._audioType.addPlaceholderAttachment(this.stop.bind(this), this._maxDurationSeconds), this._mediaStream = e, this._mediaRecorder.addEventListener("dataavailable", (t) => {
        this.createFile(t);
      }), this._mediaRecorder[$t]();
    }).catch((e) => {
      console[f](e), this.stop();
    }).finally(() => {
      this._waitingForBrowserApproval = !1;
    });
  }
  createFile(e) {
    const t = new Blob([e.data], { type: `audio/${this._extension}` }), n = pa.getFileName(this._newFilePrefix || q, this._extension), i = new File([t], n, { type: t[E] }), r = new FileReader();
    r.readAsDataURL(i), r.onload = (o) => {
      this._audioType.completePlaceholderAttachment(i, o.target.result);
    };
  }
}
const Wh = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
  <line x1="22" y1="2" x2="11" y2="14"></line>
  <polygon points="22 2 15 22 11 14 2 10 22 2"></polygon>
</svg>
`;
class en {
  static resetSubmit(e, t) {
    t ? e.unsetCustomStateStyles([Rt, nt]) : e.unsetCustomStateStyles([Ns, Rt, nt]), e.reapplyStateStyle(nt);
  }
  static overwriteDefaultStyleWithSubmit(e, t) {
    if (!e.submit) return;
    const n = A(e[t] || {});
    ke.overwritePropertyObjectFromAnother(n, e.submit, ["container", w]), ke.overwritePropertyObjectFromAnother(n, e.submit, [h, "styles", w]), ke.overwritePropertyObjectFromAnother(n, e.submit, [z, "styles", w]), e[t] = n;
  }
  // prettier-ignore
  static setUpDisabledButton(e) {
    ke.setPropertyValueIfDoesNotExist(e, [nt, "container", w, "backgroundColor"], ""), ke.setPropertyValueIfDoesNotExist(e, [$, "container", w, "backgroundColor"], fa), ke.setPropertyValueIfDoesNotExist(e.submit, [z, "styles", w, "filter"], ""), ke.setPropertyValueIfDoesNotExist(
      e[$],
      [z, "styles", w, "filter"],
      "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(5564%) hue-rotate(207deg) brightness(100%) contrast(97%)"
    ), ke.setPropertyValueIfDoesNotExist(e[$], [h, "styles", w, "color"], "grey"), en.overwriteDefaultStyleWithSubmit(e, $);
  }
  static process(e) {
    const t = A(e || {});
    return en.overwriteDefaultStyleWithSubmit(t, Rt), en.overwriteDefaultStyleWithSubmit(t, Ns), e != null && e.alwaysEnabled || en.setUpDisabledButton(t), t;
  }
}
class pi extends fn {
  // prettier-ignore
  constructor(e, t, n, i, r, o) {
    const a = en.process(e.submitButtonStyles), c = Wh, l = ht.tryCreateConfig("Submit", a == null ? void 0 : a.tooltip);
    super(pi.createButtonContainerElement(), c, a == null ? void 0 : a.position, l, a), this._isSVGLoadingIconOverriden = !1, this.status = { requestInProgress: !1, loadingActive: !1 }, this._messages = n, this._textInput = t, this._fileAttachments = r, this._innerElements = this.createInnerElementsForStates(), this._stopClicked = { listener: () => {
    } }, this._serviceIO = i, this._alwaysEnabled = !!(a != null && a.alwaysEnabled), e.disableSubmitButton = this.disableSubmitButton.bind(this, i), this.attemptOverwriteLoadingStyle(e), o.microphone && this.setUpSpeechToText(o.microphone.button, e.speechToText), setTimeout(() => {
      var d;
      this._validationHandler = e._validationHandler, this.assignHandlers(this._validationHandler), (d = this._validationHandler) == null || d.call(this);
    });
  }
  createInnerElementsForStates() {
    const { submit: e, loading: t, stop: n } = this.createCustomElements();
    return {
      submit: e,
      loading: t || [pi.createLoadingIconElement()],
      stop: n || [pi.createStopIconElement()],
      [$]: this.createDisabledIconElement(e)
    };
  }
  createCustomElements() {
    const e = yt.createCustomElements(nt, this[z], this.customStyles), t = { loading: void 0, stop: void 0 };
    return Object.keys(t).forEach((n) => {
      const i = n, r = yt.createCustomElements(i, this[z], this.customStyles);
      r && (t[i] = r);
    }), t.submit = e || this.buildDefaultIconElement("submit-icon"), t;
  }
  static createButtonContainerElement() {
    const e = x();
    return e[m].add("input-button"), e;
  }
  static createLoadingIconElement() {
    const e = x();
    return e[m].add("loading-submit-button"), e;
  }
  static createStopIconElement() {
    const e = x();
    return e.id = "stop-icon", e;
  }
  createDisabledIconElement(e) {
    return yt.createCustomElements($, this[z], this.customStyles) || [e[0].cloneNode(!0)];
  }
  // prettier-ignore
  attemptOverwriteLoadingStyle(e) {
    var t, n, i, r, o, a, c, l, d;
    if (!((n = (t = this.customStyles) == null ? void 0 : t.submit) != null && n[z] || (o = (r = (i = this.customStyles) == null ? void 0 : i.loading) == null ? void 0 : r[z]) != null && o.content || (l = (c = (a = this.customStyles) == null ? void 0 : a.loading) == null ? void 0 : c[h]) != null && l.content) && (e.displayLoadingBubble === void 0 || e.displayLoadingBubble === !0)) {
      const p = x("style");
      p.textContent = `
        .loading-button > * {
          filter: brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%)
            contrast(96%) !important;
        }`, (d = e.shadowRoot) == null || d.appendChild(p), this._isSVGLoadingIconOverriden = !0;
    }
  }
  assignHandlers(e) {
    this._serviceIO.completionsHandlers = {
      onFinish: this.resetSubmit.bind(this, e)
    }, this._serviceIO.streamHandlers = {
      onOpen: this.changeToStopIcon.bind(this),
      onClose: this.resetSubmit.bind(this, e),
      stopClicked: this._stopClicked
    };
    const { stream: t } = this._serviceIO;
    typeof t == "object" && typeof t.simulation == "number" && (this._serviceIO.streamHandlers.simulationInterim = t.simulation);
  }
  setUpSpeechToText(e, t) {
    this._microphoneButton = e, this._stopSTTAfterSubmit = typeof t == "object" ? t.stopAfterSubmit : !1;
  }
  resetSubmit(e) {
    this.status.requestInProgress = !1, this.status.loadingActive = !1, e();
  }
  async submitFromInput() {
    await this._fileAttachments.completePlaceholders();
    const e = this._fileAttachments.getAllFileData();
    if (this._textInput.isTextInputEmpty())
      this.attemptSubmit({ [h]: "", [b]: e });
    else {
      const t = this._textInput.inputElementRef.innerText.trim();
      this.attemptSubmit({ [h]: t, [b]: e });
    }
    ($e.IS_SAFARI || $e.IS_MOBILE) && setTimeout(() => an.focusEndOfInput(this._textInput.inputElementRef));
  }
  async programmaticSubmit(e) {
    typeof e == "string" && (e = le.processSubmitUserMessage(e));
    const t = { [h]: e[h] };
    e[b] && (t[b] = Array.from(e[b]).map((n) => ({ file: n, [E]: At.getTypeFromBlob(n) }))), e.custom && (t.custom = e.custom), setTimeout(() => this.attemptSubmit(t, !0));
  }
  // TO-DO - should be disabled when loading history
  async attemptSubmit(e, t = !1) {
    var r, o, a, c;
    if (await ((r = this._validationHandler) == null ? void 0 : r.call(this, t ? e : void 0)) === !1) return;
    this.changeToLoadingIcon(), this._textInput.clear(), $e.IS_MOBILE && setTimeout(() => this._textInput.inputElementRef.focus()), typeof this._messages.focusMode != "boolean" && ((o = this._messages.focusMode) != null && o.fade) && await Ki.fadeAnimation(this._messages.elementRef, this._messages.focusMode.fade), await this.addNewMessage(e), this._serviceIO.isWebModel() || this._messages.addLoadingMessage();
    const n = (a = e[b]) == null ? void 0 : a.map((l) => l[ne]), i = { [h]: e[h] === "" ? void 0 : e[h], [b]: n };
    await this._serviceIO.callAPI(i, this._messages), (c = this._fileAttachments) == null || c.hideFiles();
  }
  async addNewMessage({ text: e, files: t, custom: n }) {
    const i = { [C]: F, custom: n };
    e && (i[h] = e), t && (i[b] = await this._messages.addMultipleFiles(t, this._fileAttachments)), this._serviceIO.sessionId && (i._sessionId = this._serviceIO.sessionId), Object.keys(i).length > 0 && this._messages.addNewMessage(i);
  }
  stopStream() {
    var e, t, n;
    (t = (e = this._serviceIO.streamHandlers).onAbort) == null || t.call(e), (n = this._stopClicked) == null || n.listener(), this._validationHandler && this.resetSubmit(this._validationHandler);
  }
  changeToStopIcon() {
    this._serviceIO.websocket || (this.elementRef[m].remove(Fi, Un, Fn), fe.removeAriaAttributes(this.elementRef), this.changeElementsByState(this._innerElements.stop), this.reapplyStateStyle(Ns, [Rt, nt]), V.assignButtonEvents(this.elementRef, this.stopStream.bind(this)), this.status.loadingActive = !1);
  }
  changeToLoadingIcon() {
    this._serviceIO.websocket || (this._isSVGLoadingIconOverriden || this.changeElementsByState(this._innerElements.loading), this.elementRef[m].remove(Fn, Un), fe.removeAriaDisabled(this.elementRef), this.elementRef[m].add(Fi), fe.addAriaBusy(this.elementRef), this.reapplyStateStyle(Rt, [nt]), V.assignButtonEvents(this.elementRef, () => {
    }), this.status.requestInProgress = !0, this.status.loadingActive = !0);
  }
  // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  changeToSubmitIcon() {
    this.elementRef[m].contains(Fn) || (this.elementRef[m].remove(Fi, Un), fe.removeAriaAttributes(this.elementRef), this.elementRef[m].add(Fn), this.changeElementsByState(this._innerElements.submit), en.resetSubmit(this, this.status.loadingActive), V.assignButtonEvents(this.elementRef, () => {
      var e;
      this.submitFromInput(), (e = this._microphoneButton) != null && e.isActive && Ti.toggleSpeechAfterSubmit(this._microphoneButton.elementRef, !!this._stopSTTAfterSubmit), setTimeout(() => an.focusEndOfInput(this._textInput.inputElementRef));
    }));
  }
  // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  changeToDisabledIcon(e = !1) {
    this._alwaysEnabled && !e ? this.changeToSubmitIcon() : this.elementRef[m].contains(Un) || (this.elementRef[m].remove(Fi, Fn), fe.removeAriaBusy(this.elementRef), this.elementRef[m].add(Un), fe.addAriaDisabled(this.elementRef), this.changeElementsByState(this._innerElements[$]), this.reapplyStateStyle($, [nt]), V.assignButtonEvents(this.elementRef, () => {
    }));
  }
  disableSubmitButton(e, t) {
    var n;
    e.isSubmitProgrammaticallyDisabled = t !== !1, !(this.status.requestInProgress || this.status.loadingActive) && (t === !1 ? (n = this._validationHandler) == null || n.call(this) : this.changeToDisabledIcon(!0));
  }
}
const Kh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M27.1 14.313V5.396L24.158 8.34c-2.33-2.325-5.033-3.503-8.11-3.503C9.902 4.837 4.901 9.847 4.899 16c.001 6.152 5.003 11.158 11.15 11.16 4.276 0 9.369-2.227 10.836-8.478l.028-.122h-3.23l-.022.068c-1.078 3.242-4.138 5.421-7.613 5.421a8 8 0 0 1-5.691-2.359A7.993 7.993 0 0 1 8 16.001c0-4.438 3.611-8.049 8.05-8.049 2.069 0 3.638.58 5.924 2.573l-3.792 3.789H27.1z"/>
</svg>
`, jh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z"></path>
</svg>
`, Xh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/>
</svg>`, Yh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
class wr extends Qt {
  // prettier-ignore
  constructor(e, t, n, i) {
    super(e, ["modal-content", "modal-camera-content"], n), this._stopped = !1, this._format = "image/png", this._canvas = x("canvas"), this._canvas[m].add("camera-modal-canvas");
    const { captureButton: r, submitButton: o } = this.addButtonsAndTheirEvents(t);
    this._captureButton = r, this._submitButton = o, this._captureIcon = this._captureButton.children[0], this._refreshIcon = Mt.createSVGElement(Kh), this._refreshIcon[m].add("modal-svg-button-icon", "modal-svg-refresh-icon"), (i == null ? void 0 : i.format) === "jpeg" && (this._format = "image/jpeg"), i != null && i.dimensions && (this._dimensions = i.dimensions), this._contentRef.appendChild(this._canvas), this.extensionCloseCallback = this.stop;
  }
  addButtonsAndTheirEvents(e) {
    const t = Qt.createSVGButton(jh);
    t[m].add("modal-svg-camera-button"), t.children[0][m].add("modal-svg-camera-icon");
    const n = this.addCloseButton(Xh, !0);
    n[m].add("modal-svg-close-button"), n.children[0][m].add("modal-svg-close-icon");
    const i = Qt.createSVGButton(Yh);
    return i[m].add("modal-svg-submit-button"), this.addButtons(t, i), this.addButtonEvents(t, n, i, e), { captureButton: t, submitButton: i };
  }
  // prettier-ignore
  addButtonEvents(e, t, n, i) {
    V.assignButtonEvents(e, this.capture.bind(this)), V.assignButtonEvents(t, this.stop.bind(this)), V.assignButtonEvents(n, () => {
      const r = this.getFile();
      r && Pi.addFilesToType([r], [i]), this.stop(), this.close();
    });
  }
  stop() {
    this._mediaStream && this._mediaStream.getTracks().forEach((e) => e.stop()), this._stopped = !0, setTimeout(() => {
      this._captureButton.replaceChildren(this._captureIcon), this._captureButton[m].replace("modal-svg-refresh-button", "modal-svg-camera-button");
      const e = this._canvas.getContext("2d");
      e == null || e.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }, Qt.MODAL_CLOSE_TIMEOUT_MS);
  }
  start() {
    this._dataURL = void 0, this._submitButton[m].add(`modal-svg-submit-${$}`), this._stopped = !1, navigator.mediaDevices.getUserMedia({ video: this._dimensions || !0 }).then((e) => {
      if (this._mediaStream = e, !this.isOpen()) return this.stop();
      const t = x("video");
      t.srcObject = e, t.play(), requestAnimationFrame(this.updateCanvas.bind(this, t, this._canvas));
    }).catch((e) => {
      console[f](e), this.stop(), this.close();
    });
  }
  capture() {
    this._dataURL ? (this._captureButton.replaceChildren(this._captureIcon), this._captureButton[m].replace("modal-svg-refresh-button", "modal-svg-camera-button"), this._submitButton[m].add(`modal-svg-submit-${$}`), this._dataURL = void 0) : (this._captureButton.replaceChildren(this._refreshIcon), this._captureButton[m].replace("modal-svg-camera-button", "modal-svg-refresh-button"), this._submitButton[m].remove(`modal-svg-submit-${$}`), this._dataURL = this._canvas.toDataURL());
  }
  getFile() {
    if (this._dataURL) {
      const e = atob(this._dataURL.split(",")[1]), t = new Array(e.length);
      for (let a = 0; a < e.length; a++)
        t[a] = e.charCodeAt(a);
      const n = new Uint8Array(t), i = new Blob([n], { type: this._format }), r = this._format === "image/jpeg" ? "jpeg" : "png", o = pa.getFileName(this._newFilePrefix || "photo", r);
      return new File([i], o, { type: i[E] });
    }
  }
  updateCanvas(e, t) {
    if (!this._stopped) {
      if (!this._dataURL) {
        t.width = e.videoWidth, t.height = e.videoHeight;
        const n = t.getContext("2d");
        n == null || n.drawImage(e, 0, 0, t.width, t.height);
      }
      requestAnimationFrame(this.updateCanvas.bind(this, e, t));
    }
  }
  openCameraModal(e) {
    this.displayModalElements(), e[$t]();
  }
  // prettier-ignore
  static createCameraModalFunc(e, t, n, i) {
    const r = new wr(e, t, n, i);
    return r.openCameraModal.bind(r, r);
  }
}
const Zh = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M29 7h-4.599l-2.401-4h-12l-2.4 4h-4.6c-1 0-3 1-3 2.969v16.031c0 1.657 1.5 3 2.792 3h26.271c1.313 0 2.938-1.406 2.938-2.968v-16.032c0-1-1-3-3-3zM30 26.032c0 0.395-0.639 0.947-0.937 0.969h-26.265c-0.232-0.019-0.797-0.47-0.797-1v-16.031c0-0.634 0.851-0.953 1-0.969h5.732l2.4-4h9.802l1.785 3.030 0.55 0.97h5.731c0.705 0 0.99 0.921 1 1v16.032zM16 10c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM16 22c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
</svg>`;
class Ar extends fn {
  constructor(e, t, n) {
    var l, d, p, u, g, _;
    const i = le.processPosition((l = n == null ? void 0 : n.button) == null ? void 0 : l.position), r = ((u = (p = (d = n == null ? void 0 : n.button) == null ? void 0 : d[R]) == null ? void 0 : p[h]) == null ? void 0 : u.content) || "Photo", o = ht.tryCreateConfig("Camera", (g = n == null ? void 0 : n.button) == null ? void 0 : g.tooltip), a = ((_ = n == null ? void 0 : n.button) == null ? void 0 : _[R]) || {};
    super(Ar.createButtonElement(), Zh, i, o, a, r);
    const c = this.createInnerElementsForStates(this.customStyles);
    n && this.addClickEvent(e, t, n.modalContainerStyle, n[b]), this.changeElementsByState(c[R]), this.reapplyStateStyle(R);
  }
  createInnerElementsForStates(e) {
    return {
      [R]: this.createInnerElements("camera-icon", R, e)
    };
  }
  static createButtonElement() {
    const e = x();
    return e[m].add("input-button"), e;
  }
  // prettier-ignore
  addClickEvent(e, t, n, i) {
    const r = wr.createCameraModalFunc(
      e,
      t,
      n,
      i
    );
    V.assignButtonEvents(this.elementRef, r);
  }
}
class _n {
  constructor(e, t, n, i) {
    this.elementRef = _n.createPanelElement(e.inputAreaStyle);
    const r = {}, o = this.createFileUploadComponents(e, n, i, r), a = new Wi(e, n, o, t.browserStorage);
    e.speechToText && !r.microphone && (r.microphone = { button: new Ti(e, a, t.addNewErrorMessage.bind(t)) });
    const c = new pi(e, a, t, n, o, r);
    a.submit = c.submitFromInput.bind(c), Wt.attach(e, n, a, o, c, t.browserStorage), e.submitUserMessage = c.programmaticSubmit.bind(c), r.submit = { button: c }, e.customButtons && nn.add(e, r), _n.addElements(this.elementRef, a, r, i, o, e.dropupStyles), _n.assignOnInput(e, n, o, a);
  }
  static createPanelElement(e) {
    const t = x();
    return t.id = "input", Object.assign(t[v], e), t;
  }
  // prettier-ignore
  createFileUploadComponents(e, t, n, i) {
    var o, a, c, l;
    const r = new Pi(this.elementRef, e.attachmentContainerStyle, t.demo);
    if (_n.createUploadButtons(e, t, t.fileTypes || {}, r, n, i), (o = t[De]) != null && o[b]) {
      const d = ((a = i[Q]) == null ? void 0 : a.fileType) || r.addType(e, t, t[De][b], Q);
      i[De] = { button: new Ar(n, d, t[De]) };
    }
    if ((c = t.recordAudio) != null && c[b]) {
      const d = ((l = i[q]) == null ? void 0 : l.fileType) || r.addType(e, t, t.recordAudio[b], q);
      i.microphone = { button: new Vh(d, t.recordAudio) };
    }
    return wt.isEnabled(r, e.dragAndDrop) && wt.create(n, r, e.dragAndDrop), r;
  }
  // prettier-ignore
  static createUploadButtons(e, t, n, i, r, o) {
    Object.keys(n).forEach((a) => {
      const c = a, l = n[c];
      if (l[b]) {
        const d = i.addType(e, t, l[b], c), { id: p, svgString: u, dropupText: g } = wh[c], _ = new hs(r, d, l, p, u, g);
        o[c] = { button: _, fileType: d };
      }
    });
  }
  // prettier-ignore
  static addElements(e, t, n, i, r, o) {
    V.addElements(e, t.elementRef);
    const a = kn.create(), c = Oe.addButtons(a, n, i, o);
    ui.set(t.inputElementRef, a, r.elementRef, c), kn.add(e, a);
  }
  static assignOnInput(e, t, n, i) {
    t.onInput = (r) => {
      setTimeout(() => {
        const o = n.getAllFileData(), a = i.inputElementRef.innerText.trim(), c = { [h]: a };
        o && (c[b] = o.map((l) => l[ne])), ln.onInput(e, c, r);
      });
    };
  }
}
class Tr {
  static createElements(e, t, n) {
    const i = x();
    i.id = "chat-view";
    const r = !e.focusMode && e.upwardsMode;
    i.classList.add(r ? gh : mh);
    const o = new et(e, t, n);
    t.websocket && Me.createConnection(t, o);
    const a = new _n(e, o, t, i), c = r ? o.elementRef.parentElement : o.elementRef;
    return V.addElements(i, c, a.elementRef), i;
  }
  static render(e, t, n, i) {
    const r = Tr.createElements(e, n, i);
    t.replaceChildren(r), n.isCustomView() && n.setUpView(r, t);
  }
}
const Jh = `#validate-property-key-view{height:100%;position:relative;display:flex;justify-content:center;align-items:center;padding:8px}#loading-validate-key-property{display:inline-block;width:50px;height:50px}#loading-validate-key-property:after{content:" ";display:block;width:38px;height:38px;margin:1px;border-radius:50%;border:5px solid #5fb2ff;border-color:#5fb2ff transparent #5fb2ff transparent;animation:loading-spinner 1.4s linear infinite}#tejas-openai-realtime-container{height:100%;width:100%}#tejas-openai-realtime-avatar-container{height:60%;width:100%;display:flex;justify-content:center;align-items:center}#tejas-openai-realtime-avatar{border-radius:50%;height:110px;border:1px solid rgb(215,215,215);padding:8px;-webkit-user-select:none;user-select:none;margin-top:20px}#tejas-openai-realtime-buttons-container{height:40%;display:flex;position:relative}.tejas-openai-realtime-button-container{height:100%;width:50%;display:flex;justify-content:center;align-items:center}.tejas-openai-realtime-button{width:70px;height:70px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer}.tejas-openai-realtime-button-default{background-color:#e3e3e3}.tejas-openai-realtime-button-default:hover{background-color:#d4d4d4}.tejas-openai-realtime-button-default:active{background-color:#c5c5c5}.tejas-openai-realtime-button-loading{opacity:.7;pointer-events:none}.tejas-openai-realtime-microphone-active{background-color:#ffe7e7}.tejas-openai-realtime-microphone-active:hover{background-color:#ffdede}.tejas-openai-realtime-microphone-active:active{background-color:#ffd2d2}.tejas-openai-realtime-microphone>*{height:30px;width:30px}.tejas-openai-realtime-microphone-active>*{filter:brightness(0) saturate(100%) invert(35%) sepia(60%) saturate(1360%) hue-rotate(325deg) brightness(95%) contrast(92%)}.tejas-openai-realtime-toggle>*{height:32px;width:32px;padding-inline-start:3px;filter:brightness(0) saturate(100%) invert(22%) sepia(0%) saturate(4537%) hue-rotate(208deg) brightness(105%) contrast(91%)}.tejas-openai-realtime-button-unavailable{opacity:.45;pointer-events:none}#tejas-openai-realtime-error{color:red;position:absolute;top:calc(50% + 40px);inset-inline-start:50%;transform:translate(-50%,-50%);font-size:17px}#tejas-openai-realtime-loading{position:absolute;font-size:15px;top:50%;inset-inline-start:50%;transform:translate(-50%,-50%)}#insert-key-view{height:100%;position:relative}#insert-key-contents{text-align:center;position:absolute;inset-block-start:44%;inset-inline-start:50%;transform:translate(-50%,-50%);width:82%;display:flex;max-width:700px}#insert-key-title{margin-bottom:15px}#insert-key-input-container{margin-inline-end:2.7em;width:calc(100% - 80px)}#insert-key-input{padding:.3em 1.7em .3em .3em;border-width:1px;border-style:solid;border-radius:3px;width:100%;font-size:inherit}.insert-key-input-valid{border-color:gray}.insert-key-input-invalid{border-color:red}#visibility-icon-container{position:relative;float:inline-end;cursor:pointer;-webkit-user-select:none;user-select:none}.visibility-icon{filter:brightness(0) saturate(100%) invert(63%) sepia(1%) saturate(9%) hue-rotate(43deg) brightness(98%) contrast(92%);position:absolute;inset-inline-end:-1.7em;inset-block-start:-1.43em}#visible-icon{inset-block-start:-1.4em}.visibility-icon:hover{filter:unset}.visibility-icon>*{pointer-events:none}#start-button{border:1px solid grey;color:#454545;border-radius:4px;width:3em;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:.28em .3em;-webkit-user-select:none;user-select:none;background-color:#fff}#start-button:hover{background-color:#f2f2f2}#start-button:active{background-color:#d2d2d2}#insert-key-help-text-container{width:100%;position:absolute;margin-top:32px;margin-bottom:20px}#insert-key-help-text-contents{width:100%;position:absolute}#insert-key-input-invalid-text{display:block;margin-top:1em;margin-bottom:.5em;color:red}.insert-key-input-help-text{display:block;margin-top:16px}#loading-key{display:inline-block;width:16px;height:16px}#loading-key:after{content:" ";display:block;width:11px;height:11px;margin:1px;border-radius:50%;border:2px solid #0084ff;border-color:#0084ff transparent #0084ff transparent;animation:loading-spinner 1.2s linear infinite}#error-view{color:red;font-size:1.2em;line-height:1.3em;margin-top:-5px;text-align:center;height:100%;display:flex;justify-content:center;align-items:center;padding-inline:8px}@keyframes loading-spinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.intro-panel{position:absolute;display:flex;justify-content:center;right:0;bottom:0;left:0;margin:auto;height:fit-content;top:-2.5em}pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!
  Theme: a11y-dark
  Author: @ericwbailey
  Maintainer: @ericwbailey

  Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css
*/.hljs{background:#2b2b2b;color:#f8f8f2}.hljs-comment,.hljs-quote{color:#d4d0ab}.hljs-deletion,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ffa07a}.hljs-built_in,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-type{color:#f5ab35}.hljs-attribute{color:gold}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#abe338}.hljs-section,.hljs-title{color:#00e0e0}.hljs-keyword,.hljs-selector-tag{color:#dcc6e0}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}@media screen and (-ms-high-contrast:active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-quote,.hljs-string,.hljs-symbol,.hljs-type{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:700}}#messages,.tejas-upwards-mode #messages>div{overflow:auto;overflow-anchor:none}.tejas-upwards-mode #messages{height:100%;display:flex;flex-direction:column;justify-content:flex-end}.outer-message-container:last-child{margin-bottom:5px}.inner-message-container{display:flex;margin-inline:auto;width:calc(97.5% - 24px);max-width:100%}.message-bubble{margin-top:10px;word-wrap:break-word;width:fit-content;max-width:60%;border-radius:10px;padding:.42em .55em;height:fit-content;line-height:1.26}.user-message-text{color:#fff;background-color:#0084ff;margin-inline-end:0px;margin-inline-start:auto}.ai-message-text{color:#000;background-color:#e4e6eb;margin-inline-start:0px;margin-inline-end:auto}.tejas-last-group-messages-active{height:100%}#scroll-button{position:absolute;top:75%;left:50%;right:50%;transform:translate(-50%,-50%);transition:opacity .1s ease;display:flex;opacity:0;padding:8px;background-color:#fff;border:.5px solid #000000;justify-content:center;align-items:center;white-space:nowrap;cursor:pointer}#scroll-button:hover{background-color:#fafafa}.loading-history-message-full-view{position:absolute;height:70%;width:100%;display:flex;align-items:center}.tejas-upwards-mode #messages .loading-history-message-full-view{height:100%}.loading-history-message-small{height:20px;margin-bottom:30px}.loading-history-message-small>div>div{scale:.6}.loading-history-message{margin-top:0;width:100%;max-width:100%;display:flex;justify-content:center;background-color:unset}.loading-history{width:70px}.loading-history div{position:absolute;width:var(--loading-history-width);height:var(--loading-history-height);margin:var(--loading-history-margin);border:var(--loading-history-border);border-radius:50%;animation:loading-spinner 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:var(--loading-history-color) transparent transparent transparent}.loading-history div:nth-child(1){animation-delay:-.45s}.loading-history div:nth-child(2){animation-delay:-.3s}.loading-history div:nth-child(3){animation-delay:-.15s}.html-message{max-width:unset}.error-message-text{margin-inline:auto;background-color:#f4c0c0;color:#474747;text-align:center;max-width:95%;margin-top:14px;margin-bottom:10px}.tejas-loading-message-dots-container{width:1em;padding-top:.6em;padding-bottom:.6em;padding-inline-start:1.3em;padding-inline-end:.75em}.loading-message-dots{position:relative;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite linear alternate;animation-delay:.5s}.loading-message-dots:before,.loading-message-dots:after{content:"";display:inline-block;position:absolute;top:0}.loading-message-dots:before{inset-inline-start:-.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite alternate;animation-delay:0s}.loading-message-dots:after{inset-inline-start:.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite alternate;animation-delay:1s}@keyframes loading-message-dots{0%{background-color:var(--loading-message-color)}50%,to{background-color:var(--loading-message-color-fade)}}.message-bubble>p:first-child,.message-bubble>.partial-render-message>p:first-child,.html-wrapper>p:first-child{margin-top:0}.message-bubble>p:last-child,.message-bubble>.partial-render-message:last-child>p,.html-wrapper>p:last-child{margin-bottom:0}pre{overflow:auto;display:block;word-break:break-all;word-wrap:break-word;border-radius:7px;background:#2b2b2b;color:#f8f8f2;margin-top:.8em;margin-bottom:.8em;padding:.6em;font-size:.9em;line-height:1.5em}.image-message{padding:0;display:flex;background-color:#ddd}.image-message>*,.image-message>*>*{width:100%;border-radius:8px;display:flex}.audio-message{width:60%;max-width:300px;height:2.2em;max-height:54px;padding:0;background-color:unset}.audio-player{width:100%;height:100%}.audio-player-safari{height:fit-content;width:40px}.audio-player-safari-start{float:inline-start}.audio-player-safari-end{float:inline-end}.any-file-message{padding:1px}.any-file-message-contents{display:flex}.any-file-message-icon-container{width:1.3em;min-width:1.3em;position:relative;border-radius:4px;margin-inline-start:6px;margin-inline-end:2px}.any-file-message-icon{background-color:#fff;border-radius:4px;position:absolute;width:1em;height:1.25em;padding:1px;margin-top:auto;margin-bottom:auto;top:0;bottom:0}.any-file-message-text{padding-top:5px;overflow-wrap:anywhere;padding-bottom:5px;padding-inline-end:7px}.message-bubble>a{color:inherit}.start-item-position{margin-inline-end:10px}.end-item-position{margin-inline-start:10px}.role-hidden{display:none}.avatar{padding-top:5px;width:1.5em;height:1.5em;border-radius:1px}.avatar-container{margin-top:9px}.name{margin-top:16px;font-size:15px}#drag-and-drop{position:absolute;display:none;z-index:10;height:calc(100% - 10px);width:calc(100% - 10px);background-color:#70c6ff4d;border:5px dashed #6dafff}#file-attachment-container{position:absolute;height:3.6em;width:calc(80% - 4px);top:-2.5em;border-radius:5px;overflow:auto;text-align:start;background-color:#d7d7d73b;padding-inline-start:4px}.file-attachment{width:2.85em;height:2.85em;display:inline-flex;margin-inline-end:.6em;margin-bottom:.44em;margin-top:4px;position:relative;background-color:#fff;border-radius:5px}.image-attachment{width:100%;height:100%;object-fit:cover;border-radius:5px}.border-bound-attachment{width:calc(100% - 2px);height:calc(100% - 2px);border:1px solid #c3c3c3;border-radius:5px;overflow:hidden}.border-bound-attachment-safari{width:calc(100% - 1px);height:calc(100% - 1px)}.audio-attachment-icon-container{cursor:pointer}.audio-attachment-icon-container:hover{background-color:#f8f8f8}.attachment-icon{inset-inline:0;bottom:0;top:2px;margin:auto;position:absolute;width:25px;-webkit-user-select:none;user-select:none}.not-removable-attachment-icon{top:0;right:0;bottom:0;left:0}.play-icon{filter:brightness(0) saturate(100%) invert(17%) sepia(0%) saturate(1392%) hue-rotate(67deg) brightness(98%) contrast(97%)}.stop-icon{filter:brightness(0) saturate(100%) invert(29%) sepia(90%) saturate(1228%) hue-rotate(198deg) brightness(93%) contrast(98%)}.audio-placeholder-text-3-digits{padding-inline-start:.26rem}.audio-placeholder-text-4-digits{padding-inline-start:.1rem}.any-file-attachment{padding:2px 0}.file-attachment-text-container{position:absolute;width:inherit;display:flex;align-items:center;height:100%;top:-1px}.audio-placeholder-text-3-digits-container{padding-top:1px;cursor:default}.any-file-attachment-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-inline-start:.13em;margin-inline:auto}.remove-file-attachment-button{height:1.25em;width:1.25em;border:1px solid #cfcfcf;border-radius:25px;background-color:#fff;top:-4px;inset-inline-end:-5px;position:absolute;display:flex;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none}.remove-file-attachment-button:hover{background-color:#e4e4e4}.remove-file-attachment-button:active{background-color:#d7d7d7}.x-icon{color:#4e4e4e;top:-.075em;position:relative;font-size:1.05em}.modal{display:none;flex-direction:column;align-items:center;justify-content:center;position:absolute;width:80%;max-width:420px;max-height:80%;margin:auto;top:0;right:0;bottom:0;left:0;z-index:3}.modal-content{border-top:1px solid rgb(217,217,217);border-inline:1px solid rgb(217,217,217);border-start-start-radius:inherit;border-start-end-radius:inherit;background-color:#fff;overflow-y:auto;height:fit-content;max-height:calc(100% - 3.3em);width:100%}.modal-content>p{margin-inline:1em}.modal-content>ul{margin-inline-end:1em}.modal-button-panel{height:3.3em;border:1px solid;border-color:rgb(223,223,223) rgb(217,217,217) rgb(217,217,217);border-end-start-radius:inherit;border-end-end-radius:inherit;background-color:#fff;text-align:center;justify-content:center;display:flex;width:100%}.modal-button{min-width:2.5em;text-align:center;color:#fff;border-radius:5px;padding:.4em .4em .3em;height:1.25em;background-color:#3279b2;inset-block:0;margin-top:auto;margin-bottom:auto;cursor:pointer;-webkit-user-select:none;user-select:none;margin-inline:.31em}.modal-button:hover{background-color:#276da7}.modal-button:active{background-color:#1b5687}.modal-svg-button{padding:0 0 2px;width:2em;height:1.8em}.modal-svg-button-icon{width:100%;height:100%;filter:brightness(0) saturate(100%) invert(100%) sepia(15%) saturate(4%) hue-rotate(346deg) brightness(101%) contrast(102%)}#modal-background-panel{position:absolute;width:100%;height:100%;background-color:#00000042;z-index:2;display:none}.show-modal-background{animation:fadeInBackground .3s ease-in-out}@keyframes fadeInBackground{0%{opacity:0}to{opacity:1}}.show-modal{animation:fadeInModal .3s ease-in-out}@keyframes fadeInModal{0%{opacity:0;scale:.95}to{opacity:1;scale:1}}.hide-modal-background{animation:fadeOutBackground .2s ease-in-out}@keyframes fadeOutBackground{0%{opacity:1}to{opacity:0}}.hide-modal{animation:fadeOutModal .2s ease-in-out}@keyframes fadeOutModal{0%{opacity:1;scale:1}to{opacity:0;scale:.95}}.modal-camera-content{overflow:hidden;text-align:center;border:unset;height:100%;background-color:#2a2a2a;display:flex;justify-content:center}.camera-modal-canvas{max-width:100%;max-height:100%;margin-top:auto;margin-bottom:auto}.modal-svg-submit-button{background-color:green}.modal-svg-submit-button:hover{background-color:#007500}.modal-svg-submit-button:active{background-color:#006500}.modal-svg-submit-disabled{pointer-events:none;background-color:#747474}.modal-svg-close-button{height:1.56em;padding-top:.37em;padding-bottom:0;background-color:#c13e3e}.modal-svg-close-button:hover{background-color:#b43434}.modal-svg-close-button:active{background-color:#972929}.modal-svg-close-icon{width:80%;height:80%}.modal-svg-camera-button{height:1.6em;padding-top:.38em;padding-bottom:0}.modal-svg-camera-icon{height:76%}.modal-svg-refresh-icon{height:105%}.modal-svg-refresh-button{height:1.66em;padding-top:.11em;padding-bottom:.21em}.input-button-container{position:relative;z-index:1}.inside-end{position:absolute;inset-inline-end:calc(10% + .35em);inset-block-end:.85em}.inside-start{position:absolute;inset-inline-start:calc(10% + .35em);inset-block-end:.85em}.outside-start{position:absolute;inset-inline-end:calc(11px - .55em);inset-block-end:.88em}.outside-end{position:absolute;inset-inline-start:calc(11px - .55em);inset-block-end:.88em}#upload-images-icon{position:absolute;pointer-events:none;width:1.45em;height:1.45em;inset-inline-start:.11em;inset-block-end:.08em;filter:brightness(0) saturate(100%) invert(43%) sepia(0%) saturate(740%) hue-rotate(77deg) brightness(99%) contrast(92%)}#upload-gifs-icon{position:absolute;pointer-events:none;width:1.5em;height:1.48em;inset-inline-start:.07em;inset-block-end:.08em;filter:brightness(0) saturate(100%) invert(49%) sepia(0%) saturate(2586%) hue-rotate(12deg) brightness(93%) contrast(90%)}#upload-audio-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.17em;inset-block-end:.2em;filter:brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(337%) hue-rotate(125deg) brightness(91%) contrast(94%);transform:scaleX(.95)}#camera-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.23em;inset-block-end:.2em;filter:brightness(0) saturate(100%) invert(52%) sepia(0%) saturate(161%) hue-rotate(164deg) brightness(91%) contrast(92%);transform:scaleX(.95)}#upload-mixed-files-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.25em;inset-block-end:.2em;filter:brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(36%) hue-rotate(74deg) brightness(98%) contrast(93%);transform:scaleX(.95)}#interim-text{color:gray}#microphone-button{padding-top:.5px}.outer-button-container>#microphone-button{padding-bottom:1px}#microphone-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.25em;inset-block-end:.25em}.default-microphone-icon{filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%)}.active-microphone-icon{filter:brightness(0) saturate(100%) invert(10%) sepia(97%) saturate(7495%) hue-rotate(0deg) brightness(101%) contrast(107%);border-radius:10px}.command-microphone-icon{filter:brightness(0) saturate(100%) invert(42%) sepia(96%) saturate(1067%) hue-rotate(77deg) brightness(99%) contrast(102%)}.unsupported-microphone{display:none}#submit-icon{height:100%;filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%);width:1.21em}#stop-icon{background-color:#acacac;position:absolute;width:.95em;height:.95em;inset-inline-start:.35em;inset-block-end:.35em;border-radius:2px}.submit-button-enlarged{scale:1.1;margin-inline:.3em}.loading-submit-button{position:relative;inset-inline-start:calc(-9990px + .275em);width:.22em;height:.22em;border-radius:5px;background-color:#848484;color:#848484;box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484;animation:loading-submit-button 1.5s infinite linear;inset-block-end:-.75em}@keyframes loading-submit-button{0%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}16.667%{box-shadow:9990px -6px #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}33.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}50%{box-shadow:9990px 0 #848484,calc(9990px + .44em) -6px 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}66.667%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}83.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) -6px 0 0 #848484}to{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}}.tooltip{position:absolute;visibility:hidden;z-index:1;pointer-events:none;padding:5px;padding-inline:7px;background-color:#333;border-radius:5px;width:max-content}.tooltip-text{color:#fff;font-size:13px}.input-button{border-radius:4px;cursor:pointer;margin-bottom:.2em;-webkit-user-select:none;user-select:none}.input-button-svg{width:1.65em;height:1.65em}.input-button-svg-text{padding:1px;height:1.65em;display:flex}.input-button-svg-text>svg{padding:.22rem}.input-button-svg-text>div{margin-inline-start:2px}.input-button:hover,.input-button:focus-visible{background-color:#9c9c9c2e}.input-button:active{background-color:#9c9c9c5e}.input-button:active:not(:hover){background-color:transparent}.loading-button{cursor:auto}.loading-button:hover{background-color:unset}.text-button{filter:unset!important;display:flex;justify-content:center;align-items:center;margin-inline:4px;height:1.6em;width:max-content}#custom-icon{height:100%;width:1.2em}.custom-button-container-default{color:#505050}.custom-button-container-default>.dropup-menu-item-icon{color:unset}.custom-button-container-default>svg{filter:brightness(0) saturate(100%) invert(39%) sepia(1%) saturate(0%) hue-rotate(83deg) brightness(93%) contrast(90%)}.custom-button-container-default>.dropup-menu-item-icon>svg{position:absolute;inset-inline-start:.2em}.custom-button-container-active{background-color:#edf7ff;color:#0285ff}.custom-button-container-active:hover,.custom-button-container-active:focus-visible{background-color:#def0ff}.custom-button-container-active:active{background-color:#d2eaff}.custom-button-container-active>svg{filter:brightness(0) saturate(100%) invert(32%) sepia(34%) saturate(4196%) hue-rotate(196deg) brightness(107%) contrast(104%)}.custom-button-container-disabled{color:#aeaeae;cursor:auto}.custom-button-container-disabled>div{pointer-events:none}.custom-button-container-disabled:hover,.custom-button-container-disabled:focus-visible{background-color:transparent}.custom-button-container-disabled:active{background-color:transparent}.custom-button-container-disabled>svg{filter:brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(818%) hue-rotate(28deg) brightness(102%) contrast(100%)}#text-input-container{background-color:#fff;width:80%;display:flex;border:1px solid #0000001a;border-radius:5px;margin-top:.8em;margin-bottom:.8em;box-shadow:#959da533 0 1px 12px;overflow-y:auto;max-height:200px;position:relative}.text-input-container-start-adjustment{margin-inline-start:1.5em}.text-input-container-end-adjustment{margin-inline-end:1.5em}.text-input-container-start-small-adjustment{margin-inline-start:1.1em}.text-input-container-start-small-adjustment>.outside-start{inset-inline-end:calc(14px - .55em)}.text-input-container-end-small-adjustment{margin-inline-end:1.1em}.text-input-container-end-small-adjustment>.outside-end{inset-inline-start:calc(14px - .55em)}#text-input{text-align:start;outline:none;word-wrap:break-word;line-break:auto}.text-input-styling{padding:.4em .5em;overflow:overlay;width:100%}.text-input-inner-start-adjustment{padding-inline-start:2.2em}.text-input-inner-end-adjustment{padding-inline-end:2em}.text-input-disabled{pointer-events:none;-webkit-user-select:none;user-select:none}[contenteditable]:empty:before{content:attr(tejas-placeholder-text);pointer-events:none}[contenteditable][textcolor]:empty:before{color:gray}.outside-end>#dropup-menu,.inside-end>#dropup-menu{inset-inline-end:0px}#dropup-icon{position:absolute;pointer-events:none;width:1.16em;height:1.2em;inset-inline-start:.265em;bottom:.43em;filter:brightness(0) saturate(100%) invert(54%) sepia(0%) saturate(724%) hue-rotate(6deg) brightness(92%) contrast(90%)}.dropup-button>*{pointer-events:none}#dropup-menu{background-color:#fff;position:absolute;transform:translateY(-100%);border-radius:5px;z-index:1;top:-.49em;box-shadow:#0003 -1px 2px 10px,#0000001a 0 2px 4px;cursor:pointer;-webkit-user-select:none;user-select:none}.dropup-menu-item{height:1.4em;padding-inline-start:.35em;padding-inline-end:.84em;padding-top:.28em;padding-bottom:.28em;display:flex;position:relative}.dropup-menu-item:hover,.dropup-menu-item:focus-visible{background-color:#f3f3f3}.dropup-menu-item:active{background-color:#ebebeb}.dropup-menu-item:active:not(:hover){background-color:transparent}.dropup-menu-item:first-child{padding-top:.49em;border-start-start-radius:inherit;border-start-end-radius:inherit}.dropup-menu-item:last-child{padding-bottom:.45em;border-end-start-radius:inherit;border-end-end-radius:inherit}.dropup-menu-item-icon{width:1.39em;position:relative}.dropup-menu-item-icon>svg{bottom:0!important;top:0!important;margin-bottom:auto;margin-top:auto}#dropup-menu-item-icon-element-custom{position:absolute;pointer-events:none;width:1.21em;height:1.21em;inset-inline-start:.28em;filter:brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(337%) hue-rotate(125deg) brightness(91%) contrast(94%)}.dropup-menu-item-text{margin-inline-start:.56em;margin-top:.08em;width:max-content}#input{width:100%;display:inline-flex;text-align:center;margin-inline:auto;margin-top:auto;position:relative;justify-content:center}#chat-view{height:100%;grid-template-columns:100%}.tejas-downwards-mode{display:grid}.tejas-upwards-mode{display:flex;flex-direction:column}::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-thumb{background-color:#d0d0d0;border-radius:5px}::-webkit-scrollbar-track{background-color:#f2f2f2}.tejas-web-model-button{margin-top:10px;margin-bottom:5px;margin-inline-start:1px}:host{all:initial;display:table-cell}#container{height:inherit;width:inherit;overflow:hidden}`;
var Qh = Object.defineProperty, N = (s, e, t, n) => {
  for (var i = void 0, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (i = o(e, t, i) || i);
  return i && Qh(e, t, i), i;
};
class P extends $s {
  constructor() {
    var e;
    super(), this.getMessages = () => [], this.submitUserMessage = () => console.warn(Br("submitUserMessage")), this.addMessage = () => console.warn(Br("addMessage")), this.updateMessage = () => {
    }, this.clearMessages = () => {
    }, this.focusInput = () => an.focusFromParentElement(this._elementRef), this.refreshMessages = () => {
    }, this.scrollToBottom = () => {
    }, this.disableSubmitButton = () => {
    }, this.setPlaceholderText = () => {
    }, this._hasBeenRendered = !1, this._auxiliaryStyleApplied = !1, this._elementRef = x(), this._elementRef.id = "container", this.attachShadow({ mode: "open" }).appendChild(this._elementRef), (e = this.shadowRoot) == null || e.appendChild(ht.buildElement()), ci.apply(Jh, this.shadowRoot), setTimeout(() => {
      this._hasBeenRendered || this.onRender();
    }, 20);
  }
  changeToChatView() {
    this._activeService && (this._activeService.validateKeyProperty = !1), this.onRender();
  }
  // prettier-ignore
  onRender() {
    Vi.attemptAppendStyleSheetToHead(this.style), le.processConnect(this), (!this._activeService || this._activeService.demo) && (this._activeService = fh.create(this)), this.auxiliaryStyle && !this._auxiliaryStyleApplied && (ci.apply(this.auxiliaryStyle, this.shadowRoot), this._auxiliaryStyleApplied = !0), ci.applyDefaultStyleToComponent(this.style, this.chatStyle), le.checkForContainerStyles(this, this._elementRef), this._activeService.key && this._activeService.validateKeyProperty ? Gi.render(this._elementRef, this.changeToChatView.bind(this), this._activeService) : !(this._activeService instanceof k) || this._activeService.key ? (this._childElement ?? (this._childElement = this.children[0]), Tr.render(this, this._elementRef, this._activeService, this._childElement)) : this._activeService instanceof k && Le.render(this._elementRef, this.changeToChatView.bind(this), this._activeService), this._hasBeenRendered || ln.onRender(this), this._hasBeenRendered = !0;
  }
  disconnectedCallback() {
    wi.chat = void 0;
  }
}
N([
  O("object")
], P.prototype, "connect");
N([
  O("object")
], P.prototype, "directConnection");
N([
  O("object")
], P.prototype, "webModel");
N([
  O("object")
], P.prototype, "requestBodyLimits");
N([
  O("function")
], P.prototype, "requestInterceptor");
N([
  O("function")
], P.prototype, "responseInterceptor");
N([
  O("function")
], P.prototype, "validateInput");
N([
  O("function")
], P.prototype, "loadHistory");
N([
  O("object")
], P.prototype, "chatStyle");
N([
  O("object")
], P.prototype, "attachmentContainerStyle");
N([
  O("object")
], P.prototype, "dropupStyles");
N([
  O("object")
], P.prototype, "inputAreaStyle");
N([
  O("object")
], P.prototype, "textInput");
N([
  O("object")
], P.prototype, "defaultInput");
N([
  O("object")
], P.prototype, "submitButtonStyles");
N([
  O("object")
], P.prototype, "customButtons");
N([
  O("string")
], P.prototype, "auxiliaryStyle");
N([
  O("array")
], P.prototype, "history");
N([
  O("object")
], P.prototype, "browserStorage");
N([
  O("object")
], P.prototype, "introMessage");
N([
  O("object")
], P.prototype, "avatars");
N([
  O("object")
], P.prototype, "names");
N([
  O("object")
], P.prototype, "displayLoadingBubble");
N([
  O("object")
], P.prototype, "errorMessages");
N([
  O("object")
], P.prototype, "messageStyles");
N([
  O("object")
], P.prototype, "textToSpeech");
N([
  O("object")
], P.prototype, "speechToText");
N([
  O("object")
], P.prototype, "images");
N([
  O("object")
], P.prototype, "gifs");
N([
  O("object")
], P.prototype, "camera");
N([
  O("object")
], P.prototype, "audio");
N([
  O("object")
], P.prototype, "microphone");
N([
  O("object")
], P.prototype, "mixedFiles");
N([
  O("object")
], P.prototype, "dragAndDrop");
N([
  O("object")
], P.prototype, "htmlWrappers");
N([
  O("object")
], P.prototype, "htmlClassUtilities");
N([
  O("object")
], P.prototype, "remarkable");
N([
  O("object")
], P.prototype, "focusMode");
N([
  O("boolean")
], P.prototype, "upwardsMode");
N([
  O("object")
], P.prototype, "scrollButton");
N([
  O("object")
], P.prototype, "hiddenMessages");
N([
  O("number")
], P.prototype, "maxVisibleMessages");
N([
  O("function")
], P.prototype, "onMessage");
N([
  O("function")
], P.prototype, "onClearMessages");
N([
  O("function")
], P.prototype, "onComponentRender");
N([
  O("function")
], P.prototype, "onInput");
N([
  O("function")
], P.prototype, "onError");
N([
  O("object")
], P.prototype, "demo");
N([
  O("object")
], P.prototype, "_insertKeyViewStyles");
customElements.define("tejas-chat", P);
export {
  P as Tejas
};
