document.addEventListener('click', event => {

    const id = event.target.dataset.id
    if(event.target.dataset.type === 'remove') {
        /*console.log('remove', id)*/
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if(event.target.dataset.type === 'edit') {
        const test = prompt()
        test !== null?edit(test,id).then(() => {
            event.target.closest('li').childNodes[1].textContent=test
        }):null
    }
})

async function  remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function edit(test,id) {
    await  fetch(`/${test}/${id}`, {
        method: "PUT"
    })
}