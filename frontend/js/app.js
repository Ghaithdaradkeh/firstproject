const API_URL = "http://localhost:3000/api/expenses";

const expenseForm = document.querySelector("#expenseForm" );
const expensesTableBody = document.querySelector("#expensesTableBody");
const categoryFilter = document.querySelector("#categoryFilter");
const editExpenseForm = document.querySelector("#editExpenseForm");

let allExpenses = [];
let editingExpenseId = null;


expenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const expenseData = {
    title: document.querySelector("#expenseTitle").value.trim(),
    amount: Number(document.querySelector("#expenseAmount").value),
    category: document.querySelector("#expenseCategory").value,
    date: document.querySelector("#expenseDate").value
  };

  try {
    let response;

    if (editingExpenseId === null) {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
      });
    } else {
      response = await fetch(`${API_URL}/${editingExpenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
      });
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add expense");
    }

    expenseForm.reset();

    await getExpenses();

    showAlert("Expense added successfully", "success");

    editingExpenseId = null;

  } catch (error) {
    console.error(error.message);
    showAlert(error.message, "danger");
  }
});


async function getExpenses() {
  try {
    showSpinner();

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const expenses = await response.json();

    allExpenses = expenses;

    renderSummary(expenses);
    renderTable(expenses);

  } catch (error) {
    console.error(error.message);

    showAlert(
      "Could not load expenses. Please make sure the server is running.",
      "danger"
    );

  } finally {
    hideSpinner();
  }
}


async function getExpenseById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch expense");
    }

    const expense = await response.json();

    document.querySelector("#editExpenseTitle").value = expense.title;
    document.querySelector("#editExpenseAmount").value = expense.amount;
    document.querySelector("#editExpenseCategory").value = expense.category;
    document.querySelector("#editExpenseDate").value = expense.date;

    editingExpenseId = expense.id;

    const editModal = new bootstrap.Modal(
      document.querySelector("#editExpenseModal")
    );

    editModal.show();

    return expense;

  } catch (error) {
    console.error(error.message);
  }
}


editExpenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updatedExpense = {
    title: document.querySelector("#editExpenseTitle").value.trim(),
    amount: Number(document.querySelector("#editExpenseAmount").value),
    category: document.querySelector("#editExpenseCategory").value,
    date: document.querySelector("#editExpenseDate").value
  };

  try {
    const response = await fetch(`${API_URL}/${editingExpenseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedExpense)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update expense");
    }

    const modalElement = document.querySelector("#editExpenseModal");
    const editModal = bootstrap.Modal.getInstance(modalElement);

    editModal.hide();

    editExpenseForm.reset();

    editingExpenseId = null;

    await getExpenses();

    showAlert("Expense updated successfully", "success");

  } catch (error) {
    console.error(error.message);
    showAlert(error.message, "danger");
  }
});


async function deleteExpense(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete expense");
    }

    await getExpenses();

    showAlert("Expense deleted successfully", "success");

  } catch (error) {
    console.error(error.message);
    showAlert(error.message, "danger");
  }
}


expensesTableBody.addEventListener("click", async (event) => {
  const clickedButton = event.target;

  if (clickedButton.classList.contains("edit-btn")) {
    const expenseId = clickedButton.dataset.id;

    await getExpenseById(expenseId);
  }

  if (clickedButton.classList.contains("delete-btn")) {
    const expenseId = clickedButton.dataset.id;

    const userConfirmed = confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!userConfirmed) {
      return;
    }

    await deleteExpense(expenseId);
  }
});


function showAlert(message, type = "success") {
  const alertMessage = document.querySelector("#alertMessage");

  alertMessage.textContent = message;
  alertMessage.className = `alert alert-${type}`;
}


function showSpinner() {
  document.querySelector("#loadingSpinner").classList.remove("d-none");
}


function hideSpinner() {
  document.querySelector("#loadingSpinner").classList.add("d-none");
}


function getCategoryClass(category) {
  if (category === "Food") {
    return "text-bg-success";
  }

  if (category === "Transport") {
    return "text-bg-primary";
  }

  if (category === "Bills") {
    return "text-bg-danger";
  }

  if (category === "Entertainment") {
    return "text-bg-warning";
  }

  return "text-bg-secondary";
}


function renderTable(expenses) {
  expensesTableBody.innerHTML = "";

  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML =
      `
      <td>${expense.title}</td>
      <td>${Number(expense.amount).toFixed(2)} JD</td>

      <td>
        <span class="badge ${getCategoryClass(expense.category)}">
          ${expense.category}
        </span>
      </td>

      <td>${expense.date}</td>

      <td>
        <button class="btn btn-warning btn-sm edit-btn" data-id="${expense.id}">
          Edit
        </button>

        <button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">
          Delete
        </button>
      </td>
    `;

    expensesTableBody.appendChild(row);
  });
}


function renderSummary(expenses) {
  const totalAmount = document.querySelector("#totalAmount");
  const expenseCount = document.querySelector("#expenseCount");
  const highestExpense = document.querySelector("#highestExpense");

  const total = expenses.reduce((sum, expense) => {
    return sum + Number(expense.amount);
  }, 0);

  const count = expenses.length;

  const highest = expenses.reduce((max, expense) => {
    return Number(expense.amount) > Number(max.amount)
      ? expense
      : max;
  }, { amount: 0 });

  totalAmount.textContent = `${total.toFixed(2)} JD`;
  expenseCount.textContent = count;
  highestExpense.textContent = `${Number(highest.amount).toFixed(2)} JD`;
}


categoryFilter.onchange = function () {
  const selectedCategory = this.value.trim().toLowerCase();

  if (selectedCategory === "all") {
    renderTable(allExpenses);
    return;
  }

  const filteredExpenses = allExpenses.filter((expense) => {
    return String(expense.category).trim().toLowerCase() === selectedCategory;
  });

  renderTable(filteredExpenses);
};


getExpenses();






