import { Component, OnInit } from '@angular/core';
import { faAddressCard, faIdCard, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css'],
})
export class SociosComponent implements OnInit {
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  trashIcon = faTrash;
  editIcon = faUserEdit;
  constructor() { }

  ngOnInit(): void {
  }

  search(event: Event) {
    return event;
  }


  socios = [
    {
      legajo: 1,
      nombre: "Dal Newdick",
      email: "dnewdick0@imdb.com",
      dni: "07-095-5898"
    },
    {
      legajo: 2,
      nombre: "Gaylor Saffon",
      email: "gsaffon1@bizjournals.com",
      dni: "13-516-1362"
    },
    {
      legajo: 3,
      nombre: "Kerby Burkhill",
      email: "kburkhill2@cargocollective.com",
      dni: "78-138-1315"
    },
    {
      legajo: 4,
      nombre: "Tiphany Meffen",
      email: "tmeffen3@wisc.edu",
      dni: "20-179-4628"
    },
    {
      legajo: 5,
      nombre: "Darnell Kamen",
      email: "dkamen4@booking.com",
      dni: "84-113-3103"
    },
    {
      legajo: 6,
      nombre: "Willette Stothart",
      email: "wstothart5@thetimes.co.uk",
      dni: "06-200-3057"
    },
    {
      legajo: 7,
      nombre: "Ring Louthe",
      email: "rlouthe6@dailymail.co.uk",
      dni: "44-880-5212"
    },
    {
      legajo: 8,
      nombre: "Barbe Hulburd",
      email: "bhulburd7@techcrunch.com",
      dni: "15-189-9283"
    },
    {
      legajo: 9,
      nombre: "Obadiah Astupenas",
      email: "oastupenas8@last.fm",
      dni: "71-597-8894"
    },
    {
      legajo: 10,
      nombre: "Sarajane Etteridge",
      email: "setteridge9@booking.com",
      dni: "30-289-4790"
    },
    {
      legajo: 11,
      nombre: "Carlyn Attree",
      email: "cattreea@sciencedaily.com",
      dni: "56-903-5278"
    },
    {
      legajo: 12,
      nombre: "Elizabet Brislane",
      email: "ebrislaneb@house.gov",
      dni: "17-349-5514"
    },
    {
      legajo: 13,
      nombre: "Auberon Slorach",
      email: "aslorachc@sina.com.cn",
      dni: "28-112-8788"
    },
    {
      legajo: 14,
      nombre: "Eada Gerbl",
      email: "egerbld@squidoo.com",
      dni: "57-042-8366"
    },
    {
      legajo: 15,
      nombre: "Henrietta Hogben",
      email: "hhogbene@arizona.edu",
      dni: "95-153-6597"
    },
    {
      legajo: 16,
      nombre: "Innis McKeggie",
      email: "imckeggief@printfriendly.com",
      dni: "53-994-3903"
    },
    {
      legajo: 17,
      nombre: "Nikos Elvey",
      email: "nelveyg@foxnews.com",
      dni: "19-935-5802"
    },
    {
      legajo: 18,
      nombre: "Crichton Whye",
      email: "cwhyeh@liveinternet.ru",
      dni: "64-476-5702"
    },
    {
      legajo: 19,
      nombre: "Alberto Offell",
      email: "aoffelli@nymag.com",
      dni: "88-751-8947"
    },
    {
      legajo: 20,
      nombre: "Estevan Grishmanov",
      email: "egrishmanovj@t.co",
      dni: "05-044-3461"
    },
    {
      legajo: 21,
      nombre: "Leo Shrubshall",
      email: "lshrubshallk@bluehost.com",
      dni: "68-335-5611"
    },
    {
      legajo: 22,
      nombre: "Darryl Duval",
      email: "dduvall@shutterfly.com",
      dni: "47-085-0970"
    },
    {
      legajo: 23,
      nombre: "Kyrstin Nellies",
      email: "knelliesm@hubpages.com",
      dni: "90-991-7254"
    },
    {
      legajo: 24,
      nombre: "Claudelle Lowdwell",
      email: "clowdwelln@artisteer.com",
      dni: "26-116-4458"
    },
    {
      legajo: 25,
      nombre: "Ferdinand Thames",
      email: "fthameso@hugedomains.com",
      dni: "22-420-4640"
    },
    {
      legajo: 26,
      nombre: "Korney Clelle",
      email: "kclellep@spiegel.de",
      dni: "85-569-0042"
    },
    {
      legajo: 27,
      nombre: "Zechariah Maggs",
      email: "zmaggsq@a8.net",
      dni: "22-406-8387"
    },
    {
      legajo: 28,
      nombre: "Town Donnell",
      email: "tdonnellr@woothemes.com",
      dni: "36-949-7708"
    },
    {
      legajo: 29,
      nombre: "Charleen Goose",
      email: "cgooses@networksolutions.com",
      dni: "34-361-3130"
    },
    {
      legajo: 30,
      nombre: "Batholomew Jozwicki",
      email: "bjozwickit@umich.edu",
      dni: "47-946-7697"
    },
    {
      legajo: 31,
      nombre: "Pammie Ruckledge",
      email: "pruckledgeu@jigsy.com",
      dni: "33-305-7621"
    },
    {
      legajo: 32,
      nombre: "Tann Chetter",
      email: "tchetterv@loc.gov",
      dni: "67-960-7441"
    },
    {
      legajo: 33,
      nombre: "Corly Shambrooke",
      email: "cshambrookew@latimes.com",
      dni: "18-989-3279"
    },
    {
      legajo: 34,
      nombre: "Elfrieda Fonteyne",
      email: "efonteynex@t-online.de",
      dni: "73-550-0162"
    },
    {
      legajo: 35,
      nombre: "Jaquenette Dunlop",
      email: "jdunlopy@wp.com",
      dni: "38-328-1491"
    },
    {
      legajo: 36,
      nombre: "Andrus Balaisot",
      email: "abalaisotz@mail.ru",
      dni: "48-512-7873"
    },
    {
      legajo: 37,
      nombre: "Rasla Kermott",
      email: "rkermott10@msn.com",
      dni: "60-253-7115"
    },
    {
      legajo: 38,
      nombre: "Hasty Ornillos",
      email: "hornillos11@studiopress.com",
      dni: "69-278-0701"
    },
    {
      legajo: 39,
      nombre: "Hanny Del Checolo",
      email: "hdel12@etsy.com",
      dni: "24-690-6171"
    },
    {
      legajo: 40,
      nombre: "Madlen Serot",
      email: "mserot13@topsy.com",
      dni: "39-203-8396"
    },
    {
      legajo: 41,
      nombre: "Carley Rollings",
      email: "crollings14@sogou.com",
      dni: "91-561-9862"
    },
    {
      legajo: 42,
      nombre: "Garrek Pashby",
      email: "gpashby15@sfgate.com",
      dni: "04-786-3185"
    },
    {
      legajo: 43,
      nombre: "Skip Dorant",
      email: "sdorant16@istockphoto.com",
      dni: "38-834-7394"
    },
    {
      legajo: 44,
      nombre: "Alexandrina Bottle",
      email: "abottle17@dailymail.co.uk",
      dni: "96-829-6189"
    },
    {
      legajo: 45,
      nombre: "Serena Yon",
      email: "syon18@columbia.edu",
      dni: "83-465-3782"
    },
    {
      legajo: 46,
      nombre: "Bordy Custy",
      email: "bcusty19@google.es",
      dni: "52-553-8523"
    },
    {
      legajo: 47,
      nombre: "Ellette McAneny",
      email: "emcaneny1a@npr.org",
      dni: "42-508-3520"
    },
    {
      legajo: 48,
      nombre: "Didi Stannard",
      email: "dstannard1b@lulu.com",
      dni: "17-408-4101"
    },
    {
      legajo: 49,
      nombre: "Christopher Lownsbrough",
      email: "clownsbrough1c@amazon.co.uk",
      dni: "37-762-6756"
    },
    {
      legajo: 50,
      nombre: "Sondra Broadey",
      email: "sbroadey1d@imgur.com",
      dni: "33-276-5047"
    },
    {
      legajo: 51,
      nombre: "Georgiana Cornell",
      email: "gcornell1e@google.fr",
      dni: "21-275-3270"
    },
    {
      legajo: 52,
      nombre: "Dianemarie Itzkin",
      email: "ditzkin1f@kickstarter.com",
      dni: "25-465-8349"
    },
    {
      legajo: 53,
      nombre: "Symon Cherrison",
      email: "scherrison1g@gnu.org",
      dni: "35-396-6247"
    },
    {
      legajo: 54,
      nombre: "Gabbie Jowsey",
      email: "gjowsey1h@bloglines.com",
      dni: "05-878-6189"
    },
    {
      legajo: 55,
      nombre: "Andie Cejka",
      email: "acejka1i@360.cn",
      dni: "44-733-9535"
    },
    {
      legajo: 56,
      nombre: "Raymund Chetwind",
      email: "rchetwind1j@usnews.com",
      dni: "46-594-5313"
    },
    {
      legajo: 57,
      nombre: "Raina Hazell",
      email: "rhazell1k@reference.com",
      dni: "93-795-2712"
    },
    {
      legajo: 58,
      nombre: "Isaak Newson",
      email: "inewson1l@ameblo.jp",
      dni: "24-690-8930"
    },
    {
      legajo: 59,
      nombre: "Lief Gai",
      email: "lgai1m@theguardian.com",
      dni: "89-650-8876"
    },
    {
      legajo: 60,
      nombre: "Shelly Pavlishchev",
      email: "spavlishchev1n@free.fr",
      dni: "10-177-3899"
    },
    {
      legajo: 61,
      nombre: "Ailsun Gunby",
      email: "agunby1o@photobucket.com",
      dni: "17-419-3940"
    },
    {
      legajo: 62,
      nombre: "Jacklyn Lathe",
      email: "jlathe1p@cbc.ca",
      dni: "79-736-9822"
    },
    {
      legajo: 63,
      nombre: "Ranna Ewbanche",
      email: "rewbanche1q@timesonline.co.uk",
      dni: "96-034-5613"
    },
    {
      legajo: 64,
      nombre: "Carmella Shrigley",
      email: "cshrigley1r@intel.com",
      dni: "12-713-9744"
    },
    {
      legajo: 65,
      nombre: "Merrile Harborow",
      email: "mharborow1s@usnews.com",
      dni: "68-205-8342"
    },
    {
      legajo: 66,
      nombre: "Reilly Keningley",
      email: "rkeningley1t@linkedin.com",
      dni: "37-828-5996"
    },
    {
      legajo: 67,
      nombre: "Danny Lambotin",
      email: "dlambotin1u@fema.gov",
      dni: "27-424-3418"
    },
    {
      legajo: 68,
      nombre: "Averyl Burgoyne",
      email: "aburgoyne1v@fema.gov",
      dni: "45-746-6666"
    },
    {
      legajo: 69,
      nombre: "Clary Mattiassi",
      email: "cmattiassi1w@nba.com",
      dni: "58-192-6482"
    },
    {
      legajo: 70,
      nombre: "Yelena Brisland",
      email: "ybrisland1x@nyu.edu",
      dni: "38-365-9339"
    },
    {
      legajo: 71,
      nombre: "Myrlene Ruggs",
      email: "mruggs1y@infoseek.co.jp",
      dni: "26-592-9889"
    },
    {
      legajo: 72,
      nombre: "Irma Butchers",
      email: "ibutchers1z@archive.org",
      dni: "24-728-6308"
    },
    {
      legajo: 73,
      nombre: "Tiffany Stolworthy",
      email: "tstolworthy20@cmu.edu",
      dni: "89-519-1277"
    },
    {
      legajo: 74,
      nombre: "Ryon Eginton",
      email: "reginton21@google.cn",
      dni: "81-888-9530"
    },
    {
      legajo: 75,
      nombre: "Agnese Hobgen",
      email: "ahobgen22@merriam-webster.com",
      dni: "11-374-9758"
    },
    {
      legajo: 76,
      nombre: "Ruth Eastbrook",
      email: "reastbrook23@examiner.com",
      dni: "01-375-5465"
    },
    {
      legajo: 77,
      nombre: "Jose Frere",
      email: "jfrere24@devhub.com",
      dni: "82-363-9895"
    },
    {
      legajo: 78,
      nombre: "Cesaro Boullen",
      email: "cboullen25@moonfruit.com",
      dni: "14-036-8493"
    },
    {
      legajo: 79,
      nombre: "Linea Hansed",
      email: "lhansed26@boston.com",
      dni: "77-191-7764"
    },
    {
      legajo: 80,
      nombre: "Mirabelle Lockwood",
      email: "mlockwood27@gnu.org",
      dni: "05-751-0647"
    },
    {
      legajo: 81,
      nombre: "Adara Wellfare",
      email: "awellfare28@myspace.com",
      dni: "73-525-8639"
    },
    {
      legajo: 82,
      nombre: "Letti Dudney",
      email: "ldudney29@nature.com",
      dni: "33-485-4254"
    },
    {
      legajo: 83,
      nombre: "Lin Pettipher",
      email: "lpettipher2a@meetup.com",
      dni: "02-258-4486"
    },
    {
      legajo: 84,
      nombre: "Crystie Gommery",
      email: "cgommery2b@imageshack.us",
      dni: "53-711-5542"
    },
    {
      legajo: 85,
      nombre: "Craggie Beningfield",
      email: "cbeningfield2c@nbcnews.com",
      dni: "77-837-5477"
    },
    {
      legajo: 86,
      nombre: "Rorke Hylands",
      email: "rhylands2d@tripod.com",
      dni: "49-247-7267"
    },
    {
      legajo: 87,
      nombre: "Ryley De Coursey",
      email: "rde2e@webmd.com",
      dni: "78-845-9401"
    },
    {
      legajo: 88,
      nombre: "Dulcie De Antoni",
      email: "dde2f@bigcartel.com",
      dni: "59-854-5026"
    },
    {
      legajo: 89,
      nombre: "Paige Gerasch",
      email: "pgerasch2g@irs.gov",
      dni: "87-255-0780"
    },
    {
      legajo: 90,
      nombre: "Rossy Enriquez",
      email: "renriquez2h@slashdot.org",
      dni: "47-152-4632"
    },
    {
      legajo: 91,
      nombre: "Danyette Tofano",
      email: "dtofano2i@i2i.jp",
      dni: "54-263-4299"
    },
    {
      legajo: 92,
      nombre: "See Chattey",
      email: "schattey2j@hud.gov",
      dni: "37-547-1331"
    },
    {
      legajo: 93,
      nombre: "Calhoun Parsonage",
      email: "cparsonage2k@uiuc.edu",
      dni: "27-902-1183"
    },
    {
      legajo: 94,
      nombre: "Claudio Hercules",
      email: "chercules2l@sina.com.cn",
      dni: "27-394-8208"
    },
    {
      legajo: 95,
      nombre: "Judas Realy",
      email: "jrealy2m@deviantart.com",
      dni: "33-527-3220"
    },
    {
      legajo: 96,
      nombre: "Edsel Weakley",
      email: "eweakley2n@cyberchimps.com",
      dni: "49-656-0827"
    },
    {
      legajo: 97,
      nombre: "Jennee Boskell",
      email: "jboskell2o@paginegialle.it",
      dni: "30-318-8540"
    },
    {
      legajo: 98,
      nombre: "Cassandry McGahey",
      email: "cmcgahey2p@about.com",
      dni: "23-813-5907"
    },
    {
      legajo: 99,
      nombre: "Georgia Lopez",
      email: "glopez2q@phpbb.com",
      dni: "65-012-8874"
    },
    {
      legajo: 100,
      nombre: "Henrik Camerello",
      email: "hcamerello2r@reference.com",
      dni: "61-271-0892"
    }
  ];
}

