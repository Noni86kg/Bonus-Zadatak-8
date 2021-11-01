const paperScissorsRockBtn = document.querySelectorAll('main article')
const main = document.querySelector('main')
const picked = document.querySelector('.picked')
const leftSide = document.querySelector('.left-side-article-div')
const center = document.querySelector('.center')
const textWinLosse = document.querySelector('.text-win-losse')
const rightSideArticle = document.querySelector('.right-side-article-div')
const leftCirclesWin = document.querySelectorAll('.left-circles')
const rightCirclesWin = document.querySelectorAll('.right-circles')
const restartBtn = document.querySelector('button')
const scoreText = document.querySelector('.score-num')
const rulesBtn = document.querySelector('.rules')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal-close-btn-div')
const modalCloseBtnMob = document.querySelector('.modal-close-btn-bottom')
let score = 0;

// console.log(leftSide)
// roles
rulesBtn.addEventListener('click', (e) => {
    overlay.classList.remove('hidden')
    modal.classList.remove('hidden')
})

// close
function closeModal() {
    overlay.classList.add('hidden')
    modal.classList.add('hidden')
}
modalCloseBtn.addEventListener('click', closeModal)
modalCloseBtnMob.addEventListener('click', closeModal)

document.addEventListener('keydown', function(e) {
    if  (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeModal()
    }
})
overlay.addEventListener('click', function(e) {
    if(e.target === overlay) {
        closeModal()
    }
})
//restart game
restartBtn.addEventListener('click', () => {
    main.style.display = 'grid'
    picked.style.display = 'none'
    center.style.display = 'none'
    rightSideArticle.style.display = 'none'
    leftCirclesWin.forEach((leftCircleWin) => {
        leftCircleWin.classList.remove('winner')
    })
    rightCirclesWin.forEach((rightCircleWin) => {
        rightCircleWin.classList.remove('winner')
    })

})

// Paper Scissors Rock functionality
paperScissorsRockBtn.forEach((psrBtn)=> {
    psrBtn.addEventListener('click', (e) => {
        const cliced = e.target.closest('article')
        let dataValue = cliced.getAttribute('data-id')
        let pc = Math.floor(Math.random() * 3)
        leftSide.innerHTML = `
            <article class="${dataValue}">
            <div class="white-bg">
            <img src="images/icon-${dataValue}.svg" alt="${dataValue}">
            </div>
            </article>
        `
        let pcChoose;
        if (pc===0) {
            pcChoose = 'paper'
        } else if (pc===1) {
            pcChoose = 'scissors'
        } else if (pc===2) {
            pcChoose = 'rock'
        }
        main.style.display = 'none'
        picked.style.display = 'grid'
        function pickedFunk() {
            center.style.display = 'flex'
            rightSideArticle.innerHTML = `
                <article class="${pcChoose}">
                <div class="white-bg">
                <img src="images/icon-${pcChoose}.svg" alt="${pcChoose}">
                </div>
                </article>
                `
                rightSideArticle.style.display = 'block'
            }

        if ((dataValue==="paper"&&pcChoose==='rock') || (dataValue==="scissors"&&pcChoose==='paper') || (dataValue==="rock"&&pcChoose==='scissors') ) {
            setTimeout(function() {
                pickedFunk()
                textWinLosse.innerText = 'YOU WIN'
                score++
                scoreText.innerHTML = `<p>${score}</p>`
                leftCirclesWin.forEach((leftCircleWin) => {
                    leftCircleWin.classList.add('winner')
                })
            }, 1500)
        } else if (dataValue===pcChoose) {
            setTimeout(function() {
                pickedFunk()
                textWinLosse.innerText = 'DRAW'
            }, 1500)
        } else {

            setTimeout(function() {
                pickedFunk()
                textWinLosse.innerText = 'YOU LOSE'
                score--
                scoreText.innerHTML = `<p>${score}</p>`
                rightCirclesWin.forEach((rightCircleWin) => {
                    rightCircleWin.classList.add('winner')
                })
            }, 1500)
        }
    })
})