// 要素ら

var el_hitarea = document.getElementById('hitarea');
var el_right = document.getElementById('right');
var el_left = document.getElementById('left');
var el_down = document.getElementById('down');
var el_eventname = document.getElementById('eventname');
// var el_x = document.getElementById('x');
// var el_y = document.getElementById('y');

// 表示をアップデートする関数群
//
// var updateXY = function(event) {
//   el_x.innerHTML = event.changedTouches[0].pageX;
//   el_y.innerHTML = event.changedTouches[0].pageY;
// };
var updateEventname = function(eventname) {
  el_eventname.innerHTML = eventname;
};

// イベント設定

el_hitarea.addEventListener('mousedown', function(event) {
  updateEventname('UP');
  // updateXY(event);
  el_hitarea.style.backgroundColor = 'red';
}, false);

el_hitarea.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  updateEventname('');
  // updateXY(event);
}, false);

el_hitarea.addEventListener('mouseup', function(event) {
  updateEventname('');
  // updateXY(event);
  el_hitarea.style.backgroundColor = 'blue';
}, false);


// イベント設定 RIGHT

el_right.addEventListener('mousedown', function(event) {
  updateEventname('Right');
  // updateXY(event);
  el_right.style.backgroundColor = 'red';
}, false);

el_right.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  updateEventname('');
  // updateXY(event);
}, false);

el_right.addEventListener('mouseup', function(event) {
  updateEventname('');
  // updateXY(event);
  el_right.style.backgroundColor = 'blue';
}, false);

// イベント設定 LEFT

el_left.addEventListener('mousedown', function(event) {
  updateEventname('Left');
  // updateXY(event);
  el_left.style.backgroundColor = 'red';
}, false);

el_left.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  updateEventname('');
  // updateXY(event);
}, false);

el_left.addEventListener('mouseup', function(event) {
  updateEventname('');
  // updateXY(event);
  el_left.style.backgroundColor = 'blue';
}, false);

// イベント設定 DOWN

el_down.addEventListener('mousedown', function(event) {
  updateEventname('Down');
  // updateXY(event);
  el_down.style.backgroundColor = 'red';
}, false);

el_down.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  updateEventname('');
  // updateXY(event);
}, false);

el_down.addEventListener('mouseup', function(event) {
  updateEventname('');
  // updateXY(event);
  el_down.style.backgroundColor = 'blue';
}, false);
