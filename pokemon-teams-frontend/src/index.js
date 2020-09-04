const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', (event) => {
    pokemonInfoPost()
})



function getMain() {return document.querySelector('main')}
function getAddButton(){return document.getElementsByClassName("add")}



function pokemonInfoPost (){

    fetch(TRAINERS_URL)
    .then (response => response.json())
    .then(object => object.forEach(populateTrainerCards))

}

function populateTrainerCards(trainer) {
    let pokemonDiv = document.createElement("div")
    pokemonDiv.className = "card"
    pokemonDiv.id = trainer.id
    pokemonDiv.setAttribute("data-id", trainer.id);
    let addButton = document.createElement("button")
        addButton.setAttribute("data-trainer-id", trainer.id);
        addButton.className = "add"
        addButton.innerText = "Add Pokemon"
        addButton.addEventListener('click', ()=>{
            pokemonAdd(addButton.parentNode)
        })
        

    let trainerName = document.createElement("h3")
    trainerName.textContent = trainer.name 
    let pokemonUl = document.createElement("ul")

    listTrainersPokemon(trainer, pokemonUl)

    pokemonDiv.appendChild(trainerName)
    pokemonDiv.appendChild(addButton)
    pokemonDiv.appendChild(pokemonUl)
    let main = getMain()
    main.appendChild(pokemonDiv)
}

function listTrainersPokemon(trainer, ul) {
    ul.innerHTML = ""
    let eachPokemon = document.createElement('li')
    trainer.pokemons.forEach(pokemon => {
        let eachPokemon = document.createElement('li')
        let releaseButton = document.createElement("button")
        eachPokemon.textContent = `${pokemon.nickname} (${pokemon.species})`
        releaseButton.className = "release"
        releaseButton.setAttribute("data-pokemon-id", pokemon.id);
        releaseButton.innerText = "Release"
        releaseButton.addEventListener('click', ()=>{
            releasePokemon(releaseButton.getAttribute("data-pokemon-id"))
        })
        eachPokemon.appendChild(releaseButton)
        ul.appendChild(eachPokemon)
    })
}

function releasePokemon(id){
let pokemonId = `${POKEMONS_URL}/${id}`
    fetch(pokemonId, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        let card = document.getElementById(object.id)
        let ul = card.querySelector( "ul" )
        listTrainersPokemon(object, ul)
    })
    .catch(function(error) {
        alert("Error Occurred");
        console.log(error.message);
    });
    }


function pokemonAdd(trainerCard){
let id= trainerCard.getAttribute("data-id")
let trainersId = `${TRAINERS_URL}/${id}`
    fetch(trainersId, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        let card = document.getElementById(object.id)
        let ul = card.querySelector( "ul" )
        listTrainersPokemon(object, ul)
    })
    .catch(function(error) {
        alert("Error Occurred");
        console.log(error.message);
    });
}