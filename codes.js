<!DOCTYPE html>
<html lang="en">
<html>
<head>
    <meta charset="UTF-8">
    <title>Pantasi Pros</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <div class="navigation-menu">
        <ul>
            <li><a href="#" id="rules">Rules</a></li>
            <li><a href="#standings">Standings</a></li>
            <li><a href="#averages">FPs Averages</a></li>
             <li><a href="https://www.facebook.com/groups/2268460530042250" id="fbgroup">Facebook Group</a></li>
             <li><a href="#updates">Updates</a></li>
           
        </ul>
    </div>


    <label for="pgSelect">Point Guards</label>
    <div class="dropdown-container">
    <select id="pgSelect">
        <option value="" disabled selected>Please select a Point Guard</option>
        <!-- Add options for Point Guards here -->
        <option value="Luka Doncic" data-price="84k">Luka Doncic (DAL) - 84k</option>
        <option value="De'Aaron Fox" data-price="78k">De'Aaron Fox - 78k</option>
        <option value="Damian Lillard" data-price="78k">Damian Lillard - 78k</option>
        <option value="Trae Young" data-price="74k">Trae Young - 74k </option>
        <option value="Stephen Curry" data-price="68k">Stephen Curry - 68k</option>
        <option value="D'Angelo Russell" data-price="45k">D'Angelo Russell - 45k</option>
        <option value="Killian Hayes" data-price="25k">Killian Hayes - 25k</option>
        

    </select>

    <label for="sgSelect">Shooting Guards</label>
    <div class="dropdown-container">
    <select id="sgSelect">
        <option value="" disabled selected>Please select a Shooting Guard</option>
        <!-- Add options for Shooting Guards here -->
        <option value="Anthony Edwards" data-price="84k">Anthony Edwards - 84k</option>
        <option value="Donovan Mitchell" data-price="78k">Donovan Mitchell - 78k</option>
        <option value="Zach LaVine" data-price="74k">Zach LaVine - 74k</option>
        <option value="Devin Booker" data-price="68k">Devin Booker - 68k</option>
        <option value="Dejounte Murray" data-price="60k">Dejounte Murray - 60k</option>
        <option value="Jordan Poole" data-price="50k">Jordan Poole - 50k</option>
        <option value="Austin Reaves" data-price="58k">Austin Reaves - 48k</option>
        <option value="Klay Thompson" data-price="48k">Klay Thompson - 48k</option>
        <option value="Josh Hart" data-price="35k">Josh Hart - 35k</option>
        <option value="James Bouknight" data-price="25k">James Bouknight - 25k</option>
    </select>

     <label for="sfSelect">Small Forwards</label>
     <div class="dropdown-container">
     <select id="sfSelect">
    <option value="" disabled selected>Please select a Small Forward</option>
    <!-- Add options for Small Forwards here -->
    <option value="LeBron James" data-price="85k">LeBron James - 85k</option>
    <option value="Kevin Durant" data-price="80k">Kevin Durant - 80k</option>
    <option value="Jimmy Butler" data-price="72k">Jimmy Butler - 72k</option>
    <option value="Kawhi Leonard" data-price="70k">Kawhi Leonard - 70k</option>
    <option value="Mikal Bridges" data-price="60k">Mikal Bridges - 60k</option>
    <option value="Tobias Harris" data-price="50k">Tobias Harris - 50k</option>
    <option value="Gordon Hayward" data-price="45k">Gordon Hayward - 45k</option>
    <option value="Jaden McDaniels" data-price="34k">Jaden McDaniels - 34k</option>
    <option value="Kevin Knox" data-price="25k">Kevin Knox - 25k</option>
   </select>

  <label for="pfSelect">Power Forwards</label>
<div class="dropdown-container">
    <select id="pfSelect">
        <option value="" disabled selected>Please select a Power Forward</option>
        <!-- Add options for Power Forwards here -->
        <option value="Giannis Antetokoumpo" data-price="90k">Giannis Antetokounmpo - 90k</option>
         <option value="Jayson Tatum" data-price="76k">Jayson Tatum - 76k</option>
         <option value="Karl Anthony Towns" data-price="70k">Karl Anthony Towns - 70k</option>
        <option value="Julius Randle" data-price="67k">Julius Randle - 67k</option>
        <option value="Zion Williamson" data-price="64k">Zion Williamson - 64k</option>
        <option value="Paolo Banchero" data-price="58k">Paolo Banchero - 58k</option>
        <option value="Aaron Gordon" data-price="52k">Aaron Gordon - 52k</option>
          <option value="Keegan Murray" data-price="45k">Keegan Murray - 45k</option>
          <option value="Patrick Williams" data-price="36k">Patrick Williams - 36k</option>
         <option value="PJ Tucker" data-price="25k">PJ Tucker - 25k</option>
    </select>


   <label for="cSelect">Centers</label>
<div class="dropdown-container">
    <select id="cSelect">
        <option value="" disabled selected>Please select a Center</option>
        <!-- Add more Centers here -->
        <option value="Nikola Jokic" data-price="90k">Nikola Jokic - 90k</option>
        <option value="Joel Embiid" data-price="84k">Joel Embiid - 84k</option>
        <option value="Anthony Davis" data-price="80k">Anthony Davis - 80k</option>
        <option value="Rudy Gobert" data-price="66k">Rudy Gobert - 66k</option>
        <option value="Bam Adebayo" data-price="63k">Bam Adebayo - 63k</option>
        <option value="DeAndre Ayton" data-price="55k">DeAndre Ayton - 55k</option>
        <option value="Walker Kessler" data-price="48k">Walker Kessler - 48k</option>
        <option value="Kevon Looney" data-price="35k">Kevon Looney - 35k</option>
        <option value="DeAndre Jordan" data-price="25k">DeAndre Jordan - 25k</option>
    </select>
</div>

    
   <div id="selectedPlayersContainer" class="selected-players-container">
    <h2>Make your best 5 Fantasy Lineup!</h2>
    <ul id="selectedPlayersList"></ul>
    
   <div class="price-info">
    <span id="totalPriceLineup">Salary: 0k</span>
    <hr> </hr>
    <span id="budgetLeftValue">305k</span></div>
</div>
</div>



<div class="button-container">
<button id="copyButton">Get Lineup</button>
    <button id="returnButton" onclick="goBack()">Back</button>
</div>


<div id="successBox" class="success-box">
  <p id="success-message">Successfully copied! Paste it on a chatbox/post.</p>
</div>

<div id="gameListContainer" class="game-list-container">
    <h2></h2>
    <ul id="gameList"></ul>
</div>

<script src="codes.js"></script>
</body>
</html>


     
        
          
           
     


        

    

    


   
  


 
          
function updateBudgetLeft() {
   budgetLeftElement.innerHTML = "Left: <span style='color: white; background-color: transparent; padding: 2px;'><span style='color: lightgreen;'>" + budgetLeft  + "k</span></span>";
}   
