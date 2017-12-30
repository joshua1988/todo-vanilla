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
    deleteTodo: function(id) {
        this.todos.splice(id, 1);
    },
    completeAll: function () {
        for (let index = 0, length = this.todos.length; index < length; index++) {
            this.todos[index].completed = true;
        }
    },
    completeTodo: function(todo) {
        todo.completed = !todo.completed;
    },
    displayTodo: function() {
        console.log("Todo : ", this.todos);
    },
    getId: function(todo) {
        var a = {todoText: 1};
        return this.todos.indexOf(a);
    }
};

var handler = {
    addTodo: function() {
        var todo = document.querySelector('input');
        todoList.addTodo(todo.value);
        view.appendTodoItem(todo.value);
        todo.value = '';
    },
    enterTodo: function(event) {
        if (event.keyCode == 13) this.addTodo();
    },
    deleteAll: function() {
        todoList.deleteAll();   
    },
    deleteTodo: function(id, el) {
        todoList.deleteTodo(id);
        view.removeTodoItem(el);
    },
    completeAll: function() {
        todoList.completeAll();
    },
    completeTodo: function(todo) {
        todoList.completeTodo(todo);
    }
};

var view = {
    displayTodo: function() {
        var ul = document.querySelector('ul');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        for (var i = 0, length = todoList.todos.length; i < length ; i++) {
            this.appendTodoItem(todoList.todos[i]);
        }
    },
    appendTodoItem: function (todo) {
        var ul = document.querySelector('ul');
        ul.appendChild(this.createListElement(todo));
    },
    removeTodoItem: function(buttonEl) {
        buttonEl.parentNode.remove();
    },
    createListElement: function(todo) {
        var li = document.createElement('li');
        li.innerHTML = todo;
        li.className = todoList.todos.length;
        li.appendChild(this.createDeleteButton(todoList.todos.length-1));
        return li;
    },
    createDeleteButton: function (id) {
        var button = document.createElement('button');
        button.innerText = 'delete';
        button.onclick = function() {
            handler.deleteTodo(id, this);
        };
        return button;
    },
    crossTodoItem: function(element) {
        element.setAttribute('style', 'text-decoration: line-through;');
    },
    unCrossTodoItem: function(element) {
        element.setAttribute('style', 'text-decoration: none;');
    },
    attachEventListener: function() {
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function (event) {
            if (event.target.tagName == 'LI') {
                console.log(event.target.innerHTML);
                handler.completeTodo(event.target.innerHTML);
                
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

// todoList.completeTodo(event.target.innerHTML) && 