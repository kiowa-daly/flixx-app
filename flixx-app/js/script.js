const globalState = { currentPage: window.location.pathname };

//async function display popular movies
async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `        
    <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
  `;
    document.getElementById('popular-movies').appendChild(div);
  });
}
//Display 20 most tv shows
async function displayPopularShows() {
  const { results } = await fetchApiData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `        
    <a href="tv-details.html?id=${show.id}">
    ${
      show.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air Date: ${show.first_air_date}</small>
      </p>
    </div>
  `;
    document.getElementById('popular-shows').appendChild(div);
  });
}
// Fetch data from TMDB Api
async function fetchApiData(endpoint) {
  const API_KEY = '6a74c9f27ac1bcc2f731331e1f1d4835';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  try {
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();
    hideSpinner();
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
//Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === globalState.currentPage) {
      link.classList.add('active');
    }
  });
}
//Init app
function init() {
  switch (globalState.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
