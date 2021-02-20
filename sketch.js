var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground,invisibleGround;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground2;
var survivalTime,score;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 monkey_collided = loadAnimation("sprite_0.png"); 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  createCanvas(500, 450);
  ground = createSprite(250,445,500,20);
   
  ground.x = ground.width/2;
  ground.velocityX = -5;
 
  ground2 = createSprite(250,445,500,20);
  
  monkey = createSprite(100,410,40,30);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1

  
  invisibleGround = createSprite(100,440,100,5);
  invisibleGround.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
  survivalTime= 0;
  
}


function draw() {

  background(rgb(1, 92, 2));
  
stroke("black");
  textSize(20);
  fill("red");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival: "+ survivalTime ,370,50);
  stroke("yellow");
  textSize(20);
  fill("yellow");
  text(" score: "+ score,380,100);
  if (gameState === PLAY){
    ground.velocityX = -5;
    monkey.changeAnimation("running", monkey_running);
   if (keyDown("space") && monkey.y >= 279) {
      monkey.velocityY = -12; 

  }
 monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
      
    }
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
      score = score+1;
    }
 if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
 }
    monkey.collide(invisibleGround);
    spawnBanana();
  spawnObstacles();
  }
  if(gameState === END){
    
    ground.velocity = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
 banana.destroy();
    
    monkey.changeAnimation("collided",monkey_collided);
    survivalTime = Math.ceil(frameCount/frameRate(0))
  }

  
  drawSprites();
  
}



function spawnObstacles(){
 if(frameCount % 300 === 0) {
  var obstacle = createSprite(500,420,60,50);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    
   obstacle.lifetime = 100;
   obstaclesGroup.add(obstacle);
   
 } 
}

function spawnBanana(){
 if (frameCount % 120 === 0){
  banana = createSprite(500,200,40,30);
 banana.y = Math.round(random(190,290));
   banana.addImage(bananaImage);   
  banana.scale = 0.1;
   banana.velocityX = -5;
  banana.lifetime = 100;
   FoodGroup.add(banana); 
   
   
   
 }  
}











