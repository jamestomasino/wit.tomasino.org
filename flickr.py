#!/usr/local/bin/python

import flickrapi
from config import Config
import os

print "Content-type: text/plain\n"

# Get Query Parameters
query_string = os.getenv("QUERY_STRING")
query_params = query_string.strip().split('&')
params = {}
for p in query_params:
    params[p.split('=')[0]] = p.split('=')[1]
print params

config = Config()

flickr = flickrapi.FlickrAPI(config.get_api_key(), config.get_api_secret())
set = flickr.walk_set('72157631261275342', 500)

photo_list = []
# reverse the set list
rev_set = list(set)[::-1]

for photo in rev_set[:5]:
    photo_id = photo.get('id')
    photo_title = photo.get('title')
    print photo_id + ' - ' + photo_title
    size_container = flickr.photos_getSizes(photo_id=photo_id)
    for size_list in size_container:
        for size in list(size_list)[::-1]:
            if size.get('label') == 'Large' or size.get('label') == 'Medium':
                print size.get('source')
                break;
