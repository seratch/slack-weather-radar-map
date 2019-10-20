'use strict';
import { App, LogLevel } from '@slack/bolt';
import moment = require('moment-timezone');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.DEBUG
});
app.error(printCompleteJSON);

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ 雨雲レーダーアプリが起動しました ⛈️');
})();

const request = require('request-promise-native');
const yahooAppId = process.env.YAHOO_JAPAN_API_CLIENT_ID;
const yahooMapMode = process.env.YAHOO_JAPAN_API_MAP_MODE || 'map';
const slashCommandName = (process.env.SLASH_COMMAND_NAME || 'amesh').replace(/\//, '');

app.command(`/${slashCommandName}`, async ({ command, ack, context }) => {
    ack();

    const commandText = command.text.toLowerCase();
    const commandInputs = commandText ? commandText.split(/\s+/) : [];
    const prefectureName = commandInputs.length > 0 ? commandInputs[0] : 'tokyo';
    const prefecture = prefectures[prefectureName] || prefectures['tokyo'];
    const lat = prefecture.lat, lon = prefecture.lon;
    const width = 400, height = 300;
    const token = context.botToken;

    var m = moment().tz('Asia/Tokyo');
    const url = buildImageUrl({ lat, lon, width, height, m });
    console.log(`Image url: ${url}`);
    const req: Promise<Buffer> = request.get({ url: url, encoding: null });
    return req.then(image => uploadImage({
        token: token,
        channelId: command.channel_id,
        prefName: prefectureName,
        prefKanjiName: prefecture.kanjiName,
        file: image
    })).catch(console.log);
});

type ImageUrlArgs = {
    lat: number;
    lon: number;
    width: number;
    height: number;
    m: moment.Moment;
}
function buildImageUrl(args: ImageUrlArgs): string {
    return `https://map.yahooapis.jp/map/V1/static?appid=${yahooAppId}&z=10&lat=${args.lat}&lon=${args.lon}&width=${args.width}&height=${args.height}&mode=${yahooMapMode}&overlay=type:rainfall|datelabel:on|date:${args.m.format('YYYYMMDDHHmm')}`;
}

function printCompleteJSON(error: any): void {
    console.log(JSON.stringify(error));
}

type UploadImageArgs = {
    token: string;
    channelId: string;
    prefName: String;
    prefKanjiName: string;
    file: Buffer;
}
function uploadImage(args: UploadImageArgs): Promise<void> {
    return app.client.files.upload({
        token: args.token,
        title: `${args.prefKanjiName}付近の雨雲レーダーを表示しています`,
        file: args.file,
        filename: `amesh_${args.prefName}.png`,
        filetype: `image/png`,
        channels: args.channelId
    }).then(console.log);
}

class Prefecture {
    constructor(
        public kanjiName: string,
        public lat: number,
        public lon: number) { }
}
const prefectures: { [name: string]: Prefecture } = {
    hokkaido: new Prefecture('北海道', 43.06417, 141.34694),
    aomori: new Prefecture('青森県', 40.82444, 140.74),
    iwate: new Prefecture('岩手県', 39.70361, 141.1525),
    miyagi: new Prefecture('宮城県', 38.26889, 140.87194),
    akita: new Prefecture('秋田県', 39.71861, 140.1025),
    yamagata: new Prefecture('山形県', 38.24056, 140.36333),
    fukushima: new Prefecture('福島県', 37.75, 140.46778),
    ibaraki: new Prefecture('茨城県', 36.34139, 140.44667),
    tochigi: new Prefecture('栃木県', 36.56583, 139.88361),
    gunma: new Prefecture('群馬県', 36.39111, 139.06083),
    saitama: new Prefecture('埼玉県', 35.85694, 139.64889),
    chiba: new Prefecture('千葉県', 35.60472, 140.12333),
    tokyo: new Prefecture('東京都', 35.68944, 139.69167),
    kanagawa: new Prefecture('神奈川県', 35.44778, 139.6425),
    niigata: new Prefecture('新潟県', 37.90222, 139.02361),
    toyama: new Prefecture('富山県', 36.69528, 137.21139),
    ishikawa: new Prefecture('石川県', 36.59444, 136.62556),
    fukui: new Prefecture('福井県', 36.06528, 136.22194),
    yamanashi: new Prefecture('山梨県', 35.66389, 138.56833),
    nagano: new Prefecture('長野県', 36.65139, 138.18111),
    gifu: new Prefecture('岐阜県', 35.39111, 136.72222),
    shizuoka: new Prefecture('静岡県', 34.97694, 138.38306),
    aichi: new Prefecture('愛知県', 35.18028, 136.90667),
    mie: new Prefecture('三重県', 34.73028, 136.50861),
    shiga: new Prefecture('滋賀県', 35.00444, 135.86833),
    kyoto: new Prefecture('京都府', 35.02139, 135.75556),
    osaka: new Prefecture('大阪府', 34.68639, 135.52),
    hyogo: new Prefecture('兵庫県', 34.69139, 135.18306),
    nara: new Prefecture('奈良県', 34.68528, 135.83278),
    wakayama: new Prefecture('和歌山県', 34.22611, 135.1675),
    tottori: new Prefecture('鳥取県', 35.50361, 134.23833),
    shimane: new Prefecture('島根県', 35.47222, 133.05056),
    okayama: new Prefecture('岡山県', 34.66167, 133.935),
    hiroshima: new Prefecture('広島県', 34.39639, 132.45944),
    yamaguchi: new Prefecture('山口県', 34.18583, 131.47139),
    tokushima: new Prefecture('徳島県', 34.06583, 134.55944),
    kagawa: new Prefecture('香川県', 34.34028, 134.04333),
    ehime: new Prefecture('愛媛県', 33.84167, 132.76611),
    kochi: new Prefecture('高知県', 33.55972, 133.53111),
    fukuoka: new Prefecture('福岡県', 33.60639, 130.41806),
    saga: new Prefecture('佐賀県', 33.24944, 130.29889),
    nagasaki: new Prefecture('長崎県', 32.74472, 129.87361),
    kumamoto: new Prefecture('熊本県', 32.78972, 130.74167),
    oita: new Prefecture('大分県', 33.23806, 131.6125),
    miyazaki: new Prefecture('宮崎県', 31.91111, 131.42389),
    kagoshima: new Prefecture('鹿児島県', 31.56028, 130.55806),
    okinawa: new Prefecture('沖縄県', 26.2125, 127.68111)
};
prefectures['oosaka'] = prefectures['osaka'];
prefectures['ohsaka'] = prefectures['osaka'];
prefectures['nigata'] = prefectures['niigata'];
prefectures['hyougo'] = prefectures['hyogo'];
prefectures['kouchi'] = prefectures['kochi'];
prefectures['ooita'] = prefectures['oita'];
prefectures['ohita'] = prefectures['oita'];
