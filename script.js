/**
 * when add page is clicked on 
 * lead to notes page 
 */

 document.addEventListener("DOMContentLoaded", () => {
     let addPage = document.getElementById("add-page")
     addPage.addEventListener("click", addPagehandler)
 })

 function addPagehandler(e){
     e.target.style.display = "none";
     makeForm();
 }

 function makeForm (){
    let form = document.createElement("form");
    let input = document.createElement("input");
    let note = document.getElementById("add-note");
    note.append(form, input);

    form.addEventListener("submit", submitHandler)
   // makeLinedPageWInput(form, input, note)
 }

 function submitHandler(e, input, note){
    let p = document.createElement("p");
    let text = input.value; 
    console.log(input);
    p.innerText = `${text}`;
    note.append(p)
    console.log(note)
    console.log(p.innerText)
 }