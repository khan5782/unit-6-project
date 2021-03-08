 document.addEventListener("DOMContentLoaded", () => {
     let addPage = document.getElementById("add-page")
     addPage.addEventListener("click", addPagehandler)
     let button = document.getElementById("journal-save")
     button.addEventListener("click", saveJournal)
 })
 
 function addPagehandler(e){
    let pagecontainer = document.getElementById("add-note")
    pagecontainer.style.display = "none"
    let journalpage = document.getElementById("journal-page")
    journalpage.style.display = "block"
 }

 function saveJournal(e){
    e.preventDefault()
    // grabbing input ele for each journal
    let journaltitle = document.getElementById("journal-title")
    let journaldate = document.getElementById("journal-date")
    let journalcontent = document.getElementById("journal-content")
    // get local journals if they are there else set [] of journals
    let journals = JSON.parse(localStorage.getItem("journals")) || {}
    // add journal to local storage
    const uniid = Date.now()
    journals[uniid]={
        journaltitle: journaltitle.value,
        journaldate: journaldate.value,
        journalcontent: journalcontent.value,
        id: uniid
    }
    localStorage.setItem("journals", JSON.stringify(journals))
    // hiding journal entry page and showing home page 
    let journalpage = document.getElementById("journal-page")
    journalpage.style.display = "none"
    let addnote = document.getElementById("add-note")
    addnote.style.display = "block"
    // setting input values to ""
    journaltitle.value = ""
    journaldate.value = ""
    journalcontent.value = ""
    createJournalList()
 }

 function createJournalList(){
     // read save journal in local storage 
    let journals = JSON.parse(localStorage.getItem("journals"))
    let journallist = document.getElementById("journal-list")
    journallist.innerHTML = ''
    // for each journal we want to add a journal to li
    const journalkeys = Object.keys(journals)
    journalkeys.forEach(key => {
        let journal = journals[key]
        let journalitem = document.createElement("li")
        journalitem.innerText = journal.journaltitle
        journalitem.id = journal.id

        // create el to show and hide each el
        let journalcontainer = document.createElement("div")
        journalcontainer.id = `container-${journal.id}`
        journalcontainer.className = "innerDiv"

        let journaldate = document.createElement("p")
        let journalcontent = document.createElement("p")
        let deletebutton = document.createElement("button")
        deletebutton.innerText = "Delete Journal"
        journaldate.innerText = journal.journaldate
        journalcontent.innerText = journal.journalcontent

        // adding to journal container
        journalcontainer.append(journalcontent, journaldate, deletebutton)
        journalitem.append(journalcontainer)
        journalcontainer.style.display = "none"
       
        // add click even to hide and show container 
        journalitem.addEventListener("click", function(e) {
            e.preventDefault()
            let journalvisb = journalcontainer.style.display
            if(journalvisb == "none"){
                journalcontainer.style.display = "block"
            } else {
                journalcontainer.style.display = "none"
            }
        })
        deletebutton.addEventListener("click", () => {deleteJournal(journal.id)})
        journallist.append(journalitem)

    })
    
 }

 function deleteJournal(id){
    let journals = JSON.parse(localStorage.getItem("journals"))
    delete journals[id]
    let deletejournal = document.getElementById(id)
    deletejournal.remove()
    localStorage.setItem("journals", JSON.stringify(journals))
    // console.log(journals, localStorage)
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

