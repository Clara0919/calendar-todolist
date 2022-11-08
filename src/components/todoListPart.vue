<template lang="" >
  <!-- <div class="quoteBox">
    
    <p class="getSelectDate"><i class="fa-regular fa-calendar"></i> {{getSelectDate}}</p>
   
    <p class="todayQuote"> <i class="fa-solid fa-quote-left quote-icon"></i>{{getTodayQuote}} <i class="fa-solid fa-quote-right quote-icon"></i></p>
   
    
  </div> -->
  <div>
    <h1>Todo List</h1>
  </div>
  <!-- 檢視任務 -->
  <div> 
    <ul class="list-group">

      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="mission in filterTodo"
        :key="mission.task"
      >
      
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            v-model="mission.done"
            @click="missionStatus(mission.task)"
          />
          <!-- :id="mission.id"   -->

          <!-- 這邊只需要使用 v-model 而不用再處理 emit 是因為 array 是複雜屬性 傳址而非傳值（非複製一份資料）所以可以直接修改到原資料 -->
          <!-- id="flexCheckDefault" -->
          <label class="form-check-label" :class="{ delete: mission.done }"
            ><!-- for="flexCheckDefault" :for="item.todo.id" -->
            <!-- :class="item.done?'delete':''" -->
            {{ mission.task }}
          </label>
        </div>
        <span class="badge finished rounded-pill" v-if="mission.done"
          >已完成</span
        >
        <span class="badge unfinish rounded-pill" v-else>未完成</span>
      </li>
          <!-- 新增任務 -->
      <li>
        <form @submit.prevent="addNewTask">
          <div class="input-group mb-3">
            <button type="submit" class="btn "><span>＋</span></button>
            <!-- <span class="input-group-text" id="basic-addon1">任務</span> -->
            <input
              type="text"
              class="form-control"
              placeholder="新增待辦事項"
            
              aria-describedby="basic-addon1"
              v-model.trim="taskName"
            />
          </div>
        </form>
      </li>
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
// import { mapGetters } from "vuex"; //, mapActions
export default {
  data() {
    return {
      activeCode: 0,
      taskName: "",
      getTodo: [],
      // getQuote: [],
      // randomNum: 0,
      // todayQuote: "",
    };
  },

  watch: {
    getSelectDate: function () {
      console.log("日期變了");
      this.randomNum = Math.floor(Math.random() * 1642 + 1);
      console.log("隨機數測試", this.randomNum);
    },
  },

  emits: ["changeReloadKey"],

  computed: {
    filterTodo() {
      let selectDate = this.$store.state.pickDate;
      return JSON.parse(localStorage.getItem(selectDate));
    },

    // getSelectDate() {
    //   let selectDate = this.$store.state.pickDate;
    //   return selectDate;
    // },

    // getTodayQuote() {
    //   // let randomNum = Math.floor(Math.random() * 1642 + 1);
    //   // console.log("隨機數測試", randomNum);
    //   console.log(
    //     "測試getTodayQuote",
    //     this.$store.getters.getQuotesData[this.randomNum]
    //   );
    //   if (this.$store.getters.getQuotesData[this.randomNum]) {
    //     return this.$store.getters.getQuotesData[this.randomNum].text;
    //   } else {
    //     console.log("...");
    //     return "...";
    //   }
    // },

    // ...mapGetters({
    //   //...是展開運算符
    //   //mapGetters 用來把 this.$store.getters.getQuotesData 映射成 getQuote
    //   // getQuote: "getQuotesData",
    //   getSelectDate: "getDate",
    // }),
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
      }
    },
    missionStatus(taskName) {
      let selectDate = this.$store.state.pickDate;
      console.log(taskName);
      console.log(this.filterTodo);
      setTimeout(() => {
        localStorage.setItem(selectDate, JSON.stringify(this.filterTodo)), 500;
      });
      setTimeout(() => {
        this.$emit("changeReloadKey"), 1000;
      });
      console.log("更新成功");
      // return ;
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
  // created() {
  //   this.$store.dispatch("fetchQuotes");
  // },
  // mounted() {
  // this.randomNum = Math.floor(Math.random() * 1642 + 1);
  // console.log("隨機數測試", this.randomNum);
  // this.todayQuote = this.getQuote[this.randomNum];
  // console.log("getQuote 測試", this.getQuote);
  // console.log("todayQuote 測試", this.todayQuote);
  //   return;
  // },
  // updated() {},
};
</script>
<style>
/* .quoteBox {
  text-align: center;
  margin: 20px 0px;
}

.fa-calendar {
  margin-right: 10px;
}

.getSelectDate {
  font-weight: 700;
  font-size: 18px;
  margin: 0;
}

.quote-icon {
  margin: 10px;
  position: relative;
  top: -10px;
  font-size: 20px;
  color: var(--main-color-1);
}

.todayQuote {
  font-family: "Amatic SC", cursive;
  font-family: "Amatic SC", cursive;
  font-weight: 700;
  font-size: 35px;
  margin: 10px 0 20px 0;
  padding: 20px 25px;
} */
/* todo list */

h1 {
  text-align: center;
  font-size: 30px;
  margin: 20px;
  color: white;
}

.list-group {
  margin: 0 20px;
}

li {
  list-style: none;
}

.btn {
  background-color: white;
  border-top-left-radius: 0;
  border: 1px solid #ced4da;
  border-right: none;
}
button:focus {
  outline: none;
  box-shadow: none;
}

input:focus {
  outline: none;
  box-shadow: none;
  border-color: #ced4da;
  border-left: none;
}

.form-control {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.finished {
  background: var(--main-color-2);
}

.unfinish {
  background: var(--main-color-3);
}
.delete {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}

/* 任務篩選按鈕 */
/* .btn-group {
  width: 400px;
} */
</style>
