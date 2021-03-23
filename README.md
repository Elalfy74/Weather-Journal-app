# Weather-Journal App Project

## Abstract:
Project is an asynchronous web app that uses Web API and user data to dynamically update the UI with current tempreature of a specific zip which the user had entered and the time when the user clicked the button

## Languages:
* HTML
* CSS
* JAVA SCRIPT
  And Node js as javascript run time enviroment

## Features:
* Project is done on local server
* The User choose which zip number he want to see it's tempreature
* The data at UI is dynamically updated every time the user click generate button
* if the zip field is empty, the page will alert the user to fill it
* getting the data from extenal api and save it to the server before send it again to the UI

## Functions:
**First Function**: which contain all other functions and run when the user click the generate button.
```js
function updatedata(e){
    if(zipnum.value==""){
      alert("Zip shouldn't be empty")
      return false;
    }
    getWeatherData(baseurl,zipnum.value,api_id)
    .then((newData)=>{
        let d = new Date();
        let month= parseInt(d.getMonth(),10)+1
        let nDate = month+'.'+ d.getDate()+'.'+ d.getFullYear();
        temp={
            temp:newData.main.temp,
            date:nDate,
            content:currentfeel.value
        }
        postData('/postd',temp)
    }
    )
    .then(()=>updateUi('/get')
    )
}
```
**Second Function**: which is an asynchronous function. It has parameters of the url which will be fetched and get the data from the api then transfer it to the next function
```js
let getWeatherData = async (url,zip,id)=>{
    const response = await fetch(url+zip+id);
    try {
      const newData = await response.json(); 
      return newData
    }catch(error) {
    console.log("error", error);
    }
  }
  ```
  **Third Function**: which will recieve data from second function and post it to the server
  ```js
let postData =  async (url='',data={})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)    
      })
    try {
      const nData = await response.json(); 
      return nData
    }catch(error) {
    console.log("error", error);
    }
  }
  ```
  **Fourth Function**: which will get the data which has been posted to the server and update user interface with last data
  ```js
  let updateUi = async (url='')=>{
    const response = await fetch(url);
    try {
      const tempAndOthers = await response.json();
      currenttemp.textContent=(`Tempreature:${tempAndOthers.temp}`)
      currentdate.textContent=(`Date:${tempAndOthers.date}`);
      currentcontent.textContent=(`Feeling:${tempAndOthers.content}`)
    }catch(error) {
    console.log("error", error);
    }
  }
  ```
  ## Conclusion
  This page will not need you to add the data staticaly but it is change it's data dynamicaly, updating the date and display the user feelings dynamically.
  The code has secret id
