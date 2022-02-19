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
let canRun = false;
let projectTitle = 'My Project';
let options = `${pixidust.FgGreen}yes|${pixidust.resetBCol, pixidust.FgRed}|no${pixidust.resetBCol}`;
let setTitle = `${pixidust.FgYellow}${projectTitle}${pixidust.resetBCol}`
let projectType = ['1: Basic web', '2: git init'];

var readLine = readline.createInterface({
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
            var readStream = fs.createReadStream(path.posix.join(directory, file), 'utf-8');
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

function query(qparams) {
    return new Promise(resolve => readLine.question(qparams, asn => {
        resolve(asn);
    }))
}

async function webProject() {
    let isYes = await query(`Do you like to change the project name? (${options})`)
    if (isYes === 'yes') {
        canRun = true;
        let answer = await query(`What should be the title ? (${setTitle}):`)
        console.log(answer);
        if (canRun && answer) {
            projectTitle = answer;
            asyncCreateFiles(alterConetent)
        } else {
            console.log('close...');
            readLine.close();
        }
        readLine.close();
    }
    else if (isYes === 'no') {
        canRun = true;
        if (canRun) {
            asyncCreateFiles(alterConetent)
        }
        readLine.close();
    }
    else {
        console.log('what the hack');
        readLine.close();
    }
    readLine.close()
}
function initGit() {
    const { exec } = require("child_process");

    exec("git init", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message} or  git may be not installed`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
}

function init() {

    readLine.question(`What project you like to create?  \n${projectType[0] + "\n" + projectType[1]}\n>`, (ans) => {
        switch (ans) {
            case "1":
                webProject()
                break;
            case "2":
                console.log('git has been initialized :)');
                initGit()
                readLine.close()
            default:
                break;
        }
    })
}

init()