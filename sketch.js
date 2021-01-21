var fruits,fruit_img1,fruit_img2,fruit_img3,fruit_img4;
var knife,sword_Img;
var monstor,enemy1;
var game_OverImg,gameOver;

var fruitGroup,EnemyGroup;


var PLAY=1;
var END=0;
var score=0;
var gameState=PLAY;

function preload(){
  
 
  fruit_img1= loadImage("fruit1.png");
  fruit_img2= loadImage("fruit2.png");
  fruit_img3= loadImage("fruit3.png");
  fruit_img4= loadImage("fruit4.png");
  
  sword_Img=loadImage("sword.png");
  
  
  game_OverImg=loadImage("gameover.png");

  enemy1= loadAnimation("alien1.png","alien2.png");
}


function setup(){
  createCanvas(600,600);
  
  knife= createSprite(150,200,30,26);
  knife.addImage(sword_Img);
  knife.scale=0.7;
  
  gameOver= createSprite(100,100);
  gameOver.addImage(game_OverImg);
  gameOver.visible=false;
  
  fruitGroup=new Group();
  EnemyGroup=new Group();
  
  score=0;
}


function draw(){
  background("lightBlue");
  
    
 if (gameState===PLAY){
    knife.y=World.mouseY;
    knife.x=World.mouseX; 
   
    fruit();
    Enemy();
   
  if (fruitGroup.isTouching(knife)){
   fruitGroup.destroyEach();
   score=score+2;
  } 
 
  else  {
  
   if (EnemyGroup.isTouching(knife)){
     gameState=END;
    EnemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    EnemyGroup.destroyEach();
    fruitGroup.destroyEach();  
    knife.changeImage(game_OverImg);
     gameOver.visible=true;
    }
  }
  
 } 
  
   
  
  drawSprites(); 
  
  text("Score:"+score,270,50);
  textSize=20;
  
}

function fruit(){
  
  if (World.frameCount%80===0){
    fruits=createSprite(400,200,20,20);
    fruits.scale=0.2;
    //fruits.debug=true;
    r=Math.round(random(1,4));
  if (r==1){
    fruits.addImage(fruit_img1);
  } 
    else if (r==2){
    fruits.addImage(fruit_img2);
  } 
    else if (r==3){
    fruits.addImage(fruit_img3);
  } 
    else if (r==4){
    fruits.addImage(fruit_img4);
  }
    
  fruits.y=Math.round(random(50,340));
    
  fruits.velocityX=-7;
  fruits.setLifetime=100;
    
  fruitGroup.add(fruits);
    
 }
}

function Enemy(){
  
  if (World.frameCount%200===0){
    monstor= createSprite(200,365,20,30);
    monstor.addAnimation("moving",enemy1);
    monstor.y=Math.round(random(100,300));
    monstor.velocityX=-8;
    monstor.setLifetime=50;
    
    EnemyGroup.add(monstor);
  }
}