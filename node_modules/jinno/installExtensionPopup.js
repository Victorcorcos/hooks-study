export default function showInstallExtensionPopup() {
  if (document.getElementById("jinno_install_extension")) {
    return;
  }
  //wrapper
  const rootEl = document.createElement("div");
  rootEl.id = "jinno_install_extension";
  rootEl.style = `
    padding:20px 40px;
    transform:translateX(-50%);
    border-radius:8px 8px 0px 0px;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
    position:fixed;
    bottom:0px;
    left:50%;
    z-index:111111111111;
    backdrop-filter: blur(5px);
    background:rgba(16,16,32,0.85);`;

  //title
  const title = document.createElement("div");
  title.innerText = "To use Jinno you need to add the chrome extension.";
  title.style = `
    font-size:18px;
    color:white;`;
  rootEl.appendChild(title);

  //button
  const button = document.createElement("a");
  button.innerText = "To use Jinno you need to add the chrome extension.";
  button.innerText = "Add to chrome";
  button.target = "_blank";
  button.href =
    "https://chrome.google.com/webstore/detail/nggpkpfmdkbaakpndblpandmldendooa";
  button.style = `
    border-radius:4px;
     background: linear-gradient(
        90deg,
        rgba(141, 71, 249, 1) 0%,
        rgba(124, 65, 242, 1) 100%
    );
    color:white;
    transform:translateX(-50%);
    font-size:14px;
    cursor:pointer;
    text-decoration: none;
    padding: 10px 26px;
    margin-top:20px;
    transition:0.2s all;
    position:relative;
    float:left;
    left:50%;
    `;
  button.addEventListener("mouseenter", (e) => {
    e.target.style.transform = `translateX(-50%) scale(1.05)`;
  });
  button.addEventListener("mouseleave", (e) => {
    e.target.style.transform = `translateX(-50%)`;
  });
  rootEl.appendChild(button);

  const close = document.createElement("a");
  close.style = `
        width:11px;
        color:white;
        cursor:pointer;
        transition:0.2s all;
        position:absolute;
        top:6px;
        right:6px;
    `;
  close.insertAdjacentHTML(
    "beforeend",
    `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10 CanvasHeader_CanvasClose__1qflC" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>`
  );

  rootEl.appendChild(close);
  close.addEventListener("mouseenter", (e) => {
    e.target.style.transform = `scale(1.1)`;
  });
  close.addEventListener("mouseleave", (e) => {
    e.target.style.transform = ``;
  });
  close.addEventListener("click", () => {
    rootEl.style = "display:none";

    fetch("http://localhost:5463/close", { method: "POST" });
  });
  document.body.appendChild(rootEl);
}
