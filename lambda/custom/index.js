const Alexa = require('ask-sdk-core');

const adjectives = [
	'secret', 'unending', 'bottomless', 'winding', 'gloomy', 'crooked',
	'crumbling', 'burnt', 'darkened', 'windswept', 'forgotten', 'quaking',
	'overgrown', 'eldritch', 'cyclopean', 'legendary', 'isolated', 'degenerate',
	'forbidden', 'blasted', 'rambling', 'black', 'shadowy', 'abandoned',
	'bloody', 'shunned', 'haunted', 'lost', 'buried', 'forsaken',
	'ruined', 'cursed', 'stinking', 'decaying', 'ancient', 'hidden',
	'infernal', 'inescapable', 'neglected', 'festering', 'nefarious', 'tainted',
	'diabolical', 'wretched', 'voracious', 'timeless', 'echoing', 'treacherous',
	'stunted', 'cavernous', 'blood-soaked', 'maddening', 'desolate', 'eroded',
	'rotted', 'elder', 'umber', 'tyrannical', 'empty', 'decomposing',
	'monstrous', 'smokey', 'shattered', 'obsidian', 'hanging', 'scarred',
	'macabre', 'worm-ridden', 'unstable', 'pale', 'perilous', 'unholy'
];

const locations = [
	'den', 'maze', 'caverns', 'ruins', 'fortress', 'mansion',
	'castle', 'labyrinth', 'tomb', 'dungeon', 'grotto', 'gateway',
	'warren', 'mine', 'tower', 'academy', 'menagerie', 'stronghold',
	'vault', 'prison', 'excavation', 'asylum', 'laboratories', 'lair',
	'hoard', 'seplucher', 'forge', 'quarry', 'arena', 'tunnels',
	'halls', 'observatory', 'temple', 'catacombs', 'barrow', 'pyramid',
	'gallery', 'monastery', 'dome', 'apothacary', 'briar',
	'fissure', 'refuge', 'manor', 'hearth', 'crater', 'well',
	'hive', 'redoubt', 'armory', 'chambers', 'treasury', 'oubliette',
	'workshop', 'abbey', 'mausoleum', 'monument', 'palace', 'haven',
	'sanctum', 'vesicles', 'mound', 'crypt', 'barracks', 'garrison',
	'pit', 'cathedral', 'citadel', 'library', 'shrine', 'embassy'
];

const descriptors = [
	'of despair', 'of isolation', 'of hatred', 'of lost dreams', 'of impenetrable gloom', 'of the gods',
	'of the inferno', 'of the dragon', 'of the ancestors', 'of torment', 'in the mists', 'of shadows',
	'of the clouds', 'of corrupted souls', 'of red eyes', 'of long shadows', 'of chattering fangs', 'of the orcs',
	'beneath the sands', 'of the spider', 'of domination', 'of the warlord', 'of the shimmering pools', 'of the undying',
	'of the abyss', 'under troll mountain', 'of the unquenchable fire', 'of the walking death', 'of the dispossessed', 'of chaos',
	'of the asps', 'of the insatiable hunger', 'of the skull', 'of the harvest', 'in the wasteland', 'of the moon',
	'of the bloated abomination', 'of the apocalypse', 'of the betrayer', 'on the borderlands', 'of the slave lords', 'of the berserker',
	'under a dark god', 'of the grinding stones', 'formed of flesh and bones', 'of the mad king', 'before the breached gate', 'of the penultimate truth',
	'of armageddon\'s reach', 'of the seven sins', 'of vile regeneration', 'of the red right hand', 'of the black company', 'of the granite visage',
	'from out of time and space', 'of the barbed lash', 'of damnation', 'of the seven horsemen', 'of the corpse spire', 'of the minotaur',
	'of the green warlock', 'to fate\'s gavel', 'of mourning', 'of the devoured paladin', 'of shuttered horror', 'of the abolished sigil',
	'of the notched skulls', 'in the darklord\'s grace', 'of the gathering plauge', 'in the aether', 'in midnight\'s shade', 'of the banished sect'
];

const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},

	handle(handlerInput) {
		const speechText = 'Welcome to the Dungeon Name skill, ask for a dungeon name';

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechtext)
			.withSimpleCard('Dungeon Name', speechText)
			.getResponse();
	}
};

const DungeonNameIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& handlerInput.requestEnvelope.request.intent.name === 'DungeonNameIntent';
	},

	handle(handlerInput) {
		const selected_adj = adjectives[Math.floor(Math.random() * adjectives.length)];
		const selected_location = locations[Math.floor(Math.random() * locations.length)]
		const selected_descriptor = descriptors[Math.floor(Math.random() * descriptors.length)]
		const speechText = `The ${selected_adj} ${selected_location} ${selected_descriptor}`;

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Dungeon Name', speechText)
			.getResponse();
	}
};

const ErrorHandler = {
	canHandle() {
		return true;
	},

	handle(handlerInput, error) {
		console.log(`Error handled: ${error.message}`);

		return handlerInput.responseBuilder
			.speak('Sorry, an error occurred.')
			.reprompt('Sorry, an error occurred.')
			.getResponse();
	}
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
		DungeonNameIntentHandler,
		LaunchRequestHandler)
	.addErrorHandlers(ErrorHandler)
	.lambda();

