var Airtable = require('airtable');
var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY}).base('appznGjUoC1o6jLZd');

    base('currency').select({
    // Selecting the first 3 records in Pipeline View:
    maxRecords: 3,
    view: "Grid view"
})
// .eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

//     records.forEach(function(record) {
//         console.log('Retrieved', record.get('Loops - wranglerSignUpAt'));
//     });

//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return;
// }
// });

base('YSWS Project Submission').select({
    view: 'Pipeline View'
}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        console.log('Retrieved', record.get('Code URL'));
    });
});
