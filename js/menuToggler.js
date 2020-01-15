(function () {
    'use strict';


    let barsOpen = document.querySelector(".bars");
    let barsClose = document.querySelector(".active-bars");
    let menu = document.querySelector(".navbar-nav")

    let toggleMenu = (e) => {
        console.log(e.target.parentNode);
        let role = e.target.parentNode.dataset.target;
        if (role === 'open') {
            menu.classList.add('nav-active')
        }
        else if (role === 'close') {
            menu.classList.remove('nav-active')
        }
    }

    barsOpen.addEventListener('click', toggleMenu)
    barsClose.addEventListener('click', toggleMenu)


}())