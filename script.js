
let addInput = document.querySelector('#task')  //kullanıcıdan alınan veriyi değişkene atama
let listDOM = document.querySelector('#list')  // veriyi li etiketine eklemek için
let allLiDOM = document.querySelectorAll("li")   // tüm li elemanlarını seçmek
let todos = [];   // farklı fonksiyonlarda kullanacağımız için global tanımladık
 
// çarpı tuşu butonunu tanımladık    
let closeButton = `
<button class="delete-button" onclick="removeItem(parentNode)"
type="button" data-dismiss="toast"
aria-label="Close"
>
  <svg class="delete-svgIcon" viewBox="0 0 448 512">
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
   </svg>
</button>

`
runEvent()

function runEvent(){
    document.addEventListener('DOMContentLoaded', storageLoaded)
}

function displayTodosOnPage() {
    todos.forEach(function (todo) {
        let newLi = document.createElement('li');
        newLi.innerHTML = todo + closeButton;
        newLi.addEventListener("click", markElement);
        listDOM.appendChild(newLi);
    });
}
function storageLoaded() {
    checkToDoFromStorage();
    displayTodosOnPage();
    todos.forEach(function (todo) {
        console.log(todo);
    });
}


// liste elemanını çizmek için fonksiyon
function markElement (){
    this.classList.toggle("checked")

}


// foreach ile seçilen her liste elemanını silmek için buton ekleme ve silme
allLiDOM.forEach(element => {
    element.addEventListener("click", markElement)
    element.innerHTML += `${closeButton}`
    } ) 

// addTodoToUI
function addTodoToUI(){
   const inputValue = addInput.value.trim()
    if (inputValue == ""){
        console.log("Listeye boş ekleme yapamazsınız")
        $(".error").toast('show')

    } else {
        let newLi = document.createElement('li')  // yeni bir li tanımladık
        newLi.innerHTML = inputValue + closeButton; // yeni li içine girilen değeri atadık
        
        listDOM.appendChild(newLi)  // listeye yeni li yi ekledik
        console.log("Listeye eklendi")
        $(".success").toast('show')

        newLi.addEventListener("click", markElement)  // li ye tıklandığında işaretlendi
        addToDoToStorage(inputValue)  // storage ı kontrol etmek ve yeni değer eklemek için fonksiyonları çalıştırdık

        addInput.value = ""; // input sıfırlandı
    }
}

//storageden silmek için
function removeTodoStorage(removeTodo) {
    checkToDoFromStorage();
    const index = todos.indexOf(removeTodo);
    if (index > -1) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}


// liste elemanlarını silmek için fonksiyon
function removeItem(e) {
    const todoText = e.textContent.trim(); // gerektiğinde trim işlemi ekledim
    e.remove();
    removeTodoStorage(todoText);
}


const el = document.querySelector('.todo-item[data-id="1"]');
removeItem(el);





//storage da todos var mı önce kontrol etmemiz lazım
function checkToDoFromStorage(newToDo){
     
    if(localStorage.getItem("todos")=== null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

// addTodoToStorage
function addToDoToStorage(newToDo){
    checkToDoFromStorage();
    todos.push(newToDo)
    localStorage.setItem("todos", JSON.stringify(todos))
}



