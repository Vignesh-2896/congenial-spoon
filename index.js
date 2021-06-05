function randomComputerChoice(){
    computerChoiceList = ["rock","paper","scissors"];
    randomPosition = Math.floor(Math.random() * computerChoiceList.length);
    return computerChoiceList[randomPosition];
}

function playGame(playerSelection, computerSelection, currentScores)
{
    playerScore = currentScores[0]; compScore = currentScores[1];
     if (playerSelection == computerSelection) {
         alert("It's a Tie.");
     }
     else if (playerSelection == "rock" && computerSelection == "scissors"){
         alert("Rock beats Scissors. User Wins the round.");
         playerScore++;
     }
     else if (playerSelection == "rock" && computerSelection == "paper"){
        alert("Paper beats Rock. Computer Wins the round.");
        compScore++;
    }     
    else if (playerSelection == "paper" && computerSelection == "rock"){
        alert("Paper beats Rock. User Wins the round.");
        playerScore++;
    }  
    else if (playerSelection == "paper" && computerSelection == "scissors"){
        alert("Scissors beats Paper. Computer Wins the round.");
        compScore++;
    }     
    else if (playerSelection == "scissors" && computerSelection == "paper"){
        alert("Scissors beats Paper. User Wins the round.");
        playerScore++;
    } 
    else if (playerSelection == "scissors" && computerSelection == "rock"){
        alert("Rock beats Scissors. Computer Wins the round.");
        compScore++;
    }        
    return [playerScore, compScore]
}

function startGame()
{
    currentScores = [0,0]
    for(let i = 1; i<=5; i++)
    {
        userChoice = prompt("Enter User Choice : ");
        userChoice = userChoice.toLowerCase();
        if(userChoice != "rock" && userChoice != "paper" && userChoice != "scissors"){
            alert("Invalid user choice. Round skipped.");
            continue;
        }
        else {
            currentScores = playGame(userChoice, randomComputerChoice(), currentScores)
        }
    }
    userScore = currentScores[0]
    computerScore = currentScores[1]
    alert("Final Score : User "+userScore+" - "+computerScore+" Computer");
    if(userScore > computerScore){
        alert("User wins the game.")
    }
    else if(userScore < computerScore){
        alert("Computer wins the game.")
    }    
    else {
        alert("Game ends in a Tie.")
    }
}

startGame()