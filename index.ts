import { App } from "@slack/bolt";

console.log({
  slackToken: !!process.env.SLACK_TOKEN,
  slackAppToken: !!process.env.SLACK_APP_TOKEN,
});

const app = new App({
  token: process.env.SLACK_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.message(async (event) => {
    if (event.payload.subtype) return;
    if (event.payload.user !== 'U0BP2G0BZFH') return;

    await event.say("mrauwwwww");
})

await app.start();
