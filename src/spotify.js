//      *****  WORK IN PROGRESS  *****      \\

fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=JNoriega220&limit=10&api_key=36ed4e1fb9f4611b084d6e0ca19ef440&format=json")
    .then( response => response.json())
    .then(data => mostrarData(data))// output will be the required data
    .catch( (error) => console.log(error))

const mostrarData = (data) => {
    let body = ''
    console.log(data)
    let n_data = data['recenttracks']['track']
    for(let i = 0; i < n_data.length; i++){
        body+= `
        <div class="song-card" style="display:flex; flex-direction: column; width: 128px; margin-left: 0.35vw; margin-right: 0.35vw;" >
            <img class="song-album" src=${n_data[i]['image'][2]['#text']} height="128px" width="128px" alt="Album image">
            </img>
            <h2 class="song-title" style="font-size:1.3vw; flex-grow:1;">${n_data[i]['name']}</h2>
        </div>
        `
        document.getElementById('songs').innerHTML = body
    }    
}

// getSongs().then((data)=> console.log(data))


// const showSongs = () => {

// }


