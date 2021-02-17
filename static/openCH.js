var client = null;
var remoteUsers = {};
// Agora client options
var options = {
    appid: null,
    uid: null,
};
var currentPlaying = null;

async function subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === 'audio') {
        // if ($("#players")) {
        //     const player = $(`
        //         <div id="player-wrapper-${uid}"  class="col">
        //            remoteUser(${uid})
        //         </div>
        //         `);
        //     $("#players").append(player);
        // }
        user.audioTrack.play();
    }
}

async function unsubscribe(user, mediaType) {
    await client.unsubscribe(user, mediaType);
    console.log("unsubscribe success");
}

function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = [user, mediaType];
    subscribe(user, mediaType);
}
function handleUserUnpublished(user) {
    const id = user.uid;
    delete remoteUsers[id];
    if ($(`#player-wrapper-${id}`))
        $(`#player-wrapper-${id}`).remove();
}

function handleNotification(message) {
    console.warn(message);
}

function initOptions(appid, uid) {
    options.appid = appid;
    options.uid = uid;
}

initOptions('938de3e8055e42b281bb8c6f69c21f78', 2082609216);
async function play(topic, channel, token) {
    stop();
    currentPlaying = channel;
    options.uid = await client.join(options.appid, channel, token, options.uid);
}

function stop() {
    if (client !== null)
        client.leave();
    $('#current').text('None');
    if (currentPlaying !== null)
        $(`#${currentPlaying}`).removeClass("disabled btn-playing");
}

async function getChannels() {
    const response = await fetch('/api/getChannels', {
        method: 'GET',
        headers: {
            'content-type': 'application/json; charset=utf-8',
        },
    });
    const channels = await response.json();
    for (const ch of channels) {
        $("#channels").append(`
            <li class="list-group-item" id="${ch.channel_id}">
                <div class="">
                    <div class="row">
                        <div class="col">
                            <p class="mb-0">
                                ${ch.topic}
                            </p>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-outline-success btn-sm disabled play-btn"
                                tabindex="-1" role="button" aria-disabled="true"
                                id="${ch.channel}" token="${ch.token}" topic="${ch.topic}">
                                Play
                            </a>
                            <a href="room/${ch.channel}" class="btn btn-outline-primary btn-sm disabled" tabindex="-1"
                                role="button" aria-disabled="true">
                                Detail
                            </a>
                        </div>
                    </div>
                    <div class="users">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-mic" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                            <path fill-rule="evenodd"
                                d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                        </svg>${ch.num_speakers}/<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                            <path
                                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                        </svg>${ch.num_all}
                       
                    </div>
                </div>
            </li>
            `
        );
        if (ch.joined) {
            $(`#${ch.channel_id} .btn`).removeClass("disabled");
        }
        for (const user of ch.users) {
            if (user.name != "Ai Eks")
                if (user.is_speaker)
                    $(`#${ch.channel_id} .users`).append(`<span class="badge badge-primary">${user.name} </span>`);
                else
                    $(`#${ch.channel_id} .users`).append(`<span class="badge badge-secondary">${user.name} </span>`);
        }
    }
    $("#loading").hide();
    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    $(".play-btn").click(function (e) {
        const topic = $(this).attr('topic');
        const channel = $(this).attr('id');
        const token = $(this).attr('token');
        play(topic, channel, token);
        $(`#${currentPlaying}`).addClass("disabled btn-playing");
        $(`#current`).text(topic);
    });

    $("#stop").click(function (e) {
        stop();
    });
}
async function getChannel(room) {
    const response = await fetch(`/api/room/${room}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json; charset=utf-8',
        },
    });
    const data = await response.json();

    if (data) {
        const channel = data.channel;
        const users = data.users;
        const channel_uid = channel.channel;
        const topic = channel.topic;
        const token = channel.token;
        $("#channel").append(`
        <div class="card-body">
                <h5 class="card-title">${channel.topic}</h5>
                <a href="${channel.url}" class="card-link">${channel.url}</a>
            </div>
            <div class="card-body">
                <button type="button" class="btn btn-outline-primary" id="play">Play</button>
                <button type="button" class="btn btn-outline-info" id="load_picture">Load Avatar</button>
                <!-- <button type="button" class="btn btn-outline-primary" id="record">Record</button>
                <button type="button" class="btn btn-outline-primary" id="stop_record">Stop Record</button>
                <div id="soundClips">
                    Record Clips:
                </div>
                <hr> -->
                <!-- <h5>Current Speaker:</h5>
                <div class="players row justify-content-center" id="players">
                </div> -->
                <hr>
                <h5>${users.length} Users of All</h5>
                <div class="users row justify-content-center" id="users">
                </div>
            </div>
        `);
        for (user of users) {
            $('#users').append(`
            <div class="col-md-2 col-lg-1 col-3 user" id="${user.user_id}">
                <img data-src="${user.photo_url}" class="rounded mr-1 lazyload"><br>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-mic" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                    <path fill-rule="evenodd"
                        d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                </svg>
                ${user.name}
            </div>
            `);
        }
        client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        console.log(topic, channel_uid, token)
        $("#play").click(async function (e) {
            if (currentPlaying !== null) {
                if (client !== null)
                    client.leave();
                $("#play").text("Play");
                currentPlaying = null;
            } else {
                await play(topic, channel_uid, token);
                $("#play").text("Stop");
            }
        })
        $("#load_picture").click(() => {
            lazyload();
            $("#load_picture").hide();
        })
    }
    else {
        $("#channel").append("This channel is end or not existed.");
    }
}

