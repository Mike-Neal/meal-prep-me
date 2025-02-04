const searchParam = document.getElementById('searchInput');
const submitBtn = document.getElementById('search-button')
const addToButton = document.querySelectorAll('#add-recipe')


function changeBtn(uri) {
    const btnToChange = document.getElementById(uri);
    btnToChange.setAttribute("disabled", "disabled;");
    btnToChange.textContent = "Recipe Added! ✅";

}

// async function addToMeals(uri) {
//     const search = uri;
//     const encodedUri = encodeURIComponent(req.body.search)
//     let getRequest;
//     if (search) {
//         getRequest = await fetch(`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedUri}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`, {
//             method: "POST",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ search })

//         });
//         console.log(getRequest)
//     }
//     if (getRequest) {
//         console.log(getRequest)
//         changeBtn(uri);
//     }
// }

async function addToMeals(uri) {
    if (!uri) {
        console.error("URI is not defined.");
        return;
    }

    const encodedUri = encodeURIComponent(uri);

    const response = await fetch(`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedUri}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: encodedUri }),
    });

    if (response.ok) {
        console.log("Recipe added successfully");
        changeBtn(uri);
    } else {
        console.error("Failed to add recipe");
    }
}


const result = submitBtn.addEventListener('click', searchEvent);

async function searchEvent(event) {
    event.preventDefault();
    healthSpec = []
    const checkboxes = document.getElementsByName('health')
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            healthSpec.push(checkboxes[i].value)
        }
    }

    let stringWithCommas = healthSpec.toString()
    let stringWithoutCommas = stringWithCommas.split(',').map(s => s.trim()).join('');

    const selectElement = document.querySelector('#meal-select');
    let mealSelect = selectElement.value

    const search = searchParam.value += mealSelect += stringWithoutCommas;
    if (search) {
        window.location.href = `/recipes/${search}`
    }
};
