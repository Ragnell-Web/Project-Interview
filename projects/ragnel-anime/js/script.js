function getAnime(isi) {
  return fetch(`https://api.jikan.moe/v3/search/anime?q=${isi}&page=1&limit=20`)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.status === 404) {
        throw new Error(resp.message);
      }
      return resp.results;
    })
}

function getEpisode(id) {
  return fetch(`https://api.jikan.moe/v3/anime/${id}/episodes`)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.episodes.length === 0) {
        throw new Error(/*html*/`<h1 class="text-center">Bukan Series</h1>`)
      }
      return resp.episodes;
    })
}

const input = document.querySelector(`#input-keyword`);
const button = document.querySelector(`#search-button`);

async function runningProgram() {
  try {
    const animes = await getAnime(input.value);
    document.querySelector(`#list-anime`).innerHTML = updateAnime(animes);
    input.value = ``;
  } catch (err) {
    const isiAlert = /*html*/`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${err}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    document.querySelector(`.alert-error`).innerHTML = isiAlert;
  }
}

button.addEventListener(`click`, function (e) {
  runningProgram()
});

input.addEventListener(`keyup`, function (e) {
  if (e.code === `Enter`) {
    runningProgram();
  };
})

function updateAnime(animes) {
  return animes.map(anime => {
    return showAnime(anime)
  }).join(``)
};

function showAnime(anime) {
  return /*html*/`
        <div class="col-md-4 my-3">
          <div class="card">
            <img src="${anime.image_url}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${anime.title}</h5>
              <h6 class="card-subtitle mb-2">${anime.score}</h6>
              <h6 class="card-subtitle mb-2">${anime.episodes} Episode</h6>
              <p class="card-text">${anime.synopsis}</p>
              <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#Moviedetailmodal" data-id="${anime.mal_id}">See Episode</a>
            </div>
          </div>
        </div>
  `
}

const container = document.querySelector(`.isi-konten`);
container.addEventListener(`click`, async function (e) {
  if (e.target.classList.contains(`modal-detail-button`)) {
    try {
      const episodes = await getEpisode(e.target.dataset.id);
      document.querySelector(`.modal-body`).innerHTML = updateEpisode(episodes);
    } catch (err) {
      let isiError = /*html*/`
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md">
                    ${err}
                  </div>
                </div>
              </div>
      `
      document.querySelector(`.modal-body`).innerHTML = isiError;
    }
  }
});

function updateEpisode(episodes) {
  return episodes.map(episode => {
    return showEpisode(episode)
  }).join(`<br>`)
};

function showEpisode(episode) {
  return /*html*/ `
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${episode.title}</h4></li>
                      <li class="list-group-item"><strong>Episode : </strong>${episode.episode_id}</li>
                      <li class="list-group-item"><strong>Judul Jepang : </strong>${episode.title_japanese}</li>
                      <li class="list-group-item"><strong>Judul Romaji : </strong>${episode.title_romanji}</li>
                      <li class="list-group-item"><strong>Video : </strong>${episode.video_url}</li>
                      <li class="list-group-item"><strong>Forum : </strong>${episode.forum_url}</li>
                    </ul>
                  </div>
                </div>
              </div>
  `
}

