const searchParam = document.getElementById('searchInput');
const submitBtn = document.getElementById('search-button')
const addToButton = document.querySelectorAll('#add-recipe')

// for (let i = 0; i < addToButton.length; i++){
//     addToButton[i].addEventListener('click', addToMeals(this.className));
// }


async function addToMeals(uri) {
    const search = uri;
    let getRequest;
    if (search) {
        getRequest = await fetch('http://localhost:3001/api/recipes', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({search})

        });
            console.log(getRequest)
        }
        if (getRequest) {
            // const receivedData = await getRequest.json()
            console.log(getRequest)
        //     alert("ok")
        //     saveRequest = await fetch(`/api/recipe/${search}`, {
        //         method: "POST",
        //         body: getRequest,
        //         headers: { 'Content-Type': 'application/json' }
        //     })
        }
        // alert(saveRequest)
    // }
}

async function deleteMeals(id){
    if (id){
        deleteRequest = await fetch(`http://localhost:3001/api/recipes/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        });
    }
    document.location.reload()
}
const result = submitBtn.addEventListener('click', searchEvent);

async function searchEvent(event) {
    event.preventDefault();
    const search = searchParam.value;
    if (search) {
        window.location.href = `/recipes/${search}`
    }
};
