
const newsContainer = document.getElementById('newsContainer');
const header = document.getElementById('header');
const images = document.getElementById('newsImage');
const heading_news = document.getElementById('newsHeading');
const news_para = document.getElementById('newsDescription');
const link_news = document.getElementById('newsLink');


const loadingElement = document.getElementById('loading');

const apiKey= '9b3f2c2a9c7d4ce0a1e6df45af6c09c6'



window.addEventListener('scroll', (e) => {
    if (window.scrollY === 0) {
        header.classList.remove('stkiy'); 
    } else {
        header.classList.add('stkiy'); 
    }
});



async function fetchNews(category = 'general')  {
    loadingElement.style.display='block'
    newsContainer.innerHTML=''
    newsContainer.innerText = '';
    const respon = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&language=en&apiKey=${apiKey}`)
    loadingElement.style.display='none'
 
    const data = await respon.json()
 

    data.articles.forEach(article => {
        createNewsArticle(article)
   
    });
    
}

//create news article function =========
function createNewsArticle(article) {
    // Create article element
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-item');

    // Create image element
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', article.urlToImage);
    imgElement.setAttribute('alt', article.title);
    imgElement.classList.add('news-image');

    // Create content container
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('news-content');

    // Create heading element
    const headingElement = document.createElement('h2');
    headingElement.classList.add('news-heading');
    headingElement.innerText = article.title;

    // Create description element
    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('news-description');
    descriptionElement.innerText = article.description || 'No description available.';

    // Create link element
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', article.url);
    linkElement.setAttribute('target', '_blank');
    linkElement.classList.add('news-link');
    linkElement.innerText = 'Read more';

    // Append all elements to contentDiv
    contentDiv.appendChild(headingElement);
    contentDiv.appendChild(descriptionElement);
    contentDiv.appendChild(linkElement);

    // Append image and contentDiv to articleElement
    articleElement.appendChild(imgElement);
    articleElement.appendChild(contentDiv);

    // Append the articleElement to the container (Assuming there's a container div)
    document.getElementById('newsContainer').appendChild(articleElement);
}

fetchNews()


