const verses = [
  "Entrega o teu caminho ao Senhor; confia nele. – Salmos 37:5",
  "Vinde a mim todos os que estais cansados, e eu vos aliviarei. – Mateus 11:28",
  "Porque Deus amou o mundo de tal maneira... – João 3:16",
  "O Senhor é o meu pastor; nada me faltará. – Salmos 23:1",
  "Não temas, porque eu sou contigo. – Isaías 41:10",
  "Deus é amor. – 1 João 4:8",
  "Pedi, e dar-se-vos-á; buscai, e achareis. – Mateus 7:7",
];

// Testemunhos
const testimonies = [
  // SEU TESTEMUNHO (Versão aprimorada)
  "Eu tinha tudo por fora, mas por dentro era só um vaziozão. Bebidas, rolês, nada resolvia. Só encontrei a paz e um Amigo de verdade quando parei de buscar 'religião' e busquei Jesus. Ele tirou meu vazio e me disse: 'Você não precisa ser perfeito pra Eu ser seu amigo'. E a vida mudou!",

  // NOVO TESTEMUNHO 1 (Foco em Força e Recomeço)
  "Achei que o fundo do poço era o meu fim. Zero perspectiva. Mas encontrei uma Força que não é minha. Deus me pegou no colo, me deu forças para recomeçar do zero e me mostrou que o melhor da história ainda estava por vir. Valeu a pena tentar de novo!",

  // NOVO TESTEMUNHO 2 (Foco em Paz e Ansiedade)
  "A ansiedade me 'travava', e o medo era diário. Tentava controlar tudo, mas só piorava. Quando eu entreguei o controle, a paz de Deus 'bateu' de um jeito que nem eu entendi. Não é mágica, é Ele. Hoje, eu respiro e confio. Ele é o meu alívio!",

  // Outros testemunhos curtos que você já tinha:
  "Deus me deu forças quando pensei em desistir.",
  "Um pequeno passo me levou a uma grande transformação.",
  "Achei propósito e amigos verdadeiros.",
];

// Estudos (conteúdo)
const studies = {
  ansiedade: {
    title: "Como lidar com ansiedade",
    body: `<p>A ansiedade é real. Primeiro respire. Procure pequenas ações: orações curtas, leitura de um versículo, caminhar ao ar livre. Quando precisar, peça ajuda a alguém de confiança.</p><p class="mt-3 font-semibold">Oração curta:</p><p>Senhor, dá-me calma neste momento. Ajuda-me a confiar em Ti.</p>`,
  },
  perdao: {
    title: "Perdão que liberta",
    body: `<p>Perdoar não significa esquecer, mas liberar o peso que você carrega. Perdoe a si mesmo primeiro, e depois aos outros. Deus entende nosso processo.</p><p class="mt-3 font-semibold">Sugestão prática:</p><p>Escreva o que te dói e entregue em oração.</p>`,
  },
  proposito: {
    title: "Encontrando propósito",
    body: `<p>Procure servir em pequenas ações: ajudar um amigo, estudar algo novo, voluntariar. Propósito muitas vezes nasce na simplicidade.</p><p class="mt-3 font-semibold">Exercício:</p><p>Liste 3 coisas que gosta de fazer e como pode usar isso para ajudar alguém.</p>`,
  },
};

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const heroPhrases = [
  "Tá tudo bem não saber. Vamos juntos.",
  "Um passo de cada vez.",
  "A paz pode chegar hoje.",
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("opacity-100", "translate-y-0");
      }
    });
  },
  { threshold: 0.12 }
);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("versiculo").innerText = randomFrom(verses);

  const tEls = [
    document.getElementById("t1"),
    document.getElementById("t2"),
    document.getElementById("t3"),
  ];
  for (let i = 0; i < tEls.length; i++) {
    tEls[i].innerText = testimonies[i % testimonies.length];
  }

  document.querySelectorAll("section, header, footer").forEach((el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-6",
      "transition",
      "duration-600",
      "ease-out"
    );
    observer.observe(el);
  });

  typeWriterLoop(document.getElementById("heroType"), heroPhrases, 0);

  const prayerText = document.getElementById("prayerText");
  prayerText.innerHTML = `<em>Clique em "Quero orar" para ver a oração linha a linha.</em>`;

  document.querySelectorAll(".openStudy").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const key = e.currentTarget.dataset.study;
      openStudy(key);
    });
  });

  document.getElementById("closeStudy").addEventListener("click", closeStudy);

  document.getElementById("newVerse").addEventListener("click", () => {
    document.getElementById("versiculo").innerText = randomFrom(verses);
  });

  document.getElementById("startPrayer").addEventListener("click", () => {
    playPrayerSequence();
  });

  document.getElementById("skipPrayer").addEventListener("click", () => {
    document.getElementById("prayerText").innerHTML = fullPrayerText();
  });

  document.getElementById("btnPrayer").addEventListener("click", () => {
    document
      .getElementById("startPrayer")
      .scrollIntoView({ behavior: "smooth", block: "center" });
    playPrayerSequence();
  });

  document.getElementById("studyModal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeStudy();
  });

  const wa = document.getElementById("whatsappLink");
  wa.title = "Clique para abrir WhatsApp (substitua o número no HTML pelo seu)";
});

function typeWriterLoop(el, phrases, index) {
  const text = phrases[index % phrases.length];
  typeText(el, text, 0, () => {
    setTimeout(() => {
      el.innerText = "";
      setTimeout(() => {
        typeWriterLoop(el, phrases, index + 1);
      }, 400);
    }, 2200);
  });
}

function typeText(el, txt, i, done) {
  if (i < txt.length) {
    el.innerText = txt.slice(0, i + 1);
    setTimeout(() => typeText(el, txt, i + 1, done), 35 + Math.random() * 40);
  } else {
    done && done();
  }
}

function fullPrayerText() {
  return `<p>Senhor, eu não sei tudo sobre Ti, mas se Tu estás chamando, eu quero aprender. Entra na minha vida. Amém.</p>
              <p>Senhor, dá-me calma neste momento. Ajuda-me a confiar em Ti. Amém.</p>`;
}

function playPrayerSequence() {
  const container = document.getElementById("prayerText");
  const lines = [
    "Pare por um instante. Respire fundo.",
    "Reconheça o que você sente agora — sem vergonha.",
    "Leve isso a Deus: peça calma, peça direção.",
    "Se quiser, diga: 'Senhor, entra na minha vida'.",
  ];
  container.innerHTML = "";
  let i = 0;
  function nextLine() {
    if (i >= lines.length) {
      setTimeout(() => {
        container.insertAdjacentHTML(
          "beforeend",
          `<p class="mt-3 font-semibold">Oração:</p>${fullPrayerText()}`
        );
      }, 600);
      return;
    }
    const p = document.createElement("p");
    p.className = "text-slate-800 mb-2";
    p.innerText = lines[i];
    container.appendChild(p);
    i++;
    setTimeout(nextLine, 1500);
  }
  nextLine();
}

function openStudy(key) {
  const modal = document.getElementById("studyModal");
  document.getElementById("studyTitle").innerText =
    studies[key].title || "Estudo";
  document.getElementById("studyBody").innerHTML =
    studies[key].body || "<p>Conteúdo em breve.</p>";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}
function closeStudy() {
  const modal = document.getElementById("studyModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("focus", () => el.classList.add("focus-ring"));
  el.addEventListener("blur", () => el.classList.remove("focus-ring"));
});
