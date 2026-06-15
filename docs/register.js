
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

const mobileSignUp = document.getElementById("mobileSignUp");
const mobileSignIn = document.getElementById("mobileSignIn");

mobileSignUp.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

mobileSignIn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

const signupForm = document.getElementById("signupform");
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    try {
        const response = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (data.success) {
            alert("Registration successful!");
            signupForm.reset();
            container.classList.remove("right-panel-active");
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
});

// ================= LOGIN =================
const loginForm = document.getElementById("loginform");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
});
