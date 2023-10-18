import Enemy from "./Enemy.js"
import MovingDIrections from "./MovingDirections.js"

export default class EnemyCtrl {

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
    
    enemyRows = []  

    currentDirection = MovingDIrections.right
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30
    moveDownTimer = this.moveDownTimerDefault
    fireBulletTimerDefault = 100
    fireBulletTimer = this.fireBulletTimerDefault

    constructor(canvas, enemyBulletController, playerBulletController){
        this.canvas = canvas
        this.enemyBulletController = enemyBulletController
        this.playerBulletController = playerBulletController
        this.createEnemies()
    }

    draw(ctx) {
        this.decrementMoveDownTimer()
        this.updateVelocityAndDirection()
        this.collisionDetection()
        this.drawEnemies(ctx);
        this.resetMoveDownTimer()
        // this.fireBullet()
    }

    collideWith(sprite){
        return this.enemyRows.flat().some(enemy => enemy.collideWith(sprite))
    }

    collisionDetection(){
        this.enemyRows.forEach(enemyRow => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if(this.playerBulletController.collideWith(enemy)){
                    enemyRow.splice(enemyIndex, 1)
                }
            })
        })
        this.enemyRows = this.enemyRows.filter(enemyRow => enemyRow.length > 0)
    }

    fireBullet() {
        this.fireBulletTimer--
        if(this.fireBulletTimer <=0){
            this.fireBulletTimer = this.fireBulletTimerDefault
            const allEnemies = this.enemyRows.flat()
            const enemyIndex = Math.floor(Math.random() * allEnemies.length)
            const enemy = allEnemies[enemyIndex]
            this.enemyBulletController.shoot(enemy.x + enemy.width/2, enemy.y, -3)
        }
    }

    resetMoveDownTimer(){
        if (this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault
        }
    }

    decrementMoveDownTimer(){
        if( this.currentDirection === MovingDIrections.downLeft ||
            this.currentDirection === MovingDIrections.downRight
        ) {
            this.moveDownTimer--
        }
    }

    updateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection === MovingDIrections.right){
                this.xVelocity = this.defaultXVelocity
                this.yVelocity = 0
                const rightMostEnemy = enemyRow[enemyRow.length-1]
                
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
                    this.currentDirection = MovingDIrections.downLeft
                    break
                }
            }else if(this.currentDirection === MovingDIrections.downLeft){
                if(this.moveDown(MovingDIrections.left)){
                    break
                }
            }else if (this.currentDirection === MovingDIrections.left) {
                this.xVelocity = -this.defaultYVelocity
                this.yVelocity = 0
                const leftMostEnemy = enemyRow[0]
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDIrections.downRight
                    break
                }
            }else if(this.currentDirection === MovingDIrections.downRight){
                if(this.moveDown(MovingDIrections.right)){
                    break
                }
            }
        }
    }

    moveDown(newDirection){
        this.xVelocity = 0
        this.yVelocity = this.defaultYVelocity
        if(this.moveDownTimer <= 0){
            this.currentDirection = newDirection
            return true
        }
        return false
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity)
            enemy.draw(ctx)
        })
    }

    createEnemies() {
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = []
            row.forEach((enemyNr, enemyIndex) => {
                if(enemyNr > 0){
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNr))
                }
            })
                
        })    
        
    }
}