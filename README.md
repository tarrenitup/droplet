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
Alternatively, open two terminals; run `npm start` in one and `npm run rstart` in the other. This is recommended but requires slightly more work.<br/><br/>
If all this fails, run the commands manually.
```
npm install
npm audit fix
npm start
npm run rstart
```
`npm start` and `npm run rstart` need to run in separate terminals. 

# Getting to the app

At this point, the app should automatically open in your browser. If not, open a browser and navigate to
`localhost:3000`

You can now make an account and login. Note that this fetches from a real persistent database, despite you running the server and app locally; an internet connection is required. 

# What's in the app?

You can start by signing up and then logging in. You'll be taken to the main page, which shows posts in a list format. The house icon at the bottom of the page brings you back here. 
Press the callout tag (to the right of the house) to open the map view. <br/>
Press the droplet icon to make a new post. Test it out! It works. <br/>
Press the heart to see what posts of yours have been liked by othes. A new user won't see anything here. <br/>
Press the little person to see your profile. This displays your icon, name, bio, and all the posts you've made. 

# Additional Notes
The theme button on the top right currently does not work.
Login and Signup functionality works properly. There are some minor oddities, such as still being able to navigate to the login page when you're already logged in and having to enter in a bio to sign up, but it works as intended. Unfortunately, there is some lack of proper feedback upon a failed login. All pages other than login and signup require the user to be logged in in order to access them. The button at the top left of the screen can be used to logout. 
The home/main page currently shows all posts instead of nearby ones.
The Map page works mostly as intended. The map and location updating can be quite slow, but it will properly allow only posts within a certain range to be seen (as in, viewing the content. Posts out of range appear red). It currently uses a constant radius to decide on whether or not to display a post, rather than the posts actual "splash radius", as the latter was making it too slow. We're aware that there is currently no marker for the user's currently location. We had a working marker, but removed it for the code freeze as it was causing some minor issues.
The droplet modal (for making a new post) currently only allows for text posts, as we had issues figuring out how to work in images and videos. It will properly make the post so long as the user gives permission for the client to access their location (which it needs to make the post). 
The likes page properly shows a list of your posts that have been liked, sorted with the most recently liked post at the top. Liking posts works (clicking on the heart icon on the post), but it will not update the card with the new like count until the page is refreshed. There is currently no way to "unlike" a post.
The profile page properly displays the username, bio, icon, and posts of the user. However, since there is no way to edit your bio or upload an icon, the icon is left blank and the bio is stuck as whatever was inputted at signup. 
