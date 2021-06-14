function dragStartHandler(ev) {
  console.log(ev);
  ev.dataTransfer.setData("application/node", ev.target);
  ev.dataTransfer.effectAllowed = "move";
}

function dragOvertHandler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("application/node");
  console.log(data);
  const [, body] = ev.target.children;
  const addButton = body.children[body.children.length - 1];
  body.removeChild(addButton);
  body.appendChild(data);
  body.appendChild(addButton);
}

function handleInputKeys({ key }) {
  switch (key) {
    case "Enter":
      break;

    default:
      break;
  }
}

const onInputClick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.target.disabled = false;
  event.target.focus();
};

const onInputLostFocus = (event) => {
  event.target.disabled = true;
};

function addNewCard(event) {
  const [, , , column] = event.path;
  const [, body] = column.children;
  const addButton = body.children[body.children.length - 1];
  const card = document.createElement("div");
  const input = document.createElement("textarea");
  input.cols = 30;
  input.rows = 10;
  input.disabled = true;
  card.appendChild(input);
  card.classList.add("card");
  card.draggable = "true";
  card.addEventListener("click", onInputClick);
  card.addEventListener("focusout", onInputLostFocus);
  card.addEventListener("dragstart", dragStartHandler);
  body.removeChild(addButton);
  body.appendChild(card);
  body.appendChild(addButton);
}

function addNewColumn(e) {
  const [, addButton, board] = e.path;
  const column = document.createElement("div");
  const columnHeader = document.createElement("div");
  const headerInput = document.createElement("input");
  const columnBody = document.createElement("div");
  column.classList.add("board-column", "d-flex", "flex-column");
  column.addEventListener("drop", dropHandler);
  column.addEventListener("dragover", dragOvertHandler);
  column.setAttribute("id", "dropZone");
  columnHeader.classList.add("column-header");
  columnHeader.addEventListener("click", onInputClick);
  columnBody.classList.add("column-body");
  headerInput.classList.add("w-100");
  headerInput.type = "text";
  headerInput.placeholder = "Set the name of column...";
  headerInput.addEventListener("keyup", handleInputKeys);
  headerInput.addEventListener("blur", onInputLostFocus);
  headerInput.disabled = true;
  columnHeader.appendChild(headerInput);
  columnBody.appendChild(createNewCardButtonEl());
  column.appendChild(columnHeader);
  column.appendChild(columnBody);
  board.removeChild(addButton);
  board.appendChild(column);
  board.appendChild(addButton);
}

function createNewCardButtonEl() {
  const div = document.createElement("div");
  div.classList.add("new-card-button");
  const button = document.createElement("button");
  button.addEventListener("click", addNewCard);
  button.innerText = "Add new card";
  div.appendChild(button);
  return div;
}
