(function () {
  "use strict";

  let vm = new Vue({
    el: "#app",
    data: {
      newItem: "",
      todos: [{
        title: "task1",
        isDone: false
      },
      {
        title: "task2",
        isDone: false
      },
      {
        title: "task3",
        isDone: true
      }
      ]
    },
    methods: {
      addItem: function() {
        let item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = "";
      },
      deleteItem: function(index) {
        if(confirm("Are you sure?")){
          this.todos.splice(index, 1);
        }

      },
    }
  });

})();
