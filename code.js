var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {
    "orderedKeys": ["3c285ece-5057-474f-b5c9-c75f9b5b21a1"],
    "propsByKey": {
      "3c285ece-5057-474f-b5c9-c75f9b5b21a1": {
        "name": "golfball_1",
        "sourceUrl": "assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png",
        "frameSize": {
          "x": 393,
          "y": 394
        },
        "frameCount": 1,
        "looping": true,
        "frameDelay": 2,
        "version": "HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY",
        "categories": ["sports"],
        "loadedFromSource": true,
        "saved": true,
        "sourceSize": {
          "x": 393,
          "y": 394
        },
        "rootRelativePath": "assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png"
      }
    }
  };
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
        image,
        props.frameSize.x,
        props.frameSize.y,
        frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
    // -----

    var ball;
    var score = 0;
    var lives = 3;
    var gamestate = "serve";
    ball = createSprite(200, 200, 10, 10);
    ball.setAnimation("golfball_1");
    ball.scale = 0.05;

    var paddle = createSprite(200, 350, 120, 10);
    paddle.shapeColor = "blue";

    createEdgeSprites();

    var bricks = createGroup();
    var bricks2 = createGroup();
    var bricks3 = createGroup();
    var bricks4 = createGroup();

    function createBrickRow(y, color) {
      for (var c = 0; c < 6; c++) {
        var brick = createSprite(65 + 54 * c, y, 50, 25);
        brick.shapeColor = color;
        bricks.add(brick);
      }
    }

    createBrickRow(65, "red");
    createBrickRow(65 + 29, "orange");
    createBrickRow(65 + 29 + 29, "green");
    createBrickRow(65 + 29 + 29 + 29, "yellow");

    function draw() {
      background("black");

      textSize(20);
      text("Score: " + score, 40, 25);
      text("Lives: " + lives, 40, 45);

      if (gamestate == "serve") {
        text("Click to serve the ball.", 120, 250);
        ball.velocityX = 0;
        ball.velocityY = 0;
        ball.x = 200;
        ball.y = 200;
      } else if (gamestate == "end") {
        text("Game Over", 150, 250);
        ball.remove;
      } else {
        gameplay();
      }
      if (keyWentDown("space")) {
        if (gamestate == "pause") {
          gamestate = "play"
          ball.velocityX = -7
          ball.velocityY = -7
          paddle.shapeColor = ("blue")
          bricks.setVelocityYEach(0.5)
          recolorbricks()
        } else
        if (gamestate == "play") {
          gamestate = "pause"
          ball.velocityX = 0
          ball.velocityY = 0
          bricks.setColorEach("GRAY");
          paddle.shapeColor = ("gray")
          bricks.setVelocityYEach(0)
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
      }

    }

    function brickHit(ball, brick) {
      playSound("assets/category_hits/puzzle_game_button_04.mp3")
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
      paddle.x = World.mouseX;

      if (paddle.x < 60) {
        paddle.x = 60;
      }

      if (paddle.x > 340) {
        paddle.x = 340;
      }
      //rotation = rotation + 5;
      ball.bounceOff(topEdge);
      ball.bounceOff(leftEdge);
      ball.bounceOff(rightEdge);
      //ball.bounceOff(paddle);
      ball.bounceOff(bricks, brickHit);
      if (ball.bounceOff(paddle)) {
        playSound("assets/category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
      }
      if (!bricks[0]) {
        //console.log("Won");
        ball.velocityX = 0;
        ball.velocityY = 0;
        text("Well Done!!", 150, 200);
      }
      if (ball.isTouching(bottomEdge)) {
        lifeover();
      }
    }

    colors = ["red", "orange", "green", "yellow"]

    function recolorbricks() {
      console.log(bricks)
      for (var i = 0; i < bricks.length; i++) {
        bricks[i].shapeColor = colors[randomNumber(0, 3)]

      }
      /*for (var i1 = 6; i1 < bricks.length; i1++) {
        bricks[i1].shapeColor="orange"
      }
      for (var i2 = 12; i2 < bricks.length; i2++) {
        bricks[i2].shapeColor="green"
      }
      for (var i3 = 18; i3 < bricks.length; i3++) {
        bricks[i3].shapeColor="yellow"
      }

      */
    }


    // -----
    try {
      window.draw = draw;
    } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) {
          preload();
        }
        break;
      case 'setup':
        if (setup !== window.setup) {
          setup();
        }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};