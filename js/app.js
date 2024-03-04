const loadDiscussData = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    const data = await res.json();
    const dataArray = data.posts;
    displayData(dataArray);    
};

function displayData(dataArray){
    const discussPostPatent = document.getElementById("discuss-post-parent");
    discussPostPatent.textContent = "";
    dataArray.forEach(post => {
        // console.log(post);
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="flex flex-col md:flex-row p-3 md:p-7 lg:p-10 gap-3 md:gap-5 bg-[#f1f2ff] rounded-3xl">
                <div class="relative">
                    <i class="fa-solid fa-circle absolute right-16 md:-right-1 -top-1 actives"></i>
                    <img src="${post.image}" alt="" class="rounded-2xl w-6/12 mx-auto md:m-0 md:w-24">
                </div>
                    <div class="space-y-3">
                        <div class="font-inter flex text-sm gap-3 text-[#12132DCC]">
                            <p>#${post.category}</p>
                            <p>Author:${post.author?.name || "Unknown"}</p>
                        </div>
                        <h3 class="text-xl font-bold text-[#12132D]">${post.title}</h3>
                        <p class="text-[#12132D99] border-b-2 border-dashed pb-3">${post.description}</p>
                        <div class="flex justify-between">
                            <div class="flex items-center gap-5 md:gap-8 text-[#12132D99]">
                                <div class="flex justify-center items-center gap-2">
                                    <i class="fa-regular fa-message"></i>
                                    <p>${post.comment_count}</p>
                                </div>
                                <div class="flex justify-center items-center gap-2">
                                    <i class="fa-regular fa-eye"></i>
                                    <p>${post.view_count}</p>
                                </div>
                                <div class="flex justify-center items-center gap-2">
                                    <i class="fa-regular fa-clock"></i>
                                    <p>${post.posted_time}</p>
                                </div>
                            </div>
                            <div class="h-7 w-7 flex justify-center items-center rounded-full bg-[#10B981]">
                                <button id="read" class="add-btn">
                                    <i class="fa-solid fa-envelope-open text-white cursor-pointer"></i>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        `;
        discussPostPatent.appendChild(div);
    })
    toggleSpinner(false)

    const allBtn = document.getElementsByClassName("add-btn");
    const titleContainer = document.getElementById("title-container")
    for (const btn of allBtn) {
        btn.addEventListener("click", function (e) {
            const postTitle = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText;
            const postView = e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[3].innerText;
            const disableBtn = e.target.parentNode;
            disableBtn.setAttribute("disabled", true)
            // console.log(postView);
            const div = document.createElement("div");
            div.classList.add("p-4", "rounded-2xl", "flex", "justify-between", "bg-white", "mt-2");
            div.innerHTML = `
            <p class="font-semibold text-[#12132D]">${postTitle}</p>
            <div class="flex justify-center items-center gap-2">
                <i class="fa-regular fa-eye"></i>
                <p>${postView}</p>
            </div>
            `;
            titleContainer.appendChild(div);
            increaseValue("count");
        })
    }
}




const loadPostsData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    const postParent = document.getElementById("posts-parent")
    data.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("card", "w-auto", "bg-base-100", "p-4", "md:p-6", "font-mulish", "border-2", "border-gray-200");
        div.innerHTML = `
        <figure><img src="${post.cover_image}" alt="Shoes" /></figure>
        <div class="text-start flex flex-col gap-2 pt-4">
            <div class="flex items-center gap-4">
                    <i class="fa-solid fa-calendar"></i>
                    <p class="text-[#6e6e72] font-mulish text-sm">${post.author?.posted_date || "No publish date"}</p>
            </div>
            <h2 class="font-extrabold text-sm md:text-lg text-[#12132D]">${post.title}</h2>
            <p class="text-[#6e6e72] font-mulish text-base">${post.description}</p>
            <div class="flex items-center gap-2">
                <img src="${post.profile_image}" alt="" width="50" class="rounded-full">
                <div>
                    <p class="font-bold text-sm md:text-base text-[#12132D]">${post.author.name}</p>
                    <p class="text-sm text-[#12132D99]">${post.author?.designation || "Unknown"}</p>
                </div>
            </div>
        </div>
        `;
        postParent.appendChild(div);
    });
}
loadPostsData();


function increaseValue (id){
    const elementText = document.getElementById(id).innerText;
    const element = parseInt(elementText);
    const sum = element + 1
    document.getElementById("count").innerText = sum;
}


function handleSearch(){
    toggleSpinner(true)
    const value = document.getElementById("search-box").value;
    if(value){
        setTimeout(() => {
            loadDiscussData(value)
        }, 2000);
    }else{
        alert("Please enter a category")
    }
}

function toggleSpinner(isLoading){
    const loading = document.getElementById("loading-spinner");
    if(isLoading){
        loading.classList.remove("hidden")
    }else{
        loading.classList.add("hidden")
    }
}