<template lang="">
  <div class="container-fluid">
    <div class="row page">
      <div class="col-lg-5 col-md-5 col-sm-10 order-lg-1 order-md-1 order-sm-2  order-2 todoList ">
        <div> <quotePart></quotePart>
        <todo-list-part
          @changeReloadKey="changeKey"
          :key="key"
        ></todo-list-part></div>
       
      </div>
      <div class="col-lg-7 col-md-7 col-sm-10 order-lg-2 order-md-2 order-sm-1  order-1 calendar ">
        <calendar-part class="calendar-part"></calendar-part>
      </div>
    </div>
  </div>
  <div></div>
</template>
<script>
import calendarPart from "../src/components/calendarPart.vue";
import todoListPart from "../src/components/todoListPart.vue";
import quotePart from "./components/quotePart.vue";

export default {
  components: { calendarPart, todoListPart, quotePart },
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
<style>
/* * {
  outline: red solid 1px;
} */
:root {
  --main-color-1: #6667aa;
  --main-color-2: #878fc6;
  --main-color-3: #c3a9b4;
}
.page {
  margin: 30px 20px;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.45);
  -webkit-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.45);
  border-radius: 10px;

  display: flex;
  justify-content: center;
}

.todoList {
  background-color: var(--main-color-2);
  border-radius: 10px 0 0 10px;
}

.todo-list-part {
  margin: auto;
}
.calendar {
  /* background-color: aliceblue; */
  border-radius: 0px 10px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0 30px; */
}

.calendar-part {
  max-width: 100%;
}
@media (max-width: 576px) {
  .calendar {
    border-radius: 10px 10px 0px 0px;
  }
  .todoList {
    border-radius: 0px 0 10px 10px;
  }
}
</style>
