<template lang="">
   <!-- <v-calendar /> -->
  <v-date-picker v-model="selectedDate" :model-config="modelConfig" is-required />
  {{selectedDate}}
</template>
<script>
import "v-calendar/dist/style.css";
export default {
  data() {
    return {
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
      selectedDate: new Date(),
    };
  },

  computed: {},
};
</script>
<style lang="">
</style>
