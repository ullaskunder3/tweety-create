#!/usr/bin/env node

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Copyright (c) 2021-present, Ullas Kunder, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

'use strict';

process.on('unhandledRejection', err => {
    throw err;
});

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { colorRef: pixidust } = require('./bin/utility')

const directory = path.join(__dirname, 'templates/jhcTemplate');
const currentRoot = path.basename(path.resolve(process.cwd()));
const htmlfile = path.join(process.cwd(), 'index.html')

let projectTitle = 'My Project';

var realLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function asyncCreateFiles(callback) {

    fs.readdir(directory, (err, files) => {
        console.log('creating required files ...in a moment ♟');

        if (err) {
            return console.log('Unable to scan project dirctory' + err);
        }
        files.forEach((file) => {
            var readStream = fs.createReadStream(directory + '\\' + file, 'utf-8');
            var writeStream = fs.createWriteStream(file);
            readStream.pipe(writeStream)
        })
    })
    setTimeout(() => {
        callback()
    }, 1000)
}

function alterConetent() {

    let style = `${pixidust.FgMagenta}style${pixidust.resetBCol}`;
    let index = `${pixidust.FgMagenta}index${pixidust.resetBCol}`;
    let script = `${pixidust.FgMagenta}script${pixidust.resetBCol}`;
    let wish = `${pixidust.FgRed}HAPPY CODING... ( ｡ ◕ ‿ ◕ ｡ )${pixidust.resetBCol}`;
    let currentWorkDir = `${pixidust.BgMagenta} ${currentRoot} ${pixidust.resetBCol}`

    console.log('Applying regression...✨');
    fs.readFile(htmlfile, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var result = data.replace(/Document/g, `${projectTitle}`);

        fs.writeFile(htmlfile, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });

        console.log(`Okkk your working directroy is: ${currentWorkDir}`);
        console.log('\r\n');
        console.log(`${style} file has been generated: with RESET ✔`)
        console.log(`${index} file has been generated: ✔`)
        console.log(`${script} file has been generated: ✔`)
        console.log('\r\n');
        console.log(`${wish}`);
    });

}

function init() {

    let canRun = false;
    let options = `${pixidust.FgGreen}yes|${pixidust.resetBCol, pixidust.FgRed}|no${pixidust.resetBCol}`;
    let setTitle = `${pixidust.FgYellow}${projectTitle}${pixidust.resetBCol}`

    realLine.question(`Do you like to change the project name? (${options}) `, (isYes) => {
        if (isYes === 'yes') {
            canRun = true;
            realLine.question(`What should be the title ? (${setTitle}):  `, function (answer) {
                if (answer && answer.length) {
                    projectTitle = answer;
                }
                if (canRun) {
                    asyncCreateFiles(alterConetent)
                }
                realLine.close();
            });
        }
        else if (isYes === 'no') {
            canRun = true;
            if (canRun) {
                asyncCreateFiles(alterConetent)
            }
            realLine.close();
        }
        else {
            console.log('what the hack');
            realLine.close();
        }
    })
}

init()