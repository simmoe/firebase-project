<script>
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
    import {onMount} from 'svelte'

    export let addImage
    export let id

    let video, canvas, photo, height
    let width = 320
    let countdown = 3

    const storage = getStorage()
    const storageRef = ref(storage, 'selfies/'+id+'.png')


    let timer = setInterval(()=>{
        countdown--
        if(countdown == 0){
            clearInterval(timer)
            let context = canvas.getContext('2d');
            height = video.videoHeight / (video.videoWidth/width)
            video.setAttribute('width', width)
            video.setAttribute('height', height)
            canvas.setAttribute('width', width)
            canvas.setAttribute('height', height)
            context.drawImage(video, 0, 0, width, height);
            let data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            canvas.toBlob( blob => {
                let b = URL.createObjectURL(blob)
                uploadBytes(storageRef, blob).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        //console.log('File available at', url)
                        addImage(url)
                    });
                })
            })
        }
    }, 1000)

    onMount(()=>{
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then( stream => {
            video.srcObject = stream;
            video.play()
        })
    })

</script>

<main>
    <div class="camera">
        <video bind:this={video} />
        <div class="count">
            {countdown}
        </div>
        <img bind:this={photo}>
    </div>
    <canvas bind:this={canvas} id="canvas"></canvas>
</main>

<style>
    canvas{
        display:none;
    }
    .camera{
        position:relative;
        display:grid;
        place-items:center;
    }
    video, img{
        height:240px;
        width:320px;
        position:relative;
        z-index:0;
    }
    img{ 
        z-index:1;
        position:absolute;
        top:0;
    }
    .count{
        font-size:3rem;
        position:absolute;
        color:white;
        z-index:5;
    }

</style>