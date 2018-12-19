<template>
    <el-card :body-style="{ padding: '10px' }">
        <div :style="{height:chartsWrapperHeight}">
            <p class="card-title"><span class="bar-icon"></span>{{chartsTitle}}</p>
            <!--今日收费汇总-->
            <div ref="chargeSummary" style="height:calc(100% - 30px)"></div>
        </div>
    </el-card>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name: 'charts-pie',
        data () {
            return {
                chargeSummaryChart:{}, //今日收费汇总
            }
        },
        props:{
            chartsData:Array,
            chartsTitle:String,
            chartsType:String,
            chartsWrapperHeight:{
                type:String,
                default:'200px'
            }
        },
        mounted () {
            let that = this;
            this.setEchart();
            if(this.chargeSummaryChart){
                window.addEventListener('resize', () => {
                    that.chargeSummaryChart.resize();
                });
            }
        },
        updated () {
        },
        computed: {
            origin () {
                return this.data;
            },
            //今日收费汇总
            chargeSummaryChartOption() {
                let that = this;
                if(that.chartsData == undefined ||that.chartsData.length == 0) return

                let obj = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical', // 'vertical' 'horizontal'
                        x: '70%', // 'center' | 'left' | {number},
                        y: 'top', // 'center' | 'bottom' | {number}
                        itemWidth:15,
                        itemHeight:12,
                        textStyle: {
                            color: '#999999'
                        },
                        data: [{
                            name: that.chartsData[0].name,
                            icon: 'rectangle'
                        }, {
                            name: that.chartsData[1].name,
                            icon: 'rectangle'
                        },
                            {
                                name: that.chartsData[2].name,
                                icon: 'rectangle'
                            }],
                        formatter: function(name) {
                            var total = 0;
                            var target;
                            for(var i = 0, l = that.chartsData.length; i < l; i++) {
                                total += that.chartsData[i].value;
                                if(that.chartsData[i].name == name) {
                                    target = that.chartsData[i].value;
                                }
                            }
                            var arr = [
                                '{a|' + name + '}',
                                '{b|' + target + '}',
                            ]
                            return arr.join('\n')
                        },
                        textStyle: {
                            rich: {
                                a: {
                                    fontSize: 10,
                                    align: 'center',
                                    padding: [0, 10, 0, 0],
                                    lineHeight: 25
                                },
                                b: {
                                    fontSize: 14,
                                    verticalAlign: 'top',
                                    align: 'center',
                                    fontWeight:'bold'
                                },

                            }
                        }
                    },
                    // color: ['#5396FA', '#FF9900','#28E483'],
                    color: ['#3CC1AF', '#418BEC','#EBA23C'],
                    series: [{
                        name: '收费汇总',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        center: ['40%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle:{
                            normal:{
                                // borderColor:'#fff',
                                // borderWidth:2,
                                // color: new echarts.graphic.LinearGradient(
                                //     0, 0, 1, 0,
                                //     [
                                //         {offset: 0, color: '#FFE06D'},
                                //         {offset: 1, color: '#D96E13'}
                                //     ]
                                // ),
                            }
                        },
                        data: that.chartsData
                    }]
                }
                return obj;
            },
            //今日收费排行
            topParkChartOption(){
                let that = this;
                if(that.chartsData == undefined) return;
                let obj = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter:function (params) {
                            let ret = params[0];
                            let name = '';
                            let str = '';
                            let len = ret.name.length;
                            if(len > 6){
                                name = ret.name.substr(0,6)+'...'
                            }else{
                               name = ret.name;
                            }
                            str = '<p>收费员:'+name+'</p>'+'<p>金额:'+ret.value+'元</p>';
                            return str
                        }
                    },
                    grid: {
                        top:'28',
                        left: '0',
                        right: '50',
                        bottom: '8',
                        containLabel: true
                    },
                    xAxis: {
                        name:'金额',
                        nameLocation:'end',
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        nameTextStyle:{
                            color:'#666666',

                        },
                        axisLine:{
                            lineStyle:{
                                type:'solid',
                                color:'#999'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        }
                    },
                    yAxis: {
                        name:'',
                        nameLocation:'end',
                        type: 'category',
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        nameTextStyle:{
                          fontSize:10,
                        },
                        data: that.chartsData.name,
                        axisLabel:{
                            formatter: function (value) {
                                if(value.length >= 4){
                                    return value.substring(0,4)+'...'
                                }else{
                                    return value;
                                }
                            }
                        },
                    },
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: [10, 10, 10, 10],
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 1, 0,
                                        [
                                            {offset: 0, color: '#4590EE'},
                                            {offset: 1, color: '#6DBFFF'}
                                        ]
                                    ),
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 1, 0,
                                        [
                                            {offset: 0, color: '#4590EE'},
                                            {offset: 1, color: '#6DBFFF'}
                                        ]
                                    )
                                },
                            },
                            barWidth:'9',
                            data: that.chartsData.value
                        },
                    ]
                }
                return obj;
            },
            //泊位使用率
            berthChartOption(){
                let that = this;
                if(that.chartsData == undefined) return;
                let obj = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let name = params[0].name +'时'+'<br/>'
                            let val = '使用率占比:' +((params[0].value))+'%'
                            return name + val;
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top:'28',
                        left: '0',
                        right: '50',
                        bottom: '8',
                        containLabel: true
                    },
                    xAxis: {
                        name:'小时',
                        nameLocation:'end',
                        type: 'category',
                        boundaryGap: [0, 0.01],
                        nameTextStyle:{
                            color:'#666666',
                        },
                        axisLine:{
                            lineStyle:{
                                type:'solid',
                                color:'#999'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        },
                        data: that.chartsData.name,
                    },
                    yAxis: {
                        name:'使用率',
                        nameLocation:'end',
                        type: 'value',
                        max:100,
                        min:0,
                        axisLabel:{
                          formatter:'{value}%'
                        },
                        axisLine:{
                            show:false,
                            lineStyle:{
                                type:'solid',
                                color:'#999'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        nameTextStyle:{
                            fontSize:10,
                        },
                    },
                    series: [
                        {
                            name: '',
                            type: 'line',
                            itemStyle: {
                                normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                                            offset: 0, color: '#338BE4' // 0% 处的颜色
                                        },{
                                            offset: 1, color: '#fff' // 100% 处的颜色
                                        }]
                                    ),  //背景渐变色
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 2,
                                        type: 'solid',
                                        color: "#57A4F6"
                                    }
                                },
                                emphasis: {
                                    color: '#57A4F6',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width:2,
                                        type: 'dotted',
                                        color: "#57A4F6" //折线的颜色
                                    }
                                }
                            },//线条样式
                            symbolSize:3, //折线点的大小
                            areaStyle: {normal: {}},
                            data: that.chartsData.value
                        },
                    ]
                }
                return obj;
            },
        },
        methods: {
            setEchart () {
                let chargeSummary = this.$refs.chargeSummary;
                this.chargeSummaryChart = echarts.init(chargeSummary);
                if(this.chartsData == undefined || this.chartsData.length == 0){

                    if(this.chartsType == 'pie'){
                        // this.chargeSummaryChart.setOption(this.chargeSummaryChartOption); //今日收费汇总
                    }
                    else if(this.chartsType == 'bar'){
                        this.chargeSummaryChart.setOption(this.topParkChartOption); //今日收费排行
                    }
                    else if(this.chartsType == 'line'){
                        this.chargeSummaryChart.setOption(this.berthChartOption); //泊位使用率
                    }
                }
            }
        },
        watch:{
            chartsData:{
                handler(newVal,oldVal){
                        if(this.chartsType == 'pie'){
                            this.chargeSummaryChart.setOption(this.chargeSummaryChartOption); //今日收费汇总
                        }
                        else if(this.chartsType == 'bar'){
                            this.chargeSummaryChart.setOption(this.topParkChartOption); //今日收费车场排行
                        }
                        else if(this.chartsType == 'line'){
                            this.chargeSummaryChart.setOption(this.berthChartOption); //泊位使用率
                        }
                },
                deep:true
            },
        }
    };

</script>

<style lang="scss" src="../styles/Home.scss" scoped>

</style>