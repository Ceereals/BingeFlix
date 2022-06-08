var a = true;
function handleClick(tab) {
  a = !a;
browser.tabs.sendMessage(tab.id, { a: a}).then(() => {    // If you want to something with the content, you will need a content script and messaging
  if (a) {
  browser.notifications.create("enabled",{
      "type": "basic",
      "iconUrl": browser.runtime.getURL("icons/netflixicon.svg"),
      "title": "BingeFlix",
      "message": "Auto skip intro and episode disabled"
  });
} else {
  browser.notifications.create("disabled",{
      "type": "basic",
      "iconUrl": browser.runtime.getURL("icons/netflixicon.svg"),
      "title": "BingeFlix",
      "message": "Auto skip intro and episode enabled"
    });
}
});
}

browser.browserAction.onClicked.addListener(handleClick);
