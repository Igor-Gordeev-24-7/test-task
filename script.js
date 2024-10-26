const data = [
  { id: 1, product: "table", price: 100 },
  { id: 2, product: "bookshelf", price: 97 },
  { id: 5, product: "clock", price: 25 },
  { id: 7, product: "lamp", price: 150 },
  { id: 9, product: "painting", price: 247 },
  { id: 6, product: "player", price: 2967 },
  { id: 10, product: "computer", price: 9360 },
  { id: 8, product: "stool", price: 766 },
  { id: 4, product: "tv-set", price: 6844 },
  { id: 3, product: "speaker", price: 7030 },
];
let sortOrder = { id: "default", product: "default", price: "default" };
let originalData = [...data];
let sortedData = [...originalData];

document.addEventListener("DOMContentLoaded", () => {
  renderTableBody(data);
  sortTable(data.id);
});

function renderTableBody(data) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.product}</td>
            <td>${item.price}</td>
        `;
    tbody.appendChild(row);
  });
}

function sortTable(column) {
  const icon = document.getElementById(column + "-icon");

  if (sortOrder[column] === "default" || sortOrder[column] === "desc") {
    sortOrder[column] = "asc";
    sortedData.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    if (icon) icon.textContent = "▲";
  } else if (sortOrder[column] === "asc") {
    sortOrder[column] = "desc";
    sortedData.sort((a, b) => (a[column] < b[column] ? 1 : -1));
    if (icon) icon.textContent = "▼";
  } else {
    sortOrder[column] = "default";
    sortedData = [...originalData];
    if (icon) icon.textContent = "";
  }

  for (let key in sortOrder) {
    if (key !== column) {
      sortOrder[key] = "default";
      const otherIcon = document.getElementById(key + "-icon");
      if (otherIcon) otherIcon.textContent = "";
    }
  }

  renderTableBody(sortedData);
}

function clickEvent(headerId, column) {
  document
    .getElementById(headerId)
    .addEventListener("click", () => sortTable(column));
}

clickEvent("id-header", "id");
clickEvent("product-header", "product");
clickEvent("price-header", "price");

document.addEventListener("DOMContentLoaded", () =>
  renderTableBody(originalData)
);
