const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

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
