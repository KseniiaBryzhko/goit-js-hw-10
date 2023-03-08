import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchInputEl.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);

function handleSearchCountry({ target }) {
  const searchQuery = target.value.toLowerCase().trim();
  console.log(searchQuery);

  fetchCountries(searchQuery)
    .then(createCountryCard)
    .catch(error => console.log(error));

  // if (!searchQuery) {
  //   countryInfoEl.innerHTML = '';
  //   return;
  // }

  // const foundCountry = countries.find(
  //   el => el.name.toLowerCase() === searchQuery
  // );

  // if (!foundCountry) {
  //   console.log('не знайдено');
  //   countryInfoEl.innerHTML = '';
  //   return;
  // }

  countryInfoEl.innerHTML = createCountryCard(foundCountry);
}

// searchInputEl.addEventListener('input', handleSearchCountry);

const createCountryCard = ({
  name,
  capital,
  population,
  flags,
  languages,
} = {}) => {
  const template = `<img src="${flags.svg}" alt="${name}" width="320" height="auto">
  <p> ${name.official}</p>
  <ul><li>Capital: <span> ${capital}</span></li>
  <li>Population: <span> ${population}</span></li>
  <li>Languages: <span> ${languages}</span></li></ul>`;
  return template;
};
