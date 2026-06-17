function addHistory(text) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.push({
    text: text,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let list = document.getElementById("historyList");

  list.innerHTML = "";

  history.forEach(item => {
    let div = document.createElement("div");
    div.innerText = `${item.text} - ${item.time}`;
    list.appendChild(div);
  });
}

loadHistory();

function loadHistory() {
  let list = document.getElementById("historyList");

  if (!list) return;

  let history = JSON.parse(localStorage.getItem("history")) || [];

  list.innerHTML = "";

  history.forEach(item => {
    let div = document.createElement("div");
    div.innerText = `${item.text} - ${item.time}`;
    list.appendChild(div);
  });
}

loadHistory();
