let items = []
let i = 0;

const inputBox = document.getElementById("input-box");
const addingBtn = document.getElementById("adding-item");
const removeBtn = document.getElementById("clean-list");
const ulEl = document.getElementById("ul-el");

// Declare a object function to hold each item data.
function object(name,isChecked){
  this.name = name;
  this.isChecked = isChecked;
}


// Read the items array from local storage
const itemsFromLocalStorage = JSON.parse(localStorage.getItem("myItems"));

// If there is data inside the local storage, set the array data to items and render the array on the page.
if (itemsFromLocalStorage) {
  items = itemsFromLocalStorage;
  render(items);
}

// Read the input by enter
inputBox.addEventListener("keyup",(e) => {
  if(e.keyCode === 13 && inputValid()){
   readItem();
  }
});

// Read the input by button
addingBtn.addEventListener("click", () => {
  if(inputValid()){
    readItem();
  }
});

// removeBtn.addEventListener("click", () => {
//   localStorage.removeItem("myItems");
//   items = [];
//   render(items);
// });


// Remove all the items are checked
removeBtn.addEventListener("click", () => {
  items.slice().reverse().forEach((item,index,object) => {
    if(item.isChecked){
      items.splice(object.length - 1 - index,1);
    }
  });
  localStorage.setItem ("myItems",JSON.stringify(items));
  render(items);
});


// Reading the input from the input box and add it to the array and local storage
function readItem() {
  let item = new object(inputBox.value,false);
  items.push(item);
  inputBox.value = "";
  localStorage.setItem ("myItems",JSON.stringify(items));
  render(items);
}

// Render the page
function render (items) {
  let listItems = "";
  for (i = 0; i < items.length; i++){
    // Making sure the checkbox still checked when page refresh
    if(items[i].isChecked){
      listItems += `
      <li>
        <input class="custom-checkbox" id="${i}" type="checkbox" checked>
        ${items[i].name}
      </li>
    `
    } else {
      listItems += `
        <li>
          <input class="custom-checkbox" id="${i}" type="checkbox">
          ${items[i].name}
        </li>
      `
    }
  }
  ulEl.innerHTML = listItems;
  bindingFunction(items);
}


// Adding event listener for checkboxes.
function bindingFunction(items) {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((box) => {
    // check and uncheck boxes
    box.addEventListener("change",() =>{
      if(items[box.id].isChecked){
        items[box.id].isChecked = false;
        console.log("unchecked");
      } else {
        items[box.id].isChecked = true;
        console.log("checked");
      }
      // Updating the checkbox status to the local storage.
      localStorage.setItem ("myItems",JSON.stringify(items));
    });
  });
};

// Making sure something is typed
function inputValid() {
  return inputBox.value !== "";
}

