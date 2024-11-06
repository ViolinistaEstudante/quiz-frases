const questions = [
    // Pergunta 1
    {
        question: "Quantas frases de autores externos temos no nosso site?",
        options: ["6", "7", "8", "9"],
        answer: 1
    },
    // Pergunta 2
    {
        question: "Quantos professores de geografia tem sua frase no site?",
        options: ["Nenhum", "2", "3", "4"],
        answer: 1
    },
    // Pergunta 3
    {
        question: "'Superação é quando te amassa a alma, e você ainda briga.', de quem é essa frase?",
        options: ["Profª Gabriela", "Profª Elizabeth", "Profª Danielli", "Profª Elisângela"],
        answer: 2
    },
    // Pergunta 4
    {
        question: "Quem escreveu a frase: 'Sempre há um caminho quando há vontade.'",
        options: ["Paulo Neruda", "Sócrates", "Pablo Picasso", "Carlos Drummond De Andrade"],
        answer: 0
    },
    // Pergunta 5
    {
        question: "Qual professor da nossa escola indicou a seguinte frase para o site? 'A vontade de se preparar precisa ser maior que a vontade de vencer.'",
        options: ["Profª Elisabeth – História", "Profª Gabriela - Português", "Prof° Victor - Matemática", "Profª Elisângela - Português"],
        answer: 3
    },
    // Pergunta 6
    {
        question: "Vencer é uma mistura de luta, esforço, otimismo e não desistir _____________. Qual é a palavra que completa a frase indicada pelo Prof° Élio – Biologia?",
        options: ["Jamais", "Nunca", "Sempre", "Ás vezes"],
        answer: 1
    },
    // Pergunta 7
    {
        question: "A educação pode ser a única ponte entre você e _ _________. Qual palavra completa a frase indicada pela Profª Érica - Química",
        options: [" O Sucesso", "A Conquista", "O Objetivo", "As Lutas"],
        answer: 0
    },
    // Pergunta 8
    {
        question: "União, dedicação, são fundamentais para o seu futuro. Essa frase foi dita pelo professor?",
        options: ["Profº Luiz Paulo – Geografia", "Prof° Érica - Química", "Prof° Karol - Física", "Prof° Sidnei - Filosofia"],
        answer: 0
    },
    // Pergunta 9
    {
        question: "Qual é o nome do site que você está acessando agora?",
        options: ["Escola e educação", "Chamado escolar", "Escola chamando", "Chamado da educação"],
        answer: 1
    },
    // Pergunta 10
    {
        question: "O que está representado na imagem da frase 'Estude, pois a caneta é mais leve do que a pá' que foi indicada pela Profª Karol - Física?",
        options: ["Uma pá", "Um trabalhador", "Uma caneta", "Uma foto da professora"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Função para embaralhar as perguntas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions); // Embaralha as perguntas

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const endMessageElement = document.getElementById('endMessage');
    const nameInputElement = document.getElementById('nameInput');
    const nextButton = document.getElementById('nextBtn'); // Referência corrigida para 'nextBtn'

    feedbackElement.innerText = ''; // Limpa o feedback
    endMessageElement.innerText = ''; // Limpa a mensagem de fim

    if (currentQuestion < questions.length) {
        questionElement.innerText = questions[currentQuestion].question;
        optionsElement.innerHTML = '';

        questions[currentQuestion].options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.className = 'option'; // Adiciona classe para estilo
            button.onclick = () => selectOption(index);
            optionsElement.appendChild(button);
        });

        nextButton.style.display = 'none'; // Esconde o botão "Próxima"
    } else {
        endMessageElement.innerText = `Fim do quiz! Você acertou ${score} de ${questions.length}.`;
        questionElement.innerText = ''; // Limpa a pergunta
        optionsElement.innerHTML = ''; // Limpa as opções
        nameInputElement.style.display = 'block'; // Exibe o campo para inserir nome
        displayScoreboard(); // Exibe o quadro de recordes
    }
}

// Função para desabilitar todos os botões de opções
function disableOptions() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = true;
    });
}

// Função para habilitar todos os botões de opções
function enableOptions() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = false;
    });
}

function selectOption(index) {
    const feedbackElement = document.getElementById('feedback');
    if (index === questions[currentQuestion].answer) {
        feedbackElement.innerText = "Correto!";
        score++; // Incrementa o score
        enableOptions(); // Habilita as opções para a próxima pergunta
    } else {
        feedbackElement.innerText = "Incorreto. Aperte no botão PRÓXIMA.";
        disableOptions(); // Desabilita as opções até que a próxima pergunta seja carregada
    }

    // Exibe o botão "Próxima" após selecionar uma resposta
    document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    enableOptions(); // Reabilita os botões para a próxima pergunta
    loadQuestion();
}

function saveScore() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName) {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ name: playerName, score: score });
        localStorage.setItem('scores', JSON.stringify(scores));
        document.getElementById('playerName').value = ''; // Limpa o campo de entrada
        document.getElementById('nameInput').style.display = 'none'; // Esconde o campo após salvar
        
        // Atualiza o quadro de recordes após salvar
        displayScoreboard(); 
    }
}

function displayScoreboard() {
    const scoreboardElement = document.getElementById('scoreboard');
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scoreboardElement.innerHTML = ''; // Limpa a tabela existente
    scores.forEach(scoreEntry => {
        const scoreItem = document.createElement('div');
        scoreItem.innerText = `${scoreEntry.name}: ${scoreEntry.score}`;
        scoreboardElement.appendChild(scoreItem);
    });
}

// Carrega a primeira pergunta
loadQuestion();