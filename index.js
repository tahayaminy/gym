let data = {
    arr: [
        [
            [
                {
                    "task": "شنا",
                    "repeat": null,
                    "weight": null,
                    "status": false
                },
                {
                    "task": "ساعد هالتر",
                    "repeat": 8,
                    "weight": 20,
                    "status": true
                }
            ],
            [
                {
                    "task": "شکم",
                    "repeat": null,
                    "weight": null,
                    "status": false
                },
                {
                    "task": "سرشانه از جلو",
                    "repeat": 10,
                    "weight": 20,
                    "status": true
                }
            ],
            [
                {
                    "task": "پرس بالا سینه",
                    "repeat": 10,
                    "weight": 30,
                    "status": true
                },
                {
                    "task": "دمبل آرنولدی",
                    "repeat": null,
                    "weight": null,
                    "status": false
                }
            ]
        ],
        [
            [
                {
                    "task": "شکم",
                    "repeat": null,
                    "weight": null,
                    "status": false
                },
                {
                    "task": "پارالل",
                    "repeat": null,
                    "weight": null,
                    "status": false
                }
            ],
            [
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
                }
            ],
            [
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
            ]
        ],
        [
            [
                {
                    "task": "شنا دست جمع",
                    "repeat": null,
                    "weight": null,
                    "status": false
                },
                {
                    "task": "مچ دست هالتر",
                    "repeat": 16,
                    "weight": 5,
                    "status": true
                }
            ],
            [
                {
                    "task": "شکم",
                    "repeat": null,
                    "weight": null,
                    "status": false
                },
                {
                    "task": "سرشانه از عقب",
                    "repeat": 10,
                    "weight": 20,
                    "status": true
                }
            ],
            [
                {
                    "task": "پرس بالا سینه",
                    "repeat": 10,
                    "weight": 30,
                    "status": true
                },
                {
                    "task": "نشر از جلو صفحه",
                    "repeat": null,
                    "weight": null,
                    "status": false
                }
            ]
        ],
        [
            [
                {
                    "task": "شکم",
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
            [
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
                }
            ],
            [
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
            ]
        ]
    ],
    workout: 0,
    number: 1
};
let dataWR;
if(localStorage.getItem("gymData")===null){
    localStorage.setItem("gymData",`${JSON.stringify(data)}`);
}else{
    dataWR=localStorage.getItem("gymData");
    data=JSON.parse(dataWR);
}
const $ = el => {
    return document.querySelector(el)
}

function taskData(){
    $('#tasks').innerHTML='';
    let taskId=0;
    let setId=0;
    for (let set of data.arr[data.workout]) {

        for (let task of set) {
            let html = `
<section class="flex items-center mb-2 p-2">
    <div>
        <p>${task.task}</p>
        <p class="text-xs ${(task.status)?'':'hidden'} opacity-75">${task.repeat}بار ${task.weight}KG وزن</p>
    </div>
    <div class="mr-auto">
        <i onclick="eachTask(true,this,${setId},${taskId})" class="px-3 py-1.5 rounded inline-flex items-center bi bi-check"></i>
        <i onclick="eachTask(false,this,${setId},${taskId})" class="px-3 py-1.5 rounded inline-flex items-center bi bi-arrow-repeat"></i>
    </div>
</section>
`;
            $('#tasks').innerHTML+=html;
            taskId=(taskId==0)? 1:0;
        }
        setId++;
    }
    $('#abs').setAttribute('src',`./data/abs/${data.number}.jpg`)
}
taskData();

function done(){
    if(data.workout==3){
        data.workout=0;
    }else{
        data.workout++;
    }
    if(data.number==16){
        data.number=1;
    }else{
        data.number++;
    }

    localStorage.setItem("gymData",`${JSON.stringify(data)}`);
    taskData();
}
function eachTask(cnd,el,setId,taskId){
    el.parentElement.parentElement.remove();
    if(cnd){
        //increese
        let work=(data.arr[data.workout][setId][taskId]);
        if((work.status)){
            if(work.repeat==16){
                work.repeat=2;
                work.weight+=5;
            }else{
                work.repeat+=2;
            }
        }
    }
    localStorage.setItem("gymData",`${JSON.stringify(data)}`);
}