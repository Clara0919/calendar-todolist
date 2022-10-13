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
  computed: {
    ifLoading() {
      // 在這邊吐回state裡面的isLoading
      return this.$store.state.isLoading;
    },
  },
  methods: {
    reverseLoad() {
      this.$store.commit("Loaded");
    },
  },
};
</script>
<style lang="">
</style>