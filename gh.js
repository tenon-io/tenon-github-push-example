var GitHubApi = require("github");


var github = new GitHubApi({
    version: "3.0.0",
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com unless you have enterprise
    pathPrefix: "", // relevant for some GHEs; blank for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "Tenon.io" // GitHub is happy with a unique user agent
    }
});


github.authenticate({
    type: "oauth",
    token: "887570a9e1a6c322d97e6ced620451e1d98d4bb2"
});

var issue = {
    user: 'karlgroves',
    repo: 'tenon-github-push-example',
    title: 'OMGWTFBBQ',
    body: 'THIS IS AN ISSUE'
};


github.issues.create(issue, function(err, res) {
    console.log(JSON.stringify(res));
});
