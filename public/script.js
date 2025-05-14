let countriesData = [];

fetch('/api/countries')
  .then(res => res.json())
  .then(data => {
    countriesData = data;
    renderCountries(countriesData);
  })
  .catch(err => {
    document.getElementById('countries').innerText = 'Error al cargar países';
    console.error(err);
  });

function renderCountries(data) {
  const container = document.getElementById('countries');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p>No se encontraron países.</p>';
    return;
  }

  data.forEach(country => {
    const div = document.createElement('div');
    div.className = 'country';
    div.innerHTML = \`
      <img src="\${country.flags?.png}" alt="Bandera de \${country.name?.common}">
      <div class="country-info">
        <strong>\${country.name?.common}</strong><br>
        Capital: \${country.capital ? country.capital[0] : 'N/A'}<br>
        Región: \${country.region}<br>
        <a href="https://www.google.com/maps?q=\${country.latlng?.join(',')}" target="_blank">📍 Ver en mapa</a>
      </div>
    \`;
    container.appendChild(div);
  });
}

function applyFilters() {
  const search = document.getElementById('search').value.toLowerCase();
  const region = document.getElementById('regionFilter').value;

  const filtered = countriesData.filter(country => {
    const nameMatch = country.name?.common?.toLowerCase().includes(search);
    const regionMatch = region === '' || country.region === region;
    return nameMatch && regionMatch;
  });

  renderCountries(filtered);
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search').addEventListener('input', applyFilters);
  document.getElementById('regionFilter').addEventListener('change', applyFilters);
  document.getElementById('searchButton').addEventListener('click', applyFilters);
});