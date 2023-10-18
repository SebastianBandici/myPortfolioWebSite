const tabLinksEl = document.getElementsByClassName("tab-links")
const tabContentsEl = document.getElementsByClassName("tab-contents")

function openTab(tabName){
    for(tabLink of tabLinksEl){
        tabLink.classList.remove("active-link")
    }
    for(tabContent of tabContentsEl){
        tabContent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabName).classList.add("active-tab")
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbyYOMAfl4-uQqumTJD3wjxVCTiKe-Q5bfpozUH5KplnJ96kYVlQhYH0vuNjeVKFlVpx/exec'
const form = document.forms['submit-to-google-sheet']
const msgEl = document.getElementById('msg')

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msgEl.innerHTML = 'Message sent successfuly'
        setTimeout(function(){
            msgEl.innerHTML = ''
        }, 5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

