// Seletores globais para a navegação e seções
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const exploreButton = document.querySelector(".explore-button");
const navElement = document.querySelector("nav");

// Seletores específicos para a seção de Habilidades
const itemArray = document.querySelectorAll(".item-wrapper");
const mainTitle = document.querySelector("#main-title");
const descriptionInfo = document.querySelector(".info-description");
const mainWheel = document.querySelector(".main-wheel");
const backgroundWheel = document.querySelector(".background-wheel");
const infoText = document.querySelector(".info-text");

let currentActiveItem = itemArray[0];
let deg = -45;

// Dados do portfólio (atualizados com base no PDF)
const portfolioData = [
  {
    name: "Desenvolvimento Web (Front-end)",
    description:
      "Experiência na construção de interfaces de usuário dinâmicas e responsivas utilizando HTML, CSS, JavaScript, React e Next.js. Foco na usabilidade e experiência do usuário.",
    backgroundColor:
      "linear-gradient(90deg, rgba(30,40,60,1) 0%, rgba(50,70,100,1) 35%, rgba(80,100,140,1) 100%)",
  },
  {
    name: "Engenharia de Prompts (IA)",
    description:
      "Especializado em engenharia de prompts para sistemas de inteligência artificial generativa, criando e refinando instruções para modelos como o ChatGPT e Claude.",
    backgroundColor:
      "linear-gradient(90deg, rgba(40,30,60,1) 0%, rgba(70,50,100,1) 35%, rgba(100,80,140,1) 100%)",
  },
  {
    name: "Cloud Computing (AWS/Azure)",
    description:
      "Experiência com AWS (EC2, S3, Lambda) e Azure para deploy, escalabilidade e gerenciamento de aplicações. Certificação AWS Cloud Foundations.",
    backgroundColor:
      "linear-gradient(90deg, rgba(30,60,40,1) 0%, rgba(50,100,70,1) 35%, rgba(80,140,100,1) 100%)",
  },
  {
    name: "Gestão de Projetos (Scrum)",
    description:
      "Experiência em metodologias ágeis, especialmente Scrum, para liderar equipes, gerenciar backlogs e entregar projetos com eficiência.",
    backgroundColor:
      "linear-gradient(90deg, rgba(60,40,30,1) 0%, rgba(100,70,50,1) 35%, rgba(140,100,80,1) 100%)",
  },
  {
    name: "Cybersegurança",
    description:
      "Conhecimentos em segurança da informação, análise de vulnerabilidades e boas práticas de proteção de dados. Experiência com projetos de cibersegurança em ambientes corporativos.",
    backgroundColor:
      "linear-gradient(90deg, rgba(20,20,20,1) 0%, rgba(50,50,70,1) 35%, rgba(80,80,120,1) 100%)",
  },
];

// --- Funções de Navegação entre Seções ---
function updateNavHeight() {
  const navHeight = navElement.offsetHeight;
  document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
}

function showSection(sectionId) {
  sections.forEach((section) => section.classList.remove("active-section"));
  const targetSection = document.querySelector(`.${sectionId}-section`);
  if (targetSection) targetSection.classList.add("active-section");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.section === sectionId) {
      link.classList.add("active");
    }
  });

  if (sectionId === "skills") {
    resetSkillsSection();
  }
}

function resetSkillsSection() {
  if (currentActiveItem) currentActiveItem.classList.remove("activePhoto");
  if (itemArray.length > 0) {
    itemArray[0].classList.add("activePhoto");
    currentActiveItem = itemArray[0];
  }

  if (portfolioData.length > 0) {
    mainTitle.innerHTML = portfolioData[0].name;
    descriptionInfo.innerHTML = portfolioData[0].description;
    document.querySelector("main").style.background =
      portfolioData[0].backgroundColor;
  }

  deg = -45;
  if (mainWheel) mainWheel.style.transform = `rotate(${deg}deg)`;
  if (backgroundWheel) backgroundWheel.style.transform = `rotate(${deg}deg)`;
}

// --- Event Listeners ---
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showSection(link.dataset.section);
  });
});

exploreButton.addEventListener("click", () => {
  const targetSectionId = exploreButton.dataset.targetSection;
  if (targetSectionId) showSection(targetSectionId);
});

itemArray.forEach((element, index) => {
  element.addEventListener("click", () => {
    document.querySelector("main").style.background =
      portfolioData[index].backgroundColor;

    // rotação proporcional ao número de itens
    deg = deg - 360 / portfolioData.length;
    mainWheel.style.transform = `rotate(${deg}deg)`;
    backgroundWheel.style.transform = `rotate(${deg}deg)`;

    infoText.classList.remove("fade-in");
    void infoText.offsetWidth;
    mainTitle.innerHTML = portfolioData[index].name;
    descriptionInfo.innerHTML = portfolioData[index].description;
    infoText.classList.add("fade-in");

    currentActiveItem.classList.remove("activePhoto");
    element.classList.add("activePhoto");
    currentActiveItem = element;
  });
});

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  updateNavHeight();
  showSection("home");
});

window.addEventListener("resize", updateNavHeight);
