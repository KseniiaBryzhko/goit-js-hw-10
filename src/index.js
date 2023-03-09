import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchInputEl.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);

function handleSearchCountry(event) {
  const searchQuery = event.target.value.toLowerCase().trim();
  console.log(searchQuery);

  if (!searchQuery) {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
    return;
  }

  fetchCountries(searchQuery)
    .then(result => {
      if (result.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      showFoundCountries(result);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
}

function showFoundCountries(result) {
  if (result.length >= 2 && result.length <= 10) {
    countryInfoEl.innerHTML = '';
    createCountryList(result);
  }
  if (result.length === 1) {
    countryListEl.innerHTML = '';
    createCountryCard(result);
  }
}

function createCountryList(result) {
  const countryList = result
    .map(({ name, flags }) => {
      return `<li class="country-list__item"><img src="${flags.svg}" alt="${name}" width="32" height="16">
  <p> ${name.official}</p></li>`;
    })
    .join('');
  countryListEl.innerHTML = countryList;
  console.log(countryList);
  return countryList;
}

function createCountryCard(result) {
  const countryInfo = result
    .map(({ name, capital, population, flags, languages }) => {
      languages = Object.values(languages);
      return `<div class="country-content"><img src="${flags.svg}" alt="${name}" width="32" height="16">
  <p class="country-name"> ${name.official}</p></div>
  <ul><li class="country-content-item">Capital: <span> ${capital}</span></li>
  <li class="country-content-item">Population: <span> ${population}</span></li>
  <li class="country-content-item">Languages: <span> ${languages}</span></li></ul>`;
    })
    .join('');
  countryInfoEl.innerHTML = countryInfo;
  return countryInfo;
}
