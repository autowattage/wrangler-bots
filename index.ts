import { App } from "@slack/bolt";
import ModalPayload from "./modalpayload.ts";
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
  let args = command.text.trim().split(/\s+/);
  
  // making sure the category is valid
  try {
    args[0] = args[0][0].toUpperCase() + args[0].slice(1).toLowerCase();
    if (!isNaN(args[0])) throw "thats a number!";
    if (!ShopItems[args[0]]) throw "not a category name!";
  } catch(err) {
    await respond("invalid category: " + err + "\nvalid categories: traditional, digital, goodies");
    return;
  }

  // making sure the id is valid
  try {
    if (isNaN(args[1])) throw "thats not a number!";
    if (!ShopItems[args[0]][args[1]-1]) throw "out of range!";
  } catch(err) {
    await respond("invalid id: " + err + "\nvalid ids can be found in https://wrangler.hackclub.com/shop");
    return;
  }

  try {
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: new ModalPayload(ShopItems[args[0]][args[1]-1])
    });
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

// /hb402-a command
app.command('/hb402a', async ({ command, ack, event, respond, say }) => {
  await ack();
  // await app.client.chat.postMessage("hi");
  await say(command.text);
});

await app.start();
