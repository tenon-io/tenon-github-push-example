# README

This is example code only! Use it to see one example of how you could use Tenon to push to Github issues.

## What this does
This example code will use the Tenon.io test API to assess a specific URL (defined on Line 9 of `test.js`) for accessibility errors. It takes the response from Tenon.io and creates an issue within Github.

## How to use
Download all of the code or clone the repo.

Once you've configured this properly, you can open up the project folder, open up terminal, and run the following command:

```
node test.js
```

It will test a web page and log a new issue in Github.

## Setup
### You need Github
Obviously you're going to need your own Github account for this. We recommend creating a dummy project for this so you don't pollute a real project. You also need a Github username and token. It might be wise to create a special account just for this purpose so you can keep track of things better.

#### How to get a Github access token
Navigate to https://github.com/settings/tokens and then activate the button labelled "Generate New Token". Then, activate the checkbox for "repo - Full control of private repositories".  This creates the access token you need to create issues with the API.

### Make sure you have an API key
If you aren't already a Tenon.io user, you'll need to [register first](https://www.tenon.io/register.php)

If you are a Tenon.io user, you're going to need to [grab your API key](https://www.tenon.io/apikey.php).

### Configure

The next step is to configure it so you can use it. Open up `config.example`, modify it as needed, and save it as `config.json`.

Here is an example of the `config.json` file

```
{
  "tenon": {
    "tenonInstanceDomain": "https://tenon.io",
    "apiKey": "YOUR API KEY",
    "projectID": "YOUR PROJECT ID",
  },
  "github": {
    "version": "3.0.0",
    "debug": true,
    "protocol": "https",
    "host": "api.github.com",
    "pathPrefix": "",
    "timeout": 5000,
    "token": "YOUR TOKEN",
    "user": "YOUR GITHUB USERNAME",
    "repo": "YOUR REPO NAME",
    "issueSummaryPre": "Accessibility issues found at",
    "issueDescriptionPre": "Tenon found accessibility issues:"
  }
}

```

### Tenon section
The Tenon section contains only 3 options:

* `tenonInstanceDomain`: leave this to https://tenon.io unless you're an Enterprise or Private Cloud customer. In such cases you just need to swap out this value for your Tenon instance.
* `apiKey`: enter your API key here.
* `projectID`: enter the projectID you'll be using here. Ideally you should use a project that is storing the results on Tenon. For more information on setting up a project in Tenon [watch this video](https://tenon.io/documentation/videos/18-projects.php)

### Github section
The Github section contains 7 options.

* `version`: This is the Github API version to use. You should leave to `3.0.0`
* `debug`: This should be a boolean value, `true` or `false`
* `protocol`: what protocol to use to connect. You should probably leave it to `https`
* `host`: unless you have a Github Enterprise instance, leave this to `api.github.com`
* `pathPrefix`: This is relevant only for some Github Enterprise instances. Should be blank for Github.com
* `timeout`: Timeout, in milliseconds to wait for a response. The default of `5000`, or 5 seconds, should suffice.
* `token`: the Github token generated earlier
* `user`: the Github user that will be logging the issues
* `repo`: the Github repository into which the issues will be logged
* `issueSummaryPre`: This is the beginning part of the issue summary
* `issueDescriptionPre`: This is the beginning part of the issue description. It will be followed by some issue data

## Install

Once you've downloaded/ cloned the code in this repository, run:

```npm install```

This will install all of the dependencies.


## Run

Assuming everything is installed and configured properly, go into your Terminal/ command line and type

```
node test.js
```

You should see a response that looks like this:

```
Status:
200
Response ID:
4e28b9c0917ee160be6d08fbc6af4bc0
Total Issues:
11
Result URL:
https://tenon.io/history.php?responseID=4e28b9c0917ee160be6d08fbc6af4bc0
```
And the full API response from Github's API

### Response explanation

The response you'll see come back is just the result of logging a bunch of stuff to console.

* Status: This is the [response code from Tenon](http://tenon.io/documentation/understanding-response-codes.php)
* Response ID: This is the [response ID from Tenon](http://tenon.io/documentation/json-response-overview.php)
* Total issues: This is a count of the total issues found by Tenon
* Result URL: This is the URL you can go to in order to view the results. NOTE: [this depends on your project being set to "Store" results](http://tenon.io/documentation/understanding-request-parameters.php)
* response from github. This will include 3 important bits of information: the `id` which is the numeric ID of the new issue, `key` which is the key of the new issue (which includes the project key), and `self` which is the URL you can go to if you want to view the new issue.

## Next steps

This should put you well on your way toward being able to put this in use at your organization. The reason we created this is to show how easy it is to add a Tenon integration with other systems.

Chances are the first thing you'd want to do is use a Node module like [`tenon-node`](https://www.npmjs.com/package/tenon-node) to do your testing, because it is made specifically to work with Tenon.

Also, there are a couple of things to consider when trying to integrate with an issue tracking system. The most important consideration is how you define an "Issue".  Tenon finds an average of 40 issues per page. On very bad sites it could be even worse. We once saw 9567 issues on one page that used HTML generated by MS Word. Creating one github issue for every issue in Tenon's response is probably not a good idea.  Instead, here are some other ideas:

* Use [`tenon-reporters`](https://www.npmjs.com/package/tenon-reporters) to generate a CSV file that you can attach to the github issue.
* Group the issues by `tID`. [Each issue](http://tenon.io/documentation/understanding-issue-reports.php) has a `tID`, which represents the specific ID of the test criteria that failed. This would be a pretty effective way of handling issues like missing form labels, which would fail the same test and therefore be grouped into the same github issue.


If you need any help or guidance on getting Tenon integrated with your issue tracking system or other development-related system, give us a shout: talktous@tenon.io
