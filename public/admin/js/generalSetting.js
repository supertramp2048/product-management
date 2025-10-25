
const socialContainer = document.getElementById("social-media-list")
const formUpdateSetting = document.getElementById("formChangeSetting")
const parrentSocialDiv = document.getElementById("socialMediaContainer")
let logoSocialMedia = socialContainer.querySelectorAll('input[name=logoSocialMedia]')
let childSocialContainer = document.querySelector('[socialMediaList]')
let linkSocialMedia = socialContainer.querySelectorAll('input[name=linkSocialMedia]')
let objSocialMedia = parrentSocialDiv.querySelector('input[name=objSocialMedia]')
let btnAddnewSocialmedia = socialContainer.querySelector('[addNewSocialMedia]')
btnAddnewSocialmedia.addEventListener('click', () =>{
    const div1 = document.createElement('div')
    div1.className = 'flex items-center gap-4'

    // con cua div
    const inputLogo = document.createElement('input')
    inputLogo.type = 'text'
    inputLogo.name = 'logoSocialMedia'
    inputLogo.placeholder = 'Icon (link SVG, tên icon, ...)'
    inputLogo.className = 'border px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-400'
    inputLogo.required = true
    div1.appendChild(inputLogo)
    // -------
    const inputLink = document.createElement('input')
    inputLink.type = 'text'
    inputLink.name = 'linkSocialMedia'
    inputLink.placeholder = 'Link Facebook/Messenger/Zalo...'
    inputLink.className = 'border px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-400'
    inputLink.required = true
    div1.appendChild(inputLink)

    childSocialContainer.appendChild(div1)
})
let arr = []

formUpdateSetting.addEventListener("submit", function(e){
    e.preventDefault()
    let newlogoSocialMedia = socialContainer.querySelectorAll('input[name=logoSocialMedia]')
    let newlinkSocialMedia = socialContainer.querySelectorAll('input[name=linkSocialMedia]')
    for(let i=0; i< newlogoSocialMedia.length; i++) {
    arr.push({
    logoSocialMedia: newlogoSocialMedia[i].value,
    linkSocialMedia: newlinkSocialMedia[i].value
      })
    }
    objSocialMedia.value = JSON.stringify(arr)
    this.submit()
})

