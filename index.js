const chartContainer = document.querySelector('.chart-cols')

let tempDate = new Date();
let tempDay = tempDate.getDay();

function getData(callback) {
    fetch('./data.json')
        .then(function (data) {
            return data.json();
        }).then(callback);
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

function displayBar() {
    getData(function (data) {
        let bar = data.map(function (data) {
            return `<div>
                <div class="bar" data-id="${data.amount}"><span class="info">$${data.amount}</span></div>
                <p>${data.day}</p>
            </div>`
        }).join('');

        chartContainer.innerHTML = bar;

        const chartBar = [...document.querySelectorAll('.bar')];

        chartBar.forEach(function (bar) {
            bar.style.height = `${(bar.dataset.id / 100) * 250}px`;
        });

        dayHighlight(chartBar, data);
        hoverInfo(chartBar);
    });
}

function dayHighlight(bar, obj) {
    obj.move(6, 0);
    obj.forEach(function (obj, index) {
        if (index === tempDay) {
            bar.forEach(function (bar) {
                if (bar.dataset.id == obj.amount) {
                    bar.classList.add('date-highlight');
                };
            });
        }
    });
}

function hoverInfo(bar) {
    bar.forEach(function (bar) {
        bar.addEventListener('mouseover', function (e) {
            const info = e.currentTarget.firstChild;
            info.classList.add('visible');
            if (!bar.classList.contains('date-highlight')) {
                bar.classList.add('bar-opacity');
            } else {
                bar.classList.add('highlight-opacity');
            }
        });
    });
    bar.forEach(function (bar) {
        bar.addEventListener('mouseout', function (e) {
            const info = e.currentTarget.firstChild;
            info.classList.remove('visible');
            if (bar.classList.contains('date-highlight')) {
                bar.classList.remove('highlight-opacity');
            } else {
                bar.classList.remove('bar-opacity');
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', displayBar())

