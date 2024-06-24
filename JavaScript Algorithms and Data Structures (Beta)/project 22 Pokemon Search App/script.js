const inputData = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const nameElement = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const type = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defense");
const specAttack = document.getElementById("special-attack");
const specDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const imageDiv = document.getElementById("image");
const URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";



const displayData = (pokemonData) => {
    console.log(pokemonData);
    imageDiv.innerHTML = `<img src="${pokemonData.sprites.front_default}" width="350px" alt=${pokemonData.name} id="sprite">`
    nameElement.textContent = `${pokemonData.name}`;
    id.textContent = `${pokemonData.id}`;
    weight.textContent= `${pokemonData.weight}`;
    height.textContent = `${pokemonData.height}`;
    type.innerHTML = ``;
    pokemonData.types.forEach(t => {
        //console.log(t.name);
        type.innerHTML += `<div id="type">${t.type.name}</div>`;
    })
    hp.textContent = `${pokemonData.stats[0].base_stat}`;
    attack.textContent = `${pokemonData.stats[1].base_stat}`;
    defence.textContent = `${pokemonData.stats[2].base_stat}`;
    specAttack.textContent = `${pokemonData.stats[3].base_stat}`;
    specDefense.textContent = `${pokemonData.stats[4].base_stat}`;
    speed.textContent = `${pokemonData.stats[5].base_stat}`;
    
    
}

const getPokemon = () => {
    const findPokemon = inputData.value
    if (!findPokemon) {
        alert('Please enter a pokemon id or Name');
        return;
    }
    if (Number(findPokemon)){
        fetch(URL+findPokemon)
        .then(res => res.json())
        .then(data => {
            displayData(data);
        })
        .catch((error) => {
            console.error(error);
            alert('Pokémon not found');
        });
        return;
    }
    let name = findPokemon.toLowerCase();
    name = name.replace(' ','-');
    console.log(name);
    fetch(URL+name)
        .then(res => res.json())
        .then(data => {
            displayData(data);
        })
        .catch((error) => {
            console.error(error);
            alert('Pokémon not found');
        });
        return;
}

searchBtn.addEventListener('click', getPokemon);