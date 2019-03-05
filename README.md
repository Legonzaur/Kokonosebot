# Kokonosebot
Bot for the French Kagerou Project Discord server

Use this code as your will

# How to Install
1. Start by cloning this repo in your computer
2. Create a file named __private.json__  
	Fill it with your Discord bot Token with this syntax  
	```json
	{"token":"mytoken", "owner": "Your profile's id"}
	```
	> Note : according to DiscordJs-commando's dow, owner object can be an array of string `"owner": ['profile1','profile2']`
3. execute ```npm i``` to download the dependencies.  
	> note : the dependency "Sodium" requires the packages `libtool-bin` and `autoconf` in unix-like systems. You need to install them in your computer before running npm*  
4. launch the bot with ```node main.js``` or with whatever you want (pm2...)  
5. Yup, that's all
6. Maybe

This bot is still under (slow) development.
