$(function(){

    // Fonction globale de lancé de dé --> retourne un chiffre aléatoire entre 1 et 6
    diceResult = function(){
      return Math.floor(Math.random() * (6)) + 1;
    }

  class Joueur{
    constructor(){
      this.nom
      this.nbrPointRound = 0
      this.nbrPointPartie = 0
      this.currentActivePlayer = false
      }
//Fermeture classe joueur
    }
// Initialisation des joueurs en dehors d'une fonction
    var player1 = new Joueur()
    var player2 = new Joueur()

  // Scoring display functions
  updateScoringDisplayP1 = function(){
    $('.player1 .playerCurrentScore').text(`${player1.nbrPointRound}`)
    $('.player1 .playerGlobalScore').text(`${player1.nbrPointPartie}`)
  }
  updateScoringDisplayP2 = function(){
    $('.player2 .playerCurrentScore').text(`${player2.nbrPointRound}`)
    $('.player2 .playerGlobalScore').text(`${player2.nbrPointPartie}`)
  }

  // Scoring reset function
    resetScoring = function (){
    player1.nbrPointRound = 0
    player1.nbrPointPartie = 0
    updateScoringDisplayP1()
    // player1.currentActivePlayer = false
    player2.nbrPointRound = 0
    player2.nbrPointPartie = 0
    updateScoringDisplayP2()
    // player2.currentActivePlayer = false
  }

    // Dice value display function
    updateDiceDisplay = function(diceValue){
      switch (diceValue){
        case 1:
          $('.dice').html('<i class="bi bi-dice-1-fill red"></i>');
          break;
        case 2:
          $('.dice').html('<i class="bi bi-dice-2-fill"></i>');
          break;
        case 3:
          $('.dice').html('<i class="bi bi-dice-3-fill"></i>');
          break;
        case 4:
          $('.dice').html('<i class="bi bi-dice-4-fill"></i>');
          break;
        case 5:
          $('.dice').html('<i class="bi bi-dice-5-fill"></i>');
          break;
        case 6:
          $('.dice').html('<i class="bi bi-dice-6-fill"></i>');
          break;
        default : 
        console.log ('Merci d\'utiliser un dé à 6 faces')
      }
    }

    // Display for active player



    // Hide buttons (?)

      // End game management function
      endGame = function(){
        if (player1.nbrPointPartie > 50){
          alert(`Bravo !! ${player1.nom} a gagné la partie !`)
          resetScoring()
        } else if (player2.nbrPointPartie > 50){
          alert(`Bravo !! ${player2.nom} a gagné la partie !`)
          resetScoring()
        } 
      }

      //Initialisation grace au bouton new game
$('.btnNew').click(function(){
  //window.prompt('Saisir le nom du 1er joueur')
  player1.nom = window.prompt('Saisir le nom du 1er joueur')
  player2.nom = window.prompt('Saisir le nom du 2nd joueur')
  $('.player1 .playerName').html(`${player1.nom} <i class="bi bi-circle-fill"></i>`)
  $('.player2 .playerName').text(player2.nom)
  updateScoringDisplayP1()
  updateScoringDisplayP2()
  player1.currentActivePlayer = true
  // Idem que dans switchP2P1 pour faire apparaitre pion 1er joueur à P1
  // $('player1 .playerName').html(`${player1.nom}<i class="bi bi-circle-fill"></i>`)
  // $('.player1 .playerName').html('Player 1 <i class="bi bi-circle-fill"></i>')

})

switchP1P2 = function(){
  player1.currentActivePlayer = false
  player2.currentActivePlayer = true
  $('.player1').addClass('inactive')
  $('.player2').removeClass('inactive')
  // switch du pion 1er jouer à faire
  $('.player2 .playerName').html(`${player2.nom} <i class="bi bi-circle-fill"></i>`)
  $('.player1 .playerName').html(`${player1.nom}`)

  // $('.player2 .playerName').html('Player 2 <i class="bi bi-circle-fill"></i>')
}

switchP2P1 = function(){
  player2.currentActivePlayer = false
  player1.currentActivePlayer = true
  $('.player2').addClass('inactive')
  $('.player1').removeClass('inactive')
  // switch du pion 1er jouer à faire
  $('.player1 .playerName').html(`${player1.nom} <i class="bi bi-circle-fill"></i>`)
  $('.player2 .playerName').html(`${player2.nom}`)
}
//Lancé de dé
$('.btnRoll').click(function(){
  var diceValue = diceResult()
  console.log(`la valeur du dé est ${diceValue}`)
  updateDiceDisplay(diceValue)
  if (diceValue === 1){
    if (player1.currentActivePlayer){
      player1.nbrPointRound = 0 
      updateScoringDisplayP1() 
      switchP1P2()
    }
    else if(player2.currentActivePlayer){
      player2.nbrPointRound = 0 
      updateScoringDisplayP2() 
      switchP2P1()
    }
    else{
      console.log('allo Houston !')
    }
  } else {
      if (player1.currentActivePlayer){
      player1.nbrPointRound += diceValue
      updateScoringDisplayP1()
      }
      else if (player2.currentActivePlayer){
        player2.nbrPointRound += diceValue
        updateScoringDisplayP2()
      }
      else {
        console.log('Rappelle Houston !')
      }
    }
  })

// Prise des points du round 
$('.btnHold').click(function(){
  if (player1.currentActivePlayer){
    player1.nbrPointPartie += player1.nbrPointRound
    player1.nbrPointRound = 0
    updateScoringDisplayP1()
    switchP1P2()
    endGame()
  }
  else if (player2.currentActivePlayer){
    player2.nbrPointPartie += player2.nbrPointRound
    player2.nbrPointRound = 0
    updateScoringDisplayP2()
    switchP2P1()
    endGame()
  }
})


  // Fermeture du jQuery
})