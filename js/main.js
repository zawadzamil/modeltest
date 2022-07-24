// Loader
$(window).on('load',function () {
  $('.loader').fadeOut();
});

$(document).ready(function () {



  // Toggle menu on click
  $("#menu-toggler").click(function () {
    toggleBodyClass("menu-active");
  });

  function toggleBodyClass(className) {
    document.body.classList.toggle(className);
  }

});


//Slider

fetch("https://admin.modeltest.online/api/getCategories")
  .then(response => response.json())
  .then(data => addFeatured(data));


function addFeatured(data) {
  const categories = data.data;
  const count = data.count;

  for (var i = 0; i < 4; i++) {
    $('#featured').append(' <div class="col-md-4 col-lg-3 col-sm-6 fe"> <a href = "test_details.html?id=' + categories[i].id + '"><div class= "featured_element " ><img src="https://admin.modeltest.online/public/images/category/' + categories[i].image + '" alt="" class="img-responsive"><div class="caption"> <h4>' + categories[i].name + '</h4><h5>Total Questions: ' + count[i].count + '</h5></div> </div></a></div >')
  }
}

fetch("https://admin.modeltest.online/api/getTests")
  .then(response => response.json())
  .then(data => addHotTopics(data));



function addHotTopics(data) {
  if (data.success == 'yes') {

    const tests = data.data;
  
    $('#hot').empty()
    for (let i = 0; i < 9; i++) {
      $('#hot').append('<li><a href="unit.html?id=' + tests[i].id + '">' + tests[i].title + '</a> </li>')

    }
  }
  else {
    alert('Sorry! No Data Available Now!')
  }
}


