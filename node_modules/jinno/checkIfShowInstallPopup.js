import showInstallExtensionPopup from "./installExtensionPopup";

export default async function detectIfToShowInstallExtension() {
  let haveChromeExtension = await checkIfChromeExtensionExists();
  if (!haveChromeExtension) {
    let ifComponentOpen = await checkIfComponentIsOpen();
    if (ifComponentOpen) {
      showInstallExtensionPopup();
    }
  }
}
let sendApi = false;
function checkIfComponentIsOpen() {
  if (sendApi) {
    //send the api only one time
    return false;
  }
  setTimeout(() => {
    sendApi = false;
  }, 2000);
  sendApi = true;
  return new Promise((resolve) => {
    fetch("http://localhost:5463/whatopen", { method: "POST" })
      .then((res) => {
        res.text().then((resString) => {
          if (resString && resString !== "false") {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      })
      .catch((err) => {
        resolve(false);
        console.log(err);
      });
  });
}

function checkIfChromeExtensionExists() {
  return new Promise((resolved) => {
    if (document.readyState === "complete") {
      setTimeout(() => {
        let element = document.getElementById("jinnoInstalled");

        if (element) {
          resolved(true);
        } else {
          resolved(false);
        }
      }, 1000);
    } else {
      window.onload = () => {
        setTimeout(() => {
          let element = document.getElementById("jinnoInstalled");

          if (element) {
            resolved(true);
          } else {
            resolved(false);
          }
        }, 1000);
      };
    }
  });
}
