# Pokédex Web

Uma Pokédex interativa desenvolvida com **HTML, CSS e JavaScript**, consumindo dados da **PokéAPI**.
O projeto permite buscar Pokémon, visualizar detalhes em um modal, navegar por uma página completa com estatísticas e explorar a linha evolutiva.

Este projeto foi desenvolvido como prática de **consumo de API, manipulação de DOM e construção de interfaces interativas**, consolidando conceitos fundamentais de front-end.

---

# Demonstração

Funcionalidades principais da aplicação:

* Visualização de Pokémon em cards
* Busca por **nome ou número**
* Modal com informações rápidas
* Página completa de detalhes
* Estatísticas com barras visuais
* Linha evolutiva clicável
* Carregamento progressivo de Pokémon
* Navegação fluida na interface

---

# Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**
* **PokéAPI**

API utilizada:

```
https://pokeapi.co
```

---

# Estrutura do projeto

```
pokedex/
│
├── index.html
├── pokemon.html
│
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   └── pokedex.css
│   │
│   ├── js/
│   │   ├── script.js
│   │   └── pokemon.js
│   │
│   └── images/
```

### Arquivos principais

**index.html**

Página principal com:

* header
* barra de busca
* grid de cards
* botões de navegação
* modal de detalhes

---

**pokemon.html**

Página individual que mostra:

* imagem oficial do Pokémon
* tipos
* altura e peso
* habilidades
* estatísticas
* linha evolutiva

---

**script.js**

Controla toda a lógica da página principal:

* busca de Pokémon
* carregamento inicial
* criação de cards
* abertura do modal
* carregamento progressivo da lista

---

**pokemon.js**

Responsável pela página de detalhes:

* leitura do parâmetro `id` da URL
* busca de dados completos do Pokémon
* renderização de informações
* construção da linha evolutiva

---

**pokedex.css**

Estilização principal da interface:

* layout da grade
* cards
* modal
* página de detalhes
* responsividade

---

# Funcionalidades implementadas

## Grid dinâmica de Pokémon

A página inicial carrega automaticamente **10 Pokémon**.

Cada card apresenta:

* nome
* número
* imagem
* cor baseada no tipo principal

---

## Busca por nome ou número

O usuário pode pesquisar um Pokémon pelo campo de busca.

Exemplos válidos:

```
pikachu
25
charizard
```

Ao buscar um Pokémon:

* o modal abre automaticamente
* a lista é reorganizada a partir dele

---

## Modal de detalhes

Ao clicar em um card da lista, um modal é exibido contendo:

### Frente

* nome
* número
* imagem oficial
* tipos

### Verso

* altura
* peso
* habilidades
* link para a página completa

---

## Página completa do Pokémon

A página `pokemon.html` exibe informações mais detalhadas.

Conteúdo exibido:

* imagem oficial
* tipos
* altura
* peso
* habilidades
* estatísticas
* linha evolutiva

---

## Estatísticas com barras

As estatísticas do Pokémon são exibidas visualmente:

* HP
* Attack
* Defense
* Special Attack
* Special Defense
* Speed

Cada stat possui uma **barra proporcional ao valor base**.

---

## Linha evolutiva

A aplicação busca a cadeia evolutiva da API e mostra os Pokémon em sequência.

Cada evolução possui:

* número
* imagem
* nome
* link para a página completa

Assim o usuário pode navegar pela evolução de forma interativa.

---

## Carregar mais Pokémon

O botão **Carregar mais** adiciona novos Pokémon à lista.

A aplicação mantém controle do último Pokémon carregado para continuar a sequência.

---

## Reiniciar lista

O botão **Reiniciar lista**:

* limpa a busca
* fecha o modal
* retorna para os **10 primeiros Pokémon**

---

## Voltar ao topo

Quando o usuário rola a página, aparece um botão para voltar ao topo com rolagem suave.

---

# Responsividade

A interface foi adaptada para diferentes tamanhos de tela.

### Desktop

Grid responsiva com múltiplas colunas.

### Tablet

Grid com duas colunas.

### Mobile

Layout com:

* uma coluna
* botões empilhados
* imagens ajustadas

---

# Conceitos aplicados

Este projeto explora diversos conceitos importantes de front-end:

### JavaScript

* consumo de APIs com `fetch`
* manipulação de DOM
* uso de `Promise.all`
* tratamento de erros
* eventos de interface
* leitura de parâmetros de URL

---

### CSS

* variáveis com `:root`
* layout com **Grid**
* efeitos de **hover**
* responsividade com **media queries**
* controle de modal

---

### Arquitetura

Separação clara entre:

* **estrutura (HTML)**
* **estilo (CSS)**
* **lógica (JavaScript)**

---

# Aprendizados do projeto

Durante o desenvolvimento foram explorados diversos desafios comuns em aplicações front-end:

* trabalhar com dados de APIs externas
* organizar código JavaScript em funções reutilizáveis
* lidar com requisições assíncronas
* evitar sobrescrita de elementos no DOM
* estruturar CSS de forma escalável
* resolver problemas reais de layout e responsividade

---

# Melhorias futuras

Algumas melhorias que podem evoluir o projeto:

* filtro por tipo de Pokémon
* paginação completa
* animação de transição no modal
* modo escuro
* navegação entre Pokémon na página de detalhes
* indicador de carregamento (loading state)

---

# Autor

**Tainara Martins**

Futura desenvolvedora front-end interessada em criar experiências digitais claras, funcionais e acessíveis.

Áreas de interesse:

* Front-end
* UI/UX
* EdTech
* aplicações voltadas para educação

---

# Licença

Este projeto é de uso educacional e pode ser utilizado para estudo e prática de desenvolvimento front-end.
*Houve auxílio da IA em algumas etapas do projeto (responsividade e lógica)
