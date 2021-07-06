//Create variables here
var dog, happyDog;
var dogImage, dogImage1;
var database;
var foodS, foodStock;

function preload()
{
	//load images here
  dogImage=loadImage('images/dogImg.png');
  dogImage1=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);

  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  dog=createSprite(250,300,150,150);
  dog.scale=0.3;
  dog.addImage(dogImage);
}


function draw() {  
  background(255,255,255);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage1);
  }

  drawSprites();
  //add styles here
  textSize(15);
  stroke('black');
  text('Food remaining: '+foodS,170,200);
  text('Press up arrow key to feed the dog',100,10);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({Food:x});
}

