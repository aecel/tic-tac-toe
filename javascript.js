const newGameBoard = () => {
  let gameBoard = ["11", "21", "31", "12", "22", "32", "13", "23", "33"]

  const displayBoard = () => {
    const cells = document.getElementsByClassName("cell")
    let gameBoardIndex = 0
    for (const cell of cells) {
      const content = getCellByIndex(gameBoardIndex)
      if (content == "x" || content == "o") {
        cell.innerHTML = `<img src="./images/${content}.svg"/>`
      } else {
        cell.innerHTML = ""
      }
      gameBoardIndex++
    }
  }

  const getCellByIndex = (i) => {
    return gameBoard[i]
  }

  const getCell = (x, y) => {
    const index = (y - 1) * 3 + x - 1
    return gameBoard[index]
  }

  const isTheGameOver = () => {
    //Check if there's a 3 in a row

    let whoWonText = ""
    let someoneWon = false

    //Check columns
    for (let x = 1; x <= 3; x++) {
      if (getCell(x, 1) == getCell(x, 2) && getCell(x, 2) == getCell(x, 3)) {
        someoneWon = true
        whoWonText = `${getCell(x, 1).toUpperCase()} won`
        gameOver()
      }
    }

    // Check rows
    for (let y = 1; y <= 3; y++) {
      if (getCell(1, y) == getCell(2, y) && getCell(2, y) == getCell(3, y)) {
        someoneWon = true
        whoWonText = `${getCell(1, y).toUpperCase()} won`
        gameOver()
      }
    }

    // Check diagonals
    if (getCell(1, 1) == getCell(2, 2) && getCell(2, 2) == getCell(3, 3)) {
      someoneWon = true
      whoWonText = `${getCell(1, 1).toUpperCase()} won`
      gameOver()
    }

    if (getCell(1, 3) == getCell(2, 2) && getCell(2, 2) == getCell(3, 1)) {
      someoneWon = true
      whoWonText = `${getCell(1, 3).toUpperCase()} won`
      gameOver()
    }

    //Check if the gameboard is full
    let i = 0
    for (const cell of gameBoard) {
      if (cell == "x" || cell == "o") {
        i++
        if (i == 9 && !someoneWon) {
          whoWonText = "It's a tie"
          gameOver()
        }
      }
    }
    modalContent.innerHTML += whoWonText
  }

  const gameOver = () => {
    modalContent.innerHTML = ""
    modal.style.display = "block"
  }

  const placeSymbol = (symbol, cellIndex) => {
    gameBoard[cellIndex] = symbol
  }

  const resetBoard = () => {
    console.log("RESETTING BOARD")
    gameBoard = ["11", "21", "31", "12", "22", "32", "13", "23", "33"]
    displayBoard()
    symbolToBePlaced = "o"
  }

  return {
    displayBoard,
    getCellByIndex,
    getCell,
    isTheGameOver,
    placeSymbol,
    resetBoard,
  }
}

const newPlayer = () => {}

const newGame = () => {}

const testGameBoard = newGameBoard()

testGameBoard.displayBoard()

const cells = document.getElementsByClassName("cell")

const modal = document.querySelector(".modal")
const modalContent = document.querySelector(".modal-content-text")
const closeModal = document.querySelector(".close")

closeModal.addEventListener("click", () => {
  modal.style.display = "none"
  testGameBoard.resetBoard()
})

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
    testGameBoard.resetBoard()
  }
})

let symbolToBePlaced = "o"
for (const cell of cells) {
  cell.addEventListener("click", () => {
    const index = cell.id
    const existingSymbol = testGameBoard.getCellByIndex(index)

    if (existingSymbol == "x" || existingSymbol == "o") {
      // Don't place symbol
    } else {
      testGameBoard.placeSymbol(symbolToBePlaced, index)

      testGameBoard.displayBoard()
      console.log("YOU PLACED SYMBOL MWAWMA")
      testGameBoard.isTheGameOver()
      if (symbolToBePlaced == "o") {
        symbolToBePlaced = "x"
      } else {
        symbolToBePlaced = "o"
      }
    }
  })
}
