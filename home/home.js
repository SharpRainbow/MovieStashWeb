const slider = document.querySelector('.slider');
const leftButton = document.querySelector('.scroll-button.left');
const rightButton = document.querySelector('.scroll-button.right');

// Set up the scroll functionality for the left and right buttons
leftButton.addEventListener('click', function() {
    slider.scrollBy({
        left: -(slider.firstChild + 10), // Adjust this value based on the width of your slides
        behavior: 'smooth'
    });
});

rightButton.addEventListener('click', function() {
    slider.scrollBy({
        left: (slider.firstChild + 10), // Adjust this value based on the width of your slides
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