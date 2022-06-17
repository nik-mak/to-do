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
    const newEntry = addNewItem(itemValue)
    const listItem = document.createElement('li')
    listItem.innerHTML = `
    <input id="${newEntry.description}" type="checkbox"/>
    <label for="${newEntry.description}" class="tick js-tick">${newEntry.description}</label>
    <span class="options">
      <input type="submit" value="Edit" id="edit" />
      <input type="submit" value="Delete" id="delete" />
    </span>
    `
    listElement.append(listItem)
  }
  // list.push
})

function addNewItem(value) {
  const entry = {
    description: value
   }
   window.localStorage.setItem(`entry${localStorage.length}`, JSON.stringify(entry))
   list.push(entry)
   return entry
}

function allStorage(array) {
      keys = Object.keys(localStorage),
      i = keys.length
  while ( i-- ) {
      array.push( JSON.parse(localStorage.getItem(keys[i])) )
  }
}

function showList(array) {
  listElement.innerHTML = ""
  array.forEach(element => {
    const listItem = document.createElement('li')
    listItem.innerHTML = `
    <input id="${element.description}" type="checkbox"/>
    <label for="${element.description}" class="tick js-tick">${element.description}</label>
    <span class="options">
      <input type="submit" value="Edit" id="edit" />
      <input type="submit" value="Delete" id="delete" />
    </span>
    `
    listElement.append(listItem)
  })
}

document.addEventListener('click', (e) => {
  if (e.target.matches('input') && e.target.checked === true) {
    let label = e.target.nextElementSibling
    label.classList.add('done')
  } else if (e.target.matches('input') && e.target.checked === false) {
    label = e.target.nextElementSibling
    label.classList.remove('done')
  }
})

// document.addEventListener('click', (e) => {
//   if (e.target.value === 'Edit') {

//   }
// })

// document.addEventListener('click', (e) => {
//   if (e.target.value === 'Delete') {
//     let a = e.target.parentElement
//     let b = a.parentElement
//     b.remove()
//   }
// })

allStorage(list)
showList(list)