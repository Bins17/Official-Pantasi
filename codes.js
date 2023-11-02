var copyButton = document.getElementById("copyButton");

        var selectedPlayersPG = [];
        var selectedPlayersSG = [];
        var selectedPlayersSF = []; 
        var selectedPlayersPF = [];
        var selectedPlayersC = [];

        var selectedPGs = [];
      var selectedSGs = [];
      var selectedSFs = [];
      var selectedPFs = [];
       var selectedCs = [];
        var totalSelectedPrice = 0;
        var requiredPrice = 350;
        var budgetLeft = requiredPrice - totalSelectedPrice;
        var totalSelectedPlayers = 0;

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
    if (selectedPGs.includes(pgName) && selectedPGs.length >= 2) {
        alert("You can select up to 2 players from the PG position.");
        pgSelect.selectedIndex = 0; // Reset the dropdown
        removePlayer(pgName, false);
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

            if (selectedSGs.includes(sgName) && selectedSGs.length >= 2) {
        alert("You can select up to 2 players from the PG position.");
        sgSelect.selectedIndex = 0; // Reset the dropdown
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
    totalSelectedPlayers++;
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
         totalSelectedPlayers--;
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

    if (selectedSFs.includes(sfName) && selectedSFs.length >= 2) {
        alert("You can select up to 2 players from the PG position.");
        sfSelect.selectedIndex = 0; // Reset the dropdown
        removePlayer(sfName, false);
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



    // Create and add the player to the selected players list
    addPlayerToSelectedList(sfName, false, true); // Pass true for isSF
    updateBudgetLeft();
    
});

    function isMaxPlayersSelected() {
       return totalSelectedPlayers >= 6;
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
        alert("Please select 1 player from each position.");
    } else if (totalSelectedPlayers < 6) {
        alert("Please select 6 players to create your lineup.");
    } else {
        var selectedPlayersText = "[Type your name here]\n";

        //  store "6th" players
        var sixthPlayers = {
            PG: [],
            SG: [],
            SF: [],
            PF: [],
            C: []
        };

    
        selectedPlayersPG.forEach(function (player, index) {
            if (index === 0) {
                selectedPlayersText += "PG: " + player + " " + pgSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " \n";
            } else if (index === 1) {
                sixthPlayers.PG.push("(6): " + player + " " + pgSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " ");
            }
        });

        selectedPlayersSG.forEach(function (player, index) {
            if (index === 0) {
                selectedPlayersText += "SG: " + player + " " + sgSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " \n";
            } else if (index === 1) {
                sixthPlayers.SG.push("(6): " + player + " " + sgSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " ");
            }
        });

        selectedPlayersSF.forEach(function (player, index) {
            if (index === 0) {
                selectedPlayersText += "SF: " + player + " " + sfSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " \n";
            } else if (index === 1) {
                sixthPlayers.SF.push("(6): " + player + " " + sfSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " ");
            }
        });

        selectedPlayersPF.forEach(function (player, index) {
            if (index === 0) {
                selectedPlayersText += "PF: " + player + " " + pfSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " \n";
            } else if (index === 1) {
                sixthPlayers.PF.push("(6): " + player + " " + pfSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " ");
            }
        });

        selectedPlayersC.forEach(function (player, index) {
            if (index === 0) {
                selectedPlayersText += "C: " + player + " " + cSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " \n";
            } else if (index === 1) {
                sixthPlayers.C.push("(6): " + player + " " + cSelect.querySelector(`option[value="${player}"]`).getAttribute("data-price") + " ");
            }
        });

      
        selectedPlayersText += sixthPlayers.PG.join("\n");
        selectedPlayersText += sixthPlayers.SG.join("\n");
        selectedPlayersText += sixthPlayers.SF.join("\n");
        selectedPlayersText += sixthPlayers.PF.join("\n");
        selectedPlayersText += sixthPlayers.C.join("\n");

        
        selectedPlayersText += "\nTOTAL: " + totalSelectedPrice + "/" + requiredPrice + "k";

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
        alert("You have already selected the max number of players (6).");
        pfSelect.selectedIndex = 0; // Reset the dropdown to its initial state
        return;
    }
    var selectedOption = pfSelect.options[pfSelect.selectedIndex];
    var pfName = selectedOption.value;

    if (selectedPFs.includes(pfName) && selectedPFs.length >= 2) {
        alert("You can select up to 2 players from the PG position.");
        pfSelect.selectedIndex = 0; // Reset the dropdown
        removePlayer(pfName, false);
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

          
          if (selectedCs.includes(centerName) && selectedCs.length >= 2) {
        alert("You can select up to 2 players from the PG position.");
        cSelect.selectedIndex = 0; // Reset the dropdown
        removePlayer(pgName, false);
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

    
    setTimeout(function () {
        successBox.classList.remove("show");
    }, 2000); // 2 seconds
}

function updateBudgetLeft() {
   budgetLeftElement.innerHTML = "Left: <span style='color: white; background-color: transparent; padding: 2px;'><span style='color: lightgreen;'>" + budgetLeft  + "k</span></span>";
}


const nbaGamesToday = [
   "Raptors @ Sixers 7:00am",
   "Pistons @ Pelicans 8:00am",
   "Magic @ Jazz 9:00am",
   "Spurs @ Suns 10:00am",
];


// Function to populate the game list
function populateGameList() {
    const gameList = document.getElementById("gameList");

    nbaGamesToday.forEach((game) => {
        const listItem = document.createElement("li");
        listItem.textContent = game;
        gameList.appendChild(listItem);
    });
}


populateGameList();


function updateCountdown() {
            const targetDate = new Date('2023-11-02T21:00:00'); // Nov 2nd at 9:30 PM
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
                document.getElementById("days").textContent = "0";
                document.getElementById("hours").textContent = "0";
                document.getElementById("minutes").textContent = "0";
                document.getElementById("seconds").textContent = "0";
            }
        }

        // Update the countdown every second
        const interval = setInterval(updateCountdown, 1000);

        // Initial update
        updateCountdown();
