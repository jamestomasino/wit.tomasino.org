class Config:
    _api_key = ''
    _api_secret = ''
    _con = None

    def __init__(self):
        if (self._api_key == '' and self._api_secret == ''):
            with open('config.txt') as config:
                config_data = [x.strip().split(':') for x in config.readlines()]
            for key,value in config_data:
                if (key == 'API_KEY'):
                    self._api_key = value
                elif (key == 'API_SECRET'):
                    self._api_secret = value

    def get_api_key(self):
        return self._api_key

    def get_api_secret(self):
        return self._api_secret

