<script>
    export let name
    export let gamepin
    export let addPlayer
</script>
<svelte:window on:keydown={(key)=>key.key=='Enter' && addPlayer()}/>
<main>
    <div>
        <input bind:value={name} placeholder='your name please' />
        <input bind:value={gamepin} placeholder='enter pincode' />
        <button on:click={addPlayer}>enter game</button>
    </div>
    <div class="players">

    </div>
</main>

<style>
</style>