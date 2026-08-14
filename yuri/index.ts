import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.message(async ({ message, say }) => {
    // if (event.payload.subtype) return;
    if (message.channel != 'C0BNMQFQ6EQ') return; // only see messages in #wrangler-help
    if (message.user == 'U06FMCCDS1K') return; // ignore my messages
    let guessanswer = [];

    if (message.text.includes("shop")) {
      guessanswer.push("i heard something about the shop! you can find that at https://wrangler.hackclub.com/shop/ !");
    }
    if (message.text.includes("time") ||
        message.text.includes("track") ||
        message.text.includes("lapse") ||
        message.text.includes("lookout") ||
        message.text.includes("record")
    ) {
      guessanswer.push("i heard something about time tracking! have you checked out https://wrangler.hackclub.com/docs/time/ yet?")
    }
    if (message.text.includes("end") ||
        message.text.includes("day")
    ) {
      guessanswer.push("i think i heard something about wrangler's duration, which runs from August 10, 2026 to September 30, 2026!");
    }

    // initial message
    if (!message.thread_ts) {
      await say({
        text: "hi! I'm a simple help bot that tries to give you help before i (nick) can.\n(this is a shared slack account with Yuri, a robot i found while exploring.)",
        thread_ts: message.ts
      });
      if (!guessanswer[0]) {
        await say({
          text: `i coudn't figure out what you needed help with! <@U06FMCCDS1K> please respond soon!!!`,
          thread_ts: message.ts
        });
      }
    }
    // going through guesses
    if (guessanswer) {
      guessanswer.forEach(async function (guess, index) {
        await say({ text: guess, thread_ts: message.ts });
      });
    }
})

// /hb402c command
app.command('/hb402c', async ({ command, ack, say }) => {
  await ack();
  if (command.user_id != 'U06FMCCDS1K') return; // only i (bunnyguy) can use this command!
  await say(command.text);
});

await app.start();
