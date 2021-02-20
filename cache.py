from datetime import datetime as dt, timedelta as td
from models.channel import Channels
from config import CACHE_INTERVAL


class ChannelsCache():
    def __init__(self, cache_interval: td) -> None:
        # self.channels = None
        self.simplifyChannels = None
        self.rooms = None
        self.cache_interval = cache_interval
        self.last_sync_time = dt.now()

    def init_cache(self, logger):
        if logger is None:
            raise Exception("Logger of ChannelsCache can't be None")
        self.logger = logger
        self.update()

    def update(self):
        current_time = dt.now()
        if self.simplifyChannels is None or current_time - self.last_sync_time >= self.cache_interval:
            self.last_sync_time = current_time
            self.logger.info(f"Start updating Channel cache at {current_time}")
            channels = Channels.objects(
                success=True)  # .order_by('-num_all')
            self.rooms = {ch.channel: {
                "users": [{
                    'user_id': u.user_id,
                    'name': u.name,
                    'photo_url': u.photo_url,
                    'is_speaker': u.is_speaker
                } for u in ch.users],
                "channel": {
                    "channel": ch.channel,
                    "channel_id": ch.channel_id,
                    "token": ch.token,
                    "topic": ch.topic,
                    "url": ch.url,
                    "success": ch.success,
                    "num_all": ch.num_all,
                    "num_speakers": ch.num_speakers,
                    "users": ch.users[:5],
                    "joined": ch.joined
                }
            } for ch in channels}
            self.simplifyChannels = list(x['channel']
                                         for x in self.rooms.values())
            self.simplifyChannels.sort(
                key=lambda x: x['num_all'], reverse=True)
            self.logger.info(f"Cache updated at {dt.now()}")

    def get(self):
        self.update()
        return self.rooms, self.simplifyChannels


channelsCache = ChannelsCache(td(minutes=CACHE_INTERVAL))
