<template>
  <div id="app">
    <div class="gantt_box">
      <!-- 刻度 -->
      <scale :scaleOption="scaleOption"></scale>
      <!-- 进度条 -->
      <bar :list="list" :scaleOption="scaleOption"></bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      end: 31,
      start: 0,
      setp: 5,
      ganttWidth: 800,
      scaleOption: {
        end: 31,
        start: 0,
        setp: 5,
        width: 800,
      },
      list: [
        {
          start: 2,
          end: 12,
          name: "css",
          discipter: "css",
        },
        {
          start: 0,
          end: 24,
          name: "html",
          discipter: "html",
        },
        {
          start: 15,
          end: 30,
          name: "javascript",
          discipter: "javascript",
        },
      ],
    };
  },
};
</script>

<style>
@import url("./assets/css/common.css");
.gantt_box {
  margin: 40px;
}
</style>
