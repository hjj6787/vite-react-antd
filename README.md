# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  /pages
  │
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
