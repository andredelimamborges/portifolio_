// Seletores globais para a navegação e seções
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const exploreButton = document.querySelector(".explore-button");
const navElement = document.querySelector("nav"); // Adicionado para pegar a altura da nav

// Seletores específicos para a seção de Habilidades
const itemArray = document.querySelectorAll(".item-wrapper");
const mainTitle = document.querySelector("#main-title");
const descriptionInfo = document.querySelector(".info-description");
const mainWheel = document.querySelector(".main-wheel");
const backgroundWheel = document.querySelector(".background-wheel");
const infoText = document.querySelector(".info-text");

let currentActiveItem = itemArray[0]; // Guarda o item ativo na seção de Habilidades
let deg = -45; // Ângulo inicial de rotação das rodas

// Dados do seu portfólio para a seção de Habilidades
const portfolioData = [
  {
    name: "Desenvolvimento Web (Front-end)",
    description:
      "Experiência na construção de interfaces de usuário dinâmicas e responsivas utilizando HTML, CSS, JavaScript e frameworks modernos como React e Next.js. Foco na usabilidade e experiência do usuário.",
    backgroundColor:
      "linear-gradient(90deg, rgba(30,40,60,1) 0%, rgba(50,70,100,1) 35%, rgba(80,100,140,1) 100%)",
  },
  {
    name: "Engenharia de Prompts (IA)",
    description:
      "Profissional especializado em engenharia de prompts para sistemas de inteligência artificial generativa. Atuo na criação e refinamento de instruções que orientam modelos de linguagem, como o ChatGPT, a fornecer respostas mais precisas, úteis e alinhadas às necessidades dos usuários.",
    backgroundColor:
      "linear-gradient(90deg, rgba(40,30,60,1) 0%, rgba(70,50,100,1) 35%, rgba(100,80,140,1) 100%)",
  },
  {
    name: "Cloud Computing (AWS/Azure)",
    description:
      "Familiaridade com serviços de nuvem como AWS (EC2, S3, Lambda) e Azure para deploy, escalabilidade e gerenciamento de aplicações. Experiência em arquiteturas serverless e DevOps. Possuo certificação em AWS Cloud Foundations.",
    backgroundColor:
      "linear-gradient(90deg, rgba(30,60,40,1) 0%, rgba(50,100,70,1) 35%, rgba(80,140,100,1) 100%)",
  },
  {
    name: "Gestão de Projetos (Scrum)",
    description:
      "Habilidade em metodologias ágeis, especialmente Scrum, para liderar equipes, planejar sprints, gerenciar backlogs e garantir a entrega de projetos com eficiência e qualidade. Foco em comunicação e colaboração. Experiência em consultoria de operações e sistemas.",
    backgroundColor:
      "linear-gradient(90deg, rgba(60,40,30,1) 0%, rgba(100,70,50,1) 35%, rgba(140,100,80,1) 100%)",
  },
];


// --- Funções de Navegação entre Seções ---

// Função para atualizar a variável CSS --nav-height
function updateNavHeight() {
    const navHeight = navElement.offsetHeight;
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
}

function showSection(sectionId) {
    // Esconde todas as seções
    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    // Mostra a seção desejada
    const targetSection = document.querySelector(`.${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add("active-section");
    }

    // Atualiza a classe 'active' nos links de navegação
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.dataset.section === sectionId) {
            link.classList.add("active");
        }
    });

    // Se for a seção de Habilidades, garante que o primeiro item esteja ativo e o fundo correto
    if (sectionId === 'skills') {
        resetSkillsSection();
    }
}

function resetSkillsSection() {
    // Ativa o primeiro item na lista de thumbnails de habilidades
    if (currentActiveItem) {
        currentActiveItem.classList.remove("activePhoto");
    }
    if (itemArray.length > 0) {
        itemArray[0].classList.add("activePhoto");
        currentActiveItem = itemArray[0];
    }

    // Define o conteúdo e fundo iniciais para a seção de habilidades
    if (portfolioData.length > 0) {
        mainTitle.innerHTML = portfolioData[0].name;
        descriptionInfo.innerHTML = portfolioData[0].description;
        document.querySelector("main").style.background = portfolioData[0].backgroundColor;
    }

    // Reseta a rotação das rodas
    deg = -45;
    if (mainWheel) mainWheel.style.transform = `rotate(${deg}deg)`;
    if (backgroundWheel) backgroundWheel.style.transform = `rotate(${deg}deg)`;
}


// --- Event Listeners ---

// Navegação pelo menu superior
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});

// Botão "Explorar Portfólio" na seção Home
exploreButton.addEventListener("click", () => {
    const targetSectionId = exploreButton.dataset.targetSection;
    if (targetSectionId) {
        showSection(targetSectionId);
    }
});

// Lógica de clique para os itens da seção Habilidades (a antiga animação de sucos)
itemArray.forEach((element, index) => {
  element.addEventListener("click", () => {
    // 1. Atualiza o fundo do main
    document.querySelector("main").style.background =
      portfolioData[index].backgroundColor;

    // 2. Rotaciona as rodas
    deg = deg - 90; // Cada clique gira 90 graus
    mainWheel.style.transform = `rotate(${deg}deg)`;
    backgroundWheel.style.transform = `rotate(${deg}deg)`;

    // 3. Atualiza o texto (título e descrição)
    infoText.classList.remove("fade-in"); // Remove para garantir que a animação possa ser acionada novamente
    void infoText.offsetWidth; // Força reflow para reiniciar a animação
    mainTitle.innerHTML = portfolioData[index].name;
    descriptionInfo.innerHTML = portfolioData[index].description;
    infoText.classList.add("fade-in");

    // 4. Gerencia a classe 'activePhoto' para o item selecionado
    currentActiveItem.classList.remove("activePhoto");
    element.classList.add("activePhoto");
    currentActiveItem = element; // Atualiza o item ativo
  });
});

// Inicialização: Define a altura da nav e mostra a seção 'home'
window.addEventListener('DOMContentLoaded', () => {
    updateNavHeight(); // Calcula e define a altura da nav no carregamento
    showSection('home'); // Inicia mostrando a seção 'home'
});

// Atualiza a altura da nav em caso de redimensionamento da janela
window.addEventListener('resize', updateNavHeight);