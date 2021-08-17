/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


// use markpn machone and generate text

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.readText());
}


// input file and read text

function readText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


// input url and read text from it


async function readURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}


/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  readText(path);
}

else if (method === "url") {
  readURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}