const { gotoPage } = require('./navigation');

const searchOptions = [
  {
    display: 'Home',
    type: '',
    page: '',
  },
  {
    display: 'Wiki Guide',
    type: 'Wiki Guide',
    page: '',
  },
  {
    display: 'Battle Frontier',
    type: 'Battle Frontier',
    page: '',
  },
  // Pokémon
  {
    display: 'Pokémon',
    type: 'Pokemon',
    page: '',
  },
  ...Object.values(pokemonList).map(p => ({
    display: p.name,
    type: 'Pokemon',
    page: p.name,
  })),
  // Dungeons
  {
    display: 'Dungeons',
    type: 'Dungeons',
    page: '',
  },
  ...Object.values(dungeonList).map(d => ({
    display: d.name,
    type: 'Dungeons',
    page: d.name,
  })),
  // Gems
  {
    display: 'Gems',
    type: 'Gems',
    page: '',
  },
  ...GameHelper.enumStrings(PokemonType).filter(t => t != 'None').map(t => ({
    display: `${t} Gem`,
    type: 'Gems',
    page: t,
  })),
  // Berries
  {
    display: 'Berries',
    type: 'Berries',
    page: '',
  },
  ...App.game.farming.berryData.map(b => ({
    display: `${BerryType[b.type]} Berry`,
    type: 'Berries',
    page: BerryType[b.type],
  })),
  // Eggs
  {
    display: 'Eggs',
    type: 'Eggs',
    page: '',
  },
  // Items
  {
    display: 'Items',
    type: 'Items',
    page: '',
  },
  ...Object.values(ItemList).map(i => ({
    display: i.displayName,
    type: 'Items',
    page: i.displayName,
  })),
  ...UndergroundItems.list.filter((ui) => !Object.values(ItemList).some((i) => i.displayName == ui.displayName)).map(i => ({
    display: i.displayName,
    type: 'Items',
    page: i.displayName,
  })),
  // QuestLines
  {
    display: 'Quest Lines',
    type: 'Quest Lines',
    page: '',
  },
  ...App.game.quests.questLines().map(q => ({
    display: q.name,
    type: 'Quest Lines',
    page: q.name,
  })),
  // Farm
    {
      display: 'Farm',
      type: 'Farm',
      page: '',
    },
  // Battle Cafe
  {
    display: 'Battle Café',
    type: 'Battle Cafe',
    page: '',
  },
  // Battle Cafe
  {
    display: 'Battle Frontier',
    type: 'Battle Frontier',
    page: '',
  },
  // Vitamins
  {
    display: 'Vitamins',
    type: 'Vitamins',
    page: '',
  },
  // Hatchery Helpers
  {
    display: 'Hatchery Helpers',
    type: 'Hatchery Helpers',
    page: '',
  },
  ...HatcheryHelpers.list.map(h => ({
    display: h.name,
    type: 'Hatchery Helpers',
    page: h.name,
  })),
];
// Differentiate our different links with the same name
searchOptions.forEach(a => {
  const duplicates = searchOptions.filter(b => b.display == a.display);
  if (duplicates.length > 1) {
    duplicates.forEach(d => d.display = `${d.display} (${d.type})`);
  }
})

/*
    AUTO FILL FOR SEARCH BAR
*/

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
// This is the function which figures out the results to show
var substringMatcher = (searchData) => {
  return (query, cb) => {
    // regex used to determine if a string contains the substring `q`
    const substrRegex = new RegExp(escapeRegExp(query), 'i');

    // iterate through the pool of strings and for any string that matches the regex
    const results = searchData.filter(d => substrRegex.test(d.display));

    cb(results.sort((a, b) => a.display.search(substrRegex) - b.display.search(substrRegex) || a.display.length - b.display.length));
  };
};

// Initiate out autofill/typeahead
$('#search').typeahead({
  hint: true,
  highlight: true,
  minLength: 1,
  classNames: {
    menu: 'dropdown-menu',
    suggestion: 'dropdown-item',
    cursor: 'active',
    highlight: 'text-primary'
  },
},
{
  name: 'Search',
  limit: 8,
  source: substringMatcher(searchOptions),
  display: 'display',
  templates: {
    notFound: '<a class="dropdown-item disabled">No results found...</a>',
  },
});
$('#search').bind('typeahead:select', (ev, suggestion) => {
  gotoPage(suggestion.type, suggestion.page);
});
$('#search').bind('typeahead:autocomplete', (ev, suggestion) => {
  gotoPage(suggestion.type, suggestion.page);
});

module.exports = { 
  searchOptions,
};
