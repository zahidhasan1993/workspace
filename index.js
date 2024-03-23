document.addEventListener("DOMContentLoaded", function() {
    const addButtons = document.querySelectorAll(".add-button");
    const addDropdowns = document.querySelectorAll(".add-drop");
    let calculate = document.getElementById("calculate");

    calculate.classList.add("hidden")
    // Event listener for add buttons
    addButtons.forEach(function(button) {
        button.addEventListener("click", handleAddButtonClick);
    });

    // Event listener for add dropdowns
    addDropdowns.forEach(function(button) {
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
        select.addEventListener("change", function(event) {
            event.preventDefault(); // Prevent the default behavior (page refresh)
           
        });
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
            addWorkspaceLine(card, value);
        }
    }

    // Function to add a workspace line
    function addWorkspaceLine(card, value) {
        const fieldName = card.querySelector("h5").textContent;
        
        let workspaceLine = document.querySelector(`.lines-container [data-field="${fieldName}"]`);
        

        console.log(calculate);
        if (!workspaceLine) {
            console.log('hello');
            workspaceLine = document.createElement("div");
            workspaceLine.classList.add("workspace-line");
            workspaceLine.dataset.field = fieldName;
            document.querySelector(".lines-container").appendChild(workspaceLine);
            calculate.classList.remove("hidden")

        }
    
        workspaceLine.innerHTML = `
        <div class="fieldConrainer">
            <span class="fieldName">${fieldName}</span>
            <span class="fieldValue">${value}</span>
            <button class="delete-button">Delete</button>
        </div>
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
    // function updateLinesContainer(select) {
    //     const card = select.closest(".card");
    //     const fieldName = card.querySelector("h5").textContent;
    //     const value = select.selectedOptions[0].textContent;

    //     const workspaceLine = document.querySelector(`.lines-container [data-field="${fieldName}"]`);
        

    //     if (workspaceLine) {
    //         const fieldValueSpan = workspaceLine.querySelector('.fieldValue');
    //         if (fieldValueSpan) {
    //             fieldValueSpan.textContent = value;
    //         }
    //     } else {
    //         const newWorkspaceLine = document.createElement("div");
    //         newWorkspaceLine.classList.add("workspace-line");
    //         newWorkspaceLine.dataset.field = fieldName;

    //         newWorkspaceLine.innerHTML = `
    //             <div class="fieldConrainer">
    //                 <span class="fieldName">${fieldName}</span>
    //                 <span class="fieldValue">${value}</span>
    //                 <button class="delete-button">Delete</button>
    //             </div>
    //         `;
    
    //         document.querySelector(".lines-container").appendChild(newWorkspaceLine);

    //         const deleteButton = newWorkspaceLine.querySelector(".delete-button");
    //         deleteButton.addEventListener("click", function() {
                
    //             newWorkspaceLine.remove();
    //         });
    //     }
    // }
});
