const gcoord = require('gcoord');
const { transform, WGS84, BD09MC, BD09LL } = require('gcoord');

const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const output = []
fs.createReadStream('steps2.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Handle reach row of data.
    lat = row.lat
    lng = row.lng
  
    var result = gcoord.transform(
      [lat, lng],
      gcoord.BD09MC, // current coordinate
      gcoord.WGS84 // target coordinate                 
    );
    
    row.lat = result[0]
    row.lng = result[1]
    output.push(row)
  })
  .on('end', () => {
    const csvWriter = createCsvWriter({
      path: 'out.csv',
      header: [
        {id: 'id', title: 'id'},
        {id: 'name', title: 'name'},
        {id: 'uid', title: 'uid'},
        {id: 'lat', title: 'lat'},
        {id: 'lng', title: 'lng'},
        {id: 'is_practical', title: 'is_practical'},
        {id: 'line_id', title: 'line_id'},
        {id: 'created_at', title: 'created_at'},
        {id: 'updated_at', title: 'updated_at'},
      ]
    });

    csvWriter
      .writeRecords(output)
      .then(()=> console.log('The CSV file was written successfully'));    

    console.log('CSV file successfully processed');
  });



// var result = gcoord.transform(
//   [114.21892734521, 29.575429778924],
//   gcoord.WGS84, // current coordinate
//   gcoord.BD09MC // target coordinate                 
// );

// console.log(result)