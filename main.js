import { Map } from 'immutable';
import axios from 'axios';

function createAction(type) {
  return (payload = {}) => ({
    type,
    payload,
  });
}

const makeAction = (type) => (value) => (dispatch) => dispatch(createAction(type)(value));

const makeActions = (data) => {
  const res = {};
  Object.keys(data).forEach((key) => {
    res[key] = createAction(data[key]);
  });
  return res;
};

function createReducerList(managerObjects) {
  const reducers = {};
  Object.keys(managerObjects).forEach((key) => (reducers[key] = managerObjects[key].reducer));
  return reducers;
}

function createBasicAjaxState(data = null) {
  return Map({
    onFetch: false,
    error: false,
    message: '',
    data,
    headers: {},
    status: null,
    canceled: false,
    tokenSource: null,
    loaded: false,
    params: {},
  });
}

function createAjaxStatus(typeName) {
  const name = typeName.toLocaleUpperCase();
  return {
    REQUEST: `API ${name} REQUEST`,
    SUCCESS: `API ${name} SUCCESS`,
    FAILURE: `API ${name} FAILURE`,
    ERROR: `API ${name} ERROR`,
    CANCELED: `API ${name} CANCELED`,
    LOADED: `API ${name} LOADED`,
    RESET: `API ${name} RESET`,
  };
}

function createInstance(config) {
  return axios.create(
    config || {
      timeout: 1000,
    }
  );
}

const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'get',
  DELETE: 'delete',
};

function capitalize(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function capPathname(t) {
  return t
    .split('_')
    .map((x, i) => (i > 0 ? capitalize(x) : x))
    .join('');
}

function getCurrentState(getState = () => ({}), path = '') {
  if (/^\^/.test(path)) {
    const [, path1, path2] = path.match(/\^(.*)\.(.*)$/);
    return getState()[path1][path2];
  }
  return path.split('.').reduce((p, n) => p[capPathname(n)], getState());
}

class AjaxManager {
  instance = null;

  stop = false;
  requests = [];
  events = {};
  checks = {};
  processes = {};

  constructor(config) {
    this.instance = createInstance(config);
  }

  getInstance() {
    return this.instance;
  }

  setStop(value) {
    this.stop = value;
    if (value === true) {
      this.requests.forEach(([, action]) => action());
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
    this.requests = this.requests.filter(([x]) => x !== r);
  }

  addToRequests(r, action) {
    this.requests.push([r, action]);
  }

  getCurrentState(getState, path = '') {
    return () => getCurrentState(getState, path);
  }

  create(createConfig = {}) {
    const {
      axiosConfig = {},
      name = '',
      path = '',
      defaultData = null,
      transform = {},
      check = {},
      process = {},
      resetOnRquest = true,
      events = {},
    } = createConfig;

    const { beforeRequest, onError, onFinal } = Object.assign({}, this.getEvents(), events);

    if (!name) throw new Error('config.name is not set');
    if (!path) throw new Error('config.path is not set');

    const defaultState = createBasicAjaxState(defaultData);
    const ajaxStatus = createAjaxStatus(name);
    const config = { ...axiosConfig };

    const { REQUEST, SUCCESS, FAILURE, ERROR, LOADED, CANCELED, RESET } = ajaxStatus;

    const actions = {
      request: (params) => async (dispatch, getState) => {
        if (this.getStop()) return;
        const currentState = this.getCurrentState(getState, path);
        const curState = currentState();

        if (curState.get('onFetch') && curState.get('tokenSource')) {
          await dispatch(actions.cancel());
        }

        const cancelTokenSource = axios.CancelToken.source();
        dispatch(createAction(REQUEST)({ cancelTokenSource, params }));
        config.cancelToken = cancelTokenSource.token;

        // config transform
        if (transform.url) {
          config.url = transform.url(config.url, params, getState);
        }

        const method = config.method || METHOD.GET;
        const methodDataKey = method === METHOD.GET ? 'params' : 'data';
        config.method = method;
        config[methodDataKey] = params;

        if (!config.data) config.data = {};

        if (beforeRequest) beforeRequest(dispatch, currentState, getState);
        const r = this.instance(config)
          .then((response) => {
            let isFailure = false;
            const checkFailure = check.failure || this.checks.failure;
            if (checkFailure) {
              isFailure = checkFailure(response);
            }

            if (isFailure) {
              const processFailure = process.failure || this.processes.failure || ((x) => x);
              dispatch(createAction(FAILURE)(processFailure(response, dispatch)));
            } else {
              const processSuccess = process.success || this.processes.success || ((x) => x);
              dispatch(createAction(SUCCESS)(processSuccess(response, dispatch)));
            }
          })
          .catch((e) => {
            if (!axios.isCancel(e)) {
              const processError = process.error || this.processes.error || ((x) => x);
              dispatch(createAction(ERROR)(processError(e, dispatch)));
              if (onError) onError(dispatch, currentState, getState);
            }
          })
          .finally(() => {
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
      },
    };

    const reducer = (state = defaultState, action) => {
      const { type, payload } = action;
      switch (type) {
        case REQUEST:
          {
            let newState = defaultState.set('onFetch', true);
            if (!resetOnRquest) newState = newState.set('data', state.get('data'));
            const { cancelTokenSource, params } = payload;
            return newState.set('tokenSource', cancelTokenSource).set('params', params);
          }
          break;
        case SUCCESS:
          {
            return state
              .set('onFetch', false)
              .set('data', payload.data)
              .set('status', payload.status)
              .set('headers', payload.headers);
          }
          break;
        case FAILURE:
          {
            return state
              .set('error', true)
              .set('onFetch', false)
              .set('message', payload.data?.message)
              .set('data', payload.data)
              .set('status', payload.status)
              .set('headers', payload.headers);
          }
          break;
        case ERROR:
          {
            return state
              .set('error', true)
              .set('onFetch', false)
              .set('message', payload?.data?.message)
              .set('data', payload?.data || payload)
              .set('headers', payload?.response?.headers)
              .set('status', payload?.response?.status);
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
        case RESET: {
          return defaultState;
        }
        default:
          return state;
      }
    };

    return { actions, reducer, types: ajaxStatus };
  }

  dynamic(id, store) {
    return (params) => {
      const { name, path, ...data } = params;
      const xpath = [`^${path}`, id].join('.');
      const xname = [name, id].join(' ');
      const created = this.create({
        ...data,
        name: xname,
        path: xpath,
      });

      store.injectReducer(path, {
        [`${id}`]: created.reducer,
      });

      return { ...created, path };
    };
  }
}

export {
  createAction,
  makeAction,
  makeActions,
  createReducerList,
  createBasicAjaxState,
  createAjaxStatus,
  createInstance,
  getCurrentState,
  METHOD,
};
export default AjaxManager;
