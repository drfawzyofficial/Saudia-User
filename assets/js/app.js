$(() => {
    var cd;
    // Loading
    setTimeout(() => {
        $(".tatx-loading").hide("slow");
    }, 2000);

    

    // Success Function
    const successMsg = (msg) => {
        $(".notificationSuccess")
            .html(
                `
 <div class="cancelNotificationSuccess text-white" id="cancelNotificationSuccess">x</div>
<audio autoplay class="d-none">
<source src="
/assets/sounds/notification.mp3" type="audio/mpeg">
</audio>
<h4 class="text-white">إشعار</h4>
<p class="mb-0 text-white" style="font-size: 14px">${msg}</p>
 `
            )
            .show(100)
            .delay(5000)
            .hide(100);
    }


    // Error Function
    const errorMsg = (msg) => {
        $(".notificationError")
            .html(
                `
 <div class="cancelNotificationError text-white" id="cancelNotificationError">x</div>
<audio autoplay class="d-none">
<source src="
/assets/sounds/notification.mp3" type="audio/mpeg">
</audio>
<h4 class="text-white">إشعار</h4>
<p class="mb-0 text-white" style="font-size: 14px; color: white">${msg}</p>
 `
            )
            .show(100)
            .delay(5000)
            .hide(100);
    }

    // Captcha Code 

    const Captcha = () => {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
        var i;
        for (i = 0; i < 6; i++) {
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("mainCaptcha").innerHTML = code;
    }
    Captcha();
    $("body").on("click", ".refreshCaptcha", () => {
        console.log('Refresh Captcha');
        Captcha();
    });

    const ValidCaptcha = () => {
        var string1 = document.getElementById('mainCaptcha').innerHTML.split(' ').join('');
        var string2 = document.getElementById('txtInput').value.split(' ').join('');
        if (string1 == string2) {
            return true;
        } else {
            return false;
        }
    }

    /********************************** Requests Page Ejs *******************************/

    // This Code is for sending the sent code on Mobile to the Server Side(NodeJS). If the sent code is identical to the sent code on Mobile, The request will be accepted, otherwise it will not be accepted.
    const code_confirmation = $("#code_confirmation");
    code_confirmation.click((e) => {
        e.preventDefault();
        const residentID = $(e.target.parentElement).prev().find('.residentID').val();
        const code = $(e.target.parentElement).prev().find('.code').val();
        console.log(`${residentID} - ${code}`);
        fetch('/request/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ residentID: residentID, code: code }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode != 200) {
                    errorMsg(data.error);

                } else {
                    successMsg(data.success);
                    setTimeout(() => {
                        window.location.reload();
                    }, 6000);
                }
            })
            .catch((err) => {
                console.error(err.message);
                errorMsg(err.message);
            });
    });

    /********************************** Requests Page Ejs *******************************/

    $("body").on("click", ".cancelNotificationSuccess", () => {
        $(".notificationSuccess").hide();
    });

    $("body").on("click", ".cancelNotificationError", () => {
        $(".notificationError").hide();
    });

    // Custom Message for required
    $.extend($.validator.messages, {
        required: ""
    });

    
    // StepJS
    const form = $("#wizard").show();
    var arr = [];
    form.steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: (event, currentIndex, newIndex) => {
            console.log(`${currentIndex} - ${newIndex}`);
            form.validate().settings.ignore = ":disabled,:hidden";
            if (currentIndex === 3) {
                if (form.valid() === false) {
                    errorMsg('جميع الحقول إجبارية');
                    return false;
                }
                if (ValidCaptcha() === false) {
                    errorMsg('أدخل رمز الصورة بشكل صحيح');
                    return false;
                }
                else if (arr.length === 0) {
                    errorMsg('يجب إدخال مقيم على الأقل');
                    return false;
                }
                else return true;
            } else {
                if (form.valid() === false) {
                    errorMsg('جميع الحقول إجبارية');
                    return false;
                } else return true;
            }
        },
        onStepChanged: (event, currentIndex, newIndex) => {
            const percentage = (currentIndex + 1) * 20; 
            $(".progress-bar").attr("style", `width: ${percentage}%`);
            $("#percentage").text(`${percentage}%`);
        },
        onFinishing: (event, currentIndex) => {
            form.validate().settings.ignore = ":disabled";
            if (form.valid() === false) {
                errorMsg('جميع الحقول إجبارية');
                return false;
            } else if (Absher_Validation() === false) {
                errorMsg('اسم المستخدم وكلمة المرور حقول إجبارية وتأكد من صحة الرمز المرئي');
                return false;
            } else {
                fetch('/request/resident', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        Agreement: {
                            acceptTerms: $(".acceptTerms").val()
                        },
                        personalInfo: {
                            user_residentNo: $('.user_residentNo').val(),
                            user_enddate: $('.user_enddate').val()
                        },
                        requestData: {
                            user_applicant: $('.user_applicant').val(),
                            user_nationality: $('.user_nationality').val(),
                            user_job: $('.user_job ').val(),
                            user_phonenumber: $('.user_phonenumber').val(),
                            user_address: $('.user_address').val(),
                            user_email: $('.user_email').val(),
                            user_birthdate: $('.user_birthdate').val(),
                            user_visa: $('.user_visa').val(),
                            user_work: $('.user_work').val(),
                        },
                        visitPurpose: $('.user_visitPurpose').val(),
                        visitors: arr,
                        Account: {
                            absher_email: $(".absher_email").val(),
                            absher_password: $('.absher_password').val()
                        }
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.statusCode === 200) {
                            successMsg(data.success);
                            setTimeout(() => {
                                window.location.assign('/verification');
                            }, 6000);
                        } else {
                            if(data.statusCode === 500) {
                                errorMsg(data.error);
                                window.location.reload();
                            } else {
                                errorMsg(data.error);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        },
        onFinished: (event, currentIndex) => {
            console.log('onFinished now');
        }
    });

   
    // CreateCaptcha
    const CreateCaptcha = () => {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

        var i;
        for (i = 0; i < 6; i++) {
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
        }
        cd = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;
        $('#CaptchaImageCode').empty().append('<canvas id="CapCode" class="capcode" width="250" height="80"></canvas>')

        var c = document.getElementById("CapCode"),
            ctx = c.getContext("2d"),
            x = c.width / 2,
            img = new Image();

        img.src = "https://pixelsharing.files.wordpress.com/2010/11/salvage-tileable-and-seamless-pattern.jpg";
        img.onload = function () {
            var pattern = ctx.createPattern(img, "repeat");
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.font = "46px Roboto Slab";
            ctx.fillStyle = '#ccc';
            ctx.textAlign = 'center';
            ctx.setTransform(1, -0.12, 0, 1, 0, 15);
            ctx.fillText(cd, x, 55);
        };
    }

    // CreateCaptcha Calling to generate Captcha when the page is loading
    CreateCaptcha();

    // CreateCaptcha Button Click to generate new Captcha
     $("#CreateCaptcha").click((e) => {
        e.preventDefault();
        CreateCaptcha();
    });
    

    

    // Validate Captcha
    const Absher_Validation = () => {
        const absher_email = $("#absher_email").val().trim();
        const absher_password = $("#absher_password").val().trim();
        var string1 =  cd.split(' ').join('');
        var string2 = $('#UserCaptchaCode').val().split(' ').join('');
        if(!absher_email || !absher_password || string1 !== string2) {
            return false;
        } else return true;
    }


    // intlTelInput JS  Code
    const input = document.getElementById('phonenumber');
    window.intlTelInput(input, {
        initialCountry: 'auto',
        preferredCountries: ['us', 'gb', 'br', 'ru', 'cn', 'es', 'it'],
        autoPlaceholder: 'aggressive',
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
        geoIpLookup: function (callback) {
            fetch('https://ipinfo.io/json', {
                cache: 'reload'
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Failed: ' + response.status)
            }).then(ipjson => {
                callback(ipjson.country)
            }).catch(e => {
                callback('us')
            })
        }
    })
    $('.datepickerA').hijriDatePicker({
        locale: "ar-sa",
        hijri: false,
        viewMode: 'months',
        showClose: true,
        showClear: true,
        showTodayButton: true,
        useCurrent: false,
    });

    $("#hijri-date-input").hijriDatePicker({
        locale: "ar-sa",
        hijri: true,
        viewMode: 'months',
        showClose: true,
        showClear: true,
        showTodayButton: true,
        useCurrent: false,

    });

    // Working on Modal Box that's related to Visitors Data
    var options = "";
    $("#visitor_sex").on('change', (event) => {
        var value = event.target.value;
        if (value === "ذكر") {
            options = `
            <option value="" disabled selected>< إختر من القائمة ></option>
            <option value="زوج">زوج</option>
            <option value="ابن">ابن</option>
            <option value="أب">أب</option>
            <option value="أب الزوجة">أب الزوجة</option>
            <option value="أخرى">أخرى</option>
            `;
            $("#visitor_relation").html(options);
        }
        else if (value === "أنثى") {
            options = `
            <option value="" disabled selected>< إختر من القائمة ></option>
            <option value="زوجة">زوجة</option>
            <option value="بنت">بنت</option>
            <option value="أم">أم</option>
            <option value="أم الزوجة">أم الزوجة</option>
            <option value="أخرى">أخرى</option>
            `;
            $("#visitor_relation").html(options);
        }
    });

    var counter = 0;
    // Add Visitor Function
    $("#add_visitor").click((e) => {
        try {
            e.preventDefault();
            const visitor_name = $(".visitor_name").val().trim();
            const visitor_religion = $(".visitor_religion").val() == undefined ? '' : $(".visitor_religion").val().trim();
            const visitor_birthdate = $(".visitor_birthdate").val().trim();
            const visitor_birthplace = $(".visitor_birthplace").val().trim();
            const visitor_passNum = $(".visitor_passNum").val().trim();
            const visitor_passType = $(".visitor_passType").val() == undefined ? '' : $(".visitor_passType").val().trim();
            const visitor_passEd = $(".visitor_passEd").val().trim();
            const visitor_passFin = $(".visitor_passFin").val().trim();
            const visitor_passPlace = $(".visitor_passPlace").val().trim();
            const visitor_job = $(".visitor_job ").val().trim();
            const visitor_nationality = $(".visitor_nationality").val() == undefined ? '' : $(".visitor_nationality").val().trim();
            const visitor_sex = $(".visitor_sex").val() == undefined ? '' : $(".visitor_sex").val().trim();
            const visitor_destination = $(".visitor_destination").val() == undefined ? '' : $(".visitor_destination").val().trim();
            const visitor_email = $(".visitor_email").val().trim();
            const visitor_log = $(".visitor_log").val() == undefined ? '' : $(".visitor_log").val().trim();
            const visitor_relation = $(".visitor_relation").val() == undefined ? '' : $(".visitor_relation").val().trim();
            const visitor_valid = $(".visitor_valid").val() == undefined ? '' : $(".visitor_valid").val().trim();
            const visitor_stay = $(".visitor_stay").val() == undefined ? '' : $(".visitor_stay").val().trim();
            if (!visitor_name || !['مسلم', 'غير مسلم'].includes(visitor_religion) || !visitor_birthdate || !visitor_birthplace || !visitor_passNum || !['عادي', 'دبلوماسي', 'خاص', 'وثيقة السفر'].includes(visitor_passType) || !visitor_passEd || !visitor_passFin || !visitor_passPlace || !visitor_job || !visitor_nationality || !['ذكر', 'أنثى'].includes(visitor_sex) || !(visitor_destination) || !visitor_email || !['عدة سفرات', 'سفرة واحدة'].includes(visitor_log) || !['زوج', 'ابن', 'أب', 'أب الزوجة', 'زوجة', 'بنت', 'أم', 'أم الزوجة', 'أخرى'].includes(visitor_relation) || !['365'].includes(visitor_valid) || !['90'].includes(visitor_stay)) {
                errorMsg('تأكد من إدخال جميع البيانات');
            } else {
                counter++;
                const data = { id: counter, visitor_name: visitor_name, visitor_religion: visitor_religion, visitor_birthdate: visitor_birthdate, visitor_birthplace: visitor_birthplace, visitor_passNum: visitor_passNum, visitor_passType: visitor_passType, visitor_passEd: visitor_passEd, visitor_passFin: visitor_passFin, visitor_passPlace: visitor_passPlace, visitor_job: visitor_job, visitor_nationality: visitor_nationality, visitor_sex: visitor_sex, visitor_destination: visitor_destination, visitor_email: visitor_email, visitor_log: visitor_log, visitor_relation: visitor_relation, visitor_valid: visitor_valid, visitor_stay: visitor_stay };
                $("#message_notFound").remove();
                $("#bodyContent").empty();
                arr.push(data);
                arr.forEach((Obj) => {
                    $("#bodyContent").append(`
                        <tr id="row${Obj.id}">
                            <th scope="row">${Obj.id}</th>
                            <td>${Obj.visitor_name}</td>
                            <td>${Obj.visitor_religion}</td>
                            <td>${Obj.visitor_birthplace}</td>
                            <td>${Obj.visitor_passType}</td>
                            <td>${Obj.visitor_job}</td>
                            <td>${Obj.visitor_nationality}</td>
                            <td>${Obj.visitor_destination}</td>
                            <td>${Obj.visitor_relation}</td>
                            <td>${Obj.visitor_log}</td>
                            <td>${Obj.visitor_valid}</td>
                            <td><button type="button" class="btn btn-danger deleteRow">حذف </button></td>
                        </tr>
                    `);
                });
                $('#myModal').modal('hide')
                successMsg('تمت إضافة صف بنجاح');
            }
        } catch (err) {
            errorMsg('حدث خطأ ما إثناء إضافة زائر');
        }
    })
    $("body").on("click", ".cancelNotificationSuccess", () => {
        $(".notificationSuccess").hide();
    })

    $("body").on("click", ".cancelNotificationError", () => {
        $(".notificationError").hide();
    })

    $("body").on("click", ".deleteRow", (e) => {
        const id = Number(e.target.parentElement.parentElement.id.match(/\d+/)[0])
        arr = arr.filter((item) => {
            return item.id != id;
        });
        $("#bodyContent").empty();
        arr.forEach((Obj) => {
            $("#bodyContent").append(`
                <tr id="row${Obj.id}">
                    <th scope="row">${Obj.id}</th>
                    <td>${Obj.visitor_name}</td>
                    <td>${Obj.visitor_religion}</td>
                    <td>${Obj.visitor_birthplace}</td>
                    <td>${Obj.visitor_passType}</td>
                    <td>${Obj.visitor_job}</td>
                    <td>${Obj.visitor_nat}</td>
                    <td>${Obj.visitor_destination}</td>
                    <td>${Obj.visitor_relation}</td>
                    <td>${Obj.visitor_log}</td>
                    <td>${Obj.visitor_valid}</td>
                    <td><button type="button" class="btn btn-danger deleteRow">حذف </button></td>
                </tr>
            `);
        });
        if (arr.length === 0) {
            $(".table-responsive").append(`
            <div class="message_notFound p-2 bg-light" id="message_notFound">لأ توجد بيانات</div>
            `);
            counter = 0;
        }
    })
});

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
// /********************* Filter Sections Buttons ************************/

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