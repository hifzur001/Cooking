// Initialize AOS (Animate On Scroll) library
AOS.init();

// Countdown timer setup
// Calculate the future date for the countdown
var countDownDate =
    new Date().getTime() + // Current time
    2 * 24 * 60 * 60 * 1000 + // 2 days in milliseconds
    12 * 60 * 60 * 1000 + // 12 hours in milliseconds
    43 * 60 * 1000 + // 43 minutes in milliseconds
    8 * 1000; // 8 seconds in milliseconds

// Update the countdown timer every second
var x = setInterval(function () {
    var now = new Date().getTime(); // Current time
    var distance = countDownDate - now; // Calculate the remaining time

    // Calculate days, hours, minutes, and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML elements with the calculated values
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the countdown has finished
    if (distance < 0) {
        clearInterval(x); // Stop the countdown
        // Set all time units to zero
        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";
    }
}, 1000); // Update every second

// Show the popup after 3 seconds with fade-in effect
setTimeout(function () {
    var popup = document.getElementById("popup-overlay");
    popup.style.display = "flex"; // Display the popup
    setTimeout(function () {
        AOS.refresh(); // Refresh AOS to animate the popup
    }, 10); // Small delay to ensure popup is displayed before animation
}, 3000); // 3-second delay before showing popup

// Close the popup with fade-out and zoom-out effect
document.getElementById("close-btn").onclick = function () {
    var popup = document.querySelector(".offer-card");
    popup.setAttribute("data-aos", "zoom-out"); // Set animation for zoom-out effect
    popup.setAttribute("data-aos-duration", "500"); // Duration of the zoom-out animation
    setTimeout(function () {
        document.getElementById("popup-overlay").style.display = "none"; // Hide the popup
    }, 500); // Wait for the animation to finish before hiding
};

// Add to cart functionality
document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0; // Initialize cart count
    const cartBadge = document.querySelector(".cart-badge"); // Cart badge element

    // Function to update the cart badge display
    function updateCartBadge() {
        if (cartCount > 0) {
            cartBadge.textContent = cartCount; // Update badge with cart count
            cartBadge.style.display = "inline-block"; // Show the badge
        } else {
            cartBadge.style.display = "none"; // Hide the badge if cart is empty
        }
    }

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".addToCartBtn").forEach((button) => {
        button.addEventListener("click", () => {
            cartCount++; // Increment cart count
            updateCartBadge(); // Update the badge display
        });
    });
});

// Login & Sign Up
$(document).ready(function () {
    // Open the modal when the user icon is clicked
    $("#userIcon").click(function () {
        var authModal = new bootstrap.Modal(
            document.getElementById("authModal")
        );
        authModal.show();
    });

    // Switch to Sign Up view
    $("#switchToSignUp").click(function (e) {
        e.preventDefault();
        $("#loginTab").removeClass("show active");
        $("#signUpTab").addClass("show active");
        $("#authModalLabel").text("Sign Up");
    });

    // Switch to Login view
    $("#switchToLogin").click(function (e) {
        e.preventDefault();
        $("#signUpTab").removeClass("show active");
        $("#loginTab").addClass("show active");
        $("#authModalLabel").text("Login");
    });

    // Handle form submissions for login
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        const userName = $("#loginEmail").val().split("@")[0]; // Placeholder: use part of the email
        handleUserLogin(userName);
    });

    // Handle form submissions for sign-up
    $("#signUpForm").submit(function (e) {
        e.preventDefault();
        const userName = $("#signUpName").val();
        handleUserLogin(userName);
    });

    // Handle Google login
    $(".googleSignUpIcon").click(function () {
        const userName = "Google User";
        handleUserLogin(userName);
    });

    // Handle Email login
    $(".emailSignUpIcon").click(function () {
        const userName = "Email User";
        handleUserLogin(userName);
    });

    // Handle logout
    $("#logoutBtn").click(function () {
        $("#userName").hide();
        $("#logoutContainer").hide();
        $("#userIcon").show();
        // Additional logout logic can go here, such as clearing session data
    });

    // Show logout button when the user clicks on their name
    $("#userName").click(function () {
        $("#logoutContainer").toggle(); // Toggle visibility of the logout button
    });

    // Function to handle user login or sign-up
    function handleUserLogin(userName) {
        $("#authModal").modal("hide");
        $("#userIcon").hide();
        $("#userName").text(userName).show();
        $("#logoutContainer").show(); // Show the logout button
    }
});
