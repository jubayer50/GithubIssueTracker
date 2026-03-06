const issueCardContainer = document.getElementById("issue-card-container");
const totalIssueNumber = document.getElementById("total-issue-number");
// console.log(issueCardContainer);

const loadAllIssue = async () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const res = await fetch(url);
  const issue = await res.json();
  displayAllIssue(issue.data);
};

loadAllIssue();

const displayAllIssue = async (issue) => {
  // console.log(issue);

  issue.forEach((item) => {
    const div = document.createElement("div");
    div.className = "shadow-sm p-4 rounded-md border-t-4 border-[#00A96E]";
    div.innerHTML = `
         <div class="flex justify-between items-center mb-3">
              <img src="./assets/Open-Status.png" alt="" />
              <p
                class="text-[#EF4444] font-medium py-1 px-5 bg-[#FEECEC] rounded-full"
              >
                High
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
              <p class="text-[12px] text-[#64748B] mb-2">#1 by john_doe</p>
              <p class="text-[12px] text-[#64748B]">1/15/2024</p>
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
