const { green, red } = require('chalk')
const { prompt }  = require('inquirer')
//const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
let words = require('./words.js')

let guessedLetters = []
let guesses = 10


let word = words[Math.floor(Math.random() * words.length)]

//console.log(word)
// console.log(words[Math.floor(Math.random())])
// console.log(words[Math.floor(Math.random() * words.length)])

const renderWord = () =>{
  let win = true
let underscores = ''
for ( let i = 0; i < word.length; i++){
  if (!word[i].match(/^[a-z0-9]+$/i) || guessedLetters.indexOf(word[i].toLowerCase()) !== -1) {
    underscores += word[i]
   } else {
     win = false
    underscores += '_'
   }
 }
 if (win){
  console.log(green(word))
  console.log(green('You won! Congrats!'))
   MainMenu()
 } else {
   console.log(underscores)
   round()
 }
}

const round =() =>{
//console.log(renderWord())
prompt({
type: 'input',
name: 'letter',
message: 'Guess a letter',
validate (guess){
  if (guess.match(/^[a-z0-9]+$/i)){
   if(guess.length===1){
     if(guessedLetters.indexOf(guess)=== -1){
       return true
     } else{
       return 'you already guessed that letter'
     }

     }else{
     return 'must be one character only'
        }
    }else {
    return 'must be a letter or number'
        }
}
})
.then(({ letter })=>{
  //console.log(letter)
  guessedLetters.push(letter.toLowerCase())
  if (word.indexOf(letter.toLowerCase()) !== -1 || word.indexOf(letter.toUpperCase()) !== -1){
    console.log(green('Correct Guess!'))
    renderWord()
  } else{
     guesses--
     console.log(red(`Incorrect Guess! ${guesses} guesses remaining`))
     if(guesses <=0){
       console.log(red(`You Lose! The answer was: ${word}`))
       MainMenu()
     } else{
       renderWord()
     }
  }
 })
.catch(err=>console.log(err))
}

const MainMenu = ()=>{
  prompt({
    type: 'confirm',
    name: 'choice',
    message: 'Would you like to play a again?'
  })
   .then(({choice })=>{
    if (choice){
        word = words[Math.floor(Math.random() * words.length)]
      // let word = words[Math.floor(Math.random() * words.length)]
        guesses = 10
        guessedLetters = []
        renderWord()
    }else{
       process.exit()
    }

   })
   .catch(err => console.log(err))
}

renderWord()