document.addEventListener("DOMContentLoaded", function() {
    const addButtons = document.querySelectorAll(".add-button");
    const addDropdowns = document.querySelectorAll(".add-drop");

    // Event listener for add buttons
    addButtons.forEach(function(button) {
        button.addEventListener("click", handleAddButtonClick);
    });

    // Event listener for add dropdowns
    addDropdowns.forEach(function(button) {
        console.log(addDropdowns);
        button.addEventListener("click", handleAddDropdownClick);
    });

    // Event listener for increase buttons
    document.querySelectorAll(".increase-btn").forEach(function(button) {
        button.addEventListener("click", handleIncreaseButtonClick);
    });

    // Event listener for decrease buttons
    document.querySelectorAll(".decrease-btn").forEach(function(button) {
        button.addEventListener("click", handleDecreaseButtonClick);
    });

    // Event listener for select elements
    document.querySelectorAll(".drop-down").forEach(function(select) {
        select.addEventListener("change", updateLinesContainer);
    });

    // Function to handle add button click for input fields
    function handleAddButtonClick() {
        const card = this.closest(".card");
        if (card) {
            const inputs = card.querySelectorAll(".inputs input");
            const value = parseInt(inputs[0].value);
            addWorkspaceLine(card, value);
        }
    }

    // Function to handle add button click for dropdowns
    function handleAddDropdownClick() {
        const card = this.closest(".card");
        if (card) {
            const dropdowns = card.querySelectorAll(".drop-downs select");
            const value = dropdowns[0].selectedOptions[0].textContent; // Get selected option's textContent
            console.log(value);
            addWorkspaceLine(card, value);
        }
    }

    // Function to add a workspace line
    function addWorkspaceLine(card, value) {
        const fieldName = card.querySelector("h5").textContent;
        
        let workspaceLine = document.querySelector(`.lines-container [data-field="${fieldName}"]`);
        if (!workspaceLine) {
            workspaceLine = document.createElement("div");
            workspaceLine.classList.add("workspace-line");
            workspaceLine.dataset.field = fieldName;
            document.querySelector(".lines-container").appendChild(workspaceLine);
        }
    
        workspaceLine.innerHTML = `
            <span>${fieldName}</span>
            <span>${value}</span>
            <button class="delete-button">Delete</button>
        `;
        const deleteButton = workspaceLine.querySelector(".delete-button");
        deleteButton.addEventListener("click", function() {
            workspaceLine.remove();
        });
    }
    

    // Function to handle increase button click
    function handleIncreaseButtonClick() {
        const input = this.parentElement.querySelector(".input");
        if (input) {
            let value = parseInt(input.value);
            value++;
            input.value = value;
        }
    }

    // Function to handle decrease button click
    function handleDecreaseButtonClick() {
        const input = this.parentElement.querySelector(".input");
        if (input) {
            let value = parseInt(input.value);
            if (value > 0) {
                value--;
                input.value = value;
            }
        }
    }

    // Function to update lines container
    function updateLinesContainer() {
        const linesContainer = document.querySelector(".lines-container");
        if (!linesContainer) return; // Ensure lines container exists

        linesContainer.innerHTML = ""; // Clear previous content

        const addButtons = document.querySelectorAll(".add-button");

        addButtons.forEach(button => {
            const card = button.closest(".card");
            if (card) {
                const inputs = card.querySelectorAll(".inputs input");
                const dropdowns = card.querySelectorAll(".drop-downs select");
                let value;
                if (inputs.length > 0) {
                    value = parseInt(inputs[0].value);
                } else if (dropdowns.length > 0) {
                    value = dropdowns[0].selectedOptions[0].textContent; // Get selected option's textContent
                }
                const fieldName = card.querySelector("h5").textContent;
                if (value > 0) {
                    let workspaceLine = document.createElement("div");
                    workspaceLine.classList.add("workspace-line");
                    workspaceLine.dataset.field = fieldName;
                    workspaceLine.innerHTML = `
                        <span>${fieldName}</span>
                        <span>${value}</span>
                        <button class="delete-button">Delete</button>
                    `;
                    linesContainer.appendChild(workspaceLine);
                    const deleteButton = workspaceLine.querySelector(".delete-button");
                    deleteButton.addEventListener("click", function() {
                        workspaceLine.remove();
                    });
                }
            }
        });
    }
});
