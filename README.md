# droplet
OSU Capstone 2018-2019 - Group 13

Droplet is a progressive web app (in other words, it runs fine on your phone and PC) that allows users to post on locations.
If you're taking a walk and see something cool, just leave behind a message for someone else to see. 

This repo uses npm's "scripts" functionality to offer some install scripts for grading purposes. 
Since different operating systems have different terminal syntax, we made multiple commands. 

# Initial setup

First, make sure that you have npm and node installed. Note that OSU's flip has these both installed. 
[Instructions for Unix](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)
[Install for Windows](https://nodejs.org/en/)

# Windows instructions

If you're on Windows, things are very simple. Use the Windows terminal to navigate into the `droplet-app` directory and run `npm run grading-w`. 
This runs a series of commands that installs npm packages and then spins up the server and application. 
It will spawn a second terminal window. One will contain the server's logging while the other will contain the app's. 

# Unix instructions

If you're on Unix you need to do a tiny bit more. Run `npm run grading-u` to install npm dependencies. You'll need to manually spin up the server and app. 
Run `npm start &` to initiate the server in the background. Then, run `npm run rstart`. 
Alternatively, open two terminals; run `npm start` in one and `npm run rstart` in the other. This is recommended but requires slightly more work. 

# Getting to the app

At this point, the app should automatically open in your browser. If not, open a browser and navigate to
`localhost:3000`

You can now make an account and login. Note that this fetches from a real persistent database, despite you running the server and app locally; an internet connection is required. 