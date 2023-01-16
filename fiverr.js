let jobs = [];
let earnings = 0;
let previousClients = JSON.parse(localStorage.getItem("previousClients")) || [];
function addJob(username, price, deadline, jobType, repeatBuyer, tonight) {
        let newJob = {username, price, deadline, jobType, repeatBuyer, tonight};
        if(tonight){
            jobs.unshift(newJob);
        } else {
            jobs.push(newJob);
        }
        displayJobs();
        username = username.toLowerCase();
        if(!previousClients.includes(username)){
            previousClients.push(username);
            localStorage.setItem("previousClients", JSON.stringify(previousClients));
        }
        if(repeatBuyer || previousClients.includes(username)){
            newJob.repeatBuyer = true;
        }
        newJob.rating = rating(newJob);
        getTask();
    }
    function rating(job){
        if(job.repeatBuyer){
            return 3;
        } else if(job.price > 2000){
            return 5;
        } else if(job.price < 10){
            return 1;
        }
        else if(job.price < 251){
            return 2;
        }
        else if(job.price < 1001){
            return 4;
        }
    }
    function getTask(){
        let sortBy = document.getElementById("sort-select").value;
        if(sortBy === "deadline"){
            jobs.sort((a, b) => {
                return new Date(a.deadline) - new Date(b.deadline);
            });
        } else if(sortBy === "price"){
            jobs.sort((a, b) => {
                return a.price - b.price;
            });
        } else if(sortBy === "username-asc"){
            jobs.sort((a, b) => {
                return a.username.localeCompare(b.username);
                });
                } else if(sortBy === "username-desc"){
                jobs.sort((a, b) => {
                return b.username.localeCompare(a.username);
                });
                } else if(sortBy === "rating"){
                jobs.sort((a, b) => {
                return a.rating - b.rating;
                });
                }
                let currentJob = jobs[0];
                document.getElementById("username").innerHTML = currentJob.username;
                document.getElementById("price").innerHTML = currentJob.price;
                document.getElementById("job-type").innerHTML = currentJob.jobType;
                if(currentJob.repeatBuyer){
                document.getElementById("repeat-buyer").innerHTML = "Repeat Buyer";
                } else {
                document.getElementById("repeat-buyer").innerHTML = "";
                }
                }
                function completeTask(){
                earnings += jobs[0].price;
                document.getElementById("monthly-earnings").innerHTML = "Earnings: $" + earnings;
                if (earnings >= 2400) {
                document.getElementById("monthly-earnings").classList.add("green");
                }
                jobs.shift();
                displayJobs();
                getTask();
                }
                function skipTask(){
                jobs.push(jobs.shift());
                getTask();
                }
                function editTask(){
                let currentJob = jobs.shift();
                let username = prompt("Enter new username", currentJob.username);
                let price = prompt("Enter new price", currentJob.price);
                let deadline = prompt("Enter new deadline", currentJob.deadline);
                let jobType = prompt("Enter new job type", currentJob.jobType);
                let repeatBuyer = prompt("Is this a repeat buyer? (true or false)", currentJob.repeatBuyer);
                let tonight = prompt("Is this a tonight job? (true or false)", currentJob.tonight);
                addJob(username, price, deadline, jobType, repeatBuyer, tonight);
                }
                function displayJobs(){
                let select = document.getElementById("job-select");
                select.innerHTML = "";
                for(let i = 0; i < jobs.length; i++){
                let option = document.createElement("option");
                option.value = i;
                option.innerHTML = `${jobs[i].username} - $${jobs[i].price} - ${jobs[i].deadline} - ${jobs[i].jobType}`;
                select.appendChild(option);
                }
                }
                function bulkEdit(){
                let selected = document.getElementById("job-select").selectedOptions;
                for(let i = 0; i < selected.length; i++){
                let currentJob = jobs[selected[i].value];
                let username = prompt("Enter new username", currentJob.username);
                let price = prompt("Enter new price", currentJob.price);
                let deadline = prompt("Enter new deadline", currentJob.deadline);
                let jobType = prompt("Enter new job type", currentJob.jobType);
                let repeatBuyer = prompt("Is this a repeat buyer? (true or false)", currentJob.repeatBuyer);
                let tonight = prompt("Is this a tonight job? (true or false)", currentJob.tonight);
                jobs[selected[i].value] = {username, price, deadline, jobType, repeatBuyer, tonight};
                }
                displayJobs();
                getTask();
                }
                function bulkDelete(){
                let selected = document.getElementById("job-select").selectedOptions;
                for(let i = selected.length - 1; i >= 0; i--){
                jobs.splice(selected[i].value, 1);
                }
                displayJobs();
                getTask();
                }
                displayJobs();
                getTask();
