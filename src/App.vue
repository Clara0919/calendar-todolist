<template lang="">
  <div>
    <calendar-part></calendar-part>
  </div>
  <div>
    <todo-list-part  @changeReloadKey="changeKey" :key="key"></todo-list-part>
  </div>
</template>
<script>
import calendarPart from "../src/components/calendarPart.vue";
import todoListPart from "../src/components/todoListPart.vue";

export default {
  components: { calendarPart, todoListPart },
  data() {
    return {
      key: "",
    };
  },
  methods: {
    changeKey() {
      this.key++;
      console.log("emits成功觸發", this.key);
    },
  },
};
</script>
<style lang="">
</style>