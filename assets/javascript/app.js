var questionBank = [
    question0 = {
        question: "Who was the first man in Space?",
        answer: [
            one = "Yuri Gagarin",
            two = "Neil Armstrong",
            three = "Alan Shepard",
            four = "Virgil Grissom",
        ],
    },
    question1 = {
        question: "What was the first animated feature-length movie?",
        answer: [
            one = "Snow White and the Seven Dwarfs",
            two = "Gulliver's Travels",
            three = "The Apostle",
            four = "The Adventures of Pinocchio",
        ],
    },
    question2 = {
        question: "In what year was the first microprocessor created?",
        answer: [
            one = "1971",
            two = "1967",
            three = "1969",
            four = "1973",
        ],
    },
    question3 = {
        question: "What rank is an E-7 in the United States Navy?",
        answer: [
            one = "Chief",
            two = "Senior Chief",
            three = "Petty Officer First Class",
            four = "Petty Officer Third Class",
        ],
    },
    question4 = {
        question: "What was the yield of the first atomic bomb?",
        answer: [
            one = "21 kilotons",
            two = "2.1 kilotons",
            three = "2.1 megatons",
            four = "35 megatons",
        ],
    },
    question5 = {
        question: "Who led the American Colonists in the battle for Fort Tichondergoa?",
        answer: [
            one = "Ethan Allen",
            two = "George Washington",
            three = "Benedict Arnold",
            four = "Alexander Hamilton",
        ],
    },
    question6 = {
        question: "What is the most widely eaten fish in the world?",
        answer: [
            one = "Herring",
            two = "Salmon",
            three = "Tuna",
            four = "Cod",
        ],
    },
    question7 = {
        question: "What number does “giga” stand for?",
        answer: [
            one = "One Billion",
            two = "One Million",
            three = "100,000",
            four = "5",
        ],
    },
    question8 = {
        question: "What is the Symbol of iron on the Periodic Table of Elements?",
        answer: [
            one = "Fe",
            two = "Ir",
            three = "Fr",
            four = "Re",
        ],
    },
    question9 = {
        question: "Which animal has the largest eye balls?",
        answer: [
            one = "Squid",
            two = "Whale",
            three = "Elephant",
            four = "Hippo",
        ],
    },
];
var outOfTime = false;
var time = 45;
var j = [0, 1, 2, 3];
var correctGuess = 0;
var wrongGuess = 0;
var scorePercent = 0;
function startScreen() {

    var start = $('<div>');
    start.addClass('title');

    var gameTitle = $('<h1>');
    gameTitle.addClass('mainTitle');
    gameTitle.text("Trivia Game");
    start.append(gameTitle);

    var rule = $('<p>');
    rule.attr('id', 'rule');
    rule.text('Select all the right answers before time runs out!');
    start.append(rule);

    var button = $("<button>");
    button.attr('id', "startButton");
    button.text('START');
    start.append(button);

    $('#wrapper').append(start);

};
function scoreScreen() {
    $('#timer').text("");
    $('#wrapper').empty();
    $('#wrapper').removeClass('bisque');
    var scoreCard = $('<div>');
    scoreCard.attr('class', 'title')


    var scoreText = $('<h2>');
    if (outOfTime) {
        scoreText.text("You ran out of time! Here is your score:");
    }
    else {
        scoreText.text("You finished in " + (45 - time) + " seconds! Here is your score:");
    }
    var scoreValue = $('<h1>');
    var scorePC = $('<h1>');
    scorePC.text(scorePercent + "%");
    scoreValue.text(correctGuess + "/" + questionBank.length);
    scoreText.append(scorePC);
    scoreText.append(scoreValue);
    scoreCard.append(scoreText);
    $('#wrapper').append(scoreCard);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function score() {
    // 
    var scoring = $('#wrapper').find('input:checked');
    for (var i = 0; i < scoring.length; i++) {
        console.log(scoring[i].value);

        if (scoring[i].value == "correct") {
            correctGuess++;
        }

        else if (scoring[i].value == "false") {
            wrongGuess++;
        }

        scorePercent = (correctGuess / questionBank.length) * 100;

        // if ()
        // $('#wrapper');
    }
}

function game() {
    $('#wrapper').empty();
    $('#wrapper').addClass('bisque');


    var questionDiv = $('<div>');
    questionDiv.addClass('questions');
    // questionDiv.addClass('clearfix');


    for (var i = 0; i < questionBank.length; i++) {
        shuffle(j);

        var questionText = $('<h2>');
        questionText.addClass('qText');
        questionText.addClass('clearfix');
        questionText.text(questionBank[i].question);
        questionDiv.append(questionText);



        for (var x = 0; x < j.length; x++) {
            if (j[x] == 0) {
                var questionAnswer = $('<input>');
                var answerLabel = $('<label>');
                questionAnswer.attr('type', "checkbox");
                questionAnswer.attr('value', "correct");
                questionAnswer.attr('name', "question" + i);
                answerLabel.addClass('clearfix');
                answerLabel.html(questionBank[i].answer[(j[x])]);
                answerLabel.append(questionAnswer);
                questionDiv.append(answerLabel)
                console.log("answers: " + questionBank[i].answer[(j[x])])
            }
            else {
                var questionAnswer = $('<input>');
                var answerLabel = $('<label>');
                questionAnswer.attr('type', "checkbox");
                questionAnswer.attr('value', "false");
                questionAnswer.attr('name', "question" + i);
                answerLabel.addClass('clearfix');
                answerLabel.html(questionBank[i].answer[(j[x])]);
                answerLabel.append(questionAnswer);
                questionDiv.append(answerLabel)
            }
        }
    }
    var submit = $('<button>');
    submit.attr('id', "submit");
    submit.text("Submit");
    questionDiv.append(submit);
    $('#wrapper').append(questionDiv);
}

$('#wrapper').on("click", '#submit', function () {
    window.clearInterval(timer);
    setTimeout(score, 50);
    setTimeout(scoreScreen, 80);
});
var timer;
$('#wrapper').on("click", '#startButton', function () {
    game();

    var timeBox = $('<h1>');
    timeBox.attr('id', "timerText");
    $('#timer').append(timeBox);

    timer = setInterval(gameTimer, 1000);


    function gameTimer() {
        $('#timerText').text(time);

        if (time !== 0) {
            console.log(time);


            time--
        }
        else if (time == 0) {
            outOfTime = true;
            setTimeout(score, 50);
            setTimeout(scoreScreen, 80);
            window.clearInterval(timer);
            $('#timerText').text(time);

        }
    }
});
startScreen();
$("#wrapper").on('click', "input:checkbox", function () {

    var $box = $(this);

    if ($box.is(":checked")) {

        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        $(group).prop("checked", false);
        $box.prop("checked", true);

    } else {
        $box.prop("checked", false);
    }
});
// game();
console.log(questionBank[1].question);
console.log(questionBank[1].answer[0]);