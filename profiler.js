document.querySelector('.learn-btn').addEventListener('click',profileClick);

function profileClick(){

    let username = $('#user').val();
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
                // per_page: 6
            }
        }).done(function(repos) {
            $.each(repos, function(index, repo) {
                $('#repos').append(`
                    <div class="card card-body bg-light">
                        <div class="row">
                            <div class="col-md-7">
                                <strong>${repo.name}</strong>: ${repo.description}
                            </div>
                            <div class="col-md-3">
                                <h5 class="badges"><span class="badge badge-info">Forks: ${repo.forks_count}</span></h5>
                                <h5 class="badges"><span class="badge badge-success">Stars: ${repo.stargazers_count}</span></h5>
                                <h5 class="badges"><span class="badge badge-dark">${repo.language}</span></h5>
                            </div>
                            <div class="col-md-2">
                                <a href="${repo.html_url}" target="_blank" class="btn btn-warning">Open Repo</a>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
        $('#results').html(`
            <div class="">  
            <br><br>
            <h3 class="page-header">Latest Repos</h3>
            <br>
            <div id="repos-wait"></div>  
            <br>
        `);
    });
    document.querySelector('.nav-desk').classList.remove('inactive');
    document.querySelector('.hero-main').classList.add('inactive');
}