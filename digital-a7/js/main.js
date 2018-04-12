var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
        game.load.image('bg', 'assets/bg.jpg'); //http://theartsyfartsyartroom.blogspot.com/2015/07/alternative-color-wheels.html
//https://i.pinimg.com/736x/95/f5/a7/95f5a704d80033f78e5fe47f4279a499--kitten-cat-kittens.jpg
    game.load.image('fg', 'assets/fg.jpg'); 
    game.load.image('star', 'assets/arrow.png');

    game.load.image('block', 'assets/block.png');
    game.load.image('cup', 'assets/arrow.png');    
    game.load.audio('music', 'assets/Clear3.mp3');
        game.load.audio('jump', 'assets/jump.mp3');

     game.load.audio('pop', 'assets/pop.mp3');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    game.load.image('bricks', 'assets/bricks.png');

}
let collected;
var bullet;
let bricks;
let bricks1
let bricks2
let bricks3
let bricks4
let bricks5
var star;
var player;
var space ;
var counter =0 ;
var w;
var welcome;
var bg;
var pop
var launchVelocity = 0;
let down; 
let blocks;
let block
let block1
let block2
let timer
let powert
let counterG
var pop
function create() {



    game.physics.startSystem(Phaser.Physics.ARCADE);
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                w = game.input.keyboard.addKey(Phaser.Keyboard.W);

     bg=  game.add.image(0, 0, 'bg');
  bg.width = 0;
   bg.height = 0;
   bg.alpha = 0.7;    // set global gravity
    fg=  game.add.image(0, 0, 'fg');
  fg.width = 800;
   fg.height = 600;
   fg.alpha = 0.5;



 

    var music = game.add.audio('music')
      jump = game.add.audio('jump')
     pop = game.add.audio('pop')

music.play()

    game.physics.arcade.gravity.y = 100;
collected = 0;
    counter =0 ;
    player = game.add.sprite(300, 500, 'dude');
      star=game.add.sprite(100, 200, 'star');
      game.physics.enable(star, Phaser.Physics.ARCADE);

     star.body.allowGravity = false; 

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(0.5, 0.5);
 player.body.collideWorldBounds = true;
     player.body.allowGravity = false; 

          player.body.velocity.y = 50;
    bricks= game.add.sprite(100,600, 'bricks');
    bricks1= game.add.sprite(150,600, 'bricks');
    bricks2= game.add.sprite(150,600, 'bricks');
    bricks3= game.add.sprite(150,600, 'bricks');
    bricks4= game.add.sprite(150,600, 'bricks');
    bricks5= game.add.sprite(150,600, 'bricks');



  

    //   bricks2=game.add.group()
    // bricks2.create(400,50, 'bricks');
    // bricks2.create(150,50, 'bricks');

    block = game.add.sprite(game.world.randomX, 0, 'block');
     game.physics.enable(block, Phaser.Physics.ARCADE);
     block.anchor.setTo(0.5, 0.5);
     block.body.bounce.setTo(0.9, 0.9);
     block.body.allowGravity = true;
     block.height = 30
        block1 = game.add.sprite(0, 0, 'block');
        block1.visible= false;
        block2 = game.add.sprite(600 , 0, 'block');
        block2.visible= false;


    timer = game.time.create(false);
        powert = game.time.create(false);

    timer2 = game.time.create(false);
   counterG = 0 
   player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    timer.loop(1000, launch2, this);
    timer.start()

    timer2.loop(2000, launch, this);
    timer2.start()


       welcome = game.add.text(game.world.centerX-300 , game.world.centerY-275, "Hopper \n The goal of the game is \nto collect as many axes as you can \n you will loose if you get hit by the bricks\n Hit space to  jump towards \n the direction of your mouse pointer  \n But your jump has limited range!\nYou can jump over the bricks as well\n if you are accurate enough!\nThe game will get faster as time passes \n press space to start,Good luck!!",{
            font: "30px Arial",
            fill: "#fff",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 10
        });
    


}
function shoot(){
bullet.visible= true;

bullet.x = player.x 
bullet.y=player.y;

console.log('here')
bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
}
function power() {
  pop.play()
  star.y=600
  star.kill()
  collected++
   
    powert.loop(1000, lpower, this);
    powert.start()


}
function lpower() {
    powert.destroy()

star.revive()
star.x=game.world.randomX
star.y= game.world.randomY
     star.body.allowGravity = false;

}
function hit() {

}
function launch() {
        block1.visible= true;
   block1.x=game.world.randomX
   block1.y= 0
    game.physics.enable(block1, Phaser.Physics.ARCADE);
    block1.anchor.setTo(0.5, 0.5);
    block1.enableBody= true;
     block1.body.allowGravity = true;
     block1.height = 30

          timer2.destroy()


}
function launch2() {
            block2.visible= true;
   block2.x=game.world.randomX
   block2.y= 0
    game.physics.enable(block2, Phaser.Physics.ARCADE);
    block2.anchor.setTo(0.5, 0.5);
     block2.body.allowGravity = true;
     block2.height = 30

          timer.destroy()


}
var text2
function lose() {
  star.kill()
    game.physics.arcade.isPaused  = true;
    timer = game.time.create(false);
    let thistime= parseInt(this.game.time.totalElapsedSeconds())
      text2 = game.add.text(game.world.centerX-150 , game.world.centerY-200, "Game Over !\nYou collected " + collected + " axes\n Try again!\n Restarting \n ",{
            font: "30px Arial",
              fill: "#fff",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 10
        });

    timer.loop(4000, reset, this);
    timer.start()

}
function reset()
{
text2.setText(" ")
    game.physics.arcade.isPaused  = false;

clicked = -1
game.state.start(game.state.current);


}

function update() {
if(counter <1) {
     if(space.isDown) {
       welcome.setText("");
   bg.width = 800;
   bg.height = 600;

 fg.width = 0;
   fg.height = 0;
   counter = 1
 } 

}
else{
    //console.log(block1.y)
  
    if(count = 0 && (parseInt(this.game.time.totalElapsedSeconds()))>0 &&(parseInt(this.game.time.totalElapsedSeconds()))%15 == 0){
        console.log((parseInt(this.game.time.totalElapsedSeconds())))
       count = 1
    }
   bricks.y+=1;
      bricks1.y+=1;
   bricks2.y+=1;
      bricks3.y+=1;
   bricks4.y+=1;
      bricks5.y+=1;

       game.physics.arcade.collide(star, player, power, null, this)


    game.physics.arcade.collide(player,block1,lose,null,this)
    game.physics.arcade.collide(player,block2,lose,null,this)
        game.physics.arcade.collide(player,block,lose,null,this)



  if(block1.y > 600){
    bricks.y = 550
    bricks.x= block1.x
bricks1.y = 550
    bricks1.x= block1.x-50
    block1.y= 0
   block1.x=  game.world.randomX

      block1.body.reset(game.world.randomX,0)
      counterG ++
    if(counterG%2==0) {
    game.physics.arcade.gravity.y = game.physics.arcade.gravity.y +70;
        counterG ++
    }


  }

    if(block2.y > 600){
    bricks2.y = 550
    bricks2.x= block2.x
bricks3.y = 550

    bricks3.x= block2.x-50
    block2.y=0
    block2.x=  game.world.randomX
    block2.body.reset(game.world.randomX,0)
    

  }  
  if(block.y > 600){
     bricks4.x=block.x
    bricks4.y= 550
      bricks5.x=block.x-50
    bricks5.y= 550
    block.y=0
       block.x=  game.world.randomX

      block.body.reset(game.world.randomX,0)

  


  }
  if(game.input.activePointer.isDown &&game.input.activePointer.leftButton.duration <20) {
 shoot()
  }
    if(space.isDown &&space.duration <5) {
      jump.play();
  player.body.checkCollision.none = true;

   let mouseX =  game.input.activePointer.worldX;   
    let mouseY =  game.input.activePointer.worldY;   
  
    if(player.x <mouseX){
        player.animations.play('right');
        if(mouseX-player.x >100)
        {
            player.x = player.x +100
        }
        else {
            player.x = mouseX
        }
    }
      if(player.x >mouseX){
       player.animations.play('left');
        if(player.x-mouseX >100)
        {
            player.x = player.x -100
        }
        else {
            player.x = mouseX
        }
    }

        if(player.y <mouseY){
        if(mouseY-player.y >100)
        {
            player.y = player.y +100
        }
        else {
            player.y = mouseY
        }
    }
      if(player.y >mouseY){
        if(player.y-mouseY >100)
        {
            player.y = player.y -100
        }
        else {
            player.y = mouseY
        }
    }
  player.body.checkCollision.none = false;

}
        
     
   }   
}
  
  

function render() {

  // https://downloads.khinsider.com/game-soundtracks/album/kirby-canvas-curse/Clear3.mp3
    // game.debug.spriteInfo(cup, 32, 64);
    // game.debug.text("Launch Velocity: " + parseInt(launchVelocity), 32, 250);

}