<script>
    export let game
    export let timer
    export let findMe
    //set my drawIndex to the next player or if this is out of bounds, the first 
    let nextIndex = game.players.length == findMe+1 ? 0 : findMe+1
    let counter = 40
    let t = setInterval(() => {
        counter--
        if(counter == 0) clearInterval(t)
    }, 1000);

</script>

<main>
    {#if counter > 0}
        <h1>Draw {game.players[nextIndex].name}</h1>
        <img src="{game.pictures[nextIndex]}" alt="">
        <h2>{counter}</h2>
    {:else}
        <h1>Vis dit billede til de andre</h1>
    {/if}
</main>

<style>
</style>