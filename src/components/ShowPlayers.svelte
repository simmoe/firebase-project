<script>
    export let players
</script>

<main>
    {#each players as player}
        <li>{player.name}</li>
    {/each}
</main>

<style>
</style>