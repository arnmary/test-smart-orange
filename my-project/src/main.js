import './reset.css'
import './style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import cardsData from './data/cards.json';
import socialsData from './data/socials.json';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

let filtredCards = [...cardsData];
let currentIndex = 0;
const perPage = 3;

const cardContainer = document.getElementById('cards');
const loadMoreBtn = document.getElementById('loadMore');

const swiper = new Swiper('.mySwiper', {
  loop: true,
  navigation: {
    nextEl: '.custom-arrow-prev',
    prevEl: '.custom-arrow-next',
  },
});

const renderCard = (card) => `
<div class ="card">
<img src ="/Pin.png" alt ="Pin icon" class="pin-img"/>
<div class = "card-header"
<span class = "year">${card.year} p.</span>
<span class = "category">${card.category}</span>
</div>
 ${card.image && card.image.trim() !== "" 
    ? `<img src="${card.image}" alt="${card.title}" class="card-img" />` 
    : ""
  }
<div class="card-body">
<h3 class="card-title">${card.title}</h3>
<p class="address">${card.address}</p>
<p class="works-title">Види робіт:</p>
<div class="works">
${card.works.map(work =>`<span class="tag">${work}</span>`).join('')}
</div>
</div>
<img src ="./Down.png" alt ="Down image" class="edge"/>
</div>
`;

const renderNext = () =>{
  const nextItems =filtredCards.slice(currentIndex, currentIndex +perPage);
  cardContainer.insertAdjacentHTML('beforeend',nextItems.map(renderCard).join(''));
  currentIndex += perPage;


  if(currentIndex >= filtredCards.length){
    loadMoreBtn.style.display = 'none';
  } else {
loadMoreBtn.style.display = 'block';
  }
};

renderNext();

loadMoreBtn.addEventListener('click',renderNext);


document.querySelectorAll('.filter button').forEach(button =>{
  button.addEventListener('click', () =>{
    const category = button.textContent.trim();
    filtredCards = category === 'Усі'
    ? [...cardsData]
    : cardsData.filter(card => card.category === category);

    cardContainer.innerHTML = '';
    currentIndex = 0;
    renderNext();
  });
});


const renderSocialLinks = (links) => `
  <div class="social-links">
    ${links.map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="${link.icon}"></i>
      </a>
    `).join('')}
  </div>
`;

document.querySelector("#footerSocials").innerHTML = renderSocialLinks(socialsData);




