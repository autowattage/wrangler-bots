import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.message(async ({ event, message, say }) => {
    // if (event.payload.subtype) return;
    // if (event.payload.user == 'U0BPMSLGMBN') return; // self message
    // await event.say(`ts is ${event.body}`);

    // await event.say(`you said ${event.body.event["text"]} in ${event.body.event["channel"]}`);
})


// /hb402c command
app.command('/hb402c', async ({ command, ack, say }) => {
  await ack();
  if (command.user_id != 'U06FMCCDS1K') return; // only i (bunnyguy) can use this command!
  await say(command.text);
});

await app.start();
