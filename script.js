const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Tekrar'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Ilk Osmanli padisahi ?',
    answers: [
      { text: 'Osman Gazi', correct: true },
      { text: 'Orhan Gazi', correct: false },
      { text: 'Fatih Sultan Mehmet', correct: false },
      { text: 'Kanuni Sultan S??leyman', correct: false }
    ]
  },
  {
    question: "??stanbul'un fethi ile Avrupada hangi y??netim ??ekli kalkmi??tir? ",
    answers: [
      { text: 'Teokrasi', correct: false },
      { text: 'Skolastik Dusunce', correct: false },
      { text: 'Demokrasi', correct: false },
      { text: 'Feodalite', correct: true }
    ]
  },
  {
    question: 'T??rkiye Cumhuriyetinde ilk n??fus sayimi ne zaman yapilmi??tir ?',
    answers: [
      { text: '1923', correct: false },
      { text: '1927', correct: true },
      { text: '1836', correct: false },
      { text: '1981', correct: false }
    ]
  },
  {
    question: "??stanbul'u ilk kez ku??atan Osmanli padi??ahi ?",
    answers: [
      { text: 'Fatih Sultan Mehmet', correct: false },
      { text: 'I. Beyazid', correct: true },
      { text: 'Osman gazi', correct: false },
      { text: 'II. Abdulhamit', correct: false },
    ]
  },
  {
    question: "A??a??idaki tarihlerin hangisi Osmanli Devletinin kurulu?? tarihidir?",
    answers: [
      { text: '1258', correct: false },
      { text: '1298', correct: false },
      { text: '1288', correct: false },
      { text: '1299', correct: true },
    ]
  },
  {
    question: "Osmanli Devletinin Rumenlide edindi??i ilk toprak hangisidir?",
    answers: [
      { text: 'Anadolu Hisari', correct: false },
      { text: 'Karacahisar Kalesi', correct: false },
      { text: 'Rumeli Hisari', correct: false },
      { text: '??impe Kalesi', correct: true },
    ]
  }
  
]