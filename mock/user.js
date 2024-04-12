export default [
  {
    url: "/api/user",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",

        menus: [
          {
            key: 101,
            label: "dashboard",
            ps_icon: "StockOutlined",
            ps_c: "dashboard",
            ps_a: "dashboard/index",
            ps_level: "1",
          },
          {
            key: 102,
            label: "inventory",
            ps_icon: "StockOutlined",
            ps_c: "inventory",
            ps_a: "",
            ps_level: "0",
            children: [
              {
                key: 1021,
                label: "list",
                ps_icon: "PieChartOutlined",
                ps_c: "inventory",
                ps_a: "inventory/index",
                ps_level: "1",
              },
              {
                key: 1022,
                label: "stock-in",
                ps_icon: "PieChartOutlined",
                ps_c: "stock-in",
                ps_a: "inventory/stock-in",
                ps_level: "1",
              },
              {
                key: 1023,
                label: "audit",
                ps_icon: "PieChartOutlined",
                ps_c: "inventory-audit",
                ps_a: "inventory/inventory-audit",
                ps_level: "1",
              },
            ],
          },
          {
            key: 103,
            label: "reports",
            ps_icon: "StockOutlined",
            ps_c: "reports",
            ps_a: "",
            ps_level: "0",
            children: [
              {
                key: 1031,
                label: "chart",
                ps_icon: "PieChartOutlined",
                ps_c: "reports",
                ps_a: "reports/index",
                ps_level: "1",
              },
              {
                key: 1032,
                label: "inventory",
                ps_icon: "PieChartOutlined",
                ps_c: "inventory-report",
                ps_a: "reports/inventory-report",
                ps_level: "1",
              },
              {
                key: 1033,
                label: "sales",
                ps_icon: "PieChartOutlined",
                ps_c: "sales-report",
                ps_a: "reports/sales-report",
                ps_level: "1",
              },
            ],
          },
        ],
      };
    },
  },
];
