// 要素ら

var el_right = document.getElementById('right');
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

el_right.addEventListener('mousedown', function(event) {
  updateEventname('Right');
  // updateXY(event);
  el_right.style.backgroundColor = 'red';
}, false);

el_right.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  updateEventname('-');
  // updateXY(event);
}, false);

el_right.addEventListener('mouseup', function(event) {
  updateEventname('-');
  // updateXY(event);
  el_right.style.backgroundColor = 'blue';
}, false);
