//Dat kich thuoc man hinh thanh hang so
const screenWidth = 800;
const screenHeight = 600;
//Tao bien toan cuc kiem soat toc do
const shipSpeed = 6;
//Tao 1 cua so 800x600 voi mau nen
var config = {
    type: Phaser.AUTO,
    width: 800,
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
let ship;
//Tao bien dieu khien va co the up down left right theo ban phim
let cursors;


//Goi khi tro choi bat dau voi man hinh chinh
function preload() {
//    this.load.setBaseURL('http://labs.phaser.io');
//    this.load.image('sky', 'assets/skies/space3.png');
//    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
//    this.load.image('red', 'assets/particles/red.png')
//Lay hinh anh vu tru
      this.load.setBaseURL('.');
      this.load.image('background', 'assets/background.jpg');
      this.load.image('ship', 'assets/phaser-ship.png');
      this.load.image('star', 'assets/demoscene/star2.png');
      this.load.image('baddie', 'assets/sprites/space-baddie.png');
      this.load.atlas('lazer', 'assets/games/defender/laser.png', 'assets/games/defender/laser.json');
      
}
//trinh xay dung va khoi tao chinh o day , tao nhan vat va dinh hinh cho ban phim va chuot
function create() {
//   //Add image va chinh 1 so vi tri
//    this.add.image(400, 300, 'sky');
//    var particles = this.add.particles('red');
//    //Them su kien chay 
//    var emitter = particles.createEmitter({
//        speed: 100,
//        scale: {start: 1, end: 0},
//        blendMode: 'ADD'
//    });
//   //Them logo chen vao hinh anh va chen su kien chay
//   var logo = this.physics.add.image(400, 100, 'logo');
//   logo.setVelocity(100, 200);
//   logo.setBounce(1, 1);
//   logo.setCollideWorldBounds(true);
//   emitter.startFollow(logo);

//cau hinh camera
    const image = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height /2,
        'background'
    );
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    //Tao con tau ship va dat vi tri 
    ship = this.add.sprite(100, 100, 'ship');
    ship.setScale(4, 4);
    //Dat cac ngoi sao
    stars = this.add.group();

    for (var i = 0; i < 128; i++)
    {
        stars.create(4, 4, 'star');
    }

    baddies = this.add.group();

    for (var i = 0; i < 16; i++)
    {
        baddies.create(6, 6, 'baddie');
    }

    cursors = this.input.keyboard.createCursorKeys();
}
//Cap nhat trang thai cho tro choi
function update() {
  //Neu cursors dieu khien qua trai thi tang x len 2, phai giam x xuong2, len thi tang y len 2, xuong thi giam y xuong 2
   if(cursors.right.isDown) {
      ship.x += shipSpeed;
      //Neu cham man hinh ben phai nghia la do dai cua ship.x lon hon do dai man hinh thi no se ve 0 nghia la ben trai
      if( ship.x >= screenWidth) {
          ship.x = 0
      }
      ship.flipX = false;
   } else if( cursors.left.isDown) {
       ship.x -= shipSpeed;
       //Neu cham man hinh ben trai no se gan x bang do dai man hinh nghia la o ben phai
       if(ship.x <= 0){
           ship.x = screenWidth;
       }
       //Quay sang trai thi tau quay dau
       ship.flipX = true;
   } else if( cursors.up.isDown) {
       ship.y -= shipSpeed;
       //Tuong tu hieu nhu tren
        //Neu tau cham hoac di qua man hinh ben tren nghia la lon hon screeenHeight ta cho ship.y tro ve 0 nghia la o ben duoi
       if( ship.y <= 0) {
           ship.y = screenHeight;
       }
   } else if( cursors.down.isDown) {
       ship.y += shipSpeed;
       if( ship.y >=  screenHeight) {
           ship.y = 0;
       }
   }
}