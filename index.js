const table = document.querySelector('.container')
const startBtn = document.getElementById("start-btn")
const resetBtn = document.getElementById("reset-btn")
const enterBtn = document.getElementById("enter-btn")
let inputEl = document.getElementById("input-name")
const modalName = document.getElementById("modal-name")
let nameEl = document.getElementById("name-el")
const playerName = document.getElementById("player-name")
let scorePlayer = document.getElementById("score-player")
const gameEnd = document.getElementById("gameEnd")
let frames = []
let firstSnake = [1,0]
const width = 25
let axisDirection = 1
let scoreInitial = 0
let foodIndicator = 0
let timerInterval = 1000
let speedSnake = 0.75
let timerId = 0
let time = 1000
playerName.style.display = "none";
startBtn.disabled = true;
resetBtn.disabled = true;


function createGridGame() {
    for (let i = 0; i < width*width; i++) {
        const frame = document.createElement('div')
        frame.classList.add('frame')
        table.appendChild(frame)
        frames.push(frame)

    }
}
createGridGame()

modalName.addEventListener("click", function(){
    playerName.style.display = "block"
})

enterBtn.addEventListener("click", function(){
    nameEl.textContent = inputEl.value
    playerName.style.display = "none"
    inputEl.value = ""
    startBtn.disabled = false;
    modalName.disabled = true;
})


firstSnake.forEach(index => frames[index].classList.add('serpent')) //se asigna color en CSS a first snake

function playMatch(){
    firstSnake.forEach(index => frames[index].classList.remove('serpent'))
    frames[foodIndicator].classList.remove('food')
    clearInterval(timerId)
    firstSnake = [1,0]
    scoreInitial = 0
    timerInterval = 1000
    axisDirection = 1
    scorePlayer.textContent = scoreInitial
    createFood()
    firstSnake.forEach(index => frames[index].classList.add('serpent'))
    timerId =setInterval(movement, timerInterval)
 
}

function createFood(){
    do {
        foodIndicator = Math.floor(Math.random() * frames.length)
    } while (frames[foodIndicator].classList.contains('serpent')) 
    frames[foodIndicator].classList.add('food')
    
}

function movement() {
    if ((firstSnake[0] + width >= width*width && axisDirection === width) || (firstSnake[0] % width === width-1 && axisDirection === 1) || (firstSnake[0] % width === 0 && axisDirection === -1) || (firstSnake[0] - width < 0 && axisDirection === -width) || frames[firstSnake[0] + axisDirection].classList.contains('serpent')  )
       {
            startBtn.disabled = true
            resetBtn.disabled = false
            gameEnd.textContent = "Game Over, Try again"
            return clearInterval(timerId)
            
        }

        gameEnd.textContent = ""
        firstSnake.unshift(firstSnake[0] + axisDirection)
        const tail = firstSnake.pop()
        frames[tail].classList.remove('serpent')
       
        if(frames[firstSnake[0]].classList.contains('food'))
    {
            frames[firstSnake[0]].classList.remove('food')
            frames[tail].classList.add('serpent')
            firstSnake.push(tail)
            createFood()
            scoreInitial += 1
            clearInterval(timerId)
            timerInterval = timerInterval * speedSnake
            if (timerInterval < 100){
                timerInterval = 100
            }
            timerId = setInterval(movement, timerInterval)
    
    }
    frames[firstSnake[0]].classList.add('serpent')
    scorePlayer.textContent = scoreInitial
} 

function controlSerpent(j){
    switch(j.keyCode){
        case 39: 
            axisDirection = 1
            break;
        case 38: 
            axisDirection = -width
            break;
        case 37:
            axisDirection = -1
            break;
        case 40:
        axisDirection = +width
        break;
        }

}

document.addEventListener("keyup", controlSerpent)

startBtn.addEventListener("click",playMatch)
resetBtn.addEventListener("click", playMatch)




