<template lang="">
  <!-- 新增任務 -->
  <div><h1>Clara's TodoList</h1></div>
  <div>
    <!-- <p>日期：{{date}}</p> -->
    <form @submit.prevent="addNewTask">
      <!--  -->
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">任務</span>
        <input
          type="text"
          class="form-control"
          placeholder="請填寫任務內容"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model.trim="taskName"
          
        />
        <button type="submit" class="btn btn-primary" >新增</button>
      </div>
    </form>
  </div>
  
  <!-- 檢視任務 -->
  <div>
    <ul class="list-group">
        <!-- <template  v-for="item in todoList">  -->
          <!-- 分別取出每日的任務清單(一天是一組) -->
        <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="mission in filterTodo"
        :key="mission.taskName"  
      > 
      <!-- mission.id -->
      <!-- 從當日取出每個待辦事項 -->
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            v-model="mission.done"
          />
          <!-- :id="mission.id"  -->
          
          <!-- 這邊只需要使用 v-model 而不用再處理 emit 是因為 array 是複雜屬性 傳址而非傳值（非複製一份資料）所以可以直接修改到原資料 -->
          <!-- id="flexCheckDefault" -->
          <label
            class="form-check-label"
            :class="{ delete: mission.done }"
            ><!-- for="flexCheckDefault" :for="item.todo.id" -->
            <!-- :class="item.done?'delete':''" -->
            {{ mission.task }}
          </label>
        </div>
        <span class="badge bg-success rounded-pill" v-if="mission.done"
          >已完成</span
        >
        <span class="badge bg-warning rounded-pill" v-else>未完成</span>
      </li>
           
        <!-- </template> -->
     
    </ul>
  </div>

  <!-- 篩選任務 -->
  <!-- <div class="btn-group mt-3" role="group" aria-label="Basic example">
    <button
      type="button"
      class="btn"
      :class="activeCode === 0 ? 'btn-primary' : 'btn-secondary'"
      @click="btnClick(0)"
    >
      全部
    </button>
    <button
      type="button"
      class="btn"
      :class="activeCode === 1 ? 'btn-primary' : 'btn-secondary'"
      @click="btnClick(1)"
    >
      已完成
    </button>
    <button
      type="button"
      class="btn"
      :class="activeCode === 2 ? 'btn-primary' : 'btn-secondary'"
      @click="btnClick(2)"
    >
      未完成
    </button>
  </div> -->
</template>
<script>
import { mapGetters } from "vuex"; //, mapActions
export default {
  data() {
    return {
      activeCode: 0,
      taskName: "",
      getTodo: [],
    };
  },

  emits: ["changeReloadKey"],

  computed: {
    filterTodo() {
      let selectDate = this.$store.state.pickDate;
      return JSON.parse(localStorage.getItem(selectDate));
    },
    ...mapGetters({
      //...是展開運算符
      //mapGetters 用來把 this.$store.getters.getTask 映射成 getTask
      todoList: "getTodoList",
      // date: "getDate",
    }),
  },

  methods: {
    addNewTask() {
      if (this.taskName == "") {
        return alert("任務欄位不得為空");
      } else {
        let selectDate = this.$store.state.pickDate;
        console.log("selectDate測試", selectDate);
        if (localStorage.getItem(selectDate) !== null) {
          //localStorage.key(selectDate) == selectDate
          console.log("這筆資料已存在");
          this.getTodo = JSON.parse(localStorage.getItem(selectDate));
          this.getTodo.push({
            id: this.getTodo.length + 1,
            //因為v-for 的 key 用 taskName 所以如果任務重複的話 id 會亂掉
            task: this.taskName,
            done: false,
          });
          // console.log("getTodo 測試", this.getTodo);
          localStorage.setItem(selectDate, JSON.stringify(this.getTodo));
          return this.$emit("changeReloadKey");
        } else {
          console.log("偵測到的key", localStorage.key(selectDate));
          this.getTodo = [
            {
              id: this.getTodo.length + 1,
              task: this.taskName,
              done: false,
            },
          ]; //getTodo 如果是 null 的話 沒辦法用 push
          localStorage.setItem(selectDate, JSON.stringify(this.getTodo));
          // console.log("觸發＋＋了");
          return this.$emit("changeReloadKey");
        }

        // this.$store.commit("changeReloadKey");

        // console.log(this.$store.state.todoList);
      }
    },
    btnClick(index) {
      this.activeCode = index;
    },
    // selectTask() {
    //   switch (this.activeCode) {
    //     case 0:
    //       return this.todoList;
    //     case 1:
    //       return this.todoList.filter((x) => {
    //         x.todo.done;
    //       });
    //     case 2:
    //       return this.todoList.filter((x) => {
    //         !x.todo.done;
    //       });
    //   }
    // },
  },
};
</script>
<style scoped>
/* 新增任務 */

.input-group {
  width: 400px;
}
/* 任務列表 */
.list-group {
  width: 400px;
}

.delete {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}

/* 任務篩選按鈕 */
.btn-group {
  width: 400px;
}
</style>
