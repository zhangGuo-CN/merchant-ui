<template>
  <div class="switchButton">
    <el-radio-group v-model="tabPosition" @change="handleChange">
      <el-radio-button
        v-for="item in config"
        :key="item.value"
        :label="item.value"
        >{{ item.label }}</el-radio-button
      >
    </el-radio-group>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script>
export default {
  name: "switchButton",
  props: {
    config: Array,
  },
  data() {
    return {
      tabPosition: "",
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("clickCb", value);
    },
    reset(dom) {
      this.tabPosition = "";
    },
  },
};
</script>

<style >
.switchButton .el-radio-group,
.switchButton .el-radio-button .el-radio-button__inner {
  background-color: #e1d8d8;
  border-radius: 22px;
}
.switchButton .el-radio-button.is-active .el-radio-button__inner {
  background-color: #af3131;
}
.switchButton .el-radio-button.is-active.is-focus {
  outline: none;
}
</style>
