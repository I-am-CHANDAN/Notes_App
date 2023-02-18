const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener(
    "click",
    function () {
        addNote();
    }
)

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
        <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-sharp fa-solid fa-trash"></i>
        </div>
        <textarea>${text}</textarea>`


    //Remove the note
    note.querySelector(".trash").addEventListener(
        "click",
        function () {
            note.remove();
            saveNotes()
        }
    )

    //Save the note
    note.querySelector(".save").addEventListener(
        "click",
        function () {
            saveNotes();
        }
    )

    //Auto Save
    note.querySelector("textarea").addEventListener(
        "focusout",
        function () {
            saveNotes();
        }
    )

    //Add the note to the Main
    main.appendChild(note);
    saveNotes();
}

const saveNotes = () => {
    const note = document.querySelectorAll(".note textarea");
    const data = [];
    note.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    if (data.length === 0) {
        localStorage.removeItem("note")
    } else {
        //save in LocalStorage
        localStorage.setItem("note", JSON.stringify(data));
    }
}

//Self Calling Function or Initial call
(
    function () {
        const lsnote = JSON.parse(localStorage.getItem("note"));
        if (lsnote === null) {
            addNote()
        } else {
            lsnote.forEach(
                (lsnote) => {
                    addNote(lsnote);
                }
            )
        }
    }
)()