/*global chrome*/

let updating = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.playbackRate) {
    const playbackRate = message?.playbackRate.value;
    const videos = document.getElementsByTagName("video");
    Array.from(videos).forEach((v) => {
      v.playbackRate = playbackRate;
    });
  }
  sendResponse("ok");
});

function nodeInsertedCallback(event) {
  if (updating) {
    console.log("updating");
    return;
  }

  chrome.storage.local.get(["playbackRate"], function (items) {
    if (!items["playbackRate"]?.value) {
      return;
    }
    const playbackRate = items["playbackRate"].value;
    const videos = document.getElementsByTagName("video");
    Array.from(videos).forEach((v) => {
      v.playbackRate = playbackRate;
    });
  });
}
document.addEventListener("DOMNodeInserted", nodeInsertedCallback);