//      *****  WORK IN PROGRESS  *****      \


fetch('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=JNoriega220&limit=10&api_key=36ed4e1fb9f4611b084d6e0ca19ef440&format=json')
.then( response => response.json())
.then(data => mostrarData(data))// output will be the required data
.catch( (error) => console.log(error))

        

// Calculate the 3 colors that repeat the most


const mostrarData = (data) => {
    let body = ''
    console.log(data)
    let n_data = data['recenttracks']['track']
    
    if('@attr' in n_data[0] ){

        
        document.getElementById('playing').innerHTML = `
        
        <div class="song-card" style="display:flex; flex-direction: column; width: 256px; margin-left: 0.35vw; margin-right: 0.35vw;" >
        <h1 class="song-title" style="font-size:20px; flex-grow:1;">Lucky you, i'm currently listening to: </h1>
        <a href=${n_data[0]['url']} target=”_blank”>
        <img id="playing-album" src=${n_data[0]['image'][3]['#text']} height="256px" width="256px" alt="Album image">
        </img>
        </a>
        <h2 class="song-title" style="font-size:20px; flex-grow:1;">${n_data[0]['name']}</h2>
        <h3 class="song-title" style="font-size:20px; margin-top: 20px; flex-grow:1;">And here's the last 10 songs i've streamed on spotify:  </h3>
        </div>
        `
        const calculateGradients = (imgRoute) => {
            const image = new Image();
        
            // Set the source of the image to the external URL
            image.crossOrigin = "Anonymous";
            image.src = imgRoute;
        
            // Wait for the image to load
            return new Promise((resolve, reject) => {
                image.onload = () => {
                    // Create a canvas element
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
        
                    // Set the canvas dimensions to match the image
                    canvas.width = image.width;
                    canvas.height = image.height;
        
                    // Draw the image onto the canvas
                    context.drawImage(image, 0, 0);
        
                    // Get the image data
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
        
                    // Calculate the color frequencies
                    const colorFrequencies = {};
        
                    for (let i = 0; i < imageData.length; i += 4) {
                        const red = imageData[i];
                        const green = imageData[i + 1];
                        const blue = imageData[i + 2];
                        const color = `rgba(${red}, ${green}, ${blue}, 1)`;
        
                        if (color in colorFrequencies) {
                            colorFrequencies[color]++;
                        } else {
                            colorFrequencies[color] = 1;
                        }
                    }
        
                    // Sort the colors by frequency
                    const sortedColors = Object.keys(colorFrequencies).sort((a, b) => colorFrequencies[b] - colorFrequencies[a]);
        
                    // Get the top 3 colors
                    const top3Colors = sortedColors.slice(0, 3);
        
                    resolve(top3Colors);
                };
        
                image.onerror = reject;
            });
        };
        
        calculateGradients(n_data[0]['image'][3]['#text'])
            .then(gradientArray => {
                console.log(gradientArray);
                const body = document.body; // Define body as a valid element
                body.style.background = `linear-gradient(to bottom, ${gradientArray[0]}, ${gradientArray[1]})`;
                css.textContent = body.style.background + ";";
            })
            .catch(error => {
                console.log(error);
            });



    for(let i = 0; i < n_data.length; i++){
        body+= `
        <div class="song-card" style="display:flex; flex-direction: column; width: 128px; margin-left: 0.35vw; margin-right: 0.35vw;" >
            <a href=${n_data[i]['url']} target=”_blank”>
                <img class="song-album" src=${n_data[i]['image'][2]['#text']} height="128px" width="128px" alt="Album image">
                </img>
            </a>
            <h2 class="song-title" style="font-size:13px; font-weight: lighter;  flex-grow:1;">${n_data[i]['name']}</h2>
        </div>
        `
        document.getElementById('songs').innerHTML = body


    }    

    }
}