$(document).ready(function () {
    window.answerArray = [];



    var userData = JSON.parse(sessionStorage.getItem("data"));
    console.log(userData)
    window.neg = 0;



    $('#more-details-questions').text(userData.noc)
    $('#more-details-mark').text(userData.noc)
    $('#more-details-time').text(userData.time)

    var min = parseInt(userData.time);
    var sec = 0;
    var interval = setInterval(function () {

        --sec;
        min = (sec < 0) ? --min : min;
        if (min < 0) finish();
        sec = (sec < 0) ? 59 : sec;
        sec = (sec < 10) ? '0' + sec : sec;
        min = (min < 10) ? min : min;
        $('.countdown').html(min + ':' + sec);
    }, 1000)


    if (userData.from == 'test') {
        $('#title').hide()
        $.ajax({
            url: "https://admin.modeltest.online/api/getQuestionsBySubject?noc=" + userData.noc + "&subs=" + userData.selected,
            type: 'GET',
            dataType: 'json', // added data type
            success: function (res) {
                if (res.success == 'yes') {
                    getQuestions(res.data);

                }
                else {
                    alert(res.message)
                }

            }
        });

    }
    else {
        var test_id = userData.model_id;
        var test_id = parseInt(test_id);
        var correct = userData.ppq;
        neg = userData.negative;
        $('#title').text(userData.title)
        $('#correctMark').text(correct)
        $('#negative').text(neg)

        $.ajax({
            url: "https://admin.modeltest.online/api/getQuestionbyModeltest/" + test_id,
            type: 'GET',
            success: function (res) {
                if (res.success == 'yes') {
                    getQuestions(res.data);



                }
                else {
                    alert(res.message)
                }

            }
        });

    }


});

//When Timeout
function finish() {
    var noc = $('#more-details-questions').text();
    var time = $('#more-details-time').text();
    const passInfo = { "noc": noc, "time": time, "answer": window.answerArray }
    sessionStorage.setItem('answer', JSON.stringify(passInfo));
    window.location = 'result.html';

}

//Get Question from Server
function getQuestions(data) {
    let count = 1;
    let i = 0;
    var id = 0;
    var digit = 1;
    console.log(data)

    data.forEach(element => {

        $('.paginator').append(' <div class="col-md-2 pege-btn"><div button class= "btn-level" id="' + id + '" > ' + digit + '</div ></div >')
        digit++;
        id++;

    });



    $.ajax({
        url: " https://admin.modeltest.online/api/getQuestion/" + data[i],
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            $('#count').text(count)
            $('#question').text(res.question.question)
            var figure = res.question.figure;
            if (figure != null) {

                var img = $('<img />', {
                    id: 'figure',
                    src: 'https://admin.modeltest.online/public/images/questions/' + figure,
                    alt: 'Figure'
                });
                img.appendTo($('.figure'));
            }
            else {
                $('.figure').empty();
            }
            var option = res.question.options;

            $('#option_list').empty()
            var listSerial = 1;
            option.forEach(element => {
                const opFigure = element.figure;
                if (opFigure == null) {

                    $('#option_list').append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'option' + listSerial,
                            name: 'option',
                            value: listSerial
                        })
                    ).append(
                        $('<label>').prop({
                            for: 'option' + listSerial,
                            id: 'label' + listSerial,
                        }).html(element.option)
                    ).append(
                        $('<br>')
                    );
                    listSerial++;

                }
                else {


                    $('#option_list').append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'option' + listSerial,
                            name: 'option',
                            value: listSerial
                        })
                    ).append(
                        '<img src= "https://admin.modeltest.online/public/images/options/' + opFigure + '" alt="option" height="50" weight="50" >'
                    ).append(
                        $('<br>')
                    );
                    listSerial++;
                }



            })

        }
    });

    // By Selecting an Answer

    $("#option_list").on("change", "input", function () {
        var duplicate = false;
        var serial = $('#count').text();
        serial = parseInt(serial);
        var array = window.answerArray;

        for (var k = 0; k < array.length; k++) {
            if (array[k].question_id == data[i]) {
                array[k].answer = this.value;
                duplicate = true;
            }
        }
        if (duplicate == false) {
            var qid = data[i];
            var ans = this.value;
            answerArray.push({ question_id: qid, answer: ans, serial: serial })
            document.getElementById(serial - 1).style.backgroundColor = 'green'

        }


    });


    //////////////On Click Pagination Button Acton////////////////////////
    $('.btn-level').click(function (e) {
        i = parseInt(this.id);
        var serial = i + 1;

        var alreadyAnswered = false;
        answerArray.forEach(element => {
            if (element.serial == i + 1) {
                alreadyAnswered = true;
            }

        });
        if (alreadyAnswered == false) {
            document.getElementById(i).style.backgroundColor = 'red'

        }
        $.ajax({
            url: " https://admin.modeltest.online/api/getQuestion/" + data[i],
            type: 'GET',
            dataType: 'json', // added data type
            success: function (res) {
                $('#count').text(i + 1)
                var figure = res.question.figure;
                if (figure != null) {

                    var img = $('<img />', {
                        id: 'figure',
                        src: 'https://admin.modeltest.online/public/images/questions/' + figure,
                        alt: 'Figure'
                    });
                    img.appendTo($('.figure'));
                }
                else {
                    $('.figure').empty();
                }


                $('#question').text(res.question.question)
                var option = res.question.options;
                $('#option_list').empty()
                var listSerial = 1;
                option.forEach(element => {


                    const opFigure = element.figure;
                    if (opFigure == null) {

                        $('#option_list').append(
                            $('<input>').prop({
                                type: 'radio',
                                id: 'option' + listSerial,
                                name: 'option',
                                value: listSerial
                            })
                        ).append(
                            $('<label>').prop({
                                for: 'option' + listSerial,
                                id: 'label' + listSerial,
                            }).html(element.option)
                        ).append(
                            $('<br>')
                        );
                        listSerial++;

                    }
                    else {


                        $('#option_list').append(
                            $('<input>').prop({
                                type: 'radio',
                                id: 'option' + listSerial,
                                name: 'option',
                                value: listSerial
                            })
                        ).append(
                            '<img src= "https://admin.modeltest.online/public/images/options/' + opFigure + '" alt="option" height="50" weight="50" >'
                        ).append(
                            $('<br>')
                        );
                        listSerial++;
                    }

                })

            },
            complete: function () {
                // If already answered, check radion auto

                answerArray.forEach(element => {
                    if (element.serial == serial) {
                        let value = parseInt(element.answer)
                        document.getElementById('option' + value).checked = 'true'



                    }

                });
            }
        });
    })

    //////////////////////////////On Click Next Button Action///////////////
    $('#next').click(function () {

        if (i < data.length - 1) {
            i = i + 1;
            var serial = parseInt($('#count').text()) + 1;
            $.ajax({
                url: " https://admin.modeltest.online/api/getQuestion/" + data[i],
                type: 'GET',
                dataType: 'json', // added data type
                success: function (res) {
                    $('#count').text(serial)
                    $('#question').text(res.question.question)
                    var option = res.question.options;
                    $('#option_list').empty()
                    var figure = res.question.figure;
                    if (figure != null) {

                        var img = $('<img />', {
                            id: 'figure',
                            src: 'https://admin.modeltest.online/public/images/questions/' + figure,
                            alt: 'Figure'
                        });
                        img.appendTo($('.figure'));
                    }
                    else {
                        $('.figure').empty();
                    }
                    var listSerial = 1;
                    option.forEach(element => {


                        const opFigure = element.figure;
                        if (opFigure == null) {

                            $('#option_list').append(
                                $('<input>').prop({
                                    type: 'radio',
                                    id: 'option' + listSerial,
                                    name: 'option',
                                    value: listSerial
                                })
                            ).append(
                                $('<label>').prop({
                                    for: 'option' + listSerial,
                                    id: 'label' + listSerial,
                                }).html(element.option)
                            ).append(
                                $('<br>')
                            );
                            listSerial++;

                        }
                        else {


                            $('#option_list').append(
                                $('<input>').prop({
                                    type: 'radio',
                                    id: 'option' + listSerial,
                                    name: 'option',
                                    value: listSerial
                                })
                            ).append(
                                '<img src= "https://admin.modeltest.online/public/images/options/' + opFigure + '" alt="option" height="50" weight="50" >'
                            ).append(
                                $('<br>')
                            );
                            listSerial++;
                        }

                    })

                },
                complete: function () {
                    // If already answered, check radion auto

                    var alreadyAnswered = false;
                    answerArray.forEach(element => {
                        if (element.serial == i + 1) {
                            alreadyAnswered = true;
                            document.getElementById(i).style.backgroundColor = 'green'
                        }

                    });
                    if (alreadyAnswered == false) {
                        document.getElementById(i).style.backgroundColor = 'red'

                    }

                    answerArray.forEach(element => {
                        if (element.serial == serial) {
                            let value = parseInt(element.answer)
                            document.getElementById('option' + value).checked = 'true'


                        }

                    });
                }


            });





        }
        else {
            alert("Last Item From the List")
        }


    })

    //////////////////////////Previous Button Action ///////////////////////////
    $('#prev').click(function () {
        if (i > 0) {
            i = i - 1;
            var alreadyAnswered = false;
            answerArray.forEach(element => {
                if (element.serial == i + 1) {
                    alreadyAnswered = true;
                    document.getElementById(i).style.backgroundColor = 'green'
                }

            });
            if (alreadyAnswered == false) {
                document.getElementById(i).style.backgroundColor = 'red'

            }
            var serial = parseInt($('#count').text()) + -1;
            $.ajax({
                url: " https://admin.modeltest.online/api/getQuestion/" + data[i],
                type: 'GET',
                dataType: 'json', // added data type
                success: function (res) {
                    $('#count').text(serial)
                    $('#question').text(res.question.question)
                    var option = res.question.options;
                    $('#option_list').empty()
                    var listSerial = 1;
                    var figure = res.question.figure;
                    if (figure != null) {

                        var img = $('<img />', {
                            id: 'figure',
                            src: 'https://admin.modeltest.online/public/images/questions/' + figure,
                            alt: 'Figure'
                        });
                        img.appendTo($('.figure'));
                    }
                    else {
                        $('.figure').empty();
                    }
                    option.forEach(element => {


                        const opFigure = element.figure;
                        if (opFigure == null) {

                            $('#option_list').append(
                                $('<input>').prop({
                                    type: 'radio',
                                    id: 'option' + listSerial,
                                    name: 'option',
                                    value: listSerial
                                })
                            ).append(
                                $('<label>').prop({
                                    for: 'option' + listSerial,
                                    id: 'label' + listSerial,
                                }).html(element.option)
                            ).append(
                                $('<br>')
                            );
                            listSerial++;

                        }
                        else {


                            $('#option_list').append(
                                $('<input>').prop({
                                    type: 'radio',
                                    id: 'option' + listSerial,
                                    name: 'option',
                                    value: listSerial
                                })
                            ).append(
                                '<img src= "https://admin.modeltest.online/public/images/options/' + opFigure + '" alt="option" height="50" weight="50" >'
                            ).append(
                                $('<br>')
                            );
                            listSerial++;
                        }

                    })

                },
                complete: function () {
                    // If already answered, check radion auto

                    answerArray.forEach(element => {
                        if (element.serial == serial) {
                            let value = parseInt(element.answer)
                            document.getElementById('option' + value).checked = 'true'


                        }

                    });
                }


            });





        }
        else {
            alert('This is the first Item')
        }

    })


    /////////////////////Submit Button Press /////////////////////////
    $('#submit').click(function () {
        if (confirm("Are you sure to Submit?")) {
            txt = "You pressed OK!";

            var noc = $('#more-details-questions').text();
            var time = $('#more-details-time').text();
            const passInfo = { "noc": noc, "time": time, "neg": neg, "answer": answerArray }
            sessionStorage.setItem('answer', JSON.stringify(passInfo));
            window.location = 'result.html';
        } else {
            txt = "You pressed Cancel!";
        }

    })

}








