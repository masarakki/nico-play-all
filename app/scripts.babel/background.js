'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
  chrome.tabs.query({url: 'http://www.nicovideo.jp/watch/sm*/videoExplorer'}, tabs => {
    tabs.forEach(tab => chrome.pageAction.show(tab.id));
  });
});

const updatePageAction = (tab) => {
  if (tab.url.match(/http:\/\/www.nicovideo.jp\/watch\/.+\/videoExplor/)) {
    chrome.pageAction.show(tab.id);
  } else {
    chrome.pageAction.hide(tab.id);
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  updatePageAction(tab);
});

chrome.pageAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, {action: 'playAll'});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.history.getVisits({url: request.url}, visits => {
    sendResponse({visited: visits.length > 0});
  });
  return true;
});
