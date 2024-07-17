let gameCanvas = document.querySelector('#gameCanvas');
let ctx = gameCanvas.getContext( '2d' );
let changingDirection = false;
let score=0;


document.addEventListener('keydown' , changeDirection);
function changeDirection(event){
    let LeftKey = 37;
    let RightKey = 39;
    let UpKey = 38;
    let DownKey = 40 ; 
    let KeyPressed = event.keyCode;
    if(changingDirection) return;
    changingDirection = true ;

    if(KeyPressed === LeftKey && dx !== 10){
        dx = -10;
        dy = 0
    }
    if(KeyPressed === RightKey && dx !== -10){
        dx = 10;
        dy = 0
    }
    if(KeyPressed === UpKey && dy !== 10){
        dx = 0;
        dy = -10
    }
    if(KeyPressed === DownKey && dy !== -10){
        dx = 0;
        dy = 10;
    }
    
}


let Snake = [
    {x:150 , y:150},
    {x:140 , y:150},
    {x:130 , y:150},
    {x:120 , y:150},
    {x:110 , y:150},
];



let foodX;
let foodY;
let dx = 10;
let dy = 0;

function main(){
    if(didGameEnd())
        {   document.querySelector('#score').innerHTML = 'GAME OVER!'
            document.querySelector('#score').style.color = 'red';
            return;} 
    setTimeout(() => {
        changingDirection = false;
        drawCanvs();
        drawfood();
        advanceSnake();
        drawSnake();        
        main();

    }, 100);
}

let drawfood = ()=>{
    ctx.fillStyle= 'red';
    ctx.strokeStyle = 'gold';
    ctx.fillRect(foodX , foodY , 10 , 10);
    ctx.strokeRect(foodX , foodY , 10 , 10);
}

function didGameEnd(){
    for (let i = 1; i < Snake.length; i++) {
        if(Snake[0].x === Snake[i].x && Snake[0].y === Snake[i].y)
            {return true;}    
    
            
    }
    const hitLeftWall = Snake[0].x < 0;
    const hitRightWall = Snake[0].x > gameCanvas.width - 10;
    const hitTopWall = Snake[0].y < 0 ;
    const hitBottomWall = Snake[0].y > gameCanvas.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    
}

let drawCanvs = ()=>{
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'red';    

    ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height);
    ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height);
}

let advanceSnake = ()=>{
    let head = {x : Snake[0].x+dx , y : Snake[0].y+dy}
    Snake.unshift(head);
    if (head.x===foodX && head.y===foodY){
        score = score+10;
        document.querySelector('#score').innerHTML= score;
        createfood();
    }
    else{
        Snake.pop();
    }
    
    // console.log(Snake);
}
let drawSnake =()=>Snake.forEach(drawSnakePart)
let drawSnakePart = snakepart=>{
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'purple';
    ctx.fillRect(snakepart.x , snakepart.y , 10 , 10);
    ctx.strokeRect(snakepart.x , snakepart.y , 10 , 10);
}

let randomNumber = (min,max)=>Math.round((Math.random() * (max - min) + min)/10)*10;

function createfood(){
    foodX = randomNumber (0, gameCanvas.width-10);
    foodY = randomNumber (0 , gameCanvas.height-10);
    Snake.forEach(snakepart=>{
        if (foodX===snakepart.x && foodY===snakepart.y){
            createfood();
        }
    })
    return (foodX , foodY);
}
createfood();
main();
