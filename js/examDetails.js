//getting id from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);

fetch("https://admin.modeltest.online/api/getTestbyCategory/" + id)
    .then(response => response.json())
    .then(data => addTests(data));



function addTests(data) {
    if (data.success == 'yes') {
        const items = data.data;
        items.forEach(element => {

            $('#tests').append('  <div class="col-md-4 col-sm-6 col-lg-3"><div div class= "test-name" id = "tooltip" > <a href="unit.html?id=' + element.id + '"> <div class="caption"><h4>'+element.title+'</h4> <small>Review 3.5 ★</small> <br><small>Average Percentage: 69%</small><p class="note"><small>Exam taken: 700</small></p> </div></a></div ></div >')

        });
    }
    else {
        $('#tests').append(' <div class="failed"><h2 h2 class= "text-secondary" > Sorry! No Data Available.Please select another Category </h2> <br><a href="exams.html"> Go Back </a></div> ')
    }
}


fetch("https://admin.modeltest.online/api/getTests")
    .then(response => response.json())
    .then(data => addHotTopics(data));



function addHotTopics(data) {
    if (data.success == 'yes') {
        const tests = data.data;
        $('#p_test').empty()
        for (let i = 0; i < 5; i++) {
            $('#p_test').append('<li> <a href="unit.html?id=' + tests[i].id + '">' + tests[i].title + '</a></li>')

        }

        $('#bcs').empty();
        tests.forEach(element => {
            if (element.category_id == 3) {
                $('#bcs').append('<li> <a href="unit.html?id=' + element.id + '">' + element.title + '</a></li>')
            }

        });

    }
    else {
        alert('Sorry! No Data Available Now!')
    }
}