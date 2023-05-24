

let addInput = document.querySelector('#task')  //kullanıcıdan alınan veriyi değişkene atama
let listDOM = document.querySelector('#list')  // veriyi li etiketine eklemek için
let allLiDOM = document.querySelectorAll("li")   // tüm li elemanlarını seçmek
let toDos = [];   // farklı fonksiyonlarda kullanacağımız için global tanımladık
 
// kapama tuşu butonunu tanımladık    
let closeButton = `<button
onclick="removeItem(parentNode)"
type="button"
class="close"
style = "padding:10px"
data-dismiss="toast"
aria-label="Close"
>
<span  aria-hidden="true">&times;</span>`


// liste elemanını çizmek için fonksiyon
function markElement (){
    this.classList.toggle("checked")

}


// foreach ile seçilen her liste elemanını kapamak için buton ekleme ve silme
allLiDOM.forEach(element => {
    element.addEventListener("click", markElement)
    element.innerHTML += `${closeButton}`
    } ) 


function newElement(){

    if (addInput.value == ""){
        console.log("Listeye boş ekleme yapamazsınız")
        $(".error").toast('show')

    } else {
        let newLi = document.createElement('li')  // yeni bir li tanımladık
        newLi.innerHTML = `${addInput.value}`; // yeni li içine girilen değeri atadık
        listDOM.appendChild(newLi)  // listeye yeni li yi ekledik
        console.log("Listeye eklendi")
        $(".success").toast('show')

        newLi.addEventListener("click", markElement)  // li ye tıklandığında işaretlendi
        addStorage()  // storage ı kontrol etmek ve yeni değer eklemek için fonksiyonları çalıştırdık

        addInput.value = ""; // input sıfırlandı
    }
}


// liste elemanlarını silmek için fonksiyon
function removeItem (e){
    e.remove();
}


function addStorage(){
    checkStorage();
    toDos.push`${(addInput.value)}`
    localStorage.setItem("toDoList", JSON.stringify(toDos))
}

function checkStorage(){
        let toDos = localStorage.getItem("toDos");
        if(toDos == ""){
            toDos = [];
        } else {
            toDos = JSON.parse(localStorage.getItem("toDos"));
        }
}