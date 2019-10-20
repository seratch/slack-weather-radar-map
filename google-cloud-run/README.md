# Japan Weather Radar Map (雨雲レーダー) on Slack

This is a working example app which displays Japan weather radar maps on Slack. This application is built with [Bolt⚡️](https://github.com/SlackAPI/bolt) and [Yahoo! JAPAN Static Map API (雨雲レーダー表示)](https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html#exp_weather).

## `/amesh {prefecture name}`

This command instantly posts the present moment image.

<img src="https://raw.githubusercontent.com/seratch/slack-weather-radar-map/master/images/demo_amesh_tokyo_now.gif" height=400/>

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

### Deploy to Google Cloud Run

```
gcloud config set project ${GCLOUD_PROJECT_ID}
gcloud config set run/region asia-northeast1

gcloud builds submit --tag gcr.io/${GCLOUD_PROJECT_ID}/weather-radar

export GCLOUD_PROJECT_ID={something-great-12345}
export SLACK_SIGNING_SECRET={abcabcabcabcabcbabc}
export SLACK_BOT_TOKEN={xoxb-1234123412-123412341212-abcabcabc}
export YAHOO_JAPAN_API_CLIENT_ID={abcabcabcabcabcabcabcabcabcabcabcabc}

gcloud beta run deploy weather-radar \
  --image gcr.io/${GCLOUD_PROJECT_ID}/weather-radar \
  --platform managed \
  --update-env-vars \
SLASH_COMMAND_NAME=tenki,\
SLACK_SIGNING_SECRET=${SLACK_SIGNING_SECRET},\
SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN},\
YAHOO_JAPAN_API_CLIENT_ID=${YAHOO_JAPAN_API_CLIENT_ID},\
YAHOO_JAPAN_API_MAP_MODE-=map,\
TZ=Asia/Tokyo
```

```
$ gcloud beta run deploy weather-radar \
>   --image gcr.io/${GCLOUD_PROJECT_ID}/weather-radar \
>   --platform managed \
>   --update-env-vars \
> SLASH_COMMAND_NAME=tenki,\
> SLACK_SIGNING_SECRET=${SLACK_SIGNING_SECRET},\
> SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN},\
> YAHOO_JAPAN_API_CLIENT_ID=${YAHOO_JAPAN_API_CLIENT_ID},\
> YAHOO_JAPAN_API_MAP_MODE-=map,\
> TZ=Asia/Tokyo

Deploying container to Cloud Run service [weather-radar] in project [something-great-12345] region [asia-northeast1]
✓ Deploying... Done.
  ✓ Creating Revision...
  ✓ Routing traffic...
Done.

Service [weather-radar] revision [weather-radar-********] has been deployed and is serving 100 percent of traffic at https://weather-radar-********-an.a.run.app
````
