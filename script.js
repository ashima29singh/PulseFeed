const apikey = 
'45114e59354b4dc689bcb8afab3b7e7a'

const blogcontainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");


// function getOption() {
//     selectElement = document.querySelector('#country');
//     output = selectElement.value;
//     console.log(output);
//     const apiUrl = `https://newsapi.org/v2/top-headlines?country=${output}&category=business&pagesize=10&apikey=${apikey}`;
//     fetchNews(apiUrl);
// }

function getFilteredNews() {
    categoryselect = document.querySelector('#category');
   selectedCategory = categoryselect.value;
    console.log(selectedCategory);


    countryselect = document.querySelector('#country');
    selectedCountry = countryselect.value;
    console.log(selectedCountry);

    pagesize = document.querySelector("#page-size");
    selectedpage = pagesize.value;
    if (selectedCategory === ""){
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&pagesize=${selectedpage}&apikey=${apikey}`;
        fetchNews(apiUrl);
    }else{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=${selectedCategory}&pagesize=${selectedpage}&apikey=${apikey}`;
        fetchNews(apiUrl);
        
    }


}



async function fetchRabdomNews(apiUrl1){
    try{
        const response = await fetch(apiUrl1);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("error fetching random news",error);
        return[];
    }
}


function fetchNews(apiUrl1) {
    fetchRabdomNews(apiUrl1).then((response) => {
        console.log(response);
       blogcontainer.innerHTML = "";
   
       const articlelist = response.articles;
         console.log(articlelist);
       articlelist.forEach((article) => {
           console.log(article.title);
           const blogCard = document.createElement("div");
           blogCard.classList.add("blog-card");
           const img = document.createElement("img");
           if (article.urlToImage !== null) {
               img.src = article.urlToImage;
           }
           else {
               img.src = "images/news_img_placeholder.jpg";
           }
           img.alt = article.title;
           const title = document.createElement("h3");
           title.textContent = article.title;
           const description = document.createElement("p");
           description.textContent = article.description;
           blogCard.appendChild(img);
           blogCard.appendChild(title);
           blogCard.appendChild(description);
           blogcontainer.appendChild(blogCard);
   
       })
   });
}

// fetch first time
const apiUrl1 = `https://newsapi.org/v2/top-headlines?country=in&category=business&pagesize=10&apikey=${apikey}`;
fetchNews(apiUrl1);



function getSearchedNews() {
    console.log(searchInput.value);
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchInput.value}&pagesize=10&apikey=${apikey}`;
    fetchNews(apiUrl);
}