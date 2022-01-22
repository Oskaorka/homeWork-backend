document.addEventListener('click', event => {
    const evEnt = event.target
    const id = evEnt.dataset.id
    if(evEnt.dataset.type === 'remove') {
        remove(id).then(() => {
            evEnt.closest('li').remove()
        })
    }
    if(evEnt.dataset.type === 'edit' || evEnt.dataset.type === 'cancel' ) {
        showHiddenBlock(evEnt)
    }
    if(evEnt.dataset.type === 'updateTitle'){
        const inputNewTitle = evEnt.closest('li').querySelector('input').value
        showHiddenBlock(evEnt)
        if(inputNewTitle !== null) {
            update({id, title: inputNewTitle}).then(() => {
                evEnt.closest('li').querySelector('span').innerText = inputNewTitle
            })
        }
    }
})
function showHiddenBlock(event){
    event.closest('li').querySelector('div.one').classList.toggle('visually-hidden')
    event.closest('li').querySelector('div.second').classList.toggle('visually-hidden')
}
async function  remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function update(newNote) {
    await  fetch(`/${newNote.id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
    })
}