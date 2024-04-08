/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

class ObservableNode {
    constructor(parent, domNode, methods, options) {
        var _a, _b, _c;
        if (typeof options != 'object') {
            options = {};
        }
        (_a = options.childList) !== null && _a !== void 0 ? _a : (options.childList = true);
        (_b = options.subtree) !== null && _b !== void 0 ? _b : (options.subtree = true);
        (_c = options.killOnRemove) !== null && _c !== void 0 ? _c : (options.killOnRemove = true);
        this.id = v4();
        this.node = domNode;
        this.methods = methods;
        this.inDom = document.body.contains(this.node.element);
        this.options = options;
        this.parent = parent;
        this.parent.alive.set(this.id, this);
    }
    handleMutation() {
        if (document.body.contains(this.node.element)) {
            if (this.inDom != true && typeof this.methods.onAdd === 'function') {
                this.methods.onAdd(this.node);
            }
            this.inDom = true;
        }
        else if (this.inDom) {
            this.handleRemove();
        }
    }
    handleRemove() {
        this.inDom = false;
        if (typeof this.methods.onRemove === 'function') {
            this.methods.onRemove(this.node);
        }
        if (this.options.killOnRemove == true) {
            this.parent.alive.delete(this.id);
        }
    }
}
class ObserverGroup {
    constructor() {
        this.alive = new Map();
        const mainObserver = new MutationObserver(() => {
            for (const observer of this.alive.values()) {
                observer.handleMutation();
            }
        });
        mainObserver.observe(document.body, { childList: true, subtree: true });
    }
    create(node, methods, options) {
        new ObservableNode(this, node, methods, options);
    }
}

const nodeObservers = new ObserverGroup;
class ProxyNode {
    static extractEl(node) {
        return node instanceof ProxyNode ? node.element : node;
    }
    static isNode(el) {
        return el instanceof ProxyNode;
    }
    get call() {
        return this;
    }
    constructor(el) {
        this.data = {};
        this.privateData = {};
        this.listeners = {};
        if (typeof el === 'string') {
            this.element = document.createElement(el);
        }
        else if (el instanceof Element ||
            el instanceof HTMLElement ||
            el instanceof HTMLInputElement) {
            this.element = el;
        }
        else if (el instanceof ProxyNode) {
            this.element = el.element;
        }
        else {
            throw new Error('Invalid el');
        }
    }
    get focused() {
        return document.activeElement === this.element;
    }
    get childFocused() {
        return this.focused || this.element.contains(document.activeElement);
    }
    get bounds() {
        return this.element.getBoundingClientRect();
    }
    get parent() {
        const parent = this.element.parentElement;
        if (parent != null) {
            return new ProxyNode(parent);
        }
    }
    get value() {
        var _a;
        if (this.element instanceof HTMLInputElement) {
            return this.element.value;
        }
        else {
            return (_a = this.element.textContent) !== null && _a !== void 0 ? _a : '';
        }
    }
    set value(value) {
        if (this.element instanceof HTMLInputElement) {
            this.element.value = value;
        }
        else {
            this.element.textContent = value;
        }
    }
    get wrapper() {
        return this.ref;
    }
    ref(run) {
        run(this);
        return this;
    }
    text(content) {
        this.element.textContent = content;
        return this;
    }
    id(value) {
        this.element.id = value;
        return this;
    }
    attr(attributes = {}) {
        if (typeof attributes != 'object') {
            return this;
        }
        for (const [key, value] of Object.entries(attributes)) {
            this.element.setAttribute(key, value + '');
        }
        return this;
    }
    swap(node) {
        const newNode = ProxyNode.extractEl(node);
        this.element.replaceWith(newNode);
        this.element = newNode;
        return this;
    }
    clone() {
        return new ProxyNode(this.element.cloneNode(true));
    }
    clear() {
        this.element.textContent = '';
        return this;
    }
    exists() {
        return document.body.contains(this.element);
    }
    getChildren() {
        return Array.from(this.element.children).map(documentEl => new ProxyNode(documentEl));
    }
    reset(...toReset) {
        const options = toReset.length > 0 ? toReset : ['content', 'style', 'class'];
        for (const option of options) {
            if (option === 'content') {
                this.element.innerHTML = '';
            }
            else if (option === 'style') {
                if (this.element instanceof HTMLElement) {
                    const styleObj = this.element.style;
                    for (let i = styleObj.length; i--;) {
                        const nameString = styleObj[i];
                        styleObj.removeProperty(nameString);
                    }
                }
            }
            else if (option === 'class') {
                this.element.className = '';
            }
        }
        return this;
    }
    class(...args) {
        this.element.className = args.join(' ');
        return this;
    }
    hasClass(className) {
        return this.element.classList.contains(className);
    }
    addClass(...args) {
        for (const arg of args) {
            if (arg.includes(' ')) {
                args.splice(args.indexOf(arg), 1, ...arg.split(' '));
            }
            else if (Array.isArray(arg)) {
                args.splice(args.indexOf(arg), 1, ...arg);
            }
        }
        if (Array.isArray(args)) {
            this.element.classList.add(...args);
        }
        return this;
    }
    removeClass(...args) {
        for (const arg of args) {
            if (arg.includes(' ')) {
                args.splice(args.indexOf(arg), 1, ...arg.split(' '));
            }
        }
        if (Array.isArray(args)) {
            this.element.classList.remove(...args);
        }
        return this;
    }
    toggleClass(className, status = !this.hasClass(className)) {
        status ? this.addClass(className) : this.removeClass(className);
        return this;
    }
    styles(styles = {}) {
        if (typeof styles != 'object') {
            return this;
        }
        else if (this.element instanceof HTMLElement != true) {
            return this;
        }
        for (const [key, value] of Object.entries(styles)) {
            if (key === 'props') {
                for (const [propKey, propValue] of Object.entries(value)) {
                    this.element.style.setProperty(`--${propKey}`, propValue);
                }
            }
            this.element.style[key] = value;
        }
        return this;
    }
    removeStyles(...styles) {
        if (this.element instanceof HTMLElement != true) {
            return this;
        }
        for (const style of styles) {
            this.element.style.removeProperty(style);
        }
        return this;
    }
    on(event, callback) {
        this.addListener({
            temp: {
                [event]: callback
            }
        });
        return this;
    }
    addListener(events) {
        var _a;
        var _b;
        for (const [key, event] of Object.entries(events)) {
            for (const [listener, fn] of Object.entries(event)) {
                if (listener == 'keypress' ||
                    listener == 'keydown' ||
                    listener == 'keyup') {
                    this.attr({ tabindex: 0 });
                }
                const func = fn.bind(this);
                (_a = (_b = this.listeners)[key]) !== null && _a !== void 0 ? _a : (_b[key] = {});
                this.listeners[key][listener] = func;
                this.element.addEventListener(listener, func);
            }
        }
        return this;
    }
    removeListener(key) {
        for (const listener in this.listeners[key]) {
            this.element.removeEventListener(listener, this.listeners[key][listener]);
        }
        delete this.listeners[key];
        return this;
    }
    interval(callback, time = 1000, immediate = false) {
        const toCall = () => callback.bind(this)(this, () => clearInterval(tempInterval));
        if (immediate) {
            toCall();
        }
        let tempInterval = setInterval(toCall, time);
        this.observer({
            onRemove: () => clearInterval(tempInterval)
        });
        return this;
    }
    remove() {
        this.element.remove();
        return this;
    }
    setContent(...content) {
        return this.clear().append(...content);
    }
    append(...objs) {
        if (objs.length < 1) {
            return this;
        }
        for (const el of objs) {
            if (Array.isArray(el)) {
                objs.splice(objs.indexOf(el), 1, ...el);
            }
        }
        for (const item of objs) {
            if (item == false ||
                item == null ||
                Array.isArray(item)) {
                continue;
            }
            else if (typeof item === 'string') {
                this.element.append(item);
            }
            else {
                this.element.append(ProxyNode.extractEl(item));
            }
        }
        return this;
    }
    appendTo(obj) {
        if (obj == false) {
            return this;
        }
        obj.append(ProxyNode.extractEl(this.element));
        return this;
    }
    prependTo(obj) {
        if (obj == null) {
            return this;
        }
        obj.prepend(ProxyNode.extractEl(this.element));
        return this;
    }
    prepend(...objs) {
        if (objs.length < 1) {
            return this;
        }
        for (const el of objs) {
            if (Array.isArray(el)) {
                const i = objs.indexOf(el);
                objs.splice(i, i + el.length);
                objs.push(...el);
            }
        }
        for (const el of objs) {
            this.element.prepend(ProxyNode.extractEl(el));
        }
        return this;
    }
    focus() {
        setTimeout(() => this.element instanceof HTMLElement &&
            this.element.focus(), 0);
        return this;
    }
    scroll(x = 0, y = 0) {
        setTimeout(() => this.element.scroll(x, y), 500);
        return this;
    }
    observer(methods, options) {
        nodeObservers.create(this, methods, options);
        return this;
    }
    setTabIndex(index) {
        if (typeof index == 'number') {
            if (0 > index) {
                this.element.removeAttribute('tabindex');
            }
            else {
                this.element.setAttribute('tabindex', '0');
            }
        }
        return this;
    }
    horizontalScrolling() {
        this.on('wheel', (event) => {
            event.preventDefault();
            this.element.scrollLeft += event.deltaY;
        });
        return this;
    }
}
function generateProxyNode(el) {
    return new ProxyNode(el);
}
const newNode = new Proxy({}, {
    get(target, elementTag) {
        return generateProxyNode(document.createElement(elementTag));
    }
});
function qs(selector, element = document) {
    const currentNode = element.querySelector(selector);
    return currentNode ? new ProxyNode(currentNode) : null;
}

const splashes = [
    'Now with 50% more unpaid cat labor'
];

const random = (min = 0, max = 50) => Math.floor(Math.random() * (max + 1 - min) + min);

class Loader extends ProxyNode {
    constructor() {
        super('div');
        this.class('loader');
        this.styles({
            position: 'fixed',
            background: 'black',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            zIndex: 1000
        });
        this.logo = newNode.div
            .class('logo')
            .styles({
            fontSize: '100px',
            position: 'fixed',
            top: '-50%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            rotate: '-180deg',
            opacity: 0
        })
            .text('Orago');
        this.append(this.logo, newNode.div
            .class('splash')
            .text(splashes[random(0, splashes.length - 1)])
            .styles({
            position: 'absolute',
            bottom: '20px'
        }));
    }
    fadeIn(background, foreground) {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.animate([{ background }], { duration: 2000, easing: 'ease-in-out' });
            const fadeInLogo = this.logo.element.animate([{
                    rotate: '0deg',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 1,
                    color: foreground
                }], { duration: 2000, easing: 'ease-in-out' });
            yield new Promise(r => fadeInLogo.onfinish = r);
            this.styles({
                background
            });
            this.logo.styles({
                rotate: '0deg',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 1,
                color: foreground
            });
        });
    }
    fadeOut() {
        return __awaiter(this, void 0, void 0, function* () {
            const fadeOutLogo = this.logo.element.animate([{
                    top: '100%',
                    transform: 'translate(0, 0)',
                    left: 0,
                    rotate: '180deg',
                    opacity: 0
                }], { duration: 2000, easing: 'ease-in-out' });
            yield new Promise(r => fadeOutLogo.onfinish = r);
            this.logo.remove();
            const fadeUI = this.element.animate([{
                    top: '200%',
                    opacity: .5
                }], { duration: 1000, easing: 'ease-in-out' });
            yield new Promise(r => fadeUI.onfinish = r);
            this.remove();
        });
    }
}

class ProjectNode extends ProxyNode {
    constructor(title, description, extras) {
        var _a, _b;
        super('div');
        this.class('project-card');
        this.append(this.titleNode = newNode.h2.class('title').text(title), this.descriptionNode = newNode.div.class('description').text(description), (extras === null || extras === void 0 ? void 0 : extras.link) != null &&
            (this.linkContainerNode = newNode.div
                .class('link-container')
                .append(newNode.div
                .class('link')
                .text((_b = (_a = extras.link) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : 'View' + ' >')
                .ref(link => {
                if (extras.link != null) {
                    const { click } = extras.link;
                    if (typeof click === 'string') {
                        link.on('click', () => location.href = click);
                    }
                    else {
                        link.on('click', click);
                    }
                }
            }))));
    }
}
class TempImageProjectNode extends ProjectNode {
    constructor(src) {
        super('', '');
        this.styles({
            width: 'fit-content'
        });
        this.setContent(newNode.img.attr({ src }));
    }
}

const ProjectList = [
    new ProjectNode('Meown', `Meown is a bla bla bla bla 
		bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bl
		a bla bla bla bla bla bla bla bla bla bla bla 
		bla bla bla`, {
        link: {
            click: 'https://meown.net'
        }
    }),
    new TempImageProjectNode('assets/istorik-dancing-cat.gif')
];

const mainNode = qs('#main');
const bodyNode = qs('body');

class Emitter {
    constructor(all) {
        this.all = new Map();
        if (all instanceof Map) {
            this.all = all;
        }
        else if (Array.isArray(all)) {
            this.all = new Map(all);
        }
    }
    on(event, handler) {
        const handlers = this.all.get(event);
        if (handlers) {
            handlers.push(handler);
        }
        else {
            this.all.set(event, [handler]);
        }
        return this;
    }
    off(event, handler) {
        const handlers = this.all.get(event);
        if (handlers) {
            if (handler) {
                const index = handlers.indexOf(handler);
                if (index !== -1) {
                    handlers.splice(index, 1);
                }
            }
            else {
                this.all.set(event, []);
            }
        }
        return this;
    }
    emit(event, ...args) {
        let handlers = this.all.get(event);
        if (handlers) {
            for (const handler of handlers.slice()) {
                handler(...args);
            }
        }
        if (handlers = this.all.get('*')) {
            for (const handler of handlers.slice()) {
                handler(event, ...args);
            }
        }
        return this;
    }
    *[Symbol.iterator]() {
        for (const entry of this.all.entries()) {
            yield entry;
        }
    }
}

class Page extends ProxyNode {
    constructor() {
        super('div');
        this.colors = {
            background: 'black',
            foreground: 'white'
        };
        this.events = new Emitter();
    }
    setColors(background, foreground) {
        this.colors.background = background;
        this.colors.foreground = foreground;
        bodyNode.styles({
            props: {
                'color-background': background,
                'color-foreground': foreground
            }
        });
        return this;
    }
    load() {
    }
}

class HomePage extends Page {
    load() {
        this.styles({
            padding: '5px'
        });
        this.setColors('#F08A4B', '#B05A24');
        this.append(newNode.h2
            .class('title-header')
            .text('Projects'), newNode.div
            .class('project-card-container')
            .append(ProjectList), newNode.hr, newNode.div
            .class('links')
            .append(newNode.a
            .text('Discord')
            .attr({ href: 'https://discord.gg/T6tNfcY3Jg' }), newNode.a
            .text('Youtube')
            .attr({ href: 'https://discord.gg/T6tNfcY3Jg' })));
    }
}

class MissingPage extends Page {
    load() {
        this
            .styles({
            padding: '5px'
        })
            .append(newNode.h1.text('Page not found'));
    }
}

const socials = [
    ['Discord', {
            url: 'https://discord.gg/ytBtmHJjmE',
            background: '#738adb'
        }],
    ['Youtube', {
            url: 'https://www.youtube.com/channel/UCbVQOO0xb57ja74eLJQJ3Kg',
            background: '#ff0000'
        }],
    ['Twitch', {
            url: 'https://www.twitch.tv/oragocat',
            background: '#6441a5'
        }],
    ['Twitter', {
            url: 'https://twitter.com/OragoMosh',
            background: '#1DA1F2'
        }],
    ['Reddit', {
            url: 'https://www.reddit.com/user/Orago51',
            background: '#FF4301'
        }],
    ['Instagram', {
            url: 'https://www.instagram.com/oragocat/',
            background: '#405DE6'
        }],
    ['Minecraft', {
            url: 'https://namemc.com/profile/9d9380ad-ccda-46e2-9fef-04e4541be0e1',
            background: '#40ae33'
        }]
];
class SocialButton extends ProxyNode {
    constructor(name, options) {
        super('a');
        this.text(name);
        this.attr({ href: options.url });
        this.styles({
            color: 'white',
            flex: '1 1',
            borderRadius: '5px',
            margin: '5px',
            padding: '10px',
            fontSize: '20px',
            textDecoration: 'none',
            background: options.background
        });
    }
}
class socials$1 extends Page {
    load() {
        this.setColors('#EEAB53', '#DA7C01');
        this.styles({
            padding: '5px'
        });
        this.append(newNode.h2
            .class('title-header')
            .text('Socials'), newNode.div
            .styles({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        })
            .append(socials.map(([name, options]) => {
            return new SocialButton(name, options);
        })), newNode.hr, newNode.div
            .class('links')
            .append(newNode.a
            .text('Discord')
            .attr({ href: 'https://discord.gg/T6tNfcY3Jg' }), newNode.a
            .text('Youtube')
            .attr({ href: 'https://discord.gg/T6tNfcY3Jg' })));
    }
}

function getPage() {
    const curPage = new URLSearchParams(location.search);
    const pageValue = curPage.get('page');
    const paths = pageValue != null ? pageValue.split('') : location.pathname.split('/').splice(1);
    switch (paths[0]) {
        case 'socials':
            return socials$1;
        case 'home':
        case '':
        case null:
            return HomePage;
        default:
            return MissingPage;
    }
}

function runPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const page = new (getPage());
        const loader = new Loader();
        page.load();
        mainNode.append(loader);
        yield loader.fadeIn(page.colors.background, page.colors.foreground);
        yield new Promise(r => setTimeout(r, 1000));
        loader.fadeOut();
        mainNode.append(page);
    });
}
runPage();
