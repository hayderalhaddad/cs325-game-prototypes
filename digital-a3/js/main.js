
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/bg.jpg');
    game.load.image('enemy', 'assets/enemy-bullet.png');
    game.load.image('player', 'assets/star.png');
    game.load.image('portal', 'assets/Portal.png');
    game.load.image('power', 'assets/star2.png');
    game.load.audio('music', 'assets/space.mp3');




}
var player;
var rain;
var star;
var launch1;
var portal;
var power;
var dir;
var collect ;
var enemyGroup
 var enemyGroup2
 var text;
 var timer
  var sky
  var end; 
  var clicked 
  var welcome
  var space

function create() {

  sky =  game.add.image(0, 0, 'sky');

   sky.width = 800;
   sky.height = 600;
   sky.alpha = 0.7;


    game.physics.arcade.gravity.y = 400;
    portal = game.add.image(game.world.centerX, game.world.centerY, 'portal');
     portal.anchor.setTo(0.5)
   player = game.add.sprite(game.world.centerX, 600, 'player');

   launch1 = []
    game.physics.enable(player, Phaser.Physics.ARCADE);

var music = game.add.audio('music')
music.play()

      
    collect = 0 ; 

    enemyGroup = game.add.group()
    enemyGroup2 = game.add.group()
   // power = game.add.group()
        player.body.collideWorldBounds = true;


    player.anchor.setTo(0.5, 0.5);
    player.enableBody = true;
    player.body.allowGravity = false;
    player.body.immovable = true;

 
    dir = game.input.keyboard.createCursorKeys();
       welcome = game.add.text(game.world.centerX-350 , game.world.centerY-200, "Try in save the star by getting it in the black portal on the center of screeen \nYou automatically move up once you collect a yellow stars\n Move right and left using arrows \npress space to begin \n Good Luck! ",{
            font: "20px Arial",
            fill: "#F7FF00",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 1
        });

    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

   var clicked = -1;

    game.time.events.repeat(Phaser.Timer.SECOND *1.85, 100, launch, this);
     game.time.events.repeat(Phaser.Timer.SECOND *2.1, 100, launch2, this);
   game.time.events.repeat(Phaser.Timer.SECOND *5.55, 100, powerup, this);

}

var text2
function lose() {
    game.physics.arcade.isPaused  = true;
    timer = game.time.create(false);
      text2 = game.add.text(game.world.centerX-300 , game.world.centerY-200, "Game Over, Star is destroyed, Try again! \n ",{
            font: "30px Arial",
            fill: "#F7FF00",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 1
        });

    timer.loop(2000, reset, this);
    timer.start()

}
function reset()
{
text2.setText(" ")
    game.physics.arcade.isPaused  = false;

clicked = -1
game.state.start(game.state.current);


}
let set = 0;
function launch () {
     enemyGroup.removeAll(true,true);

   for(let i = 0 ; i < 10 ; i ++) {
        enemyGroup.create(game.world.randomX,0, 'enemy');

   }
     game.physics.enable(enemyGroup, Phaser.Physics.ARCADE);

   
}

function launch2() {
  
    enemyGroup2.removeAll(true,true);

   for(let i = 0 ; i < 10 ; i ++) {
        enemyGroup2.create(game.world.randomX,0, 'enemy');

   }

     game.physics.enable(enemyGroup2, Phaser.Physics.ARCADE);

 }

function powerup() {
    power = game.add.sprite(game.world.randomX,-5, 'power')
     
     game.physics.enable(power, Phaser.Physics.ARCADE);
     power.body.gravity.y = 10;
}



function cc(_power,_player) {
        
    _power.destroy();
    collect++ 
    if(collect == 1) {
    game.physics.arcade.isPaused  = true;
    timer = game.time.create(false);
    timer.loop(2000, resume, this);
              text = game.add.text(game.world.centerX-250 , game.world.centerY-200, "Good Job, you're getting closer! \n ", {
            font: "30px Arial",
            fill: "#F7FF00",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 1
        });
            player.y -=30;


        timer.start()
   collect = 0
    }
    _power.kill()
    power.visible=true;
    console.log("Collectgh" + collect)

}

function resume()
{
player.y -=10;
player.x = game.world.centerX
game.physics.arcade.isPaused  = false;

text.setText(" ")
timer.destroy();



}
function endGame()
{
    game.physics.arcade.isPaused  = true;
text.setText(" Game Over, You saved the star! Well Done!!")
 


}

function update () {

    if(space.isDown) {
        clicked = 0 ;
    }


  
  if (clicked >0) { 
         portal.angle +=1
    game.physics.arcade.collide(enemyGroup, player, lose, null, this)
    game.physics.arcade.collide(enemyGroup2, player, lose, null, this)
    game.physics.arcade.collide(power, player, cc, null, this)

    
    if (dir.left.isDown)
    {
player.x -= 7;
        player.scale.x = 1;


    }
    else if (dir.right.isDown)
    {
        player.x += 7;
        player.scale.x = 1;
    }

    if(player.y <= game.world.centerY-5 && player.x==game.world.centerX) {
        endGame();

    }
}
 if(clicked == 0) { 
    enemyGroup.removeAll(true,true);
    enemyGroup2.removeAll(true,true);
    welcome.setText(" ")
    clicked ++ ; 

   }
 
}
//http://technicpack.wikia.com/wiki/File:Portal.png
//https://static.wixstatic.com/media/2cd43b_4e3655eb760b442bb4489c18b0bef624~mv2.png