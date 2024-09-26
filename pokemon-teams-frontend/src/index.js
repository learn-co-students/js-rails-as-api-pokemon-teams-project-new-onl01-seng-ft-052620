const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = () => document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => {
    getTrainers();
})

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => 
        data.forEach(trainer => {
            trainerCard(trainer)
        })
    )
}

function trainerCard(trainer) {
    const div = document.createElement("div")
    div.classList.add("card")
    div.setAttribute("data-id", trainer.id)

    const p = document.createElement("p")
    p.innerText = trainer.name
    div.appendChild(p)

    const pokemonList = document.createElement("ul")

    const button = document.createElement("button")
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerText = "Add Pokemon"
    button.addEventListener("click", event => {
        addPokemon(event, pokemonList);
    })
    
    div.appendChild(button)

    

    for (const pokemon of trainer.pokemons) {
        listPokemon(pokemon, pokemonList)
    }
   
    div.appendChild(pokemonList)
    main().appendChild(div)
}

function listPokemon(pokemon, pokemonList) {
    const pokemonData = document.createElement("li")
    pokemonData.innerText = `${pokemon.nickname} (${pokemon.species})`

    const removeButton = document.createElement("button")
    removeButton.classList.add("release")
    removeButton.setAttribute("data-pokemon-id", pokemon.id)
    removeButton.innerText = "Release"
    removeButton.addEventListener("click", event => {
        releasePokemon(event);
    })

    pokemonData.appendChild(removeButton)
    pokemonList.appendChild(pokemonData)
    
}

function addPokemon(event, pokemonList) {
    const body = {
        trainer_id: event.target.getAttribute("data-trainer-id")
    }

    const configObj = {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body),
        }
    
    fetch(POKEMONS_URL, configObj)
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        listPokemon(data, pokemonList)
    })
    .catch(error => console.log(error.message))
}

function releasePokemon(event) {
    fetch(POKEMONS_URL + `/${event.target.getAttribute("data-pokemon-id")}`, {
        method: "DELETE"
    })
    .then(resp => {
        return resp.json();
    })
    .then(data => {
        event.target.parentNode.remove();
    })
    .catch(error => console.log(error))
}