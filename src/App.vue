<template lang="">
  <div>
    <calendar-part></calendar-part>
  </div>
  <div>
    <todo-list-part></todo-list-part>
  </div>
</template>
<script>
import calendarPart from "../src/components/calendarPart.vue";
import todoListPart from "../src/components/todoListPart.vue";

export default {
  components: { calendarPart, todoListPart },
};
</script>
<style lang="">
</style>