import os

class Config(object):
    DEBUG = False
    TESTING = False
    MONGODB_SETTINGS = {
        'host': 'mongodb://localhost:27017/clubhouse'
    }
    SECRET_KEY = "DEV"


class ProductionConfig(Config):
    MONGODB_SETTINGS = {
        'db' : os.getenv("MONGO_DB", "clubhouse"),
        'host' : os.getenv("MONGO_HOST", "localhost"),
        'port' : int(os.getenv("MONGO_PORT", 27017)),
        'username' : os.getenv("MONGO_USERNAME", ""),
        'password' : os.getenv("MONGO_PASSWORD", ""),
    }
    SECRET_KEY = None # Generate from: python -c 'import os; print(os.urandom(16))'


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
