let picesArray = []
let boardSize = 8
let whoseMove = 0;

let pickedPice = [-1, -1]

const changeBoardSize = () => {     // change board size based on users input
  const boardSizeInput = document.querySelectorAll('.board-size-input')
  boardSizeInput.forEach(input => {
    if(input.checked) boardSize = Number(input.dataset.boardSize)
  })
  renderBoard()
  setUpPices()
  placePices()
}

function renderBoard() {                            // renders board based on let boardSize
  const gameBoard = document.querySelector('#gameBoard')
  gameBoard.innerHTML = ''
  
  for(let i = 0; i < boardSize; i++){
    const boardRow = document.createElement('div')
    boardRow.classList.add('board-row')
    gameBoard.appendChild(boardRow)
  }

  const boardRows = document.querySelectorAll('.board-row')
  boardRows.forEach( (element, index) => {
    for(i = 0; i < boardSize; i++){
      const field = document.createElement('div')
      const fieldValue = document.createElement('div')
      fieldValue.classList.add('field-value')
      fieldValue.dataset.row = index
      fieldValue.dataset.col = i

      if(index % 2 === 0){
        if(i % 2 === 0) field.classList.add('board-field--light')
        else field.classList.add('board-field--dark')
      }

      else{
        const img = document.createElement('img');

        if(i % 2 !== 0) {
          field.classList.add('board-field--light')
        }
        else {
          field.classList.add('board-field--dark')
        }

      }

      // field.addEventListener('click', pickField)
      field.appendChild(fieldValue)
      element.appendChild(field)
    }
  })
}


function setUpPices() {
  picesArray = []

  if(boardSize === 10){         
    for(let i = 0; i < 4; i++){ // placing black pices
      let arrayRow = []
      let fieldValue

      for(let j = 0; j < boardSize; j++){ 
        if(i % 2 == 0) fieldValue = j % 2 !== 0 ? 'b' : ' '
        else fieldValue = j % 2 === 0 ? 'b' : ' '
        arrayRow.push(fieldValue)
      } 

      picesArray.push(arrayRow)
    }

    for(let i = 4; i < 6; i++){ // setting empty space between two players
      let arrayRow = []
      for(let j = 0; j < boardSize; j++){
        fieldValue = ' '
        arrayRow.push(fieldValue)
      } 
      picesArray.push(arrayRow)
    }

    for(let i = 6; i < boardSize; i++){ // placing white pices
      let arrayRow = []
      let fieldValue

      for(let j = 0; j < boardSize; j++){ 
        if(i % 2 == 0) fieldValue = j % 2 !== 0 ? 'w' : ' '
        else fieldValue = j % 2 === 0 ? 'w' : ' '
        arrayRow.push(fieldValue)
      } 

      picesArray.push(arrayRow)
    }
  }


  if(boardSize === 8){         
    for(let i = 0; i < 3; i++){ // placing black pices
      let arrayRow = []
      let fieldValue

      for(let j = 0; j < boardSize; j++){ 
        if(i % 2 == 0) fieldValue = j % 2 !== 0 ? 'b' : ' '
        else fieldValue = j % 2 === 0 ? 'b' : ' '
        arrayRow.push(fieldValue)
      } 
      picesArray.push(arrayRow)
    }

    for(let i = 3; i < 5; i++){ // setting empty space between two players
      let arrayRow = []
      for(let j = 0; j < boardSize; j++){
        fieldValue = ' '
        arrayRow.push(fieldValue)
      } 
      picesArray.push(arrayRow)
    }

    for(let i = 5; i < boardSize; i++){ // placing white pices
      let arrayRow = []
      let fieldValue

      for(let j = 0; j < boardSize; j++){ 
        if(i % 2 == 0) fieldValue = j % 2 !== 0 ? 'w' : ' '
        else fieldValue = j % 2 === 0 ? 'w' : ' '
        arrayRow.push(fieldValue)
      } 

      picesArray.push(arrayRow)
    }
  }
  else if (boardSize !== 10 && boardSize !== 8)console.log('Board size error')

}

function placePices() {
  const boardRows = document.querySelectorAll('.board-row')
  boardRows.forEach( (row, rowIndex) => {
    row.childNodes.forEach( (field, fieldIndex) => {
      
      if(picesArray[rowIndex][fieldIndex] === 'w')
        field.childNodes[0].classList.add('field-pice__white')
      
      else if(picesArray[rowIndex][fieldIndex] === 'b')
       field.childNodes[0].classList.add('field-pice__black')
      
    })
  })
}

function makePicesInteractive(){         // adds eventListers on players pawns to make them interactive
  document.querySelectorAll('.myPice')
    .forEach( el => {
      el.addEventListener('click', showAvailableMoves)
      el.addEventListener('click', pickPice)
    })
}

function makePicesStatic(){            // removes interactions from players pawns
  document.querySelectorAll('.myPice')
    .forEach( el => {
      el.removeEventListener('click', pickPice)
      el.removeEventListener('click', showAvailableMoves)
    })
      
      
}

function hideAvailableMoves(){        // hides all highlighted fileds
  document.querySelectorAll('.available-move')
    .forEach( el => el.classList.remove('available-move'))
}


function showAvailableMoves(evt){
  hideAvailableMoves()

  const startRow = evt.currentTarget.dataset.row
  const startCol = evt.currentTarget.dataset.col
  
  if(whoseMove){      // for blacks - counts and highlights fields
    let row = startRow
    let col = startCol

    while ((row < boardSize ) && (col < boardSize)) {
      field = getField(row, col)
      field.classList.add('available-move')

      row++
      col++
    }

    row = startRow
    col = startCol

    while ((row < boardSize ) && (col >= 0)) {
      field = getField(row, col)
      field.classList.add('available-move')

      row++
      col--
    }
  }

  else {            // for whites
    let row = startRow
    let col = startCol

    while ((row >= 0 ) && (col < boardSize && col >= 0)) {
      field = getField(row, col)
      field.classList.add('available-move')

      row--
      col++
    }

    row = startRow
    col = startCol

    while ((row >= 0 ) && (col < boardSize && col >= 0)) {
      field = getField(row, col)
      field.classList.add('available-move')

      row--
      col--
    }
  }
}

function whiteMoves(){
  makePicesStatic()        // removes eventlister PickPice from all .myPice fields

  document.querySelectorAll('.field-pice__black').forEach( field => {
    field.classList.remove('myPice')
  })
  document.querySelectorAll('.field-pice__white').forEach( field => {
    field.classList.add('myPice')
  })
  document.querySelector('#gameBoard').classList.remove('board-player--black')
  makePicesInteractive()        // adds eventLister PickPice to all .myPice fields
}

function blackMoves(){
  makePicesStatic()        // removes eventlister PickPice from all .myPice fields

  document.querySelectorAll('.field-pice__white').forEach( field => {
    field.classList.remove('myPice')
  })
  document.querySelectorAll('.field-pice__black').forEach( field => {
    field.classList.add('myPice')
  })
  document.querySelector('#gameBoard').classList.add('board-player--black')       // rotates board 180 deg
  makePicesInteractive()        // adds eventLister PickPice to all .myPice fields
}

function getField(row, col){
  const gameBoard = document.querySelector('#gameBoard')
  const pickedRow = gameBoard.childNodes[row]
  return pickedRow.childNodes[col]
}

function hidePickedPice(){
  makeFieldsUntargetable()                  // removes function that allows moving on field
  const selectedFields = document.querySelectorAll('.picked_pice')
  if(selectedFields)
    selectedFields.forEach(el => {
      el.classList.remove('picked_pice')
    })
    pickedPice[0] = -1
    pickedPice[1] = -1
}



function pickPice(evt){
  hidePickedPice()
  const row = evt.currentTarget.dataset.row
  const col = evt.currentTarget.dataset.col

  const pickedField = getField(row, col)
  pickedField.classList.add('picked_pice')
  pickedPice[0] = row
  pickedPice[1] = col
  console.log(pickedPice[0], pickedPice[1])

  makeFieldsTargetable()
  piceShakeAdd()
}
  
function nextPlayer() {
  whoseMove = !whoseMove
  hideAvailableMoves()
  hidePickedPice()

  if(whoseMove)
    blackMoves()
  else 
    whiteMoves()  

  console.log(`Ruch gracza ${whoseMove}`)
}

function shakePice(){
  pice = getField(pickedPice[0], pickedPice[1])
  pice.childNodes[0].classList.add('shakePice')
  
  setTimeout(() => {
    pice.childNodes[0].classList.remove('shakePice')
  }, 500)
  piceShakeRemove()
}

function animateMove(){
  pice = getField(pickedPice[0], pickedPice[1]).childNodes[0]
  pice.classList.add('takePiceBottomLeft')
  
  // setTimeout(() => {
  //   pice.classList.remove('movePiceTopRight')
  //   pice.classList.remove('movePiceTopLeft')
  // }, 1000) 

  hideAvailableMoves()
  hidePickedPice()
}

function takePice(){
  pice = getField(pickedPice[0], pickedPice[1])
  pice.childNodes[0].classList.add('movePiceTopRight')
}


function movePawn(evt){
  const startRow = evt.target.dataset.row
  const startCol = evt.target.dataset.col
  calcAnimation()
  hideAvailableMoves()
  hidePickedPice()
  console.log(`przesun pionek na pol ${startRow} x ${startCol}`)
}

function makeFieldsTargetable() {                       // adds eventListener to all fields on which pawns could move   
  const patern = /field-pice/                           // reg ex for finding field with pawn on it
  document.querySelectorAll('.available-move')          // select field on which pawn could move
    .forEach( field => {                                // checks which fields have no pawns on them, then adds class and eventListener for them
        if(!patern.test(field.childNodes[0].classList.value)){
          field.classList.add('empty-field')
          field.addEventListener('click', movePawn)
        }
    })
}

function makeFieldsUntargetable() {                     // removes eventListener from all fields to which pawns could move
  document.querySelectorAll('.empty-field')             // all pawns can move only on black fields
    .forEach( field => {
      field.classList.remove('empty-field')
      field.removeEventListener('click', movePawn)
    })
}


function displayResult() {
  const resultText = 'Wygrywają Białe!'
  document.querySelector('.result-box')
    .classList.remove('d-none')
  document.querySelector('.result-text')
  .innerHTML += resultText
}

function hideResult() {
  document.querySelector('.result-box')
    .classList.add('d-none')
}

function piceShakeAdd(){
  const patern1 = /available-move/
  const patern2 = /myPice/
  // document.querySelectorAll('.field-value').forEach(field => {
  //   if((!patern1.test(field.classList.value) && !patern2.test(field.childNodes[0].classList.value))){
  //     field.addEventListener('click', piceOutOfFocus)
  //   }
  // })
  document.querySelectorAll('.board-row').forEach( row => {
    row.childNodes.forEach( field => {
      if((!patern1.test(field.classList.value) && !patern2.test(field.childNodes[0].classList.value))){
        field.addEventListener('click', piceOutOfFocus)
      }
    })
  })
}

function piceShakeRemove(){
  document.querySelectorAll('.board-row').forEach( row => {
    row.childNodes.forEach( field => {
        field.removeEventListener('click', piceOutOfFocus)
    })
  })
}

function piceOutOfFocus(){
  shakePice()
  hideAvailableMoves()
  hidePickedPice()
}

function calcAnimation() {
  const pice = [pickedPice[0], pickedPice[1]]                                       // Backend data

  const moves = [[-200, -200], [200, -200], [200, 200], [-200, 200]]                             // Backend data
  const animationStep = Math.round(100 / (moves.length*2))                          // for calculating frame time in animation
  let translateX = 0
  let translateY = 0
  let currentStep = 0
  const animationTime = Math.round(moves.length*0.6, 2)                    // animation duration time in seconds 

  let animationStyle = `@keyframes movesSequenceAnimation {${currentStep}% { transform: translate(0, 0) }`

  moves.forEach( move => {            // loop for adding next animation steps
    let i = 0 
    while(i < 2){                     // add 2 steps for 1 move
      translateX += move[0]/2
      translateY += move[1]/2
      currentStep += animationStep
      if(currentStep > 100) currentStep = 100     // check if step time is out of scope (0; 100) due to the animationStep rounding
      animationFrame = `${currentStep}% { transform: translate(${translateX}%, ${translateY}%) }`
      animationStyle += animationFrame
      i++
    }
  })

    animationStyle += '}' // closing bracket for animation sequence

  let style = ''
    if(!document.querySelector('#gameBoard style')){
      style = document.createElement('style')
    } 
    else{
      style = document.querySelector('#gameBoard style')
    }

  style.innerHTML = 
  `.movesSequenceAnimation { animation: movesSequenceAnimation ${animationTime}s ease-in-out forwards} ` + animationStyle

  document.querySelector('#gameBoard').appendChild(style)

  field = getField(pickedPice[0], pickedPice[1]).childNodes[0]
  field.classList.add(`movesSequenceAnimation`)
  
  setTimeout(() => {
    document.querySelector('.movesSequenceAnimation').classList.remove('movesSequenceAnimation')
    document.querySelector('#gameBoard style').innerHTML = ''
    }, animationTime*1000 + 100)
  
  //placePices() // execute based on new pices array from backend
}


document.addEventListener("DOMContentLoaded", () => {  
  if(!boardSize) boardSize = 8
  document.querySelector('.change-size-btn').addEventListener('click', changeBoardSize)
  document.querySelector('.next-player-btn').addEventListener('click', nextPlayer)

  //document.querySelector('.next-player-btn').removeEventListener('click', nextPlayer)

  renderBoard()
  setUpPices()
  placePices()

  whoseMove = 0
  whiteMoves()
});



