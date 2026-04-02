const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

const pokemonDetails = document.getElementById("pokemon-details");

if (!pokemonId) {
    pokemonDetails.innerHTML = "<p>Nenhum Pokémon selecionado.</p>";
    throw new Error("ID não informado");
}

function formatarNomePokemon(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function formatarNumeroPokemon(id) {
    return "#" + String(id).padStart(3, "0");
}

function formatarNomeStat(nome) {
    const mapa = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Sp. Attack",
        "special-defense": "Sp. Defense",
        speed: "Speed"
    };

    return mapa[nome] || nome;
}

function formatarTexto(texto) {
    return texto
        .split("-")
        .map(function(parte) {
            return parte.charAt(0).toUpperCase() + parte.slice(1);
        })
        .join(" ");
}

function formatarAltura(height) {
    return (height / 10).toFixed(1) + " m";
}

function formatarPeso(weight) {
    return (weight / 10).toFixed(1) + " kg";
}

function obterImagemPokemon(dados) {
    return (
        dados.sprites.other["official-artwork"].front_default ||
        dados.sprites.other.dream_world.front_default ||
        dados.sprites.front_default
    );
}

function extrairEvolucoes(chain) {
    const evolucoes = [];
    let atual = chain;

    while (atual) {
        evolucoes.push(atual.species.name);
        atual = atual.evolves_to[0];
    }

    return evolucoes;
}

function criarCardEvolucao(dados) {
    const nome = formatarNomePokemon(dados.name);
    const numero = formatarNumeroPokemon(dados.id);
    const imagem = obterImagemPokemon(dados);

    return `
        <a href="pokemon.html?id=${dados.id}" class="evolution-card">
            <p class="evolution-number">${numero}</p>
            <img src="${imagem}" alt="Imagem do Pokémon ${nome}" class="evolution-img" loading="lazy">
            <h4 class="evolution-name">${nome}</h4>
        </a>
    `;
}

fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        return resposta.json();
    })
    .then(function(dados) {
        const nome = formatarNomePokemon(dados.name);
        const numero = formatarNumeroPokemon(dados.id);
        const imagem = obterImagemPokemon(dados);

        const tipos = dados.types.map(function(item) {
            return item.type.name;
        });

        const habilidades = dados.abilities.map(function(item) {
            return item.ability.name;
        });

        const stats = dados.stats.map(function(item) {
            const nomeStat = formatarNomeStat(item.stat.name);
            const valorStat = item.base_stat;

            return `
                <div class="stat-item">
                    <div class="stat-top">
                        <span class="stat-name">${nomeStat}</span>
                        <span class="stat-value">${valorStat}</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${(Math.min(valorStat, 180) / 180) * 100}%"></div>
                    </div>
                </div>
            `;
        }).join("");

        pokemonDetails.innerHTML = `
            <article class="details-card">
                <div class="details-header">
                    <h2>${nome}</h2>
                    <p>${numero}</p>
                </div>

                <img src="${imagem}" alt="Imagem do Pokémon ${nome}" class="details-img">

                <div class="details-types">
                    ${tipos.map(function(tipo) {
                        return `<span>${tipo}</span>`;
                    }).join("")}
                </div>

                <div class="details-info">
                    <p><strong>Altura:</strong> ${formatarAltura(dados.height)}</p>
                    <p><strong>Peso:</strong> ${formatarPeso(dados.weight)}</p>
                </div>

                <div class="details-abilities">
                    <h3>Habilidades</h3>
                    <ul>
                        ${habilidades.map(function(habilidade) {
                            return `<li>${formatarTexto(habilidade)}</li>`;
                        }).join("")}
                    </ul>
                </div>

                <div class="details-stats">
                    <h3>Stats</h3>
                    ${stats}
                </div>

                <div class="details-evolutions">
                    <h3>Evoluções</h3>
                    <div id="evolution-chain">Carregando evoluções...</div>
                </div>
            </article>
        `;

        return fetch(dados.species.url);
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(speciesData) {
        return fetch(speciesData.evolution_chain.url);
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(evolutionData) {
        const nomesEvolucoes = extrairEvolucoes(evolutionData.chain);

        const promessasEvolucoes = nomesEvolucoes.map(function(nome) {
            return fetch("https://pokeapi.co/api/v2/pokemon/" + nome)
                .then(function(resposta) {
                    return resposta.json();
                });
        });

        return Promise.all(promessasEvolucoes);
    })
    .then(function(listaEvolucoes) {
        const evolutionChain = document.getElementById("evolution-chain");

        evolutionChain.innerHTML = listaEvolucoes
            .map(function(pokemon) {
                return criarCardEvolucao(pokemon);
            })
            .join("");
    })
    .catch(function() {
        pokemonDetails.innerHTML = "<p>Pokémon não encontrado.</p>";
    });