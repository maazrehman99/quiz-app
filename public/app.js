


        
const firebaseConfig = {
  apiKey: "AIzaSyASHB9cy3Z2CvmGQN4YfZoTaxPxlptWCRg",
  authDomain: "fir-app-f8abc.firebaseapp.com",
  projectId: "fir-app-f8abc",
  storageBucket: "fir-app-f8abc.appspot.com",
  messagingSenderId: "170944222863",
  appId: "1:170944222863:web:d6a3ecc56f4db15be042fa"
};
const app = firebase.initializeApp(firebaseConfig);
 
   

function startQuiz() {
 var userName = document.getElementById("username").value;
  console.log(userName);
  
  window.location.href = './Quiz.html';

  localStorage.setItem('userName', userName);
}

var user = localStorage.getItem('userName')
var quizData = [
  {
    question: "What is JavaScript?",
    a: "client side",
    b: "html",
    c: "server lang",
    d: "machine languge",
    correct: "a",
  },
  {
    question: "What is the full meaning of CSS?",
    a: "Cascading Style Server",
    b: "Cascade Styling Surface",
    c: "Cascading Surface Sheet",
    d: "Cascading Style Sheets",
    correct: "d",
  },
  {
    question: "What is the most popular programming language in 2022?",
    a: "Java",
    b: "PHP",
    c: "html",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Which company developed JavaScript??",
    a: "Netscape .",
    b: "goolge",
    c: "mete company",
    d: "spice X",
    correct: "a",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Stylesheet",
    c: "JavaScript Object Notation",
    d: "Hyper Markup Language",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1998",
    b: "1993",
    c: "1995",
    d: "2000",
    correct: "c",
  },
  {
    question: "All these are Server Side Language except?",
    a: "HTML",
    b: "PHP",
    c: "Node.js",
    d: "Ruby on rails",
    correct: "a",
  },
  {
    question: "All these are JavaScript Framework except?",
    a: "Laravel",
    b: "React.js",
    c: "Node.js",
    d: "Vue.js",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1998",
    b: "1993",
    c: "1995",
    d: "2000",
    correct: "c",
  },
  {
    question: "Which company developed JavaScript??",
    a: "Netscape .",
    b: "goolge",
    c: "mete company",
    d: "spice X",
    correct: "a",
  },
];


  
 

var currInd = 0;
var score = 0;
var selectedAnswer = 0;

var allRadiOBtn = document.getElementsByTagName("input")
var eleQues = document.getElementById("Question")
var eleA = document.getElementById("a_text")
var eleB = document.getElementById("b_text")
var eleC = document.getElementById("c_text")
var eleD = document.getElementById("d_text")

function displayData() {
  var currData = quizData[currInd];

  eleQues.innerHTML = currData.question
  eleA.innerHTML = currData.a
  eleB.innerHTML = currData.b
  eleC.innerHTML = currData.c
  eleD.innerHTML = currData.d
}
function getSelectedRadio() {
  for (var i = 0; i < allRadiOBtn.length; i++) {
    if (allRadiOBtn[i].checked) {
      selectedAnswer = allRadiOBtn[i].id
    }
  }
  return selectedAnswer
}
function deselectRadio() {
  for (var i = 0; i < allRadiOBtn.length; i++) {
    if (allRadiOBtn[i].checked) {
      allRadiOBtn[i].checked = false
    }
  }
}



function next() {
  var answer = getSelectedRadio()
  if (answer == quizData[currInd].correct) {
    score++;


  }

  currInd++;
  deselectRadio()
  if (currInd < quizData.length) {
    displayData()
  }
  else {
    
   
  
    var percentage= Math.floor((score/quizData.length)*100) ;
    var status ;
    if(percentage>50){
      status="Pass"
    }
    else{
      status="Fail"
    }
    
    var div = document.getElementById("mainDiv");
    div.innerHTML = `
        <h1 class="text-danger"> Result :</h1>
        <h3> Name : ${user} </h3> 
        <h3> Percentage : ${percentage}% </h3> 
        <h3> Remarks : You got ${score} out of ${quizData.length}<h3>
        <h3> Status  : ${status} <h3>
        <button  class="btn-next btn btn-success" onclick=" window.location.href='./index.html'">Retake Quiz</button>
        `
    var dataBase = firebase.database().ref("Quiz Results")
    var key = dataBase.push().key


    var res = {
      user : user,
      scores: score,
      key: key,
      status :status,
      Percentage :percentage
    }
    dataBase.child(key).set(res)
  }


}




