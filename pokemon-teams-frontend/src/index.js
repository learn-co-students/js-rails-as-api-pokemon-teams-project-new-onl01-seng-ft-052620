const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainers_area = document.getElementById('trainers')
const all_pokemon = []


document.addEventListener("DOMContentLoaded", function(event){

getTrainers()
getPokemon()

function getTrainers(){
fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => renderTrainers(json))
}

function getPokemon(){
fetch(POKEMONS_URL)
  .then(resp => resp.json())
  .then(json => renderPokemon(json))
}

function renderPokemon(pokemon){
for (var i = 0; i < pokemon.length; i++) {
  all_pokemon.push(pokemon[i])
 }
}


function renderTrainers(trainers){

  trainers.forEach((trainer, i) => {
    const div = document.createElement('div')
    div.className = 'card'
    div.id = `trainer-div-${trainer.id}`
    const p = document.createElement('p')
    p.textContent = `${trainer["name"]}`
    p.id = `trainer-name-${trainer.id}`
    const btn = document.createElement('BUTTON')
    btn.id = `${trainer.id}`
    btn.className = 'add'
    btn.textContent = 'Add Pokemon'
    const ul = document.createElement('ul')
    ul.id = `list-${trainer.id}`

    document.body.appendChild(div)
    div.appendChild(p)
    div.appendChild(btn)
    div.appendChild(ul)


    trainer['pokemon'].forEach((pokemon, i) => {
      const li = document.createElement('li')
      const release = document.createElement('BUTTON')
      const br = document.createElement('BR')
      li.id = `pokemon-${pokemon.id}`
      release.textContent = 'Release'
      release.className = 'release'
      release.id = `${pokemon.id}`
      ul.appendChild(li)
      li.textContent = `${pokemon.nickname} (${pokemon.species})`
      li.appendChild(br)
      li.appendChild(release)
    });
  });
  listenToButtons(trainers)
}

function listenToButtons(trainers){

  const rel_buttons = document.getElementsByClassName('release')

  for (var i = 0; i < rel_buttons.length; i++) {
    let button = rel_buttons[i]
    button.addEventListener('click', function(event){

      let trainer_div = event.target.parentNode.parentNode.parentNode
      let trainer_name = trainer_div.querySelector('p').innerText
      let pokemon_id = event.target.id
      dropPokemon(trainers, trainer_name, pokemon_id)
    })
  }


  const add_buttons = document.getElementsByClassName('add')
    for (var i = 0; i < add_buttons.length; i++) {
      let add_button =  add_buttons[i]
      add_button.addEventListener('click', function(event){
        let name_of_trainer = document.getElementById(`trainer-name-${event.target.id}`).textContent
        let list_of_pokemon = document.getElementById(`list-${event.target.id}`)
        if (list_of_pokemon.childNodes.length < 6) {
          addPokemon(event.target.id)
        }
      })
    }
}


function addPokemon(trainer_id){
  let random_pokemon = all_pokemon[Math.floor(Math.random() * all_pokemon.length)]
  let pokemon_name = random_pokemon["nickname"]
  let pokemon_species = random_pokemon['species']


  let formData = {
    nickname: `${pokemon_name}`,
    species: `${pokemon_species}`,
    trainer_id: `${trainer_id}`
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(POKEMONS_URL, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      appendPokemon(object, trainer_id);
    });

    function appendPokemon(object, trainer_id){
      const pokemon = object
      let li = document.createElement('li')
      li.id = `pokemon-${pokemon.id}`
      let ul = document.getElementById(`list-${trainer_id}`)
      const release = document.createElement('BUTTON')
      const br = document.createElement('BR')
      release.textContent = 'Release'
      release.className = 'release'
      release.id = `${pokemon.id}`
      ul.appendChild(li)
      li.textContent = `${pokemon.nickname} (${pokemon.species})`
      li.appendChild(br)
      li.appendChild(release)
    }

}

function dropPokemon(trainers, trainer_name, pokemon_id){

    for (var i = 0; i < trainers.length; i++) {
      let trainer = trainers[i]
      if(trainer["name"] == trainer_name){
        for (var i = 0; i < trainer["pokemon"].length; i++) {
          let pokemon = trainer["pokemon"][i]
          if(pokemon.id == pokemon_id){
            let pokemon_nickname = pokemon.nickname
            let pokemon_species = pokemon.species
            let trainer_id = trainer.id
            let formData = {
              nickname: `${pokemon_nickname}`,
              species: `${pokemon_species}`,
              trainer_id: `${trainer_id}`
            };

            let configObj = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(formData)
            };

            fetch(POKEMONS_URL+`/${pokemon_id}`, configObj)
            .then(function(response) {
              return console.log("Pokemon deleted");
            })
          }
        }
      }
    }
  let li = document.getElementById(`pokemon-${pokemon_id}`)
  li.remove()
}

})
