var PLAY=1
var END=0
var gameState=PLAY
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200,10,10)
  ghost.addImage("ghost1",ghostImg);
  ghost.scale=0.3
  doors=new Group()
  climbers=new Group()
  invblocks=new Group()
}

function draw() {
  background(0);
  
  if(gameState===PLAY){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right")){
      ghost.x=ghost.x+3
    }
    if (keyDown("space")){
      ghost.velocityY=-10
    }
    ghost.velocityY=ghost.velocityY+0.8
    spawndoors()
    if(ghost.isTouching(climbers)){
      ghost.velocityY=0
    }
    if(ghost.y>600 || ghost.isTouching(invblocks)){
      gameState=END
    }
    drawSprites()
  }
  if(gameState===END){
    fill ("red")
    textSize(30)
    text("GameOver!",200,260)
  }
}
function spawndoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50)
    var climber=createSprite(200,10)
    var invblock=createSprite(200,15)
    invblock.width=climber.width
    invblock.height=2
    door.x=Math.round(random(120,400))
    climber.x=door.x
    invblock.x=door.x
    door.velocityY=1
    climber.velocityY=1
    invblock.velocityY=1
    door.addImage(doorImg)
    climber.addImage(climberImg)
    invblock.debug=true
    ghost.depth=door.depth
    ghost.depth+=1
    door.lifetime=800
    climber.lifetime=800
    invblock.lifetime=800
    doors.add(door)
    climbers.add(climber)
    invblocks.add(invblock)
  }
}
