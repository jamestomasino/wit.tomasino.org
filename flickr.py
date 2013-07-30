#!/usr/local/bin/python

import flickrapi
from config import Config
import os
try:
    import json
except:
    import simplejson as json

print "Content-type: application/json\n"

page = 0
photos_per_page = 5
query_params = {}
photo_list = []


# Get Query Parameters
try:
    query_string = os.getenv("QUERY_STRING")
    query_pairs = query_string.strip().split('&')
    for p in query_pairs:
        query_params[p.split('=')[0]] = p.split('=')[1]
except Exception:
    pass

# Get Page to display
try:
    page = int(query_params['page'])
except Exception:
    pass

# Calculate start and end photo to request
photo_num_start = page * photos_per_page
photo_num_end = photo_num_start + photos_per_page

# Load API info
config = Config()

# Flickr API Requests
flickr = flickrapi.FlickrAPI(config.get_api_key(), config.get_api_secret())
set = flickr.walk_set('72157631261275342', 500)
# reverse the set list
rev_set = list(set)[::-1]

for photo in rev_set[photo_num_start:photo_num_end]:
    photo_data = {}
    photo_data['photo_id'] = photo.get('id')
    photo_data['photo_owner'] = '64735379@N00' #hardcoded, but whatever
    photo_data['photo_title'] = photo.get('title')
    size_container = flickr.photos_getSizes(photo_id=photo_data['photo_id'])
    for size_list in size_container:
        for size in list(size_list)[::-1]:
            if size.get('label') == 'Large' or size.get('label') == 'Medium':
                photo_data['source'] = size.get('source')
                break
    photo_list.append(photo_data)

json_wrapper = { 'photos' : photo_list }
print json.dumps(json_wrapper)
