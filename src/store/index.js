import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    nowDate:"",
    pickDate:"",
    quotes:[],
  },

  getters: {
    //可以把 state 丟出去的給其他地方使用
    getQuotesData:state=>state.quotes,
    getDate:state=>state.date
 
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

    getQuotesData(state,data){  //把從 actions commit 過來的 data 存進 quotes 裡
      state.quotes=data  
      console.log('getQuotesData',state.quotes)
      // .map(quote=>{
      //   return {
      //     text:quote.id,
      //     author:quote.author
      //   }
      // })
    }

    
   
  },
  actions: {
    //異步
    //用來呼叫 mutations 去處理 state
    fetchQuotes({ commit }){fetch("https://type.fit/api/quotes")  //commit 一個 mutation
      .then(function (response) {  
        return response.json();// read and parse the data using json()
      })
      .then(function (data) {
        console.log(data);
        commit('getQuotesData',data)
      }).catch(error => {
        console.log(error);
      });}
  },
  modules: {},
})

export default store;
