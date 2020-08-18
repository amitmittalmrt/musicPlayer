const image= document.querySelector('img');
const title= document.getElementById('title');
const artist=document.getElementById('artist');
const music= document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeEl=document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

// Music
const songs=[
{
    name:'jacinto-1',
    displayName:'Electric Chill Machine',
    artist:'Jacinto Design',
},
{
    name:'jacinto-2',
    displayName:'seven Nation Army',
    artist:'Jacinto Design',
},
{
    name:'jacinto-3',
    displayName:'Goodnight, Disco Queen',
    artist:'Jacinto Design',
},
{
    name:'metric-1',
    displayName:'metric-1',
    artist:'Jacinto Design',
},
];

// check if playing
let isPlaying=false;

// play 
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
}
// pause 
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}
 
// play or pause event listner 

playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));

// Update the DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src= `music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}

// current song
let songIndex=0;
// last song 
function prevSong(){
     songIndex--;
     if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// onLoad select first song

loadSong(songs[songIndex]);

// Update Progress Bar & Time


function updateProgressBar(e){
    if (isPlaying){
    const{duration,currentTime}=e.srcElement;
    //we will do object destructuring to get time value
    const progressPercent =(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
    // calculate display for duration Math.floor to round numbers
     const durationMinutes=Math.floor(duration/60);
     let durationSeconds= Math.floor(duration%60);
     if (durationSeconds<10){
         durationSeconds=`0${durationSeconds}`;
     }
    
    //  delay switching duration element to avoid Nan
    if(durationSeconds){
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
    }
    // calculate display for current Math.floor to round numbers
    const currentMinutes=Math.floor(currentTime/60);
    let currentSeconds= Math.floor(currentTime%60);
    if (currentSeconds<10){
        currentSeconds=`0${currentSeconds}`;
    }
    currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}
// set Progress Bar
function setProgressBar(e){
const width =this.clientWidth;
let offsetValue =e.offsetX;
const{duration}=music;
music.currentTime=((offsetValue/width)*duration);
console.log(currentTime);
}
// event listners for forward and backword buttons

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);