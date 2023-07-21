function printText () {
    const text = "Погода Онлайн"
    let i = 0
    let interval = setInterval (() => {
        if (i === 6) {
            clearInterval(interval)
        }
        if (i === 0) {
            preview.textContent = text[i]
            i++
        }
        else {
            preview.textContent += text[i]
            i++
        }
    }, 160)

    setTimeout(() => {
        i = 6
        interval = setInterval (() => {
            if (i === 12) {
                clearInterval(interval)
            }
            preview.textContent += text[i]
            i++
        }, 160)
    }, 1900)
}


function convertDayToString(day) {
    switch (day) {
        case 0: return "Воскресенье"
        case 1: return "Понедельник"
        case 2: return "Вторник"
        case 3: return "Среда"
        case 4: return "Четверг"
        case 5: return "Пятница"
        case 6: return "Суббота"
    }
}

function convertMonthToString(month) {
    switch (month) {
        case 0: return "Январь"
        case 1: return "Февраль"
        case 2: return "Март"
        case 3: return "Апрель"
        case 4: return "Май"
        case 5: return "Июнь"
        case 6: return "Июль"
        case 7: return "Август"
        case 8: return "Сентябрь"
        case 9: return "Октябрь"
        case 10: return "Ноябрь"
        case 11: return "Декабрь"
    }
}

function getData (url) {
    return axios.get(url)
}

function dataProcessing (promise) {
    promise
    .then (response => {
        err.classList.add("disable")
        weatherLeftBlock.children[0].textContent = city
        weatherLeftBlock.children[3].textContent = response.data.main.temp
        weatherLeftBlock.children[4].firstElementChild.textContent = city
        weatherLeftBlock.children[4].lastElementChild.textContent = `${convertDayToString(today.getDay())}, ${convertMonthToString(today.getMonth())} ${today.getDate()}`
        infoBoxes[0].textContent = response.data.wind.speed || 0
        infoBoxes[1].textContent = response.data.main.temp_min || 0
        infoBoxes[2].textContent = response.data.main.temp_max || 0
        infoBoxes[3].textContent = response.data.main.humidity || 0
        infoBoxes[4].textContent = response.data.main.feels_like || 0 
        infoBoxes[5].textContent = response.data.wind.gust || 0
    })
    .catch (() => {
        err.classList.remove("disable")
    })
}

const today = new Date()
const api = "93762915c3f4645298d5c356ff6d7a8d"
let city = "Минск"
let url = `//api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${api}`
const buttonFocus = document.querySelector(".preview__btn")
const inputField = document.querySelector(".content__search")
const weatherLeftBlock = document.querySelector(".content__weather")
const infoBoxes = document.querySelectorAll(".info-block__info")
const err = document.querySelector(".error")
const preview = document.querySelector(".preview__title")

document.addEventListener("DOMContentLoaded", () => {
    dataProcessing(getData(url))
    setTimeout(printText, 1200)  
})

weatherLeftBlock.addEventListener("click", (event) => {
    if (event.target.closest(".content__btn")) {
        city = inputField.value
        url = `//api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${api}`
        dataProcessing(getData(url)) 
    }
})

buttonFocus.addEventListener("click", () => {
    inputField.focus()
})

