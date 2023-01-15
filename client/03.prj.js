let imgs = [
  {url:"./assets/img01.jpg"},
  {url:"./assets/img02.jpg"},
  {url:"./assets/img03.jpg"},
  {url:"./assets/img04.jpg"},
  {url:"./assets/img05.jpg"},
  {url:"./assets/img06.jpg"},
]

const numberOfImagesInCarousel = 3;
const imgWidth = 500;
const imgHeight = 400;
const carouselGap = 30;
const carouselSpace = imgWidth+carouselGap;
const carousel_imgs = document.querySelector('.carousel_imgs')
const container = document.querySelector('.container')
const carousel__left_btn = document.querySelector('.carousel__left_btn')
const carousel__right_btn = document.querySelector('.carousel__right_btn')
const carousel_wrapper = document.querySelector('.carousel_wrapper')


// 화살표함수는 호이스팅이 발생하지 않음
const checkIndex = () => {
  carousel_imgs.style.left = `${-carouselSpace*(container.dataset.index)}px`
  if (+container.dataset.index === 0) {
    carousel__left_btn.style.display='none'
    carousel__right_btn.style.display='flex'
  }
  if (+container.dataset.index === imgs.length-numberOfImagesInCarousel){
    carousel__right_btn.style.display='none'
    carousel__left_btn.style.display='flex'
  }
  if (0<+container.dataset.index&&+container.dataset.index< imgs.length-numberOfImagesInCarousel){
    carousel__left_btn.style.display='flex'
    carousel__right_btn.style.display='flex'
  }
}

//너무 직접적으로 할당하는 느낌... 태그내에서 dataset 선언은 더블쿼토 필요...왜와이
// 인덱스가 스트링이로 입력됨
carousel_wrapper.style.width=`${numberOfImagesInCarousel*imgWidth+carouselGap*(numberOfImagesInCarousel-1)}px`
carousel_wrapper.style.height=`${imgHeight}px`;
container.dataset.index=0
carousel_imgs.style.left = -carouselSpace*(container.dataset.index)
carousel_imgs.style.gap= `${carouselGap}px`
checkIndex()


imgs.map(({url}, index)=>{
  const img_tmp = document.createElement('div') 
  img_tmp.classList.add('carousel_img')
  img_tmp.style.width=`${imgWidth}px`;
  img_tmp.style.backgroundImage=`url(${url})`
  img_tmp.dataset.index=index;
  img_tmp.dataset.name='carousel_img';
  carousel_imgs.insertAdjacentElement("beforeend", img_tmp)
})


const click_handler = (e) => {
  let target = e.target

  while(!(target.getAttribute('data-name'))){
    if(target.nodeName === 'BODY') {
      target=null;
      return
    }
    target=target.parentNode;
  }

  if (target.dataset.name==='carousel__left_btn') {
    container.dataset.index=+(container.dataset.index)-1
    checkIndex()
  }
  if (target.dataset.name==='carousel__right_btn') {
    container.dataset.index=+(container.dataset.index)+1
    checkIndex()
  }
}

const mousedown_handler = (e) => {
  e.preventDefault()
  let target = e.target

  while(!(target.getAttribute('data-name'))){
    if(target.nodeName === 'BODY') {
      target=null;
      return
    }
    target=target.parentNode;
  }

  if (target.dataset.name === 'carousel_img') {
    //carousel_imgs의 transition만 바꾸는 법 모르겠음,,,
    carousel_imgs.className='carousel_transition'
    carousel_imgs.style.gap= `${carouselGap}px`
    container.dataset.offset = e.clientX
    container.dataset.leftValue= parseInt(carousel_imgs.style.left)
    document.body.addEventListener("mousemove", mousemove_handler)
  }
}

const mouseup_handler = (e) => {
  carousel_imgs.className='carousel_imgs'
  carousel_imgs.style.gap= `${carouselGap}px`
  if (parseInt(carousel_imgs.style.left) > 0) {;
    container.dataset.index=0
  } else if (parseInt(carousel_imgs.style.left) < -carouselSpace*(imgs.length-numberOfImagesInCarousel)) {
    container.dataset.index=(imgs.length-numberOfImagesInCarousel)
  } else {
    container.dataset.index=Math.round(parseInt(carousel_imgs.style.left)/-carouselSpace)
  }
  checkIndex()
  document.body.removeEventListener("mousemove", mousemove_handler)

}

const mousemove_handler = (e) => {
  carousel_imgs.style.left = `${(container.dataset.leftValue - (container.dataset.offset-e.clientX))}px`
}



document.body.addEventListener("click", click_handler)
document.body.addEventListener("mousedown", mousedown_handler)
document.body.addEventListener("mouseup", mouseup_handler)
document.body.addEventListener("mouseleave", mouseup_handler)

// 이벤트가 자기 자신을 해체할 수 있나..?
// scrollleft ?
//let outer = gallery.getBoundingClientRect();
//let inner = carousel.getBoundingClientRect();
