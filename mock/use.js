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
                    "ps_c":'linechart1',
                    'ps_a':'',
                    'ps_level':'0',
                    "children":[
                        {
                            "key":1011,
                            "label":'op1_1',
                            "ps_icon":'PieChartOutlined',
                            "ps_c":'linechart1',
                            'ps_a':'index',
                            'ps_level':'1',
                        }
                    ]
                },
                {
                    "key":102,
                    "label":'op2',
                    "ps_icon":'DotChartOutlined',
                    "ps_c":'linechart2',
                    'ps_a':'',
                    'ps_level':'0',
                    "children":[
                        {
                            "key":1021,
                            "label":'op2_1',
                            "ps_icon":'AimOutlined',
                            "ps_c":'linechart2',
                            'ps_a':'index',
                            'ps_level':'1',
                        }
                    ]
                },
                {
                    "key":103,
                    "label":'op3',
                    "ps_icon":'CompassOutlined',
                    "ps_c":'linechart3',
                    'ps_a':'',
                    'ps_level':'0',
                    "children":[
                        {
                            "key":1031,
                            "label":'op3_1',
                            "ps_icon":'ContactsOutlined',
                            "ps_c":'linechart3',
                            'ps_a':'index',
                            'ps_level':'1',
                        }
                    ]
                }
            ]
          },
        };
      },
    },
  ];
  