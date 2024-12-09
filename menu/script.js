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
            const sliderContent = document.getElementById("slider-content");
            fetch("http://localhost:8080/v1/contents/base")
              .then((response) => {
                 if (response.ok) {
                     response.json().then(data => {
                         for (const item of data) {
                             const newElement = document.createElement('div');
                             newElement.classList.add('image-container');
                             newElement.id = `item-${item.id}`;
                             const img = document.createElement('img');
                             img.src = item.image;
                             img.alt = `desc${item.id}`;
                             newElement.appendChild(img);
                             newElement.setAttribute("data-page", "/content/content.html")
                             newElement.setAttribute("data-id", (item.id))
                             sliderContent.appendChild(newElement);
                             newElement.addEventListener('click', function() {
                                 const page = newElement.getAttribute('data-page');
                                 const id = newElement.getAttribute('data-id');
                                 console.log(id)
                                 if (page) {
                                     navItems.forEach(nav => nav.classList.remove('active'));
                                     loadContent(page, id);
                                 }
                             })
                         }
                     })
                 }
              })
              .catch((error) => {
                  console.error(error);
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
                      sliderContent.appendChild(newElement);
                  });
              });
            const leftButton = document.getElementById('left-content');
            const rightButton = document.getElementById('right-content');
            leftButton.addEventListener('click', function() {
                const item = document.querySelector('.image-container')
                sliderContent.scrollBy({
                    left: -(item.clientWidth + 10),
                    behavior: 'smooth'
                });
            });
            rightButton.addEventListener('click', function() {
                const item = document.querySelector('.image-container')
                sliderContent.scrollBy({
                    left: (item.clientWidth + 10),
                    behavior: 'smooth'
                });
            });
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

            const sliderCollection = document.getElementById("slider-col");
            [...Array(5)].forEach((value, index) => {
                const newElement = document.createElement('div');
                newElement.classList.add('collection-container');
                // Присваиваем уникальный ID
                newElement.id = `item-${index + 1}`; // Используем индекс для уникальности
                const icon = document.createElement('md-icon');
                icon.setAttribute("slot", "icon");
                icon.append("movie")
                newElement.appendChild(icon);
                const label = document.createElement('label');
                label.append("Collection name")
                newElement.appendChild(label);
                sliderCollection.appendChild(newElement);
            })

            const sliderCol = document.getElementById('slider-col');
            const leftButtonCol = document.getElementById('left-col');
            const rightButtonCol = document.getElementById('right-col');
            leftButtonCol.addEventListener('click', function() {
                const node = document.querySelector('.collection-container');
                sliderCol.scrollBy({
                    left: -(node.clientWidth + 10),
                    behavior: 'smooth'
                });
            });
            rightButtonCol.addEventListener('click', function() {
                const node = document.querySelector('.collection-container');
                sliderCol.scrollBy({
                    left: (node.clientWidth + 10),
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

            const newNodes = document.querySelectorAll('.news-container');
            newNodes.forEach(node => {
                [...Array(10)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
            });
        }
        else if (url.includes("content")) {
            const elements = window.location.pathname.split('/').filter(e => e.trim().length > 0)
            const id = elements[elements.length - 1];
            console.log(`http://localhost:8080/v1/contents/${id}`)
            fetch(`http://localhost:8080/v1/contents/${id}`)
                .then((res) => {
                    if (res.ok) {
                        res.json().then(data => {
                            const imageContainer = document.getElementById('poster');
                            const contentName = document.getElementById('content-name');
                            const contentDescription = document.getElementById('content-description');
                            const contentRelease = document.getElementById('release-date');
                            const contentDuration = document.getElementById('duration');
                            const contentBudget = document.getElementById('budget');
                            const contentBoxOffice = document.getElementById('box-office');
                            imageContainer.src = data.image;
                            contentName.innerText = data.title;
                            contentDescription.innerText = data.description;
                            contentRelease.innerText = data.releaseDate;
                            contentDuration.innerText = data.duration;
                            contentBudget.innerText = `${data.budget} $`;
                            contentBoxOffice.innerText = `${data.boxOffice} $`
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            const nodes = document.querySelectorAll('.person-container');
            nodes.forEach(node => {
               [...Array(5)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
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
            // updateButtonVisibility(slider, leftButton, rightButton);
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

    function loadContent(page, id = "1") {
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
    var id = "0";
    var path = ""
    if (initialPage.includes("menu") || initialPage.includes("home") || initialPage === "/") {
        path = "/home/home.html";
    }
    else if (initialPage.includes("content")) {
        const parts = initialPage.split("/").filter(element => element.trim().length > 0);
        path = "/content/content.html";
        console.log(parts);
        if (/^\d+$/.test(parts[parts.length - 1])) {
            id = parts[parts.length - 1];
        }
    }
    loadContent(path, id);
});