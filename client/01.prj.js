/* 
  팔요한 문법
  돔객체 접근
  Date 객체
  형변환
  두자리수 맞추기
  setTimeInter
  https://velog.io/@public_danuel/this-in-setinterval
*/
const clockElement = document.getElementById("clock");

// const getClock = () => {
//   let date = new Date();
//   let hours = String(date.getHours()).padStart(2, 0)
//   let minutes = String(date.getMinutes()).padStart(2, 0)
//   let seconds = String(date.getSeconds()).padStart(2, 0)
//   let AMPM = "AM"
//   hours > 12 ?
//       ( AMPM="PM",
//         hours-=12) :(AMPM="AM");
//   clockElement.innerHTML=`${hours}:${minutes}:${seconds} ${AMPM}`;
// }

// getClock();
// setInterval(getClock, 1000)


/* setInterval()의 렉시컬 스코프는 전역객체이다.
  setInterval()를 사용하여 clock.getClock() 함수를 호출했을 때 호출한 함수를 통해서 clock 객체를 다룰 수는 없는 것인가??
  정리하자면 setInterval()의 매캐변수로 객체의 메소드를 사용한다면 렉시컬 스코프가 해당 객체가 아닌 전역객체가 된다.? => 지양해야하는가?*/
// const clock = {
//   hours: '',
//   minutes: '',
//   seconds: '',
//   AMPM: "AM",

//   getClock: function() {
//     console.log(this.hours);

//     const date = new Date();
//     this.hours = String(date.getHours()).padStart(2, 0);
//     this.minutes = String(date.getMinutes()).padStart(2, 0);
//     this.seconds = String(date.getSeconds()).padStart(2, 0);

//     this.getAMPM();

//     // console.log(this);
//     clockElement.innerHTML=`${this.hours}:${this.minutes}:${this.seconds} ${this.AMPM}`;
//   },
//   getAMPM: function() {
//     this.hours > 12 ?
//       ( this.AMPM="PM",
//         this.hours-=12) :(this.AMPM="AM");
//   }  
// } 

// clock.getClock();
// setInterval(clock.getClock, 1000)/*  */






/* 코드가 어색하다. 객체끼리 쫀쫀하게 뭉치지 못한 느낌..? */
// const clock = {
//   hours: '',
//   minutes: '',
//   seconds: '',
//   AMPM: 'AM',

//   getClock: function() {
//     const date = new Date();
//     this.hours = String(date.getHours()).padStart(2, 0);
//     this.minutes = String(date.getMinutes()).padStart(2, 0);
//     this.seconds = String(date.getSeconds()).padStart(2, 0);

//     /* this.getAMPM이 아니여서 어색한 느낌*/
//     this.AMPM = clock.getAMPM(this.hours);

//     // console.log(this);
//     clockElement.innerHTML=`${this.hours}:${this.minutes}:${this.seconds} ${this.AMPM}`;
//   },

//   getAMPM: function(hours) {
//     if (hours>12) {
//       this.hours = hours-12;
//       return "PM"
//     } else {
//       return "AM"
//     }
//   }
// } 

// clock.getClock();
// setInterval(clock.getClock, 1000)


/* ----------------------------------중첩 함수------------------------------------- */
// const clock = {
//   hours: '',
//   minutes: '',
//   seconds: '',
//   AMPM: "AM",

//   getClock: function() {
//     console.log(this.hours);

//     const date = new Date();
//     this.hours = String(date.getHours()).padStart(2, 0);
//     this.minutes = String(date.getMinutes()).padStart(2, 0);
//     this.seconds = String(date.getSeconds()).padStart(2, 0);

//     function getAMPM() {
//     this.hours > 12 ?
//       ( this.AMPM="PM",
//         this.hours-=12) :(this.AMPM="AM");
//     }  

//     getAMPM()
//     clockElement.innerHTML=`${this.hours}:${this.minutes}:${this.seconds} ${this.AMPM}`;
//   }, 
// } 

// clock.getClock();
// setInterval(clock.getClock, 1000)

/* ----------------------------------this를 가리키는 변수 생성-------------------------------------- */
// const clock = {
//   hours: '',
//   minutes: '',
//   seconds: '',
//   AMPM: "AM",

//   getAMPM: function() {
//   this.hours > 12 ?
//     ( this.AMPM="PM",
//       this.hours-=12) :(this.AMPM="AM");
//   },  

//   getClock: function() {
//     console.log(this.hours);

//     const date = new Date();
//     this.hours = String(date.getHours()).padStart(2, 0);
//     this.minutes = String(date.getMinutes()).padStart(2, 0);
//     this.seconds = String(date.getSeconds()).padStart(2, 0);

//     this.getAMPM();

//     console.log(this);
//     clockElement.innerHTML=`${this.hours}:${this.minutes}:${this.seconds} ${this.AMPM}`;
//   },

//   exeClock: function() {
//     this.getClock();
//     // setInterval(this.getClock, 1000)
//     setInterval(function() {
//       this.getClock();
//       console.log(this.getClock)
//     }, 1000)
//   },
// } 

// clock.exeClock();


/* ----------------------------------this를 가리키는 변수 생성-------------------------------------- */
// const clock = {
//   hours: '',
//   minutes: '',
//   seconds: '',
//   AMPM: "AM",

//   getAMPM: function() {
//   this.hours > 12 ?
//     ( this.AMPM="PM",
//       this.hours-=12) :(this.AMPM="AM");
//   },  

//   getClock: function() {
//     const date = new Date();
//     this.hours = String(date.getHours()).padStart(2, 0);
//     this.minutes = String(date.getMinutes()).padStart(2, 0);
//     this.seconds = String(date.getSeconds()).padStart(2, 0);

//     this.getAMPM();
//     clockElement.innerHTML=`${this.hours}:${this.minutes}:${this.seconds} ${this.AMPM}`;
//   },

//   exeClock: function() {
//     this.getClock();
//     var self = this;
//     setInterval(function() {self.getClock()}, 1000)
//   },
// } 

// clock.exeClock();


/* ----------------------------------화살표 함수 활용-------------------------------------- */
const clock = {
  hours: '',
  minutes: '',
  seconds: '',
  AMPM: "AM",

  getAMPM: function() {
  this.hours > 12 ?
    ( this.AMPM="PM",
      this.hours-=12) :(this.AMPM="AM");
  },  

  getClock: function() {
    const date = new Date();
    this.hours = String(date.getHours()).padStart(2, 0);
    this.minutes = String(date.getMinutes()).padStart(2, 0);
    this.seconds = String(date.getSeconds()).padStart(2, 0);

    this.getAMPM();
    clockElement.innerHTML=`${this.hours}:${this.minutes}:${this.seconds} ${this.AMPM}`;
  },

  exeClock: function() {
    this.getClock();
    setInterval(()=>{this.getClock()}, 1000)
  },
} 

clock.exeClock();



















/* --------스코프 연습-------------------------- */
/* const aa = 123
function test() {
  console.log(aa);
  const a = 1;
  test2(function() {console.log(a);});
  // test2(()=>{console.log(a);});
  // console.log(a+a);

}
// const test2 = (f) => {
//   f();
//   // console.log("hello");
//   // console.log(a);
// }

function test2(f) {
  f();
  console.log(a)
}

test(); 
// console.log(a) */

/* ------------------------------------------ */
// const person = {
//   name : "name",
//   print: function() {
//     setInterval(function() {
//       const name = "bbb";
//       console.log(name);
//     }, 1000);
//   }
// }

// const name= "aaa"
// person.print();

/* ---------------------------------- */
// const person = {
//   name : "bbb",
//   print: function() {
//     //const name= "ccc"
//     setInterval(function() {
//       //const name= "ddd"
//       console.log(this.name);
//       console.log(name);
//     }, 1000);
//   }
// }

// const name= "aaa"
// person.print();