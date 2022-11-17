<template lang="" >
  <div>
    <h1>To-Do List</h1>
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
            @click="missionStatus()"
          />
          <!-- 這邊只需要使用 v-model 而不用再處理 emit 是因為 array 是複雜屬性 傳址而非傳值（非複製一份資料）所以可以直接修改到原資料 -->

          <label class="form-check-label" :class="{ delete: mission.done }"
            ><!-- for="flexCheckDefault" :for="item.todo.id" -->
            <!-- :class="item.done?'delete':''" -->
            {{ mission.task }}
          </label>
        </div>
        <div class="missionStatus">
          <span class="badge finished rounded-pill" v-if="mission.done"
          >已完成</span
        >
        <span class="badge unfinish rounded-pill" v-else>未完成</span>
      </div>
      <div> <i class="fa-solid fa-xmark" @click='remove(mission.task)'></i></div>
       
        
       
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

</template>
<script>
export default {
  data() {
    return {
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
  },

  methods: {
    addNewTask() {
      if (this.taskName == "") {
        return alert("待辦事項不得空白");
      } else {
        let selectDate = this.$store.state.pickDate;
        console.log("selectDate測試", selectDate);
        if (localStorage.getItem(selectDate) !== null) {
          console.log("這筆資料已存在");
          this.getTodo = JSON.parse(localStorage.getItem(selectDate));
          this.getTodo.push({
            id: this.getTodo.length + 1,
            //因為v-for 的 key 用 taskName 所以如果任務重複的話 id 會亂掉
            task: this.taskName,
            done: false,
          });
          localStorage.setItem(selectDate, JSON.stringify(this.getTodo));
          return this.$emit("changeReloadKey"); //reload this component
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
          return this.$emit("changeReloadKey"); //reload this component
        }
      }
    },
    missionStatus() {
      let selectDate = this.$store.state.pickDate;
      // mission.done被改成 true 所以要重新存到 localStorage 裡
      setTimeout(() => {
        localStorage.setItem(selectDate, JSON.stringify(this.filterTodo)), 500;
      });
      setTimeout(() => {
        this.$emit("changeReloadKey"), 1000;
      });
      // console.log("更新成功");
      // return ;
    },
    remove(task) {
      let selectDate = this.$store.state.pickDate;
      // console.log("測試 task", task);
      this.getTodo = JSON.parse(localStorage.getItem(selectDate)); //先把資料拿出來
      // console.log("測試 this.getTodo", this.getTodo);
      const index = this.getTodo.findIndex((x) => x.task === task); //找到那筆資料的index
      // console.log("測試index", index);
      if (index > -1) {
        // 只有有找到才繼續執行
        this.getTodo.splice(index, 1); // 第二個參數代表刪除一筆
      }
      // console.log(this.getTodo);
      localStorage.setItem(selectDate, JSON.stringify(this.getTodo));
      setTimeout(() => {
        this.$emit("changeReloadKey"), 1000;
      });
      console.log("更新成功");
    },
  },
};
</script>
<style>
h1 {
  text-align: center;
  font-size: 30px;
  margin: 20px;
  color: white;
}

.list-group {
  margin: 0 20px 20px 20px;
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
  box-shadow: none !important;
}

input:focus {
  outline: none;
  box-shadow: none !important;

  border: 1px solid #ced4da !important;
  border-left: none !important;
}

.form-control {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* checkbox color */
.form-check-input:checked {
  border-color: var(--main-color-1);
  background-color: var(--main-color-1);
}

.missionStatus {
  margin: auto 10px auto auto;
}

.finished {
  background: var(--main-color-2);
  text-align: center;
  display: block;
}

.unfinish {
  background: var(--main-color-3);
  text-align: center;
  display: block;
}

.delete {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}

@media (max-width: 576px) {
  h1 {
    margin: 0px 20px 20px;
  }
  .list-group {
    margin: 0 0 30px 0px;
  }
}

/* 任務篩選按鈕 */
/* .btn-group {
  width: 400px;
} */
</style>
