(function () {
  "use strict";

  let likeComponent = Vue.extend({
    props : {
      message : {
        type : String,
        default : "Like"
      }
    },
    data : function() {
      return {
        count : 0
      }
    },
    template : "<button @click='countUp'>{{count}}{{message}}</button>",
    methods : {
      countUp : function(){
        this.count++;
        this.$emit("increment");
      }
    }
  });

  let app = new Vue({
    el : "#app",
    components : {
      "like-component" : likeComponent
    },
    data : {
      total : 0
    },
    methods : {
      incrementTotal : function(){
        this.total++;
      }
    }
  });
})();
