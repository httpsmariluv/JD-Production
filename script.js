const pokedex = document.getElementById('pokedex');


const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 898; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites['front_default'],
      type: result.types.map((type) => type.type.name).join(', '),
      id: result.id,
      weigh: result.weight,
      statistics: result.stats.map((stat) => stat.stat.name).join(', '),
      ability: result.abilities.map((ability) => ability.ability.name).join(', '),
      speed: result.stats[0].base_stat,
      spDef: result.stats[1].base_stat,
      spAtk: result.stats[2].base_stat,
      def: result.stats[3].base_stat,
      atk: result.stats[4].base_stat,
      hp: result.stats[5].base_stat
    }));
    displayPokemon(pokemon);
  });
};


const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `

            <div class="card">
              <img src="${pokeman.image}" class="card-img-top " alt="...">
              <div class="card-body ">
                <h5 class="card-title ">${pokeman.id}. ${pokeman.name}</h5>
                <p class="card-text ">Type: ${pokeman.type}</p>
              </div>
              <ul class="list-group list-group-flush ">
                <li class="list-group-item ">Weight: ${pokeman.weigh}</li>
                <li class="list-group-item ">Ability: ${pokeman.ability}</li>
                <li class="list-group-item ">HP: ${pokeman.hp}</li>
                <li class="list-group-item ">Attack: ${pokeman.atk}</li>
                <li class="list-group-item ">Defense: ${pokeman.def}</li>
                <li class="list-group-item ">Speed: ${pokeman.speed}</li>

              </ul>

            </div>
    `

    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

function search_pokemon() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('card');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";
        }
    }
}
