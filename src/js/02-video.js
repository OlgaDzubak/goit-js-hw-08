import vimeoPlayer from "@vimeo/player";
import throttle from "lodash/throttle";

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(){
    player.getCurrentTime().then(seconds => {localStorage.setItem(LOCALSTORAGE_KEY, seconds);});
}