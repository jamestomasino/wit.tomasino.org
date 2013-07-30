import sqlite3 as lite

class Config:
    _api_key = ''
    _api_secret = ''
    _con = None

    def __init__(self):
        print lite.version
        if (self._api_key == '' and self._api_secret == ''):
            with open('config.txt') as config:
                config_data = [x.strip().split(':') for x in config.readlines()]
            for key,value in config_data:
                if (key == 'API_KEY'):
                    print 'api key: ' + value
                    self._api_key = value
                elif (key == 'API_SECRET'):
                    print 'api secret: ' + value
                    self._api_secret = value
        self.load_all()

    def load_all(self):
        con = lite.connect('test.db')
        with con:

            cur = con.cursor()
            cur.execute('SELECT SQLITE_VERSION()')
            data = cur.fetchone()
            print "SQLite version: %s" % data
            #if hasattr(self.session, 'oauth_token'):
            #self._oauth_token = self.session.oauth_token
        pass

    def save_all(self):
        # Check if table exists
        #   If not, make it - http://stackoverflow.com/questions/5801170/python-sqlite-create-table-if-not-exists-problem
        # Clear the rows from the table (DELETE FROM tablename)
        # Store all the data we've pulled down into the table
        pass

    def get_api_key(self):
        return self._api_key

    def get_api_secret(self):
        return self._api_secret

