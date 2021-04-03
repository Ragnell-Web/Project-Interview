function getProjects() {
  return fetch(`../data/projects.json`)
    .then((resp) => resp.json())
    .then((resp) => resp);
}

function getDetails(id) {
  return fetch(`../data/${id}.json`)
    .then(resp => resp.json())
    .then(resp => resp);
}

async function runningProgram() {
  const projects = await getProjects();
  document.querySelector(`#listProjects`).innerHTML = updateProjects(projects);
}

function updateProjects(projects) {
  return projects
    .map((project) => {
      return showProjects(project);
    })
    .join(``);
}

function showProjects(project) {
  return /*html*/ `
      <div class="col-md-4 my-3 thumbnail">
          <div class="card">
            <img src="${project.image}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${project.name}</h5>
              <p class="card-text">${project.description}</p>
              <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#Moviedetailmodal" data-id="${project.id}">Selanjutnya</a>
            </div>
          </div>
        </div>
  `;
}

runningProgram();

const container = document.querySelector(`#projects .container`);
container.addEventListener(`click`, async function (e) {
  if (e.target.classList.contains(`modal-detail-button`)) {
    const projects = await getDetails(e.target.dataset.id);
    document.querySelector(`.modal-body`).innerHTML = updateDetails(projects);
  }
});

function updateDetails(projects) {
  const project = showDetails(projects);
  return project
}

function showDetails(project) {
  return /*html*/ `
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-6">
                    <img src="${project.image}" class="img-fluid">
                  </div>
                  <div class="col-md">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${project.name}</h4></li>
                      <li class="list-group-item"><strong>Description : </strong>${project.description}</li>
                      <li class="list-group-item"><strong>Lebih Lengkap : </strong><a href="${project.link}" target="_blank" class="btn btn-primary">Lihat Disini</a></li>
                    </ul>
                  </div>
                </div>
              </div>
  `;
}

function randomBg() {
  setInterval(() => {
    let random = Math.round(Math.random() * 5) + 1;
    const jumbotron = document.querySelector(`.jumbotron`)
    jumbotron.style.backgroundImage = `url(../img/bg/${random}.jpg)`
  }, 5000);
};

randomBg();

function timeNow() {
  let d = new Date();
  let tgl = d.getDate();

  let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum&#39;at", "Sabtu"];
  let h = d.getDay();
  let b = d.getMonth();
  let t = d.getFullYear();

  document.getElementById("thisDate").innerHTML = days[h] + ", " + tgl + " " + months[b] + " " + t;
}

timeNow()

const scriptURL = "https://script.google.com/macros/s/AKfycbyAdcgp9MHagnogb3BMc2xRumHlr0IRXcFRlxYp9yhPynG7qyBSWkinBhITrzEJVvdy/exec";
const form = document.forms["submit-to-google-sheet"];
const submitBtn = document.querySelector(`.btn-submit`)
const loadingBtn = document.querySelector(`.btn-loading`)
const myAlert = document.querySelector(`.my-alert`)

form.addEventListener("submit", (e) => {
  e.preventDefault();

  loadingBtn.classList.toggle(`d-none`);
  submitBtn.classList.toggle(`d-none`)
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      loadingBtn.classList.toggle(`d-none`);
      submitBtn.classList.toggle(`d-none`);
      myAlert.classList.toggle(`d-none`)
      // reset form
      form.reset();
      console.log("Success!", response)
    })
    .catch((error) => console.error("Error!", error.message));
});

const containerNav = document.querySelector(`nav div.container`);
const navLink = document.querySelectorAll(`.nav-link`)
containerNav.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`nav-link`)) {
    for (const nav of navLink) {
      nav.classList.remove(`active`);
      // akan menghapus setiap class active
      // dari tiap navlink satu2
    };
    e.target.classList.add(`active`)
  }
})

window.addEventListener(`scroll`, function (e) {
  let wScroll = Math.round(this.scrollY);
  
  const jumbotronImg = document.querySelector(`.jumbotron img`);
  jumbotronImg.style.transform = `translate(0, ${wScroll / 4}%)`;

  const jumbotronH1 = document.querySelector(`.jumbotron h1`);
  jumbotronH1.style.transform = `translate(0, ${wScroll / 2}%)`;

  const jumbotronP = document.querySelector(`.jumbotron p`);
  jumbotronP.style.transform = `translate(0, ${wScroll / 1.2}%)`;

  const sectionProjects = document.querySelector(`#projects`);
  if (wScroll > sectionProjects.offsetTop-250) {
    const thumbnails = sectionProjects.querySelectorAll(`.thumbnail`)
    thumbnails.forEach((thumbnail, i) => {
      setTimeout(() => {
        thumbnail.classList.add(`active`);
      }, 500* (i+1));
    });
  }

  const about = document.querySelector(`#about`);
  if (wScroll > about.offsetTop-200) {
    about.querySelector(`.left-paragraph`).classList.add(`show`);
    about.querySelector(`.right-paragraph`).classList.add(`show`)
  }
 })