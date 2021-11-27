<template>
  <div id="echart1"></div>
</template>

<script>
export default {
  name: "echart1",
  props: {
    detailData: Object,
  },
  data() {
    return {
      options: {},
    };
  },
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("echart1"));
    myChart.setOption(this.options);
    console.log(this.options);
  },
  methods: {
    // handleChange(value) {
    //   console.log("changed", value);
    //   this.$emit("clickCb", value);
    // },
    // reset(dom) {
    //   this.tabPosition = "";
    // },
  },
};
</script>

<style scoped>
#echart1 {
  width: 500px;
  height: 600px;
  background-color: aquamarine;
}
</style>
