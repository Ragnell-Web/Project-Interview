const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

function getCities() {
  return fetch(endpoint, { method: `get` })
  .then(result => result.json())
  .then(data => data);
};


async function filterCities(wordToMatch) {
  const places = await getCities();
  return places.filter(city => {
    // regex mengembalikan kata yang kita tuliskan
    const regex = new RegExp(wordToMatch, `gi`);
    // match mencari data yang terdapat tulisan yang berasal dari regex
    return city.city.match(regex) || city.state.match(regex);
  })
};

// merubah angka tanpa coma jadi dengan coma

function numberWithComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`)
}

const searchInput = document.querySelector(`.search`);
const suggestions = document.querySelector(`.suggestions`);

searchInput.addEventListener(`keyup`, async function() {
  const places = await filterCities(this.value);

  let matchCities = places.map(place => {
    const regex = new RegExp(this.value, `gi`);
    // mengubah nama place.city dari yang regex menjadi punya class
    const cityName = place.city.replace(regex, /*html*/`<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, /*html*/`<span class="hl">${this.value}</span>`)
    return /*html*/`
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${Number(place.population).toLocaleString()}</span>
    </li>
    `
  }).join(``);
  suggestions.innerHTML = matchCities;
});