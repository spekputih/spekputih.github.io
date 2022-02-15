let body = document.querySelector("body");
let navbarItems = document.querySelectorAll(".navigationItem");
let isChecked = false;
// console.log(navbarItem);
// console.log(body.clientHeight);
// console.log(window.innerHeight * 0.8);
// console.log(window.scrollY);
document.addEventListener("scroll", function (e) {
//   console.log(window.scrollY, window.innerHeight);
  if (window.scrollY >= window.innerHeight * 0.8 && !isChecked) {
    navbarItems.forEach((navbarItem) => {
      navbarItem.classList.remove("text-slate-100");
      navbarItem.classList.add("text-gray-900");
    });
    isChecked = true;
  }
  if (window.scrollY <= window.innerHeight * 0.8 && isChecked) {
    navbarItems.forEach((navbarItem) => {
      navbarItem.classList.remove("text-gray-900");
      navbarItem.classList.add("text-slate-100");
    });
    isChecked = false;
  }
});




function getElement(el){
    return document.querySelector(el)
}


fetch("./pages/data.json")
  .then((response) => {
    return response.json();
  }).then(jsondata => {
      console.log(jsondata.workExperience)
        const workExperience = jsondata.workExperience
        
        const workExperienceSection = document.querySelector("#work-experience");
        let show = 'hidden'
        workExperience.forEach((work, index)=>{
            let element = document.createElement('div')
            if(index == 0) {
                show = 'block'
            }
            element.innerHTML = `
            <div id="${ work.id }" class = "${ show } workResButton">
            <!-- position -->
            <div class="font-sans font-semibold text-xl text-slate-100">
            ${work.position}
            <!-- linkable company name -->
            <span class="text-yellow-400 text-sm cursor-pointer"><a href="http://">@${work.companyName}</a></span>
            </div>
            <!-- date in date out -->
            <div class="font-mono font-semibold text-sm text-slate-200 py-2">
            ${work.workingPeriod}
            </div>
            <!-- job description -->
            <ul id='${work.id}-experience-list' class="font-sans font-semibold text-slate-200 text-sm text-justify ${ show }">
            </ul>
                
            </div>`
            workExperienceSection.appendChild(element) 
            
            const experienceListSection = document.querySelector(`#${ work.id }-experience-list`)
            
            work.jobDescription.forEach((el, x)=>{
                let elementChild = document.createElement('div')

            
                elementChild.innerHTML = `<li class="flex items-start w-full my-2 tracking-wide">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                    <div class="w-full ml-3 ">${el}</div>
                    </li>`
                elementChild.id = `${work.id}-experience-list-${x}`
                // console.log(el, work.id, experienceListSection, elementChild)
                
                experienceListSection.appendChild(elementChild)
            })
            show = 'hidden'
        })
        
        const cenergi = document.querySelector('#cenergi-sea')
        const phn = document.querySelector('#phn-industry')
        // const cenergiButton = document.querySelector('#cenergiButton')
        // const phnButton = document.querySelector('#phnButton')
        
        const workButtons = document.querySelectorAll(".workButton")
        const workResButtons = document.querySelectorAll(".workResButton")
        
        let prevJD = document.querySelector('#iium1Button-response')
        let clickedJD

        console.log(workResButtons, prevJD)
        
        workButtons.forEach((el)=>{
            el.addEventListener('click', ()=>{
                workResButtons.forEach((res)=>{
                    // console.log(res.id.substr(0, res.id.length - 9))
                    if (res.id.substr(0, res.id.length - 9) == el.id){
                        console.log(res)
                        clickedJD = res
                    }
                })
                
                if(prevJD !== clickedJD){
                    console.dir(clickedJD.childNodes[11].classList)
                    clickedJD.classList.remove('hidden')
                    clickedJD.childNodes[11].classList.remove('hidden')
                    prevJD.classList.add('hidden')
                    prevJD.childNodes[11].classList.remove('hidden')
                    prevJD = clickedJD
                }
                
                
            })
        })         


  });
  



