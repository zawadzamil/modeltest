$(document).ready(function () {
    var userData = JSON.parse(sessionStorage.getItem("answer"));
    console.log(userData)

    var noc = userData.noc;
    var time = userData.time;
    var ans = userData.answer;
    var questionArray = [];
    let negative = parseFloat(userData.neg);
    ans.forEach(element => {
        questionArray.push(element.question_id)
        
    });
    // console.log(questionArray);
    
    

    $.ajax({
        type: 'post',
        url: 'https://admin.modeltest.online/api/result',
        data:{"data":questionArray},
        dataType: "json",
        success: function (data) {
            // console.log(data)
            var correct = 0;
            for (let i = 0; i < ans.length; i++){
                var selectedOption = parseInt(ans[i].answer) - 1;
                var correctOption = data[i].correct - 1;
                var optionSelected = data[i].options[selectedOption].option;
                var optionCorrect = data[i].options[correctOption].option;
                var optionSelectedFigure = data[i].options[selectedOption].figure;
                var optionCorrectFigure = data[i].options[correctOption].figure;
                

                if (ans[i].question_id == data[i].id) {
                    if (optionSelected == null || optionCorrect == null) {
                        $('#table').append('<tr><td> ' + (i + 1) + '</td ><td>' + data[i].question + '</td><td><img src= "https://admin.modeltest.online/public/images/options/' + optionSelectedFigure + '" alt="option" height="50" weight="50" > </td><td><img src= "https://admin.modeltest.online/public/images/options/' + optionCorrectFigure +'" alt="option" height="50" weight="50" ></td></tr >')
                    }
                    else {
                        $('#table').append('<tr><td> ' + (i + 1) + '</td ><td>' + data[i].question + '</td><td>' + optionSelected + '</td><td>' + optionCorrect + '</td></tr >')
                    }
                   

                    if (ans[i].answer == data[i].correct) {
                        correct = correct+1
                        
                    }
                   
                    
                }
            }
            var wrong = noc - correct;
            var total = correct - wrong * negative;
            $('#correct').text(correct)
            $('#total').text(noc)
            $('#mark').text(total)
            $('#fullMark').text(noc)
            $('#wrong').text(wrong)

        }
    });
});
