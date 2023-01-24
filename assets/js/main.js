/*
AUX PORTES DE L'AU-DELA

LABELS : #DONTWORK / #UNDONE

 */

// Replay
function replay() {
    score = 0;
    alreadyAsked = [];
    loadIntroHTML()
}

// Enter to Intro
function loadIntroHTML() {
    fetch('intro.html')
        .then(response => response.text())
        .then(text => document.getElementsByTagName('main')[0].innerHTML = text);
}

// Intro to Quizz
function loadQuizzHTML() {
    fetch('quizz.html')
        .then(response => response.text())
        .then(text =>  {
            document.getElementsByTagName('main')[0].innerHTML = text
            newQuestion()
            document.getElementById('logo-block').classList.add('logoHeightReduced');
        })
}

// Quizz
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const askOne = 'To be or not to be ?';
const askTwo = 'As tu déjà mangé une pizza à l\'ananas ?';
const askThree = 'Si tu avais une baguette magique, tu aurais fait quoi pour changer le monde ?';
const askFour = 'Pour toi, la série Game of Thrones c\'est...';
const askFive = 'Allez... rattrape toi, pain au chocolat ou chocolatine ?';
const askS = [askOne, askTwo, askThree, askFour, askFive];
const answersOne = ['That is the question. D\'ailleurs, tant qu\'on est là, t\'aurais, pas la réponse ?', 'Quoi ? J\'parle pas anglais moi en fait...', 'Vis ! Rêve ! Envole-toi !', 'L\'autre réponse'];
const answersTwo = ['Oui, mais juste une fois c\'était dégueulasse', 'Jamais au grand Jamais', 'Toutes les semaines, le gros gros kif', 'J\'étais carpophobe'];
const answersThree = ['Je remplirai ma maison de billets et serai riche pour toujours', 'Je donnerai un toît et de quoi boire et manger à tous', 'Je la donnerai à quelqu\'un d\'autre, trop de responsabilités !', 'Je créerai une équipe de super héros pour anéantir le mal, et resterai dans mon canapé à manger des chips devant le SuperBowl'];
const answersFour = ['Un chef d\'oeuvre, tout simplement', 'C\'est lent on attend 10 ans de voir les dragons grandir', 'C\'était diffusé sur quelle antenne ? Antenne 2 ?', 'LA meilleure série de tous les temps.'];
const answersFive = ['Sérieusement ? encore ce débat inutile ?', 'Pain au chocolat', 'Chocolatine', 'Pain à la chocolatine, pour la paix dans le monde !'];
const answers = [answersOne, answersTwo, answersThree, answersFour, answersFive];
const theirAnswer = ['Bonne réponse... Enfin... je crois...', 'Mauvaise réponse... Enfin... je crois'];
const embold = ['Tu t\'en sors pas trop mal pour l\'instant, les portes du Paradis n\'ont jamais été aussi proches...', 'J\'espère que tu aimes la chaleur et que tu as le goût du danger...'];
let score = 0;
let alreadyAsked = [];

// Questions + answers
function newQuestion() {
    let answerBtns = document.getElementsByClassName('answerBtn')
    for (let i = 0; i<answerBtns.length; i++){
        answerBtns[i].disabled = false
    }
    document.getElementById('nextAside').classList.add('d-none')
    document.getElementById('scoreArticle').classList.add('d-none')
    let randomAsk = -1
    do {
        randomAsk = randomNumber(0, 4)
    } while ( alreadyAsked.indexOf(randomAsk) !== -1)
    alreadyAsked.push(randomAsk)
    document.getElementById('question').innerHTML = askS[randomAsk]
    document.getElementById('answerOne').innerHTML = answers[randomAsk][0]
    document.getElementById('answerTwo').innerHTML = answers[randomAsk][1]
    document.getElementById('answerThree').innerHTML = answers[randomAsk][2]
    document.getElementById('answerFour').innerHTML = answers[randomAsk][3]
}

// Score
function questionAnswered(answer) {
    let answerBtns = document.getElementsByClassName('answerBtn')
    for (let i = 0; i<answerBtns.length; i++){
        answerBtns[i].disabled = "disabled"
    }
    document.getElementById('nextAside').classList.remove('d-none')
    document.getElementById('scoreArticle').classList.remove('d-none')
    let randomTrue = randomNumber(1, 4);
    if (answer === randomTrue) {
        document.getElementById('yourAnswer').innerHTML = theirAnswer[0]
        score = score +1
        document.getElementById('yourScore').innerHTML = score
    } else {
        document.getElementById('yourAnswer').innerHTML = theirAnswer[1]
        score = score -1
        document.getElementById('yourScore').innerHTML = score
    }
    if (score > 0) {
        document.getElementById('embold').innerHTML = embold[0]
    } else if (score <=0) {
        document.getElementById('embold').innerHTML = embold[1]
    }
    if (alreadyAsked.length === askS.length) {
        document.getElementById('nextAside').classList.add('d-none')
        document.getElementById('endAside').classList.remove('d-none')
    }
}

// Quizz to Ending
function endingHell() {
    let img = document.getElementById('endingImg')
    img.src = 'assets/img/Aux-Portes-De-l-Au-Dela_hell.png';
}
function endingParadise() {
    let img = document.getElementById('endingImg')
    img.src = 'assets/img/Aux-Portes-De-l-Au-Dela_paradise.png';
}

function loadEndingHTML() {
    fetch('ending.html')
        .then(response => response.text())
        .then(text =>  {
            document.getElementById('logo-block').classList.remove('logoHeightReduced');
            document.getElementsByTagName('main')[0].innerHTML = text
            if ( score >= -3) {
                document.getElementById('endingImg')
                endingParadise()
            } else if ( score < -3 ) {
                document.getElementById('endingImg')
                endingHell()
                document.getElementById('endingArticle').classList.add('redHell');
            }
        })
}