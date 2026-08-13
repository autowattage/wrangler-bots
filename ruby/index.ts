import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// /hb402b command
app.command('/hb402b', async ({ command, ack, say }) => {
  await ack();
  if (command.user_id != 'U06FMCCDS1K') return; // only i (bunnyguy) can use this command!
  await say(command.text);
});

await app.start();
