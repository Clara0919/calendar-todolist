import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    nowDate:"",
    pickDate:"",
    // reloadKey:0,
    todoList: [
      // {
      //   todoDate: "2022-11-01",
      //   todo: [
      //     { id: 1, task: "早上餵Boba", done: true },
      //     {
      //       id: 2,
      //       task: "洗衣服",
      //       done: false,
      //     },
      //   ],
      // },
      // {
      //   todoDate: "2022-11-02",
      //   todo: [
      //     { id: 1, task: "買午餐", done: true },
      //     {
      //       id: 2,
      //       task: "家樂福買雞腿",
      //       done: false,
      //     },
      //   ],
      // },
    ],
  },

  getters: {
    //可以把 state 丟出去的給其他地方使用
   
    getTodoList:state=>{
      return state.todoList
    },
    // getDate:state=>state.date
 
  },
  mutations: {
    //同步
    //可以處理 state 中的資訊
    setCurrentDate(state,now){  //拿現在日期
     state.nowDate=now   //now 從 calendarPart 傳遞過來
     console.log(state.nowDate)
    },

    getPickDate(state,pick){ //拿選擇的日期
      state.pickDate=pick
      console.log(state.pickDate)
    },

    // changeReloadKey(state){
    //   state.reloadKey+=1
    //   console.log('reloadKey成功+1',state.reloadKey)
    // }
   
  },
  actions: {
    //異步
    //用來呼叫 mutations 去處理 state
  },
  modules: {},
})

export default store;
