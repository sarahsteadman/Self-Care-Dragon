let speechBox = document.querySelector("#dragon-text");
let list = document.querySelector("#task-list");

let taskFormula = { id: "", text: "", checked: false };

function displayTasks() {
    tasks = JSON.parse(taskString);
    for (let t of tasks) {
        let checklistItem = makeChecklistItem(t, count);
        list.appendChild(checklistItem);

        count++;
    }
}
// Makes HTML ELements for Checklist Items
function makeChecklistItem(task, count) {
    let check = document.createElement("input");
    check.type = "checkbox";
    check.id = `Task${count}`;
    let label = document.createElement("label");
    label.htmlFor = `Task${count}`;
    if (task.completed) {
        check.checked = true;
        label.classList.add('checked');
    }
    label.appendChild(check);
    label.appendChild(document.createTextNode(task.text));
    taskMap.set(check.id, task);
    return label;
}
//Determines what happens when a checkbox is clicked
function checkoff(event) {

    console.log("check");

    let taskElement = event.target;
    let task = taskMap.get(taskElement.id);

    // If task unchecked, check it
    if (taskElement.checked) {
        task.completed = true;
        const label = document.querySelector(`label[for="${taskElement.id}"]`);
        label.classList.add('checked');
    }
    // If task unchecked, check it
    else {
        task.completed = false;
        const label = document.querySelector(`label[for="${taskElement.id}"]`);
        label.classList.remove('checked');
    }
    let jsonString = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonString);
}

// This uses recursion to spell out what the dragon is saying, one letter at a time. setTimeout calls
// dragonSays until it reaches the end of the message.
function dragonSays(text, index = 0) {
    if (index == 0) {
        speechBox.innerHTML = "";
    }
    speechBox.innerHTML += text.charAt(index);
    index++;
    if (index < text.length) {
        setTimeout(() => dragonSays(text, index), 100);
    }
}

async function fetchAPI(address) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(address);
            if (response.ok) {
                const data = await response.json();
                resolve(data); // Resolve the promise once weather data is obtained
            }
            else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
            reject(error); // Reject the promise if there's an error
        }
    });
}

async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                weatherObj.setLocation(latitude, longitude);
                resolve(); // Resolve the promise once location data is obtained
            }, (error) => {
                reject(error); // Reject the promise if there's an error
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

async function main() {
    await getLocation();
    console.log(weatherObj.longitude);
    console.log(weatherObj.latitude);
}

async function resetTasks() {
    let taskList = []
    let taskJson = await fetchAPI("../tasks.json");
    taskList.concat(taskJson.Weather.EveryDay);

    let weatherData = await fetchAPI(weatherObj.requestURL);
    weatherObj.extractWeatherData(weatherData);

    if (weatherObj.id == 800) {
        taskList.concat(taskJson.taskList.clear)
    }
    else if (weatherObj.id > 800) {
        taskList.concat(taskJson.taskList.clouds)
    }
    else {
        taskList.concat(taskJson.taskList.indoor);
        console.log(weatherObj.id);
    }

    console.log(taskList);
}

let weatherObj = new Weather();
main();
document.querySelector("#reset-tasks").addEventListener('click', resetTasks);