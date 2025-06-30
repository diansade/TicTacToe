const boxes = document.querySelectorAll('.box');
const gameDiv = document.getElementById('game');
const winner = document.querySelector('#result-text');
const resetBtn = document.querySelector('#resetBtn');
const overlayText = document.querySelector('#overlay')
let currPlayer = 1, count =0, flag=0;
const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
 function disableBoard() {
      boxes.forEach(box => box.removeEventListener('click', handleClick));
    }
function handleClick(e) {
     if(e.target.innerText)
        return;
        if( currPlayer === 1){
            e.target.innerText = '△';
            currPlayer = 2;
            e.target.style.color = '#00ff88';
            e.target.style.fontWeight = 'bold';
        }else{
            e.target.innerText = '⭕';
            currPlayer = 1 ;
        }
    checkWinner();
}
const checkWinner = () => {
    for ( let combo of winningCombos) {
        let combo1 = boxes[combo[0]].innerText;
        let combo2 = boxes[combo[1]].innerText;
        let combo3 = boxes[combo[2]].innerText;
    if(combo1 != '' && combo2 != '' && combo3 != ''){
        if(combo1 === combo2 && combo2 === combo3 ){
           highlightWin(combo);
           disableBoard();
           overlay();
           flag=1;

        }
    }
    }
    count=0;
    boxes.forEach((box) => {
      if(box.innerText){
        count++;
    }
    });
    if(count == 9 && flag == 0){
        currPlayer=0;
        overlay();
    }
}
const overlay = () => {
    gameDiv.classList.add('blurred');
    if(currPlayer === 1)
         winner.innerHTML = `${'⭕'} Wins!`;
    else if(currPlayer === 2)
       winner.innerHTML = `${'△'} wins!`;
    else
       winner.innerHTML = `It's a draw!!`
    overlayText.style.display = "flex";
}


function highlightWin(combo) {
      combo.forEach(i => {
        if(boxes[i].innerText === '⭕')
        boxes[i].style.backgroundColor = '#00ff88';
        else
        boxes[i].style.backgroundColor = '#ff0055';
      });
    }
    boxes.forEach((box)=> {
    box.addEventListener('click', handleClick);
})
function startNewGame() {
      currPlayer = 1;
      flag = 0;
      overlayText.style.display = 'none';
      gameDiv.classList.remove('blurred');
      boxes.forEach(box => {
        box.textContent = '';
        box.style.color = 'white';
        box.style.fontWeight = 'normal';
        box.style.backgroundColor = '#222';
        box.addEventListener('click', handleClick);
      });
    }

