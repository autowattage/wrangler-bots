import { App } from "@slack/bolt";
import ModalPayload from "./payload.ts";
import ShopItems from "./shopitems.json";

const app = new App({
  token: process.env.SLACK_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// app.message(async (event) => {
//     if (event.payload.subtype) return;
//     if (event.payload.user == 'U0BPMSLGMBN') return; // self message

//     // await event.say(`you said ${event.body.event["text"]} in ${event.body.event["channel"]}`);
// })

// /wrangler-buy command
app.command('/wrangler-buy', async ({ ack, body, client, command, logger, respond }) => {
  await ack();

  // let mpayload: ModalPayload;
  // await respond("run this command with a number id from https://wrangler.hackclub.com/shop/!");

  try {
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: new ModalPayload(ShopItems[(Number(body.text))-1])
    });
    // logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }

});

// /wrangler-stats command
app.command('/wrangler-stats', async ({ command, ack, respond }) => {
  await ack();

  await respond(`here's your stats`);
});

await app.start();
