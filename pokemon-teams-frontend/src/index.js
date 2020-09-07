const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(object => object.forEach(trainerCards))
};

function trainerCards(trainer){
    let div = document.createElement('div')
        div.classname = "card"
        div.id = trainer.id
        div.setAttribute("data-id", trainer.id);
    let addBtn = document.createElement("button")
        addBtn.className = "add"
        addBtn.innerText = "Add Pokemon"
        addBtn.addEventListener('click', ()=>{
            addPokemon(addBtn.parentNode)
        });
    let trainerName = document.createElement('h3')
        trainerName.textContent = trainer.name 
    let ul = document.createElement('ul')

    trainerPokeLi(trainer, ul)

    div.appendChild(trainerName)
    div.appendChild(addBtn)
    div.appendChild(ul)
    main.appendChild(div)
};

function trainerPokeLi(trainer, ul) {
    ul.innerHTML = ""
    let li = document.createElement('li')
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        let releaseBtn = document.createElement('button')
        li.textContent = `${pokemon.nickname} (${pokemon.species})`
        releaseBtn.className = "release"
        releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
        releaseBtn.innerText = "Release"
        releaseBtn.addEventListener('click', ()=>{
            releasePokemon(releaseBtn.getAttribute("data-pokemon-id"))
        })
        li.appendChild(releaseBtn)
        ul.appendChild(li)
    })
}

function releasePokemon(id){
    let pokeId = `${POKEMONS_URL}/${id}`
    fetch(pokeId, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }
    })
    .then(function(resp){
        return resp.json();
    })
    .then(function(object){
        let card = document.getElementById(object.id)
        let ul = card.querySelector('ul')
        listTrainersPokemon(object, ul)
    })
    .catch(function(error){
        alert("Error Occurred");
        console.log(error.message);
    });
};

function addPokemon(trainerCard){
    let id = trainerCard.getAttribute('data-id')
    let trainersId = `${TRAINERS_URL}/${id}`
        fetch(trainersId, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
        "Accept": "application/json"
            }
        })
        .then(function(resp) {
           return resp.json(); 
        })
        .then(function(object){
            let card = document.getElementById(object.id)
            let ul = card.querySelector('ul')
            listTrainersPokemon(object, ul)
        })
        .catch(function(error){
            alert("Error Occurred");
            console.log(error.message);
        });
};
