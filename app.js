const characters = document.getElementById('characters');
const form = document.getElementById('form');
const search = document.getElementById('search');
const modal = document.getElementById('modal');
const singleCharacter = document.getElementById('singleCharacter');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

// Fetch datas from api
const allCharacters = async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/`);
    const data = await res.json();
    console.log(data);
    displayCharacters(data);
}

// Event listeners
form.addEventListener('keyup', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    searchCharacters(searchTerm)
});

characters.addEventListener('click', e => {
    const characterInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('character-info');
        }else{
            return false;
        }
    });

    if(characterInfo){
        const characterId = characterInfo.getAttribute('data-characterID');
        getCharacterById(characterId);
    }

    modal.style.display = 'block';
})

// Close modal and back to home page
document.getElementById('closeBtn').addEventListener('click', () => {
    modal.style.display = 'none';
})

// Search for any characters
const searchCharacters = async (term) =>{
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${term}`);
    const data = await res.json();

    displayCharacters(data);
}

// Getting characters by their Ids
const getCharacterById = async character => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${character}`);
    const data = await res.json();

    // console.log(data);
    addCharacterToDOM(data);
}

// Adding characters to DOM
const addCharacterToDOM = (character) => {
  
    singleCharacter.innerHTML = `
      <div class="modal-container">

        <div class = 'modal-left'>
            <img src = '${character.image}' alt = '${character.name}' />
        </div>
        <div class = 'modal-right'>
            <h2>${character.name}</h2>
            <ul>
                <li>
                    <strong>Status: <strong>${character.status}
                </li>
                <li>
                    <strong>Species: <strong>${character.species}
                </li>
                <li>
                    <strong>Origin: <strong>${character.origin.name}
                </li>
                <li>
                    <strong>Location: <strong>${character.location.name}
                </li>
                <li>
                    <strong># of episodes: <strong>${character.episode.length}
                </li>
            </ul>                                   
        </div>

      </div>
    `;
}

// Next page
let counter = 0;
next.addEventListener('click', async () => {
    
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`);

    const data = await res.json();

            if(counter === data.info.pages){
                alert('This is the last page');
            }

            characters.innerHTML = data.results.map(item => `
            
            <div class = 'character'>
                
                <img src = '${item.image}' />
    
                <div class = 'character-info' data-characterID = '${item.id}'>
                    
                    <h3>${item.name}</h3>
                    
                </div>
                
            </div>
            
         `).join('');
});

// Prev page
prev.addEventListener('click', async () => {
    
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${--counter}`);

    const data = await res.json();

    if(counter === 1){
        alert('This is the first page');
    }

    characters.innerHTML = data.results.map(item => `
    
    <div class = 'character'>
        
        <img src = '${item.image}' />

        <div class = 'character-info' data-characterID = '${item.id}'>
            
            <h3>${item.name}</h3>
            
        </div>
        
    </div>
    
    `).join('');
});

const displayCharacters = (data) => {
    characters.innerHTML = data.results.map(item => `
    
        <div class = 'character'>
        
            <img src = '${item.image}' alt = '${item.name}' />

            <div class = 'character-info' data-characterID = '${item.id}'>
            
                <h3>${item.name}</h3>
            
            </div>
        
        </div>
    
    `).join('');
}


allCharacters();