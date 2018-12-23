# RoboTwit
Your Twitter management portal 

## Features
  * Search for your own tweets, other people's tweets, popular tweets and most recent tweets.
  * Search for tweets containing certain keywords or hashtags.
  * Show data on all the search results including likes, retweets and tweet source.
  * Personalised user accounts with editable settings.
  * Developer accounts that can launch Twitter bots.
  * All bot activity is logged.
  * All encountered tweets are stored in the database.
  * An admin page that can be accessed only by the admin to show all users and tweets.

## Usage
After cloning this repository, you'll need to take a look on these files:
  * __artsybot/config.js__\
   This file contains the Twitter API keys that will be responsible for all the searches. Don't mix between this file and config-bot.js
   which is entered by the user in the settings page.
  - - - - 
  * __artsybot/subreddits.js__\
   Enter the names of all the subreddits you want the bot to get and tweet random images from.
  - - - -
  * __app.js__\
   This is the main file that the website runs from. You can also set the bot tweet intervals from here.
  - - - -
 
  If you face any problems on platforms other than Windows, I advise that you delete the node_modules directory and install
  the following packages:
  * [twit](https://www.npmjs.com/package/twit)
  * [node-fetch](https://www.npmjs.com/package/node-fetch)
  * [is-online](https://www.npmjs.com/package/is-online)
  * [image-downloader](https://www.npmjs.com/package/image-downloader)
  * [cloudinary](https://www.npmjs.com/package/cloudinary)
  * [connect-flash](https://www.npmjs.com/package/connect-flash)
  * [connect-multiparty](https://www.npmjs.com/package/connect-multiparty)
  * [ejs](https://www.npmjs.com/package/ejs)
  * [express](https://www.npmjs.com/package/express)
  * [express-session](https://www.npmjs.com/package/express-session)
  * [file-system](https://www.npmjs.com/package/file-system)
  * [mongoose](https://www.npmjs.com/package/mongoose)
  * [passport](https://www.npmjs.com/package/passport)
  * [passport-local](https://www.npmjs.com/package/passport-local)
  * [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)

 **YOU MUST HAVE NODE AND MONGODB INSTALLED AND MAKE SURE mongod IS RUNNING FIRST!**

Now start the server with the command:
  `node app.js`\
  \
For further info., visit [BatsyBot](https://github.com/MohamedYasser97/BatsyBot) and [ArtsyBot](https://github.com/MohamedYasser97/ArtsyBot)
  
 ## License
 __MIT License__

Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

