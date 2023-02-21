const APP_ID = "6dc260bde01045b398c27ed429bb1b0a"
const TOKEN = "007eJxTYOCs5ix3uv95S3rHi0iG3bGLgoV/2UuduuUqK1nG87Tj7m4FBrOUZCMzg6SUVANDAxPTJGNLi2Qj89QUEyPLpCTDJIPEaQe+JDcEMjIwJn5iBZJgCOKzMOQmZuYxMAAALMIfiQ=="
const CHANNEL = "main"

const client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'}) // making the client object--> interface that provides the local client with basic functionalities

let localTracks = [] // stores current users' videos and audio tracks 
let remoteUsers = {} // all users that join our stream

let joinAndDisplayLocalStream = async() => {
  let UID = await client.join(APP_ID,CHANNEL,TOKEN,null)

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() // allows local user to use the camera and audio

  let player = `<div class="video-container" id="user-container-${UID}"> 
                  <div class="video-player" id="user-${UID}"></div>
                </div>`  
  
  document.getElementById('video-streams').insertAdjacentHTML('beforeend',player)
  //localTracks is an array that holds the audio tracks in index[0] and video tracks in index[1]
  localTracks[1].play(`user-${UID}`)

  await client.publish([localTracks[0],localTracks[1]])
}//this is made to display and store out stream

