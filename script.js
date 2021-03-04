 document.addEventListener("DOMContentLoaded", () => {
     let addPage = document.getElementById("add-page")
     addPage.addEventListener("click", addPagehandler)
     let button = document.getElementById("journal-save")
     button.addEventListener("click", eventHandler)
 })



//ADD PLANNER 








//ADD JOURNAL 
 function addPagehandler(e){
    let pagecontainer = document.getElementById("add-note")
    pagecontainer.style.display = "none"
    let journalpage = document.getElementById("journal-page")
    journalpage.style.display = "block"
    console.log("addPageHandler")
 }
 function eventHandler (e){
    e.preventDefault();
    // grabbing input ele for each journal
    let journaltitle = document.getElementById("journal-title");
    let journaldate = document.getElementById("journal-date");
    let journalcontent = document.getElementById("journal-content");
    updateLocalStorage(journaltitle, journaldate, journalcontent)
    console.log("eventHandler")
 }

 function updateLocalStorage(title, date, content){
     // get local journals if they are there else set [] of journals
     let journals = JSON.parse(localStorage.getItem("journals")) || {}
     // add journal to local storage
     const uniid = Date.now()
     journals[uniid]={
         title: title.value,
         date: date.value,
         content: content.value,
         id: uniid
     }
     localStorage.setItem("journals", JSON.stringify(journals))

     manipulationWithDisplay(title, date, content)
     console.log("updateLocalStorage")
 }

 function manipulationWithDisplay(title, date, content){
    // hiding journal entry page and showing home page 
    let journalpage = document.getElementById("journal-page")
    journalpage.style.display = "none"
    let addnote = document.getElementById("add-note")
    addnote.style.display = "block"
    // setting input values to ""
    title.value = ""
    date.value = ""
    content.value = ""
    getItemToAdd()
    console.log("manipulationWithDisplay")
 }

 function getItemToAdd(){
    // read save journal in local storage 
    let journals = JSON.parse(localStorage.getItem("journals"))
    let journallist = document.getElementById("journal-list")
    journallist.innerHTML = ''
    const journalkeys = Object.keys(journals)
    journalkeys.forEach(createJournalList)
    console.log("getItemToAdd")
 }

 function createJournalList(){
    // debugger
    // for each journal we want to add a journal to li
    let journal = journals[key]
    let journalitem = document.createElement("li")
    journalitem.innerText = journal.title
    journalitem.id = journal.id

    // create el to show and hide each el
    let journalcontainer = document.createElement("div")
    journalcontainer.id = `container-${journal.id}`
    journalcontainer.className = "innerDiv"
    let innerDivDate = document.createElement("p")
    let innerDivContent = document.createElement("p")
    let deletebutton = document.createElement("button")
    deletebutton.innerText = "Delete Journal"
    innerDivDate.innerText = journal.date
    innerDivContent.innerText = journal.content

    // adding to journal container
    journalcontainer.append(content, date, deletebutton)
    journalitem.append(journalcontainer)
    journalcontainer.style.display = "none"
console.log("createJournalList");
    behaviorOnJItem(journalitem)
 }

 function behaviorOnJItem(journalitem){ 
    // add click event to hide and show container 
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
        console.log("behaviorOnJItem")
 }

 function deleteJournal(id){
    let journals = JSON.parse(localStorage.getItem("journals"))
    delete journals[id]
    let deletejournal = document.getElementById(id)
    deletejournal.remove()
    localStorage.setItem("journals", JSON.stringify(journals))
    console.log(journals, localStorage)
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
 