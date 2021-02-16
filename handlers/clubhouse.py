from flask import Blueprint
from flask import render_template
from flask import jsonify


# from db import get_db
# from models.channel import Channels
from cache import channelsCache

bp = Blueprint("clubhouse", __name__)


@bp.route("/")
def index():
    """"""
    return render_template("index.html")


@bp.route("/api/getChannels")
def getChannels():
    rooms, channels = channelsCache.get()
    # channels.sort(key=lambda x:x.num_all)
    print("len of channels:", len(channels))
    return jsonify(channels)


@bp.route("/room/<string:room>")
def join(room):
    """"""
    return render_template("channel.html")


@bp.route("/api/room/<string:room>")
def getChannel(room):
    rooms, channels = channelsCache.get()
    if room in rooms and rooms[room]['channel']['joined'] is True:
        # print(f"{len(rooms[room]['users'])}")
        return rooms[room]
    return jsonify(None)


@bp.route("/test")
def test():
    return render_template("channel.html")
