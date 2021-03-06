'use strict'

const apiKey = 'qirUUi2HpIb4Y01eMWVko4OvJaU27IWg8I49M4ni'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
    
}

function displayResults(responseJson){
  $('#results-list').empty();
  for(let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <a href = "${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>` 
    )
  }
}


function getNationalParks(query, maxResults=10){
    const params = {
       stateCode: query,
       api_key: apiKey,
       maxResults
    }

    const queryString = formatQueryParams(params);
    const url = searchURL + queryString;

    console.log(url);

  fetch(url)
      .then(response =>  {
          if (response.ok){
              return response.json();
          }
          throw new Error(response.statusText); 
      })
      .then(function(responseJson) {
        console.log(responseJson);
        displayResults(responseJson);
      })
      .catch(err => {
          $('#js-error-message').text(`Something went wrong: ${err.message}`)
      });
}

function watchForm(){
    $('form').on('submit', function(event) {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(searchTerm, maxResults);
    })
}

$(watchForm());


