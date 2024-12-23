/* Global Variables  */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&APPID=eee1f1d1723341960bd881d4bcf95789&units=imperial'

let dataObject = []

const generateBtn = document.getElementById('generate');
const zipInput = document.getElementById('zip')
const feelingsInput = document.getElementById('feelings')
const dateDiv = document.getElementById('date')
const tempDiv = document.getElementById('temp')
const contentDiv = document.getElementById('content')

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


const performAction = async () => {
    const zipValue = zipInput.value;
    const feelings = feelingsInput.value

    if (zipValue && feelings) {
        await postData(baseURL, zipValue, apiKey, feelings)
        await getData()

    }

}
//event 
const postData = async (baseURL, zip, key, feeling) => {
    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        const newEntry = {
            temperature: data.main.temp,
            date: newDate,
            feeling: feeling
        }
        const response = await fetch("http://localhost:8000/addData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry)
        })
        return response;
    } catch (error) {
        console.log("error", error);
    }
}
const getData = async () => {
    const response = await fetch("/getData")
    try {
        const data = await response.json();
        console.log('response from get data === ', typeof (data));
        console.log('response from get data === ', data);
        updateUI(data)
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = (data) => {
    console.log('data', data);
    dateDiv.innerHTML = data[0].date
    tempDiv.innerHTML = data[0].temperature + 'degrees'
    contentDiv.innerHTML = data[0].feeling
}
generateBtn.addEventListener('click', performAction)
