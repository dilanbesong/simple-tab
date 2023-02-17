const createButton = qs('.create')
const tabs = qs('.tabs')
const addbutton = qs('#add')
const allInfo = qs('.allInfo')
const loader = qs('[data-loader]')
const slide = qsA('[data-slide]')
const body = qs('body')


let tabInfo = []
let tabIndex = -1

let tabIdNumber

addbutton.style.display = 'none'

function qs( selector, parent=document){
    return parent.querySelector(selector) 
}
function cE( element){
    return document.createElement(element) 
}
function qsA(selector){
    return document.querySelectorAll(selector)
}

createButton.addEventListener('click', () => {
     for(let i =0; i<= slide.length-1; i++){
          loader.classList.add('overlay')
          slide[i].classList.add('slide')
   
           setTimeout( () => {
             loader.classList.remove('overlay')
             slide[i].classList.remove('slide')
        }, 500)
    }
    tabIndex++
    const tab = cE('div')
    tab.id = tabIndex
    tab.classList.add('tab')
    tab.textContent = `New tab (${tabIndex})`
    const closeTab = cE('span')
    closeTab.innerHTML = '&times'
    tab.append(closeTab)
    tabs.append(tab)
    tabInfo = [...tabInfo, { tabIndex, items:[] }]
    
   tab.addEventListener('click', () => {
      qs('input').value = ''
       addbutton.style.display = 'inline'
       tabIdNumber = tab.id

       const oldTabOject = tabInfo.find( tab => tab.tabIndex == tabIdNumber)
        if(!oldTabOject) return
       allInfo.innerHTML = oldTabOject.items.map( item => {
          return `<h3>${item}</h3>`
       }).join('')
 
   })

   closeTab.addEventListener('click', () => {
    let parentTabIndex = closeTab.parentNode.id
    
    tabInfo = tabInfo.filter( tab => tab.tabIndex !== parseInt(parentTabIndex))
     qs('nav').removeChild(closeTab.parentNode)
     if(tabInfo.length === 0){
        addbutton.style.display = 'none'
     }
     allInfo.innerHTML = ''
     console.log('Array size is ' + tabInfo.length);
   })

})

addbutton.addEventListener('click', () => {
   
     if(qs('input').value === '') return
     const getSpecificTab = tabInfo.find( tab => tab.tabIndex == tabIdNumber)
     getSpecificTab.items.push(qs('input').value)

   allInfo.innerHTML =  getSpecificTab.items.map( item => {
        return `<h3>${item}</h3>`
     }).join('')

     qs('input').value = ''

 })
