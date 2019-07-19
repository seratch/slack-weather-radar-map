# Japan Weather Radar Map (雨雲レーダー) on Slack

This is a working example app which displays Japan weather radar maps on Slack. This application is built with [Bolt⚡️](https://github.com/SlackAPI/bolt) and [Yahoo! JAPAN Static Map API (雨雲レーダー表示)](https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html#exp_weather).

## Setup

Use node 10.13+ and its corresponding npm.

```
vi .firebaserc # set your own project

npm install -g firebase-tools
cd functions
npm i
cp -p _config.js src/config.js # and modify src/config.js
cd -
```

## How to deploy

```bash
firebase deploy --only functions
```

## How to configure Slack apps/GCP

### Slack App

Set `https://{your domain}.cloudfunctions.net/slack/events` as the Request URL for event subscriptions.

### Cloud Functions for Firebase

You have nothing to configure. Don't forget enabling billing info if it's your first time to use it.

## LICENSE

The MIT License