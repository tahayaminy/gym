let barname1 = `[
    [
        {
            "task": "شنا",
            "repeat": null,
            "weight": null,
            "status": false
        },
        {
            "task": "شنا دست جمع",
            "repeat": null,
            "weight": null,
            "status": false
        }
    ],
    [
        {
            "task": "ساعد هالتر",
            "repeat": 8,
            "weight": 20,
            "status": true
        },
        {
            "task": "مچ دست هالتر",
            "repeat": 2,
            "weight": 10,
            "status": true
        }
    ],
    {
        "task": "شکم",
        "repeat": null,
        "weight": null,
        "status": false
    },
    [
        {
            "task": "سرشانه از جلو",
            "repeat": 10,
            "weight": 20,
            "status": true
        },
        {
            "task": "سرشانه از عقب",
            "repeat": 10,
            "weight": 20,
            "status": true
        }
    ],
    {
        "task": "پرس بالا سینه",
        "repeat": 12,
        "weight": 30,
        "status": true
    },
    [
        {
            "task": "دمبل آرنولدی",
            "repeat": null,
            "weight": null,
            "status": false
        },
        {
            "task": "نشر از جلو صفحه",
            "repeat": null,
            "weight": null,
            "status": false
        }
    ]
]`;
let barname2 = `[
  {
    "task": "شکم",
    "repeat": null,
    "weight": null,
    "status": false
  },
  [
    {
      "task": "پارالل",
      "repeat": null,
      "weight": null,
      "status": false
    },
    {
      "task": "دیپ",
      "repeat": null,
      "weight": null,
      "status": false
    }
  ],
  {
    "task": "پرس زیر سینه",
    "repeat": 10,
    "weight": 30,
    "status": true
  },
  {
    "task": "دمبل نشر جانب",
    "repeat": null,
    "weight": null,
    "status": false
  },
  {
    "task": "پرس سینه",
    "repeat": 10,
    "weight": 30,
    "status": true
  },
  {
    "task": "جلو بازو هالتر",
    "repeat": 8,
    "weight": 20,
    "status": true
  }
]`;
let data = {
    arr: [JSON.parse(barname1), JSON.parse(barname2)],
    turnarr: [0,0,1,1],
    turn:0,
    number: 1,
    workout: 0
};
let dataWR;


if (localStorage.getItem("gymData") === null) {
    localStorage.setItem("gymData", `${JSON.stringify(data)}`);
} else {
    dataWR = localStorage.getItem("gymData");
    data = JSON.parse(dataWR);
}

const $ = el => {
    return document.querySelector(el)
}

function taskData() {
    $('#tasks').innerHTML = '';
    let setId = 0;
    for (let workout of data.arr[data.workout]) {

        if (Array.isArray(workout)) {
            let html = `
                            <section class="flex items-center mb-2 p-2">
                                <div>
                                    <p>${workout[data.turnarr[data.turn]].task}</p>
                                    <p class="text-xs ${(workout[data.turnarr[data.turn]].status) ? '' : 'hidden'} opacity-75">${workout[data.turnarr[data.turn]].repeat}بار ${workout[data.turnarr[data.turn]].weight}KG وزن</p>
                                </div>
                                <div class="mr-auto">
                                    <i onclick="eachTask(true,this,${setId},data.turnarr[data.turn])" class="px-3 py-1.5 rounded inline-flex items-center bi bi-check"></i>
                                    <i onclick="eachTask(false,this,${setId},data.turnarr[data.turn])" class="px-3 py-1.5 rounded inline-flex items-center bi bi-arrow-repeat"></i>
                                </div>
                            </section>
                            `;
            $('#tasks').innerHTML += html;
        } else {
                let html = `
                            <section class="flex items-center mb-2 p-2">
                                <div>
                                    <p>${workout.task}</p>
                                    <p class="text-xs ${(workout.status) ? '' : 'hidden'} opacity-75">${workout.repeat}بار ${workout.weight}KG وزن</p>
                                </div>
                                <div class="mr-auto">
                                    <i onclick="eachTask(true,this,${setId},null)" class="px-3 py-1.5 rounded inline-flex items-center bi bi-check"></i>
                                    <i onclick="eachTask(false,this,${setId},null)" class="px-3 py-1.5 rounded inline-flex items-center bi bi-arrow-repeat"></i>
                                </div>
                            </section>
                            `;
                $('#tasks').innerHTML += html;
        }
        setId++;
    }
    $('#abs').setAttribute('src', `./data/abs/${data.number}.jpg`)
}

taskData();

function eachTask(cnd, el, setId, taskId) {
    el.parentElement.parentElement.remove();
    if (cnd) {
        if(taskId!=null) {
            let work = (data.arr[data.workout][setId][taskId]);
            if ((work.status)) {
                if (work.repeat == 8) {
                    work.repeat = 2;
                    work.weight += 5;
                } else {
                    work.repeat += 2;
                }
            }
        }else{
            let work = (data.arr[data.workout][setId]);
            if ((work.status)) {
                if (work.repeat == 8) {
                    work.repeat = 2;
                    work.weight += 5;
                } else {
                    work.repeat += 2;
                }
            }
        }
    }
    localStorage.setItem("gymData", `${JSON.stringify(data)}`);
}

function done() {
    data.workout=(data.workout==1) ? 0 : 1;
    data.number=(data.number==8) ? 1 : data.number+1;
    data.turn=(data.turn==3) ? 0 : data.turn+1;
    localStorage.setItem("gymData", `${JSON.stringify(data)}`);
    taskData();
}
var progressValue=0;
let totalValue=0;
function calcProgress(){
    for(let array of data.arr){
        for(let item of array){
            if(Array.isArray(item)){
                for(let task of item){
                    if(task.status){
                        calc(task.repeat,task.weight)
                    }
                }
            }else{
                if(item.status){
                    calc(item.repeat,item.weight)
                    console.log(item)
                }
            }
        }
    }
    function calc(repeat,weight){
        progressValue+=repeat*weight;
        totalValue+=(8*60);
        let calced=(progressValue*100)/totalValue;
        $('#progress-num').innerText=calced.toFixed(2);
        $('.progress-val').style.width=`${calced}%`;
    }
}
calcProgress();