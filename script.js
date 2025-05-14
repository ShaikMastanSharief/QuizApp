// quiz.js

const questions = [
  {
    category: "Geography",
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1
  },
  {
    category: "Science",
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: 0
  },
  {
    category: "Technology",
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperloop Machine Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: 0
  }
];

let filteredQuestions = [];
let currentQuestionIndex = 0;
let userScore = 0;
let timer;
let timeLeft = 30;
let userAnswers = [];

const startScreen = document.getElementById("startScreen");
const quizContainer = document.getElementById("quizContainer");
const reviewContainer = document.getElementById("reviewContainer");
const questionText = document.getElementById("questionText");
const choiceButtons = document.getElementsByClassName("choiceButton");
const feedbackText = document.getElementById("feedbackText");
const questionNumber = document.getElementById("questionNumber");
const totalQuestions = document.getElementById("totalQuestions");
const categorySelect = document.getElementById("categorySelect");
const timerDisplay = document.getElementById("timer");
const soundCorrect = document.getElementById("soundCorrect");
const soundWrong = document.getElementById("soundWrong");
const soundClick = document.getElementById("soundClick");
const reviewList = document.getElementById("reviewList");
const highScore = document.getElementById("highScore");

function beginQuiz() {
  const selectedCategory = categorySelect.value;
  filteredQuestions = selectedCategory === "All"
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  if (filteredQuestions.length === 0) {
    alert("No questions found for this category.");
    return;
  }

  currentQuestionIndex = 0;
  userScore = 0;
  userAnswers = [];
  startScreen.style.display = "none";
  reviewContainer.style.display = "none";
  quizContainer.style.display = "block";

  totalQuestions.textContent = filteredQuestions.length;
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetTimer();
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  questionNumber.textContent = currentQuestionIndex + 1;
  feedbackText.textContent = "";

  Array.from(choiceButtons).forEach((btn, i) => {
    btn.style.display = "block";
    btn.textContent = currentQuestion.choices[i];
    btn.onclick = () => checkAnswer(i);
  });
}

function checkAnswer(choiceIndex) {
  soundClick.play();
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const isCorrect = choiceIndex === currentQuestion.correctAnswer;
  if (isCorrect) {
    userScore++;
    feedbackText.textContent = "✅ Correct!";
    soundCorrect.play();
  } else {
    feedbackText.textContent = "❌ Wrong!";
    soundWrong.play();
  }

  userAnswers.push({
    question: currentQuestion.question,
    selected: currentQuestion.choices[choiceIndex],
    correct: currentQuestion.choices[currentQuestion.correctAnswer]
  });

  clearInterval(timer);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < filteredQuestions.length) {
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizContainer.style.display = "none";
  reviewContainer.style.display = "block";
  highScore.textContent = `You scored ${userScore} out of ${filteredQuestions.length}`;

  reviewList.innerHTML = userAnswers
    .map(ans => `<li><strong>Q:</strong> ${ans.question}<br/><strong>Your:</strong> ${ans.selected}<br/><strong>Correct:</strong> ${ans.correct}</li>`)
    .join("");
}

function restartQuiz() {
  startScreen.style.display = "block";
  reviewContainer.style.display = "none";
}

function enableReviewMode() {
  alert("Review mode shows you all your answers and the correct ones — see below!");
}

function startTimer() {
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackText.textContent = "⏰ Time's up!";
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
}
