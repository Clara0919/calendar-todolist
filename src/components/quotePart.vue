<template lang="">
    <div class="quoteBox">
    
    <p class="getSelectDate"><i class="fa-regular fa-calendar"></i> {{getSelectDate}}</p> 
    <!-- 顯示選擇的日期 -->
   
    <p class="todayQuote" :class="getTodayQuote.length>80?'smallQuote':''"> <i class="fa-solid fa-quote-left quote-icon"></i>{{getTodayQuote}} <i class="fa-solid fa-quote-right quote-icon"></i></p>

  </div>
</template>
<script>
export default {
  data() {
    return {
      randomNum: 0,
    };
  },
  watch: {
    //監測getSelectDate，如果日期改變的話，改變隨機數
    getSelectDate: function () {
      console.log("日期變了");
      this.randomNum = Math.floor(Math.random() * 1642 + 1);
      console.log("隨機數測試", this.randomNum);
    },
  },
  computed: {
    getSelectDate() {
      let selectDate = this.$store.state.pickDate; //從vuex中取出選擇的日期
      return selectDate;
    },

    getTodayQuote() {
      console.log(
        "測試getTodayQuote",
        this.$store.getters.getQuotesData[this.randomNum]
      );
      if (this.$store.getters.getQuotesData[this.randomNum]) {
        //如果這筆資料存在的話，去拿裡面的text(text 是 key)
        return this.$store.getters.getQuotesData[this.randomNum].text;
      } else {
        console.log("..."); //跑出來之前先放個...
        return "...";
      }
    },
  },
  created() {
    this.$store.dispatch("fetchQuotes"); //呼叫 actions 用 dispatch
  },
};
</script>
<style >
.quoteBox {
  text-align: center;
  margin: 40px 0px 20px 0px;
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
  font-size: 33px;
  margin: 10px 0 20px 0;
  padding: 20px 25px;
}

.smallQuote {
  font-size: 28px;
}

@media (max-width: 576px) {
  .todayQuote {
    margin-top: 5px;
    padding: 10px 25px 0 25px;
  }
}
</style>