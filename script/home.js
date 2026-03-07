const issueCardContainer = document.getElementById("issue-card-container");
const totalIssueNumber = document.getElementById("total-issue-number");
const loadingSpinning = document.getElementById("spinning-loading");
const btnAllTab = document.getElementById("btn-all-tab");
const btnOpenTab = document.getElementById("btn-open-tab");
const btnClosedTab = document.getElementById("btn-closed-tab");

let allIssue = [];

const loadAllIssue = async () => {
  showLoading();

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const res = await fetch(url);
  const issue = await res.json();

  hideLoading();

  allIssue = issue.data;

  displayAllIssue(issue.data);
};

function showLoading() {
  loadingSpinning.classList.remove("hidden");
  issueCardContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinning.classList.add("hidden");
}

loadAllIssue();

const displayAllIssue = async (issue) => {
  // console.log(issue);

  issue.forEach((item) => {
    const div = document.createElement("div");

    div.className = `shadow-sm p-4 rounded-md border-t-4 ${item.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}`;
    div.innerHTML = `
         <div class="flex justify-between items-center mb-3">
              <img src="${item.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
              <p
                class=" font-medium py-1 px-5 rounded-full ${item.priority == "high" ? "bg-[#FEECEC] text-[#EF4444]" : item.priority == "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : "bg-[#FFF6D1] text-[#F59E0B]"}"
              >
                ${item.priority}
              </p>
            </div>

            <div class="">
              <h3 class="font-semibold text-[14px] text-[#1F2937] mb-2">
                ${item.title}
              </h3>
              <p class="text-[12px] line-clamp-2 text-[#64748B] mb-3">
                ${item.description}
              </p>
            </div>

            <div
              class="flex gap-1.5 items-center pb-8 border-b-2 border-[#E4E4E7]"
            >
              <div
                class="flex gap-1.5 text-[12px] font-medium items-center border border-[#FECACA] bg-[#FEECEC] rounded-full text-[#EF4444] py-1 px-2"
              >
                <i class="fa-solid fa-bug"></i>
                <p>BUG</p>
              </div>

              <div
                class="flex gap-1.5 text-[12px] font-medium items-center border border-[#FDE68A] bg-[#FFF8DB] rounded-full text-[#D97706] py-1 px-2"
              >
                <i class="fa-regular fa-life-ring"></i>
                <p>HELP WANTED</p>
              </div>
            </div>

            <div class="pt-4">
              <p class="text-[12px] text-[#64748B] mb-2">${item.assignee}</p>
              <p class="text-[12px] text-[#64748B] mb-2">Created: ${new Date(item.createdAt).toLocaleDateString()}</p>
              <p class="text-[12px] text-[#64748B]">Updated: ${new Date(item.updatedAt).toLocaleDateString()}</p>
            </div>
    `;

    issueCardContainer.append(div);
  });
  showTotalIssue();
};

// dynamically show  total number of issue
function showTotalIssue() {
  const issueContainerChildren = issueCardContainer.children;
  totalIssueNumber.innerText = issueContainerChildren.length;
}

// all btn tab
btnAllTab.addEventListener("click", function () {
  showLoading();

  displayAllIssue(allIssue);

  hideLoading();
});

//  open btn tab
btnOpenTab.addEventListener("click", function () {
  showLoading();

  const openIssue = allIssue.filter((items) => items.status === "open");

  hideLoading();

  displayAllIssue(openIssue);
});

// closed btn tab
btnClosedTab.addEventListener("click", function () {
  showLoading();

  const closedIssue = allIssue.filter((items) => items.status === "closed");

  hideLoading();

  displayAllIssue(closedIssue);
});

//  btn toggle function
function toggleStyle(id) {
  // remove all bg color blue and text color white
  btnAllTab.classList.remove("text-white", "bg-[#4A00FF]");
  btnOpenTab.classList.remove("text-white", "bg-[#4A00FF]");
  btnClosedTab.classList.remove("text-white", "bg-[#4A00FF]");

  // add all bg color white and text color black
  btnAllTab.classList.add("text-black", "bg-[#ffffff]");
  btnOpenTab.classList.add("text-black", "bg-[#ffffff]");
  btnClosedTab.classList.add("text-black", "bg-[#ffffff]");

  // dynamically change bg and text color btn
  document.getElementById(id).classList.remove("text-black", "bg-[#ffffff]");
  document.getElementById(id).classList.add("text-white", "bg-[#4A00FF]");
}

/*
{
    "id": 1,
    "title": "Fix navigation menu on mobile devices",
    "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    "status": "open",
    "labels": [
        "bug",
        "help wanted"
    ],
    "priority": "high",
    "author": "john_doe",
    "assignee": "jane_smith",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
}
*/
