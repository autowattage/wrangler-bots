var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appznGjUoC1o6jLZd');

// export function buy() {
//     pass;
// }

// export function getstats(email) {
//     var currencyrecord;
//     base('currency').select({
//         view: 'Grid view'
//     }).firstPage(function(err, records) {
//         if (err) { console.error(err); return; }
//         records.forEach(function(record) {
//             if (record.get('Email') == email) {
//                 currencyrecord = record;
//                 // console.log(currencyrecord);
//             }
//         });
//     });
//     console.log(currencyrecord);
//     // base('currency').find('recYAq2FO30LmuDVj', function(err, record) {
//     //     if (err) { console.error(err); return; }
//     //     console.log('Retrieved', record.id);
//     // });
// }

// what opencode gave me (thanks opencode)
// plus modifiying stuff
export async function getstats(email) {
    return new Promise((resolve, reject) => {
        var curr_record;
        base('currency').select({
            view: 'Grid view'
        }).firstPage(function(err, records) {
            if (err) { console.error(err); reject(err); return; }
            records.forEach(function(record) {
                if (record.get('Email') == email) { curr_record = record; }
            });
            if (curr_record) {
                resolve(`\n
accepted hours: ${curr_record.get("Accepted hours")}\n
rejected hours: ${curr_record.get("Rejected hours")}\n
pending hours: ${curr_record.get("Pending hours")}\n
bonus hours added: ${curr_record.get("Manual hours added")}\n
currency: ${curr_record.get("Shop hours")} (these are the hours you can buy in the shop)\n
hours spent in the shop: ${curr_record.get("Spent hours")} (this is how much you've spent)
                `);
            } else {
                resolve("invalid email address - use your slack account that's connected to your wrangler sign-up email!");
            }
        });
    });
}
