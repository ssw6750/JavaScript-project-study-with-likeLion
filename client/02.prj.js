let imgs = [
  {url:"./assets/img01.jpg"},
  {url:"./assets/img02.jpg"},
  {url:"./assets/img02.jpg"},
  {url:"./assets/img02.jpg"},
  {url:"./assets/img02.jpg"},
  {url:"./assets/img02.jpg"},
]


const container = document.querySelector('.container')
const light_box = document.querySelector('.light_box')
const light_box__img = document.querySelector('.light_box__img')
const body = document.querySelector('body')



//구조분해 할당
imgs.map(({url}, index) => {
  const img_box = document.createElement('div')
  // 노드의 클래스 접근
  img_box.className='img_box'
  img_box.index = index
  img_box.style.backgroundImage = `url(${url})`
  img_box.addEventListener("click", click);
  container.appendChild(img_box)
})

function click(e) {
  light_box.style.display='block'
  light_box__img.style.backgroundImage=`url(${imgs[e.target.index].url})`

  const darkFiltering = document.createElement('div')
  darkFiltering.className='dark_filtering'
  body.appendChild(darkFiltering)
}