const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");


const playerNameInput = document.getElementById("player-name");

const zhannaButton = document.getElementById("zhanna-button");
const pavelButton = document.getElementById("pavel-button");


const playerDisplay = document.getElementById("player-display");
const quizTitle = document.getElementById("quiz-title");
const scoreDisplay = document.getElementById("score-display");


const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");


const nextButton = document.getElementById("next-button");


const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");


const zhannaLeaderboard = document.getElementById("zhanna-leaderboard");
const pavelLeaderboard = document.getElementById("pavel-leaderboard");


const restartButton = document.getElementById("restart-button");



let currentQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let playerName = "";

let selectedQuiz = "";





function show(element) {
    element.classList.remove("hidden");
}



function hide(element) {
    element.classList.add("hidden");
}






function startQuiz() {


    playerName = playerNameInput.value.trim();



    if (playerName === "") {

        alert("Введите имя игрока!");

        return;

    }



    currentQuestionIndex = 0;

    score = 0;


    scoreDisplay.textContent = score;

    playerDisplay.textContent = playerName;



    hide(introScreen);

    hide(resultScreen);

    show(quizScreen);



    nextButton.disabled = true;



    renderQuestion();

}








function renderQuestion() {



    const question = currentQuestions[currentQuestionIndex];



    questionNumber.textContent =
        `Вопрос ${currentQuestionIndex + 1} из ${currentQuestions.length}`;



    questionText.textContent = question.text;



    answersContainer.innerHTML = "";




    question.answers.forEach((answer, index) => {



        const button = document.createElement("button");



        button.className = "answer-button";

        button.textContent = answer;




        button.addEventListener("click", () => {

            checkAnswer(index);

        });




        answersContainer.appendChild(button);



    });


}









function checkAnswer(selectedIndex) {



    const question = currentQuestions[currentQuestionIndex];



    const buttons =
        document.querySelectorAll(".answer-button");





    buttons.forEach((button, index) => {



        button.disabled = true;



        if (index === question.correctIndex) {

            button.classList.add("correct");

        }



        if (
            index === selectedIndex &&
            index !== question.correctIndex
        ) {

            button.classList.add("wrong");

        }



    });





    if (selectedIndex === question.correctIndex) {


        score++;


        scoreDisplay.textContent = score;


    }




    nextButton.disabled = false;


}









function nextQuestion() {



    currentQuestionIndex++;




    if (currentQuestionIndex < currentQuestions.length) {


        nextButton.disabled = true;


        renderQuestion();


    } else {


        finishQuiz();


    }


}









function finishQuiz() {



    hide(quizScreen);


    show(resultScreen);




    finalScore.textContent =
        `${score} / 10`;





    if (score === 10) {


        resultMessage.textContent =
            "🎉 Идеально! Вы знаете именинника лучше всех!";


    } 
    else if (score >= 7) {


        resultMessage.textContent =
            "👏 Отличный результат!";


    } 
    else {


        resultMessage.textContent =
            "😊 Хорошая попытка!";


    }




    saveScore();


    showLeaderboard();


}









function saveScore() {



    let scores =
        JSON.parse(
            localStorage.getItem("birthdayQuizLeaderboard")
        ) || [];





    scores.push({

        name: playerName,

        quiz: selectedQuiz,

        score: score,

        date: Date.now()

    });







    scores.sort((a,b)=>{


        if (b.score === a.score) {

            return a.date - b.date;

        }


        return b.score - a.score;


    });






    localStorage.setItem(
        "birthdayQuizLeaderboard",
        JSON.stringify(scores)
    );


}









function showLeaderboard() {



    zhannaLeaderboard.innerHTML = "";

    pavelLeaderboard.innerHTML = "";




    const scores =
        JSON.parse(
            localStorage.getItem("birthdayQuizLeaderboard")
        ) || [];





    const zhannaScores =
        scores.filter(
            player => player.quiz === "Жанна"
        );





    const pavelScores =
        scores.filter(
            player => player.quiz === "Павел"
        );







    zhannaScores
        .slice(0,10)
        .forEach((player,index)=>{


            const li = document.createElement("li");


            li.innerHTML =
                `<strong>${index+1}.</strong>
                ${player.name} — ${player.score}/10`;



            zhannaLeaderboard.appendChild(li);


        });







    pavelScores
        .slice(0,10)
        .forEach((player,index)=>{


            const li = document.createElement("li");


            li.innerHTML =
                `<strong>${index+1}.</strong>
                ${player.name} — ${player.score}/10`;



            pavelLeaderboard.appendChild(li);


        });



}









function restartQuiz() {


    playerNameInput.value = "";


    hide(resultScreen);


    hide(quizScreen);


    show(introScreen);


}








zhannaButton.addEventListener("click",()=>{


    selectedQuiz = "Жанна";


    currentQuestions = questionsZhanna;


    quizTitle.textContent = "Жанна";


    startQuiz();


});








pavelButton.addEventListener("click",()=>{


    selectedQuiz = "Павел";


    currentQuestions = questionsPavel;


    quizTitle.textContent = "Павел";


    startQuiz();


});







nextButton.addEventListener(
    "click",
    nextQuestion
);




restartButton.addEventListener(
    "click",
    restartQuiz
);






window.onload = () => {

    showLeaderboard();

};
