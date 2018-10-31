// Game state
var gameState = {
  userPokemon: '',
  rivalPokemon: '',
  // Pokemon database
  pokemonDB: [
    {
      name: 'charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    },
    {
      name: 'bulbasaur',
      type: 'fire',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
    },
    {
      name: 'squirtle',
      type: 'fire',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
    },
  ],
  // Elements
  elements: {
    pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
  },
  init: function() {
    // Loop
    var i = 0;
    while (i < gameState.elements.pokemonsEl.length) {
      gameState.elements.pokemonsEl[i].onclick = function() {
        var pokemonName = this.dataset.pokemon
        var player1Img = document.querySelector('.player1').getElementsByTagName('img')
        var player2Img = document.querySelector('.player2').getElementsByTagName('img')

        gameState.userPokemon = pokemonName

        gameState.cpuPick()
        gameState.elements.battleScreenEl.classList.toggle('active')

        gameState.currentPokemon = gameState.pokemonDB.filter(function(pokemon) {
          return pokemon.name == gameState.userPokemon;
        })
        player1Img[0].src = gameState.currentPokemon[0].img

        gameState.currentRivalPokemon = gameState.pokemonDB.filter(function(pokemon) {
          return pokemon.name == gameState.rivalPokemon;
        })
        player2Img[0].src = gameState.currentRivalPokemon[0].img

        // User, CPU HP
        gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon)
        gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon)

        // User assigns attack

        // CPU HP

        // CPU assigns attack

        // User HP

        // User assigns attack

        // Health-defense

        // Loser
      }
      i++
    }

    var a = 0;
    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function() {
        var attackName = this.dataset.attack
        gameState.currentUserAttack = attackName

        gameState.play(attackName, gameState.cpuAttack())
      }
      a++
    }
  },
  cpuAttack: function() {
    var attacks = ['rock', 'paper', 'scissors']

    return attacks[gameState.randomNumber(0, 3)];
  },

  calculateInitialHealth: function(user) {
    return ((0.20 * Math.sqrt(user.level)) * user.defense) * user.hp;
  },

  attackMove: function(attack, level, stack, critical, enemy, attacker) {
    var attackAmount = (attack * level) * (stack + critical);
    enemy.health = enemy.health - attackAmount
    gameState.checkWinner(enemy, attacker)
  },

  checkWinner: function(enemy) {
    if (enemy.health <=0) {
      console.log('The winner is ' + attacker.name);
    }
  },

  randomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  cpuPick: function() {
    gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon
  },
  play: function(userAttack, cpuAttack) {
    var currentPokemon = gameState.currentPokemon[0]
    var currentRivalPokemon = gameState.currentRivalPokemon[0]
    switch(userAttack) {
      // Rock
      case 'rock':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }
        break;
      // Paper
      case 'paper':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }
        break;
      // Scissors
      case 'scissors':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
            // CPU
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }
        break;
    }
  }
}
gameState.init()
