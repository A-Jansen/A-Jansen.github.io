OOCSI.connect('wss://oocsi.id.tue.nl/ws')
OOCSI.subscribe("cultureMap_interface", function (msg) {
    // handle message on “test channel"
    // var selectedCity = msg.data.city;
    if (msg.data.location == "Eindhoven") {
        console.log("Eindhoven")
        window.location.href = "page-eindhoven.html";
    }
    if (msg.data.location == "Groningen") {
        console.log("Groningen")
        window.location.href = "page-groningen.html";
    }
    if (msg.data.location == "Enschede") {
        console.log("Enschede")
        window.location.href = "page-enschede.html";
    }
    if (msg.data.location == "Amsterdam") {
        console.log("Amsterdam")
        window.location.href = "page-amsterdam.html";
    }
    if (msg.data.location == "Sinterklaas") {
        console.log("Sinterklaas")
        window.location.href = "sinterklaas.html";
    }
});
