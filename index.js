const leftEyeX = 190;
const leftEyeY = 45;
const rightEyeX = 210;
const rightEyeY = 45;
const bodySideEnum = {
    'right': 0,
    'left': 1
};
let wordToGuess = '';
let lettersGuessed = '';
let missedGuesses = 0;
let playingGame = false;
let wordBank = [];

document.addEventListener('DOMContentLoaded', e => {
    drawGallows();
    document.getElementById('lblMessage').innerText = 'Press the New Game button to play HangMan!';
    hydrateWordBank();
});

const startNewGame = () => {
    clearDrawing();
    drawGallows();
    missedGuesses = 0;
    wordToGuess = getWordToGuess().toUpperCase();
    lettersGuessed = '';
    drawLetterPlaces();
    document.getElementById('lblMessage').innerText = 'Click the letters to guess the word!';
    playingGame = true;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < alphabet.length; i++) {
        document.getElementById(`btn${alphabet[i]}`).disabled = false;
    }
};

const letterClick = (letter) => {
    if (playingGame && !lettersGuessed.includes(letter)) {
        console.log(letter);
        lettersGuessed += letter;
        document.getElementById(`btn${letter}`).disabled = true;
        if (wordToGuess.includes(letter)) {
            for (let i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess[i] === letter) {
                    document.getElementById(`hm-placeholder${i}`).value = letter;
                }
            }
            const hasWon = haveTheyWon();
            if (hasWon) {
                document.getElementById('lblMessage').innerText = 'Congrats, you\'ve won! Press the New Game button to play again!';
                playingGame = false;
                drawHead();
                drawFace(true);
            }
        }
        else {
            missedGuesses++;
            drawMissedGuess();
        }
    }
};

const haveTheyWon = () => {
    for (let i = 0; i < wordToGuess.length; i++) {
        const letter = document.getElementById(`hm-placeholder${i}`).value;
        if (letter !== wordToGuess[i]) {
            return false;
        }
    }
    return true;
};

const drawMissedGuess = () => {
    if (missedGuesses === 1) {
        drawHead();
    } else if (missedGuesses === 2) {
        drawBody();
    } else if (missedGuesses === 3) {
        drawArm(bodySideEnum.left);
    } else if (missedGuesses === 4) {
        drawArm(bodySideEnum.right);
    } else if (missedGuesses === 5) {
        drawLeg(bodySideEnum.left);
    } else if (missedGuesses === 6) {
        drawLeg(bodySideEnum.right);
    } else if (missedGuesses === 7) {
        drawFace(false);
        playingGame = false;
        revealWord();
        document.getElementById('lblMessage').innerText = 'You lost. Game Over. Press the New Game button to play again!';
    }
};

const revealWord = () => {
    for (let i = 0; i < wordToGuess.length; i++) {
        document.getElementById(`hm-placeholder${i}`).value = wordToGuess[i];
    }
};

const drawLetterPlaces = () => {
    const wordDiv = document.getElementById('hm-word');
    wordDiv.innerHTML = '';
    const wordLength = wordToGuess.length;
    for(let i = 0; i < wordLength; i++) {
        const placeHolder = document.createElement('input');
        placeHolder.id = `hm-placeholder${i}`;
        placeHolder.className = 'hm-letter-placeholder';
        placeHolder.readOnly = true;
        wordDiv.appendChild(placeHolder);
    }
};

const getWordToGuess = () =>  {
    const wordIndex = randomInterval(0, wordBank.length - 1);
    return wordBank[wordIndex];
    // return 'chambawamba'; //todo return a random selection from a word list
};

const randomInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const hydrateWordBank = () => {
    wordBank = [
        'abruptly', 'absurd', 'abyss', 'affix', 'askew', 'avenue', 'awkward', 'axiom', 'azure', 'bagpipes', 'bandwagon', 'banjo', 'bayou', 'beekeeper', 'bikini', 
        'blitz', 'blizzard', 'boggle', 'bookworm', 'boxcar', 'boxful', 'buckaroo', 'buffalo', 'buffoon', 'buxom', 'buzzard', 'buzzing', 'buzzwords', 'caliph', 'cobweb', 
        'cockiness', 'croquet', 'crypt', 'curacao', 'cycle', 'daiquiri', 'dirndl', 'disavow', 'dizzying', 'duplex', 'dwarves', 'embezzle', 'equip', 'espionage', 'euouae', 
        'exodus', 'faking', 'fishhook', 'fixable', 'fjord', 'flapjack', 'flopping', 'fluffiness', 'flyby', 'foxglove', 'frazzled', 'frizzled', 'fuchsia', 'funny', 'gabby', 
        'galaxy', 'galvanize', 'gazebo', 'giaour', 'gizmo', 'glowworm', 'glyph', 'gnarly', 'gnostic', 'gossip', 'grogginess', 'haiku', 'haphazard', 'hyphen', 'iatrogenic', 
        'icebox', 'injury', 'ivory', 'ivy', 'jackpot', 'jaundice', 'jawbreaker', 'jaywalk', 'jazziest', 'jazzy', 'jelly', 'jigsaw', 'jinx', 'jiujitsu', 'jockey', 'jogging', 
        'joking', 'jovial', 'joyful', 'juicy', 'jukebox', 'jumbo', 'kayak', 'kazoo', 'keyhole', 'khaki', 'kilobyte', 'kiosk', 'kitsch', 'kiwifruit', 'klutz', 'knapsack', 
        'larynx', 'lengths', 'lucky', 'luxury', 'lymph', 'marquis', 'matrix', 'megahertz', 'microwave', 'mnemonic', 'mystify', 'naphtha', 'nightclub', 'nowadays', 'numbskull', 
        'nymph', 'onyx', 'ovary', 'oxidize', 'oxygen', 'pajama', 'peekaboo', 'phlegm', 'pixel', 'pizazz', 'pneumonia', 'polka', 'pshaw', 'psyche', 'puppy', 'puzzling', 'quartz', 
        'queue', 'quips', 'quixotic', 'quiz', 'quizzes', 'quorum', 'razzmatazz', 'rhubarb', 'rhythm', 'rickshaw', 'schnapps', 'scratch', 'shiv', 'snazzy', 'sphinx', 'spritz', 
        'squawk', 'staff', 'strength', 'strengths', 'stretch', 'stronghold', 'stymied', 'subway', 'swivel', 'syndrome', 'thriftless', 'thumbscrew', 'topaz', 'transcript', 
        'transgress', 'transplant', 'triphthong', 'twelfth', 'twelfths', 'unknown', 'unworthy', 'unzip', 'uptown', 'vaporize', 'vixen', 'vodka', 'voodoo', 'vortex', 'voyeurism', 
        'walkway', 'waltz', 'wave', 'wavy', 'waxy', 'wellspring', 'wheezy', 'whiskey', 'whizzing', 'whomever', 'wimpy', 'witchcraft', 'wizard', 'woozy', 'wristwatch', 'wyvern', 
        'xylophone', 'yachtsman', 'yippee', 'yoked', 'youthful', 'yummy', 'zephyr', 'zigzag', 'zigzagging', 'zilch', 'zipper', 'zodiac', 'zombie'
    ];
};

const clearDrawing = () => {
    const canvas = document.getElementById('hm-canvas-man');
    if (canvas.getContext('2d')) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

const drawHead = () => {
    const canvas = document.getElementById('hm-canvas-man');
    if (canvas.getContext('2d')) {
        const context = canvas.getContext('2d');
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.arc(200, 50, 30, 0, Math.PI * 2, true);
        context.stroke();
    }
};

const drawFace = (isHappy) => {
    const canvas = document.getElementById('hm-canvas-man');
    if (canvas.getContext('2d')) {
        const context = canvas.getContext('2d');

        if (isHappy) {
            // Draw semicircle for smile
            context.beginPath();
            context.strokeStyle = 'black';
            context.lineWidth = 3;
            context.arc(200, 50, 20, 0, Math.PI, false);
            context.stroke();

            // Draw eyes
            context.beginPath();
            context.fillStyle = "green"; // color
            context.arc(190, 45, 3, 0, Math.PI * 2, true); // draw left eye
            context.fill();
            context.arc(210, 45, 3, 0, Math.PI * 2, true); // draw right eye
            context.fill();
        } else {
            // Draw semicircle for frown
            context.beginPath();
            context.strokeStyle = 'black';
            context.lineWidth = 3;
            context.arc(200, 70, 10, 0, Math.PI, true);
            context.stroke();

            // Draw eyes
            // Left eye
            context.beginPath();
            context.strokeStyle = 'red';
            context.moveTo(leftEyeX, leftEyeY);
            context.lineTo(leftEyeX + 5, leftEyeY + 5);
            context.moveTo(leftEyeX, leftEyeY);
            context.lineTo(leftEyeX + 5, leftEyeY - 5);
            context.moveTo(leftEyeX, leftEyeY);
            context.lineTo(leftEyeX - 5, leftEyeY + 5);
            context.moveTo(leftEyeX, leftEyeY);
            context.lineTo(leftEyeX - 5, leftEyeY - 5);
            context.stroke();

            // Right eye
            context.beginPath();
            context.strokeStyle = 'red';
            context.moveTo(rightEyeX, rightEyeY);
            context.lineTo(rightEyeX + 5, rightEyeY + 5);
            context.moveTo(rightEyeX, rightEyeY);
            context.lineTo(rightEyeX + 5, rightEyeY - 5);
            context.moveTo(rightEyeX, rightEyeY);
            context.lineTo(rightEyeX - 5, rightEyeY + 5);
            context.moveTo(rightEyeX, rightEyeY);
            context.lineTo(rightEyeX - 5, rightEyeY - 5);
            context.stroke();
        }
    }
};

const drawBody = () => {
    const canvas = document.getElementById('hm-canvas-man');
    if (canvas.getContext('2d')) {
        const context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(200, 80);
        context.lineTo(200, 200);
        context.strokeStyle = 'black';
        context.stroke();   
    }
};

const drawArm = (bodySide) => {
    const canvas = document.getElementById('hm-canvas-man');
    if (canvas.getContext('2d')) {
        const context = canvas.getContext('2d');
        // arms
        context.beginPath();
        context.strokeStyle = 'black';

        if (bodySide === bodySideEnum.left) {
            context.moveTo(200, 90);
            context.lineTo(150, 130);
        } else if (bodySide === bodySideEnum.right) {
            context.moveTo(200, 90);
            context.lineTo(250, 130);
        }
        context.stroke();
    }
};

const drawLeg = (bodySide) => {
    const canvas = document.getElementById('hm-canvas-man');
    if (canvas.getContext('2d')) {
        const context = canvas.getContext('2d');
        // legs
        context.beginPath();
        context.strokeStyle = 'black';

        if (bodySide === bodySideEnum.left) {
            context.moveTo(200, 200);
            context.lineTo(150, 280);
        } else if (bodySide === bodySideEnum.right) {
            context.moveTo(200, 200);
            context.lineTo(250, 280);
        }
        context.stroke();
    }
};

const drawGallows = () => {
    const canvas = document.getElementById('hm-canvas-man');
    if (canvas.getContext('2d')) {
        const context = canvas.getContext('2d');
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        // vertical line
        context.moveTo(35, 10);
        context.lineTo(35, 300);
        
        // top horizontal line
        context.moveTo(33.5, 10);
        context.lineTo(200, 10);

        // connector line
        context.moveTo(198.5, 10);
        context.lineTo(198.5, 20);

        // bottom horizontal line
        context.moveTo(2, 298);
        context.lineTo(80, 298);

        context.stroke();
    }
};
