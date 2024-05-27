const p1 = {
    name: 'PLAYER ONE',
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
};

const p2 = {
    name: 'PLAYER TWO',
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
};

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playTo');
let winningScore = parseInt(winningScoreSelect.value);
let isGameOver = false;
let outcome = document.createElement('p');
outcome.classList.add('subtitle');
document.querySelector('div.content').prepend(outcome);

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score++;
        player.display.textContent = player.score;
        outcome.textContent = '';
        if (player.score === winningScore - 1) {
            if (opponent.score === winningScore - 1) {
                outcome.textContent = 'DEUCE!';
                winningScore += 1;
            }
        }
        if (player.score === winningScore) {
            outcome.textContent = `${player.name} WON!!!`;
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
    }
};

p1.button.addEventListener('click', function () {
    updateScores(p1, p2);
});

p2.button.addEventListener('click', function () {
    updateScores(p2, p1);
});

resetButton.addEventListener('click', reset);

winningScoreSelect.addEventListener('change', reset);

function reset() {
    isGameOver = false;
    winningScore = parseInt(winningScoreSelect.value);
    outcome.textContent = '';
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
};