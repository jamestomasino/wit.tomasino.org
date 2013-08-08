class Config:
    _api_key = ''
    _api_secret = ''
    _user_id = ''
    _set_id = ''

    def __init__(self):
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

