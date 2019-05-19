function JobHome(container){
    this.container = container;
};
//防止出现“There is a chart instance already initialized on the dom.”的警告    
//在使用echarts发现需要及时对新建的myChart实例进行销毁,否则会出现上述警告    
//在全局定义myChart
//在函数中贩判断后销毁实例if(myChart != null && myChart != "" && myChart != undefined) {myChart.dispose();}
var myChart;
JobHome.prototype = {
    init:function(){
        this.creat_job_home()
    },
    creat_job_home : function(){
       
        if(myChart!="" && myChart!=null && myChart!=undefined){
            myChart.dispose()
        };
        // 初始化echarts实例  当前echarts不支持jQuery，加[0],变成原生
        // var myChart = echarts.init(document.getElementById('main'));
         myChart = echarts.init(this.container[0]);
       
        // 图表的配置项和数据
        var option = {
            title: {
                text: '招聘岗位统计',
                x:'left',
                y:'top',
                textStyle:{
                    //文字颜色
                    color:'#878a8d',
                    //字体风格,'normal','italic','oblique'
                    fontStyle:'normal',
                    //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    fontWeight:'bold',
                    //字体系列
                    fontFamily:'sans-serif',
                    //字体大小
            　　　　 fontSize:18,
                }
            },
            tooltip: {formatter: "岗位统计"},
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{offset: 0, color: '#89c2f3'},
                    {offset: 0.5, color: '#3A8EE6'},
                    {offset: 0.8, color: '#FAB6B6'},
                    {offset: 1, color: '#337ab7'}],
                globalCoord: false // 缺省为 false
            },
            legend: {
                data:['数量'],
                icon: "circle",
                
            },
            xAxis: {
                data: ["前端","php","数据分析","Java","C++","测试","UI"],
                axisLine: {//x轴样式
                    show: true,
                    lineStyle: {
                      color: "#337ab7",
                      width: 1,
                      type: "solid"
                    }
                }
            },
            yAxis: {
                axisLine: {//y轴样式
                    show: true,
                    lineStyle: {
                      color: "#337ab7",
                      width: 1,
                      type: "solid"
                   }   
                },
            },
            series: [{
                name: '数量',
                type: 'bar',
                barWidth: 50,
                data: [836, 676, 534, 690, 578, 521,468],
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'skyblue',
                                fontSize: 16
                            }
                        }
                    }
                },
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        
        
        
    },

}
new JobHome($("#jobHome")).init();
var myChart;




