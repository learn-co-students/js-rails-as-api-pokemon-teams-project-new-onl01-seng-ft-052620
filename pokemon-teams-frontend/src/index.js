const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const POKEMON_URL = `${BASE_URL}/pokemon`
const main = document.querySelector('main')
document.addEventListener('DOMContentLoaded', () => {
  catchTrainers()

})

function addPokemonToTrainer(e) {
  const ul = e.target.nextSibling
  const trainerID = e.target.dataset.trainerId
  sendForPokemonAssignment(trainerID, ul)
  
  
}
function sendForPokemonAssignment(trainerId, ul) {
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: trainerId })
  }
  
  fetch(POKEMONS_URL, configObj)
  .then( response => response.json())
  .then( pokemon => createPokemon(pokemon, ul))
}
function createPokemon(pokemon, ul) {
    const li = document.createElement('li')
    li.innerHTML += `${pokemon.nickname} (${pokemon.species}) <button class='release' data-pokemon-id=${pokemon.id}>Release</button></li>`
    ul.appendChild(li)
    const btn = document.querySelector('.release')
    btn.addEventListener('click', removePokemon)
  
}  
function removePokemon(e) {
  fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
    method: 'DELETE'
  })
  e.target.parentElement.parentElement.removeChild(e.target.parentElement)
  
}
    
function createTrainerCard(trainer, i) {
    const div = document.createElement('div')
      div.classList.add('card')
      div.setAttribute('data-id', `${i +1 }`)
      main.appendChild(div)
    const p = document.createElement('p')
      p.innerText = trainer.name  
      div.appendChild(p)
    const trainerBtn = document.createElement('BUTTON')
      trainerBtn.setAttribute('data-trainer-id', `${trainer.id}`)
      trainerBtn.innerText = 'Add Pokemon'
      div.appendChild(trainerBtn)
      trainerBtn.addEventListener('click', addPokemonToTrainer)
    const ul = document.createElement('ul')
      div.appendChild(ul)
    
    trainer.pokemons.forEach( pokemon => createPokemon(pokemon, ul)
    
    )
}

async function catchTrainers() {
  const response = await fetch(TRAINERS_URL);
  const json = await response.json(); 
  json.forEach( (trainer, i) => createTrainerCard(trainer, i))

}