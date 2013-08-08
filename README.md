# Flickr Photo Blog #
- - - - - 

## Requirements ##

* Apache Webserver
* Python 2.7+
* Ability to use SQLite
* Ruby 1.9.3 and appropriate Gems

## HTML & JavaScript ##

The HTML is pretty self explanitory. Change the title of the page and you've done 90% of the tweaking necessary. 

The CSS and JS are compiled via the build script, or can be edited in realtime using Guard. Both of these require the approprite Gems to be installed.

If you have ruby 1.9.3 running, you can install bundler and let it do the rest:

    gem install bundler
    bundle install


## Configuring Flickr ##

To run this project, you must create a file named `config.txt` in the root directory of the project. This file requires 4 variables to be set: `API_KEY`, `API_SECRET`, `SET_ID`, and `USER_ID`.

The format is to have each variable on a separate line and the value separated by a colon. You should have no extra spaces in the formatting, and be sure not to leave any blank lines.

For Example:

    API_KEY:XXXXXXXXXXXXXXXXX
    API_SECRET:XXXXXXXXXXXXXXXXX
    SET_ID:XXXXXXXXXXXXXXXXX
    USER_ID:XXXXXXXX@N00
    
Once you have created your `config.txt` file properly, your photos should show up automatically.
    
### API_KEY & API_SECRET ###

To use the Flickr API, you need to have an application key and secret. If you don't already have one of these, you can apply for yours online [here](http://www.flickr.com/services/api/misc.api_keys.html).
    
### SET_ID ###

To find your Set ID, click on the set and look at the url displayed in your browser's address bar. Your address should look something like this:

    http://www.flickr.com/photos/[username]/sets/[your_set_id_number]/


### USER_ID ###

To find your User ID, go to [this site](http://idgettr.com/).