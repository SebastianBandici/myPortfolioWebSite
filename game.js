import EnemyCtrl from "./EnemyCtrl.js";
import Player from "./Player.js";
import bulletController from "./BulletController.js";

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = 600;
canvas.height = 600;

const background = new Image()
background.src = "images/space.png"

const playerBulletController = new bulletController(canvas, 5, "#ff004f")
const enemyBulletControler = new bulletController(canvas, 4, "white")
const enemyCtrl = new EnemyCtrl(canvas, enemyBulletControler, playerBulletController)
const player = new Player(canvas, 3, playerBulletController)

let isGameOver = false
let didWin = false

function game(){
    checkGameOver()
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    displayGameOver()
    if (!isGameOver) {
        enemyCtrl.draw(ctx)
        player.draw(ctx)
        playerBulletController.draw(ctx)
        enemyBulletControler.draw(ctx)
    }
    
    console.log(isGameOver);
}

function displayGameOver(){
    if(isGameOver) {
        let text = didWin ? "You Win" : "Game Over"
        let textOffSet = didWin ? 3.5 : 5

        ctx.fillStyle = "#ff004f"
        ctx.font = "70px Arial"
        ctx.fillText(text, canvas.width / textOffSet, canvas.height / 2)
    }
}

function checkGameOver(){
    if ( isGameOver ) { 
        return
    }
    if ( enemyBulletControler.collideWith(Player)) { 
        isGameOver = true 
    }
    if ( enemyCtrl.collideWith(player)) {
        isGameOver = true
    }
}

setInterval(game, 1000/60)