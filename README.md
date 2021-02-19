# OpenClubhouse

A third-part open web application based on flask to play Clubhouse audio for [https://opench.aix.uy](https://opench.aix.uy).

## Statement

This is a third part Clubhouse audio player. I hope that everybody can hear the voice. So it is a open Clubhouse client for Android, for Computer, and for anyone without invite code.

All room accesses are acquired from personal session, and all copyrights of the voice are belongs to JoinClubhouse.com and its users.

If you have any question or suggestion, issues are welcome.

## Preview

Index Page:

![index shortcut](./doc/index.png)

Room Detail Page:

![room shortcut](./doc/room.png)

## Run

1. This app requires a client [OpenClubhouse-Worker](https://github.com/ai-eks/OpenClubhouse-Worker) to sync channel data.
2. Install python packages by `pip install -r requirements.txt`
3. Modify configs in config.py. Especially the SECRET_KEY in production environment.
4. Modify environment variables in run.sh.
5. Execute `sh setEnv.sh` to run this code.

## Third-part software

- Python
- Flask
- flask-mongoengine
- mongoDB
- jquery
- bootstrap
- agora

## TODO list

| ⬜️   | TODO                                | Type     | Priority |
| --- | ----------------------------------- | -------- | -------- |
| ⬜️   | Add CDN                             | Optimize | Middle   |
| ✅   | Remove style file                   | Optimize |          |
| ⬜️   | Auto deployment                     | Optimize | low      |
| ✅   | Prioritize cache update time        | Optimize | High     |
| ⬜️   | Make cache update action async      | Optimize | Middle   |
| ✅   | User_id can't be customized         | Bug      | High     |
| ✅   | Too much speaker icons in room page | Bug      | Middle   |
| ⬜️   | Some channel can't be played        | Bug      | Low      |
| ⬜️   | - Token timeout                     | Bug      | Middle   |
| ⬜️   | - Cache isn't updated               | Bug      | Low      |
| ⬜️   | Add comment for each Room, Gitalk?  | Feature  | Low      |
| ⬜️   | Add more descriptions in index page | Feature  | Middle   |
| ⬜️   | Add recorder                        | Feature  | Very low |

## Reference

- [Agora SDK](https://docs.agora.io/en/Voice/API%20Reference/web_ng/index.html)
- <https://github.com/zhuowei/hipster.house>
