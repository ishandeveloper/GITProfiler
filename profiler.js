document.querySelector('.learn-btn').addEventListener('click', profileClick);

document.querySelector('#user-search').addEventListener('keypress',function (e){
    if(e.key=='Enter'){
        var username = $('#user-search').val();
        profiler(username);
    }
});


function profileClick(){
var username = $('#user').val();
    profiler(username);
}
function profiler(username) {

    
    $.ajax({
        url: 'https://api.github.com/users/' + username,
        data: {
            client_id: '351ee579f0e3cda091cc',
            client_secret: '7e37d1b77e3c0b9000d7d4b7918c2ce965309b4c'
        }
    }).done(function (user) {
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            data: {
                client_id: '351ee579f0e3cda091cc',
                client_secret: '7e37d1b77e3c0b9000d7d4b7918c2ce965309b4c',
                sort: 'updated',
            }
        }).done(function (repos) {
            $.each(repos, function (index, repo) {
                $('#repo-list').append(`
                <a id="repo-link" target="_blank" href="${repo.html_url}"><div class="repo-card col-md-5">
                <span class="repo-name">
                ${repo.name}
                </span>
                <br>
                <span class="repo-des">
                ${repo.description}
                </span>
                <div class="repo-info">
                    <div class="highlight lang">${repo.language}</div>
                    <div class="highlight">Stars : ${repo.stargazers_count}</div>
                    <div class="highlight">Forks : ${repo.forks_count}</div>
                </div></a>
                `);
            });
        });
        $('#results').html(`
        <center>
        <div class="user-profile row">
            <div class="col-md-6">
                <div class="profile-picture">
                    <img src="${user.avatar_url}" alt="" s
                        class="user-profile-picture"><br>
                    <center>
                    <a href="${user.html_url}" target="_blank"><button class="profile-btn">
                        <i class="fa fa-github" aria-hidden="true"></i> View Profile
                        </button></a>
                        <button class="profile-btn">
                            <i class="fa fa-briefcase" aria-hidden="true"></i>  ${user.company}
                        </button></center>

                </div>
            </div>
            <div class="col-md-6">
                <div class="username">
                    <span class="highlight">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        &nbsp;&nbsp;${user.location}
                    </span><br>
                    <span class="main">${user.name}</span> 
                    <!-- <span class="highlight">  <i class="fa fa-briefcase" aria-hidden="true"></i>  ${user.company}</span> -->
                </div>
                <div class="user-bio">${user.bio}</div>
                <br>
                <div class="repo-stats">
                    <div class="repo highlight">Public Repositories : ${user.public_repos}</div>
                    <div class="repo highlight">Public Gists : ${user.public_gists}</div>
                </div>
                <div class="stats">
                    <div class="highlight">Followers : ${user.followers}</div>
                    <div class="highlight">Following : ${user.following}</div>
                </div>
                <div class="membership">
                    Member Since ${user.created_at.split('T')[0]}
                </div>
            </div>
        </div>
    </center>
    <center>
    <div class="repo-container">
        <div class="title">Latest Repositories</div>
        <div id="repo-list" class="row repo-cards-container">
            
            </div>
        </div>    
    </div>
</center>
        `);
    });
    document.querySelector('.nav-desk').classList.remove('inactive');
    document.querySelector('.hero-main').classList.add('inactive');
}