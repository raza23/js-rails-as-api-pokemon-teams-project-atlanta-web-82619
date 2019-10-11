const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

function remove(id) {
  return fetch(`http://localhost:3000/pokemons/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {
      console.log('Deleted:', res.message)
      return res
    })
    .catch(err => console.error(err))
}


function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(resp => resp.json())
}

function renderTrainers() {
  getTrainers()
  .then(function(trainers) {
    // console.log(trainers)
    //iterate over trainers
    trainers.forEach(function(trainer) {
      // make a card
      
      
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', `${trainer.id}`)
      const p = document.createElement('p');
      p.innerText = `${trainer.name}`;
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
        .then(resp=> resp.json())
        .then(pokemon => console.log(pokemon))
        
      })
      // pokemon added into db after clicking button, but doesn't show up on page until I refresh it
      const list = document.createElement('ul');
      //make list and make list item for each pokemon
      // debugger
      trainer.pokemons.forEach(function(pokemon) {
        const listItem = document.createElement('li');
        listItem.innerText = `${pokemon.nickname} (${pokemon.species}) `;
        const releaseButton = document.createElement('button');
        releaseButton.classList.add('release');
        releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`);
        releaseButton.innerText = "Release";
        // add event listener to release button to delete pokemon when clicked
        releaseButton.addEventListener('click', function() {
          console.log(releaseButton.attributes[1].value)
        })
        listItem.appendChild(releaseButton);
        list.appendChild(listItem);
      })

      card.appendChild(p);
      card.appendChild(button);
      card.appendChild(list);
      main.appendChild(card);
      

    })
  })
}

renderTrainers();
