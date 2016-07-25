document.getElementById('play_all').addEventListener('click', e => {
  console.log(e);
  chrome.tabs.getCurrent(tab => {
    console.log(tab);
  });
});
