

const allCardContainer = document.getElementById("card-container")
const loading = document.getElementById("loading")
const issueCardModal = document.getElementById("issue-card-modal")
const modalTitle = document.getElementById("modal-title")
const modalStatus = document.getElementById("modal-status")
const modalCreatedAt = document.getElementById("modal-createdAt")
const modalLabels = document.getElementById("modal-labels")
const modalDescription = document.getElementById("modal-description")
const modalAssigneeName = document.getElementById("modal-Assignee-name")
const modalPriority = document.getElementById("modal-priority")
const modalAuthor = document.getElementById("modal-author")


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


div.className = `flex flex-col  card  h-full w-full  space-y-6 p-4 bg-white shadow-xl  border-t-[5px] ${card.status === "open"
? "border-green-500 " : "border-purple-500 "} `


div.innerHTML = `
    
        <div class="flex justify-between items-center  ">
                <img src="./assets/Open-Status.png" alt="">
                <h3 class="badge  font-medium text-gray-800 ${card.priority == "high" ? "badge-secondary" : 
                    card.priority === "medium" ?"badge-info" :" badge-accent"  }
                
                
                ">${card.priority.toUpperCase()}</h3>

        </div>

          
          <div class=" ">
            <h2 class="font-semibold cursor-pointer " onClick="issueCardOpen(${card.id})">${card.title} </h2>
            <p class="text-slate-500 text-sm line-clamp-2 pt-2 cursor-pointer" onClick="issueCardOpen(${card.id})" >${card.description} </p>
             
          </div>

          <div class="  mb-5  my-auto gap-2  ">
           ${labels(card.labels)}

          </div>

            <div class="border-t border-t-stone-500/30 pt-4 text-[12px]" >

               <div class="flex  justify-between items-center pb-2 ">
                  <p>${card.author}</p>
                   <p>${formatDate(card.createdAt)}</p>
                
               </div>

                <div class="flex  justify-between items-center pb-2 ">
    
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

async function issueCardOpen(cardid){
  

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardid}`)
  const data = await res.json()
  const cardInfo = data.data
    

issueCardModal.showModal()
// const details =document.getElementById("modal-d")
modalLabels.innerHTML =labels(cardInfo.labels)
modalTitle.textContent = cardInfo.title
modalStatus.textContent = cardInfo.status.toUpperCase()
modalCreatedAt.textContent = formatDate(cardInfo.createdAt)

modalDescription.textContent = cardInfo.description 
 modalAssigneeName.textContent = cardInfo.assignee ? cardInfo.assignee : "None"
 modalPriority.textContent = cardInfo.priority.toUpperCase()

modalPriority.classList.remove("bg-red-400", "badge-info", "badge-accent");


 modalPriority.classList.add(cardInfo.priority === "high" ? "bg-red-400" : cardInfo.priority === "medium" ?"badge-info" :"badge-accent")

  
modalAuthor.textContent = `${cardInfo.status === "open" ? "Opened" : "Closed" } by ${cardInfo.author } `
modalStatus.classList.remove("bg-green-600","bg-purple-600");
modalStatus.classList.add(cardInfo.status == "open" ? "bg-green-600" : "bg-purple-600" )

                
}


const searchInput = document.getElementById("input-Search")

searchInput.addEventListener("input", async ()=>{

 const searchValue = searchInput.value.toLowerCase().trim()
console.log(searchValue)

if(!searchValue){
return loadIssues()

}

 setActiveTab(document.getElementById("all-btn"))
const res= await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)

const data = await res.json();

 const IssuesCount = document.getElementById("Issues-count")
IssuesCount.innerText = data.data.length


displayCards(data.data)
}

)











loadIssues();