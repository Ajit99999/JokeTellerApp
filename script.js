const apiUrl = `https://v2.jokeapi.dev/joke/Programming?format=json&safe-mode&type=twopart`
const state = {
    jokeString: "",
    apiKey : "ff0fa146a82b4dfda9287892131a7eff"

}
const audioElem = document.querySelector('audio')
const btn = document.querySelector('button');

async function loadJokes(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const { setup, delivery
        } = data;

        state.jokeString = `${setup} ... ${delivery}`
        tellMeJoke(state.jokeString);
    }
    catch (err) {
        console.log(err)
    }

}
function tellMeJoke(joke) {
    const VoiceRSS = {
        speech: function (e) { this._validate(e), this._request(e) }, _validate: function (e) { if (!e) throw "The settings are undefined"; if (!e.key) throw "The API key is undefined"; if (!e.src) throw "The text is undefined"; if (!e.hl) throw "The language is undefined"; if (e.c && "auto" != e.c.toLowerCase()) { var a = !1; switch (e.c.toLowerCase()) { case "mp3": a = (new Audio).canPlayType("audio/mpeg").replace("no", ""); break; case "wav": a = (new Audio).canPlayType("audio/wav").replace("no", ""); break; case "aac": a = (new Audio).canPlayType("audio/aac").replace("no", ""); break; case "ogg": a = (new Audio).canPlayType("audio/ogg").replace("no", ""); break; case "caf": a = (new Audio).canPlayType("audio/x-caf").replace("no", "") }if (!a) throw "The browser does not support the audio codec " + e.c } }, _request: function (e) {
            var a = this._buildRequest(e), t = this._getXHR(); t.onreadystatechange = function () {
                if (4 == t.readyState && 200 == t.status) {
                    if (0 == t.responseText.indexOf("ERROR")) throw t.responseText; new Audio(t.responseText).play(); audioElem.src = t.responseText; audioElem.addEventListener('loadedmetadata',


                        function () {
                            audioElem.hidden = false;
                            audioElem.play().then(() => {

                                audioElem.addEventListener('ended', function () {
                                    audioElem.hidden = true;
                                })
                            })
                        });
                }
            },
                t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a)
        },
        _buildRequest: function (e) { var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec(); return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&v=" + (e.v || "") + "&r=" + (e.r || "") + "&c=" + (a || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true" }, _detectCodec: function () { var e = new Audio; return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : "" }, _getXHR: function () { try { return new XMLHttpRequest } catch (e) { } try { return new ActiveXObject("Msxml3.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { } throw "The browser does not support HTTP request" }
    };


    VoiceRSS.speech({
        key: state.apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

btn.addEventListener('click', function () {

    loadJokes(apiUrl)
})
