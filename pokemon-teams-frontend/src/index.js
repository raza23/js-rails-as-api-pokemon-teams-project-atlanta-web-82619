const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

function addPokemon(pokemon) {
  const listItem = document.createElement('li');
  listItem.innerText = `${pokemon.nickname} (${pokemon.species}) `;
  const releaseButton = document.createElement('button');
  releaseButton.classList.add('release');
  releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`);
  releaseButton.innerText = "Release";
  // add event listener to release button to delete pokemon when clicked
  releaseButton.addEventListener('click', function(e) {
    const pokemonId = releaseButton.attributes[1].value;
    fetch(POKEMONS_URL+ `/${pokemonId}`, {
      method: 'DELETE'
    })
    e.target.parentElement.remove();
  })
  listItem.appendChild(releaseButton);
  return listItem;
}


function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(resp => resp.json())
}

function renderTrainers() {
  getTrainers()
  .then(function(trainers) {
    //iterate over trainers
    trainers.forEach(function(trainer) {
      // make a card
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', `${trainer.id}`)
      const p = document.createElement('p');
      p.innerText = `${trainer.name}`;
      
      const list = document.createElement('ul');
      const button = document.createElement('button');
      
      button.setAttribute('data-trainer-id', `${trainer.id}`);
      button.innerText = "Add Pokemon";
      button.addEventListener('click', function(e) {
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            pokemon: {
              "trainer_id": `${button.attributes[0].value}`
            }
          })
        })
        .then(resp => {
          console.log(resp.ok);
          if (resp.ok) {
            return resp.json();
          } else {
            alert("You can't have more than 6 pokemon!")
          }
        })
        .then(function(pokemon) {
          return list.appendChild(addPokemon(pokemon))
        })
        .catch(function(error) {
          console.log(error);
        })
    
      })
      
      //make pokemon, then add it to list
      
      trainer.pokemons.forEach(function(pokemon) {
        list.appendChild(addPokemon(pokemon));
      })
      card.append(p, button, list); 
      main.appendChild(card);
    })
  })
}

renderTrainers();
