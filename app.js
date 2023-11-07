const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', function () {
    sidebar.classList.toggle('active');
});

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
    const toggleBtn = dropdown.querySelector(".toggle-btn");
    const content = dropdown.querySelector(".content");

    toggleBtn.addEventListener("click", () => {
        content.classList.toggle("open");
        toggleBtn.classList.toggle("open");
    });
});

// Add an event listener to the "Add" button with the .add-button class
document.querySelector(".add-button").addEventListener("click", addReminder);

// Function to update the count for the list of reminders
function updateCount() {
    const reminderList = document.getElementById("reminder-list");
    const countElement = document.querySelector(".nav-item[data-target='reminders'] .count p");

    const reminderItems = reminderList.querySelectorAll("li");
    const reminderCount = reminderItems.length;

    countElement.textContent = reminderCount;
}

function addReminder() {
    const input = document.getElementById("reminder-input");
    const reminderText = input.value.trim();
    const reminderList = document.getElementById("reminder-list");

    if (reminderText !== "") {
        const li = document.createElement("li");
        li.textContent = reminderText;
        reminderList.appendChild(li);
        input.value = "";

        // Update the count once new reminder is added
        updateCount();
    }
}

// Add a event listener to remove each item from the list when the item is clicked
const reminderList = document.getElementById("reminder-list");

reminderList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        removeReminder(event.target);
    }
});

function removeReminder(li) {
    reminderList.removeChild(li);
    // reverse count once the list item is removed
    updateCount();
}

// Function to update the shopping list counter on the aside
function updateShoppingListCount() {
    const shoppingList = document.querySelector(".container.shopping-list .checklist");
    const countElement = document.querySelector(".nav-item[data-target='shopping-list'] .count p");

    const shoppingListItems = shoppingList.querySelectorAll("label");
    const checkedItems = Array.from(shoppingListItems).filter((item) =>
        item.querySelector("input[type='checkbox']").checked
    );
    const shoppingListCount = shoppingListItems.length - checkedItems.length;

    countElement.textContent = shoppingListCount;
}

// Function to initialize the shopping list count(shows current number of items)
function initializeShoppingListCount() {
    updateShoppingListCount();
}

// Add event listener to dynamically update the shopping list count
document.querySelector(".container.shopping-list").addEventListener("change", (event) => {
    if (event.target.matches("input[type='checkbox']")) {
        // Update the shopping list count when checkboxes are changed
        updateShoppingListCount();
    }
});

// Initialize the shopping list count when the page loads
initializeShoppingListCount();

// update dropdowns checklist to reflect the count
function updateTotalCount() {
    const checkboxes = document.querySelectorAll('.container.to-do-list .custom-checkbox');
    const totalCountElement = document.querySelector('.sidebar .nav-item[data-target="to-do-list"] .count p');

    let checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
    const totalItemCount = checkboxes.length;

    totalCountElement.textContent = totalItemCount - checkedCheckboxes.length;

    checkboxes.forEach((checkbox) => {
        const label = checkbox.closest('label');
        const itemText = label.querySelector('p');
        if (checkbox.checked) {
            itemText.style.textDecoration = 'line-through';
            itemText.style.color = 'gray';
        } else {
            itemText.style.textDecoration = 'none';
            itemText.style.color = 'purple';
        }
    });
}

// Attach the function to the change event of checkboxes
const checkboxes = document.querySelectorAll('.container.to-do-list .custom-checkbox');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateTotalCount);
});

// Initial count update
updateTotalCount();

const navItems = document.querySelectorAll(".nav-item");
const containers = document.querySelectorAll(".container");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        const target = item.getAttribute("data-target");

        // Hide all containers
        containers.forEach((container) => {
            container.style.display = "none";
        });

        // Show the selected container
        document.querySelector(`.${target}`).style.display = "block";

        // Remove the "selected" class from all items
        navItems.forEach((navItem) => {
            navItem.classList.remove("selected");
        });

        // Add the "selected" class to the clicked item
        item.classList.add("selected");
    });
});

// Initially, hide all containers except the default one (e.g., REMINDERS)
containers.forEach((container) => {
    container.style.display = "none";
});
document.querySelector(".reminders").style.display = "block"; // Show the default container

const searchbar = document.getElementById("searchbar");
const listItems = document.querySelectorAll(".details");
const searchInput = document.querySelector(".search-input");

// Add an input event listener to the search bar
searchInput.addEventListener("input", function () {
    const searchTerm = searchbar.value.toLowerCase();

    // Loop through the list items (excluding the search bar item) and hide/show them based on the search term
    listItems.forEach((item) => {
        if (item.querySelector(".search-input") === null) {
            const text = item.textContent.toLowerCase();
            const listItem = item.closest("li");

            if (text.includes(searchTerm)) {
                listItem.style.display = "block";
            } else {
                listItem.style.display = "none";
            }
        }
    });
});

const addIcons = document.querySelectorAll('.add-icon');

// Function to handle the click event for the add-icon buttons
function handleAddItemClick(event) {
    // Get the parent dropdown container
    const dropdown = event.target.closest('.dropdown');

    if (dropdown) {
        // Prompt the user to add an item to the checklist
        const newItem = prompt('Add a new item to the checklist:');

        if (newItem !== null) {
            // Create a new label element for the new item
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" class="custom-checkbox">
                <span class="checkmark"></span>
                <p>${newItem}</p>
            `;

            // Add the new item to the checklist
            const checklist = dropdown.querySelector('.checklist');
            checklist.appendChild(label);

            // Attach an event listener to the new checkbox
            const newCheckbox = label.querySelector('.custom-checkbox');
            newCheckbox.addEventListener('change', () => {
                updateTotalCount();
            });

            // Update the total count immediately after adding the new item
            updateTotalCount();
        }
    }
}

// Attach the event listener to each .add-icon button
addIcons.forEach((addIcon) => {
    addIcon.addEventListener('click', handleAddItemClick);
});

// Get the shopping list .add-icon button
const shoppingListAddIcon = document.querySelector('.shopping-list .add-icon');

// Function to handle the click event for the shopping list .add-icon button
function handleShoppingListAddItemClick(event) {
    // Get the shopping list container
    const shoppingList = document.querySelector('.shopping-list');

    if (shoppingList) {
        // Prompt the user to add an item to the shopping list
        const newItem = prompt('Add a new item to the shopping list:');

        if (newItem !== null) {
            // Create a new label element for the new item
            const label = document.createElement('label');
            label.innerHTML = `
        <input type="checkbox" class="custom-checkbox" onchange="toggleStrikethrough(this)">
        <span class="checkmark"></span>
        <p>${newItem}</p>
      `;

            // Add the new item to the shopping list
            const shoppingListContainer = shoppingList.querySelector('.checklist');
            shoppingListContainer.appendChild(label);

            updateShoppingListCount();
        }
    }
}

// Attach the event listener to the shopping list .add-icon button
shoppingListAddIcon.addEventListener('click', handleShoppingListAddItemClick);

// Add event listeners to clear the checklist for each container
const clearButtons = document.querySelectorAll('.container button.clear');
clearButtons.forEach((button) => {
    button.addEventListener('click', () => clearChecklist(button));
});

function clearChecklist(button) {
    // Find the parent container of the clicked clear button
    const container = button.closest('.container, .content');

    // Find the checklist within the container
    const checklist = container.querySelector('.checklist');

    // Clear all checklist items
    checklist.innerHTML = '';

    updateTotalCount();
    updateShoppingListCount();
}

function toggleStrikethrough(checkbox) {
    const label = checkbox.parentElement;

    if (checkbox.checked) {
        label.style.textDecoration = "line-through";
        label.style.color = "#888";
    } else {
        label.style.textDecoration = "none";
        label.style.color = "purple";
    }
}