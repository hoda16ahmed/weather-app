async function search(a) {
    var w = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6ff643f0f123416992795436232612&q=${a}&days=3`);
    if (w.ok && 400 != w.status) {
        var a = await w.json();
        displayCurrent(a.location, a.current),
        displayAnother(a.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", a=>{
    search(a.target.value)
}
);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(a, w) {
    if (null != w) {
        var e = new Date(w.last_updated.replace(" ", "T"));
        var m =
         ` <div class=" col-lg-4 pb-4 col-md-12  ">
          <div >
         <div class=" d-flex justify-content-between  py-2  " id="today">
            <div >${days[e.getDay()]}</div>
            <div >${e.getDate() + monthNames[e.getMonth()]}</div>
            </div> 
            <div class="p-3" >
            <div class="pt-4 ps-3">${a.name}</div>
            <div >
                <div class="display-1 fw-bold ps-4 pb-5 d-inline-block ">${w.temp_c}<sup>o</sup>C</div>
                <div class="d-inline-block ">
                    <img src="https:${w.condition.icon}" alt="" width="90">
                </div>	
    
            </div>
            <div class="pb-3 text-info">${w.condition.text}</div>
            <span class="pe-2"><img src="img/icon-umberella.png" alt="">20%</span>
            <span class="pe-2"><img src="img/icon-wind.png" alt="">18km/h</span>
            <span class="pe-2"><img src="img/icon-compass.png" alt="">East</span>
            </div>
            </div>
            </div> `;
        document.getElementById("box").innerHTML = m
    }
    
}
function displayAnother(a) {
    var w = "";
    for (var e = 1; e < a.length; e++)
        w +=   `<div class="text-center col-lg-4 pb-4 col-md-12 box2 ">
        <div class="p-2 mb-5 ">
            <div class="day ">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>
        </div> 
        <div >
            <div class="pb-4">
                <img src="https:${a[e].day.condition.icon}" alt="" width="48">
            </div>
            <div class="fs-2 fw-bold">${a[e].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${a[e].day.mintemp_c}<sup>o</sup></small>
            <div class="pt-3 text-info">${a[e].day.condition.text}</div>
        </div>
    </div>	`
    document.getElementById("box").innerHTML += w
}
search("Alexandria");
