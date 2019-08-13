document.addEventListener('DOMContentLoaded', () => {

    
    const form = document.getElementById("github-form")
    form.addEventListener('submit', () => {
        event.preventDefault()
        const nameValue = document.getElementById('search').value
        
        fetch(`https://api.github.com/search/users?q=${nameValue}`)
            .then( res =>res.json() )
            .then(displayUserInfo)
    })

    function displayUserInfo(userInfo){
    
        userInfo.items.forEach(userInfoTemplate)
    }

    function userInfoTemplate(user){
        const nameValue = document.getElementById('search').value
        const ul = document.getElementById('user-list')

        if( nameValue.toLowerCase() == user.login.toLowerCase() ){
            ul.innerHTML = `
            <li>Username: ${ user.login }</li>
            <li>Avatar: <img src = ${ user.avatar_url }></li>
            <li>Profile: <a href = "${ user.html_url }">${ user.html_url }</a></li>
            `
        }

        ul.addEventListener('click', () => {
            fetch(`https://api.github.com/users/${user.login}/repos`)
                .then(res =>res.json())
                .then(listRepos)
        })
    }

    function listRepos(repos) {
        const ul = document.getElementById('repos-list')
        repos.forEach(repo => {
            li = document.createElement('li')
            li.innerText = `${repo.name}`
            ul.append(li)
        })
    }

})