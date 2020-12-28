<template>
  <div class="scale">
    <div class="scale_inner">
      <scale-item class="origin" :item="start"></scale-item>
      <scale-item
        class="item"
        v-for="index in middlePoints"
        :key="index"
        :flex="`flex: 0 0 ${scaleWidth}px`"
        :item="setp * index + start"
      >
      </scale-item>
      <scale-item
        class="vertex"
        :flex="`flex: 0 0 ${(scaleWidth * remainder) / setp}px`"
        :item="end"
      ></scale-item>
    </div>
  </div>
</template>

<script>
import ScaleItem from "./ScaleItem";
export default {
  name: "Scale",
  props: { scaleOption: Object },
  created: function () {
    this.end = this.scaleOption.end;
    this.start = this.scaleOption.start;
    this.width = this.scaleOption.width;
    this.setp = this.scaleOption.setp;
  },
  computed: {
    middlePoints() {
      return Math.ceil((this.end - this.start) / this.setp) - 1;
    },
    scaleWidth() {
      let count = this.end - this.start;
      return (this.width / count) * this.setp;
    },
    remainder() {
      return (this.end - this.start) % this.setp || this.setp;
    },
  },
  components: {
    ScaleItem,
  },
};
</script>

<style scoped>
.scale_inner {
  margin: 0 0 0 350px;
  display: flex;
}
</style>