
/* =====================================
   1. QUESTIONS ARRAY
===================================== */

const questions = [

    {
        question: "Which language runs directly in a web browser?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: 1
    },

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Machine Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        answer: 2
    },

    {
        question: "How many sides does a hexagon have?",
        options: ["Five", "Six", "Seven", "Eight"],
        answer: 1
    },

    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "define"],
        answer: 2
    },

    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Bangkok", "Tokyo"],
        answer: 3
    },

    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: 2
    },

    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: 1
    },

    {
        question: "Which company developed JavaScript's original implementation?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: 1
    },

    {
        question: "What does CSS control on a webpage?",
        options: [
            "The page's appearance and layout",
            "The database",
            "The server hardware",
            "The internet connection"
        ],
        answer: 0
    }

];


/* =====================================
   2. QUIZ VARIABLES
===================================== */

let currentIndex = 0;

let score = 0;

// Stores the user's selected answers
let userAnswers = new Array(questions.length).fill(null);


/* =====================================
   3. HTML ELEMENT SELECTION
===================================== */

// Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Buttons
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const restartBtn = document.getElementById("restart-btn");
const themeBtn = document.getElementById("theme-btn");

// Quiz elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");

// Result elements
const finalScore = document.getElementById("final-score");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("result-message");
const reviewContainer = document.getElementById("review-container");

// Best score
const bestScoreDisplay = document.getElementById("best-score");


/* =====================================
   4. START THE QUIZ
===================================== */

function startQuiz() {

    currentIndex = 0;

    score = 0;

    userAnswers = new Array(questions.length).fill(null);

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();

}


/* =====================================
   5. DISPLAY QUESTION
===================================== */

function showQuestion() {

    // Get current question
    const currentQuestion = questions[currentIndex];

    // Display question
    questionText.textContent = currentQuestion.question;

    // Update question counter
    questionCounter.textContent =
        `Question ${currentIndex + 1} of ${questions.length}`;

    // Update score
    scoreDisplay.textContent = `Score: ${score}`;

    // Update progress bar
    const progress = ((currentIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Clear feedback
    feedback.textContent = "";

    // Update navigation buttons
    prevBtn.disabled = currentIndex === 0;

    nextBtn.disabled = userAnswers[currentIndex] === null;

    nextBtn.textContent =
        currentIndex === questions.length - 1
        ? "See Results →"
        : "Next →";


    // Create answer buttons dynamically
    currentQuestion.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.textContent = `${index + 1}. ${option}`;

        button.classList.add("option-btn");

        // Add click event
        button.addEventListener("click", function() {

            checkAnswer(index);

        });

        optionsContainer.appendChild(button);

    });


    // Restore previously selected answer
    if (userAnswers[currentIndex] !== null) {

        showPreviousAnswer();

    }

}


/* =====================================
   6. CHECK ANSWER
===================================== */

function checkAnswer(selectedIndex) {

    // Prevent answering the same question twice
    if (userAnswers[currentIndex] !== null) {
        return;
    }

    const correctIndex = questions[currentIndex].answer;

    const allButtons =
        optionsContainer.querySelectorAll(".option-btn");

    // Store user's answer
    userAnswers[currentIndex] = selectedIndex;

    // Disable all options
    allButtons.forEach(function(button) {

        button.disabled = true;

    });


    // Check if answer is correct
    if (selectedIndex === correctIndex) {

        score++;

        allButtons[selectedIndex].classList.add("correct");

        feedback.textContent = "✓ Correct! Well done!";

        feedback.style.color = "#16a34a";

    } else {

        allButtons[selectedIndex].classList.add("wrong");

        allButtons[correctIndex].classList.add("correct");

        feedback.textContent = "✗ Incorrect! Better luck next time.";

        feedback.style.color = "#dc2626";

    }


    // Update score
    scoreDisplay.textContent = `Score: ${score}`;

    // Enable next button
    nextBtn.disabled = false;

}


/* =====================================
   7. RESTORE PREVIOUS ANSWER
===================================== */

function showPreviousAnswer() {

    const selectedIndex = userAnswers[currentIndex];

    const correctIndex = questions[currentIndex].answer;

    const allButtons =
        optionsContainer.querySelectorAll(".option-btn");

    // Disable buttons
    allButtons.forEach(function(button) {

        button.disabled = true;

    });


    if (selectedIndex === correctIndex) {

        allButtons[selectedIndex].classList.add("correct");

        feedback.textContent = "✓ Correct!";

        feedback.style.color = "#16a34a";

    } else {

        allButtons[selectedIndex].classList.add("wrong");

        allButtons[correctIndex].classList.add("correct");

        feedback.textContent = "✗ Incorrect!";

        feedback.style.color = "#dc2626";

    }

}


/* =====================================
   8. NEXT QUESTION
===================================== */

function nextQuestion() {

    // Do nothing if unanswered
    if (userAnswers[currentIndex] === null) {
        return;
    }

    // If this is the last question, show results
    if (currentIndex === questions.length - 1) {

        showResults();

        return;

    }

    currentIndex++;

    showQuestion();

}


/* =====================================
   9. PREVIOUS QUESTION
===================================== */

function previousQuestion() {

    if (currentIndex > 0) {

        currentIndex--;

        showQuestion();

    }

}


/* =====================================
   10. SHOW RESULTS
===================================== */

function showResults() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    // Calculate percentage
    const totalQuestions = questions.length;

    const resultPercentage =
        Math.round((score / totalQuestions) * 100);

    // Display final score
    finalScore.textContent =
        `${score} / ${totalQuestions}`;

    percentage.textContent =
        `${resultPercentage}%`;

    // Result message
    if (resultPercentage >= 80) {

        resultMessage.textContent =
            "Excellent work! You really know your stuff!";

    } else if (resultPercentage >= 50) {

        resultMessage.textContent =
            "Good job! Keep practising and improving!";

    } else {

        resultMessage.textContent =
            "Keep learning! Practice makes perfect!";

    }


    // Save best score
    const oldBestScore =
        Number(localStorage.getItem("quizBestScore")) || 0;

    if (score > oldBestScore) {

        localStorage.setItem("quizBestScore", score);

    }

    updateBestScore();

    // Display answer review
    showReview();

}


/* =====================================
   11. ANSWER REVIEW
===================================== */

function showReview() {

    reviewContainer.innerHTML = "";

    questions.forEach(function(question, index) {

        const reviewItem = document.createElement("div");

        reviewItem.classList.add("review-item");

        // Question number and text
        const heading = document.createElement("strong");

        heading.textContent =
            `Q${index + 1}. ${question.question}`;

        // User's answer
        const userAnswer = document.createElement("p");

        const selectedIndex = userAnswers[index];

        userAnswer.textContent =
            `Your answer: ${selectedIndex === null
            ? "Not answered"
            : question.options[selectedIndex]}`;

        // Correct answer
        const correctAnswer = document.createElement("p");

        correctAnswer.textContent =
            `Correct answer: ${question.options[question.answer]}`;

        // Correct or incorrect styling
        if (selectedIndex === question.answer) {

            userAnswer.classList.add("review-correct");

            userAnswer.textContent += " ✓";

        } else {

            userAnswer.classList.add("review-wrong");

        }

        // Add elements to review card
        reviewItem.appendChild(heading);

        reviewItem.appendChild(userAnswer);

        reviewItem.appendChild(correctAnswer);

        reviewContainer.appendChild(reviewItem);

    });

}


/* =====================================
   12. RESTART QUIZ
===================================== */

function restartQuiz() {

    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

    updateBestScore();

}


/* =====================================
   13. BEST SCORE
===================================== */

function updateBestScore() {

    const bestScore =
        Number(localStorage.getItem("quizBestScore")) || 0;

    bestScoreDisplay.textContent =
        `Best Score: ${bestScore}/${questions.length}`;

}


/* =====================================
   14. DARK / LIGHT MODE
===================================== */

function updateThemeButton() {

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        themeBtn.textContent = "🌙 Dark Mode";

    }

}


// Load saved theme
const savedTheme = localStorage.getItem("quizTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

updateThemeButton();


// Change theme when clicked
themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    const currentTheme =
        document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("quizTheme", currentTheme);

    updateThemeButton();

});


/* =====================================
   15. KEYBOARD SHORTCUTS
===================================== */

document.addEventListener("keydown", function(event) {

    // Only work during the quiz
    if (quizScreen.classList.contains("hidden")) {
        return;
    }

    // Avoid keyboard shortcuts when already answered
    if (userAnswers[currentIndex] !== null) {

        if (event.key === "Enter") {

            nextQuestion();

        }

        return;

    }

    // Number keys 1, 2, 3, 4 select options
    if (["1", "2", "3", "4"].includes(event.key)) {

        const selectedIndex = Number(event.key) - 1;

        checkAnswer(selectedIndex);

    }

});


/* =====================================
   16. EVENT LISTENERS
===================================== */

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", nextQuestion);

prevBtn.addEventListener("click", previousQuestion);

restartBtn.addEventListener("click", restartQuiz);


/* =====================================
   17. INITIAL SETUP
===================================== */

updateBestScore();

console.log("QuizMaster loaded successfully!");

console.log("Total questions:", questions.length);
