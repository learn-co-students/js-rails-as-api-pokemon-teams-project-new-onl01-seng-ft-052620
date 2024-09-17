const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')
const cards = () => document.querySelectorAll('card')
let trainers = []

document.addEventListener("DOMContentLoaded", function(e) {
    return fetch(`${TRAINERS_URL}`)
    .then(resp => resp.json())
    .then( function(json) {
        trainers = json
        displayTrainers(json) 
    })
})

function displayTrainers(trainers) {
    for (const trainer of trainers) {
        displayTrainer(trainer)
    }
}

function displayTrainer(trainer) {
    card = document.createElement('card')
    card.id = trainer.id
    main.appendChild(card)

    p = document.createElement('p')
    p.innerText = trainer.name
    card.appendChild(p)

    addPokemonButton = document.createElement('button')
    addPokemonButton.setAttribute("data-trainer-id", trainer.id)
    addPokemonButton.innerText = "Add Pokemon"
    card.appendChild(addPokemonButton)
    addPokemonButton.addEventListener("click", addPokemon)

    ul = document.createElement('ul')
    card.appendChild(ul)

    for (const pokemon of trainer.pokemons) {
        displayPokemon(pokemon)
    }
}

function displayPokemon(pokemon) {
    li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    ul.appendChild(li)

    releaseButton = document.createElement('button')
    releaseButton.setAttribute("data-pokemon-id", pokemon.id)
    releaseButton.className = "release"
    releaseButton.innerText = "Release"
    li.appendChild(releaseButton)
    releaseButton.addEventListener("click", releasePokemon)
}

function releasePokemon() {
    pokemon_id = this.getAttribute('data-pokemon-id')
    configurationObject = {
        method: "DELETE"
    }

    fetch(`${POKEMONS_URL}/${pokemon_id}`, configurationObject)
        .then(resp => resp.json())
        .then(json => this.parentNode.parentNode.removeChild(this.parentNode))
        .catch(error => console.log(error.message))
}

function addPokemon() {
    trainer = trainers.find(t => t.id == this.getAttribute("data-trainer-id"))
    if (trainer.pokemons.length < 6) {
        postPokemon(trainer)
    } else {
        alert("No more room in the team")
    }
}

function postPokemon(trainer) {
    let configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: `${trainer.id}`})
    }

    fetch(`${POKEMONS_URL}`, configurationObject)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            addToTrainerPokemon(json)
        })
        .catch(error => console.log(error.message))
}

function addToTrainerPokemon(pokemon) {
    trainerCard = cards()[`${pokemon.trainer_id - 1}`]
    ul = trainerCard.childNodes[2]
    displayPokemon(pokemon)
}