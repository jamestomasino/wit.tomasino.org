import sqlite3 as lite

class Config:
    _api_key = ''
    _api_secret = ''
    _user_id = ''
    _set_id = ''
    _photo_master_list = []

    def __init__(self):
        # Create the database, then close the connection to avoid bug
        con = lite.connect('web.db')
        cur = con.cursor()
        sql = 'CREATE TABLE IF NOT EXISTS photos ( Id TEXT PRIMARY KEY, Source TEXT )'
        cur.execute(sql)
        con.commit()
        con.close()

        if (self._api_key == '' and self._api_secret == ''):
            with open('config.txt') as config:
                config_data = [x.strip().split(':') for x in config.readlines()]
            for key,value in config_data:
                if (key == 'API_KEY'):
                    self._api_key = value
                elif (key == 'API_SECRET'):
                    self._api_secret = value
                elif (key == 'USER_ID'):
                    self._user_id = value
                elif (key == 'SET_ID'):
                    self._set_id = value

    def get_api_key(self):
        return self._api_key

    def get_api_secret(self):
        return self._api_secret

    def get_user_id(self):
        return self._user_id

    def get_set_id(self):
        return self._set_id

    def load_all(self):
        con = lite.connect('web.db')
        cur = con.cursor()
        with con:
            cur.execute('SELECT Id, Source FROM photos')
            rows = cur.fetchall()
            for row in rows:
                photo_master_data = {}
                photo_master_data['photo_id'] = row[0]
                photo_master_data['source'] = row[1]
                self._photo_master_list.append(photo_master_data)

    def get_source_from_master(self, id):
        for photo in self._photo_master_list:
            if (id == photo['photo_id'] ):
                return photo['source']

    def save_all(self, photo_list):
        con = lite.connect('web.db')
        cur = con.cursor()
        with con:
            for photo_data in photo_list:
                sql = "INSERT OR REPLACE INTO photos (Id, Source) VALUES(?, ?)"
                cur.execute(sql, (photo_data['photo_id'], photo_data["source"]))

