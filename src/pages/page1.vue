<template>
  <div class="page1">
    <!-- 总搜索栏在视觉上和总览在一个框
    逻辑上不是平级的，属于父子关系 -->
    <!-- 总览 -->
    <div class="overView">
      <div class="searchBox">
        <div>营业概览</div>
        <switchButton @clickCb="handleOverView" :config="timeConfig" />
        <!-- 自定义时间 -->
      </div>
      <overView :overViewData="overViewData" />
    </div>
    <!-- 曲线图 -->
    <div class="echart1">
      <el-tabs v-model="searchData.detailType" @tab-click="handleDetail">
        <el-tab-pane label="账单金额" name="billAmount"></el-tab-pane>
        <el-tab-pane label="交易金额" name="transAmount"></el-tab-pane>
        <el-tab-pane label="营业额" name="Turnover"></el-tab-pane>
        <el-tab-pane label="实际收入" name="actualIncome"></el-tab-pane>
        <el-tab-pane label="退款金额" name="refundAmount"></el-tab-pane>
        <el-tab-pane label="交易笔数" name="NumberOfTransactions"></el-tab-pane>
      </el-tabs>
      <!-- <echart1 :detailData="detailData" /> -->
    </div>
    <!-- 并列的两个小图 -->
    <div class="smallEcharts">
      <!-- 饼图 -->
      <div class="echart2">
        <switchButton @clickCb="changedType" :config="typeConfig" />
        <!-- <echart2 :shopData="shopData" />-->
      </div>
      <!-- 堆叠图 -->
      <div class="echart3">
        <!-- 按钮值一变，直接发请求，改变数据
        不必在监听器中处理 -->
        <switchButton @clickCb="changedType" :config="typeConfig" />
        <echart3 :channelData="channelData" />
      </div>
    </div>
  </div>
</template>

<script>
import overViewData from "./overViewData.json";
import channelData from "./channelData.json";
import switchButton from "./components/switchButton.vue";
import overView from "./components/overView.vue";
import echart3 from "./components/echart3.vue";
export default {
  name: "",
  components: {
    switchButton,
    overView,
    echart3,
  },
  data() {
    return {
      timeConfig: [
        {
          value: "today",
          label: "今日",
        },
        {
          value: "yesterday",
          label: "昨日",
        },
        {
          value: "lastMonth",
          label: "近一月",
        },
      ],
      typeConfig: [
        {
          value: "total",
          label: "营业额",
        },
        {
          value: "amount",
          label: "交易笔数",
        },
      ],
      // 请求的参数
      searchData: {
        time: "today", //'今日', '昨日', '近一月'
        timeRange: [],
        detailType: "billAmount", //'账单金额', '交易金额', '营业额', '实际收入', '退款金额', '交易笔数'
        type: "total", //'营业额', '交易笔数'
      },
      //传入组件的数据
      overViewData: {},
      detailData: {},
      shopData: {},
      channelData: {},
    };
  },
  watch: {
    "searchData.time": function (val) {
      console.log("time", this.searchData.time);
    },
    "searchData.type": function (val) {
      console.log("type", this.searchData.type);
    },
    "searchData.timeRange": function (val) {
      console.log("timeRange", this.searchData.timeRange);
    },
    "searchData.detailType": function (val) {
      console.log("detailType", this.searchData.detailType);
    },
  },
  mounted() {
    this.changedType();
  },
  methods: {
    handleOverView(value) {
      // 先改变数据
      this.searchData.time = value;
      // 再发请求
      if (this.searchData.time == "today") {
        this.overViewData = overViewData["data1"];
      } else {
        this.overViewData = overViewData["data2"];
      }
      console.log(this.overViewData);
    },
    handleDetail(tab, event) {
      // console.log(tab, event);
      // 改回调中不用赋值操作
      // 直接请求数据
    },
    changedType(value) {
      console.log("changedType回调");
      this.searchData.type = value;
      // 再发请求
      if (this.searchData.type == "total") {
        this.channelData = channelData["data1"];
      } else {
        this.channelData = channelData["data2"];
      }
    },
  },
};
</script>

<style scoped>
.searchBox > div {
  display: inline-block;
}
.page1 .smallEcharts {
  display: flex;
  justify-content: center;
}
</style>
