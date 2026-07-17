//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, a) => (a = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), u = {
	name: "mt-block-editor",
	version: "1.3.0",
	description: "",
	type: "module",
	main: "docs/dist/mt-block-editor.js",
	exports: { ".": { default: "./docs/dist/mt-block-editor.js" } },
	scripts: {
		build: "vite build && npm run build-register-boilerplate-blocks",
		"build-register-boilerplate-blocks": "tsc --project tsconfig.rbb.json && mkdirp docs/dist && terser -c -m --source-map 'content=\"./rbb-dist/src/register-boilerplate-blocks.js.map\"' --source-map 'url=\"register-boilerplate-blocks.js.map\"' ./rbb-dist/src/register-boilerplate-blocks.js -o ./docs/dist/register-boilerplate-blocks.js && rimraf ./rbb-dist",
		"build-mt-block-editor-block": "mv node_modules node_modules_tmp; ( cd sub-projects/mt-block-editor-block && npm run build ) ; mv node_modules_tmp node_modules",
		"build-test-blocks": "vite build --config cypress/blocks/vite.config.ts",
		install: "rm -fr docs/mt-rich-text-editor && cp -R node_modules/@movabletype/mt-rich-text-editor/dist docs/mt-rich-text-editor",
		start: "vite",
		preview: "vite preview",
		test: "vitest run",
		"test:watch": "vitest",
		"test:coverage": "vitest run --coverage",
		"check-types": "tsc",
		lint: "eslint --fix --ext .ts --ext .tsx ./src",
		"cypress:build": "npm run build && npm run build-mt-block-editor-block && npm run build-test-blocks",
		"cypress:open": "npm run cypress:build && cypress open",
		"cypress:run": "npm run cypress:build && cypress run"
	},
	husky: { hooks: { "pre-commit": "npm run lint && npx tsc && npm run build" } },
	author: "Taku Amano <tamano@sixapart.com>",
	devDependencies: {
		"@movabletype/app": "./@movabletype/movabletype-app-0.0.1.tgz",
		"@movabletype/mt-rich-text-editor": "./@movabletype/movabletype-mt-rich-text-editor-0.0.1.tgz",
		"@movabletype/svelte-components": "./@movabletype/movabletype-svelte-components-0.0.4.tgz",
		"@types/dompurify": "^2.0.4",
		"@types/node": "^22.0.0",
		"@types/platform": "^1.3.4",
		"@types/react": "^19.2.8",
		"@types/react-dom": "^19.2.3",
		"@types/react-transition-group": "^4.4.12",
		"@typescript-eslint/eslint-plugin": "^5.33.0",
		"@typescript-eslint/parser": "^5.33.0",
		"@vitejs/plugin-react": "^6.0.2",
		cypress: "^15.15.0",
		eslint: "^8.21.0",
		"eslint-config-prettier": "^8.5.0",
		"eslint-plugin-prettier": "^4.2.1",
		"eslint-plugin-react": "^7.30.1",
		husky: "^4.3.0",
		"i18next-parser": "^9.0.0",
		jsdom: "^26.0.0",
		mkdirp: "^1.0.4",
		"postcss-flexbugs-fixes": "^5.0.2",
		"postcss-import": "^14.0.2",
		"postcss-mixins": "^8.0.0",
		"postcss-nested": "^5.0.5",
		"postcss-preset-env": "^7.3.1",
		"postcss-simple-vars": "^6.0.3",
		prettier: "^2.7.1",
		"prosemirror-view": "./prosemirror/prosemirror-view-1.38.1.tgz",
		"react-dnd": "^16.0.1",
		"react-dnd-html5-backend": "^16.0.1",
		"react-dnd-touch-backend": "^16.0.1",
		rimraf: "^3.0.2",
		"sass-embedded": "^1.97.2",
		terser: "^5.46.0",
		tinymce: "^6.8.4",
		typescript: "^5.9.3",
		vite: "^8.0.16",
		"vite-svg-loader": "^5.1.0",
		vitest: "^4.1.2"
	},
	dependencies: {
		dompurify: "^3.4.10",
		eventemitter3: "^4.0.7",
		i18next: "^19.8.2",
		"i18next-xhr-backend": "^3.2.2",
		platform: "^1.3.6",
		react: "^19.2.3",
		"react-dom": "^19.2.3",
		"react-shadow": "^20.6.0",
		"react-transition-group": "^4.4.5"
	}
}, d = {}, f = {
	"Class Name": "クラス名",
	"+ add new block": "＋ ブロックを追加",
	"+ add new {{label}} block": "＋ {{label}}を追加",
	"Insert before": "上にブロックを追加",
	"Insert after": "下にブロックを追加",
	"Remove block": "ブロックを削除",
	"Are you sure you want to remove the block?": "ブロックを削除してもよろしいですか？",
	Column: "カラム",
	Columns: "マルチカラム",
	"Default Value": "既定値",
	Edit: "編集",
	File: "ファイル",
	"Link URL": "リンク先URL",
	"Text to display": "リンク元テキスト",
	"Help Text": "説明",
	"Please input {{label}}.": "{{label}}を入力してください",
	"Horizontal Rule": "罫線",
	HTML: "HTML",
	Image: "画像",
	"Image URL": "画像URL",
	"Alternative Text": "代替テキスト",
	Caption: "キャプション",
	Label: "ラベル",
	Table: "テーブル",
	"Text Block": "テキストブロック",
	Text: "テキスト",
	"{{columns}} columns": "{{columns}}カラム",
	Paragraph: "段落",
	"Heading 1": "見出し1",
	"Heading 2": "見出し2",
	"Heading 3": "見出し3",
	"Heading 4": "見出し4",
	"Heading 5": "見出し5",
	"Heading 6": "見出し6",
	Preformatted: "書式設定済み",
	Title: "タイトル",
	"Target Attribute": "ターゲット属性",
	"Insert Link": "リンクの挿入",
	None: "なし",
	"New window": "新規ウィンドウ",
	Close: "閉じる",
	Save: "保存",
	Copy: "コピー",
	Paste: "ペースト",
	Duplicate: "複製",
	Delete: "削除"
};
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/typeof.js
function p(e) {
	"@babel/helpers - typeof";
	return p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, p(e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function m(e, t) {
	if (p(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (p(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function h(e) {
	var t = m(e, "string");
	return p(t) == "symbol" ? t : t + "";
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/defineProperty.js
function g(e, t, n) {
	return (t = h(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectSpread.js
function _(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : Object(arguments[t]), r = Object.keys(n);
		typeof Object.getOwnPropertySymbols == "function" && r.push.apply(r, Object.getOwnPropertySymbols(n).filter(function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		})), r.forEach(function(t) {
			g(e, t, n[t]);
		});
	}
	return e;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function v(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/createClass.js
function y(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, h(r.key), r);
	}
}
function b(e, t, n) {
	return t && y(e.prototype, t), n && y(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function x(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function S(e, t) {
	if (t && (p(t) == "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return x(e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function C(e) {
	return C = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, C(e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function w(e, t) {
	return w = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, w(e, t);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inherits.js
function T(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && w(e, t);
}
//#endregion
//#region node_modules/i18next/dist/esm/i18next.js
var E = {
	type: "logger",
	log: function(e) {
		this.output("log", e);
	},
	warn: function(e) {
		this.output("warn", e);
	},
	error: function(e) {
		this.output("error", e);
	},
	output: function(e, t) {
		console && console[e] && console[e].apply(console, t);
	}
}, D = new (function() {
	function e(t) {
		var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		v(this, e), this.init(t, n);
	}
	return b(e, [
		{
			key: "init",
			value: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				this.prefix = t.prefix || "i18next:", this.logger = e || E, this.options = t, this.debug = t.debug;
			}
		},
		{
			key: "setDebug",
			value: function(e) {
				this.debug = e;
			}
		},
		{
			key: "log",
			value: function() {
				var e = [...arguments];
				return this.forward(e, "log", "", !0);
			}
		},
		{
			key: "warn",
			value: function() {
				var e = [...arguments];
				return this.forward(e, "warn", "", !0);
			}
		},
		{
			key: "error",
			value: function() {
				var e = [...arguments];
				return this.forward(e, "error", "");
			}
		},
		{
			key: "deprecate",
			value: function() {
				var e = [...arguments];
				return this.forward(e, "warn", "WARNING DEPRECATED: ", !0);
			}
		},
		{
			key: "forward",
			value: function(e, t, n, r) {
				return r && !this.debug ? null : (typeof e[0] == "string" && (e[0] = `${n}${this.prefix} ${e[0]}`), this.logger[t](e));
			}
		},
		{
			key: "create",
			value: function(t) {
				return new e(this.logger, _({}, { prefix: `${this.prefix}:${t}:` }, this.options));
			}
		}
	]), e;
}())(), O = function() {
	function e() {
		v(this, e), this.observers = {};
	}
	return b(e, [
		{
			key: "on",
			value: function(e, t) {
				var n = this;
				return e.split(" ").forEach(function(e) {
					n.observers[e] = n.observers[e] || [], n.observers[e].push(t);
				}), this;
			}
		},
		{
			key: "off",
			value: function(e, t) {
				if (this.observers[e]) {
					if (!t) {
						delete this.observers[e];
						return;
					}
					this.observers[e] = this.observers[e].filter(function(e) {
						return e !== t;
					});
				}
			}
		},
		{
			key: "emit",
			value: function(e) {
				var t = [...arguments].slice(1);
				this.observers[e] && [].concat(this.observers[e]).forEach(function(e) {
					e.apply(void 0, t);
				}), this.observers["*"] && [].concat(this.observers["*"]).forEach(function(n) {
					n.apply(n, [e].concat(t));
				});
			}
		}
	]), e;
}();
function k() {
	var e, t, n = new Promise(function(n, r) {
		e = n, t = r;
	});
	return n.resolve = e, n.reject = t, n;
}
function A(e) {
	return e == null ? "" : "" + e;
}
function j(e, t, n) {
	e.forEach(function(e) {
		t[e] && (n[e] = t[e]);
	});
}
function M(e, t, n) {
	function r(e) {
		return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e;
	}
	function i() {
		return !e || typeof e == "string";
	}
	for (var a = typeof t == "string" ? t.split(".") : [].concat(t); a.length > 1;) {
		if (i()) return {};
		var o = r(a.shift());
		!e[o] && n && (e[o] = new n()), e = e[o];
	}
	return i() ? {} : {
		obj: e,
		k: r(a.shift())
	};
}
function N(e, t, n) {
	var r = M(e, t, Object), i = r.obj, a = r.k;
	i[a] = n;
}
function P(e, t, n, r) {
	var i = M(e, t, Object), a = i.obj, o = i.k;
	a[o] = a[o] || [], r && (a[o] = a[o].concat(n)), r || a[o].push(n);
}
function F(e, t) {
	var n = M(e, t), r = n.obj, i = n.k;
	if (r) return r[i];
}
function I(e, t, n) {
	var r = F(e, n);
	return r === void 0 ? F(t, n) : r;
}
function L(e, t, n) {
	for (var r in t) r !== "__proto__" && (r in e ? typeof e[r] == "string" || e[r] instanceof String || typeof t[r] == "string" || t[r] instanceof String ? n && (e[r] = t[r]) : L(e[r], t[r], n) : e[r] = t[r]);
	return e;
}
function R(e) {
	return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var z = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;",
	"/": "&#x2F;"
};
function B(e) {
	return typeof e == "string" ? e.replace(/[&<>"'\/]/g, function(e) {
		return z[e];
	}) : e;
}
var V = typeof window < "u" && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1, H = function(e) {
	T(t, e);
	function t(e) {
		var n, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
			ns: ["translation"],
			defaultNS: "translation"
		};
		return v(this, t), n = S(this, C(t).call(this)), V && O.call(x(n)), n.data = e || {}, n.options = r, n.options.keySeparator === void 0 && (n.options.keySeparator = "."), n;
	}
	return b(t, [
		{
			key: "addNamespaces",
			value: function(e) {
				this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
			}
		},
		{
			key: "removeNamespaces",
			value: function(e) {
				var t = this.options.ns.indexOf(e);
				t > -1 && this.options.ns.splice(t, 1);
			}
		},
		{
			key: "getResource",
			value: function(e, t, n) {
				var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = r.keySeparator === void 0 ? this.options.keySeparator : r.keySeparator, a = [e, t];
				return n && typeof n != "string" && (a = a.concat(n)), n && typeof n == "string" && (a = a.concat(i ? n.split(i) : n)), e.indexOf(".") > -1 && (a = e.split(".")), F(this.data, a);
			}
		},
		{
			key: "addResource",
			value: function(e, t, n, r) {
				var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : { silent: !1 }, a = this.options.keySeparator;
				a === void 0 && (a = ".");
				var o = [e, t];
				n && (o = o.concat(a ? n.split(a) : n)), e.indexOf(".") > -1 && (o = e.split("."), r = t, t = o[1]), this.addNamespaces(t), N(this.data, o, r), i.silent || this.emit("added", e, t, n, r);
			}
		},
		{
			key: "addResources",
			value: function(e, t, n) {
				var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : { silent: !1 };
				for (var i in n) (typeof n[i] == "string" || Object.prototype.toString.apply(n[i]) === "[object Array]") && this.addResource(e, t, i, n[i], { silent: !0 });
				r.silent || this.emit("added", e, t, n);
			}
		},
		{
			key: "addResourceBundle",
			value: function(e, t, n, r, i) {
				var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : { silent: !1 }, o = [e, t];
				e.indexOf(".") > -1 && (o = e.split("."), r = n, n = t, t = o[1]), this.addNamespaces(t);
				var s = F(this.data, o) || {};
				r ? L(s, n, i) : s = _({}, s, n), N(this.data, o, s), a.silent || this.emit("added", e, t, n);
			}
		},
		{
			key: "removeResourceBundle",
			value: function(e, t) {
				this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t);
			}
		},
		{
			key: "hasResourceBundle",
			value: function(e, t) {
				return this.getResource(e, t) !== void 0;
			}
		},
		{
			key: "getResourceBundle",
			value: function(e, t) {
				return t ||= this.options.defaultNS, this.options.compatibilityAPI === "v1" ? _({}, {}, this.getResource(e, t)) : this.getResource(e, t);
			}
		},
		{
			key: "getDataByLanguage",
			value: function(e) {
				return this.data[e];
			}
		},
		{
			key: "toJSON",
			value: function() {
				return this.data;
			}
		}
	]), t;
}(O), ee = {
	processors: {},
	addPostProcessor: function(e) {
		this.processors[e.name] = e;
	},
	handle: function(e, t, n, r, i) {
		var a = this;
		return e.forEach(function(e) {
			a.processors[e] && (t = a.processors[e].process(t, n, r, i));
		}), t;
	}
}, te = {}, ne = function(e) {
	T(t, e);
	function t(e) {
		var n, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		return v(this, t), n = S(this, C(t).call(this)), V && O.call(x(n)), j([
			"resourceStore",
			"languageUtils",
			"pluralResolver",
			"interpolator",
			"backendConnector",
			"i18nFormat",
			"utils"
		], e, x(n)), n.options = r, n.options.keySeparator === void 0 && (n.options.keySeparator = "."), n.logger = D.create("translator"), n;
	}
	return b(t, [
		{
			key: "changeLanguage",
			value: function(e) {
				e && (this.language = e);
			}
		},
		{
			key: "exists",
			value: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { interpolation: {} }, n = this.resolve(e, t);
				return n && n.res !== void 0;
			}
		},
		{
			key: "extractFromKey",
			value: function(e, t) {
				var n = t.nsSeparator === void 0 ? this.options.nsSeparator : t.nsSeparator;
				n === void 0 && (n = ":");
				var r = t.keySeparator === void 0 ? this.options.keySeparator : t.keySeparator, i = t.ns || this.options.defaultNS;
				if (n && e.indexOf(n) > -1) {
					var a = e.match(this.interpolator.nestingRegexp);
					if (a && a.length > 0) return {
						key: e,
						namespaces: i
					};
					var o = e.split(n);
					(n !== r || n === r && this.options.ns.indexOf(o[0]) > -1) && (i = o.shift()), e = o.join(r);
				}
				return typeof i == "string" && (i = [i]), {
					key: e,
					namespaces: i
				};
			}
		},
		{
			key: "translate",
			value: function(e, t, n) {
				var r = this;
				if (p(t) !== "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), t ||= {}, e == null) return "";
				Array.isArray(e) || (e = [String(e)]);
				var i = t.keySeparator === void 0 ? this.options.keySeparator : t.keySeparator, a = this.extractFromKey(e[e.length - 1], t), o = a.key, s = a.namespaces, c = s[s.length - 1], l = t.lng || this.language, u = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
				if (l && l.toLowerCase() === "cimode") return u ? c + (t.nsSeparator || this.options.nsSeparator) + o : o;
				var d = this.resolve(e, t), f = d && d.res, m = d && d.usedKey || o, h = d && d.exactUsedKey || o, g = Object.prototype.toString.apply(f), v = [
					"[object Number]",
					"[object Function]",
					"[object RegExp]"
				], y = t.joinArrays === void 0 ? this.options.joinArrays : t.joinArrays, b = !this.i18nFormat || this.i18nFormat.handleAsObject;
				if (b && f && typeof f != "string" && typeof f != "boolean" && typeof f != "number" && v.indexOf(g) < 0 && !(typeof y == "string" && g === "[object Array]")) {
					if (!t.returnObjects && !this.options.returnObjects) return this.logger.warn("accessing an object - but returnObjects options is not enabled!"), this.options.returnedObjectHandler ? this.options.returnedObjectHandler(m, f, t) : `key '${o} (${this.language})' returned an object instead of string.`;
					if (i) {
						var x = g === "[object Array]", S = x ? [] : {}, C = x ? h : m;
						for (var w in f) if (Object.prototype.hasOwnProperty.call(f, w)) {
							var T = `${C}${i}${w}`;
							S[w] = this.translate(T, _({}, t, {
								joinArrays: !1,
								ns: s
							})), S[w] === T && (S[w] = f[w]);
						}
						f = S;
					}
				} else if (b && typeof y == "string" && g === "[object Array]") f = f.join(y), f &&= this.extendTranslation(f, e, t, n);
				else {
					var E = !1, D = !1;
					if (!this.isValidLookup(f) && t.defaultValue !== void 0) {
						if (E = !0, t.count !== void 0) {
							var O = this.pluralResolver.getSuffix(l, t.count);
							f = t[`defaultValue${O}`];
						}
						f ||= t.defaultValue;
					}
					this.isValidLookup(f) || (D = !0, f = o);
					var k = t.defaultValue && t.defaultValue !== f && this.options.updateMissing;
					if (D || E || k) {
						if (this.logger.log(k ? "updateKey" : "missingKey", l, c, o, k ? t.defaultValue : f), i) {
							var A = this.resolve(o, _({}, t, { keySeparator: !1 }));
							A && A.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
						}
						var j = [], M = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
						if (this.options.saveMissingTo === "fallback" && M && M[0]) for (var N = 0; N < M.length; N++) j.push(M[N]);
						else this.options.saveMissingTo === "all" ? j = this.languageUtils.toResolveHierarchy(t.lng || this.language) : j.push(t.lng || this.language);
						var P = function(e, n) {
							r.options.missingKeyHandler ? r.options.missingKeyHandler(e, c, n, k ? t.defaultValue : f, k, t) : r.backendConnector && r.backendConnector.saveMissing && r.backendConnector.saveMissing(e, c, n, k ? t.defaultValue : f, k, t), r.emit("missingKey", e, c, n, f);
						};
						if (this.options.saveMissing) {
							var F = t.count !== void 0 && typeof t.count != "string";
							this.options.saveMissingPlurals && F ? j.forEach(function(e) {
								r.pluralResolver.getPluralFormsOfKey(e, o).forEach(function(t) {
									return P([e], t);
								});
							}) : P(j, o);
						}
					}
					f = this.extendTranslation(f, e, t, d, n), D && f === o && this.options.appendNamespaceToMissingKey && (f = `${c}:${o}`), D && this.options.parseMissingKeyHandler && (f = this.options.parseMissingKeyHandler(f));
				}
				return f;
			}
		},
		{
			key: "extendTranslation",
			value: function(e, t, n, r, i) {
				var a = this;
				if (this.i18nFormat && this.i18nFormat.parse) e = this.i18nFormat.parse(e, n, r.usedLng, r.usedNS, r.usedKey, { resolved: r });
				else if (!n.skipInterpolation) {
					n.interpolation && this.interpolator.init(_({}, n, { interpolation: _({}, this.options.interpolation, n.interpolation) }));
					var o = n.interpolation && n.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables, s;
					if (o) {
						var c = e.match(this.interpolator.nestingRegexp);
						s = c && c.length;
					}
					var l = n.replace && typeof n.replace != "string" ? n.replace : n;
					if (this.options.interpolation.defaultVariables && (l = _({}, this.options.interpolation.defaultVariables, l)), e = this.interpolator.interpolate(e, l, n.lng || this.language, n), o) {
						var u = e.match(this.interpolator.nestingRegexp), d = u && u.length;
						s < d && (n.nest = !1);
					}
					n.nest !== !1 && (e = this.interpolator.nest(e, function() {
						var e = [...arguments];
						return i && i[0] === e[0] && !n.context ? (a.logger.warn(`It seems you are nesting recursively key: ${e[0]} in key: ${t[0]}`), null) : a.translate.apply(a, e.concat([t]));
					}, n)), n.interpolation && this.interpolator.reset();
				}
				var f = n.postProcess || this.options.postProcess, p = typeof f == "string" ? [f] : f;
				return e != null && p && p.length && n.applyPostProcessor !== !1 && (e = ee.handle(p, e, t, this.options && this.options.postProcessPassResolved ? _({ i18nResolved: r }, n) : n, this)), e;
			}
		},
		{
			key: "resolve",
			value: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r, i, a, o, s;
				return typeof e == "string" && (e = [e]), e.forEach(function(e) {
					if (!t.isValidLookup(r)) {
						var c = t.extractFromKey(e, n), l = c.key;
						i = l;
						var u = c.namespaces;
						t.options.fallbackNS && (u = u.concat(t.options.fallbackNS));
						var d = n.count !== void 0 && typeof n.count != "string", f = n.context !== void 0 && typeof n.context == "string" && n.context !== "", p = n.lngs ? n.lngs : t.languageUtils.toResolveHierarchy(n.lng || t.language, n.fallbackLng);
						u.forEach(function(e) {
							t.isValidLookup(r) || (s = e, !te[`${p[0]}-${e}`] && t.utils && t.utils.hasLoadedNamespace && !t.utils.hasLoadedNamespace(s) && (te[`${p[0]}-${e}`] = !0, t.logger.warn(`key "${i}" for languages "${p.join(", ")}" won't get resolved as namespace "${s}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), p.forEach(function(i) {
								if (!t.isValidLookup(r)) {
									o = i;
									var s = l, c = [s];
									if (t.i18nFormat && t.i18nFormat.addLookupKeys) t.i18nFormat.addLookupKeys(c, l, i, e, n);
									else {
										var u;
										d && (u = t.pluralResolver.getSuffix(i, n.count)), d && f && c.push(s + u), f && c.push(s += `${t.options.contextSeparator}${n.context}`), d && c.push(s += u);
									}
									for (var p; p = c.pop();) t.isValidLookup(r) || (a = p, r = t.getResource(i, e, p, n));
								}
							}));
						});
					}
				}), {
					res: r,
					usedKey: i,
					exactUsedKey: a,
					usedLng: o,
					usedNS: s
				};
			}
		},
		{
			key: "isValidLookup",
			value: function(e) {
				return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
			}
		},
		{
			key: "getResource",
			value: function(e, t, n) {
				var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
				return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, n, r) : this.resourceStore.getResource(e, t, n, r);
			}
		}
	]), t;
}(O);
function re(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
var ie = function() {
	function e(t) {
		v(this, e), this.options = t, this.whitelist = this.options.supportedLngs || !1, this.supportedLngs = this.options.supportedLngs || !1, this.logger = D.create("languageUtils");
	}
	return b(e, [
		{
			key: "getScriptPartFromCode",
			value: function(e) {
				if (!e || e.indexOf("-") < 0) return null;
				var t = e.split("-");
				return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
			}
		},
		{
			key: "getLanguagePartFromCode",
			value: function(e) {
				if (!e || e.indexOf("-") < 0) return e;
				var t = e.split("-");
				return this.formatLanguageCode(t[0]);
			}
		},
		{
			key: "formatLanguageCode",
			value: function(e) {
				if (typeof e == "string" && e.indexOf("-") > -1) {
					var t = [
						"hans",
						"hant",
						"latn",
						"cyrl",
						"cans",
						"mong",
						"arab"
					], n = e.split("-");
					return this.options.lowerCaseLng ? n = n.map(function(e) {
						return e.toLowerCase();
					}) : n.length === 2 ? (n[0] = n[0].toLowerCase(), n[1] = n[1].toUpperCase(), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = re(n[1].toLowerCase()))) : n.length === 3 && (n[0] = n[0].toLowerCase(), n[1].length === 2 && (n[1] = n[1].toUpperCase()), n[0] !== "sgn" && n[2].length === 2 && (n[2] = n[2].toUpperCase()), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = re(n[1].toLowerCase())), t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = re(n[2].toLowerCase()))), n.join("-");
				}
				return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
			}
		},
		{
			key: "isWhitelisted",
			value: function(e) {
				return this.logger.deprecate("languageUtils.isWhitelisted", "function \"isWhitelisted\" will be renamed to \"isSupportedCode\" in the next major - please make sure to rename it's usage asap."), this.isSupportedCode(e);
			}
		},
		{
			key: "isSupportedCode",
			value: function(e) {
				return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1;
			}
		},
		{
			key: "getBestMatchFromCodes",
			value: function(e) {
				var t = this;
				if (!e) return null;
				var n;
				return e.forEach(function(e) {
					if (!n) {
						var r = t.formatLanguageCode(e);
						(!t.options.supportedLngs || t.isSupportedCode(r)) && (n = r);
					}
				}), !n && this.options.supportedLngs && e.forEach(function(e) {
					if (!n) {
						var r = t.getLanguagePartFromCode(e);
						if (t.isSupportedCode(r)) return n = r;
						n = t.options.supportedLngs.find(function(e) {
							if (e.indexOf(r) === 0) return e;
						});
					}
				}), n ||= this.getFallbackCodes(this.options.fallbackLng)[0], n;
			}
		},
		{
			key: "getFallbackCodes",
			value: function(e, t) {
				if (!e) return [];
				if (typeof e == "function" && (e = e(t)), typeof e == "string" && (e = [e]), Object.prototype.toString.apply(e) === "[object Array]") return e;
				if (!t) return e.default || [];
				var n = e[t];
				return n ||= e[this.getScriptPartFromCode(t)], n ||= e[this.formatLanguageCode(t)], n ||= e[this.getLanguagePartFromCode(t)], n ||= e.default, n || [];
			}
		},
		{
			key: "toResolveHierarchy",
			value: function(e, t) {
				var n = this, r = this.getFallbackCodes(t || this.options.fallbackLng || [], e), i = [], a = function(e) {
					e && (n.isSupportedCode(e) ? i.push(e) : n.logger.warn(`rejecting language code not found in supportedLngs: ${e}`));
				};
				return typeof e == "string" && e.indexOf("-") > -1 ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(e))) : typeof e == "string" && a(this.formatLanguageCode(e)), r.forEach(function(e) {
					i.indexOf(e) < 0 && a(n.formatLanguageCode(e));
				}), i;
			}
		}
	]), e;
}(), U = [
	{
		lngs: [
			"ach",
			"ak",
			"am",
			"arn",
			"br",
			"fil",
			"gun",
			"ln",
			"mfe",
			"mg",
			"mi",
			"oc",
			"pt",
			"pt-BR",
			"tg",
			"ti",
			"tr",
			"uz",
			"wa"
		],
		nr: [1, 2],
		fc: 1
	},
	{
		lngs: /* @__PURE__ */ "af.an.ast.az.bg.bn.ca.da.de.dev.el.en.eo.es.et.eu.fi.fo.fur.fy.gl.gu.ha.hi.hu.hy.ia.it.kn.ku.lb.mai.ml.mn.mr.nah.nap.nb.ne.nl.nn.no.nso.pa.pap.pms.ps.pt-PT.rm.sco.se.si.so.son.sq.sv.sw.ta.te.tk.ur.yo".split("."),
		nr: [1, 2],
		fc: 2
	},
	{
		lngs: [
			"ay",
			"bo",
			"cgg",
			"fa",
			"ht",
			"id",
			"ja",
			"jbo",
			"ka",
			"kk",
			"km",
			"ko",
			"ky",
			"lo",
			"ms",
			"sah",
			"su",
			"th",
			"tt",
			"ug",
			"vi",
			"wo",
			"zh"
		],
		nr: [1],
		fc: 3
	},
	{
		lngs: [
			"be",
			"bs",
			"cnr",
			"dz",
			"hr",
			"ru",
			"sr",
			"uk"
		],
		nr: [
			1,
			2,
			5
		],
		fc: 4
	},
	{
		lngs: ["ar"],
		nr: [
			0,
			1,
			2,
			3,
			11,
			100
		],
		fc: 5
	},
	{
		lngs: ["cs", "sk"],
		nr: [
			1,
			2,
			5
		],
		fc: 6
	},
	{
		lngs: ["csb", "pl"],
		nr: [
			1,
			2,
			5
		],
		fc: 7
	},
	{
		lngs: ["cy"],
		nr: [
			1,
			2,
			3,
			8
		],
		fc: 8
	},
	{
		lngs: ["fr"],
		nr: [1, 2],
		fc: 9
	},
	{
		lngs: ["ga"],
		nr: [
			1,
			2,
			3,
			7,
			11
		],
		fc: 10
	},
	{
		lngs: ["gd"],
		nr: [
			1,
			2,
			3,
			20
		],
		fc: 11
	},
	{
		lngs: ["is"],
		nr: [1, 2],
		fc: 12
	},
	{
		lngs: ["jv"],
		nr: [0, 1],
		fc: 13
	},
	{
		lngs: ["kw"],
		nr: [
			1,
			2,
			3,
			4
		],
		fc: 14
	},
	{
		lngs: ["lt"],
		nr: [
			1,
			2,
			10
		],
		fc: 15
	},
	{
		lngs: ["lv"],
		nr: [
			1,
			2,
			0
		],
		fc: 16
	},
	{
		lngs: ["mk"],
		nr: [1, 2],
		fc: 17
	},
	{
		lngs: ["mnk"],
		nr: [
			0,
			1,
			2
		],
		fc: 18
	},
	{
		lngs: ["mt"],
		nr: [
			1,
			2,
			11,
			20
		],
		fc: 19
	},
	{
		lngs: ["or"],
		nr: [2, 1],
		fc: 2
	},
	{
		lngs: ["ro"],
		nr: [
			1,
			2,
			20
		],
		fc: 20
	},
	{
		lngs: ["sl"],
		nr: [
			5,
			1,
			2,
			3
		],
		fc: 21
	},
	{
		lngs: ["he", "iw"],
		nr: [
			1,
			2,
			20,
			21
		],
		fc: 22
	}
], ae = {
	1: function(e) {
		return Number(e > 1);
	},
	2: function(e) {
		return Number(e != 1);
	},
	3: function(e) {
		return 0;
	},
	4: function(e) {
		return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
	},
	5: function(e) {
		return Number(e == 0 ? 0 : e == 1 ? 1 : e == 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5);
	},
	6: function(e) {
		return Number(e == 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2);
	},
	7: function(e) {
		return Number(e == 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
	},
	8: function(e) {
		return Number(e == 1 ? 0 : e == 2 ? 1 : e != 8 && e != 11 ? 2 : 3);
	},
	9: function(e) {
		return Number(e >= 2);
	},
	10: function(e) {
		return Number(e == 1 ? 0 : e == 2 ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4);
	},
	11: function(e) {
		return Number(e == 1 || e == 11 ? 0 : e == 2 || e == 12 ? 1 : e > 2 && e < 20 ? 2 : 3);
	},
	12: function(e) {
		return Number(e % 10 != 1 || e % 100 == 11);
	},
	13: function(e) {
		return Number(e !== 0);
	},
	14: function(e) {
		return Number(e == 1 ? 0 : e == 2 ? 1 : e == 3 ? 2 : 3);
	},
	15: function(e) {
		return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
	},
	16: function(e) {
		return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e === 0 ? 2 : 1);
	},
	17: function(e) {
		return Number(e == 1 || e % 10 == 1 && e % 100 != 11 ? 0 : 1);
	},
	18: function(e) {
		return Number(e == 0 ? 0 : e == 1 ? 1 : 2);
	},
	19: function(e) {
		return Number(e == 1 ? 0 : e == 0 || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3);
	},
	20: function(e) {
		return Number(e == 1 ? 0 : e == 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2);
	},
	21: function(e) {
		return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0);
	},
	22: function(e) {
		return Number(e == 1 ? 0 : e == 2 ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3);
	}
};
function W() {
	var e = {};
	return U.forEach(function(t) {
		t.lngs.forEach(function(n) {
			e[n] = {
				numbers: t.nr,
				plurals: ae[t.fc]
			};
		});
	}), e;
}
var oe = function() {
	function e(t) {
		var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		v(this, e), this.languageUtils = t, this.options = n, this.logger = D.create("pluralResolver"), this.rules = W();
	}
	return b(e, [
		{
			key: "addRule",
			value: function(e, t) {
				this.rules[e] = t;
			}
		},
		{
			key: "getRule",
			value: function(e) {
				return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)];
			}
		},
		{
			key: "needsPlural",
			value: function(e) {
				var t = this.getRule(e);
				return t && t.numbers.length > 1;
			}
		},
		{
			key: "getPluralFormsOfKey",
			value: function(e, t) {
				var n = this, r = [], i = this.getRule(e);
				return i && i.numbers.forEach(function(i) {
					var a = n.getSuffix(e, i);
					r.push(`${t}${a}`);
				}), r;
			}
		},
		{
			key: "getSuffix",
			value: function(e, t) {
				var n = this, r = this.getRule(e);
				if (r) {
					var i = r.noAbs ? r.plurals(t) : r.plurals(Math.abs(t)), a = r.numbers[i];
					this.options.simplifyPluralSuffix && r.numbers.length === 2 && r.numbers[0] === 1 && (a === 2 ? a = "plural" : a === 1 && (a = ""));
					var o = function() {
						return n.options.prepend && a.toString() ? n.options.prepend + a.toString() : a.toString();
					};
					return this.options.compatibilityJSON === "v1" ? a === 1 ? "" : typeof a == "number" ? `_plural_${a.toString()}` : o() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && r.numbers.length === 2 && r.numbers[0] === 1 ? o() : this.options.prepend && i.toString() ? this.options.prepend + i.toString() : i.toString();
				}
				return this.logger.warn(`no plural rule found for: ${e}`), "";
			}
		}
	]), e;
}(), se = function() {
	function e() {
		var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		v(this, e), this.logger = D.create("interpolator"), this.options = t, this.format = t.interpolation && t.interpolation.format || function(e) {
			return e;
		}, this.init(t);
	}
	return b(e, [
		{
			key: "init",
			value: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				e.interpolation ||= { escapeValue: !0 };
				var t = e.interpolation;
				this.escape = t.escape === void 0 ? B : t.escape, this.escapeValue = t.escapeValue === void 0 ? !0 : t.escapeValue, this.useRawValueToEscape = t.useRawValueToEscape === void 0 ? !1 : t.useRawValueToEscape, this.prefix = t.prefix ? R(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? R(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? R(t.nestingPrefix) : t.nestingPrefixEscaped || R("$t("), this.nestingSuffix = t.nestingSuffix ? R(t.nestingSuffix) : t.nestingSuffixEscaped || R(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat === void 0 ? !1 : t.alwaysFormat, this.resetRegExp();
			}
		},
		{
			key: "reset",
			value: function() {
				this.options && this.init(this.options);
			}
		},
		{
			key: "resetRegExp",
			value: function() {
				var e = `${this.prefix}(.+?)${this.suffix}`;
				this.regexp = new RegExp(e, "g");
				var t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
				this.regexpUnescape = new RegExp(t, "g");
				var n = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
				this.nestingRegexp = new RegExp(n, "g");
			}
		},
		{
			key: "interpolate",
			value: function(e, t, n, r) {
				var i = this, a, o, s, c = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
				function l(e) {
					return e.replace(/\$/g, "$$$$");
				}
				var u = function(e) {
					if (e.indexOf(i.formatSeparator) < 0) {
						var a = I(t, c, e);
						return i.alwaysFormat ? i.format(a, void 0, n) : a;
					}
					var o = e.split(i.formatSeparator), s = o.shift().trim(), l = o.join(i.formatSeparator).trim();
					return i.format(I(t, c, s), l, n, r);
				};
				this.resetRegExp();
				var d = r && r.missingInterpolationHandler || this.options.missingInterpolationHandler, f = r && r.interpolation && r.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
				return [{
					regex: this.regexpUnescape,
					safeValue: function(e) {
						return l(e);
					}
				}, {
					regex: this.regexp,
					safeValue: function(e) {
						return i.escapeValue ? l(i.escape(e)) : l(e);
					}
				}].forEach(function(t) {
					for (s = 0; a = t.regex.exec(e);) {
						if (o = u(a[1].trim()), o === void 0) if (typeof d == "function") {
							var n = d(e, a, r);
							o = typeof n == "string" ? n : "";
						} else if (f) {
							o = a[0];
							continue;
						} else i.logger.warn(`missed to pass in variable ${a[1]} for interpolating ${e}`), o = "";
						else typeof o != "string" && !i.useRawValueToEscape && (o = A(o));
						if (e = e.replace(a[0], t.safeValue(o)), t.regex.lastIndex = 0, s++, s >= i.maxReplaces) break;
					}
				}), e;
			}
		},
		{
			key: "nest",
			value: function(e, t) {
				var n = this, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i, a, o = _({}, r);
				o.applyPostProcessor = !1, delete o.defaultValue;
				function s(e, t) {
					var n = this.nestingOptionsSeparator;
					if (e.indexOf(n) < 0) return e;
					var r = e.split(RegExp(`${n}[ ]*{`)), i = `{${r[1]}`;
					e = r[0], i = this.interpolate(i, o), i = i.replace(/'/g, "\"");
					try {
						o = JSON.parse(i), t && (o = _({}, t, o));
					} catch (t) {
						return this.logger.warn(`failed parsing options string in nesting for key ${e}`, t), `${e}${n}${i}`;
					}
					return delete o.defaultValue, e;
				}
				for (; i = this.nestingRegexp.exec(e);) {
					var c = [], l = !1;
					if (i[0].includes(this.formatSeparator) && !/{.*}/.test(i[1])) {
						var u = i[1].split(this.formatSeparator).map(function(e) {
							return e.trim();
						});
						i[1] = u.shift(), c = u, l = !0;
					}
					if (a = t(s.call(this, i[1].trim(), o), o), a && i[0] === e && typeof a != "string") return a;
					typeof a != "string" && (a = A(a)), a ||= (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), ""), l && (a = c.reduce(function(e, t) {
						return n.format(e, t, r.lng, r);
					}, a.trim())), e = e.replace(i[0], a), this.regexp.lastIndex = 0;
				}
				return e;
			}
		}
	]), e;
}();
function ce(e, t) {
	for (var n = e.indexOf(t); n !== -1;) e.splice(n, 1), n = e.indexOf(t);
}
var le = function(e) {
	T(t, e);
	function t(e, n, r) {
		var i, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
		return v(this, t), i = S(this, C(t).call(this)), V && O.call(x(i)), i.backend = e, i.store = n, i.services = r, i.languageUtils = r.languageUtils, i.options = a, i.logger = D.create("backendConnector"), i.state = {}, i.queue = [], i.backend && i.backend.init && i.backend.init(r, a.backend, a), i;
	}
	return b(t, [
		{
			key: "queueLoad",
			value: function(e, t, n, r) {
				var i = this, a = [], o = [], s = [], c = [];
				return e.forEach(function(e) {
					var r = !0;
					t.forEach(function(t) {
						var s = `${e}|${t}`;
						!n.reload && i.store.hasResourceBundle(e, t) ? i.state[s] = 2 : i.state[s] < 0 || (i.state[s] === 1 ? o.indexOf(s) < 0 && o.push(s) : (i.state[s] = 1, r = !1, o.indexOf(s) < 0 && o.push(s), a.indexOf(s) < 0 && a.push(s), c.indexOf(t) < 0 && c.push(t)));
					}), r || s.push(e);
				}), (a.length || o.length) && this.queue.push({
					pending: o,
					loaded: {},
					errors: [],
					callback: r
				}), {
					toLoad: a,
					pending: o,
					toLoadLanguages: s,
					toLoadNamespaces: c
				};
			}
		},
		{
			key: "loaded",
			value: function(e, t, n) {
				var r = e.split("|"), i = r[0], a = r[1];
				t && this.emit("failedLoading", i, a, t), n && this.store.addResourceBundle(i, a, n), this.state[e] = t ? -1 : 2;
				var o = {};
				this.queue.forEach(function(n) {
					P(n.loaded, [i], a), ce(n.pending, e), t && n.errors.push(t), n.pending.length === 0 && !n.done && (Object.keys(n.loaded).forEach(function(e) {
						o[e] || (o[e] = []), n.loaded[e].length && n.loaded[e].forEach(function(t) {
							o[e].indexOf(t) < 0 && o[e].push(t);
						});
					}), n.done = !0, n.errors.length ? n.callback(n.errors) : n.callback());
				}), this.emit("loaded", o), this.queue = this.queue.filter(function(e) {
					return !e.done;
				});
			}
		},
		{
			key: "read",
			value: function(e, t, n) {
				var r = this, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 350, o = arguments.length > 5 ? arguments[5] : void 0;
				return e.length ? this.backend[n](e, t, function(s, c) {
					if (s && c && i < 5) {
						setTimeout(function() {
							r.read.call(r, e, t, n, i + 1, a * 2, o);
						}, a);
						return;
					}
					o(s, c);
				}) : o(null, {});
			}
		},
		{
			key: "prepareLoading",
			value: function(e, t) {
				var n = this, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = arguments.length > 3 ? arguments[3] : void 0;
				if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
				typeof e == "string" && (e = this.languageUtils.toResolveHierarchy(e)), typeof t == "string" && (t = [t]);
				var a = this.queueLoad(e, t, r, i);
				if (!a.toLoad.length) return a.pending.length || i(), null;
				a.toLoad.forEach(function(e) {
					n.loadOne(e);
				});
			}
		},
		{
			key: "load",
			value: function(e, t, n) {
				this.prepareLoading(e, t, {}, n);
			}
		},
		{
			key: "reload",
			value: function(e, t, n) {
				this.prepareLoading(e, t, { reload: !0 }, n);
			}
		},
		{
			key: "loadOne",
			value: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = e.split("|"), i = r[0], a = r[1];
				this.read(i, a, "read", void 0, void 0, function(r, o) {
					r && t.logger.warn(`${n}loading namespace ${a} for language ${i} failed`, r), !r && o && t.logger.log(`${n}loaded namespace ${a} for language ${i}`, o), t.loaded(e, r, o);
				});
			}
		},
		{
			key: "saveMissing",
			value: function(e, t, n, r, i) {
				var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
				if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
					this.logger.warn(`did not save key "${n}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
					return;
				}
				n == null || n === "" || (this.backend && this.backend.create && this.backend.create(e, t, n, r, null, _({}, a, { isUpdate: i })), !(!e || !e[0]) && this.store.addResource(e[0], t, n, r));
			}
		}
	]), t;
}(O);
function ue() {
	return {
		debug: !1,
		initImmediate: !0,
		ns: ["translation"],
		defaultNS: ["translation"],
		fallbackLng: ["dev"],
		fallbackNS: !1,
		whitelist: !1,
		nonExplicitWhitelist: !1,
		supportedLngs: !1,
		nonExplicitSupportedLngs: !1,
		load: "all",
		preload: !1,
		simplifyPluralSuffix: !0,
		keySeparator: ".",
		nsSeparator: ":",
		pluralSeparator: "_",
		contextSeparator: "_",
		partialBundledLanguages: !1,
		saveMissing: !1,
		updateMissing: !1,
		saveMissingTo: "fallback",
		saveMissingPlurals: !0,
		missingKeyHandler: !1,
		missingInterpolationHandler: !1,
		postProcess: !1,
		postProcessPassResolved: !1,
		returnNull: !0,
		returnEmptyString: !0,
		returnObjects: !1,
		joinArrays: !1,
		returnedObjectHandler: !1,
		parseMissingKeyHandler: !1,
		appendNamespaceToMissingKey: !1,
		appendNamespaceToCIMode: !1,
		overloadTranslationOptionHandler: function(e) {
			var t = {};
			if (p(e[1]) === "object" && (t = e[1]), typeof e[1] == "string" && (t.defaultValue = e[1]), typeof e[2] == "string" && (t.tDescription = e[2]), p(e[2]) === "object" || p(e[3]) === "object") {
				var n = e[3] || e[2];
				Object.keys(n).forEach(function(e) {
					t[e] = n[e];
				});
			}
			return t;
		},
		interpolation: {
			escapeValue: !0,
			format: function(e, t, n, r) {
				return e;
			},
			prefix: "{{",
			suffix: "}}",
			formatSeparator: ",",
			unescapePrefix: "-",
			nestingPrefix: "$t(",
			nestingSuffix: ")",
			nestingOptionsSeparator: ",",
			maxReplaces: 1e3,
			skipOnVariables: !1
		}
	};
}
function de(e) {
	return typeof e.ns == "string" && (e.ns = [e.ns]), typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]), typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]), e.whitelist && (e.whitelist && e.whitelist.indexOf("cimode") < 0 && (e.whitelist = e.whitelist.concat(["cimode"])), e.supportedLngs = e.whitelist), e.nonExplicitWhitelist && (e.nonExplicitSupportedLngs = e.nonExplicitWhitelist), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
}
function fe() {}
var pe = new (function(e) {
	T(t, e);
	function t() {
		var e, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
		if (v(this, t), e = S(this, C(t).call(this)), V && O.call(x(e)), e.options = de(n), e.services = {}, e.logger = D, e.modules = { external: [] }, r && !e.isInitialized && !n.isClone) {
			if (!e.options.initImmediate) return e.init(n, r), S(e, x(e));
			setTimeout(function() {
				e.init(n, r);
			}, 0);
		}
		return e;
	}
	return b(t, [
		{
			key: "init",
			value: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
				typeof t == "function" && (n = t, t = {}), t.whitelist && !t.supportedLngs && this.logger.deprecate("whitelist", "option \"whitelist\" will be renamed to \"supportedLngs\" in the next major - please make sure to rename this option asap."), t.nonExplicitWhitelist && !t.nonExplicitSupportedLngs && this.logger.deprecate("whitelist", "options \"nonExplicitWhitelist\" will be renamed to \"nonExplicitSupportedLngs\" in the next major - please make sure to rename this option asap."), this.options = _({}, ue(), this.options, de(t)), this.format = this.options.interpolation.format, n ||= fe;
				function r(e) {
					return e ? typeof e == "function" ? new e() : e : null;
				}
				if (!this.options.isClone) {
					this.modules.logger ? D.init(r(this.modules.logger), this.options) : D.init(null, this.options);
					var i = new ie(this.options);
					this.store = new H(this.options.resources, this.options);
					var a = this.services;
					a.logger = D, a.resourceStore = this.store, a.languageUtils = i, a.pluralResolver = new oe(i, {
						prepend: this.options.pluralSeparator,
						compatibilityJSON: this.options.compatibilityJSON,
						simplifyPluralSuffix: this.options.simplifyPluralSuffix
					}), a.interpolator = new se(this.options), a.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }, a.backendConnector = new le(r(this.modules.backend), a.resourceStore, a, this.options), a.backendConnector.on("*", function(t) {
						var n = [...arguments].slice(1);
						e.emit.apply(e, [t].concat(n));
					}), this.modules.languageDetector && (a.languageDetector = r(this.modules.languageDetector), a.languageDetector.init(a, this.options.detection, this.options)), this.modules.i18nFormat && (a.i18nFormat = r(this.modules.i18nFormat), a.i18nFormat.init && a.i18nFormat.init(this)), this.translator = new ne(this.services, this.options), this.translator.on("*", function(t) {
						var n = [...arguments].slice(1);
						e.emit.apply(e, [t].concat(n));
					}), this.modules.external.forEach(function(t) {
						t.init && t.init(e);
					});
				}
				!this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), [
					"getResource",
					"hasResourceBundle",
					"getResourceBundle",
					"getDataByLanguage"
				].forEach(function(t) {
					e[t] = function() {
						var n;
						return (n = e.store)[t].apply(n, arguments);
					};
				}), [
					"addResource",
					"addResources",
					"addResourceBundle",
					"removeResourceBundle"
				].forEach(function(t) {
					e[t] = function() {
						var n;
						return (n = e.store)[t].apply(n, arguments), e;
					};
				});
				var o = k(), s = function() {
					e.changeLanguage(e.options.lng, function(t, r) {
						e.isInitialized = !0, e.options.isClone || e.logger.log("initialized", e.options), e.emit("initialized", e.options), o.resolve(r), n(t, r);
					});
				};
				return this.options.resources || !this.options.initImmediate ? s() : setTimeout(s, 0), o;
			}
		},
		{
			key: "loadResources",
			value: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fe, r = typeof e == "string" ? e : this.language;
				if (typeof e == "function" && (n = e), !this.options.resources || this.options.partialBundledLanguages) {
					if (r && r.toLowerCase() === "cimode") return n();
					var i = [], a = function(e) {
						e && t.services.languageUtils.toResolveHierarchy(e).forEach(function(e) {
							i.indexOf(e) < 0 && i.push(e);
						});
					};
					r ? a(r) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(function(e) {
						return a(e);
					}), this.options.preload && this.options.preload.forEach(function(e) {
						return a(e);
					}), this.services.backendConnector.load(i, this.options.ns, n);
				} else n(null);
			}
		},
		{
			key: "reloadResources",
			value: function(e, t, n) {
				var r = k();
				return e ||= this.languages, t ||= this.options.ns, n ||= fe, this.services.backendConnector.reload(e, t, function(e) {
					r.resolve(), n(e);
				}), r;
			}
		},
		{
			key: "use",
			value: function(e) {
				if (!e) throw Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
				if (!e.type) throw Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
				return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && ee.addPostProcessor(e), e.type === "3rdParty" && this.modules.external.push(e), this;
			}
		},
		{
			key: "changeLanguage",
			value: function(e, t) {
				var n = this;
				this.isLanguageChangingTo = e;
				var r = k();
				this.emit("languageChanging", e);
				var i = function(e, i) {
					i ? (n.language = i, n.languages = n.services.languageUtils.toResolveHierarchy(i), n.translator.changeLanguage(i), n.isLanguageChangingTo = void 0, n.emit("languageChanged", i), n.logger.log("languageChanged", i)) : n.isLanguageChangingTo = void 0, r.resolve(function() {
						return n.t.apply(n, arguments);
					}), t && t(e, function() {
						return n.t.apply(n, arguments);
					});
				}, a = function(e) {
					var t = typeof e == "string" ? e : n.services.languageUtils.getBestMatchFromCodes(e);
					t && (n.language || (n.language = t, n.languages = n.services.languageUtils.toResolveHierarchy(t)), n.translator.language || n.translator.changeLanguage(t), n.services.languageDetector && n.services.languageDetector.cacheUserLanguage(t)), n.loadResources(t, function(e) {
						i(e, t);
					});
				};
				return !e && this.services.languageDetector && !this.services.languageDetector.async ? a(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect(a) : a(e), r;
			}
		},
		{
			key: "getFixedT",
			value: function(e, t) {
				var n = this, r = function e(t, r) {
					var i;
					if (p(r) !== "object") {
						var a = [...arguments].slice(2);
						i = n.options.overloadTranslationOptionHandler([t, r].concat(a));
					} else i = _({}, r);
					return i.lng = i.lng || e.lng, i.lngs = i.lngs || e.lngs, i.ns = i.ns || e.ns, n.t(t, i);
				};
				return typeof e == "string" ? r.lng = e : r.lngs = e, r.ns = t, r;
			}
		},
		{
			key: "t",
			value: function() {
				var e;
				return this.translator && (e = this.translator).translate.apply(e, arguments);
			}
		},
		{
			key: "exists",
			value: function() {
				var e;
				return this.translator && (e = this.translator).exists.apply(e, arguments);
			}
		},
		{
			key: "setDefaultNamespace",
			value: function(e) {
				this.options.defaultNS = e;
			}
		},
		{
			key: "hasLoadedNamespace",
			value: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
				if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
				var r = this.languages[0], i = this.options ? this.options.fallbackLng : !1, a = this.languages[this.languages.length - 1];
				if (r.toLowerCase() === "cimode") return !0;
				var o = function(e, n) {
					var r = t.services.backendConnector.state[`${e}|${n}`];
					return r === -1 || r === 2;
				};
				if (n.precheck) {
					var s = n.precheck(this, o);
					if (s !== void 0) return s;
				}
				return !!(this.hasResourceBundle(r, e) || !this.services.backendConnector.backend || o(r, e) && (!i || o(a, e)));
			}
		},
		{
			key: "loadNamespaces",
			value: function(e, t) {
				var n = this, r = k();
				return this.options.ns ? (typeof e == "string" && (e = [e]), e.forEach(function(e) {
					n.options.ns.indexOf(e) < 0 && n.options.ns.push(e);
				}), this.loadResources(function(e) {
					r.resolve(), t && t(e);
				}), r) : (t && t(), Promise.resolve());
			}
		},
		{
			key: "loadLanguages",
			value: function(e, t) {
				var n = k();
				typeof e == "string" && (e = [e]);
				var r = this.options.preload || [], i = e.filter(function(e) {
					return r.indexOf(e) < 0;
				});
				return i.length ? (this.options.preload = r.concat(i), this.loadResources(function(e) {
					n.resolve(), t && t(e);
				}), n) : (t && t(), Promise.resolve());
			}
		},
		{
			key: "dir",
			value: function(e) {
				return e ||= this.languages && this.languages.length > 0 ? this.languages[0] : this.language, e ? (/* @__PURE__ */ "ar.shu.sqr.ssh.xaa.yhd.yud.aao.abh.abv.acm.acq.acw.acx.acy.adf.ads.aeb.aec.afb.ajp.apc.apd.arb.arq.ars.ary.arz.auz.avl.ayh.ayl.ayn.ayp.bbz.pga.he.iw.ps.pbt.pbu.pst.prp.prd.ug.ur.ydd.yds.yih.ji.yi.hbo.men.xmn.fa.jpr.peo.pes.prs.dv.sam".split(".")).indexOf(this.services.languageUtils.getLanguagePartFromCode(e)) >= 0 ? "rtl" : "ltr" : "rtl";
			}
		},
		{
			key: "createInstance",
			value: function() {
				return new t(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, arguments.length > 1 ? arguments[1] : void 0);
			}
		},
		{
			key: "cloneInstance",
			value: function() {
				var e = this, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fe, i = _({}, this.options, n, { isClone: !0 }), a = new t(i);
				return [
					"store",
					"services",
					"language"
				].forEach(function(t) {
					a[t] = e[t];
				}), a.services = _({}, this.services), a.services.utils = { hasLoadedNamespace: a.hasLoadedNamespace.bind(a) }, a.translator = new ne(a.services, a.options), a.translator.on("*", function(e) {
					var t = [...arguments].slice(1);
					a.emit.apply(a, [e].concat(t));
				}), a.init(i, r), a.translator.options = a.options, a.translator.backendConnector.services.utils = { hasLoadedNamespace: a.hasLoadedNamespace.bind(a) }, a;
			}
		}
	]), t;
}(O))(), me = [], he = me.forEach, ge = me.slice;
function _e(e) {
	return he.call(ge.call(arguments, 1), function(t) {
		if (t) for (var n in t) e[n] === void 0 && (e[n] = t[n]);
	}), e;
}
function ve(e, t) {
	if (t && p(t) === "object") {
		var n = "", r = encodeURIComponent;
		for (var i in t) n += "&" + r(i) + "=" + r(t[i]);
		if (!n) return e;
		e = e + (e.indexOf("?") === -1 ? "?" : "&") + n.slice(1);
	}
	return e;
}
function ye(e, t, n, r, i) {
	r && p(r) === "object" && (i || (r._t = /* @__PURE__ */ new Date()), r = ve("", r).slice(1)), t.queryStringParams && (e = ve(e, t.queryStringParams));
	try {
		var a = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
		a.open(r ? "POST" : "GET", e, 1), t.crossDomain || a.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a.withCredentials = !!t.withCredentials, r && a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.overrideMimeType && a.overrideMimeType("application/json");
		var o = t.customHeaders;
		if (o = typeof o == "function" ? o() : o, o) for (var s in o) a.setRequestHeader(s, o[s]);
		a.onreadystatechange = function() {
			a.readyState > 3 && n && n(a.responseText, a);
		}, a.send(r);
	} catch (e) {
		console && console.log(e);
	}
}
function be() {
	return {
		loadPath: "/locales/{{lng}}/{{ns}}.json",
		addPath: "/locales/add/{{lng}}/{{ns}}",
		allowMultiLoading: !1,
		parse: JSON.parse,
		parsePayload: function(e, t, n) {
			return g({}, t, n || "");
		},
		crossDomain: !1,
		ajax: ye
	};
}
var xe = /*#__PURE__*/ function() {
	function e(t) {
		var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		v(this, e), this.init(t, n), this.type = "backend";
	}
	return b(e, [
		{
			key: "init",
			value: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				this.services = e, this.options = _e(t, this.options || {}, be());
			}
		},
		{
			key: "readMulti",
			value: function(e, t, n) {
				var r = this.options.loadPath;
				typeof this.options.loadPath == "function" && (r = this.options.loadPath(e, t));
				var i = this.services.interpolator.interpolate(r, {
					lng: e.join("+"),
					ns: t.join("+")
				});
				this.loadUrl(i, n);
			}
		},
		{
			key: "read",
			value: function(e, t, n) {
				var r = this.options.loadPath;
				typeof this.options.loadPath == "function" && (r = this.options.loadPath([e], [t]));
				var i = this.services.interpolator.interpolate(r, {
					lng: e,
					ns: t
				});
				this.loadUrl(i, n);
			}
		},
		{
			key: "loadUrl",
			value: function(e, t) {
				var n = this;
				this.options.ajax(e, this.options, function(r, i) {
					if (i.status >= 500 && i.status < 600) return t("failed loading " + e, !0);
					if (i.status >= 400 && i.status < 500) return t("failed loading " + e, !1);
					var a, o;
					try {
						a = n.options.parse(r, e);
					} catch {
						o = "failed parsing " + e + " to json";
					}
					if (o) return t(o, !1);
					t(null, a);
				});
			}
		},
		{
			key: "create",
			value: function(e, t, n, r) {
				var i = this;
				typeof e == "string" && (e = [e]);
				var a = this.options.parsePayload(t, n, r);
				e.forEach(function(e) {
					var n = i.services.interpolator.interpolate(i.options.addPath, {
						lng: e,
						ns: t
					});
					i.options.ajax(n, i.options, function(e, t) {}, a);
				});
			}
		}
	]), e;
}();
xe.type = "backend";
//#endregion
//#region src/i18n.ts
var Se = /* #__PURE__ */ Object.assign({
	"./locales/en/translation.json": d,
	"./locales/ja/translation.json": f
});
pe.use(xe).on("initialized", () => {
	for (let [e, t] of Object.entries(Se)) {
		let n = e.match(/\.\/locales\/(.+)\/translation\.json/)?.[1];
		n && pe.addResourceBundle(n, "translation", t, !0, !1);
	}
});
var Ce = pe, we = null;
async function Te(e) {
	return we ||= pe.init(Object.assign({
		fallbackLng: "en",
		debug: !1,
		interpolation: { escapeValue: !1 },
		backend: {
			loadPath: URL.createObjectURL(new Blob(["{}"], { type: "application/json" })),
			crossDomain: !0
		},
		nsSeparator: ":::",
		keySeparator: "::"
	}, e)), we;
}
function G(e, t) {
	return pe.t(e, t);
}
//#endregion
//#region node_modules/eventemitter3/index.js
var Ee = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})), De = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function D(e, t) {
		return E(e.type, t, e.props);
	}
	function O(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function k(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var A = /\/+/g;
	function j(e, t) {
		return typeof e == "object" && e && e.key != null ? k("" + e.key) : t.toString(36);
	}
	function M(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function N(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, N(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + j(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(A, "$&/") + "/"), N(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = D(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + j(a, u), c += N(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + j(a, u++), c += N(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return N(M(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function P(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return N(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function F(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var I = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, L = {
		map: P,
		forEach: function(e, t, n) {
			P(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return P(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return P(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = L, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = O, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: F
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, I);
		} catch (e) {
			I(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.3";
})), Oe = /* @__PURE__ */ o(((e, t) => {
	t.exports = De();
})), ke = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, O());
		else {
			var t = n(l);
			t !== null && j(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), Ae = /* @__PURE__ */ o(((e, t) => {
	t.exports = ke();
})), je = /* @__PURE__ */ o(((e) => {
	var t = Oe();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.3";
})), Me = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = je();
})), Ne = /* @__PURE__ */ o(((e) => {
	var t = Ae(), n = Oe(), r = Me();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function d(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = d(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var f = Object.assign, p = Symbol.for("react.element"), m = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), b = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), E = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), O = Symbol.iterator;
	function k(e) {
		return typeof e != "object" || !e ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var A = Symbol.for("react.client.reference");
	function j(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === A ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case g: return "Fragment";
			case v: return "Profiler";
			case _: return "StrictMode";
			case S: return "Suspense";
			case C: return "SuspenseList";
			case E: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case h: return "Portal";
			case b: return e.displayName || "Context";
			case y: return (e._context.displayName || "Context") + ".Consumer";
			case x:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case w: return t = e.displayName || null, t === null ? j(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return j(e(t));
				} catch {}
		}
		return null;
	}
	var M = Array.isArray, N = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, I = [], L = -1;
	function R(e) {
		return { current: e };
	}
	function z(e) {
		0 > L || (e.current = I[L], I[L] = null, L--);
	}
	function B(e, t) {
		L++, I[L] = e.current, e.current = t;
	}
	var V = R(null), H = R(null), ee = R(null), te = R(null);
	function ne(e, t) {
		switch (B(ee, t), B(H, e), B(V, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		z(V), B(V, e);
	}
	function re() {
		z(V), z(H), z(ee);
	}
	function ie(e) {
		e.memoizedState !== null && B(te, e);
		var t = V.current, n = Hd(t, e.type);
		t !== n && (B(H, e), B(V, n));
	}
	function U(e) {
		H.current === e && (z(V), z(H)), te.current === e && (z(te), Qf._currentValue = F);
	}
	var ae, W;
	function oe(e) {
		if (ae === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ae = t && t[1] || "", W = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ae + e + W;
	}
	var se = !1;
	function ce(e, t) {
		if (!e || se) return "";
		se = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			se = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? oe(n) : "";
	}
	function le(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return oe(e.type);
			case 16: return oe("Lazy");
			case 13: return e.child !== t && t !== null ? oe("Suspense Fallback") : oe("Suspense");
			case 19: return oe("SuspenseList");
			case 0:
			case 15: return ce(e.type, !1);
			case 11: return ce(e.type.render, !1);
			case 1: return ce(e.type, !0);
			case 31: return oe("Activity");
			default: return "";
		}
	}
	function ue(e) {
		try {
			var t = "", n = null;
			do
				t += le(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var de = Object.prototype.hasOwnProperty, fe = t.unstable_scheduleCallback, pe = t.unstable_cancelCallback, me = t.unstable_shouldYield, he = t.unstable_requestPaint, ge = t.unstable_now, _e = t.unstable_getCurrentPriorityLevel, ve = t.unstable_ImmediatePriority, ye = t.unstable_UserBlockingPriority, be = t.unstable_NormalPriority, xe = t.unstable_LowPriority, Se = t.unstable_IdlePriority, Ce = t.log, we = t.unstable_setDisableYieldValue, Te = null, G = null;
	function Ee(e) {
		if (typeof Ce == "function" && we(e), G && typeof G.setStrictMode == "function") try {
			G.setStrictMode(Te, e);
		} catch {}
	}
	var De = Math.clz32 ? Math.clz32 : Ne, ke = Math.log, je = Math.LN2;
	function Ne(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (ke(e) / je | 0) | 0;
	}
	var Pe = 256, Fe = 262144, K = 4194304;
	function Ie(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Le(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ie(n))) : i = Ie(o) : i = Ie(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ie(n))) : i = Ie(o)) : i = Ie(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Re(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function ze(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Be() {
		var e = K;
		return K <<= 1, !(K & 62914560) && (K = 4194304), e;
	}
	function Ve(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function He(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Ue(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - De(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && We(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function We(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - De(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Ge(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - De(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ke(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : q(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function q(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function qe(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Je() {
		var e = P.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Ye(e, t) {
		var n = P.p;
		try {
			return P.p = e, t();
		} finally {
			P.p = n;
		}
	}
	var Xe = Math.random().toString(36).slice(2), Ze = "__reactFiber$" + Xe, Qe = "__reactProps$" + Xe, $e = "__reactContainer$" + Xe, et = "__reactEvents$" + Xe, tt = "__reactListeners$" + Xe, nt = "__reactHandles$" + Xe, rt = "__reactResources$" + Xe, it = "__reactMarker$" + Xe;
	function at(e) {
		delete e[Ze], delete e[Qe], delete e[et], delete e[tt], delete e[nt];
	}
	function ot(e) {
		var t = e[Ze];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[$e] || n[Ze]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[Ze]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function st(e) {
		if (e = e[Ze] || e[$e]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ct(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function lt(e) {
		var t = e[rt];
		return t ||= e[rt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function ut(e) {
		e[it] = !0;
	}
	var dt = /* @__PURE__ */ new Set(), ft = {};
	function pt(e, t) {
		mt(e, t), mt(e + "Capture", t);
	}
	function mt(e, t) {
		for (ft[e] = t, e = 0; e < t.length; e++) dt.add(t[e]);
	}
	var ht = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), gt = {}, _t = {};
	function vt(e) {
		return de.call(_t, e) ? !0 : de.call(gt, e) ? !1 : ht.test(e) ? _t[e] = !0 : (gt[e] = !0, !1);
	}
	function yt(e, t, n) {
		if (vt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function bt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function xt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function St(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ct(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function wt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Tt(e) {
		if (!e._valueTracker) {
			var t = Ct(e) ? "checked" : "value";
			e._valueTracker = wt(e, t, "" + e[t]);
		}
	}
	function Et(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ct(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Dt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ot = /[\n"\\]/g;
	function kt(e) {
		return e.replace(Ot, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function At(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Mt(e, o, St(n)) : Mt(e, o, St(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + St(s) : e.removeAttribute("name");
	}
	function jt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Tt(e);
				return;
			}
			n = n == null ? "" : "" + St(n), t = t == null ? n : "" + St(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Tt(e);
	}
	function Mt(e, t, n) {
		t === "number" && Dt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function J(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + St(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Nt(e, t, n) {
		if (t != null && (t = "" + St(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + St(n);
	}
	function Pt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (M(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = St(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Tt(e);
	}
	function Ft(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var It = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Lt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || It.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Rt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Lt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Lt(e, o, t[o]);
	}
	function zt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Bt = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Vt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Ht(e) {
		return Vt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Ut() {}
	var Wt = null;
	function Gt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Kt = null, qt = null;
	function Jt(e) {
		var t = st(e);
		if (t && (e = t.stateNode)) {
			var n = e[Qe] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (At(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + kt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Qe] || null;
								if (!a) throw Error(i(90));
								At(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Et(r);
					}
					break a;
				case "textarea":
					Nt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && J(e, !!n.multiple, t, !1);
			}
		}
	}
	var Yt = !1;
	function Xt(e, t, n) {
		if (Yt) return e(t, n);
		Yt = !0;
		try {
			return e(t);
		} finally {
			if (Yt = !1, (Kt !== null || qt !== null) && (_u(), Kt && (t = Kt, e = qt, qt = Kt = null, Jt(t), e))) for (t = 0; t < e.length; t++) Jt(e[t]);
		}
	}
	function Zt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Qe] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var Y = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), Qt = !1;
	if (Y) try {
		var $t = {};
		Object.defineProperty($t, "passive", { get: function() {
			Qt = !0;
		} }), window.addEventListener("test", $t, $t), window.removeEventListener("test", $t, $t);
	} catch {
		Qt = !1;
	}
	var en = null, tn = null, nn = null;
	function rn() {
		if (nn) return nn;
		var e, t = tn, n = t.length, r, i = "value" in en ? en.value : en.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return nn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function an(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function on() {
		return !0;
	}
	function sn() {
		return !1;
	}
	function cn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? on : sn, this.isPropagationStopped = sn, this;
		}
		return f(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = on);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = on);
			},
			persist: function() {},
			isPersistent: on
		}), t;
	}
	var ln = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, un = cn(ln), dn = f({}, ln, {
		view: 0,
		detail: 0
	}), fn = cn(dn), pn, mn, hn, gn = f({}, dn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Dn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== hn && (hn && e.type === "mousemove" ? (pn = e.screenX - hn.screenX, mn = e.screenY - hn.screenY) : mn = pn = 0, hn = e), pn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : mn;
		}
	}), _n = cn(gn), vn = cn(f({}, gn, { dataTransfer: 0 })), yn = cn(f({}, dn, { relatedTarget: 0 })), bn = cn(f({}, ln, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), xn = cn(f({}, ln, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Sn = cn(f({}, ln, { data: 0 })), Cn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, wn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Tn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function En(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Tn[e]) ? !!t[e] : !1;
	}
	function Dn() {
		return En;
	}
	var On = cn(f({}, dn, {
		key: function(e) {
			if (e.key) {
				var t = Cn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = an(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? wn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Dn,
		charCode: function(e) {
			return e.type === "keypress" ? an(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? an(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), kn = cn(f({}, gn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), An = cn(f({}, dn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Dn
	})), jn = cn(f({}, ln, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Mn = cn(f({}, gn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Nn = cn(f({}, ln, {
		newState: 0,
		oldState: 0
	})), Pn = [
		9,
		13,
		27,
		32
	], Fn = Y && "CompositionEvent" in window, In = null;
	Y && "documentMode" in document && (In = document.documentMode);
	var Ln = Y && "TextEvent" in window && !In, Rn = Y && (!Fn || In && 8 < In && 11 >= In), zn = " ", Bn = !1;
	function X(e, t) {
		switch (e) {
			case "keyup": return Pn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Vn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Hn = !1;
	function Un(e, t) {
		switch (e) {
			case "compositionend": return Vn(t);
			case "keypress": return t.which === 32 ? (Bn = !0, zn) : null;
			case "textInput": return e = t.data, e === zn && Bn ? null : e;
			default: return null;
		}
	}
	function Wn(e, t) {
		if (Hn) return e === "compositionend" || !Fn && X(e, t) ? (e = rn(), nn = tn = en = null, Hn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Rn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Gn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Z(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Gn[e.type] : t === "textarea";
	}
	function Kn(e, t, n, r) {
		Kt ? qt ? qt.push(r) : qt = [r] : Kt = r, t = Td(t, "onChange"), 0 < t.length && (n = new un("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var qn = null, Jn = null;
	function Yn(e) {
		_d(e, 0);
	}
	function Xn(e) {
		if (Et(ct(e))) return e;
	}
	function Zn(e, t) {
		if (e === "change") return t;
	}
	var Qn = !1;
	if (Y) {
		var $n;
		if (Y) {
			var er = "oninput" in document;
			if (!er) {
				var tr = document.createElement("div");
				tr.setAttribute("oninput", "return;"), er = typeof tr.oninput == "function";
			}
			$n = er;
		} else $n = !1;
		Qn = $n && (!document.documentMode || 9 < document.documentMode);
	}
	function nr() {
		qn && (qn.detachEvent("onpropertychange", rr), Jn = qn = null);
	}
	function rr(e) {
		if (e.propertyName === "value" && Xn(Jn)) {
			var t = [];
			Kn(t, Jn, e, Gt(e)), Xt(Yn, t);
		}
	}
	function ir(e, t, n) {
		e === "focusin" ? (nr(), qn = t, Jn = n, qn.attachEvent("onpropertychange", rr)) : e === "focusout" && nr();
	}
	function ar(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xn(Jn);
	}
	function or(e, t) {
		if (e === "click") return Xn(t);
	}
	function sr(e, t) {
		if (e === "input" || e === "change") return Xn(t);
	}
	function cr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var lr = typeof Object.is == "function" ? Object.is : cr;
	function ur(e, t) {
		if (lr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!de.call(t, i) || !lr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function dr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function fr(e, t) {
		var n = dr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = dr(n);
		}
	}
	function pr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? pr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function mr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Dt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Dt(e.document);
		}
		return t;
	}
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var gr = Y && "documentMode" in document && 11 >= document.documentMode, _r = null, vr = null, yr = null, br = !1;
	function xr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		br || _r == null || _r !== Dt(r) || (r = _r, "selectionStart" in r && hr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), yr && ur(yr, r) || (yr = r, r = Td(vr, "onSelect"), 0 < r.length && (t = new un("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = _r)));
	}
	function Sr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Cr = {
		animationend: Sr("Animation", "AnimationEnd"),
		animationiteration: Sr("Animation", "AnimationIteration"),
		animationstart: Sr("Animation", "AnimationStart"),
		transitionrun: Sr("Transition", "TransitionRun"),
		transitionstart: Sr("Transition", "TransitionStart"),
		transitioncancel: Sr("Transition", "TransitionCancel"),
		transitionend: Sr("Transition", "TransitionEnd")
	}, wr = {}, Tr = {};
	Y && (Tr = document.createElement("div").style, "AnimationEvent" in window || (delete Cr.animationend.animation, delete Cr.animationiteration.animation, delete Cr.animationstart.animation), "TransitionEvent" in window || delete Cr.transitionend.transition);
	function Er(e) {
		if (wr[e]) return wr[e];
		if (!Cr[e]) return e;
		var t = Cr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Tr) return wr[e] = t[n];
		return e;
	}
	var Dr = Er("animationend"), Or = Er("animationiteration"), kr = Er("animationstart"), Ar = Er("transitionrun"), jr = Er("transitionstart"), Mr = Er("transitioncancel"), Nr = Er("transitionend"), Pr = /* @__PURE__ */ new Map(), Fr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Fr.push("scrollEnd");
	function Ir(e, t) {
		Pr.set(e, t), pt(t, [e]);
	}
	var Lr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Rr = [], zr = 0, Br = 0;
	function Vr() {
		for (var e = zr, t = Br = zr = 0; t < e;) {
			var n = Rr[t];
			Rr[t++] = null;
			var r = Rr[t];
			Rr[t++] = null;
			var i = Rr[t];
			Rr[t++] = null;
			var a = Rr[t];
			if (Rr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Gr(n, i, a);
		}
	}
	function Hr(e, t, n, r) {
		Rr[zr++] = e, Rr[zr++] = t, Rr[zr++] = n, Rr[zr++] = r, Br |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Ur(e, t, n, r) {
		return Hr(e, t, n, r), Kr(e);
	}
	function Wr(e, t) {
		return Hr(e, null, null, t), Kr(e);
	}
	function Gr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - De(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Kr(e) {
		if (50 < cu) throw cu = 0, lu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var qr = {};
	function Jr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Yr(e, t, n, r) {
		return new Jr(e, t, n, r);
	}
	function Xr(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Zr(e, t) {
		var n = e.alternate;
		return n === null ? (n = Yr(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Qr(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function $r(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") Xr(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, V.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case E: return e = Yr(31, n, t, a), e.elementType = E, e.lanes = o, e;
			case g: return ei(n.children, a, o, t);
			case _:
				s = 8, a |= 24;
				break;
			case v: return e = Yr(12, n, t, a | 2), e.elementType = v, e.lanes = o, e;
			case S: return e = Yr(13, n, t, a), e.elementType = S, e.lanes = o, e;
			case C: return e = Yr(19, n, t, a), e.elementType = C, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case b:
						s = 10;
						break a;
					case y:
						s = 9;
						break a;
					case x:
						s = 11;
						break a;
					case w:
						s = 14;
						break a;
					case T:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Yr(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ei(e, t, n, r) {
		return e = Yr(7, e, r, t), e.lanes = n, e;
	}
	function ti(e, t, n) {
		return e = Yr(6, e, null, t), e.lanes = n, e;
	}
	function ni(e) {
		var t = Yr(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ri(e, t, n) {
		return t = Yr(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ii = /* @__PURE__ */ new WeakMap();
	function ai(e, t) {
		if (typeof e == "object" && e) {
			var n = ii.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: ue(t)
			}, ii.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: ue(t)
		};
	}
	var oi = [], si = 0, ci = null, li = 0, ui = [], di = 0, fi = null, pi = 1, mi = "";
	function hi(e, t) {
		oi[si++] = li, oi[si++] = ci, ci = e, li = t;
	}
	function gi(e, t, n) {
		ui[di++] = pi, ui[di++] = mi, ui[di++] = fi, fi = e;
		var r = pi;
		e = mi;
		var i = 32 - De(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - De(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, pi = 1 << 32 - De(t) + i | n << i | r, mi = a + e;
		} else pi = 1 << a | n << i | r, mi = e;
	}
	function _i(e) {
		e.return !== null && (hi(e, 1), gi(e, 1, 0));
	}
	function vi(e) {
		for (; e === ci;) ci = oi[--si], oi[si] = null, li = oi[--si], oi[si] = null;
		for (; e === fi;) fi = ui[--di], ui[di] = null, mi = ui[--di], ui[di] = null, pi = ui[--di], ui[di] = null;
	}
	function yi(e, t) {
		ui[di++] = pi, ui[di++] = mi, ui[di++] = fi, pi = t.id, mi = t.overflow, fi = e;
	}
	var bi = null, xi = null, Si = !1, Ci = null, wi = !1, Ti = Error(i(519));
	function Ei(e) {
		throw Mi(ai(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ti;
	}
	function Di(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Ze] = e, t[Qe] = r, n) {
			case "dialog":
				vd("cancel", t), vd("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				vd("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < hd.length; n++) vd(hd[n], t);
				break;
			case "source":
				vd("error", t);
				break;
			case "img":
			case "image":
			case "link":
				vd("error", t), vd("load", t);
				break;
			case "details":
				vd("toggle", t);
				break;
			case "input":
				vd("invalid", t), jt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				vd("invalid", t);
				break;
			case "textarea": vd("invalid", t), Pt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && (vd("beforetoggle", t), vd("toggle", t)), r.onScroll != null && vd("scroll", t), r.onScrollEnd != null && vd("scrollend", t), r.onClick != null && (t.onclick = Ut), t = !0) : t = !1, t || Ei(e, !0);
	}
	function Oi(e) {
		for (bi = e.return; bi;) switch (bi.tag) {
			case 5:
			case 31:
			case 13:
				wi = !1;
				return;
			case 27:
			case 3:
				wi = !0;
				return;
			default: bi = bi.return;
		}
	}
	function ki(e) {
		if (e !== bi) return !1;
		if (!Si) return Oi(e), Si = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && xi && Ei(e), Oi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			xi = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			xi = uf(e);
		} else t === 27 ? (t = xi, Zd(e.type) ? (e = lf, lf = null, xi = e) : xi = t) : xi = bi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ai() {
		xi = bi = null, Si = !1;
	}
	function ji() {
		var e = Ci;
		return e !== null && (Jl === null ? Jl = e : Jl.push.apply(Jl, e), Ci = null), e;
	}
	function Mi(e) {
		Ci === null ? Ci = [e] : Ci.push(e);
	}
	var Ni = R(null), Pi = null, Fi = null;
	function Ii(e, t, n) {
		B(Ni, t._currentValue), t._currentValue = n;
	}
	function Li(e) {
		e._currentValue = Ni.current, z(Ni);
	}
	function Ri(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function zi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ri(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ri(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Bi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					lr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === te.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && zi(t, e, n, r), t.flags |= 262144;
	}
	function Vi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!lr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Hi(e) {
		Pi = e, Fi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Ui(e) {
		return Gi(Pi, e);
	}
	function Wi(e, t) {
		return Pi === null && Hi(e), Gi(e, t);
	}
	function Gi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Fi === null) {
			if (e === null) throw Error(i(308));
			Fi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Fi = Fi.next = t;
		return n;
	}
	var Ki = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, qi = t.unstable_scheduleCallback, Ji = t.unstable_NormalPriority, Yi = {
		$$typeof: b,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Xi() {
		return {
			controller: new Ki(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Zi(e) {
		e.refCount--, e.refCount === 0 && qi(Ji, function() {
			e.controller.abort();
		});
	}
	var Qi = null, $i = 0, ea = 0, ta = null;
	function na(e, t) {
		if (Qi === null) {
			var n = Qi = [];
			$i = 0, ea = ld(), ta = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return $i++, t.then(ra, ra), t;
	}
	function ra() {
		if (--$i === 0 && Qi !== null) {
			ta !== null && (ta.status = "fulfilled");
			var e = Qi;
			Qi = null, ea = 0, ta = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Q(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ia = N.S;
	N.S = function(e, t) {
		Zl = ge(), typeof t == "object" && t && typeof t.then == "function" && na(e, t), ia !== null && ia(e, t);
	};
	var aa = R(null);
	function oa() {
		var e = aa.current;
		return e === null ? Ml.pooledCache : e;
	}
	function sa(e, t) {
		t === null ? B(aa, aa.current) : B(aa, t.pool);
	}
	function ca() {
		var e = oa();
		return e === null ? null : {
			parent: Yi._currentValue,
			pool: e
		};
	}
	var la = Error(i(460)), ua = Error(i(474)), da = Error(i(542)), fa = { then: function() {} };
	function pa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ma(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Ut, Ut), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, va(e), e;
			default:
				if (typeof t.status == "string") t.then(Ut, Ut);
				else {
					if (e = Ml, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, va(e), e;
				}
				throw ga = t, la;
		}
	}
	function ha(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ga = e, la) : e;
		}
	}
	var ga = null;
	function _a() {
		if (ga === null) throw Error(i(459));
		var e = ga;
		return ga = null, e;
	}
	function va(e) {
		if (e === la || e === da) throw Error(i(483));
	}
	var ya = null, ba = 0;
	function xa(e) {
		var t = ba;
		return ba += 1, ya === null && (ya = []), ma(ya, e, t);
	}
	function Sa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ca(e, t) {
		throw t.$$typeof === p ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function wa(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Zr(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ti(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === g ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === T && ha(i) === t.type) ? (t = a(t, n.props), Sa(t, n), t.return = e, t) : (t = $r(n.type, n.key, n.props, null, e.mode, r), Sa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ri(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ei(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ti("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case m: return n = $r(t.type, t.key, t.props, null, e.mode, n), Sa(n, t), n.return = e, n;
					case h: return t = ri(t, e.mode, n), t.return = e, t;
					case T: return t = ha(t), f(e, t, n);
				}
				if (M(t) || k(t)) return t = ei(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, xa(t), n);
				if (t.$$typeof === b) return f(e, Wi(e, t), n);
				Ca(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case m: return n.key === i ? l(e, t, n, r) : null;
					case h: return n.key === i ? u(e, t, n, r) : null;
					case T: return n = ha(n), p(e, t, n, r);
				}
				if (M(n) || k(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, xa(n), r);
				if (n.$$typeof === b) return p(e, t, Wi(e, n), r);
				Ca(e, n);
			}
			return null;
		}
		function _(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case m: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case h: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = ha(r), _(e, t, n, r, i);
				}
				if (M(r) || k(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return _(e, t, n, xa(r), i);
				if (r.$$typeof === b) return _(e, t, n, Wi(t, r), i);
				Ca(t, r);
			}
			return null;
		}
		function v(i, a, s, c) {
			for (var l = null, u = null, d = a, m = a = 0, h = null; d !== null && m < s.length; m++) {
				d.index > m ? (h = d, d = null) : h = d.sibling;
				var g = p(i, d, s[m], c);
				if (g === null) {
					d === null && (d = h);
					break;
				}
				e && d && g.alternate === null && t(i, d), a = o(g, a, m), u === null ? l = g : u.sibling = g, u = g, d = h;
			}
			if (m === s.length) return n(i, d), Si && hi(i, m), l;
			if (d === null) {
				for (; m < s.length; m++) d = f(i, s[m], c), d !== null && (a = o(d, a, m), u === null ? l = d : u.sibling = d, u = d);
				return Si && hi(i, m), l;
			}
			for (d = r(d); m < s.length; m++) h = _(d, i, m, s[m], c), h !== null && (e && h.alternate !== null && d.delete(h.key === null ? m : h.key), a = o(h, a, m), u === null ? l = h : u.sibling = h, u = h);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Si && hi(i, m), l;
		}
		function y(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, m = s, h = s = 0, g = null, v = c.next(); m !== null && !v.done; h++, v = c.next()) {
				m.index > h ? (g = m, m = null) : g = m.sibling;
				var y = p(a, m, v.value, l);
				if (y === null) {
					m === null && (m = g);
					break;
				}
				e && m && y.alternate === null && t(a, m), s = o(y, s, h), d === null ? u = y : d.sibling = y, d = y, m = g;
			}
			if (v.done) return n(a, m), Si && hi(a, h), u;
			if (m === null) {
				for (; !v.done; h++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
				return Si && hi(a, h), u;
			}
			for (m = r(m); !v.done; h++, v = c.next()) v = _(m, a, h, v.value, l), v !== null && (e && v.alternate !== null && m.delete(v.key === null ? h : v.key), s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
			return e && m.forEach(function(e) {
				return t(a, e);
			}), Si && hi(a, h), u;
		}
		function x(e, r, o, c) {
			if (typeof o == "object" && o && o.type === g && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case m:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === g) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && ha(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Sa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === g ? (c = ei(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = $r(o.type, o.key, o.props, null, e.mode, c), Sa(c, o), c.return = e, e = c);
						}
						return s(e);
					case h:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = ri(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case T: return o = ha(o), x(e, r, o, c);
				}
				if (M(o)) return v(e, r, o, c);
				if (k(o)) {
					if (l = k(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), y(e, r, o, c);
				}
				if (typeof o.then == "function") return x(e, r, xa(o), c);
				if (o.$$typeof === b) return x(e, r, Wi(e, o), c);
				Ca(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ti(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				ba = 0;
				var i = x(e, t, n, r);
				return ya = null, i;
			} catch (t) {
				if (t === la || t === da) throw t;
				var a = Yr(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ta = wa(!0), Ea = wa(!1), Da = !1;
	function Oa(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function ka(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Aa(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function ja(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, jl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Kr(e), Gr(e, null, n), t;
		}
		return Hr(e, r, t, n), Kr(e);
	}
	function Ma(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ge(e, n);
		}
	}
	function Na(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Pa = !1;
	function Fa() {
		if (Pa) {
			var e = ta;
			if (e !== null) throw e;
		}
	}
	function Ia(e, t, n, r) {
		Pa = !1;
		var i = e.updateQueue;
		Da = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var p = s.lane & -536870913, m = p !== s.lane;
				if (m ? (Pl & p) === p : (r & p) === p) {
					p !== 0 && p === ea && (Pa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						p = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, p);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, p = typeof h == "function" ? h.call(_, d, p) : h, p == null) break a;
								d = f({}, d, p);
								break a;
							case 2: Da = !0;
						}
					}
					p = s.callback, p !== null && (e.flags |= 64, m && (e.flags |= 8192), m = i.callbacks, m === null ? i.callbacks = [p] : m.push(p));
				} else m = {
					lane: p,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = m, c = d) : u = u.next = m, o |= p;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					m = s, s = m.next, m.next = null, i.lastBaseUpdate = m, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Hl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function La(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ra(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) La(n[e], t);
	}
	var za = R(null), Ba = R(0);
	function Va(e, t) {
		e = Bl, B(Ba, e), B(za, t), Bl = e | t.baseLanes;
	}
	function Ha() {
		B(Ba, Bl), B(za, za.current);
	}
	function Ua() {
		Bl = Ba.current, z(za), z(Ba);
	}
	var Wa = R(null), Ga = null;
	function Ka(e) {
		var t = e.alternate;
		B(Za, Za.current & 1), B(Wa, e), Ga === null && (t === null || za.current !== null || t.memoizedState !== null) && (Ga = e);
	}
	function qa(e) {
		B(Za, Za.current), B(Wa, e), Ga === null && (Ga = e);
	}
	function Ja(e) {
		e.tag === 22 ? (B(Za, Za.current), B(Wa, e), Ga === null && (Ga = e)) : Ya(e);
	}
	function Ya() {
		B(Za, Za.current), B(Wa, Wa.current);
	}
	function Xa(e) {
		z(Wa), Ga === e && (Ga = null), z(Za);
	}
	var Za = R(0);
	function Qa(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var $a = 0, $ = null, eo = null, to = null, no = !1, ro = !1, io = !1, ao = 0, oo = 0, so = null, co = 0;
	function lo() {
		throw Error(i(321));
	}
	function uo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!lr(e[n], t[n])) return !1;
		return !0;
	}
	function fo(e, t, n, r, i, a) {
		return $a = a, $ = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, N.H = e === null || e.memoizedState === null ? ks : As, io = !1, a = n(r, i), io = !1, ro && (a = mo(t, n, r, i)), po(e), a;
	}
	function po(e) {
		N.H = Os;
		var t = eo !== null && eo.next !== null;
		if ($a = 0, to = eo = $ = null, no = !1, oo = 0, so = null, t) throw Error(i(300));
		e === null || qs || (e = e.dependencies, e !== null && Vi(e) && (qs = !0));
	}
	function mo(e, t, n, r) {
		$ = e;
		var a = 0;
		do {
			if (ro && (so = null), oo = 0, ro = !1, 25 <= a) throw Error(i(301));
			if (a += 1, to = eo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			N.H = js, o = t(n, r);
		} while (ro);
		return o;
	}
	function ho() {
		var e = N.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? So(t) : t, e = e.useState()[0], (eo === null ? null : eo.memoizedState) !== e && ($.flags |= 1024), t;
	}
	function go() {
		var e = ao !== 0;
		return ao = 0, e;
	}
	function _o(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function vo(e) {
		if (no) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			no = !1;
		}
		$a = 0, to = eo = $ = null, ro = !1, oo = ao = 0, so = null;
	}
	function yo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return to === null ? $.memoizedState = to = e : to = to.next = e, to;
	}
	function bo() {
		if (eo === null) {
			var e = $.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = eo.next;
		var t = to === null ? $.memoizedState : to.next;
		if (t !== null) to = t, eo = e;
		else {
			if (e === null) throw $.alternate === null ? Error(i(467)) : Error(i(310));
			eo = e, e = {
				memoizedState: eo.memoizedState,
				baseState: eo.baseState,
				baseQueue: eo.baseQueue,
				queue: eo.queue,
				next: null
			}, to === null ? $.memoizedState = to = e : to = to.next = e;
		}
		return to;
	}
	function xo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function So(e) {
		var t = oo;
		return oo += 1, so === null && (so = []), e = ma(so, e, t), t = $, (to === null ? t.memoizedState : to.next) === null && (t = t.alternate, N.H = t === null || t.memoizedState === null ? ks : As), e;
	}
	function Co(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return So(e);
			if (e.$$typeof === b) return Ui(e);
		}
		throw Error(i(438, String(e)));
	}
	function wo(e) {
		var t = null, n = $.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = $.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = xo(), $.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = D;
		return t.index++, n;
	}
	function To(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Eo(e) {
		return Do(bo(), eo, e);
	}
	function Do(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? ($a & f) === f : (Pl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ea && (d = !0);
					else if (($a & p) === p) {
						u = u.next, p === ea && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, $.lanes |= p, Hl |= p;
					f = u.action, io && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, $.lanes |= f, Hl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !lr(o, e.memoizedState) && (qs = !0, d && (n = ta, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Oo(e) {
		var t = bo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			lr(o, t.memoizedState) || (qs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ko(e, t, n) {
		var r = $, a = bo(), o = Si;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !lr((eo || a).memoizedState, n);
		if (s && (a.memoizedState = n, qs = !0), a = a.queue, es(Mo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || to !== null && to.memoizedState.tag & 1) {
			if (r.flags |= 2048, Yo(9, { destroy: void 0 }, jo.bind(null, r, a, n, t), null), Ml === null) throw Error(i(349));
			o || $a & 127 || Ao(r, t, n);
		}
		return n;
	}
	function Ao(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = $.updateQueue, t === null ? (t = xo(), $.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function jo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, No(t) && Po(e);
	}
	function Mo(e, t, n) {
		return n(function() {
			No(t) && Po(e);
		});
	}
	function No(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !lr(e, n);
		} catch {
			return !0;
		}
	}
	function Po(e) {
		var t = Wr(e, 2);
		t !== null && fu(t, e, 2);
	}
	function Fo(e) {
		var t = yo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), io) {
				Ee(!0);
				try {
					n();
				} finally {
					Ee(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: To,
			lastRenderedState: e
		}, t;
	}
	function Io(e, t, n, r) {
		return e.baseState = n, Do(e, eo, typeof r == "function" ? r : To);
	}
	function Lo(e, t, n, r, a) {
		if (Ts(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			N.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ro(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ro(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = N.T, o = {};
			N.T = o;
			try {
				var s = n(i, r), c = N.S;
				c !== null && c(o, s), zo(e, t, s);
			} catch (n) {
				Vo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), N.T = a;
			}
		} else try {
			a = n(i, r), zo(e, t, a);
		} catch (n) {
			Vo(e, t, n);
		}
	}
	function zo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Bo(e, t, n);
		}, function(n) {
			return Vo(e, t, n);
		}) : Bo(e, t, n);
	}
	function Bo(e, t, n) {
		t.status = "fulfilled", t.value = n, Ho(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ro(e, n)));
	}
	function Vo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ho(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ho(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Uo(e, t) {
		return t;
	}
	function Wo(e, t) {
		if (Si) {
			var n = Ml.formState;
			if (n !== null) {
				a: {
					var r = $;
					if (Si) {
						if (xi) {
							b: {
								for (var i = xi, a = wi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								xi = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ei(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = yo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Uo,
			lastRenderedState: t
		}, n.queue = r, n = Ss.bind(null, $, r), r.dispatch = n, r = Fo(!1), a = ws.bind(null, $, !1, r.queue), r = yo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Lo.bind(null, $, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Go(e) {
		return Ko(bo(), eo, e);
	}
	function Ko(e, t, n) {
		if (t = Do(e, t, Uo)[0], e = Eo(To)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = So(t);
		} catch (e) {
			throw e === la ? da : e;
		}
		else r = t;
		t = bo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && ($.flags |= 2048, Yo(9, { destroy: void 0 }, qo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function qo(e, t) {
		e.action = t;
	}
	function Jo(e) {
		var t = bo(), n = eo;
		if (n !== null) return Ko(t, n, e);
		bo(), t = t.memoizedState, n = bo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Yo(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = $.updateQueue, t === null && (t = xo(), $.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Xo() {
		return bo().memoizedState;
	}
	function Zo(e, t, n, r) {
		var i = yo();
		$.flags |= e, i.memoizedState = Yo(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Qo(e, t, n, r) {
		var i = bo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		eo !== null && r !== null && uo(r, eo.memoizedState.deps) ? i.memoizedState = Yo(t, a, n, r) : ($.flags |= e, i.memoizedState = Yo(1 | t, a, n, r));
	}
	function $o(e, t) {
		Zo(8390656, 8, e, t);
	}
	function es(e, t) {
		Qo(2048, 8, e, t);
	}
	function ts(e) {
		$.flags |= 4;
		var t = $.updateQueue;
		if (t === null) t = xo(), $.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ns(e) {
		var t = bo().memoizedState;
		return ts({
			ref: t,
			nextImpl: e
		}), function() {
			if (jl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function rs(e, t) {
		return Qo(4, 2, e, t);
	}
	function is(e, t) {
		return Qo(4, 4, e, t);
	}
	function as(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function os(e, t, n) {
		n = n == null ? null : n.concat([e]), Qo(4, 4, as.bind(null, t, e), n);
	}
	function ss() {}
	function cs(e, t) {
		var n = bo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && uo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ls(e, t) {
		var n = bo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && uo(t, r[1])) return r[0];
		if (r = e(), io) {
			Ee(!0);
			try {
				e();
			} finally {
				Ee(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function us(e, t, n) {
		return n === void 0 || $a & 1073741824 && !(Pl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = du(), $.lanes |= e, Hl |= e, n);
	}
	function ds(e, t, n, r) {
		return lr(n, t) ? n : za.current === null ? !($a & 42) || $a & 1073741824 && !(Pl & 261930) ? (qs = !0, e.memoizedState = n) : (e = du(), $.lanes |= e, Hl |= e, t) : (e = us(e, n, r), lr(e, t) || (qs = !0), e);
	}
	function fs(e, t, n, r, i) {
		var a = P.p;
		P.p = a !== 0 && 8 > a ? a : 8;
		var o = N.T, s = {};
		N.T = s, ws(e, !1, t, n);
		try {
			var c = i(), l = N.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Cs(e, t, Q(c, r), uu(e)) : Cs(e, t, r, uu(e));
		} catch (n) {
			Cs(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, uu());
		} finally {
			P.p = a, o !== null && s.types !== null && (o.types = s.types), N.T = o;
		}
	}
	function ps() {}
	function ms(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = hs(e).queue;
		fs(e, a, t, F, n === null ? ps : function() {
			return gs(e), n(r);
		});
	}
	function hs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: F,
			baseState: F,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: To,
				lastRenderedState: F
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: To,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function gs(e) {
		var t = hs(e);
		t.next === null && (t = e.alternate.memoizedState), Cs(e, t.next.queue, {}, uu());
	}
	function _s() {
		return Ui(Qf);
	}
	function vs() {
		return bo().memoizedState;
	}
	function ys() {
		return bo().memoizedState;
	}
	function bs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = uu();
					e = Aa(n);
					var r = ja(t, e, n);
					r !== null && (fu(r, t, n), Ma(r, t, n)), t = { cache: Xi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function xs(e, t, n) {
		var r = uu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ts(e) ? Es(t, n) : (n = Ur(e, t, n, r), n !== null && (fu(n, e, r), Ds(n, t, r)));
	}
	function Ss(e, t, n) {
		Cs(e, t, n, uu());
	}
	function Cs(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ts(e)) Es(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, lr(s, o)) return Hr(e, t, i, 0), Ml === null && Vr(), !1;
			} catch {}
			if (n = Ur(e, t, i, r), n !== null) return fu(n, e, r), Ds(n, t, r), !0;
		}
		return !1;
	}
	function ws(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ld(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ts(e)) {
			if (t) throw Error(i(479));
		} else t = Ur(e, n, r, 2), t !== null && fu(t, e, 2);
	}
	function Ts(e) {
		var t = e.alternate;
		return e === $ || t !== null && t === $;
	}
	function Es(e, t) {
		ro = no = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ds(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ge(e, n);
		}
	}
	var Os = {
		readContext: Ui,
		use: Co,
		useCallback: lo,
		useContext: lo,
		useEffect: lo,
		useImperativeHandle: lo,
		useLayoutEffect: lo,
		useInsertionEffect: lo,
		useMemo: lo,
		useReducer: lo,
		useRef: lo,
		useState: lo,
		useDebugValue: lo,
		useDeferredValue: lo,
		useTransition: lo,
		useSyncExternalStore: lo,
		useId: lo,
		useHostTransitionStatus: lo,
		useFormState: lo,
		useActionState: lo,
		useOptimistic: lo,
		useMemoCache: lo,
		useCacheRefresh: lo
	};
	Os.useEffectEvent = lo;
	var ks = {
		readContext: Ui,
		use: Co,
		useCallback: function(e, t) {
			return yo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ui,
		useEffect: $o,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Zo(4194308, 4, as.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Zo(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Zo(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = yo();
			t = t === void 0 ? null : t;
			var r = e();
			if (io) {
				Ee(!0);
				try {
					e();
				} finally {
					Ee(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = yo();
			if (n !== void 0) {
				var i = n(t);
				if (io) {
					Ee(!0);
					try {
						n(t);
					} finally {
						Ee(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = xs.bind(null, $, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = yo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Fo(e);
			var t = e.queue, n = Ss.bind(null, $, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ss,
		useDeferredValue: function(e, t) {
			return us(yo(), e, t);
		},
		useTransition: function() {
			var e = Fo(!1);
			return e = fs.bind(null, $, e.queue, !0, !1), yo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = $, a = yo();
			if (Si) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Ml === null) throw Error(i(349));
				Pl & 127 || Ao(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, $o(Mo.bind(null, r, o, e), [e]), r.flags |= 2048, Yo(9, { destroy: void 0 }, jo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = yo(), t = Ml.identifierPrefix;
			if (Si) {
				var n = mi, r = pi;
				n = (r & ~(1 << 32 - De(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ao++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = co++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: _s,
		useFormState: Wo,
		useActionState: Wo,
		useOptimistic: function(e) {
			var t = yo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = ws.bind(null, $, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: wo,
		useCacheRefresh: function() {
			return yo().memoizedState = bs.bind(null, $);
		},
		useEffectEvent: function(e) {
			var t = yo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (jl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, As = {
		readContext: Ui,
		use: Co,
		useCallback: cs,
		useContext: Ui,
		useEffect: es,
		useImperativeHandle: os,
		useInsertionEffect: rs,
		useLayoutEffect: is,
		useMemo: ls,
		useReducer: Eo,
		useRef: Xo,
		useState: function() {
			return Eo(To);
		},
		useDebugValue: ss,
		useDeferredValue: function(e, t) {
			return ds(bo(), eo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Eo(To)[0], t = bo().memoizedState;
			return [typeof e == "boolean" ? e : So(e), t];
		},
		useSyncExternalStore: ko,
		useId: vs,
		useHostTransitionStatus: _s,
		useFormState: Go,
		useActionState: Go,
		useOptimistic: function(e, t) {
			return Io(bo(), eo, e, t);
		},
		useMemoCache: wo,
		useCacheRefresh: ys
	};
	As.useEffectEvent = ns;
	var js = {
		readContext: Ui,
		use: Co,
		useCallback: cs,
		useContext: Ui,
		useEffect: es,
		useImperativeHandle: os,
		useInsertionEffect: rs,
		useLayoutEffect: is,
		useMemo: ls,
		useReducer: Oo,
		useRef: Xo,
		useState: function() {
			return Oo(To);
		},
		useDebugValue: ss,
		useDeferredValue: function(e, t) {
			var n = bo();
			return eo === null ? us(n, e, t) : ds(n, eo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Oo(To)[0], t = bo().memoizedState;
			return [typeof e == "boolean" ? e : So(e), t];
		},
		useSyncExternalStore: ko,
		useId: vs,
		useHostTransitionStatus: _s,
		useFormState: Jo,
		useActionState: Jo,
		useOptimistic: function(e, t) {
			var n = bo();
			return eo === null ? (n.baseState = e, [e, n.queue.dispatch]) : Io(n, eo, e, t);
		},
		useMemoCache: wo,
		useCacheRefresh: ys
	};
	js.useEffectEvent = ns;
	function Ms(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : f({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ns = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = uu(), i = Aa(r);
			i.payload = t, n != null && (i.callback = n), t = ja(e, i, r), t !== null && (fu(t, e, r), Ma(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = uu(), i = Aa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ja(e, i, r), t !== null && (fu(t, e, r), Ma(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = uu(), r = Aa(n);
			r.tag = 2, t != null && (r.callback = t), t = ja(e, r, n), t !== null && (fu(t, e, n), Ma(t, e, n));
		}
	};
	function Ps(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !ur(n, r) || !ur(i, a) : !0;
	}
	function Fs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ns.enqueueReplaceState(t, t.state, null);
	}
	function Is(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = f({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ls(e) {
		Lr(e);
	}
	function Rs(e) {
		console.error(e);
	}
	function zs(e) {
		Lr(e);
	}
	function Bs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Vs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Hs(e, t, n) {
		return n = Aa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Bs(e, t);
		}, n;
	}
	function Us(e) {
		return e = Aa(e), e.tag = 3, e;
	}
	function Ws(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Vs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Vs(t, n, r), typeof i != "function" && (eu === null ? eu = new Set([this]) : eu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Gs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Bi(t, n, a, !0), n = Wa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ga === null ? wu() : n.alternate === null && Vl === 0 && (Vl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === fa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Uu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === fa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Uu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Uu(e, r, a), wu(), !1;
		}
		if (Si) return t = Wa.current, t === null ? (r !== Ti && (t = Error(i(423), { cause: r }), Mi(ai(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ai(r, n), a = Hs(e.stateNode, r, a), Na(e, a), Vl !== 4 && (Vl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ti && (e = Error(i(422), { cause: r }), Mi(ai(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ai(o, n), ql === null ? ql = [o] : ql.push(o), Vl !== 4 && (Vl = 2), t === null) return !0;
		r = ai(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Hs(n.stateNode, r, e), Na(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (eu === null || !eu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Us(a), Ws(a, e, n, r), Na(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ks = Error(i(461)), qs = !1;
	function Js(e, t, n, r) {
		t.child = e === null ? Ea(t, null, n, r) : Ta(t, e.child, n, r);
	}
	function Ys(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Hi(t), r = fo(e, t, n, o, a, i), s = go(), e !== null && !qs ? (_o(e, t, i), yc(e, t, i)) : (Si && s && _i(t), t.flags |= 1, Js(e, t, r, i), t.child);
	}
	function Xs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Xr(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Zs(e, t, a, r, i)) : (e = $r(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !bc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? ur : n, n(o, r) && e.ref === t.ref) return yc(e, t, i);
		}
		return t.flags |= 1, e = Zr(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Zs(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (ur(a, r) && e.ref === t.ref) if (qs = !1, t.pendingProps = r = a, bc(e, i)) e.flags & 131072 && (qs = !0);
			else return t.lanes = e.lanes, yc(e, t, i);
		}
		return ac(e, t, n, r, i);
	}
	function Qs(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return ec(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && sa(t, a === null ? null : a.cachePool), a === null ? Ha() : Va(t, a), Ja(t);
			else return r = t.lanes = 536870912, ec(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && sa(t, null), Ha(), Ya(t)) : (sa(t, a.cachePool), Va(t, a), Ya(t), t.memoizedState = null);
		return Js(e, t, i, n), t.child;
	}
	function $s(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function ec(e, t, n, r, i) {
		var a = oa();
		return a = a === null ? null : {
			parent: Yi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && sa(t, null), Ha(), Ja(t), e !== null && Bi(e, t, r, !0), t.childLanes = i, null;
	}
	function tc(e, t) {
		return t = mc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function nc(e, t, n) {
		return Ta(t, e.child, null, n), e = tc(t, t.pendingProps), e.flags |= 2, Xa(t), t.memoizedState = null, e;
	}
	function rc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (Si) {
				if (r.mode === "hidden") return e = tc(t, r), t.lanes = 536870912, $s(null, e);
				if (qa(t), (e = xi) ? (e = rf(e, wi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: fi === null ? null : {
						id: pi,
						overflow: mi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ni(e), n.return = t, t.child = n, bi = t, xi = null)) : e = null, e === null) throw Ei(t);
				return t.lanes = 536870912, null;
			}
			return tc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (qa(t), a) if (t.flags & 256) t.flags &= -257, t = nc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (qs || Bi(e, t, n, !1), a = (n & e.childLanes) !== 0, qs || a) {
				if (r = Ml, r !== null && (s = Ke(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Wr(e, s), fu(r, e, s), Ks;
				wu(), t = nc(e, t, n);
			} else e = o.treeContext, xi = cf(s.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = tc(t, r), t.flags |= 4096;
			return t;
		}
		return e = Zr(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function ic(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function ac(e, t, n, r, i) {
		return Hi(t), n = fo(e, t, n, r, void 0, i), r = go(), e !== null && !qs ? (_o(e, t, i), yc(e, t, i)) : (Si && r && _i(t), t.flags |= 1, Js(e, t, n, i), t.child);
	}
	function oc(e, t, n, r, i, a) {
		return Hi(t), t.updateQueue = null, n = mo(t, r, n, i), po(e), r = go(), e !== null && !qs ? (_o(e, t, a), yc(e, t, a)) : (Si && r && _i(t), t.flags |= 1, Js(e, t, n, a), t.child);
	}
	function sc(e, t, n, r, i) {
		if (Hi(t), t.stateNode === null) {
			var a = qr, o = n.contextType;
			typeof o == "object" && o && (a = Ui(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ns, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Oa(t), o = n.contextType, a.context = typeof o == "object" && o ? Ui(o) : qr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ms(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ns.enqueueReplaceState(a, a.state, null), Ia(t, r, a, i), Fa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Is(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = qr, typeof u == "object" && u && (o = Ui(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Fs(t, a, r, o), Da = !1;
			var f = t.memoizedState;
			a.state = f, Ia(t, r, a, i), Fa(), l = t.memoizedState, s || f !== l || Da ? (typeof d == "function" && (Ms(t, n, d, r), l = t.memoizedState), (c = Da || Ps(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, ka(e, t), o = t.memoizedProps, u = Is(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = qr, typeof l == "object" && l && (c = Ui(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Fs(t, a, r, c), Da = !1, f = t.memoizedState, a.state = f, Ia(t, r, a, i), Fa();
			var p = t.memoizedState;
			o !== d || f !== p || Da || e !== null && e.dependencies !== null && Vi(e.dependencies) ? (typeof s == "function" && (Ms(t, n, s, r), p = t.memoizedState), (u = Da || Ps(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Vi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, ic(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ta(t, e.child, null, i), t.child = Ta(t, null, n, i)) : Js(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = yc(e, t, i), e;
	}
	function cc(e, t, n, r) {
		return Ai(), t.flags |= 256, Js(e, t, n, r), t.child;
	}
	var lc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function uc(e) {
		return {
			baseLanes: e,
			cachePool: ca()
		};
	}
	function dc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Gl), e;
	}
	function fc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (Za.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (Si) {
				if (a ? Ka(t) : Ya(t), (e = xi) ? (e = rf(e, wi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: fi === null ? null : {
						id: pi,
						overflow: mi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ni(e), n.return = t, t.child = n, bi = t, xi = null)) : e = null, e === null) throw Ei(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (Ya(t), a = t.mode, c = mc({
				mode: "hidden",
				children: c
			}, a), r = ei(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = uc(n), r.childLanes = dc(e, s, n), t.memoizedState = lc, $s(null, r)) : (Ka(t), pc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Ka(t), t.flags &= -257, t = hc(e, t, n)) : t.memoizedState === null ? (Ya(t), c = r.fallback, a = t.mode, r = mc({
				mode: "visible",
				children: r.children
			}, a), c = ei(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ta(t, e.child, null, n), r = t.child, r.memoizedState = uc(n), r.childLanes = dc(e, s, n), t.memoizedState = lc, t = $s(null, r)) : (Ya(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Ka(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Mi({
					value: r,
					source: null,
					stack: null
				}), t = hc(e, t, n);
			} else if (qs || Bi(e, t, n, !1), s = (n & e.childLanes) !== 0, qs || s) {
				if (s = Ml, s !== null && (r = Ke(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Wr(e, r), fu(s, e, r), Ks;
				af(c) || wu(), t = hc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, xi = cf(c.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = pc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (Ya(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = Zr(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ei(c, a, n, null), c.flags |= 2) : c = Zr(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, $s(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = uc(n) : (a = c.cachePool, a === null ? a = ca() : (l = Yi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = dc(e, s, n), t.memoizedState = lc, $s(e.child, r)) : (Ka(t), n = e.child, e = n.sibling, n = Zr(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function pc(e, t) {
		return t = mc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function mc(e, t) {
		return e = Yr(22, e, null, t), e.lanes = 0, e;
	}
	function hc(e, t, n) {
		return Ta(t, e.child, null, n), e = pc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function gc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ri(e.return, t, n);
	}
	function _c(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function vc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Za.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, B(Za, o), Js(e, t, r, n), r = Si ? li : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && gc(e, n, t);
			else if (e.tag === 19) gc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && Qa(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), _c(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Qa(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				_c(t, !0, n, null, a, r);
				break;
			case "together":
				_c(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function yc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Hl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Bi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Zr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Zr(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function bc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Vi(e))) : !0;
	}
	function xc(e, t, n) {
		switch (t.tag) {
			case 3:
				ne(t, t.stateNode.containerInfo), Ii(t, Yi, e.memoizedState.cache), Ai();
				break;
			case 27:
			case 5:
				ie(t);
				break;
			case 4:
				ne(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ii(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, qa(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Ka(t), e = yc(e, t, n), e === null ? null : e.sibling) : fc(e, t, n) : (Ka(t), t.flags |= 128, null);
				Ka(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Bi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return vc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), B(Za, Za.current), r) break;
				return null;
			case 22: return t.lanes = 0, Qs(e, t, n, t.pendingProps);
			case 24: Ii(t, Yi, e.memoizedState.cache);
		}
		return yc(e, t, n);
	}
	function Sc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) qs = !0;
		else {
			if (!bc(e, n) && !(t.flags & 128)) return qs = !1, xc(e, t, n);
			qs = !!(e.flags & 131072);
		}
		else qs = !1, Si && t.flags & 1048576 && gi(t, li, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ha(t.elementType), t.type = e, typeof e == "function") Xr(e) ? (r = Is(e, r), t.tag = 1, t = sc(null, t, e, r, n)) : (t.tag = 0, t = ac(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === x) {
								t.tag = 11, t = Ys(null, t, e, r, n);
								break a;
							} else if (a === w) {
								t.tag = 14, t = Xs(null, t, e, r, n);
								break a;
							}
						}
						throw t = j(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return ac(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Is(r, t.pendingProps), sc(e, t, r, a, n);
			case 3:
				a: {
					if (ne(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, ka(e, t), Ia(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ii(t, Yi, r), r !== o.cache && zi(t, [Yi], n, !0), Fa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = cc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = ai(Error(i(424)), t), Mi(a), t = cc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (xi = cf(e.firstChild), bi = t, Si = !0, Ci = null, wi = !0, n = Ea(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ai(), r === a) {
							t = yc(e, t, n);
							break a;
						}
						Js(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return ic(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Si || (n = t.type, e = t.pendingProps, r = Bd(ee.current).createElement(n), r[Ze] = t, r[Qe] = e, Pd(r, n, e), ut(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ie(t), e === null && Si && (r = t.stateNode = ff(t.type, t.pendingProps, ee.current), bi = t, wi = !0, a = xi, Zd(t.type) ? (lf = a, xi = cf(r.firstChild)) : xi = a), Js(e, t, t.pendingProps.children, n), ic(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Si && ((a = r = xi) && (r = tf(r, t.type, t.pendingProps, wi), r === null ? a = !1 : (t.stateNode = r, bi = t, xi = cf(r.firstChild), wi = !1, a = !0)), a || Ei(t)), ie(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = fo(e, t, ho, null, null, n), Qf._currentValue = a), ic(e, t), Js(e, t, r, n), t.child;
			case 6: return e === null && Si && ((e = n = xi) && (n = nf(n, t.pendingProps, wi), n === null ? e = !1 : (t.stateNode = n, bi = t, xi = null, e = !0)), e || Ei(t)), null;
			case 13: return fc(e, t, n);
			case 4: return ne(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ta(t, null, r, n) : Js(e, t, r, n), t.child;
			case 11: return Ys(e, t, t.type, t.pendingProps, n);
			case 7: return Js(e, t, t.pendingProps, n), t.child;
			case 8: return Js(e, t, t.pendingProps.children, n), t.child;
			case 12: return Js(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ii(t, t.type, r.value), Js(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Hi(t), a = Ui(a), r = r(a), t.flags |= 1, Js(e, t, r, n), t.child;
			case 14: return Xs(e, t, t.type, t.pendingProps, n);
			case 15: return Zs(e, t, t.type, t.pendingProps, n);
			case 19: return vc(e, t, n);
			case 31: return rc(e, t, n);
			case 22: return Qs(e, t, n, t.pendingProps);
			case 24: return Hi(t), r = Ui(Yi), e === null ? (a = oa(), a === null && (a = Ml, o = Xi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Oa(t), Ii(t, Yi, a)) : ((e.lanes & n) !== 0 && (ka(e, t), Ia(t, null, null, n), Fa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ii(t, Yi, r), r !== a.cache && zi(t, [Yi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ii(t, Yi, r))), Js(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Cc(e) {
		e.flags |= 4;
	}
	function wc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (xu()) e.flags |= 8192;
			else throw ga = fa, ua;
		} else e.flags &= -16777217;
	}
	function Tc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (xu()) e.flags |= 8192;
		else throw ga = fa, ua;
	}
	function Ec(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Be(), e.lanes |= t, Kl |= t);
	}
	function Dc(e, t) {
		if (!Si) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Oc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function kc(e, t, n) {
		var r = t.pendingProps;
		switch (vi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Oc(t), null;
			case 1: return Oc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Li(Yi), re(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ki(t) ? Cc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ji())), Oc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Cc(t), o === null ? (Oc(t), wc(t, a, null, r, n)) : (Oc(t), Tc(t, o))) : o ? o === e.memoizedState ? (Oc(t), t.flags &= -16777217) : (Cc(t), Oc(t), Tc(t, o)) : (e = e.memoizedProps, e !== r && Cc(t), Oc(t), wc(t, a, e, r, n)), null;
			case 27:
				if (U(t), n = ee.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Cc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Oc(t), null;
					}
					e = V.current, ki(t) ? Di(t, e) : (e = ff(a, r, n), t.stateNode = e, Cc(t));
				}
				return Oc(t), null;
			case 5:
				if (U(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Cc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Oc(t), null;
					}
					if (o = V.current, ki(t)) Di(t, o);
					else {
						var s = Bd(ee.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Ze] = t, o[Qe] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Cc(t);
					}
				}
				return Oc(t), wc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Cc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ee.current, ki(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = bi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Ze] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || Ei(t, !0);
					} else e = Bd(e).createTextNode(r), e[Ze] = t, t.stateNode = e;
				}
				return Oc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ki(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Ze] = t;
						} else Ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Oc(t), e = !1;
					} else n = ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Xa(t), t) : (Xa(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Oc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ki(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Ze] = t;
						} else Ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Oc(t), a = !1;
					} else a = ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Xa(t), t) : (Xa(t), null);
				}
				return Xa(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ec(t, t.updateQueue), Oc(t), null);
			case 4: return re(), e === null && xd(t.stateNode.containerInfo), Oc(t), null;
			case 10: return Li(t.type), Oc(t), null;
			case 19:
				if (z(Za), r = t.memoizedState, r === null) return Oc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Dc(r, !1);
				else {
					if (Vl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = Qa(e), o !== null) {
							for (t.flags |= 128, Dc(r, !1), e = o.updateQueue, t.updateQueue = e, Ec(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Qr(n, e), n = n.sibling;
							return B(Za, Za.current & 1 | 2), Si && hi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && ge() > Ql && (t.flags |= 128, a = !0, Dc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = Qa(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ec(t, e), Dc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Si) return Oc(t), null;
					} else 2 * ge() - r.renderingStartTime > Ql && n !== 536870912 && (t.flags |= 128, a = !0, Dc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Oc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = ge(), e.sibling = null, n = Za.current, B(Za, a ? n & 1 | 2 : n & 1), Si && hi(t, r.treeForkCount), e);
			case 22:
			case 23: return Xa(t), Ua(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Oc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Oc(t), n = t.updateQueue, n !== null && Ec(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && z(aa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Li(Yi), Oc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Ac(e, t) {
		switch (vi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Li(Yi), re(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return U(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Xa(t), t.alternate === null) throw Error(i(340));
					Ai();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Xa(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ai();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return z(Za), null;
			case 4: return re(), null;
			case 10: return Li(t.type), null;
			case 22:
			case 23: return Xa(t), Ua(), e !== null && z(aa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Li(Yi), null;
			case 25: return null;
			default: return null;
		}
	}
	function jc(e, t) {
		switch (vi(t), t.tag) {
			case 3:
				Li(Yi), re();
				break;
			case 26:
			case 27:
			case 5:
				U(t);
				break;
			case 4:
				re();
				break;
			case 31:
				t.memoizedState !== null && Xa(t);
				break;
			case 13:
				Xa(t);
				break;
			case 19:
				z(Za);
				break;
			case 10:
				Li(t.type);
				break;
			case 22:
			case 23:
				Xa(t), Ua(), e !== null && z(aa);
				break;
			case 24: Li(Yi);
		}
	}
	function Mc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Hu(t, t.return, e);
		}
	}
	function Nc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Hu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Hu(t, t.return, e);
		}
	}
	function Pc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ra(t, n);
			} catch (t) {
				Hu(e, e.return, t);
			}
		}
	}
	function Fc(e, t, n) {
		n.props = Is(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Hu(e, t, n);
		}
	}
	function Ic(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Hu(e, t, n);
		}
	}
	function Lc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Hu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Hu(e, t, n);
		}
		else n.current = null;
	}
	function Rc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Hu(e, e.return, t);
		}
	}
	function zc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[Qe] = t;
		} catch (t) {
			Hu(e, e.return, t);
		}
	}
	function Bc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Vc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Bc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Hc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ut));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Hc(e, t, n), e = e.sibling; e !== null;) Hc(e, t, n), e = e.sibling;
	}
	function Uc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Uc(e, t, n), e = e.sibling; e !== null;) Uc(e, t, n), e = e.sibling;
	}
	function Wc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[Ze] = e, t[Qe] = n;
		} catch (t) {
			Hu(e, e.return, t);
		}
	}
	var Gc = !1, Kc = !1, qc = !1, Jc = typeof WeakSet == "function" ? WeakSet : Set, Yc = null;
	function Xc(e, t) {
		if (e = e.containerInfo, Rd = sp, e = mr(e), hr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, Yc = t; Yc !== null;) if (t = Yc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Yc = e;
		else for (; Yc !== null;) {
			switch (t = Yc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Is(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Hu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, Yc = e;
				break;
			}
			Yc = t.return;
		}
	}
	function Zc(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				fl(e, n), r & 4 && Mc(5, n);
				break;
			case 1:
				if (fl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Hu(n, n.return, e);
				}
				else {
					var i = Is(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Hu(n, n.return, e);
					}
				}
				r & 64 && Pc(n), r & 512 && Ic(n, n.return);
				break;
			case 3:
				if (fl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ra(e, t);
					} catch (e) {
						Hu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Wc(n);
			case 26:
			case 5:
				fl(e, n), t === null && r & 4 && Rc(n), r & 512 && Ic(n, n.return);
				break;
			case 12:
				fl(e, n);
				break;
			case 31:
				fl(e, n), r & 4 && rl(e, n);
				break;
			case 13:
				fl(e, n), r & 4 && il(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ku.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Gc, !r) {
					t = t !== null && t.memoizedState !== null || Kc, i = Gc;
					var a = Kc;
					Gc = r, (Kc = t) && !a ? ml(e, n, (n.subtreeFlags & 8772) != 0) : fl(e, n), Gc = i, Kc = a;
				}
				break;
			case 30: break;
			default: fl(e, n);
		}
	}
	function Qc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, Qc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && at(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var $c = null, el = !1;
	function tl(e, t, n) {
		for (n = n.child; n !== null;) nl(e, t, n), n = n.sibling;
	}
	function nl(e, t, n) {
		if (G && typeof G.onCommitFiberUnmount == "function") try {
			G.onCommitFiberUnmount(Te, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Kc || Lc(n, t), tl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Kc || Lc(n, t);
				var r = $c, i = el;
				Zd(n.type) && ($c = n.stateNode, el = !1), tl(e, t, n), pf(n.stateNode), $c = r, el = i;
				break;
			case 5: Kc || Lc(n, t);
			case 6:
				if (r = $c, i = el, $c = null, tl(e, t, n), $c = r, el = i, $c !== null) if (el) try {
					($c.nodeType === 9 ? $c.body : $c.nodeName === "HTML" ? $c.ownerDocument.body : $c).removeChild(n.stateNode);
				} catch (e) {
					Hu(n, t, e);
				}
				else try {
					$c.removeChild(n.stateNode);
				} catch (e) {
					Hu(n, t, e);
				}
				break;
			case 18:
				$c !== null && (el ? (e = $c, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd($c, n.stateNode));
				break;
			case 4:
				r = $c, i = el, $c = n.stateNode.containerInfo, el = !0, tl(e, t, n), $c = r, el = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Nc(2, n, t), Kc || Nc(4, n, t), tl(e, t, n);
				break;
			case 1:
				Kc || (Lc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Fc(n, t, r)), tl(e, t, n);
				break;
			case 21:
				tl(e, t, n);
				break;
			case 22:
				Kc = (r = Kc) || n.memoizedState !== null, tl(e, t, n), Kc = r;
				break;
			default: tl(e, t, n);
		}
	}
	function rl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Hu(t, t.return, e);
			}
		}
	}
	function il(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Hu(t, t.return, e);
		}
	}
	function al(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Jc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Jc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ol(e, t) {
		var n = al(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = qu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function sl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							$c = c.stateNode, el = !1;
							break a;
						}
						break;
					case 5:
						$c = c.stateNode, el = !1;
						break a;
					case 3:
					case 4:
						$c = c.stateNode.containerInfo, el = !0;
						break a;
				}
				c = c.return;
			}
			if ($c === null) throw Error(i(160));
			nl(o, s, a), $c = null, el = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) ll(t, e), t = t.sibling;
	}
	var cl = null;
	function ll(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				sl(t, e), ul(e), r & 4 && (Nc(3, e, e.return), Mc(3, e), Nc(5, e, e.return));
				break;
			case 1:
				sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), r & 64 && Gc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = cl;
				if (sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[it] || o[Ze] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[Ze] = e, ut(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[Ze] = e, ut(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && zc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), n !== null && r & 4 && zc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Ft(a, "");
					} catch (t) {
						Hu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, zc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (qc = !0);
				break;
			case 6:
				if (sl(t, e), ul(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Hu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = cl, cl = gf(t.containerInfo), sl(t, e), cl = a, ul(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Hu(e, e.return, t);
				}
				qc && (qc = !1, dl(e));
				break;
			case 4:
				r = cl, cl = gf(e.stateNode.containerInfo), sl(t, e), ul(e), cl = r;
				break;
			case 12:
				sl(t, e), ul(e);
				break;
			case 31:
				sl(t, e), ul(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ol(e, r)));
				break;
			case 13:
				sl(t, e), ul(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Xl = ge()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ol(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Gc, d = Kc;
				if (Gc = u || a, Kc = d || l, sl(t, e), Kc = d, Gc = u, ul(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Gc || Kc || pl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Hu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Hu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Hu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ol(e, n))));
				break;
			case 19:
				sl(t, e), ul(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ol(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: sl(t, e), ul(e);
		}
	}
	function ul(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Bc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Uc(e, Vc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Ft(o, ""), n.flags &= -33), Uc(e, Vc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Hc(e, Vc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Hu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function dl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			dl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function fl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) Zc(e, t.alternate, t), t = t.sibling;
	}
	function pl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Nc(4, t, t.return), pl(t);
					break;
				case 1:
					Lc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Fc(t, t.return, n), pl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Lc(t, t.return), pl(t);
					break;
				case 22:
					t.memoizedState === null && pl(t);
					break;
				case 30:
					pl(t);
					break;
				default: pl(t);
			}
			e = e.sibling;
		}
	}
	function ml(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					ml(i, a, n), Mc(4, a);
					break;
				case 1:
					if (ml(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Hu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) La(c[i], s);
						} catch (e) {
							Hu(r, r.return, e);
						}
					}
					n && o & 64 && Pc(a), Ic(a, a.return);
					break;
				case 27: Wc(a);
				case 26:
				case 5:
					ml(i, a, n), n && r === null && o & 4 && Rc(a), Ic(a, a.return);
					break;
				case 12:
					ml(i, a, n);
					break;
				case 31:
					ml(i, a, n), n && o & 4 && rl(i, a);
					break;
				case 13:
					ml(i, a, n), n && o & 4 && il(i, a);
					break;
				case 22:
					a.memoizedState === null && ml(i, a, n), Ic(a, a.return);
					break;
				case 30: break;
				default: ml(i, a, n);
			}
			t = t.sibling;
		}
	}
	function hl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Zi(n));
	}
	function gl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e));
	}
	function _l(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) vl(e, t, n, r), t = t.sibling;
	}
	function vl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				_l(e, t, n, r), i & 2048 && Mc(9, t);
				break;
			case 1:
				_l(e, t, n, r);
				break;
			case 3:
				_l(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e)));
				break;
			case 12:
				if (i & 2048) {
					_l(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Hu(t, t.return, e);
					}
				} else _l(e, t, n, r);
				break;
			case 31:
				_l(e, t, n, r);
				break;
			case 13:
				_l(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? _l(e, t, n, r) : (a._visibility |= 2, yl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? _l(e, t, n, r) : bl(e, t), i & 2048 && hl(o, t);
				break;
			case 24:
				_l(e, t, n, r), i & 2048 && gl(t.alternate, t);
				break;
			default: _l(e, t, n, r);
		}
	}
	function yl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					yl(a, o, s, c, i), Mc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, yl(a, o, s, c, i)) : u._visibility & 2 ? yl(a, o, s, c, i) : bl(a, o), i && l & 2048 && hl(o.alternate, o);
					break;
				case 24:
					yl(a, o, s, c, i), i && l & 2048 && gl(o.alternate, o);
					break;
				default: yl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function bl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					bl(n, r), i & 2048 && hl(r.alternate, r);
					break;
				case 24:
					bl(n, r), i & 2048 && gl(r.alternate, r);
					break;
				default: bl(n, r);
			}
			t = t.sibling;
		}
	}
	var xl = 8192;
	function Sl(e, t, n) {
		if (e.subtreeFlags & xl) for (e = e.child; e !== null;) Cl(e, t, n), e = e.sibling;
	}
	function Cl(e, t, n) {
		switch (e.tag) {
			case 26:
				Sl(e, t, n), e.flags & xl && e.memoizedState !== null && Gf(n, cl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Sl(e, t, n);
				break;
			case 3:
			case 4:
				var r = cl;
				cl = gf(e.stateNode.containerInfo), Sl(e, t, n), cl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = xl, xl = 16777216, Sl(e, t, n), xl = r) : Sl(e, t, n));
				break;
			default: Sl(e, t, n);
		}
	}
	function wl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Tl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Yc = r, Ol(r, e);
			}
			wl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) El(e), e = e.sibling;
	}
	function El(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Tl(e), e.flags & 2048 && Nc(9, e, e.return);
				break;
			case 3:
				Tl(e);
				break;
			case 12:
				Tl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Dl(e)) : Tl(e);
				break;
			default: Tl(e);
		}
	}
	function Dl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Yc = r, Ol(r, e);
			}
			wl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Nc(8, t, t.return), Dl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Dl(t));
					break;
				default: Dl(t);
			}
			e = e.sibling;
		}
	}
	function Ol(e, t) {
		for (; Yc !== null;) {
			var n = Yc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Nc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Zi(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Yc = r;
			else a: for (n = e; Yc !== null;) {
				r = Yc;
				var i = r.sibling, a = r.return;
				if (Qc(r), r === n) {
					Yc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Yc = i;
					break a;
				}
				Yc = a;
			}
		}
	}
	var kl = {
		getCacheForType: function(e) {
			var t = Ui(Yi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ui(Yi).controller.signal;
		}
	}, Al = typeof WeakMap == "function" ? WeakMap : Map, jl = 0, Ml = null, Nl = null, Pl = 0, Fl = 0, Il = null, Ll = !1, Rl = !1, zl = !1, Bl = 0, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = null, Jl = null, Yl = !1, Xl = 0, Zl = 0, Ql = Infinity, $l = null, eu = null, tu = 0, nu = null, ru = null, iu = 0, au = 0, ou = null, su = null, cu = 0, lu = null;
	function uu() {
		return jl & 2 && Pl !== 0 ? Pl & -Pl : N.T === null ? Je() : ld();
	}
	function du() {
		if (Gl === 0) if (!(Pl & 536870912) || Si) {
			var e = Fe;
			Fe <<= 1, !(Fe & 3932160) && (Fe = 262144), Gl = e;
		} else Gl = 536870912;
		return e = Wa.current, e !== null && (e.flags |= 32), Gl;
	}
	function fu(e, t, n) {
		(e === Ml && (Fl === 2 || Fl === 9) || e.cancelPendingCommit !== null) && (yu(e, 0), gu(e, Pl, Gl, !1)), He(e, n), (!(jl & 2) || e !== Ml) && (e === Ml && (!(jl & 2) && (Ul |= n), Vl === 4 && gu(e, Pl, Gl, !1)), td(e));
	}
	function pu(e, t, n) {
		if (jl & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Re(e, t), a = r ? Du(e, t) : Tu(e, t, !0), o = r;
		do {
			if (a === 0) {
				Rl && !r && gu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !hu(n)) {
					a = Tu(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = ql;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (yu(c, s).flags |= 256), s = Tu(c, s, !1), s !== 2) {
								if (zl && !l) {
									c.errorRecoveryDisabledLanes |= o, Ul |= o, a = 4;
									break a;
								}
								o = Jl, Jl = a, o !== null && (Jl === null ? Jl = o : Jl.push.apply(Jl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					yu(e, 0), gu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							gu(r, t, Gl, !Ll);
							break a;
						case 2:
							Jl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Xl + 300 - ge(), 10 < a)) {
						if (gu(r, t, Gl, !Ll), Le(r, 0, !0) !== 0) break a;
						iu = t, r.timeoutHandle = Kd(mu.bind(null, r, n, Jl, $l, Yl, t, Gl, Ul, Kl, Ll, o, "Throttled", -0, 0), a);
						break a;
					}
					mu(r, n, Jl, $l, Yl, t, Gl, Ul, Kl, Ll, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		td(e);
	}
	function mu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Ut
			}, Cl(t, a, d);
			var m = (a & 62914560) === a ? Xl - ge() : (a & 4194048) === a ? Zl - ge() : 0;
			if (m = qf(d, m), m !== null) {
				iu = a, e.cancelPendingCommit = m(Pu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), gu(e, a, o, !l);
				return;
			}
		}
		Pu(e, t, a, n, r, i, o, s, c);
	}
	function hu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!lr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function gu(e, t, n, r) {
		t &= ~Wl, t &= ~Ul, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - De(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && We(e, n, t);
	}
	function _u() {
		return jl & 6 ? !0 : (nd(0, !1), !1);
	}
	function vu() {
		if (Nl !== null) {
			if (Fl === 0) var e = Nl.return;
			else e = Nl, Fi = Pi = null, vo(e), ya = null, ba = 0, e = Nl;
			for (; e !== null;) jc(e.alternate, e), e = e.return;
			Nl = null;
		}
	}
	function yu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), iu = 0, vu(), Ml = e, Nl = n = Zr(e.current, null), Pl = t, Fl = 0, Il = null, Ll = !1, Rl = Re(e, t), zl = !1, Kl = Gl = Wl = Ul = Hl = Vl = 0, Jl = ql = null, Yl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - De(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Bl = t, Vr(), n;
	}
	function bu(e, t) {
		$ = null, N.H = Os, t === la || t === da ? (t = _a(), Fl = 3) : t === ua ? (t = _a(), Fl = 4) : Fl = t === Ks ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Il = t, Nl === null && (Vl = 1, Bs(e, ai(t, e.current)));
	}
	function xu() {
		var e = Wa.current;
		return e === null ? !0 : (Pl & 4194048) === Pl ? Ga === null : (Pl & 62914560) === Pl || Pl & 536870912 ? e === Ga : !1;
	}
	function Su() {
		var e = N.H;
		return N.H = Os, e === null ? Os : e;
	}
	function Cu() {
		var e = N.A;
		return N.A = kl, e;
	}
	function wu() {
		Vl = 4, Ll || (Pl & 4194048) !== Pl && Wa.current !== null || (Rl = !0), !(Hl & 134217727) && !(Ul & 134217727) || Ml === null || gu(Ml, Pl, Gl, !1);
	}
	function Tu(e, t, n) {
		var r = jl;
		jl |= 2;
		var i = Su(), a = Cu();
		(Ml !== e || Pl !== t) && ($l = null, yu(e, t)), t = !1;
		var o = Vl;
		a: do
			try {
				if (Fl !== 0 && Nl !== null) {
					var s = Nl, c = Il;
					switch (Fl) {
						case 8:
							vu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Wa.current === null && (t = !0);
							var l = Fl;
							if (Fl = 0, Il = null, ju(e, s, c, l), n && Rl) {
								o = 0;
								break a;
							}
							break;
						default: l = Fl, Fl = 0, Il = null, ju(e, s, c, l);
					}
				}
				Eu(), o = Vl;
				break;
			} catch (t) {
				bu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Fi = Pi = null, jl = r, N.H = i, N.A = a, Nl === null && (Ml = null, Pl = 0, Vr()), o;
	}
	function Eu() {
		for (; Nl !== null;) ku(Nl);
	}
	function Du(e, t) {
		var n = jl;
		jl |= 2;
		var r = Su(), a = Cu();
		Ml !== e || Pl !== t ? ($l = null, Ql = ge() + 500, yu(e, t)) : Rl = Re(e, t);
		a: do
			try {
				if (Fl !== 0 && Nl !== null) {
					t = Nl;
					var o = Il;
					b: switch (Fl) {
						case 1:
							Fl = 0, Il = null, ju(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (pa(o)) {
								Fl = 0, Il = null, Au(t);
								break;
							}
							t = function() {
								Fl !== 2 && Fl !== 9 || Ml !== e || (Fl = 7), td(e);
							}, o.then(t, t);
							break a;
						case 3:
							Fl = 7;
							break a;
						case 4:
							Fl = 5;
							break a;
						case 7:
							pa(o) ? (Fl = 0, Il = null, Au(t)) : (Fl = 0, Il = null, ju(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Nl.tag) {
								case 26: s = Nl.memoizedState;
								case 5:
								case 27:
									var c = Nl;
									if (s ? Wf(s) : c.stateNode.complete) {
										Fl = 0, Il = null;
										var l = c.sibling;
										if (l !== null) Nl = l;
										else {
											var u = c.return;
											u === null ? Nl = null : (Nl = u, Mu(u));
										}
										break b;
									}
							}
							Fl = 0, Il = null, ju(e, t, o, 5);
							break;
						case 6:
							Fl = 0, Il = null, ju(e, t, o, 6);
							break;
						case 8:
							vu(), Vl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Ou();
				break;
			} catch (t) {
				bu(e, t);
			}
		while (1);
		return Fi = Pi = null, N.H = r, N.A = a, jl = n, Nl === null ? (Ml = null, Pl = 0, Vr(), Vl) : 0;
	}
	function Ou() {
		for (; Nl !== null && !me();) ku(Nl);
	}
	function ku(e) {
		var t = Sc(e.alternate, e, Bl);
		e.memoizedProps = e.pendingProps, t === null ? Mu(e) : Nl = t;
	}
	function Au(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = oc(n, t, t.pendingProps, t.type, void 0, Pl);
				break;
			case 11:
				t = oc(n, t, t.pendingProps, t.type.render, t.ref, Pl);
				break;
			case 5: vo(t);
			default: jc(n, t), t = Nl = Qr(t, Bl), t = Sc(n, t, Bl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Mu(e) : Nl = t;
	}
	function ju(e, t, n, r) {
		Fi = Pi = null, vo(t), ya = null, ba = 0;
		var i = t.return;
		try {
			if (Gs(e, i, t, n, Pl)) {
				Vl = 1, Bs(e, ai(n, e.current)), Nl = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Nl = i, t;
			Vl = 1, Bs(e, ai(n, e.current)), Nl = null;
			return;
		}
		t.flags & 32768 ? (Si || r === 1 ? e = !0 : Rl || Pl & 536870912 ? e = !1 : (Ll = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Wa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Nu(t, e)) : Mu(t);
	}
	function Mu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Nu(t, Ll);
				return;
			}
			e = t.return;
			var n = kc(t.alternate, t, Bl);
			if (n !== null) {
				Nl = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Nl = t;
				return;
			}
			Nl = t = e;
		} while (t !== null);
		Vl === 0 && (Vl = 5);
	}
	function Nu(e, t) {
		do {
			var n = Ac(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Nl = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Nl = e;
				return;
			}
			Nl = e = n;
		} while (e !== null);
		Vl = 6, Nl = null;
	}
	function Pu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			zu();
		while (tu !== 0);
		if (jl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Br, Ue(e, n, o, s, c, l), e === Ml && (Nl = Ml = null, Pl = 0), ru = t, nu = e, iu = n, au = o, ou = a, su = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Ju(be, function() {
				return Bu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = N.T, N.T = null, a = P.p, P.p = 2, s = jl, jl |= 4;
				try {
					Xc(e, t, n);
				} finally {
					jl = s, P.p = a, N.T = r;
				}
			}
			tu = 1, Fu(), Iu(), Lu();
		}
	}
	function Fu() {
		if (tu === 1) {
			tu = 0;
			var e = nu, t = ru, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = jl;
				jl |= 4;
				try {
					ll(t, e);
					var a = zd, o = mr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && pr(s.ownerDocument.documentElement, s)) {
						if (c !== null && hr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = fr(s, h), v = fr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					jl = i, P.p = r, N.T = n;
				}
			}
			e.current = t, tu = 2;
		}
	}
	function Iu() {
		if (tu === 2) {
			tu = 0;
			var e = nu, t = ru, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = jl;
				jl |= 4;
				try {
					Zc(e, t.alternate, t);
				} finally {
					jl = i, P.p = r, N.T = n;
				}
			}
			tu = 3;
		}
	}
	function Lu() {
		if (tu === 4 || tu === 3) {
			tu = 0, he();
			var e = nu, t = ru, n = iu, r = su;
			t.subtreeFlags & 10256 || t.flags & 10256 ? tu = 5 : (tu = 0, ru = nu = null, Ru(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (eu = null), qe(n), t = t.stateNode, G && typeof G.onCommitFiberRoot == "function") try {
				G.onCommitFiberRoot(Te, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = N.T, i = P.p, P.p = 2, N.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					N.T = t, P.p = i;
				}
			}
			iu & 3 && zu(), td(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === lu ? cu++ : (cu = 0, lu = e) : cu = 0, nd(0, !1);
		}
	}
	function Ru(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Zi(t)));
	}
	function zu() {
		return Fu(), Iu(), Lu(), Bu();
	}
	function Bu() {
		if (tu !== 5) return !1;
		var e = nu, t = au;
		au = 0;
		var n = qe(iu), r = N.T, a = P.p;
		try {
			P.p = 32 > n ? 32 : n, N.T = null, n = ou, ou = null;
			var o = nu, s = iu;
			if (tu = 0, ru = nu = null, iu = 0, jl & 6) throw Error(i(331));
			var c = jl;
			if (jl |= 4, El(o.current), vl(o, o.current, s, n), jl = c, nd(0, !1), G && typeof G.onPostCommitFiberRoot == "function") try {
				G.onPostCommitFiberRoot(Te, o);
			} catch {}
			return !0;
		} finally {
			P.p = a, N.T = r, Ru(e, t);
		}
	}
	function Vu(e, t, n) {
		t = ai(n, t), t = Hs(e.stateNode, t, 2), e = ja(e, t, 2), e !== null && (He(e, 2), td(e));
	}
	function Hu(e, t, n) {
		if (e.tag === 3) Vu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Vu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (eu === null || !eu.has(r))) {
					e = ai(n, e), n = Us(2), r = ja(t, n, 2), r !== null && (Ws(n, r, t, e), He(r, 2), td(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Uu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Al();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (zl = !0, i.add(n), e = Wu.bind(null, e, t, n), t.then(e, e));
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ml === e && (Pl & n) === n && (Vl === 4 || Vl === 3 && (Pl & 62914560) === Pl && 300 > ge() - Xl ? !(jl & 2) && yu(e, 0) : Wl |= n, Kl === Pl && (Kl = 0)), td(e);
	}
	function Gu(e, t) {
		t === 0 && (t = Be()), e = Wr(e, t), e !== null && (He(e, t), td(e));
	}
	function Ku(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Gu(e, n);
	}
	function qu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Gu(e, n);
	}
	function Ju(e, t) {
		return fe(e, t);
	}
	var Yu = null, Xu = null, Zu = !1, Qu = !1, $u = !1, ed = 0;
	function td(e) {
		e !== Xu && e.next === null && (Xu === null ? Yu = Xu = e : Xu = Xu.next = e), Qu = !0, Zu || (Zu = !0, cd());
	}
	function nd(e, t) {
		if (!$u && Qu) {
			$u = !0;
			do
				for (var n = !1, r = Yu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - De(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, sd(r, a));
					} else a = Pl, a = Le(r, r === Ml ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Re(r, a) || (n = !0, sd(r, a));
					r = r.next;
				}
			while (n);
			$u = !1;
		}
	}
	function rd() {
		id();
	}
	function id() {
		Qu = Zu = !1;
		var e = 0;
		ed !== 0 && Gd() && (e = ed);
		for (var t = ge(), n = null, r = Yu; r !== null;) {
			var i = r.next, a = ad(r, t);
			a === 0 ? (r.next = null, n === null ? Yu = i : n.next = i, i === null && (Xu = n)) : (n = r, (e !== 0 || a & 3) && (Qu = !0)), r = i;
		}
		tu !== 0 && tu !== 5 || nd(e, !1), ed !== 0 && (ed = 0);
	}
	function ad(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - De(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Ml, n = Pl, n = Le(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Fl === 2 || Fl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && pe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Re(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && pe(r), qe(n)) {
				case 2:
				case 8:
					n = ye;
					break;
				case 32:
					n = be;
					break;
				case 268435456:
					n = Se;
					break;
				default: n = be;
			}
			return r = od.bind(null, e), n = fe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && pe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function od(e, t) {
		if (tu !== 0 && tu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (zu() && e.callbackNode !== n) return null;
		var r = Pl;
		return r = Le(e, e === Ml ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (pu(e, r, t), ad(e, ge()), e.callbackNode != null && e.callbackNode === n ? od.bind(null, e) : null);
	}
	function sd(e, t) {
		if (zu()) return null;
		pu(e, t, !0);
	}
	function cd() {
		Yd(function() {
			jl & 6 ? fe(ve, rd) : id();
		});
	}
	function ld() {
		if (ed === 0) {
			var e = ea;
			e === 0 && (e = Pe, Pe <<= 1, !(Pe & 261888) && (Pe = 256)), ed = e;
		}
		return ed;
	}
	function ud(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ht("" + e);
	}
	function dd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function fd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = ud((i[Qe] || null).action), o = r.submitter;
			o && (t = (t = o[Qe] || null) ? ud(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new un("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (ed !== 0) {
								var e = o ? dd(i, o) : new FormData(i);
								ms(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? dd(i, o) : new FormData(i), ms(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var pd = 0; pd < Fr.length; pd++) {
		var md = Fr[pd];
		Ir(md.toLowerCase(), "on" + (md[0].toUpperCase() + md.slice(1)));
	}
	Ir(Dr, "onAnimationEnd"), Ir(Or, "onAnimationIteration"), Ir(kr, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(Ar, "onTransitionRun"), Ir(jr, "onTransitionStart"), Ir(Mr, "onTransitionCancel"), Ir(Nr, "onTransitionEnd"), mt("onMouseEnter", ["mouseout", "mouseover"]), mt("onMouseLeave", ["mouseout", "mouseover"]), mt("onPointerEnter", ["pointerout", "pointerover"]), mt("onPointerLeave", ["pointerout", "pointerover"]), pt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), pt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), pt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), pt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var hd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), gd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(hd));
	function _d(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Lr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Lr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function vd(e, t) {
		var n = t[et];
		n === void 0 && (n = t[et] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Sd(t, e, 2, !1), n.add(r));
	}
	function yd(e, t, n) {
		var r = 0;
		t && (r |= 4), Sd(n, e, r, t);
	}
	var bd = "_reactListening" + Math.random().toString(36).slice(2);
	function xd(e) {
		if (!e[bd]) {
			e[bd] = !0, dt.forEach(function(t) {
				t !== "selectionchange" && (gd.has(t) || yd(t, !1, e), yd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[bd] || (t[bd] = !0, yd("selectionchange", !1, t));
		}
	}
	function Sd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !Qt || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Cd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = ot(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Xt(function() {
			var r = a, i = Gt(n), s = [];
			a: {
				var c = Pr.get(e);
				if (c !== void 0) {
					var l = un, u = e;
					switch (e) {
						case "keypress": if (an(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = On;
							break;
						case "focusin":
							u = "focus", l = yn;
							break;
						case "focusout":
							u = "blur", l = yn;
							break;
						case "beforeblur":
						case "afterblur":
							l = yn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = _n;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = vn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = An;
							break;
						case Dr:
						case Or:
						case kr:
							l = bn;
							break;
						case Nr:
							l = jn;
							break;
						case "scroll":
						case "scrollend":
							l = fn;
							break;
						case "wheel":
							l = Mn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = xn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = kn;
							break;
						case "toggle":
						case "beforetoggle": l = Nn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Zt(m, p), g != null && d.push(wd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Wt && (u = n.relatedTarget || n.fromElement) && (ot(u) || u[$e])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? ot(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = _n, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = kn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ct(l), h = u == null ? c : ct(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, ot(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ed, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Dd(s, c, l, d, !1), u !== null && f !== null && Dd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? ct(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = Zn;
					else if (Z(c)) if (Qn) v = sr;
					else {
						v = ar;
						var y = ir;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && zt(r.elementType) && (v = Zn) : v = or;
					if (v &&= v(e, r)) {
						Kn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Mt(c, "number", c.value);
				}
				switch (y = r ? ct(r) : window, e) {
					case "focusin":
						(Z(y) || y.contentEditable === "true") && (_r = y, vr = r, yr = null);
						break;
					case "focusout":
						yr = vr = _r = null;
						break;
					case "mousedown":
						br = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						br = !1, xr(s, n, i);
						break;
					case "selectionchange": if (gr) break;
					case "keydown":
					case "keyup": xr(s, n, i);
				}
				var b;
				if (Fn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Hn ? X(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Rn && n.locale !== "ko" && (Hn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Hn && (b = rn()) : (en = i, tn = "value" in en ? en.value : en.textContent, Hn = !0)), y = Td(r, x), 0 < y.length && (x = new Sn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Vn(n), b !== null && (x.data = b)))), (b = Ln ? Un(e, n) : Wn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new Sn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), fd(s, e, r, n, i);
			}
			_d(s, t);
		});
	}
	function wd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Td(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Zt(e, n), i != null && r.unshift(wd(e, i, a)), i = Zt(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ed(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Dd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Zt(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = Zt(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
	function Ad(e) {
		return (typeof e == "string" ? e : "" + e).replace(Od, "\n").replace(kd, "");
	}
	function jd(e, t) {
		return t = Ad(t), Ad(e) === t;
	}
	function Md(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Ft(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Ft(e, "" + r);
				break;
			case "className":
				bt(e, "class", r);
				break;
			case "tabIndex":
				bt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				bt(e, n, r);
				break;
			case "style":
				Rt(e, r, o);
				break;
			case "data": if (t !== "object") {
				bt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Ht("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Md(e, t, "name", a.name, a, null), Md(e, t, "formEncType", a.formEncType, a, null), Md(e, t, "formMethod", a.formMethod, a, null), Md(e, t, "formTarget", a.formTarget, a, null)) : (Md(e, t, "encType", a.encType, a, null), Md(e, t, "method", a.method, a, null), Md(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Ht("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Ut);
				break;
			case "onScroll":
				r != null && vd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && vd("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Ht("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				vd("beforetoggle", e), vd("toggle", e), yt(e, "popover", r);
				break;
			case "xlinkActuate":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				yt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Bt.get(n) || n, yt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Rt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Ft(e, r) : (typeof r == "number" || typeof r == "bigint") && Ft(e, "" + r);
				break;
			case "onScroll":
				r != null && vd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && vd("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Ut);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!ft.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[Qe] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : yt(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				vd("error", e), vd("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Md(e, t, o, s, n, null);
					}
				}
				a && Md(e, t, "srcSet", n.srcSet, n, null), r && Md(e, t, "src", n.src, n, null);
				return;
			case "input":
				vd("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Md(e, t, r, d, n, null);
					}
				}
				jt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in vd("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Md(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && J(e, !!r, n, !0) : J(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in vd("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Md(e, t, s, c, n, null);
				}
				Pt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Md(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				vd("beforetoggle", e), vd("toggle", e), vd("cancel", e), vd("close", e);
				break;
			case "iframe":
			case "object":
				vd("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < hd.length; r++) vd(hd[r], e);
				break;
			case "image":
				vd("error", e), vd("load", e);
				break;
			case "details":
				vd("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": vd("error", e), vd("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Md(e, t, u, r, n, null);
				}
				return;
			default: if (zt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Md(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Md(e, t, p, m, r, f);
					}
				}
				At(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Md(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? J(e, !!n, n ? [] : "", !1) : J(e, !!n, t, !0)) : J(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Md(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Md(e, t, s, a, r, o);
				}
				Nt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Md(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Md(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Md(e, t, u, p, r, m);
				}
				return;
			default: if (zt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Md(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Wd ? !1 : (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[it] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), at(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[it]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		at(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = P.d;
	P.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = _u();
		return e || t;
	}
	function yf(e) {
		var t = st(e);
		t !== null && t.tag === 5 && t.type === "form" ? gs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = kt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), ut(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + kt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + kt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + kt(n.imageSizes) + "\"]")) : i += "[href=\"" + kt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = f({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), ut(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + kt(r) + "\"][href=\"" + kt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = f({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), ut(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = lt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = f({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					ut(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = lt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = f({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ut(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = lt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = f({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ut(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = ee.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = lt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = lt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = lt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + kt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return f({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), ut(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + kt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + kt(n.href) + "\"]");
				if (r) return t.instance = r, ut(r), r;
				var a = f({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ut(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ut(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), ut(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, ut(a), a) : (r = n, (a = mf.get(o)) && (r = f({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ut(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[it] || a[Ze] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ut(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), ut(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: b,
		Provider: null,
		Consumer: null,
		_currentValue: F,
		_currentValue2: F,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ve(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ve(0), this.hiddenUpdates = Ve(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Yr(3, null, null, t), e.current = a, a.stateNode = e, t = Xi(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Oa(a), e;
	}
	function tp(e) {
		return e ? (e = qr, e) : qr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Aa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = ja(e, r, t), n !== null && (fu(n, e, t), Ma(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Wr(e, 67108864);
			t !== null && fu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = uu();
			t = q(t);
			var n = Wr(e, t);
			n !== null && fu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 2, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 8, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = st(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ie(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - De(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									td(a), !(jl & 6) && (Ql = ge() + 500, nd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Wr(a, 2), s !== null && fu(s, a, 2), _u(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Gt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = ot(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (_e()) {
				case ve: return 2;
				case ye: return 8;
				case be:
				case xe: return 32;
				case Se: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = st(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = ot(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Wt = r, n.target.dispatchEvent(r), Wt = null;
			} else return t = st(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = st(n);
				a !== null && (e.splice(t, 3), t -= 3, ms(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Qe] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Qe] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, uu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), _u(), t[$e] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Je();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.3") throw Error(i(527, Lp, "19.2.3"));
	P.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.3",
		rendererPackageName: "react-dom",
		currentDispatcherRef: N,
		reconcilerVersion: "19.2.3"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Te = zp.inject(Rp), G = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Ls, s = Rs, c = zs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[$e] = t.current, xd(e), new Fp(t);
	};
})), Pe = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = Ne();
})), Fe = /* @__PURE__ */ l(Ee(), 1), K = /* @__PURE__ */ l(Oe(), 1), Ie = Pe(), Le = "html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n	word-break: break-all;\n	margin-top: 0;\n	margin-bottom: 0;\n	padding-top: 0;\n	padding-bottom: 0;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n	display: block;\n}\nbody {\n	line-height: 1;\n}\nblockquote, q {\n	quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n	content: '';\n	content: none;\n}\ntable {\n	border-collapse: collapse;\n	border-spacing: 0;\n}\n", Re = ".mt-be-placeholder {\n  color: gray;\n}\n", ze = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	(function() {
		var n = {
			function: !0,
			object: !0
		}, r = n[typeof window] && window || this, i = n[typeof e] && e, a = n[typeof t] && t && !t.nodeType && t, o = i && a && typeof global == "object" && global;
		o && (o.global === o || o.window === o || o.self === o) && (r = o);
		var s = 2 ** 53 - 1, c = /\bOpera/, l = Object.prototype, u = l.hasOwnProperty, d = l.toString;
		function f(e) {
			return e = String(e), e.charAt(0).toUpperCase() + e.slice(1);
		}
		function p(e, t, n) {
			var r = {
				"10.0": "10",
				"6.4": "10 Technical Preview",
				"6.3": "8.1",
				"6.2": "8",
				"6.1": "Server 2008 R2 / 7",
				"6.0": "Server 2008 / Vista",
				"5.2": "Server 2003 / XP 64-bit",
				"5.1": "XP",
				"5.01": "2000 SP1",
				"5.0": "2000",
				"4.0": "NT",
				"4.90": "ME"
			};
			return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && n && (e = e.replace(RegExp(t, "i"), n)), e = h(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]), e;
		}
		function m(e, t) {
			var n = -1, r = e ? e.length : 0;
			if (typeof r == "number" && r > -1 && r <= s) for (; ++n < r;) t(e[n], n, e);
			else g(e, t);
		}
		function h(e) {
			return e = x(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : f(e);
		}
		function g(e, t) {
			for (var n in e) u.call(e, n) && t(e[n], n, e);
		}
		function _(e) {
			return e == null ? f(e) : d.call(e).slice(8, -1);
		}
		function v(e, t) {
			var n = e == null ? "number" : typeof e[t];
			return !/^(?:boolean|number|string|undefined)$/.test(n) && (n == "object" ? !!e[t] : !0);
		}
		function y(e) {
			return String(e).replace(/([ -])(?!$)/g, "$1?");
		}
		function b(e, t) {
			var n = null;
			return m(e, function(r, i) {
				n = t(n, r, i, e);
			}), n;
		}
		function x(e) {
			return String(e).replace(/^ +| +$/g, "");
		}
		function S(e) {
			var t = r, n = e && typeof e == "object" && _(e) != "String";
			n && (t = e, e = null);
			var i = t.navigator || {}, a = i.userAgent || "";
			e ||= a;
			var o = n ? !!i.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(d.toString()), s = "Object", l = n ? s : "ScriptBridgingProxyObject", u = n ? s : "Environment", f = n && t.java ? "JavaPackage" : _(t.java), m = n ? s : "RuntimeObject", C = /\bJava/.test(f) && t.java, w = C && _(t.environment) == u, T = C ? "a" : "α", E = C ? "b" : "β", D = t.document || {}, O = t.operamini || t.opera, k = c.test(k = n && O ? O["[[Class]]"] : _(O)) ? k : O = null, A, j = e, M = [], N = null, P = e == a, F = P && O && typeof O.version == "function" && O.version(), I, L = H([
				{
					label: "EdgeHTML",
					pattern: "Edge"
				},
				"Trident",
				{
					label: "WebKit",
					pattern: "AppleWebKit"
				},
				"iCab",
				"Presto",
				"NetFront",
				"Tasman",
				"KHTML",
				"Gecko"
			]), R = te([
				"Adobe AIR",
				"Arora",
				"Avant Browser",
				"Breach",
				"Camino",
				"Electron",
				"Epiphany",
				"Fennec",
				"Flock",
				"Galeon",
				"GreenBrowser",
				"iCab",
				"Iceweasel",
				"K-Meleon",
				"Konqueror",
				"Lunascape",
				"Maxthon",
				{
					label: "Microsoft Edge",
					pattern: "(?:Edge|Edg|EdgA|EdgiOS)"
				},
				"Midori",
				"Nook Browser",
				"PaleMoon",
				"PhantomJS",
				"Raven",
				"Rekonq",
				"RockMelt",
				{
					label: "Samsung Internet",
					pattern: "SamsungBrowser"
				},
				"SeaMonkey",
				{
					label: "Silk",
					pattern: "(?:Cloud9|Silk-Accelerated)"
				},
				"Sleipnir",
				"SlimBrowser",
				{
					label: "SRWare Iron",
					pattern: "Iron"
				},
				"Sunrise",
				"Swiftfox",
				"Vivaldi",
				"Waterfox",
				"WebPositive",
				{
					label: "Yandex Browser",
					pattern: "YaBrowser"
				},
				{
					label: "UC Browser",
					pattern: "UCBrowser"
				},
				"Opera Mini",
				{
					label: "Opera Mini",
					pattern: "OPiOS"
				},
				"Opera",
				{
					label: "Opera",
					pattern: "OPR"
				},
				"Chromium",
				"Chrome",
				{
					label: "Chrome",
					pattern: "(?:HeadlessChrome)"
				},
				{
					label: "Chrome Mobile",
					pattern: "(?:CriOS|CrMo)"
				},
				{
					label: "Firefox",
					pattern: "(?:Firefox|Minefield)"
				},
				{
					label: "Firefox for iOS",
					pattern: "FxiOS"
				},
				{
					label: "IE",
					pattern: "IEMobile"
				},
				{
					label: "IE",
					pattern: "MSIE"
				},
				"Safari"
			]), z = re([
				{
					label: "BlackBerry",
					pattern: "BB10"
				},
				"BlackBerry",
				{
					label: "Galaxy S",
					pattern: "GT-I9000"
				},
				{
					label: "Galaxy S2",
					pattern: "GT-I9100"
				},
				{
					label: "Galaxy S3",
					pattern: "GT-I9300"
				},
				{
					label: "Galaxy S4",
					pattern: "GT-I9500"
				},
				{
					label: "Galaxy S5",
					pattern: "SM-G900"
				},
				{
					label: "Galaxy S6",
					pattern: "SM-G920"
				},
				{
					label: "Galaxy S6 Edge",
					pattern: "SM-G925"
				},
				{
					label: "Galaxy S7",
					pattern: "SM-G930"
				},
				{
					label: "Galaxy S7 Edge",
					pattern: "SM-G935"
				},
				"Google TV",
				"Lumia",
				"iPad",
				"iPod",
				"iPhone",
				"Kindle",
				{
					label: "Kindle Fire",
					pattern: "(?:Cloud9|Silk-Accelerated)"
				},
				"Nexus",
				"Nook",
				"PlayBook",
				"PlayStation Vita",
				"PlayStation",
				"TouchPad",
				"Transformer",
				{
					label: "Wii U",
					pattern: "WiiU"
				},
				"Wii",
				"Xbox One",
				{
					label: "Xbox 360",
					pattern: "Xbox"
				},
				"Xoom"
			]), B = ee({
				Apple: {
					iPad: 1,
					iPhone: 1,
					iPod: 1
				},
				Alcatel: {},
				Archos: {},
				Amazon: {
					Kindle: 1,
					"Kindle Fire": 1
				},
				Asus: { Transformer: 1 },
				"Barnes & Noble": { Nook: 1 },
				BlackBerry: { PlayBook: 1 },
				Google: {
					"Google TV": 1,
					Nexus: 1
				},
				HP: { TouchPad: 1 },
				HTC: {},
				Huawei: {},
				Lenovo: {},
				LG: {},
				Microsoft: {
					Xbox: 1,
					"Xbox One": 1
				},
				Motorola: { Xoom: 1 },
				Nintendo: {
					"Wii U": 1,
					Wii: 1
				},
				Nokia: { Lumia: 1 },
				Oppo: {},
				Samsung: {
					"Galaxy S": 1,
					"Galaxy S2": 1,
					"Galaxy S3": 1,
					"Galaxy S4": 1
				},
				Sony: {
					PlayStation: 1,
					"PlayStation Vita": 1
				},
				Xiaomi: {
					Mi: 1,
					Redmi: 1
				}
			}), V = ne([
				"Windows Phone",
				"KaiOS",
				"Android",
				"CentOS",
				{
					label: "Chrome OS",
					pattern: "CrOS"
				},
				"Debian",
				{
					label: "DragonFly BSD",
					pattern: "DragonFly"
				},
				"Fedora",
				"FreeBSD",
				"Gentoo",
				"Haiku",
				"Kubuntu",
				"Linux Mint",
				"OpenBSD",
				"Red Hat",
				"SuSE",
				"Ubuntu",
				"Xubuntu",
				"Cygwin",
				"Symbian OS",
				"hpwOS",
				"webOS ",
				"webOS",
				"Tablet OS",
				"Tizen",
				"Linux",
				"Mac OS X",
				"Macintosh",
				"Mac",
				"Windows 98;",
				"Windows "
			]);
			function H(t) {
				return b(t, function(t, n) {
					return t || RegExp("\\b" + (n.pattern || y(n)) + "\\b", "i").exec(e) && (n.label || n);
				});
			}
			function ee(t) {
				return b(t, function(t, n, r) {
					return t || (n[z] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(z)] || RegExp("\\b" + y(r) + "(?:\\b|\\w*\\d)", "i").exec(e)) && r;
				});
			}
			function te(t) {
				return b(t, function(t, n) {
					return t || RegExp("\\b" + (n.pattern || y(n)) + "\\b", "i").exec(e) && (n.label || n);
				});
			}
			function ne(t) {
				return b(t, function(t, n) {
					var r = n.pattern || y(n);
					return !t && (t = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = p(t, r, n.label || n)), t;
				});
			}
			function re(t) {
				return b(t, function(t, n) {
					var r = n.pattern || y(n);
					return !t && (t = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(n.label && !RegExp(r, "i").test(n.label) ? n.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), n = n.label || n, t = h(t[0].replace(RegExp(r, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))), t;
				});
			}
			function ie(t) {
				return b(t, function(t, n) {
					return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null;
				});
			}
			function U() {
				return this.description || "";
			}
			if (L &&= [L], /\bAndroid\b/.test(V) && !z && (A = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(e)) && (z = x(A[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), B && !z ? z = re([B]) : B && z && (z = z.replace(RegExp("^(" + y(B) + ")[-_.\\s]", "i"), B + " ").replace(RegExp("^(" + y(B) + ")[-_.]?(\\w)", "i"), B + " $2")), (A = /\bGoogle TV\b/.exec(z)) && (z = A[0]), /\bSimulator\b/i.test(e) && (z = (z ? z + " " : "") + "Simulator"), R == "Opera Mini" && /\bOPiOS\b/.test(e) && M.push("running in Turbo/Uncompressed mode"), R == "IE" && /\blike iPhone OS\b/.test(e) ? (A = S(e.replace(/like iPhone OS/, "")), B = A.manufacturer, z = A.product) : /^iP/.test(z) ? (R ||= "Safari", V = "iOS" + ((A = / OS ([\d_]+)/i.exec(e)) ? " " + A[1].replace(/_/g, ".") : "")) : R == "Konqueror" && /^Linux\b/i.test(V) ? V = "Kubuntu" : B && B != "Google" && (/Chrome/.test(R) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(z)) || /\bAndroid\b/.test(V) && /^Chrome/.test(R) && /\bVersion\//i.test(e) ? (R = "Android Browser", V = /\bAndroid\b/.test(V) ? V : "Android") : R == "Silk" ? (/\bMobi/i.test(e) || (V = "Android", M.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && M.unshift("accelerated")) : R == "UC Browser" && /\bUCWEB\b/.test(e) ? M.push("speed mode") : R == "PaleMoon" && (A = /\bFirefox\/([\d.]+)\b/.exec(e)) ? M.push("identifying as Firefox " + A[1]) : R == "Firefox" && (A = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (V ||= "Firefox OS", z ||= A[1]) : !R || (A = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(R)) ? (R && !z && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(A + "/") + 8)) && (R = null), (A = z || B || V) && (z || B || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(V)) && (R = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(V) ? V : A) + " Browser")) : R == "Electron" && (A = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && M.push("Chromium " + A), F ||= ie([
				"(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
				"Version",
				y(R),
				"(?:Firefox|Minefield|NetFront)"
			]), (A = L == "iCab" && parseFloat(F) > 3 && "WebKit" || /\bOpera\b/.test(R) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(L) && "WebKit" || !L && /\bMSIE\b/i.test(e) && (V == "Mac OS" ? "Tasman" : "Trident") || L == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(R) && "NetFront") && (L = [A]), R == "IE" && (A = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (R += " Mobile", V = "Windows Phone " + (/\+$/.test(A) ? A : A + ".x"), M.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (R = "IE Mobile", V = "Windows Phone 8.x", M.unshift("desktop mode"), F ||= (/\brv:([\d.]+)/.exec(e) || 0)[1]) : R != "IE" && L == "Trident" && (A = /\brv:([\d.]+)/.exec(e)) && (R && M.push("identifying as " + R + (F ? " " + F : "")), R = "IE", F = A[1]), P) {
				if (v(t, "global")) if (C && (A = C.lang.System, j = A.getProperty("os.arch"), V ||= A.getProperty("os.name") + " " + A.getProperty("os.version")), w) {
					try {
						F = t.require("ringo/engine").version.join("."), R = "RingoJS";
					} catch {
						(A = t.system) && A.global.system == t.system && (R = "Narwhal", V ||= A[0].os || null);
					}
					R ||= "Rhino";
				} else typeof t.process == "object" && !t.process.browser && (A = t.process) && (typeof A.versions == "object" && (typeof A.versions.electron == "string" ? (M.push("Node " + A.versions.node), R = "Electron", F = A.versions.electron) : typeof A.versions.nw == "string" && (M.push("Chromium " + F, "Node " + A.versions.node), R = "NW.js", F = A.versions.nw)), R || (R = "Node.js", j = A.arch, V = A.platform, F = /[\d.]+/.exec(A.version), F = F ? F[0] : null));
				else _(A = t.runtime) == l ? (R = "Adobe AIR", V = A.flash.system.Capabilities.os) : _(A = t.phantom) == m ? (R = "PhantomJS", F = (A = A.version || null) && A.major + "." + A.minor + "." + A.patch) : typeof D.documentMode == "number" && (A = /\bTrident\/(\d+)/i.exec(e)) ? (F = [F, D.documentMode], (A = +A[1] + 4) != F[1] && (M.push("IE " + F[1] + " mode"), L && (L[1] = ""), F[1] = A), F = R == "IE" ? String(F[1].toFixed(1)) : F[0]) : typeof D.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(R) && (M.push("masking as " + R + " " + F), R = "IE", F = "11.0", L = ["Trident"], V = "Windows");
				V &&= h(V);
			}
			if (F && (A = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(F) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (P && i.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (N = /b/i.test(A) ? "beta" : "alpha", F = F.replace(RegExp(A + "\\+?$"), "") + (N == "beta" ? E : T) + (/\d+\+?/.exec(A) || "")), R == "Fennec" || R == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(V)) R = "Firefox Mobile";
			else if (R == "Maxthon" && F) F = F.replace(/\.[\d.]+/, ".x");
			else if (/\bXbox\b/i.test(z)) z == "Xbox 360" && (V = null), z == "Xbox 360" && /\bIEMobile\b/.test(e) && M.unshift("mobile mode");
			else if ((/^(?:Chrome|IE|Opera)$/.test(R) || R && !z && !/Browser|Mobi/.test(R)) && (V == "Windows CE" || /Mobi/i.test(e))) R += " Mobile";
			else if (R == "IE" && P) try {
				t.external === null && M.unshift("platform preview");
			} catch {
				M.unshift("embedded");
			}
			else (/\bBlackBerry\b/.test(z) || /\bBB10\b/.test(e)) && (A = (RegExp(z.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || F) ? (A = [A, /BB10/.test(e)], V = (A[1] ? (z = null, B = "BlackBerry") : "Device Software") + " " + A[0], F = null) : this != g && z != "Wii" && (P && O || /Opera/.test(R) && /\b(?:MSIE|Firefox)\b/i.test(e) || R == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(V) || R == "IE" && (V && !/^Win/.test(V) && F > 5.5 || /\bWindows XP\b/.test(V) && F > 8 || F == 8 && !/\bTrident\b/.test(e))) && !c.test(A = S.call(g, e.replace(c, "") + ";")) && A.name && (A = "ing as " + A.name + ((A = A.version) ? " " + A : ""), c.test(R) ? (/\bIE\b/.test(A) && V == "Mac OS" && (V = null), A = "identify" + A) : (A = "mask" + A, R = k ? h(k.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(A) && (V = null), P || (F = null)), L = ["Presto"], M.push(A));
			(A = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (A = [parseFloat(A.replace(/\.(\d)$/, ".0$1")), A], R == "Safari" && A[1].slice(-1) == "+" ? (R = "WebKit Nightly", N = "alpha", F = A[1].slice(0, -1)) : (F == A[1] || F == (A[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1])) && (F = null), A[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(e) || 0)[1], A[0] == 537.36 && A[2] == 537.36 && parseFloat(A[1]) >= 28 && L == "WebKit" && (L = ["Blink"]), !P || !o && !A[1] ? (L && (L[1] = "like Safari"), A = (A = A[0], A < 400 ? 1 : A < 500 ? 2 : A < 526 ? 3 : A < 533 ? 4 : A < 534 ? "4+" : A < 535 ? 5 : A < 537 ? 6 : A < 538 ? 7 : A < 601 ? 8 : A < 602 ? 9 : A < 604 ? 10 : A < 606 ? 11 : A < 608 ? 12 : "12")) : (L && (L[1] = "like Chrome"), A = A[1] || (A = A[0], A < 530 ? 1 : A < 532 ? 2 : A < 532.05 ? 3 : A < 533 ? 4 : A < 534.03 ? 5 : A < 534.07 ? 6 : A < 534.1 ? 7 : A < 534.13 ? 8 : A < 534.16 ? 9 : A < 534.24 ? 10 : A < 534.3 ? 11 : A < 535.01 ? 12 : A < 535.02 ? "13+" : A < 535.07 ? 15 : A < 535.11 ? 16 : A < 535.19 ? 17 : A < 536.05 ? 18 : A < 536.1 ? 19 : A < 537.01 ? 20 : A < 537.11 ? "21+" : A < 537.13 ? 23 : A < 537.18 ? 24 : A < 537.24 ? 25 : A < 537.36 ? 26 : L == "Blink" ? "28" : "27")), L && (L[1] += " " + (A += typeof A == "number" ? ".x" : /[.+]/.test(A) ? "" : "+")), R == "Safari" && (!F || parseInt(F) > 45) ? F = A : R == "Chrome" && /\bHeadlessChrome/i.test(e) && M.unshift("headless")), R == "Opera" && (A = /\bzbov|zvav$/.exec(V)) ? (R += " ", M.unshift("desktop mode"), A == "zvav" ? (R += "Mini", F = null) : R += "Mobile", V = V.replace(RegExp(" *" + A + "$"), "")) : R == "Safari" && /\bChrome\b/.exec(L && L[1]) ? (M.unshift("desktop mode"), R = "Chrome Mobile", F = null, /\bOS X\b/.test(V) ? (B = "Apple", V = "iOS 4.3+") : V = null) : /\bSRWare Iron\b/.test(R) && !F && (F = ie("Chrome")), F && F.indexOf(A = /[\d.]+$/.exec(V)) == 0 && e.indexOf("/" + A + "-") > -1 && (V = x(V.replace(A, ""))), V && V.indexOf(R) != -1 && !RegExp(R + " OS").test(V) && (V = V.replace(RegExp(" *" + y(R) + " *"), "")), L && !/\b(?:Avant|Nook)\b/.test(R) && (/Browser|Lunascape|Maxthon/.test(R) || R != "Safari" && /^iOS/.test(V) && /\bSafari\b/.test(L[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(R) && L[1]) && (A = L[L.length - 1]) && M.push(A), M.length && (M = ["(" + M.join("; ") + ")"]), B && z && z.indexOf(B) < 0 && M.push("on " + B), z && M.push((/^on /.test(M[M.length - 1]) ? "" : "on ") + z), V &&= (A = / ([\d.+]+)$/.exec(V), I = A && V.charAt(V.length - A[0].length - 1) == "/", {
				architecture: 32,
				family: A && !I ? V.replace(A[0], "") : V,
				version: A ? A[1] : null,
				toString: function() {
					var e = this.version;
					return this.family + (e && !I ? " " + e : "") + (this.architecture == 64 ? " 64-bit" : "");
				}
			}), (A = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(j)) && !/\bi686\b/i.test(j) ? (V && (V.architecture = 64, V.family = V.family.replace(RegExp(" *" + A), "")), R && (/\bWOW64\b/i.test(e) || P && /\w(?:86|32)$/.test(i.cpuClass || i.platform) && !/\bWin64; x64\b/i.test(e)) && M.unshift("32-bit")) : V && /^OS X/.test(V.family) && R == "Chrome" && parseFloat(F) >= 39 && (V.architecture = 64), e ||= null;
			var ae = {};
			return ae.description = e, ae.layout = L && L[0], ae.manufacturer = B, ae.name = R, ae.prerelease = N, ae.product = z, ae.ua = e, ae.version = R && F, ae.os = V || {
				architecture: null,
				family: null,
				version: null,
				toString: function() {
					return "null";
				}
			}, ae.parse = S, ae.toString = U, ae.version && M.unshift(F), ae.name && M.unshift(R), V && R && !(V == String(V).split(" ")[0] && (V == R.split(" ")[0] || z)) && M.push(z ? "(" + V + ")" : "on " + V), M.length && (ae.description = M.join(" ")), ae;
		}
		var C = S();
		typeof define == "function" && typeof define.amd == "object" && define.amd ? (r.platform = C, define(function() {
			return C;
		})) : i && a ? g(C, function(e, t) {
			i[t] = e;
		}) : r.platform = C;
	}).call(e);
})))(), 1), Be = 991.5, Ve = ze.default.os?.family === "iOS";
function He() {
	return Ve;
}
var Ue = [
	"iOS",
	"Android",
	"Windows Phone"
].includes(ze.default.os?.family || "");
document.addEventListener("touchstart", () => {
	Ue = !0;
}, {
	passive: !0,
	once: !0
});
function We() {
	return Ue;
}
function Ge(e) {
	He() && e.current !== null && e.current.focus();
}
var Ke = !1;
function q() {
	return Ke;
}
function qe() {
	Ke = matchMedia(`(max-width:${Be}px)`).matches;
}
document.addEventListener("resize", qe, { passive: !0 }), qe();
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
function Je(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Ye(e) {
	if (Array.isArray(e)) return e;
}
function Xe(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t !== 0) for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Ze() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Qe(e, t) {
	return Ye(e) || Xe(e, t) || $e(e, t) || Ze();
}
function $e(e, t) {
	if (e) {
		if (typeof e == "string") return Je(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Je(e, t) : void 0;
	}
}
var et = Object.entries, tt = Object.setPrototypeOf, nt = Object.isFrozen, rt = Object.getPrototypeOf, it = Object.getOwnPropertyDescriptor, at = Object.freeze, ot = Object.seal, st = Object.create, ct = typeof Reflect < "u" && Reflect, lt = ct.apply, ut = ct.construct;
at ||= function(e) {
	return e;
}, ot ||= function(e) {
	return e;
}, lt ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, ut ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var dt = jt(Array.prototype.forEach), ft = jt(Array.prototype.lastIndexOf), pt = jt(Array.prototype.pop), mt = jt(Array.prototype.push), ht = jt(Array.prototype.splice), gt = Array.isArray, _t = jt(String.prototype.toLowerCase), vt = jt(String.prototype.toString), yt = jt(String.prototype.match), bt = jt(String.prototype.replace), xt = jt(String.prototype.indexOf), St = jt(String.prototype.trim), Ct = jt(Number.prototype.toString), wt = jt(Boolean.prototype.toString), Tt = typeof BigInt > "u" ? null : jt(BigInt.prototype.toString), Et = typeof Symbol > "u" ? null : jt(Symbol.prototype.toString), Dt = jt(Object.prototype.hasOwnProperty), Ot = jt(Object.prototype.toString), kt = jt(RegExp.prototype.test), At = Mt(TypeError);
function jt(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return lt(e, t, n);
	};
}
function Mt(e) {
	return function() {
		return ut(e, [...arguments]);
	};
}
function J(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _t;
	if (tt && tt(e, null), !gt(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (nt(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function Nt(e) {
	for (let t = 0; t < e.length; t++) Dt(e, t) || (e[t] = null);
	return e;
}
function Pt(e) {
	let t = st(null);
	for (let r of et(e)) {
		var n = Qe(r, 2);
		let i = n[0], a = n[1];
		Dt(e, i) && (gt(a) ? t[i] = Nt(a) : a && typeof a == "object" && a.constructor === Object ? t[i] = Pt(a) : t[i] = a);
	}
	return t;
}
function Ft(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return Ct(e);
		case "boolean": return wt(e);
		case "bigint": return Tt ? Tt(e) : "0";
		case "symbol": return Et ? Et(e) : "Symbol()";
		case "undefined": return Ot(e);
		case "function":
		case "object": {
			if (e === null) return Ot(e);
			let t = e, n = It(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : Ot(e);
			}
			return Ot(e);
		}
		default: return Ot(e);
	}
}
function It(e, t) {
	for (; e !== null;) {
		let n = it(e, t);
		if (n) {
			if (n.get) return jt(n.get);
			if (typeof n.value == "function") return jt(n.value);
		}
		e = rt(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Lt(e) {
	try {
		return kt(e, ""), !0;
	} catch {
		return !1;
	}
}
var Rt = at(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), zt = at(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), Bt = at([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), Vt = at([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), Ht = at(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), Ut = at([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), Wt = at(["#text"]), Gt = at(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), Kt = at(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), qt = at(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), Jt = at([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), Yt = ot(/{{[\w\W]*|^[\w\W]*}}/g), Xt = ot(/<%[\w\W]*|^[\w\W]*%>/g), Zt = ot(/\${[\w\W]*/g), Y = ot(/^data-[\-\w.\u00B7-\uFFFF]+$/), Qt = ot(/^aria-[\-\w]+$/), $t = ot(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), en = ot(/^(?:\w+script|data):/i), tn = ot(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), nn = ot(/^html$/i), rn = ot(/^[a-z][.\w]*(-[.\w]+)+$/i), an = ot(/<[/\w!]/g), on = ot(/<[/\w]/g), sn = ot(/<\/no(script|embed|frames)/i), cn = ot(/\/>/i), ln = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, un = function() {
	return typeof window > "u" ? null : window;
}, dn = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, fn = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, pn = function(e, t, n, r) {
	return Dt(e, t) && gt(e[t]) ? J(r.base ? Pt(r.base) : {}, e[t], r.transform) : n;
};
function mn() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : un(), t = (e) => mn(e);
	if (t.version = "3.4.12", t.removed = [], !e || !e.document || e.document.nodeType !== ln.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = It(d, "cloneNode"), p = It(d, "remove"), m = It(d, "nextSibling"), h = It(d, "childNodes"), g = It(d, "parentNode"), _ = It(d, "shadowRoot"), v = It(d, "attributes"), y = o && o.prototype ? It(o.prototype, "nodeType") : null, b = o && o.prototype ? It(o.prototype, "nodeName") : null;
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let x, S = "", C, w = !1, T = 0, E = function() {
		if (T > 0) throw At("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, D = function(e) {
		E(), T++;
		try {
			return x.createHTML(e);
		} finally {
			T--;
		}
	}, O = function(e) {
		E(), T++;
		try {
			return x.createScriptURL(e);
		} finally {
			T--;
		}
	}, k = function() {
		return w ||= (C = dn(u, i), !0), C;
	}, A = n, j = A.implementation, M = A.createNodeIterator, N = A.createDocumentFragment, P = A.getElementsByTagName, F = r.importNode, I = fn();
	t.isSupported = typeof et == "function" && typeof g == "function" && j && j.createHTMLDocument !== void 0;
	let L = Yt, R = Xt, z = Zt, B = Y, V = Qt, H = en, ee = tn, te = rn, ne = $t, re = null, ie = J({}, [
		...Rt,
		...zt,
		...Bt,
		...Ht,
		...Wt
	]), U = null, ae = J({}, [
		...Gt,
		...Kt,
		...qt,
		...Jt
	]), W = Object.seal(st(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), oe = null, se = null, ce = Object.seal(st(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), le = !0, ue = !0, de = !1, fe = !0, pe = !1, me = !0, he = !1, ge = !1, _e = null, ve = null, ye = !1, be = !1, xe = !1, Se = !1, Ce = !0, we = !1, Te = "user-content-", G = !0, Ee = !1, De = {}, Oe = null, ke = J({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Ae = null, je = J({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), Me = null, Ne = J({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), Pe = "http://www.w3.org/1998/Math/MathML", Fe = "http://www.w3.org/2000/svg", K = "http://www.w3.org/1999/xhtml", Ie = K, Le = !1, Re = null, ze = J({}, [
		Pe,
		Fe,
		K
	], vt), Be = at([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), Ve = J({}, Be), He = at(["annotation-xml"]), Ue = J({}, He), We = J({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), Ge = null, Ke = ["application/xhtml+xml", "text/html"], q = null, qe = null, Je = n.createElement("form"), Ye = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, Xe = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (qe && qe === e) return;
		(!e || typeof e != "object") && (e = {}), e = Pt(e), Ge = Ke.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, q = Ge === "application/xhtml+xml" ? vt : _t, re = pn(e, "ALLOWED_TAGS", ie, { transform: q }), U = pn(e, "ALLOWED_ATTR", ae, { transform: q }), Re = pn(e, "ALLOWED_NAMESPACES", ze, { transform: vt }), Me = pn(e, "ADD_URI_SAFE_ATTR", Ne, {
			transform: q,
			base: Ne
		}), Ae = pn(e, "ADD_DATA_URI_TAGS", je, {
			transform: q,
			base: je
		}), Oe = pn(e, "FORBID_CONTENTS", ke, { transform: q }), oe = pn(e, "FORBID_TAGS", Pt({}), { transform: q }), se = pn(e, "FORBID_ATTR", Pt({}), { transform: q }), De = Dt(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? Pt(e.USE_PROFILES) : e.USE_PROFILES : !1, le = e.ALLOW_ARIA_ATTR !== !1, ue = e.ALLOW_DATA_ATTR !== !1, de = e.ALLOW_UNKNOWN_PROTOCOLS || !1, fe = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, pe = e.SAFE_FOR_TEMPLATES || !1, me = e.SAFE_FOR_XML !== !1, he = e.WHOLE_DOCUMENT || !1, be = e.RETURN_DOM || !1, xe = e.RETURN_DOM_FRAGMENT || !1, Se = e.RETURN_TRUSTED_TYPE || !1, ye = e.FORCE_BODY || !1, Ce = e.SANITIZE_DOM !== !1, we = e.SANITIZE_NAMED_PROPS || !1, G = e.KEEP_CONTENT !== !1, Ee = e.IN_PLACE || !1, ne = Lt(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : $t, Ie = typeof e.NAMESPACE == "string" ? e.NAMESPACE : K, Ve = Dt(e, "MATHML_TEXT_INTEGRATION_POINTS") && e.MATHML_TEXT_INTEGRATION_POINTS && typeof e.MATHML_TEXT_INTEGRATION_POINTS == "object" ? Pt(e.MATHML_TEXT_INTEGRATION_POINTS) : J({}, Be), Ue = Dt(e, "HTML_INTEGRATION_POINTS") && e.HTML_INTEGRATION_POINTS && typeof e.HTML_INTEGRATION_POINTS == "object" ? Pt(e.HTML_INTEGRATION_POINTS) : J({}, He);
		let t = Dt(e, "CUSTOM_ELEMENT_HANDLING") && e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING == "object" ? Pt(e.CUSTOM_ELEMENT_HANDLING) : st(null);
		if (W = st(null), Dt(t, "tagNameCheck") && Ye(t.tagNameCheck) && (W.tagNameCheck = t.tagNameCheck), Dt(t, "attributeNameCheck") && Ye(t.attributeNameCheck) && (W.attributeNameCheck = t.attributeNameCheck), Dt(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (W.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), ot(W), pe && (ue = !1), xe && (be = !0), De && (re = J({}, Wt), U = st(null), De.html === !0 && (J(re, Rt), J(U, Gt)), De.svg === !0 && (J(re, zt), J(U, Kt), J(U, Jt)), De.svgFilters === !0 && (J(re, Bt), J(U, Kt), J(U, Jt)), De.mathMl === !0 && (J(re, Ht), J(U, qt), J(U, Jt))), ce.tagCheck = null, ce.attributeCheck = null, Dt(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? ce.tagCheck = e.ADD_TAGS : gt(e.ADD_TAGS) && (re === ie && (re = Pt(re)), J(re, e.ADD_TAGS, q))), Dt(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? ce.attributeCheck = e.ADD_ATTR : gt(e.ADD_ATTR) && (U === ae && (U = Pt(U)), J(U, e.ADD_ATTR, q))), Dt(e, "ADD_URI_SAFE_ATTR") && gt(e.ADD_URI_SAFE_ATTR) && J(Me, e.ADD_URI_SAFE_ATTR, q), Dt(e, "FORBID_CONTENTS") && gt(e.FORBID_CONTENTS) && (Oe === ke && (Oe = Pt(Oe)), J(Oe, e.FORBID_CONTENTS, q)), Dt(e, "ADD_FORBID_CONTENTS") && gt(e.ADD_FORBID_CONTENTS) && (Oe === ke && (Oe = Pt(Oe)), J(Oe, e.ADD_FORBID_CONTENTS, q)), G && (re["#text"] = !0), he && J(re, [
			"html",
			"head",
			"body"
		]), re.table && (J(re, ["tbody"]), delete oe.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw At("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw At("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = x;
			x = e.TRUSTED_TYPES_POLICY;
			try {
				S = D("");
			} catch (e) {
				throw x = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (x = void 0, S = "") : (x === void 0 && (x = k()), x && typeof S == "string" && (S = D("")));
		at && at(e), qe = e;
	}, Ze = J({}, [
		...zt,
		...Bt,
		...Vt
	]), Qe = J({}, [...Ht, ...Ut]), $e = function(e, t, n) {
		return t.namespaceURI === K ? e === "svg" : t.namespaceURI === Pe ? e === "svg" && (n === "annotation-xml" || Ve[n]) : !!Ze[e];
	}, tt = function(e, t, n) {
		return t.namespaceURI === K ? e === "math" : t.namespaceURI === Fe ? e === "math" && Ue[n] : !!Qe[e];
	}, nt = function(e, t, n) {
		return t.namespaceURI === Fe && !Ue[n] || t.namespaceURI === Pe && !Ve[n] ? !1 : !Qe[e] && (We[e] || !Ze[e]);
	}, rt = function(e) {
		let t = g(e);
		(!t || !t.tagName) && (t = {
			namespaceURI: Ie,
			tagName: "template"
		});
		let n = _t(e.tagName), r = _t(t.tagName);
		return Re[e.namespaceURI] ? e.namespaceURI === Fe ? $e(n, t, r) : e.namespaceURI === Pe ? tt(n, t, r) : e.namespaceURI === K ? nt(n, t, r) : !!(Ge === "application/xhtml+xml" && Re[e.namespaceURI]) : !1;
	}, it = function(e) {
		mt(t.removed, { element: e });
		try {
			g(e).removeChild(e);
		} catch {
			if (p(e), !g(e)) throw At("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, ct = function(e) {
		Ct(e);
		let t = h(e);
		if (t) {
			let e = [];
			dt(t, (t) => {
				mt(e, t);
			}), dt(e, (e) => {
				try {
					p(e);
				} catch {}
			});
		}
		let n = v(e);
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			if (typeof i == "string") try {
				e.removeAttribute(i);
			} catch {}
		}
	}, lt = function(e, n) {
		try {
			mt(t.removed, {
				attribute: n.getAttributeNode(e),
				from: n
			});
		} catch {
			mt(t.removed, {
				attribute: null,
				from: n
			});
		}
		if (n.removeAttribute(e), e === "is") if (be || xe) try {
			it(n);
		} catch {}
		else try {
			n.setAttribute(e, "");
		} catch {}
	}, ut = function(e) {
		let t = v(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			if (!(typeof i != "string" || U[q(i)])) try {
				e.removeAttribute(i);
			} catch {}
		}
	}, Ct = function(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			(y ? y(e) : e.nodeType) === ln.element && ut(e);
			let n = h(e);
			if (n) for (let e = n.length - 1; e >= 0; --e) t.push(n[e]);
		}
	}, wt = function(e) {
		if (!me) return;
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop(), n = y ? y(e) : e.nodeType;
			if (n === ln.processingInstruction || n === ln.comment && kt(on, e.data)) {
				try {
					p(e);
				} catch {}
				continue;
			}
			if (n === ln.element) {
				let t = e, n = q(b ? b(e) : e.nodeName);
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && n !== "label" && n !== "output" && t.removeAttribute("for");
				} catch {}
			}
			let r = h(e);
			if (r) for (let e = r.length - 1; e >= 0; --e) t.push(r[e]);
		}
	}, Tt = function(e) {
		let t = null, r = null;
		if (ye) e = "<remove></remove>" + e;
		else {
			let t = yt(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		Ge === "application/xhtml+xml" && Ie === K && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = x ? D(e) : e;
		if (Ie === K) try {
			t = new l().parseFromString(i, Ge);
		} catch {}
		if (!t || !t.documentElement) {
			t = j.createDocument(Ie, "template", null);
			try {
				t.documentElement.innerHTML = Le ? S : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), Ie === K ? P.call(t, he ? "html" : "body")[0] : he ? t.documentElement : a;
	}, Et = function(e) {
		return M.call(e.ownerDocument || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Ot = function(e) {
		return e = bt(e, L, " "), e = bt(e, R, " "), e = bt(e, z, " "), e;
	}, jt = function(e) {
		e.normalize();
		let t = M.call(e.ownerDocument || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), n = t.nextNode();
		for (; n;) n.data = Ot(n.data), n = t.nextNode();
		let r = e.querySelectorAll?.call(e, "template");
		r && dt(r, (e) => {
			Nt(e.content) && jt(e.content);
		});
	}, Mt = function(e) {
		let t = b ? b(e) : null;
		return typeof t != "string" || q(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== v(e) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== y(e) || e.childNodes !== h(e);
	}, Nt = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return y(e) === ln.documentFragment;
		} catch {
			return !1;
		}
	}, hn = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return typeof y(e) == "number";
		} catch {
			return !1;
		}
	};
	function gn(e, n, r) {
		e.length !== 0 && dt(e, (e) => {
			e.call(t, n, r, qe);
		});
	}
	let _n = function(e, t) {
		return !!(me && e.hasChildNodes() && !hn(e.firstElementChild) && kt(an, e.textContent) && kt(an, e.innerHTML) || me && e.namespaceURI === K && t === "style" && hn(e.firstElementChild) || e.nodeType === ln.processingInstruction || me && e.nodeType === ln.comment && kt(on, e.data));
	}, vn = function(e, t) {
		if (!oe[t] && Sn(t) && (W.tagNameCheck instanceof RegExp && kt(W.tagNameCheck, t) || W.tagNameCheck instanceof Function && W.tagNameCheck(t))) return !1;
		if (G && !Oe[t]) {
			let t = g(e), n = h(e);
			if (n && t) {
				let r = n.length;
				for (let i = r - 1; i >= 0; --i) {
					let r = Ee ? n[i] : f(n[i], !0);
					t.insertBefore(r, m(e));
				}
			}
		}
		return it(e), !0;
	}, yn = function(e, n) {
		if (gn(I.beforeSanitizeElements, e, null), e !== n && g(e) === null) return !0;
		if (Mt(e)) return it(e), !0;
		let r = q(b ? b(e) : e.nodeName);
		if (gn(I.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: re
		}), e !== n && g(e) === null) return !0;
		if (_n(e, r)) return it(e), !0;
		if (oe[r] || !(ce.tagCheck instanceof Function && ce.tagCheck(r)) && !re[r]) {
			let t = vn(e, r);
			return t === !1 && gn(I.afterSanitizeElements, e, null), t;
		}
		if ((y ? y(e) : e.nodeType) === ln.element && !rt(e) || (r === "noscript" || r === "noembed" || r === "noframes") && kt(sn, e.innerHTML)) return it(e), !0;
		if (pe && e.nodeType === ln.text) {
			let n = Ot(e.textContent);
			e.textContent !== n && (mt(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return gn(I.afterSanitizeElements, e, null), !1;
	}, bn = function(e, t, r) {
		if (se[t] || me && t === "patchsrc" || me && t === "for" && e !== "label" && e !== "output" || Ce && (t === "id" || t === "name") && (r in n || r in Je)) return !1;
		let i = U[t] || ce.attributeCheck instanceof Function && ce.attributeCheck(t, e);
		if (!(ue && kt(B, t)) && !(le && kt(V, t))) {
			if (!i) {
				if (!(Sn(e) && (W.tagNameCheck instanceof RegExp && kt(W.tagNameCheck, e) || W.tagNameCheck instanceof Function && W.tagNameCheck(e)) && (W.attributeNameCheck instanceof RegExp && kt(W.attributeNameCheck, t) || W.attributeNameCheck instanceof Function && W.attributeNameCheck(t, e)) || t === "is" && W.allowCustomizedBuiltInElements && (W.tagNameCheck instanceof RegExp && kt(W.tagNameCheck, r) || W.tagNameCheck instanceof Function && W.tagNameCheck(r)))) return !1;
			} else if (!Me[t] && !kt(ne, bt(r, ee, "")) && !((t === "src" || t === "xlink:href" || t === "href") && e !== "script" && xt(r, "data:") === 0 && Ae[e]) && !(de && !kt(H, bt(r, ee, ""))) && r) return !1;
		}
		return !0;
	}, xn = J({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Sn = function(e) {
		return !xn[_t(e)] && kt(te, e);
	}, Cn = function(e, t, n, r) {
		if (x && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return D(r);
			case "TrustedScriptURL": return O(r);
		}
		return r;
	}, wn = function(e, n, r, i) {
		try {
			r ? e.setAttributeNS(r, n, i) : e.setAttribute(n, i), Mt(e) ? it(e) : pt(t.removed);
		} catch {
			lt(n, e);
		}
	}, Tn = function(e) {
		gn(I.beforeSanitizeAttributes, e, null);
		let t = e.attributes;
		if (!t || Mt(e)) return;
		let n = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: U,
			forceKeepAttr: void 0
		}, r = t.length, i = q(e.nodeName);
		for (; r--;) {
			let a = t[r], o = a.name, s = a.namespaceURI, c = a.value, l = q(o), u = c, d = o === "value" ? u : St(u);
			if (n.attrName = l, n.attrValue = d, n.keepAttr = !0, n.forceKeepAttr = void 0, gn(I.uponSanitizeAttribute, e, n), d = n.attrValue, we && (l === "id" || l === "name") && xt(d, Te) !== 0 && (lt(o, e), d = Te + d), me && kt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, d)) {
				lt(o, e);
				continue;
			}
			if (l === "attributename" && yt(d, "href")) {
				lt(o, e);
				continue;
			}
			if (!n.forceKeepAttr) {
				if (!n.keepAttr) {
					lt(o, e);
					continue;
				}
				if (!fe && kt(cn, d)) {
					lt(o, e);
					continue;
				}
				if (pe && (d = Ot(d)), !bn(i, l, d)) {
					lt(o, e);
					continue;
				}
				d = Cn(i, l, s, d), d !== u && wn(e, o, s, d);
			}
		}
		gn(I.afterSanitizeAttributes, e, null);
	}, En = function(e) {
		let t = null, n = Et(e);
		for (gn(I.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (gn(I.uponSanitizeShadowNode, t, null), yn(t, e), Tn(t), Nt(t.content) && En(t.content), (y ? y(t) : t.nodeType) === ln.element) {
			let e = _(t);
			Nt(e) && (Dn(e), En(e));
		}
		gn(I.afterSanitizeShadowDOM, e, null);
	}, Dn = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				En(e.shadow);
				continue;
			}
			let n = e.node, r = (y ? y(n) : n.nodeType) === ln.element, i = h(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = b ? b(n) : null;
				if (typeof e == "string" && q(e) === "template") {
					let e = n.content;
					Nt(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = _(n);
				Nt(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (Le = !e, Le && (e = "<!-->"), typeof e != "string" && !hn(e) && (e = Ft(e), typeof e != "string")) throw At("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		ge ? (re = _e, U = ve) : Xe(n), (I.uponSanitizeElement.length > 0 || I.uponSanitizeAttribute.length > 0) && (re = Pt(re)), I.uponSanitizeAttribute.length > 0 && (U = Pt(U)), t.removed = [];
		let c = Ee && typeof e != "string" && hn(e);
		if (c) {
			wt(e);
			let t = b ? b(e) : e.nodeName;
			if (typeof t == "string") {
				let n = q(t);
				if (!re[n] || oe[n]) throw ct(e), At("root node is forbidden and cannot be sanitized in-place");
			}
			if (Mt(e)) throw ct(e), At("root node is clobbered and cannot be sanitized in-place");
			try {
				Dn(e);
			} catch (t) {
				throw ct(e), t;
			}
		} else if (hn(e)) i = Tt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === ln.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), Dn(a);
		else {
			if (!be && !pe && !he && e.indexOf("<") === -1) return x && Se ? D(e) : e;
			if (i = Tt(e), !i) return be ? null : Se ? S : "";
		}
		i && ye && it(i.firstChild);
		let l = c ? e : i, u = Et(l);
		try {
			for (; o = u.nextNode();) yn(o, l), Tn(o), Nt(o.content) && En(o.content);
		} catch (n) {
			throw c && (ct(e), dt(t.removed, (e) => {
				e.element && Ct(e.element);
			})), n;
		}
		if (c) return dt(t.removed, (e) => {
			e.element && Ct(e.element);
		}), pe && jt(e), e;
		if (be) {
			if (pe && jt(i), xe) for (s = N.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (U.shadowroot || U.shadowrootmode) && (s = F.call(r, s, !0)), s;
		}
		let d = he ? i.outerHTML : i.innerHTML;
		return he && re["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && kt(nn, i.ownerDocument.doctype.name) && (d = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + d), pe && (d = Ot(d)), x && Se ? D(d) : d;
	}, t.setConfig = function() {
		Xe(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}), ge = !0, _e = re, ve = U;
	}, t.clearConfig = function() {
		qe = null, ge = !1, _e = null, ve = null, x = C, S = "";
	}, t.isValidAttribute = function(e, t, n) {
		return qe || Xe({}), bn(q(e), q(t), n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && Dt(I, e) && mt(I[e], t);
	}, t.removeHook = function(e, t) {
		if (Dt(I, e)) {
			if (t !== void 0) {
				let n = ft(I[e], t);
				return n === -1 ? void 0 : ht(I[e], n, 1)[0];
			}
			return pt(I[e]);
		}
	}, t.removeHooks = function(e) {
		Dt(I, e) && (I[e] = []);
	}, t.removeAllHooks = function() {
		I = fn();
	}, t;
}
var hn = mn();
//#endregion
//#region src/util/dom.ts
function gn(e) {
	let t = document.getElementById(e);
	if (!t) throw Error(`${e} is not found`);
	return t;
}
function _n(e, t) {
	let n = e.querySelector(t);
	if (!n) throw Error(`${t} is not found`);
	return n;
}
function vn(e) {
	return (e && e.childNodes[0] ? e.childNodes[0].nodeValue : "") || "";
}
function yn(e, t) {
	return [...e.getElementsByTagName(t)].map((e) => vn(e)).join("");
}
function bn(e, t) {
	for (let n = 0; n < e.nthChildIndexes.length; n++) if (e.nthChildIndexes[n] !== t.nthChildIndexes[n]) return e.nthChildIndexes[n] - t.nthChildIndexes[n];
	return e.offset - t.offset;
}
function xn(e, t) {
	let n = {
		nthChildIndexes: [],
		nthOfTypeIndexes: [],
		offset: t
	};
	for (; e && e.parentNode;) {
		let t = e.nodeName;
		n.nthChildIndexes.unshift([...e.parentNode.childNodes].indexOf(e)), n.nthOfTypeIndexes.unshift([t, [...e.parentNode.childNodes].filter((e) => e.nodeName === t).indexOf(e)]), e = e.parentNode;
	}
	return n.nthChildIndexes.splice(0, 2), n.nthOfTypeIndexes.splice(0, 2), n;
}
function Sn(e) {
	let t = document.querySelector(`[data-mt-block-editor-block-id="${e}"] .mt-be-block div:last-child`);
	if (!t || !t.shadowRoot) return null;
	let n = t.shadowRoot.getSelection ? t.shadowRoot.getSelection() : document.getSelection();
	return !n || !n.anchorNode || !n.anchorNode.parentNode || n.anchorNode.parentNode.closest("body") || !n.focusNode || !n.focusNode.parentNode ? null : {
		anchor: xn(n.anchorNode, n.anchorOffset),
		focus: xn(n.focusNode, n.focusOffset)
	};
}
function Cn(e, t) {
	return t.forEach(([t, n]) => {
		e &&= [...e.childNodes].filter((e) => e instanceof HTMLElement && (e.getAttribute("data-mce-caret") || e.getAttribute("data-mce-bogus")) ? !1 : e.nodeName === t)[n];
	}), e;
}
var wn = {
	"	": "&#x08;",
	"\n": "&#x0A;",
	"\r": "&#x0D;",
	"&": "&amp;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;",
	"‘": "&#x2018;",
	"’": "&#x2019;",
	"“": "&#x201c;",
	"”": "&#x201d;"
}, Tn = (() => {
	let e = RegExp(`[${Object.keys(wn).join("")}]`, "g");
	return (t) => typeof t == "string" ? t.replace(e, (e) => wn[e]) : t;
})(), En = (() => {
	let e = Object.fromEntries(Object.entries(wn).map(([e, t]) => [t, e])), t = RegExp(`(${Object.keys(e).join("|")})`, "g");
	return (n) => typeof n == "string" ? n.replace(t, (t, n) => e[n]) : n;
})(), Dn = hn(window);
function On(e) {
	return Dn.sanitize(e);
}
function kn(e) {
	let t = document.createElement("textarea");
	return t.innerHTML = e, t.value;
}
function An(e) {
	return !!(e.target instanceof Element && e.target.closest(".tox"));
}
//#endregion
//#region src/util/react.ts
var jn = (() => {
	let e = /(\r\n|\r|\n)/g;
	return function(t) {
		return typeof t == "string" ? t.split(e).map((t, n) => t.match(e) ? K.createElement("br", { key: n }) : t) : t;
	};
})(), Mn = /* @__PURE__ */ o(((e) => {
	var t = Oe(), n = Me();
	function r(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var i = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), g = Symbol.for("react.scope"), _ = Symbol.for("react.activity"), v = Symbol.for("react.legacy_hidden"), y = Symbol.for("react.memo_cache_sentinel"), b = Symbol.for("react.view_transition"), x = Symbol.iterator;
	function S(e) {
		return typeof e != "object" || !e ? null : (e = x && e[x] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var C = Array.isArray;
	function w(e, t) {
		var n = e.length & 3, r = e.length - n, i = t;
		for (t = 0; t < r;) {
			var a = e.charCodeAt(t) & 255 | (e.charCodeAt(++t) & 255) << 8 | (e.charCodeAt(++t) & 255) << 16 | (e.charCodeAt(++t) & 255) << 24;
			++t, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295, i ^= a, i = i << 13 | i >>> 19, i = 5 * (i & 65535) + ((5 * (i >>> 16) & 65535) << 16) & 4294967295, i = (i & 65535) + 27492 + (((i >>> 16) + 58964 & 65535) << 16);
		}
		switch (a = 0, n) {
			case 3: a ^= (e.charCodeAt(t + 2) & 255) << 16;
			case 2: a ^= (e.charCodeAt(t + 1) & 255) << 8;
			case 1: a ^= e.charCodeAt(t) & 255, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, i ^= 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295;
		}
		return i ^= e.length, i ^= i >>> 16, i = 2246822507 * (i & 65535) + ((2246822507 * (i >>> 16) & 65535) << 16) & 4294967295, i ^= i >>> 13, i = 3266489909 * (i & 65535) + ((3266489909 * (i >>> 16) & 65535) << 16) & 4294967295, (i ^ i >>> 16) >>> 0;
	}
	var T = Object.assign, E = Object.prototype.hasOwnProperty, D = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), O = {}, k = {};
	function A(e) {
		return E.call(k, e) ? !0 : E.call(O, e) ? !1 : D.test(e) ? k[e] = !0 : (O[e] = !0, !1);
	}
	var j = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), M = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), N = /["'&<>]/;
	function P(e) {
		if (typeof e == "boolean" || typeof e == "number" || typeof e == "bigint") return "" + e;
		e = "" + e;
		var t = N.exec(e);
		if (t) {
			var n = "", r, i = 0;
			for (r = t.index; r < e.length; r++) {
				switch (e.charCodeAt(r)) {
					case 34:
						t = "&quot;";
						break;
					case 38:
						t = "&amp;";
						break;
					case 39:
						t = "&#x27;";
						break;
					case 60:
						t = "&lt;";
						break;
					case 62:
						t = "&gt;";
						break;
					default: continue;
				}
				i !== r && (n += e.slice(i, r)), i = r + 1, n += t;
			}
			e = i === r ? n : n + e.slice(i, r);
		}
		return e;
	}
	var F = /([A-Z])/g, I = /^ms-/, L = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function R(e) {
		return L.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	var z = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, H = B.d;
	B.d = {
		f: H.f,
		r: H.r,
		D: it,
		C: at,
		L: ot,
		m: st,
		X: lt,
		S: ct,
		M: ut
	};
	var ee = [], te = null, ne = /(<\/|<)(s)(cript)/gi;
	function re(e, t, n, r) {
		return "" + t + (n === "s" ? "\\u0073" : "\\u0053") + r;
	}
	function ie(e, t, n, r, i) {
		return {
			idPrefix: e === void 0 ? "" : e,
			nextFormID: 0,
			streamingFormat: 0,
			bootstrapScriptContent: n,
			bootstrapScripts: r,
			bootstrapModules: i,
			instructions: 0,
			hasBody: !1,
			hasHtml: !1,
			unknownResources: {},
			dnsResources: {},
			connectResources: {
				default: {},
				anonymous: {},
				credentials: {}
			},
			imageResources: {},
			styleResources: {},
			scriptResources: {},
			moduleUnknownResources: {},
			moduleScriptResources: {}
		};
	}
	function U(e, t, n, r) {
		return {
			insertionMode: e,
			selectedValue: t,
			tagScope: n,
			viewTransition: r
		};
	}
	function ae(e, t, n) {
		var r = e.tagScope & -25;
		switch (t) {
			case "noscript": return U(2, null, r | 1, null);
			case "select": return U(2, n.value == null ? n.defaultValue : n.value, r, null);
			case "svg": return U(4, null, r, null);
			case "picture": return U(2, null, r | 2, null);
			case "math": return U(5, null, r, null);
			case "foreignObject": return U(2, null, r, null);
			case "table": return U(6, null, r, null);
			case "thead":
			case "tbody":
			case "tfoot": return U(7, null, r, null);
			case "colgroup": return U(9, null, r, null);
			case "tr": return U(8, null, r, null);
			case "head":
				if (2 > e.insertionMode) return U(3, null, r, null);
				break;
			case "html": if (e.insertionMode === 0) return U(1, null, r, null);
		}
		return 6 <= e.insertionMode || 2 > e.insertionMode ? U(2, null, r, null) : e.tagScope === r ? e : U(e.insertionMode, e.selectedValue, r, null);
	}
	function W(e) {
		return e === null ? null : {
			update: e.update,
			enter: "none",
			exit: "none",
			share: e.update,
			name: e.autoName,
			autoName: e.autoName,
			nameIdx: 0
		};
	}
	function oe(e, t) {
		return t.tagScope & 32 && (e.instructions |= 128), U(t.insertionMode, t.selectedValue, t.tagScope | 12, W(t.viewTransition));
	}
	function se(e, t) {
		e = W(t.viewTransition);
		var n = t.tagScope | 16;
		return e !== null && e.share !== "none" && (n |= 64), U(t.insertionMode, t.selectedValue, n, e);
	}
	var ce = /* @__PURE__ */ new Map();
	function le(e, t) {
		if (typeof t != "object") throw Error(r(62));
		var n = !0, i;
		for (i in t) if (E.call(t, i)) {
			var a = t[i];
			if (a != null && typeof a != "boolean" && a !== "") {
				if (i.indexOf("--") === 0) {
					var o = P(i);
					a = P(("" + a).trim());
				} else o = ce.get(i), o === void 0 && (o = P(i.replace(F, "-$1").toLowerCase().replace(I, "-ms-")), ce.set(i, o)), a = typeof a == "number" ? a === 0 || j.has(i) ? "" + a : a + "px" : P(("" + a).trim());
				n ? (n = !1, e.push(" style=\"", o, ":", a)) : e.push(";", o, ":", a);
			}
		}
		n || e.push("\"");
	}
	function ue(e, t, n) {
		n && typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"\"");
	}
	function de(e, t, n) {
		typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && e.push(" ", t, "=\"", P(n), "\"");
	}
	var fe = P("javascript:throw new Error('React form unexpectedly submitted.')");
	function pe(e, t) {
		this.push("<input type=\"hidden\""), me(e), de(this, "name", t), de(this, "value", e), this.push("/>");
	}
	function me(e) {
		if (typeof e != "string") throw Error(r(480));
	}
	function he(e, t) {
		if (typeof t.$$FORM_ACTION == "function") {
			var n = e.nextFormID++;
			e = e.idPrefix + n;
			try {
				var r = t.$$FORM_ACTION(e);
				return r && r.data?.forEach(me), r;
			} catch (e) {
				if (typeof e == "object" && e && typeof e.then == "function") throw e;
			}
		}
		return null;
	}
	function ge(e, t, n, r, i, a, o, s) {
		var c = null;
		if (typeof r == "function") {
			var l = he(t, r);
			l === null ? (e.push(" ", "formAction", "=\"", fe, "\""), o = a = i = r = s = null, be(t, n)) : (s = l.name, r = l.action || "", i = l.encType, a = l.method, o = l.target, c = l.data);
		}
		return s != null && _e(e, "name", s), r != null && _e(e, "formAction", r), i != null && _e(e, "formEncType", i), a != null && _e(e, "formMethod", a), o != null && _e(e, "formTarget", o), c;
	}
	function _e(e, t, n) {
		switch (t) {
			case "className":
				de(e, "class", n);
				break;
			case "tabIndex":
				de(e, "tabindex", n);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				de(e, t, n);
				break;
			case "style":
				le(e, n);
				break;
			case "src":
			case "href": if (n === "") break;
			case "action":
			case "formAction":
				if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = R("" + n), e.push(" ", t, "=\"", P(n), "\"");
				break;
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "ref": break;
			case "autoFocus":
			case "multiple":
			case "muted":
				ue(e, t.toLowerCase(), n);
				break;
			case "xlinkHref":
				if (typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = R("" + n), e.push(" ", "xlink:href", "=\"", P(n), "\"");
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"", P(n), "\"");
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				n && typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"\"");
				break;
			case "capture":
			case "download":
				!0 === n ? e.push(" ", t, "=\"\"") : !1 !== n && typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"", P(n), "\"");
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n && e.push(" ", t, "=\"", P(n), "\"");
				break;
			case "rowSpan":
			case "start":
				typeof n == "function" || typeof n == "symbol" || isNaN(n) || e.push(" ", t, "=\"", P(n), "\"");
				break;
			case "xlinkActuate":
				de(e, "xlink:actuate", n);
				break;
			case "xlinkArcrole":
				de(e, "xlink:arcrole", n);
				break;
			case "xlinkRole":
				de(e, "xlink:role", n);
				break;
			case "xlinkShow":
				de(e, "xlink:show", n);
				break;
			case "xlinkTitle":
				de(e, "xlink:title", n);
				break;
			case "xlinkType":
				de(e, "xlink:type", n);
				break;
			case "xmlBase":
				de(e, "xml:base", n);
				break;
			case "xmlLang":
				de(e, "xml:lang", n);
				break;
			case "xmlSpace":
				de(e, "xml:space", n);
				break;
			default: if ((!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = M.get(t) || t, A(t))) {
				switch (typeof n) {
					case "function":
					case "symbol": return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") return;
				}
				e.push(" ", t, "=\"", P(n), "\"");
			}
		}
	}
	function ve(e, t, n) {
		if (t != null) {
			if (n != null) throw Error(r(60));
			if (typeof t != "object" || !("__html" in t)) throw Error(r(61));
			t = t.__html, t != null && e.push("" + t);
		}
	}
	function ye(e) {
		var n = "";
		return t.Children.forEach(e, function(e) {
			e != null && (n += e);
		}), n;
	}
	function be(e, t) {
		if (!(e.instructions & 16)) {
			e.instructions |= 16;
			var n = t.preamble, r = t.bootstrapChunks;
			(n.htmlChunks || n.headChunks) && r.length === 0 ? (r.push(t.startInlineScript), et(r, e), r.push(">", "addEventListener(\"submit\",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute(\"formAction\");null!=f&&(e=f,b=null)}\"javascript:throw new Error('React form unexpectedly submitted.')\"===e&&(a.preventDefault(),b?(a=document.createElement(\"input\"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});", "<\/script>")) : r.unshift(t.startInlineScript, ">", "addEventListener(\"submit\",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute(\"formAction\");null!=f&&(e=f,b=null)}\"javascript:throw new Error('React form unexpectedly submitted.')\"===e&&(a.preventDefault(),b?(a=document.createElement(\"input\"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});", "<\/script>");
		}
	}
	function xe(e, t) {
		for (var n in e.push(je("link")), t) if (E.call(t, n)) {
			var i = t[n];
			if (i != null) switch (n) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
				default: _e(e, n, i);
			}
		}
		return e.push("/>"), null;
	}
	var Se = /(<\/|<)(s)(tyle)/gi;
	function Ce(e, t, n, r) {
		return "" + t + (n === "s" ? "\\73 " : "\\53 ") + r;
	}
	function we(e, t, n) {
		for (var i in e.push(je(n)), t) if (E.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, n));
				default: _e(e, i, a);
			}
		}
		return e.push("/>"), null;
	}
	function Te(e, t) {
		e.push(je("title"));
		var n = null, r = null, i;
		for (i in t) if (E.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: _e(e, i, a);
			}
		}
		return e.push(">"), t = Array.isArray(n) ? 2 > n.length ? n[0] : null : n, typeof t != "function" && typeof t != "symbol" && t != null && e.push(P("" + t)), ve(e, r, n), e.push(Fe("title")), null;
	}
	function G(e, t) {
		e.push(je("script"));
		var n = null, r = null, i;
		for (i in t) if (E.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: _e(e, i, a);
			}
		}
		return e.push(">"), ve(e, r, n), typeof n == "string" && e.push(("" + n).replace(ne, re)), e.push(Fe("script")), null;
	}
	function Ee(e, t, n) {
		e.push(je(n));
		var r = n = null, i;
		for (i in t) if (E.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: _e(e, i, a);
			}
		}
		return e.push(">"), ve(e, r, n), n;
	}
	function De(e, t, n) {
		e.push(je(n));
		var r = n = null, i;
		for (i in t) if (E.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: _e(e, i, a);
			}
		}
		return e.push(">"), ve(e, r, n), typeof n == "string" ? (e.push(P(n)), null) : n;
	}
	var ke = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Ae = /* @__PURE__ */ new Map();
	function je(e) {
		var t = Ae.get(e);
		if (t === void 0) {
			if (!ke.test(e)) throw Error(r(65, e));
			t = "<" + e, Ae.set(e, t);
		}
		return t;
	}
	function Ne(e, t, n, i, a, o, s, c, l) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path": break;
			case "a":
				e.push(je("a"));
				var u = null, d = null, f;
				for (f in n) if (E.call(n, f)) {
					var p = n[f];
					if (p != null) switch (f) {
						case "children":
							u = p;
							break;
						case "dangerouslySetInnerHTML":
							d = p;
							break;
						case "href":
							p === "" ? de(e, "href", "") : _e(e, f, p);
							break;
						default: _e(e, f, p);
					}
				}
				if (e.push(">"), ve(e, d, u), typeof u == "string") {
					e.push(P(u));
					var m = null;
				} else m = u;
				return m;
			case "g":
			case "p":
			case "li": break;
			case "select":
				e.push(je("select"));
				var h = null, g = null, _;
				for (_ in n) if (E.call(n, _)) {
					var v = n[_];
					if (v != null) switch (_) {
						case "children":
							h = v;
							break;
						case "dangerouslySetInnerHTML":
							g = v;
							break;
						case "defaultValue":
						case "value": break;
						default: _e(e, _, v);
					}
				}
				return e.push(">"), ve(e, g, h), h;
			case "option":
				var y = c.selectedValue;
				e.push(je("option"));
				var b = null, x = null, S = null, w = null, D;
				for (D in n) if (E.call(n, D)) {
					var O = n[D];
					if (O != null) switch (D) {
						case "children":
							b = O;
							break;
						case "selected":
							S = O;
							break;
						case "dangerouslySetInnerHTML":
							w = O;
							break;
						case "value": x = O;
						default: _e(e, D, O);
					}
				}
				if (y != null) {
					var k = x === null ? ye(b) : "" + x;
					if (C(y)) {
						for (var j = 0; j < y.length; j++) if ("" + y[j] === k) {
							e.push(" selected=\"\"");
							break;
						}
					} else "" + y === k && e.push(" selected=\"\"");
				} else S && e.push(" selected=\"\"");
				return e.push(">"), ve(e, w, b), b;
			case "textarea":
				e.push(je("textarea"));
				var M = null, N = null, F = null, I;
				for (I in n) if (E.call(n, I)) {
					var L = n[I];
					if (L != null) switch (I) {
						case "children":
							F = L;
							break;
						case "value":
							M = L;
							break;
						case "defaultValue":
							N = L;
							break;
						case "dangerouslySetInnerHTML": throw Error(r(91));
						default: _e(e, I, L);
					}
				}
				if (M === null && N !== null && (M = N), e.push(">"), F != null) {
					if (M != null) throw Error(r(92));
					if (C(F)) {
						if (1 < F.length) throw Error(r(93));
						M = "" + F[0];
					}
					M = "" + F;
				}
				return typeof M == "string" && M[0] === "\n" && e.push("\n"), M !== null && e.push(P("" + M)), null;
			case "input":
				e.push(je("input"));
				var z = null, B = null, V = null, H = null, te = null, ne = null, re = null, ie = null, U = null, ae;
				for (ae in n) if (E.call(n, ae)) {
					var W = n[ae];
					if (W != null) switch (ae) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(399, "input"));
						case "name":
							z = W;
							break;
						case "formAction":
							B = W;
							break;
						case "formEncType":
							V = W;
							break;
						case "formMethod":
							H = W;
							break;
						case "formTarget":
							te = W;
							break;
						case "defaultChecked":
							U = W;
							break;
						case "defaultValue":
							re = W;
							break;
						case "checked":
							ie = W;
							break;
						case "value":
							ne = W;
							break;
						default: _e(e, ae, W);
					}
				}
				var oe = ge(e, i, a, B, V, H, te, z);
				return ie === null ? U !== null && ue(e, "checked", U) : ue(e, "checked", ie), ne === null ? re !== null && _e(e, "value", re) : _e(e, "value", ne), e.push("/>"), oe?.forEach(pe, e), null;
			case "button":
				e.push(je("button"));
				var se = null, ce = null, me = null, Oe = null, ke = null, Ae = null, Me = null, Ne;
				for (Ne in n) if (E.call(n, Ne)) {
					var Pe = n[Ne];
					if (Pe != null) switch (Ne) {
						case "children":
							se = Pe;
							break;
						case "dangerouslySetInnerHTML":
							ce = Pe;
							break;
						case "name":
							me = Pe;
							break;
						case "formAction":
							Oe = Pe;
							break;
						case "formEncType":
							ke = Pe;
							break;
						case "formMethod":
							Ae = Pe;
							break;
						case "formTarget":
							Me = Pe;
							break;
						default: _e(e, Ne, Pe);
					}
				}
				var K = ge(e, i, a, Oe, ke, Ae, Me, me);
				if (e.push(">"), K?.forEach(pe, e), ve(e, ce, se), typeof se == "string") {
					e.push(P(se));
					var Ie = null;
				} else Ie = se;
				return Ie;
			case "form":
				e.push(je("form"));
				var Le = null, Re = null, ze = null, Be = null, Ve = null, He = null, Ue;
				for (Ue in n) if (E.call(n, Ue)) {
					var We = n[Ue];
					if (We != null) switch (Ue) {
						case "children":
							Le = We;
							break;
						case "dangerouslySetInnerHTML":
							Re = We;
							break;
						case "action":
							ze = We;
							break;
						case "encType":
							Be = We;
							break;
						case "method":
							Ve = We;
							break;
						case "target":
							He = We;
							break;
						default: _e(e, Ue, We);
					}
				}
				var Ge = null, Ke = null;
				if (typeof ze == "function") {
					var q = he(i, ze);
					q === null ? (e.push(" ", "action", "=\"", fe, "\""), He = Ve = Be = ze = null, be(i, a)) : (ze = q.action || "", Be = q.encType, Ve = q.method, He = q.target, Ge = q.data, Ke = q.name);
				}
				if (ze != null && _e(e, "action", ze), Be != null && _e(e, "encType", Be), Ve != null && _e(e, "method", Ve), He != null && _e(e, "target", He), e.push(">"), Ke !== null && (e.push("<input type=\"hidden\""), de(e, "name", Ke), e.push("/>"), Ge?.forEach(pe, e)), ve(e, Re, Le), typeof Le == "string") {
					e.push(P(Le));
					var qe = null;
				} else qe = Le;
				return qe;
			case "menuitem":
				for (var Je in e.push(je("menuitem")), n) if (E.call(n, Je)) {
					var Ye = n[Je];
					if (Ye != null) switch (Je) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(400));
						default: _e(e, Je, Ye);
					}
				}
				return e.push(">"), null;
			case "object":
				e.push(je("object"));
				var Xe = null, Ze = null, Qe;
				for (Qe in n) if (E.call(n, Qe)) {
					var $e = n[Qe];
					if ($e != null) switch (Qe) {
						case "children":
							Xe = $e;
							break;
						case "dangerouslySetInnerHTML":
							Ze = $e;
							break;
						case "data":
							var et = R("" + $e);
							if (et === "") break;
							e.push(" ", "data", "=\"", P(et), "\"");
							break;
						default: _e(e, Qe, $e);
					}
				}
				if (e.push(">"), ve(e, Ze, Xe), typeof Xe == "string") {
					e.push(P(Xe));
					var tt = null;
				} else tt = Xe;
				return tt;
			case "title":
				var nt = c.tagScope & 1, rt = c.tagScope & 4;
				if (c.insertionMode === 4 || nt || n.itemProp != null) var it = Te(e, n);
				else rt ? it = null : (Te(a.hoistableChunks, n), it = void 0);
				return it;
			case "link":
				var at = c.tagScope & 1, ot = c.tagScope & 4, st = n.rel, ct = n.href, lt = n.precedence;
				if (c.insertionMode === 4 || at || n.itemProp != null || typeof st != "string" || typeof ct != "string" || ct === "") {
					xe(e, n);
					var ut = null;
				} else if (n.rel === "stylesheet") if (typeof lt != "string" || n.disabled != null || n.onLoad || n.onError) ut = xe(e, n);
				else {
					var pt = a.styles.get(lt), mt = i.styleResources.hasOwnProperty(ct) ? i.styleResources[ct] : void 0;
					if (mt !== null) {
						i.styleResources[ct] = null, pt || (pt = {
							precedence: P(lt),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set(lt, pt));
						var ht = {
							state: 0,
							props: T({}, n, {
								"data-precedence": n.precedence,
								precedence: null
							})
						};
						if (mt) {
							mt.length === 2 && dt(ht.props, mt);
							var gt = a.preloads.stylesheets.get(ct);
							gt && 0 < gt.length ? gt.length = 0 : ht.state = 1;
						}
						pt.sheets.set(ct, ht), s && s.stylesheets.add(ht);
					} else if (pt) {
						var _t = pt.sheets.get(ct);
						_t && s && s.stylesheets.add(_t);
					}
					l && e.push("<!-- -->"), ut = null;
				}
				else n.onLoad || n.onError ? ut = xe(e, n) : (l && e.push("<!-- -->"), ut = ot ? null : xe(a.hoistableChunks, n));
				return ut;
			case "script":
				var vt = c.tagScope & 1, yt = n.async;
				if (typeof n.src != "string" || !n.src || !yt || typeof yt == "function" || typeof yt == "symbol" || n.onLoad || n.onError || c.insertionMode === 4 || vt || n.itemProp != null) var bt = G(e, n);
				else {
					var xt = n.src;
					if (n.type === "module") var St = i.moduleScriptResources, Ct = a.preloads.moduleScripts;
					else St = i.scriptResources, Ct = a.preloads.scripts;
					var wt = St.hasOwnProperty(xt) ? St[xt] : void 0;
					if (wt !== null) {
						St[xt] = null;
						var Tt = n;
						if (wt) {
							wt.length === 2 && (Tt = T({}, n), dt(Tt, wt));
							var Et = Ct.get(xt);
							Et && (Et.length = 0);
						}
						var Dt = [];
						a.scripts.add(Dt), G(Dt, Tt);
					}
					l && e.push("<!-- -->"), bt = null;
				}
				return bt;
			case "style":
				var Ot = c.tagScope & 1, kt = n.precedence, At = n.href, jt = n.nonce;
				if (c.insertionMode === 4 || Ot || n.itemProp != null || typeof kt != "string" || typeof At != "string" || At === "") {
					e.push(je("style"));
					var Mt = null, J = null, Nt;
					for (Nt in n) if (E.call(n, Nt)) {
						var Pt = n[Nt];
						if (Pt != null) switch (Nt) {
							case "children":
								Mt = Pt;
								break;
							case "dangerouslySetInnerHTML":
								J = Pt;
								break;
							default: _e(e, Nt, Pt);
						}
					}
					e.push(">");
					var Ft = Array.isArray(Mt) ? 2 > Mt.length ? Mt[0] : null : Mt;
					typeof Ft != "function" && typeof Ft != "symbol" && Ft != null && e.push(("" + Ft).replace(Se, Ce)), ve(e, J, Mt), e.push(Fe("style"));
					var It = null;
				} else {
					var Lt = a.styles.get(kt);
					if ((i.styleResources.hasOwnProperty(At) ? i.styleResources[At] : void 0) !== null) {
						i.styleResources[At] = null, Lt || (Lt = {
							precedence: P(kt),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set(kt, Lt));
						var Rt = a.nonce.style;
						if (!Rt || Rt === jt) {
							Lt.hrefs.push(P(At));
							var zt = Lt.rules, Bt = null, Vt = null, Ht;
							for (Ht in n) if (E.call(n, Ht)) {
								var Ut = n[Ht];
								if (Ut != null) switch (Ht) {
									case "children":
										Bt = Ut;
										break;
									case "dangerouslySetInnerHTML": Vt = Ut;
								}
							}
							var Wt = Array.isArray(Bt) ? 2 > Bt.length ? Bt[0] : null : Bt;
							typeof Wt != "function" && typeof Wt != "symbol" && Wt != null && zt.push(("" + Wt).replace(Se, Ce)), ve(zt, Vt, Bt);
						}
					}
					Lt && s && s.styles.add(Lt), l && e.push("<!-- -->"), It = void 0;
				}
				return It;
			case "meta":
				var Gt = c.tagScope & 1, Kt = c.tagScope & 4;
				if (c.insertionMode === 4 || Gt || n.itemProp != null) var qt = we(e, n, "meta");
				else l && e.push("<!-- -->"), qt = Kt ? null : typeof n.charSet == "string" ? we(a.charsetChunks, n, "meta") : n.name === "viewport" ? we(a.viewportChunks, n, "meta") : we(a.hoistableChunks, n, "meta");
				return qt;
			case "listing":
			case "pre":
				e.push(je(t));
				var Jt = null, Yt = null, Xt;
				for (Xt in n) if (E.call(n, Xt)) {
					var Zt = n[Xt];
					if (Zt != null) switch (Xt) {
						case "children":
							Jt = Zt;
							break;
						case "dangerouslySetInnerHTML":
							Yt = Zt;
							break;
						default: _e(e, Xt, Zt);
					}
				}
				if (e.push(">"), Yt != null) {
					if (Jt != null) throw Error(r(60));
					if (typeof Yt != "object" || !("__html" in Yt)) throw Error(r(61));
					var Y = Yt.__html;
					Y != null && (typeof Y == "string" && 0 < Y.length && Y[0] === "\n" ? e.push("\n", Y) : e.push("" + Y));
				}
				return typeof Jt == "string" && Jt[0] === "\n" && e.push("\n"), Jt;
			case "img":
				var Qt = c.tagScope & 3, $t = n.src, en = n.srcSet;
				if (!(n.loading === "lazy" || !$t && !en || typeof $t != "string" && $t != null || typeof en != "string" && en != null || n.fetchPriority === "low" || Qt) && (typeof $t != "string" || $t[4] !== ":" || $t[0] !== "d" && $t[0] !== "D" || $t[1] !== "a" && $t[1] !== "A" || $t[2] !== "t" && $t[2] !== "T" || $t[3] !== "a" && $t[3] !== "A") && (typeof en != "string" || en[4] !== ":" || en[0] !== "d" && en[0] !== "D" || en[1] !== "a" && en[1] !== "A" || en[2] !== "t" && en[2] !== "T" || en[3] !== "a" && en[3] !== "A")) {
					s !== null && c.tagScope & 64 && (s.suspenseyImages = !0);
					var tn = typeof n.sizes == "string" ? n.sizes : void 0, nn = en ? en + "\n" + (tn || "") : $t, rn = a.preloads.images, an = rn.get(nn);
					if (an) (n.fetchPriority === "high" || 10 > a.highImagePreloads.size) && (rn.delete(nn), a.highImagePreloads.add(an));
					else if (!i.imageResources.hasOwnProperty(nn)) {
						i.imageResources[nn] = ee;
						var on = n.crossOrigin, sn = typeof on == "string" ? on === "use-credentials" ? on : "" : void 0, cn = a.headers, ln;
						cn && 0 < cn.remainingCapacity && typeof n.srcSet != "string" && (n.fetchPriority === "high" || 500 > cn.highImagePreloads.length) && (ln = ft($t, "image", {
							imageSrcSet: n.srcSet,
							imageSizes: n.sizes,
							crossOrigin: sn,
							integrity: n.integrity,
							nonce: n.nonce,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.refererPolicy
						}), 0 <= (cn.remainingCapacity -= ln.length + 2)) ? (a.resets.image[nn] = ee, cn.highImagePreloads && (cn.highImagePreloads += ", "), cn.highImagePreloads += ln) : (an = [], xe(an, {
							rel: "preload",
							as: "image",
							href: en ? void 0 : $t,
							imageSrcSet: en,
							imageSizes: tn,
							crossOrigin: sn,
							integrity: n.integrity,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.referrerPolicy
						}), n.fetchPriority === "high" || 10 > a.highImagePreloads.size ? a.highImagePreloads.add(an) : (a.bulkPreloads.add(an), rn.set(nn, an)));
					}
				}
				return we(e, n, "img");
			case "base":
			case "area":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "param":
			case "source":
			case "track":
			case "wbr": return we(e, n, t);
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": break;
			case "head":
				if (2 > c.insertionMode) {
					var un = o || a.preamble;
					if (un.headChunks) throw Error(r(545, "`<head>`"));
					o !== null && e.push("<!--head-->"), un.headChunks = [];
					var dn = Ee(un.headChunks, n, "head");
				} else dn = De(e, n, "head");
				return dn;
			case "body":
				if (2 > c.insertionMode) {
					var fn = o || a.preamble;
					if (fn.bodyChunks) throw Error(r(545, "`<body>`"));
					o !== null && e.push("<!--body-->"), fn.bodyChunks = [];
					var pn = Ee(fn.bodyChunks, n, "body");
				} else pn = De(e, n, "body");
				return pn;
			case "html":
				if (c.insertionMode === 0) {
					var mn = o || a.preamble;
					if (mn.htmlChunks) throw Error(r(545, "`<html>`"));
					o !== null && e.push("<!--html-->"), mn.htmlChunks = [""];
					var hn = Ee(mn.htmlChunks, n, "html");
				} else hn = De(e, n, "html");
				return hn;
			default: if (t.indexOf("-") !== -1) {
				e.push(je(t));
				var gn = null, _n = null, vn;
				for (vn in n) if (E.call(n, vn)) {
					var yn = n[vn];
					if (yn != null) {
						var bn = vn;
						switch (vn) {
							case "children":
								gn = yn;
								break;
							case "dangerouslySetInnerHTML":
								_n = yn;
								break;
							case "style":
								le(e, yn);
								break;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "ref": break;
							case "className": bn = "class";
							default: if (A(vn) && typeof yn != "function" && typeof yn != "symbol" && !1 !== yn) {
								if (!0 === yn) yn = "";
								else if (typeof yn == "object") continue;
								e.push(" ", bn, "=\"", P(yn), "\"");
							}
						}
					}
				}
				return e.push(">"), ve(e, _n, gn), gn;
			}
		}
		return De(e, n, t);
	}
	var Pe = /* @__PURE__ */ new Map();
	function Fe(e) {
		var t = Pe.get(e);
		return t === void 0 && (t = "</" + e + ">", Pe.set(e, t)), t;
	}
	function K(e, t) {
		e = e.preamble, e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks), e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks), e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks);
	}
	function Ie(e, t) {
		t = t.bootstrapChunks;
		for (var n = 0; n < t.length - 1; n++) e.push(t[n]);
		return n < t.length ? (n = t[n], t.length = 0, e.push(n)) : !0;
	}
	function Le(e, t, n) {
		if (e.push("<!--$?--><template id=\""), n === null) throw Error(r(395));
		return e.push(t.boundaryPrefix), t = n.toString(16), e.push(t), e.push("\"></template>");
	}
	function Re(e, t, n, i) {
		switch (n.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return e.push("<div hidden id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 4: return e.push("<svg aria-hidden=\"true\" style=\"display:none\" id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 5: return e.push("<math aria-hidden=\"true\" style=\"display:none\" id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 6: return e.push("<table hidden id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 7: return e.push("<table hidden><tbody id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 8: return e.push("<table hidden><tr id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 9: return e.push("<table hidden><colgroup id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			default: throw Error(r(397));
		}
	}
	function ze(e, t) {
		switch (t.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return e.push("</div>");
			case 4: return e.push("</svg>");
			case 5: return e.push("</math>");
			case 6: return e.push("</table>");
			case 7: return e.push("</tbody></table>");
			case 8: return e.push("</tr></table>");
			case 9: return e.push("</colgroup></table>");
			default: throw Error(r(397));
		}
	}
	var Be = /[<\u2028\u2029]/g;
	function Ve(e) {
		return JSON.stringify(e).replace(Be, function(e) {
			switch (e) {
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var He = /[&><\u2028\u2029]/g;
	function Ue(e) {
		return JSON.stringify(e).replace(He, function(e) {
			switch (e) {
				case "&": return "\\u0026";
				case ">": return "\\u003e";
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var We = !1, Ge = !0;
	function Ke(e) {
		var t = e.rules, n = e.hrefs, r = 0;
		if (n.length) {
			for (this.push(te.startInlineStyle), this.push(" media=\"not all\" data-precedence=\""), this.push(e.precedence), this.push("\" data-href=\""); r < n.length - 1; r++) this.push(n[r]), this.push(" ");
			for (this.push(n[r]), this.push("\">"), r = 0; r < t.length; r++) this.push(t[r]);
			Ge = this.push("</style>"), We = !0, t.length = 0, n.length = 0;
		}
	}
	function q(e) {
		return e.state === 2 ? !1 : We = !0;
	}
	function qe(e, t, n) {
		return We = !1, Ge = !0, te = n, t.styles.forEach(Ke, e), te = null, t.stylesheets.forEach(q), We && (n.stylesToHoist = !0), Ge;
	}
	function Je(e) {
		for (var t = 0; t < e.length; t++) this.push(e[t]);
		e.length = 0;
	}
	var Ye = [];
	function Xe(e) {
		xe(Ye, e.props);
		for (var t = 0; t < Ye.length; t++) this.push(Ye[t]);
		Ye.length = 0, e.state = 2;
	}
	function Ze(e) {
		var t = 0 < e.sheets.size;
		e.sheets.forEach(Xe, this), e.sheets.clear();
		var n = e.rules, r = e.hrefs;
		if (!t || r.length) {
			if (this.push(te.startInlineStyle), this.push(" data-precedence=\""), this.push(e.precedence), e = 0, r.length) {
				for (this.push("\" data-href=\""); e < r.length - 1; e++) this.push(r[e]), this.push(" ");
				this.push(r[e]);
			}
			for (this.push("\">"), e = 0; e < n.length; e++) this.push(n[e]);
			this.push("</style>"), n.length = 0, r.length = 0;
		}
	}
	function Qe(e) {
		if (e.state === 0) {
			e.state = 1;
			var t = e.props;
			for (xe(Ye, {
				rel: "preload",
				as: "style",
				href: e.props.href,
				crossOrigin: t.crossOrigin,
				fetchPriority: t.fetchPriority,
				integrity: t.integrity,
				media: t.media,
				hrefLang: t.hrefLang,
				referrerPolicy: t.referrerPolicy
			}), e = 0; e < Ye.length; e++) this.push(Ye[e]);
			Ye.length = 0;
		}
	}
	function $e(e) {
		e.sheets.forEach(Qe, this), e.sheets.clear();
	}
	function et(e, t) {
		!(t.instructions & 32) && (t.instructions |= 32, e.push(" id=\"", P("_" + t.idPrefix + "R_"), "\""));
	}
	function tt(e, t) {
		e.push("[");
		var n = "[";
		t.stylesheets.forEach(function(t) {
			if (t.state !== 2) if (t.state === 3) e.push(n), t = Ue("" + t.props.href), e.push(t), e.push("]"), n = ",[";
			else {
				e.push(n);
				var i = t.props["data-precedence"], a = t.props, o = R("" + t.props.href);
				for (var s in o = Ue(o), e.push(o), i = "" + i, e.push(","), i = Ue(i), e.push(i), a) if (E.call(a, s) && (i = a[s], i != null)) switch (s) {
					case "href":
					case "rel":
					case "precedence":
					case "data-precedence": break;
					case "children":
					case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
					default: nt(e, s, i);
				}
				e.push("]"), n = ",[", t.state = 3;
			}
		}), e.push("]");
	}
	function nt(e, t, n) {
		var r = t.toLowerCase();
		switch (typeof n) {
			case "function":
			case "symbol": return;
		}
		switch (t) {
			case "innerHTML":
			case "dangerouslySetInnerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "style":
			case "ref": return;
			case "className":
				r = "class", t = "" + n;
				break;
			case "hidden":
				if (!1 === n) return;
				t = "";
				break;
			case "src":
			case "href":
				n = R(n), t = "" + n;
				break;
			default:
				if (2 < t.length && (t[0] === "o" || t[0] === "O") && (t[1] === "n" || t[1] === "N") || !A(t)) return;
				t = "" + n;
		}
		e.push(","), r = Ue(r), e.push(r), e.push(","), r = Ue(t), e.push(r);
	}
	function rt() {
		return {
			styles: /* @__PURE__ */ new Set(),
			stylesheets: /* @__PURE__ */ new Set(),
			suspenseyImages: !1
		};
	}
	function it(e) {
		var t = In || null;
		if (t) {
			var n = t.resumableState, r = t.renderState;
			if (typeof e == "string" && e) {
				if (!n.dnsResources.hasOwnProperty(e)) {
					n.dnsResources[e] = null, n = r.headers;
					var i, a;
					(a = n && 0 < n.remainingCapacity) && (a = (i = "<" + ("" + e).replace(pt, mt) + ">; rel=dns-prefetch", 0 <= (n.remainingCapacity -= i.length + 2))), a ? (r.resets.dns[e] = null, n.preconnects && (n.preconnects += ", "), n.preconnects += i) : (i = [], xe(i, {
						href: e,
						rel: "dns-prefetch"
					}), r.preconnects.add(i));
				}
				kr(t);
			}
		} else H.D(e);
	}
	function at(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (typeof e == "string" && e) {
				var a = t === "use-credentials" ? "credentials" : typeof t == "string" ? "anonymous" : "default";
				if (!r.connectResources[a].hasOwnProperty(e)) {
					r.connectResources[a][e] = null, r = i.headers;
					var o, s;
					if (s = r && 0 < r.remainingCapacity) {
						if (s = "<" + ("" + e).replace(pt, mt) + ">; rel=preconnect", typeof t == "string") {
							var c = ("" + t).replace(ht, gt);
							s += "; crossorigin=\"" + c + "\"";
						}
						s = (o = s, 0 <= (r.remainingCapacity -= o.length + 2));
					}
					s ? (i.resets.connect[a][e] = null, r.preconnects && (r.preconnects += ", "), r.preconnects += o) : (a = [], xe(a, {
						rel: "preconnect",
						href: e,
						crossOrigin: t
					}), i.preconnects.add(a));
				}
				kr(n);
			}
		} else H.C(e, t);
	}
	function ot(e, t, n) {
		var r = In || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (t && e) {
				switch (t) {
					case "image":
						if (n) var o = n.imageSrcSet, s = n.imageSizes, c = n.fetchPriority;
						var l = o ? o + "\n" + (s || "") : e;
						if (i.imageResources.hasOwnProperty(l)) return;
						i.imageResources[l] = ee, i = a.headers;
						var u;
						i && 0 < i.remainingCapacity && typeof o != "string" && c === "high" && (u = ft(e, t, n), 0 <= (i.remainingCapacity -= u.length + 2)) ? (a.resets.image[l] = ee, i.highImagePreloads && (i.highImagePreloads += ", "), i.highImagePreloads += u) : (i = [], xe(i, T({
							rel: "preload",
							href: o ? void 0 : e,
							as: t
						}, n)), c === "high" ? a.highImagePreloads.add(i) : (a.bulkPreloads.add(i), a.preloads.images.set(l, i)));
						break;
					case "style":
						if (i.styleResources.hasOwnProperty(e)) return;
						o = [], xe(o, T({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.styleResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? ee : [n.crossOrigin, n.integrity], a.preloads.stylesheets.set(e, o), a.bulkPreloads.add(o);
						break;
					case "script":
						if (i.scriptResources.hasOwnProperty(e)) return;
						o = [], a.preloads.scripts.set(e, o), a.bulkPreloads.add(o), xe(o, T({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.scriptResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? ee : [n.crossOrigin, n.integrity];
						break;
					default:
						if (i.unknownResources.hasOwnProperty(t)) {
							if (o = i.unknownResources[t], o.hasOwnProperty(e)) return;
						} else o = {}, i.unknownResources[t] = o;
						if (o[e] = ee, (i = a.headers) && 0 < i.remainingCapacity && t === "font" && (l = ft(e, t, n), 0 <= (i.remainingCapacity -= l.length + 2))) a.resets.font[e] = ee, i.fontPreloads && (i.fontPreloads += ", "), i.fontPreloads += l;
						else switch (i = [], e = T({
							rel: "preload",
							href: e,
							as: t
						}, n), xe(i, e), t) {
							case "font":
								a.fontPreloads.add(i);
								break;
							default: a.bulkPreloads.add(i);
						}
				}
				kr(r);
			}
		} else H.L(e, t, n);
	}
	function st(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = t && typeof t.as == "string" ? t.as : "script";
				switch (a) {
					case "script":
						if (r.moduleScriptResources.hasOwnProperty(e)) return;
						a = [], r.moduleScriptResources[e] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? ee : [t.crossOrigin, t.integrity], i.preloads.moduleScripts.set(e, a);
						break;
					default:
						if (r.moduleUnknownResources.hasOwnProperty(a)) {
							var o = r.unknownResources[a];
							if (o.hasOwnProperty(e)) return;
						} else o = {}, r.moduleUnknownResources[a] = o;
						a = [], o[e] = ee;
				}
				xe(a, T({
					rel: "modulepreload",
					href: e
				}, t)), i.bulkPreloads.add(a), kr(n);
			}
		} else H.m(e, t);
	}
	function ct(e, t, n) {
		var r = In || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (e) {
				t ||= "default";
				var o = a.styles.get(t), s = i.styleResources.hasOwnProperty(e) ? i.styleResources[e] : void 0;
				s !== null && (i.styleResources[e] = null, o || (o = {
					precedence: P(t),
					rules: [],
					hrefs: [],
					sheets: /* @__PURE__ */ new Map()
				}, a.styles.set(t, o)), t = {
					state: 0,
					props: T({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n)
				}, s && (s.length === 2 && dt(t.props, s), (a = a.preloads.stylesheets.get(e)) && 0 < a.length ? a.length = 0 : t.state = 1), o.sheets.set(e, t), kr(r));
			}
		} else H.S(e, t, n);
	}
	function lt(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.scriptResources.hasOwnProperty(e) ? r.scriptResources[e] : void 0;
				a !== null && (r.scriptResources[e] = null, t = T({
					src: e,
					async: !0
				}, t), a && (a.length === 2 && dt(t, a), e = i.preloads.scripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), G(e, t), kr(n));
			}
		} else H.X(e, t);
	}
	function ut(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.moduleScriptResources.hasOwnProperty(e) ? r.moduleScriptResources[e] : void 0;
				a !== null && (r.moduleScriptResources[e] = null, t = T({
					src: e,
					type: "module",
					async: !0
				}, t), a && (a.length === 2 && dt(t, a), e = i.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), G(e, t), kr(n));
			}
		} else H.M(e, t);
	}
	function dt(e, t) {
		e.crossOrigin ??= t[0], e.integrity ??= t[1];
	}
	function ft(e, t, n) {
		for (var r in e = ("" + e).replace(pt, mt), t = ("" + t).replace(ht, gt), t = "<" + e + ">; rel=preload; as=\"" + t + "\"", n) E.call(n, r) && (e = n[r], typeof e == "string" && (t += "; " + r.toLowerCase() + "=\"" + ("" + e).replace(ht, gt) + "\""));
		return t;
	}
	var pt = /[<>\r\n]/g;
	function mt(e) {
		switch (e) {
			case "<": return "%3C";
			case ">": return "%3E";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	var ht = /["';,\r\n]/g;
	function gt(e) {
		switch (e) {
			case "\"": return "%22";
			case "'": return "%27";
			case ";": return "%3B";
			case ",": return "%2C";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	function _t(e) {
		this.styles.add(e);
	}
	function vt(e) {
		this.stylesheets.add(e);
	}
	function yt(e, t) {
		t.styles.forEach(_t, e), t.stylesheets.forEach(vt, e), t.suspenseyImages && (e.suspenseyImages = !0);
	}
	function bt(e, t) {
		var n = e.idPrefix, r = [], i = e.bootstrapScriptContent, a = e.bootstrapScripts, o = e.bootstrapModules;
		i !== void 0 && (r.push("<script"), et(r, e), r.push(">", ("" + i).replace(ne, re), "<\/script>")), i = n + "P:";
		var s = n + "S:";
		n += "B:";
		var c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), h = {
			images: /* @__PURE__ */ new Map(),
			stylesheets: /* @__PURE__ */ new Map(),
			scripts: /* @__PURE__ */ new Map(),
			moduleScripts: /* @__PURE__ */ new Map()
		};
		if (a !== void 0) for (var g = 0; g < a.length; g++) {
			var _ = a[g], v, y = void 0, b = void 0, x = {
				rel: "preload",
				as: "script",
				fetchPriority: "low",
				nonce: void 0
			};
			typeof _ == "string" ? x.href = v = _ : (x.href = v = _.src, x.integrity = b = typeof _.integrity == "string" ? _.integrity : void 0, x.crossOrigin = y = typeof _ == "string" || _.crossOrigin == null ? void 0 : _.crossOrigin === "use-credentials" ? "use-credentials" : ""), _ = e;
			var S = v;
			_.scriptResources[S] = null, _.moduleScriptResources[S] = null, _ = [], xe(_, x), f.add(_), r.push("<script src=\"", P(v), "\""), typeof b == "string" && r.push(" integrity=\"", P(b), "\""), typeof y == "string" && r.push(" crossorigin=\"", P(y), "\""), et(r, e), r.push(" async=\"\"><\/script>");
		}
		if (o !== void 0) for (a = 0; a < o.length; a++) x = o[a], y = v = void 0, b = {
			rel: "modulepreload",
			fetchPriority: "low",
			nonce: void 0
		}, typeof x == "string" ? b.href = g = x : (b.href = g = x.src, b.integrity = y = typeof x.integrity == "string" ? x.integrity : void 0, b.crossOrigin = v = typeof x == "string" || x.crossOrigin == null ? void 0 : x.crossOrigin === "use-credentials" ? "use-credentials" : ""), x = e, _ = g, x.scriptResources[_] = null, x.moduleScriptResources[_] = null, x = [], xe(x, b), f.add(x), r.push("<script type=\"module\" src=\"", P(g), "\""), typeof y == "string" && r.push(" integrity=\"", P(y), "\""), typeof v == "string" && r.push(" crossorigin=\"", P(v), "\""), et(r, e), r.push(" async=\"\"><\/script>");
		return {
			placeholderPrefix: i,
			segmentPrefix: s,
			boundaryPrefix: n,
			startInlineScript: "<script",
			startInlineStyle: "<style",
			preamble: {
				htmlChunks: null,
				headChunks: null,
				bodyChunks: null
			},
			externalRuntimeScript: null,
			bootstrapChunks: r,
			importMapChunks: [],
			onHeaders: void 0,
			headers: null,
			resets: {
				font: {},
				dns: {},
				connect: {
					default: {},
					anonymous: {},
					credentials: {}
				},
				image: {},
				style: {}
			},
			charsetChunks: [],
			viewportChunks: [],
			hoistableChunks: [],
			preconnects: c,
			fontPreloads: l,
			highImagePreloads: u,
			styles: d,
			bootstrapScripts: f,
			scripts: p,
			bulkPreloads: m,
			preloads: h,
			nonce: {
				script: void 0,
				style: void 0
			},
			stylesToHoist: !1,
			generateStaticMarkup: t
		};
	}
	function xt(e, t, n, r) {
		return n.generateStaticMarkup ? (e.push(P(t)), !1) : (t === "" ? e = r : (r && e.push("<!-- -->"), e.push(P(t)), e = !0), e);
	}
	function St(e, t, n, r) {
		t.generateStaticMarkup || n && r && e.push("<!-- -->");
	}
	var Ct = Function.prototype.bind, wt = Symbol.for("react.client.reference");
	function Tt(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === wt ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case o: return "Fragment";
			case c: return "Profiler";
			case s: return "StrictMode";
			case f: return "Suspense";
			case p: return "SuspenseList";
			case _: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case a: return "Portal";
			case u: return e.displayName || "Context";
			case l: return (e._context.displayName || "Context") + ".Consumer";
			case d:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case m: return t = e.displayName || null, t === null ? Tt(e.type) || "Memo" : t;
			case h:
				t = e._payload, e = e._init;
				try {
					return Tt(e(t));
				} catch {}
		}
		return null;
	}
	var Et = {}, Dt = null;
	function Ot(e, t) {
		if (e !== t) {
			e.context._currentValue2 = e.parentValue, e = e.parent;
			var n = t.parent;
			if (e === null) {
				if (n !== null) throw Error(r(401));
			} else {
				if (n === null) throw Error(r(401));
				Ot(e, n);
			}
			t.context._currentValue2 = t.value;
		}
	}
	function kt(e) {
		e.context._currentValue2 = e.parentValue, e = e.parent, e !== null && kt(e);
	}
	function At(e) {
		var t = e.parent;
		t !== null && At(t), e.context._currentValue2 = e.value;
	}
	function jt(e, t) {
		if (e.context._currentValue2 = e.parentValue, e = e.parent, e === null) throw Error(r(402));
		e.depth === t.depth ? Ot(e, t) : jt(e, t);
	}
	function Mt(e, t) {
		var n = t.parent;
		if (n === null) throw Error(r(402));
		e.depth === n.depth ? Ot(e, n) : Mt(e, n), t.context._currentValue2 = t.value;
	}
	function J(e) {
		var t = Dt;
		t !== e && (t === null ? At(e) : e === null ? kt(t) : t.depth === e.depth ? Ot(t, e) : t.depth > e.depth ? jt(t, e) : Mt(t, e), Dt = e);
	}
	var Nt = {
		enqueueSetState: function(e, t) {
			e = e._reactInternals, e.queue !== null && e.queue.push(t);
		},
		enqueueReplaceState: function(e, t) {
			e = e._reactInternals, e.replace = !0, e.queue = [t];
		},
		enqueueForceUpdate: function() {}
	}, Pt = {
		id: 1,
		overflow: ""
	};
	function Ft(e, t, n) {
		var r = e.id;
		e = e.overflow;
		var i = 32 - It(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - It(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			return a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, {
				id: 1 << 32 - It(t) + i | n << i | r,
				overflow: a + e
			};
		}
		return {
			id: 1 << a | n << i | r,
			overflow: e
		};
	}
	var It = Math.clz32 ? Math.clz32 : zt, Lt = Math.log, Rt = Math.LN2;
	function zt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Lt(e) / Rt | 0) | 0;
	}
	function Bt() {}
	var Vt = Error(r(460));
	function Ht(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Bt, Bt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw t.reason;
			default:
				switch (typeof t.status == "string" ? t.then(Bt, Bt) : (e = t, e.status = "pending", e.then(function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "fulfilled", n.value = e;
					}
				}, function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "rejected", n.reason = e;
					}
				})), t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw t.reason;
				}
				throw Ut = t, Vt;
		}
	}
	var Ut = null;
	function Wt() {
		if (Ut === null) throw Error(r(459));
		var e = Ut;
		return Ut = null, e;
	}
	function Gt(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Kt = typeof Object.is == "function" ? Object.is : Gt, qt = null, Jt = null, Yt = null, Xt = null, Zt = null, Y = null, Qt = !1, $t = !1, en = 0, tn = 0, nn = -1, rn = 0, an = null, on = null, sn = 0;
	function cn() {
		if (qt === null) throw Error(r(321));
		return qt;
	}
	function ln() {
		if (0 < sn) throw Error(r(312));
		return {
			memoizedState: null,
			queue: null,
			next: null
		};
	}
	function un() {
		return Y === null ? Zt === null ? (Qt = !1, Zt = Y = ln()) : (Qt = !0, Y = Zt) : Y.next === null ? (Qt = !1, Y = Y.next = ln()) : (Qt = !0, Y = Y.next), Y;
	}
	function dn() {
		var e = an;
		return an = null, e;
	}
	function fn() {
		Xt = Yt = Jt = qt = null, $t = !1, Zt = null, sn = 0, Y = on = null;
	}
	function pn(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function mn(e, t, n) {
		if (qt = cn(), Y = un(), Qt) {
			var r = Y.queue;
			if (t = r.dispatch, on !== null && (n = on.get(r), n !== void 0)) {
				on.delete(r), r = Y.memoizedState;
				do
					r = e(r, n.action), n = n.next;
				while (n !== null);
				return Y.memoizedState = r, [r, t];
			}
			return [Y.memoizedState, t];
		}
		return e = e === pn ? typeof t == "function" ? t() : t : n === void 0 ? t : n(t), Y.memoizedState = e, e = Y.queue = {
			last: null,
			dispatch: null
		}, e = e.dispatch = gn.bind(null, qt, e), [Y.memoizedState, e];
	}
	function hn(e, t) {
		if (qt = cn(), Y = un(), t = t === void 0 ? null : t, Y !== null) {
			var n = Y.memoizedState;
			if (n !== null && t !== null) {
				var r = n[1];
				a: if (r === null) r = !1;
				else {
					for (var i = 0; i < r.length && i < t.length; i++) if (!Kt(t[i], r[i])) {
						r = !1;
						break a;
					}
					r = !0;
				}
				if (r) return n[0];
			}
		}
		return e = e(), Y.memoizedState = [e, t], e;
	}
	function gn(e, t, n) {
		if (25 <= sn) throw Error(r(301));
		if (e === qt) if ($t = !0, e = {
			action: n,
			next: null
		}, on === null && (on = /* @__PURE__ */ new Map()), n = on.get(t), n === void 0) on.set(t, e);
		else {
			for (t = n; t.next !== null;) t = t.next;
			t.next = e;
		}
	}
	function _n() {
		throw Error(r(440));
	}
	function vn() {
		throw Error(r(394));
	}
	function yn() {
		throw Error(r(479));
	}
	function bn(e, t, n) {
		cn();
		var r = tn++, i = Yt;
		if (typeof e.$$FORM_ACTION == "function") {
			var a = null, o = Xt;
			i = i.formState;
			var s = e.$$IS_SIGNATURE_EQUAL;
			if (i !== null && typeof s == "function") {
				var c = i[1];
				s.call(e, i[2], i[3]) && (a = n === void 0 ? "k" + w(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n, c === a && (nn = r, t = i[0]));
			}
			var l = e.bind(null, t);
			return e = function(e) {
				l(e);
			}, typeof l.$$FORM_ACTION == "function" && (e.$$FORM_ACTION = function(e) {
				e = l.$$FORM_ACTION(e), n !== void 0 && (n += "", e.action = n);
				var t = e.data;
				return t && (a === null && (a = n === void 0 ? "k" + w(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n), t.append("$ACTION_KEY", a)), e;
			}), [
				t,
				e,
				!1
			];
		}
		var u = e.bind(null, t);
		return [
			t,
			function(e) {
				u(e);
			},
			!1
		];
	}
	function xn(e) {
		var t = rn;
		return rn += 1, an === null && (an = []), Ht(an, e, t);
	}
	function Sn() {
		throw Error(r(393));
	}
	var Cn = {
		readContext: function(e) {
			return e._currentValue2;
		},
		use: function(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return xn(e);
				if (e.$$typeof === u) return e._currentValue2;
			}
			throw Error(r(438, String(e)));
		},
		useContext: function(e) {
			return cn(), e._currentValue2;
		},
		useMemo: hn,
		useReducer: mn,
		useRef: function(e) {
			qt = cn(), Y = un();
			var t = Y.memoizedState;
			return t === null ? (e = { current: e }, Y.memoizedState = e) : t;
		},
		useState: function(e) {
			return mn(pn, e);
		},
		useInsertionEffect: Bt,
		useLayoutEffect: Bt,
		useCallback: function(e, t) {
			return hn(function() {
				return e;
			}, t);
		},
		useImperativeHandle: Bt,
		useEffect: Bt,
		useDebugValue: Bt,
		useDeferredValue: function(e, t) {
			return cn(), t === void 0 ? e : t;
		},
		useTransition: function() {
			return cn(), [!1, vn];
		},
		useId: function() {
			var e = Jt.treeContext, t = e.overflow;
			e = e.id, e = (e & ~(1 << 32 - It(e) - 1)).toString(32) + t;
			var n = wn;
			if (n === null) throw Error(r(404));
			return t = en++, e = "_" + n.idPrefix + "R_" + e, 0 < t && (e += "H" + t.toString(32)), e + "_";
		},
		useSyncExternalStore: function(e, t, n) {
			if (n === void 0) throw Error(r(407));
			return n();
		},
		useOptimistic: function(e) {
			return cn(), [e, yn];
		},
		useActionState: bn,
		useFormState: bn,
		useHostTransitionStatus: function() {
			return cn(), V;
		},
		useMemoCache: function(e) {
			for (var t = Array(e), n = 0; n < e; n++) t[n] = y;
			return t;
		},
		useCacheRefresh: function() {
			return Sn;
		},
		useEffectEvent: function() {
			return _n;
		}
	}, wn = null, Tn = {
		getCacheForType: function() {
			throw Error(r(248));
		},
		cacheSignal: function() {
			throw Error(r(248));
		}
	}, En, Dn;
	function On(e) {
		if (En === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			En = t && t[1] || "", Dn = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + En + e + Dn;
	}
	var kn = !1;
	function An(e, t) {
		if (!e || kn) return "";
		kn = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			kn = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? On(n) : "";
	}
	function jn(e) {
		if (typeof e == "string") return On(e);
		if (typeof e == "function") return e.prototype && e.prototype.isReactComponent ? An(e, !0) : An(e, !1);
		if (typeof e == "object" && e) {
			switch (e.$$typeof) {
				case d: return An(e.render, !1);
				case m: return An(e.type, !1);
				case h:
					var t = e, n = t._payload;
					t = t._init;
					try {
						e = t(n);
					} catch {
						return On("Lazy");
					}
					return jn(e);
			}
			if (typeof e.name == "string") {
				a: {
					n = e.name, t = e.env;
					var r = e.debugLocation;
					if (r != null && (e = Error.prepareStackTrace, Error.prepareStackTrace = void 0, r = r.stack, Error.prepareStackTrace = e, r.startsWith("Error: react-stack-top-frame\n") && (r = r.slice(29)), e = r.indexOf("\n"), e !== -1 && (r = r.slice(e + 1)), e = r.indexOf("react_stack_bottom_frame"), e !== -1 && (e = r.lastIndexOf("\n", e)), e = e === -1 ? "" : r = r.slice(0, e), r = e.lastIndexOf("\n"), e = r === -1 ? e : e.slice(r + 1), e.indexOf(n) !== -1)) {
						n = "\n" + e;
						break a;
					}
					n = On(n + (t ? " [" + t + "]" : ""));
				}
				return n;
			}
		}
		switch (e) {
			case p: return On("SuspenseList");
			case f: return On("Suspense");
		}
		return "";
	}
	function Mn(e, t) {
		return (500 < t.byteSize || !1) && t.contentPreamble === null;
	}
	function Nn(e) {
		if (typeof e == "object" && e && typeof e.environmentName == "string") {
			var t = e.environmentName;
			e = [e].slice(0), typeof e[0] == "string" ? e.splice(0, 1, "[%s] " + e[0], " " + t + " ") : e.splice(0, 0, "[%s]", " " + t + " "), e.unshift(console), t = Ct.apply(console.error, e), t();
		} else console.error(e);
		return null;
	}
	function Pn(e, t, n, r, i, a, o, s, c, l, u) {
		var d = /* @__PURE__ */ new Set();
		this.destination = null, this.flushScheduled = !1, this.resumableState = e, this.renderState = t, this.rootFormatContext = n, this.progressiveChunkSize = r === void 0 ? 12800 : r, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = d, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = i === void 0 ? Nn : i, this.onPostpone = l === void 0 ? Bt : l, this.onAllReady = a === void 0 ? Bt : a, this.onShellReady = o === void 0 ? Bt : o, this.onShellError = s === void 0 ? Bt : s, this.onFatalError = c === void 0 ? Bt : c, this.formState = u === void 0 ? null : u;
	}
	function Fn(e, t, n, r, i, a, o, s, c, l, u, d) {
		return t = new Pn(t, n, r, i, a, o, s, c, l, u, d), n = X(t, 0, null, r, !1, !1), n.parentFlushed = !0, e = zn(t, null, e, -1, null, n, null, null, t.abortableTasks, null, r, null, Pt, null, null), Vn(e), t.pingedTasks.push(e), t;
	}
	var In = null;
	function Ln(e, t) {
		e.pingedTasks.push(t), e.pingedTasks.length === 1 && (e.flushScheduled = e.destination !== null, _r(e));
	}
	function Rn(e, t, n, r, i) {
		return n = {
			status: 0,
			rootSegmentID: -1,
			parentFlushed: !1,
			pendingTasks: 0,
			row: t,
			completedSegments: [],
			byteSize: 0,
			fallbackAbortableTasks: n,
			errorDigest: null,
			contentState: rt(),
			fallbackState: rt(),
			contentPreamble: r,
			fallbackPreamble: i,
			trackedContentKeyPath: null,
			trackedFallbackNode: null
		}, t !== null && (t.pendingTasks++, r = t.boundaries, r !== null && (e.allPendingTasks++, n.pendingTasks++, r.push(n)), e = t.inheritedHoistables, e !== null && yt(n.contentState, e)), n;
	}
	function zn(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
		e.allPendingTasks++, i === null ? e.pendingRootTasks++ : i.pendingTasks++, p !== null && p.pendingTasks++;
		var h = {
			replay: null,
			node: n,
			childIndex: r,
			ping: function() {
				return Ln(e, h);
			},
			blockedBoundary: i,
			blockedSegment: a,
			blockedPreamble: o,
			hoistableState: s,
			abortSet: c,
			keyPath: l,
			formatContext: u,
			context: d,
			treeContext: f,
			row: p,
			componentStack: m,
			thenableState: t
		};
		return c.add(h), h;
	}
	function Bn(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.allPendingTasks++, a === null ? e.pendingRootTasks++ : a.pendingTasks++, f !== null && f.pendingTasks++, n.pendingTasks++;
		var m = {
			replay: n,
			node: r,
			childIndex: i,
			ping: function() {
				return Ln(e, m);
			},
			blockedBoundary: a,
			blockedSegment: null,
			blockedPreamble: null,
			hoistableState: o,
			abortSet: s,
			keyPath: c,
			formatContext: l,
			context: u,
			treeContext: d,
			row: f,
			componentStack: p,
			thenableState: t
		};
		return s.add(m), m;
	}
	function X(e, t, n, r, i, a) {
		return {
			status: 0,
			parentFlushed: !1,
			id: -1,
			index: t,
			chunks: [],
			children: [],
			preambleChildren: [],
			parentFormatContext: r,
			boundary: n,
			lastPushedText: i,
			textEmbedded: a
		};
	}
	function Vn(e) {
		var t = e.node;
		if (typeof t == "object" && t) switch (t.$$typeof) {
			case i: e.componentStack = {
				parent: e.componentStack,
				type: t.type
			};
		}
	}
	function Hn(e) {
		return e === null ? null : {
			parent: e.parent,
			type: "Suspense Fallback"
		};
	}
	function Un(e) {
		var t = {};
		return e && Object.defineProperty(t, "componentStack", {
			configurable: !0,
			enumerable: !0,
			get: function() {
				try {
					var n = "", r = e;
					do
						n += jn(r.type), r = r.parent;
					while (r);
					var i = n;
				} catch (e) {
					i = "\nError generating stack: " + e.message + "\n" + e.stack;
				}
				return Object.defineProperty(t, "componentStack", { value: i }), i;
			}
		}), t;
	}
	function Wn(e, t, n) {
		if (e = e.onError, t = e(t, n), t == null || typeof t == "string") return t;
	}
	function Gn(e, t) {
		var n = e.onShellError, r = e.onFatalError;
		n(t), r(t), e.destination === null ? (e.status = 13, e.fatalError = t) : (e.status = 14, e.destination.destroy(t));
	}
	function Z(e, t) {
		Kn(e, t.next, t.hoistables);
	}
	function Kn(e, t, n) {
		for (; t !== null;) {
			n !== null && (yt(t.hoistables, n), t.inheritedHoistables = n);
			var r = t.boundaries;
			if (r !== null) {
				t.boundaries = null;
				for (var i = 0; i < r.length; i++) {
					var a = r[i];
					n !== null && yt(a.contentState, n), gr(e, a, null, null);
				}
			}
			if (t.pendingTasks--, 0 < t.pendingTasks) break;
			n = t.hoistables, t = t.next;
		}
	}
	function qn(e, t) {
		var n = t.boundaries;
		if (n !== null && t.pendingTasks === n.length) {
			for (var r = !0, i = 0; i < n.length; i++) {
				var a = n[i];
				if (a.pendingTasks !== 1 || a.parentFlushed || Mn(e, a)) {
					r = !1;
					break;
				}
			}
			r && Kn(e, t, t.hoistables);
		}
	}
	function Jn(e) {
		var t = {
			pendingTasks: 1,
			boundaries: null,
			hoistables: rt(),
			inheritedHoistables: null,
			together: !1,
			next: null
		};
		return e !== null && 0 < e.pendingTasks && (t.pendingTasks++, t.boundaries = [], e.next = t), t;
	}
	function Yn(e, t, n, r, i) {
		var a = t.keyPath, o = t.treeContext, s = t.row;
		t.keyPath = n, n = r.length;
		var c = null;
		if (t.replay !== null) {
			var l = t.replay.slots;
			if (typeof l == "object" && l) for (var u = 0; u < n; u++) {
				var d = i !== "backwards" && i !== "unstable_legacy-backwards" ? u : n - 1 - u, f = r[d];
				t.row = c = Jn(c), t.treeContext = Ft(o, n, d);
				var p = l[d];
				typeof p == "number" ? ($n(e, t, p, f, d), delete l[d]) : cr(e, t, f, d), --c.pendingTasks === 0 && Z(e, c);
			}
			else for (l = 0; l < n; l++) u = i !== "backwards" && i !== "unstable_legacy-backwards" ? l : n - 1 - l, d = r[u], t.row = c = Jn(c), t.treeContext = Ft(o, n, u), cr(e, t, d, u), --c.pendingTasks === 0 && Z(e, c);
		} else if (i !== "backwards" && i !== "unstable_legacy-backwards") for (i = 0; i < n; i++) l = r[i], t.row = c = Jn(c), t.treeContext = Ft(o, n, i), cr(e, t, l, i), --c.pendingTasks === 0 && Z(e, c);
		else {
			for (i = t.blockedSegment, l = i.children.length, u = i.chunks.length, d = n - 1; 0 <= d; d--) {
				f = r[d], t.row = c = Jn(c), t.treeContext = Ft(o, n, d), p = X(e, u, null, t.formatContext, d === 0 ? i.lastPushedText : !0, !0), i.children.splice(l, 0, p), t.blockedSegment = p;
				try {
					cr(e, t, f, d), St(p.chunks, e.renderState, p.lastPushedText, p.textEmbedded), p.status = 1, --c.pendingTasks === 0 && Z(e, c);
				} catch (t) {
					throw p.status = e.status === 12 ? 3 : 4, t;
				}
			}
			t.blockedSegment = i, i.lastPushedText = !1;
		}
		s !== null && c !== null && 0 < c.pendingTasks && (s.pendingTasks++, c.next = s), t.treeContext = o, t.row = s, t.keyPath = a;
	}
	function Xn(e, t, n, r, i, a) {
		var o = t.thenableState;
		for (t.thenableState = null, qt = {}, Jt = t, Yt = e, Xt = n, tn = en = 0, nn = -1, rn = 0, an = o, e = r(i, a); $t;) $t = !1, tn = en = 0, nn = -1, rn = 0, sn += 1, Y = null, e = r(i, a);
		return fn(), e;
	}
	function Zn(e, t, n, r, i, a, o) {
		var s = !1;
		if (a !== 0 && e.formState !== null) {
			var c = t.blockedSegment;
			if (c !== null) {
				s = !0, c = c.chunks;
				for (var l = 0; l < a; l++) l === o ? c.push("<!--F!-->") : c.push("<!--F-->");
			}
		}
		a = t.keyPath, t.keyPath = n, i ? (n = t.treeContext, t.treeContext = Ft(n, 1, 0), cr(e, t, r, -1), t.treeContext = n) : s ? cr(e, t, r, -1) : er(e, t, r, -1), t.keyPath = a;
	}
	function Qn(e, t, n, i, a, y) {
		if (typeof i == "function") if (i.prototype && i.prototype.isReactComponent) {
			var x = a;
			if ("ref" in a) for (var w in x = {}, a) w !== "ref" && (x[w] = a[w]);
			var E = i.defaultProps;
			if (E) for (var D in x === a && (x = T({}, x, a)), E) x[D] === void 0 && (x[D] = E[D]);
			a = x, x = Et, E = i.contextType, typeof E == "object" && E && (x = E._currentValue2), x = new i(a, x);
			var O = x.state === void 0 ? null : x.state;
			if (x.updater = Nt, x.props = a, x.state = O, E = {
				queue: [],
				replace: !1
			}, x._reactInternals = E, y = i.contextType, x.context = typeof y == "object" && y ? y._currentValue2 : Et, y = i.getDerivedStateFromProps, typeof y == "function" && (y = y(a, O), O = y == null ? O : T({}, O, y), x.state = O), typeof i.getDerivedStateFromProps != "function" && typeof x.getSnapshotBeforeUpdate != "function" && (typeof x.UNSAFE_componentWillMount == "function" || typeof x.componentWillMount == "function")) if (i = x.state, typeof x.componentWillMount == "function" && x.componentWillMount(), typeof x.UNSAFE_componentWillMount == "function" && x.UNSAFE_componentWillMount(), i !== x.state && Nt.enqueueReplaceState(x, x.state, null), E.queue !== null && 0 < E.queue.length) if (i = E.queue, y = E.replace, E.queue = null, E.replace = !1, y && i.length === 1) x.state = i[0];
			else {
				for (E = y ? i[0] : x.state, O = !0, y = +!!y; y < i.length; y++) D = i[y], D = typeof D == "function" ? D.call(x, E, a, void 0) : D, D != null && (O ? (O = !1, E = T({}, E, D)) : T(E, D));
				x.state = E;
			}
			else E.queue = null;
			if (i = x.render(), e.status === 12) throw null;
			a = t.keyPath, t.keyPath = n, er(e, t, i, -1), t.keyPath = a;
		} else {
			if (i = Xn(e, t, n, i, a, void 0), e.status === 12) throw null;
			Zn(e, t, n, i, en !== 0, tn, nn);
		}
		else if (typeof i == "string") if (x = t.blockedSegment, x === null) x = a.children, E = t.formatContext, O = t.keyPath, t.formatContext = ae(E, i, a), t.keyPath = n, cr(e, t, x, -1), t.formatContext = E, t.keyPath = O;
		else {
			if (O = Ne(x.chunks, i, a, e.resumableState, e.renderState, t.blockedPreamble, t.hoistableState, t.formatContext, x.lastPushedText), x.lastPushedText = !1, E = t.formatContext, y = t.keyPath, t.keyPath = n, (t.formatContext = ae(E, i, a)).insertionMode === 3) {
				n = X(e, 0, null, t.formatContext, !1, !1), x.preambleChildren.push(n), t.blockedSegment = n;
				try {
					n.status = 6, cr(e, t, O, -1), St(n.chunks, e.renderState, n.lastPushedText, n.textEmbedded), n.status = 1;
				} finally {
					t.blockedSegment = x;
				}
			} else cr(e, t, O, -1);
			t.formatContext = E, t.keyPath = y;
			a: {
				switch (t = x.chunks, e = e.resumableState, i) {
					case "title":
					case "style":
					case "script":
					case "area":
					case "base":
					case "br":
					case "col":
					case "embed":
					case "hr":
					case "img":
					case "input":
					case "keygen":
					case "link":
					case "meta":
					case "param":
					case "source":
					case "track":
					case "wbr": break a;
					case "body":
						if (1 >= E.insertionMode) {
							e.hasBody = !0;
							break a;
						}
						break;
					case "html":
						if (E.insertionMode === 0) {
							e.hasHtml = !0;
							break a;
						}
						break;
					case "head": if (1 >= E.insertionMode) break a;
				}
				t.push(Fe(i));
			}
			x.lastPushedText = !1;
		}
		else {
			switch (i) {
				case v:
				case s:
				case c:
				case o:
					i = t.keyPath, t.keyPath = n, er(e, t, a.children, -1), t.keyPath = i;
					return;
				case _:
					i = t.blockedSegment, i === null ? a.mode !== "hidden" && (i = t.keyPath, t.keyPath = n, cr(e, t, a.children, -1), t.keyPath = i) : a.mode !== "hidden" && (e.renderState.generateStaticMarkup || i.chunks.push("<!--&-->"), i.lastPushedText = !1, x = t.keyPath, t.keyPath = n, cr(e, t, a.children, -1), t.keyPath = x, e.renderState.generateStaticMarkup || i.chunks.push("<!--/&-->"), i.lastPushedText = !1);
					return;
				case p:
					a: {
						if (i = a.children, a = a.revealOrder, a === "forwards" || a === "backwards" || a === "unstable_legacy-backwards") {
							if (C(i)) {
								Yn(e, t, n, i, a);
								break a;
							}
							if ((x = S(i)) && (x = x.call(i))) {
								if (E = x.next(), !E.done) {
									do
										E = x.next();
									while (!E.done);
									Yn(e, t, n, i, a);
								}
								break a;
							}
						}
						a === "together" ? (a = t.keyPath, x = t.row, E = t.row = Jn(null), E.boundaries = [], E.together = !0, t.keyPath = n, er(e, t, i, -1), --E.pendingTasks === 0 && Z(e, E), t.keyPath = a, t.row = x, x !== null && 0 < E.pendingTasks && (x.pendingTasks++, E.next = x)) : (a = t.keyPath, t.keyPath = n, er(e, t, i, -1), t.keyPath = a);
					}
					return;
				case b:
				case g: throw Error(r(343));
				case f:
					a: if (t.replay !== null) {
						i = t.keyPath, x = t.formatContext, E = t.row, t.keyPath = n, t.formatContext = se(e.resumableState, x), t.row = null, n = a.children;
						try {
							cr(e, t, n, -1);
						} finally {
							t.keyPath = i, t.formatContext = x, t.row = E;
						}
					} else {
						i = t.keyPath, y = t.formatContext;
						var k = t.row, A = t.blockedBoundary;
						D = t.blockedPreamble;
						var j = t.hoistableState;
						w = t.blockedSegment;
						var M = a.fallback;
						a = a.children;
						var N = /* @__PURE__ */ new Set(), P = Rn(e, t.row, N, null, null);
						e.trackedPostpones !== null && (P.trackedContentKeyPath = n);
						var F = X(e, w.chunks.length, P, t.formatContext, !1, !1);
						w.children.push(F), w.lastPushedText = !1;
						var I = X(e, 0, null, t.formatContext, !1, !1);
						if (I.parentFlushed = !0, e.trackedPostpones !== null) {
							x = t.componentStack, E = [
								n[0],
								"Suspense Fallback",
								n[2]
							], O = [
								E[1],
								E[2],
								[],
								null
							], e.trackedPostpones.workingMap.set(E, O), P.trackedFallbackNode = O, t.blockedSegment = F, t.blockedPreamble = P.fallbackPreamble, t.keyPath = E, t.formatContext = oe(e.resumableState, y), t.componentStack = Hn(x), F.status = 6;
							try {
								cr(e, t, M, -1), St(F.chunks, e.renderState, F.lastPushedText, F.textEmbedded), F.status = 1;
							} catch (t) {
								throw F.status = e.status === 12 ? 3 : 4, t;
							} finally {
								t.blockedSegment = w, t.blockedPreamble = D, t.keyPath = i, t.formatContext = y;
							}
							t = zn(e, null, a, -1, P, I, P.contentPreamble, P.contentState, t.abortSet, n, se(e.resumableState, t.formatContext), t.context, t.treeContext, null, x), Vn(t), e.pingedTasks.push(t);
						} else {
							t.blockedBoundary = P, t.blockedPreamble = P.contentPreamble, t.hoistableState = P.contentState, t.blockedSegment = I, t.keyPath = n, t.formatContext = se(e.resumableState, y), t.row = null, I.status = 6;
							try {
								if (cr(e, t, a, -1), St(I.chunks, e.renderState, I.lastPushedText, I.textEmbedded), I.status = 1, hr(P, I), P.pendingTasks === 0 && P.status === 0) {
									if (P.status = 1, !Mn(e, P)) {
										k !== null && --k.pendingTasks === 0 && Z(e, k), e.pendingRootTasks === 0 && t.blockedPreamble && br(e);
										break a;
									}
								} else k !== null && k.together && qn(e, k);
							} catch (n) {
								P.status = 4, e.status === 12 ? (I.status = 3, x = e.fatalError) : (I.status = 4, x = n), E = Un(t.componentStack), O = Wn(e, x, E), P.errorDigest = O, ar(e, P);
							} finally {
								t.blockedBoundary = A, t.blockedPreamble = D, t.hoistableState = j, t.blockedSegment = w, t.keyPath = i, t.formatContext = y, t.row = k;
							}
							t = zn(e, null, M, -1, A, F, P.fallbackPreamble, P.fallbackState, N, [
								n[0],
								"Suspense Fallback",
								n[2]
							], oe(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, Hn(t.componentStack)), Vn(t), e.pingedTasks.push(t);
						}
					}
					return;
			}
			if (typeof i == "object" && i) switch (i.$$typeof) {
				case d:
					if ("ref" in a) for (M in x = {}, a) M !== "ref" && (x[M] = a[M]);
					else x = a;
					i = Xn(e, t, n, i.render, x, y), Zn(e, t, n, i, en !== 0, tn, nn);
					return;
				case m:
					Qn(e, t, n, i.type, a, y);
					return;
				case u:
					if (E = a.children, x = t.keyPath, a = a.value, O = i._currentValue2, i._currentValue2 = a, y = Dt, Dt = i = {
						parent: y,
						depth: y === null ? 0 : y.depth + 1,
						context: i,
						parentValue: O,
						value: a
					}, t.context = i, t.keyPath = n, er(e, t, E, -1), e = Dt, e === null) throw Error(r(403));
					e.context._currentValue2 = e.parentValue, e = Dt = e.parent, t.context = e, t.keyPath = x;
					return;
				case l:
					a = a.children, i = a(i._context._currentValue2), a = t.keyPath, t.keyPath = n, er(e, t, i, -1), t.keyPath = a;
					return;
				case h:
					if (x = i._init, i = x(i._payload), e.status === 12) throw null;
					Qn(e, t, n, i, a, y);
					return;
			}
			throw Error(r(130, i == null ? i : typeof i, ""));
		}
	}
	function $n(e, t, n, r, i) {
		var a = t.replay, o = t.blockedBoundary, s = X(e, 0, null, t.formatContext, !1, !1);
		s.id = n, s.parentFlushed = !0;
		try {
			t.replay = null, t.blockedSegment = s, cr(e, t, r, i), s.status = 1, o === null ? e.completedRootSegment = s : (hr(o, s), o.parentFlushed && e.partialBoundaries.push(o));
		} finally {
			t.replay = a, t.blockedSegment = null;
		}
	}
	function er(e, t, n, r) {
		t.replay !== null && typeof t.replay.slots == "number" ? $n(e, t, t.replay.slots, n, r) : (t.node = n, t.childIndex = r, n = t.componentStack, Vn(t), tr(e, t), t.componentStack = n);
	}
	function tr(e, t) {
		var n = t.node, o = t.childIndex;
		if (n !== null) {
			if (typeof n == "object") {
				switch (n.$$typeof) {
					case i:
						var s = n.type, c = n.key, l = n.props;
						n = l.ref;
						var d = n === void 0 ? null : n, p = Tt(s), m = c ?? (o === -1 ? 0 : o);
						if (c = [
							t.keyPath,
							p,
							m
						], t.replay !== null) a: {
							var g = t.replay;
							for (o = g.nodes, n = 0; n < o.length; n++) {
								var _ = o[n];
								if (m === _[1]) {
									if (_.length === 4) {
										if (p !== null && p !== _[0]) throw Error(r(490, _[0], p));
										var v = _[2];
										p = _[3], m = t.node, t.replay = {
											nodes: v,
											slots: p,
											pendingTasks: 1
										};
										try {
											if (Qn(e, t, c, s, l, d), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
											t.replay.pendingTasks--;
										} catch (r) {
											if (typeof r == "object" && r && (r === Vt || typeof r.then == "function")) throw t.node === m ? t.replay = g : o.splice(n, 1), r;
											t.replay.pendingTasks--, l = Un(t.componentStack), c = e, e = t.blockedBoundary, s = r, l = Wn(c, s, l), ur(c, e, v, p, s, l);
										}
										t.replay = g;
									} else {
										if (s !== f) throw Error(r(490, "Suspense", Tt(s) || "Unknown"));
										b: {
											g = void 0, s = _[5], d = _[2], p = _[3], m = _[4] === null ? [] : _[4][2], _ = _[4] === null ? null : _[4][3];
											var y = t.keyPath, b = t.formatContext, x = t.row, w = t.replay, T = t.blockedBoundary, E = t.hoistableState, D = l.children, O = l.fallback, k = /* @__PURE__ */ new Set();
											l = Rn(e, t.row, k, null, null), l.parentFlushed = !0, l.rootSegmentID = s, t.blockedBoundary = l, t.hoistableState = l.contentState, t.keyPath = c, t.formatContext = se(e.resumableState, b), t.row = null, t.replay = {
												nodes: d,
												slots: p,
												pendingTasks: 1
											};
											try {
												if (cr(e, t, D, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
												if (t.replay.pendingTasks--, l.pendingTasks === 0 && l.status === 0) {
													l.status = 1, e.completedBoundaries.push(l);
													break b;
												}
											} catch (n) {
												l.status = 4, v = Un(t.componentStack), g = Wn(e, n, v), l.errorDigest = g, t.replay.pendingTasks--, e.clientRenderedBoundaries.push(l);
											} finally {
												t.blockedBoundary = T, t.hoistableState = E, t.replay = w, t.keyPath = y, t.formatContext = b, t.row = x;
											}
											v = Bn(e, null, {
												nodes: m,
												slots: _,
												pendingTasks: 0
											}, O, -1, T, l.fallbackState, k, [
												c[0],
												"Suspense Fallback",
												c[2]
											], oe(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, Hn(t.componentStack)), Vn(v), e.pingedTasks.push(v);
										}
									}
									o.splice(n, 1);
									break a;
								}
							}
						}
						else Qn(e, t, c, s, l, d);
						return;
					case a: throw Error(r(257));
					case h:
						if (v = n._init, n = v(n._payload), e.status === 12) throw null;
						er(e, t, n, o);
						return;
				}
				if (C(n)) {
					nr(e, t, n, o);
					return;
				}
				if ((v = S(n)) && (v = v.call(n))) {
					if (n = v.next(), !n.done) {
						l = [];
						do
							l.push(n.value), n = v.next();
						while (!n.done);
						nr(e, t, l, o);
					}
					return;
				}
				if (typeof n.then == "function") return t.thenableState = null, er(e, t, xn(n), o);
				if (n.$$typeof === u) return er(e, t, n._currentValue2, o);
				throw o = Object.prototype.toString.call(n), Error(r(31, o === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : o));
			}
			typeof n == "string" ? (o = t.blockedSegment, o !== null && (o.lastPushedText = xt(o.chunks, n, e.renderState, o.lastPushedText))) : (typeof n == "number" || typeof n == "bigint") && (o = t.blockedSegment, o !== null && (o.lastPushedText = xt(o.chunks, "" + n, e.renderState, o.lastPushedText)));
		}
	}
	function nr(e, t, n, i) {
		var a = t.keyPath;
		if (i !== -1 && (t.keyPath = [
			t.keyPath,
			"Fragment",
			i
		], t.replay !== null)) {
			for (var o = t.replay, s = o.nodes, c = 0; c < s.length; c++) {
				var l = s[c];
				if (l[1] === i) {
					i = l[2], l = l[3], t.replay = {
						nodes: i,
						slots: l,
						pendingTasks: 1
					};
					try {
						if (nr(e, t, n, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
						t.replay.pendingTasks--;
					} catch (r) {
						if (typeof r == "object" && r && (r === Vt || typeof r.then == "function")) throw r;
						t.replay.pendingTasks--, n = Un(t.componentStack);
						var u = t.blockedBoundary, d = r;
						n = Wn(e, d, n), ur(e, u, i, l, d, n);
					}
					t.replay = o, s.splice(c, 1);
					break;
				}
			}
			t.keyPath = a;
			return;
		}
		if (o = t.treeContext, s = n.length, t.replay !== null && (c = t.replay.slots, typeof c == "object" && c)) {
			for (i = 0; i < s; i++) l = n[i], t.treeContext = Ft(o, s, i), u = c[i], typeof u == "number" ? ($n(e, t, u, l, i), delete c[i]) : cr(e, t, l, i);
			t.treeContext = o, t.keyPath = a;
			return;
		}
		for (c = 0; c < s; c++) i = n[c], t.treeContext = Ft(o, s, c), cr(e, t, i, c);
		t.treeContext = o, t.keyPath = a;
	}
	function rr(e, t, n) {
		if (n.status = 5, n.rootSegmentID = e.nextSegmentId++, e = n.trackedContentKeyPath, e === null) throw Error(r(486));
		var i = n.trackedFallbackNode, a = [], o = t.workingMap.get(e);
		return o === void 0 ? (n = [
			e[1],
			e[2],
			a,
			null,
			i,
			n.rootSegmentID
		], t.workingMap.set(e, n), Mr(n, e[0], t), n) : (o[4] = i, o[5] = n.rootSegmentID, o);
	}
	function ir(e, t, n, i) {
		i.status = 5;
		var a = n.keyPath, o = n.blockedBoundary;
		if (o === null) i.id = e.nextSegmentId++, t.rootSlots = i.id, e.completedRootSegment !== null && (e.completedRootSegment.status = 5);
		else {
			if (o !== null && o.status === 0) {
				var s = rr(e, t, o);
				if (o.trackedContentKeyPath === a && n.childIndex === -1) {
					i.id === -1 && (i.id = i.parentFlushed ? o.rootSegmentID : e.nextSegmentId++), s[3] = i.id;
					return;
				}
			}
			if (i.id === -1 && (i.id = i.parentFlushed && o !== null ? o.rootSegmentID : e.nextSegmentId++), n.childIndex === -1) a === null ? t.rootSlots = i.id : (n = t.workingMap.get(a), n === void 0 ? (n = [
				a[1],
				a[2],
				[],
				i.id
			], Mr(n, a[0], t)) : n[3] = i.id);
			else {
				if (a === null) {
					if (e = t.rootSlots, e === null) e = t.rootSlots = {};
					else if (typeof e == "number") throw Error(r(491));
				} else if (o = t.workingMap, s = o.get(a), s === void 0) e = {}, s = [
					a[1],
					a[2],
					[],
					e
				], o.set(a, s), Mr(s, a[0], t);
				else if (e = s[3], e === null) e = s[3] = {};
				else if (typeof e == "number") throw Error(r(491));
				e[n.childIndex] = i.id;
			}
		}
	}
	function ar(e, t) {
		e = e.trackedPostpones, e !== null && (t = t.trackedContentKeyPath, t !== null && (t = e.workingMap.get(t), t !== void 0 && (t.length = 4, t[2] = [], t[3] = null)));
	}
	function or(e, t, n) {
		return Bn(e, n, t.replay, t.node, t.childIndex, t.blockedBoundary, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function sr(e, t, n) {
		var r = t.blockedSegment, i = X(e, r.chunks.length, null, t.formatContext, r.lastPushedText, !0);
		return r.children.push(i), r.lastPushedText = !1, zn(e, n, t.node, t.childIndex, t.blockedBoundary, i, t.blockedPreamble, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function cr(e, t, n, r) {
		var i = t.formatContext, a = t.context, o = t.keyPath, s = t.treeContext, c = t.componentStack, l = t.blockedSegment;
		if (l === null) {
			l = t.replay;
			try {
				return er(e, t, n, r);
			} catch (u) {
				if (fn(), n = u === Vt ? Wt() : u, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						r = u === Vt ? dn() : null, e = or(e, t, r).ping, n.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, J(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						n = u === Vt ? dn() : null, n = or(e, t, n), e.pingedTasks.push(n), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, J(a);
						return;
					}
				}
			}
		} else {
			var u = l.children.length, d = l.chunks.length;
			try {
				return er(e, t, n, r);
			} catch (r) {
				if (fn(), l.children.length = u, l.chunks.length = d, n = r === Vt ? Wt() : r, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						l = n, n = r === Vt ? dn() : null, e = sr(e, t, n).ping, l.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, J(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						l = r === Vt ? dn() : null, l = sr(e, t, l), e.pingedTasks.push(l), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, J(a);
						return;
					}
				}
			}
		}
		throw t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, J(a), n;
	}
	function lr(e) {
		var t = e.blockedBoundary, n = e.blockedSegment;
		n !== null && (n.status = 3, gr(this, t, e.row, n));
	}
	function ur(e, t, n, i, a, o) {
		for (var s = 0; s < n.length; s++) {
			var c = n[s];
			if (c.length === 4) ur(e, t, c[2], c[3], a, o);
			else {
				c = c[5];
				var l = e, u = o, d = Rn(l, null, /* @__PURE__ */ new Set(), null, null);
				d.parentFlushed = !0, d.rootSegmentID = c, d.status = 4, d.errorDigest = u, d.parentFlushed && l.clientRenderedBoundaries.push(d);
			}
		}
		if (n.length = 0, i !== null) {
			if (t === null) throw Error(r(487));
			if (t.status !== 4 && (t.status = 4, t.errorDigest = o, t.parentFlushed && e.clientRenderedBoundaries.push(t)), typeof i == "object") for (var f in i) delete i[f];
		}
	}
	function dr(e, t, n) {
		var r = e.blockedBoundary, i = e.blockedSegment;
		if (i !== null) {
			if (i.status === 6) return;
			i.status = 3;
		}
		var a = Un(e.componentStack);
		if (r === null) {
			if (t.status !== 13 && t.status !== 14) {
				if (r = e.replay, r === null) {
					t.trackedPostpones !== null && i !== null ? (r = t.trackedPostpones, Wn(t, n, a), ir(t, r, e, i), gr(t, null, e.row, i)) : (Wn(t, n, a), Gn(t, n));
					return;
				}
				r.pendingTasks--, r.pendingTasks === 0 && 0 < r.nodes.length && (i = Wn(t, n, a), ur(t, null, r.nodes, r.slots, n, i)), t.pendingRootTasks--, t.pendingRootTasks === 0 && pr(t);
			}
		} else {
			var o = t.trackedPostpones;
			if (r.status !== 4) {
				if (o !== null && i !== null) return Wn(t, n, a), ir(t, o, e, i), r.fallbackAbortableTasks.forEach(function(e) {
					return dr(e, t, n);
				}), r.fallbackAbortableTasks.clear(), gr(t, r, e.row, i);
				r.status = 4, i = Wn(t, n, a), r.status = 4, r.errorDigest = i, ar(t, r), r.parentFlushed && t.clientRenderedBoundaries.push(r);
			}
			r.pendingTasks--, i = r.row, i !== null && --i.pendingTasks === 0 && Z(t, i), r.fallbackAbortableTasks.forEach(function(e) {
				return dr(e, t, n);
			}), r.fallbackAbortableTasks.clear();
		}
		e = e.row, e !== null && --e.pendingTasks === 0 && Z(t, e), t.allPendingTasks--, t.allPendingTasks === 0 && mr(t);
	}
	function fr(e, t) {
		try {
			var n = e.renderState, r = n.onHeaders;
			if (r) {
				var i = n.headers;
				if (i) {
					n.headers = null;
					var a = i.preconnects;
					if (i.fontPreloads && (a && (a += ", "), a += i.fontPreloads), i.highImagePreloads && (a && (a += ", "), a += i.highImagePreloads), !t) {
						var o = n.styles.values(), s = o.next();
						b: for (; 0 < i.remainingCapacity && !s.done; s = o.next()) for (var c = s.value.sheets.values(), l = c.next(); 0 < i.remainingCapacity && !l.done; l = c.next()) {
							var u = l.value, d = u.props, f = d.href, p = u.props, m = ft(p.href, "style", {
								crossOrigin: p.crossOrigin,
								integrity: p.integrity,
								nonce: p.nonce,
								type: p.type,
								fetchPriority: p.fetchPriority,
								referrerPolicy: p.referrerPolicy,
								media: p.media
							});
							if (0 <= (i.remainingCapacity -= m.length + 2)) n.resets.style[f] = ee, a && (a += ", "), a += m, n.resets.style[f] = typeof d.crossOrigin == "string" || typeof d.integrity == "string" ? [d.crossOrigin, d.integrity] : ee;
							else break b;
						}
					}
					r(a ? { Link: a } : {});
				}
			}
		} catch (t) {
			Wn(e, t, {});
		}
	}
	function pr(e) {
		e.trackedPostpones === null && fr(e, !0), e.trackedPostpones === null && br(e), e.onShellError = Bt, e = e.onShellReady, e();
	}
	function mr(e) {
		fr(e, e.trackedPostpones === null ? !0 : e.completedRootSegment === null || e.completedRootSegment.status !== 5), br(e), e = e.onAllReady, e();
	}
	function hr(e, t) {
		if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null && t.children[0].id === -1) {
			var n = t.children[0];
			n.id = t.id, n.parentFlushed = !0, n.status !== 1 && n.status !== 3 && n.status !== 4 || hr(e, n);
		} else e.completedSegments.push(t);
	}
	function gr(e, t, n, i) {
		if (n !== null && (--n.pendingTasks === 0 ? Z(e, n) : n.together && qn(e, n)), e.allPendingTasks--, t === null) {
			if (i !== null && i.parentFlushed) {
				if (e.completedRootSegment !== null) throw Error(r(389));
				e.completedRootSegment = i;
			}
			e.pendingRootTasks--, e.pendingRootTasks === 0 && pr(e);
		} else if (t.pendingTasks--, t.status !== 4) if (t.pendingTasks === 0) {
			if (t.status === 0 && (t.status = 1), i !== null && i.parentFlushed && (i.status === 1 || i.status === 3) && hr(t, i), t.parentFlushed && e.completedBoundaries.push(t), t.status === 1) n = t.row, n !== null && yt(n.hoistables, t.contentState), Mn(e, t) || (t.fallbackAbortableTasks.forEach(lr, e), t.fallbackAbortableTasks.clear(), n !== null && --n.pendingTasks === 0 && Z(e, n)), e.pendingRootTasks === 0 && e.trackedPostpones === null && t.contentPreamble !== null && br(e);
			else if (t.status === 5 && (t = t.row, t !== null)) {
				if (e.trackedPostpones !== null) {
					n = e.trackedPostpones;
					var a = t.next;
					if (a !== null && (i = a.boundaries, i !== null)) for (a.boundaries = null, a = 0; a < i.length; a++) {
						var o = i[a];
						rr(e, n, o), gr(e, o, null, null);
					}
				}
				--t.pendingTasks === 0 && Z(e, t);
			}
		} else i === null || !i.parentFlushed || i.status !== 1 && i.status !== 3 || (hr(t, i), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)), t = t.row, t !== null && t.together && qn(e, t);
		e.allPendingTasks === 0 && mr(e);
	}
	function _r(e) {
		if (e.status !== 14 && e.status !== 13) {
			var t = Dt, n = z.H;
			z.H = Cn;
			var i = z.A;
			z.A = Tn;
			var a = In;
			In = e;
			var o = wn;
			wn = e.resumableState;
			try {
				var s = e.pingedTasks, c;
				for (c = 0; c < s.length; c++) {
					var l = s[c], u = e, d = l.blockedSegment;
					if (d === null) {
						var f = u;
						if (l.replay.pendingTasks !== 0) {
							J(l.context);
							try {
								if (typeof l.replay.slots == "number" ? $n(f, l, l.replay.slots, l.node, l.childIndex) : tr(f, l), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length) throw Error(r(488));
								l.replay.pendingTasks--, l.abortSet.delete(l), gr(f, l.blockedBoundary, l.row, null);
							} catch (e) {
								fn();
								var p = e === Vt ? Wt() : e;
								if (typeof p == "object" && p && typeof p.then == "function") {
									var m = l.ping;
									p.then(m, m), l.thenableState = e === Vt ? dn() : null;
								} else {
									l.replay.pendingTasks--, l.abortSet.delete(l);
									var h = Un(l.componentStack);
									u = void 0;
									var g = f, _ = l.blockedBoundary, v = f.status === 12 ? f.fatalError : p, y = l.replay.nodes, b = l.replay.slots;
									u = Wn(g, v, h), ur(g, _, y, b, v, u), f.pendingRootTasks--, f.pendingRootTasks === 0 && pr(f), f.allPendingTasks--, f.allPendingTasks === 0 && mr(f);
								}
							}
						}
					} else if (f = void 0, g = d, g.status === 0) {
						g.status = 6, J(l.context);
						var x = g.children.length, S = g.chunks.length;
						try {
							tr(u, l), St(g.chunks, u.renderState, g.lastPushedText, g.textEmbedded), l.abortSet.delete(l), g.status = 1, gr(u, l.blockedBoundary, l.row, g);
						} catch (e) {
							fn(), g.children.length = x, g.chunks.length = S;
							var C = e === Vt ? Wt() : u.status === 12 ? u.fatalError : e;
							if (u.status === 12 && u.trackedPostpones !== null) {
								var w = u.trackedPostpones, T = Un(l.componentStack);
								l.abortSet.delete(l), Wn(u, C, T), ir(u, w, l, g), gr(u, l.blockedBoundary, l.row, g);
							} else if (typeof C == "object" && C && typeof C.then == "function") {
								g.status = 0, l.thenableState = e === Vt ? dn() : null;
								var E = l.ping;
								C.then(E, E);
							} else {
								var D = Un(l.componentStack);
								l.abortSet.delete(l), g.status = 4;
								var O = l.blockedBoundary, k = l.row;
								if (k !== null && --k.pendingTasks === 0 && Z(u, k), u.allPendingTasks--, f = Wn(u, C, D), O === null) Gn(u, C);
								else if (O.pendingTasks--, O.status !== 4) {
									O.status = 4, O.errorDigest = f, ar(u, O);
									var A = O.row;
									A !== null && --A.pendingTasks === 0 && Z(u, A), O.parentFlushed && u.clientRenderedBoundaries.push(O), u.pendingRootTasks === 0 && u.trackedPostpones === null && O.contentPreamble !== null && br(u);
								}
								u.allPendingTasks === 0 && mr(u);
							}
						}
					}
				}
				s.splice(0, c), e.destination !== null && Or(e, e.destination);
			} catch (t) {
				Wn(e, t, {}), Gn(e, t);
			} finally {
				wn = o, z.H = n, z.A = i, n === Cn && J(t), In = a;
			}
		}
	}
	function vr(e, t, n) {
		t.preambleChildren.length && n.push(t.preambleChildren);
		for (var r = !1, i = 0; i < t.children.length; i++) r = yr(e, t.children[i], n) || r;
		return r;
	}
	function yr(e, t, n) {
		var i = t.boundary;
		if (i === null) return vr(e, t, n);
		var a = i.contentPreamble, o = i.fallbackPreamble;
		if (a === null || o === null) return !1;
		switch (i.status) {
			case 1:
				if (K(e.renderState, a), e.byteSize += i.byteSize, t = i.completedSegments[0], !t) throw Error(r(391));
				return vr(e, t, n);
			case 5: if (e.trackedPostpones !== null) return !0;
			case 4: if (t.status === 1) return K(e.renderState, o), vr(e, t, n);
			default: return !0;
		}
	}
	function br(e) {
		if (e.completedRootSegment && e.completedPreambleSegments === null) {
			var t = [], n = e.byteSize, r = yr(e, e.completedRootSegment, t), i = e.renderState.preamble;
			!1 === r || i.headChunks && i.bodyChunks ? e.completedPreambleSegments = t : e.byteSize = n;
		}
	}
	function xr(e, t, n, i) {
		switch (n.parentFlushed = !0, n.status) {
			case 0: n.id = e.nextSegmentId++;
			case 5: return i = n.id, n.lastPushedText = !1, n.textEmbedded = !1, e = e.renderState, t.push("<template id=\""), t.push(e.placeholderPrefix), e = i.toString(16), t.push(e), t.push("\"></template>");
			case 1:
				n.status = 2;
				var a = !0, o = n.chunks, s = 0;
				n = n.children;
				for (var c = 0; c < n.length; c++) {
					for (a = n[c]; s < a.index; s++) t.push(o[s]);
					a = Cr(e, t, a, i);
				}
				for (; s < o.length - 1; s++) t.push(o[s]);
				return s < o.length && (a = t.push(o[s])), a;
			case 3: return !0;
			default: throw Error(r(390));
		}
	}
	var Sr = 0;
	function Cr(e, t, n, i) {
		var a = n.boundary;
		if (a === null) return xr(e, t, n, i);
		if (a.parentFlushed = !0, a.status === 4) {
			var o = a.row;
			return o !== null && --o.pendingTasks === 0 && Z(e, o), e.renderState.generateStaticMarkup || (a = a.errorDigest, t.push("<!--$!-->"), t.push("<template"), a && (t.push(" data-dgst=\""), a = P(a), t.push(a), t.push("\"")), t.push("></template>")), xr(e, t, n, i), e = e.renderState.generateStaticMarkup ? !0 : t.push("<!--/$-->"), e;
		}
		if (a.status !== 1) return a.status === 0 && (a.rootSegmentID = e.nextSegmentId++), 0 < a.completedSegments.length && e.partialBoundaries.push(a), Le(t, e.renderState, a.rootSegmentID), i && yt(i, a.fallbackState), xr(e, t, n, i), t.push("<!--/$-->");
		if (!Dr && Mn(e, a) && Sr + a.byteSize > e.progressiveChunkSize) return a.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(a), Le(t, e.renderState, a.rootSegmentID), xr(e, t, n, i), t.push("<!--/$-->");
		if (Sr += a.byteSize, i && yt(i, a.contentState), n = a.row, n !== null && Mn(e, a) && --n.pendingTasks === 0 && Z(e, n), e.renderState.generateStaticMarkup || t.push("<!--$-->"), n = a.completedSegments, n.length !== 1) throw Error(r(391));
		return Cr(e, t, n[0], i), e = e.renderState.generateStaticMarkup ? !0 : t.push("<!--/$-->"), e;
	}
	function wr(e, t, n, r) {
		return Re(t, e.renderState, n.parentFormatContext, n.id), Cr(e, t, n, r), ze(t, n.parentFormatContext);
	}
	function Tr(e, t, n) {
		Sr = n.byteSize;
		for (var r = n.completedSegments, i = 0; i < r.length; i++) Er(e, t, n, r[i]);
		r.length = 0, r = n.row, r !== null && Mn(e, n) && --r.pendingTasks === 0 && Z(e, r), qe(t, n.contentState, e.renderState), r = e.resumableState, e = e.renderState, i = n.rootSegmentID, n = n.contentState;
		var a = e.stylesToHoist;
		return e.stylesToHoist = !1, t.push(e.startInlineScript), t.push(">"), a ? (!(r.instructions & 4) && (r.instructions |= 4, t.push("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};")), !(r.instructions & 2) && (r.instructions |= 2, t.push("$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d||\"/&\"===d)if(0===h)break;else h--;else\"$\"!==d&&\"$?\"!==d&&\"$~\"!==d&&\"$!\"!==d&&\"&\"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data=\"$\";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data=\"$~\",$RB.push(a,b),2===$RB.length&&(\"number\"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};")), r.instructions & 8 ? t.push("$RR(\"") : (r.instructions |= 8, t.push("$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll(\"link[data-precedence],style[data-precedence]\"),v=[],k=0;b=e[k++];)\"not all\"===b.getAttribute(\"media\")?v.push(b):(\"LINK\"===b.tagName&&$RM.set(b.getAttribute(\"href\"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement(\"link\");a.href=d;a.rel=\n\"stylesheet\";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute(\"media\");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute(\"data-precedence\");a.removeAttribute(\"media\")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=\n\"$~\";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,\"CSS failed to load\"))};$RR(\""))) : (!(r.instructions & 2) && (r.instructions |= 2, t.push("$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d||\"/&\"===d)if(0===h)break;else h--;else\"$\"!==d&&\"$?\"!==d&&\"$~\"!==d&&\"$!\"!==d&&\"&\"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data=\"$\";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data=\"$~\",$RB.push(a,b),2===$RB.length&&(\"number\"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};")), t.push("$RC(\"")), r = i.toString(16), t.push(e.boundaryPrefix), t.push(r), t.push("\",\""), t.push(e.segmentPrefix), t.push(r), a ? (t.push("\","), tt(t, n)) : t.push("\""), n = t.push(")<\/script>"), Ie(t, e) && n;
	}
	function Er(e, t, n, i) {
		if (i.status === 2) return !0;
		var a = n.contentState, o = i.id;
		if (o === -1) {
			if ((i.id = n.rootSegmentID) === -1) throw Error(r(392));
			return wr(e, t, i, a);
		}
		return o === n.rootSegmentID ? wr(e, t, i, a) : (wr(e, t, i, a), n = e.resumableState, e = e.renderState, t.push(e.startInlineScript), t.push(">"), n.instructions & 1 ? t.push("$RS(\"") : (n.instructions |= 1, t.push("$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS(\"")), t.push(e.segmentPrefix), o = o.toString(16), t.push(o), t.push("\",\""), t.push(e.placeholderPrefix), t.push(o), t = t.push("\")<\/script>"), t);
	}
	var Dr = !1;
	function Or(e, t) {
		try {
			if (!(0 < e.pendingRootTasks)) {
				var n, r = e.completedRootSegment;
				if (r !== null) {
					if (r.status === 5) return;
					var i = e.completedPreambleSegments;
					if (i === null) return;
					Sr = e.byteSize;
					var a = e.resumableState, o = e.renderState, s = o.preamble, c = s.htmlChunks, l = s.headChunks, u;
					if (c) {
						for (u = 0; u < c.length; u++) t.push(c[u]);
						if (l) for (u = 0; u < l.length; u++) t.push(l[u]);
						else {
							var d = je("head");
							t.push(d), t.push(">");
						}
					} else if (l) for (u = 0; u < l.length; u++) t.push(l[u]);
					var f = o.charsetChunks;
					for (u = 0; u < f.length; u++) t.push(f[u]);
					f.length = 0, o.preconnects.forEach(Je, t), o.preconnects.clear();
					var p = o.viewportChunks;
					for (u = 0; u < p.length; u++) t.push(p[u]);
					p.length = 0, o.fontPreloads.forEach(Je, t), o.fontPreloads.clear(), o.highImagePreloads.forEach(Je, t), o.highImagePreloads.clear(), te = o, o.styles.forEach(Ze, t), te = null;
					var m = o.importMapChunks;
					for (u = 0; u < m.length; u++) t.push(m[u]);
					m.length = 0, o.bootstrapScripts.forEach(Je, t), o.scripts.forEach(Je, t), o.scripts.clear(), o.bulkPreloads.forEach(Je, t), o.bulkPreloads.clear(), a.instructions |= 32;
					var h = o.hoistableChunks;
					for (u = 0; u < h.length; u++) t.push(h[u]);
					for (a = h.length = 0; a < i.length; a++) {
						var g = i[a];
						for (o = 0; o < g.length; o++) Cr(e, t, g[o], null);
					}
					var _ = e.renderState.preamble, v = _.headChunks;
					if (_.htmlChunks || v) {
						var y = Fe("head");
						t.push(y);
					}
					var b = _.bodyChunks;
					if (b) for (i = 0; i < b.length; i++) t.push(b[i]);
					Cr(e, t, r, null), e.completedRootSegment = null;
					var x = e.renderState;
					if (e.allPendingTasks !== 0 || e.clientRenderedBoundaries.length !== 0 || e.completedBoundaries.length !== 0 || e.trackedPostpones !== null && (e.trackedPostpones.rootNodes.length !== 0 || e.trackedPostpones.rootSlots !== null)) {
						var S = e.resumableState;
						if (!(S.instructions & 64)) {
							if (S.instructions |= 64, t.push(x.startInlineScript), !(S.instructions & 32)) {
								S.instructions |= 32;
								var C = "_" + S.idPrefix + "R_";
								t.push(" id=\"");
								var w = P(C);
								t.push(w), t.push("\"");
							}
							t.push(">"), t.push("requestAnimationFrame(function(){$RT=performance.now()});"), t.push("<\/script>");
						}
					}
					Ie(t, x);
				}
				var T = e.renderState;
				r = 0;
				var E = T.viewportChunks;
				for (r = 0; r < E.length; r++) t.push(E[r]);
				E.length = 0, T.preconnects.forEach(Je, t), T.preconnects.clear(), T.fontPreloads.forEach(Je, t), T.fontPreloads.clear(), T.highImagePreloads.forEach(Je, t), T.highImagePreloads.clear(), T.styles.forEach($e, t), T.scripts.forEach(Je, t), T.scripts.clear(), T.bulkPreloads.forEach(Je, t), T.bulkPreloads.clear();
				var D = T.hoistableChunks;
				for (r = 0; r < D.length; r++) t.push(D[r]);
				D.length = 0;
				var O = e.clientRenderedBoundaries;
				for (n = 0; n < O.length; n++) {
					var k = O[n];
					T = t;
					var A = e.resumableState, j = e.renderState, M = k.rootSegmentID, N = k.errorDigest;
					T.push(j.startInlineScript), T.push(">"), A.instructions & 4 ? T.push("$RX(\"") : (A.instructions |= 4, T.push("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX(\"")), T.push(j.boundaryPrefix);
					var F = M.toString(16);
					if (T.push(F), T.push("\""), N) {
						T.push(",");
						var I = Ve(N || "");
						T.push(I);
					}
					var L = T.push(")<\/script>");
					if (!L) {
						e.destination = null, n++, O.splice(0, n);
						return;
					}
				}
				O.splice(0, n);
				var R = e.completedBoundaries;
				for (n = 0; n < R.length; n++) if (!Tr(e, t, R[n])) {
					e.destination = null, n++, R.splice(0, n);
					return;
				}
				R.splice(0, n), Dr = !0;
				var z = e.partialBoundaries;
				for (n = 0; n < z.length; n++) {
					var B = z[n];
					a: {
						O = e, k = t, Sr = B.byteSize;
						var V = B.completedSegments;
						for (L = 0; L < V.length; L++) if (!Er(O, k, B, V[L])) {
							L++, V.splice(0, L);
							var H = !1;
							break a;
						}
						V.splice(0, L);
						var ee = B.row;
						ee !== null && ee.together && B.pendingTasks === 1 && (ee.pendingTasks === 1 ? Kn(O, ee, ee.hoistables) : ee.pendingTasks--), H = qe(k, B.contentState, O.renderState);
					}
					if (!H) {
						e.destination = null, n++, z.splice(0, n);
						return;
					}
				}
				z.splice(0, n), Dr = !1;
				var ne = e.completedBoundaries;
				for (n = 0; n < ne.length; n++) if (!Tr(e, t, ne[n])) {
					e.destination = null, n++, ne.splice(0, n);
					return;
				}
				ne.splice(0, n);
			}
		} finally {
			Dr = !1, e.allPendingTasks === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && (e.flushScheduled = !1, n = e.resumableState, n.hasBody && (z = Fe("body"), t.push(z)), n.hasHtml && (n = Fe("html"), t.push(n)), e.status = 14, t.push(null), e.destination = null);
		}
	}
	function kr(e) {
		if (!1 === e.flushScheduled && e.pingedTasks.length === 0 && e.destination !== null) {
			e.flushScheduled = !0;
			var t = e.destination;
			t ? Or(e, t) : e.flushScheduled = !1;
		}
	}
	function Ar(e, t) {
		if (e.status === 13) e.status = 14, t.destroy(e.fatalError);
		else if (e.status !== 14 && e.destination === null) {
			e.destination = t;
			try {
				Or(e, t);
			} catch (t) {
				Wn(e, t, {}), Gn(e, t);
			}
		}
	}
	function jr(e, t) {
		(e.status === 11 || e.status === 10) && (e.status = 12);
		try {
			var n = e.abortableTasks;
			if (0 < n.size) {
				var i = t === void 0 ? Error(r(432)) : typeof t == "object" && t && typeof t.then == "function" ? Error(r(530)) : t;
				e.fatalError = i, n.forEach(function(t) {
					return dr(t, e, i);
				}), n.clear();
			}
			e.destination !== null && Or(e, e.destination);
		} catch (t) {
			Wn(e, t, {}), Gn(e, t);
		}
	}
	function Mr(e, t, n) {
		if (t === null) n.rootNodes.push(e);
		else {
			var r = n.workingMap, i = r.get(t);
			i === void 0 && (i = [
				t[1],
				t[2],
				[],
				null
			], r.set(t, i), Mr(i, t[0], n)), i[2].push(e);
		}
	}
	function Nr() {}
	function Pr(e, t, n, i) {
		var a = !1, o = null, s = "", c = !1;
		if (t = ie(t ? t.identifierPrefix : void 0), e = Fn(e, t, bt(t, n), U(0, null, 0, null), Infinity, Nr, void 0, function() {
			c = !0;
		}, void 0, void 0, void 0), e.flushScheduled = e.destination !== null, _r(e), e.status === 10 && (e.status = 11), e.trackedPostpones === null && fr(e, e.pendingRootTasks === 0), jr(e, i), Ar(e, {
			push: function(e) {
				return e !== null && (s += e), !0;
			},
			destroy: function(e) {
				a = !0, o = e;
			}
		}), a && o !== i) throw o;
		if (!c) throw Error(r(426));
		return s;
	}
	e.renderToStaticMarkup = function(e, t) {
		return Pr(e, t, !0, "The server used \"renderToStaticMarkup\" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to \"renderToReadableStream\" which supports Suspense on the server");
	}, e.renderToString = function(e, t) {
		return Pr(e, t, !1, "The server used \"renderToString\" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to \"renderToReadableStream\" which supports Suspense on the server");
	}, e.version = "19.2.3";
})), Nn = /* @__PURE__ */ o(((e) => {
	var t = Oe(), n = Me();
	function r(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var i = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), g = Symbol.for("react.scope"), _ = Symbol.for("react.activity"), v = Symbol.for("react.legacy_hidden"), y = Symbol.for("react.memo_cache_sentinel"), b = Symbol.for("react.view_transition"), x = Symbol.iterator;
	function S(e) {
		return typeof e != "object" || !e ? null : (e = x && e[x] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var C = Array.isArray;
	function w(e, t) {
		var n = e.length & 3, r = e.length - n, i = t;
		for (t = 0; t < r;) {
			var a = e.charCodeAt(t) & 255 | (e.charCodeAt(++t) & 255) << 8 | (e.charCodeAt(++t) & 255) << 16 | (e.charCodeAt(++t) & 255) << 24;
			++t, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295, i ^= a, i = i << 13 | i >>> 19, i = 5 * (i & 65535) + ((5 * (i >>> 16) & 65535) << 16) & 4294967295, i = (i & 65535) + 27492 + (((i >>> 16) + 58964 & 65535) << 16);
		}
		switch (a = 0, n) {
			case 3: a ^= (e.charCodeAt(t + 2) & 255) << 16;
			case 2: a ^= (e.charCodeAt(t + 1) & 255) << 8;
			case 1: a ^= e.charCodeAt(t) & 255, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, i ^= 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295;
		}
		return i ^= e.length, i ^= i >>> 16, i = 2246822507 * (i & 65535) + ((2246822507 * (i >>> 16) & 65535) << 16) & 4294967295, i ^= i >>> 13, i = 3266489909 * (i & 65535) + ((3266489909 * (i >>> 16) & 65535) << 16) & 4294967295, (i ^ i >>> 16) >>> 0;
	}
	var T = new MessageChannel(), E = [];
	T.port1.onmessage = function() {
		var e = E.shift();
		e && e();
	};
	function D(e) {
		E.push(e), T.port2.postMessage(null);
	}
	function O(e) {
		setTimeout(function() {
			throw e;
		});
	}
	var k = Promise, A = typeof queueMicrotask == "function" ? queueMicrotask : function(e) {
		k.resolve(null).then(e).catch(O);
	}, j = null, M = 0;
	function N(e, t) {
		if (t.byteLength !== 0) if (2048 < t.byteLength) 0 < M && (e.enqueue(new Uint8Array(j.buffer, 0, M)), j = new Uint8Array(2048), M = 0), e.enqueue(t);
		else {
			var n = j.length - M;
			n < t.byteLength && (n === 0 ? e.enqueue(j) : (j.set(t.subarray(0, n), M), e.enqueue(j), t = t.subarray(n)), j = new Uint8Array(2048), M = 0), j.set(t, M), M += t.byteLength;
		}
	}
	function P(e, t) {
		return N(e, t), !0;
	}
	function F(e) {
		j && 0 < M && (e.enqueue(new Uint8Array(j.buffer, 0, M)), j = null, M = 0);
	}
	var I = new TextEncoder();
	function L(e) {
		return I.encode(e);
	}
	function R(e) {
		return I.encode(e);
	}
	function z(e) {
		return e.byteLength;
	}
	function B(e, t) {
		typeof e.error == "function" ? e.error(t) : e.close();
	}
	var V = Object.assign, H = Object.prototype.hasOwnProperty, ee = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), te = {}, ne = {};
	function re(e) {
		return H.call(ne, e) ? !0 : H.call(te, e) ? !1 : ee.test(e) ? ne[e] = !0 : (te[e] = !0, !1);
	}
	var ie = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), U = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), ae = /["'&<>]/;
	function W(e) {
		if (typeof e == "boolean" || typeof e == "number" || typeof e == "bigint") return "" + e;
		e = "" + e;
		var t = ae.exec(e);
		if (t) {
			var n = "", r, i = 0;
			for (r = t.index; r < e.length; r++) {
				switch (e.charCodeAt(r)) {
					case 34:
						t = "&quot;";
						break;
					case 38:
						t = "&amp;";
						break;
					case 39:
						t = "&#x27;";
						break;
					case 60:
						t = "&lt;";
						break;
					case 62:
						t = "&gt;";
						break;
					default: continue;
				}
				i !== r && (n += e.slice(i, r)), i = r + 1, n += t;
			}
			e = i === r ? n : n + e.slice(i, r);
		}
		return e;
	}
	var oe = /([A-Z])/g, se = /^ms-/, ce = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function le(e) {
		return ce.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	var ue = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, fe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, pe = de.d;
	de.d = {
		f: pe.f,
		r: pe.r,
		D: dr,
		C: fr,
		L: pr,
		m: mr,
		X: gr,
		S: hr,
		M: _r
	};
	var me = [], he = null;
	R("\"></template>");
	var ge = R("<script"), _e = R("<\/script>"), ve = R("<script src=\""), ye = R("<script type=\"module\" src=\""), be = R(" nonce=\""), xe = R(" integrity=\""), Se = R(" crossorigin=\""), Ce = R(" async=\"\"><\/script>"), we = R("<style"), Te = /(<\/|<)(s)(cript)/gi;
	function G(e, t, n, r) {
		return "" + t + (n === "s" ? "\\u0073" : "\\u0053") + r;
	}
	var Ee = R("<script type=\"importmap\">"), De = R("<\/script>");
	function ke(e, t, n, r, i, a) {
		n = typeof t == "string" ? t : t && t.script;
		var o = n === void 0 ? ge : R("<script nonce=\"" + W(n) + "\""), s = typeof t == "string" ? void 0 : t && t.style, c = s === void 0 ? we : R("<style nonce=\"" + W(s) + "\""), l = e.idPrefix, u = [], d = e.bootstrapScriptContent, f = e.bootstrapScripts, p = e.bootstrapModules;
		if (d !== void 0 && (u.push(o), rr(u, e), u.push(rt, L(("" + d).replace(Te, G)), _e)), d = [], r !== void 0 && (d.push(Ee), d.push(L(("" + JSON.stringify(r)).replace(Te, G))), d.push(De)), r = i ? {
			preconnects: "",
			fontPreloads: "",
			highImagePreloads: "",
			remainingCapacity: 2 + (typeof a == "number" ? a : 2e3)
		} : null, i = {
			placeholderPrefix: R(l + "P:"),
			segmentPrefix: R(l + "S:"),
			boundaryPrefix: R(l + "B:"),
			startInlineScript: o,
			startInlineStyle: c,
			preamble: je(),
			externalRuntimeScript: null,
			bootstrapChunks: u,
			importMapChunks: d,
			onHeaders: i,
			headers: r,
			resets: {
				font: {},
				dns: {},
				connect: {
					default: {},
					anonymous: {},
					credentials: {}
				},
				image: {},
				style: {}
			},
			charsetChunks: [],
			viewportChunks: [],
			hoistableChunks: [],
			preconnects: /* @__PURE__ */ new Set(),
			fontPreloads: /* @__PURE__ */ new Set(),
			highImagePreloads: /* @__PURE__ */ new Set(),
			styles: /* @__PURE__ */ new Map(),
			bootstrapScripts: /* @__PURE__ */ new Set(),
			scripts: /* @__PURE__ */ new Set(),
			bulkPreloads: /* @__PURE__ */ new Set(),
			preloads: {
				images: /* @__PURE__ */ new Map(),
				stylesheets: /* @__PURE__ */ new Map(),
				scripts: /* @__PURE__ */ new Map(),
				moduleScripts: /* @__PURE__ */ new Map()
			},
			nonce: {
				script: n,
				style: s
			},
			hoistableState: null,
			stylesToHoist: !1
		}, f !== void 0) for (r = 0; r < f.length; r++) l = f[r], s = o = void 0, c = {
			rel: "preload",
			as: "script",
			fetchPriority: "low",
			nonce: t
		}, typeof l == "string" ? c.href = a = l : (c.href = a = l.src, c.integrity = s = typeof l.integrity == "string" ? l.integrity : void 0, c.crossOrigin = o = typeof l == "string" || l.crossOrigin == null ? void 0 : l.crossOrigin === "use-credentials" ? "use-credentials" : ""), l = e, d = a, l.scriptResources[d] = null, l.moduleScriptResources[d] = null, l = [], ft(l, c), i.bootstrapScripts.add(l), u.push(ve, L(W(a)), q), n && u.push(be, L(W(n)), q), typeof s == "string" && u.push(xe, L(W(s)), q), typeof o == "string" && u.push(Se, L(W(o)), q), rr(u, e), u.push(Ce);
		if (p !== void 0) for (t = 0; t < p.length; t++) s = p[t], a = r = void 0, o = {
			rel: "modulepreload",
			fetchPriority: "low",
			nonce: n
		}, typeof s == "string" ? o.href = f = s : (o.href = f = s.src, o.integrity = a = typeof s.integrity == "string" ? s.integrity : void 0, o.crossOrigin = r = typeof s == "string" || s.crossOrigin == null ? void 0 : s.crossOrigin === "use-credentials" ? "use-credentials" : ""), s = e, c = f, s.scriptResources[c] = null, s.moduleScriptResources[c] = null, s = [], ft(s, o), i.bootstrapScripts.add(s), u.push(ye, L(W(f)), q), n && u.push(be, L(W(n)), q), typeof a == "string" && u.push(xe, L(W(a)), q), typeof r == "string" && u.push(Se, L(W(r)), q), rr(u, e), u.push(Ce);
		return i;
	}
	function Ae(e, t, n, r, i) {
		return {
			idPrefix: e === void 0 ? "" : e,
			nextFormID: 0,
			streamingFormat: 0,
			bootstrapScriptContent: n,
			bootstrapScripts: r,
			bootstrapModules: i,
			instructions: 0,
			hasBody: !1,
			hasHtml: !1,
			unknownResources: {},
			dnsResources: {},
			connectResources: {
				default: {},
				anonymous: {},
				credentials: {}
			},
			imageResources: {},
			styleResources: {},
			scriptResources: {},
			moduleUnknownResources: {},
			moduleScriptResources: {}
		};
	}
	function je() {
		return {
			htmlChunks: null,
			headChunks: null,
			bodyChunks: null
		};
	}
	function Ne(e, t, n, r) {
		return {
			insertionMode: e,
			selectedValue: t,
			tagScope: n,
			viewTransition: r
		};
	}
	function Pe(e) {
		return Ne(e === "http://www.w3.org/2000/svg" ? 4 : e === "http://www.w3.org/1998/Math/MathML" ? 5 : 0, null, 0, null);
	}
	function Fe(e, t, n) {
		var r = e.tagScope & -25;
		switch (t) {
			case "noscript": return Ne(2, null, r | 1, null);
			case "select": return Ne(2, n.value == null ? n.defaultValue : n.value, r, null);
			case "svg": return Ne(4, null, r, null);
			case "picture": return Ne(2, null, r | 2, null);
			case "math": return Ne(5, null, r, null);
			case "foreignObject": return Ne(2, null, r, null);
			case "table": return Ne(6, null, r, null);
			case "thead":
			case "tbody":
			case "tfoot": return Ne(7, null, r, null);
			case "colgroup": return Ne(9, null, r, null);
			case "tr": return Ne(8, null, r, null);
			case "head":
				if (2 > e.insertionMode) return Ne(3, null, r, null);
				break;
			case "html": if (e.insertionMode === 0) return Ne(1, null, r, null);
		}
		return 6 <= e.insertionMode || 2 > e.insertionMode ? Ne(2, null, r, null) : e.tagScope === r ? e : Ne(e.insertionMode, e.selectedValue, r, null);
	}
	function K(e) {
		return e === null ? null : {
			update: e.update,
			enter: "none",
			exit: "none",
			share: e.update,
			name: e.autoName,
			autoName: e.autoName,
			nameIdx: 0
		};
	}
	function Ie(e, t) {
		return t.tagScope & 32 && (e.instructions |= 128), Ne(t.insertionMode, t.selectedValue, t.tagScope | 12, K(t.viewTransition));
	}
	function Le(e, t) {
		e = K(t.viewTransition);
		var n = t.tagScope | 16;
		return e !== null && e.share !== "none" && (n |= 64), Ne(t.insertionMode, t.selectedValue, n, e);
	}
	var Re = R("<!-- -->");
	function ze(e, t, n, r) {
		return t === "" ? r : (r && e.push(Re), e.push(L(W(t))), !0);
	}
	var Be = /* @__PURE__ */ new Map(), Ve = R(" style=\""), He = R(":"), Ue = R(";");
	function We(e, t) {
		if (typeof t != "object") throw Error(r(62));
		var n = !0, i;
		for (i in t) if (H.call(t, i)) {
			var a = t[i];
			if (a != null && typeof a != "boolean" && a !== "") {
				if (i.indexOf("--") === 0) {
					var o = L(W(i));
					a = L(W(("" + a).trim()));
				} else o = Be.get(i), o === void 0 && (o = R(W(i.replace(oe, "-$1").toLowerCase().replace(se, "-ms-"))), Be.set(i, o)), a = typeof a == "number" ? a === 0 || ie.has(i) ? L("" + a) : L(a + "px") : L(W(("" + a).trim()));
				n ? (n = !1, e.push(Ve, o, He, a)) : e.push(Ue, o, He, a);
			}
		}
		n || e.push(q);
	}
	var Ge = R(" "), Ke = R("=\""), q = R("\""), qe = R("=\"\"");
	function Je(e, t, n) {
		n && typeof n != "function" && typeof n != "symbol" && e.push(Ge, L(t), qe);
	}
	function Ye(e, t, n) {
		typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && e.push(Ge, L(t), Ke, L(W(n)), q);
	}
	var Xe = R(W("javascript:throw new Error('React form unexpectedly submitted.')")), Ze = R("<input type=\"hidden\"");
	function Qe(e, t) {
		this.push(Ze), $e(e), Ye(this, "name", t), Ye(this, "value", e), this.push(it);
	}
	function $e(e) {
		if (typeof e != "string") throw Error(r(480));
	}
	function et(e, t) {
		if (typeof t.$$FORM_ACTION == "function") {
			var n = e.nextFormID++;
			e = e.idPrefix + n;
			try {
				var r = t.$$FORM_ACTION(e);
				return r && r.data?.forEach($e), r;
			} catch (e) {
				if (typeof e == "object" && e && typeof e.then == "function") throw e;
			}
		}
		return null;
	}
	function tt(e, t, n, r, i, a, o, s) {
		var c = null;
		if (typeof r == "function") {
			var l = et(t, r);
			l === null ? (e.push(Ge, L("formAction"), Ke, Xe, q), o = a = i = r = s = null, lt(t, n)) : (s = l.name, r = l.action || "", i = l.encType, a = l.method, o = l.target, c = l.data);
		}
		return s != null && nt(e, "name", s), r != null && nt(e, "formAction", r), i != null && nt(e, "formEncType", i), a != null && nt(e, "formMethod", a), o != null && nt(e, "formTarget", o), c;
	}
	function nt(e, t, n) {
		switch (t) {
			case "className":
				Ye(e, "class", n);
				break;
			case "tabIndex":
				Ye(e, "tabindex", n);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Ye(e, t, n);
				break;
			case "style":
				We(e, n);
				break;
			case "src":
			case "href": if (n === "") break;
			case "action":
			case "formAction":
				if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = le("" + n), e.push(Ge, L(t), Ke, L(W(n)), q);
				break;
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "ref": break;
			case "autoFocus":
			case "multiple":
			case "muted":
				Je(e, t.toLowerCase(), n);
				break;
			case "xlinkHref":
				if (typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = le("" + n), e.push(Ge, L("xlink:href"), Ke, L(W(n)), q);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				typeof n != "function" && typeof n != "symbol" && e.push(Ge, L(t), Ke, L(W(n)), q);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				n && typeof n != "function" && typeof n != "symbol" && e.push(Ge, L(t), qe);
				break;
			case "capture":
			case "download":
				!0 === n ? e.push(Ge, L(t), qe) : !1 !== n && typeof n != "function" && typeof n != "symbol" && e.push(Ge, L(t), Ke, L(W(n)), q);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n && e.push(Ge, L(t), Ke, L(W(n)), q);
				break;
			case "rowSpan":
			case "start":
				typeof n == "function" || typeof n == "symbol" || isNaN(n) || e.push(Ge, L(t), Ke, L(W(n)), q);
				break;
			case "xlinkActuate":
				Ye(e, "xlink:actuate", n);
				break;
			case "xlinkArcrole":
				Ye(e, "xlink:arcrole", n);
				break;
			case "xlinkRole":
				Ye(e, "xlink:role", n);
				break;
			case "xlinkShow":
				Ye(e, "xlink:show", n);
				break;
			case "xlinkTitle":
				Ye(e, "xlink:title", n);
				break;
			case "xlinkType":
				Ye(e, "xlink:type", n);
				break;
			case "xmlBase":
				Ye(e, "xml:base", n);
				break;
			case "xmlLang":
				Ye(e, "xml:lang", n);
				break;
			case "xmlSpace":
				Ye(e, "xml:space", n);
				break;
			default: if ((!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = U.get(t) || t, re(t))) {
				switch (typeof n) {
					case "function":
					case "symbol": return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") return;
				}
				e.push(Ge, L(t), Ke, L(W(n)), q);
			}
		}
	}
	var rt = R(">"), it = R("/>");
	function at(e, t, n) {
		if (t != null) {
			if (n != null) throw Error(r(60));
			if (typeof t != "object" || !("__html" in t)) throw Error(r(61));
			t = t.__html, t != null && e.push(L("" + t));
		}
	}
	function ot(e) {
		var n = "";
		return t.Children.forEach(e, function(e) {
			e != null && (n += e);
		}), n;
	}
	var st = R(" selected=\"\""), ct = R("addEventListener(\"submit\",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute(\"formAction\");null!=f&&(e=f,b=null)}\"javascript:throw new Error('React form unexpectedly submitted.')\"===e&&(a.preventDefault(),b?(a=document.createElement(\"input\"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});");
	function lt(e, t) {
		if (!(e.instructions & 16)) {
			e.instructions |= 16;
			var n = t.preamble, r = t.bootstrapChunks;
			(n.htmlChunks || n.headChunks) && r.length === 0 ? (r.push(t.startInlineScript), rr(r, e), r.push(rt, ct, _e)) : r.unshift(t.startInlineScript, rt, ct, _e);
		}
	}
	var ut = R("<!--F!-->"), dt = R("<!--F-->");
	function ft(e, t) {
		for (var n in e.push(Et("link")), t) if (H.call(t, n)) {
			var i = t[n];
			if (i != null) switch (n) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
				default: nt(e, n, i);
			}
		}
		return e.push(it), null;
	}
	var pt = /(<\/|<)(s)(tyle)/gi;
	function mt(e, t, n, r) {
		return "" + t + (n === "s" ? "\\73 " : "\\53 ") + r;
	}
	function ht(e, t, n) {
		for (var i in e.push(Et(n)), t) if (H.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, n));
				default: nt(e, i, a);
			}
		}
		return e.push(it), null;
	}
	function gt(e, t) {
		e.push(Et("title"));
		var n = null, r = null, i;
		for (i in t) if (H.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: nt(e, i, a);
			}
		}
		return e.push(rt), t = Array.isArray(n) ? 2 > n.length ? n[0] : null : n, typeof t != "function" && typeof t != "symbol" && t != null && e.push(L(W("" + t))), at(e, r, n), e.push(At("title")), null;
	}
	var _t = R("<!--head-->"), vt = R("<!--body-->"), yt = R("<!--html-->");
	function bt(e, t) {
		e.push(Et("script"));
		var n = null, r = null, i;
		for (i in t) if (H.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: nt(e, i, a);
			}
		}
		return e.push(rt), at(e, r, n), typeof n == "string" && e.push(L(("" + n).replace(Te, G))), e.push(At("script")), null;
	}
	function xt(e, t, n) {
		e.push(Et(n));
		var r = n = null, i;
		for (i in t) if (H.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: nt(e, i, a);
			}
		}
		return e.push(rt), at(e, r, n), n;
	}
	function St(e, t, n) {
		e.push(Et(n));
		var r = n = null, i;
		for (i in t) if (H.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: nt(e, i, a);
			}
		}
		return e.push(rt), at(e, r, n), typeof n == "string" ? (e.push(L(W(n))), null) : n;
	}
	var Ct = R("\n"), wt = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Tt = /* @__PURE__ */ new Map();
	function Et(e) {
		var t = Tt.get(e);
		if (t === void 0) {
			if (!wt.test(e)) throw Error(r(65, e));
			t = R("<" + e), Tt.set(e, t);
		}
		return t;
	}
	var Dt = R("<!DOCTYPE html>");
	function Ot(e, t, n, i, a, o, s, c, l) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path": break;
			case "a":
				e.push(Et("a"));
				var u = null, d = null, f;
				for (f in n) if (H.call(n, f)) {
					var p = n[f];
					if (p != null) switch (f) {
						case "children":
							u = p;
							break;
						case "dangerouslySetInnerHTML":
							d = p;
							break;
						case "href":
							p === "" ? Ye(e, "href", "") : nt(e, f, p);
							break;
						default: nt(e, f, p);
					}
				}
				if (e.push(rt), at(e, d, u), typeof u == "string") {
					e.push(L(W(u)));
					var m = null;
				} else m = u;
				return m;
			case "g":
			case "p":
			case "li": break;
			case "select":
				e.push(Et("select"));
				var h = null, g = null, _;
				for (_ in n) if (H.call(n, _)) {
					var v = n[_];
					if (v != null) switch (_) {
						case "children":
							h = v;
							break;
						case "dangerouslySetInnerHTML":
							g = v;
							break;
						case "defaultValue":
						case "value": break;
						default: nt(e, _, v);
					}
				}
				return e.push(rt), at(e, g, h), h;
			case "option":
				var y = c.selectedValue;
				e.push(Et("option"));
				var b = null, x = null, S = null, w = null, T;
				for (T in n) if (H.call(n, T)) {
					var E = n[T];
					if (E != null) switch (T) {
						case "children":
							b = E;
							break;
						case "selected":
							S = E;
							break;
						case "dangerouslySetInnerHTML":
							w = E;
							break;
						case "value": x = E;
						default: nt(e, T, E);
					}
				}
				if (y != null) {
					var D = x === null ? ot(b) : "" + x;
					if (C(y)) {
						for (var O = 0; O < y.length; O++) if ("" + y[O] === D) {
							e.push(st);
							break;
						}
					} else "" + y === D && e.push(st);
				} else S && e.push(st);
				return e.push(rt), at(e, w, b), b;
			case "textarea":
				e.push(Et("textarea"));
				var k = null, A = null, j = null, M;
				for (M in n) if (H.call(n, M)) {
					var N = n[M];
					if (N != null) switch (M) {
						case "children":
							j = N;
							break;
						case "value":
							k = N;
							break;
						case "defaultValue":
							A = N;
							break;
						case "dangerouslySetInnerHTML": throw Error(r(91));
						default: nt(e, M, N);
					}
				}
				if (k === null && A !== null && (k = A), e.push(rt), j != null) {
					if (k != null) throw Error(r(92));
					if (C(j)) {
						if (1 < j.length) throw Error(r(93));
						k = "" + j[0];
					}
					k = "" + j;
				}
				return typeof k == "string" && k[0] === "\n" && e.push(Ct), k !== null && e.push(L(W("" + k))), null;
			case "input":
				e.push(Et("input"));
				var P = null, F = null, I = null, R = null, z = null, B = null, ee = null, te = null, ne = null, ie;
				for (ie in n) if (H.call(n, ie)) {
					var U = n[ie];
					if (U != null) switch (ie) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(399, "input"));
						case "name":
							P = U;
							break;
						case "formAction":
							F = U;
							break;
						case "formEncType":
							I = U;
							break;
						case "formMethod":
							R = U;
							break;
						case "formTarget":
							z = U;
							break;
						case "defaultChecked":
							ne = U;
							break;
						case "defaultValue":
							ee = U;
							break;
						case "checked":
							te = U;
							break;
						case "value":
							B = U;
							break;
						default: nt(e, ie, U);
					}
				}
				var ae = tt(e, i, a, F, I, R, z, P);
				return te === null ? ne !== null && Je(e, "checked", ne) : Je(e, "checked", te), B === null ? ee !== null && nt(e, "value", ee) : nt(e, "value", B), e.push(it), ae?.forEach(Qe, e), null;
			case "button":
				e.push(Et("button"));
				var oe = null, se = null, ce = null, ue = null, de = null, fe = null, pe = null, he;
				for (he in n) if (H.call(n, he)) {
					var ge = n[he];
					if (ge != null) switch (he) {
						case "children":
							oe = ge;
							break;
						case "dangerouslySetInnerHTML":
							se = ge;
							break;
						case "name":
							ce = ge;
							break;
						case "formAction":
							ue = ge;
							break;
						case "formEncType":
							de = ge;
							break;
						case "formMethod":
							fe = ge;
							break;
						case "formTarget":
							pe = ge;
							break;
						default: nt(e, he, ge);
					}
				}
				var _e = tt(e, i, a, ue, de, fe, pe, ce);
				if (e.push(rt), _e?.forEach(Qe, e), at(e, se, oe), typeof oe == "string") {
					e.push(L(W(oe)));
					var ve = null;
				} else ve = oe;
				return ve;
			case "form":
				e.push(Et("form"));
				var ye = null, be = null, xe = null, Se = null, Ce = null, we = null, Te;
				for (Te in n) if (H.call(n, Te)) {
					var G = n[Te];
					if (G != null) switch (Te) {
						case "children":
							ye = G;
							break;
						case "dangerouslySetInnerHTML":
							be = G;
							break;
						case "action":
							xe = G;
							break;
						case "encType":
							Se = G;
							break;
						case "method":
							Ce = G;
							break;
						case "target":
							we = G;
							break;
						default: nt(e, Te, G);
					}
				}
				var Ee = null, De = null;
				if (typeof xe == "function") {
					var Oe = et(i, xe);
					Oe === null ? (e.push(Ge, L("action"), Ke, Xe, q), we = Ce = Se = xe = null, lt(i, a)) : (xe = Oe.action || "", Se = Oe.encType, Ce = Oe.method, we = Oe.target, Ee = Oe.data, De = Oe.name);
				}
				if (xe != null && nt(e, "action", xe), Se != null && nt(e, "encType", Se), Ce != null && nt(e, "method", Ce), we != null && nt(e, "target", we), e.push(rt), De !== null && (e.push(Ze), Ye(e, "name", De), e.push(it), Ee?.forEach(Qe, e)), at(e, be, ye), typeof ye == "string") {
					e.push(L(W(ye)));
					var ke = null;
				} else ke = ye;
				return ke;
			case "menuitem":
				for (var Ae in e.push(Et("menuitem")), n) if (H.call(n, Ae)) {
					var je = n[Ae];
					if (je != null) switch (Ae) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(400));
						default: nt(e, Ae, je);
					}
				}
				return e.push(rt), null;
			case "object":
				e.push(Et("object"));
				var Me = null, Ne = null, Pe;
				for (Pe in n) if (H.call(n, Pe)) {
					var Fe = n[Pe];
					if (Fe != null) switch (Pe) {
						case "children":
							Me = Fe;
							break;
						case "dangerouslySetInnerHTML":
							Ne = Fe;
							break;
						case "data":
							var K = le("" + Fe);
							if (K === "") break;
							e.push(Ge, L("data"), Ke, L(W(K)), q);
							break;
						default: nt(e, Pe, Fe);
					}
				}
				if (e.push(rt), at(e, Ne, Me), typeof Me == "string") {
					e.push(L(W(Me)));
					var Ie = null;
				} else Ie = Me;
				return Ie;
			case "title":
				var Le = c.tagScope & 1, ze = c.tagScope & 4;
				if (c.insertionMode === 4 || Le || n.itemProp != null) var Be = gt(e, n);
				else ze ? Be = null : (gt(a.hoistableChunks, n), Be = void 0);
				return Be;
			case "link":
				var Ve = c.tagScope & 1, He = c.tagScope & 4, Ue = n.rel, qe = n.href, $e = n.precedence;
				if (c.insertionMode === 4 || Ve || n.itemProp != null || typeof Ue != "string" || typeof qe != "string" || qe === "") {
					ft(e, n);
					var ct = null;
				} else if (n.rel === "stylesheet") if (typeof $e != "string" || n.disabled != null || n.onLoad || n.onError) ct = ft(e, n);
				else {
					var ut = a.styles.get($e), dt = i.styleResources.hasOwnProperty(qe) ? i.styleResources[qe] : void 0;
					if (dt !== null) {
						i.styleResources[qe] = null, ut || (ut = {
							precedence: L(W($e)),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set($e, ut));
						var wt = {
							state: 0,
							props: V({}, n, {
								"data-precedence": n.precedence,
								precedence: null
							})
						};
						if (dt) {
							dt.length === 2 && vr(wt.props, dt);
							var Tt = a.preloads.stylesheets.get(qe);
							Tt && 0 < Tt.length ? Tt.length = 0 : wt.state = 1;
						}
						ut.sheets.set(qe, wt), s && s.stylesheets.add(wt);
					} else if (ut) {
						var Ot = ut.sheets.get(qe);
						Ot && s && s.stylesheets.add(Ot);
					}
					l && e.push(Re), ct = null;
				}
				else n.onLoad || n.onError ? ct = ft(e, n) : (l && e.push(Re), ct = He ? null : ft(a.hoistableChunks, n));
				return ct;
			case "script":
				var kt = c.tagScope & 1, jt = n.async;
				if (typeof n.src != "string" || !n.src || !jt || typeof jt == "function" || typeof jt == "symbol" || n.onLoad || n.onError || c.insertionMode === 4 || kt || n.itemProp != null) var Mt = bt(e, n);
				else {
					var J = n.src;
					if (n.type === "module") var Nt = i.moduleScriptResources, Pt = a.preloads.moduleScripts;
					else Nt = i.scriptResources, Pt = a.preloads.scripts;
					var Ft = Nt.hasOwnProperty(J) ? Nt[J] : void 0;
					if (Ft !== null) {
						Nt[J] = null;
						var It = n;
						if (Ft) {
							Ft.length === 2 && (It = V({}, n), vr(It, Ft));
							var Lt = Pt.get(J);
							Lt && (Lt.length = 0);
						}
						var Rt = [];
						a.scripts.add(Rt), bt(Rt, It);
					}
					l && e.push(Re), Mt = null;
				}
				return Mt;
			case "style":
				var zt = c.tagScope & 1, Bt = n.precedence, Vt = n.href, Ht = n.nonce;
				if (c.insertionMode === 4 || zt || n.itemProp != null || typeof Bt != "string" || typeof Vt != "string" || Vt === "") {
					e.push(Et("style"));
					var Ut = null, Wt = null, Gt;
					for (Gt in n) if (H.call(n, Gt)) {
						var Kt = n[Gt];
						if (Kt != null) switch (Gt) {
							case "children":
								Ut = Kt;
								break;
							case "dangerouslySetInnerHTML":
								Wt = Kt;
								break;
							default: nt(e, Gt, Kt);
						}
					}
					e.push(rt);
					var qt = Array.isArray(Ut) ? 2 > Ut.length ? Ut[0] : null : Ut;
					typeof qt != "function" && typeof qt != "symbol" && qt != null && e.push(L(("" + qt).replace(pt, mt))), at(e, Wt, Ut), e.push(At("style"));
					var Jt = null;
				} else {
					var Yt = a.styles.get(Bt);
					if ((i.styleResources.hasOwnProperty(Vt) ? i.styleResources[Vt] : void 0) !== null) {
						i.styleResources[Vt] = null, Yt || (Yt = {
							precedence: L(W(Bt)),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set(Bt, Yt));
						var Xt = a.nonce.style;
						if (!Xt || Xt === Ht) {
							Yt.hrefs.push(L(W(Vt)));
							var Zt = Yt.rules, Y = null, Qt = null, $t;
							for ($t in n) if (H.call(n, $t)) {
								var en = n[$t];
								if (en != null) switch ($t) {
									case "children":
										Y = en;
										break;
									case "dangerouslySetInnerHTML": Qt = en;
								}
							}
							var tn = Array.isArray(Y) ? 2 > Y.length ? Y[0] : null : Y;
							typeof tn != "function" && typeof tn != "symbol" && tn != null && Zt.push(L(("" + tn).replace(pt, mt))), at(Zt, Qt, Y);
						}
					}
					Yt && s && s.styles.add(Yt), l && e.push(Re), Jt = void 0;
				}
				return Jt;
			case "meta":
				var nn = c.tagScope & 1, rn = c.tagScope & 4;
				if (c.insertionMode === 4 || nn || n.itemProp != null) var an = ht(e, n, "meta");
				else l && e.push(Re), an = rn ? null : typeof n.charSet == "string" ? ht(a.charsetChunks, n, "meta") : n.name === "viewport" ? ht(a.viewportChunks, n, "meta") : ht(a.hoistableChunks, n, "meta");
				return an;
			case "listing":
			case "pre":
				e.push(Et(t));
				var on = null, sn = null, cn;
				for (cn in n) if (H.call(n, cn)) {
					var ln = n[cn];
					if (ln != null) switch (cn) {
						case "children":
							on = ln;
							break;
						case "dangerouslySetInnerHTML":
							sn = ln;
							break;
						default: nt(e, cn, ln);
					}
				}
				if (e.push(rt), sn != null) {
					if (on != null) throw Error(r(60));
					if (typeof sn != "object" || !("__html" in sn)) throw Error(r(61));
					var un = sn.__html;
					un != null && (typeof un == "string" && 0 < un.length && un[0] === "\n" ? e.push(Ct, L(un)) : e.push(L("" + un)));
				}
				return typeof on == "string" && on[0] === "\n" && e.push(Ct), on;
			case "img":
				var dn = c.tagScope & 3, fn = n.src, pn = n.srcSet;
				if (!(n.loading === "lazy" || !fn && !pn || typeof fn != "string" && fn != null || typeof pn != "string" && pn != null || n.fetchPriority === "low" || dn) && (typeof fn != "string" || fn[4] !== ":" || fn[0] !== "d" && fn[0] !== "D" || fn[1] !== "a" && fn[1] !== "A" || fn[2] !== "t" && fn[2] !== "T" || fn[3] !== "a" && fn[3] !== "A") && (typeof pn != "string" || pn[4] !== ":" || pn[0] !== "d" && pn[0] !== "D" || pn[1] !== "a" && pn[1] !== "A" || pn[2] !== "t" && pn[2] !== "T" || pn[3] !== "a" && pn[3] !== "A")) {
					s !== null && c.tagScope & 64 && (s.suspenseyImages = !0);
					var mn = typeof n.sizes == "string" ? n.sizes : void 0, hn = pn ? pn + "\n" + (mn || "") : fn, gn = a.preloads.images, _n = gn.get(hn);
					if (_n) (n.fetchPriority === "high" || 10 > a.highImagePreloads.size) && (gn.delete(hn), a.highImagePreloads.add(_n));
					else if (!i.imageResources.hasOwnProperty(hn)) {
						i.imageResources[hn] = me;
						var vn = n.crossOrigin, yn = typeof vn == "string" ? vn === "use-credentials" ? vn : "" : void 0, bn = a.headers, xn;
						bn && 0 < bn.remainingCapacity && typeof n.srcSet != "string" && (n.fetchPriority === "high" || 500 > bn.highImagePreloads.length) && (xn = yr(fn, "image", {
							imageSrcSet: n.srcSet,
							imageSizes: n.sizes,
							crossOrigin: yn,
							integrity: n.integrity,
							nonce: n.nonce,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.refererPolicy
						}), 0 <= (bn.remainingCapacity -= xn.length + 2)) ? (a.resets.image[hn] = me, bn.highImagePreloads && (bn.highImagePreloads += ", "), bn.highImagePreloads += xn) : (_n = [], ft(_n, {
							rel: "preload",
							as: "image",
							href: pn ? void 0 : fn,
							imageSrcSet: pn,
							imageSizes: mn,
							crossOrigin: yn,
							integrity: n.integrity,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.referrerPolicy
						}), n.fetchPriority === "high" || 10 > a.highImagePreloads.size ? a.highImagePreloads.add(_n) : (a.bulkPreloads.add(_n), gn.set(hn, _n)));
					}
				}
				return ht(e, n, "img");
			case "base":
			case "area":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "param":
			case "source":
			case "track":
			case "wbr": return ht(e, n, t);
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": break;
			case "head":
				if (2 > c.insertionMode) {
					var Sn = o || a.preamble;
					if (Sn.headChunks) throw Error(r(545, "`<head>`"));
					o !== null && e.push(_t), Sn.headChunks = [];
					var Cn = xt(Sn.headChunks, n, "head");
				} else Cn = St(e, n, "head");
				return Cn;
			case "body":
				if (2 > c.insertionMode) {
					var wn = o || a.preamble;
					if (wn.bodyChunks) throw Error(r(545, "`<body>`"));
					o !== null && e.push(vt), wn.bodyChunks = [];
					var Tn = xt(wn.bodyChunks, n, "body");
				} else Tn = St(e, n, "body");
				return Tn;
			case "html":
				if (c.insertionMode === 0) {
					var En = o || a.preamble;
					if (En.htmlChunks) throw Error(r(545, "`<html>`"));
					o !== null && e.push(yt), En.htmlChunks = [Dt];
					var Dn = xt(En.htmlChunks, n, "html");
				} else Dn = St(e, n, "html");
				return Dn;
			default: if (t.indexOf("-") !== -1) {
				e.push(Et(t));
				var On = null, kn = null, An;
				for (An in n) if (H.call(n, An)) {
					var jn = n[An];
					if (jn != null) {
						var Mn = An;
						switch (An) {
							case "children":
								On = jn;
								break;
							case "dangerouslySetInnerHTML":
								kn = jn;
								break;
							case "style":
								We(e, jn);
								break;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "ref": break;
							case "className": Mn = "class";
							default: if (re(An) && typeof jn != "function" && typeof jn != "symbol" && !1 !== jn) {
								if (!0 === jn) jn = "";
								else if (typeof jn == "object") continue;
								e.push(Ge, L(Mn), Ke, L(W(jn)), q);
							}
						}
					}
				}
				return e.push(rt), at(e, kn, On), On;
			}
		}
		return St(e, n, t);
	}
	var kt = /* @__PURE__ */ new Map();
	function At(e) {
		var t = kt.get(e);
		return t === void 0 && (t = R("</" + e + ">"), kt.set(e, t)), t;
	}
	function jt(e, t) {
		e = e.preamble, e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks), e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks), e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks);
	}
	function Mt(e, t) {
		t = t.bootstrapChunks;
		for (var n = 0; n < t.length - 1; n++) N(e, t[n]);
		return n < t.length ? (n = t[n], t.length = 0, P(e, n)) : !0;
	}
	var J = R("requestAnimationFrame(function(){$RT=performance.now()});"), Nt = R("<template id=\""), Pt = R("\"></template>"), Ft = R("<!--&-->"), It = R("<!--/&-->"), Lt = R("<!--$-->"), Rt = R("<!--$?--><template id=\""), zt = R("\"></template>"), Bt = R("<!--$!-->"), Vt = R("<!--/$-->"), Ht = R("<template"), Ut = R("\""), Wt = R(" data-dgst=\"");
	R(" data-msg=\""), R(" data-stck=\""), R(" data-cstck=\"");
	var Gt = R("></template>");
	function Kt(e, t, n) {
		if (N(e, Rt), n === null) throw Error(r(395));
		return N(e, t.boundaryPrefix), N(e, L(n.toString(16))), P(e, zt);
	}
	var qt = R("<div hidden id=\""), Jt = R("\">"), Yt = R("</div>"), Xt = R("<svg aria-hidden=\"true\" style=\"display:none\" id=\""), Zt = R("\">"), Y = R("</svg>"), Qt = R("<math aria-hidden=\"true\" style=\"display:none\" id=\""), $t = R("\">"), en = R("</math>"), tn = R("<table hidden id=\""), nn = R("\">"), rn = R("</table>"), an = R("<table hidden><tbody id=\""), on = R("\">"), sn = R("</tbody></table>"), cn = R("<table hidden><tr id=\""), ln = R("\">"), un = R("</tr></table>"), dn = R("<table hidden><colgroup id=\""), fn = R("\">"), pn = R("</colgroup></table>");
	function mn(e, t, n, i) {
		switch (n.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return N(e, qt), N(e, t.segmentPrefix), N(e, L(i.toString(16))), P(e, Jt);
			case 4: return N(e, Xt), N(e, t.segmentPrefix), N(e, L(i.toString(16))), P(e, Zt);
			case 5: return N(e, Qt), N(e, t.segmentPrefix), N(e, L(i.toString(16))), P(e, $t);
			case 6: return N(e, tn), N(e, t.segmentPrefix), N(e, L(i.toString(16))), P(e, nn);
			case 7: return N(e, an), N(e, t.segmentPrefix), N(e, L(i.toString(16))), P(e, on);
			case 8: return N(e, cn), N(e, t.segmentPrefix), N(e, L(i.toString(16))), P(e, ln);
			case 9: return N(e, dn), N(e, t.segmentPrefix), N(e, L(i.toString(16))), P(e, fn);
			default: throw Error(r(397));
		}
	}
	function hn(e, t) {
		switch (t.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return P(e, Yt);
			case 4: return P(e, Y);
			case 5: return P(e, en);
			case 6: return P(e, rn);
			case 7: return P(e, sn);
			case 8: return P(e, un);
			case 9: return P(e, pn);
			default: throw Error(r(397));
		}
	}
	var gn = R("$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS(\""), _n = R("$RS(\""), vn = R("\",\""), yn = R("\")<\/script>");
	R("<template data-rsi=\"\" data-sid=\""), R("\" data-pid=\"");
	var bn = R("$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d||\"/&\"===d)if(0===h)break;else h--;else\"$\"!==d&&\"$?\"!==d&&\"$~\"!==d&&\"$!\"!==d&&\"&\"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data=\"$\";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data=\"$~\",$RB.push(a,b),2===$RB.length&&(\"number\"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};");
	L("$RV=function(A,g){function k(a,b){var e=a.getAttribute(b);e&&(b=a.style,l.push(a,b.viewTransitionName,b.viewTransitionClass),\"auto\"!==e&&(b.viewTransitionClass=e),(a=a.getAttribute(\"vt-name\"))||(a=\"_T_\"+K++ +\"_\"),b.viewTransitionName=a,B=!0)}var B=!1,K=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var h=g[f].querySelectorAll(\"[vt-share]\"),d=0;d<h.length;d++){var c=h[d];m.set(c.getAttribute(\"vt-name\"),c)}var u=[];for(h=0;h<g.length;h+=2){var C=g[h],x=C.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){c=C;for(f=0;c;){if(8===c.nodeType){var r=c.data;if(\"/$\"===r)if(0===f)break;else f--;else\"$\"!==r&&\"$?\"!==r&&\"$~\"!==r&&\"$!\"!==r||f++}else if(1===c.nodeType){d=c;var D=d.getAttribute(\"vt-name\"),y=m.get(D);k(d,y?\"vt-share\":\"vt-exit\");y&&(k(y,\"vt-share\"),m.set(D,null));var E=d.querySelectorAll(\"[vt-share]\");for(d=0;d<E.length;d++){var F=E[d],G=F.getAttribute(\"vt-name\"),\nH=m.get(G);H&&(k(F,\"vt-share\"),k(H,\"vt-share\"),m.set(G,null))}}c=c.nextSibling}for(var I=g[h+1],t=I.firstElementChild;t;)null!==m.get(t.getAttribute(\"vt-name\"))&&k(t,\"vt-enter\"),t=t.nextElementSibling;c=x;do for(var n=c.firstElementChild;n;){var J=n.getAttribute(\"vt-update\");J&&\"none\"!==J&&!l.includes(n)&&k(n,\"vt-update\");n=n.nextElementSibling}while((c=c.parentNode)&&1===c.nodeType&&\"none\"!==c.getAttribute(\"vt-update\"));u.push.apply(u,I.querySelectorAll('img[src]:not([loading=\"lazy\"])'))}}}if(B){var z=\ndocument.__reactViewTransition=document.startViewTransition({update:function(){A(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],b={},e=0;e<u.length;b={g:b.g},e++)if(b.g=u[e],!b.g.complete){var p=b.g.getBoundingClientRect();0<p.bottom&&0<p.right&&p.top<window.innerHeight&&p.left<window.innerWidth&&(p=new Promise(function(w){return function(q){w.g.addEventListener(\"load\",q);w.g.addEventListener(\"error\",q)}}(b)),a.push(p))}return Promise.race([Promise.all(a),new Promise(function(w){var q=\nperformance.now();setTimeout(w,2300>q&&2E3<q?2300-q:500)})])},types:[]});z.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var b=l[a],e=b.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];\"\"===b.getAttribute(\"style\")&&b.removeAttribute(\"style\")}});z.finished.finally(function(){document.__reactViewTransition===z&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}A(g)}.bind(null,$RV);");
	var xn = R("$RC(\""), Sn = R("$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll(\"link[data-precedence],style[data-precedence]\"),v=[],k=0;b=e[k++];)\"not all\"===b.getAttribute(\"media\")?v.push(b):(\"LINK\"===b.tagName&&$RM.set(b.getAttribute(\"href\"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement(\"link\");a.href=d;a.rel=\n\"stylesheet\";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute(\"media\");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute(\"data-precedence\");a.removeAttribute(\"media\")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=\n\"$~\";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,\"CSS failed to load\"))};$RR(\""), Cn = R("$RR(\""), wn = R("\",\""), Tn = R("\","), En = R("\""), Dn = R(")<\/script>");
	R("<template data-rci=\"\" data-bid=\""), R("<template data-rri=\"\" data-bid=\""), R("\" data-sid=\""), R("\" data-sty=\"");
	var On = R("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};"), kn = R("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX(\""), An = R("$RX(\""), jn = R("\""), Mn = R(","), Nn = R(")<\/script>");
	R("<template data-rxi=\"\" data-bid=\""), R("\" data-dgst=\""), R("\" data-msg=\""), R("\" data-stck=\""), R("\" data-cstck=\"");
	var Pn = /[<\u2028\u2029]/g;
	function Fn(e) {
		return JSON.stringify(e).replace(Pn, function(e) {
			switch (e) {
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var In = /[&><\u2028\u2029]/g;
	function Ln(e) {
		return JSON.stringify(e).replace(In, function(e) {
			switch (e) {
				case "&": return "\\u0026";
				case ">": return "\\u003e";
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var Rn = R(" media=\"not all\" data-precedence=\""), zn = R("\" data-href=\""), Bn = R("\">"), X = R("</style>"), Vn = !1, Hn = !0;
	function Un(e) {
		var t = e.rules, n = e.hrefs, r = 0;
		if (n.length) {
			for (N(this, he.startInlineStyle), N(this, Rn), N(this, e.precedence), N(this, zn); r < n.length - 1; r++) N(this, n[r]), N(this, Xn);
			for (N(this, n[r]), N(this, Bn), r = 0; r < t.length; r++) N(this, t[r]);
			Hn = P(this, X), Vn = !0, t.length = 0, n.length = 0;
		}
	}
	function Wn(e) {
		return e.state === 2 ? !1 : Vn = !0;
	}
	function Gn(e, t, n) {
		return Vn = !1, Hn = !0, he = n, t.styles.forEach(Un, e), he = null, t.stylesheets.forEach(Wn), Vn && (n.stylesToHoist = !0), Hn;
	}
	function Z(e) {
		for (var t = 0; t < e.length; t++) N(this, e[t]);
		e.length = 0;
	}
	var Kn = [];
	function qn(e) {
		ft(Kn, e.props);
		for (var t = 0; t < Kn.length; t++) N(this, Kn[t]);
		Kn.length = 0, e.state = 2;
	}
	var Jn = R(" data-precedence=\""), Yn = R("\" data-href=\""), Xn = R(" "), Zn = R("\">"), Qn = R("</style>");
	function $n(e) {
		var t = 0 < e.sheets.size;
		e.sheets.forEach(qn, this), e.sheets.clear();
		var n = e.rules, r = e.hrefs;
		if (!t || r.length) {
			if (N(this, he.startInlineStyle), N(this, Jn), N(this, e.precedence), e = 0, r.length) {
				for (N(this, Yn); e < r.length - 1; e++) N(this, r[e]), N(this, Xn);
				N(this, r[e]);
			}
			for (N(this, Zn), e = 0; e < n.length; e++) N(this, n[e]);
			N(this, Qn), n.length = 0, r.length = 0;
		}
	}
	function er(e) {
		if (e.state === 0) {
			e.state = 1;
			var t = e.props;
			for (ft(Kn, {
				rel: "preload",
				as: "style",
				href: e.props.href,
				crossOrigin: t.crossOrigin,
				fetchPriority: t.fetchPriority,
				integrity: t.integrity,
				media: t.media,
				hrefLang: t.hrefLang,
				referrerPolicy: t.referrerPolicy
			}), e = 0; e < Kn.length; e++) N(this, Kn[e]);
			Kn.length = 0;
		}
	}
	function tr(e) {
		e.sheets.forEach(er, this), e.sheets.clear();
	}
	R("<link rel=\"expect\" href=\"#"), R("\" blocking=\"render\"/>");
	var nr = R(" id=\"");
	function rr(e, t) {
		!(t.instructions & 32) && (t.instructions |= 32, e.push(nr, L(W("_" + t.idPrefix + "R_")), q));
	}
	var ir = R("["), ar = R(",["), or = R(","), sr = R("]");
	function cr(e, t) {
		N(e, ir);
		var n = ir;
		t.stylesheets.forEach(function(t) {
			if (t.state !== 2) if (t.state === 3) N(e, n), N(e, L(Ln("" + t.props.href))), N(e, sr), n = ar;
			else {
				N(e, n);
				var i = t.props["data-precedence"], a = t.props;
				for (var o in N(e, L(Ln(le("" + t.props.href)))), i = "" + i, N(e, or), N(e, L(Ln(i))), a) if (H.call(a, o) && (i = a[o], i != null)) switch (o) {
					case "href":
					case "rel":
					case "precedence":
					case "data-precedence": break;
					case "children":
					case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
					default: lr(e, o, i);
				}
				N(e, sr), n = ar, t.state = 3;
			}
		}), N(e, sr);
	}
	function lr(e, t, n) {
		var r = t.toLowerCase();
		switch (typeof n) {
			case "function":
			case "symbol": return;
		}
		switch (t) {
			case "innerHTML":
			case "dangerouslySetInnerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "style":
			case "ref": return;
			case "className":
				r = "class", t = "" + n;
				break;
			case "hidden":
				if (!1 === n) return;
				t = "";
				break;
			case "src":
			case "href":
				n = le(n), t = "" + n;
				break;
			default:
				if (2 < t.length && (t[0] === "o" || t[0] === "O") && (t[1] === "n" || t[1] === "N") || !re(t)) return;
				t = "" + n;
		}
		N(e, or), N(e, L(Ln(r))), N(e, or), N(e, L(Ln(t)));
	}
	function ur() {
		return {
			styles: /* @__PURE__ */ new Set(),
			stylesheets: /* @__PURE__ */ new Set(),
			suspenseyImages: !1
		};
	}
	function dr(e) {
		var t = Gi || null;
		if (t) {
			var n = t.resumableState, r = t.renderState;
			if (typeof e == "string" && e) {
				if (!n.dnsResources.hasOwnProperty(e)) {
					n.dnsResources[e] = null, n = r.headers;
					var i, a;
					(a = n && 0 < n.remainingCapacity) && (a = (i = "<" + ("" + e).replace(br, xr) + ">; rel=dns-prefetch", 0 <= (n.remainingCapacity -= i.length + 2))), a ? (r.resets.dns[e] = null, n.preconnects && (n.preconnects += ", "), n.preconnects += i) : (i = [], ft(i, {
						href: e,
						rel: "dns-prefetch"
					}), r.preconnects.add(i));
				}
				Va(t);
			}
		} else pe.D(e);
	}
	function fr(e, t) {
		var n = Gi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (typeof e == "string" && e) {
				var a = t === "use-credentials" ? "credentials" : typeof t == "string" ? "anonymous" : "default";
				if (!r.connectResources[a].hasOwnProperty(e)) {
					r.connectResources[a][e] = null, r = i.headers;
					var o, s;
					if (s = r && 0 < r.remainingCapacity) {
						if (s = "<" + ("" + e).replace(br, xr) + ">; rel=preconnect", typeof t == "string") {
							var c = ("" + t).replace(Sr, Cr);
							s += "; crossorigin=\"" + c + "\"";
						}
						s = (o = s, 0 <= (r.remainingCapacity -= o.length + 2));
					}
					s ? (i.resets.connect[a][e] = null, r.preconnects && (r.preconnects += ", "), r.preconnects += o) : (a = [], ft(a, {
						rel: "preconnect",
						href: e,
						crossOrigin: t
					}), i.preconnects.add(a));
				}
				Va(n);
			}
		} else pe.C(e, t);
	}
	function pr(e, t, n) {
		var r = Gi || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (t && e) {
				switch (t) {
					case "image":
						if (n) var o = n.imageSrcSet, s = n.imageSizes, c = n.fetchPriority;
						var l = o ? o + "\n" + (s || "") : e;
						if (i.imageResources.hasOwnProperty(l)) return;
						i.imageResources[l] = me, i = a.headers;
						var u;
						i && 0 < i.remainingCapacity && typeof o != "string" && c === "high" && (u = yr(e, t, n), 0 <= (i.remainingCapacity -= u.length + 2)) ? (a.resets.image[l] = me, i.highImagePreloads && (i.highImagePreloads += ", "), i.highImagePreloads += u) : (i = [], ft(i, V({
							rel: "preload",
							href: o ? void 0 : e,
							as: t
						}, n)), c === "high" ? a.highImagePreloads.add(i) : (a.bulkPreloads.add(i), a.preloads.images.set(l, i)));
						break;
					case "style":
						if (i.styleResources.hasOwnProperty(e)) return;
						o = [], ft(o, V({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.styleResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? me : [n.crossOrigin, n.integrity], a.preloads.stylesheets.set(e, o), a.bulkPreloads.add(o);
						break;
					case "script":
						if (i.scriptResources.hasOwnProperty(e)) return;
						o = [], a.preloads.scripts.set(e, o), a.bulkPreloads.add(o), ft(o, V({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.scriptResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? me : [n.crossOrigin, n.integrity];
						break;
					default:
						if (i.unknownResources.hasOwnProperty(t)) {
							if (o = i.unknownResources[t], o.hasOwnProperty(e)) return;
						} else o = {}, i.unknownResources[t] = o;
						if (o[e] = me, (i = a.headers) && 0 < i.remainingCapacity && t === "font" && (l = yr(e, t, n), 0 <= (i.remainingCapacity -= l.length + 2))) a.resets.font[e] = me, i.fontPreloads && (i.fontPreloads += ", "), i.fontPreloads += l;
						else switch (i = [], e = V({
							rel: "preload",
							href: e,
							as: t
						}, n), ft(i, e), t) {
							case "font":
								a.fontPreloads.add(i);
								break;
							default: a.bulkPreloads.add(i);
						}
				}
				Va(r);
			}
		} else pe.L(e, t, n);
	}
	function mr(e, t) {
		var n = Gi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = t && typeof t.as == "string" ? t.as : "script";
				switch (a) {
					case "script":
						if (r.moduleScriptResources.hasOwnProperty(e)) return;
						a = [], r.moduleScriptResources[e] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? me : [t.crossOrigin, t.integrity], i.preloads.moduleScripts.set(e, a);
						break;
					default:
						if (r.moduleUnknownResources.hasOwnProperty(a)) {
							var o = r.unknownResources[a];
							if (o.hasOwnProperty(e)) return;
						} else o = {}, r.moduleUnknownResources[a] = o;
						a = [], o[e] = me;
				}
				ft(a, V({
					rel: "modulepreload",
					href: e
				}, t)), i.bulkPreloads.add(a), Va(n);
			}
		} else pe.m(e, t);
	}
	function hr(e, t, n) {
		var r = Gi || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (e) {
				t ||= "default";
				var o = a.styles.get(t), s = i.styleResources.hasOwnProperty(e) ? i.styleResources[e] : void 0;
				s !== null && (i.styleResources[e] = null, o || (o = {
					precedence: L(W(t)),
					rules: [],
					hrefs: [],
					sheets: /* @__PURE__ */ new Map()
				}, a.styles.set(t, o)), t = {
					state: 0,
					props: V({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n)
				}, s && (s.length === 2 && vr(t.props, s), (a = a.preloads.stylesheets.get(e)) && 0 < a.length ? a.length = 0 : t.state = 1), o.sheets.set(e, t), Va(r));
			}
		} else pe.S(e, t, n);
	}
	function gr(e, t) {
		var n = Gi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.scriptResources.hasOwnProperty(e) ? r.scriptResources[e] : void 0;
				a !== null && (r.scriptResources[e] = null, t = V({
					src: e,
					async: !0
				}, t), a && (a.length === 2 && vr(t, a), e = i.preloads.scripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), bt(e, t), Va(n));
			}
		} else pe.X(e, t);
	}
	function _r(e, t) {
		var n = Gi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.moduleScriptResources.hasOwnProperty(e) ? r.moduleScriptResources[e] : void 0;
				a !== null && (r.moduleScriptResources[e] = null, t = V({
					src: e,
					type: "module",
					async: !0
				}, t), a && (a.length === 2 && vr(t, a), e = i.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), bt(e, t), Va(n));
			}
		} else pe.M(e, t);
	}
	function vr(e, t) {
		e.crossOrigin ??= t[0], e.integrity ??= t[1];
	}
	function yr(e, t, n) {
		for (var r in e = ("" + e).replace(br, xr), t = ("" + t).replace(Sr, Cr), t = "<" + e + ">; rel=preload; as=\"" + t + "\"", n) H.call(n, r) && (e = n[r], typeof e == "string" && (t += "; " + r.toLowerCase() + "=\"" + ("" + e).replace(Sr, Cr) + "\""));
		return t;
	}
	var br = /[<>\r\n]/g;
	function xr(e) {
		switch (e) {
			case "<": return "%3C";
			case ">": return "%3E";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	var Sr = /["';,\r\n]/g;
	function Cr(e) {
		switch (e) {
			case "\"": return "%22";
			case "'": return "%27";
			case ";": return "%3B";
			case ",": return "%2C";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	function wr(e) {
		this.styles.add(e);
	}
	function Tr(e) {
		this.stylesheets.add(e);
	}
	function Er(e, t) {
		t.styles.forEach(wr, e), t.stylesheets.forEach(Tr, e), t.suspenseyImages && (e.suspenseyImages = !0);
	}
	function Dr(e) {
		return 0 < e.stylesheets.size || e.suspenseyImages;
	}
	var Or = Function.prototype.bind, kr = Symbol.for("react.client.reference");
	function Ar(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === kr ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case o: return "Fragment";
			case c: return "Profiler";
			case s: return "StrictMode";
			case f: return "Suspense";
			case p: return "SuspenseList";
			case _: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case a: return "Portal";
			case u: return e.displayName || "Context";
			case l: return (e._context.displayName || "Context") + ".Consumer";
			case d:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case m: return t = e.displayName || null, t === null ? Ar(e.type) || "Memo" : t;
			case h:
				t = e._payload, e = e._init;
				try {
					return Ar(e(t));
				} catch {}
		}
		return null;
	}
	var jr = {}, Mr = null;
	function Nr(e, t) {
		if (e !== t) {
			e.context._currentValue = e.parentValue, e = e.parent;
			var n = t.parent;
			if (e === null) {
				if (n !== null) throw Error(r(401));
			} else {
				if (n === null) throw Error(r(401));
				Nr(e, n);
			}
			t.context._currentValue = t.value;
		}
	}
	function Pr(e) {
		e.context._currentValue = e.parentValue, e = e.parent, e !== null && Pr(e);
	}
	function Fr(e) {
		var t = e.parent;
		t !== null && Fr(t), e.context._currentValue = e.value;
	}
	function Ir(e, t) {
		if (e.context._currentValue = e.parentValue, e = e.parent, e === null) throw Error(r(402));
		e.depth === t.depth ? Nr(e, t) : Ir(e, t);
	}
	function Lr(e, t) {
		var n = t.parent;
		if (n === null) throw Error(r(402));
		e.depth === n.depth ? Nr(e, n) : Lr(e, n), t.context._currentValue = t.value;
	}
	function Rr(e) {
		var t = Mr;
		t !== e && (t === null ? Fr(e) : e === null ? Pr(t) : t.depth === e.depth ? Nr(t, e) : t.depth > e.depth ? Ir(t, e) : Lr(t, e), Mr = e);
	}
	var zr = {
		enqueueSetState: function(e, t) {
			e = e._reactInternals, e.queue !== null && e.queue.push(t);
		},
		enqueueReplaceState: function(e, t) {
			e = e._reactInternals, e.replace = !0, e.queue = [t];
		},
		enqueueForceUpdate: function() {}
	}, Br = {
		id: 1,
		overflow: ""
	};
	function Vr(e, t, n) {
		var r = e.id;
		e = e.overflow;
		var i = 32 - Hr(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Hr(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			return a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, {
				id: 1 << 32 - Hr(t) + i | n << i | r,
				overflow: a + e
			};
		}
		return {
			id: 1 << a | n << i | r,
			overflow: e
		};
	}
	var Hr = Math.clz32 ? Math.clz32 : Gr, Ur = Math.log, Wr = Math.LN2;
	function Gr(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ur(e) / Wr | 0) | 0;
	}
	function Kr() {}
	var qr = Error(r(460));
	function Jr(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Kr, Kr), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw t.reason;
			default:
				switch (typeof t.status == "string" ? t.then(Kr, Kr) : (e = t, e.status = "pending", e.then(function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "fulfilled", n.value = e;
					}
				}, function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "rejected", n.reason = e;
					}
				})), t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw t.reason;
				}
				throw Yr = t, qr;
		}
	}
	var Yr = null;
	function Xr() {
		if (Yr === null) throw Error(r(459));
		var e = Yr;
		return Yr = null, e;
	}
	function Zr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Qr = typeof Object.is == "function" ? Object.is : Zr, $r = null, ei = null, ti = null, ni = null, ri = null, ii = null, ai = !1, oi = !1, si = 0, ci = 0, li = -1, ui = 0, di = null, fi = null, pi = 0;
	function mi() {
		if ($r === null) throw Error(r(321));
		return $r;
	}
	function hi() {
		if (0 < pi) throw Error(r(312));
		return {
			memoizedState: null,
			queue: null,
			next: null
		};
	}
	function gi() {
		return ii === null ? ri === null ? (ai = !1, ri = ii = hi()) : (ai = !0, ii = ri) : ii.next === null ? (ai = !1, ii = ii.next = hi()) : (ai = !0, ii = ii.next), ii;
	}
	function _i() {
		var e = di;
		return di = null, e;
	}
	function vi() {
		ni = ti = ei = $r = null, oi = !1, ri = null, pi = 0, ii = fi = null;
	}
	function yi(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function bi(e, t, n) {
		if ($r = mi(), ii = gi(), ai) {
			var r = ii.queue;
			if (t = r.dispatch, fi !== null && (n = fi.get(r), n !== void 0)) {
				fi.delete(r), r = ii.memoizedState;
				do
					r = e(r, n.action), n = n.next;
				while (n !== null);
				return ii.memoizedState = r, [r, t];
			}
			return [ii.memoizedState, t];
		}
		return e = e === yi ? typeof t == "function" ? t() : t : n === void 0 ? t : n(t), ii.memoizedState = e, e = ii.queue = {
			last: null,
			dispatch: null
		}, e = e.dispatch = Si.bind(null, $r, e), [ii.memoizedState, e];
	}
	function xi(e, t) {
		if ($r = mi(), ii = gi(), t = t === void 0 ? null : t, ii !== null) {
			var n = ii.memoizedState;
			if (n !== null && t !== null) {
				var r = n[1];
				a: if (r === null) r = !1;
				else {
					for (var i = 0; i < r.length && i < t.length; i++) if (!Qr(t[i], r[i])) {
						r = !1;
						break a;
					}
					r = !0;
				}
				if (r) return n[0];
			}
		}
		return e = e(), ii.memoizedState = [e, t], e;
	}
	function Si(e, t, n) {
		if (25 <= pi) throw Error(r(301));
		if (e === $r) if (oi = !0, e = {
			action: n,
			next: null
		}, fi === null && (fi = /* @__PURE__ */ new Map()), n = fi.get(t), n === void 0) fi.set(t, e);
		else {
			for (t = n; t.next !== null;) t = t.next;
			t.next = e;
		}
	}
	function Ci() {
		throw Error(r(440));
	}
	function wi() {
		throw Error(r(394));
	}
	function Ti() {
		throw Error(r(479));
	}
	function Ei(e, t, n) {
		mi();
		var r = ci++, i = ti;
		if (typeof e.$$FORM_ACTION == "function") {
			var a = null, o = ni;
			i = i.formState;
			var s = e.$$IS_SIGNATURE_EQUAL;
			if (i !== null && typeof s == "function") {
				var c = i[1];
				s.call(e, i[2], i[3]) && (a = n === void 0 ? "k" + w(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n, c === a && (li = r, t = i[0]));
			}
			var l = e.bind(null, t);
			return e = function(e) {
				l(e);
			}, typeof l.$$FORM_ACTION == "function" && (e.$$FORM_ACTION = function(e) {
				e = l.$$FORM_ACTION(e), n !== void 0 && (n += "", e.action = n);
				var t = e.data;
				return t && (a === null && (a = n === void 0 ? "k" + w(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n), t.append("$ACTION_KEY", a)), e;
			}), [
				t,
				e,
				!1
			];
		}
		var u = e.bind(null, t);
		return [
			t,
			function(e) {
				u(e);
			},
			!1
		];
	}
	function Di(e) {
		var t = ui;
		return ui += 1, di === null && (di = []), Jr(di, e, t);
	}
	function Oi() {
		throw Error(r(393));
	}
	var ki = {
		readContext: function(e) {
			return e._currentValue;
		},
		use: function(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Di(e);
				if (e.$$typeof === u) return e._currentValue;
			}
			throw Error(r(438, String(e)));
		},
		useContext: function(e) {
			return mi(), e._currentValue;
		},
		useMemo: xi,
		useReducer: bi,
		useRef: function(e) {
			$r = mi(), ii = gi();
			var t = ii.memoizedState;
			return t === null ? (e = { current: e }, ii.memoizedState = e) : t;
		},
		useState: function(e) {
			return bi(yi, e);
		},
		useInsertionEffect: Kr,
		useLayoutEffect: Kr,
		useCallback: function(e, t) {
			return xi(function() {
				return e;
			}, t);
		},
		useImperativeHandle: Kr,
		useEffect: Kr,
		useDebugValue: Kr,
		useDeferredValue: function(e, t) {
			return mi(), t === void 0 ? e : t;
		},
		useTransition: function() {
			return mi(), [!1, wi];
		},
		useId: function() {
			var e = ei.treeContext, t = e.overflow;
			e = e.id, e = (e & ~(1 << 32 - Hr(e) - 1)).toString(32) + t;
			var n = Ai;
			if (n === null) throw Error(r(404));
			return t = si++, e = "_" + n.idPrefix + "R_" + e, 0 < t && (e += "H" + t.toString(32)), e + "_";
		},
		useSyncExternalStore: function(e, t, n) {
			if (n === void 0) throw Error(r(407));
			return n();
		},
		useOptimistic: function(e) {
			return mi(), [e, Ti];
		},
		useActionState: Ei,
		useFormState: Ei,
		useHostTransitionStatus: function() {
			return mi(), fe;
		},
		useMemoCache: function(e) {
			for (var t = Array(e), n = 0; n < e; n++) t[n] = y;
			return t;
		},
		useCacheRefresh: function() {
			return Oi;
		},
		useEffectEvent: function() {
			return Ci;
		}
	}, Ai = null, ji = {
		getCacheForType: function() {
			throw Error(r(248));
		},
		cacheSignal: function() {
			throw Error(r(248));
		}
	}, Mi, Ni;
	function Pi(e) {
		if (Mi === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Mi = t && t[1] || "", Ni = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Mi + e + Ni;
	}
	var Fi = !1;
	function Ii(e, t) {
		if (!e || Fi) return "";
		Fi = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Fi = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Pi(n) : "";
	}
	function Li(e) {
		if (typeof e == "string") return Pi(e);
		if (typeof e == "function") return e.prototype && e.prototype.isReactComponent ? Ii(e, !0) : Ii(e, !1);
		if (typeof e == "object" && e) {
			switch (e.$$typeof) {
				case d: return Ii(e.render, !1);
				case m: return Ii(e.type, !1);
				case h:
					var t = e, n = t._payload;
					t = t._init;
					try {
						e = t(n);
					} catch {
						return Pi("Lazy");
					}
					return Li(e);
			}
			if (typeof e.name == "string") {
				a: {
					n = e.name, t = e.env;
					var r = e.debugLocation;
					if (r != null && (e = Error.prepareStackTrace, Error.prepareStackTrace = void 0, r = r.stack, Error.prepareStackTrace = e, r.startsWith("Error: react-stack-top-frame\n") && (r = r.slice(29)), e = r.indexOf("\n"), e !== -1 && (r = r.slice(e + 1)), e = r.indexOf("react_stack_bottom_frame"), e !== -1 && (e = r.lastIndexOf("\n", e)), e = e === -1 ? "" : r = r.slice(0, e), r = e.lastIndexOf("\n"), e = r === -1 ? e : e.slice(r + 1), e.indexOf(n) !== -1)) {
						n = "\n" + e;
						break a;
					}
					n = Pi(n + (t ? " [" + t + "]" : ""));
				}
				return n;
			}
		}
		switch (e) {
			case p: return Pi("SuspenseList");
			case f: return Pi("Suspense");
		}
		return "";
	}
	function Ri(e, t) {
		return (500 < t.byteSize || Dr(t.contentState)) && t.contentPreamble === null;
	}
	function zi(e) {
		if (typeof e == "object" && e && typeof e.environmentName == "string") {
			var t = e.environmentName;
			e = [e].slice(0), typeof e[0] == "string" ? e.splice(0, 1, "%c%s%c " + e[0], "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", "") : e.splice(0, 0, "%c%s%c", "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", ""), e.unshift(console), t = Or.apply(console.error, e), t();
		} else console.error(e);
		return null;
	}
	function Bi(e, t, n, r, i, a, o, s, c, l, u) {
		var d = /* @__PURE__ */ new Set();
		this.destination = null, this.flushScheduled = !1, this.resumableState = e, this.renderState = t, this.rootFormatContext = n, this.progressiveChunkSize = r === void 0 ? 12800 : r, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = d, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = i === void 0 ? zi : i, this.onPostpone = l === void 0 ? Kr : l, this.onAllReady = a === void 0 ? Kr : a, this.onShellReady = o === void 0 ? Kr : o, this.onShellError = s === void 0 ? Kr : s, this.onFatalError = c === void 0 ? Kr : c, this.formState = u === void 0 ? null : u;
	}
	function Vi(e, t, n, r, i, a, o, s, c, l, u, d) {
		return t = new Bi(t, n, r, i, a, o, s, c, l, u, d), n = Xi(t, 0, null, r, !1, !1), n.parentFlushed = !0, e = Ji(t, null, e, -1, null, n, null, null, t.abortableTasks, null, r, null, Br, null, null), Zi(e), t.pingedTasks.push(e), t;
	}
	function Hi(e, t, n, r, i, a, o, s, c, l, u) {
		return e = Vi(e, t, n, r, i, a, o, s, c, l, u, void 0), e.trackedPostpones = {
			workingMap: /* @__PURE__ */ new Map(),
			rootNodes: [],
			rootSlots: null
		}, e;
	}
	function Ui(e, t, n, r, i, a, o, s, c) {
		return n = new Bi(t.resumableState, n, t.rootFormatContext, t.progressiveChunkSize, r, i, a, o, s, c, null), n.nextSegmentId = t.nextSegmentId, typeof t.replaySlots == "number" ? (r = Xi(n, 0, null, t.rootFormatContext, !1, !1), r.parentFlushed = !0, e = Ji(n, null, e, -1, null, r, null, null, n.abortableTasks, null, t.rootFormatContext, null, Br, null, null), Zi(e), n.pingedTasks.push(e), n) : (e = Yi(n, null, {
			nodes: t.replayNodes,
			slots: t.replaySlots,
			pendingTasks: 0
		}, e, -1, null, null, n.abortableTasks, null, t.rootFormatContext, null, Br, null, null), Zi(e), n.pingedTasks.push(e), n);
	}
	function Wi(e, t, n, r, i, a, o, s, c) {
		return e = Ui(e, t, n, r, i, a, o, s, c), e.trackedPostpones = {
			workingMap: /* @__PURE__ */ new Map(),
			rootNodes: [],
			rootSlots: null
		}, e;
	}
	var Gi = null;
	function Ki(e, t) {
		e.pingedTasks.push(t), e.pingedTasks.length === 1 && (e.flushScheduled = e.destination !== null, e.trackedPostpones !== null || e.status === 10 ? A(function() {
			return Oa(e);
		}) : D(function() {
			return Oa(e);
		}));
	}
	function qi(e, t, n, r, i) {
		return n = {
			status: 0,
			rootSegmentID: -1,
			parentFlushed: !1,
			pendingTasks: 0,
			row: t,
			completedSegments: [],
			byteSize: 0,
			fallbackAbortableTasks: n,
			errorDigest: null,
			contentState: ur(),
			fallbackState: ur(),
			contentPreamble: r,
			fallbackPreamble: i,
			trackedContentKeyPath: null,
			trackedFallbackNode: null
		}, t !== null && (t.pendingTasks++, r = t.boundaries, r !== null && (e.allPendingTasks++, n.pendingTasks++, r.push(n)), e = t.inheritedHoistables, e !== null && Er(n.contentState, e)), n;
	}
	function Ji(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
		e.allPendingTasks++, i === null ? e.pendingRootTasks++ : i.pendingTasks++, p !== null && p.pendingTasks++;
		var h = {
			replay: null,
			node: n,
			childIndex: r,
			ping: function() {
				return Ki(e, h);
			},
			blockedBoundary: i,
			blockedSegment: a,
			blockedPreamble: o,
			hoistableState: s,
			abortSet: c,
			keyPath: l,
			formatContext: u,
			context: d,
			treeContext: f,
			row: p,
			componentStack: m,
			thenableState: t
		};
		return c.add(h), h;
	}
	function Yi(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.allPendingTasks++, a === null ? e.pendingRootTasks++ : a.pendingTasks++, f !== null && f.pendingTasks++, n.pendingTasks++;
		var m = {
			replay: n,
			node: r,
			childIndex: i,
			ping: function() {
				return Ki(e, m);
			},
			blockedBoundary: a,
			blockedSegment: null,
			blockedPreamble: null,
			hoistableState: o,
			abortSet: s,
			keyPath: c,
			formatContext: l,
			context: u,
			treeContext: d,
			row: f,
			componentStack: p,
			thenableState: t
		};
		return s.add(m), m;
	}
	function Xi(e, t, n, r, i, a) {
		return {
			status: 0,
			parentFlushed: !1,
			id: -1,
			index: t,
			chunks: [],
			children: [],
			preambleChildren: [],
			parentFormatContext: r,
			boundary: n,
			lastPushedText: i,
			textEmbedded: a
		};
	}
	function Zi(e) {
		var t = e.node;
		if (typeof t == "object" && t) switch (t.$$typeof) {
			case i: e.componentStack = {
				parent: e.componentStack,
				type: t.type
			};
		}
	}
	function Qi(e) {
		return e === null ? null : {
			parent: e.parent,
			type: "Suspense Fallback"
		};
	}
	function $i(e) {
		var t = {};
		return e && Object.defineProperty(t, "componentStack", {
			configurable: !0,
			enumerable: !0,
			get: function() {
				try {
					var n = "", r = e;
					do
						n += Li(r.type), r = r.parent;
					while (r);
					var i = n;
				} catch (e) {
					i = "\nError generating stack: " + e.message + "\n" + e.stack;
				}
				return Object.defineProperty(t, "componentStack", { value: i }), i;
			}
		}), t;
	}
	function ea(e, t, n) {
		if (e = e.onError, t = e(t, n), t == null || typeof t == "string") return t;
	}
	function ta(e, t) {
		var n = e.onShellError, r = e.onFatalError;
		n(t), r(t), e.destination === null ? (e.status = 13, e.fatalError = t) : (e.status = 14, B(e.destination, t));
	}
	function na(e, t) {
		ra(e, t.next, t.hoistables);
	}
	function ra(e, t, n) {
		for (; t !== null;) {
			n !== null && (Er(t.hoistables, n), t.inheritedHoistables = n);
			var r = t.boundaries;
			if (r !== null) {
				t.boundaries = null;
				for (var i = 0; i < r.length; i++) {
					var a = r[i];
					n !== null && Er(a.contentState, n), Da(e, a, null, null);
				}
			}
			if (t.pendingTasks--, 0 < t.pendingTasks) break;
			n = t.hoistables, t = t.next;
		}
	}
	function Q(e, t) {
		var n = t.boundaries;
		if (n !== null && t.pendingTasks === n.length) {
			for (var r = !0, i = 0; i < n.length; i++) {
				var a = n[i];
				if (a.pendingTasks !== 1 || a.parentFlushed || Ri(e, a)) {
					r = !1;
					break;
				}
			}
			r && ra(e, t, t.hoistables);
		}
	}
	function ia(e) {
		var t = {
			pendingTasks: 1,
			boundaries: null,
			hoistables: ur(),
			inheritedHoistables: null,
			together: !1,
			next: null
		};
		return e !== null && 0 < e.pendingTasks && (t.pendingTasks++, t.boundaries = [], e.next = t), t;
	}
	function aa(e, t, n, r, i) {
		var a = t.keyPath, o = t.treeContext, s = t.row;
		t.keyPath = n, n = r.length;
		var c = null;
		if (t.replay !== null) {
			var l = t.replay.slots;
			if (typeof l == "object" && l) for (var u = 0; u < n; u++) {
				var d = i !== "backwards" && i !== "unstable_legacy-backwards" ? u : n - 1 - u, f = r[d];
				t.row = c = ia(c), t.treeContext = Vr(o, n, d);
				var p = l[d];
				typeof p == "number" ? (la(e, t, p, f, d), delete l[d]) : va(e, t, f, d), --c.pendingTasks === 0 && na(e, c);
			}
			else for (l = 0; l < n; l++) u = i !== "backwards" && i !== "unstable_legacy-backwards" ? l : n - 1 - l, d = r[u], t.row = c = ia(c), t.treeContext = Vr(o, n, u), va(e, t, d, u), --c.pendingTasks === 0 && na(e, c);
		} else if (i !== "backwards" && i !== "unstable_legacy-backwards") for (i = 0; i < n; i++) l = r[i], t.row = c = ia(c), t.treeContext = Vr(o, n, i), va(e, t, l, i), --c.pendingTasks === 0 && na(e, c);
		else {
			for (i = t.blockedSegment, l = i.children.length, u = i.chunks.length, d = n - 1; 0 <= d; d--) {
				f = r[d], t.row = c = ia(c), t.treeContext = Vr(o, n, d), p = Xi(e, u, null, t.formatContext, d === 0 ? i.lastPushedText : !0, !0), i.children.splice(l, 0, p), t.blockedSegment = p;
				try {
					va(e, t, f, d), p.lastPushedText && p.textEmbedded && p.chunks.push(Re), p.status = 1, Ea(e, t.blockedBoundary, p), --c.pendingTasks === 0 && na(e, c);
				} catch (t) {
					throw p.status = e.status === 12 ? 3 : 4, t;
				}
			}
			t.blockedSegment = i, i.lastPushedText = !1;
		}
		s !== null && c !== null && 0 < c.pendingTasks && (s.pendingTasks++, c.next = s), t.treeContext = o, t.row = s, t.keyPath = a;
	}
	function oa(e, t, n, r, i, a) {
		var o = t.thenableState;
		for (t.thenableState = null, $r = {}, ei = t, ti = e, ni = n, ci = si = 0, li = -1, ui = 0, di = o, e = r(i, a); oi;) oi = !1, ci = si = 0, li = -1, ui = 0, pi += 1, ii = null, e = r(i, a);
		return vi(), e;
	}
	function sa(e, t, n, r, i, a, o) {
		var s = !1;
		if (a !== 0 && e.formState !== null) {
			var c = t.blockedSegment;
			if (c !== null) {
				s = !0, c = c.chunks;
				for (var l = 0; l < a; l++) l === o ? c.push(ut) : c.push(dt);
			}
		}
		a = t.keyPath, t.keyPath = n, i ? (n = t.treeContext, t.treeContext = Vr(n, 1, 0), va(e, t, r, -1), t.treeContext = n) : s ? va(e, t, r, -1) : ua(e, t, r, -1), t.keyPath = a;
	}
	function ca(e, t, n, i, a, y) {
		if (typeof i == "function") if (i.prototype && i.prototype.isReactComponent) {
			var x = a;
			if ("ref" in a) for (var w in x = {}, a) w !== "ref" && (x[w] = a[w]);
			var T = i.defaultProps;
			if (T) for (var E in x === a && (x = V({}, x, a)), T) x[E] === void 0 && (x[E] = T[E]);
			a = x, x = jr, T = i.contextType, typeof T == "object" && T && (x = T._currentValue), x = new i(a, x);
			var D = x.state === void 0 ? null : x.state;
			if (x.updater = zr, x.props = a, x.state = D, T = {
				queue: [],
				replace: !1
			}, x._reactInternals = T, y = i.contextType, x.context = typeof y == "object" && y ? y._currentValue : jr, y = i.getDerivedStateFromProps, typeof y == "function" && (y = y(a, D), D = y == null ? D : V({}, D, y), x.state = D), typeof i.getDerivedStateFromProps != "function" && typeof x.getSnapshotBeforeUpdate != "function" && (typeof x.UNSAFE_componentWillMount == "function" || typeof x.componentWillMount == "function")) if (i = x.state, typeof x.componentWillMount == "function" && x.componentWillMount(), typeof x.UNSAFE_componentWillMount == "function" && x.UNSAFE_componentWillMount(), i !== x.state && zr.enqueueReplaceState(x, x.state, null), T.queue !== null && 0 < T.queue.length) if (i = T.queue, y = T.replace, T.queue = null, T.replace = !1, y && i.length === 1) x.state = i[0];
			else {
				for (T = y ? i[0] : x.state, D = !0, y = +!!y; y < i.length; y++) E = i[y], E = typeof E == "function" ? E.call(x, T, a, void 0) : E, E != null && (D ? (D = !1, T = V({}, T, E)) : V(T, E));
				x.state = T;
			}
			else T.queue = null;
			if (i = x.render(), e.status === 12) throw null;
			a = t.keyPath, t.keyPath = n, ua(e, t, i, -1), t.keyPath = a;
		} else {
			if (i = oa(e, t, n, i, a, void 0), e.status === 12) throw null;
			sa(e, t, n, i, si !== 0, ci, li);
		}
		else if (typeof i == "string") if (x = t.blockedSegment, x === null) x = a.children, T = t.formatContext, D = t.keyPath, t.formatContext = Fe(T, i, a), t.keyPath = n, va(e, t, x, -1), t.formatContext = T, t.keyPath = D;
		else {
			if (D = Ot(x.chunks, i, a, e.resumableState, e.renderState, t.blockedPreamble, t.hoistableState, t.formatContext, x.lastPushedText), x.lastPushedText = !1, T = t.formatContext, y = t.keyPath, t.keyPath = n, (t.formatContext = Fe(T, i, a)).insertionMode === 3) {
				n = Xi(e, 0, null, t.formatContext, !1, !1), x.preambleChildren.push(n), t.blockedSegment = n;
				try {
					n.status = 6, va(e, t, D, -1), n.lastPushedText && n.textEmbedded && n.chunks.push(Re), n.status = 1, Ea(e, t.blockedBoundary, n);
				} finally {
					t.blockedSegment = x;
				}
			} else va(e, t, D, -1);
			t.formatContext = T, t.keyPath = y;
			a: {
				switch (t = x.chunks, e = e.resumableState, i) {
					case "title":
					case "style":
					case "script":
					case "area":
					case "base":
					case "br":
					case "col":
					case "embed":
					case "hr":
					case "img":
					case "input":
					case "keygen":
					case "link":
					case "meta":
					case "param":
					case "source":
					case "track":
					case "wbr": break a;
					case "body":
						if (1 >= T.insertionMode) {
							e.hasBody = !0;
							break a;
						}
						break;
					case "html":
						if (T.insertionMode === 0) {
							e.hasHtml = !0;
							break a;
						}
						break;
					case "head": if (1 >= T.insertionMode) break a;
				}
				t.push(At(i));
			}
			x.lastPushedText = !1;
		}
		else {
			switch (i) {
				case v:
				case s:
				case c:
				case o:
					i = t.keyPath, t.keyPath = n, ua(e, t, a.children, -1), t.keyPath = i;
					return;
				case _:
					i = t.blockedSegment, i === null ? a.mode !== "hidden" && (i = t.keyPath, t.keyPath = n, va(e, t, a.children, -1), t.keyPath = i) : a.mode !== "hidden" && (i.chunks.push(Ft), i.lastPushedText = !1, x = t.keyPath, t.keyPath = n, va(e, t, a.children, -1), t.keyPath = x, i.chunks.push(It), i.lastPushedText = !1);
					return;
				case p:
					a: {
						if (i = a.children, a = a.revealOrder, a === "forwards" || a === "backwards" || a === "unstable_legacy-backwards") {
							if (C(i)) {
								aa(e, t, n, i, a);
								break a;
							}
							if ((x = S(i)) && (x = x.call(i))) {
								if (T = x.next(), !T.done) {
									do
										T = x.next();
									while (!T.done);
									aa(e, t, n, i, a);
								}
								break a;
							}
						}
						a === "together" ? (a = t.keyPath, x = t.row, T = t.row = ia(null), T.boundaries = [], T.together = !0, t.keyPath = n, ua(e, t, i, -1), --T.pendingTasks === 0 && na(e, T), t.keyPath = a, t.row = x, x !== null && 0 < T.pendingTasks && (x.pendingTasks++, T.next = x)) : (a = t.keyPath, t.keyPath = n, ua(e, t, i, -1), t.keyPath = a);
					}
					return;
				case b:
				case g: throw Error(r(343));
				case f:
					a: if (t.replay !== null) {
						i = t.keyPath, x = t.formatContext, T = t.row, t.keyPath = n, t.formatContext = Le(e.resumableState, x), t.row = null, n = a.children;
						try {
							va(e, t, n, -1);
						} finally {
							t.keyPath = i, t.formatContext = x, t.row = T;
						}
					} else {
						i = t.keyPath, y = t.formatContext;
						var O = t.row;
						E = t.blockedBoundary, w = t.blockedPreamble;
						var k = t.hoistableState, A = t.blockedSegment, j = a.fallback;
						a = a.children;
						var M = /* @__PURE__ */ new Set(), N = 2 > t.formatContext.insertionMode ? qi(e, t.row, M, je(), je()) : qi(e, t.row, M, null, null);
						e.trackedPostpones !== null && (N.trackedContentKeyPath = n);
						var P = Xi(e, A.chunks.length, N, t.formatContext, !1, !1);
						A.children.push(P), A.lastPushedText = !1;
						var F = Xi(e, 0, null, t.formatContext, !1, !1);
						if (F.parentFlushed = !0, e.trackedPostpones !== null) {
							x = t.componentStack, T = [
								n[0],
								"Suspense Fallback",
								n[2]
							], D = [
								T[1],
								T[2],
								[],
								null
							], e.trackedPostpones.workingMap.set(T, D), N.trackedFallbackNode = D, t.blockedSegment = P, t.blockedPreamble = N.fallbackPreamble, t.keyPath = T, t.formatContext = Ie(e.resumableState, y), t.componentStack = Qi(x), P.status = 6;
							try {
								va(e, t, j, -1), P.lastPushedText && P.textEmbedded && P.chunks.push(Re), P.status = 1, Ea(e, E, P);
							} catch (t) {
								throw P.status = e.status === 12 ? 3 : 4, t;
							} finally {
								t.blockedSegment = A, t.blockedPreamble = w, t.keyPath = i, t.formatContext = y;
							}
							t = Ji(e, null, a, -1, N, F, N.contentPreamble, N.contentState, t.abortSet, n, Le(e.resumableState, t.formatContext), t.context, t.treeContext, null, x), Zi(t), e.pingedTasks.push(t);
						} else {
							t.blockedBoundary = N, t.blockedPreamble = N.contentPreamble, t.hoistableState = N.contentState, t.blockedSegment = F, t.keyPath = n, t.formatContext = Le(e.resumableState, y), t.row = null, F.status = 6;
							try {
								if (va(e, t, a, -1), F.lastPushedText && F.textEmbedded && F.chunks.push(Re), F.status = 1, Ea(e, N, F), Ta(N, F), N.pendingTasks === 0 && N.status === 0) {
									if (N.status = 1, !Ri(e, N)) {
										O !== null && --O.pendingTasks === 0 && na(e, O), e.pendingRootTasks === 0 && t.blockedPreamble && ja(e);
										break a;
									}
								} else O !== null && O.together && Q(e, O);
							} catch (n) {
								N.status = 4, e.status === 12 ? (F.status = 3, x = e.fatalError) : (F.status = 4, x = n), T = $i(t.componentStack), D = ea(e, x, T), N.errorDigest = D, ha(e, N);
							} finally {
								t.blockedBoundary = E, t.blockedPreamble = w, t.hoistableState = k, t.blockedSegment = A, t.keyPath = i, t.formatContext = y, t.row = O;
							}
							t = Ji(e, null, j, -1, E, P, N.fallbackPreamble, N.fallbackState, M, [
								n[0],
								"Suspense Fallback",
								n[2]
							], Ie(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, Qi(t.componentStack)), Zi(t), e.pingedTasks.push(t);
						}
					}
					return;
			}
			if (typeof i == "object" && i) switch (i.$$typeof) {
				case d:
					if ("ref" in a) for (A in x = {}, a) A !== "ref" && (x[A] = a[A]);
					else x = a;
					i = oa(e, t, n, i.render, x, y), sa(e, t, n, i, si !== 0, ci, li);
					return;
				case m:
					ca(e, t, n, i.type, a, y);
					return;
				case u:
					if (T = a.children, x = t.keyPath, a = a.value, D = i._currentValue, i._currentValue = a, y = Mr, Mr = i = {
						parent: y,
						depth: y === null ? 0 : y.depth + 1,
						context: i,
						parentValue: D,
						value: a
					}, t.context = i, t.keyPath = n, ua(e, t, T, -1), e = Mr, e === null) throw Error(r(403));
					e.context._currentValue = e.parentValue, e = Mr = e.parent, t.context = e, t.keyPath = x;
					return;
				case l:
					a = a.children, i = a(i._context._currentValue), a = t.keyPath, t.keyPath = n, ua(e, t, i, -1), t.keyPath = a;
					return;
				case h:
					if (x = i._init, i = x(i._payload), e.status === 12) throw null;
					ca(e, t, n, i, a, y);
					return;
			}
			throw Error(r(130, i == null ? i : typeof i, ""));
		}
	}
	function la(e, t, n, r, i) {
		var a = t.replay, o = t.blockedBoundary, s = Xi(e, 0, null, t.formatContext, !1, !1);
		s.id = n, s.parentFlushed = !0;
		try {
			t.replay = null, t.blockedSegment = s, va(e, t, r, i), s.status = 1, Ea(e, o, s), o === null ? e.completedRootSegment = s : (Ta(o, s), o.parentFlushed && e.partialBoundaries.push(o));
		} finally {
			t.replay = a, t.blockedSegment = null;
		}
	}
	function ua(e, t, n, r) {
		t.replay !== null && typeof t.replay.slots == "number" ? la(e, t, t.replay.slots, n, r) : (t.node = n, t.childIndex = r, n = t.componentStack, Zi(t), da(e, t), t.componentStack = n);
	}
	function da(e, t) {
		var n = t.node, o = t.childIndex;
		if (n !== null) {
			if (typeof n == "object") {
				switch (n.$$typeof) {
					case i:
						var s = n.type, c = n.key, l = n.props;
						n = l.ref;
						var d = n === void 0 ? null : n, p = Ar(s), m = c ?? (o === -1 ? 0 : o);
						if (c = [
							t.keyPath,
							p,
							m
						], t.replay !== null) a: {
							var g = t.replay;
							for (o = g.nodes, n = 0; n < o.length; n++) {
								var _ = o[n];
								if (m === _[1]) {
									if (_.length === 4) {
										if (p !== null && p !== _[0]) throw Error(r(490, _[0], p));
										var v = _[2];
										p = _[3], m = t.node, t.replay = {
											nodes: v,
											slots: p,
											pendingTasks: 1
										};
										try {
											if (ca(e, t, c, s, l, d), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
											t.replay.pendingTasks--;
										} catch (r) {
											if (typeof r == "object" && r && (r === qr || typeof r.then == "function")) throw t.node === m ? t.replay = g : o.splice(n, 1), r;
											t.replay.pendingTasks--, l = $i(t.componentStack), c = e, e = t.blockedBoundary, s = r, l = ea(c, s, l), ba(c, e, v, p, s, l);
										}
										t.replay = g;
									} else {
										if (s !== f) throw Error(r(490, "Suspense", Ar(s) || "Unknown"));
										b: {
											g = void 0, s = _[5], d = _[2], p = _[3], m = _[4] === null ? [] : _[4][2], _ = _[4] === null ? null : _[4][3];
											var y = t.keyPath, b = t.formatContext, x = t.row, w = t.replay, T = t.blockedBoundary, E = t.hoistableState, D = l.children, O = l.fallback, k = /* @__PURE__ */ new Set();
											l = 2 > t.formatContext.insertionMode ? qi(e, t.row, k, je(), je()) : qi(e, t.row, k, null, null), l.parentFlushed = !0, l.rootSegmentID = s, t.blockedBoundary = l, t.hoistableState = l.contentState, t.keyPath = c, t.formatContext = Le(e.resumableState, b), t.row = null, t.replay = {
												nodes: d,
												slots: p,
												pendingTasks: 1
											};
											try {
												if (va(e, t, D, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
												if (t.replay.pendingTasks--, l.pendingTasks === 0 && l.status === 0) {
													l.status = 1, e.completedBoundaries.push(l);
													break b;
												}
											} catch (n) {
												l.status = 4, v = $i(t.componentStack), g = ea(e, n, v), l.errorDigest = g, t.replay.pendingTasks--, e.clientRenderedBoundaries.push(l);
											} finally {
												t.blockedBoundary = T, t.hoistableState = E, t.replay = w, t.keyPath = y, t.formatContext = b, t.row = x;
											}
											v = Yi(e, null, {
												nodes: m,
												slots: _,
												pendingTasks: 0
											}, O, -1, T, l.fallbackState, k, [
												c[0],
												"Suspense Fallback",
												c[2]
											], Ie(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, Qi(t.componentStack)), Zi(v), e.pingedTasks.push(v);
										}
									}
									o.splice(n, 1);
									break a;
								}
							}
						}
						else ca(e, t, c, s, l, d);
						return;
					case a: throw Error(r(257));
					case h:
						if (v = n._init, n = v(n._payload), e.status === 12) throw null;
						ua(e, t, n, o);
						return;
				}
				if (C(n)) {
					fa(e, t, n, o);
					return;
				}
				if ((v = S(n)) && (v = v.call(n))) {
					if (n = v.next(), !n.done) {
						l = [];
						do
							l.push(n.value), n = v.next();
						while (!n.done);
						fa(e, t, l, o);
					}
					return;
				}
				if (typeof n.then == "function") return t.thenableState = null, ua(e, t, Di(n), o);
				if (n.$$typeof === u) return ua(e, t, n._currentValue, o);
				throw o = Object.prototype.toString.call(n), Error(r(31, o === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : o));
			}
			typeof n == "string" ? (o = t.blockedSegment, o !== null && (o.lastPushedText = ze(o.chunks, n, e.renderState, o.lastPushedText))) : (typeof n == "number" || typeof n == "bigint") && (o = t.blockedSegment, o !== null && (o.lastPushedText = ze(o.chunks, "" + n, e.renderState, o.lastPushedText)));
		}
	}
	function fa(e, t, n, i) {
		var a = t.keyPath;
		if (i !== -1 && (t.keyPath = [
			t.keyPath,
			"Fragment",
			i
		], t.replay !== null)) {
			for (var o = t.replay, s = o.nodes, c = 0; c < s.length; c++) {
				var l = s[c];
				if (l[1] === i) {
					i = l[2], l = l[3], t.replay = {
						nodes: i,
						slots: l,
						pendingTasks: 1
					};
					try {
						if (fa(e, t, n, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
						t.replay.pendingTasks--;
					} catch (r) {
						if (typeof r == "object" && r && (r === qr || typeof r.then == "function")) throw r;
						t.replay.pendingTasks--, n = $i(t.componentStack);
						var u = t.blockedBoundary, d = r;
						n = ea(e, d, n), ba(e, u, i, l, d, n);
					}
					t.replay = o, s.splice(c, 1);
					break;
				}
			}
			t.keyPath = a;
			return;
		}
		if (o = t.treeContext, s = n.length, t.replay !== null && (c = t.replay.slots, typeof c == "object" && c)) {
			for (i = 0; i < s; i++) l = n[i], t.treeContext = Vr(o, s, i), u = c[i], typeof u == "number" ? (la(e, t, u, l, i), delete c[i]) : va(e, t, l, i);
			t.treeContext = o, t.keyPath = a;
			return;
		}
		for (c = 0; c < s; c++) i = n[c], t.treeContext = Vr(o, s, c), va(e, t, i, c);
		t.treeContext = o, t.keyPath = a;
	}
	function pa(e, t, n) {
		if (n.status = 5, n.rootSegmentID = e.nextSegmentId++, e = n.trackedContentKeyPath, e === null) throw Error(r(486));
		var i = n.trackedFallbackNode, a = [], o = t.workingMap.get(e);
		return o === void 0 ? (n = [
			e[1],
			e[2],
			a,
			null,
			i,
			n.rootSegmentID
		], t.workingMap.set(e, n), Wa(n, e[0], t), n) : (o[4] = i, o[5] = n.rootSegmentID, o);
	}
	function ma(e, t, n, i) {
		i.status = 5;
		var a = n.keyPath, o = n.blockedBoundary;
		if (o === null) i.id = e.nextSegmentId++, t.rootSlots = i.id, e.completedRootSegment !== null && (e.completedRootSegment.status = 5);
		else {
			if (o !== null && o.status === 0) {
				var s = pa(e, t, o);
				if (o.trackedContentKeyPath === a && n.childIndex === -1) {
					i.id === -1 && (i.id = i.parentFlushed ? o.rootSegmentID : e.nextSegmentId++), s[3] = i.id;
					return;
				}
			}
			if (i.id === -1 && (i.id = i.parentFlushed && o !== null ? o.rootSegmentID : e.nextSegmentId++), n.childIndex === -1) a === null ? t.rootSlots = i.id : (n = t.workingMap.get(a), n === void 0 ? (n = [
				a[1],
				a[2],
				[],
				i.id
			], Wa(n, a[0], t)) : n[3] = i.id);
			else {
				if (a === null) {
					if (e = t.rootSlots, e === null) e = t.rootSlots = {};
					else if (typeof e == "number") throw Error(r(491));
				} else if (o = t.workingMap, s = o.get(a), s === void 0) e = {}, s = [
					a[1],
					a[2],
					[],
					e
				], o.set(a, s), Wa(s, a[0], t);
				else if (e = s[3], e === null) e = s[3] = {};
				else if (typeof e == "number") throw Error(r(491));
				e[n.childIndex] = i.id;
			}
		}
	}
	function ha(e, t) {
		e = e.trackedPostpones, e !== null && (t = t.trackedContentKeyPath, t !== null && (t = e.workingMap.get(t), t !== void 0 && (t.length = 4, t[2] = [], t[3] = null)));
	}
	function ga(e, t, n) {
		return Yi(e, n, t.replay, t.node, t.childIndex, t.blockedBoundary, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function _a(e, t, n) {
		var r = t.blockedSegment, i = Xi(e, r.chunks.length, null, t.formatContext, r.lastPushedText, !0);
		return r.children.push(i), r.lastPushedText = !1, Ji(e, n, t.node, t.childIndex, t.blockedBoundary, i, t.blockedPreamble, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function va(e, t, n, r) {
		var i = t.formatContext, a = t.context, o = t.keyPath, s = t.treeContext, c = t.componentStack, l = t.blockedSegment;
		if (l === null) {
			l = t.replay;
			try {
				return ua(e, t, n, r);
			} catch (u) {
				if (vi(), n = u === qr ? Xr() : u, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						r = u === qr ? _i() : null, e = ga(e, t, r).ping, n.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, Rr(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						n = u === qr ? _i() : null, n = ga(e, t, n), e.pingedTasks.push(n), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, Rr(a);
						return;
					}
				}
			}
		} else {
			var u = l.children.length, d = l.chunks.length;
			try {
				return ua(e, t, n, r);
			} catch (r) {
				if (vi(), l.children.length = u, l.chunks.length = d, n = r === qr ? Xr() : r, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						l = n, n = r === qr ? _i() : null, e = _a(e, t, n).ping, l.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, Rr(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						l = r === qr ? _i() : null, l = _a(e, t, l), e.pingedTasks.push(l), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, Rr(a);
						return;
					}
				}
			}
		}
		throw t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, Rr(a), n;
	}
	function ya(e) {
		var t = e.blockedBoundary, n = e.blockedSegment;
		n !== null && (n.status = 3, Da(this, t, e.row, n));
	}
	function ba(e, t, n, i, a, o) {
		for (var s = 0; s < n.length; s++) {
			var c = n[s];
			if (c.length === 4) ba(e, t, c[2], c[3], a, o);
			else {
				c = c[5];
				var l = e, u = o, d = qi(l, null, /* @__PURE__ */ new Set(), null, null);
				d.parentFlushed = !0, d.rootSegmentID = c, d.status = 4, d.errorDigest = u, d.parentFlushed && l.clientRenderedBoundaries.push(d);
			}
		}
		if (n.length = 0, i !== null) {
			if (t === null) throw Error(r(487));
			if (t.status !== 4 && (t.status = 4, t.errorDigest = o, t.parentFlushed && e.clientRenderedBoundaries.push(t)), typeof i == "object") for (var f in i) delete i[f];
		}
	}
	function xa(e, t, n) {
		var r = e.blockedBoundary, i = e.blockedSegment;
		if (i !== null) {
			if (i.status === 6) return;
			i.status = 3;
		}
		var a = $i(e.componentStack);
		if (r === null) {
			if (t.status !== 13 && t.status !== 14) {
				if (r = e.replay, r === null) {
					t.trackedPostpones !== null && i !== null ? (r = t.trackedPostpones, ea(t, n, a), ma(t, r, e, i), Da(t, null, e.row, i)) : (ea(t, n, a), ta(t, n));
					return;
				}
				r.pendingTasks--, r.pendingTasks === 0 && 0 < r.nodes.length && (i = ea(t, n, a), ba(t, null, r.nodes, r.slots, n, i)), t.pendingRootTasks--, t.pendingRootTasks === 0 && Ca(t);
			}
		} else {
			var o = t.trackedPostpones;
			if (r.status !== 4) {
				if (o !== null && i !== null) return ea(t, n, a), ma(t, o, e, i), r.fallbackAbortableTasks.forEach(function(e) {
					return xa(e, t, n);
				}), r.fallbackAbortableTasks.clear(), Da(t, r, e.row, i);
				r.status = 4, i = ea(t, n, a), r.status = 4, r.errorDigest = i, ha(t, r), r.parentFlushed && t.clientRenderedBoundaries.push(r);
			}
			r.pendingTasks--, i = r.row, i !== null && --i.pendingTasks === 0 && na(t, i), r.fallbackAbortableTasks.forEach(function(e) {
				return xa(e, t, n);
			}), r.fallbackAbortableTasks.clear();
		}
		e = e.row, e !== null && --e.pendingTasks === 0 && na(t, e), t.allPendingTasks--, t.allPendingTasks === 0 && wa(t);
	}
	function Sa(e, t) {
		try {
			var n = e.renderState, r = n.onHeaders;
			if (r) {
				var i = n.headers;
				if (i) {
					n.headers = null;
					var a = i.preconnects;
					if (i.fontPreloads && (a && (a += ", "), a += i.fontPreloads), i.highImagePreloads && (a && (a += ", "), a += i.highImagePreloads), !t) {
						var o = n.styles.values(), s = o.next();
						b: for (; 0 < i.remainingCapacity && !s.done; s = o.next()) for (var c = s.value.sheets.values(), l = c.next(); 0 < i.remainingCapacity && !l.done; l = c.next()) {
							var u = l.value, d = u.props, f = d.href, p = u.props, m = yr(p.href, "style", {
								crossOrigin: p.crossOrigin,
								integrity: p.integrity,
								nonce: p.nonce,
								type: p.type,
								fetchPriority: p.fetchPriority,
								referrerPolicy: p.referrerPolicy,
								media: p.media
							});
							if (0 <= (i.remainingCapacity -= m.length + 2)) n.resets.style[f] = me, a && (a += ", "), a += m, n.resets.style[f] = typeof d.crossOrigin == "string" || typeof d.integrity == "string" ? [d.crossOrigin, d.integrity] : me;
							else break b;
						}
					}
					r(a ? { Link: a } : {});
				}
			}
		} catch (t) {
			ea(e, t, {});
		}
	}
	function Ca(e) {
		e.trackedPostpones === null && Sa(e, !0), e.trackedPostpones === null && ja(e), e.onShellError = Kr, e = e.onShellReady, e();
	}
	function wa(e) {
		Sa(e, e.trackedPostpones === null ? !0 : e.completedRootSegment === null || e.completedRootSegment.status !== 5), ja(e), e = e.onAllReady, e();
	}
	function Ta(e, t) {
		if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null && t.children[0].id === -1) {
			var n = t.children[0];
			n.id = t.id, n.parentFlushed = !0, n.status !== 1 && n.status !== 3 && n.status !== 4 || Ta(e, n);
		} else e.completedSegments.push(t);
	}
	function Ea(e, t, n) {
		if (z !== null) {
			n = n.chunks;
			for (var r = 0, i = 0; i < n.length; i++) r += n[i].byteLength;
			t === null ? e.byteSize += r : t.byteSize += r;
		}
	}
	function Da(e, t, n, i) {
		if (n !== null && (--n.pendingTasks === 0 ? na(e, n) : n.together && Q(e, n)), e.allPendingTasks--, t === null) {
			if (i !== null && i.parentFlushed) {
				if (e.completedRootSegment !== null) throw Error(r(389));
				e.completedRootSegment = i;
			}
			e.pendingRootTasks--, e.pendingRootTasks === 0 && Ca(e);
		} else if (t.pendingTasks--, t.status !== 4) if (t.pendingTasks === 0) {
			if (t.status === 0 && (t.status = 1), i !== null && i.parentFlushed && (i.status === 1 || i.status === 3) && Ta(t, i), t.parentFlushed && e.completedBoundaries.push(t), t.status === 1) n = t.row, n !== null && Er(n.hoistables, t.contentState), Ri(e, t) || (t.fallbackAbortableTasks.forEach(ya, e), t.fallbackAbortableTasks.clear(), n !== null && --n.pendingTasks === 0 && na(e, n)), e.pendingRootTasks === 0 && e.trackedPostpones === null && t.contentPreamble !== null && ja(e);
			else if (t.status === 5 && (t = t.row, t !== null)) {
				if (e.trackedPostpones !== null) {
					n = e.trackedPostpones;
					var a = t.next;
					if (a !== null && (i = a.boundaries, i !== null)) for (a.boundaries = null, a = 0; a < i.length; a++) {
						var o = i[a];
						pa(e, n, o), Da(e, o, null, null);
					}
				}
				--t.pendingTasks === 0 && na(e, t);
			}
		} else i === null || !i.parentFlushed || i.status !== 1 && i.status !== 3 || (Ta(t, i), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)), t = t.row, t !== null && t.together && Q(e, t);
		e.allPendingTasks === 0 && wa(e);
	}
	function Oa(e) {
		if (e.status !== 14 && e.status !== 13) {
			var t = Mr, n = ue.H;
			ue.H = ki;
			var i = ue.A;
			ue.A = ji;
			var a = Gi;
			Gi = e;
			var o = Ai;
			Ai = e.resumableState;
			try {
				var s = e.pingedTasks, c;
				for (c = 0; c < s.length; c++) {
					var l = s[c], u = e, d = l.blockedSegment;
					if (d === null) {
						var f = u;
						if (l.replay.pendingTasks !== 0) {
							Rr(l.context);
							try {
								if (typeof l.replay.slots == "number" ? la(f, l, l.replay.slots, l.node, l.childIndex) : da(f, l), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length) throw Error(r(488));
								l.replay.pendingTasks--, l.abortSet.delete(l), Da(f, l.blockedBoundary, l.row, null);
							} catch (e) {
								vi();
								var p = e === qr ? Xr() : e;
								if (typeof p == "object" && p && typeof p.then == "function") {
									var m = l.ping;
									p.then(m, m), l.thenableState = e === qr ? _i() : null;
								} else {
									l.replay.pendingTasks--, l.abortSet.delete(l);
									var h = $i(l.componentStack);
									u = void 0;
									var g = f, _ = l.blockedBoundary, v = f.status === 12 ? f.fatalError : p, y = l.replay.nodes, b = l.replay.slots;
									u = ea(g, v, h), ba(g, _, y, b, v, u), f.pendingRootTasks--, f.pendingRootTasks === 0 && Ca(f), f.allPendingTasks--, f.allPendingTasks === 0 && wa(f);
								}
							}
						}
					} else if (f = void 0, g = d, g.status === 0) {
						g.status = 6, Rr(l.context);
						var x = g.children.length, S = g.chunks.length;
						try {
							da(u, l), g.lastPushedText && g.textEmbedded && g.chunks.push(Re), l.abortSet.delete(l), g.status = 1, Ea(u, l.blockedBoundary, g), Da(u, l.blockedBoundary, l.row, g);
						} catch (e) {
							vi(), g.children.length = x, g.chunks.length = S;
							var C = e === qr ? Xr() : u.status === 12 ? u.fatalError : e;
							if (u.status === 12 && u.trackedPostpones !== null) {
								var w = u.trackedPostpones, T = $i(l.componentStack);
								l.abortSet.delete(l), ea(u, C, T), ma(u, w, l, g), Da(u, l.blockedBoundary, l.row, g);
							} else if (typeof C == "object" && C && typeof C.then == "function") {
								g.status = 0, l.thenableState = e === qr ? _i() : null;
								var E = l.ping;
								C.then(E, E);
							} else {
								var D = $i(l.componentStack);
								l.abortSet.delete(l), g.status = 4;
								var O = l.blockedBoundary, k = l.row;
								if (k !== null && --k.pendingTasks === 0 && na(u, k), u.allPendingTasks--, f = ea(u, C, D), O === null) ta(u, C);
								else if (O.pendingTasks--, O.status !== 4) {
									O.status = 4, O.errorDigest = f, ha(u, O);
									var A = O.row;
									A !== null && --A.pendingTasks === 0 && na(u, A), O.parentFlushed && u.clientRenderedBoundaries.push(O), u.pendingRootTasks === 0 && u.trackedPostpones === null && O.contentPreamble !== null && ja(u);
								}
								u.allPendingTasks === 0 && wa(u);
							}
						}
					}
				}
				s.splice(0, c), e.destination !== null && za(e, e.destination);
			} catch (t) {
				ea(e, t, {}), ta(e, t);
			} finally {
				Ai = o, ue.H = n, ue.A = i, n === ki && Rr(t), Gi = a;
			}
		}
	}
	function ka(e, t, n) {
		t.preambleChildren.length && n.push(t.preambleChildren);
		for (var r = !1, i = 0; i < t.children.length; i++) r = Aa(e, t.children[i], n) || r;
		return r;
	}
	function Aa(e, t, n) {
		var i = t.boundary;
		if (i === null) return ka(e, t, n);
		var a = i.contentPreamble, o = i.fallbackPreamble;
		if (a === null || o === null) return !1;
		switch (i.status) {
			case 1:
				if (jt(e.renderState, a), e.byteSize += i.byteSize, t = i.completedSegments[0], !t) throw Error(r(391));
				return ka(e, t, n);
			case 5: if (e.trackedPostpones !== null) return !0;
			case 4: if (t.status === 1) return jt(e.renderState, o), ka(e, t, n);
			default: return !0;
		}
	}
	function ja(e) {
		if (e.completedRootSegment && e.completedPreambleSegments === null) {
			var t = [], n = e.byteSize, r = Aa(e, e.completedRootSegment, t), i = e.renderState.preamble;
			!1 === r || i.headChunks && i.bodyChunks ? e.completedPreambleSegments = t : e.byteSize = n;
		}
	}
	function Ma(e, t, n, i) {
		switch (n.parentFlushed = !0, n.status) {
			case 0: n.id = e.nextSegmentId++;
			case 5: return i = n.id, n.lastPushedText = !1, n.textEmbedded = !1, e = e.renderState, N(t, Nt), N(t, e.placeholderPrefix), e = L(i.toString(16)), N(t, e), P(t, Pt);
			case 1:
				n.status = 2;
				var a = !0, o = n.chunks, s = 0;
				n = n.children;
				for (var c = 0; c < n.length; c++) {
					for (a = n[c]; s < a.index; s++) N(t, o[s]);
					a = Pa(e, t, a, i);
				}
				for (; s < o.length - 1; s++) N(t, o[s]);
				return s < o.length && (a = P(t, o[s])), a;
			case 3: return !0;
			default: throw Error(r(390));
		}
	}
	var Na = 0;
	function Pa(e, t, n, i) {
		var a = n.boundary;
		if (a === null) return Ma(e, t, n, i);
		if (a.parentFlushed = !0, a.status === 4) {
			var o = a.row;
			o !== null && --o.pendingTasks === 0 && na(e, o), a = a.errorDigest, P(t, Bt), N(t, Ht), a && (N(t, Wt), N(t, L(W(a))), N(t, Ut)), P(t, Gt), Ma(e, t, n, i);
		} else if (a.status !== 1) a.status === 0 && (a.rootSegmentID = e.nextSegmentId++), 0 < a.completedSegments.length && e.partialBoundaries.push(a), Kt(t, e.renderState, a.rootSegmentID), i && Er(i, a.fallbackState), Ma(e, t, n, i);
		else if (!Ra && Ri(e, a) && (Na + a.byteSize > e.progressiveChunkSize || Dr(a.contentState))) a.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(a), Kt(t, e.renderState, a.rootSegmentID), Ma(e, t, n, i);
		else {
			if (Na += a.byteSize, i && Er(i, a.contentState), n = a.row, n !== null && Ri(e, a) && --n.pendingTasks === 0 && na(e, n), P(t, Lt), n = a.completedSegments, n.length !== 1) throw Error(r(391));
			Pa(e, t, n[0], i);
		}
		return P(t, Vt);
	}
	function Fa(e, t, n, r) {
		return mn(t, e.renderState, n.parentFormatContext, n.id), Pa(e, t, n, r), hn(t, n.parentFormatContext);
	}
	function Ia(e, t, n) {
		Na = n.byteSize;
		for (var r = n.completedSegments, i = 0; i < r.length; i++) La(e, t, n, r[i]);
		r.length = 0, r = n.row, r !== null && Ri(e, n) && --r.pendingTasks === 0 && na(e, r), Gn(t, n.contentState, e.renderState), r = e.resumableState, e = e.renderState, i = n.rootSegmentID, n = n.contentState;
		var a = e.stylesToHoist;
		return e.stylesToHoist = !1, N(t, e.startInlineScript), N(t, rt), a ? (!(r.instructions & 4) && (r.instructions |= 4, N(t, On)), !(r.instructions & 2) && (r.instructions |= 2, N(t, bn)), r.instructions & 8 ? N(t, Cn) : (r.instructions |= 8, N(t, Sn))) : (!(r.instructions & 2) && (r.instructions |= 2, N(t, bn)), N(t, xn)), r = L(i.toString(16)), N(t, e.boundaryPrefix), N(t, r), N(t, wn), N(t, e.segmentPrefix), N(t, r), a ? (N(t, Tn), cr(t, n)) : N(t, En), n = P(t, Dn), Mt(t, e) && n;
	}
	function La(e, t, n, i) {
		if (i.status === 2) return !0;
		var a = n.contentState, o = i.id;
		if (o === -1) {
			if ((i.id = n.rootSegmentID) === -1) throw Error(r(392));
			return Fa(e, t, i, a);
		}
		return o === n.rootSegmentID ? Fa(e, t, i, a) : (Fa(e, t, i, a), n = e.resumableState, e = e.renderState, N(t, e.startInlineScript), N(t, rt), n.instructions & 1 ? N(t, _n) : (n.instructions |= 1, N(t, gn)), N(t, e.segmentPrefix), o = L(o.toString(16)), N(t, o), N(t, vn), N(t, e.placeholderPrefix), N(t, o), t = P(t, yn), t);
	}
	var Ra = !1;
	function za(e, t) {
		j = new Uint8Array(2048), M = 0;
		try {
			if (!(0 < e.pendingRootTasks)) {
				var n, r = e.completedRootSegment;
				if (r !== null) {
					if (r.status === 5) return;
					var i = e.completedPreambleSegments;
					if (i === null) return;
					Na = e.byteSize;
					var a = e.resumableState, o = e.renderState, s = o.preamble, c = s.htmlChunks, l = s.headChunks, u;
					if (c) {
						for (u = 0; u < c.length; u++) N(t, c[u]);
						if (l) for (u = 0; u < l.length; u++) N(t, l[u]);
						else N(t, Et("head")), N(t, rt);
					} else if (l) for (u = 0; u < l.length; u++) N(t, l[u]);
					var d = o.charsetChunks;
					for (u = 0; u < d.length; u++) N(t, d[u]);
					d.length = 0, o.preconnects.forEach(Z, t), o.preconnects.clear();
					var f = o.viewportChunks;
					for (u = 0; u < f.length; u++) N(t, f[u]);
					f.length = 0, o.fontPreloads.forEach(Z, t), o.fontPreloads.clear(), o.highImagePreloads.forEach(Z, t), o.highImagePreloads.clear(), he = o, o.styles.forEach($n, t), he = null;
					var p = o.importMapChunks;
					for (u = 0; u < p.length; u++) N(t, p[u]);
					p.length = 0, o.bootstrapScripts.forEach(Z, t), o.scripts.forEach(Z, t), o.scripts.clear(), o.bulkPreloads.forEach(Z, t), o.bulkPreloads.clear(), c || l || (a.instructions |= 32);
					var m = o.hoistableChunks;
					for (u = 0; u < m.length; u++) N(t, m[u]);
					for (a = m.length = 0; a < i.length; a++) {
						var h = i[a];
						for (o = 0; o < h.length; o++) Pa(e, t, h[o], null);
					}
					var g = e.renderState.preamble, _ = g.headChunks;
					(g.htmlChunks || _) && N(t, At("head"));
					var v = g.bodyChunks;
					if (v) for (i = 0; i < v.length; i++) N(t, v[i]);
					Pa(e, t, r, null), e.completedRootSegment = null;
					var y = e.renderState;
					if (e.allPendingTasks !== 0 || e.clientRenderedBoundaries.length !== 0 || e.completedBoundaries.length !== 0 || e.trackedPostpones !== null && (e.trackedPostpones.rootNodes.length !== 0 || e.trackedPostpones.rootSlots !== null)) {
						var b = e.resumableState;
						if (!(b.instructions & 64)) {
							if (b.instructions |= 64, N(t, y.startInlineScript), !(b.instructions & 32)) {
								b.instructions |= 32;
								var x = "_" + b.idPrefix + "R_";
								N(t, nr), N(t, L(W(x))), N(t, q);
							}
							N(t, rt), N(t, J), P(t, _e);
						}
					}
					Mt(t, y);
				}
				var S = e.renderState;
				r = 0;
				var C = S.viewportChunks;
				for (r = 0; r < C.length; r++) N(t, C[r]);
				C.length = 0, S.preconnects.forEach(Z, t), S.preconnects.clear(), S.fontPreloads.forEach(Z, t), S.fontPreloads.clear(), S.highImagePreloads.forEach(Z, t), S.highImagePreloads.clear(), S.styles.forEach(tr, t), S.scripts.forEach(Z, t), S.scripts.clear(), S.bulkPreloads.forEach(Z, t), S.bulkPreloads.clear();
				var w = S.hoistableChunks;
				for (r = 0; r < w.length; r++) N(t, w[r]);
				w.length = 0;
				var T = e.clientRenderedBoundaries;
				for (n = 0; n < T.length; n++) {
					var E = T[n];
					S = t;
					var D = e.resumableState, O = e.renderState, k = E.rootSegmentID, A = E.errorDigest;
					N(S, O.startInlineScript), N(S, rt), D.instructions & 4 ? N(S, An) : (D.instructions |= 4, N(S, kn)), N(S, O.boundaryPrefix), N(S, L(k.toString(16))), N(S, jn), A && (N(S, Mn), N(S, L(Fn(A || ""))));
					var I = P(S, Nn);
					if (!I) {
						e.destination = null, n++, T.splice(0, n);
						return;
					}
				}
				T.splice(0, n);
				var R = e.completedBoundaries;
				for (n = 0; n < R.length; n++) if (!Ia(e, t, R[n])) {
					e.destination = null, n++, R.splice(0, n);
					return;
				}
				R.splice(0, n), F(t), j = new Uint8Array(2048), M = 0, Ra = !0;
				var z = e.partialBoundaries;
				for (n = 0; n < z.length; n++) {
					var B = z[n];
					a: {
						T = e, E = t, Na = B.byteSize;
						var V = B.completedSegments;
						for (I = 0; I < V.length; I++) if (!La(T, E, B, V[I])) {
							I++, V.splice(0, I);
							var H = !1;
							break a;
						}
						V.splice(0, I);
						var ee = B.row;
						ee !== null && ee.together && B.pendingTasks === 1 && (ee.pendingTasks === 1 ? ra(T, ee, ee.hoistables) : ee.pendingTasks--), H = Gn(E, B.contentState, T.renderState);
					}
					if (!H) {
						e.destination = null, n++, z.splice(0, n);
						return;
					}
				}
				z.splice(0, n), Ra = !1;
				var te = e.completedBoundaries;
				for (n = 0; n < te.length; n++) if (!Ia(e, t, te[n])) {
					e.destination = null, n++, te.splice(0, n);
					return;
				}
				te.splice(0, n);
			}
		} finally {
			Ra = !1, e.allPendingTasks === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 ? (e.flushScheduled = !1, n = e.resumableState, n.hasBody && N(t, At("body")), n.hasHtml && N(t, At("html")), F(t), e.status = 14, t.close(), e.destination = null) : F(t);
		}
	}
	function Ba(e) {
		e.flushScheduled = e.destination !== null, A(function() {
			return Oa(e);
		}), D(function() {
			e.status === 10 && (e.status = 11), e.trackedPostpones === null && Sa(e, e.pendingRootTasks === 0);
		});
	}
	function Va(e) {
		!1 === e.flushScheduled && e.pingedTasks.length === 0 && e.destination !== null && (e.flushScheduled = !0, D(function() {
			var t = e.destination;
			t ? za(e, t) : e.flushScheduled = !1;
		}));
	}
	function Ha(e, t) {
		if (e.status === 13) e.status = 14, B(t, e.fatalError);
		else if (e.status !== 14 && e.destination === null) {
			e.destination = t;
			try {
				za(e, t);
			} catch (t) {
				ea(e, t, {}), ta(e, t);
			}
		}
	}
	function Ua(e, t) {
		(e.status === 11 || e.status === 10) && (e.status = 12);
		try {
			var n = e.abortableTasks;
			if (0 < n.size) {
				var i = t === void 0 ? Error(r(432)) : typeof t == "object" && t && typeof t.then == "function" ? Error(r(530)) : t;
				e.fatalError = i, n.forEach(function(t) {
					return xa(t, e, i);
				}), n.clear();
			}
			e.destination !== null && za(e, e.destination);
		} catch (t) {
			ea(e, t, {}), ta(e, t);
		}
	}
	function Wa(e, t, n) {
		if (t === null) n.rootNodes.push(e);
		else {
			var r = n.workingMap, i = r.get(t);
			i === void 0 && (i = [
				t[1],
				t[2],
				[],
				null
			], r.set(t, i), Wa(i, t[0], n)), i[2].push(e);
		}
	}
	function Ga(e) {
		var t = e.trackedPostpones;
		if (t === null || t.rootNodes.length === 0 && t.rootSlots === null) return e.trackedPostpones = null;
		if (e.completedRootSegment === null || e.completedRootSegment.status !== 5 && e.completedPreambleSegments !== null) {
			var n = e.nextSegmentId, r = t.rootSlots, i = e.resumableState;
			i.bootstrapScriptContent = void 0, i.bootstrapScripts = void 0, i.bootstrapModules = void 0;
		} else {
			n = 0, r = -1, i = e.resumableState;
			var a = e.renderState;
			i.nextFormID = 0, i.hasBody = !1, i.hasHtml = !1, i.unknownResources = { font: a.resets.font }, i.dnsResources = a.resets.dns, i.connectResources = a.resets.connect, i.imageResources = a.resets.image, i.styleResources = a.resets.style, i.scriptResources = {}, i.moduleUnknownResources = {}, i.moduleScriptResources = {}, i.instructions = 0;
		}
		return {
			nextSegmentId: n,
			rootFormatContext: e.rootFormatContext,
			progressiveChunkSize: e.progressiveChunkSize,
			resumableState: e.resumableState,
			replayNodes: t.rootNodes,
			replaySlots: r
		};
	}
	function Ka() {
		var e = t.version;
		if (e !== "19.2.3") throw Error(r(527, e, "19.2.3"));
	}
	Ka(), Ka(), e.prerender = function(e, t) {
		return new Promise(function(n, r) {
			var i = t ? t.onHeaders : void 0, a;
			i && (a = function(e) {
				i(new Headers(e));
			});
			var o = Ae(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), s = Hi(e, o, ke(o, void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, a, t ? t.maxHeadersLength : void 0), Pe(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ha(s, e);
					},
					cancel: function(e) {
						s.destination = null, Ua(s, e);
					}
				}, { highWaterMark: 0 });
				e = {
					postponed: Ga(s),
					prelude: e
				}, n(e);
			}, void 0, void 0, r, t ? t.onPostpone : void 0);
			if (t && t.signal) {
				var c = t.signal;
				if (c.aborted) Ua(s, c.reason);
				else {
					var l = function() {
						Ua(s, c.reason), c.removeEventListener("abort", l);
					};
					c.addEventListener("abort", l);
				}
			}
			Ba(s);
		});
	}, e.renderToReadableStream = function(e, t) {
		return new Promise(function(n, r) {
			var i, a, o = new Promise(function(e, t) {
				a = e, i = t;
			}), s = t ? t.onHeaders : void 0, c;
			s && (c = function(e) {
				s(new Headers(e));
			});
			var l = Ae(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), u = Vi(e, l, ke(l, t ? t.nonce : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, c, t ? t.maxHeadersLength : void 0), Pe(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, a, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ha(u, e);
					},
					cancel: function(e) {
						u.destination = null, Ua(u, e);
					}
				}, { highWaterMark: 0 });
				e.allReady = o, n(e);
			}, function(e) {
				o.catch(function() {}), r(e);
			}, i, t ? t.onPostpone : void 0, t ? t.formState : void 0);
			if (t && t.signal) {
				var d = t.signal;
				if (d.aborted) Ua(u, d.reason);
				else {
					var f = function() {
						Ua(u, d.reason), d.removeEventListener("abort", f);
					};
					d.addEventListener("abort", f);
				}
			}
			Ba(u);
		});
	}, e.resume = function(e, t, n) {
		return new Promise(function(r, i) {
			var a, o, s = new Promise(function(e, t) {
				o = e, a = t;
			}), c = Ui(e, t, ke(t.resumableState, n ? n.nonce : void 0, void 0, void 0, void 0, void 0), n ? n.onError : void 0, o, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ha(c, e);
					},
					cancel: function(e) {
						c.destination = null, Ua(c, e);
					}
				}, { highWaterMark: 0 });
				e.allReady = s, r(e);
			}, function(e) {
				s.catch(function() {}), i(e);
			}, a, n ? n.onPostpone : void 0);
			if (n && n.signal) {
				var l = n.signal;
				if (l.aborted) Ua(c, l.reason);
				else {
					var u = function() {
						Ua(c, l.reason), l.removeEventListener("abort", u);
					};
					l.addEventListener("abort", u);
				}
			}
			Ba(c);
		});
	}, e.resumeAndPrerender = function(e, t, n) {
		return new Promise(function(r, i) {
			var a = Wi(e, t, ke(t.resumableState, void 0, void 0, void 0, void 0, void 0), n ? n.onError : void 0, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ha(a, e);
					},
					cancel: function(e) {
						a.destination = null, Ua(a, e);
					}
				}, { highWaterMark: 0 });
				e = {
					postponed: Ga(a),
					prelude: e
				}, r(e);
			}, void 0, void 0, i, n ? n.onPostpone : void 0);
			if (n && n.signal) {
				var o = n.signal;
				if (o.aborted) Ua(a, o.reason);
				else {
					var s = function() {
						Ua(a, o.reason), o.removeEventListener("abort", s);
					};
					o.addEventListener("abort", s);
				}
			}
			Ba(a);
		});
	}, e.version = "19.2.3";
})), Pn = /* @__PURE__ */ l((/* @__PURE__ */ o(((e) => {
	var t = Mn(), n = Nn();
	e.version = t.version, e.renderToString = t.renderToString, e.renderToStaticMarkup = t.renderToStaticMarkup, e.renderToReadableStream = n.renderToReadableStream, e.resume = n.resume;
})))(), 1), Fn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48c3R5bGU+dGV4dHtmb250LWZhbWlseToiQXJpYWwiO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjQwNXB4fTwvc3R5bGU+PGNpcmNsZSByPSIyNTYiIGN4PSIyNTYiIGN5PSIyNTYiIHN0cm9rZT0ibm9uZSIgZmlsbD0iIzY2NiI+PC9jaXJjbGU+PHRleHQgeD0iMjU2IiB5PSIyNzQiIHRleHQtYW5jaG9yID0gIm1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmUgPSAiY2VudHJhbCIgZmlsbD0iI2ZmZiI+X19zdHJfXzwvdGV4dD48L3N2Zz4K", In = {
	width: "100%",
	height: "100px"
}, Ln = {
	width: "100%",
	height: "16px"
};
function Rn(e) {
	return e === In || e === Ln;
}
function zn(e, t) {
	return e.width === t.width && e.height === t.height;
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var Bn = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), X = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	t.exports = Bn();
})))(), 1), Vn = 1, Hn = [
	"label",
	"helpText",
	"className"
], Un = class e {
	static typeId;
	static label;
	static selectable;
	static shouldBeCompiled = !1;
	id;
	isNewlyAdded = !1;
	wrapperRef;
	compiledHtml = void 0;
	removeIntermediateProduct = !1;
	label = "";
	helpText = "";
	className = "";
	iframePreviewSize = null;
	static _icon;
	static get icon() {
		if (this._icon !== void 0) return this._icon;
		let e = this.iconString;
		return e ? Fn.replace(/__str__/, e) : Fn;
	}
	static set icon(e) {
		this._icon = e;
	}
	static get iconString() {
		let e = this.typeId.match(/-(.)/);
		return e ? e[1].toUpperCase() : "";
	}
	getIframePreviewSize(e) {
		if (this.iframePreviewSize) return this.iframePreviewSize;
		if (!e) return Ln;
		let t = e.replace(/<!--.*?-->/g, "");
		return /^\s*(?:\s*|<(?:h[1-6]|p)>[^<]+<\/(?:h[1-6]|p)>|(\s*<span[^>]*>[^<]*<\/span>\s*)+)\s*$/.test(t) ? Ln : In;
	}
	setIframePreviewSize(e) {
		this.iframePreviewSize = e;
	}
	static async new(e) {
		let t = new this();
		return t.isNewlyAdded = !0, t;
	}
	static async newFromHtml(e) {
		throw "Should be implemented for each concrete class";
	}
	static canNewFromFile({ file: e }) {
		return !1;
	}
	static async newFromFile({ file: e }) {
		throw "Should be implemented for each concrete class";
	}
	constructor() {
		this.id = Math.round(Math.random() * 46656).toString(36).padStart(3, "0") + (Vn++).toString(36).padStart(3, "0"), this.wrapperRef = K.createRef();
	}
	canMerge(e) {
		return !1;
	}
	merge(e) {
		throw "Should be implemented for each concrete class";
	}
	focusEditor() {
		if (!this.wrapperRef.current) return;
		let e = this.wrapperRef.current, t = e.querySelector("[data-mt-block-editor-focus-default]") || e.querySelector("input, textarea, select");
		t && t.focus();
	}
	contentLabel() {
		return this.constructor.label;
	}
	placeholderLabel() {
		return this.contentLabel();
	}
	placeholder() {
		return /* @__PURE__ */ (0, X.jsx)("span", {
			className: "mt-be-placeholder",
			children: G("Please input {{label}}.", { label: this.label || this.placeholderLabel() })
		});
	}
	childBlocks() {
		return [];
	}
	htmlString() {
		let e = this.html();
		return typeof e != "string" && (e = Pn.renderToStaticMarkup(e).replace(/<link[^>]*rel="preload"[^>]*>\s*/g, "")), this.className && (e = /^<[^>]+class="/.test(e) ? e.replace(/^(<[^>]+class=")([^"]+)/, (e, t, n) => t + this.className.split(/\s+/).reduce((e, t) => (e.indexOf(t) === -1 && e.push(t), e), n.split(/\s+/)).join(" ")) : e.replace(/^<([^>]+)>/, (e, t) => `<${t} class="${this.className}">`)), e;
	}
	metadata() {
		return this.metadataByOwnKeys({ keys: [] });
	}
	metadataByOwnKeys(t) {
		let n = this, r = {}, i = t && t.keys;
		if (!i) {
			let t = Reflect.ownKeys(new e());
			i = Reflect.ownKeys(this).filter((e) => typeof e == "string" && !t.find((t) => t === e));
		}
		return i.forEach((e) => {
			n[e] !== null && n[e] !== void 0 && (r[e] = n[e]);
		}), [
			"label",
			"helpText",
			"className",
			"removeIntermediateProduct"
		].forEach((e) => {
			n[e] && (r[e] = n[e]);
		}), Object.keys(r).length === 0 ? null : r;
	}
	keysForSetup() {
		return [];
	}
	isSetupBlank() {
		return !(this.label || this.helpText || this.className);
	}
	isBlank() {
		return this.htmlString() === "";
	}
	async serializedString(e) {
		return this.htmlString();
	}
	async compile(e) {
		throw "Should be implemented for each concrete class";
	}
	async serialize(e) {
		e.removeChildIntermediateProduct ? this.compiledHtml = void 0 : this.constructor.shouldBeCompiled && this.compiledHtml === void 0 && await this.compile(e);
		let t = e.editor.serializeMeta(this, e.external), n = await this.serializedString(e), r = this.constructor.typeId;
		return r === "core-text" && (r = ""), `<!-- mt-beb${r ? ` t="${r}"` : ""}${t ? ` m='${Tn(t)}'` : ""}${!e.removeChildIntermediateProduct && this.compiledHtml !== void 0 ? ` h='${Tn(n)}'` : ""} -->${e.removeChildIntermediateProduct ? n : this.removeIntermediateProduct ? this.compiledHtml || n : this.compiledHtml ?? n}<!-- /mt-beb -->`;
	}
	async toClipboardItem(e) {
		return await this.serialize({
			...e,
			external: !0
		});
	}
	editor(e) {
		throw "Should be implemented for each concrete class";
	}
	html() {
		throw "Should be implemented for each concrete class";
	}
}, Wn = /* @__PURE__ */ s({
	BlockContext: () => Jn,
	BlocksContext: () => Kn,
	EditorContext: () => Gn,
	useBlockContext: () => Yn,
	useBlocksContext: () => qn,
	useEditorContext: () => Z
}), Gn = (0, K.createContext)(null);
function Z() {
	let e = (0, K.useContext)(Gn);
	if (!e) throw Error("EditorContext is not initialized");
	return e;
}
var Kn = (0, K.createContext)(null);
function qn() {
	let e = (0, K.useContext)(Kn);
	if (!e) throw Error("BlocksContext is not initialized");
	return e;
}
var Jn = (0, K.createContext)(null);
function Yn() {
	let e = (0, K.useContext)(Jn);
	if (!e) throw Error("BlockContext is not initialized");
	return e;
}
//#endregion
//#region src/img/icon/text-block.svg
var Xn = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M213.7%20125.5H111.1v37.2c0%203.6-2.9%206.5-6.5%206.5H62.5c-3.6%200-6.5-2.9-6.5-6.5V59.1c0-3.6%202.9-6.5%206.5-6.5h387c3.6%200%206.5%202.9%206.5%206.5v103.6c0%203.6-2.9%206.5-6.5%206.5h-42c-3.6%200-6.5-2.9-6.5-6.5v-37.2H298.3v277.3h37.1c3.6%200%206.5%202.9%206.5%206.5v43.6c0%203.6-2.9%206.5-6.5%206.5H176.6c-3.6%200-6.5-2.9-6.5-6.5v-43.6c0-3.6%202.9-6.5%206.5-6.5h37.1V125.5z'/%3e%3c/svg%3e", Zn = ({ children: e, mode: t }) => {
	typeof t == "string" && (t = [t]);
	let { editor: n } = Z();
	return t.find((e) => e === n.opts.mode) ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [e, " "] }) : null;
};
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/extends.js
function Qn() {
	return Qn = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Qn.apply(null, arguments);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function $n(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function er(e, t) {
	e.prototype = Object.create(t.prototype), e.prototype.constructor = e, w(e, t);
}
//#endregion
//#region node_modules/prop-types/lib/ReactPropTypesSecret.js
var tr = /* @__PURE__ */ o(((e, t) => {
	t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
})), nr = /* @__PURE__ */ o(((e, t) => {
	var n = tr();
	function r() {}
	function i() {}
	i.resetWarningCache = r, t.exports = function() {
		function e(e, t, r, i, a, o) {
			if (o !== n) {
				var s = /* @__PURE__ */ Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
				throw s.name = "Invariant Violation", s;
			}
		}
		e.isRequired = e;
		function t() {
			return e;
		}
		var a = {
			array: e,
			bigint: e,
			bool: e,
			func: e,
			number: e,
			object: e,
			string: e,
			symbol: e,
			any: e,
			arrayOf: t,
			element: e,
			elementType: e,
			instanceOf: t,
			node: e,
			objectOf: t,
			oneOf: t,
			oneOfType: t,
			shape: t,
			exact: t,
			checkPropTypes: i,
			resetWarningCache: r
		};
		return a.PropTypes = a, a;
	};
})), rr = /* @__PURE__ */ o(((e, t) => {
	t.exports = nr()();
}));
//#endregion
//#region node_modules/dom-helpers/esm/hasClass.js
function ir(e, t) {
	return e.classList ? !!t && e.classList.contains(t) : (" " + (e.className.baseVal || e.className) + " ").indexOf(" " + t + " ") !== -1;
}
//#endregion
//#region node_modules/dom-helpers/esm/addClass.js
function ar(e, t) {
	e.classList ? e.classList.add(t) : ir(e, t) || (typeof e.className == "string" ? e.className = e.className + " " + t : e.setAttribute("class", (e.className && e.className.baseVal || "") + " " + t));
}
//#endregion
//#region node_modules/dom-helpers/esm/removeClass.js
function or(e, t) {
	return e.replace(RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function sr(e, t) {
	e.classList ? e.classList.remove(t) : typeof e.className == "string" ? e.className = or(e.className, t) : e.setAttribute("class", or(e.className && e.className.baseVal || "", t));
}
//#endregion
//#region node_modules/react-transition-group/esm/config.js
var cr = { disabled: !1 }, lr = K.createContext(null), ur = function(e) {
	return e.scrollTop;
}, dr = /* @__PURE__ */ l(Me()), fr = "unmounted", pr = "exited", mr = "entering", hr = "entered", gr = "exiting", _r = /*#__PURE__*/ function(e) {
	er(t, e);
	function t(t, n) {
		var r = e.call(this, t, n) || this, i = n, a = i && !i.isMounting ? t.enter : t.appear, o;
		return r.appearStatus = null, t.in ? a ? (o = pr, r.appearStatus = mr) : o = hr : o = t.unmountOnExit || t.mountOnEnter ? fr : pr, r.state = { status: o }, r.nextCallback = null, r;
	}
	t.getDerivedStateFromProps = function(e, t) {
		return e.in && t.status === "unmounted" ? { status: pr } : null;
	};
	var n = t.prototype;
	return n.componentDidMount = function() {
		this.updateStatus(!0, this.appearStatus);
	}, n.componentDidUpdate = function(e) {
		var t = null;
		if (e !== this.props) {
			var n = this.state.status;
			this.props.in ? n !== "entering" && n !== "entered" && (t = mr) : (n === "entering" || n === "entered") && (t = gr);
		}
		this.updateStatus(!1, t);
	}, n.componentWillUnmount = function() {
		this.cancelNextCallback();
	}, n.getTimeouts = function() {
		var e = this.props.timeout, t = n = r = e, n, r;
		return e != null && typeof e != "number" && (t = e.exit, n = e.enter, r = e.appear === void 0 ? n : e.appear), {
			exit: t,
			enter: n,
			appear: r
		};
	}, n.updateStatus = function(e, t) {
		if (e === void 0 && (e = !1), t !== null) if (this.cancelNextCallback(), t === "entering") {
			if (this.props.unmountOnExit || this.props.mountOnEnter) {
				var n = this.props.nodeRef ? this.props.nodeRef.current : dr.default.findDOMNode(this);
				n && ur(n);
			}
			this.performEnter(e);
		} else this.performExit();
		else this.props.unmountOnExit && this.state.status === "exited" && this.setState({ status: fr });
	}, n.performEnter = function(e) {
		var t = this, n = this.props.enter, r = this.context ? this.context.isMounting : e, i = this.props.nodeRef ? [r] : [dr.default.findDOMNode(this), r], a = i[0], o = i[1], s = this.getTimeouts(), c = r ? s.appear : s.enter;
		if (!e && !n || cr.disabled) {
			this.safeSetState({ status: hr }, function() {
				t.props.onEntered(a);
			});
			return;
		}
		this.props.onEnter(a, o), this.safeSetState({ status: mr }, function() {
			t.props.onEntering(a, o), t.onTransitionEnd(c, function() {
				t.safeSetState({ status: hr }, function() {
					t.props.onEntered(a, o);
				});
			});
		});
	}, n.performExit = function() {
		var e = this, t = this.props.exit, n = this.getTimeouts(), r = this.props.nodeRef ? void 0 : dr.default.findDOMNode(this);
		if (!t || cr.disabled) {
			this.safeSetState({ status: pr }, function() {
				e.props.onExited(r);
			});
			return;
		}
		this.props.onExit(r), this.safeSetState({ status: gr }, function() {
			e.props.onExiting(r), e.onTransitionEnd(n.exit, function() {
				e.safeSetState({ status: pr }, function() {
					e.props.onExited(r);
				});
			});
		});
	}, n.cancelNextCallback = function() {
		this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
	}, n.safeSetState = function(e, t) {
		t = this.setNextCallback(t), this.setState(e, t);
	}, n.setNextCallback = function(e) {
		var t = this, n = !0;
		return this.nextCallback = function(r) {
			n && (n = !1, t.nextCallback = null, e(r));
		}, this.nextCallback.cancel = function() {
			n = !1;
		}, this.nextCallback;
	}, n.onTransitionEnd = function(e, t) {
		this.setNextCallback(t);
		var n = this.props.nodeRef ? this.props.nodeRef.current : dr.default.findDOMNode(this), r = e == null && !this.props.addEndListener;
		if (!n || r) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var i = this.props.nodeRef ? [this.nextCallback] : [n, this.nextCallback], a = i[0], o = i[1];
			this.props.addEndListener(a, o);
		}
		e != null && setTimeout(this.nextCallback, e);
	}, n.render = function() {
		var e = this.state.status;
		if (e === "unmounted") return null;
		var t = this.props, n = t.children;
		t.in, t.mountOnEnter, t.unmountOnExit, t.appear, t.enter, t.exit, t.timeout, t.addEndListener, t.onEnter, t.onEntering, t.onEntered, t.onExit, t.onExiting, t.onExited, t.nodeRef;
		var r = $n(t, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /*#__PURE__*/ K.createElement(lr.Provider, { value: null }, typeof n == "function" ? n(e, r) : K.cloneElement(K.Children.only(n), r));
	}, t;
}(K.Component);
_r.contextType = lr, _r.propTypes = {};
function vr() {}
_r.defaultProps = {
	in: !1,
	mountOnEnter: !1,
	unmountOnExit: !1,
	appear: !1,
	enter: !0,
	exit: !0,
	onEnter: vr,
	onEntering: vr,
	onEntered: vr,
	onExit: vr,
	onExiting: vr,
	onExited: vr
}, _r.UNMOUNTED = fr, _r.EXITED = pr, _r.ENTERING = mr, _r.ENTERED = hr, _r.EXITING = gr;
//#endregion
//#region node_modules/react-transition-group/esm/CSSTransition.js
var yr = function(e, t) {
	return e && t && t.split(" ").forEach(function(t) {
		return ar(e, t);
	});
}, br = function(e, t) {
	return e && t && t.split(" ").forEach(function(t) {
		return sr(e, t);
	});
}, xr = /*#__PURE__*/ function(e) {
	er(t, e);
	function t() {
		var t, n = [...arguments];
		return t = e.call.apply(e, [this].concat(n)) || this, t.appliedClasses = {
			appear: {},
			enter: {},
			exit: {}
		}, t.onEnter = function(e, n) {
			var r = t.resolveArguments(e, n), i = r[0], a = r[1];
			t.removeClasses(i, "exit"), t.addClass(i, a ? "appear" : "enter", "base"), t.props.onEnter && t.props.onEnter(e, n);
		}, t.onEntering = function(e, n) {
			var r = t.resolveArguments(e, n), i = r[0], a = r[1] ? "appear" : "enter";
			t.addClass(i, a, "active"), t.props.onEntering && t.props.onEntering(e, n);
		}, t.onEntered = function(e, n) {
			var r = t.resolveArguments(e, n), i = r[0], a = r[1] ? "appear" : "enter";
			t.removeClasses(i, a), t.addClass(i, a, "done"), t.props.onEntered && t.props.onEntered(e, n);
		}, t.onExit = function(e) {
			var n = t.resolveArguments(e)[0];
			t.removeClasses(n, "appear"), t.removeClasses(n, "enter"), t.addClass(n, "exit", "base"), t.props.onExit && t.props.onExit(e);
		}, t.onExiting = function(e) {
			var n = t.resolveArguments(e)[0];
			t.addClass(n, "exit", "active"), t.props.onExiting && t.props.onExiting(e);
		}, t.onExited = function(e) {
			var n = t.resolveArguments(e)[0];
			t.removeClasses(n, "exit"), t.addClass(n, "exit", "done"), t.props.onExited && t.props.onExited(e);
		}, t.resolveArguments = function(e, n) {
			return t.props.nodeRef ? [t.props.nodeRef.current, e] : [e, n];
		}, t.getClassNames = function(e) {
			var n = t.props.classNames, r = typeof n == "string", i = r && n ? n + "-" : "", a = r ? "" + i + e : n[e];
			return {
				baseClassName: a,
				activeClassName: r ? a + "-active" : n[e + "Active"],
				doneClassName: r ? a + "-done" : n[e + "Done"]
			};
		}, t;
	}
	var n = t.prototype;
	return n.addClass = function(e, t, n) {
		var r = this.getClassNames(t)[n + "ClassName"], i = this.getClassNames("enter").doneClassName;
		t === "appear" && n === "done" && i && (r += " " + i), n === "active" && e && ur(e), r && (this.appliedClasses[t][n] = r, yr(e, r));
	}, n.removeClasses = function(e, t) {
		var n = this.appliedClasses[t], r = n.base, i = n.active, a = n.done;
		this.appliedClasses[t] = {}, r && br(e, r), i && br(e, i), a && br(e, a);
	}, n.render = function() {
		var e = this.props;
		e.classNames;
		var t = $n(e, ["classNames"]);
		return /*#__PURE__*/ K.createElement(_r, Qn({}, t, {
			onEnter: this.onEnter,
			onEntered: this.onEntered,
			onEntering: this.onEntering,
			onExit: this.onExit,
			onExiting: this.onExiting,
			onExited: this.onExited
		}));
	}, t;
}(K.Component);
xr.defaultProps = { classNames: "" }, xr.propTypes = {};
//#endregion
//#region src/Component/BlockCommand.tsx
var Sr = ({ command: e, block: t }) => {
	let [n, r] = (0, K.useState)(void 0), i = qn(), a = Z(), { editor: o, getFocusedIds: s } = a;
	return /* @__PURE__ */ (0, X.jsxs)("button", {
		type: "button",
		"data-mt-be-command": e.command,
		className: "mt-be-btn-command",
		onClick: (n) => {
			e.dialog ? r(!0) : o.commandManager.execute({
				command: e.command,
				blockIds: s().length === 0 ? [t.id] : s(),
				editorContext: a,
				blocksContext: i,
				event: n.nativeEvent
			});
		},
		children: [
			/* @__PURE__ */ (0, X.jsxs)("span", { children: [e.icon && /* @__PURE__ */ (0, X.jsx)("img", { src: e.icon }), e.label] }),
			/* @__PURE__ */ (0, X.jsx)("span", { children: e.shortcut && gl(e.shortcut) }),
			e.dialog && typeof n == "boolean" && /* @__PURE__ */ (0, X.jsx)(e.dialog, { open: n })
		]
	});
}, Cr = "mt-be-block-command-panel", wr = "mtBeBlockCommandPanelPlacement", Tr = (0, K.memo)(function(e) {
	let [t, n] = (0, K.useState)([]), r = (0, K.useRef)(null), { editor: i } = Z(), a = Cr;
	return e.className && (a += ` ${e.className}`), (0, K.useEffect)(() => {
		let e = !1;
		return i.commandManager.contextCommands().then((t) => {
			e || n(t);
		}), () => {
			e = !0;
		};
	}, []), (0, K.useEffect)(() => {
		let t = r.current;
		e.in && t && (t.dataset[wr] = "left", t.getBoundingClientRect().left < 0 && (t.dataset[wr] = "bottom"));
	}, [e.in]), t.length === 0 ? null : /* @__PURE__ */ (0, X.jsx)(xr, {
		nodeRef: r,
		timeout: 100,
		in: e.in,
		unmountOnExit: !0,
		classNames: Cr,
		children: /* @__PURE__ */ (0, X.jsxs)("div", {
			id: e.id || "",
			className: a,
			ref: r,
			children: [e.children, t.map((t) => /* @__PURE__ */ (0, X.jsx)(Sr, {
				command: t,
				block: e.block
			}, t.command))]
		})
	});
}, (e, t) => e.in === t.in), Er = (0, K.memo)(function({ index: e, label: t, labelDirect: n, className: r, showShortcuts: i }) {
	let { editor: a } = Z(), { panelBlockTypes: o, shortcutBlockTypes: s, addBlock: c } = qn(), [l, u] = (0, K.useState)(1), d = (0, K.useRef)(null), f = (0, K.useRef)(null), p = (0, K.useRef)(null);
	if ((0, K.useEffect)(() => {
		let e = () => {
			d.current !== null && d.current.classList.remove("mt-be-droppable");
		}, t = (e) => {
			if (f.current === null) return;
			let t = f.current, n = e.target;
			if (n instanceof HTMLElement) for (; n.parentNode && n.parentNode !== n;) {
				if (n === t) return;
				n = n.parentNode;
			}
			u(1);
		};
		return document.addEventListener("drop", e, {
			capture: !0,
			passive: !0
		}), window.addEventListener("click", t, {
			capture: !0,
			passive: !0
		}), window.addEventListener("mt-block-editor-click-block", t), () => {
			document.removeEventListener("drop", e, { capture: !0 }), window.removeEventListener("click", t, { capture: !0 });
		};
	}, []), !a) return /* @__PURE__ */ (0, X.jsx)(X.Fragment, {});
	let [m, h] = (0, K.useMemo)(() => [i ? s ? a.selectableTypes(s) : a.shortcutTypes() : [], o ? a.selectableTypes(o) : i ? a.panelTypes() : [...new Set(a.shortcutTypes().concat(a.panelTypes()))]], []), g = i && h.length === 0;
	if (m.length === 0 && h.length === 0) return /* @__PURE__ */ (0, X.jsx)(X.Fragment, {});
	let _ = (0, K.useCallback)(async (t) => {
		Ge(p), c(await t.new({
			editor: a,
			event: new Event("addButton")
		}), e);
	}, [e, c]);
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		/* @__PURE__ */ (0, X.jsx)("input", {
			ref: p,
			className: "mt-be-input--hidden",
			tabIndex: -1
		}),
		/* @__PURE__ */ (0, X.jsxs)("div", {
			className: `mt-be-btn-wrap ${g ? "mt-be-btn-wrap--only-shortcuts" : ""}`,
			ref: d,
			onDragOver: (e) => {
				e.dataTransfer.types.find((e) => e === "Files") && (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy", e.currentTarget.classList.add("mt-be-droppable"));
			},
			onDragEnter: (e) => {
				e.preventDefault(), e.stopPropagation();
			},
			onDragLeave: (e) => {
				e.currentTarget.classList.remove("mt-be-droppable");
			},
			onDrop: async (t) => {
				t.preventDefault(), t.stopPropagation();
				let n = m.concat(h), r = t.dataTransfer.files;
				for (let t = 0; t < r.length; t++) {
					let i = r[t], a = n.find((e) => {
						try {
							return e.canNewFromFile({ file: i });
						} catch {
							return !1;
						}
					});
					a && c(await a.newFromFile({ file: i }), e);
				}
			},
			children: [i && /* @__PURE__ */ (0, X.jsx)("ul", {
				className: "mt-be-shortcut-block-list",
				children: m.map((e) => /* @__PURE__ */ (0, X.jsx)("li", { children: /* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					"data-mt-be-type": e.typeId,
					title: e.label,
					onClick: async (t) => {
						t.preventDefault(), t.stopPropagation(), t.nativeEvent.stopImmediatePropagation(), _(e);
					},
					children: /* @__PURE__ */ (0, X.jsx)("img", { src: e.icon })
				}) }, e.typeId))
			}), h.length === 1 ? /* @__PURE__ */ (0, X.jsx)("button", {
				type: "button",
				className: "mt-be-btn-add",
				onClick: async (e) => {
					e.stopPropagation(), _(h[0]);
				},
				children: n ? n.replace(/{{label}}/, h[0].label) : t || ""
			}) : /* @__PURE__ */ (0, X.jsx)("button", {
				type: "button",
				className: "mt-be-btn-add",
				onClick: async (e) => {
					e.stopPropagation(), u(+(l === 0));
				},
				children: t || ""
			})]
		}),
		/* @__PURE__ */ (0, X.jsx)(xr, {
			nodeRef: f,
			timeout: 100,
			in: l === 0,
			unmountOnExit: !0,
			classNames: "mt-be-block-list-wrapper",
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				className: `mt-be-block-list-wrapper ${r || ""} ${l === 2 ? "mt-be-block-list-wrapper-none" : ""}`,
				ref: f,
				children: /* @__PURE__ */ (0, X.jsx)("ul", {
					className: "mt-be-block-list",
					children: h.map((e) => /* @__PURE__ */ (0, X.jsx)("li", { children: /* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						"data-mt-be-type": e.typeId,
						onClick: async (t) => {
							t.preventDefault(), t.stopPropagation(), t.nativeEvent.stopImmediatePropagation(), u(2), _(e);
						},
						children: /* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("img", { src: e.icon }), /* @__PURE__ */ (0, X.jsx)("span", { children: e.label })] })
					}) }, e.typeId))
				})
			})
		})
	] });
}, (e, t) => e.index === t.index), Dr = (0, K.forwardRef)((e, t) => {
	let n = Yn();
	n.rendered = !0;
	let { block: r, index: i } = n, { swapBlocks: a } = qn(), [o, s] = (0, K.useState)(!1), c = (0, K.useCallback)(() => {
		s((e) => !e), r.focusEditor();
	}, []), l = "mt-be-block-toolbar--block";
	e.className && (l += ` ${e.className}`), e.rows && e.rows >= 2 && (l += ` mt-be-block-toolbar--x${e.rows}`), e.hasBorder === !1 && (l += " mt-be-block-toolbar--no-border");
	let u = e.onMouseDown || ((e) => {
		e.preventDefault();
	});
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("div", {
		className: `mt-be-block-toolbar ${l}`,
		"data-mt-be-toolbar": r.id,
		onMouseDown: u,
		ref: t,
		children: [e.children, /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "mt-be-block-toolbar-default-items",
			children: [
				/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "mt-be-btn-up",
					onClick: () => a(i, i - 1, !0)
				}),
				/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "mt-be-btn-down",
					onClick: () => a(i, i + 1, !0)
				}),
				/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "mt-be-btn-command-panel",
					onClick: c
				})
			]
		})]
	}), /* @__PURE__ */ (0, X.jsxs)(Tr, {
		in: o,
		block: r,
		children: [/* @__PURE__ */ (0, X.jsx)(Er, {
			index: i,
			label: G("Insert before")
		}), /* @__PURE__ */ (0, X.jsx)(Er, {
			index: i + 1,
			label: G("Insert after")
		})]
	})] });
});
Dr.displayName = "BlockToolbar";
//#endregion
//#region src/decorator/blockProperty.tsx
var Or = 5;
function kr(e, t) {
	return K.Children.map(e, (e) => !e || !e.props ? e : (e.props.children && (e = K.cloneElement(e, { children: kr(e.props.children, t) })), t(e)));
}
function Ar(e) {
	return (e.match(/\r|\n/g) || []).length + 1;
}
var jr = {
	id: Symbol("edit"),
	merge(e, t) {
		return e.data.cur = t.data.cur, e;
	},
	undo(e, { editor: t, setFocusedIds: n }) {
		e.data.cur = e.data.cur || e.block[e.data.name], e.block[e.data.name] = e.data.last, n([e.block.id]), t.render();
	},
	redo(e, { editor: t, setFocusedIds: n }) {
		e.block[e.data.name] = e.data.cur, n([e.block.id]), t.render();
	}
};
function Mr(e) {
	return (t) => {
		let n = t.block, { wrapperRef: r } = t.block, [, i] = (0, K.useState)(Object.assign({}, n)), [a, o] = (0, K.useState)({}), s = e(t), c = Z(), { setFocusedIds: l, getFocusedIds: u } = c, d = c.editor;
		return (0, K.useEffect)(() => {
			setTimeout(function() {
				let e = r.current;
				if (!e) return;
				let t = e.querySelector("[data-mt-block-editor-focus-default]");
				if (!t || t.closest("[data-mt-block-editor-block-id]") !== e || !n.isNewlyAdded && t.closest("[data-mt-block-editor-skip-focus-default]")) return;
				let i = document.activeElement;
				i && i.closest(u().map((e) => `[data-mt-block-editor-block-id="${e}"]`).join(",")) || t.focus();
			}, 10), r.current?.querySelectorAll("textarea[data-min-rows]").forEach((e) => {
				e.scrollHeight > e.offsetHeight && (e.style.height = e.scrollHeight + "px");
			});
		}, []), kr(s, (e) => {
			if (e.type !== "input" && e.type !== "textarea" && e.type !== "select" || "defaultValue" in e.props || e.props.onChange && e.props.onKeyDown) return e;
			let r = e.props["data-property-name"] ?? e.props.name;
			if (!(r in n)) return e;
			let s = n[r] === null ? "" : n[r], c = parseInt(e.props["data-min-rows"], 10) || Or;
			return K.cloneElement(e, {
				name: void 0,
				value: s,
				rows: c,
				"data-min-rows": c,
				onChange: e.props.onChange || ((e) => {
					if (!e.target) return;
					let s = e.target, c = n[r], l = s.value;
					n[r] = l, s instanceof HTMLTextAreaElement && Ar(l) !== Ar(c) && (s.scrollHeight <= s.offsetHeight && (s.style.height = ""), s.scrollHeight > s.offsetHeight && (s.style.height = s.scrollHeight + "px")), a[r] || (a[r] = d.editManager.generateGroup(), o(a)), d.editManager.add({
						group: a[r],
						block: t.block,
						data: {
							name: r,
							last: c
						},
						handlers: jr
					}), i(Object.assign({}, n));
				}),
				onKeyDown: e.props.onKeyDown || ((e) => {
					e.target instanceof HTMLInputElement && e.keyCode === 13 && (e.preventDefault(), l([]));
				})
			});
		});
	};
}
//#endregion
//#region src/decorator/index.tsx
var Nr = /* @__PURE__ */ s({ blockProperty: () => Mr }), Pr = Mr(({ children: e }) => /* @__PURE__ */ (0, X.jsx)(Zn, {
	mode: "setup",
	children: /* @__PURE__ */ (0, X.jsx)("div", { children: e })
})), Fr = {
	label: "Label",
	helpText: "Help Text",
	className: "Class Name"
}, Ir = Mr(({ block: e, keys: t = [
	"label",
	"helpText",
	"className"
] }) => /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: t.map((t) => /* @__PURE__ */ (0, X.jsx)(Pr, {
	block: e,
	children: /* @__PURE__ */ (0, X.jsxs)("label", {
		className: "mt-be-label-name",
		style: {
			display: "inline-block",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, X.jsx)("div", { children: G(Fr[t]) }), t === "helpText" ? /* @__PURE__ */ (0, X.jsx)("textarea", {
			"data-property-name": t,
			className: "mt-be-input mt-be-input--full-width",
			"data-min-rows": "1"
		}) : /* @__PURE__ */ (0, X.jsx)("input", {
			type: "text",
			"data-property-name": t,
			className: "mt-be-input mt-be-input--full-width"
		})]
	})
}, t)) })), Lr = ({ block: e, children: t }) => {
	let { editor: n } = Z();
	return n.opts.mode === "setup" ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)("label", {
		className: "mt-be-label-name",
		style: { display: "block" },
		children: /* @__PURE__ */ (0, X.jsx)("div", { children: G("Default Value") })
	}), t] }) : !e.label && !e.helpText ? /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: t }) : /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("label", {
		className: "mt-be-label-name",
		style: { display: "block" },
		onClick: () => {
			e.focusEditor();
		},
		children: [e.label ? /* @__PURE__ */ (0, X.jsx)("div", {
			className: "mt-be-label-block",
			children: e.label
		}) : null, e.helpText ? /* @__PURE__ */ (0, X.jsx)("div", {
			className: "mt-be-help-block",
			children: jn(e.helpText)
		}) : null]
	}), t] });
}, Rr = ({ block: e, html: t, onMouseUp: n }) => {
	let { getFocusedIds: r, setFocusedIds: i } = Z(), a = (0, K.useRef)(null), o = r(), s = o.length >= 2 && o.includes(e.id);
	return (0, K.useEffect)(() => {
		let t = a.current;
		if (!t) return;
		setTimeout(() => {
			let n = window.getComputedStyle(t.childNodes.length > 0 && t.childNodes[0] instanceof HTMLElement ? t.childNodes[0] : t);
			e.editorStyle = {
				lineHeight: n.lineHeight,
				fontSize: n.fontSize,
				fontFamily: n.fontFamily
			};
		}, 10);
		let r = (t) => {
			t.shiftKey || t.ctrlKey || t.metaKey || t.altKey || document.addEventListener("mouseup", (t) => {
				Sn(e.id) && (window.dispatchEvent(new CustomEvent("mt-block-editor-click-block")), n && n(t), i([e.id]));
			}, {
				once: !0,
				passive: !0
			});
		};
		t.addEventListener("mousedown", r, { passive: !0 });
		let o = (t) => {
			t.shiftKey || i([e.id]);
		};
		return t.addEventListener("keyup", o, { passive: !0 }), () => {
			t.removeEventListener("mousedown", r), t.removeEventListener("keyup", o);
		};
	}, [s]), s ? /* @__PURE__ */ (0, X.jsx)("div", { dangerouslySetInnerHTML: { __html: On(t) } }) : /* @__PURE__ */ (0, X.jsx)("div", {
		dangerouslySetInnerHTML: { __html: On(t) },
		contentEditable: "true",
		tabIndex: -1,
		ref: a
	});
}, zr = "data-mt-block-editor-caret", Br = `<br ${zr}="1">`;
function Vr(e, t) {
	try {
		e.focus(!1);
	} catch {
		return;
	}
	if (!e.selection) return;
	let n = e.getBody(), r = n.querySelector(`[${zr}="1"]`);
	if (r) {
		e.selection.select(r, !0), e.dom.remove(r);
		return;
	}
	if (t) {
		let [r, i] = [t.anchor, t.focus].sort(bn), a = Cn(n, r.nthOfTypeIndexes), o = Cn(n, i.nthOfTypeIndexes);
		if (a && o) try {
			let t = e.selection.getRng();
			t.setStart(a, r.offset), t.setEnd(o, i.offset);
			return;
		} catch (e) {
			console.log(e);
		}
	}
	e.selection.select(n, !0), e.selection.collapse(!1);
}
function Hr(e, t) {
	try {
		Vr(e, t);
	} catch (e) {
		console.log(e);
	}
}
function Ur(e) {
	if (e.tinymce) try {
		e.text = e.tinymce.getContent();
	} catch (e) {
		console.log(e);
	}
	let t = e.tinymce || tinymce.get(e.tinymceId());
	if (e.tinymce = null, t) try {
		t.remove();
	} catch (e) {
		console.log(e);
	}
}
async function Wr(e, t, n) {
	let r = e.dom.getRoot(), i = await new Promise((e, n) => {
		let r = (i) => {
			let a = document.querySelector(`[data-mt-be-toolbar="${t.id}"]`);
			a ? e(a) : i > 100 ? n() : setTimeout(() => r(i + 1), 100);
		};
		r(0);
	});
	if (matchMedia("(max-width:991.5px)").matches) {
		let e = r.closest(".block");
		if (e?.closest(".column")) {
			let t = n.getBoundingClientRect(), r = e.getBoundingClientRect();
			i.style.left = `-${r.left - t.left}px`, i.style.setProperty("width", `calc(100vw - ${t.left}px)`, "important");
		}
	}
	i.style.top = `-${i.offsetHeight}px`;
}
//#endregion
//#region src/img/paste.svg
var Gr = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.2,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='レイヤー_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%2024%2024'%20style='enable-background:new%200%200%2024%2024;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:none;stroke:%23666666;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}%20%3c/style%3e%3cdesc%3eDownload%20more%20icon%20variants%20from%20https://tabler-icons.io/i/clipboard%3c/desc%3e%3cpath%20class='st0'%20d='M18.9,22h-5.8c-0.6,0-1.2-0.5-1.2-1.2v-8.1c0-0.6,0.5-1.2,1.2-1.2h4.1l2.9,2.9v6.4C20.1,21.5,19.5,22,18.9,22z'%20/%3e%3cline%20class='st0'%20x1='14.3'%20y1='15'%20x2='14.8'%20y2='15'/%3e%3cline%20class='st0'%20x1='14.3'%20y1='18.5'%20x2='17.7'%20y2='18.5'/%3e%3cpath%20class='st0'%20d='M17.2,11.6v2.3c0,0.3,0.3,0.6,0.6,0.6h2.3'/%3e%3cpath%20class='st0'%20d='M19,9V7c0-1.1-0.9-2-2-2h-2'/%3e%3cpath%20class='st0'%20d='M9,5H7C5.9,5,5,5.9,5,7v12c0,1.1,0.9,2,2,2h2'/%3e%3cpath%20class='st0'%20d='M11,3h2c1.1,0,2,0.9,2,2l0,0c0,1.1-0.9,2-2,2h-2C9.9,7,9,6.1,9,5l0,0C9,3.9,9.9,3,11,3z'/%3e%3c/svg%3e", Kr = class extends CustomEvent {
	constructor(e) {
		super("mt-block-editor-command", { detail: e });
	}
}, qr = class e {
	static allCommands = [];
	static _allContextCommands;
	editor;
	eventEmitters = /* @__PURE__ */ new Map();
	static registerCommand(t) {
		e.allCommands.push(t), e._allContextCommands = void 0;
	}
	static get allContextCommands() {
		return this._allContextCommands ||= e.allCommands.filter((e) => !!e.label);
	}
	constructor(e) {
		this.editor = e.editor;
	}
	async contextCommands() {
		return (await Promise.all(e.allContextCommands.map(async (e) => await e.condition?.() ?? !0 ? e : void 0))).filter((e) => !!e);
	}
	async commands() {
		return (await Promise.all(e.allCommands.map(async (e) => await e.condition?.() ?? !0 ? e : void 0))).filter((e) => !!e);
	}
	on(e, t, n) {
		let r = this.eventEmitters.get(e);
		r || this.eventEmitters.set(e, r = new Fe.default()), r.on(t, n);
	}
	removeAllListenersOfBlock(e) {
		this.eventEmitters.get(e)?.removeAllListeners(), this.eventEmitters.delete(e);
	}
	emit(e, t, ...n) {
		for (let r = 0, i = e.length; r < i; r++) this.eventEmitters.get(e[r])?.emit(t, ...n);
	}
	dispatchKeydownEvent({ event: e, blockIds: t, editorContext: n, blocksContext: r }) {
		let i = hl(e), a = this.editor.keyboardShortcutMap()[i];
		a && a.callback && a.callback({
			blocks: sl(this.editor, t),
			editorContext: n,
			blocksContext: r,
			event: e
		});
	}
	execute({ command: t, blockIds: n, editorContext: r, blocksContext: i, event: a }) {
		e.allCommands.forEach((e) => {
			e.command === t && e.callback && e.callback({
				blocks: sl(this.editor, n),
				editorContext: r,
				blocksContext: i,
				event: a
			});
		});
	}
};
function Jr({ block: e, commands: t }, n) {
	let { editor: { commandManager: r } } = Z();
	(0, K.useEffect)(() => {
		for (let n of t) n.callback && r.on(e, n.command, n.callback);
		return () => {
			r.removeAllListenersOfBlock(e);
		};
	}, n);
}
//#endregion
//#region src/commands/pasteBlock.ts
var Yr = "core-pasteBlock", Xr = class extends Kr {
	constructor({ blockIds: e, editorContext: t, blocksContext: n, clipboardData: r }) {
		super({
			command: Yr,
			blockIds: e,
			editorContext: t,
			blocksContext: n,
			extra: { clipboardData: r }
		});
	}
	get clipboardData() {
		return this.detail.extra.clipboardData;
	}
}, Zr = {
	get label() {
		return G("Paste");
	},
	icon: Gr,
	shortcut: "cmd+v",
	command: Yr,
	condition: async () => typeof navigator.clipboard?.read == "function",
	callback: async ({ blocks: e, editorContext: { editor: t, setFocusedIds: n }, blocksContext: { addBlock: r }, event: i }) => {
		if (e.length === 0 || document.querySelector("[data-mt-be-dialog]") || i instanceof KeyboardEvent && i.target instanceof HTMLElement && i.target.closest("[data-mt-block-editor-block-id], [data-mt-be-toolbar], .modal") || i?.target instanceof HTMLElement && i.target.id === "mcepastebin" || !(i instanceof ClipboardEvent || i instanceof Xr || typeof navigator.clipboard.read == "function")) return;
		let a = "";
		if (i instanceof ClipboardEvent || i instanceof Xr) {
			let e = i.clipboardData?.items || [];
			for (let t of e) (t.type === "text/plain" || t.type === "text/html") && (a = i.clipboardData?.getData(t.type) || "");
			if (!a.match(/<!-- mt-beb .*? \/mt-beb -->$/)) return;
			i.preventDefault();
		} else {
			i.preventDefault();
			for (let e of await navigator.clipboard.read()) {
				let t = e.types;
				if (t.includes("text/html")) {
					a = await (await e.getType("text/html")).text(), a.match(/<!-- mt-beb .*? \/mt-beb -->/) && t.includes("text/plain") && (a = await (await e.getType("text/plain")).text());
					break;
				}
				for (let n of t) {
					a = await (await e.getType(n)).text();
					break;
				}
			}
		}
		if (a === "") return;
		let o = await al(rl(a), t.factory, new _l(), "core-text");
		if (o.length !== 0) {
			t.editManager.beginGrouping();
			for (let t of o.reverse()) r(t, e[e.length - 1]);
			t.editManager.endGrouping(), n([o[0].id]), t.render();
		}
	}
}, Qr = /* @__PURE__ */ "onabortonblur.oncancel.oncanplay.oncanplaythrough.onchange.onclick.onclose.oncontextmenu.oncuechange.ondblclick.ondrag.ondragend.ondragenter.ondragleave.ondragover.ondragstart.ondrop.ondurationchange.onemptied.onended.onerror.onfocus.oninput.oninvalid.onkeydown.onkeypress.onkeyup.onload.onloadeddata.onloadedmetadata.onloadstart.onmousedown.onmousemove.onmouseout.onmouseover.onmouseup.onmousewheel.onpause.onplay.onplaying.onprogress.onratechange.onreset.onscroll.onseeked.onseeking.onseeking.onselect.onshow.onstalled.onsubmit.onsuspend.ontimeupdate.onvolumechange.onwaiting.formaction.action".split("."), $r = "data-mt-be-ev-", ei = Qr.join(","), ti = Qr.map((e) => `${$r}${e}`).join(",");
function ni(e) {
	e.parser.addAttributeFilter(ei, (e, t) => {
		e.forEach((e) => {
			e.attr($r + t) || e.attr($r + t, e.attr(t) || ""), e.attr(t, "javascript:void(0)");
		});
	}), e.serializer.addAttributeFilter(ti, (e, t) => {
		e.forEach((e) => {
			if (e.attr(t)) {
				let n = t.substring(14);
				e.attr(n, e.attr(t) || "");
			}
			e.attr(t, null);
		});
	});
}
var ri = "data-mt-be-comment ";
function ii(e) {
	e.parser.addNodeFilter("#comment", function(e) {
		e.forEach((e) => {
			e.value &&= ri + escape(e.value);
		});
	}), e.serializer.addNodeFilter("#comment", function(e) {
		e.forEach((e) => {
			let t = e.value;
			t && t.indexOf(ri) === 0 && (e.value = unescape(t.substring(19)));
		});
	});
}
function ai(e) {
	e.on("PreInit", ({ target: e }) => {
		ni(e), !(parseInt(e.editorManager.majorVersion) >= 6) && ii(e);
	}), e.on("drop paste", function(e) {
		let t = [], n = e.dataTransfer || e.clipboardData;
		for (let e = 0; e < n.items.length; e++) {
			let r = n.items[e];
			if (r.kind === "string" && r.type === "text/plain") {
				let e = n.getData("text/plain");
				if (e && !e.startsWith("file://")) return;
			} else if (/text\/(html|plain)/.test(r.type)) return;
			else r.kind === "file" && /^image\//.test(r.type) && t.push(r.getAsFile());
		}
		if (t.length !== 0) return !1;
	});
}
//#endregion
//#region src/Block/Text/tinymce/tinymce.ts
var oi = void 0, si = () => (oi ||= parseInt(tinymce.majorVersion), oi), ci = (() => {
	let e = !1;
	return () => {
		e || (e = !0, tinymce.PluginManager.add("MTBlockEditor", ai));
	};
})(), li = (e, t, n, r) => ({
	language: e.opts.i18n.lng,
	selector: `#${t.tinymceId()}`,
	menubar: !1,
	contextmenu: !1,
	fixed_toolbar_container: `[data-mt-be-toolbar="${t.id}"]`,
	inline: !0,
	paste_preprocess: (e, i) => {
		let a = i.content.match(/^&lt;!-- mt-beb .* \/mt-beb --&gt;$/) ? kn(i.content) : i.content;
		if (a.match(/<!-- mt-beb .*? \/mt-beb -->$/)) {
			if (i.preventDefault?.(), si() >= 6) return;
			let e = new DataTransfer();
			e.setData("text/html", a), window.dispatchEvent(new Xr({
				blockIds: [t.id],
				editorContext: n,
				blocksContext: r,
				clipboardData: e
			}));
		}
	}
}), ui = {
	id: Symbol("edit"),
	merge(e, t) {
		e.data.cur = t.data.last;
	},
	undo(e, { setFocusedIds: t }) {
		let n = e.block, r = e.data, i = tinymce.get(n.tinymceId());
		i ? (r.cur = r.cur || i.getContent(), si() >= 6 ? i.dispatch("MTBlockEditorEdit", { html: r.last }) : i.fire("MTBlockEditorEdit", { html: r.last })) : (r.cur = r.cur || n.text, n.text = r.last, t([n.id]));
	},
	redo(e, { setFocusedIds: t }) {
		let n = e.block, r = e.data, i = tinymce.get(n.tinymceId());
		i ? si() >= 6 ? i.dispatch("MTBlockEditorEdit", { html: r.cur }) : i.fire("MTBlockEditorEdit", { html: r.cur }) : (n.text = r.cur, t([n.id]));
	}
}, di = {
	p: "Paragraph",
	h1: "Heading 1",
	h2: "Heading 2",
	h3: "Heading 3",
	h4: "Heading 4",
	h5: "Heading 5",
	h6: "Heading 6",
	pre: "Preformatted"
}, fi = {
	DependsOnContent: Symbol(),
	Visible: Symbol(),
	Invisible: Symbol()
}, pi = ({ block: e, canRemove: t }) => {
	let n = qn(), r = Z(), { editor: i, setFocusedIds: a } = r, { addBlock: o, removeBlock: s, mergeBlock: c } = qn(), l = Sn(e.id), u = (0, K.useMemo)(() => {
		let u = si() >= 6 ? {
			plugins: [
				"lists",
				"media",
				"code",
				"link",
				"MTBlockEditor"
			],
			toolbar: ["blocks | bold italic underline strikethrough forecolor backcolor removeformat | alignleft aligncenter alignright | code", "bullist numlist outdent indent | blockquote link unlink"]
		} : {
			plugins: "lists paste media code hr link MTBlockEditor",
			toolbar: ["formatselect | bold italic underline strikethrough forecolor backcolor removeformat | alignleft aligncenter alignright | code", "bullist numlist outdent indent | blockquote link unlink"]
		}, d = {
			...li(i, e, r, n),
			...u,
			init_instance_callback: (n) => {
				e.tinymce = n, n.setContent(e.text), Hr(n, l);
				let r = n.dom.getRoot();
				n.undoManager.add = () => (si() >= 6 ? n.dispatch("Change") : n.fire("Change"), null);
				let u = e.text.replace(Br, "");
				n.on("MTBlockEditorEdit", (e) => {
					n.dom.setHTML(n.getBody(), e.html), u = e.html;
				}), n.on("SaveContent", (e) => {
					e.content = On(e.content);
				});
				let d = () => {
					let t = n.getContent();
					u !== t && (i.editManager.add({
						block: e,
						data: { last: u },
						handlers: ui
					}), u = t);
				};
				n.on("NodeChange Change", (s) => {
					let c = [...r.children].filter((e) => !e.classList.contains("mce-resizehandle"));
					if (c.length <= 1 || r.querySelector(".mce-pastebin")) {
						d();
						return;
					}
					if (!c.shift()) {
						d();
						return;
					}
					s.type !== "change" && (c.reverse(), c.forEach((e) => {
						n.dom.remove(e);
					}), i.editManager.beginGrouping(), d(), t ? c.forEach((t, n) => {
						if (n === 0 && He()) {
							let e = i.editorElement.getBoundingClientRect(), t = r.getBoundingClientRect(), n = document.createElement("input");
							n.classList.add("mt-be-input--hidden"), n.style.top = t.top - e.top + "px", i.editorElement.appendChild(n), n.focus(), setTimeout(() => {
								n.remove();
							}, 5 * 1e3);
						}
						if ([...t.querySelectorAll("br[data-mce-bogus=\"1\"]")].forEach((e) => e.remove()), t.childNodes.length !== 0 && n === c.length - 1) {
							let e;
							if (["UL", "OL"].find((e) => t.tagName === e) ? e = t.querySelector("LI") : t.textContent === "" && t.querySelector("audio, canvas, embed, iframe, img, math, object, svg, video, button, details, embed, iframe, keygen, select, textarea, input:not([type=\"hidden\"]), menu:not([type=\"toolbar\"])") === null ? (t.textContent = "", e = null) : e = t, e) {
								let t = document.createElement("br");
								t.setAttribute(zr, "1"), e.insertBefore(t, e.firstChild);
							}
						}
						o(new mi({
							text: t.childNodes.length === 0 ? "" : t.outerHTML,
							toolbarVisibleStatus: fi.Invisible
						}), e);
					}) : a([]), i.editManager.endGrouping());
				});
				let f = !1;
				si() >= 6 ? n.on("beforeinput", (e) => {
					e.inputType.startsWith("delete") && (f = !0, setTimeout(() => {
						f = !1;
					}, 50));
				}) : r.addEventListener("keydown", (e) => {
					(e.keyCode === 8 || e.keyCode === 46) && !(r.textContent === "" && n.getContent() === "") && (f = !0, setTimeout(() => {
						f = !1;
					}, 50));
				}, { capture: !0 }), n.on("keydown", (i) => {
					if (setTimeout(() => {
						let t = document.querySelector(`[data-mt-be-toolbar="${e.id}"]`);
						t && (n.selection.getRng().collapsed ? t.classList.add("invisible") : t.classList.remove("invisible"));
					}), i.keyCode === 8 || i.keyCode === 46) if (r.textContent === "" && n.getContent() === "") f || (t && s(e), i.preventDefault());
					else {
						let t = n.selection.getSel(), a = n.selection.getStart(), o = n.selection.getRng();
						o.collapsed && o.startOffset === 0 && (t.anchorNode === r.firstChild || a === r.firstChild) && !a.previousSibling && t.anchorNode && !t.anchorNode.previousSibling && (i.preventDefault(), c(e));
					}
				}), Wr(n, e, i.editorElement);
			},
			...i.opts.block["core-text"]?.tinyMCESettings || {}
		};
		return i.emit("buildTinyMCESettings", {
			editor: i,
			block: e,
			settings: d
		}), d;
	}, []);
	(0, K.useEffect)(() => (ci(), tinymce.init(u), () => {
		Ur(e);
	}), []);
	let d = e.html(), f = i.opts.mode === "setup", p = e.toolbarVisibleStatus === fi.Visible || e.toolbarVisibleStatus === fi.DependsOnContent && d === "";
	return e.toolbarVisibleStatus = fi.DependsOnContent, /* @__PURE__ */ (0, X.jsxs)("div", {
		onClick: () => {
			document.querySelector(`[data-mt-be-toolbar="${e.id}"]`)?.classList.remove("invisible");
		},
		style: e.editorStyle,
		children: [
			/* @__PURE__ */ (0, X.jsx)(Ir, { block: e }),
			/* @__PURE__ */ (0, X.jsx)(Lr, {
				block: e,
				children: /* @__PURE__ */ (0, X.jsx)("div", {
					id: e.tinymceId(),
					className: f ? "mt-be-input-container" : "",
					dangerouslySetInnerHTML: { __html: On(d) }
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(Dr, {
				rows: Array.isArray(u.toolbar) ? u.toolbar.length : 2,
				hasBorder: !1,
				className: `mt-be-block-toolbar--tinymce ${p ? "" : "invisible"}`,
				onMouseDown: (e) => {
					An(e.nativeEvent) || e.preventDefault();
				}
			})
		]
	});
}, mi = class e extends Un {
	static typeId = "core-text";
	static selectable = !0;
	static icon = Xn;
	static get label() {
		return G("Text Block");
	}
	text = "";
	editorStyle = {};
	tinymce = null;
	toolbarVisibleStatus = fi.DependsOnContent;
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	placeholderLabel() {
		return G("Text");
	}
	contentLabel() {
		let e = this.htmlString().match(/<(\w+)/);
		if (e) {
			let t = e[1].toLowerCase();
			return di[t] && (t = G(di[t])), `${super.contentLabel()} - ${t}`;
		} else return super.contentLabel();
	}
	isBlank() {
		return this.html() === "";
	}
	focusEditor() {
		this.tinymce && this.tinymce.focus(!1);
	}
	tinymceId() {
		return `textarea-${this.id}`;
	}
	editor({ focus: e, focusBlock: t, canRemove: n }) {
		if (e) return /* @__PURE__ */ (0, X.jsx)(pi, {
			block: this,
			canRemove: n
		}, this.id);
		if (t || this.htmlString()) {
			let e = /* @__PURE__ */ (0, X.jsx)(Rr, {
				block: this,
				html: this.htmlString(),
				onMouseUp: () => {
					this.toolbarVisibleStatus = fi.Visible;
				}
			});
			return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "composition",
				children: /* @__PURE__ */ (0, X.jsx)(Lr, {
					block: this,
					children: e
				})
			}), /* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "setup",
				children: e
			})] });
		} else return this.placeholder();
	}
	canMerge(e) {
		return e instanceof this.constructor;
	}
	merge(e) {
		let t = {
			block: this,
			data: { last: this.html() },
			handlers: ui
		};
		return this.text = this.html().replace(/(<\/[^>]*>)?$/, (t, n) => {
			let r = e.html();
			return n ? Br + r.replace(/^<[^>]*>|<\/[^>]*>$/g, "") + n : r.replace(/^(<[^>]*>)/, (e, t) => t + Br);
		}), t;
	}
	html() {
		if (this.tinymce) try {
			return this.tinymce.getContent();
		} catch (e) {
			console.log(e);
		}
		return this.text;
	}
	static async newFromHtml({ html: t, meta: n }) {
		return new e(Object.assign({ text: t }, n));
	}
}, hi = "data-mt-block-editor-caret", gi = `<br ${hi}="1">`;
function _i(e, t) {
	try {
		e.focus();
	} catch {
		return;
	}
	let n = e.tiptap.view.dom.querySelector(`[${hi}="1"]`);
	if (n) {
		let t = e.tiptap.view.posAtDOM(n, 0), r = e.tiptap.state.doc.resolve(t), i = e.tiptap.state.selection.constructor.create(e.tiptap.state.doc, r.pos, r.pos + 1);
		e.tiptap.view.dispatch(e.tiptap.state.tr.setSelection(i).deleteSelection());
	} else if (t) try {
		let n = Cn(e.tiptap.view.dom, t.anchor.nthOfTypeIndexes), r = Cn(e.tiptap.view.dom, t.focus.nthOfTypeIndexes);
		if (n && r) {
			let i = e.tiptap.view.posAtDOM(n, t.anchor.offset), a = e.tiptap.view.posAtDOM(r, t.focus.offset), o = e.tiptap.state.selection.constructor.create(e.tiptap.state.doc, i, a);
			e.tiptap.view.dispatch(e.tiptap.state.tr.setSelection(o));
		}
	} catch (e) {
		console.warn("Failed to set selection:", e);
	}
}
function vi(e, t) {
	try {
		_i(e, t);
	} catch (e) {
		console.log(e);
	}
}
function yi(e) {
	if (e.mtRichTextEditor) try {
		e.text = e.mtRichTextEditor.getContent();
	} catch (e) {
		console.log(e);
	}
	e.mtRichTextEditor = null, MTRichTextEditor.unload({ id: e.mtRichTextEditorId() });
}
async function bi(e, t) {
	let n = await new Promise((t, n) => {
		let r = (i) => {
			let a = document.querySelector(`[data-mt-be-toolbar="${e.id}"]`);
			a ? t(a) : i > 100 ? n() : setTimeout(() => r(i + 1), 100);
		};
		r(0);
	});
	if (matchMedia("(max-width:991.5px)").matches && n?.closest(".mt-be-column")) {
		let e = n.parentElement?.closest(".mt-be-block"), r = e.getBoundingClientRect();
		for (;;) {
			let t = e.parentElement?.closest(".mt-be-block");
			if (t) e = t;
			else break;
		}
		let i = t.getBoundingClientRect(), a = e.children[0].getBoundingClientRect(), o = r.left - a.left;
		n.style.left = `-${o}px`, n.style.setProperty("width", `calc(${i.width - a.left * 2}px)`, "important");
	}
	n.style.top = `-${n.offsetHeight}px`;
}
var xi = "mt-be-command-placeholder", Si = !1;
function Ci(e) {
	matchMedia("(max-width:991.5px)").matches && (Si ||= (customElements.define(`mt-rich-text-editor-toolbar-item-${xi}`, class extends HTMLElement {
		connectedCallback() {
			this.style.display = "inline-block", this.style.width = "100px";
		}
	}), !0), e.toolbar.at(-1)[1] || (e.toolbar.at(-1)[1] = []), e.toolbar.at(-1)[1].unshift([xi]));
}
//#endregion
//#region src/Block/Text/mt-rich-text-editor/edit.ts
var wi = {
	id: Symbol("edit"),
	merge(e, t) {
		e.data.cur = t.data.last;
	},
	undo(e, { setFocusedIds: t }) {
		let n = e.block, r = e.data, i = MTRichTextEditor.get({ id: n.mtRichTextEditorId() });
		i ? (r.cur ||= i.getContent(), i.setContent(r.last), r.onUndo(r.last)) : (r.cur = r.cur || n.text, n.text = r.last, t([n.id]));
	},
	redo(e, { setFocusedIds: t }) {
		let n = e.block, r = e.data, i = MTRichTextEditor.get({ id: n.mtRichTextEditorId() });
		i ? (r.cur ||= i.getContent(), i.setContent(r.cur)) : (n.text = r.cur, t([n.id]));
	}
}, Ti = (e, t) => ({
	height: "auto",
	language: e.opts.i18n.lng ?? "en",
	id: t.mtRichTextEditorId(),
	fixed_toolbar_container: `[data-mt-be-toolbar="${t.id}"]`,
	inline: !0,
	editorStylesheets: ["\n    .mt-rich-text-editor-editor { border: none; }\n    .mt-rich-text-editor-content-root>.tiptap { padding: 0; }\n    .mt-rich-text-editor-content-root>.tiptap:after { content: \"\"; height: 0; }\n    "],
	stylesheets: ["\n    p { margin: 0; }\n    "],
	pasteMenu: [
		"embedInline",
		"html",
		"link",
		"text",
		"markdown"
	],
	extensionOptions: {
		undoRedo: {
			depth: 1,
			registerShortcuts: !1
		},
		embedObject: { resolver: e.opts.block["core-text"]?.embedObjectResolver }
	}
}), Ei = {
	p: "Paragraph",
	h1: "Heading 1",
	h2: "Heading 2",
	h3: "Heading 3",
	h4: "Heading 4",
	h5: "Heading 5",
	h6: "Heading 6",
	pre: "Preformatted"
}, Di = {
	DependsOnContent: Symbol(),
	Visible: Symbol(),
	Invisible: Symbol()
}, Oi = ({ block: e, canRemove: t }) => {
	qn();
	let { editor: n, setFocusedIds: r } = Z(), { addBlock: i, removeBlock: a, mergeBlock: o } = qn(), s = Sn(e.id), c = (0, K.useRef)(null), l = (0, K.useMemo)(() => {
		let t = {
			...Ti(n, e),
			toolbar: [[[
				["block"],
				[
					"bold",
					"italic",
					"underline",
					"strike",
					"foregroundColor",
					"backgroundColor",
					"removeFormat"
				],
				[
					"alignLeft",
					"alignCenter",
					"alignRight"
				],
				["source"]
			]], [[[
				"bulletList",
				"orderedList",
				"indent",
				"outdent"
			], [
				"blockquote",
				"link",
				"unlink"
			]]]],
			...n.opts.block["core-text"]?.mtRichTextEditorSettings || {}
		};
		return n.emit("buildMTRichTextEditorSettings", {
			editor: n,
			block: e,
			settings: t
		}), Ci(t), t;
	}, []);
	(0, K.useEffect)(() => {
		let u = document.createElement("div");
		return c.current?.appendChild(u), l.toolbarContainer = u, MTRichTextEditor.create(l).then((c) => {
			e.mtRichTextEditor = c, c.setContent(e.text), vi(c, s), bi(e, n.editorElement);
			let l = e.text, u = (e) => {
				l = e;
			}, d = () => {
				let t = c.getContent();
				l !== t && (n.editManager.add({
					block: e,
					data: {
						last: l,
						onUndo: u
					},
					handlers: wi
				}), l = t);
			}, f = c.tiptap.view.dom;
			c.tiptap.on("update", (a) => {
				if (a.transaction.getMeta("paste")) return;
				let o = [...f.children];
				if (o.length <= 1) {
					d();
					return;
				}
				let s = o.shift();
				if (!s) {
					d();
					return;
				}
				o.reverse(), c.tiptap.commands.setContent(s.outerHTML), n.editManager.beginGrouping(), d(), t ? o.forEach((t, n) => {
					if (t.childNodes.length !== 0 && n === o.length - 1) {
						let e;
						if (["UL", "OL"].find((e) => t.tagName === e) ? e = t.querySelector("LI") : t.textContent === "" && t.querySelector("audio, canvas, embed, iframe, img, math, object, svg, video, button, details, embed, iframe, keygen, select, textarea, input:not([type=\"hidden\"]), menu:not([type=\"toolbar\"])") === null ? (t.textContent = "", e = null) : e = t, e) {
							let t = document.createElement("br");
							t.setAttribute(hi, "1"), e.insertBefore(t, e.firstChild);
						}
					}
					i(new ki({
						text: t.childNodes.length === 0 ? "" : t.outerHTML,
						toolbarVisibleStatus: Di.Invisible
					}), e);
				}) : r([]), n.editManager.endGrouping();
			}), f.addEventListener("keydown", (t) => {
				if (setTimeout(() => {
					let t = document.querySelector(`[data-mt-be-toolbar="${e.id}"]`);
					t && (c.tiptap.state.selection.empty ? t.classList.add("invisible") : t.classList.remove("invisible"));
				}), t.keyCode === 8 || t.keyCode === 46) {
					if (f.textContent === "") {
						let n = c.getContent();
						if (n === "" || n === "<p></p>") {
							t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), a(e);
							return;
						}
					}
					c.tiptap.state.selection.$from.pos === 1 && (t.preventDefault(), o(e));
				}
			}, { capture: !0 });
		}), () => {
			yi(e);
		};
	}, []);
	let u = e.html(), d = n.opts.mode === "setup", f = e.toolbarVisibleStatus === Di.Visible || e.toolbarVisibleStatus === Di.DependsOnContent && u === "";
	return e.toolbarVisibleStatus = Di.DependsOnContent, /* @__PURE__ */ (0, X.jsxs)("div", {
		onClick: () => {
			document.querySelector(`[data-mt-be-toolbar="${e.id}"]`)?.classList.remove("invisible");
		},
		style: e.editorStyle,
		children: [
			/* @__PURE__ */ (0, X.jsx)(Ir, { block: e }),
			/* @__PURE__ */ (0, X.jsx)(Lr, {
				block: e,
				children: /* @__PURE__ */ (0, X.jsx)("div", {
					id: e.mtRichTextEditorId(),
					className: d ? "mt-be-input-container" : "",
					dangerouslySetInnerHTML: { __html: On(u) }
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(Dr, {
				rows: l.toolbar?.length || 0,
				hasBorder: !1,
				className: `mt-be-block-toolbar--mt-rich-text-editor ${f ? "" : "invisible"}`,
				onMouseDown: (e) => {
					An(e.nativeEvent) || e.preventDefault();
				},
				ref: c
			})
		]
	});
}, ki = class e extends Un {
	static typeId = "core-text";
	static selectable = !0;
	static icon = Xn;
	static get label() {
		return G("Text Block");
	}
	text = "";
	editorStyle = {};
	mtRichTextEditor = null;
	toolbarVisibleStatus = Di.DependsOnContent;
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	placeholderLabel() {
		return G("Text");
	}
	contentLabel() {
		let e = this.htmlString().match(/<(\w+)/);
		if (e) {
			let t = e[1].toLowerCase();
			return Ei[t] && (t = G(Ei[t])), `${super.contentLabel()} - ${t}`;
		} else return super.contentLabel();
	}
	isBlank() {
		return this.html() === "";
	}
	focusEditor() {
		this.mtRichTextEditor && this.mtRichTextEditor.focus();
	}
	mtRichTextEditorId() {
		return `textarea-${this.id}`;
	}
	editor({ focus: e, focusBlock: t, canRemove: n }) {
		if (e) return /* @__PURE__ */ (0, X.jsx)(Oi, {
			block: this,
			canRemove: n
		}, this.id);
		if (t || this.htmlString()) {
			let e = /* @__PURE__ */ (0, X.jsx)(Rr, {
				block: this,
				html: this.htmlString(),
				onMouseUp: () => {
					this.toolbarVisibleStatus = Di.Visible;
				}
			});
			return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "composition",
				children: /* @__PURE__ */ (0, X.jsx)(Lr, {
					block: this,
					children: e
				})
			}), /* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "setup",
				children: e
			})] });
		} else return this.placeholder();
	}
	canMerge(e) {
		return e instanceof this.constructor;
	}
	merge(e) {
		let t = {
			block: this,
			data: { last: this.html() },
			handlers: wi
		};
		return this.text = this.html().replace(/(<\/[^>]*>)?$/, (t, n) => {
			let r = e.html();
			return n ? gi + r.replace(/^<[^>]*>|<\/[^>]*>$/g, "") + n : r.replace(/^(<[^>]*>)/, (e, t) => t + gi);
		}), t;
	}
	html() {
		if (this.mtRichTextEditor) try {
			return this.mtRichTextEditor.getContent();
		} catch (e) {
			console.log(e);
		}
		return this.text;
	}
	static async newFromHtml({ html: t, meta: n }) {
		return new e(Object.assign({ text: t }, n));
	}
}, Ai = "MTRichTextEditor" in globalThis ? ki : mi, ji = /* @__PURE__ */ l(rr()), Mi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ni(e, t) {
	return e(t = { exports: {} }, t.exports), t.exports;
}
var Pi = Ni((function(e) {
	(function(t) {
		var n = function(e, t, r) {
			if (!c(t) || u(t) || d(t) || f(t) || s(t)) return t;
			var i, a = 0, o = 0;
			if (l(t)) for (i = [], o = t.length; a < o; a++) i.push(n(e, t[a], r));
			else for (var p in i = {}, t) Object.prototype.hasOwnProperty.call(t, p) && (i[e(p, r)] = n(e, t[p], r));
			return i;
		}, r = function(e) {
			return p(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, (function(e, t) {
				return t ? t.toUpperCase() : "";
			}))).substr(0, 1).toLowerCase() + e.substr(1);
		}, i = function(e) {
			var t = r(e);
			return t.substr(0, 1).toUpperCase() + t.substr(1);
		}, a = function(e, t) {
			return function(e, t) {
				var n = (t ||= {}).separator || "_", r = t.split || /(?=[A-Z])/;
				return e.split(r).join(n);
			}(e, t).toLowerCase();
		}, o = Object.prototype.toString, s = function(e) {
			return typeof e == "function";
		}, c = function(e) {
			return e === Object(e);
		}, l = function(e) {
			return o.call(e) == "[object Array]";
		}, u = function(e) {
			return o.call(e) == "[object Date]";
		}, d = function(e) {
			return o.call(e) == "[object RegExp]";
		}, f = function(e) {
			return o.call(e) == "[object Boolean]";
		}, p = function(e) {
			return (e -= 0) == e;
		}, m = function(e, t) {
			var n = t && "process" in t ? t.process : t;
			return typeof n == "function" ? function(t, r) {
				return n(t, e, r);
			} : e;
		}, h = {
			camelize: r,
			decamelize: a,
			pascalize: i,
			depascalize: a,
			camelizeKeys: function(e, t) {
				return n(m(r, t), e);
			},
			decamelizeKeys: function(e, t) {
				return n(m(a, t), e, t);
			},
			pascalizeKeys: function(e, t) {
				return n(m(i, t), e);
			},
			depascalizeKeys: function() {
				return this.decamelizeKeys.apply(this, arguments);
			}
		};
		e.exports ? e.exports = h : t.humps = h;
	})(Mi);
})).decamelize, Fi = function(e) {
	if (Array.isArray(e)) return e;
}, Ii = function(e, t) {
	if (typeof Symbol < "u" && Symbol.iterator in Object(e)) {
		var n = [], r = !0, i = !1, a = void 0;
		try {
			for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
		} catch (e) {
			i = !0, a = e;
		} finally {
			try {
				r || s.return == null || s.return();
			} finally {
				if (i) throw a;
			}
		}
		return n;
	}
}, Li = function(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}, Ri = function(e, t) {
	if (e) {
		if (typeof e == "string") return Li(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Li(e, t) : void 0;
	}
}, zi = function() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}, Bi = function(e, t) {
	return Fi(e) || Ii(e, t) || Ri(e, t) || zi();
}, Vi = Ni((function(e) {
	function t() {
		return e.exports = t = Object.assign || function(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
			}
			return e;
		}, t.apply(this, arguments);
	}
	e.exports = t;
})), Hi = function(e, t) {
	if (e == null) return {};
	var n, r, i = {}, a = Object.keys(e);
	for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
	return i;
}, Ui = function(e, t) {
	if (e == null) return {};
	var n, r, i = Hi(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}, Wi = (0, K.createContext)(null);
function Gi(e) {
	var t = e.children, n = t === void 0 ? "" : t, r = Ui(e, ["children"]);
	return typeof n != "string" && (n = (0, Pn.renderToString)(n)), K.createElement("template", Vi({}, r, { dangerouslySetInnerHTML: { __html: n } }));
}
function Ki(e) {
	var t = e.root, n = e.children;
	return (0, dr.createPortal)(n === void 0 ? null : n, t);
}
function qi(e) {
	var t = (0, K.forwardRef)((function(t, n) {
		var r, i, a = t.mode, o = a === void 0 ? "open" : a, s = t.delegatesFocus, c = s !== void 0 && s, l = t.styleSheets, u = l === void 0 ? [] : l, d = t.ssr, f = d !== void 0 && d, p = t.children, m = Ui(t, [
			"mode",
			"delegatesFocus",
			"styleSheets",
			"ssr",
			"children"
		]), h = (i = (0, K.useRef)((r = n) && r.current), (0, K.useEffect)((function() {
			r && (r.current = i.current);
		}), [r]), i), g = Bi((0, K.useState)(null), 2), _ = g[0], v = g[1], y = `node_${o}${c}`;
		return (0, K.useLayoutEffect)((function() {
			if (h.current) try {
				if (typeof n == "function" && n(h.current), f) {
					var e = h.current.shadowRoot;
					v(e);
					return;
				}
				var t = h.current.attachShadow({
					mode: o,
					delegatesFocus: c
				});
				u.length > 0 && (t.adoptedStyleSheets = u), v(t);
			} catch (e) {
				(function(e) {
					var t = e.error, n = e.styleSheets, r = e.root;
					switch (t.name) {
						case "NotSupportedError":
							n.length > 0 && (r.adoptedStyleSheets = n);
							break;
						default: throw t;
					}
				})({
					error: e,
					styleSheets: u,
					root: _
				});
			}
		}), [
			n,
			h,
			u
		]), K.createElement(K.Fragment, null, K.createElement(e.tag, Vi({
			key: y,
			ref: h
		}, m), (_ || f) && K.createElement(Wi.Provider, { value: _ }, f ? K.createElement(Gi, {
			shadowroot: o,
			shadowrootmode: o
		}, e.render({
			root: _,
			ssr: f,
			children: p
		})) : K.createElement(Ki, { root: _ }, e.render({
			root: _,
			ssr: f,
			children: p
		})))));
	}));
	return t.propTypes = {
		mode: ji.default.oneOf(["open", "closed"]),
		delegatesFocus: ji.default.bool,
		styleSheets: ji.default.arrayOf(ji.default.instanceOf(globalThis.CSSStyleSheet)),
		ssr: ji.default.bool,
		children: ji.default.node
	}, t;
}
Gi.propTypes = { children: ji.default.oneOfType([ji.default.string, ji.default.node]) }, Ki.propTypes = {
	root: ji.default.object.isRequired,
	children: ji.default.node
};
var Ji = /* @__PURE__ */ new Map();
function Yi() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "core", n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(e) {
		return e.children;
	};
	return new Proxy(e, { get: function(e, r) {
		var i = Pi(r, { separator: "-" }), a = `${t}-${i}`;
		return Ji.has(a) || Ji.set(a, qi({
			tag: i,
			render: n
		})), Ji.get(a);
	} });
}
var Xi = Yi(), Zi = (0, K.createContext)({ dragDropManager: void 0 });
//#endregion
//#region node_modules/redux/es/redux.js
function Qi(e) {
	return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var $i = (function() {
	return typeof Symbol == "function" && Symbol.observable || "@@observable";
})(), ea = function() {
	return Math.random().toString(36).substring(7).split("").join(".");
}, ta = {
	INIT: "@@redux/INIT" + ea(),
	REPLACE: "@@redux/REPLACE" + ea(),
	PROBE_UNKNOWN_ACTION: function() {
		return "@@redux/PROBE_UNKNOWN_ACTION" + ea();
	}
};
function na(e) {
	if (typeof e != "object" || !e) return !1;
	for (var t = e; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
function ra(e, t, n) {
	var r;
	if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function") throw Error(Qi(0));
	if (typeof t == "function" && n === void 0 && (n = t, t = void 0), n !== void 0) {
		if (typeof n != "function") throw Error(Qi(1));
		return n(ra)(e, t);
	}
	if (typeof e != "function") throw Error(Qi(2));
	var i = e, a = t, o = [], s = o, c = !1;
	function l() {
		s === o && (s = o.slice());
	}
	function u() {
		if (c) throw Error(Qi(3));
		return a;
	}
	function d(e) {
		if (typeof e != "function") throw Error(Qi(4));
		if (c) throw Error(Qi(5));
		var t = !0;
		return l(), s.push(e), function() {
			if (t) {
				if (c) throw Error(Qi(6));
				t = !1, l();
				var n = s.indexOf(e);
				s.splice(n, 1), o = null;
			}
		};
	}
	function f(e) {
		if (!na(e)) throw Error(Qi(7));
		if (e.type === void 0) throw Error(Qi(8));
		if (c) throw Error(Qi(9));
		try {
			c = !0, a = i(a, e);
		} finally {
			c = !1;
		}
		for (var t = o = s, n = 0; n < t.length; n++) {
			var r = t[n];
			r();
		}
		return e;
	}
	function p(e) {
		if (typeof e != "function") throw Error(Qi(10));
		i = e, f({ type: ta.REPLACE });
	}
	function m() {
		var e, t = d;
		return e = { subscribe: function(e) {
			if (typeof e != "object" || !e) throw Error(Qi(11));
			function n() {
				e.next && e.next(u());
			}
			return n(), { unsubscribe: t(n) };
		} }, e[$i] = function() {
			return this;
		}, e;
	}
	return f({ type: ta.INIT }), r = {
		dispatch: f,
		subscribe: d,
		getState: u,
		replaceReducer: p
	}, r[$i] = m, r;
}
//#endregion
//#region node_modules/@react-dnd/invariant/dist/index.js
function Q(e, t, ...n) {
	if (ia() && t === void 0) throw Error("invariant requires an error message argument");
	if (!e) {
		let e;
		if (t === void 0) e = /* @__PURE__ */ Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			let r = 0;
			e = Error(t.replace(/%s/g, function() {
				return n[r++];
			})), e.name = "Invariant Violation";
		}
		throw e.framesToPop = 1, e;
	}
}
function ia() {
	return typeof process < "u" && !0;
}
//#endregion
//#region node_modules/dnd-core/dist/utils/js_utils.js
function aa(e, t, n) {
	return t.split(".").reduce((e, t) => e && e[t] ? e[t] : n || null, e);
}
function oa(e, t) {
	return e.filter((e) => e !== t);
}
function sa(e) {
	return typeof e == "object";
}
function ca(e, t) {
	let n = /* @__PURE__ */ new Map(), r = (e) => {
		n.set(e, n.has(e) ? n.get(e) + 1 : 1);
	};
	e.forEach(r), t.forEach(r);
	let i = [];
	return n.forEach((e, t) => {
		e === 1 && i.push(t);
	}), i;
}
function la(e, t) {
	return e.filter((e) => t.indexOf(e) > -1);
}
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/types.js
var ua = "dnd-core/INIT_COORDS", da = "dnd-core/BEGIN_DRAG", fa = "dnd-core/PUBLISH_DRAG_SOURCE", pa = "dnd-core/HOVER", ma = "dnd-core/DROP", ha = "dnd-core/END_DRAG";
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/local/setClientOffset.js
function ga(e, t) {
	return {
		type: ua,
		payload: {
			sourceClientOffset: t || null,
			clientOffset: e || null
		}
	};
}
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/beginDrag.js
var _a = {
	type: ua,
	payload: {
		clientOffset: null,
		sourceClientOffset: null
	}
};
function va(e) {
	return function(t = [], n = { publishSource: !0 }) {
		let { publishSource: r = !0, clientOffset: i, getSourceClientOffset: a } = n, o = e.getMonitor(), s = e.getRegistry();
		e.dispatch(ga(i)), ya(t, o, s);
		let c = Sa(t, o);
		if (c == null) {
			e.dispatch(_a);
			return;
		}
		let l = null;
		if (i) {
			if (!a) throw Error("getSourceClientOffset must be defined");
			ba(a), l = a(c);
		}
		e.dispatch(ga(i, l));
		let u = s.getSource(c).beginDrag(o, c);
		if (u != null) return xa(u), s.pinSource(c), {
			type: da,
			payload: {
				itemType: s.getSourceType(c),
				item: u,
				sourceId: c,
				clientOffset: i || null,
				sourceClientOffset: l || null,
				isSourcePublic: !!r
			}
		};
	};
}
function ya(e, t, n) {
	Q(!t.isDragging(), "Cannot call beginDrag while dragging."), e.forEach(function(e) {
		Q(n.getSource(e), "Expected sourceIds to be registered.");
	});
}
function ba(e) {
	Q(typeof e == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function xa(e) {
	Q(sa(e), "Item must be an object.");
}
function Sa(e, t) {
	let n = null;
	for (let r = e.length - 1; r >= 0; r--) if (t.canDragSource(e[r])) {
		n = e[r];
		break;
	}
	return n;
}
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/drop.js
function Ca(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wa(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t], r = Object.keys(n);
		typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), r.forEach(function(t) {
			Ca(e, t, n[t]);
		});
	}
	return e;
}
function Ta(e) {
	return function(t = {}) {
		let n = e.getMonitor(), r = e.getRegistry();
		Ea(n), ka(n).forEach((i, a) => {
			let o = {
				type: ma,
				payload: { dropResult: wa({}, t, Da(i, a, r, n)) }
			};
			e.dispatch(o);
		});
	};
}
function Ea(e) {
	Q(e.isDragging(), "Cannot call drop while not dragging."), Q(!e.didDrop(), "Cannot call drop twice during one drag operation.");
}
function Da(e, t, n, r) {
	let i = n.getTarget(e), a = i ? i.drop(r, e) : void 0;
	return Oa(a), a === void 0 && (a = t === 0 ? {} : r.getDropResult()), a;
}
function Oa(e) {
	Q(e === void 0 || sa(e), "Drop result must either be an object or undefined.");
}
function ka(e) {
	let t = e.getTargetIds().filter(e.canDropOnTarget, e);
	return t.reverse(), t;
}
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/endDrag.js
function Aa(e) {
	return function() {
		let t = e.getMonitor(), n = e.getRegistry();
		ja(t);
		let r = t.getSourceId();
		return r != null && (n.getSource(r, !0).endDrag(t, r), n.unpinSource()), { type: ha };
	};
}
function ja(e) {
	Q(e.isDragging(), "Cannot call endDrag while not dragging.");
}
//#endregion
//#region node_modules/dnd-core/dist/utils/matchesType.js
function Ma(e, t) {
	return t === null ? e === null : Array.isArray(e) ? e.some((e) => e === t) : e === t;
}
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/hover.js
function Na(e) {
	return function(t, { clientOffset: n } = {}) {
		Pa(t);
		let r = t.slice(0), i = e.getMonitor(), a = e.getRegistry();
		return Ia(r, a, i.getItemType()), Fa(r, i, a), La(r, i, a), {
			type: pa,
			payload: {
				targetIds: r,
				clientOffset: n || null
			}
		};
	};
}
function Pa(e) {
	Q(Array.isArray(e), "Expected targetIds to be an array.");
}
function Fa(e, t, n) {
	Q(t.isDragging(), "Cannot call hover while not dragging."), Q(!t.didDrop(), "Cannot call hover after drop.");
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		Q(e.lastIndexOf(r) === t, "Expected targetIds to be unique in the passed array."), Q(n.getTarget(r), "Expected targetIds to be registered.");
	}
}
function Ia(e, t, n) {
	for (let r = e.length - 1; r >= 0; r--) {
		let i = e[r];
		Ma(t.getTargetType(i), n) || e.splice(r, 1);
	}
}
function La(e, t, n) {
	e.forEach(function(e) {
		n.getTarget(e).hover(t, e);
	});
}
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/publishDragSource.js
function Ra(e) {
	return function() {
		if (e.getMonitor().isDragging()) return { type: fa };
	};
}
//#endregion
//#region node_modules/dnd-core/dist/actions/dragDrop/index.js
function za(e) {
	return {
		beginDrag: va(e),
		publishDragSource: Ra(e),
		hover: Na(e),
		drop: Ta(e),
		endDrag: Aa(e)
	};
}
//#endregion
//#region node_modules/dnd-core/dist/classes/DragDropManagerImpl.js
var Ba = class {
	receiveBackend(e) {
		this.backend = e;
	}
	getMonitor() {
		return this.monitor;
	}
	getBackend() {
		return this.backend;
	}
	getRegistry() {
		return this.monitor.registry;
	}
	getActions() {
		let e = this, { dispatch: t } = this.store;
		function n(n) {
			return (...r) => {
				let i = n.apply(e, r);
				i !== void 0 && t(i);
			};
		}
		let r = za(this);
		return Object.keys(r).reduce((e, t) => {
			let i = r[t];
			return e[t] = n(i), e;
		}, {});
	}
	dispatch(e) {
		this.store.dispatch(e);
	}
	constructor(e, t) {
		this.isSetUp = !1, this.handleRefCountChange = () => {
			let e = this.store.getState().refCount > 0;
			this.backend && (e && !this.isSetUp ? (this.backend.setup(), this.isSetUp = !0) : !e && this.isSetUp && (this.backend.teardown(), this.isSetUp = !1));
		}, this.store = e, this.monitor = t, e.subscribe(this.handleRefCountChange);
	}
};
//#endregion
//#region node_modules/dnd-core/dist/utils/coords.js
function Va(e, t) {
	return {
		x: e.x + t.x,
		y: e.y + t.y
	};
}
function Ha(e, t) {
	return {
		x: e.x - t.x,
		y: e.y - t.y
	};
}
function Ua(e) {
	let { clientOffset: t, initialClientOffset: n, initialSourceClientOffset: r } = e;
	return !t || !n || !r ? null : Ha(Va(t, r), n);
}
function Wa(e) {
	let { clientOffset: t, initialClientOffset: n } = e;
	return !t || !n ? null : Ha(t, n);
}
//#endregion
//#region node_modules/dnd-core/dist/utils/dirtiness.js
var Ga = [], Ka = [];
Ga.__IS_NONE__ = !0, Ka.__IS_ALL__ = !0;
function qa(e, t) {
	return e === Ga ? !1 : e === Ka || t === void 0 ? !0 : la(t, e).length > 0;
}
//#endregion
//#region node_modules/dnd-core/dist/classes/DragDropMonitorImpl.js
var Ja = class {
	subscribeToStateChange(e, t = {}) {
		let { handlerIds: n } = t;
		Q(typeof e == "function", "listener must be a function."), Q(n === void 0 || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
		let r = this.store.getState().stateId;
		return this.store.subscribe(() => {
			let t = this.store.getState(), i = t.stateId;
			try {
				i === r || i === r + 1 && !qa(t.dirtyHandlerIds, n) || e();
			} finally {
				r = i;
			}
		});
	}
	subscribeToOffsetChange(e) {
		Q(typeof e == "function", "listener must be a function.");
		let t = this.store.getState().dragOffset;
		return this.store.subscribe(() => {
			let n = this.store.getState().dragOffset;
			n !== t && (t = n, e());
		});
	}
	canDragSource(e) {
		if (!e) return !1;
		let t = this.registry.getSource(e);
		return Q(t, `Expected to find a valid source. sourceId=${e}`), this.isDragging() ? !1 : t.canDrag(this, e);
	}
	canDropOnTarget(e) {
		if (!e) return !1;
		let t = this.registry.getTarget(e);
		return Q(t, `Expected to find a valid target. targetId=${e}`), !this.isDragging() || this.didDrop() ? !1 : Ma(this.registry.getTargetType(e), this.getItemType()) && t.canDrop(this, e);
	}
	isDragging() {
		return !!this.getItemType();
	}
	isDraggingSource(e) {
		if (!e) return !1;
		let t = this.registry.getSource(e, !0);
		return Q(t, `Expected to find a valid source. sourceId=${e}`), !this.isDragging() || !this.isSourcePublic() || this.registry.getSourceType(e) !== this.getItemType() ? !1 : t.isDragging(this, e);
	}
	isOverTarget(e, t = { shallow: !1 }) {
		if (!e) return !1;
		let { shallow: n } = t;
		if (!this.isDragging()) return !1;
		let r = this.registry.getTargetType(e), i = this.getItemType();
		if (i && !Ma(r, i)) return !1;
		let a = this.getTargetIds();
		if (!a.length) return !1;
		let o = a.indexOf(e);
		return n ? o === a.length - 1 : o > -1;
	}
	getItemType() {
		return this.store.getState().dragOperation.itemType;
	}
	getItem() {
		return this.store.getState().dragOperation.item;
	}
	getSourceId() {
		return this.store.getState().dragOperation.sourceId;
	}
	getTargetIds() {
		return this.store.getState().dragOperation.targetIds;
	}
	getDropResult() {
		return this.store.getState().dragOperation.dropResult;
	}
	didDrop() {
		return this.store.getState().dragOperation.didDrop;
	}
	isSourcePublic() {
		return !!this.store.getState().dragOperation.isSourcePublic;
	}
	getInitialClientOffset() {
		return this.store.getState().dragOffset.initialClientOffset;
	}
	getInitialSourceClientOffset() {
		return this.store.getState().dragOffset.initialSourceClientOffset;
	}
	getClientOffset() {
		return this.store.getState().dragOffset.clientOffset;
	}
	getSourceClientOffset() {
		return Ua(this.store.getState().dragOffset);
	}
	getDifferenceFromInitialOffset() {
		return Wa(this.store.getState().dragOffset);
	}
	constructor(e, t) {
		this.store = e, this.registry = t;
	}
}, Ya = typeof global < "u" ? global : self, Xa = Ya.MutationObserver || Ya.WebKitMutationObserver;
function Za(e) {
	return function() {
		let t = setTimeout(r, 0), n = setInterval(r, 50);
		function r() {
			clearTimeout(t), clearInterval(n), e();
		}
	};
}
function Qa(e) {
	let t = 1, n = new Xa(e), r = document.createTextNode("");
	return n.observe(r, { characterData: !0 }), function() {
		t = -t, r.data = t;
	};
}
var $a = typeof Xa == "function" ? Qa : Za, $ = class {
	enqueueTask(e) {
		let { queue: t, requestFlush: n } = this;
		t.length || (n(), this.flushing = !0), t[t.length] = e;
	}
	constructor() {
		this.queue = [], this.pendingErrors = [], this.flushing = !1, this.index = 0, this.capacity = 1024, this.flush = () => {
			let { queue: e } = this;
			for (; this.index < e.length;) {
				let t = this.index;
				if (this.index++, e[t].call(), this.index > this.capacity) {
					for (let t = 0, n = e.length - this.index; t < n; t++) e[t] = e[t + this.index];
					e.length -= this.index, this.index = 0;
				}
			}
			e.length = 0, this.index = 0, this.flushing = !1;
		}, this.registerPendingError = (e) => {
			this.pendingErrors.push(e), this.requestErrorThrow();
		}, this.requestFlush = $a(this.flush), this.requestErrorThrow = Za(() => {
			if (this.pendingErrors.length) throw this.pendingErrors.shift();
		});
	}
}, eo = class {
	call() {
		try {
			this.task && this.task();
		} catch (e) {
			this.onError(e);
		} finally {
			this.task = null, this.release(this);
		}
	}
	constructor(e, t) {
		this.onError = e, this.release = t, this.task = null;
	}
}, to = class {
	create(e) {
		let t = this.freeTasks, n = t.length ? t.pop() : new eo(this.onError, (e) => t[t.length] = e);
		return n.task = e, n;
	}
	constructor(e) {
		this.onError = e, this.freeTasks = [];
	}
}, no = new $(), ro = new to(no.registerPendingError);
function io(e) {
	no.enqueueTask(ro.create(e));
}
//#endregion
//#region node_modules/dnd-core/dist/actions/registry.js
var ao = "dnd-core/ADD_SOURCE", oo = "dnd-core/ADD_TARGET", so = "dnd-core/REMOVE_SOURCE", co = "dnd-core/REMOVE_TARGET";
function lo(e) {
	return {
		type: ao,
		payload: { sourceId: e }
	};
}
function uo(e) {
	return {
		type: oo,
		payload: { targetId: e }
	};
}
function fo(e) {
	return {
		type: so,
		payload: { sourceId: e }
	};
}
function po(e) {
	return {
		type: co,
		payload: { targetId: e }
	};
}
//#endregion
//#region node_modules/dnd-core/dist/contracts.js
function mo(e) {
	Q(typeof e.canDrag == "function", "Expected canDrag to be a function."), Q(typeof e.beginDrag == "function", "Expected beginDrag to be a function."), Q(typeof e.endDrag == "function", "Expected endDrag to be a function.");
}
function ho(e) {
	Q(typeof e.canDrop == "function", "Expected canDrop to be a function."), Q(typeof e.hover == "function", "Expected hover to be a function."), Q(typeof e.drop == "function", "Expected beginDrag to be a function.");
}
function go(e, t) {
	if (t && Array.isArray(e)) {
		e.forEach((e) => go(e, !1));
		return;
	}
	Q(typeof e == "string" || typeof e == "symbol", t ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
//#endregion
//#region node_modules/dnd-core/dist/interfaces.js
var _o;
(function(e) {
	e.SOURCE = "SOURCE", e.TARGET = "TARGET";
})(_o ||= {});
//#endregion
//#region node_modules/dnd-core/dist/utils/getNextUniqueId.js
var vo = 0;
function yo() {
	return vo++;
}
//#endregion
//#region node_modules/dnd-core/dist/classes/HandlerRegistryImpl.js
function bo(e) {
	let t = yo().toString();
	switch (e) {
		case _o.SOURCE: return `S${t}`;
		case _o.TARGET: return `T${t}`;
		default: throw Error(`Unknown Handler Role: ${e}`);
	}
}
function xo(e) {
	switch (e[0]) {
		case "S": return _o.SOURCE;
		case "T": return _o.TARGET;
		default: throw Error(`Cannot parse handler ID: ${e}`);
	}
}
function So(e, t) {
	let n = e.entries(), r = !1;
	do {
		let { done: e, value: [, i] } = n.next();
		if (i === t) return !0;
		r = !!e;
	} while (!r);
	return !1;
}
var Co = class {
	addSource(e, t) {
		go(e), mo(t);
		let n = this.addHandler(_o.SOURCE, e, t);
		return this.store.dispatch(lo(n)), n;
	}
	addTarget(e, t) {
		go(e, !0), ho(t);
		let n = this.addHandler(_o.TARGET, e, t);
		return this.store.dispatch(uo(n)), n;
	}
	containsHandler(e) {
		return So(this.dragSources, e) || So(this.dropTargets, e);
	}
	getSource(e, t = !1) {
		return Q(this.isSourceId(e), "Expected a valid source ID."), t && e === this.pinnedSourceId ? this.pinnedSource : this.dragSources.get(e);
	}
	getTarget(e) {
		return Q(this.isTargetId(e), "Expected a valid target ID."), this.dropTargets.get(e);
	}
	getSourceType(e) {
		return Q(this.isSourceId(e), "Expected a valid source ID."), this.types.get(e);
	}
	getTargetType(e) {
		return Q(this.isTargetId(e), "Expected a valid target ID."), this.types.get(e);
	}
	isSourceId(e) {
		return xo(e) === _o.SOURCE;
	}
	isTargetId(e) {
		return xo(e) === _o.TARGET;
	}
	removeSource(e) {
		Q(this.getSource(e), "Expected an existing source."), this.store.dispatch(fo(e)), io(() => {
			this.dragSources.delete(e), this.types.delete(e);
		});
	}
	removeTarget(e) {
		Q(this.getTarget(e), "Expected an existing target."), this.store.dispatch(po(e)), this.dropTargets.delete(e), this.types.delete(e);
	}
	pinSource(e) {
		let t = this.getSource(e);
		Q(t, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = t;
	}
	unpinSource() {
		Q(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
	}
	addHandler(e, t, n) {
		let r = bo(e);
		return this.types.set(r, t), e === _o.SOURCE ? this.dragSources.set(r, n) : e === _o.TARGET && this.dropTargets.set(r, n), r;
	}
	constructor(e) {
		this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
	}
}, wo = (e, t) => e === t;
function To(e, t) {
	return !e && !t ? !0 : !e || !t ? !1 : e.x === t.x && e.y === t.y;
}
function Eo(e, t, n = wo) {
	if (e.length !== t.length) return !1;
	for (let r = 0; r < e.length; ++r) if (!n(e[r], t[r])) return !1;
	return !0;
}
//#endregion
//#region node_modules/dnd-core/dist/reducers/dirtyHandlerIds.js
function Do(e = Ga, t) {
	switch (t.type) {
		case pa: break;
		case ao:
		case oo:
		case co:
		case so: return Ga;
		case da:
		case fa:
		case ha:
		case ma:
		default: return Ka;
	}
	let { targetIds: n = [], prevTargetIds: r = [] } = t.payload, i = ca(n, r);
	if (!(i.length > 0 || !Eo(n, r))) return Ga;
	let a = r[r.length - 1], o = n[n.length - 1];
	return a !== o && (a && i.push(a), o && i.push(o)), i;
}
//#endregion
//#region node_modules/dnd-core/dist/reducers/dragOffset.js
function Oo(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ko(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t], r = Object.keys(n);
		typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), r.forEach(function(t) {
			Oo(e, t, n[t]);
		});
	}
	return e;
}
var Ao = {
	initialSourceClientOffset: null,
	initialClientOffset: null,
	clientOffset: null
};
function jo(e = Ao, t) {
	let { payload: n } = t;
	switch (t.type) {
		case ua:
		case da: return {
			initialSourceClientOffset: n.sourceClientOffset,
			initialClientOffset: n.clientOffset,
			clientOffset: n.clientOffset
		};
		case pa: return To(e.clientOffset, n.clientOffset) ? e : ko({}, e, { clientOffset: n.clientOffset });
		case ha:
		case ma: return Ao;
		default: return e;
	}
}
//#endregion
//#region node_modules/dnd-core/dist/reducers/dragOperation.js
function Mo(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function No(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t], r = Object.keys(n);
		typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), r.forEach(function(t) {
			Mo(e, t, n[t]);
		});
	}
	return e;
}
var Po = {
	itemType: null,
	item: null,
	sourceId: null,
	targetIds: [],
	dropResult: null,
	didDrop: !1,
	isSourcePublic: null
};
function Fo(e = Po, t) {
	let { payload: n } = t;
	switch (t.type) {
		case da: return No({}, e, {
			itemType: n.itemType,
			item: n.item,
			sourceId: n.sourceId,
			isSourcePublic: n.isSourcePublic,
			dropResult: null,
			didDrop: !1
		});
		case fa: return No({}, e, { isSourcePublic: !0 });
		case pa: return No({}, e, { targetIds: n.targetIds });
		case co: return e.targetIds.indexOf(n.targetId) === -1 ? e : No({}, e, { targetIds: oa(e.targetIds, n.targetId) });
		case ma: return No({}, e, {
			dropResult: n.dropResult,
			didDrop: !0,
			targetIds: []
		});
		case ha: return No({}, e, {
			itemType: null,
			item: null,
			sourceId: null,
			dropResult: null,
			didDrop: !1,
			isSourcePublic: null,
			targetIds: []
		});
		default: return e;
	}
}
//#endregion
//#region node_modules/dnd-core/dist/reducers/refCount.js
function Io(e = 0, t) {
	switch (t.type) {
		case ao:
		case oo: return e + 1;
		case so:
		case co: return e - 1;
		default: return e;
	}
}
//#endregion
//#region node_modules/dnd-core/dist/reducers/stateId.js
function Lo(e = 0) {
	return e + 1;
}
//#endregion
//#region node_modules/dnd-core/dist/reducers/index.js
function Ro(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function zo(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t], r = Object.keys(n);
		typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), r.forEach(function(t) {
			Ro(e, t, n[t]);
		});
	}
	return e;
}
function Bo(e = {}, t) {
	return {
		dirtyHandlerIds: Do(e.dirtyHandlerIds, {
			type: t.type,
			payload: zo({}, t.payload, { prevTargetIds: aa(e, "dragOperation.targetIds", []) })
		}),
		dragOffset: jo(e.dragOffset, t),
		refCount: Io(e.refCount, t),
		dragOperation: Fo(e.dragOperation, t),
		stateId: Lo(e.stateId)
	};
}
//#endregion
//#region node_modules/dnd-core/dist/createDragDropManager.js
function Vo(e, t = void 0, n = {}, r = !1) {
	let i = Ho(r), a = new Ba(i, new Ja(i, new Co(i))), o = e(a, t, n);
	return a.receiveBackend(o), a;
}
function Ho(e) {
	let t = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
	return ra(Bo, e && t && t({
		name: "dnd-core",
		instanceId: "dnd-core"
	}));
}
//#endregion
//#region node_modules/react-dnd/dist/core/DndProvider.js
function Uo(e, t) {
	if (e == null) return {};
	var n = Wo(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function Wo(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
var Go = 0, Ko = Symbol.for("__REACT_DND_CONTEXT_INSTANCE__"), qo = /*#__PURE__*/ (0, K.memo)(function(e) {
	var { children: t } = e;
	let [n, r] = Jo(Uo(e, ["children"]));
	return (0, K.useEffect)(() => {
		if (r) {
			let e = Xo();
			return ++Go, () => {
				--Go === 0 && (e[Ko] = null);
			};
		}
	}, []), /*#__PURE__*/ (0, X.jsx)(Zi.Provider, {
		value: n,
		children: t
	});
});
function Jo(e) {
	return "manager" in e ? [{ dragDropManager: e.manager }, !1] : [Yo(e.backend, e.context, e.options, e.debugMode), !e.context];
}
function Yo(e, t = Xo(), n, r) {
	let i = t;
	return i[Ko] || (i[Ko] = { dragDropManager: Vo(e, t, n, r) }), i[Ko];
}
function Xo() {
	return typeof global < "u" ? global : window;
}
//#endregion
//#region node_modules/fast-deep-equal/index.js
var Zo = /* @__PURE__ */ o(((e, t) => {
	t.exports = function e(t, n) {
		if (t === n) return !0;
		if (t && n && typeof t == "object" && typeof n == "object") {
			if (t.constructor !== n.constructor) return !1;
			var r, i, a;
			if (Array.isArray(t)) {
				if (r = t.length, r != n.length) return !1;
				for (i = r; i-- !== 0;) if (!e(t[i], n[i])) return !1;
				return !0;
			}
			if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
			if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
			if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
			if (a = Object.keys(t), r = a.length, r !== Object.keys(n).length) return !1;
			for (i = r; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(n, a[i])) return !1;
			for (i = r; i-- !== 0;) {
				var o = a[i];
				if (!e(t[o], n[o])) return !1;
			}
			return !0;
		}
		return t !== t && n !== n;
	};
})), Qo = typeof window < "u" ? K.useLayoutEffect : K.useEffect, $o = /* @__PURE__ */ l(Zo(), 1);
function es(e, t, n) {
	let [r, i] = (0, K.useState)(() => t(e)), a = (0, K.useCallback)(() => {
		let a = t(e);
		(0, $o.default)(r, a) || (i(a), n && n());
	}, [
		r,
		e,
		n
	]);
	return Qo(a), [r, a];
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useMonitorOutput.js
function ts(e, t, n) {
	let [r, i] = es(e, t, n);
	return Qo(function() {
		let t = e.getHandlerId();
		if (t != null) return e.subscribeToStateChange(i, { handlerIds: [t] });
	}, [e, i]), r;
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useCollectedProps.js
function ns(e, t, n) {
	return ts(t, e || (() => ({})), () => n.reconnect());
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useOptionalFactory.js
function rs(e, t) {
	let n = [...t || []];
	return t == null && typeof e != "function" && n.push(e), (0, K.useMemo)(() => typeof e == "function" ? e() : e, n);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/connectors.js
function is(e) {
	return (0, K.useMemo)(() => e.hooks.dragSource(), [e]);
}
function as(e) {
	return (0, K.useMemo)(() => e.hooks.dragPreview(), [e]);
}
//#endregion
//#region node_modules/react-dnd/dist/internals/DragSourceMonitorImpl.js
var os = !1, ss = !1, cs = class {
	receiveHandlerId(e) {
		this.sourceId = e;
	}
	getHandlerId() {
		return this.sourceId;
	}
	canDrag() {
		Q(!os, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
		try {
			return os = !0, this.internalMonitor.canDragSource(this.sourceId);
		} finally {
			os = !1;
		}
	}
	isDragging() {
		if (!this.sourceId) return !1;
		Q(!ss, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
		try {
			return ss = !0, this.internalMonitor.isDraggingSource(this.sourceId);
		} finally {
			ss = !1;
		}
	}
	subscribeToStateChange(e, t) {
		return this.internalMonitor.subscribeToStateChange(e, t);
	}
	isDraggingSource(e) {
		return this.internalMonitor.isDraggingSource(e);
	}
	isOverTarget(e, t) {
		return this.internalMonitor.isOverTarget(e, t);
	}
	getTargetIds() {
		return this.internalMonitor.getTargetIds();
	}
	isSourcePublic() {
		return this.internalMonitor.isSourcePublic();
	}
	getSourceId() {
		return this.internalMonitor.getSourceId();
	}
	subscribeToOffsetChange(e) {
		return this.internalMonitor.subscribeToOffsetChange(e);
	}
	canDragSource(e) {
		return this.internalMonitor.canDragSource(e);
	}
	canDropOnTarget(e) {
		return this.internalMonitor.canDropOnTarget(e);
	}
	getItemType() {
		return this.internalMonitor.getItemType();
	}
	getItem() {
		return this.internalMonitor.getItem();
	}
	getDropResult() {
		return this.internalMonitor.getDropResult();
	}
	didDrop() {
		return this.internalMonitor.didDrop();
	}
	getInitialClientOffset() {
		return this.internalMonitor.getInitialClientOffset();
	}
	getInitialSourceClientOffset() {
		return this.internalMonitor.getInitialSourceClientOffset();
	}
	getSourceClientOffset() {
		return this.internalMonitor.getSourceClientOffset();
	}
	getClientOffset() {
		return this.internalMonitor.getClientOffset();
	}
	getDifferenceFromInitialOffset() {
		return this.internalMonitor.getDifferenceFromInitialOffset();
	}
	constructor(e) {
		this.sourceId = null, this.internalMonitor = e.getMonitor();
	}
}, ls = !1, us = class {
	receiveHandlerId(e) {
		this.targetId = e;
	}
	getHandlerId() {
		return this.targetId;
	}
	subscribeToStateChange(e, t) {
		return this.internalMonitor.subscribeToStateChange(e, t);
	}
	canDrop() {
		if (!this.targetId) return !1;
		Q(!ls, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
		try {
			return ls = !0, this.internalMonitor.canDropOnTarget(this.targetId);
		} finally {
			ls = !1;
		}
	}
	isOver(e) {
		return this.targetId ? this.internalMonitor.isOverTarget(this.targetId, e) : !1;
	}
	getItemType() {
		return this.internalMonitor.getItemType();
	}
	getItem() {
		return this.internalMonitor.getItem();
	}
	getDropResult() {
		return this.internalMonitor.getDropResult();
	}
	didDrop() {
		return this.internalMonitor.didDrop();
	}
	getInitialClientOffset() {
		return this.internalMonitor.getInitialClientOffset();
	}
	getInitialSourceClientOffset() {
		return this.internalMonitor.getInitialSourceClientOffset();
	}
	getSourceClientOffset() {
		return this.internalMonitor.getSourceClientOffset();
	}
	getClientOffset() {
		return this.internalMonitor.getClientOffset();
	}
	getDifferenceFromInitialOffset() {
		return this.internalMonitor.getDifferenceFromInitialOffset();
	}
	constructor(e) {
		this.targetId = null, this.internalMonitor = e.getMonitor();
	}
};
//#endregion
//#region node_modules/react-dnd/dist/internals/registration.js
function ds(e, t, n) {
	let r = n.getRegistry(), i = r.addTarget(e, t);
	return [i, () => r.removeTarget(i)];
}
function fs(e, t, n) {
	let r = n.getRegistry(), i = r.addSource(e, t);
	return [i, () => r.removeSource(i)];
}
//#endregion
//#region node_modules/@react-dnd/shallowequal/dist/index.js
function ps(e, t, n, r) {
	let i = n ? n.call(r, e, t) : void 0;
	if (i !== void 0) return !!i;
	if (e === t) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	let a = Object.keys(e), o = Object.keys(t);
	if (a.length !== o.length) return !1;
	let s = Object.prototype.hasOwnProperty.bind(t);
	for (let o = 0; o < a.length; o++) {
		let c = a[o];
		if (!s(c)) return !1;
		let l = e[c], u = t[c];
		if (i = n ? n.call(r, l, u, c) : void 0, i === !1 || i === void 0 && l !== u) return !1;
	}
	return !0;
}
//#endregion
//#region node_modules/react-dnd/dist/internals/isRef.js
function ms(e) {
	return typeof e == "object" && !!e && Object.prototype.hasOwnProperty.call(e, "current");
}
//#endregion
//#region node_modules/react-dnd/dist/internals/wrapConnectorHooks.js
function hs(e) {
	if (typeof e.type == "string") return;
	let t = e.type.displayName || e.type.name || "the component";
	throw Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${t} into a <div>, or turn it into a drag source or a drop target itself.`);
}
function gs(e) {
	return (t = null, n = null) => {
		if (!(0, K.isValidElement)(t)) {
			let r = t;
			return e(r, n), r;
		}
		let r = t;
		return hs(r), ys(r, n ? (t) => e(t, n) : e);
	};
}
function _s(e) {
	let t = {};
	return Object.keys(e).forEach((n) => {
		let r = e[n];
		if (n.endsWith("Ref")) t[n] = e[n];
		else {
			let e = gs(r);
			t[n] = () => e;
		}
	}), t;
}
function vs(e, t) {
	typeof e == "function" ? e(t) : e.current = t;
}
function ys(e, t) {
	let n = e.ref;
	return Q(typeof n != "string", "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs"), n ? (0, K.cloneElement)(e, { ref: (e) => {
		vs(n, e), vs(t, e);
	} }) : (0, K.cloneElement)(e, { ref: t });
}
//#endregion
//#region node_modules/react-dnd/dist/internals/SourceConnector.js
var bs = class {
	receiveHandlerId(e) {
		this.handlerId !== e && (this.handlerId = e, this.reconnect());
	}
	get connectTarget() {
		return this.dragSource;
	}
	get dragSourceOptions() {
		return this.dragSourceOptionsInternal;
	}
	set dragSourceOptions(e) {
		this.dragSourceOptionsInternal = e;
	}
	get dragPreviewOptions() {
		return this.dragPreviewOptionsInternal;
	}
	set dragPreviewOptions(e) {
		this.dragPreviewOptionsInternal = e;
	}
	reconnect() {
		let e = this.reconnectDragSource();
		this.reconnectDragPreview(e);
	}
	reconnectDragSource() {
		let e = this.dragSource, t = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();
		return t && this.disconnectDragSource(), this.handlerId ? e ? (t && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDragSource = e, this.lastConnectedDragSourceOptions = this.dragSourceOptions, this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, e, this.dragSourceOptions)), t) : (this.lastConnectedDragSource = e, t) : t;
	}
	reconnectDragPreview(e = !1) {
		let t = this.dragPreview, n = e || this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();
		if (n && this.disconnectDragPreview(), this.handlerId) {
			if (!t) {
				this.lastConnectedDragPreview = t;
				return;
			}
			n && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDragPreview = t, this.lastConnectedDragPreviewOptions = this.dragPreviewOptions, this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, t, this.dragPreviewOptions));
		}
	}
	didHandlerIdChange() {
		return this.lastConnectedHandlerId !== this.handlerId;
	}
	didConnectedDragSourceChange() {
		return this.lastConnectedDragSource !== this.dragSource;
	}
	didConnectedDragPreviewChange() {
		return this.lastConnectedDragPreview !== this.dragPreview;
	}
	didDragSourceOptionsChange() {
		return !ps(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
	}
	didDragPreviewOptionsChange() {
		return !ps(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
	}
	disconnectDragSource() {
		this.dragSourceUnsubscribe &&= (this.dragSourceUnsubscribe(), void 0);
	}
	disconnectDragPreview() {
		this.dragPreviewUnsubscribe && (this.dragPreviewUnsubscribe(), this.dragPreviewUnsubscribe = void 0, this.dragPreviewNode = null, this.dragPreviewRef = null);
	}
	get dragSource() {
		return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
	}
	get dragPreview() {
		return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
	}
	clearDragSource() {
		this.dragSourceNode = null, this.dragSourceRef = null;
	}
	clearDragPreview() {
		this.dragPreviewNode = null, this.dragPreviewRef = null;
	}
	constructor(e) {
		this.hooks = _s({
			dragSource: (e, t) => {
				this.clearDragSource(), this.dragSourceOptions = t || null, ms(e) ? this.dragSourceRef = e : this.dragSourceNode = e, this.reconnectDragSource();
			},
			dragPreview: (e, t) => {
				this.clearDragPreview(), this.dragPreviewOptions = t || null, ms(e) ? this.dragPreviewRef = e : this.dragPreviewNode = e, this.reconnectDragPreview();
			}
		}), this.handlerId = null, this.dragSourceRef = null, this.dragSourceOptionsInternal = null, this.dragPreviewRef = null, this.dragPreviewOptionsInternal = null, this.lastConnectedHandlerId = null, this.lastConnectedDragSource = null, this.lastConnectedDragSourceOptions = null, this.lastConnectedDragPreview = null, this.lastConnectedDragPreviewOptions = null, this.backend = e;
	}
}, xs = class {
	get connectTarget() {
		return this.dropTarget;
	}
	reconnect() {
		let e = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();
		e && this.disconnectDropTarget();
		let t = this.dropTarget;
		if (this.handlerId) {
			if (!t) {
				this.lastConnectedDropTarget = t;
				return;
			}
			e && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDropTarget = t, this.lastConnectedDropTargetOptions = this.dropTargetOptions, this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, t, this.dropTargetOptions));
		}
	}
	receiveHandlerId(e) {
		e !== this.handlerId && (this.handlerId = e, this.reconnect());
	}
	get dropTargetOptions() {
		return this.dropTargetOptionsInternal;
	}
	set dropTargetOptions(e) {
		this.dropTargetOptionsInternal = e;
	}
	didHandlerIdChange() {
		return this.lastConnectedHandlerId !== this.handlerId;
	}
	didDropTargetChange() {
		return this.lastConnectedDropTarget !== this.dropTarget;
	}
	didOptionsChange() {
		return !ps(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
	}
	disconnectDropTarget() {
		this.unsubscribeDropTarget &&= (this.unsubscribeDropTarget(), void 0);
	}
	get dropTarget() {
		return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
	}
	clearDropTarget() {
		this.dropTargetRef = null, this.dropTargetNode = null;
	}
	constructor(e) {
		this.hooks = _s({ dropTarget: (e, t) => {
			this.clearDropTarget(), this.dropTargetOptions = t, ms(e) ? this.dropTargetRef = e : this.dropTargetNode = e, this.reconnect();
		} }), this.handlerId = null, this.dropTargetRef = null, this.dropTargetOptionsInternal = null, this.lastConnectedHandlerId = null, this.lastConnectedDropTarget = null, this.lastConnectedDropTargetOptions = null, this.backend = e;
	}
};
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDragDropManager.js
function Ss() {
	let { dragDropManager: e } = (0, K.useContext)(Zi);
	return Q(e != null, "Expected drag drop context"), e;
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/useDragSourceConnector.js
function Cs(e, t) {
	let n = Ss(), r = (0, K.useMemo)(() => new bs(n.getBackend()), [n]);
	return Qo(() => (r.dragSourceOptions = e || null, r.reconnect(), () => r.disconnectDragSource()), [r, e]), Qo(() => (r.dragPreviewOptions = t || null, r.reconnect(), () => r.disconnectDragPreview()), [r, t]), r;
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/useDragSourceMonitor.js
function ws() {
	let e = Ss();
	return (0, K.useMemo)(() => new cs(e), [e]);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/DragSourceImpl.js
var Ts = class {
	beginDrag() {
		let e = this.spec, t = this.monitor, n = null;
		return n = typeof e.item == "object" ? e.item : typeof e.item == "function" ? e.item(t) : {}, n ?? null;
	}
	canDrag() {
		let e = this.spec, t = this.monitor;
		return typeof e.canDrag == "boolean" ? e.canDrag : typeof e.canDrag == "function" ? e.canDrag(t) : !0;
	}
	isDragging(e, t) {
		let n = this.spec, r = this.monitor, { isDragging: i } = n;
		return i ? i(r) : t === e.getSourceId();
	}
	endDrag() {
		let e = this.spec, t = this.monitor, n = this.connector, { end: r } = e;
		r && r(t.getItem(), t), n.reconnect();
	}
	constructor(e, t, n) {
		this.spec = e, this.monitor = t, this.connector = n;
	}
};
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/useDragSource.js
function Es(e, t, n) {
	let r = (0, K.useMemo)(() => new Ts(e, t, n), [t, n]);
	return (0, K.useEffect)(() => {
		r.spec = e;
	}, [e]), r;
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/useDragType.js
function Ds(e) {
	return (0, K.useMemo)(() => {
		let t = e.type;
		return Q(t != null, "spec.type must be defined"), t;
	}, [e]);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/useRegisteredDragSource.js
function Os(e, t, n) {
	let r = Ss(), i = Es(e, t, n), a = Ds(e);
	Qo(function() {
		if (a != null) {
			let [e, o] = fs(a, i, r);
			return t.receiveHandlerId(e), n.receiveHandlerId(e), o;
		}
	}, [
		r,
		t,
		n,
		i,
		a
	]);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrag/useDrag.js
function ks(e, t) {
	let n = rs(e, t);
	Q(!n.begin, "useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)");
	let r = ws(), i = Cs(n.options, n.previewOptions);
	return Os(n, r, i), [
		ns(n.collect, r, i),
		is(i),
		as(i)
	];
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/connectors.js
function As(e) {
	return (0, K.useMemo)(() => e.hooks.dropTarget(), [e]);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/useDropTargetConnector.js
function js(e) {
	let t = Ss(), n = (0, K.useMemo)(() => new xs(t.getBackend()), [t]);
	return Qo(() => (n.dropTargetOptions = e || null, n.reconnect(), () => n.disconnectDropTarget()), [e]), n;
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/useDropTargetMonitor.js
function Ms() {
	let e = Ss();
	return (0, K.useMemo)(() => new us(e), [e]);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/useAccept.js
function Ns(e) {
	let { accept: t } = e;
	return (0, K.useMemo)(() => (Q(e.accept != null, "accept must be defined"), Array.isArray(t) ? t : [t]), [t]);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/DropTargetImpl.js
var Ps = class {
	canDrop() {
		let e = this.spec, t = this.monitor;
		return e.canDrop ? e.canDrop(t.getItem(), t) : !0;
	}
	hover() {
		let e = this.spec, t = this.monitor;
		e.hover && e.hover(t.getItem(), t);
	}
	drop() {
		let e = this.spec, t = this.monitor;
		if (e.drop) return e.drop(t.getItem(), t);
	}
	constructor(e, t) {
		this.spec = e, this.monitor = t;
	}
};
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/useDropTarget.js
function Fs(e, t) {
	let n = (0, K.useMemo)(() => new Ps(e, t), [t]);
	return (0, K.useEffect)(() => {
		n.spec = e;
	}, [e]), n;
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/useRegisteredDropTarget.js
function Is(e, t, n) {
	let r = Ss(), i = Fs(e, t), a = Ns(e);
	Qo(function() {
		let [e, o] = ds(a, i, r);
		return t.receiveHandlerId(e), n.receiveHandlerId(e), o;
	}, [
		r,
		t,
		i,
		n,
		a.map((e) => e.toString()).join("|")
	]);
}
//#endregion
//#region node_modules/react-dnd/dist/hooks/useDrop/useDrop.js
function Ls(e, t) {
	let n = rs(e, t), r = Ms(), i = js(n.options);
	return Is(n, r, i), [ns(n.collect, r, i), As(i)];
}
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/utils/js_utils.js
function Rs(e) {
	let t = null;
	return () => (t ??= e(), t);
}
function zs(e, t) {
	return e.filter((e) => e !== t);
}
function Bs(e, t) {
	let n = /* @__PURE__ */ new Set(), r = (e) => n.add(e);
	e.forEach(r), t.forEach(r);
	let i = [];
	return n.forEach((e) => i.push(e)), i;
}
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/EnterLeaveCounter.js
var Vs = class {
	enter(e) {
		let t = this.entered.length, n = (t) => this.isNodeInDocument(t) && (!t.contains || t.contains(e));
		return this.entered = Bs(this.entered.filter(n), [e]), t === 0 && this.entered.length > 0;
	}
	leave(e) {
		let t = this.entered.length;
		return this.entered = zs(this.entered.filter(this.isNodeInDocument), e), t > 0 && this.entered.length === 0;
	}
	reset() {
		this.entered = [];
	}
	constructor(e) {
		this.entered = [], this.isNodeInDocument = e;
	}
}, Hs = class {
	initializeExposedProperties() {
		Object.keys(this.config.exposeProperties).forEach((e) => {
			Object.defineProperty(this.item, e, {
				configurable: !0,
				enumerable: !0,
				get() {
					return console.warn(`Browser doesn't allow reading "${e}" until the drop event.`), null;
				}
			});
		});
	}
	loadDataTransfer(e) {
		if (e) {
			let t = {};
			Object.keys(this.config.exposeProperties).forEach((n) => {
				let r = this.config.exposeProperties[n];
				r != null && (t[n] = {
					value: r(e, this.config.matchesTypes),
					configurable: !0,
					enumerable: !0
				});
			}), Object.defineProperties(this.item, t);
		}
	}
	canDrag() {
		return !0;
	}
	beginDrag() {
		return this.item;
	}
	isDragging(e, t) {
		return t === e.getSourceId();
	}
	endDrag() {}
	constructor(e) {
		this.config = e, this.item = {}, this.initializeExposedProperties();
	}
}, Us = /* @__PURE__ */ s({
	FILE: () => Ws,
	HTML: () => qs,
	TEXT: () => Ks,
	URL: () => Gs
}), Ws = "__NATIVE_FILE__", Gs = "__NATIVE_URL__", Ks = "__NATIVE_TEXT__", qs = "__NATIVE_HTML__";
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/NativeDragSources/getDataFromDataTransfer.js
function Js(e, t, n) {
	return t.reduce((t, n) => t || e.getData(n), "") ?? n;
}
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/NativeDragSources/nativeTypesConfig.js
var Ys = {
	[Ws]: {
		exposeProperties: {
			files: (e) => Array.prototype.slice.call(e.files),
			items: (e) => e.items,
			dataTransfer: (e) => e
		},
		matchesTypes: ["Files"]
	},
	[qs]: {
		exposeProperties: {
			html: (e, t) => Js(e, t, ""),
			dataTransfer: (e) => e
		},
		matchesTypes: ["Html", "text/html"]
	},
	[Gs]: {
		exposeProperties: {
			urls: (e, t) => Js(e, t, "").split("\n"),
			dataTransfer: (e) => e
		},
		matchesTypes: ["Url", "text/uri-list"]
	},
	[Ks]: {
		exposeProperties: {
			text: (e, t) => Js(e, t, ""),
			dataTransfer: (e) => e
		},
		matchesTypes: ["Text", "text/plain"]
	}
};
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/NativeDragSources/index.js
function Xs(e, t) {
	let n = Ys[e];
	if (!n) throw Error(`native type ${e} has no configuration`);
	let r = new Hs(n);
	return r.loadDataTransfer(t), r;
}
function Zs(e) {
	if (!e) return null;
	let t = Array.prototype.slice.call(e.types || []);
	return Object.keys(Ys).filter((e) => {
		let n = Ys[e];
		return n?.matchesTypes ? n.matchesTypes.some((e) => t.indexOf(e) > -1) : !1;
	})[0] || null;
}
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/BrowserDetector.js
var Qs = Rs(() => /firefox/i.test(navigator.userAgent)), $s = Rs(() => !!window.safari), ec = class {
	interpolate(e) {
		let { xs: t, ys: n, c1s: r, c2s: i, c3s: a } = this, o = t.length - 1;
		if (e === t[o]) return n[o];
		let s = 0, c = a.length - 1, l;
		for (; s <= c;) {
			l = Math.floor(.5 * (s + c));
			let r = t[l];
			if (r < e) s = l + 1;
			else if (r > e) c = l - 1;
			else return n[l];
		}
		o = Math.max(0, c);
		let u = e - t[o], d = u * u;
		return n[o] + r[o] * u + i[o] * d + a[o] * u * d;
	}
	constructor(e, t) {
		let { length: n } = e, r = [];
		for (let e = 0; e < n; e++) r.push(e);
		r.sort((t, n) => e[t] < e[n] ? -1 : 1);
		let i = [], a = [], o = [], s, c;
		for (let r = 0; r < n - 1; r++) s = e[r + 1] - e[r], c = t[r + 1] - t[r], a.push(s), i.push(c), o.push(c / s);
		let l = [o[0]];
		for (let e = 0; e < a.length - 1; e++) {
			let t = o[e], n = o[e + 1];
			if (t * n <= 0) l.push(0);
			else {
				s = a[e];
				let r = a[e + 1], i = s + r;
				l.push(3 * i / ((i + r) / t + (i + s) / n));
			}
		}
		l.push(o[o.length - 1]);
		let u = [], d = [], f;
		for (let e = 0; e < l.length - 1; e++) {
			f = o[e];
			let t = l[e], n = 1 / a[e], r = t + l[e + 1] - f - f;
			u.push((f - t - r) * n), d.push(r * n * n);
		}
		this.xs = e, this.ys = t, this.c1s = l, this.c2s = u, this.c3s = d;
	}
}, tc = 1;
function nc(e) {
	let t = e.nodeType === tc ? e : e.parentElement;
	if (!t) return null;
	let { top: n, left: r } = t.getBoundingClientRect();
	return {
		x: r,
		y: n
	};
}
function rc(e) {
	return {
		x: e.clientX,
		y: e.clientY
	};
}
function ic(e) {
	return e.nodeName === "IMG" && (Qs() || !document.documentElement?.contains(e));
}
function ac(e, t, n, r) {
	let i = e ? t.width : n, a = e ? t.height : r;
	return $s() && e && (a /= window.devicePixelRatio, i /= window.devicePixelRatio), {
		dragPreviewWidth: i,
		dragPreviewHeight: a
	};
}
function oc(e, t, n, r, i) {
	let a = ic(t), o = nc(a ? e : t), s = {
		x: n.x - o.x,
		y: n.y - o.y
	}, { offsetWidth: c, offsetHeight: l } = e, { anchorX: u, anchorY: d } = r, { dragPreviewWidth: f, dragPreviewHeight: p } = ac(a, t, c, l), m = () => {
		let e = new ec([
			0,
			.5,
			1
		], [
			s.y,
			s.y / l * p,
			s.y + p - l
		]).interpolate(d);
		return $s() && a && (e += (window.devicePixelRatio - 1) * p), e;
	}, h = () => new ec([
		0,
		.5,
		1
	], [
		s.x,
		s.x / c * f,
		s.x + f - c
	]).interpolate(u), { offsetX: g, offsetY: _ } = i, v = g === 0 || g, y = _ === 0 || _;
	return {
		x: v ? g : h(),
		y: y ? _ : m()
	};
}
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/OptionsReader.js
var sc = class {
	get window() {
		if (this.globalContext) return this.globalContext;
		if (typeof window < "u") return window;
	}
	get document() {
		if (this.globalContext?.document) return this.globalContext.document;
		if (this.window) return this.window.document;
	}
	get rootElement() {
		return this.optionsArgs?.rootElement || this.window;
	}
	constructor(e, t) {
		this.ownerDocument = null, this.globalContext = e, this.optionsArgs = t;
	}
};
//#endregion
//#region node_modules/react-dnd-html5-backend/dist/HTML5BackendImpl.js
function cc(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function lc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t], r = Object.keys(n);
		typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), r.forEach(function(t) {
			cc(e, t, n[t]);
		});
	}
	return e;
}
var uc = class {
	profile() {
		return {
			sourcePreviewNodes: this.sourcePreviewNodes.size,
			sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
			sourceNodeOptions: this.sourceNodeOptions.size,
			sourceNodes: this.sourceNodes.size,
			dragStartSourceIds: this.dragStartSourceIds?.length || 0,
			dropTargetIds: this.dropTargetIds.length,
			dragEnterTargetIds: this.dragEnterTargetIds.length,
			dragOverTargetIds: this.dragOverTargetIds?.length || 0
		};
	}
	get window() {
		return this.options.window;
	}
	get document() {
		return this.options.document;
	}
	get rootElement() {
		return this.options.rootElement;
	}
	setup() {
		let e = this.rootElement;
		if (e !== void 0) {
			if (e.__isReactDndBackendSetUp) throw Error("Cannot have two HTML5 backends at the same time.");
			e.__isReactDndBackendSetUp = !0, this.addEventListeners(e);
		}
	}
	teardown() {
		let e = this.rootElement;
		if (e !== void 0 && (e.__isReactDndBackendSetUp = !1, this.removeEventListeners(this.rootElement), this.clearCurrentDragSourceNode(), this.asyncEndDragFrameId)) {
			var t;
			(t = this.window) == null || t.cancelAnimationFrame(this.asyncEndDragFrameId);
		}
	}
	connectDragPreview(e, t, n) {
		return this.sourcePreviewNodeOptions.set(e, n), this.sourcePreviewNodes.set(e, t), () => {
			this.sourcePreviewNodes.delete(e), this.sourcePreviewNodeOptions.delete(e);
		};
	}
	connectDragSource(e, t, n) {
		this.sourceNodes.set(e, t), this.sourceNodeOptions.set(e, n);
		let r = (t) => this.handleDragStart(t, e), i = (e) => this.handleSelectStart(e);
		return t.setAttribute("draggable", "true"), t.addEventListener("dragstart", r), t.addEventListener("selectstart", i), () => {
			this.sourceNodes.delete(e), this.sourceNodeOptions.delete(e), t.removeEventListener("dragstart", r), t.removeEventListener("selectstart", i), t.setAttribute("draggable", "false");
		};
	}
	connectDropTarget(e, t) {
		let n = (t) => this.handleDragEnter(t, e), r = (t) => this.handleDragOver(t, e), i = (t) => this.handleDrop(t, e);
		return t.addEventListener("dragenter", n), t.addEventListener("dragover", r), t.addEventListener("drop", i), () => {
			t.removeEventListener("dragenter", n), t.removeEventListener("dragover", r), t.removeEventListener("drop", i);
		};
	}
	addEventListeners(e) {
		e.addEventListener && (e.addEventListener("dragstart", this.handleTopDragStart), e.addEventListener("dragstart", this.handleTopDragStartCapture, !0), e.addEventListener("dragend", this.handleTopDragEndCapture, !0), e.addEventListener("dragenter", this.handleTopDragEnter), e.addEventListener("dragenter", this.handleTopDragEnterCapture, !0), e.addEventListener("dragleave", this.handleTopDragLeaveCapture, !0), e.addEventListener("dragover", this.handleTopDragOver), e.addEventListener("dragover", this.handleTopDragOverCapture, !0), e.addEventListener("drop", this.handleTopDrop), e.addEventListener("drop", this.handleTopDropCapture, !0));
	}
	removeEventListeners(e) {
		e.removeEventListener && (e.removeEventListener("dragstart", this.handleTopDragStart), e.removeEventListener("dragstart", this.handleTopDragStartCapture, !0), e.removeEventListener("dragend", this.handleTopDragEndCapture, !0), e.removeEventListener("dragenter", this.handleTopDragEnter), e.removeEventListener("dragenter", this.handleTopDragEnterCapture, !0), e.removeEventListener("dragleave", this.handleTopDragLeaveCapture, !0), e.removeEventListener("dragover", this.handleTopDragOver), e.removeEventListener("dragover", this.handleTopDragOverCapture, !0), e.removeEventListener("drop", this.handleTopDrop), e.removeEventListener("drop", this.handleTopDropCapture, !0));
	}
	getCurrentSourceNodeOptions() {
		let e = this.monitor.getSourceId(), t = this.sourceNodeOptions.get(e);
		return lc({ dropEffect: this.altKeyPressed ? "copy" : "move" }, t || {});
	}
	getCurrentDropEffect() {
		return this.isDraggingNativeItem() ? "copy" : this.getCurrentSourceNodeOptions().dropEffect;
	}
	getCurrentSourcePreviewNodeOptions() {
		let e = this.monitor.getSourceId();
		return lc({
			anchorX: .5,
			anchorY: .5,
			captureDraggingState: !1
		}, this.sourcePreviewNodeOptions.get(e) || {});
	}
	isDraggingNativeItem() {
		let e = this.monitor.getItemType();
		return Object.keys(Us).some((t) => Us[t] === e);
	}
	beginDragNativeItem(e, t) {
		this.clearCurrentDragSourceNode(), this.currentNativeSource = Xs(e, t), this.currentNativeHandle = this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([this.currentNativeHandle]);
	}
	setCurrentDragSourceNode(e) {
		this.clearCurrentDragSourceNode(), this.currentDragSourceNode = e, this.mouseMoveTimeoutTimer = setTimeout(() => this.rootElement?.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, !0), 1e3);
	}
	clearCurrentDragSourceNode() {
		if (this.currentDragSourceNode) {
			if (this.currentDragSourceNode = null, this.rootElement) {
				var e;
				(e = this.window) == null || e.clearTimeout(this.mouseMoveTimeoutTimer || void 0), this.rootElement.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, !0);
			}
			return this.mouseMoveTimeoutTimer = null, !0;
		}
		return !1;
	}
	handleDragStart(e, t) {
		e.defaultPrevented || (this.dragStartSourceIds ||= [], this.dragStartSourceIds.unshift(t));
	}
	handleDragEnter(e, t) {
		this.dragEnterTargetIds.unshift(t);
	}
	handleDragOver(e, t) {
		this.dragOverTargetIds === null && (this.dragOverTargetIds = []), this.dragOverTargetIds.unshift(t);
	}
	handleDrop(e, t) {
		this.dropTargetIds.unshift(t);
	}
	constructor(e, t, n) {
		this.sourcePreviewNodes = /* @__PURE__ */ new Map(), this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map(), this.sourceNodes = /* @__PURE__ */ new Map(), this.sourceNodeOptions = /* @__PURE__ */ new Map(), this.dragStartSourceIds = null, this.dropTargetIds = [], this.dragEnterTargetIds = [], this.currentNativeSource = null, this.currentNativeHandle = null, this.currentDragSourceNode = null, this.altKeyPressed = !1, this.mouseMoveTimeoutTimer = null, this.asyncEndDragFrameId = null, this.dragOverTargetIds = null, this.lastClientOffset = null, this.hoverRafId = null, this.getSourceClientOffset = (e) => {
			let t = this.sourceNodes.get(e);
			return t && nc(t) || null;
		}, this.endDragNativeItem = () => {
			this.isDraggingNativeItem() && (this.actions.endDrag(), this.currentNativeHandle && this.registry.removeSource(this.currentNativeHandle), this.currentNativeHandle = null, this.currentNativeSource = null);
		}, this.isNodeInDocument = (e) => !!(e && this.document && this.document.body && this.document.body.contains(e)), this.endDragIfSourceWasRemovedFromDOM = () => {
			let e = this.currentDragSourceNode;
			e == null || this.isNodeInDocument(e) || (this.clearCurrentDragSourceNode() && this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover());
		}, this.scheduleHover = (e) => {
			this.hoverRafId === null && typeof requestAnimationFrame < "u" && (this.hoverRafId = requestAnimationFrame(() => {
				this.monitor.isDragging() && this.actions.hover(e || [], { clientOffset: this.lastClientOffset }), this.hoverRafId = null;
			}));
		}, this.cancelHover = () => {
			this.hoverRafId !== null && typeof cancelAnimationFrame < "u" && (cancelAnimationFrame(this.hoverRafId), this.hoverRafId = null);
		}, this.handleTopDragStartCapture = () => {
			this.clearCurrentDragSourceNode(), this.dragStartSourceIds = [];
		}, this.handleTopDragStart = (e) => {
			if (e.defaultPrevented) return;
			let { dragStartSourceIds: t } = this;
			this.dragStartSourceIds = null;
			let n = rc(e);
			this.monitor.isDragging() && (this.actions.endDrag(), this.cancelHover()), this.actions.beginDrag(t || [], {
				publishSource: !1,
				getSourceClientOffset: this.getSourceClientOffset,
				clientOffset: n
			});
			let { dataTransfer: r } = e, i = Zs(r);
			if (this.monitor.isDragging()) {
				if (r && typeof r.setDragImage == "function") {
					let e = this.monitor.getSourceId(), t = this.sourceNodes.get(e), i = this.sourcePreviewNodes.get(e) || t;
					if (i) {
						let { anchorX: e, anchorY: a, offsetX: o, offsetY: s } = this.getCurrentSourcePreviewNodeOptions(), c = oc(t, i, n, {
							anchorX: e,
							anchorY: a
						}, {
							offsetX: o,
							offsetY: s
						});
						r.setDragImage(i, c.x, c.y);
					}
				}
				try {
					r?.setData("application/json", {});
				} catch {}
				this.setCurrentDragSourceNode(e.target);
				let { captureDraggingState: t } = this.getCurrentSourcePreviewNodeOptions();
				t ? this.actions.publishDragSource() : setTimeout(() => this.actions.publishDragSource(), 0);
			} else if (i) this.beginDragNativeItem(i);
			else if (r && !r.types && (e.target && !e.target.hasAttribute || !e.target.hasAttribute("draggable"))) return;
			else e.preventDefault();
		}, this.handleTopDragEndCapture = () => {
			this.clearCurrentDragSourceNode() && this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
		}, this.handleTopDragEnterCapture = (e) => {
			if (this.dragEnterTargetIds = [], this.isDraggingNativeItem()) {
				var t;
				(t = this.currentNativeSource) == null || t.loadDataTransfer(e.dataTransfer);
			}
			if (!this.enterLeaveCounter.enter(e.target) || this.monitor.isDragging()) return;
			let { dataTransfer: n } = e, r = Zs(n);
			r && this.beginDragNativeItem(r, n);
		}, this.handleTopDragEnter = (e) => {
			let { dragEnterTargetIds: t } = this;
			this.dragEnterTargetIds = [], this.monitor.isDragging() && (this.altKeyPressed = e.altKey, t.length > 0 && this.actions.hover(t, { clientOffset: rc(e) }), t.some((e) => this.monitor.canDropOnTarget(e)) && (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = this.getCurrentDropEffect())));
		}, this.handleTopDragOverCapture = (e) => {
			if (this.dragOverTargetIds = [], this.isDraggingNativeItem()) {
				var t;
				(t = this.currentNativeSource) == null || t.loadDataTransfer(e.dataTransfer);
			}
		}, this.handleTopDragOver = (e) => {
			let { dragOverTargetIds: t } = this;
			if (this.dragOverTargetIds = [], !this.monitor.isDragging()) {
				e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "none");
				return;
			}
			this.altKeyPressed = e.altKey, this.lastClientOffset = rc(e), this.scheduleHover(t), (t || []).some((e) => this.monitor.canDropOnTarget(e)) ? (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = this.getCurrentDropEffect())) : this.isDraggingNativeItem() ? e.preventDefault() : (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "none"));
		}, this.handleTopDragLeaveCapture = (e) => {
			this.isDraggingNativeItem() && e.preventDefault(), this.enterLeaveCounter.leave(e.target) && (this.isDraggingNativeItem() && setTimeout(() => this.endDragNativeItem(), 0), this.cancelHover());
		}, this.handleTopDropCapture = (e) => {
			if (this.dropTargetIds = [], this.isDraggingNativeItem()) {
				var t;
				e.preventDefault(), (t = this.currentNativeSource) == null || t.loadDataTransfer(e.dataTransfer);
			} else Zs(e.dataTransfer) && e.preventDefault();
			this.enterLeaveCounter.reset();
		}, this.handleTopDrop = (e) => {
			let { dropTargetIds: t } = this;
			this.dropTargetIds = [], this.actions.hover(t, { clientOffset: rc(e) }), this.actions.drop({ dropEffect: this.getCurrentDropEffect() }), this.isDraggingNativeItem() ? this.endDragNativeItem() : this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
		}, this.handleSelectStart = (e) => {
			let t = e.target;
			typeof t.dragDrop == "function" && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA" || t.isContentEditable || (e.preventDefault(), t.dragDrop()));
		}, this.options = new sc(t, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new Vs(this.isNodeInDocument);
	}
}, dc = function(e, t, n) {
	return new uc(e, t, n);
}, fc;
(function(e) {
	e.mouse = "mouse", e.touch = "touch", e.keyboard = "keyboard";
})(fc ||= {});
//#endregion
//#region node_modules/react-dnd-touch-backend/dist/OptionsReader.js
var pc = class {
	get delay() {
		return this.args.delay ?? 0;
	}
	get scrollAngleRanges() {
		return this.args.scrollAngleRanges;
	}
	get getDropTargetElementsAtPoint() {
		return this.args.getDropTargetElementsAtPoint;
	}
	get ignoreContextMenu() {
		return this.args.ignoreContextMenu ?? !1;
	}
	get enableHoverOutsideTarget() {
		return this.args.enableHoverOutsideTarget ?? !1;
	}
	get enableKeyboardEvents() {
		return this.args.enableKeyboardEvents ?? !1;
	}
	get enableMouseEvents() {
		return this.args.enableMouseEvents ?? !1;
	}
	get enableTouchEvents() {
		return this.args.enableTouchEvents ?? !0;
	}
	get touchSlop() {
		return this.args.touchSlop || 0;
	}
	get delayTouchStart() {
		return this.args?.delayTouchStart ?? this.args?.delay ?? 0;
	}
	get delayMouseStart() {
		return this.args?.delayMouseStart ?? this.args?.delay ?? 0;
	}
	get window() {
		if (this.context && this.context.window) return this.context.window;
		if (typeof window < "u") return window;
	}
	get document() {
		if (this.context?.document) return this.context.document;
		if (this.window) return this.window.document;
	}
	get rootElement() {
		return this.args?.rootElement || this.document;
	}
	constructor(e, t) {
		this.args = e, this.context = t;
	}
};
//#endregion
//#region node_modules/react-dnd-touch-backend/dist/utils/math.js
function mc(e, t, n, r) {
	return Math.sqrt(Math.abs(n - e) ** 2 + Math.abs(r - t) ** 2);
}
function hc(e, t, n, r, i) {
	if (!i) return !1;
	let a = Math.atan2(r - t, n - e) * 180 / Math.PI + 180;
	for (let e = 0; e < i.length; ++e) {
		let t = i[e];
		if (t && (t.start == null || a >= t.start) && (t.end == null || a <= t.end)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/react-dnd-touch-backend/dist/utils/predicates.js
var gc = {
	Left: 1,
	Right: 2,
	Center: 4
}, _c = {
	Left: 0,
	Center: 1,
	Right: 2
};
function vc(e) {
	return e.button === void 0 || e.button === _c.Left;
}
function yc(e) {
	return e.buttons === void 0 || (e.buttons & gc.Left) === 0;
}
function bc(e) {
	return !!e.targetTouches;
}
//#endregion
//#region node_modules/react-dnd-touch-backend/dist/utils/offsets.js
var xc = 1;
function Sc(e) {
	let t = e.nodeType === xc ? e : e.parentElement;
	if (!t) return;
	let { top: n, left: r } = t.getBoundingClientRect();
	return {
		x: r,
		y: n
	};
}
function Cc(e, t) {
	if (e.targetTouches.length === 1) return wc(e.targetTouches[0]);
	if (t && e.touches.length === 1 && e.touches[0].target === t.target) return wc(e.touches[0]);
}
function wc(e, t) {
	return bc(e) ? Cc(e, t) : {
		x: e.clientX,
		y: e.clientY
	};
}
//#endregion
//#region node_modules/react-dnd-touch-backend/dist/utils/supportsPassive.js
var Tc = (() => {
	let e = !1;
	try {
		addEventListener("test", () => {}, Object.defineProperty({}, "passive", { get() {
			return e = !0, !0;
		} }));
	} catch {}
	return e;
})(), Ec = {
	[fc.mouse]: {
		start: "mousedown",
		move: "mousemove",
		end: "mouseup",
		contextmenu: "contextmenu"
	},
	[fc.touch]: {
		start: "touchstart",
		move: "touchmove",
		end: "touchend"
	},
	[fc.keyboard]: { keydown: "keydown" }
}, Dc = class e {
	profile() {
		return {
			sourceNodes: this.sourceNodes.size,
			sourcePreviewNodes: this.sourcePreviewNodes.size,
			sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
			targetNodes: this.targetNodes.size,
			dragOverTargetIds: this.dragOverTargetIds?.length || 0
		};
	}
	get document() {
		return this.options.document;
	}
	setup() {
		let t = this.options.rootElement;
		t && (Q(!e.isSetUp, "Cannot have two Touch backends at the same time."), e.isSetUp = !0, this.addEventListener(t, "start", this.getTopMoveStartHandler()), this.addEventListener(t, "start", this.handleTopMoveStartCapture, !0), this.addEventListener(t, "move", this.handleTopMove), this.addEventListener(t, "move", this.handleTopMoveCapture, !0), this.addEventListener(t, "end", this.handleTopMoveEndCapture, !0), this.options.enableMouseEvents && !this.options.ignoreContextMenu && this.addEventListener(t, "contextmenu", this.handleTopMoveEndCapture), this.options.enableKeyboardEvents && this.addEventListener(t, "keydown", this.handleCancelOnEscape, !0));
	}
	teardown() {
		let t = this.options.rootElement;
		t && (e.isSetUp = !1, this._mouseClientOffset = {}, this.removeEventListener(t, "start", this.handleTopMoveStartCapture, !0), this.removeEventListener(t, "start", this.handleTopMoveStart), this.removeEventListener(t, "move", this.handleTopMoveCapture, !0), this.removeEventListener(t, "move", this.handleTopMove), this.removeEventListener(t, "end", this.handleTopMoveEndCapture, !0), this.options.enableMouseEvents && !this.options.ignoreContextMenu && this.removeEventListener(t, "contextmenu", this.handleTopMoveEndCapture), this.options.enableKeyboardEvents && this.removeEventListener(t, "keydown", this.handleCancelOnEscape, !0), this.uninstallSourceNodeRemovalObserver());
	}
	addEventListener(e, t, n, r = !1) {
		let i = Tc ? {
			capture: r,
			passive: !1
		} : r;
		this.listenerTypes.forEach(function(r) {
			let a = Ec[r][t];
			a && e.addEventListener(a, n, i);
		});
	}
	removeEventListener(e, t, n, r = !1) {
		let i = Tc ? {
			capture: r,
			passive: !1
		} : r;
		this.listenerTypes.forEach(function(r) {
			let a = Ec[r][t];
			a && e.removeEventListener(a, n, i);
		});
	}
	connectDragSource(e, t) {
		let n = this.handleMoveStart.bind(this, e);
		return this.sourceNodes.set(e, t), this.addEventListener(t, "start", n), () => {
			this.sourceNodes.delete(e), this.removeEventListener(t, "start", n);
		};
	}
	connectDragPreview(e, t, n) {
		return this.sourcePreviewNodeOptions.set(e, n), this.sourcePreviewNodes.set(e, t), () => {
			this.sourcePreviewNodes.delete(e), this.sourcePreviewNodeOptions.delete(e);
		};
	}
	connectDropTarget(e, t) {
		let n = this.options.rootElement;
		if (!this.document || !n) return () => {};
		let r = (r) => {
			if (!this.document || !n || !this.monitor.isDragging()) return;
			let i;
			switch (r.type) {
				case Ec.mouse.move:
					i = {
						x: r.clientX,
						y: r.clientY
					};
					break;
				case Ec.touch.move:
					i = {
						x: r.touches[0]?.clientX || 0,
						y: r.touches[0]?.clientY || 0
					};
					break;
			}
			let a = i == null ? void 0 : this.document.elementFromPoint(i.x, i.y), o = a && t.contains(a);
			if (a === t || o) return this.handleMove(r, e);
		};
		return this.addEventListener(this.document.body, "move", r), this.targetNodes.set(e, t), () => {
			this.document && (this.targetNodes.delete(e), this.removeEventListener(this.document.body, "move", r));
		};
	}
	getTopMoveStartHandler() {
		return !this.options.delayTouchStart && !this.options.delayMouseStart ? this.handleTopMoveStart : this.handleTopMoveStartDelay;
	}
	installSourceNodeRemovalObserver(e) {
		this.uninstallSourceNodeRemovalObserver(), this.draggedSourceNode = e, this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
			e && !e.parentElement && (this.resurrectSourceNode(), this.uninstallSourceNodeRemovalObserver());
		}), !(!e || !e.parentElement) && this.draggedSourceNodeRemovalObserver.observe(e.parentElement, { childList: !0 });
	}
	resurrectSourceNode() {
		this.document && this.draggedSourceNode && (this.draggedSourceNode.style.display = "none", this.draggedSourceNode.removeAttribute("data-reactid"), this.document.body.appendChild(this.draggedSourceNode));
	}
	uninstallSourceNodeRemovalObserver() {
		this.draggedSourceNodeRemovalObserver && this.draggedSourceNodeRemovalObserver.disconnect(), this.draggedSourceNodeRemovalObserver = void 0, this.draggedSourceNode = void 0;
	}
	constructor(e, t, n) {
		this.getSourceClientOffset = (e) => {
			let t = this.sourceNodes.get(e);
			return t && Sc(t);
		}, this.handleTopMoveStartCapture = (e) => {
			vc(e) && (this.moveStartSourceIds = []);
		}, this.handleMoveStart = (e) => {
			Array.isArray(this.moveStartSourceIds) && this.moveStartSourceIds.unshift(e);
		}, this.handleTopMoveStart = (e) => {
			if (!vc(e)) return;
			let t = wc(e);
			t && (bc(e) && (this.lastTargetTouchFallback = e.targetTouches[0]), this._mouseClientOffset = t), this.waitingForDelay = !1;
		}, this.handleTopMoveStartDelay = (e) => {
			if (!vc(e)) return;
			let t = e.type === Ec.touch.start ? this.options.delayTouchStart : this.options.delayMouseStart;
			this.timeout = setTimeout(this.handleTopMoveStart.bind(this, e), t), this.waitingForDelay = !0;
		}, this.handleTopMoveCapture = () => {
			this.dragOverTargetIds = [];
		}, this.handleMove = (e, t) => {
			this.dragOverTargetIds && this.dragOverTargetIds.unshift(t);
		}, this.handleTopMove = (e) => {
			if (this.timeout && clearTimeout(this.timeout), !this.document || this.waitingForDelay) return;
			let { moveStartSourceIds: t, dragOverTargetIds: n } = this, r = this.options.enableHoverOutsideTarget, i = wc(e, this.lastTargetTouchFallback);
			if (!i) return;
			if (this._isScrolling || !this.monitor.isDragging() && hc(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, i.x, i.y, this.options.scrollAngleRanges)) {
				this._isScrolling = !0;
				return;
			}
			if (!this.monitor.isDragging() && this._mouseClientOffset.hasOwnProperty("x") && t && mc(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, i.x, i.y) > (this.options.touchSlop ? this.options.touchSlop : 0) && (this.moveStartSourceIds = void 0, this.actions.beginDrag(t, {
				clientOffset: this._mouseClientOffset,
				getSourceClientOffset: this.getSourceClientOffset,
				publishSource: !1
			})), !this.monitor.isDragging()) return;
			let a = this.sourceNodes.get(this.monitor.getSourceId());
			this.installSourceNodeRemovalObserver(a), this.actions.publishDragSource(), e.cancelable && e.preventDefault();
			let o = (n || []).map((e) => this.targetNodes.get(e)).filter((e) => !!e), s = this.options.getDropTargetElementsAtPoint ? this.options.getDropTargetElementsAtPoint(i.x, i.y, o) : this.document.elementsFromPoint(i.x, i.y), c = [];
			for (let e in s) {
				if (!s.hasOwnProperty(e)) continue;
				let t = s[e];
				for (t != null && c.push(t); t;) t = t.parentElement, t && c.indexOf(t) === -1 && c.push(t);
			}
			let l = c.filter((e) => o.indexOf(e) > -1).map((e) => this._getDropTargetId(e)).filter((e) => !!e).filter((e, t, n) => n.indexOf(e) === t);
			if (r) for (let e in this.targetNodes) {
				let t = this.targetNodes.get(e);
				if (a && t && t.contains(a) && l.indexOf(e) === -1) {
					l.unshift(e);
					break;
				}
			}
			l.reverse(), this.actions.hover(l, { clientOffset: i });
		}, this._getDropTargetId = (e) => {
			let t = this.targetNodes.keys(), n = t.next();
			for (; n.done === !1;) {
				let r = n.value;
				if (e === this.targetNodes.get(r)) return r;
				n = t.next();
			}
		}, this.handleTopMoveEndCapture = (e) => {
			if (this._isScrolling = !1, this.lastTargetTouchFallback = void 0, yc(e)) {
				if (!this.monitor.isDragging() || this.monitor.didDrop()) {
					this.moveStartSourceIds = void 0;
					return;
				}
				e.cancelable && e.preventDefault(), this._mouseClientOffset = {}, this.uninstallSourceNodeRemovalObserver(), this.actions.drop(), this.actions.endDrag();
			}
		}, this.handleCancelOnEscape = (e) => {
			e.key === "Escape" && this.monitor.isDragging() && (this._mouseClientOffset = {}, this.uninstallSourceNodeRemovalObserver(), this.actions.endDrag());
		}, this.options = new pc(n, t), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.sourceNodes = /* @__PURE__ */ new Map(), this.sourcePreviewNodes = /* @__PURE__ */ new Map(), this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map(), this.targetNodes = /* @__PURE__ */ new Map(), this.listenerTypes = [], this._mouseClientOffset = {}, this._isScrolling = !1, this.options.enableMouseEvents && this.listenerTypes.push(fc.mouse), this.options.enableTouchEvents && this.listenerTypes.push(fc.touch), this.options.enableKeyboardEvents && this.listenerTypes.push(fc.keyboard);
	}
}, Oc = We() ? function(e, t = {}, n = {}) {
	return new Dc(e, t, n);
} : dc, kc = Oc === dc, Ac = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M464%2032H48C21.5%2032%200%2053.5%200%2080v352c0%2026.5%2021.5%2048%2048%2048h416c26.5%200%2048-21.5%2048-48V80c0-26.5-21.5-48-48-48zM224%20416H64V160h160v256zm224%200H288V160h160v256z'/%3e%3c/svg%3e", jc = ({ icon: e, label: t, isActive: n, onClick: r }) => (t ||= "", /* @__PURE__ */ (0, X.jsx)("button", {
	type: "button",
	title: t,
	"aria-label": t,
	className: `mt-be-block-toolbar-button ${n ? "active" : ""}`,
	onClick: r,
	children: /* @__PURE__ */ (0, X.jsx)("img", { src: e })
})), Mc = "mt-be-block-config-panel", Nc = (e) => {
	let t = (0, K.useRef)(null), n = Mc;
	return e.className && (n += ` ${e.className}`), /* @__PURE__ */ (0, X.jsx)(xr, {
		nodeRef: t,
		timeout: 100,
		in: e.in,
		unmountOnExit: !0,
		classNames: Mc,
		children: /* @__PURE__ */ (0, X.jsx)("div", {
			ref: t,
			id: e.id || "",
			className: n,
			children: e.children
		})
	});
}, Pc = (e) => {
	let t = e.opts.block["core-columns"] || {}, n = Array.isArray(t.selectableColumns) ? t.selectableColumns : [
		2,
		3,
		4
	];
	return {
		selectableColumns: n,
		defaultColumns: t.defaultColumns || n[0] || 2
	};
}, Fc = ({ block: e, focus: t, focusBlock: n, canRemove: r }) => {
	let { editor: i } = Z(), { selectableColumns: a } = Pc(i), [o, s] = (0, K.useState)(!1), c = (0, K.useCallback)(() => {
		s((e) => !e);
	}, []), l = (0, K.useCallback)((t) => {
		let n = t.currentTarget.querySelector("input");
		if (!n) throw "error";
		let r = n.value;
		if (r === e.getColumnLayout()) return;
		let a = parseInt(r), o = e.blocks.length;
		if (i.editManager.beginGrouping(), o < a) for (let t = o; t < a; t++) i.addBlock(e, e.newColumn(), t);
		else for (let t = o - a; t > 0; t--) i.removeBlock(e, e.blocks[e.blocks.length - 1]);
		i.editManager.endGrouping(), s(!1);
	}, []), u = e.getColumnLayout();
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		/* @__PURE__ */ (0, X.jsx)(Ir, {
			block: e,
			keys: ["className"]
		}),
		/* @__PURE__ */ (0, X.jsx)("div", {
			className: "mt-be-columns",
			style: { display: "flex" },
			children: e.blocks.map((e) => e.editor({
				focus: t,
				focusBlock: n,
				canRemove: r
			}))
		}),
		a.length > 1 && t && r && /* @__PURE__ */ (0, X.jsx)(Dr, { children: /* @__PURE__ */ (0, X.jsx)(jc, {
			icon: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M464%2032H48C21.5%2032%200%2053.5%200%2080v352c0%2026.5%2021.5%2048%2048%2048h416c26.5%200%2048-21.5%2048-48V80c0-26.5-21.5-48-48-48zM224%20416H64V160h160v256zm224%200H288V160h160v256z'/%3e%3c/svg%3e",
			label: G("Edit"),
			onClick: c
		}) }),
		/* @__PURE__ */ (0, X.jsx)(Nc, {
			in: t && o,
			children: /* @__PURE__ */ (0, X.jsx)("ul", {
				style: {
					display: "flex",
					listStyle: "none"
				},
				children: a.map((e) => {
					let t = e.toString();
					return /* @__PURE__ */ (0, X.jsx)("li", { children: /* @__PURE__ */ (0, X.jsxs)("label", {
						onClick: l,
						children: [/* @__PURE__ */ (0, X.jsx)("input", {
							type: "radio",
							value: t,
							defaultChecked: u === t
						}), G("{{columns}} columns", { columns: t })]
					}) }, t);
				})
			})
		})
	] });
}, Ic = class e extends Un {
	static typeId = "core-columns";
	static selectable = !0;
	static icon = Ac;
	static get label() {
		return G("Columns");
	}
	blocks;
	constructor(e) {
		super(), this.blocks = [this.newColumn(), this.newColumn()], e && Object.assign(this, e);
	}
	static async new(e) {
		let t = await super.new(e), { defaultColumns: n } = Pc(e.editor);
		return t.blocks = Array(n).fill(null).map(() => t.newColumn()), t;
	}
	newColumn() {
		return new nl({ showShortcuts: !1 });
	}
	getColumnLayout() {
		return `${this.blocks.length}`;
	}
	childBlocks() {
		return this.blocks;
	}
	editor({ focus: e, focusBlock: t, canRemove: n }) {
		return /* @__PURE__ */ (0, X.jsx)(Fc, {
			block: this,
			focus: e,
			focusBlock: t,
			canRemove: n
		}, this.id);
	}
	html() {
		return `<div class="mt-be-columns${this.className ? ` ${this.className}` : ""}" style="display: flex">${this.blocks.map((e) => e.htmlString()).join("")}</div>`;
	}
	async serialize(e) {
		let t = e.editor.serializeMeta(this, e.external), n = await Promise.all(this.blocks.map((t) => t.serialize(e)));
		return `<!-- mt-beb t="${this.constructor.typeId}"${t ? ` m='${Tn(t)}'` : ""} --><div class="mt-be-columns${this.className ? ` ${this.className}` : ""}" style="display: flex">${n.join("")}</div><!-- /mt-beb -->`;
	}
	static async newFromHtml({ node: t, factory: n, meta: r, context: i }) {
		let a = await al(t.innerHTML, n, i, "");
		return a.forEach((e) => e.showShortcuts = !1), new e(Object.assign({ blocks: a }, r));
	}
}, Lc = (0, K.memo)(function() {
	let { editor: e, getFocusedIds: t } = Z(), { removeBlock: n } = qn();
	return /* @__PURE__ */ (0, X.jsx)("button", {
		type: "button",
		className: "mt-be-btn-remove",
		onClick: (r) => {
			r.stopPropagation();
			let i = sl(e, t());
			e.editManager.beginGrouping(), i.forEach((e) => n(e)), e.editManager.endGrouping();
		}
	});
}), Rc = () => {
	let { rendered: e } = Yn();
	return e ? null : /* @__PURE__ */ (0, X.jsx)(Dr, { className: "mt-be-block-toolbar--default" });
}, zc = (0, K.memo)(function({ editor: e }) {
	return /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: e.stylesheets.map((e, t) => e.type === lu.css ? /* @__PURE__ */ (0, X.jsx)("style", {
		type: "text/css",
		children: e.data
	}, t) : /* @__PURE__ */ (0, X.jsx)("link", {
		rel: "stylesheet",
		href: e.data
	}, t)) });
}), Bc = ({ id: e, block: t, focus: n, skipFocusDefault: r, focusBlock: i, ignoreClickEvent: a, index: o, canRemove: s, showButton: c, parentBlock: l }) => {
	let u = qn(), d = Z(), { swapBlocks: f } = u, { editor: p, getFocusedIds: m, setFocusedIds: h } = d, g = m(), _ = t, v = o, y = g[0] === t.id;
	n === void 0 && (n = y && g.length === 1);
	let [b, x] = (0, K.useState)(!1), S = (0, K.useCallback)(() => {
		x((e) => !e), t.focusEditor();
	}, []);
	!(n || y) && b && x(!1);
	let C = (0, K.useRef)(null);
	t.wrapperRef = C;
	let [, w] = Ls((0, K.useMemo)(() => ({
		accept: l ? l.id : "block",
		hover(e, t) {
			if (!C.current) return;
			let n = e.index, r = o;
			if (n === r) return;
			let i = C.current.getBoundingClientRect(), a = (i.bottom - i.top) / 2, s = t.getClientOffset().y - i.top;
			if (!(n < r && s < a) && !(n > r && s > a)) {
				if (n < r) for (let e = n; e < r; e++) f(e, e + 1);
				else for (let e = n; e > r; e--) f(e, e - 1);
				e.index = r;
			}
		}
	}), [f, o]), [f, o]);
	(0, K.useEffect)(() => () => {
		t.isNewlyAdded = !1;
	}, []);
	let [{ isDragging: T }, E, D] = ks((0, K.useMemo)(() => ({
		type: l ? l.id : "block",
		item: {
			type: l ? l.id : "block",
			id: e,
			index: o
		},
		collect: (e) => ({ isDragging: e.isDragging() })
	}), [o]), [o]), O = {};
	O.opacity = T ? kc ? 0 : .5 : 1, D(w(C));
	let k = sl(_, g).length !== 0, A = (0, K.createRef)(), j = _.editor({
		focus: n,
		focusBlock: i,
		focusDescendant: k,
		canRemove: s === !0,
		parentBlock: l,
		clickBlockTargetRef: A
	}), M = {
		block: _,
		index: v,
		rendered: !1
	}, N = !!(n || i || k || _ instanceof nl || _ instanceof Ic), [P, F, I, L, R] = (0, K.useMemo)(() => [
		function(e) {
			if (An(e.nativeEvent)) return;
			e.stopPropagation(), e.nativeEvent.stopImmediatePropagation();
			let t = m();
			t.includes(_.id) || (e.preventDefault(), A.current ? A.current.click() : a || (t.length !== 0 && e.shiftKey ? h(ll(p, [...t, _.id]).map((e) => e.id)) : h([_.id])));
		},
		function(e) {
			let t = m();
			p.commandManager.execute({
				command: "core-copyBlock",
				blockIds: t.length === 0 ? [_.id] : t,
				editorContext: d,
				blocksContext: u,
				event: e.nativeEvent
			});
		},
		function(e) {
			let t = m();
			p.commandManager.execute({
				command: "core-pasteBlock",
				blockIds: t.length === 0 ? [_.id] : t,
				editorContext: d,
				blocksContext: u,
				event: e.nativeEvent
			});
		},
		function() {
			let e = m();
			if (e.length >= 2) {
				p.editManager.beginGrouping();
				for (let t = o, n = o + e.length; t < n; t++) f(t - 1, t);
				p.editManager.endGrouping();
				return;
			}
			f(o, o - 1, !0);
		},
		function() {
			let e = m();
			if (e.length >= 2) {
				p.editManager.beginGrouping();
				for (let t = o + e.length - 1; t >= o; t--) f(t + 1, t);
				p.editManager.endGrouping();
				return;
			}
			f(o, o + 1, !0);
		}
	], [o]);
	return (0, K.useEffect)(() => {
		if (!y) return;
		function e(e) {
			let t = e.key;
			if (!(e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || t === "Delete" || t === "Backspace")) return;
			let n = m();
			n.length !== 0 && (p.editorElement.querySelector("[data-mt-block-editor-keep-focus=\"1\"]") || (n.length >= 2 && (t === "Delete" || t === "Backspace") ? (e.preventDefault(), p.commandManager.execute({
				command: "core-deleteBlock",
				blockIds: n,
				editorContext: d,
				blocksContext: u,
				event: e
			})) : p.commandManager.dispatchKeydownEvent({
				event: e,
				blockIds: n,
				editorContext: d,
				blocksContext: u
			})));
		}
		return window.addEventListener("keydown", e), () => {
			window.removeEventListener("keydown", e);
		};
	}, [y]), /* @__PURE__ */ (0, X.jsxs)("div", {
		"data-mt-block-editor-block-id": _.id,
		"data-mt-block-editor-skip-focus-default": r || void 0,
		onClick: P,
		onCopy: F,
		onPaste: I,
		className: `mt-be-block-wrapper ${y ? "mt-be-focus-leader" : ""} ${g.length >= 2 && g.includes(_.id) ? "mt-be-focus" : ""}`,
		style: O,
		ref: C,
		children: [c && !q() && /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "mt-be-btn-move-wrapper",
				children: [
					/* @__PURE__ */ (0, X.jsx)(Tr, {
						in: b,
						block: _
					}),
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						className: "mt-be-btn-up",
						onClick: L
					}),
					/* @__PURE__ */ (0, X.jsx)("span", {
						className: "mt-be-btn-move",
						onClick: S,
						ref: E
					}),
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						className: "mt-be-btn-down",
						onClick: R
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsx)("div", {
				className: "mt-be-btn-add-wrapper",
				children: /* @__PURE__ */ (0, X.jsx)("div", {
					style: { position: "relative" },
					children: /* @__PURE__ */ (0, X.jsx)(Er, { index: v })
				})
			}),
			/* @__PURE__ */ (0, X.jsx)("div", {
				className: "mt-be-btn-remove-wrapper",
				children: /* @__PURE__ */ (0, X.jsx)(Lc, {})
			})
		] }), /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "mt-be-block",
			children: [
				!n && !(_ instanceof Ic) && /* @__PURE__ */ (0, X.jsx)("div", {
					className: "mt-be-content-label",
					children: _.contentLabel()
				}),
				N && /* @__PURE__ */ (0, X.jsxs)(Jn.Provider, {
					value: M,
					children: [j, n && c && q() && /* @__PURE__ */ (0, X.jsx)(Rc, {})]
				}),
				/* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: /* @__PURE__ */ (0, X.jsx)(Xi.div, { children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: p.opts.rootClassName || "",
					style: { overflow: "auto" },
					...p.opts.rootAttributes,
					children: [/* @__PURE__ */ (0, X.jsx)(zc, { editor: p }), !N && j]
				}) }) })
			]
		})]
	}, _.id);
}, Vc = "100%", Hc = "5000px", Uc = 50, Wc = {
	id: Symbol("edit"),
	merge(e, t) {
		return e.data.last === t.data.last ? e : void 0;
	},
	undo(e, { setFocusedIds: t }) {
		e.block.compiledHtml = e.data.last, t([e.block.id], { forceUpdate: !0 });
	},
	redo(e, { setFocusedIds: t }) {
		e.block.compiledHtml = e.data.cur, t([e.block.id], { forceUpdate: !0 });
	}
};
function Gc() {
	let e = document.body, t = e.children[e.children.length - 1];
	if (!t) return;
	let n = window.getComputedStyle(t), r = t.getBoundingClientRect();
	parent.postMessage({
		method: "MTBlockEditorInitSize",
		blockId: e.dataset.blockId,
		arguments: { height: r.top + r.height + parseInt(n.marginBottom) }
	}, "*");
}
function Kc() {
	let e = document.body, t = document.documentElement, n = Math.max(e.scrollHeight, t.scrollHeight), r = Math.max(e.scrollWidth, t.scrollWidth);
	parent.postMessage({
		method: "MTBlockEditorSetSize",
		blockId: e.dataset.blockId,
		arguments: {
			height: n,
			width: r
		}
	}, "*");
}
function qc(e, t) {
	parent.postMessage({
		method: "MTBlockEditorSetCompiledHtml",
		blockId: document.body.dataset.blockId,
		html: e,
		arguments: {
			addEditHistory: !!t?.addEditHistory,
			preserveBlockData: !!t?.preserveBlockData,
			removeIntermediateProduct: !!t?.removeIntermediateProduct
		}
	}, "*");
}
function Jc(e) {
	return new Promise((t) => {
		function n(n) {
			n.classList.add("mt-block-editor-mt-be-droppable-area"), n.addEventListener("click", (t) => {
				if (t.target instanceof HTMLElement && t.target.closest("input, textarea, select, label, button")) return;
				t.preventDefault();
				let n = document.createElement("input");
				n.type = "file", n.style.display = "none", n.addEventListener("change", function(t) {
					e(t);
				}), document.body.appendChild(n), n.click();
			}), n.addEventListener("dragover", (e) => {
				e.preventDefault(), e.stopPropagation(), e.dataTransfer && (e.dataTransfer.dropEffect = "copy"), n.classList.add("mt-block-editor-mt-be-droppable");
			}), n.addEventListener("dragenter", (e) => {
				e.preventDefault(), e.stopPropagation();
			}), n.addEventListener("dragleave", () => {
				n.classList.remove("mt-block-editor-mt-be-droppable");
			}), n.addEventListener("drop", (t) => {
				t.preventDefault(), t.stopPropagation(), n.classList.remove("mt-block-editor-mt-be-droppable"), e(t);
			}), t();
		}
		document.readyState === "complete" || document.readyState === "interactive" ? n(document.body) : document.addEventListener("DOMContentLoaded", () => {
			n(document.body);
		});
	});
}
function Yc() {
	document.addEventListener("click", function(e) {
		parent.postMessage({
			method: "MTBlockEditorOnClick",
			blockId: document.body.dataset.blockId,
			arguments: {
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}
		}, "*");
	}, {
		capture: !0,
		passive: !0
	}), document.addEventListener("keydown", function(e) {
		parent.postMessage({
			method: "MTBlockEditorOnKeydown",
			blockId: document.body.dataset.blockId,
			arguments: {
				key: e.key,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}
		}, "*");
	}, {
		capture: !0,
		passive: !0
	});
}
function Xc(e, t) {
	let [n, r] = (0, K.useState)(typeof e == "string" ? e : null), i = typeof n == "number" && t.compiledHtml === void 0 ? null : n;
	return [
		i,
		typeof i == "number" ? t.compiledHtml ?? "" : typeof i == "string" ? i : typeof e == "string" ? e : "",
		r
	];
}
var Zc = ({ block: e, html: t, header: n, onSetCompiledHtml: r, onBeforeSetCompiledHtml: i, border: a, scheme: o = "data", sandbox: s = "allow-scripts allow-same-origin" }) => {
	let { editor: c } = Z();
	t === void 0 && (t = e.compiledHtml ?? e.serializedString({
		editor: c,
		external: !1
	}));
	let l = (0, K.useRef)(null), [u, d, f] = Xc(t, e), [, p] = (0, K.useState)(e.iframePreviewSize ? [e.iframePreviewSize] : []), m = (0, K.useCallback)((t) => {
		typeof t.width == "number" && !t.width || typeof t.height == "number" && !t.height || (typeof t.width == "number" && t.width < 30 || typeof t.width == "string") && l.current?.getBoundingClientRect().width === 0 || p((n) => {
			if (n.length >= 1 && zn(n[0], t)) return n.length >= 2 ? [n[0]] : n;
			if (n.length >= 2) {
				let [r, i] = n;
				if (t.width === r.width && r.width === i.width && typeof t.height == "number" && typeof r.height == "number" && typeof i.height == "number" && t.height - r.height === r.height - i.height || t.height === r.height && r.height === i.height && typeof t.width == "number" && typeof r.width == "number" && typeof i.width == "number" && t.width - r.width === r.width - i.width) return e.iframePreviewSize && zn(e.iframePreviewSize, n[1]) ? n : (e.setIframePreviewSize(n[1]), [...n]);
			}
			return e.setIframePreviewSize(t), n.length === 0 ? [t] : [t, n[0]];
		});
	}, []), h = e.getIframePreviewSize(d), g = (0, K.useCallback)((t, n, a) => {
		if (i && i(n) === !1) return;
		if (n) {
			r && r(n);
			return;
		}
		a.preserveBlockData || (t = t.replace(/<!--\s+\/?mt-beb.*?-->/g, ""));
		let o = e.compiledHtml;
		e.compiledHtml = t, e.removeIntermediateProduct = !!a.removeIntermediateProduct, a.addEditHistory && c.editManager.add({
			block: e,
			data: {
				last: o,
				cur: t
			},
			handlers: Wc
		}), c.emit("setCompiledHtmlIframePreview", {
			editor: c,
			block: e
		}), r && r(null), f((e) => typeof e == "number" ? e + 1 : 1);
	}, []);
	typeof t != "string" && u === null && (n = "", t.then(f));
	let _ = {
		editor: c,
		scheme: o,
		sandbox: s,
		html: d,
		head: `
    <meta charset="utf-8">
    <script type="module">
      (${Gc.toString()})();
      setInterval(${Kc.toString()}, 1000);
    <\/script>
    <script>
      var MTBlockEditorSetCompiledHtml = ${qc.toString()};
      var MTBlockEditorAddDroppable = ${Jc.toString()};
      (${Yc.toString()})();
    <\/script>
    <style type="text/css">
    .mt-block-editor-mt-be-droppable:before {
      display: block;
      position: absolute;
      z-index: 200;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: " ";
      text-align: center;
      color: white;
      background-color: rgba(21, 50, 76, 0.9);
    }

    /* FIXME */
    .mt-be-column {
      width: 100%;
    }
    </style>
    ${c.stylesheets.map((e) => e.type === lu.css ? `<style type="text/css">${e.data}</style>` : `<link rel="stylesheet" href="${e.data}" />`).join("")}
    ${n || ""}
    `
	};
	c.emit("beforeRenderIframePreview", _);
	let v = _.html, y = _.head, [b, x] = (0, K.useState)("");
	return (0, K.useEffect)(() => {
		if (!n && !v) {
			b !== "" && x("");
			return;
		}
		let t = c.opts.rootAttributes, r = Object.keys(t).map((e) => {
			let n = {
				"&": "&amp;",
				"\"": "&quot;"
			};
			return `${e}="${t[e].replace(/[&"]/g, (e) => n[e])}"`;
		}).join(" "), i = `
        <html${v.match(/<amp-/) ? " amp" : ""}>
        <head>${y}</head><body data-block-id="${e.id}"${e.compiledHtml && " data-has-compiled-html=\"1\""} class="${c.opts.rootClassName || ""}" ${r}>${v}</body></html>`;
		if (_.scheme === "blob") x(URL.createObjectURL(new Blob([i], { type: "text/html" })));
		else if (_.scheme === "srcdoc") x(i);
		else {
			if (_.scheme === "data-wrap") {
				let e = document.createElement("iframe");
				e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.srcdoc = i, i = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            iframe {
              width: 100%;
              display: block;
            }
            ::-webkit-scrollbar {
              display: none;
            }
          </style>
          <script type="module">
          const iframe = document.querySelector('iframe');
          window.addEventListener('message', (ev) => {
            if (ev.source !== iframe.contentWindow) {
              return;
            }

            const data = ev.data;
            if (data.method === 'MTBlockEditorSetSize') {
              iframe.style.height = data.arguments.height + 'px';
              iframe.style.width = data.arguments.width + 'px';
            }

            parent.postMessage(ev.data, '*');
          });
          <\/script>
        </head>
        <body>
          ${e.outerHTML}
        </body>
      </html>
      `;
			}
			let e = new Blob([i], { type: "text/html" }), t = new FileReader();
			t.readAsDataURL(e), t.onload = () => {
				x(t.result?.toString() || "");
			};
		}
	}, [
		e.compiledHtml,
		n,
		v
	]), (0, K.useEffect)(() => {
		let t = (t) => {
			let n = l.current;
			if (n && t.source === n.firstChild.contentWindow && t.data && t.data.blockId === e.id) switch (t.data.method) {
				case "MTBlockEditorInitSize":
					if (!Rn(h)) break;
					m({
						...h,
						...t.data.arguments
					});
					break;
				case "MTBlockEditorSetSize":
					Object.keys(h).forEach((e) => {
						let n = typeof h[e] == "number" ? h[e] : parseFloat(h[e]), r = typeof t.data.arguments[e] == "number" ? t.data.arguments[e] : parseFloat(t.data.arguments[e]);
						n && r && n > r && Math.abs(n - r) < Uc && (t.data.arguments[e] = h[e]);
					}), (h.width !== t.data.arguments.width || h.height !== t.data.arguments.height) && m(t.data.arguments);
					break;
				case "MTBlockEditorOnClick":
					(n.closest("[data-mt-block-editor-block-id]") || n.getRootNode()?.host)?.dispatchEvent(new MouseEvent("click", {
						bubbles: !0,
						cancelable: !0,
						...t.data.arguments
					}));
					break;
				case "MTBlockEditorOnKeydown":
					window.dispatchEvent(new KeyboardEvent("keydown", t.data.arguments));
					break;
				case "MTBlockEditorSetCompiledHtml":
					g(t.data.html, t.data.html == null ? Error(t.data.error || "Error") : null, t.data.arguments);
					break;
			}
		};
		return window.addEventListener("message", t, {
			capture: !0,
			passive: !0
		}), () => {
			window.removeEventListener("message", t, { capture: !0 });
		};
	}, [h]), /* @__PURE__ */ (0, X.jsx)("div", {
		ref: l,
		children: /* @__PURE__ */ (0, X.jsx)("iframe", {
			src: _.scheme === "srcdoc" ? void 0 : b || "about:blank",
			srcDoc: _.scheme === "srcdoc" && b || void 0,
			frameBorder: "0",
			sandbox: s,
			style: {
				maxWidth: Vc,
				maxHeight: Hc,
				boxSizing: "border-box",
				border: a || "1px solid #ccc",
				...h
			}
		})
	});
}, Qc = 2e3, $c = 4, el = {
	position: "absolute",
	overflow: "hidden",
	height: "0px",
	border: "none"
}, tl = ({ block: e, focus: t, focusBlock: n, focusDescendant: r, canRemove: i }) => {
	(e.constructor.typeId !== "core-column" || i === void 0) && (i = e.canRemoveBlock);
	let { editor: a, setFocusedIds: o } = Z(), s = (0, K.useMemo)(() => ({
		panelBlockTypes: e.panelBlockTypes,
		shortcutBlockTypes: e.shortcutBlockTypes,
		addBlock: (t, n) => {
			n instanceof Un && (n = e.blocks.indexOf(n) + 1), a.addBlock(e, t, n), o([t.id]);
		},
		mergeBlock: (t) => {
			let n = e.blocks.indexOf(t);
			a.mergeBlock(e, t) && o([e.blocks[n - 1].id]);
		},
		removeBlock: (t) => {
			let n = e.blocks.indexOf(t);
			a.removeBlock(e, t), n > 0 && o([e.blocks[n - 1].id]);
		},
		swapBlocks: (t, n, r) => {
			if (!(t === void 0 || n === void 0 || !e.blocks[t] || !e.blocks[n])) {
				if (r) {
					let r = e.blocks[t].wrapperRef.current;
					if (!r) return;
					let i = r.getBoundingClientRect(), a = window.pageYOffset || document.documentElement.scrollTop, o = i.height + 22;
					window.scrollTo({
						top: a + (t > n ? -o : o),
						behavior: "smooth"
					});
				}
				a.swapBlocks(e, t, n);
			}
		}
	}), []), c = (0, K.useCallback)(() => {
		e.resetCompiledHtml();
	}, []);
	(0, K.useEffect)(() => (a.on("change", c), e._html !== "" && al(rl(e._html), a.factory, new _l()).then((t) => {
		e._html = "", e.blocks = t, t[0] && o([t[0].id]);
	}), () => {
		a.off("change", c);
	}), []), (0, K.useEffect)(() => {
		if (r) {
			c();
			return;
		}
		e.constructor.shouldBeCompiled && e.compiledHtml === void 0 && !t && !r && e.compile({ editor: a });
	}, [t, r]);
	let l = /* @__PURE__ */ (0, X.jsxs)(Kn.Provider, {
		value: s,
		children: [
			/* @__PURE__ */ (0, X.jsx)(Ir, {
				block: e,
				keys: ["className"]
			}),
			e.blocks.map((a, o) => {
				let s = i !== !0 && e.blocks.length === 1, c = t && s || void 0;
				return /* @__PURE__ */ (0, X.jsx)(Bc, {
					id: a.id,
					block: a,
					focus: c,
					skipFocusDefault: !(e.showPreview || e.isNewlyAdded),
					focusBlock: !e.showPreview || t || n || r,
					ignoreClickEvent: c && s,
					index: o,
					parentBlock: e,
					canRemove: i === !0,
					showButton: i === !0
				}, a.id);
			}),
			i && /* @__PURE__ */ (0, X.jsx)("div", {
				className: "mt-be-btn-add-bottom",
				children: /* @__PURE__ */ (0, X.jsx)(Er, {
					index: e.blocks.length,
					showShortcuts: e.showShortcuts,
					label: G("+ add new block"),
					labelDirect: G("+ add new {{label}} block", { label: "{{label}}" })
				})
			})
		]
	});
	return e.constructor.typeId === "core-column" ? /* @__PURE__ */ (0, X.jsx)("div", {
		className: "mt-be-column",
		style: { width: "100%" },
		children: l
	}) : l;
}, nl = class extends Un {
	static typeId = "core-column";
	static className = "mt-be-column";
	static rootBlock = "div";
	static selectable = !1;
	static showPreview = !0;
	static get label() {
		return G("Column");
	}
	_html = "";
	previewHeader = "";
	showShortcuts = !0;
	blocks = [];
	cancelOngoingCompilationHandlers = [];
	canRemoveBlock = !0;
	panelBlockTypes = null;
	shortcutBlockTypes = null;
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	childBlocks() {
		return this.blocks;
	}
	get rootBlock() {
		return this.constructor.rootBlock;
	}
	get showPreview() {
		return this.constructor.showPreview;
	}
	resetCompiledHtml() {
		this.compiledHtml = void 0, this.removeIntermediateProduct = !1, this.cancelOngoingCompilationHandlers.map((e) => {
			e();
		}), this.cancelOngoingCompilationHandlers = [];
	}
	editor({ focus: e, focusBlock: t, focusDescendant: n, canRemove: r }) {
		return this.showPreview && this.constructor.typeId !== "core-column" && (this._html === "" && this.blocks.length === 0 && this.effectiveAddableBlockTypes().length === 0 || !e && !n && !t) ? /* @__PURE__ */ (0, X.jsx)(Zc, {
			block: this,
			header: this.previewHeader,
			border: "none"
		}, this.id) : /* @__PURE__ */ (0, X.jsx)(K.Fragment, { children: /* @__PURE__ */ (0, X.jsx)(tl, {
			block: this,
			focus: e,
			focusBlock: t,
			focusDescendant: n,
			canRemove: r
		}, this.id) }, this.id);
	}
	isBlank() {
		return this.blocks.length === 0;
	}
	async serializeChildBlocks(e) {
		let t = {
			...e,
			removeChildIntermediateProduct: e.removeChildIntermediateProduct || this.removeIntermediateProduct
		};
		if (this.blocks.length <= $c) return Promise.all(this.blocks.map((e) => e.serialize(t)));
		let n = [], r = Object.keys(this.blocks).map((e) => Number(e));
		return await Promise.all([...Array($c)].map(async () => {
			for (let e = r.shift(); e !== void 0; e = r.shift()) n[e] = await this.blocks[e].serialize(t);
		})), n;
	}
	async serializedString(e) {
		let t = [this.constructor.className, this.className].filter((e) => e), n = await this.serializeChildBlocks(e);
		return [
			this.rootBlock ? `<${this.rootBlock}${t.length ? ` class='${Tn(t.join(" "))}'` : ""}>` : "",
			n.join(""),
			this.rootBlock ? `</${this.rootBlock}>` : ""
		].join("");
	}
	async compile({ editor: e }) {
		let t = !1;
		this.cancelOngoingCompilationHandlers.push(() => {
			t = !0;
		});
		let n = () => !t, r = await this.serializedString({
			editor: e,
			external: !1
		});
		return new Promise((i, a) => {
			let o = null, s = document.createElement("div");
			Object.assign(s.style, el), document.body.appendChild(s);
			let c = (0, Ie.createRoot)(s), l = (e) => {
				o &&= (clearTimeout(o), null), c.unmount(), s.remove(), e ? a(e) : i();
			}, u = {
				editor: e,
				setFocusedIds: () => void 0,
				getFocusedIds: () => []
			};
			c.render(/* @__PURE__ */ (0, X.jsx)(Gn.Provider, {
				value: u,
				children: /* @__PURE__ */ (0, X.jsx)(Zc, {
					block: this,
					html: r,
					header: this.previewHeader,
					onBeforeSetCompiledHtml: n,
					onSetCompiledHtml: l
				}, this.id)
			}));
			let d = e.opts.block["core-column"] || {};
			o = setTimeout(async () => {
				t || (this.compiledHtml ||= r), l(null);
			}, d["compile-timeout"] || Qc);
		});
	}
	async serialize(e) {
		if (this.constructor.shouldBeCompiled || this.compiledHtml !== void 0) return super.serialize(e);
		let t = e.editor.serializeMeta(this, e.external);
		return [
			`<!-- mt-beb t="${this.constructor.typeId}"${t ? ` m='${Tn(t)}'` : ""} -->`,
			await this.serializedString(e),
			"<!-- /mt-beb -->"
		].join("");
	}
	static async newFromHtml({ node: e, factory: t, meta: n, context: r }) {
		let i = await al(e.hasAttribute("h") ? rl(e.getAttribute("h") || "") : e.innerHTML, t, r, ""), a = (e.hasAttribute("h") ? e.textContent : void 0) ?? void 0;
		return new this(Object.assign({
			blocks: i,
			compiledHtml: a,
			_html: ""
		}, n));
	}
	effectiveAddableBlockTypes() {
		return this.canRemoveBlock ? (this.panelBlockTypes || []).concat(this.shortcutBlockTypes || []) : [];
	}
}, rl = (() => {
	let e = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;"
	}, t = Object.fromEntries(Object.entries(e).map(([e, t]) => [t, e])), n = RegExp(`[${Object.keys(e).join("")}]`, "g"), r = RegExp(`(?:${Object.keys(t).join("|")})`, "g");
	return (i) => i.replace(n, (t) => e[t]).replace(/&lt;!--\s+(\/?mt-beb.*?)--&gt;/g, (e, n) => `<${n.replace(r, (e) => t[e])}>`);
})();
function il(e) {
	return e.replace(/&#(?:0*?(?:[0-8]|1[124-9]|2\d|3[01])?|x0*?(?:[0-8bcefBCEF]|1[0-9a-fA-F])?);|[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD\uD800-\uDBFF\uDC00-\uDFFF]/gm, "");
}
async function al(e, t, n, r = "core-html") {
	if (!e) return [];
	let i = new DOMParser().parseFromString(`<xml>${il(e)}</xml>`, "application/xml");
	if (!i.children[0]) return [];
	let a = [...i.children[0].children];
	if (a.length === 0) if (r !== "") {
		let t = document.createElement("div");
		t.setAttribute("t", r), t.innerHTML = e, a = [t];
	} else return [];
	let o = [];
	for (let e = 0; e < a.length; e++) {
		let r = a[e], i = r.getAttribute("t") || "core-text", s = ((r.getAttribute("m") || "{}").match(/\w+|,|.+/g) || []).filter((e) => e !== ",").map((e) => /^[^{]/.test(e) ? n.get(e) || {} : JSON.parse(e)), c = s.length === 1 ? s[0] : Object.assign.apply(null, [{}, ...s]);
		if (i === "core-context") {
			for (let e in c) n.set(e, c[e]);
			continue;
		}
		let l = r.getAttribute("h") || "";
		if (!l && r.textContent) {
			let e = r.textContent;
			c.className && (e = e.replace(/^(<[^>]+)( class=")([^"]+)"/, (e, t, n, r) => {
				let i = r.split(/\s+/).filter((e) => e !== c.className).join(" ");
				return i ? `${t}${n}${i}"` : t;
			})), l = e;
		}
		let u = {
			html: l,
			node: r,
			factory: t,
			meta: c,
			context: n
		}, d = await (t.types().find((e) => e.typeId === i) || nl).newFromHtml(u).catch(() => Ai.newFromHtml(u));
		o.push(d);
	}
	return o;
}
var ol = [];
function sl(e, t) {
	if (t.length === 0) return ol;
	let n = e instanceof uu ? e.blocks : e.childBlocks();
	return n.length === 0 ? ol : cl([...t], n);
}
function cl(e, t) {
	let n = [];
	for (let r = 0, i = t.length; r < i; r++) {
		let i = t[r], a = e.indexOf(i.id);
		if (a !== -1 && (n.push(i), e.splice(a, 1), e.length === 0) || (n.push(...cl(e, i.childBlocks())), e.length === 0)) return n;
	}
	return n;
}
function ll(e, t) {
	let n = e instanceof uu ? e.blocks : e.childBlocks(), r = {
		ids: new Set(t),
		rootBlocks: n,
		foundCount: 0
	};
	return ul(n, r), r.result || ol;
}
function ul(e, t, n = []) {
	t.result && t.foundCount === t.ids.size || e.forEach((e) => {
		let r = [...n, e];
		if (ul(e.childBlocks(), t, r), !(t.result && t.foundCount === t.ids.size) && t.ids.has(e.id)) if (t.foundCount++, t.ids.size === 1) t.result = [e];
		else if (t.startBlocks) {
			let e;
			findRange: for (let n = t.startBlocks.length - 2; n >= 0; n--) for (let i = r.length - 2; i >= 0; i--) if (t.startBlocks[n] === r[i]) {
				e = {
					blocks: t.startBlocks[n].childBlocks(),
					start: t.startBlocks[n + 1].id,
					end: r[i + 1].id
				};
				break findRange;
			}
			e ||= {
				blocks: t.rootBlocks,
				start: t.startBlocks[0].id,
				end: r[0].id
			};
			let n = e.blocks.map((e) => e.id);
			t.result = e.blocks.slice(n.indexOf(e.start), n.indexOf(e.end) + 1);
		} else t.startBlocks = r;
	});
}
//#endregion
//#region src/util/keyboardShortcut.ts
var dl = {
	mac: {
		cmd: "⌘",
		alt: "⌥",
		ctrl: "⌃",
		shift: "⇧"
	},
	other: {
		cmd: "Ctrl+",
		alt: "Alt+",
		ctrl: "Ctrl+",
		shift: "Shift+"
	}
}, fl = !1, pl = dl.other;
function ml(e) {
	fl = ["OS X", "iOS"].includes(e.os?.family || ""), pl = fl ? dl.mac : dl.other;
}
ml(ze.default);
function hl(e) {
	return `${e.ctrlKey && fl ? "ctrl+" : ""}${e.altKey ? "alt+" : ""}${e.shiftKey ? "shift+" : ""}${e.metaKey || e.ctrlKey && !fl ? "cmd+" : ""}${e.key}`;
}
function gl(e) {
	return e.replace(/(ctrl|cmd|alt|shift)\+/g, (e, t) => pl[t] || t);
}
//#endregion
//#region src/util/ParserContext.ts
var _l = class extends Map {}, vl = /* @__PURE__ */ s({
	NO_BLOCK_TYPE_FALLBACK: () => "",
	ParserContext: () => _l,
	decodeHtml: () => kn,
	escapeSingleQuoteAttribute: () => Tn,
	findDescendantBlocks: () => sl,
	focusIfIos: () => Ge,
	getBlocksByRange: () => ll,
	getElementById: () => gn,
	getElementByNthOfTypeIndexes: () => Cn,
	getNodeValue: () => vn,
	getNodeValueByTagName: () => yn,
	getShadowDomSelectorSet: () => Sn,
	isIos: () => He,
	isNarrowScreen: () => q,
	isPassThroughNativeEvent: () => An,
	isTouchDevice: () => We,
	mediaBreakPoint: () => Be,
	nl2br: () => jn,
	parseContent: () => al,
	preParseContent: () => rl,
	querySelector: () => _n,
	removeControlCharacters: () => il,
	sanitize: () => On,
	selectorCmp: () => bn,
	setPlatform: () => ml,
	toKeyboardShortcutKey: () => hl,
	toKeyboardShortcutLabel: () => gl,
	unescapeSingleQuoteAttribute: () => En
});
//#endregion
//#region src/Component/App.tsx
function yl(e, t) {
	if (e === t) return !0;
	if (e.length !== t.length) return !1;
	for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
var bl = ({ editor: e }) => {
	let [t, n] = (0, K.useState)([]), r = (0, K.useRef)(t), i = (0, K.useMemo)(() => ({
		editor: e,
		setFocusedIds: (e, t) => {
			let i = r.current;
			i.length >= 2 && e.length === 1 && i.includes(e[0]) || !t?.forceUpdate && yl(i, e) || (r.current = e, n(e));
		},
		getFocusedIds: () => r.current
	}), []), a = i.setFocusedIds, o = (0, K.useMemo)(() => ({
		panelBlockTypes: null,
		shortcutBlockTypes: null,
		addBlock: (t, n) => {
			n instanceof Un && (n = e.blocks.indexOf(n) + 1), e.addBlock(e, t, n), a([t.id]);
		},
		mergeBlock: (t) => {
			let n = e.blocks.indexOf(t);
			e.mergeBlock(e, t) && a([e.blocks[n - 1].id]);
		},
		removeBlock: (t) => {
			let n = e.blocks.indexOf(t);
			e.removeBlock(e, t), n > 0 && a([e.blocks[n - 1].id]);
		},
		swapBlocks: (t, n, r) => {
			if (!(t === void 0 || n === void 0 || !e.blocks[t] || !e.blocks[n])) {
				if (r) {
					let r = e.blocks[n].wrapperRef.current;
					if (!r) return;
					let i = r.getBoundingClientRect(), a = window.pageYOffset || document.documentElement.scrollTop, o = i.height;
					window.scrollTo({
						top: a + (t > n ? -o : o),
						behavior: "smooth"
					});
				}
				e.swapBlocks(e, t, n);
			}
		}
	}), []);
	return (0, K.useEffect)(() => {
		let t = (t) => {
			if (document.querySelector(".mt-be-overlay") || document.body.classList.contains("modal-open")) return;
			let n = e.editorElement;
			if (n.querySelector("[data-mt-block-editor-keep-focus=\"1\"]")) return;
			let i = t.target;
			if (!i.closest(".mce-container, .modal")) {
				for (; i.parentNode && i.parentNode !== i;) {
					if (i === n) {
						r.current.length === 0 && a(["editor"]);
						return;
					}
					i = i.parentNode;
				}
				a([]);
			}
		}, n = (t) => {
			let n = e.editorElement, i = r.current;
			if (i.length === 0 || !(t.ctrlKey || t.metaKey || t.altKey || t.shiftKey) || An(t) || n.querySelector("[data-mt-block-editor-keep-focus=\"1\"]")) return;
			let o = t.key;
			o === "z" && (t.ctrlKey || t.metaKey) && !t.shiftKey ? (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), e.editManager.undo({
				editor: e,
				getFocusedIds: () => i,
				setFocusedIds: a
			})) : (o === "z" && (t.ctrlKey || t.metaKey) && t.shiftKey || o === "y" && (t.ctrlKey || t.metaKey)) && (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), e.editManager.redo({
				editor: e,
				getFocusedIds: () => i,
				setFocusedIds: a
			}));
		}, i = "", o = (e) => {
			e.target instanceof HTMLElement && (i = e.target.closest("[data-mt-block-editor-block-id]")?.dataset.mtBlockEditorBlockId || "");
		}, s = (t) => {
			if (t.target instanceof HTMLElement) {
				let n = t.target.closest("[data-mt-block-editor-block-id]")?.dataset.mtBlockEditorBlockId || "";
				i && n && i !== n && (a(ll(e, [i, n]).map((e) => e.id)), t.preventDefault(), t.stopPropagation());
			}
			i = "";
		}, c = (t) => {
			e.commandManager.execute({
				...t.detail,
				event: t
			});
		};
		return e.editorElement.addEventListener("mousedown", o), e.editorElement.addEventListener("mouseup", s), window.addEventListener("click", t, {
			capture: !0,
			passive: !0
		}), window.addEventListener("keydown", n), window.addEventListener("mt-block-editor-command", c), () => {
			e.editorElement.removeEventListener("mousedown", o), e.editorElement.removeEventListener("mouseup", s), window.removeEventListener("click", t, { capture: !0 }), window.removeEventListener("keydown", n), window.removeEventListener("mt-block-editor-command", c);
		};
	}, []), /* @__PURE__ */ (0, X.jsx)(Gn.Provider, {
		value: i,
		children: /* @__PURE__ */ (0, X.jsx)(Kn.Provider, {
			value: o,
			children: /* @__PURE__ */ (0, X.jsx)(qo, {
				backend: Oc,
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "mt-be-app",
					children: [e.blocks.map((e, t) => /* @__PURE__ */ (0, X.jsx)(Bc, {
						id: e.id,
						block: e,
						index: t,
						showButton: !0,
						canRemove: !0
					}, e.id)), e.opts.addButtons.bottom && /* @__PURE__ */ (0, X.jsx)("div", {
						className: "mt-be-btn-add-bottom",
						children: /* @__PURE__ */ (0, X.jsx)(Er, {
							className: "mt-be-block-list-wrapper--bottom",
							index: e.blocks.length,
							showShortcuts: !0,
							label: G("+ add new block"),
							labelDirect: G("+ add new {{label}} block", { label: "{{label}}" })
						})
					})]
				})
			})
		})
	});
}, xl = class e {
	static allTypes = [];
	static registerType(e) {
		this.allTypes.push(e);
	}
	static deregisterType(e) {
		this.allTypes = this.allTypes.filter((t) => typeof e == "string" ? t.typeId === e : t !== e);
	}
	types() {
		return e.allTypes;
	}
	selectableTypes() {
		return e.allTypes.filter((e) => e.selectable);
	}
	lookupType(t) {
		let n = e.allTypes.find((e) => e.typeId === t);
		if (!n) throw `Unknown typeId: ${t}`;
		return n;
	}
}, Sl = 100, Cl = void 0, wl = class {
	editor = null;
	limit = Sl;
	index = 0;
	ignore = !1;
	histories = [];
	group = Cl;
	constructor(e) {
		Object.assign(this, e);
	}
	unload() {
		this.editor = null, this.histories = [];
	}
	canUndo() {
		return this.histories.length !== 0 && this.histories.length > this.index;
	}
	canRedo() {
		return this.index !== 0;
	}
	add(e) {
		this.ignore || (this._add(e), this.group === Cl && this.emitChange());
	}
	_add(e) {
		if (this.index !== 0 && this.histories.splice(-this.index, this.index), this.index = 0, this.group !== Cl && !e.group && (e.group = this.group), e.handlers.merge) {
			let t = this.histories[this.histories.length - 1];
			if (t && t.group === e.group && t.handlers.id === e.handlers.id) {
				let n = e.handlers.merge.call(void 0, t, e);
				if (n) {
					this.histories[this.histories.length - 1] = n;
					return;
				}
			}
		}
		if (this.histories.push(e), this.histories.length > this.limit) {
			let e = this.histories.length - this.limit;
			this.histories.splice(0, e);
		}
	}
	undo(e, t) {
		let n = this.histories[this.histories.length - this.index - 1];
		if (!n || t !== void 0 && t !== n.group) {
			t !== void 0 && this.emitChange();
			return;
		}
		this.index++, this.ignore = !0, n.handlers.undo.call(void 0, n, e), this.ignore = !1, n.group === Cl ? this.emitChange() : this.undo(e, n.group);
	}
	redo(e, t) {
		let n = this.histories[this.histories.length - this.index];
		if (!n || t !== void 0 && t !== n.group) {
			t !== void 0 && this.emitChange();
			return;
		}
		this.index--, this.ignore = !0, n.handlers.redo.call(void 0, n, e), this.ignore = !1, n.group === Cl ? this.emitChange() : this.redo(e, n.group);
	}
	generateGroup() {
		return Math.round(Math.random() * 1e5);
	}
	beginGrouping() {
		this.group = this.generateGroup();
	}
	endGrouping() {
		if (this.group === Cl) return;
		let e = this.histories[this.histories.length - 1];
		e && e.group === this.group && this.emitChange(), this.group = Cl;
	}
	emitChange() {
		this.editor && this.editor.emit("change", { editor: this.editor });
	}
}, Tl = {
	id: Symbol("add"),
	undo(e, { editor: t, setFocusedIds: n }) {
		let r = e.data.parent || t, i = r.blocks.indexOf(e.block);
		t.removeBlock(r, e.block), n([(r.blocks[Math.max(0, i - 1)] || (r instanceof Un ? r : null))?.id ?? "editor"]);
	},
	redo(e, { editor: t, setFocusedIds: n }) {
		let r = e.data.parent || t;
		t.addBlock(r, e.block, e.data.index), n([e.block.id]), r.blocks.length === 1 && t.render();
	}
}, El = {
	id: Symbol("remove"),
	undo(e, { editor: t, setFocusedIds: n }) {
		t.addBlock(e.data.parent || t, e.block, e.data.index), n([e.block.id], { forceUpdate: !0 });
	},
	redo(e, { editor: t, setFocusedIds: n }) {
		let r = e.data.parent || t, i = r.blocks.indexOf(e.block);
		t.removeBlock(r, e.block), i > 0 && n([r.blocks[i - 1].id]);
	}
}, Dl = {
	id: Symbol("swap"),
	undo(e, { editor: t }) {
		t.swapBlocks(e.data.parent || t, e.data.a, e.data.b);
	},
	redo(e, { editor: t }) {
		t.swapBlocks(e.data.parent || t, e.data.a, e.data.b);
	}
}, Ol = (e) => {
	let t = new DOMParser().parseFromString(e.html, "text/html");
	t.body.children.length > 0 && [...t.body.children].every((e) => e instanceof HTMLIFrameElement && /^https:\/\/www.youtube.com\//.test(e.src)) ? e.scheme = "srcdoc" : /^https:\/\/www.tiktok.com\//.test(t.body.querySelector("script")?.src || "") && (e.scheme = "data-wrap");
}, kl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M464%20448H48c-26.5%200-48-21.5-48-48V112c0-26.5%2021.5-48%2048-48h416c26.5%200%2048%2021.5%2048%2048v288c0%2026.5-21.5%2048-48%2048zM112%20120c-30.9%200-56%2025.1-56%2056s25.1%2056%2056%2056%2056-25.1%2056-56-25.1-56-56-56zM64%20384h384V272l-87.5-87.5c-4.7-4.7-12.3-4.7-17%200L208%20320l-55.5-55.5c-4.7-4.7-12.3-4.7-17%200L64%20336v48z'/%3e%3c/svg%3e", Al = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20160%20159.8'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%23666;}%3c/style%3e%3c/defs%3e%3cg%20id='レイヤー_2'%20data-name='レイヤー%202'%3e%3cg%20id='レイヤー_2-2'%20data-name='レイヤー%202'%3e%3cpath%20class='cls-1'%20d='M102.19,70.56a36.17,36.17,0,0,0-5.6-7.33l-.44-.43a8,8,0,0,0-11.78.87c-.06.09-.13.17-.19.25a8.07,8.07,0,0,0,.87,10.75l0,0a19.5,19.5,0,0,1,5.65,13.65,18.81,18.81,0,0,1-.11,2A19.1,19.1,0,0,1,85.09,102l-35.9,35.9a19.31,19.31,0,0,1-27.29,0h0a19.32,19.32,0,0,1-5.15-18.12,19.78,19.78,0,0,1,5.47-9.49L42.54,90a7.77,7.77,0,0,0,2.12-7c0-.25-.09-.5-.13-.76A7.74,7.74,0,0,0,31.44,78.1L10.92,98.62A36.47,36.47,0,0,0,.24,120.07,35.38,35.38,0,0,0,10.41,149.4h0a35.57,35.57,0,0,0,50.27,0l35.91-35.9A35.32,35.32,0,0,0,107,88.37a36.26,36.26,0,0,0-.8-7.46A35.27,35.27,0,0,0,102.19,70.56Z'/%3e%3cpath%20class='cls-1'%20d='M151.54,12.31c-13.72-16.1-38-16.27-53-1.32l-32,32-3.15,3.15c-.77.77-1.49,1.58-2.19,2.41-.46.56-.89,1.14-1.31,1.73-.18.24-.38.48-.55.73q-.8,1.17-1.5,2.37c0,.06-.07.11-.1.16q-.75,1.3-1.38,2.67a35.22,35.22,0,0,0-2.58,22.52c.19.85.41,1.7.66,2.53l.12.42c.22.69.45,1.37.7,2,.08.19.15.39.23.59.25.63.52,1.24.8,1.85.1.2.18.41.28.6.38.78.78,1.56,1.22,2.31a35.81,35.81,0,0,0,5.6,7.33c.25.25.54.51.86.79a7.51,7.51,0,0,0,10.94-1.25l.54-.73A7.87,7.87,0,0,0,75,85l0,0a19.5,19.5,0,0,1-5.65-13.65,18,18,0,0,1,.12-2.08,19,19,0,0,1,.45-2.5c.06-.27.12-.54.2-.81s.18-.56.27-.84.19-.56.3-.83l.33-.78c.13-.29.26-.57.41-.85s.24-.48.37-.71.34-.58.52-.87.27-.42.41-.62.45-.63.69-.94l.37-.48c.38-.46.78-.9,1.21-1.33L87.06,45.47l23.22-23.23c7.3-7.29,19.19-8.21,26.93-1.39A19.32,19.32,0,0,1,138.12,49L117.59,69.51a8.06,8.06,0,0,0-2.25,7.13c0,.07,0,.15,0,.23a8,8,0,0,0,13.54,4.28l20.68-20.67A35.59,35.59,0,0,0,151.54,12.31Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e", jl = "mt-be-overlay", Ml = {
	position: "relative",
	zIndex: 1e3
}, Nl = ({ open: e, onClose: t = () => null, children: n }) => {
	let r = (0, K.useRef)(null), [i] = (0, K.useState)(() => document.createElement("div"));
	return (0, K.useEffect)(() => (Object.assign(i.style, Ml), i.classList.add("mt-block-editor"), document.body.appendChild(i), () => i.remove()), []), (0, K.useEffect)(() => {
		if (!e) return;
		function n(e) {
			e.key === "Escape" && t();
		}
		return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
	}, [e]), (0, dr.createPortal)(/* @__PURE__ */ (0, X.jsx)(xr, {
		nodeRef: r,
		in: e,
		onEnter: () => document.body.classList.add("mt-block-editor-overlay-open"),
		onExit: () => document.body.classList.remove("mt-block-editor-overlay-open"),
		classNames: jl,
		unmountOnExit: !0,
		timeout: 300,
		children: /* @__PURE__ */ (0, X.jsx)("div", {
			ref: r,
			className: jl,
			children: n
		})
	}), i);
}, Pl = (0, K.createContext)({}), Fl = (e) => {
	let t = (0, K.useRef)(null), n = `mt-be-dialog ${e.className || ""}`;
	return (0, K.useEffect)(() => {
		if (!e.open) return;
		let n = t.current;
		if (!n) return;
		let r = n.querySelector("[data-mt-block-editor-focus-default]");
		r && setTimeout(() => {
			r.focus();
		}, 300);
	}, [e.open]), /* @__PURE__ */ (0, X.jsx)(Nl, {
		open: e.open,
		onClose: e.onClose,
		children: /* @__PURE__ */ (0, X.jsx)(Pl.Provider, {
			value: { onClose: e.onClose },
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				className: n,
				"data-mt-be-dialog": !0,
				ref: t,
				children: /* @__PURE__ */ (0, X.jsx)("div", {
					className: "mt-be-dialog-content",
					children: e.children
				})
			})
		})
	});
}, Il = (e) => {
	let { onClose: t = () => null } = (0, K.useContext)(Pl);
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "mt-be-dialog-header",
		children: [e.children, /* @__PURE__ */ (0, X.jsx)("button", {
			type: "button",
			className: "mt-be-dialog-btn-close",
			"aria-label": G("Close"),
			onClick: t,
			children: "×"
		})]
	});
}, Ll = (e) => /* @__PURE__ */ (0, X.jsx)("div", {
	className: "mt-be-dialog-body",
	children: e.children
}), Rl = (e) => /* @__PURE__ */ (0, X.jsx)("div", {
	className: "mt-be-dialog-footer",
	children: e.children
}), zl = ({ block: e }) => {
	let t = /* @__PURE__ */ (0, X.jsx)("img", {
		src: e.url,
		className: e.className,
		alt: e.alt
	});
	return e.linkUrl && (t = /* @__PURE__ */ (0, X.jsx)("a", {
		href: e.linkUrl,
		target: e.linkTarget || void 0,
		title: e.linkTitle || void 0,
		children: t
	})), e.caption ? /* @__PURE__ */ (0, X.jsxs)("figure", { children: [t, /* @__PURE__ */ (0, X.jsx)("figcaption", { children: jn(e.caption) })] }) : /* @__PURE__ */ (0, X.jsx)("p", { children: t });
}, Bl = Mr(({ block: e }) => {
	let [t, n] = (0, K.useState)(!1), r = (0, K.useRef)(null);
	return Jr({
		block: e,
		commands: [{
			command: "core-insertLink",
			callback: () => {
				n(!0);
			}
		}]
	}, []), /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		/* @__PURE__ */ (0, X.jsx)(Dr, { children: /* @__PURE__ */ (0, X.jsx)(jc, {
			icon: Al,
			label: G("Insert Link"),
			onClick: () => n(!0)
		}) }),
		/* @__PURE__ */ (0, X.jsxs)(Fl, {
			open: t,
			onClose: () => n(!1),
			children: [/* @__PURE__ */ (0, X.jsx)(Il, { children: /* @__PURE__ */ (0, X.jsx)("h4", {
				className: "mt-be-dialog-title",
				children: G("Insert Link")
			}) }), /* @__PURE__ */ (0, X.jsxs)("form", {
				ref: r,
				children: [/* @__PURE__ */ (0, X.jsxs)(Ll, { children: [
					/* @__PURE__ */ (0, X.jsxs)("label", {
						className: "mt-be-label-name",
						children: [/* @__PURE__ */ (0, X.jsx)("div", {
							className: "mt-be-label-block",
							children: G("Link URL")
						}), /* @__PURE__ */ (0, X.jsx)("input", {
							type: "url",
							className: "mt-be-input",
							"data-property-name": "linkUrl",
							defaultValue: e.linkUrl,
							"data-mt-block-editor-focus-default": !0
						})]
					}),
					/* @__PURE__ */ (0, X.jsxs)("label", {
						className: "mt-be-label-name",
						children: [/* @__PURE__ */ (0, X.jsx)("div", {
							className: "mt-be-label-block",
							children: G("Title")
						}), /* @__PURE__ */ (0, X.jsx)("input", {
							className: "mt-be-input",
							"data-property-name": "linkTitle",
							defaultValue: e.linkTitle
						})]
					}),
					/* @__PURE__ */ (0, X.jsxs)("label", {
						className: "mt-be-label-name",
						children: [/* @__PURE__ */ (0, X.jsx)("div", {
							className: "mt-be-label-block",
							children: G("Target Attribute")
						}), /* @__PURE__ */ (0, X.jsxs)("select", {
							"data-property-name": "linkTarget",
							className: "mt-be-input",
							defaultValue: e.linkTarget,
							children: [/* @__PURE__ */ (0, X.jsx)("option", {
								value: "_self",
								children: G("None")
							}), /* @__PURE__ */ (0, X.jsx)("option", {
								value: "_blank",
								children: G("New window")
							})]
						})]
					})
				] }), /* @__PURE__ */ (0, X.jsxs)(Rl, { children: [/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "mt-be-btn-default",
					onClick: () => {
						n(!1);
					},
					children: G("Close")
				}), /* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "mt-be-btn-primary",
					onClick: () => {
						let t = r.current;
						t && ([
							"linkUrl",
							"linkTitle",
							"linkTarget"
						].forEach((n) => {
							e[n] = t.querySelector(`[data-property-name="${n}"]`)?.value || "";
						}), n(!1));
					},
					children: G("Save")
				})] })]
			})]
		}),
		/* @__PURE__ */ (0, X.jsx)(Ir, { block: e }),
		/* @__PURE__ */ (0, X.jsxs)(Lr, {
			block: e,
			children: [
				/* @__PURE__ */ (0, X.jsxs)("label", {
					className: "mt-be-label-name",
					children: [/* @__PURE__ */ (0, X.jsx)("div", { children: G("Image URL") }), /* @__PURE__ */ (0, X.jsx)("input", {
						type: "url",
						"data-property-name": "url",
						"data-mt-block-editor-focus-default": !0
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)("label", {
					className: "mt-be-label-name",
					children: [/* @__PURE__ */ (0, X.jsx)("div", { children: G("Class Name") }), /* @__PURE__ */ (0, X.jsx)("input", { "data-property-name": "className" })]
				}),
				/* @__PURE__ */ (0, X.jsxs)("label", {
					className: "mt-be-label-name",
					children: [/* @__PURE__ */ (0, X.jsx)("div", { children: G("Alternative Text") }), /* @__PURE__ */ (0, X.jsx)("input", { "data-property-name": "alt" })]
				}),
				/* @__PURE__ */ (0, X.jsxs)("label", {
					className: "mt-be-label-name",
					children: [/* @__PURE__ */ (0, X.jsx)("div", { children: G("Caption") }), /* @__PURE__ */ (0, X.jsx)("textarea", {
						"data-property-name": "caption",
						"data-min-rows": "1",
						style: { width: "100%" }
					})]
				})
			]
		})
	] });
}), Vl = class e extends Un {
	static typeId = "core-image";
	static selectable = !0;
	static icon = kl;
	static get label() {
		return G("Image");
	}
	url = "";
	alt = "";
	caption = "";
	linkUrl = "";
	linkTarget = "_self";
	linkTitle = "";
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	editor({ focus: e, focusBlock: t }) {
		return e || t ? /* @__PURE__ */ (0, X.jsx)(Bl, { block: this }, this.id) : this.html();
	}
	html() {
		return /* @__PURE__ */ (0, X.jsx)(zl, { block: this });
	}
	static canNewFromFile() {
		return !0;
	}
	static async newFromFile({ file: t }) {
		return new e({ url: URL.createObjectURL(t) });
	}
	static async newFromHtml({ html: t, meta: n }) {
		let r = new DOMParser().parseFromString(t, "text/html");
		return new e(Object.assign({
			url: r.querySelector("IMG").src || "",
			className: r.querySelector("IMG").className || "",
			alt: r.querySelector("IMG").alt || "",
			caption: r.querySelector("FIGCAPTION") && r.querySelector("FIGCAPTION").innerHTML.replace(/<br[^>]*>/g, "\n") || ""
		}, n));
	}
}, Hl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20384%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M288%20248v28c0%206.6-5.4%2012-12%2012H108c-6.6%200-12-5.4-12-12v-28c0-6.6%205.4-12%2012-12h168c6.6%200%2012%205.4%2012%2012zm-12%2072H108c-6.6%200-12%205.4-12%2012v28c0%206.6%205.4%2012%2012%2012h168c6.6%200%2012-5.4%2012-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0%2026.5-21.5%2048-48%2048H48c-26.5%200-48-21.5-48-48V48C0%2021.5%2021.5%200%2048%200h204.1C264.8%200%20277%205.1%20286%2014.1L369.9%2098c9%208.9%2014.1%2021.2%2014.1%2033.9zm-128-80V128h76.1L256%2051.9zM336%20464V176H232c-13.3%200-24-10.7-24-24V48H48v416h288z'/%3e%3c/svg%3e", Ul = Mr(({ block: e }) => /* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)(Ir, { block: e }), /* @__PURE__ */ (0, X.jsxs)(Lr, {
	block: e,
	children: [/* @__PURE__ */ (0, X.jsxs)("label", {
		className: "mt-be-label-name",
		children: [/* @__PURE__ */ (0, X.jsx)("div", { children: G("Link URL") }), /* @__PURE__ */ (0, X.jsx)("input", {
			type: "url",
			"data-property-name": "url",
			"data-mt-block-editor-focus-default": !0
		})]
	}), /* @__PURE__ */ (0, X.jsxs)("label", {
		className: "mt-be-label-name",
		children: [/* @__PURE__ */ (0, X.jsx)("div", { children: G("Text to display") }), /* @__PURE__ */ (0, X.jsx)("input", { "data-property-name": "text" })]
	})]
})] })), Wl = ({ block: e }) => /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: /* @__PURE__ */ (0, X.jsx)("a", {
	href: e.url,
	children: e.text
}) }), Gl = class e extends Un {
	static typeId = "core-file";
	static selectable = !0;
	static icon = Hl;
	static get label() {
		return G("File");
	}
	text = "";
	url = "";
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	editor({ focus: e }) {
		return e ? /* @__PURE__ */ (0, X.jsx)(Ul, {
			block: this,
			focus: e
		}, this.id) : /* @__PURE__ */ (0, X.jsx)("div", { dangerouslySetInnerHTML: { __html: On(this.htmlString()) } });
	}
	html() {
		return /* @__PURE__ */ (0, X.jsx)(Wl, { block: this }, this.id);
	}
	static async newFromHtml({ html: t, meta: n }) {
		let r = new DOMParser().parseFromString(t, "text/html");
		return new e(Object.assign({
			url: r.querySelector("A").href || "",
			text: r.querySelector("A").textContent || ""
		}, n));
	}
}, Kl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M464%2032H48C21.5%2032%200%2053.5%200%2080v352c0%2026.5%2021.5%2048%2048%2048h416c26.5%200%2048-21.5%2048-48V80c0-26.5-21.5-48-48-48zM224%20416H64v-96h160v96zm0-160H64v-96h160v96zm224%20160H288v-96h160v96zm0-160H288v-96h160v96z'/%3e%3c/svg%3e", ql = ({ block: e }) => {
	let t = qn(), n = Z(), { editor: r } = n, { addBlock: i } = qn(), a = Sn(e.id), o = (0, K.useMemo)(() => {
		let o = si() >= 6 ? { plugins: [
			"table",
			"code",
			"media",
			"link",
			"MTBlockEditor"
		] } : { plugins: "table code paste media textcolor link MTBlockEditor" }, s = {
			...li(r, e, n, t),
			...o,
			toolbar: "table | bold italic underline strikethrough forecolor backcolor removeformat | alignleft aligncenter alignright | link unlink | code",
			init_instance_callback: (t) => {
				e.tinymce = t, t.setContent(e.text), Hr(t, a);
				let n = t.dom.getRoot();
				t.undoManager.add = () => (si() >= 6 ? t.dispatch("Change") : t.fire("Change"), null);
				let o = e.text;
				t.on("MTBlockEditorEdit", (e) => {
					t.dom.setHTML(t.getBody(), e.html), o = e.html;
				});
				let s = () => {
					let n = t.getContent();
					o !== n && (r.editManager.add({
						block: e,
						data: { last: o },
						handlers: ui
					}), o = n);
				};
				t.on("NodeChange Change", (a) => {
					if (n.childNodes.length <= 1) {
						s();
						return;
					}
					if (a.type === "change") return;
					let o = [...n.childNodes];
					if (o = o.filter((e) => !e.classList.contains("mce-pastebin")).map((e) => {
						if (e.tagName === "TABLE") return e;
						{
							let r = [];
							return [...e.querySelectorAll("TABLE")].forEach((t) => {
								t.parentElement.closest("TABLE") || (n.insertBefore(t, e), r.push(t));
							}), t.dom.remove(e), r;
						}
					}).flat(), o.length === 1) {
						s();
						return;
					}
					o.shift(), o.reverse(), o.forEach((e) => {
						t.dom.remove(e);
					}), r.editManager.beginGrouping(), s(), o.forEach((t) => {
						i(new Jl({ text: t.outerHTML }), e);
					}), r.editManager.endGrouping();
				}), Wr(t, e, r.editorElement);
			},
			...r.opts.block["core-table"]?.tinyMCESettings || {}
		};
		return r.emit("buildTinyMCESettings", {
			editor: r,
			block: e,
			settings: s
		}), s;
	}, []);
	(0, K.useEffect)(() => (ci(), tinymce.init(o), () => {
		Ur(e);
	}), []);
	let s = r.opts.mode === "setup";
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		style: e.editorStyle,
		children: [
			/* @__PURE__ */ (0, X.jsx)(Ir, { block: e }),
			/* @__PURE__ */ (0, X.jsx)(Lr, {
				block: e,
				children: /* @__PURE__ */ (0, X.jsx)("div", {
					id: e.tinymceId(),
					className: s ? "mt-be-input-container" : "",
					dangerouslySetInnerHTML: { __html: On(e.html()) }
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(Dr, {
				rows: Array.isArray(o.toolbar) ? o.toolbar.length : 1,
				fullWidth: !0,
				hasBorder: !1,
				className: "mt-be-block-toolbar--tinymce",
				onMouseDown: (e) => {
					An(e.nativeEvent) || e.preventDefault();
				}
			})
		]
	});
}, Jl = class e extends Un {
	static typeId = "core-table";
	static selectable = !0;
	static icon = Kl;
	static get label() {
		return G("Table");
	}
	text = "";
	tinymce = null;
	editorStyle = {};
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	focusEditor() {
		this.tinymce && this.tinymce.focus(!1);
	}
	tinymceId() {
		return `textarea-${this.id}`;
	}
	editor({ focus: e, focusBlock: t }) {
		if (e) return /* @__PURE__ */ (0, X.jsx)(ql, { block: this }, this.id);
		if (t || this.htmlString()) {
			let e = /* @__PURE__ */ (0, X.jsx)(Rr, {
				block: this,
				html: this.htmlString()
			});
			return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "composition",
				children: /* @__PURE__ */ (0, X.jsx)(Lr, {
					block: this,
					children: e
				})
			}), /* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "setup",
				children: e
			})] });
		} else return this.placeholder();
	}
	html() {
		if (this.tinymce) try {
			return this.tinymce.getContent();
		} catch (e) {
			console.log(e);
		}
		return this.text;
	}
	static async newFromHtml({ html: t, meta: n }) {
		return new e(Object.assign({ text: t }, n));
	}
}, Yl = ({ block: e }) => {
	qn();
	let { editor: t } = Z(), { addBlock: n } = qn(), r = Sn(e.id), i = (0, K.useRef)(null), a = (0, K.useMemo)(() => {
		let n = {
			...Ti(t, e),
			toolbar: [[[
				["table"],
				[
					"bold",
					"italic",
					"underline",
					"strike",
					"foregroundColor",
					"backgroundColor",
					"removeFormat"
				],
				[
					"alignLeft",
					"alignCenter",
					"alignRight"
				],
				["link", "unlink"],
				["source"]
			]]],
			...t.opts.block["core-table"]?.mtRichTextEditorSettings || {}
		};
		return t.emit("buildMTRichTextEditorSettings", {
			editor: t,
			block: e,
			settings: n
		}), Ci(n), n;
	}, []);
	(0, K.useEffect)(() => {
		let o = document.createElement("div");
		return i.current?.appendChild(o), a.toolbarContainer = o, MTRichTextEditor.create(a).then((i) => {
			e.mtRichTextEditor = i, i.setContent(e.text), vi(i, r), bi(e, t.editorElement);
			let a = e.text, o = (e) => {
				a = e;
			}, s = () => {
				let n = i.getContent();
				a !== n && (t.editManager.add({
					block: e,
					data: {
						last: a,
						onUndo: o
					},
					handlers: wi
				}), a = n);
			}, c = i.tiptap.view.dom;
			i.tiptap.on("update", () => {
				let r = [...c.children];
				if (r.length <= 1) {
					s();
					return;
				}
				if (r = r.map((e) => {
					if (e.tagName === "TABLE") return e;
					{
						let t = [];
						return [...e.querySelectorAll("TABLE")].forEach((n) => {
							n.parentElement.closest("TABLE") || (c.insertBefore(n, e), t.push(n));
						}), t;
					}
				}).flat(), r.length === 1) {
					s();
					return;
				}
				let a = r.shift();
				i.tiptap.commands.setContent(a.outerHTML), t.editManager.beginGrouping(), s(), r.forEach((t) => {
					n(new Xl({ text: t.outerHTML }), e);
				}), t.editManager.endGrouping();
			});
		}), () => {
			yi(e);
		};
	}, []);
	let o = t.opts.mode === "setup";
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		style: e.editorStyle,
		children: [
			/* @__PURE__ */ (0, X.jsx)(Ir, { block: e }),
			/* @__PURE__ */ (0, X.jsx)(Lr, {
				block: e,
				children: /* @__PURE__ */ (0, X.jsx)("div", {
					id: e.mtRichTextEditorId(),
					className: o ? "mt-be-input-container" : "",
					dangerouslySetInnerHTML: { __html: On(e.html()) }
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(Dr, {
				rows: a.toolbar?.length || 0,
				fullWidth: !0,
				hasBorder: !1,
				className: "mt-be-block-toolbar--mt-rich-text-editor",
				onMouseDown: (e) => {
					An(e.nativeEvent) || e.preventDefault();
				},
				ref: i
			})
		]
	});
}, Xl = class e extends Un {
	static typeId = "core-table";
	static selectable = !0;
	static icon = Kl;
	static get label() {
		return G("Table");
	}
	text = "";
	mtRichTextEditor = null;
	editorStyle = {};
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	focusEditor() {
		this.mtRichTextEditor && this.mtRichTextEditor.focus();
	}
	mtRichTextEditorId() {
		return `textarea-${this.id}`;
	}
	editor({ focus: e, focusBlock: t }) {
		if (e) return /* @__PURE__ */ (0, X.jsx)(Yl, { block: this }, this.id);
		if (t || this.htmlString()) {
			let e = /* @__PURE__ */ (0, X.jsx)(Rr, {
				block: this,
				html: this.htmlString()
			});
			return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "composition",
				children: /* @__PURE__ */ (0, X.jsx)(Lr, {
					block: this,
					children: e
				})
			}), /* @__PURE__ */ (0, X.jsx)(Zn, {
				mode: "setup",
				children: e
			})] });
		} else return this.placeholder();
	}
	html() {
		if (this.mtRichTextEditor) try {
			return this.mtRichTextEditor.getContent();
		} catch (e) {
			console.log(e);
		}
		return this.text;
	}
	static async newFromHtml({ html: t, meta: n }) {
		return new e(Object.assign({ text: t }, n));
	}
}, Zl = "MTRichTextEditor" in globalThis ? Xl : Jl, Ql = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M496%20224H16c-8.8%200-16%207.2-16%2016v32c0%208.8%207.2%2016%2016%2016h480c8.8%200%2016-7.2%2016-16v-32c0-8.8-7.2-16-16-16z'/%3e%3c/svg%3e", $l = () => /* @__PURE__ */ (0, X.jsx)("hr", {}), eu = class e extends Un {
	static typeId = "core-horizontalrule";
	static selectable = !0;
	static icon = Ql;
	static get label() {
		return G("Horizontal Rule");
	}
	editor() {
		return /* @__PURE__ */ (0, X.jsx)($l, {}, this.id);
	}
	html() {
		return /* @__PURE__ */ (0, X.jsx)("hr", {});
	}
	static async newFromHtml() {
		return new e();
	}
}, tu = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M278.9%20511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2%208.7c1.8-6.4%208.5-10%2014.9-8.2l61%2017.7c6.4%201.8%2010%208.5%208.2%2014.9L293.8%20503.3c-1.9%206.4-8.5%2010.1-14.9%208.2zm-114-112.2l43.5-46.4c4.6-4.9%204.3-12.7-.8-17.2L117%20256l90.6-79.7c5.1-4.5%205.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8%20247.2c-5.1%204.7-5.1%2012.8%200%2017.5l144.1%20135.1c4.9%204.6%2012.5%204.4%2017-.5zm327.2.6l144.1-135.1c5.1-4.7%205.1-12.8%200-17.5L492.1%20112.1c-4.8-4.5-12.4-4.3-17%20.5L431.6%20159c-4.6%204.9-4.3%2012.7.8%2017.2L523%20256l-90.6%2079.7c-5.1%204.5-5.5%2012.3-.8%2017.2l43.5%2046.4c4.5%204.9%2012.1%205.1%2017%20.6z'/%3e%3c/svg%3e", nu = Mr(({ block: e }) => /* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)(Ir, {
	block: e,
	keys: ["label", "helpText"]
}), /* @__PURE__ */ (0, X.jsx)(Lr, {
	block: e,
	children: /* @__PURE__ */ (0, X.jsx)("textarea", {
		"data-property-name": "text",
		className: "mt-be-input mt-be-input--full-width",
		"data-mt-block-editor-focus-default": !0
	})
})] })), ru = class e extends Un {
	static typeId = "core-html";
	static selectable = !0;
	static icon = tu;
	static get label() {
		return G("HTML");
	}
	text = "";
	constructor(e) {
		super(), e && Object.assign(this, e);
	}
	editor({ focus: e, focusBlock: t }) {
		return e || t ? /* @__PURE__ */ (0, X.jsx)(nu, { block: this }, this.id) : /* @__PURE__ */ (0, X.jsx)(Zc, { block: this }, this.id);
	}
	html() {
		return this.text;
	}
	static async newFromHtml({ html: t, meta: n }) {
		return new e(Object.assign({ text: t }, n));
	}
};
xl.registerType(Ai), xl.registerType(Vl), xl.registerType(Gl), xl.registerType(Zl), xl.registerType(eu), xl.registerType(ru), xl.registerType(Ic), xl.registerType(nl);
//#endregion
//#region src/img/copy.svg
var iu = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.2,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='レイヤー_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%2024%2024'%20style='enable-background:new%200%200%2024%2024;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:none;stroke:%23666666;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}%20%3c/style%3e%3cdesc%3eDownload%20more%20icon%20variants%20from%20https://tabler-icons.io/i/clipboard%3c/desc%3e%3cpath%20class='st0'%20d='M20.2,13.7h-6'/%3e%3cpath%20class='st0'%20d='M16.7,16.2l-2.5-2.5l2.5-2.5'/%3e%3cpath%20class='st0'%20d='M19.1,9'/%3e%3cpath%20class='st0'%20d='M19,8.3V7c0-1.1-0.9-2-2-2h-2'/%3e%3cpath%20class='st0'%20d='M19,8.3'/%3e%3cpath%20class='st0'%20d='M9,5H7C5.9,5,5,5.9,5,7v12c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2'/%3e%3cpath%20class='st0'%20d='M11,3h2c1.1,0,2,0.9,2,2l0,0c0,1.1-0.9,2-2,2h-2C9.9,7,9,6.1,9,5l0,0C9,3.9,9.9,3,11,3z'/%3e%3c/svg%3e", au = "MTRichTextEditor" in globalThis ? vi : Hr, ou = () => {
	let e = window.getSelection();
	if (e && (!e.isCollapsed || e.toString() !== "")) return !0;
	let t = document.activeElement;
	return (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) && t.selectionStart !== t.selectionEnd;
}, su = () => typeof navigator.clipboard?.write == "function" || typeof navigator.clipboard?.writeText == "function", cu = {
	get label() {
		return G("Copy");
	},
	icon: iu,
	shortcut: "cmd+c",
	command: "core-copyBlock",
	condition: su,
	callback: async ({ blocks: e, editorContext: { editor: t }, event: n }) => {
		if (!su() || ou() || e.length === 0) return;
		if (n.preventDefault(), e.length === 1) {
			let t = e[0];
			if (t.wrapperRef.current?.classList.add("mt-be-focus"), setTimeout(() => {
				t.wrapperRef.current?.classList.remove("mt-be-focus");
			}, 100), t instanceof Ai || t instanceof Zl) {
				let e = "mtRichTextEditor" in t ? t.mtRichTextEditor : t.tinymce;
				e && au(e, null);
			}
		}
		let r = (await Promise.all(e.map((e) => e.toClipboardItem({ editor: t })))).reduce((e, t) => {
			if (t instanceof Array ? e ||= [] : e ||= "", e instanceof Array && t instanceof Array) return e.concat(t);
			if (typeof e == "string" && typeof t == "string") return e + t;
		}, void 0);
		if (typeof r == "string" && typeof ClipboardItem == "function") {
			let e = new Blob([r], { type: "text/html" }), t = new Blob([r], { type: "text/plain" });
			r = [new ClipboardItem({
				"text/html": e,
				"text/plain": t
			})];
		}
		r instanceof Array ? navigator.clipboard.write(r) : typeof r == "string" && navigator.clipboard.writeText(r);
	}
};
qr.registerCommand(cu), qr.registerCommand(Zr), qr.registerCommand({
	get label() {
		return G("Duplicate");
	},
	icon: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20class='icon%20icon-tabler%20icon-tabler-copy'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20stroke-width='2'%20stroke='%23666'%20fill='none'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cdesc%3eDownload%20more%20icon%20variants%20from%20https://tabler-icons.io/i/copy%3c/desc%3e%3cpath%20stroke='none'%20d='M0%200h24v24H0z'%20fill='none'/%3e%3crect%20x='8'%20y='8'%20width='12'%20height='12'%20rx='2'%20/%3e%3cpath%20d='M16%208v-2a2%202%200%200%200%20-2%20-2h-8a2%202%200%200%200%20-2%202v8a2%202%200%200%200%202%202h2'%20/%3e%3c/svg%3e",
	shortcut: "cmd+d",
	command: "core-duplicateBlock",
	callback: async ({ blocks: e, editorContext: { editor: t, setFocusedIds: n }, blocksContext: { addBlock: r }, event: i }) => {
		if (e.length === 0) return;
		i?.preventDefault();
		let a = await al(rl((await Promise.all(e.map((e) => e.serialize({
			editor: t,
			external: !0
		})))).join("")), t.factory, new _l());
		t.editManager.beginGrouping();
		for (let t of a.reverse()) r(t, e[e.length - 1]);
		t.editManager.endGrouping(), n([a[0].id]), t.render();
	}
}), qr.registerCommand({
	get label() {
		return G("Delete");
	},
	icon: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2050%2050'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M8.3%2043.1c0%202.3%201.9%204.2%204.2%204.2h25.1c2.3%200%204.2-1.9%204.2-4.2V13.9H8.3v29.2zM32%2020.8c0-.8.6-1.4%201.4-1.4s1.4.6%201.4%201.4v19.5c0%20.8-.6%201.4-1.4%201.4s-1.4-.6-1.4-1.4V20.8zm-8.4%200c0-.8.6-1.4%201.4-1.4s1.4.6%201.4%201.4v19.5c0%20.8-.6%201.4-1.4%201.4s-1.4-.6-1.4-1.4V20.8zm-8.4%200c0-.8.6-1.4%201.4-1.4.8%200%201.4.6%201.4%201.4v19.5c0%20.8-.6%201.4-1.4%201.4-.8%200-1.4-.6-1.4-1.4V20.8zM43.1%205.5H32.7l-.8-1.6c-.4-.7-1.1-1.2-1.9-1.2H20c-.8%200-1.5.4-1.9%201.2l-.8%201.6H6.9c-.8%200-1.4.6-1.4%201.4v2.8c0%20.8.6%201.4%201.4%201.4h36.2c.8%200%201.4-.6%201.4-1.4V6.9c0-.8-.6-1.4-1.4-1.4z'/%3e%3c/svg%3e",
	command: "core-deleteBlock",
	callback: ({ blocks: e, editorContext: { editor: t }, event: n }) => {
		n.preventDefault(), !(We() && !window.confirm(G("Are you sure you want to remove the block?"))) && (t.editManager.beginGrouping(), e.forEach((e) => t.removeBlock(t, e)), t.editManager.endGrouping(), t.render());
	}
}), qr.registerCommand({
	shortcut: "cmd+k",
	command: "core-insertLink",
	callback: ({ blocks: e, editorContext: { editor: { commandManager: t } }, event: n }) => {
		n?.preventDefault(), t.emit(e, "core-insertLink");
	}
});
//#endregion
//#region src/Editor.ts
var lu = /* @__PURE__ */ function(e) {
	return e[e.url = 0] = "url", e[e.css = 1] = "css", e;
}({}), uu = class e extends Fe.default {
	id;
	opts;
	factory;
	editManager;
	commandManager;
	blocks = [];
	stylesheets = [];
	editorElement;
	root = null;
	inputElement;
	metadataMap = /* @__PURE__ */ new Map();
	metadataMapSequence = 1;
	keyboardShortcutCache = {};
	initialized = !1;
	constructor(e) {
		if (super(), this.id = e.id, this.opts = e, e.block = e.block || {}, e.i18n = e.i18n || {}, e.addButtons = e.addButtons || { bottom: !0 }, e.rootClassName = e.rootClassName || "", e.rootAttributes = e.rootAttributes || {}, this.factory = new xl(), this.editManager = new wl(Object.assign({ editor: this }, e.editManager || {})), this.commandManager = new qr({ editor: this }), this.inputElement = gn(this.id), this.inputElement.style.display = "none", !this.inputElement.parentNode) throw "error";
		this.editorElement = document.createElement("div"), this.editorElement.setAttribute("data-mt-be-id", this.id), this.editorElement.classList.add("mt-block-editor"), this.inputElement.parentNode.insertBefore(this.editorElement, this.inputElement), this.initDefaultEventHandlers(), setTimeout(async () => {
			this.keyboardShortcutCache = await this.buildKeyboardShortcutCache(), this.stylesheets = await Promise.all(this.buildStylesheets());
			let e = await al(rl(this.inputElement.value), this.factory, new _l());
			this.blocks = e, this.emit("initializeBlocks", {
				editor: this,
				blocks: e
			}), this.initialized = !0, this.render();
		}, 0);
	}
	initDefaultEventHandlers() {
		this.on("beforeRenderIframePreview", Ol);
	}
	selectableTypes(e) {
		let t = this.factory.selectableTypes();
		return e.map((e) => t.find((t) => t.typeId === e)).filter((e) => e);
	}
	panelTypes() {
		return this.opts.panelBlockTypes ? this.selectableTypes(this.opts.panelBlockTypes) : this.factory.selectableTypes();
	}
	shortcutTypes() {
		return this.opts.shortcutBlockTypes ? this.selectableTypes(this.opts.shortcutBlockTypes) : [];
	}
	async buildKeyboardShortcutCache() {
		let e = {};
		for (let t of await this.commandManager.commands()) t.shortcut && (e[t.shortcut] = t);
		return e;
	}
	keyboardShortcutMap() {
		return this.keyboardShortcutCache;
	}
	addBlock(t, n, r) {
		let i = t.blocks;
		i.splice(r, 0, n), this.editManager.add({
			block: n,
			data: {
				parent: t instanceof e ? null : t,
				index: r
			},
			handlers: Tl
		}), this.emit("changeBlocks", {
			editor: this,
			blocks: i
		});
	}
	mergeBlock(e, t) {
		let n = e.blocks, r = n.indexOf(t);
		if (r === -1) return !1;
		let i = n[r - 1];
		return !i || !i.canMerge(t) ? !1 : (this.editManager.beginGrouping(), this.editManager.add(i.merge(t)), this.removeBlock(e, t), this.editManager.endGrouping(), !0);
	}
	removeBlock(t, n) {
		let r = t.blocks;
		this.emit("removeBlock", {
			editor: this,
			blocks: r,
			block: n
		});
		let i = r.indexOf(n);
		i !== -1 && (r.splice(i, 1), this.render(), this.editManager.add({
			block: n,
			data: {
				parent: t instanceof e ? null : t,
				index: i
			},
			handlers: El
		}), this.emit("changeBlocks", {
			editor: this,
			blocks: r
		}));
	}
	swapBlocks(t, n, r) {
		let i = t.blocks;
		[i[n], i[r]] = [i[r], i[n]], this.render(), this.editManager.add({
			block: i[n],
			data: {
				parent: t instanceof e ? null : t,
				a: n,
				b: r
			},
			handlers: Dl
		}), this.emit("changeBlocks", {
			editor: this,
			blocks: i
		});
	}
	async serialize() {
		if (!this.initialized) return;
		let e = this.blocks.concat();
		this.emit("serialize", {
			editor: this,
			blocks: e
		});
		let t = await Promise.all(e.map((e) => e.serialize({
			editor: this,
			external: !1
		}))), n = {};
		this.metadataMap.forEach(({ id: e }, t) => {
			n[e] = JSON.parse(t);
		}), this.inputElement.value = (this.metadataMap.size > 0 ? `<!-- mt-beb t="core-context" m='${Tn(JSON.stringify(n))}' --><!-- /mt-beb -->` : "") + t.join("");
	}
	getMetadataMapIndexes(e, t) {
		let n = {};
		t.forEach((e) => {
			n[e] = this.metadataMap.get(e);
		});
		let r = [];
		for (let [t, i] of this.metadataMap) n[t] || i.blockIds.has(e) && (i.blockIds.size === 1 ? (this.metadataMap.delete(t), r.push(i.id)) : i.blockIds.delete(e));
		for (let t of Object.keys(n)) {
			let i = n[t] ||= {
				id: r.shift() || (this.metadataMapSequence++).toString(36),
				blockIds: /* @__PURE__ */ new Set()
			};
			i.blockIds.add(e), this.metadataMap.has(t) || this.metadataMap.set(t, i);
		}
		return Object.values(n).filter((e) => !!e).map((e) => e.id);
	}
	serializeMeta(e, t) {
		let n = e.metadata();
		if (!n) return null;
		if (t) return JSON.stringify(n);
		let r = {};
		Hn.concat(e.keysForSetup()).forEach((e) => {
			e in n && (r[e] = n[e], Reflect.deleteProperty(n, e));
		});
		let i = [r, n].map((e) => Object.keys(e).length > 0 ? JSON.stringify(e) : null).filter((e) => !!e);
		return this.getMetadataMapIndexes(e.id, i).join(",");
	}
	unload() {
		this.emit("beforeUnload", { editor: this }), this.editManager.unload(), this.root &&= (this.root.unmount(), null), this.editorElement.remove(), this.inputElement.style.display = "", this.emit("unload", { editor: this });
	}
	render() {
		this.root ||= (0, Ie.createRoot)(this.editorElement), this.root.render(K.createElement(bl, { editor: this }));
	}
	buildStylesheets() {
		return [{
			type: 1,
			data: Le + Re
		}, ...this.opts.stylesheets.filter((e) => e).map(async (e) => /^blob:/.test(e) ? {
			type: 1,
			data: await (await fetch(e)).text()
		} : /^https?:/.test(e) ? {
			type: 0,
			data: e
		} : {
			type: 1,
			data: e
		})];
	}
}, du = class e {
	static _instance;
	editors;
	static instance() {
		return this._instance = this._instance || new e(), this._instance;
	}
	constructor() {
		this.editors = [];
	}
	add(e) {
		this.editors.push(e);
	}
	get(e) {
		return this.editors.find((t) => t.id === e);
	}
	async remove(e) {
		let t = this.get(e);
		if (!t) return;
		await t.serialize(), t.unload();
		let n = this.editors.indexOf(t);
		n !== -1 && this.editors.splice(n, 1);
	}
}, fu = /* @__PURE__ */ s({ useCommands: () => Jr }), pu = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cstyle%3e.st0{fill:%23666}%3c/style%3e%3cpath%20class='st0'%20d='M497.9%20142.1l-46.1%2046.1c-4.7%204.7-12.3%204.7-17%200l-111-111c-4.7-4.7-4.7-12.3%200-17l46.1-46.1c18.7-18.7%2049.1-18.7%2067.9%200l60.1%2060.1c18.8%2018.7%2018.8%2049.1%200%2067.9zM284.2%2099.8L21.6%20362.4.4%20483.9c-2.9%2016.4%2011.4%2030.6%2027.8%2027.8l121.5-21.3%20262.6-262.6c4.7-4.7%204.7-12.3%200-17l-111-111c-4.8-4.7-12.4-4.7-17.1%200zM124.1%20339.9c-5.5-5.5-5.5-14.3%200-19.8l154-154c5.5-5.5%2014.3-5.5%2019.8%200s5.5%2014.3%200%2019.8l-154%20154c-5.5%205.5-14.3%205.5-19.8%200zM88%20424h48v36.3l-64.5%2011.3-31.1-31.1L51.7%20376H88v48z'/%3e%3c/svg%3e", mu = /* @__PURE__ */ s({
	edit: () => pu,
	link: () => Al
}), hu = class {
	static version = u.version;
	static i18n = Ce;
	static Component = {
		BlockIframePreview: Zc,
		BlockToolbar: Dr,
		BlockToolbarButton: jc,
		BlockConfigPanel: Nc,
		BlockSetup: Pr,
		BlockSetupCommon: Ir,
		BlockLabel: Lr,
		EditorMode: Zn,
		Dialog: Fl,
		DialogHeader: Il,
		DialogBody: Ll,
		DialogFooter: Rl
	};
	static decorator = Nr;
	static React = K.default;
	static jsxRuntime = X;
	static Block = Un;
	static Context = Wn;
	static Hook = fu;
	static icon = mu;
	static util = vl;
	static #e = {};
	static on(e, t) {
		this.#e[e] || (this.#e[e] = []), this.#e[e].push(t);
	}
	static emit(e, ...t) {
		(this.#e[e] || []).forEach((e) => e(...t));
	}
	static async apply(e) {
		await Te(e.i18n || {});
		let t = du.instance();
		this.emit("create", e);
		let n = new uu(e);
		return this.emit("init", n), t.add(n), n;
	}
	static get({ id: e }) {
		return du.instance().get(e);
	}
	static async unload({ id: e }) {
		await du.instance().remove(e);
	}
	static async serialize() {
		let e = du.instance();
		await Promise.all(e.editors.map((e) => e.serialize()));
	}
	static registerBlockType(e) {
		xl.registerType(e);
	}
	static deregisterBlockType(e) {
		xl.deregisterType(e);
	}
	static createBoilerplateBlock({ typeId: e, className: t, rootBlock: n, label: r, icon: i, iconString: a, html: o, canRemoveBlock: s, panelBlockTypes: c, shortcutBlockTypes: l, shouldBeCompiled: u, showPreview: d, previewHeader: f }) {
		let p = function(e) {
			let t = { _html: o };
			return s !== void 0 && (t.canRemoveBlock = !!s), c && (t.panelBlockTypes = c), l && (t.shortcutBlockTypes = l), f !== void 0 && (t.previewHeader = f), Reflect.construct(nl, [Object.assign(t, e || {})], p);
		};
		return p.prototype = Object.create(nl.prototype), p.prototype.constructor = p, p.typeId = e, p.className = t, p.label = r, n !== void 0 && (p.rootBlock = n), i && (p.icon = i), a && (p.iconString = a), p.selectable = !0, u !== void 0 && (p.shouldBeCompiled = u), d !== void 0 && (p.showPreview = d), Object.setPrototypeOf(p, nl), p;
	}
	static isSupportedEnvironment() {
		return !/Trident|MSIE|Edge/.test(window.navigator.userAgent);
	}
};
window.MTBlockEditor = hu;
//#endregion
export { hu as EditorUtil };

//# sourceMappingURL=mt-block-editor.js.map