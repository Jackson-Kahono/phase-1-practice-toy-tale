let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    toys.map(toy => {
      renderToy(toy)
    })
  })

  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const likes = 0;
    const newToy = {
      name: name,
      image: image,
      likes: likes
    };
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(toy => {
    renderToy(newToy);
    })
  });
});

function renderToy(toy){
  let div = document.createElement("div");

  div.className = "card";
  let html = ''
  html += `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  `
  div.innerHTML = html;
  let button = document.createElement("button");
  button.className = "like-btn";
  button.id = toy.id;
  button.innerText = "Like <3";
  button.addEventListener("click", (e) => {
    e.preventDefault();
    likeToy(e);
  })
  div.appendChild(button);
  document.querySelector("#toy-collection").append(div)
}

function likeToy(e){
  const id = e.target.id;
  const likes = e.target.previousElementSibling.innerText;
  const newLikes = parseInt(likes) + 1;
  e.target.previousElementSibling.innerText = `${newLikes} Likes`;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
}


