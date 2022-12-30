/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, luffy_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1,obstacle2;

var score=0;

var gameOver, restart;
var luffyImg
var iGround


function preload(){
  luffyImg = loadAnimation("assets/luffy.png","assets/luffy 2.png")
  //luffy_collided = loadImage("luffy_2.png")
  jungleImage = loadImage("assets/bg.png");
  obstacel1Img = loadAnimation("assets/o1.png","assets/o2better.png")
  obstacle2Img = loadImage("assets/newo2.png")
  obstacle3Img = loadImage("assets/kimg.png")
  obstacle4Img = loadAnimation("assets/dino1.png","assets/dino2.png","assets/dino3.png")
  loot1 = loadImage("assets/map.png");
  loot2 = loadImage("assets/meat.png");
  loot3 = loadImage("assets/beli.png");

  

}

function setup() {
  createCanvas(800, 400);


  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  luffy = createSprite(50,300,20,50)
  luffy.addAnimation("running",luffyImg)

  luffy.scale = 0.40;

iGround = createSprite(400,350,1600,10)
iGround.visible = false


      
  lootGroup = new Group();

obstaclesGroup = new Group()


}

function draw() {
  background(255);
  
 // kangaroo.x=camera.position.x-270;
 if (gameState===PLAY)
 {
   jungle.velocityX = -3
  if(jungle.x<100){
    jungle.x = 400 
  }
  if(keyDown("SPACE")&& luffy.y> 150){
    luffy.velocityY = -5
  }
  
  luffy.velocityY += 0.40


  luffy.collide(iGround)
enemy();
loots();
flyingobs();
if(obstaclesGroup.isTouching(luffy)){
  gameState = END


}
if (lootGroup.isTouching(luffy)){
  for(var i=0;i<lootGroup.length;i++)
  {
    if(lootGroup[i].isTouching(luffy)){
      lootGroup[i].destroy()
    score +=1
    }
  }
}

 }

 drawSprites();
 textSize(20)
 fill("red")
 text("Score:"+score,50,50)


  if(gameState===END)
 {
  
  textSize(100)
  fill("blue")
  text("Game Over",200,200)
luffy.velocityY=0
jungle.velocityX=0
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
luffy.changeImage("collided",luffy_collided)
lootGroup.setVelocityXEach(0);
lootGroup.setLifetimeEach(-1);
 }
 
 
}
function enemy(){
  
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,320,10,40);
    
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.debug = false;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addAnimation("obs",obstacel1Img);
              break;
      case 2: obstacle.addImage("obs1",obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      default: break;
    
  }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);


}
}
function loots()
{
if(frameCount % 160 === 0) {
  var loot = createSprite(camera.position.x+500,150,40,10);

  loot.velocityX = -(6 + 3*score/100)
  loot.scale = 0.6;

  var rand = Math.round(random(1,3));
  switch(rand) {
    case 1: loot.addImage(loot1);
            break;
    case 2: loot.addImage(loot2);
            break;
    case 3: loot.addImage(loot3);
            break;
    default: break;
  }
  
  //assign scale and lifetime to the loot           
  loot.scale = 0.1
   //assign lifetime to the variable
  loot.lifetime = 400;
  
  loot.setCollider("rectangle",0,0,loot.width/2,loot.height/2)
  //add each cloud to the group
  lootGroup.add(loot);
  

}
}
function flyingobs()
{
if(frameCount % 160 === 0) {
  var loot = createSprite(300,100,40,10);
  loot.addAnimation("flying",obstacle4Img)
  loot.velocityX = -(6 + 3*score/100)
  loot.scale = 0.6;

  
  //assign scale and lifetime to the loot           
  loot.scale = 0.1
   //assign lifetime to the variable
  loot.lifetime = 400;
  
  loot.setCollider("rectangle",0,0,loot.width/3,loot.height/3)
  //add each cloud to the group
  obstaclesGroup.add(loot);
  

}
}