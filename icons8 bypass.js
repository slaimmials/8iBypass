function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

async function downloadImage(imageSrc,nameOfDownload) {
    const response = await fetch(imageSrc);
  
    const blobImage = await response.blob();
  
    const href = URL.createObjectURL(blobImage);
  
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;
  
    document.body.appendChild(anchorElement);
    anchorElement.click();
  
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
}

async function programm() {
    if(location.hostname=="icons8.ru") {
        while (document.getElementsByClassName("app-modal-footer__content").length==0) {
            await wait(5000);
        }
        let buttonPlace = document.getElementsByClassName("app-modal-footer__content")[0]
        let modalImage = document.getElementsByClassName("app-modal-icon__icon-image")[0]
        let button = document.createElement("button")
        button.innerHTML = "Download"
        buttonPlace.appendChild(button)
        button.onclick = function() {
            let id = Array.from(modalImage.srcset)
            let index = 0
            let lastStr = ""
            let gotId = ""
            console.log(id.length)
            while ((id[index+1] != "d" || lastStr != "i") && index <= id.length) {
                index += 1
                lastStr = id[index]
            }
            if (index > id.length) {
                alert("failed")
                return;
            }
            while (id[index] != "&") {
                index += 1
                gotId = gotId + id[index]
            }
            let convertedId = ""
            for (let i = 2; i < Array.from(gotId).length-1; i++) {
                convertedId = convertedId + Array.from(gotId)[i]
            }
            //let nameObj = document.getElementsByClassName("app-grid-icon__text")[0]
            //let name = nameObj.innerHTML
            let sizeObj = document.getElementsByClassName("app-modal-icon__title")[0]
            let sizeText = sizeObj.innerHTML
            let sizeConverted = sizeText.substring(0,3)
            downloadImage("https://img.icons8.com/?id="+convertedId+"&format=png&size="+sizeConverted,"output.png")
            console.log("https://img.icons8.com/?id="+convertedId+"&format=png&size="+sizeConverted)
        }
    } 
}

programm()