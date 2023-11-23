const checkBox = document.querySelectorAll('.wrap ul li span');
const allInput = document.querySelectorAll(`.wrap .inner-box ul li input[type='text']`);
const error = document.querySelector('.error')
const obj = JSON.parse(localStorage.getItem('all')) || {}
const bar = document.querySelector('.progress .bar')
let width = 0
allInput.forEach((el, i) => {
    el.addEventListener('input', (e) => {

        obj[e.target.id] = { name: e.target.value }
        if (e.target.value === '') {


            checkBox.forEach((e, index) => {

                if (checkBox[index].firstChild) {
                    checkBox[index].removeChild(checkBox[index].firstChild)
                    checkBox[index].classList.remove('checked');
                }

            })

        } else {
            console.log('input fill')
        }

        localStorage.setItem("all", JSON.stringify(obj));
    })

})

checkBox.forEach((e, i) => {

    e.addEventListener('click', () => {


        if (allInput[0].value === '' || allInput[1].value === '' || allInput[2].value === '') {

            error.innerHTML = `<p> Please set all 3 goal </p>`
            removeError();

        } else {

            if (checkBox[i].firstChild) {
                checkBox[i].removeChild(checkBox[i].firstChild)
                checkBox[i].classList.remove('checked');
                obj[e.parentElement.querySelector('input[type="text"]').id].checkBox = false;
                width = width - 33.33;
                bar.style.width = `${width}%`
            } else {
                checkBox[i].classList.add('checked');
                const img = document.createElement('img')
                img.src = 'check-icon.svg'
                img.style.userSelect = 'none'
                checkBox[i].appendChild(img)

                console.dir()

                var getId = e.parentElement.querySelector('input[type="text"]').id
                console.log(getId)
                obj[getId].checkBox = true
                width = width + 33.33;
                bar.style.width = `${width}%`
            }
            console.log(obj)
            localStorage.setItem("all", JSON.stringify(obj));
        }






    })
})

function getData() {


    allInput.forEach((el, i) => {

        if (obj[el.id]) {


            el.value = obj[el.id].name;
            if (obj[el.id].checkBox) {

                checkBox[i].classList.add('checked');
                const img = document.createElement('img')
                img.src = 'check-icon.svg'
                img.style.userSelect = 'none'
                checkBox[i].appendChild(img)

            }
        }


    })
}
getData()

function removeError() {
    allInput.forEach((e) => {
        if (error.innerHTML) {

            e.addEventListener('focus', () => { error.innerHTML = '<p></p>' })
        }
    })
}




function progrssBar() {

    checkBox.forEach((e) => {


        if (e.className) {
            width = width + 33.33
        }
        bar.style.width = `${width}%`


    })
}
progrssBar()
