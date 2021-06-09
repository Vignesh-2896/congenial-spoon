let currentScores = [0,0];
function randomComputerChoice(){
    computerChoiceList = ["rock","paper","scissors"];
    randomPosition = Math.floor(Math.random() * computerChoiceList.length);
    return computerChoiceList[randomPosition];
}

function capitalize(str1){
    return str1.charAt(0).toUpperCase() + str1.slice(1);
}

function playGame(playerSelection, computerSelection, currentScores)
{
    winner = "";
    playerScore = currentScores[0]; compScore = currentScores[1];
     if (playerSelection == computerSelection) {
         round_result = "User and Computer have selected the same. Round ends in a Tie."
         print_messages(playerSelection, computerSelection, round_result);
         winner = "Tie";
     }
     else if (playerSelection == "rock" && computerSelection == "scissors"){
         round_result = "Rock beats Scissors. User Wins the round.";
         print_messages(playerSelection, computerSelection, round_result);
         playerScore++;
         winner = "User";
     }
     else if (playerSelection == "rock" && computerSelection == "paper"){
        round_result = "Paper beats Rock. Computer Wins the round.";
        print_messages(playerSelection, computerSelection, round_result);
        compScore++;
        winner = "Computer";
    }     
    else if (playerSelection == "paper" && computerSelection == "rock"){
        round_result = "Paper beats Rock. User Wins the round.";
        print_messages(playerSelection, computerSelection, round_result);
        playerScore++;
        winner = "User";
    }  
    else if (playerSelection == "paper" && computerSelection == "scissors"){
        round_result = "Scissors beats Paper. Computer Wins the round.";
        print_messages(playerSelection, computerSelection, round_result);
        compScore++;
        winner = "Computer";
    }     
    else if (playerSelection == "scissors" && computerSelection == "paper"){
        round_result = "Scissors beats Paper. User Wins the round.";
        print_messages(playerSelection, computerSelection, round_result);
        playerScore++;
        winner = "User";
    } 
    else if (playerSelection == "scissors" && computerSelection == "rock"){
        round_result = "Rock beats Scissors. Computer Wins the round.";
        print_messages(playerSelection, computerSelection, round_result);
        compScore++;
        winner = "Computer";
    }        
    updateRecords(playerSelection, computerSelection, winner, [playerScore, compScore]);
    return [playerScore, compScore];
}

function startGame(userChoice)
{
    div = document.querySelector("#records");
    if(div == null){
        createRecords();
    }
    currentScores = playGame(userChoice, randomComputerChoice(), currentScores);
    setTimeout(function(){
        let radio_fields = document.getElementsByName("choice");
        for(let i = 0; i < radio_fields.length; i++)
            radio_fields[i].checked = false;  
    },3000);
    if(currentScores[0] == 5 || currentScores[1] == 5){
        setTimeout(function(){
            final_result(currentScores);
            clearUpResults();
        },3000);
    }
    else {
        setTimeout(function(){
            clearUpMessages();
            messagesDiv = document.querySelector("#messages");

            h4 = document.createElement("h4");
            h4.textContent = "Game continues. Please select the next choice.";
            messagesDiv.appendChild(h4);
        },5000);
    }
}

function createRecords() {

    container = document.querySelector("#container");

    div = document.createElement("div");
    div.setAttribute("id","records");
    container.appendChild(div);

    h3 = document.createElement("h3");
    h3.textContent = "Round by Round Data : "
    div.appendChild(h3);

    table = document.createElement("table");
    table.setAttribute("align","center");
    table.setAttribute("border","1");
    table.setAttribute("id","tabled_records");
    
    thead = document.createElement("thead");

    tr = document.createElement("tr");
    
    th1 = document.createElement("th");
    th1.textContent = "Round Number";
    tr.appendChild(th1);

    th2 = document.createElement("th")
    th2.textContent = "User Choice";
    tr.appendChild(th2);

    th3 = document.createElement("th")
    th3.textContent = "Computer Choice";
    tr.appendChild(th3);

    th4 = document.createElement("th")
    th4.textContent = "Round Winner";
    tr.appendChild(th4);

    th5 = document.createElement("th")
    th5.textContent = "Score (User - Computer)";
    tr.appendChild(th5);    

    thead.appendChild(tr);
    table.appendChild(thead);
    div.appendChild(table);

}

function updateRecords(playerSelection, computerSelection, winner, currentScores){
    
    round_num = find_round();
    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);

    div = document.querySelector("#records");
    div.setAttribute("style","border-bottom:1px solid black;");

    table = document.querySelector("#tabled_records");

    tr = document.createElement("tr");
    
    td1 = document.createElement("td");
    td1.setAttribute("id","round_number");
    td1.textContent = round_num
    tr.appendChild(td1);

    td2 = document.createElement("td");
    td2.textContent = playerSelection
    tr.appendChild(td2);

    td3 = document.createElement("td");
    td3.textContent = computerSelection
    tr.appendChild(td3);

    td4 = document.createElement("td");
    td4.textContent = winner
    tr.appendChild(td4);

    td5 = document.createElement("td");
    td5.textContent = currentScores[0]+" - "+currentScores[1];
    tr.appendChild(td5);

    table.appendChild(tr);
}

function find_round()
{
    round = document.querySelectorAll("#round_number");
    if(round != null) {
        return(round.length + 1);
    }
    else {
        return 1;
    }
}

function print_messages(playerSelection, computerSelection, result_message) {
    round_num = find_round();
    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);

    clearUpMessages();

    messagesDiv = document.querySelector("#messages");
    messagesDiv.setAttribute("style","border-bottom:1px solid black;")

    h3 = document.createElement("h3");
    h3.textContent = "Round "+round_num
    messagesDiv.appendChild(h3);

    h4_input = document.createElement("h4");
    h4_input.textContent = "Round inputs : User has selected - "+playerSelection+". Computer has selected - "+computerSelection+".";
    messagesDiv.appendChild(h4_input);

    h4_result = document.createElement("h4");
    h4_result.textContent = result_message;
    messagesDiv.appendChild(h4_result);
}

function final_result(currentScores) {

    userScore = currentScores[0]
    computerScore = currentScores[1]

    clearUpMessages();

    messagesDiv = document.querySelector("#messages");

    h3 = document.createElement("h3");
    h3.textContent = "Final Score : User "+userScore+" - "+computerScore+" Computer"
    messagesDiv.appendChild(h3);

    if(userScore > computerScore){
       final_message = "User wins the game."
    }
    else if(userScore < computerScore){
        final_message = "Computer wins the game."
    }    
    else {
        final_message = "Game ends in a Tie."
    }

    h4_input = document.createElement("h4");
    h4_input.textContent = final_message;
    messagesDiv.appendChild(h4_input);

}

function clearUpMessages() {
    messagesDiv = document.querySelector("#messages");
    while(messagesDiv.firstChild){
        messagesDiv.removeChild(messagesDiv.firstChild);
    }
}

function clearUpResults() {
    records = document.querySelector("#records");
    while(records.firstChild){
        records.removeChild(records.firstChild);
    }

    parent = records.parentNode;
    parent.removeChild(parent.lastChild);
}