// Require dependencies
const https = require('https');
const fs = require('fs');
var parseString = require('xml2js').parseString;
const os = require('os');
const path = require('path');
const chalk = require('chalk');
require('dotenv').config();

// Create directories if they don't exist
let podgrabDirectory = path.join(__dirname, '/podgrab');
let podcastsDirectory = `${podgrabDirectory}/podcasts`;

if (!fs.existsSync(podgrabDirectory)){
    fs.mkdirSync(podgrabDirectory, { recursive: true });
}

if (!fs.existsSync(podcastsDirectory)){
    fs.mkdirSync(podcastsDirectory, { recursive: true });
}

// exports.sh file path
const podgrabScript = `${podgrabDirectory}/podgrab.sh`;

// Create exports file header (shebang)
fs.open(podgrabScript, 'a', 640, (e, id) => {
    fs.write(id, '#!/bin/sh' + os.EOL, null, 'utf-8', () => {
      fs.close(id, () => {
          return;
      })
    })
})

// GET podcast XML file and create cURL commands in exports.sh
let podcastXmlUrl = '';

if (!process.env.PODCASTURL) {
    console.error(chalk.red('No environment variable set.'))
} else {
    podcastXmlUrl = process.env.PODCASTURL;
}

https.get(podcastXmlUrl, function(res) {
    let data = '';

    res.on('data', d => {
        data += d;
    })

    res.on('end', () => {
        parseString(data, function(err, result) {
            if(err) {
                console.error(err);
            }

            let podcastArray = result.rss.channel[0].item;
            for(let i = 0; i < podcastArray.length; i++) {
                let podcastUrl = podcastArray[i].enclosure[0].$.url;
                fs.open(podgrabScript, 'a', 640, (e, id) => {
                    fs.write(id, 'curl -L ' + podcastUrl + ' -O;' + os.EOL, null, 'utf-8', () => {
                      fs.close(id, () => {
                          return;
                      })
                    })
                })
            }
        })
    })
})