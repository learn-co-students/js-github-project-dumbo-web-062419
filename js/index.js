document.addEventListener("DOMContentLoaded", function(){

const gForm = document.getElementById("github-form");
const userList = document.getElementById("user-list");
const userRepos = document.getElementById("repos-list");

function renderUser(user){
  let newUser = document.createElement("li");
  newUser.innerHTML += `
    <h5 data-id='${user.id}' class='a_user'>${user.login}</h5>
    <img src='${user.avatar_url}' width="100" height="100">
  `;
  userList.append(newUser);
}

function renderRepo(repo){
  let newRepo = document.createElement("li");
  newRepo.innerHTML = `
  <a href='${repo.html_url}'>${repo.html_url}</a>
  `;
  userRepos.append(newRepo);
}

gForm.addEventListener("submit", function(){
  event.preventDefault();
  fetch(`https://api.github.com/search/users?q=${document.getElementById("search").value}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(res => res.json())
  .then(userData => {
    userData.items.forEach(function(user){
    renderUser(user);
  })})
})

userList.addEventListener("click", function(){
  if(event.target.classList.contains('a_user')){
    fetch(`https://api.github.com/users/${event.target.innerText}/repos`,{
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(res => res.json())
    .then(userRepos => {
      userRepos.forEach(function(repo){
        renderRepo(repo);
      })
    })
  }
})


  // end of DOMContentLoaded
})
