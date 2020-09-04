const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", renderTrainers);

async function renderTrainers(){
    const promise = await fetch(TRAINERS_URL)
    const trainers = await promise.json();
    trainers.forEach(trainer => displayTeam(trainer))
}

function displayTeam(trainer) {
    const card = document.createElement("div")
    card.className = "card";
    card.id = trainer.id;
    const p = document.createElement("p");
    p.innerText = trainer.name;
    const button = document.createElement('button');
    button.dataset.trainerId = trainer.id;
    button.innerText = "Add Pokemon";
    button.addEventListener("click", e => addPokemon(e))
    const ul = document.createElement("ul");
    card.appendChild(p);
    card.appendChild(button)
    card.appendChild(ul);
    displayPokemon(trainer.pokemons, card)
    main.appendChild(card);
}


function displayPokemon(pokemons, card){
    pokemons.forEach(function(pokemon){
        const ul = card.querySelector('ul');
        const li = document.createElement('li');
        li.innerText = `${pokemon.nickname} (${pokemon.species})`;
        const button = document.createElement('button');
        button.addEventListener('click', e => releasePokemon(e));
        button.className = "release";
        button.innerText = "Release Pokemon"
        button.dataset.pokemonId = pokemon.id;
        li.appendChild(button);
        ul.appendChild(li);
      });
}

async function addPokemon(e){
    const configObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "trainer_id" : e.target.dataset.trainerId           
        })
    }
    const promise = await fetch(POKEMONS_URL, configObj);
    const pokemon = await promise.json();
    const array = [pokemon];
    displayPokemon(array, e.target.parentNode)
}

async function releasePokemon(e){
    const promise = await fetch(POKEMONS_URL + `/${e.target.dataset.pokemonId}`, {method: "DELETE"});
    e.target.parentNode.remove(); 
}