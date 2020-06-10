var config = {
    type: Phaser.CANVAS,
    width: 800*4,
    height: 600,
    backgroundColor: '#03187D',
    physics: {
       default: 'arcade',
       arcade: {
           gravity: { y: 200}
       }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);

function preload () {

    this.load.setBaseURL('.');
    this.load.image('player', 'assets/games/defender/ship.png');
    this.load.image('star', 'assets/demoscene/star2.png');
    this.load.image('baddie', 'assets/sprites/space-baddie.png');
    this.load.atlas('lazer', 'assets/games/defender/laser.png', 'assets/games/defender/laser.json');

}

var stars;
var baddies;
var lazers;
var player;
var cursors;
var fireButton;
var bulletTime = 0;
var frameTime = 0;
var frames;
var prevCamX = 0;

function create () {

    this.world.setBounds(0, 0, 800*4, 600);

    frames = Phaser.Animation.generateFrameNames('frame', 2, 30, '', 2);
    frames.unshift('frame02');

    stars = this.add.group();

    for (var i = 0; i < 128; i++)
    {
        stars.create(this.world.randomX, this.world.randomY, 'star');
    }

    baddies = this.add.group();

    for (var i = 0; i < 16; i++)
    {
        baddies.create(this.world.randomX, this.world.randomY, 'baddie');
    }

    lazers = this.add.group();

    player = this.add.sprite(100, 300, 'player');
    player.anchor.x = 0.5;

    this.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    prevCamX = this.camera.x;

}

function update () {

    if (cursors.left.isDown)
    {
        player.x -= 8;
        player.scale.x = -1;
    }
    else if (cursors.right.isDown)
    {
        player.x += 8;
        player.scale.x = 1;
    }

    if (cursors.up.isDown)
    {
        player.y -= 8;
    }
    else if (cursors.down.isDown)
    {
        player.y += 8;
    }

    if (fireButton.isDown)
    {
        fireBullet();
    }

    lazers.forEachAlive(updateBullets, this);

    prevCamX = this.camera.x;

}

function updateBullets (lazer) {

    // if (game.time.now > frameTime)
    // {
    //     frameTime = game.time.now + 500;
    // }
    // else
    // {
    //     return;
    // }

    //  Adjust for camera scrolling
    var camDelta = this.camera.x - prevCamX;
    lazer.x += camDelta;

    if (lazer.animations.frameName !== 'frame30')
    {
        lazer.animations.next();
    }
    else
    {
        if (lazer.scale.x === 1)
        {
            lazer.x += 16;

            if (lazer.x > (this.camera.view.right - 224))
            {
                lazer.kill();
            }
        }
        else
        {
            lazer.x -= 16;

            if (lazer.x < (this.camera.view.left - 224))
            {
                lazer.kill();
            }
        }
    }

}

function fireBullet () {

    if (this.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        lazer = lazers.getFirstDead(true, player.x + 24 * player.scale.x, player.y + 8, 'lazer');

        lazer.animations.add('fire', frames, 60);
        lazer.animations.frameName = 'frame02';

        lazer.scale.x = player.scale.x;

        if (lazer.scale.x === 1)
        {
            // lazer.anchor.x = 1;
        }
        else
        {
            // lazer.anchor.x = 0;
        }

        //  Lazers start out with a width of 96 and expand over time
        // lazer.crop(new Phaser.Rectangle(244-96, 0, 96, 2), true);

        bulletTime = this.time.now + 250;
    }

}