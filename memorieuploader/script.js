document.addEventListener("DOMContentLoaded", function() {
    const cityButtons = document.querySelectorAll(".city-button");

    cityButtons.forEach(button => {
        button.addEventListener("click", function() {
            const cityName = this.getAttribute("data-city");
            window.location.href = `${cityName.toLowerCase()}.html`;
        });
    });
});


OOCSI.connect('wss://oocsi.id.tue.nl/ws')
OOCSI.subscribe("woz_webapp_Anniek", function(msg) {
// handle message on “test channel"
// var selectedCity = msg.data.city;
if (msg.data.Eindhoven == true){
    console.log("Eindhoven")
    window.location.href = "eindhoven.html";
}
if (msg.data.Groningen == true){
    console.log("Groningen")
    window.location.href = "groningen.html";
}
if (msg.data.Enschede == true){
    console.log("Enschede")
    window.location.href = "enschede.html";
}
if (msg.data.Amsterdam == true){
    console.log("Amsterdam")
    window.location.href = "amsterdam.html";
}

});

function toggleMenu() {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("active");
}


let mediaCounter = 1;

function uploadMedia() {
    const fileInput = document.getElementById("fileInput");
    const mediaGallery = document.getElementById("mediaGallery");

    if (fileInput.files.length > 0) {
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const mediaItem = document.createElement("div");
            mediaItem.classList.add("media-item");
            
            if (file.type.startsWith("image/")) {
                // For images
                mediaItem.innerHTML = `
                    <img src="${URL.createObjectURL(file)}" alt="Uploaded Media" onclick="viewMedia(this)">
                    <input type="text" placeholder="Title of your memory">
                    <textarea placeholder="Add a description"></textarea>
                    <input type="text" placeholder="Add your name or leave this empty">
                    <input type="text" placeholder="Add tags">
                    <div>
                    <button onclick="removeMedia(this)">Remove</button>
                    <div>
                `;
            } else if (file.type.startsWith("video/")) {
                // For videos
                mediaItem.innerHTML = `
                    <video controls>
                        <source src="${URL.createObjectURL(file)}" type="${file.type}">
                        Your browser does not support the video tag.
                    </video>
                    <input type="text" placeholder="Title of your memory">
                    <textarea placeholder="Add your memory"></textarea>
                    <input type="text" placeholder="Add your name or leave this empty">
                    <input type="text" placeholder="Add tags">
                    <div>
                    <button onclick="removeMedia(this)">Remove</button>
                    <div>
                `;
            }

            mediaGallery.appendChild(mediaItem);
        }

        fileInput.value = ""; // Clear the input
    }
}

function removeMedia(button) {
    const mediaItem = button.parentElement;
    mediaItem.remove();
}

function viewMedia(element) {
    // Code for displaying media in a larger view (you can add it if needed)
}

function submitMedia() {
    const mediaGallery = document.getElementById("mediaGallery");
    mediaGallery.innerHTML = "<p>Submission Successful!</p>";
}
