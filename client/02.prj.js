let imgs = [
  {url:"./assets/img01.jpg"},
  {url:"./assets/img02.jpg"},
  {url:"./assets/img03.jpg"},
  {url:"./assets/img04.jpg"},
  {url:"./assets/img05.jpg"},
  {url:"./assets/img06.jpg"},
]


const container = document.querySelector('.container')
const light_box = document.querySelector('.light_box')
const light_box__img = document.querySelector('.light_box__img')
const body = document.querySelector('body')
const light_box__close = document.querySelector('.light_box__close')
const light_box__index = document.querySelector('.light_box__index')
const light_box__left_btn = document.querySelector('.light_box__left_btn')
const light_box__right_btn = document.querySelector('.light_box__right_btn')


//구조분해 할당
imgs.map(({url}, index) => {
  const img_box = document.createElement('div')
  // 노드의 클래스 접근
  img_box.className='img_box'
  img_box.index = index // 이렇게 해도 괜찮은가? 오염시키는 느낌? 이거 dataset써야함
  img_box.style.backgroundImage = `url(${url})`
  img_box.addEventListener("click", imgbox_click);

  container.appendChild(img_box)
})

light_box__close.addEventListener("click", light_box__close_click)
light_box__left_btn.addEventListener("click", light_box__left_btn_click)
light_box__right_btn.addEventListener("click", light_box__right_btn_click)


// const darkFiltering = document.createElement('div')
// darkFiltering.className='dark_filtering'

// 클로저 함수 제대로 쓴거 맞음??
function darkFiltering_click(e) {
    close()
}

function darkFilteringClouser(event) {
  const darkFiltering = document.createElement('div')
  darkFiltering.className='dark_filtering'
  darkFiltering.addEventListener("click", event)
  return function() {
    return darkFiltering
  }
}
const darkFiltering = darkFilteringClouser(darkFiltering_click)



// 이미지 박스 클릭 이벤트
function imgbox_click(e) {
  light_box.style.display='block';
  light_box.index=e.target.index;
  light_box__img.style.backgroundImage=`url(${imgs[e.target.index].url})`
  check_mark_arrow()

  //인덱싱
  light_box__index.innerHTML = `Image ${e.target.index+1} of ${imgs.length}`

  body.appendChild(darkFiltering())
}

function light_box__close_click(e) {
  close()
}

// 좀 더 클린코드로 작성할 수 있을것 같은데?
function light_box__left_btn_click(e) {
  (light_box.index > 0)&&(light_box__img.style.backgroundImage=`url(${imgs[--light_box.index].url})`)
  check_mark_arrow()
}

function light_box__right_btn_click(e) {
  (light_box.index < (imgs.length-1))&&(light_box__img.style.backgroundImage=`url(${imgs[++light_box.index].url})`)
  check_mark_arrow()
}

function check_mark_arrow() {
  if(light_box.index === 0) {
    light_box__left_btn.style.display = 'none'
    light_box__right_btn.style.display = 'flex'}
  if(light_box.index >= 1 && light_box.index <= imgs.length-2) {
    light_box__left_btn.style.display = 'flex'
    light_box__right_btn.style.display = 'flex'
  }
  if(light_box.index === imgs.length-1) {
    light_box__right_btn.style.display = 'none'
    light_box__left_btn.style.display = 'flex'
  }
}

function close(){
  light_box.style.display='none'
  body.removeChild(darkFiltering())
}


