console.log("Welcome to notes app. This is app.js");

showNotes();   //on reload load all the previous stored notes

// If user adds a note to the localStorage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function(e){
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');   //returns string

    if(notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);   //converts string into object
    }

    if(addTxt.value != "") {   //to check if the text field isn't empty
        notesObj.push(addTxt.value);   //pushes text to the object
    }
    else{
        alert('Please enter some text before submitting');
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));   //converts object into string
    addTxt.value = "";   //clears the textbox

    // console.log(notesObj);

    showNotes();   //to add the note to 'Your Notes' section
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if(notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";

    notesObj.forEach(function(element, index) {
        html += `<div class="card mx-2 my-2 noteCard" style="width: 18rem; margin: 0 auto;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index+1}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" id="addBtn">Delete Note</button>
                    </div>
                </div>`;
    });

    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Fuction to delete a note
function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem('notes');
    if(notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1); 
    localStorage.setItem('notes', JSON.stringify(notesObj));  //updating the object in localStorage

    showNotes();  //to update 'Your Notes' after deleting
}