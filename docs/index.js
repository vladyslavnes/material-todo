/* eslint-disable */

let numberOfAjaxCAllPending = 0

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  numberOfAjaxCAllPending++
  // show spinner
  document.getElementById('spinner-overlay').style.display = 'flex'
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  numberOfAjaxCAllPending--

  if (numberOfAjaxCAllPending == 0) {
    // hide spinner
    document.getElementById('spinner-overlay').style.display = 'none'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

document.body.onload = saveTodos.bind(this)

document.querySelector('button.add')
  .addEventListener('click', function (event) {
    event.preventDefault()
    if (event.target.parentNode[0].value) {
      addTodo(event.target.parentNode[0].value)
      event.target.parentNode[0].value = ''
    }
  })

document.querySelector('button.select-all')
  .addEventListener('click', function (event) {
    event.preventDefault()
    for (let i = window.todos.length - 1; i >= 0; i--) { window.todos[i].isDone = true }
    saveTodos()
  })

function addTodo (content) {
  let newObj = {
    _id: window.lastID,
    content: content,
    isDone: false,
    isSelected: false
  }

  axios.post('/api/v1/todos', newObj)

  window.todos.push(newObj)

  window.todosList.innerHTML += renderTodo(lastID)
  window.lastID++

  updateData()
}

function deleteTodo (id) {
  axios.delete('/api/v1/todos/' + id)
  window.todos.splice(id, 1)
  window.todosList.children[id].remove()
  updateData()
}

function markTodo (id, state) {
  let content = todosList.children[id].children[0].querySelector('p')
  let btn = todosList.children[id].children[0].querySelector('.btn.' + state)
  window.todos[id].isDone = !window.todos[id].isDone
  axios.put('/api/v1/todos/' + id, window.todos[id])
  console.log(window.todosList)
  window.todosList.children[id].outerHTML = renderTodo(id)
  updateData()
}

function selectTodo (id) {
  window.todos[id].isSelected = !window.todos[id].isSelected
  axios.put('/api/v1/todos/' + id, window.todos[id])
  window.todosList.children[id].outerHTML = renderTodo(id)
  updateData()
}

function changeTodo (id, content) {
  window.todos[id].content = content
  axios.put('/api/v1/todos/' + id, window.todos[id])
}

async function getTodos () {
  let requestedTodos = []
  let response = await axios('/api/v1/todos')
  let todos = response.data

  for (let i in todos) {
    delete todos[i].__v
    requestedTodos[i] = todos[i]
  }

  return requestedTodos
}

async function saveTodos () {
  window.todosList = document.querySelector('#todos')
  window.data = document.querySelector('#data').children

  window.todos = await getTodos()

  window.lastID = window.todos.length

  todosList.innerHTML = ''

  for (let id = 0; id < window.todos.length; id++) {
    window.todosList.innerHTML += renderTodo(id)
  }

  updateData()
}

function updateData () {
  let undone = window.todos.length
  let done = 0
  let selected = 0

  for (let i = 0; i < window.todos.length; i++) {
    if (window.todos[i].isDone) {
      done++
      undone--
    }
    if (window.todos[i].isSelected) {
      selected++
    }
  }
  window.data.allCount.innerText = 'All: ' + window.todos.length
  window.data.doneCount.innerText = 'Done: ' + done
  window.data.undoneCount.innerText = 'Undone: ' + undone
  window.data.selectedCount.innerText = 'Selected: ' + selected
}

function removeTodos (type) {
  for (let i = window.todos.length - 1; i >= 0; i--) {
    if (type === 'all') {
      deleteTodo(i)
    }

    if (type === 'done') {
      if (window.todos[i].isDone) {
        deleteTodo(i)
      }
    }

    if (type === 'selected') {
      if (window.todos[i].isSelected) {
        deleteTodo(i)
      }
    }
  }
}

function selectTodos (type) {
  for (let i = window.todos.length - 1; i >= 0; i--) {
    if (type === 'all') {
      window.todos[i].isSelected = true
    }

    if (type === 'done') {
      if (window.todos[i].isDone) {
        window.todos[i].isSelected = true
      }
    }

    if (type === 'undone') {
      if (!window.todos[i].isDone) {
        window.todos[i].isSelected = true
      }
    }
  }
  saveTodos()
}

function renderTodo (id) {
  return `<li id="todo_${id}" class="col">
            <div class="card-panel grey ${!window.todos[id].isSelected ? 'lighten-2' : ''}">
                <p class="content black-text flow-text ${window.todos[id].isDone ? 'done' : ''}" contenteditable="true" onblur="changeTodo(${id},this.innerText)">${window.todos[id].content}</p>
                <button onclick="deleteTodo(${id})" class="orange darken-4 btn-floating"><i class="material-icons">delete</i></button>
                <button onclick="markTodo(${id},this.classList[0])" class="${!window.todos[id].isDone ? 'mark' : 'unmark'} orange darken-4 btn-floating"><i class="material-icons">${!window.todos[id].isDone ? 'done' : 'clear'}</i></button>
                <button onclick="selectTodo(${id})" class="${!window.todos[id].isSelected ? 'select' : 'unselect'} orange darken-4 btn-floating"><i class="material-icons">${todos[id].isSelected ? 'check_box' : 'check_box_outline_blank'}</i></button>
            </div>
        </li>`
}
