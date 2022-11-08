<template lang="">
  <!-- <v-calendar /> -->
 <v-date-picker v-model="pickDate"  :model-config="modelConfig" class="v-calendar" color="purple" />
 <!-- {{pickDate}} -->
</template>
<script>
import "v-calendar/dist/style.css";
export default {
  data() {
    return {
      nowDate: "",
      pickDate: "",
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
    };
  },

  mounted() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    month = month - 9 > 0 ? month : "0" + month;
    let day = new Date().getDate();
    day = day - 9 > 0 ? day : "0" + day;

    this.pickDate = year + "-" + month + "-" + day; //原本這裡是nowDate 但因為上面v-model的是pickDate 為了讓畫面一進來會顯是現在的日期，所以這裡改成pickDate
    return this.$store.commit("setCurrentDate", this.pickDate);
  },
  updated() {
    return this.$store.commit("getPickDate", this.pickDate);
  },

  computed: {},
};
</script>
<style>
.v-calendar {
  border: none;
  margin: 0px !important;
  font-size: 20px;
  max-width: 100%;
}

/* 調整最上面那一條 */
.vc-header {
  padding: 50px;
}

/* 調整月份 */
.vc-title {
  font-size: 35px;
}

/* 調整選擇月份的左右箭頭 */
.vc-svg-icon {
  margin: 40px 0;
}

/* 調整星期幾 */
.vc-weekday {
  border-bottom: 1px solid var(--main-color-1);
  font-size: 20px;
  padding: 20px 0;
  color: var(--main-color-1);
  margin-bottom: 20px;
}

/* 調整日期數字 */
.vc-day-content {
  font-size: 17px;
  margin: 20px;
}

@media (max-width: 1076px) {
  .vc-day-content {
    margin: 10px;
  }
}
@media (max-width: 400px) {
  .vc-day-content {
    margin: 0px;
  }
}
</style>
