let pokemons = [];
const search = document.getElementById("search");
const form = document.getElementById("form");

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151
const limit = 10
let offset = 0;

//Função que convert o model de pokemon na geração da listagem
function convertPokemonToLi(pokemon) {
    return `
    <div class="img-container> <img src="${pokemon.photo}"
                     alt="${pokemon.name}"></div>
           

        <div class="info">
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>

            <div class="stats">
            <h2>Stats</h2>
            <ul>${stat}</ul>
            <ul>${base}</ul>
            </li>
            
        </div>
    `;
}

//função de carrega os pokemons no Html
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


//função que carrega mais pokemons na página ao clicar no botão load
loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})