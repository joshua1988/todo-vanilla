var todoList = {
    todos: [],
    addTodo: function(todo) {
        this.todos.push({
            todoText: todo,
            completed: false
        });
    },
    deleteAll: function() {
        this.todos = [];
        view.displayTodo();
    },
    completeAll: function () {
        for (let index = 0, length = this.todos.length; index < length; index++) {
            this.todos[index].completed = true;
        }
    },
    completeTodo: function(todo) {
        return todo.completed = !todo.completed;
    },
    displayTodo: function() {
        console.log("Todo : ", this.todos);
    },
    getId: function(todo) {
        return this.todos.indexOf(todo);
    }
};

var handler = {
    addTodo: function() {
        var todo = document.querySelector('input');
        todoList.addTodo(todo.value);
        console.log(todoList.getId(todo.value));
        // var id = todoList.todos.indexOf(todo.value);

        view.appendItem(todo.value);
        todo.value = '';
    },
    enterTodo: function(event) {
        if (event.keyCode == 13) this.addTodo();
    },
    deleteAll: function() {
        todoList.deleteAll();   
    },
    completeAll: function() {
        todoList.completeAll();
    }
};

var view = {
    displayTodo: function() {
        var ul = document.querySelector('ul');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        for (var i = 0, length = todoList.todos.length; i < length ; i++) {
            this.appendItem(todoList.todos[i]);
        }
    },
    appendItem: function (todo) {
        var li = document.createElement('li');
        li.innerHTML = todo;
        // li.id = ;

        var ul = document.querySelector('ul');
        ul.appendChild(li);
    },
    crossTodoItem: function(element) {
        // console.log(element);
        element.setAttribute('style', 'text-decoration: line-through;');
    },
    unCrossTodoItem: function(element) {
        element.setAttribute('style', 'text-decoration: none;');
    },
    attachEventListener: function() {
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function (event) {
        //    console.log(event.target.innerHTML);
        //    view.crossTodoItem(event.target);
           if (todoList.completeTodo(event.target.innerHTML)) {
               view.crossTodoItem(event.target);
           } else {
               view.unCrossTodoItem(event.target);
           }
        });
    }
}

window.onload = function() {
    view.attachEventListener();
};
