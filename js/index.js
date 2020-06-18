 $(window).load(function(){  
             $(".loading").fadeOut()
            })  
$(function () {
  echarts_1();  //支付占比
	echarts_2();  //行业占比
	echarts_3();  //交易趋势
	echarts_4();  //月交易额
//	echarts_5(); //交易排行榜

  table_1();//行业排行

 // list_1();//最新交易记录

	zb1();//支付宝
	zb2();//微信
	//zb3();//银行卡

    //更新当日交易金额
     // setInterval(trace, 5000); //每5s更新一次
     //    trace();
     //    var initial_fee = '';
     //    var initial_count = '';
     //    //交易量
     //    function trace() {
     //        $.ajax({
     //            url: 'http://t.020leader.com/index.php/Admin/show/dayAjax',
     //            type: "GET",
     //            dataType: 'jsonp',
     //            jsonp: "jsoncallback",
     //            success: function (msg) {
     //               console.log(JSON.stringify(msg));
     //                if (msg) {
     //                    initial_fee = parseFloat(msg.total_fee);            
     //                    initial_count = msg.total_count;
     //                    //console.log(initial_fee,initial_count);
     //                    // $("#flipcounter").flipCounterInit({'speed': 0.1});
     //                    // $("#flipcounter").flipCounterUpdate(initial_fee);
     //                    // $("#d2").flipCounterInit({'speed': 0.1});
     //                    // $("#d2").flipCounterUpdate(initial_count);  
     //                     document.getElementById("d2").innerHTML =initial_fee;            
     //                }
     //            },
     //            error: function (e) {
     //                alert("数据异常");
     //            }
     //        })
     //    }

     //更新当日交易金额
     setInterval(query, 5000); //每10s更新一次
        query();
        var initial_fee = '';
        var initial_count = '';
        //交易量
        function query() {
             $.ajax({
          type: "get",
          dataType: "json", //数据格式:JSON
          url:'http://m.irichpay.com/App/Api/DataDisplay.ashx?action=GetTradeData',
          crossDomain: true,  
          async:false,
          jsonp: "jsoncallback",
            success:function(data){
              if(data){
               initial_fee=parseFloat(data.todayTotalTrade);
              document.getElementById("d2").innerHTML =initial_fee; 
              var values=data.tradeTypePercentageInfo;
             // console.log('values='+JSON.stringify(values))
              var percentage=values[4].percentage
             // console.log('percentage='+percentage);
              var a = percentage.replace("%","");
              zb1(parseFloat(a));
              percentage=values[3].percentage
              a = percentage.replace("%","");
              zb2(parseFloat(a));

             }
            },error:function(data){
            }
        });
      }

      setInterval(queryecharts_1,5000);//10分钟更新一次占比

      queryecharts_1();
      function queryecharts_1(){
           $.ajax({
          type: "get",
          dataType: "json", //数据格式:JSON
          url:'http://m.irichpay.com/App/Api/DataDisplay.ashx?action=GetTradeData',
          crossDomain: true,  
          async:false,
          jsonp: "jsoncallback",
            success:function(data){
              if(data){
               //console.log('charts_1.data='+JSON.stringify(data))
               var charts_1=data.tradeTypePercentageInfo;
              // console.log("data="+JSON.stringify(charts_1)); 

               var names=[];
               var values=[];
               for(var i in charts_1){
               //console.log("i="+i);
                var item=charts_1[i];
                var name=item.cardType;
                var value={"value":"","name":""};
                var percentage=item.percentage;
                var a = percentage.replace("%","");
                value.value=parseFloat(a);
                value.name=name;
                values.push(value);
                names.push(name);
               }

              //console.log("values="+JSON.stringify(values)); 
              //console.log("names="+JSON.stringify(names)); 
              echarts_1(names,values);

              var tables=data.categoryInfo;
              //console.log("data="+JSON.stringify(tables)); 
              table_1(tables);

              var merchants=data.merchantRankInfo;
              table_2(merchants);
              }
              // console.log('charts_1.success='+JSON.stringify(data))
             
            },error:function(data){
             //  console.log('charts_1error='+JSON.stringify(data))
            }
        });
      }

      function table_2(tables){
         var myTable =  document.getElementById('table_2');

        for(var i in tables){
          var table=tables[i];
          i++;
          if(i>=9){
            continue;
          }
          var rows=myTable.rows[i];
          rows.cells[1].innerText=table.merchantName;
          rows.cells[2].innerText=table.MerchantTradeVolume;
        }
      }

      function table_1(tables){
        var myTable =  document.getElementById('table_1');

        for(var i in tables){
          var table=tables[i];
          i++;
          var rows=myTable.rows[i];
          rows.cells[1].innerText=table.categoryName;
          rows.cells[2].innerText=table.categoryMoney;
        }
            //以下方法为遍历table
        //   for(var i=0;i<myTable.rows.length;i++){
        //    // console.log("table="+ myTable.rows[i]);
        //     var rows=myTable.rows[i];

        //     for(var j=0;j<rows.cells.length;j++){

        //        console.log("table="+rows.cells[j].innerHTML);
        //     }
        // }
   // }
      }
     //更新最近交易记录
     setInterval(queryList, 10000); //每10s更新一次
        queryList();
        //交易量
        function queryList() {
             $.ajax({
          type: "get",
          dataType: "json", //数据格式:JSON
          url:'http://m.irichpay.com/App/Api/DataDisplay.ashx?action=GetTradeData',
          crossDomain: true,  
          async:false,
          jsonp: "jsoncallback",
            success:function(data){
              if(data){
              var list=data.realTimeRecoreInfo;
            //  console.log('lis='+JSON.stringify(list));
              list_1(list);
              }
             
            },error:function(data){
             
            }
        });
      }



    //   //最近交易记录
      function list_1(list){
         var ul = document.getElementById('ulList');
         // while(ul.hasChildNodes()) //当ul下还存在子节点时 循环继续  
         //  {
         //    ul.removeChild(ul.firstChild);
         // }
         ul.innerHTML = "";
         for(var i in list){

         var item=list[i];
         var li = document.createElement("li"); 
         var p = document.createElement("p");
         var span1 = document.createElement("span");
         var span2 = document.createElement("span");
         var span3 = document.createElement("span");
         var span4 = document.createElement("span");
         var orderid=item.orderNumber;
         orderid=orderid.substring(0,2)+'****'+orderid.substring(orderid.length-4,orderid.length);
         span1.innerHTML = orderid;
         span2.innerHTML=item.orderMoney;
         span3.innerHTML=item.tradeType;
         var tradeTime=item.tradeTime;
         var times=tradeTime.split(" ");
         console.log("i="+i+"time="+times[1]);
         span4.innerHTML=times[1];
          p.appendChild(span1);
          p.appendChild(span2);
          p.appendChild(span3);
          p.appendChild(span4);
          li.appendChild(p);
          ul.appendChild(li);
         }

         // for( var i in list){

         //  var item=list[i];
         //   console();
          
         //    li.appendChild(a);
         //    a.appendChild(div);
         //    span1.innerHTML = item.orderNumber;//公司名称
         //    div.appendChild(span1);
         //    div.appendChild(span2);
         //    div.appendChild(span3);
         //    lis.appendChild(li);
         // }
    }



    //支付占比
    function echarts_1(names,values) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));
        option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        right:0,
                        top:30,
                        height:160,
                        itemWidth:10,
                        itemHeight:10,
                        itemGap:10,
                        textStyle:{
                            color: 'rgba(255,255,255,.6)',
                            fontSize:12
                        },
                        orient:'vertical',
                       // data:['借记卡','贷记卡','准贷记卡','微信','支付宝','银联扫码']
                       data:names
                    },
                   calculable : true,
                    series : [
                        {
                            name:' ',
							color: [ '#FF8C00', '#FFDAB9', '#D2691E','#3CB371', '#00BFFF', '#FF4500', '#c9c862', '#c98b62', '#c962b9', '#7562c9','#c96262','#108ee9 ','#00b7be'],	
                            type:'pie',
                            radius : [30, 70],
                            center : ['35%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },

                            lableLine: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },

                            // data:[
                            //     {value:10, name:'银联'},
                            //     {value:5, name:'银行卡'},
                            //     {value:15, name:'其他'},
                            //     {value:25, name:'支付宝'},
                            //     {value:20, name:'微信'},
                            // ]
                            data:values
                        },
                    ]
                };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    //行业占比
function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

        option = {
            tooltip: {
                trigger: 'item',
               formatter: "{b} : {c} ({d}%)"
            },
            legend: {
			
				top:'15%',
                data: ['商超', '零售', '餐饮', '百货', '教育'],
                icon: 'circle',
                textStyle: {
                    color: 'rgba(255,255,255,.6)',
                }
            },
            calculable: true,
            series: [{
                name: '',
				color: ['#62c98d', '#2f89cf', '#4cb9cf', '#53b666', '#62c98d', '#205acf', '#c9c862', '#c98b62', '#c962b9','#c96262'],	
                type: 'pie',
                //起始角度，支持范围[0, 360]
                startAngle: 0,
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                radius: [51, 100],
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                center: ['50%', '45%'],
				
                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                roseType: 'area',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                      //  formatter: '{c}辆'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 1,
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    {value: 1,name: '商超',},
                    {value: 4,name: '零售',},
                    {value: 5,name: '餐饮',},
                    {value: 6,name: '百货',},
                    {value: 9,name: '教育',},
         
                   
                    {value: 0, name: "",label: {show: false},labelLine: {show: false}},
                    {value: 0, name: "",label: {show: false},labelLine: {show: false}},
                    {value: 0, name: "",label: {show: false},labelLine: {show: false}},
                    {value: 0, name: "",label: {show: false},labelLine: {show: false}},
                    {value: 0, name: "",label: {show: false},labelLine: {show: false}},

                   
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    //交易趋势
function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart3'));

        option = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			lineStyle: {
				color: '#57617B'
			}
		}
	},
	legend: {
	
		//icon: 'vertical',
			data: ['刷卡', '扫码'],
        //align: 'center',
       // right: '35%',
		top:'0',
        textStyle: {
            color: "#fff"
        },
       // itemWidth: 15,
       // itemHeight: 15,
        itemGap: 20,
	},
	grid: {
		left: '0',
		right: '20',
		top:'10',
		bottom: '20',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		boundaryGap: false,
		axisLabel: {
			show: true,
			textStyle: {
                           color: 'rgba(255,255,255,.6)'
                        }
		},
		axisLine: {
			lineStyle: {
				color: 'rgba(255,255,255,.1)'
			}
		},
		data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', ]
	}, {
		

		
		
	}],
	yAxis: [{
		axisLabel: {
			show: true,
			textStyle: {
                           color: 'rgba(255,255,255,.6)'
                        }
		},
		axisLine: {
			lineStyle: {
				color: 'rgba(255,255,255,.1)'
			}
		},
		splitLine: {
			lineStyle: {
				color: 'rgba(255,255,255,.1)'
			}
		}
	}],
	series: [{
		name: '刷卡',
		type: 'line',
		smooth: true,
		symbol: 'circle',
		symbolSize: 5,
		showSymbol: false,
		lineStyle: {
			normal: {
				width: 2
			}
		},
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(24, 163, 64, 0.3)'
				}, {
					offset: 0.8,
					color: 'rgba(24, 163, 64, 0)'
				}], false),
				shadowColor: 'rgba(0, 0, 0, 0.1)',
				shadowBlur: 10
			}
		},
		itemStyle: {
			normal: {
				color: '#cdba00',
				borderColor: 'rgba(137,189,2,0.27)',
				borderWidth: 12
			}
		},
		data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
	}, {
		name: '扫码',
		type: 'line',
		smooth: true,
		symbol: 'circle',
		symbolSize: 5,
		showSymbol: false,
		lineStyle: {
			normal: {
				width: 2
			}
		},
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(39, 122,206, 0.3)'
				}, {
					offset: 0.8,
					color: 'rgba(39, 122,206, 0)'
				}], false),
				shadowColor: 'rgba(0, 0, 0, 0.1)',
				shadowBlur: 10
			}
		},
		itemStyle: {
			normal: {
				color: '#277ace',
				borderColor: 'rgba(0,136,212,0.2)',
				borderWidth: 12
			}
		},
		data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
	}]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    //每天的交易量 
function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
        var dayDatas=[

     
      {"date":"23","money":76.84,"rate":77},//11
      {"date":"24","money":75.30,"rate":75},//10
      {"date":"25","money":115.61,"rate":100},//14
      {"date":"26","money":112.93,"rate":100},//14
      {"date":"27","money":88.53,"rate":89},//15
      {"date":"28","money":93.35,"rate":93},//7
      {"date":"29","money":98.92,"rate":98},//13
      {"date":"30","money":89.20,"rate":89},//8
      {"date":"31","money":90.91,"rate":91},//8
      {"date":"1","money":61.91,"rate":61},//8
      {"date":"2","money":48.32,"rate":48},//8
      {"date":"3","money":51.39,"rate":51},//8
      {"date":"4","money":62.49,"rate":62},//6
      {"date":"5","money":73.69,"rate":74},//
      {"date":"6","money":71.09,"rate":71},//7
      {"date":"7","money":71.99,"rate":72},//7
      {"date":"8","money":80.96,"rate":81},//2
      {"date":"9","money":96.28,"rate":96},//2
      {"date":"10","money":87.93,"rate":88},//15
      {"date":"11","money":85.52,"rate":85},//15
      {"date":"12","money":82.59,"rate":83},//6
      {"date":"13","money":112.83,"rate":100},//9
      {"date":"14","money":100.57,"rate":91},//11
      {"date":"15","money":91.14,"rate":91},//10
      {"date":"16","money":150.77,"rate":100},//11
      {"date":"17","money":167.22,"rate":100},//6
  
      ];

        var dates=[];
        var moneys=[];
        var rates=[];

        for(var i in dayDatas){
          var dayData=dayDatas[i];
          dates.push(dayData.date);
          moneys.push(dayData.money);
          rates.push(dayData.rate);
        }


option = {
   	tooltip: {
		trigger: 'axis',
		axisPointer: {
			lineStyle: {
				color: '#57617B'
			}
		}
	},
    "legend": {
		
      "data": [
      //  {"name": "本级"},
        {"name": "代理"},
        {"name": "完成率"}
      ],
      "top": "0%",
      "textStyle": {
       "color": "rgba(255,255,255,0.9)"//图例文字
      }
    },
	
    "xAxis": [
      {
        "type": "category",
		    data:dates,
      //  data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',"13","14",'15', '16', '17', '18', '19', '20','21', '22',"23","24",'25', '26','27','28'],
	     	axisLine: { lineStyle: {color: "rgba(255,255,255,.1)"}},
        axisLabel:  { textStyle: {color: "rgba(255,255,255,.6)", fontSize: '14', },
            },
		
        },
	],
    "yAxis": [
      {
        "type": "value",
        "name": "金额",
        "min": 0,
        "max": 100,
        "interval": 25,

        "axisLabel": {
        "show": true,
         
        },
        axisLine: {lineStyle: {color: 'rgba(255,255,255,.4)'}},//左线色
        
      },
      {
        "type": "value",
        "name": "完成率",
        "show": true,
        "axisLabel": {
          "show": true,
        
        },
		  axisLine: {lineStyle: {color: 'rgba(255,255,255,.4)'}},//右线色
		   splitLine: {show:true,lineStyle: {color:"#001e94"}},//x轴线
      },
    ],
    "grid": {
      "top": "10%",
		"right":"30",
		"bottom":"30",
		"left":"30",
    },
    "series": [
      // {
      //   "name": "本级",
      //   "type": "bar",
      //   "data": [4,6,36,6,8,6,4,6,30,6,8,12],
      //   "barWidth": "auto",
      //   "itemStyle": {
      //     "normal": {
      //       "color": {
      //         "type": "linear",
      //         "x": 0,
      //         "y": 0,
      //         "x2": 0,
      //         "y2": 1,
      //         "colorStops": [
      //           {
      //             "offset": 0,
      //             "color": "#609db8"
      //           },
                
      //           {
      //             "offset": 1,
      //             "color": "#609db8"
      //           }
      //         ],
      //         "globalCoord": false
      //       }
      //     }
      //   }
      // },
      {
        "name": "交易额",
        "type": "bar",
           // data: [50, 67, 77, 88, 40, 50, 60, 80, 90, 76, 64, 55 ,88, 40, 50, 60, 80, 90, 76, 64, 55, 88, 40, 50, 60,80,90,20],
            data:moneys,
        "barWidth": "12px",
        "itemStyle": {
          "normal": {
            "color": {
              "type": "linear",
              "x": 0,
              "y": 0,
              "x2": 0,
              "y2": 1,
              "colorStops": [
                {
                  "offset": 0,
                  "color": "#66b8a7"
                },
                {
                  "offset": 1,
                  "color": "#66b8a7"
                }
              ],
              "globalCoord": false
            }
          }
        },
        "barGap": "0"
      },
      {
        "name": "完成率",
        "type": "line",
        "yAxisIndex": 1,
		
       // "data": [100,50,80,30,90,40, 70,33,100,40,80,20,50,80,30,90,40, 70,33,100,30,90,40,70,30,90,40, 70,90,20],
		    data:rates,
      lineStyle: {
			normal: {
				width: 1
			},
		},
        "itemStyle": {
          "normal": {
            "color": "#cdba00",
			 
          }
        },
        "smooth": true
      }
    ]
};
       

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
//交易排行榜

function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
// 颜色
var lightBlue = {
	type: 'linear',
	x: 0,
	y: 0,
	x2: 0,
	y2: 1,
	colorStops: [{
		offset: 0,
		color: 'rgba(41, 121, 255, 1)'
	}, {
		offset: 1,
		color: 'rgba(0, 192, 255, 1)'
	}],
	globalCoord: false
}

var option = {
	tooltip: {
		show: false
	},
	grid: {
		top: '0%',
		left: '65',
		right: '14%',
		bottom: '0%',
	},
	xAxis: {
		min: 0,
		max: 100,
		splitLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		},
		axisLabel: {
			show: false
		}
	},
	yAxis: {
		data: ['德清中大莫干山生态园开发建设有限公司', '商户2', '商户3','商户4','商户5','商户6','商户7','商户8','商户9','商户0'],
		//offset: 65,
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		},
		axisLabel: {
			color: 'rgba(255,255,255,.6)',
			fontSize: 14
		}
	},
	series: [{
		type: 'bar',
		label: {
			show: true,
			zlevel: 10000,
			position: 'right',
			padding: 10,
			color: '#49bcf7',
			fontSize: 14,
			formatter: '{c}%'
			
		},
		itemStyle: {
			color:'#49bcf7'
		},
		barWidth: '15',
		data: [49, 80, 67, 90, 12, 19, 39, 84, 28, 47],
		z: 10
	}, {
		type: 'bar',
		barGap: '-100%',
		itemStyle: {
			color:'#fff',
			opacity: 0.1
		},
		barWidth: '15',
		data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
		z: 5
	}],
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
	
	//
function zb1(percentage) {
        // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('zb1'));
	  var v1=percentage//支付宝
		//var v2=percentage//女消费
		var v3=100//总消费 
option = {	
    series: [{
		
        type: 'pie',
        radius: ['60%', '70%'],
        color:'#49bcf7',
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [
        {
            value: v1,
            name: '微信消费',
            label: {
                normal: {
                    formatter: v1 +'',
                    textStyle: {
                        fontSize: 20,
						color:'#fff',
                    }
                }
            }
        }, 
        {
            value: 100-v1,
            name: '支付宝消费',
            label: {
                normal: {
                 formatter : function (params){
                return '占比'+Math.round( v1/v3*100)+ '%'
            },
                    textStyle: {
                        color: '#aaa',
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,.2)'
                },
                emphasis: {
                    color: '#fff'
                }
            },
        }]
    }]
};
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    //微信
function zb2(percentage) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zb2'));
    var v1=percentage//微信消费
		var v2=percentage//支付宝消费
		var v3=100//总消费 
      option = {
	
//animation: false,
    series: [{
        type: 'pie',
       radius: ['60%', '70%'],
        color:'#3CB371',
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [{
            value: v1,
            name: '微信消费',
            label: {
                normal: {
                    formatter: v1 +'',
                    textStyle: {
                        fontSize: 20,
						color:'#fff',
                    }
                }
            }
        }, {
            value: 100-v2,
            name: '支付宝消费',
            label: {
                normal: {
                 formatter : function (params){
                return '占比'+Math.round( v1/v3*100)+ '%'
            },
                    textStyle: {
                        color: '#aaa',
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,.2)'
                },
                emphasis: {
                    color: '#fff'
                }
            },
        }]
    }]
};
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function zb3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zb3'));
		var v1=298//微信消费
		var v2=523//支付宝消费
		var v3=v1+v2//总消费 
option = {	
    series: [{
		
        type: 'pie',
       radius: ['60%', '70%'],
        color:'#62c98d',
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [{
            value: v2,
            name: '微信消费',
            label: {
                normal: {
                    formatter: v2 +'',
                    textStyle: {
                        fontSize: 20,
						color:'#fff',
                    }
                }
            }
        }, {
            value: v1,
            name: '支付宝消费',
            label: {
                normal: {
                 formatter : function (params){
                return '占比'+Math.round( v2/v3*100)+ '%'
            },
                    textStyle: {
                        color: '#aaa',
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,.2)'
                },
                emphasis: {
                    color: '#fff'
                }
            },
        }]
    }]
};
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
})



		
		
		


		









