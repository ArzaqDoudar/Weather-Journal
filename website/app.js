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
const d = new Date();
const newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


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
    const response = await fetch("/all")
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

    dateDiv.innerHTML = data.date
    tempDiv.innerHTML = data.temperature + ' degrees'
    contentDiv.innerHTML = data.feeling
    // dateDiv.innerHTML = data[0].date
    // tempDiv.innerHTML = data[0].temperature + 'degrees'
    // contentDiv.innerHTML = data[0].feeling
}


const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById("date").innerHTML = allData.date;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


generateBtn.addEventListener('click', performAction)
