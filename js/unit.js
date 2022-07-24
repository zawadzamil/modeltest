//getting id from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
if (id == null) {
    alert('Invalid Test Id. Please Go Back')
}
else {
    fetch("https://admin.modeltest.online/api/getTestbyId/" + id)
        .then(response => response.json())
        .then(data => show(data))

    function show(data) {
        console.log(data)
        if (data.success == 'yes') {
            const test = data.test;
            const subs = data.subjects;
            let subsString = JSON.stringify(subs)
            let string = subsString.replace(/[0-9]/g, '');
            string = string.replace(/[:]/g, ' ');
            string = string.replace(/[""{}]/g, '');
            const noc = parseInt(test.no_of_questions);
            const ppq = parseInt(test.points_per_questions);
            const negative = parseFloat(test.negative_marking);
            const mark = noc * ppq;
            $('#title').text(test.title);
            $('#question').text('Total Questions:' + test.no_of_questions);
            $('#mark').text('Total Marks:' + mark);
            $('#time').text('Time:' + test.time);
            $('#subs').text('Related Subjects:' + string);
            $('#negative').text('Negative Marking:' + negative);


        }
        else {
            alert("Sorry! No Data to Show")
        }
        const test = data.test;
        const noc = parseInt(test.no_of_questions);
        const ppq = parseInt(test.points_per_questions);
        const neg = parseFloat(test.negative_marking);
        const title = test.title;

        $('#submit').click(function () {
            const data = { "noc": noc, "time": test.time, "ppq": ppq, "negative": neg,"title":title, "model_id": id }
            sessionStorage.setItem('data', JSON.stringify(data));
            window.location = 'quiz.html';
        })
    }

}


