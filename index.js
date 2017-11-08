console.log(200);

document.body.onload = function (e) {
	localStorage.todos = localStorage.todos || '[]';
	window.todos = JSON.parse(localStorage.todos);

	saveTodos();
};

var todosList = document.getElementById('todos');
var data = document.getElementById('data').children;

document.querySelector('button.add')
	.addEventListener('click', function (event) {
		event.preventDefault();
		addTodo(event.target.parentNode[0].value);
		event.target.parentNode[0].value = '';
	});

document.querySelector('button.select-all')
	.addEventListener('click', function (event) {
		event.preventDefault();
		for (var i = todos.length - 1; i >= 0; i--)
			todos[i].isDone = true;
		saveTodos();
	});


function addTodo (content) {
	var lastID = -1 + todos.push({
		content: content,
		isDone: false
	});

	renderTodo(lastID);
	saveTodos();
}

function deleteTodo	(id) {
	todos.splice(id,1);
	saveTodos();
}

function saveTodos() {
	localStorage.todos = JSON.stringify(todos);
	todosList.innerHTML = '';
	
	
	for (var i = 0, done = 0, undone = todos.length; i < todos.length; i++) {
		renderTodo(i);
		if (todos[i].isDone) {
			done++;
			undone--;
		}
	}
	data.allCount.innerText = 'All: ' + todos.length;
	data.doneCount.innerText = 'Done: ' + done;
	data.undoneCount.innerText = 'Undone: ' + undone;
}


function markTodo (id,state) {
	var content = document.getElementById('todos').children[id].children[0].querySelector('p');
	var btn = document.getElementById('todos').children[id].children[0].querySelector('.btn.'+state);
	todos[id].isDone = !todos[id].isDone;
	saveTodos();
}

function changeTodo (id,content) {
	todos[id].content = content;
	saveTodos();
}

function removeTodos(type) {
	for (var i = todos.length - 1; i >= 0; i--) {
		if (type === 'all')
			deleteTodo(i);

		if (type === 'done')
			if (todos[i].isDone)
				deleteTodo(i)

		if (type === 'undone')
			if (!todos[i].isDone)
				deleteTodo(i)

	}
}

function renderTodo (id) {
	todosList.innerHTML += `
		<div id="todo_${id}" class="col s12 m6 l4">
			<div class="card-panel cyan darken-2">
				<p class="white-text flow-text ${todos[id].isDone ? 'done' : ''}" contenteditable="true" onblur="changeTodo(${id},this.innerText)">${todos[id].content}</p>
				<button onclick="deleteTodo(${id})" class="orange darken-4 btn-floating"><i class="material-icons">delete</i></button>
				<button onclick="markTodo(${id},this.classList[0])" class="${!todos[id].isDone ? 'mark' : 'unmark'} orange darken-4 btn-floating"><i class="material-icons">${!todos[id].isDone ? 'done' : 'clear'}</i></button>
			</div>
		</div>`
}