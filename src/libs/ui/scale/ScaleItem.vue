<template>
  <div class="scaleItem" :style="flex">
    <span class="mark">{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: "ScaleItem",
  props: {
    flex: String,
    item: Number,
  },
};
</script>

<style scoped>
.scaleItem {
  border-right: 1px solid #333;
  position: relative;
  height: 8px;
}
.mark {
  position: absolute;
  top: -300%;
  right: -8px;
}
</style>