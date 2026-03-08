

const allCardContainer = document.getElementById("card-container")
const loading = document.getElementById("loading")

let allCards = [];

const labels = (arr) =>{
    const htmlElements =arr.map((el) =>
         `<p class="badge font-medium text-[12px] bg-amber-500/70">${el}</p>`);
  return htmlElements.join(" ");
};


const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString("en-GB"); 
};




function showLoading() {

loading.classList.remove("hidden");

allCardContainer.innerHTML = "";
}

function hideLoading() {
loading.classList.add("hidden");
}

function setActiveTab(btn){
 
const allButtons = document.querySelectorAll("#filter-section button",);

allButtons.forEach((btn) => {
btn.classList.remove("btn-primary");
btn.classList.add("btn-soft");
console.log(btn)
});

btn.classList.add("btn-primary");
btn.classList.remove("btn-soft");

}



async function loadIssues(){

showLoading()
const res= await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json()

hideLoading()

allCards =  data.data
const IssuesCount = document.getElementById("Issues-count");
IssuesCount.innerText = allCards.length;

displayCards(allCards)
}




function displayCards(cards) {

allCardContainer.innerHTML = ""
cards.forEach(card => {


const div =document.createElement("div");


div.className = `flex flex-col  card  h-full   space-y-6 p-4 bg-white shadow-xl  border-t-[5px] ${card.status === "open"
? "border-green-500 " : "border-purple-500 "} `


div.innerHTML = `

        <div class="flex justify-between items-center  ">
                <img src="./assets/Open-Status.png" alt="">
                <h3 class="badge  font-medium text-gray-800 ${card.priority == "high" ? "badge-secondary" : 
                    card.priority === "medium" ?"badge-info" :" badge-accent"  }
                
                
                ">${card.priority.toUpperCase()}</h3>

        </div>

          
          <div class=" ">
            <h2 class="font-semibold ">${card.title} </h2>
            <p class="text-slate-500 text-sm line-clamp-2 pt-2">${card.description} </p>
             
          </div>

          <div class="  mb-5  my-auto gap-2  ">
           ${labels(card.labels)}

          </div>

            <div class="border-t border-t-stone-500/30 pt-4 text-[12px]" >

               <div class="flex  justify-between items-center ">
                  <p>#${card.author}</p>
                   <p>${formatDate(card.createdAt)}</p>
               </div>
    
              <div class="flex justify-between items-center  " >
                 <p>Assignee: ${card.assignee ? card.assignee : "None"}  </p>
                 <p>${formatDate(card.updatedAt)}</p>
               </div>
           
             </div>
          

`
allCardContainer.appendChild(div)

});

}


// card counts
document.getElementById("all-btn").addEventListener("click", function () {

const IssuesCount = document.getElementById("Issues-count");
IssuesCount.innerText = allCards.length;

displayCards(allCards);

});


document.getElementById("open-btn").addEventListener("click", function () {
const openCards = allCards.filter(card => card.status === "open");

const IssuesCount = document.getElementById("Issues-count")
IssuesCount.innerText = openCards.length
displayCards(openCards)


});

document.getElementById("closed-btn").addEventListener("click", function () {
  
const closedCards = allCards.filter(card => card.status === "closed");
 const IssuesCount = document.getElementById("Issues-count")
IssuesCount.innerText = closedCards.length

displayCards(closedCards )

});



loadIssues();