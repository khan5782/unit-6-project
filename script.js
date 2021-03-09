document.addEventListener("DOMContentLoaded", () => {
    let button = document.getElementById("journal-save")
    button.addEventListener("click", eventHandler)
   let buttonPlanner = document.getElementById("planner-button")
   buttonPlanner.addEventListener("click", addPlannerItems)
   let journals = JSON.parse(localStorage.getItem("journals")) || {}
   if(Object.keys(journals).length != 0){
       addJournalsToList()
   }
   let planners = JSON.parse(localStorage.getItem("planners")) || {}
   if(Object.keys(planners).length != 0){
       addPlannerFromStorage(planners)
       
   }
})


// Add a planner 

function addPlannerFromStorage(planners){
   let goallistel = document.getElementById("goals-list")
   let todolistel = document.getElementById("todo-list")
   let noteslistel = document.getElementById("notes-list")
   const {todolist, goallist, noteslist} = planners
   Object.keys(todolist).forEach(key => {
       todo(todolistel, todolist[key])
   })
   Object.keys(noteslist).forEach(key => {
       addNotes(noteslistel, noteslist[key])
   })
   Object.keys(goallist).forEach(key => {
       addGoals(goallistel, goallist[key])
   })
   
}

function addPlannerItems(){
   let plannersobj = {
       todolist: {},
       goallist: {},
       noteslist: {}
   }
   let planners = JSON.parse(localStorage.getItem("planners")) || plannersobj
   // plannersobj = { ...plannersobj, ...planners}
   let input = document.getElementById("input-planner")
   let selection = document.getElementById("items")
   let goallist = document.getElementById("goals-list")
   let todolist = document.getElementById("todo-list")
   let noteslist = document.getElementById("notes-list")
   let inputval = input.value
   let selectionval = selection.value
   let id = Date.now()
   switch(selectionval) {
       case "goals-list":
           addGoals(goallist, inputval, id)
           planners.goallist[id] = inputval
         break;
       case "todo-list":
         todo(todolist, inputval, id)
         planners.todolist[id] = inputval
         break;
       case "notes-list":
        addNotes(noteslist, inputval, id)
        planners.noteslist[id] = inputval
         break;
   }
   input.value = ""
   localStorage.setItem("planners", JSON.stringify(planners))
   
   
}

function addGoals(goallist, inputval, id){
   let containerdiv =document.createElement("div")
   let goalli = document.createElement("li")
   let goalbutton = document.createElement("button")
   goalbutton.innerText = "X"
   goalli.innerText = inputval
   containerdiv.append(goalli, goalbutton)
   goallist.append(containerdiv)
   goalli.addEventListener("click", clickli)
   goalbutton.addEventListener("click", (e) =>{
       deleteli(e, id, "goallist")
   })
   
   
}
function clickli(e){
   e.preventDefault()
   e.target.style.textDecoration = "line-through"
}
function deleteli(e, id, type){
   e.preventDefault()
   e.target.parentElement.style.display = "none"
   const planners = JSON.parse(localStorage.getItem("planners"))
   delete planners[type][id]
   localStorage.setItem("planners", JSON.stringify(planners))
}

function todo(todolist, inputval, id){
   let containerdiv = document.createElement("div")
   
   let todoli = document.createElement("li")
   let todobutton = document.createElement("button")
   
   todobutton.innerText = "X"
   todoli.innerText = inputval
   containerdiv.append(todoli, todobutton)
   todolist.append(containerdiv)
   todoli.addEventListener("click", clickli)
   todobutton.addEventListener("click", (e) =>{
       deleteli(e, id, "todolist")
   })
}

function addNotes(noteslist, inputval, id){
   let containerdiv = document.createElement("div")
   let notesli = document.createElement("li")
   let notesbutton = document.createElement("button")
   notesbutton.innerText = "X"
   notesli.innerText = inputval
   containerdiv.append(notesli, notesbutton)
   noteslist.append(containerdiv)
   notesli.addEventListener("click", clickli)
   notesbutton.addEventListener("click", (e) =>{
       deleteli(e, id, "noteslist")
   })
}





//ADD JOURNAL 

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

   title.value = ""
   date.value = ""
   content.value = ""
   addJournalsToList()
}


function addJournalsToList(){
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

// <span class="tag is-medium"> entry<button class="delete"></button></span>

   // create el to show and hide each el
   let journalcontainer = document.createElement("span")
   journalcontainer.id = `container-${journal.id}`
   journalcontainer.className = "innerDiv tag is-medium"
   let innerDivDate = document.createElement("p")
   let innerDivContent = document.createElement("p")
   let deletebutton = document.createElement("button")
   deletebutton.className = "delete"
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