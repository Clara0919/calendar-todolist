<template lang="">
  <!-- <v-calendar /> -->
 <v-date-picker v-model="pickDate"  :model-config="modelConfig" />
 {{pickDate}}
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

    this.nowDate = year + "-" + month + "-" + day;
    return this.$store.commit("setCurrentDate", this.nowDate);
  },
  updated() {
    return this.$store.commit("getPickDate", this.pickDate);
  },
};
</script>
<style lang="">
</style>
