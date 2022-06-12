//getting id from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);
const ids = []

fetch("../json/chapters.json")
    .then(response => response.json())
    .then(data => addList(data));


addList = data => {
    data.forEach(element => {
        if (element.sub_id == id) {
            $('.chepters').append('<div class="col-md-4 col-sm-6"><div  class= "chepter"  id = ' + element.id + ' >' + element.name + '<br> Questions : 12 </div ></div >');
            ids.push(element.id)

        }



    });
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
        alert('Proceed!')
        
    }
    else {
        alert('Please Select Chepter, No.of Questions, and Time Limit')
    }
})




