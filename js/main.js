const inputField = document.querySelector("input");
const imgBox = document.querySelector(".img-box");
const QRImg = document.querySelector("#qrImg");
const generateBtn = document.querySelector("#generate");
const errorMsg = document.querySelector(".errorMsg");
const downloadBtn = document.querySelector(".button");

const generateQR = () => {
    if (inputField.value !== "") {
        QRImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputField.value}`
        imgBox.classList.add("show");
        downloadBtn.style.top = "0";

    } else {
        inputField.style.border = "2px solid tomato";
        inputField.classList.add("error");
        errorMsg.style.display = "flex";
        setTimeout(() => {
            inputField.classList.remove("error");
        }, 2000);
    }
}
generateBtn.addEventListener("click", (e) => {
    e.preventDefault()
    generateQR()
});
inputField.addEventListener("input", () => {
    inputField.style.border = "none";
    inputField.style.borderBottom = "2px solid #7b7ee2";
    errorMsg.style.display = "none";
})

function downloadQRImgDirectly(url) {
    fetch(url)
        .then(response => response.blob()) 
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob); 
            link.download = "QRCode.png";
            link.click(); 
            URL.revokeObjectURL(link.href);
        })
        .catch(() => alert("Downloading Error !"));
}

downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputField.value}`;
        downloadQRImgDirectly(qrUrl);
});