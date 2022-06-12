fetch("../json/subjects.json")
    .then(response => response.json())
    .then(data => addResult(data));


addResult = data => {
    data.forEach(element => {
        $('#allTests').append('<div class="col-md-4 col-sm-6 col-lg-3"> <a a href = "test_details.html?id='+ element.id+'" ><div class="box"><img src="../images/subjects/' + element.image + '" class="img-fluid" alt=""><div class="text-box"><h4>' + element.name + '</h4><h5>Total Questions :200</h5> </div></div></a></div > ')

    });
}
