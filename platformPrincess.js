import { game, Sprite} from  "./sgc/sgc.js";

game.setBackground("Graveyard.png");

class Support extends Sprite {
    constructor(x, y, image) {
        super(x, y, image);
        this.x = x;
        this.y = y;
        this.setImage(image);
    }
}

class Platform extends Support {
    constructor(x, y, image) {
        super(x, y, image);
        this.name = "A platform";
        this.accelerateOnBounce = false;
    }
}

let finishPlatform = new Platform(game.displayWidth - 80* 2, 500, "Tile (1).png");
finishPlatform.name = "The finish platform";
let finishMidsection = new Platform(game.displayWidth - 43 * 2, 500, "Tile (2).png");
finishPlatform.name = "The finish platform";
let startPlatform = new Platform(0, 480, "Tile (3).png");
let startBones = new Platform(10, 490, "Bone (1).png");
let finishPlatformskeleton = new Platform(game.displayWidth - 60 * 2, 490, "Bone (3).png");
finishPlatform.name = "The finish platform";
let midPlatform1 = new Platform(510, 150, "Tile (16).png");
let midPlatform2 = new Platform(270, 150, "Tile (14).png");
let midPlatform3 = new Platform(390, 150, "Tile (15).png");
let midPlatform4 = new Platform(390, 530, "Tile (3).png");
let midPlatform5 = new Platform(349, 530, "Tile (1).png");
let midPlatform6 = new Platform(370, 530, "Tile (2).png");
let midPlatformtree = new Platform(325, 330, "Tree.png");

class FirstSlider extends Platform {
    constructor(x, y, angle) {
        super(x, y, "slider.png");
        this.name = "A sliding support";
        this.angle = angle;
        this.speed = 30;
        this.accelerateOnBounce = false;
 }
    handleGameLoop() {
        if (this.x == startPlatform.x + 48 * 3) {
            this.angle = 90;
        }
        if (this.y <= 325) {
            this.angle = 180;
        }
        if (this.x <= 75) {
            this.angle = 90;
        }
            }
        }
class LastSlider extends Platform {
    constructor(x, y, angle) {
        super(x, y, "slider.png");
        this.name = "A sliding support";
        this.angle = angle;
        this.speed = 30;
        this.accelerateOnBounce = false;
 }
    handleGameLoop() {
        if (this.x == startPlatform.x + 48 * 3) {
            this.angle = 90;
        }
        if (this.y <= 325) {
            this.angle = 180;
        }
        if (this.x <= 75) {
            this.angle = 90;
        }
        if (this.y >= finishPlatform.y + 48) {
            this.angle = 90;
            if (this.x <= 75) {
                this.angle = 0;
            }
        }
    }
}

new FirstSlider(startPlatform.x + 48 * 3, startPlatform.y + 66, 0);


class Princess extends Sprite {
    constructor() {
        super();
        this.setImage("ann.png");
        this.x = 5;
        this.y = 300;
        this.speed = 0;
        this.speedWhenWalking = 100; 
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("left", 9, 11);
        this.isFalling = false;

    }
    handleUpArrowKey() {
        if(!this.isFalling){
            this.y = this.y - 2 * this.height;
        }
    }
    handleBoundaryContact() {
        game.end("Princess Ann has fallen to her death!\n\Better luck next time loser.");
    } 
    handleLeftArrowKey() {
        this.angle = 180;
        this.speed = this.speedWhenWalking;
    
    }
    handleRightArrowKey() {
        this.angle = 0;
        this.speed = this.speedWhenWalking;
    }
    handleGameLoop() {
        if (this.angle === 0) {
            if (this.speed > 0) {
                this.playAnimation("right");
            }
        }
        if (this.angle === 180) {
            if (this.speed > 0) {
                this.playAnimation("left");
            }
        }
        this.x = Math.max(5, this.x);
        this.isFalling = false;
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 1, Support);
        if (supports.length === 0 || supports[0].y < this.y + this.height) {
            this.isFalling = true;
            this.y = this.y + 4;
            
            console.log(supports[0]);
        if (supports.length > 0 && supports[0]instanceof Platform) {
            this.angle = supports[0].angle;
            this.speed = supports[0].speed;
            this.y = supports[0].y - this.height;
      }
    }
  }
}
    let ann = new Princess();
    ann.name = "Princess Ann";
    
  class Box extends Sprite {
    constructor(x, y) {
        super();
        this.x = 70;
        this.y = 400;
        this.speed = 250;
        this.speedWhenWalking = 200;
        this.setImage("Crate.png");
        this.isFalling = false;

    }
    handleBoundaryContact() {
        game.end("You dropped The box!");
    }
    handleGameLoop() {
        this.x = Math.max(5, this.x);
        this.speed = 0;
        this.isFalling = false;
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 1, Support);
        if (supports.length === 0 || supports[0].y < this.y + this.height) {
            this.isFalling = true;
            this.y = this.y + 4;
        }
        if (supports.length > 0 && supports[0]instanceof Platform) {
            this.angle = supports[0].angle;
            this.speed = supports[0].speed;
            this.y = supports[0].y - this.height;
        }
    }

}

let box = new Box();
box.name = "The box";

class Door extends Sprite {
    constructor() {
        super();
        this.setImage("TombStone (2).png");
        this.x = game.displayWidth - 120;
        this.y = finishPlatform.y - 2 * 38;
        this.accelerateOnBounce = false;
    }
    handleCollision(otherSprite) {
        if (otherSprite === box) {
            game.end("Congratulations!\n\nYou delivered The box safely you nerd!");
        }
    }
}

let exit = new Door();
exit.name = "The exit";
