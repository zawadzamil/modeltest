fetch("https://admin.modeltest.online/api/getCategories")
    .then(response => response.json())
    .then(data => addResult(data));


addResult = data => {
    let item = data.data;
    item.forEach(element => {
        $('#categories').append(' <div class="col-md-6"><div div  class= "subjects" > <a href="exam_details.html?id='+element.id+'"><h5>'+element.name+'</h5></a> </div ></div > ')

    });
}

//Get All Tests
fetch("https://admin.modeltest.online/api/getTests")
    .then(response => response.json())
    .then(data => addTests(data));



function addTests(data) {
    if (data.success == 'yes') {
        const items = data.data;
        items.forEach(element => {
            $('.second').append('<div class="col-md-4"><div div class= "test" > <a href = "unit.html?id=' + element.id + '"> <h5>' + element.title + ' </a></h5></div > </div >')
            
            
        });
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
            $('#p_test').append('<li> <a href="unit.html?id='+tests[i].id+'">'+tests[i].title+'</a></li>')

        }

        $('#bcs').empty();
        tests.forEach(element => {
            if (element.category_id == 3) {
                $('#bcs').append('<li> <a href="unit.html?id=' + element.id + '">' + element.title +'</a></li>')
           }
           
       });

    }
    else {
        alert('Sorry! No Data Available Now!')
    }
}