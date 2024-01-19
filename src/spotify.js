//      *****  WORK IN PROGRESS  *****      \\

 function getSongs() {
    fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=JNoriega220&limit=10&api_key=36ed4e1fb9f4611b084d6e0ca19ef440&format=json")
    .then( (response) => response.json())
    .then((data)=> data)// output will be the required data
    .catch( (error) => console.log(error))
    }


let tracks = getSongs()
// getSongs().then((data)=> console.log(data))



console.log(tracks)
for(i=0; i<5; i++){
}