<script>
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
    import P5 from 'p5-svelte'

    const storage = getStorage()
    const storageRef = ref(storage, 'selfies/jimmy.png')

    let count = 1
    let video
    let canvas
 
    const sketch = (p5) => {
        p5.setup = () => {
            canvas = p5.createCanvas(400, 400);
            video = p5.createCapture(p5.VIDEO);
            video.size(320, 240)
        }
    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }

    let photo

    let deleteTimer = setInterval( () => {
        count--
        if(count==0){
            clearInterval(deleteTimer)

            video.loadPixels()
            photo.src = video.canvas.toDataURL()
            let blob = dataURItoBlob(photo.src)

            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file')
            })
        }
}, 1000)

</script>

<main>
    <div id="counter"><h1>{count}</h1></div>
    <div class="selfie">
        <img bind:this={photo} src="" alt="" id="photo">
        <P5 {sketch} />
    </div>
</main>

<style>
    .selfie{
        display:grid;
        grid-template-columns:1fr 1fr;
        align-items: flex-start;
    }
    canvas, #photo{
		width:320px;
		height:240px;
		background-color: orangered;
	}
    #photo{
        background-color:lightblue;
    }

</style>