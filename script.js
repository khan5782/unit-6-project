document.addEventListener("DOMContentLoaded", () => {
    let addPage = document.getElementById("add-page")
    addPage.addEventListener("click", addPagehandler)
    let button = document.getElementById("journal-save")
    button.addEventListener("click", eventHandler)
    let addplanner = document.getElementById("add-planner")
    addplanner.addEventListener("click", showaddplanner)
    let buttonPlanner = document.getElementById("planner-button")
    buttonPlanner.addEventListener("click", addPlannerItems)
})


// Add a planner 

function showaddplanner(){
   let pagecontainer = document.getElementById("add-note")
   pagecontainer.style.display = "none"
   let planner = document.getElementById("planner")
   planner.style.display = "block"
}

function addPlannerItems(){
   let input = document.getElementById("input-planner")
   let selection = document.getElementById("items")
   let goallist = document.getElementById("goals-list")
   let todolist = document.getElementById("todo-list")
   let noteslist = document.getElementById("notes-list")
   let inputval = input.value
   let selectionval = selection.value
   switch(selectionval) {
       case "goals-list":
           addGoals(goallist, inputval)
         break;
       case "todo-list":
         todo(todolist, inputval)
         break;
       case "notes-list":
        addNotes(noteslist, inputval)
         break;
   }
   input.value = ""
}

function addGoals(goallist, inputval){
   let goalli = document.createElement("li")
   let goalbutton = document.createElement("button")
   goalbutton.innerText = "X"
   goalli.innerText = inputval
   goallist.append(goalli, goalbutton)
   goalli.addEventListener("click", clickli)
   goalbutton.addEventListener("click", deleteli)
}
function clickli(e){
   e.preventDefault()
   e.target.style.textDecoration = "line-through"
}
function deleteli(e){
   e.preventDefault()
   e.target.parentElement.style.display = "none"
}

function todo(todolist, inputval){
   let todoli = document.createElement("li")
   let todobutton = document.createElement("button")
   todobutton.innerText = "X"
   todoli.innerText = inputval
   todolist.append(todoli, todobutton)
   todoli.addEventListener("click", clickli)
   todobutton.addEventListener("click", deleteli)
}

function addNotes(noteslist, inputval){
   let notesli = document.createElement("li")
   let notesbutton = document.createElement("button")
   notesbutton.innerText = "X"
   notesli.innerText = inputval
   noteslist.append(notesli, notesbutton)
   notesli.addEventListener("click", clickli)
   notesbutton.addEventListener("click", deleteli)
}





//ADD JOURNAL 
function addPagehandler(e){
   let pagecontainer = document.getElementById("add-note")
   pagecontainer.style.display = "none"
   let journalpage = document.getElementById("journal-page")
   journalpage.style.display = "block"
}
function eventHandler (e){
   e.preventDefault();
   // grabbing input ele for each journal
   let journaltitle = document.getElementById("journal-title");
   let journaldate = document.getElementById("journal-date");
   let journalcontent = document.getElementById("journal-content");
   updateLocalStorage(journaltitle, journaldate, journalcontent)
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

function createJournalList(key){
   // for each journal we want to add a journal to li
   let journals = JSON.parse(localStorage.getItem("journals"))
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
   journalcontainer.append(innerDivContent, innerDivDate, deletebutton)
   journalitem.append(journalcontainer)
   journalcontainer.style.display = "none"
   console.log("createJournalList");
   let journallist = document.getElementById("journal-list")
   behaviorOnJItem(journalitem, deletebutton, journallist, journalcontainer, journal)
}

function behaviorOnJItem(journalitem, deletebutton, journallist, journalcontainer, journal){ 
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
}

function deleteJournal(id){
   let journals = JSON.parse(localStorage.getItem("journals"))
   delete journals[id]
   let deletejournal = document.getElementById(id)
   deletejournal.remove()
   localStorage.setItem("journals", JSON.stringify(journals))
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

