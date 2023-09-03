let api_key = "z1JpBt8mR0lM90qzmeBCqrGUWfk298rvc8fxRwnH";
let baseUrl = `https://api.nasa.gov/planetary/apod?`;

let container = document.getElementById("container");

//First function : getCurrentImageOfTheDay()
async function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().split("T")[0];
    //console.log(currentDate);
    let url = `${baseUrl}api_key=${api_key}&date=${currentDate}`
    const response = await fetch(url, {method:"GET"});
    const result = await response.json();
    console.log(result);
    container.innerHTML = `
            <img src="${result.hdurl}" alt="img">
            <h3>${result.title}</h3>
            <p>${result.explanation}</p>
    `    
}
getCurrentImageOfTheDay();


//Second Function: getImageOfTheDay()
let button = document.getElementById("btn");
button.addEventListener("click",()=>{
    let date = document.querySelector('input').value;
    getImageOfTheDay(date);
    //getData(date);
});
async function getImageOfTheDay(date){
    
    let url = `${baseUrl}api_key=${api_key}&date=${date}`
    const response = await fetch(url, {method:"GET"});
    const result = await response.json();
    console.log(result);
    container.innerHTML = `
            <img src="${result.hdurl}" alt="img">
            <h3>${result.title}</h3>
            <p>${result.explanation}</p>
    ` 
}

//Third function: saveSearch()
var ul = document.getElementById("search-history");

function saveSearch(event){
    event.preventDefault();
    var new_date = document.querySelector('input').value;
    var ul = document.getElementById("search-history");
    var list = document.createElement("li");
        list.innerHTML += `<a href="#">${new_date}</a>`;;
        ul.appendChild(list);

    if(localStorage.getItem('date') == null){
        localStorage.setItem('date','[]');
    }
    var old_date = JSON.parse(localStorage.getItem('date'));
    if(new_date !== ""){
        old_date.push(new_date);
    }
    else{
        alert("Please enter a valid date");
    }
    localStorage.setItem('date', JSON.stringify(old_date));

}

//Fourth function: addSearchToHistory()
function addSearchToHistory(){
    //console.log(old_date[0]);
    var old_date = JSON.parse(localStorage.getItem('date'));
    if(old_date == null){
        alert("No previous searches are available!!!")
    }
    else{
        for(let i=0;i<old_date.length;i++){
                var list = document.createElement("li");
                list.innerHTML = `<a href="#">${old_date[i]}</a>`;
                ul.appendChild(list);
                list.addEventListener("click",()=>{
                    getImageOfTheDay(old_date[i]);
                    console.log(old_date[i]);
                })
            }      
        }
    }
        
addSearchToHistory();




  



