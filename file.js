
var ball;
    var score = 0;
    var lives = 3;
    var gamestate = "serve";
    var bricks
    var bricks2
    var bricks3
    var bricks4 
    function preload() {
        ballimg=loadImage("golfball.png")
        sound1=loadSound("assets/category_hits/puzzle_game_button_04.mp3")
        sound2=loadSound("assets/category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3")
    }
    

    function createBrickRow(y, color) {
      for (var c = 0; c < 6; c++) {
        var brick = createSprite(65 + 54 * c, y, 50, 25);
        brick.shapeColor = color;
        bricks.add(brick);
      }
    }
    function createBrickRow2(y, color) {
        for (var c = 0; c < 6; c++) {
          var brick = createSprite(65 + 54 * c, y, 50, 25);
          brick.shapeColor = color;
          bricks2.add(brick);
        }
      }
      function createBrickRow3(y, color) {
        for (var c = 0; c < 6; c++) {
          var brick = createSprite(65 + 54 * c, y, 50, 25);
          brick.shapeColor = color;
          bricks3.add(brick);
        }
      }
      function createBrickRow4(y, color) {
        for (var c = 0; c < 6; c++) {
          var brick = createSprite(65 + 54 * c, y, 50, 25);
          brick.shapeColor = color;
          bricks4.add(brick);
        }
      }

    
    function setup()
    {
        ball = createSprite(200, 200, 10, 10);
        ball.addAnimation("golfball_1",ballimg);
        ball.scale = 0.05;
    
         paddle = createSprite(200, 350, 120, 10);
        paddle.shapeColor = "blue";
    
        edges= createEdgeSprites();
    
         bricks = new Group();
         bricks2 = new Group();
         bricks3 = new Group();
         bricks4 = new Group();
        createBrickRow(65, "red");
        createBrickRow2(65 + 29, "orange");
        createBrickRow3(65 + 29 + 29, "green");
        createBrickRow4(65 + 29 + 29 + 29, "yellow");
    }
    function draw() {
        createCanvas(400,400);
      background("black");

      textSize(20);
      text("Score: " + score, 40, 25);
      text("Lives: " + lives, 40, 45);

      if (gamestate == "serve") {
        text("Click to serve the ball.", 120, 250);
        ball.velocityX = 0;
        ball.velocityY = 0;
        ball.position.x = 200;
        ball.position.y = 200;
      } else if (gamestate == "end") {
        text("Game Over", 150, 250);
        ball.remove;
      } else {
        gameplay();
      }
      if (keyDown("space")) {
        if (gamestate == "pause") {
          gamestate = "play"
          ball.velocityX = -7
          ball.velocityY = -7
          paddle.shapeColor = "blue"
          bricks.setVelocityYEach(0.5)
          bricks2.setVelocityYEach(0.5)
          bricks3.setVelocityYEach(0.5)
          bricks4.setVelocityYEach(0.5)
          recolorbricks()
        } else
        if (gamestate == "play") {
          gamestate = "pause"
          ball.velocityX = 0
          ball.velocityY = 0
          bricks.setColorEach("GRAY");
          bricks2.setColorEach("GRAY");
          bricks3.setColorEach("GRAY");
          bricks4.setColorEach("GRAY");

          paddle.shapeColor = ("gray")
          bricks.setVelocityYEach(0)
          bricks2.setVelocityYEach(0)
          bricks3.setVelocityYEach(0)
          bricks4.setVelocityYEach(0)
        }
      }
      drawSprites();
    }

    function mousePressed() {
      ball.velocityX = 10;
      ball.velocityY = 6;

      if (gamestate == "serve") {
        gamestate = "play";
        ball.velocityY = -7;
        ball.velocityX = -7;
        bricks.setVelocityYEach(0.5)
        bricks2.setVelocityYEach(0.5)
          bricks3.setVelocityYEach(0.5)
          bricks4.setVelocityYEach(0.5)
      }

    }

    function brickHit(ball, brick) {
      //playSound("assets/category_hits/puzzle_game_button_04.mp3")
      play(sound1)
      brick.remove();
      score = score + 5;

      if (ball.velocityY < 12 && ball.velocityY > -12) {
        ball.velocityX *= 1.05;
        ball.velocityY *= 1.05;

      }

    }

    function lifeover() {
      lives = lives - 1;
      if (lives >= 1) {
        gamestate = "serve";
      } else {
        gamestate = "end";
      }
    }

    function gameplay() {
      paddle.position.x = World.mouseX;

      if (paddle.position.x < 60) {
        paddle.position.x = 60;
      }

      if (paddle.position.x > 340) {
        paddle.position.x = 340;
      }
      //rotation = rotation + 5;
      ball.bounceOff(edges[0]);
      ball.bounceOff(edges[1]);
      ball.bounceOff(edges[2]);
      //ball.bounceOff(paddle);
      ball.bounceOff(bricks, brickHit);
      ball.bounceOff(bricks2, brickHit);
      ball.bounceOff(bricks3, brickHit);
      ball.bounceOff(bricks4, brickHit);
      if (ball.bounceOff(paddle)) {
        play(sound2)
        //playSound("assets/category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
      }
      if (!bricks[0] && !bricks2[0] && !bricks3[0] && !bricks4[0]) {
        //console.log("Won");
        ball.velocityX = 0;
        ball.velocityY = 0;
        text("Well Done!!", 150, 200);
      }
      if (ball.isTouching(edges[3])) {
        lifeover();
      }
    }

    colors = ["red", "orange", "green", "yellow"]

    function recolorbricks() {
      console.log(bricks)
      for (var i = 0; i < bricks.length; i++) {
        bricks[i].shapeColor = colors[0]

      }
      for (var i1 = 0; i1 < bricks2.length; i1++) {
        bricks2[i1].shapeColor="orange"
      }
      for (var i2 = 0; i2 < bricks3.length; i2++) {
        bricks3[i2].shapeColor="green"
      }
      for (var i3 = 0; i3 < bricks4.length; i3++) {
        bricks4[i3].shapeColor="yellow"
      }

    
    }
    function play(s1)
    {
        s1.play();
        s1.setVolume(1);
        s1.rate(1);
    }