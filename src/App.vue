<template lang="">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-5 col-md-5 col-sm-10">
        <calendar-part></calendar-part>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-10">
    <todo-list-part  @changeReloadKey="changeKey" :key="key"></todo-list-part>
  </div>
    </div>
  </div>
  <div>
    
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