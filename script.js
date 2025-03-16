function copyEmail() {
    navigator.clipboard.writeText("ryanrony2008@gmail.com").then(() => {
        let popup = document.getElementById("copy-popup");
        popup.style.opacity = "1";

        setTimeout(() => {
            popup.style.opacity = "0";
        }, 2000);
    })};
    