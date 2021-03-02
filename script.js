/**
 * when add page is clicked on 
 * lead to notes page 
 */

 document.addEventListener("DOMContentLoaded", () => {
     let addPage = document.getElementById("add-page")
     addPage.addEventListener("click", addPagehandler)
 })

 function addPagehandler(e){
     e.target.style.display = "none"
     let form = document.createElement("form")
     

 }