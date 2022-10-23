import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faFileInvoiceDollar, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  searchIcon = faSearch;
  paymentIcon = faFileInvoiceDollar;

  // @ViewChild('modal') modal : ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  search(event:Event) {
    return event;
  }

  ingresos = [
    {
      comprobante: 1,
      email: "cianiello0@digg.com",
      fecha: "28/10/2021",
      actividad: "middleware",
      tipoTarifa: "Mensual",
      monto: 1826,
      estado: "Aprobado"
    },
    {
      comprobante: 2,
      email: "odoughty1@engadget.com",
      fecha: "26/02/2022",
      actividad: "implementation",
      tipoTarifa: "Mensual",
      monto: 2144,
      estado: "Aprobado"
    },
    {
      comprobante: 3,
      email: "jbatie2@bandcamp.com",
      fecha: "07/02/2022",
      actividad: "Ameliorated",
      tipoTarifa: "Mensual",
      monto: 2595,
      estado: "Aprobado"
    },
    {
      comprobante: 4,
      email: "nhenrichsen3@economist.com",
      fecha: "17/05/2022",
      actividad: "Switchable",
      tipoTarifa: "Mensual",
      monto: 2359,
      estado: "Aprobado"
    },
    {
      comprobante: 5,
      email: "heckart4@icio.us",
      fecha: "31/08/2022",
      actividad: "heuristic",
      tipoTarifa: "Mensual",
      monto: 2608,
      estado: "Aprobado"
    },
    {
      comprobante: 6,
      email: "cmeekins5@moonfruit.com",
      fecha: "28/05/2022",
      actividad: "solution-oriented",
      tipoTarifa: "Mensual",
      monto: 2480,
      estado: "Aprobado"
    },
    {
      comprobante: 7,
      email: "fpoate6@devhub.com",
      fecha: "22/10/2021",
      actividad: "approach",
      tipoTarifa: "Mensual",
      monto: 3298,
      estado: "Aprobado"
    },
    {
      comprobante: 8,
      email: "kellesmere7@imgur.com",
      fecha: "05/06/2022",
      actividad: "functionalities",
      tipoTarifa: "Mensual",
      monto: 2758,
      estado: "Aprobado"
    },
    {
      comprobante: 9,
      email: "mrate8@imgur.com",
      fecha: "18/04/2022",
      actividad: "project",
      tipoTarifa: "Mensual",
      monto: 3721,
      estado: "Aprobado"
    },
    {
      comprobante: 10,
      email: "ccoverley9@nasa.gov",
      fecha: "08/06/2022",
      actividad: "explicit",
      tipoTarifa: "Mensual",
      monto: 3554,
      estado: "Aprobado"
    },
    {
      comprobante: 11,
      email: "cplacstonea@oracle.com",
      fecha: "13/08/2022",
      actividad: "hierarchy",
      tipoTarifa: "Mensual",
      monto: 1738,
      estado: "Aprobado"
    },
    {
      comprobante: 12,
      email: "jtathacottb@springer.com",
      fecha: "27/08/2022",
      actividad: "project",
      tipoTarifa: "Mensual",
      monto: 2678,
      estado: "Aprobado"
    },
    {
      comprobante: 13,
      email: "gstruttc@ifeng.com",
      fecha: "21/02/2022",
      actividad: "Reduced",
      tipoTarifa: "Mensual",
      monto: 2215,
      estado: "Aprobado-tiered"
    },
    {
      comprobante: 14,
      email: "mholtond@cisco.com",
      fecha: "19/12/2021",
      actividad: "algorithm",
      tipoTarifa: "Mensual",
      monto: 3153,
      estado: "Aprobado"
    },
    {
      comprobante: 15,
      email: "pbirchille@livejournal.com",
      fecha: "11/01/2022",
      actividad: "real-time",
      tipoTarifa: "Mensual",
      monto: 3785,
      estado: "Aprobado"
    },
    {
      comprobante: 16,
      email: "fpettegref@bluehost.com",
      fecha: "01/10/2021",
      actividad: "collaboration",
      tipoTarifa: "Mensual",
      monto: 1148,
      estado: "Aprobado"
    },
    {
      comprobante: 17,
      email: "jtrumpg@storify.com",
      fecha: "16/06/2022",
      actividad: "solution",
      tipoTarifa: "Mensual",
      monto: 2600,
      estado: "Aprobado"
    },
    {
      comprobante: 18,
      email: "jclemmensenh@nature.com",
      fecha: "30/03/2022",
      actividad: "client-server",
      tipoTarifa: "Mensual",
      monto: 2370,
      estado: "Aprobado"
    },
    {
      comprobante: 19,
      email: "aofallownei@kickstarter.com",
      fecha: "25/10/2021",
      actividad: "moratorium",
      tipoTarifa: "Mensual",
      monto: 1217,
      estado: "Aprobado engine"
    },
    {
      comprobante: 20,
      email: "koldacresj@sina.com.cn",
      fecha: "25/04/2022",
      actividad: "Phased",
      tipoTarifa: "Mensual",
      monto: 1678,
      estado: "time-Aprobado"
    },
    {
      comprobante: 21,
      email: "stwinberrowk@mayoclinic.com",
      fecha: "07/09/2022",
      actividad: "focus group",
      tipoTarifa: "Mensual",
      monto: 2913,
      estado: "Aprobado"
    },
    {
      comprobante: 22,
      email: "amynottl@homestead.com",
      fecha: "27/07/2022",
      actividad: "strategy",
      tipoTarifa: "Mensual",
      monto: 1791,
      estado: "Aprobado-lateral"
    },
    {
      comprobante: 23,
      email: "rlejeanm@businesswire.com",
      fecha: "30/08/2022",
      actividad: "multi-tasking",
      tipoTarifa: "Mensual",
      monto: 3429,
      estado: "Aprobado"
    },
    {
      comprobante: 24,
      email: "ahobgenn@myspace.com",
      fecha: "22/06/2022",
      actividad: "knowledge user",
      tipoTarifa: "Mensual",
      monto: 2717,
      estado: "Aprobado"
    },
    {
      comprobante: 25,
      email: "jbushello@facebook.com",
      fecha: "16/10/2021",
      actividad: "help-desk",
      tipoTarifa: "Mensual",
      monto: 2403,
      estado: "Aprobado"
    },
    {
      comprobante: 26,
      email: "bocosgrap@prlog.org",
      fecha: "23/07/2022",
      actividad: "methodology",
      tipoTarifa: "Mensual",
      monto: 1801,
      estado: "Aprobado"
    },
    {
      comprobante: 27,
      email: "ckiggelq@livejournal.com",
      fecha: "09/06/2022",
      actividad: "Secured",
      tipoTarifa: "Mensual",
      monto: 2936,
      estado: "Aprobado"
    },
    {
      comprobante: 28,
      email: "sragbournr@twitpic.com",
      fecha: "04/02/2022",
      actividad: "open architecture",
      tipoTarifa: "Mensual",
      monto: 1780,
      estado: "Aprobado"
    },
    {
      comprobante: 29,
      email: "gsteddalls@usa.gov",
      fecha: "13/11/2021",
      actividad: "national",
      tipoTarifa: "Mensual",
      monto: 1189,
      estado: "Aprobado"
    },
    {
      comprobante: 30,
      email: "rhartint@umn.edu",
      fecha: "24/06/2022",
      actividad: "Optional",
      tipoTarifa: "Mensual",
      monto: 2489,
      estado: "Aprobado"
    },
    {
      comprobante: 31,
      email: "rscothorneu@newsvine.com",
      fecha: "06/03/2022",
      actividad: "national",
      tipoTarifa: "Mensual",
      monto: 3816,
      estado: "Aprobado-group"
    },
    {
      comprobante: 32,
      email: "mshepperdv@istockphoto.com",
      fecha: "25/06/2022",
      actividad: "Optimized",
      tipoTarifa: "Mensual",
      monto: 1606,
      estado: "Aprobado"
    },
    {
      comprobante: 33,
      email: "sheinelw@senate.gov",
      fecha: "06/08/2022",
      actividad: "Realigned",
      tipoTarifa: "Mensual",
      monto: 2650,
      estado: "Aprobado-oriented"
    },
    {
      comprobante: 34,
      email: "ssneppx@myspace.com",
      fecha: "14/03/2022",
      actividad: "hybrid",
      tipoTarifa: "Mensual",
      monto: 3962,
      estado: "Aprobado"
    },
    {
      comprobante: 35,
      email: "kgalsworthyy@theguardian.com",
      fecha: "16/03/2022",
      actividad: "initiative",
      tipoTarifa: "Mensual",
      monto: 2554,
      estado: "Aprobado"
    },
    {
      comprobante: 36,
      email: "jgristhwaitez@soundcloud.com",
      fecha: "10/06/2022",
      actividad: "Reverse-engineered",
      tipoTarifa: "Mensual",
      monto: 1125,
      estado: "Aprobado"
    },
    {
      comprobante: 37,
      email: "jvagges10@ed.gov",
      fecha: "14/06/2022",
      actividad: "De-engineered",
      tipoTarifa: "Mensual",
      monto: 3424,
      estado: "Aprobado"
    },
    {
      comprobante: 38,
      email: "jblazevic11@hhs.gov",
      fecha: "01/03/2022",
      actividad: "coherent",
      tipoTarifa: "Mensual",
      monto: 3652,
      estado: "Aprobado"
    },
    {
      comprobante: 39,
      email: "abroadberry12@unesco.org",
      fecha: "27/03/2022",
      actividad: "hardware",
      tipoTarifa: "Mensual",
      monto: 2526,
      estado: "Aprobado"
    },
    {
      comprobante: 40,
      email: "mdeignan13@examiner.com",
      fecha: "26/07/2022",
      actividad: "Universal",
      tipoTarifa: "Mensual",
      monto: 3369,
      estado: "Aprobado"
    },
    {
      comprobante: 41,
      email: "cmcwilliams14@state.gov",
      fecha: "19/05/2022",
      actividad: "web-enabled",
      tipoTarifa: "Mensual",
      monto: 1253,
      estado: "Aprobado"
    },
    {
      comprobante: 42,
      email: "naingell15@senate.gov",
      fecha: "07/12/2021",
      actividad: "circuit",
      tipoTarifa: "Mensual",
      monto: 1153,
      estado: "high-Aprobado"
    },
    {
      comprobante: 43,
      email: "adrains16@xrea.com",
      fecha: "25/09/2022",
      actividad: "asynchronous",
      tipoTarifa: "Mensual",
      monto: 2717,
      estado: "Aprobado-line"
    },
    {
      comprobante: 44,
      email: "kdungee17@nydailynews.com",
      fecha: "15/09/2022",
      actividad: "service-desk",
      tipoTarifa: "Mensual",
      monto: 2220,
      estado: "Aprobado"
    },
    {
      comprobante: 45,
      email: "cblasius18@nba.com",
      fecha: "30/11/2021",
      actividad: "disintermediate",
      tipoTarifa: "Mensual",
      monto: 2947,
      estado: "Aprobado"
    },
    {
      comprobante: 46,
      email: "cgipson19@symantec.com",
      fecha: "28/07/2022",
      actividad: "well-modulated",
      tipoTarifa: "Mensual",
      monto: 1222,
      estado: "Aprobado-tasking"
    },
    {
      comprobante: 47,
      email: "rsprey1a@1688.com",
      fecha: "05/09/2022",
      actividad: "Fundamental",
      tipoTarifa: "Mensual",
      monto: 2615,
      estado: "Aprobado"
    },
    {
      comprobante: 48,
      email: "hfigliovanni1b@state.gov",
      fecha: "28/11/2021",
      actividad: "demand-driven",
      tipoTarifa: "Mensual",
      monto: 3261,
      estado: "Aprobado"
    },
    {
      comprobante: 49,
      email: "lparmiter1c@macromedia.com",
      fecha: "04/11/2021",
      actividad: "asymmetric",
      tipoTarifa: "Mensual",
      monto: 1196,
      estado: "Aprobado"
    },
    {
      comprobante: 50,
      email: "bpionter1d@dropbox.com",
      fecha: "08/09/2022",
      actividad: "pricing structure",
      tipoTarifa: "Mensual",
      monto: 1364,
      estado: "Aprobado"
    },
    {
      comprobante: 51,
      email: "cgoldie1e@gizmodo.com",
      fecha: "25/09/2022",
      actividad: "service-desk",
      tipoTarifa: "Mensual",
      monto: 3297,
      estado: "Aprobado"
    },
    {
      comprobante: 52,
      email: "ncurnokk1f@bloglines.com",
      fecha: "24/09/2022",
      actividad: "Managed",
      tipoTarifa: "Mensual",
      monto: 3096,
      estado: "Aprobado"
    },
    {
      comprobante: 53,
      email: "tnutkins1g@php.net",
      fecha: "06/11/2021",
      actividad: "Programmable",
      tipoTarifa: "Mensual",
      monto: 2611,
      estado: "Aprobado"
    },
    {
      comprobante: 54,
      email: "cbalfour1h@etsy.com",
      fecha: "25/07/2022",
      actividad: "flexibility",
      tipoTarifa: "Mensual",
      monto: 2477,
      estado: "Aprobado"
    },
    {
      comprobante: 55,
      email: "rjoel1i@squarespace.com",
      fecha: "24/03/2022",
      actividad: "parallelism",
      tipoTarifa: "Mensual",
      monto: 2098,
      estado: "Aprobado"
    },
    {
      comprobante: 56,
      email: "seymer1j@gov.uk",
      fecha: "06/08/2022",
      actividad: "local",
      tipoTarifa: "Mensual",
      monto: 3066,
      estado: "Aprobado"
    },
    {
      comprobante: 57,
      email: "dsmetoun1k@dedecms.com",
      fecha: "03/11/2021",
      actividad: "Stand-alone",
      tipoTarifa: "Mensual",
      monto: 2487,
      estado: "Aprobado"
    },
    {
      comprobante: 58,
      email: "jduchateau1l@youtube.com",
      fecha: "24/05/2022",
      actividad: "discrete",
      tipoTarifa: "Mensual",
      monto: 2504,
      estado: "Aprobado"
    },
    {
      comprobante: 59,
      email: "bstruys1m@nsw.gov.au",
      fecha: "01/03/2022",
      actividad: "composite",
      tipoTarifa: "Mensual",
      monto: 2188,
      estado: "Aprobado"
    },
    {
      comprobante: 60,
      email: "koborne1n@yolasite.com",
      fecha: "05/03/2022",
      actividad: "regional",
      tipoTarifa: "Mensual",
      monto: 2773,
      estado: "Aprobado"
    },
    {
      comprobante: 61,
      email: "mtalloe1o@telegraph.co.uk",
      fecha: "24/10/2021",
      actividad: "tangible",
      tipoTarifa: "Mensual",
      monto: 1811,
      estado: "Aprobado"
    },
    {
      comprobante: 62,
      email: "plidstone1p@tumblr.com",
      fecha: "06/04/2022",
      actividad: "Synchronised",
      tipoTarifa: "Mensual",
      monto: 3078,
      estado: "Aprobado"
    },
    {
      comprobante: 63,
      email: "cgreatreax1q@goodreads.com",
      fecha: "23/12/2021",
      actividad: "firmware",
      tipoTarifa: "Mensual",
      monto: 2365,
      estado: "Pre-Aprobado"
    },
    {
      comprobante: 64,
      email: "lcawthorn1r@vinaora.com",
      fecha: "09/12/2021",
      actividad: "needs-based",
      tipoTarifa: "Mensual",
      monto: 3814,
      estado: "Aprobado"
    },
    {
      comprobante: 65,
      email: "llacaze1s@free.fr",
      fecha: "24/11/2021",
      actividad: "bi-directional",
      tipoTarifa: "Mensual",
      monto: 2579,
      estado: "Aprobado"
    },
    {
      comprobante: 66,
      email: "hkrollmann1t@rediff.com",
      fecha: "01/11/2021",
      actividad: "Persistent",
      tipoTarifa: "Mensual",
      monto: 2558,
      estado: "Aprobado"
    },
    {
      comprobante: 67,
      email: "cbockings1u@si.edu",
      fecha: "13/08/2022",
      actividad: "Managed",
      tipoTarifa: "Mensual",
      monto: 1033,
      estado: "Aprobado"
    },
    {
      comprobante: 68,
      email: "jasplin1v@msn.com",
      fecha: "24/03/2022",
      actividad: "architecture",
      tipoTarifa: "Mensual",
      monto: 1343,
      estado: "Aprobado"
    },
    {
      comprobante: 69,
      email: "mwainwright1w@sohu.com",
      fecha: "23/11/2021",
      actividad: "Versatile",
      tipoTarifa: "Mensual",
      monto: 2333,
      estado: "Aprobado-key"
    },
    {
      comprobante: 70,
      email: "mhaker1x@xinhuanet.com",
      fecha: "18/06/2022",
      actividad: "application",
      tipoTarifa: "Mensual",
      monto: 2424,
      estado: "Aprobado-sized"
    },
    {
      comprobante: 71,
      email: "jglassard1y@examiner.com",
      fecha: "01/01/2022",
      actividad: "bifurcated",
      tipoTarifa: "Mensual",
      monto: 1120,
      estado: "Aprobado-net"
    },
    {
      comprobante: 72,
      email: "rglasser1z@hibu.com",
      fecha: "08/01/2022",
      actividad: "6th generation",
      tipoTarifa: "Mensual",
      monto: 1714,
      estado: "Aprobado structure"
    },
    {
      comprobante: 73,
      email: "ksummerson20@nps.gov",
      fecha: "13/05/2022",
      actividad: "groupware",
      tipoTarifa: "Mensual",
      monto: 3059,
      estado: "Aprobado"
    },
    {
      comprobante: 74,
      email: "apassby21@jiathis.com",
      fecha: "13/03/2022",
      actividad: "Intuitive",
      tipoTarifa: "Mensual",
      monto: 2976,
      estado: "Up-Aprobado"
    },
    {
      comprobante: 75,
      email: "hilyinykh22@who.int",
      fecha: "11/11/2021",
      actividad: "hub",
      tipoTarifa: "Mensual",
      monto: 2351,
      estado: "Aprobado-state"
    },
    {
      comprobante: 76,
      email: "rkeavy23@soup.io",
      fecha: "24/04/2022",
      actividad: "Intuitive",
      tipoTarifa: "Mensual",
      monto: 1009,
      estado: "Aprobado-resource"
    },
    {
      comprobante: 77,
      email: "bcustance24@unesco.org",
      fecha: "22/01/2022",
      actividad: "interactive",
      tipoTarifa: "Mensual",
      monto: 1411,
      estado: "Aprobado"
    },
    {
      comprobante: 78,
      email: "khiscocks25@census.gov",
      fecha: "01/10/2021",
      actividad: "Progressive",
      tipoTarifa: "Mensual",
      monto: 3855,
      estado: "Aprobado"
    },
    {
      comprobante: 79,
      email: "clomb26@usnews.com",
      fecha: "15/12/2021",
      actividad: "help-desk",
      tipoTarifa: "Mensual",
      monto: 1810,
      estado: "Aprobado"
    },
    {
      comprobante: 80,
      email: "iwarkup27@pen.io",
      fecha: "01/06/2022",
      actividad: "Organic",
      tipoTarifa: "Mensual",
      monto: 2730,
      estado: "Aprobado-added"
    },
    {
      comprobante: 81,
      email: "selse28@auda.org.au",
      fecha: "08/05/2022",
      actividad: "Multi-tiered",
      tipoTarifa: "Mensual",
      monto: 3302,
      estado: "Aprobado"
    },
    {
      comprobante: 82,
      email: "jbaxstare29@histats.com",
      fecha: "30/06/2022",
      actividad: "success",
      tipoTarifa: "Mensual",
      monto: 3909,
      estado: "Aprobado"
    },
    {
      comprobante: 83,
      email: "evockings2a@mashable.com",
      fecha: "11/08/2022",
      actividad: "Centralized",
      tipoTarifa: "Mensual",
      monto: 2614,
      estado: "Aprobado"
    },
    {
      comprobante: 84,
      email: "mpiggins2b@imdb.com",
      fecha: "19/04/2022",
      actividad: "core",
      tipoTarifa: "Mensual",
      monto: 2683,
      estado: "Aprobado-line"
    },
    {
      comprobante: 85,
      email: "vmallebone2c@walmart.com",
      fecha: "25/07/2022",
      actividad: "Cloned",
      tipoTarifa: "Mensual",
      monto: 2691,
      estado: "Aprobado-focused"
    },
    {
      comprobante: 86,
      email: "cdealtry2d@symantec.com",
      fecha: "17/10/2021",
      actividad: "upward-trending",
      tipoTarifa: "Mensual",
      monto: 3044,
      estado: "Aprobado"
    },
    {
      comprobante: 87,
      email: "mmaccole2e@ucsd.edu",
      fecha: "09/09/2022",
      actividad: "exuding",
      tipoTarifa: "Mensual",
      monto: 2835,
      estado: "Aprobado"
    },
    {
      comprobante: 88,
      email: "nwillingam2f@so-net.ne.jp",
      fecha: "24/09/2022",
      actividad: "Diverse",
      tipoTarifa: "Mensual",
      monto: 2406,
      estado: "Aprobado"
    },
    {
      comprobante: 89,
      email: "vjuza2g@blogs.com",
      fecha: "13/04/2022",
      actividad: "pricing structure",
      tipoTarifa: "Mensual",
      monto: 2019,
      estado: "Aprobado area network"
    },
    {
      comprobante: 90,
      email: "spersicke2h@dot.gov",
      fecha: "11/05/2022",
      actividad: "multi-state",
      tipoTarifa: "Mensual",
      monto: 3468,
      estado: "Aprobado"
    },
    {
      comprobante: 91,
      email: "baubury2i@accuweather.com",
      fecha: "16/11/2021",
      actividad: "mission-critical",
      tipoTarifa: "Mensual",
      monto: 2320,
      estado: "Aprobado"
    },
    {
      comprobante: 92,
      email: "leva2j@sitemeter.com",
      fecha: "14/12/2021",
      actividad: "bifurcated",
      tipoTarifa: "Mensual",
      monto: 2034,
      estado: "Aprobado"
    },
    {
      comprobante: 93,
      email: "ckillough2k@pinterest.com",
      fecha: "27/05/2022",
      actividad: "Reactive",
      tipoTarifa: "Mensual",
      monto: 2013,
      estado: "Aprobado"
    },
    {
      comprobante: 94,
      email: "rmorris2l@g.co",
      fecha: "27/05/2022",
      actividad: "Networked",
      tipoTarifa: "Mensual",
      monto: 3011,
      estado: "Aprobado area network"
    },
    {
      comprobante: 95,
      email: "gdils2m@usda.gov",
      fecha: "05/12/2021",
      actividad: "superstructure",
      tipoTarifa: "Mensual",
      monto: 2125,
      estado: "Aprobado"
    },
    {
      comprobante: 96,
      email: "ahazley2n@marriott.com",
      fecha: "29/05/2022",
      actividad: "content-based",
      tipoTarifa: "Mensual",
      monto: 2343,
      estado: "Aprobado"
    },
    {
      comprobante: 97,
      email: "aivanishev2o@bluehost.com",
      fecha: "10/02/2022",
      actividad: "optimal",
      tipoTarifa: "Mensual",
      monto: 2433,
      estado: "Aprobado"
    },
    {
      comprobante: 98,
      email: "rleel2p@omniture.com",
      fecha: "04/04/2022",
      actividad: "tangible",
      tipoTarifa: "Mensual",
      monto: 3061,
      estado: "Aprobado"
    },
    {
      comprobante: 99,
      email: "nscawn2q@blog.com",
      fecha: "04/04/2022",
      actividad: "Triple-buffered",
      tipoTarifa: "Mensual",
      monto: 2688,
      estado: "Aprobado"
    },
    {
      comprobante: 100,
      email: "peteen2r@dailymail.co.uk",
      fecha: "28/06/2022",
      actividad: "Self-enabling",
      tipoTarifa: "Mensual",
      monto: 2493,
      estado: "Aprobado"
    }
  ]

}
