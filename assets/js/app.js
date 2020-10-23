$(() => {

    // Loading
    setTimeout(() => {
        $(".tatx-loading").hide("slow");
    }, 2000);

    // Custom Message for required
    $.extend($.validator.messages, {
        required: "هذا الحقل مطلوب*"
    });

    // StepJS
    const form = $("#wizard").show();
    form.steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            console.log(form.serialize())
        }
    }).validate({
        errorPlacement: function errorPlacement(error, element) { element.before(error); },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });

})

/***************** DATE ****************/
let dateChanger = document.querySelector('.date span')

function showTime() {
    let now = new Date;
    let date = now.toString();
    let hours = (date.slice(15, 18));
    let time = date.slice(15, 25);
    let numericDate = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} `;
    if (hours < 12) {
        time = time + "AM";
    } else {
        time = time + "PM";
    }
    let innerDate = `${date.slice(0, 3)}day${date.slice(3, 8)}| ${numericDate} | ${time}`;
    dateChanger.innerText = innerDate;
}
setInterval(showTime, 500);
/***************** DATE ****************/


/********************************** Captcha *******************************/
let imagesArr = [
    "./images/captcha/1.png",
    "./images/captcha/2.png",
    "./images/captcha/3.png",
    "./images/captcha/4.png",
    "./images/captcha/5.png",
    "./images/captcha/6.png",
    "./images/captcha/7.png",
    "./images/captcha/8.png",
    "./images/captcha/9.png",
    "./images/captcha/9.png"
]
let captchaButton = document.querySelector('.captcha button');
let captchaImage = document.querySelector('.captcha img');
captchaButton.addEventListener('click', function () {
    let random = Math.floor(Math.random() * imagesArr.length);
    console.log(random);
    captchaImage.src = imagesArr[random];
})

/********************************** Captcha *******************************/


/********************* Filter Sections Buttons ************************/
let filtersSection = Array.from(document.querySelectorAll('.section-filter-container > div'));
let changeContents = Array.from(document.querySelectorAll('.section-filter-container .content'));
let MainSections = document.querySelectorAll('.main-section');
changeContents[1].classList.add('active');
MainSections[0].classList.add('active');
for (let i = 0; i < filtersSection.length; i++) {
    filtersSection[i].addEventListener('click', function () {
        removeAllClasses(changeContents, 'active');
        changeContents[i].classList.add('active');
        let targetV = this.getAttribute('data-target');
        for (let j = 0; j < MainSections.length; j++) {
            if (MainSections[j].getAttribute('data-id') == targetV) {
                removeAllClasses(MainSections, 'active');
                MainSections[j].classList.add('active');
            }

        }
    })

}
/********************* Filter Sections Buttons ************************/

/********************* Filter Links Buttons 1 ************************/
let links1 = Array.from(document.querySelectorAll(".link1"));
let sections1 = document.querySelectorAll('.section1');
for (let x = 0; x < links1.length; x++) {
    links1[x].addEventListener('click', function () {
        removeAllClasses(links1, 'active');
        this.classList.add('active');
        let target = this.getAttribute('data-target');
        for (let i = 0; i < sections1.length; i++) {
            if (sections1[i].getAttribute("data-id") == target) {
                removeAllClasses(sections1, 'active');
                sections1[i].classList.add('active');
            }

        }
    })

}
/********************* Filter Links Buttons ************************/
/********************* Filter Links Buttons 2 ************************/
let links2 = Array.from(document.querySelectorAll(".link2"));
let sections2 = document.querySelectorAll('.section2');
for (let x = 0; x < links2.length; x++) {
    links2[x].addEventListener('click', function () {
        removeAllClasses(links2, 'active');
        this.classList.add('active');
        let target = this.getAttribute('data-target');
        for (let i = 0; i < sections2.length; i++) {
            if (sections2[i].getAttribute("data-id") == target) {
                removeAllClasses(sections2, 'active');
                sections2[i].classList.add('active');
            }

        }
    })

}
/********************* Filter Links Buttons ************************/
//Function Remove Class
function removeAllClasses(array, className) {
    array.forEach(function (element) {
        element.classList.remove(className);
    });
}

/////////////////////////////Navigation/////////////////////////////////////
let bars = document.querySelector('.hamburger i');
let sidebar = document.querySelector('.sidebar');
bars.addEventListener('click', function () {
    bars.classList.toggle('active');
    sidebar.classList.toggle('active');
})


// Calculate Progress Bar
// stepProgress = function (currstep) {
//     var percent = parseFloat(100 / $(".step").length) * currstep;
//     percent = percent.toFixed();
//     $(".progress-bar")
//       .css("width", percent + "%")
//       .html(percent + "%");
//   };
