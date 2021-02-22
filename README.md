# OpenClubhouse

A third-party open web application based on flask to play Clubhouse audio for [https://opench.aix.uy](https://opench.aix.uy).

## ⚠️Warning⚠️

**Using this code will increase the risk of account block.**

**I recommend invited users to use other third-party clients. You can find more repos on GitHub by searching *Clubhouse*.**

## Something about intention, technology and others

1. This is actually a cool toy and an experiment for fun. I just want to help others and me get rid of the limit of IOS app.
2. It will only make public channel into public. I have wrote clearly about the access in original statement and in these two repos. If you are not a computer guy or don't know the technology behind, please do more study and thinking, but not excessive speculate.
3. This project is not diffcult to implenment. It only calls a few Clubhouse and Agora APIs to query info and get authorization. The Agora API is public, and thankfully the Clubhouse API has been shared by others.
4. If somebody has played a room by this app, and then another one plays the same room. The Agora in fact will stop the first connection. But it seems that the disconnect action is taken at the side of client. So I make a litte change in the AgoraRTC_N-4.3.0.js to keep the connection alive. That's why I didn't use any online js resource for this file. I was intended to spend 3 days finsh it, but the problem really bothered me and extended the devlopment to 5 days.
5. Anyone can record voice by the native record tool in iPhone, it is also easy to record voice from web or any other device. Before I solve the problem in point 4, vocie recoarding has been implented by MediaRecorder Web API. However, the whole chat is splited into huge slices which is not easy for me to combine currently. So I dropped it later.
6. The last thing is that the avatar of the CH robot account is a part of the Umbrella Corporation logo.

## Original Statement

This is a third-party Clubhouse audio player. I hope that everybody can hear the voice. So it is a open Clubhouse client for Android, for Desktop Computer, and for anyone without invite code.

All room accesses are acquired from my personal session, and all copyrights of the voice are belongs to JoinClubhouse.com and its users.

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

## Third-party software Dependencies

- Python
- Flask
- flask-mongoengine
- mongoDB
- jquery
- bootstrap
- agora

## WOULD BE NEVER DONE list

| ⬜️   | TODO                                | Type     | Priority |
| --- | ----------------------------------- | -------- | -------- |
| ✅   | Add CDN                             | Optimize | Middle   |
| ❌   | Remove style file                   | Optimize |          |
| ✅   | Auto deployment                     | Optimize | low      |
| ❌   | Prioritize cache update time        | Optimize | High     |
| ✅   | Make cache update action async      | Optimize | Middle   |
| ❌   | User_id can't be customized         | Bug      | High     |
| ❌   | Too much speaker icons in room page | Bug      | Middle   |
| ✅   | Some channel can't be played        | Bug      | Low      |
| ✅   | - Token timeout                     | Bug      | Middle   |
| ✅   | - Cache isn't updated               | Bug      | Low      |
| ✅   | Add comment for each Room, Gitalk?  | Feature  | Low      |
| ✅   | Add more descriptions in index page | Feature  | Middle   |
| ⭕   | Add recorder                        | Feature  | Very low |

## Reference

- [Agora SDK](https://docs.agora.io/en/Voice/API%20Reference/web_ng/index.html)
- <https://github.com/zhuowei/hipster.house>
- [MediaRecorder Web API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
