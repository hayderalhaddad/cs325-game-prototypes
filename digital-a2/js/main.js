window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'chick', 'assets/chick1.png' );
        game.load.image( 'chick1', 'assets/chick.png' );
        game.load.image( 'chick2', 'assets/chick2.png' );
        game.load.image( 'chick3', 'assets/chick3.png' );



        // load a tilemap and call it 'map'.
        // from .json file
        game.load.tilemap('map', 'assets/tilemap_example.json', null, Phaser.Tilemap.TILED_JSON);
        // alternatively, from .csv file
        //game.load.tilemap('map', 'assets/tilemap_example.csv', null, Phaser.Tilemap.CSV);
        
        //load tiles for map
        game.load.image('tiles', 'assets/tiles.png');

    }
    
    var map;
    var layer1;
    var chick;
     var chick1;
    var chick2;
     var chick3;
     var clist
     var c;
     var text;
     var end = 0 ;
     var start = 0 ; 


    
    function create() {
        // Create the map. 
        map = game.add.tilemap('map');
        // for csv files specify the tile size.
        //map = game.add.tilemap('map', 32, 32);
        console.log("hello")
        //add tiles
        map.addTilesetImage('tiles');
        
        // Create a layer from the map
        //using the layer name given in the .json file
        layer1 = map.createLayer('Tile Layer 1');
        //for csv files
        //layer1 = map.createLayer(0);
        
        //  Resize the world
        layer1.resizeWorld();
        clist = [];
        // Create a sprite at the center of the screen using the 'logo' image.
        chick = game.add.sprite( game.world.centerX, game.world.centerY, 'chick' );
    //    chicks(chick1)

  //       clist.push(new chicks(chick2))
  //       //chicks(chick3)
  //       clist.push(new chicks(chick3))
  //       clist.push(new chicks(chick1))
 

  // for(let i = 0 ; i < 3 ; i++){
  //       game.physics.arcade.enable(clist[i]);
  // }


    text = game.add.text(game.world.centerX-300 , game.world.centerY-200, "Collect your chicks \nas fast as you can!\n \n \n Click to start! ", {
        font: "60px Arial",
        fill: "#F7FF00",
        align: "center",
        fontStyle: "bold",
        stroke: "black",
        strokeThickness: 1
    });
      text.stroke = '#000000';
    text.strokeThickness = 8;
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        chick.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( chick, Phaser.Physics.ARCADE );
            c = game.add.group();
                c.enableBody = true;
    c.physicsBodyType = Phaser.Physics.ARCADE;
chicks(c)
chicks(c)
chicks(c)
      
        // Make it bounce off of the world bounds.
        chick.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        
    game.input.onDown.add(startGame, this);

        
        game.camera.follow(chick);
        
    }
    function chicks( c) { 

    var x = game.world.randomX;
    var y = game.world.randomY;
    c = c.create(x,y,'chick')

    }
    function startGame() {
    start = 1; 
    text.setText(" ")
    }
    function found(_chick, _c) { 
        console.log(chick.key);
        _c.kill()
        if(chick.key == 'chick')
        {
            chick.loadTexture('chick2')

        }
        else if(chick.key == 'chick2')
        {
            chick.loadTexture('chick3')
        }
        else
        {
        chick.loadTexture('chick1')
     chick.rotation = game.physics.arcade.accelerateToPointer( chick, this.game.input.activePointer, 0, 0, 0 );
            text.setText("Game Over, it took you : \n" + parseInt(this.game.time.totalElapsedSeconds()) + " seconds,\n not good enough..")
            text.x =game.world.centerX -300
            text.y=game.world.centerY-200

           end = 1;

             }

    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        if(start!= 0 ) {
        if(end==1 ){
                 chick.rotation = game.physics.arcade.accelerateToPointer( chick, this.game.input.activePointer, 0, 0, 0 );

                 chick.x = game.world.centerX
                 chick.y= game.world.centerY
        }
        chick.rotation = game.physics.arcade.accelerateToPointer( chick, this.game.input.activePointer, 1000, 800, 800 );

    game.physics.arcade.collide(chick, c, found, null, this)

    }
}
   
};
