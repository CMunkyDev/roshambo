let arg = require('yargs')
    .alias('m', 'move')
    .describe('m', 'pick your move')
    .choices('m', ['rock', 'paper', 'scissors'])
    .help('help')
    .argv

class Game {
    constructor (player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.result = ''
        this.winner = ''
    }

    printStart() {
        console.log(`${this.player2.name} challenges ${this.player1.name} to a game of Roshambo!`)
    }

    play () {
        let options = Player.options()
        let player1Index = options.indexOf(this.player1.move)
        let player2Index = options.indexOf(this.player2.move)
        if (player1Index > player2Index) {
            this.winner = player1Index === options.length - 1 && player2Index === 0 ? this.player2.name : this.player1.name
            this.result = this.winner + ' wins!'
        } else if (player1Index < player2Index) {
            this.winner = player2Index === options.length - 1 && player1Index === 0 ? this.player1.name : this.player2.name
            this.result = this.winner + ' wins!'
        } else {
            this.result = 'tie'
        }
    }

    printResult () {
        if (this.result === 'tie') {
            console.log(`It's a tie!`)
        } else {
            console.log(this.result)
        }
    }
}



class Player {
    constructor (name, move) {
        this.move = move
        this.name = name
    }
    static options () {
        return ['paper', 'scissors', 'rock']
    }

    randomize () {
        let possibilities = Player.options()
        this.move = possibilities[Math.floor(Math.random() * possibilities.length)]
    }

    printHand () {
        console.log(`${this.name} plays ${this.move}!`)
    }

    // set move (value) {
    //     this._move = value
    // }

    // get move () {
    //     return this._move
    // }

    // set name (value) {
    //     this._name = value
    // }

    // get name () {
    //     return this._name
    // }
}

let putey = new Player('Computer')
putey.randomize()
let player = new Player('User', arg.move)
let currentGame = new Game(putey, player)

currentGame.printStart()
putey.printHand()
player.printHand()
currentGame.play()
currentGame.printResult()