<template lang="">
  <!-- <v-calendar /> -->
 <v-date-picker v-model="pickDate"  :model-config="modelConfig" />
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
<style lang="">
</style>
