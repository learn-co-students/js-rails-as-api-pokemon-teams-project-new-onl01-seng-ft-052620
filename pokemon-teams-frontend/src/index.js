const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

 document.addEventListener("DOMContentLoaded", function(){

    fetchTrainers()

 })

 function fetchTrainers() {
     fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(function(obj){
            renderTrainers(obj)
        })
 }

 function renderTrainers(trainers) {
    const main = document.querySelector('main')

    for (const trainer of trainers) {
        const div = createTrainerDiv(trainer)

        main.append(div)
    }
 }
 
 function createTrainerDiv(trainer){
    const div = document.createElement('div')
    div.classList.add("card")
    div.setAttribute("data-id",trainer.id)

    const p = document.createElement('p')
    p.innerHTML = trainer.name
    div.append(p)

    const button = document.createElement('button')
    button.innerHTML = "Add Pokemon"
    button.setAttribute('data-trainer-id',trainer.id)
    button.addEventListener('click', function(e){
        addPokemon(e)
    })
    div.append(button)
    
    const ul = document.createElement('ul')
    
    for (const pokemon of trainer.pokemons) {
        const li = createPokemonLi(pokemon)
        ul.appendChild(li)
    }

    div.append(ul)

    return div
 }

 function createPokemonLi(pokemon){
    const li = document.createElement('li')
    li.innerHTML = pokemon.nickname + " (" + pokemon.species + ") "

    const button = document.createElement('button')
    button.classList.add('release')
    button.innerHTML = 'Release'
    button.setAttribute('data-pokemon-id', pokemon.id)
    button.addEventListener('click', function(e){
        releasePokemon(e)
    })

    li.append(button)

    return li
 }

 function addPokemon(e) {
    body = {
        trainer_id: e.target.getAttribute("data-trainer-id")
    }

    configObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    fetch(POKEMONS_URL,configObj)
        .then(resp => resp.json())
        .then(function(obj){
            e.target.parentNode.querySelector('ul').append(createPokemonLi(obj))
        })
        .catch(error => console.log("Can not add more Pokemon!"))
 }

 function releasePokemon(e){
     configObj = {
         method: "DELETE"
     }

     fetch(POKEMONS_URL+`/${e.target.getAttribute("data-pokemon-id")}`, configObj)
        .then(resp => resp.json())
        .then(function(obj){
            const li = e.target.parentNode
            const ul = li.parentNode

            ul.removeChild(li)
        })
        .catch(error => console.log(error))
 }