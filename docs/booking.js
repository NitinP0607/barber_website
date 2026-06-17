
const popup = document.getElementById("popup");
const serviceInput = document.getElementById("service");

function openForm(service) {

    popup.style.display = "flex";
    serviceInput.value = service;

}

function closeForm() {

    popup.style.display = "none";

}

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first!");
        window.location.href = "register.html";
        return;

    }

    const bookingData = {

        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/bookings",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(bookingData)
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Appointment booked successfully!");

            bookingForm.reset();

            closeForm();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Something went wrong!");

    }

});

