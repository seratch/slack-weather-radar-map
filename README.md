# Japan Weather Radar Map (雨雲レーダー) on Slack

This is a working example app which displays Japan weather radar maps on Slack. This application is built with [Bolt⚡️](https://github.com/SlackAPI/bolt) and [Yahoo! JAPAN Static Map API (雨雲レーダー表示)](https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html#exp_weather).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/seratch/slack-weather-radar-map/tree/master)

## `/amesh {prefecture name}`

This command posts an animated GIF showing the forecasting weather map.

<img src="https://raw.githubusercontent.com/seratch/slack-weather-radar-map/master/images/demo_amesh_hiroshima.gif" height=400/>

## `/amesh {prefecture name} now`

This command instantly posts the present moment image.

<img src="https://raw.githubusercontent.com/seratch/slack-weather-radar-map/master/images/demo_amesh_tokyo_now.gif" height=400/>

## `/amesh {prefecture name} today`

This command posts the transition of weather map in the last 24 hours.

<img src="https://raw.githubusercontent.com/seratch/slack-weather-radar-map/master/images/demo_amesh_okinawa_today.gif" height=400/>

## Map Mode

https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html#request-param

The defualt map mode is `map`. If you'd like to customize the appearance, set `YAHOO_JAPAN_API_MAP_MODE` env variable with either of the following values.

* map - 通常の地図
* photo - 航空写真
* map-b1 - 地下街
* hd - ハイビジョン地図
* hybrid - ハイブリッド地図
* blankmap - 白地図
* osm - Open Street Map

Here is the output with `hybrid` mode.

<img src="https://raw.githubusercontent.com/seratch/slack-weather-radar-map/master/images/demo_amesh_fukuoka_hybrid_mode.gif" height=300/>

## How to run this app

### Create a Slack App

https://api.slack.com/apps

* Features > OAuth & Permissions:
  * Scopes:
    * "bot"
    * "commands"
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

### Run the app on your laptop

```bash
# prep
nvm use 10.13.0 # Bolt runs on Node 10.13+
cp -p _env .env
vi .env
source .env
npm i

# run the app
npm run local

# on another terminal window
ngrok http 3000
```

### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/seratch/slack-weather-radar-map/tree/master)

* Set env variables on Heroku
  * (Slack) Slash command name: `amesh` or your favorite one
  * (Slack) Settings > Basic Information > App Credentials > Siginging Secret
  * (Slack) Settings > Install App > Bot User OAuth Access Token
  * (Yahoo! JAPAN) Application ID (https://e.developer.yahoo.co.jp/dashboard/)
  * (Yahoo! JAPAN) Static Map Mode (https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html#request-param)

<img src="https://raw.githubusercontent.com/seratch/slack-weather-radar-map/master/images/screenshot_heroku_deployment.png" width=500/>

### Run `/amesh` commands on Slack

```bash
/amesh # displays weather map for Tokyo area
/amesh osaka now # displays a single image for Osaka area
/amesh hokkaido today # displays the transition of weather map in the last 24 hours for Hokkaido area
```
