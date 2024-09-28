let currentScores = [0, 0];
function randomComputerChoice() {
  let computerChoiceList = ["rock", "paper", "scissors"];
  let randomPosition = Math.floor(Math.random() * computerChoiceList.length);
  return computerChoiceList[randomPosition];
}

function capitalize(str1) {
  return str1.charAt(0).toUpperCase() + str1.slice(1);
}

function playGame(playerSelection, computerSelection, currentScores) {
  let winner = "";
  let playerScore = currentScores[0];
  let compScore = currentScores[1];
  if (playerSelection == computerSelection) {
    let round_result =
      "User and Computer have selected the same. Round ends in a Tie.";
    print_messages(playerSelection, computerSelection, round_result);
    winner = "Tie";
  } else if (playerSelection == "rock" && computerSelection == "scissors") {
    let round_result = "Rock beats Scissors. User Wins the round.";
    print_messages(playerSelection, computerSelection, round_result);
    playerScore++;
    winner = "User";
  } else if (playerSelection == "rock" && computerSelection == "paper") {
    let round_result = "Paper beats Rock. Computer Wins the round.";
    print_messages(playerSelection, computerSelection, round_result);
    compScore++;
    winner = "Computer";
  } else if (playerSelection == "paper" && computerSelection == "rock") {
    let round_result = "Paper beats Rock. User Wins the round.";
    print_messages(playerSelection, computerSelection, round_result);
    playerScore++;
    winner = "User";
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    let round_result = "Scissors beats Paper. Computer Wins the round.";
    print_messages(playerSelection, computerSelection, round_result);
    compScore++;
    winner = "Computer";
  } else if (playerSelection == "scissors" && computerSelection == "paper") {
    let round_result = "Scissors beats Paper. User Wins the round.";
    print_messages(playerSelection, computerSelection, round_result);
    playerScore++;
    winner = "User";
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    let round_result = "Rock beats Scissors. Computer Wins the round.";
    print_messages(playerSelection, computerSelection, round_result);
    compScore++;
    winner = "Computer";
  }
  updateRecords(playerSelection, computerSelection, winner, [
    playerScore,
    compScore,
  ]);
  return [playerScore, compScore];
}

function startGame(userChoice) {
  let div = document.querySelector("#records");
  if (div == null) {
    createRecords();
  }
  currentScores = playGame(userChoice, randomComputerChoice(), currentScores);
  
  setTimeout(function () {
    let radio_fields = document.getElementsByName("choice");
    for (const element of radio_fields)
      element.checked = false;
  }, 3000);

  if (currentScores[0] == 5 || currentScores[1] == 5) {
    setTimeout(function () {
      final_result(currentScores);
      clearUpResults();
    }, 3000);
  } else {
    setTimeout(function () {
      clearUpMessages();
      let messagesDiv = document.querySelector("#messages");

      let h4 = document.createElement("h4");
      h4.textContent = "Game continues. Please select the next choice.";
      messagesDiv.appendChild(h4);
    }, 5000);
  }
}

function createRecords() {
  let container = document.querySelector("#container");

  let div = document.createElement("div");
  div.setAttribute("id", "records");
  container.appendChild(div);

  let h3 = document.createElement("h3");
  h3.textContent = "Round by Round Data : ";
  div.appendChild(h3);

  let table = document.createElement("table");
  table.setAttribute("align", "center");
  table.setAttribute("border", "1");
  table.setAttribute("id", "tabled_records");

  let thead = document.createElement("thead");

  let tr = document.createElement("tr");

  let th1 = document.createElement("th");
  th1.textContent = "Round Number";
  tr.appendChild(th1);

  let th2 = document.createElement("th");
  th2.textContent = "User Choice";
  tr.appendChild(th2);

  let th3 = document.createElement("th");
  th3.textContent = "Computer Choice";
  tr.appendChild(th3);

  let th4 = document.createElement("th");
  th4.textContent = "Round Winner";
  tr.appendChild(th4);

  let th5 = document.createElement("th");
  th5.textContent = "Score (User - Computer)";
  tr.appendChild(th5);

  thead.appendChild(tr);
  table.appendChild(thead);
  div.appendChild(table);
}

function updateRecords(
  playerSelection,
  computerSelection,
  winner,
  currentScores
) {
  let round_num = find_round();
  playerSelection = capitalize(playerSelection);
  computerSelection = capitalize(computerSelection);

  let div = document.querySelector("#records");
  div.setAttribute("style", "border-bottom:1px solid black;");

  let table = document.querySelector("#tabled_records");

  let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  td1.setAttribute("id", "round_number");
  td1.textContent = round_num;
  tr.appendChild(td1);

  let td2 = document.createElement("td");
  td2.textContent = playerSelection;
  tr.appendChild(td2);

  let td3 = document.createElement("td");
  td3.textContent = computerSelection;
  tr.appendChild(td3);

  let td4 = document.createElement("td");
  td4.textContent = winner;
  tr.appendChild(td4);

  let td5 = document.createElement("td");
  td5.textContent = currentScores[0] + " - " + currentScores[1];
  tr.appendChild(td5);

  table.appendChild(tr);
}

function find_round() {
  let round = document.querySelectorAll("#round_number");
  if (round != null) {
    return round.length + 1;
  } else {
    return 1;
  }
}

function print_messages(playerSelection, computerSelection, result_message) {
  let round_num = find_round();
  playerSelection = capitalize(playerSelection);
  computerSelection = capitalize(computerSelection);

  clearUpMessages();

  let messagesDiv = document.querySelector("#messages");
  messagesDiv.setAttribute("style", "border-bottom:1px solid black;");

  let h3 = document.createElement("h3");
  h3.textContent = "Round " + round_num;
  messagesDiv.appendChild(h3);

  let h4_input = document.createElement("h4");
  h4_input.textContent =
    "Round inputs : User has selected - " +
    playerSelection +
    ". Computer has selected - " +
    computerSelection +
    ".";
  messagesDiv.appendChild(h4_input);

  let h4_result = document.createElement("h4");
  h4_result.textContent = result_message;
  messagesDiv.appendChild(h4_result);
}

function final_result(currentScores) {
  let userScore = currentScores[0];
  let computerScore = currentScores[1];

  clearUpMessages();

  let messagesDiv = document.querySelector("#messages");

  let h3 = document.createElement("h3");
  h3.textContent =
    "Final Score : User " + userScore + " - " + computerScore + " Computer";
  messagesDiv.appendChild(h3);

  let final_message;
  if (userScore > computerScore) {
    final_message = "User wins the game.";
  } else if (userScore < computerScore) {
    final_message = "Computer wins the game.";
  } else {
    final_message = "Game ends in a Tie.";
  }

  let h4_input = document.createElement("h4");
  h4_input.textContent = final_message;
  messagesDiv.appendChild(h4_input);
}

function clearUpMessages() {
  let messagesDiv = document.querySelector("#messages");
  while (messagesDiv.firstChild) {
    messagesDiv.removeChild(messagesDiv.firstChild);
  }
}

function clearUpResults() {
  let records = document.querySelector("#records");
  while (records.firstChild) {
    records.removeChild(records.firstChild);
  }

  parent = records.parentNode;
  parent.removeChild(parent.lastChild);
}
