var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
        game.load.image('bg', 'assets/bg1.jpg'); //http://theartsyfartsyartroom.blogspot.com/2015/07/alternative-color-wheels.html
//https://i.pinimg.com/736x/95/f5/a7/95f5a704d80033f78e5fe47f4279a499--kitten-cat-kittens.jpg
    game.load.image('fg', 'assets/fg.jpg'); 
    game.load.image('gun', 'assets/gun.png');
    game.load.image('aim', 'assets/aim1.png');
    game.load.image('ashe', 'assets/ashe.png');
   game.load.spritesheet('gsp', 'assets/gsp.png',181 ,164)
    game.load.image('bullet', 'assets/enemy-bullet.png');
        game.load.audio('shot', 'assets/shotgun.wav');
    game.load.audio('ghostM', 'assets/ghost.mp3');

     game.load.audio('pop', 'assets/glass.mp3');

    game.load.image('ghost', 'assets/white-smoke.png');

}

var player;
let collected = 0;
var space ;
var counter =0 ;
var w;
var welcome;
var bg;
var pop
var launchVelocity = 0;
let down; 
var bullet
var pop
let text
let timer
let gun
let cx;
let cy;
let dude;
let shot;
let smoke;
let marker
let music
let collis = true; 
function create() {



    game.physics.startSystem(Phaser.Physics.ARCADE);
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

     bg=  game.add.image(0, 0, 'bg');
  bg.width = 0;
   bg.height = 0;
   bg.alpha = 0.75;    // set global gravity
    fg=  game.add.image(0, 0, 'fg');
  fg.width = 800;
   fg.height = 600;
   fg.alpha = 0.5;
     shot = game.add.audio('shot')
     pop = game.add.audio('pop')
     pop.addMarker('s',0.4, 0.6)
    smoke = game.add.sprite(0, 0, 'ghost');
        smoke.anchor.setTo(0.5, 0.5);
        smoke.visible = false;
        music  = game.add.audio('ghostM')
music.loop=true;
    music.play();
    
  dude = game.add.sprite(700, 50, 'ashe');
     game.physics.enable(dude, Phaser.Physics.ARCADE);
    dude.visible = false;
    dude.alpha = 1
    dude.width -= 10;
    dude.height-=10
    dude.immovable= true;

  gun = game.add.sprite(750, 550, 'gsp');
     game.physics.enable(gun, Phaser.Physics.ARCADE);
     gun.anchor.setTo(0.5, 0.5);
    gun.angle +=20
  
  bullet = game.add.sprite(650, 550, 'bullet');
     game.physics.enable(bullet, Phaser.Physics.ARCADE);
     bullet.anchor.setTo(0.5, 0.5);
     bullet.body.allowGravity = false;
     bullet.visible = false
    //   bricks2=game.add.group()
    // bricks2.create(400,50, 'bricks');
    // bricks2.create(150,50, 'bricks');
    player = game.add.sprite(game.world.randomX, 0, 'aim');

      gun.animations.add('a', [1],true,  true);
      gun.animations.add('b', [1,0,1],40,false, true);


     game.physics.enable(player, Phaser.Physics.ARCADE);
     player.anchor.setTo(0.5, 0.5);
     player.body.bounce.setTo(0.9, 0.9);

    timer = game.time.create(false);
   collis = true; 


    timer.loop(3000, launch, this);




       welcome = game.add.text(game.world.centerX-300 , game.world.centerY-275, "Haunted \n The goal of the game is \nto find and shoot the ashe vase within 3 seconds \n of it appearing before it releases the ghost\n Each vase will appear in a random location  \n So you have to find it quickly!  \n aim and shoot using your mouse\nYou can only fire 1 bullet at a time\nThe game will get harder if u last long enough \n press space to start,Good luck!!",{
            font: "30px Arial",
            fill: "#fff",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 10
        });
    


}


function hit() {
  pop.play('s')
  collected ++;
  collis = true;
  dude.visible=false

}
function launch() {

       if(collis == true) {
       dude.visible= true;
      dude.body.reset(0,0)
       dude.x = game.rnd.integerInRange(10, 750)
       dude.y = game.rnd.integerInRange(0, 550)
              collis = false

       if(dude.x>=700 && dude.y >= 550) {
       dude.x = game.rnd.integerInRange(10, 750)
       dude.y = game.rnd.integerInRange(10, 550)
     } } else{
        game.paused=true
  smoke.visible=true;
        smoke.x= dude.x+3
  smoke.y= dude.y-7
      lose()
     }

       }

   // block1.x=game.world.randomX
   // block1.y= 0
   //  game.physics.enable(block1, Phaser.Physics.ARCADE);
   //  block1.anchor.setTo(0.5, 0.5);
   //  block1.enableBody= true;
   //   block1.body.allowGravity = true;
   //   block1.height = 30

   //        timer2.destroy()




var text2
function lose() {
  player.kill()
 

    game.physics.arcade.isPaused  = true;
    timer = game.time.create(false);
    let thistime= parseInt(this.game.time.totalElapsedSeconds())
      text2 = game.add.text(game.world.centerX-150 , game.world.centerY-200, "Game Over,A ghost has escaped! !\nYou destoryed " + collected + " vases\n Try again!\n Refresh to restart \n ",{
            font: "30px Arial",
              fill: "#fff",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 10
        });


}
function reset()
{
text2.setText(" ")
    game.physics.arcade.isPaused  = false;

clicked = -1
game.state.start(game.state.current);


}

function update() {
  if(bullet.x <0 || bullet.x >800 ) {
    bullet.visible = false;

  } 
   if(bullet.y <0 || bullet.y>600 ) {
    bullet.visible = false;
    
  } 
if(counter <1) {
     if(space.isDown) {
          timer.start()

       welcome.setText("");
         gun.animations.play('a');

   bg.width = 800;
   bg.height = 600;

 fg.width = 0;
   fg.height = 0;
   counter = 1
 } 

}
else{
    if(collected ==5 ){
      dude.alpha = 0.85
      dude.width = 29
      dude.height = 29

    }
        if(collected ==10 ){
      dude.alpha = 0.75
      dude.width = 26
      dude.height = 26

    }
    //console.log(block1.y)
    if(count = 0 && (parseInt(this.game.time.totalElapsedSeconds()))>0 &&(parseInt(this.game.time.totalElapsedSeconds()))%15 == 0){
        console.log((parseInt(this.game.time.totalElapsedSeconds())))
       count = 1
    }
if(bullet.x < cx && bullet.y < cy) {

  bullet.visible = false
}

    game.physics.arcade.collide(bullet,dude,hit,null,this)

player.rotation = game.physics.arcade.moveToPointer(player, 2000, game.input.activePointer,50);
  if(game.input.activePointer.isDown &&game.input.activePointer.leftButton.duration <20) {
if(!bullet.visible) {
            gun.animations.play('b');
    shot.volume =0.5
    shot.play()

bullet.visible= true;
bullet.x = 740
bullet.y=540;
cx= player.x
cy= player.y
bullet.rotation = game.physics.arcade.moveToXY(bullet, player.x,player.y, 1300,300);
  }
  }
}
  }
  

function render() {

  // https://downloads.khinsider.com/game-soundtracks/album/kirby-canvas-curse/Clear3.mp3
    // game.debug.spriteInfo(cup, 32, 64);
    // game.debug.text("Launch Velocity: " + parseInt(launchVelocity), 32, 250);

}