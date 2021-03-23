/* Global Variables */
/*Variables which hold the url */
const baseurl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const api_id = ',us&units=metric&appid=0fb27f9d286ec3ad117cb6b584aac7ae'
const zipnum = document.querySelector("#zip");
/*variables which hold the button and feeling's content*/
const bttn = document.querySelector("#generate");
const currentfeel = document.querySelector("#feelings");
/*Variables which hold where the data will shown up*/
const currenttemp = document.querySelector("#temp");
const currentdate = document.querySelector("#date");
const currentcontent = document.querySelector("#content")

// Create event function which contains everything happen
function updatedata(e){
    //alert the user to fill zip field if it is empty
    if(zipnum.value==""){
      alert("Zip shouldn't be empty")
      return false;
    }
    //pass paramters to fetch function to get the data from the api
    getWeatherData(baseurl,zipnum.value,api_id)
    .then((newData)=>{
        // Create a new date instance dynamically with JS
        let d = new Date();
        //add 1 to month beacuse it is count from 0 to 11
        let month= parseInt(d.getMonth(),10)+1
        let nDate = month+'.'+ d.getDate()+'.'+ d.getFullYear();
        //create object which hold the data which user entered
        temp={
            temp:newData.main.temp,
            date:nDate,
            content:currentfeel.value
        }
        //calling the post function and pass data object to it 
        postData('/postd',temp)
    }
    )
    //calling updateui function to get the data from the server and updated ui with it
    .then(()=>updateUi('/get')
    )
}
//create function which will fetch the api url and get data and give her paramters of the url
let getWeatherData = async (url,zip,id)=>{
    const response = await fetch(url+zip+id);
  //return the data if the fetch worked well
    try {
      const newData = await response.json(); 
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
  }
//create function which will post the data to server and pass object data to it  
let postData =  async (url='',data={})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)    
      })
    //send the data to server if the fetch worked well
    try {
      const nData = await response.json(); 
      return nData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
  }
  //Create function to get the data from the server and update the ui using it
  let updateUi = async (url='')=>{
    const response = await fetch(url);
    //update the tempreature, date and feeling contents
    try {
      const tempAndOthers = await response.json();
      currenttemp.textContent=(`Tempreature: ${tempAndOthers.temp}`)
      currentdate.textContent=(`Date: ${tempAndOthers.date}`);
      currentcontent.textContent=(`Feeling: ${tempAndOthers.content}`)
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
  }

//add event listener to the button
bttn.addEventListener('click',updatedata);
