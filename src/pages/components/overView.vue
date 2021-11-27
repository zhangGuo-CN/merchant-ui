<template>
  <div class="overView">
    <div class="showBox">
      <!-- 账单金额 -->
      <div class="box1">
        <div class="title">账单金额(元)</div>
        <div class="number">{{ overViewData.billAmount }}</div>
        <div class="remark"></div>
      </div>
      <!-- 交易金额 -->
      <div class="box2">
        <div class="title">交易金额(元)</div>
        <div class="number">{{ overViewData.transAmount }}</div>
        <div class="remark">交易金额=账单金额+优惠金额</div>
      </div>
      <!-- 营业额 -->
      <div class="box2">
        <div class="title">营业额(元)</div>
        <div class="number">{{ overViewData.Turnover }}</div>
        <div class="remark">营业额=交易金额-退款金额</div>
      </div>
      <!-- 实际收入 -->
      <div class="box2">
        <div class="title">实际收入(元)</div>
        <div class="number">{{ overViewData.actualIncome }}</div>
        <div class="remark">实际收入=营业额-手续费</div>
      </div>
    </div>
    <div class="tip"></div>
  </div>
</template>

<script>
export default {
  name: "overView",
  props: {
    overViewData: Object,
  },
  data() {
    return {
      // tabPosition: "",
    };
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
.overView {
  background-color: darkgray;
}
.overView .showBox {
  display: flex;
  justify-content: center;
}
.overView .showBox > div {
  width: 25%;
  margin-left: 12px;
  text-align: left;
  padding-left: 5%;
  background-color: darkolivegreen;
}
.overView .showBox > div:last-child {
  margin-right: 12px;
}
</style>
