// for fetching train details that driver is operating
let trainData = {};
let driverData = {};
let routeData = {};
let socket = io('https://trucktrainapi.5amsystems.com');


socket.on("session", ({ sessionID, id, name }) => {
    socket.auth = { sessionID };
    socket.id = id;
    socket.name = name;
});

let arrivedListed = false;
socket.on('new-live-data', data => {
    trainData['Current_location_coordinates'] = data.coordinates;
    document.getElementById("train_speed").textContent = `${data.speed}mph`;
    document.getElementById("distanceCovered").value = data.distanceCovered;
    if (data.distanceCovered >= 100) {
        if (!arrivedListed) {
            document.getElementById('route_msgs').innerHTML = "<li>You have arrived at your destination</li>"
            arrivedListed = true;
        }
    } else {
        handleLiveData(data.coordinates, data.speed);
    }
});


// incorporate all functions for certain coordinates in one place
function handleLiveData(coordinates, speed) {
    handleGradient(coordinates, speed);
    handleCurvature(coordinates);
    handlePointSwitch(coordinates);
    handleSignalCrossing(coordinates);
    handleTempRestrictions(coordinates);

    if (document.getElementById('route_msgs').getElementsByTagName('li').length == 0) {
        document.getElementById('route_msgs').innerHTML = '<li>No obstructions ahead, route is clear</li>';
    }
}

// check if train is near certain coordinates
let gradientListed = false;
function handleGradient(coordinates, speed) {

    let nearGradient = routeData.gradients.find(gradient => {
        let distance = calculateDistance(coordinates, gradient.coordinates_from);
        return distance < 0.1; // Adjust this threshold as needed
    });

    if (nearGradient) { // decrease speed for uphill slopes and increase speed for downhill slopes
        if (gradientListed) {
            if (nearGradient.slope_angle > 0) {
                document.getElementById("gradient").textContent = `Train approaching gradient. Adjust speed to ${Math.round(speed * (1 - (nearGradient.slope_angle / 100)))} mph.`;
            } else {
                document.getElementById("gradient").textContent = `Train approaching gradient. Adjust speed to ${Math.round(speed * (1 + (Math.abs(nearGradient.slope_angle) / 100)))} mph.`;
            }
        } else {
            gradientListed = true;
            if (nearGradient.slope_angle > 0) {
                displayRouteMsg(`<span id="gradient">Train approaching gradient. Adjust speed to ${Math.round(speed * (1 - (nearGradient.slope_angle / 100)))} mph.</span>`);
            } else {
                displayRouteMsg(`<span id="gradient">Train approaching gradient. Adjust speed to ${Math.round(speed * (1 + (Math.abs(nearGradient.slope_angle) / 100)))} mph.</span>`);
            }
        }
    }
}

let curvatureListed = false;
function handleCurvature(coordinates) {

    let nearCurvature = routeData.curvatures.find(curvature => {
        let distance = calculateDistance(coordinates, curvature.coordinates_from);
        return distance < 0.1; // Adjust this threshold as needed
    });

    if (nearCurvature) {

        let maxSafeSpeed = 100; // Maximum safe speed for the train in mph
        let frictionFactor = 0.1; // Friction factor for track conditions
        let curveFactor = 0.05; // Factor to adjust speed based on curve radius

        // Calculate adjusted speed based on curve radius (in m)
        let adjustedSpeed = maxSafeSpeed - (curveFactor * nearCurvature.curve_radius);

        // Adjust speed for track conditions (e.g., friction)
        adjustedSpeed -= adjustedSpeed * frictionFactor;

        if (adjustedSpeed < 0) {
            adjustedSpeed = 10; // Ensure speed doesn't become negative, set to min mph
        }

        adjustedSpeed = adjustedSpeed.toFixed(2);

        if (curvatureListed) {
            document.getElementById('curvature').textContent = `Track curvature will turn with a radius of ${nearCurvature.curve_radius}m and speeds needs to be adjusted to ${adjustedSpeed}mph while turning.`;
        } else {
            curvatureListed = true;
            displayRouteMsg(`<span id="curvature">Track curvature will turn with a radius of ${nearCurvature.curve_radius}m and speeds needs to be adjusted to ${adjustedSpeed}mph while turning.</span>`);
        }

    }
}

let pointSwitchListed = false;
function handlePointSwitch(coordinates) {

    let pointSwitch = routeData.points_switches.find(x => x.connects_to == trainData.Destination_station);
    let distanceToIt = calculateDistance(coordinates, pointSwitch.coordinates);
    distanceToIt = distanceToIt.toFixed(2)
    if (distanceToIt < 0.1) {
        if (pointSwitchListed) {
            document.getElementById('signalCrossing').textContent = `In the next ${distanceToIt} miles, you'll encounter a junction. Take the ${pointSwitch.turn} switch to proceed towards ${trainData.Destination_station} station.`;
        } else {
            pointSwitchListed = true;
            displayRouteMsg(`<span id="pointSwitch">In the next ${distanceToIt} miles, you'll encounter a junction. Take the ${pointSwitch.turn} switch to proceed towards ${trainData.Destination_station} station.</span>`);
        }
    }

}

let singalCrossingListed = false;
function handleSignalCrossing(coordinates) {

    let nearSignal = routeData.signalCrossings.find(signal => {
        let distance = calculateDistance(coordinates, signal.coordinates);
        return distance <= 2;  // atleast 2 miles away
    });

    if (nearSignal && nearSignal > 0) {
        let distanceToSignal = calculateDistance(coordinates, nearSignal.coordinates); // Calculate distance to the nearest signal
        distanceToSignal = distanceToSignal.toFixed(2);

        if (singalCrossingListed) {
            const sc = document.getElementById('signalCrossing');
            if (nearSignal.status == 'Stop') {
                sc.textContent = `The following signal is ${distanceToSignal} miles away; it will be red by the time you arrive. Start decreasing speed to stop.`;
            } else if (nearSignal.status == 'Proceed with caution') {
                sc.textContent = `The following signal is ${distanceToSignal} miles away; proceed with caution and decrease your speed to ${routeData.Normal_running_speed}mph.`;
            } else {
                sc.textContent = `The following signal is ${distanceToSignal} miles away; it will be green by the time you arrive.`;
            }
        } else {
            singalCrossingListed = true;
            if (nearSignal.status == 'Stop') {
                displayRouteMsg(`<span id="signalCrossing">The following signal is ${distanceToSignal} miles away; it will be red by the time you arrive. Start decreasing speed to stop.</span>`);
            } else if (nearSignal.status == 'Proceed with caution') {
                displayRouteMsg(`<span id="signalCrossing">The following signal is ${distanceToSignal} miles away; proceed with caution and decrease your speed to ${routeData.Normal_running_speed}mph.</span>`);
            } else {
                displayRouteMsg(`<span id="signalCrossing">The following signal is ${distanceToSignal} miles away; it will be green by the time you arrive.</span>`);
            }
        }
    }
}

let tempResListed = false;
function handleTempRestrictions(coordinates) {

    if (tempResListed) {
        routeData.temporaryRestrictions.forEach((tempRes, i) => {
            let distTo = calculateDistance(coordinates, tempRes.coordinates_from);
            distTo = distTo.toFixed(2);
            document.getElementById(`tempRes${i}`).textContent = distTo;
        });
    } else {
        routeData.temporaryRestrictions.forEach((tempRes, i) => {
            let distBetween = calculateDistance(tempRes.coordinates_from, tempRes.coordinates_to);
            distBetween = distBetween.toFixed(2)
            let distTo = calculateDistance(coordinates, tempRes.coordinates_from);
            distTo = distTo.toFixed(2);
            let startTime = new Date(tempRes.Start_time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let endTime = new Date(tempRes.End_time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (distTo > 0) {
                displayRouteMsg(`${tempRes.description} starts in <span id="tempRes${i}">${distTo}</span> miles and lasts for ${distBetween} mile from ${startTime} to ${endTime}`);
            }

            if ((i + 1) == routeData.temporaryRestrictions.length) {
                tempResListed = true;
            }
        });
    }
}


// for appending messages to route info panel
function displayRouteMsg(msg) {
    let listItem = document.createElement('li');
    listItem.innerHTML = msg;
    document.getElementById("route_msgs").appendChild(listItem);

    // Remove the message after 2 minutes (120,000 milliseconds)
    // setTimeout(() => {
    //     listItem.remove();
    // }, 120000);
}

// for login authentication
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function checkCookie(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + '=') === 0) {
            return cookie.split("=")[1];
        }
    }
    return false;
}

let userLoggedIn = checkCookie('userLoggedIn');
if (!userLoggedIn) {
    window.location.href = '/login.html';
} else {
    getDriverDetails()
}

async function getDriverDetails() {
    await fetch('https://trucktrainapi.5amsystems.com/getDriverDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            driver_id: userLoggedIn
        })
    })
        .then(res => {
            if (!res.ok) {
                res.json().then(msg => { alert(msg.message) })
            } else {
                return res.json();
            }
        })
        .then(data => {
            driverData = data;
            document.getElementById('driverImg').src = data.Driver_img;
            document.getElementById('driverName').textContent = data.Driver_name;
            document.getElementById('driverEmail').textContent = data.Driver_email;
            document.getElementById('driverID').textContent = data.Driver_ID;
            getTrainDetails(data.Assigned_train_ID);
        })
        .catch(err => {
            console.log("Error occurred: ", err)
        })
}

function logout() {

    deleteCookie("userLoggedIn");
    window.location.href = '/login.html';
}


// for sockets
function updateLiveData(id, coordinates, speed) {
    socket.emit('update-live-data-to-driver', {
        train_ID: id,
        coordinates: coordinates,
        speed: speed
    });
}

async function getRouteDetails(route_id) {
    try {
        let response = await fetch('https://trucktrainapi.5amsystems.com/getRouteDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: route_id })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        return data[0];
    } catch (error) {
        console.log("Error occurred: ", error);
        throw error;
    }
}

async function getTrainDetails(train_id) {
    await fetch('https://trucktrainapi.5amsystems.com/getTrainDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            train_id: train_id
        })
    })
        .then(res => {
            if (!res.ok) {
                res.json().then(msg => { alert(msg.message) })
            } else {
                return res.json();
            }
        })
        .then(async data => {
            trainData = await data;
            routeData = await getRouteDetails(data.Operating_route_ID);
            console.log(trainData)
            console.log(routeData)

            // connect to sockets
            socket.auth = { username: driverData.Driver_name, sessionID: trainData.Train_ID, id: trainData.Train_ID };
            socket.connect();
            await socket.emit('new-driver-joined', trainData.Train_ID);

            document.getElementById("train_ID").textContent = await data.Train_ID;
            document.getElementById("dTime").textContent = await new Date(data.Departure_time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById("aTime").textContent = await new Date(data.Estimated_arrival_time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById("oStation").textContent = await getStationName(data.Origin_station);
            document.getElementById("dStation").textContent = await getStationName(data.Destination_station);
            fetchWeatherEvery15Minutes();
        })
        .catch(err => {
            console.log("Error occurred: ", err)
        })
}

async function getStationName(id) {
    let response = await fetch('https://trucktrainapi.5amsystems.com/getStationName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ station_id: id })
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    let data = await response.json();
    return data.Station_name;
}

// for weather data
function fetchWeatherEvery15Minutes() {
    // Call getWeatherInfo initially
    getWeatherInfo(trainData.Current_location_coordinates);

    // Set interval to call getWeatherInfo every 15 minutes
    setInterval(function () {
        getWeatherInfo(trainData.Current_location_coordinates);
    }, 900000); // 900000 milliseconds = 15 minutes
}

async function getWeatherInfo(lat, lon) {

    // source: https://rapidapi.com/weatherapi/api/weatherapi-com
    let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${lon}`;
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '00c5c0ac87msh9d8275db3274a0dp10180fjsn4a16fa2ee7a4',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        let response = await fetch(url, options);
        let result = await response.text();
        result = JSON.parse(result);
        let info = result.current;
        console.log(info)

        // update values in DOM
        document.querySelector('#cldp').textContent = `Cloud presence: ${info.cloud}%`;
        document.querySelector('#prcp').textContent = `Precipitation: ${info.precip_in} in`;
        document.querySelector('#hmdt').textContent = `Humidity: ${info.humidity}%`;
        document.querySelector('#wind').textContent = `Wind: ${info.wind_mph} mph`;
        document.querySelector('#temp').textContent = `${info.condition.text} • ${info.temp_c}°C`;
        document.querySelector('#weatherImg').src = info.condition.icon;

    } catch (error) {
        console.error(error);
    }
}


// Helper function to calculate distance between two points (coordinates)
function calculateDistance(point1, point2) {
    let [lat1, lon1] = point1;
    let [lat2, lon2] = point2;
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515; // Distance in miles
    return dist;
}