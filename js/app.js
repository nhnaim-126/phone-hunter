const getphone = async(searchText , datalimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone (data.data ,datalimit)
}

// displayPhone...........
const displayPhone = (phones ,datalimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    
    // phone limits............
    const showAll = document.getElementById('showAll')
    if(datalimit && phones.length > 5){
        phones = phones.slice(0,5)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    //alert text............
    const alertText = document.getElementById ('alert-text')
    if(phones.length === 0 ){
        alertText.classList.remove('d-none')
    }
    else{
        alertText.classList.add('d-none')
    }

    phones.forEach(phone =>{
        console.log(phone)
        const phoneElement = document.createElement('div')
        phoneElement.classList.add('col')
        phoneElement.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick ="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal"> see details </button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneElement)
    })
    toggleSpinner(false)
}

const searchProcessing= (datalimit) =>{
    toggleSpinner(true)
    const inputField =  document.getElementById('exampleFormControlInput1')
    const inputText = inputField.value 
    getphone(inputText ,datalimit)
   
}

// search field..................
document.getElementById('search-btn').addEventListener('click', function(){
   searchProcessing(10);
})

document.getElementById('exampleFormControlInput1').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProcessing(10);
    }
});


// spinner laoding.............
const spinner =document.getElementById('toggle-spinner')
const toggleSpinner = (isLoadig) =>{
    if(isLoadig){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}

document.getElementById('showAll-btn').addEventListener('click', function(){
    searchProcessing();
})


const phoneDetails = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json();
    displayPhoneDetails(data.data)
}
const displayPhoneDetails = (phone) =>{
    console.log(phone)
    const title = document.getElementById('exampleModalLabel')
    title.innerText = phone.name;
    const modalBody = document.getElementById('boday')
    modalBody.innerHTML =`
    <img src ="${phone.image}"></img>
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'no relese DAte'}</p>
    <p> Brand: ${phone.brand ? phone.brand : ' no brand'}</p>
    <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'no memory'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : ' no storage'}</p>
    <p>Chepset: ${phone.mainFeatures.chipSet}</p>
    <p>Sensors: ${phone.mainFeatures.sensors}</p>
    `
}




// getphone('apple')








