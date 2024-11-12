const questions = [
    // Pergunta 1
    {
        question: "Qual a cor predominante do site?",
        options: ["Azul", "Amarelo", "Verde", "Branco"],
        answer: 0
    },
    // Pergunta 2
    {
        question: "Segundo a Prof° Karol: 'Estude, pois a _________ é mais leve do que a pá' Qual a alternativa que completa a lacuna?",
        options: ["Inteligência", "Lápis", "Sabedoria", "Caneta"],
        answer: 3
    },
    // Pergunta 3
    {
        question: "Por quem foi dita a frase 'O que você está fazendo por você?'",
        options: ["Profª Maria Marli", "Profª Marisa", "Prof° Sidnei", "Prof° Victor"],
        answer: 2
    },
    // Pergunta 4
    {
        question: "Qual o nome do site que você está acessando agora?",
        options: ["Chamado Escolar", "Chamado Da Educação", "Quiz - Chamado Escolar", "Frases De Motivação"],
        answer: 2
    },
    // Pergunta 5
    {
        question: "'A educação pode ser a única ponte entre você e ___________'. Qual palavra completa a frase indicada pela Profª Érica?",
        options: ["O Otimismo", "O Sucesso", "As Lutas", "O Desafio"],
        answer: 1
    },
    // Pergunta 6
    {
        question: "'Superação é quando te amassa a alma, e você ainda briga.' Essa frase foi dita pelo(a) professor(a)?",
        options: ["Profª Karine", "Profª Marisa", "Profª Danielli", "Profª Érica"],
        answer: 2
    },
    // Pergunta 7
    {
        question: "Qual imagem acompanha a frase: 'Estude, pois a caneta é mais leve do que a pá', dita pela Profª Karol?",
        options: ["Uma Pá", "Um Trabalhador", "Uma Caneta", "Uma Foto Da Professora"],
        answer: 2
    },
    // Pergunta 8
    {
        question: "'Vencer é uma mistura de luta, esforço, otimismo e não desistir _____________'. Qual é a palavra que completa a frase indicada pelo Prof° Élio?",
        options: ["Nunca", "Jamais", "Sempre", "Ás vezes"],
        answer: 0
    },
    // Pergunta 9
    {
        question: "Espero que você analisou bem o site... No site, há a presença de uma logo dos colégios cívicos militares?",
        options: ["Sim", "Não"],
        answer: 1
    },
    // Pergunta 10
    {
        question: "Qual é o objetivo principal do site 'Chamado Escolar'?",
        options: ["Fornecer dicas de estudo", "Compartilhar frases motivacionais para os estudos", "Oferecer cursos online de motivação", "Divulgar notícias sobre educação"],
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