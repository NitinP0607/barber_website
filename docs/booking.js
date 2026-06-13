const popup = document.getElementById("popup");
const serviceInput = document.getElementById("service");

function openForm(service){
    popup.style.display = "flex";
    serviceInput.value = service;
}

function closeForm(){
    popup.style.display = "none";
}