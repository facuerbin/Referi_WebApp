import { Component, OnInit } from '@angular/core';
import { faAddressCard, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  constructor() { }

  ngOnInit(): void {
  }

  search(event:Event) {
    return event;
  }

  actividades = [
    {
      codigo: 1,
      nombre: "Brown Flatsedge",
      tipo: "Fintone",
      cupo: 35,
      espacio: "Anderson",
      estado: "Activo"
    },
    {
      codigo: 2,
      nombre: "Prairie Rose",
      tipo: "Zaam-Dox",
      cupo: 15,
      espacio: "Saint Paul",
      estado: "Activo"
    },
    {
      codigo: 3,
      nombre: "Dakota Sarcogyne Lichen",
      tipo: "Andalax",
      cupo: 50,
      espacio: "Monica",
      estado: "Activo generation"
    },
    {
      codigo: 4,
      nombre: "Mint",
      tipo: "Quo Lux",
      cupo: 58,
      espacio: "Shopko",
      estado: "Activo solution"
    },
    {
      codigo: 5,
      nombre: "Carolina Goldenrod",
      tipo: "Bamity",
      cupo: 17,
      espacio: "Golden Leaf",
      estado: "Activo"
    },
    {
      codigo: 6,
      nombre: "Bitterroot Milkvetch",
      tipo: "Flowdesk",
      cupo: 20,
      espacio: "Ronald Regan",
      estado: "Activo"
    },
    {
      codigo: 7,
      nombre: "Rocky Mountain Buttercup",
      tipo: "Flowdesk",
      cupo: 20,
      espacio: "Lukken",
      estado: "Activo"
    },
    {
      codigo: 8,
      nombre: "Crabseye",
      tipo: "Tampflex",
      cupo: 19,
      espacio: "Rusk",
      estado: "Activo"
    },
    {
      codigo: 9,
      nombre: "Ash Meadows Lady's Tresses",
      tipo: "Sonsing",
      cupo: 22,
      espacio: "Park Meadow",
      estado: "Activo"
    },
    {
      codigo: 10,
      nombre: "Redflower Buckwheat",
      tipo: "Kanlam",
      cupo: 10,
      espacio: "Roth",
      estado: "Activo"
    },
    {
      codigo: 11,
      nombre: "Pride Of India",
      tipo: "Cardify",
      cupo: 15,
      espacio: "Ramsey",
      estado: "Activo user"
    },
    {
      codigo: 12,
      nombre: "Spoonleaf Treebine",
      tipo: "Voyatouch",
      cupo: 18,
      espacio: "Norway Maple",
      estado: "Activo"
    },
    {
      codigo: 13,
      nombre: "California Seapink",
      tipo: "It",
      cupo: 36,
      espacio: "Doe Crossing",
      estado: "Activo"
    },
    {
      codigo: 14,
      nombre: "Ashen Hoarypea",
      tipo: "Voltsillam",
      cupo: 38,
      espacio: "Meadow Ridge",
      estado: "Activo-wide"
    },
    {
      codigo: 15,
      nombre: "Purple Toadflax",
      tipo: "Flexidy",
      cupo: 10,
      espacio: "Grasskamp",
      estado: "Activo-group"
    },
    {
      codigo: 16,
      nombre: "Spikemoss",
      tipo: "Redhold",
      cupo: 44,
      espacio: "Maryland",
      estado: "Activo set"
    },
    {
      codigo: 17,
      nombre: "Wart Lichen",
      tipo: "Biodex",
      cupo: 24,
      espacio: "Anhalt",
      estado: "Activo"
    },
    {
      codigo: 18,
      nombre: "Melonleaf Nightshade",
      tipo: "Stim",
      cupo: 55,
      espacio: "Eastwood",
      estado: "Activo"
    },
    {
      codigo: 19,
      nombre: "Mexican Bonebract",
      tipo: "Cardguard",
      cupo: 39,
      espacio: "Bluejay",
      estado: "Activo engine"
    },
    {
      codigo: 20,
      nombre: "Red Star-thistle",
      tipo: "Trippledex",
      cupo: 27,
      espacio: "Sunfield",
      estado: "Activo-modulated"
    },
    {
      codigo: 21,
      nombre: "Woodland Hogwood",
      tipo: "Solarbreeze",
      cupo: 45,
      espacio: "Sugar",
      estado: "Activo"
    },
    {
      codigo: 22,
      nombre: "Rocky Mountain Clover",
      tipo: "Lotlux",
      cupo: 43,
      espacio: "Corscot",
      estado: "Activo-critical"
    },
    {
      codigo: 23,
      nombre: "Fragrant Bursera",
      tipo: "Stim",
      cupo: 38,
      espacio: "Kipling",
      estado: "Activo"
    },
    {
      codigo: 24,
      nombre: "American Tarwort",
      tipo: "Flexidy",
      cupo: 23,
      espacio: "Claremont",
      estado: "Activo"
    },
    {
      codigo: 25,
      nombre: "Speckled Clarkia",
      tipo: "Konklab",
      cupo: 13,
      espacio: "Bunting",
      estado: "Activo"
    },
    {
      codigo: 26,
      nombre: "American Searocket",
      tipo: "Temp",
      cupo: 22,
      espacio: "Autumn Leaf",
      estado: "Activo-engineered"
    },
    {
      codigo: 27,
      nombre: "Dark Raspberry",
      tipo: "Tres-Zap",
      cupo: 19,
      espacio: "Holmberg",
      estado: "Activo"
    },
    {
      codigo: 28,
      nombre: "Japanese Buckthorn",
      tipo: "Konklux",
      cupo: 54,
      espacio: "Meadow Vale",
      estado: "Activo-based"
    },
    {
      codigo: 29,
      nombre: "Tweedy's Ivesia",
      tipo: "Aerified",
      cupo: 31,
      espacio: "Anderson",
      estado: "Activo"
    },
    {
      codigo: 30,
      nombre: "Whitemargin Pussytoes",
      tipo: "Keylex",
      cupo: 47,
      espacio: "Kennedy",
      estado: "Activo"
    },
    {
      codigo: 31,
      nombre: "Mountain Spurge",
      tipo: "Solarbreeze",
      cupo: 50,
      espacio: "West",
      estado: "Activo"
    },
    {
      codigo: 32,
      nombre: "Gray Five Eyes",
      tipo: "Opela",
      cupo: 29,
      espacio: "Glacier Hill",
      estado: "Activo"
    },
    {
      codigo: 33,
      nombre: "Giant Wakerobin",
      tipo: "Domainer",
      cupo: 41,
      espacio: "Atwood",
      estado: "Activo"
    },
    {
      codigo: 34,
      nombre: "European Columbine",
      tipo: "Alpha",
      cupo: 33,
      espacio: "Miller",
      estado: "Activo"
    },
    {
      codigo: 35,
      nombre: "Boreal Locoweed",
      tipo: "Andalax",
      cupo: 21,
      espacio: "Holmberg",
      estado: "Activo"
    },
    {
      codigo: 36,
      nombre: "Camel's Foot",
      tipo: "Prodder",
      cupo: 56,
      espacio: "Ramsey",
      estado: "Activo-focused"
    },
    {
      codigo: 37,
      nombre: "Perilla",
      tipo: "Alphazap",
      cupo: 19,
      espacio: "Russell",
      estado: "Activo"
    },
    {
      codigo: 38,
      nombre: "Tea",
      tipo: "Latlux",
      cupo: 55,
      espacio: "Gateway",
      estado: "Activo"
    },
    {
      codigo: 39,
      nombre: "Plains Yucca",
      tipo: "Job",
      cupo: 35,
      espacio: "Cody",
      estado: "Activo-oriented"
    },
    {
      codigo: 40,
      nombre: "Annual Marsh Elder",
      tipo: "Fix San",
      cupo: 10,
      espacio: "Elka",
      estado: "Activo"
    },
    {
      codigo: 41,
      nombre: "Sandcherry",
      tipo: "Keylex",
      cupo: 13,
      espacio: "Kipling",
      estado: "Activo-line"
    },
    {
      codigo: 42,
      nombre: "Tidal Spikerush",
      tipo: "Zamit",
      cupo: 22,
      espacio: "Gina",
      estado: "Activo"
    },
    {
      codigo: 43,
      nombre: "Tall Fleabane",
      tipo: "Fintone",
      cupo: 52,
      espacio: "Ludington",
      estado: "Activo architecture"
    },
    {
      codigo: 44,
      nombre: "Justiceweed",
      tipo: "Asoka",
      cupo: 58,
      espacio: "Cardinal",
      estado: "Activo"
    },
    {
      codigo: 45,
      nombre: "Oregon Sphagnum",
      tipo: "Greenlam",
      cupo: 57,
      espacio: "Clarendon",
      estado: "Activo"
    },
    {
      codigo: 46,
      nombre: "Jamaican Treefern",
      tipo: "Zoolab",
      cupo: 55,
      espacio: "Johnson",
      estado: "Activo"
    },
    {
      codigo: 47,
      nombre: "Small's Acroporium Moss",
      tipo: "Rank",
      cupo: 15,
      espacio: "Mandrake",
      estado: "Activo generation"
    },
    {
      codigo: 48,
      nombre: "Brandegee's Buttercup",
      tipo: "Home Ing",
      cupo: 17,
      espacio: "Transport",
      estado: "Activo"
    },
    {
      codigo: 49,
      nombre: "Tridax",
      tipo: "Konklab",
      cupo: 31,
      espacio: "American Ash",
      estado: "Activo"
    },
    {
      codigo: 50,
      nombre: "Brazilian Bluewood",
      tipo: "Veribet",
      cupo: 41,
      espacio: "Petterle",
      estado: "Activo-lateral"
    },
    {
      codigo: 51,
      nombre: "Hoary Pea",
      tipo: "Quo Lux",
      cupo: 38,
      espacio: "Blue Bill Park",
      estado: "Activo"
    },
    {
      codigo: 52,
      nombre: "Ellisia",
      tipo: "Konklux",
      cupo: 30,
      espacio: "Porter",
      estado: "Activo-state"
    },
    {
      codigo: 53,
      nombre: "Corkbark Fir",
      tipo: "Hatity",
      cupo: 46,
      espacio: "Waxwing",
      estado: "Activo base"
    },
    {
      codigo: 54,
      nombre: "Yellow Rabbitbrush",
      tipo: "Tin",
      cupo: 48,
      espacio: "Crownhardt",
      estado: "Activo"
    },
    {
      codigo: 55,
      nombre: "Autumn Bluegrass",
      tipo: "Quo Lux",
      cupo: 58,
      espacio: "Vernon",
      estado: "Activo solution"
    },
    {
      codigo: 56,
      nombre: "Pringle's Swallow-wort",
      tipo: "It",
      cupo: 22,
      espacio: "Russell",
      estado: "Activo"
    },
    {
      codigo: 57,
      nombre: "Carbonea Lichen",
      tipo: "Aerified",
      cupo: 10,
      espacio: "Service",
      estado: "Activo"
    },
    {
      codigo: 58,
      nombre: "Goldback Fern",
      tipo: "Rank",
      cupo: 40,
      espacio: "Montana",
      estado: "Activo-based"
    },
    {
      codigo: 59,
      nombre: "Tropical Panicgrass",
      tipo: "Bamity",
      cupo: 57,
      espacio: "Ridgeway",
      estado: "Activo"
    },
    {
      codigo: 60,
      nombre: "Cranichis-like Ladies'-tresses",
      tipo: "Quo Lux",
      cupo: 19,
      espacio: "Butternut",
      estado: "Activo-enabled"
    },
    {
      codigo: 61,
      nombre: "Elegant Rockcress",
      tipo: "Vagram",
      cupo: 57,
      espacio: "Elgar",
      estado: "Activo line"
    },
    {
      codigo: 62,
      nombre: "Oldfield Sneezeweed",
      tipo: "Keylex",
      cupo: 58,
      espacio: "Schlimgen",
      estado: "Activo"
    },
    {
      codigo: 63,
      nombre: "Antilles Spleenwort",
      tipo: "Tres-Zap",
      cupo: 55,
      espacio: "Heffernan",
      estado: "Activo tolerance"
    },
    {
      codigo: 64,
      nombre: "Tuberous Vervain",
      tipo: "Y-find",
      cupo: 38,
      espacio: "Bunker Hill",
      estado: "Activo loyalty"
    },
    {
      codigo: 65,
      nombre: "Sierra Pussytoes",
      tipo: "Stringtough",
      cupo: 32,
      espacio: "Summer Ridge",
      estado: "Activo-sized"
    },
    {
      codigo: 66,
      nombre: "Leafless Orchid",
      tipo: "Tampflex",
      cupo: 16,
      espacio: "Stone Corner",
      estado: "Activo"
    },
    {
      codigo: 67,
      nombre: "Wall Germander",
      tipo: "Wrapsafe",
      cupo: 16,
      espacio: "Shelley",
      estado: "Activo"
    },
    {
      codigo: 68,
      nombre: "Reed Mannagrass",
      tipo: "Zontrax",
      cupo: 14,
      espacio: "Thierer",
      estado: "Activo"
    },
    {
      codigo: 69,
      nombre: "Sharpleaf Snowberry",
      tipo: "Tresom",
      cupo: 12,
      espacio: "Center",
      estado: "Activo"
    },
    {
      codigo: 70,
      nombre: "Duckmeat",
      tipo: "Lotstring",
      cupo: 31,
      espacio: "Golf View",
      estado: "Activo"
    },
    {
      codigo: 71,
      nombre: "Single Threeawn",
      tipo: "Latlux",
      cupo: 56,
      espacio: "Shoshone",
      estado: "Activo administration"
    },
    {
      codigo: 72,
      nombre: "Parallel Sedge",
      tipo: "Prodder",
      cupo: 60,
      espacio: "Namekagon",
      estado: "Activo"
    },
    {
      codigo: 73,
      nombre: "Sea Aster",
      tipo: "Bitchip",
      cupo: 17,
      espacio: "Karstens",
      estado: "Activo intelligence"
    },
    {
      codigo: 74,
      nombre: "Carpetgrass",
      tipo: "Tresom",
      cupo: 55,
      espacio: "Upham",
      estado: "Activo-engineered"
    },
    {
      codigo: 75,
      nombre: "Waianae Range Tetramolopium",
      tipo: "Bytecard",
      cupo: 36,
      espacio: "Dwight",
      estado: "Activo"
    },
    {
      codigo: 76,
      nombre: "Narrowleaf Arnica",
      tipo: "Gembucket",
      cupo: 47,
      espacio: "Schlimgen",
      estado: "Activo-contextualized"
    },
    {
      codigo: 77,
      nombre: "Yellow Fumewort",
      tipo: "Job",
      cupo: 54,
      espacio: "Westerfield",
      estado: "Activo"
    },
    {
      codigo: 78,
      nombre: "Pale Indian Plantain",
      tipo: "Stronghold",
      cupo: 20,
      espacio: "Lake View",
      estado: "Activo"
    },
    {
      codigo: 79,
      nombre: "Rough Cocklebur",
      tipo: "Hatity",
      cupo: 45,
      espacio: "Haas",
      estado: "Activo"
    },
    {
      codigo: 80,
      nombre: "Narrowleaf Four O'clock",
      tipo: "Tres-Zap",
      cupo: 52,
      espacio: "Monica",
      estado: "Activo"
    },
    {
      codigo: 81,
      nombre: "Mendocino Bushmallow",
      tipo: "Konklab",
      cupo: 33,
      espacio: "Mccormick",
      estado: "Activo"
    },
    {
      codigo: 82,
      nombre: "Sheep Cinquefoil",
      tipo: "Bytecard",
      cupo: 20,
      espacio: "Hagan",
      estado: "Activo"
    },
    {
      codigo: 83,
      nombre: "Cutleaf Blazingstar",
      tipo: "Latlux",
      cupo: 19,
      espacio: "1st",
      estado: "Activo"
    },
    {
      codigo: 84,
      nombre: "Cutleaf Vipergrass",
      tipo: "Konklab",
      cupo: 35,
      espacio: "Pawling",
      estado: "Activo"
    },
    {
      codigo: 85,
      nombre: "Daphnopsis",
      tipo: "Sonsing",
      cupo: 50,
      espacio: "2nd",
      estado: "Activo"
    },
    {
      codigo: 86,
      nombre: "Intermediate Pepperweed",
      tipo: "Zamit",
      cupo: 15,
      espacio: "Cambridge",
      estado: "Activo"
    },
    {
      codigo: 87,
      nombre: "Axillary Filmy Fern",
      tipo: "Sonsing",
      cupo: 17,
      espacio: "Division",
      estado: "Activo-line"
    },
    {
      codigo: 88,
      nombre: "Hymenostylium Moss",
      tipo: "Vagram",
      cupo: 47,
      espacio: "Karstens",
      estado: "Activo"
    },
    {
      codigo: 89,
      nombre: "Gracilariopsis",
      tipo: "Wrapsafe",
      cupo: 24,
      espacio: "Carioca",
      estado: "Activo-sized"
    },
    {
      codigo: 90,
      nombre: "Dicranodontium Moss",
      tipo: "Bigtax",
      cupo: 20,
      espacio: "Spaight",
      estado: "Activo"
    },
    {
      codigo: 91,
      nombre: "Bentham Cypress",
      tipo: "Andalax",
      cupo: 53,
      espacio: "Mockingbird",
      estado: "Activo-frame"
    },
    {
      codigo: 92,
      nombre: "Sudetic Lousewort",
      tipo: "Sonair",
      cupo: 15,
      espacio: "Karstens",
      estado: "Activo"
    },
    {
      codigo: 93,
      nombre: "Reverchon's Bristlegrass",
      tipo: "Trippledex",
      cupo: 54,
      espacio: "Paget",
      estado: "Activo-focused"
    },
    {
      codigo: 94,
      nombre: "Manchu Tubergourd",
      tipo: "Asoka",
      cupo: 35,
      espacio: "Rutledge",
      estado: "Activo"
    },
    {
      codigo: 95,
      nombre: "Slender Mountain Sandwort",
      tipo: "Bamity",
      cupo: 38,
      espacio: "Sachtjen",
      estado: "Activo"
    },
    {
      codigo: 96,
      nombre: "Cup Lichen",
      tipo: "Keylex",
      cupo: 28,
      espacio: "Duke",
      estado: "Activo"
    },
    {
      codigo: 97,
      nombre: "Waterdropwort",
      tipo: "Lotlux",
      cupo: 54,
      espacio: "Doe Crossing",
      estado: "Activo-server"
    },
    {
      codigo: 98,
      nombre: "Calcareous Gymnostomum Moss",
      tipo: "Konklab",
      cupo: 54,
      espacio: "3rd",
      estado: "Activo"
    },
    {
      codigo: 99,
      nombre: "American Lotus",
      tipo: "Home Ing",
      cupo: 43,
      espacio: "Truax",
      estado: "Activo structure"
    },
    {
      codigo: 100,
      nombre: "California Butterwort",
      tipo: "Cookley",
      cupo: 15,
      espacio: "Red Cloud",
      estado: "Activo"
    }
  ]
}
