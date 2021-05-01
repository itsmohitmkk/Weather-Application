// console.log("Client side javascript")
//Fetching data from a URL and dumping them into console
// fetch('http://localhost:3000/weather?search=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error)
//             console.log(data.error)
//         else
//             console.log(data)
//     })
// })

//Making a HTML form to display messeges
const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const mess_1 = document.querySelector('#msg-1')
const mess_2 = document.querySelector('#msg-2')


weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    mess_1.textContent = "Loading"
    if (location == null || location == undefined) {
         mess_1.textContent = "Error"
         mess_2.textContent = "Enter a location"
    }else{
    const url = '/weather?search=' + encodeURIComponent(location)
   
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error){
                mess_1.textContent = "Error"
                mess_2.textContent = data.error
            }
            else{
                console.log(data)
                mess_1.textContent = "Success"
                mess_2.textContent = data.data
            }
        })
    })
}

})