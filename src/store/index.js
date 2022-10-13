import { createStore } from "vuex";

const store = createStore({
  state: {
    //data
    todoList: [
      {
        date: "2022-10-13",
        todo: [
          { id: 1, task: "每天早上餵Boba", done: true },
          {
            id: 2,
            task: "每週六早上洗衣服",
            done: false,
          },
          {
            id: 3,
            task: "每天晚上打給Julien",
            done: false,
          },
        ],
      },
    ],
    modelConfig: {
      type: "string",
      mask: "YYYY-MM-DD",
    },
    selectedDate: new Date(),
  },
  getters: {
    //computed
    //Getters 簡單說就是可以把 state 處理過後再丟出去的人
    getTask(state) {
      return state.todoList;
    },
  },
  mutations: {
    Loaded(state) {
      // state的isLoading true/false 互轉
      state.isLoading = !state.isLoading;
    },
  },
  actions: {},
  modules: {},
});
export default store;
