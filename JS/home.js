


const labels = (arr) =>{
    const htmlElements =arr.map((el) => `<p class="badge font-medium text-[12px] bg-amber-500/70">${el}</p>`);
  return htmlElements.join(" ");
};

const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString("en-GB"); 
};











const cardContainer = document.getElementById("card-container")

async function loadIssues(){

const res= await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json()

        
displayCards(data.data)
}


function displayCards(cards) {

cards.forEach(card => {


const div =document.createElement("div");

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [2 items],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

div.className = `flex flex-col  card  h-full   space-y-6 p-4 bg-white shadow  border-t-[5px] ${card.status === "open"
? "border-green-500 " : "border-purple-500 "} `




div.innerHTML = `

        <div class="flex justify-between items-center  ">
                <img src="./assets/Open-Status.png" alt="">
                <h3 class="badge  font-medium  ${card.priority == "high" ? "badge-secondary" : 
                    card.priority === "medium" ?"badge-primary" :" badge-accent"  }
                
                
                ">${card.priority}</h3>

        </div>

          
          <div class=" ">
            <h2 class="font-semibold">${card.title} </h2>
            <p class="text-slate-500 text-sm line-clamp-2 pt-2">${card.description} </p>
             
          </div>

          <div class="flex grow  gap-2  ">
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
cardContainer.appendChild(div)

});

}


loadIssues();