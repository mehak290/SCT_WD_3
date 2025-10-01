const quizData = [
  {
    type: "single",
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    type: "multi",
    question: "Select all prime numbers:",
    options: ["2", "3", "4", "5"],
    answer: ["2", "3", "5"]
  },
  {
    type: "fill",
    question: "___ is the process of converting code into machine-readable format.",
    answer: "compilation"
  },
  {
    type: "single",
    question: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const nextBtn = document.getElementById('nextBtn');

function loadQuestion() {
  quizContainer.innerHTML = "";
  const q = quizData[currentQuestion];

  const questionEl = document.createElement('div');
  questionEl.className = "question";
  questionEl.innerText = q.question;
  quizContainer.appendChild(questionEl);

  const answersEl = document.createElement('div');
  answersEl.className = "answers";

  if (q.type === "single") {
    q.options.forEach(option => {
      const label = document.createElement('label');
      label.style.display = "block";
      label.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
      answersEl.appendChild(label);
    });
  } else if (q.type === "multi") {
    q.options.forEach(option => {
      const label = document.createElement('label');
      label.style.display = "block";
      label.innerHTML = `<input type="checkbox" name="answer" value="${option}"> ${option}`;
      answersEl.appendChild(label);
    });
  } else if (q.type === "fill") {
    const input = document.createElement('input');
    input.type = "text";
    input.name = "answer";
    answersEl.appendChild(input);
  }

  quizContainer.appendChild(answersEl);
}

function getAnswer() {
  const q = quizData[currentQuestion];
  let userAnswer;

  if (q.type === "single") {
    const selected = document.querySelector('input[name="answer"]:checked');
    userAnswer = selected ? selected.value : null;
    if (userAnswer === q.answer) score++;
  } else if (q.type === "multi") {
    const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(el => el.value);
    if (selected.length === q.answer.length && selected.every(val => q.answer.includes(val))) {
      score++;
    }
  } else if (q.type === "fill") {
    const input = document.querySelector('input[name="answer"]');
    userAnswer = input.value.trim().toLowerCase();
    if (userAnswer === q.answer.toLowerCase()) score++;
  }
}

nextBtn.addEventListener('click', () => {
  getAnswer();
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizContainer.innerHTML = `<h3>Your Score: ${score} / ${quizData.length}</h3>`;
    nextBtn.style.display = "none";
  }
});

loadQuestion();
