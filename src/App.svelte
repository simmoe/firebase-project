<script>
	import { collection, addDoc, getDoc, onSnapshot, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
	
	import {db} from './ressources/firebase'

	import Player from './components/Player.svelte'
	import ShowPlayers from './components/ShowPlayers.svelte'
	import VanillaSelfie from './components/VanillaSelfie.svelte'
	import Draw from './components/Draw.svelte'
	
	let name = ''
	let allset = false
	let id = Math.random()
	let gamepin = '12345'
	
	//lokalt game objekt
	let game = {
		gamestarted:false,
		state:'wait for players',
		players:[],
		pictures:[],
		timer: 60
	}

	//helper thatfinds this id in player array
	let findMe = 'no name'
	$: findMe = game.players.findIndex( p => p.id == id )


	onSnapshot( doc( db, "games", gamepin), (doc) => {
		console.log("Current game data in firebase: ", doc.data())
		game = doc.data()
		if(game.state=='selfie' && game.pictures.length == game.players.length){
			shiftState('draw')
		}
	})

	const shiftState = async  (newState) => {
		await updateDoc(doc(db, 'games', gamepin), {
			state: newState,
			players:game.players,
			pictures:game.pictures,
			timer:60
		})
	}

	const addPlayer = async () => {
		await updateDoc(doc(db, 'games', gamepin), {
		    players: arrayUnion({name: name, id:id})
		})
		allset = true
	}
	
	const addImage = async (url) => {
		await updateDoc(doc(db, 'games', gamepin), {
			pictures: arrayUnion(url),
		})
	}
		
	const startGame = async () => {
		allset = true
		await updateDoc(doc(db, 'games', gamepin), {
			gameStarted: true,
			state: 'selfie',
			players: game.players,
			pictures:[]
		})		
	}
	
	const reset = async () => {
		allset = false
		await setDoc(doc(db, 'games', gamepin), {
			players: [],
			pictures:[],
			timer:60,
			state:'wait',
			gameStarted:false
		})
	}


</script>

<main>
	<h1>Hello {name}!</h1>
	{#if !allset && !game.gameStarted}
		 <Player bind:name bind:gamepin {addPlayer}/>
	{/if}

	{#if !game.gameStarted}
		<ShowPlayers players={game.players} />
	{/if}

	{#if !game.gameStarted}
		 <div class="begin">
			 <button on:click={startGame}>Begynd</button>
		 </div>
	{/if}

	{#if game.gameStarted}

		 {#if game.state=='selfie'}
			 <VanillaSelfie {id} {addImage} />

			 {:else if  game.state=='draw'}
		 		<Draw {game} {findMe} timer={game.timer}/>

			  {:else if game.state=='show'}
			  <!-- else content here -->

			  {:else if game.state=='personal points'}
			  <!-- else content here -->

			  {:else if game.state=='high score'}
			  <!-- else content here -->

			  {:else if game.state=='end'}
			  <!-- else content here -->
		 {/if}
	{/if}

	<div class="bottom">
		Game pin: {gamepin}
		Players: {game.players.length}
		Status: { game.state }<br>
		Mit indeks: {findMe}
		<br>
		<button on:click={reset}>reset</button>
	</div>
</main>

<style>
	main {
		display:grid;
		place-items:center;
	}
	.begin button{
		margin:4rem;
	}
	.bottom{
		position:fixed;
		left:0;
		bottom:0;
		width:100vw;
		height:10vh;
		background:lightgray;
		display:grid;
		place-items:center;
		font-size: .8rem;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>