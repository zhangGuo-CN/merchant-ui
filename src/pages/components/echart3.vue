<template>
  <div id="echart3"></div>
</template>

<script>
export default {
  name: "echart3",
  props: {
    channelData: Object,
  },
  data() {
    return {
      myChart: null,
      // number: [[10, 20, 10, 60], [20], [15], [20, 22, 13]],
      positionMap: [
        ["YE", "ZZ", "SM", "WG"],
        ["SK"],
        ["SZHB"],
        ["WX", "ZFB", "YL"],
      ],
      colorTypes: [
        "#7b9ce1",
        "#bd6d6c",
        "#75d874",
        "#e0bc78",
        "#dc77dc",
        "#72b362",
      ],
      categories: ["categoryA", "categoryB", "categoryC", "categoryD"],
      seriesData: [],
      options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: function (datas) {
            //总数取最后一个对象的第三位
            let total = datas[datas.length - 1].value[3];
            // 标题
            let res = datas[0].name + "<br/>";

            for (let i = datas.length - 1; i >= 0; i--) {
              // 取值永远取第四位，下标为3
              let val = datas[i].value[3];
              let percentage = (val / total).toString() + "%";
              console.log("val", val);
              console.log("total", total);
              console.log("percentage", percentage);
              res += datas[i].name + "：" + percentage + val + "<br/>";
            }
            console.log(datas);
            return res;
          },
        },
        xAxis: {
          axisLabel: {
            formatter: function (val) {
              return " ms";
            },
          },
        },
        yAxis: {
          data: ["categoryA", "categoryB", "categoryC", "categoryD"],
        },
        series: [
          {
            type: "custom",
            renderItem: this.renderItem,
            encode: {
              x: [1, 2],
              y: 0,
            },
            data: [],
          },
        ],
      },
    };
  },
  watch: {
    channelData: function (val) {
      console.log("入参变了", this.channelData);
      this.customData();
      this.myChart.setOption(this.options);
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("echart3"));
    this.customData();
    this.myChart.setOption(this.options);
  },
  methods: {
    customData() {
      let data = [];
      let yCategories = this.options.yAxis.data;
      var startTime = 0;

      yCategories.forEach((category, index) => {
        var baseValue = 0;
        for (var i = 0; i < this.positionMap[index].length; i++) {
          let name = this.positionMap[index][i];
          console.log("name", name);
          var value = Number(this.channelData[name]);
          console.log("value", value);

          data.push({
            name: name,
            //这四个数字，在悬浮展示时，还会用作计算
            //缺一不可！！
            value: [index, baseValue, baseValue + value, value],
            itemStyle: {
              normal: {
                color: this.colorTypes[i],
              },
            },
          });
          console.log(index, baseValue, baseValue + value, value);
          baseValue += value;
        }
      });
      this.options.series[0].data = data;
      console.log("seriesData", this.options.series[0]);
    },
    renderItem(params, api) {
      var categoryIndex = api.value(0);
      var start = api.coord([api.value(1), categoryIndex]);
      var end = api.coord([api.value(2), categoryIndex]);
      var height = api.size([0, 1])[1] * 0.6;
      var rectShape = this.$echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height,
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height,
        }
      );
      return (
        rectShape && {
          type: "rect",
          transition: ["shape"],
          shape: rectShape,
          style: api.style(),
        }
      );
    },
  },
};
</script>

<style scoped>
#echart3 {
  width: 800px;
  height: 600px;
  background-color: white;
}
</style>
