**Add new todo**
----
Creates a new todo object

**URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
  - _id
  - content
  - isDone
  - isSelected

* **Success Response:**

  * **Code: 200**

    **Content:**
      - \_id: Number
      - content: String
      - isDone: Boolean
      - isSelected: Boolean
 
* **Error Response:**

  * **Code:** 260

* **Sample Call:**

  ```javascript
    axios.post('/api/v1/todos', {
     _id: 0,
     content: 'New content'
     isDone: false,
     isSelected: false
})
  ```

**Get all todos**
----
Returns json array with all todos.

**URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code: 200**

    **Content:**
      - \_id: Number
      - content: String
      - isDone: Boolean
      - isSelected: Boolean
 
* **Error Response:**

**Content:** `{ todo: null }`

* **Sample Call:**

  ```javascript
    axios('/api/v1/todos')
  ```

**Get specific todo**
----
Returns json todo object

**URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   id - Number [required]

* **Data Params**

  None

* **Success Response:**

  * **Code: 200**

    **Content:**
      - \_id: Number
      - content: String
      - isDone: Boolean
      - isSelected: Boolean
 
* **Error Response:**

  * **Code:** 260

* **Sample Call:**

  ```javascript
    axios('/api/v1/todos/0')
  ```



**Delete todo**
----
Removes todo object from database

**URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   id - Number [required]

* **Data Params**

  None

* **Success Response:**

  * **Code: 200**

    **Content:**
      - \_id: Number
      - content: String
      - isDone: Boolean
      - isSelected: Boolean
 
* **Error Response:**

  * **Code:** 260

* **Sample Call:**

  ```javascript
    axios.delete('/api/v1/todos/0')
  ```



**Change todo**
----
Changes todo object in database

**URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   id - Number [required]

* **Data Params**
  - _id
  - content
  - isDone
  - isSelected

* **Success Response:**

  * **Code: 200**

    **Content:**
      - \_id: Number
      - content: String
      - isDone: Boolean
      - isSelected: Boolean
 
* **Error Response:**

  * **Code:** 260

* **Sample Call:**

  ```javascript
    axios.put('/api/v1/todos/0', {
     _id: 0,
     content: 'New content'
     isDone: false,
     isSelected: true
})
  ```