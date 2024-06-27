document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    function renderTodos(){
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {

            const li = document.createElement('li');
            li.textContent = todo.text;
            li.classList.toggle('finished', todo.finished);

            const smallText = document.createElement('small');
            smallText.textContent = todo.date;


            const finishButton = document.createElement('button'); 
            finishButton.textContent = "Finish";
            finishButton.className = 'finishButton';
            finishButton.addEventListener('click', ()=>{ finishTask(index); })

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = "deleteButton";
            deleteButton.addEventListener('click', ()=>{ deleteTask(index); });

            const buttonContainer = document.createElement('div');
            buttonContainer.appendChild(smallText);
            buttonContainer.appendChild(finishButton);
            buttonContainer.appendChild(deleteButton);

            
            li.appendChild(buttonContainer);
            todoList.appendChild(li);
        })
    }

    






    function finishTask(index){
        todos[index].finished = !todos[index].finished;
        todos[index].date = new Date().toLocaleString();
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function deleteTask(index){
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function addTask(){
        const newTodo = {
            text: todoInput.value,
            finished: false,
            date: new Date().toLocaleString()
        }
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        todoInput.value = "";
    }
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    })
    
    renderTodos();
});