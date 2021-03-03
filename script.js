/**
 * when add page is clicked on 
 * lead to notes page 
 */

 document.addEventListener("DOMContentLoaded", () => {
     let addPage = document.getElementById("add-page")
     addPage.addEventListener("click", addPagehandler)
     let button = document.getElementById("journal-save")
     button.addEventListener("click", saveJournal)
 })

 function addPagehandler(e){
    e.target.style.display = "none";
    let journalpage = document.getElementById("journal-page")
    journalpage.style.display = "block"
 }

 function saveJournal(){
    let journaltitle = document.getElementById("journal-title")
    let journaldate = document.getElementById("journal-date")
    let journalcontent = document.getElementById("journal-content")
    let journals = JSON.parse(localStorage.getItem("journals")) || []
    journals.push({
        journaltitle: journaltitle.value,
        journaldate: journaldate.value,
        journalcontent: journalcontent.value,
        id: Date.now()
    })
    localStorage.setItem("journals", JSON.stringify(journals))
    console.log(localStorage)
    let journalpage = document.getElementById("journal-page")
    journalpage.style.display = "none"
    let addPage = document.getElementById("add-page")
    addPage.style.display = "block"
    journaltitle.value = ""
    journaldate.value = ""
    journalcontent.value = ""

    // start to populate ul
    journals = JSON.parse(localStorage.getItem("journals"))
    let journallist = document.getElementById("journal-list")
    journals.forEach(journal => {
        let journalitem = document.createElement("li")
        journalitem.innerText = journal.journaltitle
        journalitem.id = journal.id
        journalitem.addEventListener("mouseover", function(e) {
            journalitem.style.background = 'blue'
        })
        journalitem.addEventListener("mouseleave", function(e) {
            journalitem.style.background = 'white'
        })
        journalitem.addEventListener("click", function(e) {
            e.preventDefault()
            let journaldate = document.createElement("p")
            let journalcontent = document.createElement("p")
            journaldate.innerText = journal.journaldate
            journalcontent.innerText = journal.journalcontent
            journalitem.append(journalcontent, journaldate)
            
        })
        

        journallist.append(journalitem)
    })

 }
//  function makeForm (){
//     let date = document.createElement("input");
//     let inputtitle = document.createElement("input");
//     let button = document.createElement("button")
//     let textinput = document.createElement("textarea")
//     let note = document.getElementById("add-note");
//     button.innerText = "Save Journal"
//     date.type = "date"
//     textinput.cols = "30"
//     textinput.rows = "30"
//     note.append( inputtitle, date, textinput, button);
//  }

 function submitHandler(e, input, note){
    let p = document.createElement("p");
    let text = input.value; 
    console.log(input);
    p.innerText = `${text}`;
    note.append(p)
    console.log(note)
    console.log(p.innerText)
 }