// Fetch all Data from GET request
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((res) => res.json())
    // data is passed in as a property of JSON object from app
    .then((data) => loadHTMLTable([data["data"]]));
});

//Button container
const addBtn = document.querySelector("#add-name-btn");

addBtn.onclick = function () {
  // Input form
  const nameInput = document.querySelector("#name-input");

  const name = nameInput.value;
  // reset value
  nameInput.value = "";
  // Send to back end
  const serverCall = fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    // Passing name to backend as a JSON object
    body: JSON.stringify({ name: name }),
  });
  // Server properly sends data to front-end
  serverCall
    .then((res) => res.json())
    .then((data) => {
      // data["data"] contains all properties
      insertRowIntoTable(data["data"]);
    });
};

// create new row from data in insert element
function insertRowIntoTable(data) {
  const table = document.querySelector("table tbody");
  console.log(table);
  // check if "no-data" class exists
  const isTableData = table.querySelector(".no-data");
  let tableHtml = "<tr>";

  // inserting one row
  tableHtml += `<td>${data.id}</td>`;
  tableHtml += `<td>${data.name}</td>`;
  tableHtml += `<td>${new Date(data.dateAdded).toLocaleString()}</td>`;
  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

  tableHtml += "</tr>";
  // if there is no table data
  if (isTableData) {
    // override existing Html, the text "No data"
    table.innerHTML = tableHtml;
  } else {
    // create a new row
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}
function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }
  let tableHtml = "";
  console.log(data);
  const entities = data[0];
  for (i = 0; i < entities.length; i++) {
    tableHtml += "<tr>";
    tableHtml += `<td>${entities[i].id}</td>`;
    tableHtml += `<td>${entities[i].name}</td>`;
    tableHtml += `<td>${new Date(
      entities[i].date_added
    ).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${entities[i].id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${entities[i].id}>Edit</td>`;
    tableHtml += "<tr>";
  }
  table.innerHTML = tableHtml;
}

const table = document.querySelector("table");
// Event listener can be used for deleting and editing
table.addEventListener("click", function (event) {
  // If user presses the delete button
  if (event.target.className === "delete-row-btn") {
    // accesses the ID of the row which the user pressed the button
    deleteRowById(event.target.dataset.id);
  }
  // If the user presses the edit button
  if (event.target.className === "edit-row-btn") {
    handleUpdateRow(event.target.dataset.id);
  }
});

function deleteRowById(id) {
  fetch("http://localhost:5000/delete/" + id, {
    // Specify method to be picked up by backend
    method: "DELETE",
  })
    // Parse the success object into json
    .then((response) => response.json())
    // Console log the success message
    .then((data) => {
      if (data.success) {
        // refresh page
        location.reload();
      }
    });
}

function handleUpdateRow(id) {
  const updateRow = document.querySelector("#update-row");
  // showing the text box for update
  updateRow.hidden = false;
  // changing the data-id field value to the id of the selected row
  document.querySelector("#update-row-btn").dataset.id = id;
}

const updateBtn = document.querySelector("#update-row-btn");
updateBtn.onclick = function () {
  //  Value client types in input box
  const updateNameInput = document.querySelector("#update-name-input");
  fetch("http://localhost:5000/update", {
    headers: {
      "Content-type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      id: document.querySelector("#update-row-btn").dataset.id,
      name: updateNameInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // refresh page
        location.reload();
      }
    });
};


// if the client presses the search buttton
const searchBtn = document.querySelector("#search-btn");
searchBtn.onclick = function () {
  
  const searchValue = document.querySelector("#search-input").value;
  fetch("http://localhost:5000/search/" + searchValue)
    .then((res) => res.json())
    // data is passed in as a property of JSON object from app
    .then((data) => loadHTMLTable([data["data"]]));
};
