import vimeoPlayer from "@vimeo/player";
import throttle from "lodash/throttle";

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";
let current_time = localStorage.getItem(LOCALSTORAGE_KEY);

if !(current_time){ current_time = 0; }
 
player.setCurrentTime(current_time);
player.on('timeupdate', throttle(onTimeUpdate, 1000));
unction onTimeUpdate(){
    player.getCurrentTime().then(seconds => {localStorage.setItem(LOCALSTORAGE_KEY, seconds);});
}
