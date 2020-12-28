<template>
  <div class="bar">
    <div class="bar_context" v-for="(item, index) in list" :key="item.name">
      <!-- 条状图 label -->
      <div class="bar_titel">
        <span>{{ item.name }}:</span>
        <!-- 起始点控制按钮 -->
        <div class="start_regulator">
          <a
            class="reduce"
            href="javascript:void(0);"
            @click="calculate('reduce', index, 'start')"
          >
            -
          </a>
          <a href="javascript:void(0);"> {{ item.start }} </a>
          <a
            class="add"
            href="javascript:void(0);"
            @click="calculate('add', index, 'start')"
          >
            +
          </a>
        </div>

        <!-- 结束点控制按钮 -->
        <div class="end_regulator">
          <a
            class="reduce"
            @click="calculate('reduce', index, 'end')"
            href="javascript:void(0);"
          >
            -
          </a>
          <a href="javascript:void(0);">{{ item.end }}</a>
          <a
            class="add"
            @click="calculate('add', index, 'end')"
            href="javascript:void(0);"
            >+</a
          >
          <!-- <input
            type="text"
            v-model="item.end"
            @input="format(index, 'end', $event)"
          /> -->
        </div>
      </div>

      <!-- 条状图 色块 与 说明 -->
      <div
        class="bar_body"
        :style="`left: ${
          (item.start - start) * (width / (end - start))
        }px;  width: ${(item.end - item.start) * (width / (end - start))}px;`"
      >
        {{ item.end - item.start }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bar",
  props: {
    list: Array,
    scaleOption: {
      end: Number,
      width: Number,
      start: Number,
      setp: Number,
    },
  },
  created() {
    this.end = this.scaleOption.end;
    this.start = this.scaleOption.start;
    this.width = this.scaleOption.width;
    this.setp = this.scaleOption.setp;
  },
  methods: {
    /**计算 条形图端点值  (this.list[index][ori] 为输入参数表达式)*/
    calculate(fun, index, ori) {
      let { start, end } = this.list[index],
        setp = this.setp,
        executable;
      console.log(setp);
      // 端点右移
      if (
        fun === "add" &&
        ((ori === "start" && start < end) || (ori === "end" && end < this.end))
      ) {
        executable = function (index) {
          this.list[index][ori] += this.setp;
          this.format(index, ori);
        };
      } // 端点左移
      else if (
        fun === "reduce" &&
        ((ori === "start" && start > this.start) ||
          (ori === "end" && end > start))
      ) {
        executable = function (index) {
          this.list[index][ori] -= this.setp;
          this.format(index, ori);
        };
      } else {
        return;
      }
      return executable.call(this, index);
    },
    format(index, ori) {
      let { start, end } = this.list[index],
        _start = 0 + start,
        _end = 0 + end;
      /*范围限定*/
      if (ori === "end") {
        if (_end > this.end) {
          this.list[index].end = this.end;
        } else if (_end <= _start) {
          this.list[index].end = start;
        }
      } else if (ori === "start") {
        if (start < this.start) {
          this.list[index].start = this.start;
        } else if (start >= end) {
          this.list[index].start = end;
        }
      }
      this.decimal(index, ori);
    },
    /*精度限定*/
    decimal(index, ori) {
      if ((this.list[index][ori] + "").split(".")[1]?.length >= 1) {
        this.list[index].start = parseFloat(
          (+this.list[index].start).toFixed(1)
        );
        this.list[index].end = parseFloat((+this.list[index].end).toFixed(1));
      }
    },
  },
};
</script>

<style scoped>
.bar {
  margin: 0 0 0 350px;
}
.bar_context {
  display: flex;
  position: relative;
  margin: 20px 0;
  height: 20px;
}
.bar_titel {
  position: absolute;
  left: -200px;
  width: 200px;
  display: flex;
  justify-content: space-evenly;
}
.bar_titel input {
  outline: none;
  border: none;
  width: 20px;
}
.bar_body {
  position: absolute;
  background-color: aqua;
  text-align: center;
  border-radius: 5px;
}
.start_regulator {
  color: #333;
  padding: 0;
  position: relative;
}
.end_regulator:hover .reduce,
.end_regulator:hover .add,
.start_regulator:hover .reduce,
.start_regulator:hover .add {
  opacity: 1;
  cursor: pointer;
}
.start_regulator input {
  display: inline-block;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
}
button {
  display: inline-block;
}
.reduce,
.add {
  opacity: 0;
}
.start_regulator a,
.end_regulator a {
  text-decoration: none;
  color: #333;
}
</style>