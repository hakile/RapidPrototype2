class LoseScreen extends Phaser.Scene {
    constructor() {
        super('losescreen')
    }
    create() {
        let sCX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let sCY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.header = this.add.text(sCX, -sCY*.2083, `Game Over!`, {font:`Bold ${.125*sCY}px Arial`,color:`#000`}).setOrigin(.5,0);
        this.go_desc = this.add.text(sCX, sCY, `You hit a slug!`, {font:`${.1667*sCY}px Arial`,color:`#000`}).setOrigin(.5).setAlpha(0);
        this.cameras.main.fadeIn(1000, 255,255,255);
        this.time.delayedCall(1000, () => this.tweens.add({targets: this.header, y: sCY*.1042, duration: 2000, ease: 'Quint.Out'}));
        this.time.delayedCall(2000, () => this.tweens.add({targets: this.go_desc, alpha: 1, duration: 1250}));
        this.time.delayedCall(4500, () => this.cameras.main.fade(1000, 255,255,255));
        this.time.delayedCall(5500, () => this.scene.start('gameplayscreen'));
    }
}

class GameplayScreen extends Phaser.Scene {
    constructor() {
        super('gameplayscreen')
    }
    create() {
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.text(screenCenterX, screenCenterY, 'Gameplay: Two Slugs', {font:`${.125*screenCenterY}px Arial`,color:`#000`}).setOrigin(.5);
        this.add.text(screenCenterX, screenCenterY + 100, 'Press left key to win. Press right key to lose.', {
            font:`${.125*screenCenterY}px Arial`,color:`#000`
        }).setOrigin(.5);
        this.cameras.main.fadeIn(1000, 255,255,255);
        this.cursors = this.input.keyboard.createCursorKeys();
        /*this.input.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('victoryscreen'));
        });*/
    }
    update() 
    {
        const {right, left} = this.cursors;
        if (right.isDown)
        {
            this.scene.start('losescreen');
        }
        else if (left.isDown)
        {
            this.scene.start('victoryscreen')
        }
    }
}

class VictoryScreen extends Phaser.Scene{
    constructor() {
        super("victoryscreen")
    }
    create(){
        this.victory =  this.add.text(640, 300, 'Victory!!',{font:'Bold 45px Arial',color: `#fce300`}).setOrigin(.5,0);
        this.input.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('gameplayscreen'));
        });
    }
}

const game = new Phaser.Game({
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    backgroundColor: 0xcccccc,
    physics: {
        default: 'arcade',
        arcade: {debug: true, gravity: {x:0, y:100}}
    },
    scene: [ GameplayScreen, VictoryScreen, LoseScreen],
    title: "Roly Poly: To The End",
});