var splash
var gameState = "wait"
var playbutton, soundonbutton, soundoffbutton;
var backgroundImg, player, zombie, zombieGroup, bgSound, playerimg, groundGame, coinImg, coinGroup;
var obImg1, obImg2, obstacle;
var coinScore, coinScoreSound, gunSound;

function preload() {
    splash = loadImage("Ghoul Grapple.gif")
    backgroundImg = loadImage("background.png")
    playerimg = loadImage("player.gif")
    zombie = loadImage("zombie.png")
    bgSound = loadSound("zombieSound.mp3")
    level1bg = loadImage("gameBackground.png")
    obImg1 = loadImage("zombie.png")
    obImg2 = loadImage("zombieSplashLeft.png")
    coinImg = loadImage("coin.png")
    coinScoreSound = loadSound("moneySound.mp3")
    gunSound = loadSound("gunSound.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("startbutton.png")
    playbutton.position(20, height / 2.5)
    playbutton.size(155, 140);

    soundonbutton = createImg("soundOn.png")
    soundonbutton.position(width - 150, playbutton.y - 25)
    soundonbutton.size(150, 175)
    soundonbutton.mouseClicked(mute)


    soundoffbutton = createImg("soundOff.png")
    soundoffbutton.position(width - 150, playbutton.y - 25)
    soundoffbutton.size(150, 175)
    soundoffbutton.hide()
    soundoffbutton.mouseClicked(mute)

    bgSound.play()

    ground = createSprite(0, 0, width, height)
    ground.addImage(level1bg)
    ground.visible = false
    // ground.x = ground.width / 2
    ground.scale = 5

    groundGame = createSprite(width / 2 - 10, height - 30, width, 10)
    // groundGame.visible = false

    player = createSprite(width / 2, height - 150);
    player.addImage(playerimg);
    player.scale = 0.7
    player.visible = false;
    player.debug=true;
    player.setCollider("rectangle",0,0,(player.width)/3.2,(player.height)/1.75)

    coinGroup= new Group();
    zombieGroup = new Group();

}

function draw() {
    player.collide(groundGame)
    if (gameState === "wait") {
        background(splash)
        
    }

    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()
    })

    if (gameState == "level1") {
    //   background(level1bg)
        addobstacles()
        addrewards()
        ground.visible = true
        player.visible = true;
            ground.velocityX = -5
        player.velocityY=5
        if (keyDown("SPACE")) {
            player.velocityY = -10
        }
        if(keyDown("SHIFT")){
            player.velocityY=10
        }
        player.velocityY += 0.5
        // if (player.collide(obstacle)) {

        // }

        if (ground.x < 0) {
            ground.x = ground.width / 2
        }
    }
        
    drawSprites()

}

function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        soundoffbutton.show();
        soundonbutton.hide();
        console.log("mute")
    }
    else {
        soundonbutton.show()
        soundoffbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}


function addobstacles() {


    if (frameCount % 300 == 0) {
        var obstacle = createSprite(width, height - 150)
        var rand = Math.round(random(1, 2))
        obstacle.velocityX = -5
      

        switch (rand) {

            case 1: obstacle.addImage(obImg1)
            obstacle.scale=0.5
                break;
            case 2: obstacle.addImage(obImg2)
            obstacle.scale=0.75
                break;
            default: break;

        }
    }
}

function addrewards() {


    if (frameCount % 190 == 0) {
        var reward = createSprite(width, height - 150)
        // var rand = Math.round(random(1, 2))
        reward.velocityX = -5
        reward.addImage(coinImg)
        reward.scale=0.4
        reward.debug=true;
        
        // switch (rand) {

        //     case 1: 
        //         break;
        
        //     default: break;

        // }
        if(player.collide(reward) || reward.collide(player)){
            coinScore=coinScore+1;
            console.log(coinScore);
        }
    }
}

