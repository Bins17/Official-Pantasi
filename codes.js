var copyButton = document.getElementById("copyButton");

        var selectedPlayersPG = [];
        var selectedPlayersSG = [];
        var selectedPlayersSF = []; 
        var selectedPlayersPF = [];
        var selectedPlayersC = [];
        var totalSelectedPrice = 0;
        var requiredPrice = 305;
        var budgetLeft = requiredPrice - totalSelectedPrice;

        var pgSelect = document.getElementById("pgSelect");
        var sgSelect = document.getElementById("sgSelect");
        var sfSelect = document.getElementById("sfSelect");
        var pfSelect = document.getElementById("pfSelect");
        var cSelect = document.getElementById("cSelect");
        var selectedPlayersList = document.getElementById("selectedPlayersList");
        // Update the total price and budget elements
        var totalPriceElement = document.getElementById("totalPriceLineup");
        var budgetLeftElement = document.getElementById("budgetLeftValue");

           
           function isPlayerSelected(playerName, playerArray) {
    return playerArray.includes(playerName);
}
        pgSelect.addEventListener("change", function() {
                    if (isMaxPlayersSelected()) {
        alert("You have already selected the maximum number of players (5).");
        pgSelect.selectedIndex = 0; // Reset the dropdown 
        return;
    }
            var selectedOption = pgSelect.options[pgSelect.selectedIndex];
            var pgName = selectedOption.value;

            // Check if the player is already selected
            if (selectedPlayersPG.includes(pgName)) {
                // Player is already selected, remove it from the selection
                removePlayer(pgName, true);
                return;

                }

            var playerPrice = parseInt(selectedOption.getAttribute("data-price"));

            // Check if adding the player exceeds the budget
            if (totalSelectedPrice + playerPrice > requiredPrice) {
                // Display an alert that the budget would be exceeded
                alert("Adding this player would exceed the budget.");
                pgSelect.selectedIndex = 0; 
                return;
            }
            selectedPlayersPG.push(pgName);
            totalSelectedPrice += playerPrice;
            budgetLeft -= playerPrice;
           totalPriceElement.textContent = "Salary: " + totalSelectedPrice + "k/" + requiredPrice + "k";

            // Create and add the player to the selected players list
            addPlayerToSelectedList(pgName, true);

        });
           

        sgSelect.addEventListener("change", function() {
            if (isMaxPlayersSelected()) {
        alert("You have already selected the maximum number of players (5).");
        sgSelect.selectedIndex = 0; // Reset the dropdown 
        return;
    }
            var selectedOption = sgSelect.options[sgSelect.selectedIndex];
            var sgName = selectedOption.value;

            // Check if the player is already selected
            if (selectedPlayersSG.includes(sgName)) {
                // Player is already selected, remove it from the selection
                removePlayer(sgName, false);
                return;
            }

            var playerPrice = parseInt(selectedOption.getAttribute("data-price"));

            // Check if adding the player exceeds the budget
            if (totalSelectedPrice + playerPrice > requiredPrice) {
                // Display an alert that the budget would be exceeded
                alert("Adding this player would exceed the budget.");
                sgSelect.selectedIndex = 0; 
                return;
            }

            // Handle selection of Shooting Guard here
            selectedPlayersSG.push(sgName);
            totalSelectedPrice += playerPrice;
            budgetLeft -= playerPrice;
            // Update the total price and budget elements
          totalPriceElement.textContent = "Salary: " + totalSelectedPrice + "k/" + requiredPrice + "k";

            addPlayerToSelectedList(sgName, false);
           
            
        });

        function addPlayerToSelectedList(playerName, isPG) {
            var listItem = document.createElement("li");
            var positionLabel = document.createElement("span");
            positionLabel.textContent = isPG ? "PG" : "SG";
            positionLabel.style.marginRight = "8px";
            listItem.appendChild(positionLabel);

            var playerNameNode = document.createTextNode(playerName);
            listItem.appendChild(playerNameNode);
            listItem.id = "player_" + playerName;

            var removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = function() {
                removePlayer(playerName, isPG);
            };
            listItem.appendChild(removeButton);

            selectedPlayersList.appendChild(listItem);
        }

        function goBack() {
            window.location.href = 'index.html';
        }

        function removePlayer(playerName, isPG) {
            var playerArray = isPG ? selectedPlayersPG : selectedPlayersSG;
            var playerIndex = playerArray.indexOf(playerName);
            if (playerIndex !== -1) {
                playerArray.splice(playerIndex, 1);

                var listItem = document.getElementById("player_" + playerName);
                if (listItem) {
                    selectedPlayersList.removeChild(listItem);

                    var playerOption = isPG ? pgSelect.querySelector(`option[value="${playerName}"]`) :
                        sgSelect.querySelector(`option[value="${playerName}"]`);

                    if (playerOption) {
                        playerOption.selected = false;
                    }

                    totalSelectedPrice -= parseInt(playerOption.getAttribute("data-price"));
                    budgetLeft += parseInt(playerOption.getAttribute("data-price"));
                    // Update the total price and budget elements
totalPriceElement.textContent = totalSelectedPrice + "k/" + requiredPrice + "k";
budgetLeftElement.textContent = budgetLeft + "k/" + requiredPrice + "k";

                }
            }
        }

 function addPlayerToSelectedList(playerName, isPG, isSF, isPF, isCenter) {
    var listItem = document.createElement("li");

    // Create a circular design element for the player's position
    var positionLabel = document.createElement("div");
    if (isPG) {
        positionLabel.classList.add("position-circle");
        positionLabel.textContent = "PG";
    } else if (isSF) {
        positionLabel.classList.add("position-circle");
        positionLabel.textContent = "SF";
    } else if (isPF) {
        positionLabel.classList.add("position-circle");
        positionLabel.textContent = "PF";
    } else if (isCenter) {
        positionLabel.classList.add("position-circle");
        positionLabel.textContent = "C";
    } else {
        positionLabel.classList.add("sg-circle"); // Use "sg-circle" class for "SG" position
        positionLabel.textContent = "SG";
    }

    var playerNameNode = document.createTextNode(playerName);
    var playerPrice = document.createElement("span"); // Create a span element for the player's price
    var playerPriceValue;
    if (isPG) {
        playerPriceValue = pgSelect.querySelector(`option[value="${playerName}"]`);
    } else if (isSF) {
        playerPriceValue = sfSelect.querySelector(`option[value="${playerName}"]`);
    } else if (isPF) {
        playerPriceValue = pfSelect.querySelector(`option[value="${playerName}"]`);
    } else if (isCenter) {
        playerPriceValue = cSelect.querySelector(`option[value="${playerName}"]`);
    } else {
        playerPriceValue = sgSelect.querySelector(`option[value="${playerName}"]`);
    }

    // Check if the player option exists and has a data-price attribute
    if (playerPriceValue && playerPriceValue.getAttribute("data-price")) {
        playerPrice.textContent = playerPriceValue.getAttribute("data-price");
    }

    listItem.appendChild(positionLabel);
    listItem.appendChild(playerNameNode);
    listItem.appendChild(playerPrice); // Append the price element to the list item
    listItem.id = "player_" + playerName;

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
        removePlayer(playerName, isPG, isSF, isPF, isCenter); // Pass isPF to the removePlayer function
    };
    listItem.appendChild(removeButton);
    selectedPlayersList.appendChild(listItem);
    updateBudgetLeft();
}


        
function removePlayer(playerName, isPG, isSF, isPF, isCenter) {
    var playerArray;
    var selectElement;


    if (isPG) {
        playerArray = selectedPlayersPG;
        selectElement = pgSelect;
    } else if (isSF) {
        playerArray = selectedPlayersSF;
        selectElement = sfSelect;
    } else if (isPF) {
        playerArray = selectedPlayersPF;
        selectElement = pfSelect;
     } else if (isCenter) { 
         playerArray = selectedPlayersC;
         selectElement = cSelect;
    } else {
        playerArray = selectedPlayersSG;
        selectElement = sgSelect;
    }

    var playerIndex = playerArray.indexOf(playerName);
    if (playerIndex !== -1) {
        playerArray.splice(playerIndex, 1);

        var listItem = document.getElementById("player_" + playerName);
        if (listItem) {
            selectedPlayersList.removeChild(listItem);

            var playerOption = selectElement.querySelector(`option[value="${playerName}"]`);

            if (playerOption) {
                playerOption.selected = false;
                playerOption.disabled = false; // Re-enable the option
            }

            totalSelectedPrice -= parseInt(playerOption.getAttribute("data-price"));
            budgetLeft += parseInt(playerOption.getAttribute("data-price"));
            // Update the total price and budget elements
            totalPriceElement.textContent = "Salary: " + totalSelectedPrice + "k/" + requiredPrice + "k";

         selectElement.selectedIndex = 0;
         updateBudgetLeft();
          }
        }
       }

sfSelect.addEventListener("change", function() {
    if (isMaxPlayersSelected()) {
        alert("You have already selected the maximum number of players (5).");
        sfSelect.selectedIndex = 0; // Reset the dropdown 
        return;
    }
    var selectedOption = sfSelect.options[sfSelect.selectedIndex];
    var sfName = selectedOption.value;

    // Check if the player is already selected
    if (selectedPlayersSF.includes(sfName)) {
        // Player is already selected, remove it from the selection
        removePlayer(sfName, false, true); // Pass true for isSF
        return;
    }

    var playerPrice = parseInt(selectedOption.getAttribute("data-price"));

    // Check if adding the player exceeds the budget
    if (totalSelectedPrice + playerPrice > requiredPrice) {
        // Display an alert that the budget would be exceeded
        alert("Adding this player would exceed the budget.");
        sfSelect.selectedIndex = 0; 
        return;
    }

    // Handle selection of Small Forward here
    selectedPlayersSF.push(sfName);
    totalSelectedPrice += playerPrice;
    budgetLeft -= playerPrice;
    // Update the total price and budget elements
   totalPriceElement.textContent = "Salary: " + totalSelectedPrice + "k/" + requiredPrice + "k";



    addPlayerToSelectedList(sfName, false, true); // Pass true for isSF
    updateBudgetLeft();
    
});

    function isMaxPlayersSelected() {
    return (
        selectedPlayersPG.length +
        selectedPlayersSG.length +
        selectedPlayersSF.length +
        selectedPlayersPF.length +
        selectedPlayersC.length >=
        5
    );
}


// Get the copy button element
var copyButton = document.getElementById("copyButton");

copyButton.addEventListener("click", function () {
    // Check if at least one player has been selected from each dropdown list
    if (
        selectedPlayersPG.length === 0 ||
        selectedPlayersSG.length === 0 ||
        selectedPlayersSF.length === 0 ||
        selectedPlayersPF.length === 0 ||
        selectedPlayersC.length === 0
    ) {
        alert("Please select 1 player from each position. ");
    } else {
    var selectedPlayersText = "[Type your name here]\n";

    // Loop through the selected players and add them to the string
    selectedPlayersPG.forEach(function (player) {
    selectedPlayersText += "PG: " + player + " " + pgSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + "\n";
    });

    selectedPlayersSG.forEach(function (player) {
        selectedPlayersText += "SG: " + player + " " + sgSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + "\n";

    });

    selectedPlayersSF.forEach(function (player) {
     selectedPlayersText += "SF: " + player + " " + sfSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + "\n";
    });

   selectedPlayersPF.forEach(function (player) {
        selectedPlayersText += "PF: " + player + " " + pfSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + "\n";
    });

   selectedPlayersC.forEach(function (player) {
        selectedPlayersText += "C: " + player + " " + cSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + "\n";
    });
   selectedPlayersText += "TOTAL: " + totalSelectedPrice + "/" + requiredPrice + "k";



    // Create a temporary textarea element to hold the text
    var textarea = document.createElement("textarea");
    textarea.value = selectedPlayersText;
    document.body.appendChild(textarea);

    // Select the text in the textarea and copy it to the clipboard
    textarea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(textarea);
// Show the success box
    showSuccessBox();
}
});


pfSelect.addEventListener("change", function() {
    if (isMaxPlayersSelected()) {
        alert("You have already selected the maximum number of players (5).");
        pfSelect.selectedIndex = 0; // Reset the dropdown to its initial state
        return;
    }
    var selectedOption = pfSelect.options[pfSelect.selectedIndex];
    var pfName = selectedOption.value;

    // Check if the player is already selected
    if (selectedPlayersPF.includes(pfName)) {
        // Player is already selected, remove it from the selection
        removePlayer(pfName, false, false, true); // Pass true for isPF
        return;
    }

    var playerPrice = parseInt(selectedOption.getAttribute("data-price"));

    // Check if adding the player exceeds the budget
    if (totalSelectedPrice + playerPrice > requiredPrice) {
        // Display an alert that the budget would be exceeded
        alert("Adding this player would exceed the budget.");
        pfSelect.selectedIndex = 0; // Reset the dropdown
        return;
    }

    // Handle selection of Power Forward here
    selectedPlayersPF.push(pfName);
    totalSelectedPrice += playerPrice;
    budgetLeft -= playerPrice;
    // Update the total price and budget elements
    totalPriceElement.textContent = "Salary: " + totalSelectedPrice + "k/" + requiredPrice + "k";

    // Create and add the player to the selected players list
    addPlayerToSelectedList(pfName, false, false, true); // Pass true for isPF
});



cSelect.addEventListener("change", function () {
            if (isMaxPlayersSelected()) {
                alert("You have already selected the maximum number of players (5).");
                cSelect.selectedIndex = 0; // Reset the dropdown 
                return;
            }
            var selectedOption = cSelect.options[cSelect.selectedIndex];
            var centerName = selectedOption.value;

            if (selectedPlayersC.includes(centerName)) {
                removePlayer(centerName, false, false, false, true); // Pass true for isCenter
                return;
            }
            var playerPrice = parseInt(selectedOption.getAttribute("data-price"));

            if (totalSelectedPrice + playerPrice > requiredPrice) {
                alert("Adding this player would exceed the budget.");
                cSelect.selectedIndex = 0;
                return;
            }

            selectedPlayersC.push(centerName);
            totalSelectedPrice += playerPrice;
            budgetLeft -= playerPrice;

            totalPriceElement.textContent = "Salary: " + totalSelectedPrice + "k/" + requiredPrice + "k";

            addPlayerToSelectedList(centerName, false, false, false, true); // Pass true for isCenter
            updateBudgetLeft();
        });
        updateBudgetLeft();

        function addRemoveButtonEventListener(centerName, isCenter) {
            var removeButton = document.getElementById("removeButton_" + centerName);
            removeButton.addEventListener("click", function () {
                removePlayer(centerName, false, false, false, true); // Pass true for isCenter
            });
        }

      function showSuccessBox() {
    var successBox = document.getElementById("successBox");
    successBox.classList.add("show");

    // Hide the success box after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        successBox.classList.remove("show");
    }, 2000); // 2 seconds
}

function updateBudgetLeft() {
   budgetLeftElement.innerHTML = "Left: <span style='color: white; background-color: transparent; padding: 2px;'><span style='color: lightgreen;'>" + budgetLeft  + "k</span></span>";
}


const nbaGamesToday = [
"Hornets @ Wizards 7:00am",
"Sixers @ Pistons 8:00am",
"Nets @ Celtics 8:30am",
"Timberwolves @ Spurs 9:00am",
"Pelicans @ Rockets 9:00am",
"Jazz @ Grizzlies 9:00am",
"Clippers @ Mavericks 9:30am",
"Thunder @ Kings 11:00am",
"Lakers @ Suns 11:00am",
];


function populateGameList() {
    const gameList = document.getElementById("gameList");

    nbaGamesToday.forEach((game) => {
        const listItem = document.createElement("li");
        listItem.textContent = game;
        gameList.appendChild(listItem);
    });
}


populateGameList();

// Function to update the lineup dynamically
function updateLineup() {
}


updateLineup();

function updateCountdown() {
          const targetDate = new Date('2023-11-10T22:00:00');
const now = new Date().getTime();
const distance = targetDate - now;


            // Calculate time remaining
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the countdown timer
            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;

            // If the countdown is over, display a message
            if (distance < 0) {
                clearInterval(interval);
                document.getElementById("days").textContent = "00";
                document.getElementById("hours").textContent = "00";
                document.getElementById("minutes").textContent = "00";
                document.getElementById("seconds").textContent = "00";
            }
        }

        // Update the countdown every second
        const interval = setInterval(updateCountdown, 1000);

        // Initial update
        updateCountdown();



        const nbaGamesSecondDay = [

   
    
];

function populateGameListSecondDay() {
    const gameListSecondDay = document.getElementById("gameListSecondDay");

    nbaGamesSecondDay.forEach((game) => {
        const listItem = document.createElement("li");
        listItem.textContent = game;
        gameListSecondDay.appendChild(listItem);
    });
}

populateGameListSecondDay();



//<div id="gameListContainer2" class="game-list-container2"> 2nd container for 2-day fantasy
  //  <h2>NBA Games on [Oct 28, 2023]</h2>
  // <ul id="gameListSecondDay"></ul>
// </div>
//</div>
// </div>
