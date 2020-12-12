/* eslint-disable no-param-reassign */
function moveScroll(start, end, dom, prop) {
  // 距离，速度
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    dom[prop] = start + dis;
    if (Math.abs(dis) >= Math.abs(end)) {
      dom[prop] = start + end;
      clearInterval(t);
    }
  }, 2);
}

export default { moveScroll };
