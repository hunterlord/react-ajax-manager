# AJAX-MANAGER

目前仍在测试完善中；
(DEMO)[https://github.com/hunterlord/ajax-manager-demo/tree/main/react]

`react-ajax-manager`使用`axios`、`redux`、`immutable` 来快速创建`ajax`过程常用的状态，并自动处理。
且提供了处理接口，意在减少 ajax 相关开发工作量。

> 当前库依赖`axios`、`redux`、`immutable`

### 基本使用方法

- 初始化

创建文件`utils/axios.js`

```javascript
import AjaxManager from 'react-ajax-manager';

const { API_BASE_URL, AJAX_TIMEOUT } = process.env;

const axiosConfig = {
  baseURL: process.env.API_BASE_URL,
  timeout: AJAX_TIMEOUT || 60000,
};

const ajaxManager = new AjaxManager(axiosConfig);

export { ajaxManager };
```

- 创建 API

`redux/api/login.js`

当前文件会`export`出`actions`, `reducer`, `types`共 3 个变量以便使用

```javascript
import { ajaxManager } from 'utils/axios';

export default ajaxManager.create({
  name: 'user login',
  path: 'api.user.login', // 必须设置，代表redux状态树所处位置
  axiosConfig: {
    method: 'post',
    url: '/user/login',
  },
});
```

- 在组件中使用

```javascript
import apiUserLogin from '@/redux/api/login';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function LoginPage {
  const distpach = useDispatch();

  useEffect(() => {
    dispatch(apiUserLogin.actions.reset());
  }, []);

  const onSubmit = () => {
    distpach(apiUserLogin.actions.request({
      username: 'username',
      password: 'password',
    }))
  }

  return (
    <div onClick={onSubmit}>test</div>
  );
}
```

- 动态创建状态

`api/user/remove.js`

```javascript
import { ajaxManager } from '@/utils/axios';

export const path = 'api.user.remove';
export default (id, store) =>
  ajaxManager.dynamic(
    id,
    store
  )({
    name: 'user remove',
    path,
    axiosConfig: {
      method: 'delete',
      url: '/user/remove',
    },
  });
```

组件中使用:

```javascript
import apiUserRemove, { path as userRemovePath } from '@/redux/api/user/remove';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectApiUserRemoveDynamic = createSelector(
  (state) => state,
  (state) => state[userRemovePath] || {}
);

const removeId = 1;

export default function UserRemove() {
  const distpach = useDispatch();
  const store = useStore();

  const ar = useSelector(selectApiUserRemoveDynamic);

  const handleRemove = () => {
    dispatch(apiUserRemove(removeId, store).actions.request({ id: removeId }));
  };

  return <div onClick={handleRemove}>test remove {ar[removeId]?.get('onFetch')}</div>;
}
```

### 基础状态

```
  return {
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
  };
```

| 参数名称    | 类型    | 描述                                                |
| ----------- | ------- | --------------------------------------------------- |
| onFetch     | boolean | ajax 请求状态                                       |
| error       | boolean | ajax 请求结果                                       |
| message     | any     | ajax 返回的错误或成功信息                           |
| data        | any     | response 返回值                                     |
| headers     | object  | ajax 返回的头部信息                                 |
| status      | int     | ajax 返回的 http status code                        |
| canceled    | boolean | 是否被取消执行                                      |
| tokenSource | object  | 该值仅内部自动处理                                  |
| loaded      | boolean | ajax 请求结束且内部状态事件等处理结束后将转为`true` |
| params      | any     | ajax 请求参数                                       |

### create

| 参数名称     | 类型   | 描述             |
| ------------ | ------ | ---------------- |
| createConfig | object | 状态及 AJAX 配置 |

##### createConfig

| 参数名称      | 类型    | 描述                                                |
| ------------- | ------- | --------------------------------------------------- |
| axiosConfig   | object  | axios 配置                                          |
| name          | string  | 唯一标志，名称                                      |
| defaultData   | any     | 存储于状态的初始 data 值，该值默认为 reponse 返回值 |
| transform     | object  | 在请求执行前，动态修改设置了的 axiosConfig 的值     |
| check         | object  | 检测 response 返回值，决定了该次请求 error 值       |
| process       | object  | 在更新状态之前，修改 response 的返回值              |
| resetOnRquest | boolean | 新的请求重制状态                                    |
| events        | object  | 事件                                                |

##### createConfig.transform

| 参数名称 | 类型     | 描述                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| url      | function | func 会返回 3 个参数，依次为 axiosConfig.url, params, states |

> params 为 action 的参数，即 ajax 的请求参数
> states 为当前定义的所有状态

##### createConfig.check

| 参数名称 | 类型     | 描述                                  |
| -------- | -------- | ------------------------------------- |
| failure  | function | func 会返回 1 个参数，该值为 response |

> 当 failure 返回为 true 时，状态 error 会变为 true

##### createConfig.process

| 参数名称 | 类型     | 描述                                    |
| -------- | -------- | --------------------------------------- |
| failure  | function | func 会返回 2 个参数，依次为 response、 |
| success  | function | func 会返回 2 个参数，依次为 response   |

> 该返回仅改变 response 的值、对于既成事实的状态值不造成影响。

##### createConfig.events

| 参数名称 | 类型     | 描述                                             |
| -------- | -------- | ------------------------------------------------ |
| onFinal  | function | 当 ajax 请求结束后，不论成功与否，该事件都会执行 |
