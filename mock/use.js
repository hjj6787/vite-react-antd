export default [
    {
      url: '/api/user',
      method: 'get',
      response: () => {
        return {
          "code": 200,
          "message": 'ok',
          "data": {
            "menus":[
                {
                    "key":101,
                    "label":'op1',
                    "ps_icon":'StockOutlined',
                    "children":[
                        {
                            "key":1011,
                            "label":'op1_1',
                            "ps_icon":'PieChartOutlined',
                        }
                    ]
                },
                {
                    "key":102,
                    "label":'op2',
                    "ps_icon":'DotChartOutlined',
                    "children":[
                        {
                            "key":1021,
                            "label":'op2_1',
                            "ps_icon":'AimOutlined',
                        }
                    ]
                },
                {
                    "key":103,
                    "label":'op3',
                    "ps_icon":'CompassOutlined',
                    "children":[
                        {
                            "key":1031,
                            "label":'op3_1',
                            "ps_icon":'ContactsOutlined',
                        }
                    ]
                }
            ]
          },
        };
      },
    },
  ];
  