const searchBar = document.querySelector('.searchBar')
const autoComplete = document.querySelector('.autoComplete')
const searchForm = document.querySelector('.searchForm')


// 미리 저장된 데이터 (서버데이터라 가정)
let suggestion = [
  'getTest',
  'searchBarClickHandler',
  'getCryptoKey',
  'Uint32Array',
  'getRandomValues',
  'window',
  'target',
  'searchBar',
  'getAttribute',
  'autoComplete',
  'border',
  'searchSubmitHandler',
  'preventDefault',
  'getCryptoKeys',
  'localStorage',
  'getAutoCompleteList',
]


// 로컬스토리지와 미리 저장된 suggestion데이터를 묶어서 배열로 반환하는 함수
function getStorage () {
  const localS = Object.values(localStorage)
  const data = [...suggestion, ...localS]
  return data
}


// 단어가 이미 저장되어 있는지 확인하는 함수
function checkStorage (key, value) {
  const data = getStorage()
  for (let v of data) {
    console.log(v);
    if (value === v) return
  }
  localStorage.setItem(key, value)
}


// 로컬스토리지에 저장할때 램덥값이 키를 반환하는 함수
function getCryptoKey() {
  const arr = new Uint32Array(1)
  return window.crypto.getRandomValues(arr)[0]
}


// 이벤트 위임 (body click시)
function bodyClickHandler(e) {
  let target = e.target

  while(!(target.getAttribute('data-name'))){
    if(target.nodeName === 'BODY') {
      target=null;
      return
    }
    target=target.parentNode;
  }

  if(target.dataset.name==='searchBar') {
    autoComplete.style.display = 'block'
  }

  if(target.dataset.name==='body') {
    autoComplete.style.display = 'none'
    // searchBar.classList.remove('searchBar-border')
  }

  // 연관 검색어를 눌렀을때
  if(target.dataset.name==='autoCompleteWord') {
    searchBar.value = target.innerText
    // searchBar.classList.remove('searchBar-border')
  }
}


// 검색 submit 핸들러
function searchSubmitHandler(e) {
  // submit이 수행되면 value가 초기화 됨
  e.preventDefault();

  // 임의값을 key, 검색어를 value로 로컬스토리지에 저장함
  const searchValue = searchBar.value
  const key = getCryptoKey()

  checkStorage(key,searchValue)

  // 링크에 쿼리를 부여하여 새창을 열음
  open(`https://www.google.co.kr/search?q=${searchValue}`)
}


// 자동완성로직
function autoCompleteHandler(e) {
  // 이벤트의 타겟에 맞게  inputValue 설정 ()
  // 인풋요소이면 value로 받고 div요소이면 innerText로 받는다
  // console.log(e.target.innerText);

  let inputValue
  if(e.target.innerText) {
    inputValue = e.target.innerText
  } else {
    inputValue = e.target.value
  }
  //getAutoCompleteList() 를 통해서 inputValue에 맞는 연관검색어 리스트를 받아옴
  const autoCompleteList = getAutoCompleteList(inputValue)

  // 먼저 autoComplete의 inner Html초기화 - 중복을 막기위해
  // 메모리 관련해서 궁금함 - 자기 자식 메모리 모두 반환??
  autoComplete.innerHTML = ''

  // 리스트를 순환하면서 요소를 생성하여 autoComplete에 추가함
  autoCompleteList.forEach((value)=>{
    const autoCompleteWord = document.createElement('div')
    autoCompleteWord.classList.add('autoCompleteWord')
    autoCompleteWord.innerText = value.data

    // Body의 이벤트 위임에서 확인하여 autoCompleteHandler을 다시 실행할 수 있게하기 위한 dataset.name 설정
    autoCompleteWord.dataset.name = 'autoCompleteWord'
    autoComplete.insertAdjacentElement("beforeend", autoCompleteWord)

    //autoCompleteWord 에 이벤트 리스너 추가
    autoCompleteWord.addEventListener('click', autoCompleteHandler)
  })

  // 자동완성 검색어가 있으면 border디자인 변경
  if(autoComplete.innerHTML) {
    searchBar.classList.add('searchBar-border') 
  }
}


// 연관검색어 리스트를 반환하는 함수
function getAutoCompleteList(inputValue) {
  let storage = getStorage()

  // 반활할 리스트 생성
  let autoCompleteList = []

  // storage배얄을 순환하면서 checkAutoComplete()를 실행하여 연관검색어인지 체크
  storage.forEach((data)=>{
    let score = checkAutoComplete(inputValue.toLowerCase(),data.toLowerCase())
    if(score){
      autoCompleteList.push({'data':data, 'score':score})
    }
  })

  // 유사도가 높은 순서대로 가져옴
  // 유사도가 같은 것은 글자수가 작은 순으로 하고 싶은데 sort문에 어떻게 넣어야 할지 모르겠음..
  autoCompleteList.sort((a,b)=>a.score < b.score ? 1:-1)
  autoCompleteList=autoCompleteList.slice(0,5)
  // autoCompleteList.sort()
  return autoCompleteList
}


// 현재 input요소에 입력된 value와 storage배열 속 단어가 유사한지 확인
function checkAutoComplete(inputValue, data) {

  // 유사도 점수
  let matchscore = 0

  // 단어들을 배열로 변경
  const inputValueArr = [...inputValue]
  const compareData = [...data]

  // 한글자식 비교하면서 일치하면 점수 부여
  // startsWith 사용하면??
  inputValueArr.forEach((s, index)=>{
    if (s === compareData[index]){
      matchscore= matchscore+100
    }
  })

  // 점수를 inputValueArr의 길이로 나눠 0~100사이의 수로 나오게 설정
  matchscore = (matchscore/inputValueArr.length)

  // 단어 길이 차이에 대한 가중치 부여
  matchscore = matchscore - Math.abs(inputValueArr.length - compareData.length)

  //80점이 넘으면 해당 true 반환
  if (matchscore>80) {
    return matchscore
  } else {
    return 0
  }
}


document.body.addEventListener('click', bodyClickHandler)
searchForm.addEventListener('submit', searchSubmitHandler)
searchBar.addEventListener('keyup', autoCompleteHandler)

//toLocaleLowerCase()

