export default [
  {
    url: "/api/user",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: {
          menus: [
            // {
            //   key: 101,
            //   label: "op1",
            //   ps_icon: "StockOutlined",
            //   ps_c: "linechart1",
            //   ps_a: "",
            //   ps_level: "0",
            //   children: [
            //     {
            //       key: 1011,
            //       label: "op1_1",
            //       ps_icon: "PieChartOutlined",
            //       ps_c: "linechart1",
            //       ps_a: "index",
            //       ps_level: "1",
            //     },
            //   ],
            // },
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
                  label: "inventory list",
                  ps_icon: "PieChartOutlined",
                  ps_c: "inventory",
                  ps_a: "inventory/index",
                  ps_level: "1",
                },
              ],
            },
          ],
        },
      };
    },
  },
];
