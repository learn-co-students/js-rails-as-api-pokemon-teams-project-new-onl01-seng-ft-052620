const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAX_POKEMONS = 6;

document.addEventListener('DOMContentLoaded', ()=>{
  let availablePokemon = [];
  const teamContainer = document.getElementById('team-container');
  teamContainer.addEventListener('click', (e)=> handleClicks(e.target));
  fetchTrainers();

  function fetchTrainers(){
    fetch("http://localhost:3000/trainers")
      .then(response => response.json())
      .then(json => displayTrainers(json))
      .catch(error => console.log(error.message));
  }

  function displayTrainers(trainersJson){
    for (const trainer of trainersJson){
      const trainerCard = buildTrainerCard(trainer);
      const pokemonList = document.createElement('ul');  
      trainerCard.appendChild(pokemonList);

      for (const pokemon of trainer.pokemons){
        buildPokemonListItem(pokemon, pokemonList);
      }
    }
  }

  function buildTrainerCard(trainer){
    teamContainer.innerHTML += `
        <div class="card" data-id="${trainer.id}">
          <p>Team ${trainer.name}</p>
        </div>
      `;

    const trainerCard = document.querySelector(`div[data-id="${trainer.id}"]`);
    const addPokemonBtn = document.createElement('button');
    addPokemonBtn.setAttribute("data-trainer-id", `${trainer.id}`);
    addPokemonBtn.textContent = "Add Pokemon";
    trainerCard.appendChild(addPokemonBtn);
    addPokemonBtn.addEventListener('click', ()=> addPokemon(trainer.id));
    return trainerCard;
  }

  function buildPokemonListItem(pokemon, pokemonList){
    const pokemonListItem = document.createElement('li');
    pokemonListItem.textContent = `${pokemon.nickname} (${pokemon.species})`;
    pokemonList.appendChild(pokemonListItem);

    const releaseBtn = document.createElement('button');
    releaseBtn.className = "release";
    releaseBtn.setAttribute('data-pokemon-id', `${pokemon.id}`);
    releaseBtn.textContent = 'Release';
    pokemonListItem.appendChild(releaseBtn);
  }

  function handleClicks(target){
    if (target.className == "release"){
      releasePokemon(target.getAttribute('data-pokemon-id'));
    } else if (target.textContent == "Add Pokemon"){
      addPokemon(target.getAttribute('data-trainer-id'));
    }
  }

  function addPokemon(trainerId){
    const trainerPokemonList = document.querySelector(`div.card[data-id="${trainerId}"] ul`);
    if (trainerPokemonList.childNodes.length < MAX_POKEMONS){
      const pokemonResponse = fetchAvailablePokemon();
      pokemonResponse.then(response => response.json())
        .then(json => {
          filterAvailablePokemon(json);
          if (availablePokemon.length){
            const pokemon = availablePokemon.shift();
            const apiResponse = updateApi(pokemon.id, trainerId);
            apiResponse.then(response => response.json())
              .then(json => buildPokemonListItem(json, trainerPokemonList))
              .catch(error => console.log(error.message));
          } else {
            alert("there are no available pokemon");
          }
        })
        .catch(error => console.log(error.message));
    } else {
      alert("your team is already full");
    }
  }

  function fetchAvailablePokemon(){
    return fetch("http://localhost:3000/pokemons")
  }

  function filterAvailablePokemon(pokemonJson){
    for (pokemon of pokemonJson){
      if (!pokemon.trainer_id){
        availablePokemon.push(pokemon);
      }
    }
  }

  function releasePokemon(pokemonId){
    const apiResponse = updateApi(pokemonId, "nil");
    apiResponse.then(response => response.json())
      .then(json => redisplayPokemon(json, pokemonId))
      .catch(error => console.log(error.message));
  }

  function redisplayPokemon(response, pokemonId){
    if (response.trainer_id == null){
      const pokemonListItem = document.querySelector(`li button[data-pokemon-id="${pokemonId}"]`).parentElement;
      pokemonListItem.remove();
    }
  }

  function updateApi(pokemonId, trainerId){
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({trainer_id: trainerId})
    };

    return fetch(`http://localhost:3000/pokemons/${pokemonId}`, configObj)
  }
});

//add event listeners dynamicaly
//on add, see if the trainer has max pokemon, see what pokemon are available (through api), and add if possible
//

