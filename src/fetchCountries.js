export const fetchCountries = searchQuery => {
  return fetch(
    `https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
