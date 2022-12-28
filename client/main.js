/* 
  팔요한 문법
  돔객체 접근
  Date 객체
  형변환
  두자리수 맞추기
  setTimeInter
*/
const clockElement = document.getElementById("clock");
clockElement.innerHTML="12345"
// clockElement.innerHTML = "1234"
// clockElement.innerText = "12345"

const getClock = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, 0)
  const minutes = String(date.getMinutes()).padStart(2, 0)
  const seconds = String(date.getSeconds()).padStart(2, 0)
  
  clockElement.innerHTML=`${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000)
