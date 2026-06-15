let menuBtn = document.getElementById("menuBtn");
let sidenav = document.getElementById("sidenav");
let menu = document.getElementById("menu");

menuBtn.onclick = function () {
    if (sidenav.style.right == "-250px") {
        sidenav.style.right = "0";
        menu.src = "images/close.png";
    }
    else {
        sidenav.style.right = "-250px";
        menu.src = "images/menu.png";
    }
}

// ================= REGISTER =================

const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

const token = localStorage.getItem("token");

if (token) {

    registerBtn.innerHTML = "<span></span>My Bookings";
    registerBtn.href = "mybookings.html";

    logoutBtn.style.display = "inline-block";

} else {

    registerBtn.innerHTML = "<span></span>Register Now";
    registerBtn.href = "register.html";

    logoutBtn.style.display = "none";

}

logoutBtn.addEventListener("click", (e) => {

    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "index.html";

});




