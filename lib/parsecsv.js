const fs = require('fs');
const parse = require('csv-parse');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const parseAsync = promisify(parse);

async function parseCsv() {
  const file = await readFile('data.csv');
  const records = await parseAsync(file, {
    columns: true,
    delimiter: ',',
    cast: (value, { header }) => {
      if (header === 'age') {
        return parseInt(value);
      }
      return value;
    },
    on_record: (record) => {
      const newRecord = {};
      Object.entries(record).forEach(([key, value]) => {
        const parts = key.split('.');
        let obj = newRecord;
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          obj[part] = obj[part] || {};
          obj = obj[part];
        }
        obj[parts[parts.length - 1]] = value;
      });
      return newRecord;
    }
  });
  
  console.log(records);
}

module.exports = {
    parseCsv
}