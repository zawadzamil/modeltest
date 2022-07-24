//getting id from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
window.category_id = parseInt(id);
console.log(id);
const ids = []

fetch("https://admin.modeltest.online/api/getSubjectandQueCount/" + id)
    .then(response => response.json())
    .then(data => addList(data));


addList = data => {

    let items = data.data;
    items.forEach(element => {
        $('.chepters').append('<div class="col-md-4 col-sm-6"><div class="chepter" id=' + element.id + ' >' + element.name + '<br>Total Questions : ' + element.count + ' </div ></div >')

    });

    //

    // 
}
const clicked = []
var selected = 0;
$('#selected').text(selected)
$(document).on('click', '.chepter', function (e) {
    if (clicked.includes(e.target.id)) {
        clicked.splice(clicked.indexOf(e.target.id), 1);
        e.target.style.backgroundColor = 'white'
        selected = selected - 1;
    }
    else {
        clicked.push(e.target.id)
        e.target.style.backgroundColor = 'green'
        selected = selected + 1;
    }
    $('#selected').text(selected)


})

$('#continue').click(function () {
    if (clicked.length != 0 && $('#questions').val() != null && $('#time').val() != null) {
        const data = { "noc": $('#questions').val(), "time": $('#time').val(), "selected": clicked ,"category":id,"from":"test"}
        sessionStorage.setItem('data', JSON.stringify(data));
        window.location = 'quiz.html';

    }
    else {
        alert('Please Select Chepter, No.of Questions, and Time Limit')
    }
});

$('.related').hide();
fetch("https://admin.modeltest.online/api/getTests")
    .then(response => response.json())
    .then(data => addRelated(data));



addRelated = data => {
    
    if (data.success == 'yes') {
        const test = data.data;
        test.forEach(element => {
            if (element.category_id == category_id) {
                $('.related').show();
                $('#related').append(' <li><a href="unit.html?id=' + element.id + '">' + element.title + '</a></li>')

            } 
        });
    }
    else {
        alert('Something Went Wrong! Please Reload or Go Back!')
    }
}




