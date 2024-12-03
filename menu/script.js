document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('main-content');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', () => {
        const content = document.getElementById('main-header');
        if (content.style.display === 'none') {
            content.style.removeProperty('display');
        } else {
            content.style.display = 'none'; // Hide the content
        }
    });

    window.onpopstate = function (event) {
        if (event.state && event.state.content) {
            // Restore the content from history state
            loadContent(event.state.content);
        }
    };

    function updateButtonVisibility(slider, left, right) {
        if (slider.scrollWidth > slider.clientWidth) {
            if (slider.scrollLeft === 0) {
                left.style.display = 'none';
            } else {
                left.style.display = 'flex';
            }
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                right.style.display = 'none';
            } else {
                right.style.display = 'flex';
            }
        } else {
            left.style.display = "none";
            right.style.display = "none";
        }
    }

    function loadScripts(url) {
        if (url.includes("home")) {
            //const nodes = document.querySelectorAll('.image-container');
            //nodes.forEach(node => {
            //    [...Array(10)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
            //});
            const container = document.getElementById("slider-content");
            [...Array(10)].forEach((value, index) => {
                const newElement = document.createElement('div');
                newElement.classList.add('image-container');
                // Присваиваем уникальный ID
                newElement.id = `item-${index + 1}`; // Используем индекс для уникальности
                const img = document.createElement('img');
                img.src = "/assets/images/placeholder.jpg";
                img.alt = `desc${index+1}`;
                newElement.appendChild(img);
                newElement.setAttribute("data-page", "/content/content.html")
                newElement.setAttribute("data-id", (index+1).toString())
                container.appendChild(newElement);
            })
            const sliderContent = document.getElementById('slider-content');
            const leftButton = document.getElementById('left-content');
            const rightButton = document.getElementById('right-content');
            leftButton.addEventListener('click', function() {
                sliderContent.scrollBy({
                    left: -(items[0].clientWidth + 10),
                    behavior: 'smooth'
                });
            });

            rightButton.addEventListener('click', function() {
                sliderContent.scrollBy({
                    left: (items[0].clientWidth + 10),
                    behavior: 'smooth'
                });
            });

            const items = document.querySelectorAll('.image-container');
            items.forEach(item => item.addEventListener('click', function() {
                const page = item.getAttribute('data-page');
                const id = item.getAttribute('data-id');
                console.log(id)
                if (page) {
                    navItems.forEach(nav => nav.classList.remove('active'));
                    loadContent(page, id);
                }
            }))

            sliderContent.addEventListener('scroll', () => {
                if (sliderContent.scrollLeft === 0) {
                    leftButton.style.display = 'none';
                } else {
                    leftButton.style.display = 'flex';
                }
                if (sliderContent.scrollLeft + sliderContent.clientWidth >= sliderContent.scrollWidth) {
                    rightButton.style.display = 'none';
                } else {
                    rightButton.style.display = 'flex';
                }
            });

            const colNodes = document.querySelectorAll('.collection-container');
            colNodes.forEach(node => {
                [...Array(10)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
            });
            const sliderCol = document.getElementById('slider-col');
            const leftButtonCol = document.getElementById('left-col');
            const rightButtonCol = document.getElementById('right-col');
            leftButtonCol.addEventListener('click', function() {
                sliderCol.scrollBy({
                    left: -(colNodes[0].clientWidth + 10),
                    behavior: 'smooth'
                });
            });

            rightButtonCol.addEventListener('click', function() {
                sliderCol.scrollBy({
                    left: (colNodes[0].clientWidth + 10),
                    behavior: 'smooth'
                });
            });

            sliderCol.addEventListener('scroll', () => {
                if (sliderCol.scrollLeft === 0) {
                    leftButtonCol.style.display = 'none';
                } else {
                    leftButtonCol.style.display = 'flex';
                }
                if (sliderCol.scrollLeft + sliderCol.clientWidth >= sliderCol.scrollWidth) {
                    rightButtonCol.style.display = 'none';
                } else {
                    rightButtonCol.style.display = 'flex';
                }
            });
        }
        else if (url.includes("content")) {
            const id = window.location.pathname.substring(window.location.pathname.lastIndexOf("/"))
            console.log(id);
            const nodes = document.querySelectorAll('.person-container');
            nodes.forEach(node => {
               [...Array(15)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
            });
            const slider = document.querySelector(".slider");
            const leftButton = document.querySelector(".scroll-button.left");
            const rightButton = document.querySelector(".scroll-button.right");

            leftButton.addEventListener('click', function() {
                slider.scrollBy({
                    left: -(nodes[0].clientWidth + 10),
                    behavior: 'smooth'
                });
            });
            rightButton.addEventListener('click', function() {
                slider.scrollBy({
                    left: (nodes[0].clientWidth + 10),
                    behavior: 'smooth'
                });
            });

            setTimeout(updateButtonVisibility, 10, slider, leftButton, rightButton);
            window.addEventListener("resize", () => {
                updateButtonVisibility(slider, leftButton, rightButton);
            });
            slider.addEventListener('scroll', () => {
                updateButtonVisibility(slider, leftButton, rightButton)
            });

            const rateBtn = document.getElementById("rate")
            rateBtn.addEventListener('click', function() {
                const dialog = document.getElementById('rate-dialog');
                dialog.show()
            })
        }
    }

    function loadContent(page, id = "0") {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                mainContent.innerHTML = doc.querySelector('body').innerHTML;
                if (page.includes("home"))
                    history.pushState({ content: page }, "", "/home")
                else if (page.includes("content"))
                    history.pushState({ content: page }, "", `/content/${id}`)
            })
            .then(() => {
                loadScripts(page);
            })
            .catch(error => console.error('Error loading page:', error));
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                loadContent(page);
            }
        });
    });
    const initialPage = window.location.pathname || 'home';
    var path = ""
    if (initialPage.includes("menu") || initialPage.includes("home") || initialPage === "/") {
        path = "/home/home.html";
    }
    else if (initialPage.includes("content")) {
        path = "/content/content.html";
    }
    loadContent(path);
});