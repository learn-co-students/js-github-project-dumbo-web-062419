document.addEventListener("DOMContentLoaded", function(){
    const search = document.getElementById('github-form')

    search.addEventListener('submit', function(){
        event.preventDefault()
        const searchValue = event.target.search.value;

        fetch(`https://api.github.com/search/users?q=${searchValue}`)
        .then(res => res.json())
        .then(listUser)
    })

    function listUser(data){
        // console.log(data.items)
        const userList = document.getElementById('user-list')
        const userLi = document.createElement('li') 
        userLi.innerHTML = `
        <h2>Username: ${data.items[0].login}</h2>
        <img src="${data.items[0].avatar_url}">`
        userList.append(userLi);
        const repoList = document.getElementById('repos-list')
        const repoLi = document.createElement('li')
        repoLi.classList = 'repo_url'
        repoLi.innerText = `${data.items[0].repos_url}`
        repoList.append(repoLi)
        repoList.addEventListener('click', function(e){
            if(e.target && e.target.nodeName == "LI"){
                console.log(event.target)
            }
        })
    }

})