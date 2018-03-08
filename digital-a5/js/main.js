var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
        game.load.image('bg', 'assets/bg.png'); //http://theartsyfartsyartroom.blogspot.com/2015/07/alternative-color-wheels.html
//https://i.pinimg.com/736x/95/f5/a7/95f5a704d80033f78e5fe47f4279a499--kitten-cat-kittens.jpg
    game.load.image('fg', 'assets/ride.jpg'); 
    game.load.image('analog', 'assets/fusia.png');
    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('cup', 'assets/cup3.png');    
        game.load.image('cup2', 'assets/cup3.png');    
        game.load.image('cup1', 'assets/cup3.png');    
    game.load.audio('music', 'assets/Clear3.mp3');
    //http://soundbible.com/2067-Blop.html
        game.load.audio('pop', 'assets/pop.mp3');


}

var arrow;
var cup;
var cup1;
var cup2;
var group; 
var space ;
var counter =0 ;
var catchFlag = false;
var catchFlag2 = false;
var catchFlag3 = false;
var welcome;
var bg;
var pop
var launchVelocity = 0;

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


    counter =0 ;

    analog = game.add.sprite(400, 350, 'analog');

    game.physics.enable(analog, Phaser.Physics.ARCADE);

    analog.body.allowGravity = false;
    analog.width = 8;
    analog.rotation = 220;
    analog.alpha = 0;
    analog.anchor.setTo(0.5, 0.0);
    
    arrow = game.add.sprite(400, 350, 'arrow');

    game.physics.enable(arrow, Phaser.Physics.ARCADE);

    arrow.anchor.setTo(0.1, 0.5);
    arrow.body.moves = false;
    arrow.body.allowGravity = false;
    arrow.alpha = 0;
    
    cup = game.add.sprite(100, 400, 'cup');
    game.physics.enable(cup, Phaser.Physics.ARCADE);
    cup.anchor.setTo(0.5, 0.5);
    cup.body.collideWorldBounds = true;
    cup.body.bounce.setTo(0.9, 0.9);
     cup.width-= 30
    cup.height-= 30 
 
    // Enable input.
    group = game.add.group();
    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;

    cup.inputEnabled = true;
    cup.input.start(0, true);
    cup.events.onInputDown.add(set,cup);
    cup.events.onInputUp.add(launch,cup);

    cup2 = game.add.sprite(600, 400, 'cup2');
    game.physics.enable(cup2, Phaser.Physics.ARCADE);
    cup2.anchor.setTo(0.5, 0.5);
    cup2.body.collideWorldBounds = true;
    cup2.body.bounce.setTo(0.9, 0.9);
    cup2.width-= 30
    cup2.height-= 30 
 
       group.add(cup)

    // Enable input.
    cup2.inputEnabled = true;
    cup2.input.start(0, true);
    cup2.events.onInputDown.add(set,cup2);
    cup2.events.onInputUp.add(launch,cup2);
      group.add(cup2)

    cup1 = game.add.sprite(100, 200, 'cup1');
    game.physics.enable(cup1, Phaser.Physics.ARCADE);
    cup1.anchor.setTo(0.5, 0.5);
    cup1.body.collideWorldBounds = true;
    cup1.body.bounce.setTo(0.9, 0.9);
 cup1.width-= 30
    cup1.height-= 30 
 
    // Enable input.

    cup1.inputEnabled = true;
    cup1.input.start(0, true);

    cup1.events.onInputDown.add(set,cup1);
    cup1.events.onInputUp.add(launch,cup1);
    
      group.add(cup1)
 welcome = game.add.text(game.world.centerX-320 , game.world.centerY-200, "Welcome to the Teacup Ride \n The goal of the game is to prevent the teacups \n from colliding with each other as long as you can\n Use the mouse to click and drag for \ndirection and power \n\n press space to start,Good luck!!",{
            font: "30px Arial",
            fill: "#fff",
            align: "center",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 10
        });
    
    

}

function set(tcup,pointer) {

    tcup.body.moves = false;
    tcup.body.velocity.setTo(0, 0);
    tcup.body.allowGravity = false;
    arrow.x = tcup.x +10
    arrow.y = tcup.y +10
    analog.x = tcup.x +10
    analog.y = tcup.y +10
    if(tcup.key == 'cup2') 
    catchFlag2 = true;
    else if(tcup.key == 'cup1')
        catchFlag3 = true;
    else
        catchFlag = true;



}

function launch(tcup) {
     
    catchFlag = false;
    catchFlag2 = false;
    catchFlag3 = false;
   
    console.log(tcup.key)
    tcup.body.moves = true;
    arrow.alpha = 0;
    analog.alpha = 0;
    Xvector = (5+(arrow.x - tcup.x)) * 4;
    Yvector = (5+(arrow.y - tcup.y)) * 4;
    tcup.body.velocity.setTo(Xvector, Yvector);
    pop.play()
    //if()

}
var text2
function lose() {
    game.physics.arcade.isPaused  = true;
    timer = game.time.create(false);
      text2 = game.add.text(game.world.centerX-150 , game.world.centerY-200, "Game Over !\nYour time was " + parseInt(this.game.time.totalElapsedSeconds()) + " seconds\n Try again!\n Restarting \n ",{
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
     cup1.body.velocity.setTo(70, -70);
    cup2.body.velocity.setTo(70, -70);
    cup.body.velocity.setTo(-70, 70);
   bg.width = 800;
   bg.height = 600;
       
       fg.width = 0;
   fg.height = 0;
   counter = 1
 } 


}
else{
     
         cup.angle +=2
         cup2.angle +=2
         cup1.angle +=2

    
    game.physics.arcade.collide(group,group,lose,null,this)


    if (catchFlag == true)
    {
        arrow.bringToTop();
        analog.bringToTop();

    arrow.rotation = game.physics.arcade.angleBetween(arrow, cup);


        cup.x = game.input.activePointer.worldX;   
        cup.y = game.input.activePointer.worldY;
        
        arrow.alpha = 1;    
        analog.alpha = 0.5;
        analog.rotation = arrow.rotation - 3.14 / 2;
        analog.height = game.physics.arcade.distanceToPointer(arrow)
        launchVelocity = analog.height;
    }   
     if (catchFlag2 == true)
    {
                arrow.bringToTop();
                analog.bringToTop();

            arrow.rotation = game.physics.arcade.angleBetween(arrow, cup2);

        //  Track the cup sprite to the mouse  
        cup2.x = game.input.activePointer.worldX;   
        cup2.y = game.input.activePointer.worldY;
        
        arrow.alpha = 1;    
        analog.alpha = 0.5;
        analog.rotation = arrow.rotation - 3.14 / 2;
        analog.height = game.physics.arcade.distanceToPointer(arrow);  
        launchVelocity = analog.height;
    } 
         if (catchFlag3 == true)
    {
                arrow.bringToTop();
                analog.bringToTop();

            arrow.rotation = game.physics.arcade.angleBetween(arrow, cup1);

        //  Track the cup sprite to the mouse  
        cup1.x = game.input.activePointer.worldX;   
        cup1.y = game.input.activePointer.worldY;
        
        arrow.alpha = 1;    
        analog.alpha = 0.5;
        analog.rotation = arrow.rotation - 3.14 / 2;
        analog.height = game.physics.arcade.distanceToPointer(arrow);  
        launchVelocity = analog.height;
    }   
  
  }

}

function render() {

  // https://downloads.khinsider.com/game-soundtracks/album/kirby-canvas-curse/Clear3.mp3
    // game.debug.spriteInfo(cup, 32, 64);
    // game.debug.text("Launch Velocity: " + parseInt(launchVelocity), 32, 250);

}