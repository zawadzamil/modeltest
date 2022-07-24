$(window).on('load', function () {

    $('.loader').fadeOut();
});

$(document).ready(function () {
    fetch("https://admin.modeltest.online/api/getCategories")
        .then(response => response.json())
        .then(data => addResult(data));


    addResult = data => {
        let item = data.data;
        let count = data.count;
        for (var i = 0; i < item.length; i++) {
            $('#allTests').append('<div class="col-md-4 col-sm-6 col-lg-3"> <a a href = "test_details.html?id=' + item[i].id + '" ><div class="box"><img src="https://admin.modeltest.online/public/images/category/' + item[i].image + '" class="img-fluid" alt=""><div class="text-box"><h4>' + item[i].name + '</h4><h5>Total Questions :' + count[i].count + '</h5> </div></div></a></div > ')


        }

    }



    fetch("https://admin.modeltest.online/api/getTests")
        .then(response => response.json())
        .then(data => addHotTopics(data));



    function addHotTopics(data) {
        if (data.success == 'yes') {
            const tests = data.data;
            $('#popular').empty();
            for (let i = tests.length - 1; i > 4; i--) {
                $('#popular').append('<li>' + tests[i].title + ' </li>')

            }
        }
        else {
            alert('Sorry! No Data Available Now!')
        }
    }
})







