# Slack Rain Clouds Rader (雨雲レーダー) App on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/seratch/slack-rain-clouds-rader/tree/master)

## Slack ⚡️ Bolt

A framework to build Slack apps, fast.

* https://slack.dev/bolt
* https://github.com/SlackAPI/bolt

## Yahoo! JAPAN 雨雲レーダー表示 API

* https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html#exp_weather

## How to build

### Create a Slack App

https://api.slack.com/apps

* Features > OAuth & Permissions:
  * Scopes:
    * "files:write:user"
  * Click "Save Changes"
* Features > Slash Commands:
  * Click "Create New Command"
    * Command
      * Set `/amesh`
    * Request URL
      * Set `https://{your app name}.herokuapp.com/slack/events`
    * Short Description
      * Set something helpful for users
    * Click "Save"
* Features > Bot User:
  * Click "Add a Bot User"
  * Click "Add Bot User"
* Settings > Install App:
  * Complete "Install App"

### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/seratch/slack-rain-clouds-rader/tree/master)

* Set env variables on Heroku
  * (Slack) Settings > Basic Information > App Credentials > Siginging Secret
  * (Slack) Settings > Install App > Bot User OAuth Access Token
  * (Yahoo! JAPAN) Application ID (https://e.developer.yahoo.co.jp/dashboard/)

[![Heroku deployment page](https://raw.githubusercontent.com/seratch/slack-rain-clouds-rader/master/deploy_to_heroku.png)](https://heroku.com/deploy?template=https://github.com/seratch/slack-rain-clouds-rader/tree/master)
