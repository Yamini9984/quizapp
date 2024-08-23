const quizData = [
    {
        question: "JavaScript ignores extra spaces?",
        a: "True",
        b: "False",
        c: "Sometimes",
        d: "Everytime",
        correct: "a"
    },
    {
        question: "What is the purpose of the `<head>` tag in HTML?",
        a: "It contains metadata and links to external resources",
        b: "It defines the main content of the webpage",
        c: "It is used to style the content",
        d: "It holds the website's title",
        correct: "a"
    },
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Home Tool Markup Language",
        c: "Hyperlinks and Text Markup Language",
        d: "None of the above",
        correct: "a"
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        a: "<a>",
        b: "<link>",
        c: "<href>",
        d: "<hyperlink>",
        correct: "a"
    },
    {
        question: "Which CSS property is used to change the background color?",
        a: "bgcolor",
        b: "color",
        c: "background-color",
        d: "background",
        correct: "c"
    },
    {
        question: "Which HTML tag is used to display an image?",
        a: "<img>",
        b: "<picture>",
        c: "<image>",
        d: "<src>",
        correct: "a"
    },
    {
        question: "Which property is used to align text in CSS?",
        a: "text-align",
        b: "align",
        c: "vertical-align",
        d: "position",
        correct: "a"
    },
    {
        question: "Which JavaScript method is used to write into an alert box?",
        a: "msg()",
        b: "alert()",
        c: "message()",
        d: "prompt()",
        correct: "b"
    },
    {
        question: "How do you declare a JavaScript variable?",
        a: "var myVar;",
        b: "variable myVar;",
        c: "v myVar;",
        d: "declare myVar;",
        correct: "a"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        a: "onmouseclick",
        b: "onhover",
        c: "onclick",
        d: "onchange",
        correct: "c"
    },
    {
        question: "Which HTML element is used to create a form?",
        a: "<form>",
        b: "<input>",
        c: "<textarea>",
        d: "<fieldset>",
        correct: "a"
    },
    {
        question: "How do you add a comment in a CSS file?",
        a: "// this is a comment",
        b: "<!-- this is a comment -->",
        c: "/* this is a comment */",
        d: "` this is a comment",
        correct: "c"
    },
    {
        question: "How do you round a number in JavaScript?",
        a: "Math.round()",
        b: "Math.ceil()",
        c: "Math.floor()",
        d: "Number.round()",
        correct: "a"
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image?",
        a: "title",
        b: "alt",
        c: "src",
        d: "href",
        correct: "b"
    },
    {
        question: "Which CSS property is used to change the font of an element?",
        a: "font-style",
        b: "font-size",
        c: "font-family",
        d: "font-weight",
        correct: "c"
    },
    {
        question: "How do you create a function in JavaScript?",
        a: "function myFunction()",
        b: "function:myFunction()",
        c: "create function myFunction()",
        d: "def myFunction()",
        correct: "a"
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        a: "<style>",
        b: "<css>",
        c: "<script>",
        d: "<link>",
        correct: "a"
    },
    {
        question: "Which property is used to control the spacing between elements?",
        a: "padding",
        b: "margin",
        c: "border-spacing",
        d: "line-height",
        correct: "b"
    },
    {
        question: "How do you link an external CSS file in HTML?",
        a: "<link rel='stylesheet' href='style.css'>",
        b: "<style src='style.css'>",
        c: "<stylesheet>style.css</stylesheet>",
        d: "<css>style.css</css>",
        correct: "a"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        a: "style",
        b: "class",
        c: "id",
        d: "inline",
        correct: "a"
    }
];


let currentQuiz = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionEl = document.getElementById('question');
const optionsEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const timerEl = document.getElementById('timer');
const progressTextEl = document.getElementById('progress-text');
const badgeEl = document.getElementById('badge'); // Badge element

function startQuiz() {
    loadQuiz();
    timerInterval = setInterval(updateTimer, 1000);
}

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    progressTextEl.innerText = `${currentQuiz + 1} of ${quizData.length} Questions`;
    timeLeft = 30;
    updateTimer();
}

function deselectAnswers() {
    optionsEls.forEach(option => option.checked = false);
}

function getSelected() {
    let answer;
    optionsEls.forEach(option => {
        if(option.checked) {
            answer = option.id;
        }
    });
    return answer;
}

function updateTimer() {
    timerEl.innerText = timeLeft;
    timeLeft--;
    if(timeLeft < 0) {
        clearInterval(timerInterval);
        moveToNextQuestion();
    }
}

submitBtn.addEventListener('click', moveToNextQuestion);

function moveToNextQuestion() {
    const answer = getSelected();
    if(answer === quizData[currentQuiz].correct) {
        score++;
    }
    currentQuiz++;
    if(currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        clearInterval(timerInterval);
        showResults();
    }
}

function showResults() {
    questionEl.innerText = `You scored ${score} out of ${quizData.length}`;
    document.querySelector('.options-list').style.display = 'none';
    submitBtn.style.display = 'none';
    progressTextEl.style.display = 'none';

    
    const percentage = (score / quizData.length) * 100;
    let badge = '';
    if (percentage >= 90) {
        badge = 'Gold';
    } else if (percentage >= 75) {
        badge = 'Silver';
    } else if (percentage >= 0) {
        badge = 'Bronze';
    } 
    badgeEl.innerText = `Congratulations! You earned a ${badge} badge!`;
}

startQuiz();
