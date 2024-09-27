
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let main = () => document.querySelector('main')
/////////////////////////////////////////////////////Variable declarations above ///////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM parsed")
    getTeams()

    function getTeams(){
        return fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(obj => displayTeams(obj))
    }

})

///////////////////////////////////////////////////////ENTRY POINT ^^^^^^^^^^^^^^^^^^/////////////////////////////////////////////////////


function displayTeams(teams){
    teams.forEach(team => {
        let button = document.createElement('button')
        let ul = document.createElement('ul')
        let p = document.createElement('p')
        let div = document.createElement('div')

        div.classList.add("card")
        div.setAttribute("data-id", team.id)
        p.textContent = team.name
        button.textContent = "Add chinpokomon"
        button.setAttribute("data-trainer-id", team.id)

        button.addEventListener("click", function(e){
            e.preventDefault
            addPokemon(team)
        })

        main().appendChild(div)
        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(ul)

        team.pokemons.forEach(poke => {
            let li = document.createElement('li')
            ul.appendChild(li)
            li.textContent = `${poke.nickname} (${poke.species})`
            let release = document.createElement("button")
            release.classList.add("release")
            release.textContent = "Release"
            release.id = "poke-" + poke.id
            li.appendChild(release)
            release.addEventListener("click", function(e){
                e.preventDefault()
                deletePokemon()

                function deletePokemon(){
                    fetch(`${POKEMONS_URL}/${poke.id}`, {
                        method: "DELETE", 
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    release.parentElement.remove()
                }

            })
})

        })     
}

function addPokemon(team){
    fetch(POKEMONS_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({trainer_id: team.id})
    })
    .then(resp => resp.json())
    .then(obj => console.log(obj))

}





