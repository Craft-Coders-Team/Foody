let continer = document.querySelector('.recipts_Cointainer');

let data = new XMLHttpRequest();

function getdata(url){
continer.innerHTML="";
data.open('GET',url,true);
data.onload = function(){
    if(data.status==200&&data.readyState==4){
        let response = JSON.parse(data.response);
        let recipt=response.recipes;
        recipt.map((e)=>{
            continer.innerHTML+=`
            <div class="recipt">
                <img src="${e.image}">
                <div class="recipt-info">
                <h3>${e.name}</h3>
                <p><span>Ingredients:</span> ${e.ingredients}</p>
                <a href="">See Recipe ></a>
                </div>
            </div>
            
            `
        })
    }
}
data.send();
}

getdata(`https://dummyjson.com/recipes`);
let input=document.querySelector("input");

input.addEventListener("input",()=>{
    console.log(input.value);
    let s=input.value;
    getdata(`https://dummyjson.com/recipes/search?q=${s}`);
})