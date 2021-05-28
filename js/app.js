console.log("Welcome to notes app. This is app.js");

showNotes();   //on load/reload load all the previous stored notes

// If user adds a note to the localStorage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function(e){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');   //returns all the notes
    let titles = localStorage.getItem('titles');  //returns all the titles

    if(notes == null && titles == null) {
        notesObj = [];
        titlesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);   //converts string into object
        titlesObj = JSON.parse(titles);
    }

    if(addTxt.value != "" && addTitle.value != "") {   //to check if the text field isn't empty
        notesObj.push(addTxt.value);   //pushes text to the object
        titlesObj.push(addTitle.value);
    }
    else{
        alert('Please add a title and enter some text before submitting');
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));   //converts object into string
    localStorage.setItem('titles', JSON.stringify(titlesObj));

    addTxt.value = "";   //clears the textbox
    addTitle.value = ""; //clears the title

    showNotes();   //to add the note to 'Your Notes' section
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');   //returns all the notes
    let titles = localStorage.getItem('titles');  //returns all the titles

    if(notes == null && titles == null) {
        notesObj = [];
        titlesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);   //converts string into object
        titlesObj = JSON.parse(titles);
    }
    
    let html = "";

    notesObj.forEach(function(element, index) {
        html += `<div class="card mx-2 my-2 noteCard" style="width: 18rem; margin: 0 auto;">
                    <div class="card-body">
                        <h5 class="card-title">${titlesObj[index]}</h5>
                        <p class="card-text">${element}</p>
                        <button id="" onclick="editNote(this.id)" class="btn btn-outline-secondary">Edit Note</button>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger">Delete Note</button>
                    </div>
                    <div class="card-footer text-muted" style="text-align: center">
                        Time stamp
                    </div>
                </div>`;
    });

    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0  && titlesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Fuction to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if(notes == null && titles == null) {
        notesObj = [];
        titlesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }

    notesObj.splice(index, 1); 
    titlesObj.splice(index, 1); 
    localStorage.setItem('notes', JSON.stringify(notesObj));  //updating the object in localStorage
    localStorage.setItem('titles', JSON.stringify(titlesObj));  //updating the object in localStorage

    showNotes();  //to update 'Your Notes' after deleting
}

// Function to edit a note
function editNote(index) {
    
}

// Search Box
let search = document.getElementById('searchTxt');

search.addEventListener('input', function () {    //input event
    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element) {
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "inline-block";
        }
        else {
            element.style.display = "none";
        }
    })
});


/* Further Features:
   1. Add Title + Search by title - done
   2. Mark Important Notes - extra styling
   3. Edit Notes *
   4. Add Time Stamp *
   5. Sort feature
   6. Sync and host to web server - database
*/