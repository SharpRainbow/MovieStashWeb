document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('main-content');

    function loadScripts(url) {
        if (url.includes("home")) {
            const slider = document.querySelector('.slider');
            const item = document.querySelector('.image-container');
            const leftButton = document.querySelector('.scroll-button.left');
            const rightButton = document.querySelector('.scroll-button.right');

            leftButton.addEventListener('click', function() {
                slider.scrollBy({
                    left: -(item.clientWidth + 10), // Adjust this value based on the width of your slides
                    behavior: 'smooth'
                });
            });

            rightButton.addEventListener('click', function() {
                slider.scrollBy({
                    left: (item.clientWidth + 10), // Adjust this value based on the width of your slides
                    behavior: 'smooth'
                });
            });

            slider.addEventListener('scroll', () => {
                if (slider.scrollLeft === 0) {
                    leftButton.style.display = 'none';
                } else {
                    leftButton.style.display = 'block';
                }
                if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                    rightButton.style.display = 'none';
                } else {
                    rightButton.style.display = 'block';
                }
            });

            const nodes = document.querySelectorAll('.image-container');

            nodes.forEach(node => {
                [...Array(10)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
            });
        }
    }

    // Function to load content via AJAX
    function loadContent(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                // Insert the new content into the main content area
                // mainContent.innerHTML = data;
                // var scripts = mainContent.querySelectorAll('script');
                // if (scripts !== null && scripts.length > 0) {
                //     var loadScript = index => {
                //         if (index < scripts.length) {
                //             var newScript = document.createElement('script');
                //             if (scripts[index].innerText) {
                //                 var inlineScript = document.createTextNode(scripts[index].innerText);
                //                 newScript.appendChild(inlineScript);
                //             }
                //             else {
                //                 newScript.src = scripts[index].src;
                //             }
                //             scripts[index].parentNode.removeChild(scripts[index]);
                //             newScript.addEventListener('load', event => loadScript(index + 1));
                //             newScript.addEventListener('error', event => loadScript(index + 1));
                //             mainContent.appendChild(newScript);
                //         }
                //     }
                //     loadScript(0)
                // }
                // for (var i = 0; i < scripts.length; i++) {
                //     if (scripts[i].innerText) {
                //         eval(scripts[i].innerText);
                //     } else {
                //         fetch(scripts[i].src).then(function(data) {
                //             data.text().then(function(r) {
                //                 eval(r);
                //             })
                //         })
                //     }
                // }
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                mainContent.innerHTML = doc.querySelector('body').innerHTML;
            })
            .then(() => {
                loadScripts(page);
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Event listener for each navigation item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the data-page attribute, which specifies the HTML file to load
            const page = item.getAttribute('data-page');
            console.log(page)
            if (page) {
                // Remove 'active' class from all items and set it on the clicked one
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Load the specified page content
                loadContent(page);
                // jQuery(document).ready(function (){
                //     let cont = jQuery('#main-content');
                //     cont.load(page, function(response, status, xhr) {
                //         if (status === 'error') {
                //             console.error(xhr.status + ': ' + xhr.statusText);
                //         }
                //     });
                // });
            }
        });
    });
    loadContent("/home/home.html");
});

document.addEventListener("DOMContentLoaded", function() {
    // Select all navigation items
    const navItems = document.querySelectorAll('.nav-item');

    // Add a click event listener to each nav item
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove 'active' class from all items
            navItems.forEach(i => i.classList.remove('active'));
            // Add 'active' class to the clicked item
            this.classList.add('active');
        });
    });
});