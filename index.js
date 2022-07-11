"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.METHOD = void 0;
exports.createAction = createAction;
exports.createAjaxStatus = createAjaxStatus;
exports.createBasicAjaxState = createBasicAjaxState;
exports.createInstance = createInstance;
exports.createReducerList = createReducerList;
exports.default = void 0;
exports.getCurrentState = getCurrentState;
exports.makeActions = exports.makeAction = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

var _immutable = require("immutable");

var _axios = _interopRequireDefault(require("axios"));

const _excluded = ["name", "path"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAction(type) {
  return function () {
    let payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      type,
      payload
    };
  };
}

const makeAction = type => value => dispatch => dispatch(createAction(type)(value));

exports.makeAction = makeAction;

const makeActions = data => {
  const res = {};
  Object.keys(data).forEach(key => {
    res[key] = createAction(data[key]);
  });
  return res;
};

exports.makeActions = makeActions;

function createReducerList(managerObjects) {
  const reducers = {};
  Object.keys(managerObjects).forEach(key => reducers[key] = managerObjects[key].reducer);
  return reducers;
}

function createBasicAjaxState() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return (0, _immutable.Map)({
    onFetch: false,
    error: false,
    message: '',
    data,
    headers: {},
    status: null,
    canceled: false,
    tokenSource: null,
    loaded: false,
    params: {}
  });
}

function createAjaxStatus(typeName) {
  const name = typeName.toLocaleUpperCase();
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
  return _axios.default.create(config || {
    timeout: 1000
  });
}

const METHOD = {
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
  return t.split('_').map((x, i) => i > 0 ? capitalize(x) : x).join('');
}

function getCurrentState() {
  let getState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => ({});
  let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (/^\^/.test(path)) {
    const [, path1, path2] = path.match(/\^(.*)\.(.*)$/);
    return getState()[path1][path2];
  }

  return path.split('.').reduce((p, n) => p[capPathname(n)], getState());
}

class AjaxManager {
  constructor(config) {
    _defineProperty(this, "instance", null);

    _defineProperty(this, "stop", false);

    _defineProperty(this, "requests", []);

    _defineProperty(this, "events", {});

    _defineProperty(this, "checks", {});

    _defineProperty(this, "processes", {});

    this.instance = createInstance(config);
  }

  getInstance() {
    return this.instance;
  }

  setStop(value) {
    this.stop = value;

    if (value === true) {
      this.requests.forEach(_ref => {
        let [, action] = _ref;
        return action();
      });
    }
  }

  getStop() {
    return this.stop;
  }

  setEvents(events) {
    this.events = events;
  }

  getEvents() {
    return this.events;
  }

  setChecks(checks) {
    this.checks = checks;
  }

  getChecks() {
    return this.checks;
  }

  setProcesses(processes) {
    this.processes = processes;
  }

  getProcesses() {
    return this.processes;
  }

  updateRequests(r) {
    this.requests = this.requests.filter(_ref2 => {
      let [x] = _ref2;
      return x !== r;
    });
  }

  addToRequests(r, action) {
    this.requests.push([r, action]);
  }

  getCurrentState(getState) {
    let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return () => getCurrentState(getState, path);
  }

  create() {
    let createConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      axiosConfig = {},
      name = '',
      path = '',
      defaultData = null,
      transform = {},
      check = {},
      process = {},
      resetOnRquest = true,
      events = {}
    } = createConfig;
    const {
      onFinal
    } = Object.assign({}, this.getEvents(), events);
    if (!name) throw new Error('config.name is not set');
    if (!path) throw new Error('config.path is not set');
    const defaultState = createBasicAjaxState(defaultData);
    const ajaxStatus = createAjaxStatus(name);

    const config = _objectSpread({}, axiosConfig);

    const {
      REQUEST,
      SUCCESS,
      FAILURE,
      ERROR,
      LOADED,
      CANCELED,
      RESET
    } = ajaxStatus;
    const actions = {
      request: params => async (dispatch, getState) => {
        if (this.getStop()) return;
        const currentState = this.getCurrentState(getState, path);
        const curState = currentState();

        if (curState.get('onFetch') && curState.get('tokenSource')) {
          await dispatch(actions.cancel());
        }

        const cancelTokenSource = _axios.default.CancelToken.source();

        dispatch(createAction(REQUEST)({
          cancelTokenSource,
          params
        }));
        config.cancelToken = cancelTokenSource.token; // config transform

        if (transform.url) {
          config.url = transform.url(config.url, params, getState);
        }

        const method = config.method || METHOD.GET;
        const methodDataKey = method === METHOD.GET ? 'params' : 'data';
        config.method = method;
        config[methodDataKey] = params;
        if (!config.data) config.data = {};
        const r = this.instance(config).then(response => {
          let isFailure = false;
          const checkFailure = check.failure || this.checks.failure;

          if (checkFailure) {
            isFailure = checkFailure(response);
          }

          if (isFailure) {
            const processFailure = process.failure || this.processes.failure || (x => x);

            dispatch(createAction(FAILURE)(processFailure(response, dispatch)));
          } else {
            const processSuccess = process.success || this.processes.success || (x => x);

            dispatch(createAction(SUCCESS)(processSuccess(response, dispatch)));
          }
        }).catch(e => {
          if (!_axios.default.isCancel(e)) {
            const processError = process.error || this.processes.error || (x => x);

            dispatch(createAction(ERROR)(processError(e, dispatch)));
          }
        }).finally(() => {
          if (onFinal) onFinal(dispatch, currentState, getState);
          this.updateRequests(r);
          dispatch(createAction(LOADED)());
        });
        this.addToRequests(r, () => dispatch(createAction(CANCELED)()));
        return r;
      },
      cancel: () => async (dispatch, getState) => {
        const currentState = this.getCurrentState(getState, path);
        const curState = currentState();

        if (curState.get('tokenSource')) {
          await curState.get('tokenSource').cancel('');
        }

        dispatch(createAction(CANCELED)());
      },
      reset: () => (dispatch, getState) => {
        const currentState = this.getCurrentState(getState, path);
        const curState = currentState();

        if (curState.get('onFetch') && curState.get('tokenSource')) {
          dispatch(actions.cancel());
        }

        dispatch(createAction(RESET)());
      }
    };

    const reducer = function reducer() {
      let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
      let action = arguments.length > 1 ? arguments[1] : undefined;
      const {
        type,
        payload
      } = action;

      switch (type) {
        case REQUEST:
          {
            let newState = defaultState.set('onFetch', true);
            if (!resetOnRquest) newState = newState.set('data', state.get('data'));
            const {
              cancelTokenSource,
              params
            } = payload;
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
      actions,
      reducer,
      types: ajaxStatus
    };
  }

  dynamic(id, store) {
    return params => {
      const {
        name,
        path
      } = params,
            data = _objectWithoutProperties(params, _excluded);

      const xpath = ["^".concat(path), id].join('.');
      const xname = [name, id].join(' ');
      const created = this.create(_objectSpread(_objectSpread({}, data), {}, {
        name: xname,
        path: xpath
      }));
      store.injectReducer(path, {
        ["".concat(id)]: created.reducer
      });
      return _objectSpread(_objectSpread({}, created), {}, {
        path
      });
    };
  }

}

var _default = AjaxManager;
exports.default = _default;
