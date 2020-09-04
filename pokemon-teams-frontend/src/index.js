const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = () => document.querySelector('main')
document.addEventListener("DOMContentLoaded", function(e){
    fetchTrainers()
    e.preventDefault()
})
function fetchTrainers() {
    return fetch(TRAINERS_URL) 
    .then(resp => resp.json())
    .then(json => trainers(json))
 
  }



let trainers = (alltrainers) => {
    for (trainer of alltrainers)
    createCard(trainer) 
  
}

function createCard(trainer) {
    const button = document.createElement('button')
    const card = document.createElement('div')
    const p = document.createElement('p')
    const ul = document.createElement('ul')
    //Card and trainer
       card.className = 'card'
       main().appendChild(card)
       card.appendChild(button)
       card.appendChild(p)
      
       p.innerText = trainer.name
       button.innerText = 'Add Pokemon'
       button.addEventListener('click', function(){
        addPokemon(trainer)
   
       })
   //Pokemons
       for (pokemon of trainer.pokemons) {
       let li = document.createElement('li')
       let deleteButton = document.createElement('button')
       deleteButton.className = 'release'
       deleteButton.innerText = 'Release'
       deleteButton.addEventListener('click', deletePokemon)
         
       ul.appendChild(li)
       p.appendChild(ul)
       
       li.innerText = pokemon.nickname + ' ' + '(' + pokemon.species + ')' 
       li.appendChild(deleteButton)
       
       
    }
 }
          // POST - add pokemon
          function addPokemon(trainer, e){
            e.preventDefault()
            let strongParams = {
                trainer_id: trainer.id
            }
            let configObj = {
                method: 'POST',
                headers: {
                   "Content-Type": "application/json",
                   "Accept": "application/json"   
                },
                body: JSON.stringify(strongParams)
            }
          fetch(POKEMONS_URL, configObj)
          .then(resp => resp.json())
          .then(data => { 
           
            const p = document.createElement('p')
            const ul = document.createElement('ul')
            let li = document.createElement('li')
            let deleteButton = document.createElement('button')
            deleteButton.className = 'release'
            deleteButton.innerText = 'Release'
            deleteButton.addEventListener('click', deletePokemon)
                
       
              
            ul.appendChild(li)
            p.appendChild(ul)
            
            li.innerText = data.nickname + ' ' + '(' + data.species + ')' 
            li.appendChild(deleteButton)
            
          })
        }
          


      function deletePokemon(e) {
        this.id 
        this.parentNode 
      
        fetch(`http://localhost:3000/pokemons/${pokemon.id}` , {
          method: "DELETE"
        })
          .then(resp => {
            return resp.json();
          })
          .then(data => {
            this.parentNode.remove();
          })

      }


       

   //    :species, :nickname, :trainer_id  
    
  
 



    


    





     


 

