// Toast Notification Function
function showToast(message) {
    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 3000);
}

// Book Button and Smooth Scrolling
document.addEventListener("DOMContentLoaded", function () {

   const bookButtons = document.querySelectorAll(
    '.book-btn, a[href="#booking"]'
);

    console.log("JavaScript loaded!");
    console.log("Book buttons found:", bookButtons.length);

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {
                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });

                showToast("Please fill your ticket booking form!");
            } else {
                console.log("Booking section not found!");
            }

        });

    });

});

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get form values
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let match = document.getElementById("match").value;
        let stand = document.getElementById("stand");
        let tickets = Number(document.getElementById("tickets").value);

        let preference = document.querySelector(
            'input[name="preference"]:checked'
        );

        if (!stand || !preference) {
            return;
        }

        // Calculate total amount
        let price = Number(stand.value);
        let total = price * tickets;

        // Display booking details
        document.getElementById("sName").textContent = name;
        document.getElementById("sEmail").textContent = email;
        document.getElementById("sPhone").textContent = phone;
        document.getElementById("sMatch").textContent = match;

        document.getElementById("sStand").textContent =
            stand.options[stand.selectedIndex].text;

        document.getElementById("sTickets").textContent = tickets;
        document.getElementById("sPreference").textContent =
            preference.value;
        document.getElementById("sTotal").textContent = total;
        showToast("Booking summary updated!");

        // Show Booking Summary
        document.getElementById("bookingSummary").style.display = "block";

        // Scroll to summary
        document.getElementById("bookingSummary").scrollIntoView({
            behavior: "smooth"
        });

    });
}

// Activity 7 - Live Interaction

const matchInput = document.getElementById("match");
const standInput = document.getElementById("stand");
const ticketsInput = document.getElementById("tickets");

if (bookingForm && matchInput) {
    matchInput.addEventListener("change", function () {
        bookingForm.requestSubmit();
    });
}

if (bookingForm && standInput) {
    standInput.addEventListener("change", function () {
        bookingForm.requestSubmit();
    });
}

if (bookingForm && ticketsInput) {
    ticketsInput.addEventListener("input", function () {
        bookingForm.requestSubmit();
    });
}

// Hide summary when form is reset
if (bookingForm) {
    bookingForm.addEventListener("reset", function() {
        const bookingSummary = document.getElementById("bookingSummary");
        if (bookingSummary) {
            bookingSummary.style.display = "none";
        }
    });
}

function confirmBooking() {
    const confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
        confirmationModal.style.display = "flex";
    }
}

function undoConfirmation() {
    const confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
        confirmationModal.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.getElementById("main-nav");

    if (header && menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = header.classList.toggle("nav-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                header.classList.remove("nav-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });
    }

    const matchContainer = document.querySelector(".match-container");
    const teamFilter = document.getElementById("teamFilter");
    const matchCards = matchContainer
        ? Array.from(matchContainer.querySelectorAll(".match-card"))
        : [];

    if (teamFilter && matchContainer) {
        teamFilter.addEventListener("change", function () {
            const selectedTeam = teamFilter.value;

            matchCards.forEach(function (card) {
                const teams = card.dataset.teams.split(/\s+/);
                card.hidden = selectedTeam !== "all" && !teams.includes(selectedTeam);
            });
        });
    }

    if (matchContainer) {
        document.querySelectorAll(".view-toggle").forEach(function (button) {
            button.addEventListener("click", function () {
                const isListView = button.dataset.view === "list";
                matchContainer.classList.toggle("is-list", isListView);

                document.querySelectorAll(".view-toggle").forEach(function (toggle) {
                    const isActive = toggle === button;
                    toggle.classList.toggle("is-active", isActive);
                    toggle.setAttribute("aria-pressed", String(isActive));
                });
            });
        });
    }
});
