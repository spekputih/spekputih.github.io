let body = document.querySelector("body");
let navbarItems = document.querySelectorAll(".navigationItem");
let isChecked = false;

// console.log(navbarItem);
// console.log(body.clientHeight);
// console.log(window.innerHeight * 0.8);
// console.log(window.scrollY);
document.addEventListener("scroll", function (e) {
  //   console.log(window.scrollY, window.innerHeight);
  if (window.scrollY >= window.innerHeight * 1 && !isChecked) {
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

function getElement(el) {
  return document.querySelector(el);
}

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => {
    console.log(jsondata.workExperience);
    const workExperience = jsondata.workExperience;

    const workExperienceSection = document.querySelector("#work-experience");
    let show = "hidden";
    workExperience.forEach((work, index) => {
      let element = document.createElement("div");
      if (index == 0) {
        show = "block";
      }
      element.innerHTML = `
            <div id="${work.id}" class = "${show} workResButton">
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
            <ul id='${work.id}-experience-list' class="font-sans font-semibold text-slate-200 text-sm text-justify ${show}">
            </ul>
                
            </div>`;
      workExperienceSection.appendChild(element);

      const experienceListSection = document.querySelector(
        `#${work.id}-experience-list`
      );

      work.jobDescription.forEach((el, x) => {
        let elementChild = document.createElement("div");

        elementChild.innerHTML = `<li class="flex items-start w-full my-2 tracking-wide">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                    <div class="w-full ml-3 ">${el}</div>
                    </li>`;
        elementChild.id = `${work.id}-experience-list-${x}`;
        // console.log(el, work.id, experienceListSection, elementChild)

        experienceListSection.appendChild(elementChild);
      });
      show = "hidden";
    });

    const cenergi = document.querySelector("#cenergi-sea");
    const phn = document.querySelector("#phn-industry");
    // const cenergiButton = document.querySelector('#cenergiButton')
    // const phnButton = document.querySelector('#phnButton')

    const workButtons = document.querySelectorAll(".workButton");
    const workResButtons = document.querySelectorAll(".workResButton");

    let prevJD = document.querySelector("#iium1Button-response");
    let clickedJD;

    console.log(workResButtons, prevJD);

    workButtons.forEach((el) => {
      el.addEventListener("click", () => {
        workResButtons.forEach((res) => {
          // console.log(res.id.substr(0, res.id.length - 9))
          if (res.id.substr(0, res.id.length - 9) == el.id) {
            console.log(res);
            clickedJD = res;
          }
        });

        if (prevJD !== clickedJD) {
          console.dir(clickedJD.childNodes[11].classList);
          clickedJD.classList.remove("hidden");
          clickedJD.childNodes[11].classList.remove("hidden");
          prevJD.classList.add("hidden");
          prevJD.childNodes[11].classList.remove("hidden");
          prevJD = clickedJD;
        }
      });
    });
  });

let visibilityRatio = 0.7;
let introductionAnimation = anime.timeline({
  targets: "#introElement",
  duration: 2000,
});
let options = {
  rootMargin: '0px',
  threshold: .75
}
let observer = new IntersectionObserver((entries) => {
  console.log(entries);
  handleEntries(entries);
}, options);
let introElement = document.querySelector("#introElement");
let aboutUs = document.querySelector("#about-me");
let projects = document.querySelector("#projects");
let experienceSection = document.querySelector('#experience-section')
let otherProject = document.querySelector("#other-projects");
let works = document.querySelector("#works");
let next = document.querySelector("#next");
observer.observe(introElement);
observer.observe(aboutUs);
observer.observe(experienceSection);
observer.observe(projects);
observer.observe(otherProject);
observer.observe(works);
observer.observe(next);
console.log(introElement, aboutUs, projects, otherProject, works, next);

anime({
  targets: [
    "#logo",
    "#navbar-about",
    "#navbar-experience",
    "#navbar-works",
    "#navbar-contact",
  ],
  translateY: [-100, 0],
  delay: anime.stagger(100),
});

const handleEntries = (entries) => {
  if (entries.length >= 0) {
    entries.forEach((entry) => {
      {
        if (entry.intersectionRatio > visibilityRatio) {
          handleAnimation(entry.target.id);
        }
        else{
          return
        }
      }
    });
  };
};

const handleAnimation = (elementId) => {
  console.log('hehe', elementId);
  switch (elementId) {
    case 'introElement':
      console.log('ini '+elementId)
      introductionAnimation.add({
        opacity: [0, 1],
        translateX: [250, 0], // from 100 to 250
      });
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    case 'about-me': 
      console.log('ini '+elementId)
      anime({
        targets: document.querySelector('#about-me-text'),
        translateX: [-150, 0],
        opacity: [0,1],
        duration: 3000
      })
      anime({
        targets: document.querySelector('#about-me-img'),
        translateX: [150, 0],
        opacity: [0,1],
        duration: 3000
      })
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    case 'experience-section': 
      console.log('ini '+elementId)
      anime({
        targets: [document.querySelector('#experience-section-title'), document.querySelector('#experience-section-navbar'), document.querySelector('#work-experience')],
        translateX: [150, 0],
        opacity: [0,1],
        delay: anime.stagger(200),
        duration: 3000
      })
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    case 'projects':
      let textItems = document.querySelectorAll('.text-item-project-section')
      console.log('ini '+elementId)
      anime({
        targets: ['.title-project-section'],
        opacity: [0, 1],
        duration: 3500
      })
      anime({
        targets: ['.img-project-section'],
        translateX: [-150, 0],
        opacity: [0,1],
        duration: 3000
      })
      anime({
        targets: textItems,
        translateX: [150, 0],
        opacity: [0,1],
        delay: anime.stagger(200, {from: 'center' }),
        duration: 3000

      })
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    case 'other-projects': 
      console.log('ini '+elementId);
      anime({

      })
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    case 'introElement': 
      console.log('ini '+elementId)
      anime({

      })
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    case 'works': 
      console.log('ini '+elementId)
      anime({

      })
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    case 'next': 
      console.log('ini '+elementId)
      anime({

      })
      observer.unobserve(document.querySelector("#"+elementId))
      break;
    default:
      break;
  }
  
};
