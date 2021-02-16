import os

from flask import Flask
from flask_mongoengine import MongoEngine

def create_app(test_config=None):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__, instance_relative_config=True)

    if app.config["ENV"] == "production":
        app.config.from_object("config.ProductionConfig")
    else:
        app.config.from_object("config.DevelopmentConfig")

    if app.config['SECRET_KEY'] is None:
        raise Exception("SECRET_KEY can't be None. Try to generate one by command: python -c 'import os; print(os.urandom(16))', and copy the result into configs.py.")

    @app.route("/alive")
    def alive():
        return {"alive":True}

    # register the database commands
    db = MongoEngine(app)
    # apply the blueprints to the app
    from handlers import clubhouse

    app.register_blueprint(clubhouse.bp)
    # make url_for('index') == url_for('blog.index')
    # in another app, you might define a separate main index here with
    # app.route, while giving the blog blueprint a url_prefix, but for
    # the tutorial the blog will be the main index
    app.add_url_rule("/", endpoint="index")

    return app
