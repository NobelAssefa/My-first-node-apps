console.log("from js file")
// fetch('http://localhost:3000/weather?address=london').then((Response) => {
//     Response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forcast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message1.textContent = "Loding.."
    message2.textContent = ""
    fetch('http://localhost:3000/weather?address='+location).then((Response) => {
        Response.json().then((data) => {
            if (data.error) {
                message1.textContent =  data.error
            } else {
                message1.textContent = "Country: " +data.location
                message2.textContent = "Forecast: " + data.forcast
                
            }
        })
    })

    // const location = search.value
    // console.log(location)

})