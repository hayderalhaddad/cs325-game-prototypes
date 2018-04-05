var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
        game.load.image('bg', 'assets/bg.jpg'); //http://theartsyfartsyartroom.blogspot.com/2015/07/alternative-color-wheels.html
//https://i.pinimg.com/736x/95/f5/a7/95f5a704d80033f78e5fe47f4279a499--kitten-cat-kittens.jpg
    game.load.image('fg', 'assets/fg.jpg'); 

    game.load.image('block', 'assets/block.png');
    game.load.image('cup', 'assets/arrow.png');    
    game.load.audio('music', 'assets/Clear3.mp3');
     game.load.audio('pop', 'assets/pop.mp3');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);


}


var player;
var space ;
var counter =0 ;

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
let counterG
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
     bg=  game.add.image(0, 0, 'bg');
  bg.width = 0;
   bg.height = 0;
   bg.alpha = 0.7;    // set global gravity
    fg=  game.add.image(0, 0, 'fg');
  fg.width = 800;
   fg.height = 600;
   fg.alpha = 0.5;

    var music = game.add.audio('music')
      pop = game.add.audio('pop')

music.play()

    game.physics.arcade.gravity.y = 100;

    counter =0 ;
    player = game.add.sprite(300, 500, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(0.5, 0.5);
    player.body.bounce.setTo(0.9, 0.9);
 player.body.collideWorldBounds = true;
     player.body.allowGravity = false;  

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
    timer2 = game.time.create(false);
   counterG = 0 
   player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    timer.loop(1000, launch2, this);
    timer.start()

    timer2.loop(2000, launch, this);
    timer2.start()


       welcome = game.add.text(game.world.centerX-300 , game.world.centerY-250, "Hopper \n The goal of the game is \nto not get hit by the bricks\n and jump over them instead!\n  Hit space to  jump towards \nthe direction of your mouse pointer  \n But your jump has limited range!\nThe game will get faster as time passes \n press space to start,Good luck!!",{
            font: "30px Arial",
            fill: "#fff",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 10
        });
    


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
    game.physics.arcade.isPaused  = true;
    timer = game.time.create(false);
    let thistime= parseInt(this.game.time.totalElapsedSeconds())
      text2 = game.add.text(game.world.centerX-150 , game.world.centerY-200, "Game Over !\nYour time was " +  thistime+ " seconds\n Try again!\n Restarting \n ",{
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

    game.physics.arcade.collide(player,block1,lose,null,this)
    game.physics.arcade.collide(player,block2,lose,null,this)
        game.physics.arcade.collide(player,block,lose,null,this)


  if(block1.y > 600){
    block1.y= 0
   block1.x=  game.world.randomX

      block1.body.reset(game.world.randomX,0)
      counterG ++
    if(counterG%2==0) {
        console.log('heree')
    game.physics.arcade.gravity.y = game.physics.arcade.gravity.y +70;
        counterG ++
    }


  }
    if(block2.y > 600){
        console.log(game.physics.arcade.gravity.y)
    block2.y =0 ;
       block2.x=  game.world.randomX

      //  block2.x= game.world.randomX
    block2.body.reset(game.world.randomX,0)


  }  
  if(block.y > 600){
    block.y=0
       block.x=  game.world.randomX

      block.body.reset(game.world.randomX,0)




  }
    if(space.isDown &&space.duration <5) {
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
    console.log(player.body.x)
    console.log(player.x)
  player.body.checkCollision.none = false;

}
        
     
   }   
}
  
  

function render() {

  // https://downloads.khinsider.com/game-soundtracks/album/kirby-canvas-curse/Clear3.mp3
    // game.debug.spriteInfo(cup, 32, 64);
    // game.debug.text("Launch Velocity: " + parseInt(launchVelocity), 32, 250);

}