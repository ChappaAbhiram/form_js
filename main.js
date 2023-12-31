// ELEMENT SELECTORS

// Single Element Selectors
// console.log(document.getElementById('my-form'));
// console.log(document.querySelector('.container'));
// // Multiple Element Selectors
// console.log(document.querySelectorAll('.item'));
// console.log(document.getElementsByTagName('li'));
// console.log(document.getElementsByClassName('item'));

// const items = document.querySelectorAll('.item');
// items.forEach((item) => console.log(item));


// MANIPULATING THE DOM
// const ul = document.querySelector('.items');
// // ul.remove();
// // ul.lastElementChild.remove();
// ul.firstElementChild.textContent = 'Hello';
// ul.children[1].innerText = 'Brad';
// ul.lastElementChild.innerHTML = '<h1>Hello</h1>';


// btn.style.background = 'red';


// EVENTS

// Mouse Event
// btn.addEventListener('click', e => {
//   e.preventDefault();
//   console.log(e.target.className);
//   document.getElementById('my-form').style.background = '#ccc';
//   document.querySelector('body').classList.add('bg-dark');
//   ul.lastElementChild.innerHTML = '<h1>Changed</h1>';
// });

// Keyboard Event
// const nameInputs = document.querySelector('#name');
// nameInputs.addEventListener('input', e => {
//   document.querySelector('.container').append(nameInputs.value);
// });


// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const btn = document.querySelector('.btn');

// Listen for form submit
// myForm.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   e.preventDefault();
  
//   if(nameInput.value === '' || emailInput.value === '') {
//     alert('Please enter all fields');
//   } else {
//     // Create new list item with user
//     const li = document.createElement('li');

//     // Add text node with input values
//     li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

//     // Add HTML
//     // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

//     // Append to ul
//    userList.appendChild(li);

//     // Clear fields
//     nameInput.value = '';
//     emailInput.value = '';
//   }
// }

myForm.addEventListener('submit',onSubmit);
function onSubmit(e){
    e.preventDefault();
     var myobj = {
    name : document.getElementById('name').value,
    email : e.target.email.value,
    phone : e.target.phone.value
    }
    strmyobj = JSON.stringify(myobj);
    //localStorage.setItem(myobj.email,strmyobj);
    axios.post("https://crudcrud.com/api/33e667dd5d574236b8a5c4f1141adc29/appointmentdata",myobj)
    .then(response=>{
        showonuserscreen(response.data);
    })
    .catch(err=>console.log(err));
    e.target.email.value = '';
    e.target.name.value = '';
    e.target.phone.value='';
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/33e667dd5d574236b8a5c4f1141adc29/appointmentdata")
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
           showonuserscreen(response.data[i]);
        }
    })
    .catch(err=>console.log(err));
})
    //var destrobj = JSON.parse(localStorage.getItem("myobj.email"));
    // console.log(destrobj);
    function showonuserscreen(myobj){
    const cont = document.querySelector('.containers');
    const li = document.createElement('li');
    li.textContent=myobj.name+'- '+myobj.email+'- '+myobj.phone;
    const butn = document.createElement('button');
    butn.appendChild(document.createTextNode('Delete'));
    const editbutn = document.createElement('button');
    editbutn.appendChild(document.createTextNode('Edit'));
    editbutn.onclick=()=>{

        document.getElementById('name').value = myobj.name;
        document.getElementById('email').value = myobj.email;
        document.getElementById('phone').value = myobj.phone;
        axios.delete(`https://crudcrud.com/api/33e667dd5d574236b8a5c4f1141adc29/appointmentdata/${myobj._id}`);
        cont.removeChild(li);
       localStorage.removeItem(myobj.email);
    }
    butn.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/33e667dd5d574236b8a5c4f1141adc29/appointmentdata/${myobj._id}`);
        cont.removeChild(li);
       localStorage.removeItem(myobj.email);
   }
    li.appendChild(butn);
    li.appendChild(editbutn);
    cont.appendChild(li);
}
