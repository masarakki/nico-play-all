import $ from 'jquery';

const appendIfNotVisited = (video) => {
  const url = $('a.link', video).attr('href');

  chrome.runtime.sendMessage({url}, response => {
    if (!response.visited) {
      $('.nextPlayButton', video).trigger('click');
    }
  });
};

const playAll = () => {
  $('.contentItemList .thumbnailContainer')
    .each((_, video) => appendIfNotVisited($(video)) );
};

chrome.runtime.onMessage.addListener(e => {
  playAll();
});
