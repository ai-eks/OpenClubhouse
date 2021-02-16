import mongoengine as me


class Users(me.DynamicEmbeddedDocument):
    user_id = me.IntField()
    name = me.StringField()
    photo_url = me.URLField()
    is_speaker = me.BooleanField()

class Channels(me.DynamicDocument):
    channel = me.StringField()
    channel_id = me.StringField()
    token = me.StringField()
    topic = me.StringField()
    url = me.StringField()
    success = me.BooleanField()
    num_all = me.IntField()
    num_speakers = me.IntField()
    users = me.EmbeddedDocumentListField(Users)
    joined = me.BooleanField()