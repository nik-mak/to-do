const submitBtn = document.querySelector('#submit')
const inputField = document.querySelector('#add')
const listElement = document.querySelector('#list')

const list = []

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const itemValue = inputField.value
  if (itemValue === '') {
    alert('Item cannot be empty')
  } else {
    inputField.value = ''
    addNewItem(itemValue)
    const listItem = document.createElement('li')
    listItem.innerHTML = templateHTML(itemValue)
    listElement.append(listItem)
  }
})

function addNewItem(value) {
  const entry = {
    done: false
   }
   window.localStorage.setItem(value, JSON.stringify(entry))
   return entry
}

function allStorage(array) {
  keys = Object.keys(localStorage)
  list.push(...keys)
}

function showList(array) {
  listElement.innerHTML = ""
  array.forEach(element => {
    const listItem = document.createElement('li')
    listItem.innerHTML = templateHTML(element)
    listElement.append(listItem)
  })
}

document.addEventListener('click', (e) => {
  if (e.target.matches('input') && e.target.checked === true) {
    let label = e.target.nextElementSibling
    label.classList.add('done')
    let target = e.target.id
    let value = JSON.parse(localStorage.getItem(target))
    value.done = true
    localStorage.setItem(target, JSON.stringify(value))
  } else if (e.target.matches('input') && e.target.checked === false) {
    let label = e.target.nextElementSibling
    label.classList.remove('done')
    let target = e.target.id
    let value = JSON.parse(localStorage.getItem(target))
    value.done = false
    localStorage.setItem(target, JSON.stringify(value))
  }
})

function isDone(array) {
  array.forEach((element) => {
    let a = JSON.parse(localStorage.getItem(element))
    if (a.done === true) {
      let b = document.querySelector(`#${element}`)
      b.checked = true
      b.nextElementSibling.classList.add('done')
    }
  })
}

document.addEventListener('click', (e) => {
  if (e.target.value === 'Delete') {
    const a = e.target.parentElement
    const b = a.parentElement
    const c = b.firstElementChild.id
    localStorage.removeItem(c)
    b.remove()
  } else if (e.target.value === 'Edit') {
    const a = e.target.parentElement.parentElement
    const b = a.firstElementChild.id
    a.innerHTML = `
    <div class="update-item">
      <input id="${b}" type="text" placeholder="${b}" />
      <input type="submit" value="Update" id="update" />
    </div>
    `
    const updateBtn = document.querySelector('#update')
    updateBtn.addEventListener('click', event => {
      const c = document.querySelector(`#${b}`)
      if (c.value === '') {
        a.innerHTML = templateHTML(b)
      } else {
        a.innerHTML = templateHTML(c.value)
        const updatedEntry = {
          done: false
        }
        window.localStorage.setItem(c.value, JSON.stringify(updatedEntry))
        localStorage.removeItem(b)
      }
    })

  }
})

function templateHTML(value) {
  return `
    <input id="${value}" type="checkbox"/>
    <label for="${value}" class="tick js-tick">${value}</label>
    <span class="options">
      <input type="submit" value="Edit" id="edit" />
      <input type="submit" value="Delete" id="delete" />
    </span>
  `
}

allStorage(list)
showList(list)
isDone(list)