/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food1.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 1 * box,
    y : 3 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
// create the score var

let score = 100;

//control the snake

let d="UP";

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
       if(key == 37 && food.x/box >1)
        food.x -= 1*box;
    else if(key == 38 && food.y/box >3)
        food.y -= 1*box;
    else if(key == 39 && food.x/box <17)
        food.x += 1*box;
    else if(key == 40 && food.y/box <17)
        food.y += 1*box;
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
     
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (snaceX/box-1 && snakeY/box+1 > 16) d="UP";
    else if (snaceX/box-1 < 1 && snakeY/box-1 < 3) d="RIGHT";
    else if (snaceX/box+1 > 17 && snakeY/box-1 < 3) d="DOWN";
    else if (snaceX/box+1 > 17 && snakeY/box+1 > 17) d="LEFT";


    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score=score-5;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }
    else {
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
   
    if(score==0)
    {
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100 );


















