// //select subject
// const allSubject = document.getElementById('all-subject')
// allSubject.style.display = 'none'

// // Question type
// const questionType = document.getElementById('question-type')
// questionType.style.display = 'none'

// // ALl subject// 
// const formDetails = document.getElementById('form-details')
// formDetails.style.display = 'none'

// // append field div
// const inputs = document.getElementById('inputs')

// // for checkbox-type in type
// const optionForm = document.getElementById('optionform')
// optionForm.style.display = 'none';

// // for radio-type in type
// const inputRadio = document.getElementById('input-radio')
// inputRadio.style.display = 'none';

// // correct ans field
// const correctAnsFIeld = document.getElementById('correctAns')
// correctAnsFIeld.style.display = 'none';

// // radio button
// const showRadioBtn = document.getElementById('showRadio-btn')
// showRadioBtn.style.display = 'none';

// // submit button
// const submit = document.getElementById('submit')
// submit.style.display = 'none'

// // select category
// document.getElementById('category').addEventListener('change', function () {
//     allSubject.style.display = 'block';
// })

// // select subject
// document.getElementById('subject').addEventListener('change', function () {
//     formDetails.style.display = 'Block'
//     questionType.style.display = 'block';
// })


// // // nummber of option
// document.querySelector('#ques-clue').addEventListener('change', function (event) {
//     let inputField = this.value;
//     inputs.innerHTML = '';

//     for (let i = 0; i < inputField; i++) {
//         let input1 = document.createElement("input");
//         input1.type = "text";
//         input1.className = "textinput";
//         input1.id = "textinput";
//         input1.placeholder = "Option";
//         inputs.appendChild(input1);

//         let input2 = document.createElement("input");
//         input2.type = "file";
//         input2.className = "fileinput";
//         input2.id = "fileinput";
//         inputs.appendChild(input2);
//     }
// })

// // // question type
// document.getElementById('selectOption').addEventListener('change', function (){
//     const type=document.getElementById("selectOption").value;
//     if(type==="0")    {
//         optionForm.style.display = 'block';
//         formDetails.style.display = 'block'
//         showRadioBtn.style.display = 'block';
//         submit.style.display = 'block'
//         correctAnsFIeld.style.display = 'block';
//         inputRadio.style.display = 'none';
//     }
//     else if(type==="1")    {
//         optionForm.style.display = 'none';
//         inputRadio.style.display = 'block';
//         formDetails.style.display = 'block';
//         showRadioBtn.style.display = 'block';
//         submit.style.display = 'block'
//         correctAnsFIeld.style.display = 'block';
//     }
//     else if(type==="2")    {
//         optionForm.style.display = 'block';
//         formDetails.style.display = 'block';
//         showRadioBtn.style.display = 'block';
//         submit.style.display = 'block'
//         correctAnsFIeld.style.display = 'block';
//         inputRadio.style.display = 'none';
//     }
// })
