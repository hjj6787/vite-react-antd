## 项目配置eslint

需要安装 Airbnb 的 ESLint 配置，以及 `eslint-plugin-react`，`eslint-plugin-import`，`eslint-plugin-jsx-a11y` 和 `eslint-plugin-react-hooks`，这些都是 Airbnb 风格指南所依赖的插件。

### 安装 ESLint 和 Airbnb 配置

```apache
npm install eslint --save-dev
npx install-peerdeps --dev eslint-config-airbnb

```

安装 Prettier 和 ESLint 配合使用的依赖

```apache
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

```

创建 `.eslintrc.json` 文件，并添加以下内容：

```apache
{
  "extends": "airbnb",
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    // 在这里可以自定义一些规则，根据你的项目需求进行调整
  }
}

```

配置 package.json

```apache
"scripts": {
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
}

```

在 npm 脚本中指定目录

```apache
"scripts": {
  "lint": "eslint src/**/*.{js,jsx,ts,tsx}"
}

```

### vscode配置

```
"editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.formatOnSave": true
  },
  "eslint.alwaysShowStatus": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
```

## Immer的使用

基本使用

```apache
import produce from 'immer';

const initialState = { count: 0 };

const nextState = produce(initialState, draftState => {
  draftState.count += 1;
});

console.log(initialState.count); // 0
console.log(nextState.count);   // 1

```

在redux里使用

```apache
import produce from 'immer';

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return produce(state, draft => {
        draft.count += 1;
      });
    case 'DECREMENT':
      return produce(state, draft => {
        draft.count -= 1;
      });
    default:
      return state;
  }
}

```

## redux持久化

redux index.js配置

```apache
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer from './features/userSlice';
// 其他 reducers...

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'] // 指定只持久化 user reducer
};

const rootReducer = combineReducers({
  user: userReducer,
  // 其他 reducers...
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


```

mian.jsx

```apache
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

```

## 浏览器插件redux与react devtool

redux devtool,但是@reduxjs/toolkit已经集成

```
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware),
));

```
