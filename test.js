var unirest = require('unirest');
var config = require('./config.json');
const octokit = require('@octokit/rest')()

var Request = unirest.post(config.tenon.tenonInstanceDomain + '/api/index.php')
  .send({
    key: config.tenon.apiKey,
    projectID: config.tenon.projectID,
    url: 'http://www.google.com' // In the real world you're going to want to pass each url in some other way
  }).end(function(response) {


  octokit.authenticate({
    type: 'token',
    token: config.github.token
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
        'Density: ' + response.body.resultSummary.density.allDensity + '%\n' +
        'Total Issues: ' + response.body.resultSummary.issues.totalIssues + '\n' +
        'Level A Issues: ' + response.body.resultSummary.issuesByLevel.A.count + '\n' +
        'Level AA Issues: ' + response.body.resultSummary.issuesByLevel.AA.count + '\n' +
        'Level AAA Issues: ' + response.body.resultSummary.issuesByLevel.AAA.count + '\n' +
        'See the full response at: ' + config.tenon.tenonInstanceDomain + '/history.php?responseID=' + response.body.request.responseID + '\n';

      var issue = {
        user: config.github.user,
        repo: config.github.repo,
        owner: config.github.owner,
        title: response.body.resultSummary.issues.totalIssues + ' ' + config.github.issueSummaryPre + ' ' + response.body.request.url,
        body: fullIssueDescription
      };

      octokit.issues.create(issue, function(err, response) {
        console.log(JSON.stringify(response, null, 4));
      });
    }
  });
