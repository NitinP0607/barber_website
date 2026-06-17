 const bookingList = document.getElementById("bookingList");
const loader = document.getElementById("loader");

async function loadBookings() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/bookings/mybookings",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        loader.style.display = "none";

        bookingList.innerHTML = "";

        if (data.bookings.length === 0) {

            bookingList.innerHTML = `
                <div class="card">
                    <h2>No Appointments Found</h2>
                    <p>You have not booked any appointments yet.</p>
                </div>
            `;

            return;
        }

        data.bookings.forEach((booking) => {

            bookingList.innerHTML += `

            <div class="card">

                <h2>${booking.service}</h2>

                <p><strong>Name:</strong> ${booking.name}</p>

                <p><strong>Phone:</strong> ${booking.phone}</p>

                <p><strong>Date:</strong> ${booking.date}</p>

                <p><strong>Time:</strong> ${booking.time}</p>

                <div class="btn-group">

                    <button
                        class="update-btn"
                        onclick='openUpdateForm(
                            "${booking._id}",
                            "${booking.name}",
                            "${booking.phone}",
                            "${booking.service}",
                            "${booking.date}",
                            "${booking.time}"
                        )'
                    >
                        Update
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteBooking('${booking._id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

            `;
        });

    } catch (error) {

        console.log(error);

        loader.innerHTML = "<h2>Failed to load bookings</h2>";

    }

}


async function deleteBooking(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/bookings/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Booking deleted successfully");

            loadBookings();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

    }

}


function openUpdateForm(id, name, phone, service, date, time) {

    document.getElementById("updatePopup").style.display = "flex";

    document.getElementById("updateId").value = id;
    document.getElementById("updateName").value = name;
    document.getElementById("updatePhone").value = phone;
    document.getElementById("updateService").value = service;
    document.getElementById("updateDate").value = date;
    document.getElementById("updateTime").value = time;

}


function closeUpdateForm() {

    document.getElementById("updatePopup").style.display = "none";

}


document.getElementById("updateForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("updateId").value;

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/bookings/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    name: document.getElementById("updateName").value,

                    phone: document.getElementById("updatePhone").value,

                    service: document.getElementById("updateService").value,

                    date: document.getElementById("updateDate").value,

                    time: document.getElementById("updateTime").value

                })

            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Booking updated successfully!");

            closeUpdateForm();

            loadBookings();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

    }

});


loadBookings();