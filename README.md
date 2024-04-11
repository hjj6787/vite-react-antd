# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
-

## 项目文件结构

- /pages
- │
  ├── dashboard
  │ └── index.jsx # 仪表盘主页面
  │
  ├── inventory
  │ ├── index.jsx # 库存列表页面
  │ ├── stock-in.jsx # 入库管理页面
  │ ├── stock-out.jsx # 出库管理页面
  │ ├── stock-adjustment.jsx# 库存调整页面
  │ └── inventory-audit.jsx # 库存盘点页面
  │
  ├── reports
  │ ├── index.jsx # 报表中心主页面
  │ ├── sales-report.jsx # 销售报表页面
  │ ├── inventory-report.jsx# 库存报表页面
  │ └── financial-report.jsx# 财务报表页面
  │
  └── settings
  ├── index.jsx # 系统设置主页面
  ├── user-management.jsx # 用户管理页面
  ├── role-management.jsx # 角色管理页面
  └── system-logs.jsx # 系统日志页面

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
