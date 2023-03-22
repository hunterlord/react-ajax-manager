"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.METHOD = void 0;
exports.createAction = createAction;
exports.createAjaxStatus = createAjaxStatus;
exports.createBasicAjaxState = createBasicAjaxState;
exports.createInstance = createInstance;
exports.createReducerList = createReducerList;
exports["default"] = void 0;
exports.getCurrentState = _getCurrentState;
exports.makeActions = exports.makeAction = void 0;

var _immutable = require("immutable");

var _axios = _interopRequireDefault(require("axios"));

var _excluded = ["name", "path"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function createAction(type) {
  return function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      type: type,
      payload: payload
    };
  };
}

var makeAction = function makeAction(type) {
  return function (value) {
    return function (dispatch) {
      return dispatch(createAction(type)(value));
    };
  };
};

exports.makeAction = makeAction;

var makeActions = function makeActions(data) {
  var res = {};
  Object.keys(data).forEach(function (key) {
    res[key] = createAction(data[key]);
  });
  return res;
};

exports.makeActions = makeActions;

function createReducerList(managerObjects) {
  var reducers = {};
  Object.keys(managerObjects).forEach(function (key) {
    return reducers[key] = managerObjects[key].reducer;
  });
  return reducers;
}

function createBasicAjaxState() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return (0, _immutable.Map)({
    onFetch: false,
    error: false,
    message: '',
    data: data,
    headers: {},
    status: null,
    canceled: false,
    tokenSource: null,
    loaded: false,
    params: {}
  });
}

function createAjaxStatus(typeName) {
  var name = typeName.toLocaleUpperCase();
  return {
    REQUEST: "API ".concat(name, " REQUEST"),
    SUCCESS: "API ".concat(name, " SUCCESS"),
    FAILURE: "API ".concat(name, " FAILURE"),
    ERROR: "API ".concat(name, " ERROR"),
    CANCELED: "API ".concat(name, " CANCELED"),
    LOADED: "API ".concat(name, " LOADED"),
    RESET: "API ".concat(name, " RESET")
  };
}

function createInstance(config) {
  return _axios["default"].create(config || {
    timeout: 1000
  });
}

var METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'get',
  DELETE: 'delete'
};
exports.METHOD = METHOD;

function capitalize(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function capPathname(t) {
  return t.split('_').map(function (x, i) {
    return i > 0 ? capitalize(x) : x;
  }).join('');
}

function _getCurrentState() {
  var getState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return {};
  };
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (/^\^/.test(path)) {
    var _path$match = path.match(/\^(.*)\.(.*)$/),
        _path$match2 = _slicedToArray(_path$match, 3),
        path1 = _path$match2[1],
        path2 = _path$match2[2];

    return getState()[path1][path2];
  }

  return path.split('.').reduce(function (p, n) {
    return p[capPathname(n)];
  }, getState());
}

var AjaxManager = /*#__PURE__*/function () {
  function AjaxManager(config) {
    _classCallCheck(this, AjaxManager);

    _defineProperty(this, "instance", null);

    _defineProperty(this, "stop", false);

    _defineProperty(this, "requests", []);

    _defineProperty(this, "events", {});

    _defineProperty(this, "checks", {});

    _defineProperty(this, "processes", {});

    this.instance = createInstance(config);
  }

  _createClass(AjaxManager, [{
    key: "getInstance",
    value: function getInstance() {
      return this.instance;
    }
  }, {
    key: "setStop",
    value: function setStop(value) {
      this.stop = value;

      if (value === true) {
        this.requests.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              action = _ref2[1];

          return action();
        });
      }
    }
  }, {
    key: "getStop",
    value: function getStop() {
      return this.stop;
    }
  }, {
    key: "setEvents",
    value: function setEvents(events) {
      this.events = events;
    }
  }, {
    key: "getEvents",
    value: function getEvents() {
      return this.events;
    }
  }, {
    key: "setChecks",
    value: function setChecks(checks) {
      this.checks = checks;
    }
  }, {
    key: "getChecks",
    value: function getChecks() {
      return this.checks;
    }
  }, {
    key: "setProcesses",
    value: function setProcesses(processes) {
      this.processes = processes;
    }
  }, {
    key: "getProcesses",
    value: function getProcesses() {
      return this.processes;
    }
  }, {
    key: "updateRequests",
    value: function updateRequests(r) {
      this.requests = this.requests.filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            x = _ref4[0];

        return x !== r;
      });
    }
  }, {
    key: "addToRequests",
    value: function addToRequests(r, action) {
      this.requests.push([r, action]);
    }
  }, {
    key: "getCurrentState",
    value: function getCurrentState(getState) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return function () {
        return _getCurrentState(getState, path);
      };
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      var createConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _createConfig$axiosCo = createConfig.axiosConfig,
          axiosConfig = _createConfig$axiosCo === void 0 ? {} : _createConfig$axiosCo,
          _createConfig$name = createConfig.name,
          name = _createConfig$name === void 0 ? '' : _createConfig$name,
          _createConfig$path = createConfig.path,
          path = _createConfig$path === void 0 ? '' : _createConfig$path,
          _createConfig$default = createConfig.defaultData,
          defaultData = _createConfig$default === void 0 ? null : _createConfig$default,
          _createConfig$transfo = createConfig.transform,
          transform = _createConfig$transfo === void 0 ? {} : _createConfig$transfo,
          _createConfig$check = createConfig.check,
          check = _createConfig$check === void 0 ? {} : _createConfig$check,
          _createConfig$process = createConfig.process,
          process = _createConfig$process === void 0 ? {} : _createConfig$process,
          _createConfig$resetOn = createConfig.resetOnRequest,
          resetOnRequest = _createConfig$resetOn === void 0 ? true : _createConfig$resetOn,
          _createConfig$events = createConfig.events,
          events = _createConfig$events === void 0 ? {} : _createConfig$events;

      var _Object$assign = Object.assign({}, this.getEvents(), events),
          beforeRequest = _Object$assign.beforeRequest,
          onError = _Object$assign.onError,
          onFinal = _Object$assign.onFinal;

      if (!name) throw new Error('config.name is not set');
      if (!path) throw new Error('config.path is not set');
      var defaultState = createBasicAjaxState(defaultData);
      var ajaxStatus = createAjaxStatus(name);

      var config = _objectSpread({}, axiosConfig);

      var REQUEST = ajaxStatus.REQUEST,
          SUCCESS = ajaxStatus.SUCCESS,
          FAILURE = ajaxStatus.FAILURE,
          ERROR = ajaxStatus.ERROR,
          LOADED = ajaxStatus.LOADED,
          CANCELED = ajaxStatus.CANCELED,
          RESET = ajaxStatus.RESET;
      var actions = {
        request: function request(params) {
          return /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dispatch, getState) {
              var currentState, curState, cancelTokenSource, method, methodDataKey, r;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!_this.getStop()) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt("return");

                    case 2:
                      currentState = _this.getCurrentState(getState, path);
                      curState = currentState();

                      if (!(curState.get('onFetch') && curState.get('tokenSource'))) {
                        _context.next = 7;
                        break;
                      }

                      _context.next = 7;
                      return dispatch(actions.cancel());

                    case 7:
                      cancelTokenSource = _axios["default"].CancelToken.source();
                      dispatch(createAction(REQUEST)({
                        cancelTokenSource: cancelTokenSource,
                        params: params
                      }));
                      config.cancelToken = cancelTokenSource.token; // config transform

                      if (transform.url) {
                        config.url = transform.url(config.url, params, getState);
                      }

                      method = config.method || METHOD.GET;
                      methodDataKey = method === METHOD.GET ? 'params' : 'data';
                      config.method = method;
                      config[methodDataKey] = params;
                      if (!config.data) config.data = {};
                      if (beforeRequest) beforeRequest(dispatch, currentState, getState);
                      r = _this.instance(config).then(function (response) {
                        var isFailure = false;
                        var checkFailure = check.failure || _this.checks.failure;

                        if (checkFailure) {
                          isFailure = checkFailure(response);
                        }

                        if (isFailure) {
                          var processFailure = process.failure || _this.processes.failure || function (x) {
                            return x;
                          };

                          dispatch(createAction(FAILURE)(processFailure(response, dispatch)));
                        } else {
                          var processSuccess = process.success || _this.processes.success || function (x) {
                            return x;
                          };

                          dispatch(createAction(SUCCESS)(processSuccess(response, dispatch)));
                        }
                      })["catch"](function (e) {
                        if (!_axios["default"].isCancel(e)) {
                          var processError = process.error || _this.processes.error || function (x) {
                            return x;
                          };

                          dispatch(createAction(ERROR)(processError(e, dispatch)));
                          if (onError) onError(dispatch, currentState, getState);
                        }
                      })["finally"](function () {
                        if (onFinal) onFinal(dispatch, currentState, getState);

                        _this.updateRequests(r);

                        dispatch(createAction(LOADED)());
                      });

                      _this.addToRequests(r, function () {
                        return dispatch(createAction(CANCELED)());
                      });

                      return _context.abrupt("return", r);

                    case 20:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x, _x2) {
              return _ref5.apply(this, arguments);
            };
          }();
        },
        cancel: function cancel() {
          return /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dispatch, getState) {
              var currentState, curState;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      currentState = _this.getCurrentState(getState, path);
                      curState = currentState();

                      if (!curState.get('tokenSource')) {
                        _context2.next = 5;
                        break;
                      }

                      _context2.next = 5;
                      return curState.get('tokenSource').cancel('');

                    case 5:
                      dispatch(createAction(CANCELED)());

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            return function (_x3, _x4) {
              return _ref6.apply(this, arguments);
            };
          }();
        },
        reset: function reset() {
          return function (dispatch, getState) {
            var currentState = _this.getCurrentState(getState, path);

            var curState = currentState();

            if (curState.get('onFetch') && curState.get('tokenSource')) {
              dispatch(actions.cancel());
            }

            dispatch(createAction(RESET)());
          };
        }
      };

      var reducer = function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
        var action = arguments.length > 1 ? arguments[1] : undefined;
        var type = action.type,
            payload = action.payload;

        switch (type) {
          case REQUEST:
            {
              var newState = defaultState.set('onFetch', true);
              if (!resetOnRequest) newState = newState.set('data', state.get('data'));
              var cancelTokenSource = payload.cancelTokenSource,
                  params = payload.params;
              return newState.set('tokenSource', cancelTokenSource).set('params', params);
            }
            break;

          case SUCCESS:
            {
              return state.set('onFetch', false).set('data', payload.data).set('status', payload.status).set('headers', payload.headers);
            }
            break;

          case FAILURE:
            {
              var _payload$data;

              return state.set('error', true).set('onFetch', false).set('message', (_payload$data = payload.data) === null || _payload$data === void 0 ? void 0 : _payload$data.message).set('data', payload.data).set('status', payload.status).set('headers', payload.headers);
            }
            break;

          case ERROR:
            {
              var _payload$data2, _payload$response, _payload$response2;

              return state.set('error', true).set('onFetch', false).set('message', payload === null || payload === void 0 ? void 0 : (_payload$data2 = payload.data) === null || _payload$data2 === void 0 ? void 0 : _payload$data2.message).set('data', (payload === null || payload === void 0 ? void 0 : payload.data) || payload).set('headers', payload === null || payload === void 0 ? void 0 : (_payload$response = payload.response) === null || _payload$response === void 0 ? void 0 : _payload$response.headers).set('status', payload === null || payload === void 0 ? void 0 : (_payload$response2 = payload.response) === null || _payload$response2 === void 0 ? void 0 : _payload$response2.status);
            }
            break;

          case LOADED:
            {
              return state.set('loaded', true);
            }
            break;

          case CANCELED:
            {
              return state.set('onFetch', false).set('tokenSource', null).set('canceled', true);
            }
            break;

          case RESET:
            {
              return defaultState;
            }

          default:
            return state;
        }
      };

      return {
        actions: actions,
        reducer: reducer,
        types: ajaxStatus
      };
    }
  }, {
    key: "dynamic",
    value: function dynamic(id, store) {
      var _this2 = this;

      return function (params) {
        var name = params.name,
            path = params.path,
            data = _objectWithoutProperties(params, _excluded);

        var xpath = ["^".concat(path), id].join('.');
        var xname = [name, id].join(' ');

        var created = _this2.create(_objectSpread(_objectSpread({}, data), {}, {
          name: xname,
          path: xpath
        }));

        store.injectReducer(path, _defineProperty({}, "".concat(id), created.reducer));
        return _objectSpread(_objectSpread({}, created), {}, {
          path: path
        });
      };
    }
  }]);

  return AjaxManager;
}();

var _default = AjaxManager;
exports["default"] = _default;
