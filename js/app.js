// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 503){
        this.x += this.speed * dt;
    } else {
        this.x = -101;
    }
    //collision detection
    if (this.x < player.x + 70 && 
        this.x + 70 > player.x &&
        this.y < player.y + 70 &&
        70 + this.y > player.y) {
            //collision, reset player
            player.x = 200;
            player.y = 400;
        } 
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class PlayerOne  {
    constructor () {
        this.x = 200;
        this.y = 400;
        this.sprite = 'images/char-boy.png';
        this.winGame = false;
    }
    
    update() {        
        //check for win
        if(this.y === -15) {
            setTimeout(function () {
                player.winGame = true;
                // player.x = 200;
                // player.y = 400;
                
             
            }, 200);
        }
    }


    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyup) {
        if (keyup == 'left' && this.x > 0) {
            this.x -= 101;
        } else if (keyup == 'right' && this.x < 400) {
            this.x += 101;
        } else if (keyup == 'up' && this.y > 0) {
            this.y -= 83;
        } else if (keyup == 'down' && this.y < 332) {
            this.y += 83;
        }
    }

    //send back to start
    reset () {
        this.x = 200;
        this.y = 400;
    }
}


//instantiate allEnemies object
const enemy1 = new Enemy(0, 68, 100);
const enemy2 = new Enemy(0, 151, 200);
const enemy3 = new Enemy(0, 234, 300);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);
//instantiate player object
const player = new PlayerOne();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
