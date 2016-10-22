var unirest = require('unirest');
var config = require('./config.json');
var GitHubApi = require("github");

var Request = unirest.post(config.tenon.tenonInstanceDomain + '/api/index.php')
  .send({
    key: config.tenon.apiKey,
    projectID: config.tenon.projectID,
    url: 'http://www.google.com' // In the real world you're going to want to pass each url in some other way
  }).end(function(response) {

    var github = new GitHubApi({
      version: config.github.version,
      debug: config.github.debug,
      protocol: config.github.protocol,
      host: config.github.host,
      pathPrefix: config.github.pathPrefix,
      timeout: config.github.timeout
    });

    github.authenticate({
      type: "basic",
      username: 'karlgroves',
      password: 'I4m1r0nm4n'
    });

    console.log('Tenon Status:');
    console.log(response.body.status);

    console.log('Tenon Response ID:');
    console.log(response.body.request.responseID);

    console.log('Total Issues: ');
    console.log(response.body.resultSummary.issues.totalIssues);

    console.log('Tenon Result URL:');
    console.log(config.tenon.tenonInstanceDomain + '/history.php?responseID=' + response.body.request.responseID);

    if (response.body.status === 200) {

      var fullIssueDescription = config.github.issueDescriptionPre + '\n' +
        'Density: ' + response.body.resultSummary.density.allDensity + '\n' +
        'Total Issues: ' + response.body.resultSummary.issues.totalIssues + '\n' +
        'Level A Issues: ' + response.body.resultSummary.issuesByLevel.A.count + '\n' +
        'Level AA Issues: ' + response.body.resultSummary.issuesByLevel.AA.count + '\n' +
        'Level AAA Issues: ' + response.body.resultSummary.issuesByLevel.AAA.count + '\n' +
        'More at: ' + config.tenon.tenonInstanceDomain + '/history.php?responseID=' + response.body.request.responseID + '\n';

      var issue = {
        user: config.github.user,
        repo: config.github.repo,
        title: response.body.resultSummary.issues.totalIssues + ' ' + config.github.issueSummaryPre + ' ' + response.body.request.url,
        body: fullIssueDescription
      };

      github.issues.create(issue, function(err, response) {
        console.log(JSON.stringify(response, null, 4));
      });
    }
  });
