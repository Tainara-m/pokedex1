// Referências do HTML
const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search");
const searchForm = document.querySelector(".search-form");
const modal = document.getElementById("pokemon-modal");
const modalCard = document.getElementById("modal-card");
const closeModal = document.getElementById("close-modal");
const backToTopBtn = document.getElementById("back-to-top");
const resetListBtn = document.getElementById("reset-list-btn");
const loadMoreBtn = document.getElementById("load-more-btn");

let limiteAtual = 10;

// Cores por tipo
const coresTipos = {
    grass: "#7AC74C",
    poison: "#A33EA1",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    bug: "#A6B91A",
    normal: "#A8A77A",
    flying: "#A98FF3",
    ground: "#E2BF65",
    psychic: "#F95587",
    rock: "#B6A136",
    steel: "#B7B7CE",
    ice: "#96D9D6",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    fairy: "#D685AD",
    fighting: "#C22E28"
};

// Scroll: mostrar botão "voltar ao topo"
window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden");
    } else {
        backToTopBtn.classList.add("hidden");
    }
});

// Botão voltar ao topo
backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Botão reiniciar lista
resetListBtn.addEventListener("click", function() {
    fecharModal();
    searchInput.value = "";
    limiteAtual = 10;
    carregarPokemonsIniciais();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Limpa os cards atuais
function limparCards() {
    cardContainer.innerHTML = "";
}

// Helpers
function formatarNomePokemon(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function formatarNumeroPokemon(id) {
    return "#" + String(id).padStart(3, "0");
}

function obterImagemPokemon(dados, usarImagemMelhor = false) {
    if (usarImagemMelhor) {
        return (
            dados.sprites.other["official-artwork"].front_default ||
            dados.sprites.other.dream_world.front_default ||
            dados.sprites.front_default
        );
    }

    return dados.sprites.front_default;
}

function formatarAltura(height) {
    return (height / 10).toFixed(1) + " m";
}

function formatarPeso(weight) {
    return (weight / 10).toFixed(1) + " kg";
}

function formatarTexto(texto) {
    return texto
        .split("-")
        .map(function(parte) {
            return parte.charAt(0).toUpperCase() + parte.slice(1);
        })
        .join(" ");
}

function criarHeaderPokemon(dados) {
    const header = document.createElement("div");
    header.classList.add("card-header");

    const number = document.createElement("p");
    number.classList.add("number");
    number.textContent = formatarNumeroPokemon(dados.id);

    const name = document.createElement("h2");
    name.classList.add("name");
    name.textContent = formatarNomePokemon(dados.name);

    header.appendChild(name);
    header.appendChild(number);

    return header;
}

function criarTiposPokemon(dados) {
    const typeContainer = document.createElement("div");
    typeContainer.classList.add("type");

    const tipos = dados.types.map(function(item) {
        return item.type.name;
    });

    tipos.forEach(function(tipo) {
        const badge = document.createElement("span");
        badge.textContent = tipo;

        badge.style.backgroundColor = coresTipos[tipo];
        badge.style.color = "#fff";
        badge.style.padding = "4px 10px";
        badge.style.borderRadius = "12px";
        badge.style.fontSize = "0.8rem";

        typeContainer.appendChild(badge);
    });

    return typeContainer;
}

// Card da grade
function criarCardPokemon(dados) {
    const card = document.createElement("article");
    card.classList.add("card");

    card.addEventListener("click", function() {
        abrirModal(dados);
    });

    const tipoPrincipal = dados.types[0].type.name;
    card.style.backgroundColor = coresTipos[tipoPrincipal];

    const header = criarHeaderPokemon(dados);

    const image = document.createElement("img");
    image.classList.add("card-img");
    image.src = obterImagemPokemon(dados, false);
    image.alt = "Imagem do Pokémon " + dados.name;

    card.appendChild(header);
    card.appendChild(image);

    cardContainer.appendChild(card);
}

// Modal
function abrirModal(dadosPokemon) {
    modalCard.innerHTML = "";
    criarCardPokemonModal(dadosPokemon);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    modal.scrollTop = 0;

    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
}

function fecharModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
}

closeModal.addEventListener("click", function() {
    fecharModal();
});

modal.addEventListener("click", function(evento) {
    if (evento.target === modal) {
        fecharModal();
    }
});

function criarCardPokemonModal(dados) {
    const modalPokemonCard = document.createElement("div");
    modalPokemonCard.classList.add("modal-pokemon-card");

    const tipoPrincipal = dados.types[0].type.name;

    const front = document.createElement("div");
    front.classList.add("modal-card-front");
    front.style.backgroundColor = coresTipos[tipoPrincipal];

    const back = document.createElement("div");
    back.classList.add("modal-card-back");

    const header = criarHeaderPokemon(dados);
    header.classList.add("modal-card-header");

    const image = document.createElement("img");
    image.classList.add("modal-card-img");
    image.src = obterImagemPokemon(dados, true);
    image.alt = "Imagem do Pokémon " + dados.name;

    const typeContainer = criarTiposPokemon(dados);
    typeContainer.classList.add("modal-card-types");

    const verDetalhes = document.createElement("button");
    verDetalhes.textContent = "Ver detalhes";
    verDetalhes.classList.add("modal-btn");

    front.appendChild(header);
    front.appendChild(image);
    front.appendChild(typeContainer);
    front.appendChild(verDetalhes);

    const infoTitle = document.createElement("h3");
    infoTitle.textContent = "Informações";

    const height = document.createElement("p");
    height.textContent = "Altura: " + formatarAltura(dados.height);

    const weight = document.createElement("p");
    weight.textContent = "Peso: " + formatarPeso(dados.weight);

    const abilitiesTitle = document.createElement("h4");
    abilitiesTitle.textContent = "Habilidades";

    const abilitiesList = document.createElement("ul");

    const habilidades = dados.abilities.map(function(item) {
        return item.ability.name;
    });

    habilidades.forEach(function(habilidade) {
        const item = document.createElement("li");
        item.textContent = formatarTexto(habilidade);
        abilitiesList.appendChild(item);
    });

    const detailsLink = document.createElement("a");
    detailsLink.href = "pokemon.html?id=" + dados.id;
    detailsLink.textContent = "Ver página completa";
    detailsLink.classList.add("details-link");
    detailsLink.dataset.pokemonId = dados.id;

    const voltar = document.createElement("button");
    voltar.textContent = "Voltar";
    voltar.classList.add("modal-btn");

    back.appendChild(infoTitle);
    back.appendChild(height);
    back.appendChild(weight);
    back.appendChild(abilitiesTitle);
    back.appendChild(abilitiesList);
    back.appendChild(detailsLink);
    back.appendChild(voltar);

    verDetalhes.addEventListener("click", function() {
        front.classList.add("hidden");
        back.classList.add("active");
    });

    voltar.addEventListener("click", function() {
        back.classList.remove("active");
        front.classList.remove("hidden");
    });

    modalPokemonCard.appendChild(front);
    modalPokemonCard.appendChild(back);

    modalCard.appendChild(modalPokemonCard);
}

// Carregamento inicial
function carregarPokemonsIniciais() {
    limparCards();

    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(dadosLista) {
            const promessas = dadosLista.results.map(function(pokemon) {
                return fetch(pokemon.url)
                    .then(function(resposta) {
                        return resposta.json();
                    });
            });

            Promise.all(promessas)
                .then(function(listaCompleta) {
                    listaCompleta.forEach(function(dadosPokemon) {
                        criarCardPokemon(dadosPokemon);
                    });
                });
        });
}

// Sequência a partir de um ID
function carregarSequenciaPokemons(inicio, quantidade, substituir = true) {
    if (substituir) {
        limparCards();
    }

    const promessas = [];

    for (let i = 0; i < quantidade; i++) {
        const id = inicio + i;

        const promessa = fetch("https://pokeapi.co/api/v2/pokemon/" + id)
            .then(function(resposta) {
                if (!resposta.ok) {
                    throw new Error("Pokémon não encontrado");
                }

                return resposta.json();
            });

        promessas.push(promessa);
    }

    Promise.all(promessas)
        .then(function(listaCompleta) {
            listaCompleta.forEach(function(dadosPokemon) {
                criarCardPokemon(dadosPokemon);
            });
        })
        .catch(function() {
            alert("Erro ao carregar a sequência de Pokémon.");
        });
}

// Busca
searchForm.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const valorDigitado = searchInput.value.trim().toLowerCase();

    if (valorDigitado === "") {
        alert("Digite o nome ou número de um Pokémon.");
        return;
    }

    fetch("https://pokeapi.co/api/v2/pokemon/" + valorDigitado)
        .then(function(resposta) {
            if (!resposta.ok) {
                throw new Error("Pokémon não encontrado");
            }

            return resposta.json();
        })
        .then(function(dadosPokemon) {
            abrirModal(dadosPokemon);
            limiteAtual = dadosPokemon.id + 9;
            carregarSequenciaPokemons(dadosPokemon.id, 10, true);
        })
        .catch(function() {
            alert("Pokémon não encontrado.");
        });
});

// Carregar mais
function carregarMaisPokemons() {
    const inicio = limiteAtual + 1;
    const quantidade = 10;

    carregarSequenciaPokemons(inicio, quantidade, false);

    limiteAtual += quantidade;
}

loadMoreBtn.addEventListener("click", function() {
    carregarMaisPokemons();
});

// Inicialização
carregarPokemonsIniciais();