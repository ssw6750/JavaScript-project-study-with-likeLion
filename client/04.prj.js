const searchBar = document.querySelector('.searchBar')
const autoComplete = document.querySelector('.autoComplete')
const searchForm = document.querySelector('.searchForm')


let suggestion = [
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

function getCryptoKey() {
  const arr = new Uint32Array(1)
  return window.crypto.getRandomValues(arr)[0]
}



function searchBarClickHandler(e) {
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
    // searchBar.style.border-radius = ''
    // searchBar.classList.add('searchBar-border')
  }

  if(target.dataset.name==='body') {
    autoComplete.style.display = 'none'
    console.log(searchBar.classList);
    // if ()
    // searchBar.classList.remove('searchBar-border')
  }

  if(target.dataset.name==='autoCompleteWord') {
    searchBar.value = target.innerText
    searchBar.classList.remove('searchBar-border')
    // 다시 로직 수행
  }
}

function searchSubmitHandler(e) {
  // submit이 수행되면 value가 초기화 됨
  e.preventDefault();
  const searchValue = searchBar.value
  const key = getCryptoKey()

  // key value validation 함수로 만들어줘야하는데 귀찮
  localStorage.setItem(key, searchValue)
  open(`https://www.google.co.kr/search?q=${searchValue}`)
  // getAutoCompleteList()
}

function autoCompleteHandler(e) {
  console.log('autoCompleteHandler가 눌렸어요');
  console.log(Boolean(e.target.innerText));
  // console.log(e.target.value);
  let inputValue
  if(e.target.innerText) {
    inputValue = e.target.innerText
  } else {
    inputValue = e.target.value
  }
  const autoCompleteList = getAutoCompleteList(inputValue)

  // 메모리 관련해서 궁금함 - 자기 자식 메모리 모두 반환??
  autoComplete.innerHTML = ''
  autoCompleteList.forEach((value)=>{
    console.log(value);
    const autoCompleteWord = document.createElement('div')
    autoCompleteWord.classList.add('autoCompleteWord')
    autoCompleteWord.innerText = value
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

function getAutoCompleteList(inputValue) {
  let storage = Object.values(localStorage)
  storage = [...storage, ...suggestion]
  let autoCompleteList = []
  console.log(storage);
  storage.forEach((data)=>{
    if(checkAutoComplete(inputValue.toLowerCase(),data.toLowerCase())){
      autoCompleteList.push(data)
    }
  })
  // autoCompleteList.sort()
  return autoCompleteList
}

function checkAutoComplete(inputValue, data) {
  let matchscore = 0
  const inputValueArr = [...inputValue]
  const compareData = [...data]
  inputValueArr.forEach((s, index)=>{
    if (s === compareData[index]){
      matchscore= matchscore+100
    }
  })
  matchscore = (matchscore/inputValueArr.length)
  // console.log(matchscore);
  if (matchscore>90) {
    return true
  } else {
    return false
  }

}

document.body.addEventListener('click', searchBarClickHandler)
searchForm.addEventListener('submit', searchSubmitHandler)
searchBar.addEventListener('input', autoCompleteHandler)