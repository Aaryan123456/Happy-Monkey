var play = 1;
var end = 0;
var gamestate = play;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime , score;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png"); 
  
}



function setup() {
  createCanvas(450,450);
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,950,10);
  ground.velocityX=-4;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  
  monkey.setCollider("circle",0,0,300);
  monkey.debug = false;
 score = 0;
 
}


function draw() {
  
  background(255);
    
  if (gamestate===play){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
   survivalTime=Math.ceil(frameCount/frameRate()) 
   text("Survival Time: "+ survivalTime, 100,50);

    
    if(keyDown("space")&& monkey.y>= 305) {
      monkey.velocityY = -15;
    }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(obstaclesGroup.isTouching(monkey)){
        gamestate = end;
    }
  }
  else if (gamestate === end) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }

  drawSprites();
  stroke("white");
  fill("white");
  stroke("black");
  textSize(20);
  fill("black")
}


function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(450,305,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth - 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(450,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.13;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
