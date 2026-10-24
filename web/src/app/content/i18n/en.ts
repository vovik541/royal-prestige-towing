/**
 * English dictionary — the source of truth for every visible string.
 * uk.ts and ru.ts are typed as `Dict`, so a missing or extra key fails the build.
 * Placeholders in braces, e.g. {n}, are filled by `fmt()`.
 */
export const en = {
  meta: {
    langName: 'English',
    locale: 'en_US',
    siteName: 'Royal Prestige Towing',
    skip: 'Skip to content',
  },

  nav: {
    home: 'Home',
    services: 'Services',
    work: 'Our work',
    about: 'About',
    areas: 'Service areas',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    primary: 'Primary navigation',
    mobile: 'Site navigation',
    breadcrumb: 'Breadcrumb',
    homeLink: 'Royal Prestige Towing, home',
  },

  common: {
    allServices: 'All services',
    viewAllWork: 'View all projects',
    learnMore: 'Learn more',
    phone: 'Phone',
    callNow: 'Call Now',
    callSerhii: 'Call Serhii',
    callQuote: 'Call for a Quote',
    textQuote: 'Text for a Quote',
    callAria: 'Call Royal Prestige Towing at {phone}',
    textUs: 'Text Us',
    smsAria: 'Text Royal Prestige Towing at {phone}',
    contactActions: 'Call or text',
    pictured: 'Pictured',
    enlarge: 'Enlarge photo: {name}',
    photoViewer: 'Photo viewer',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    closeViewer: 'Close',
    photoCount: 'Photo {i} of {n}',
    scrollBack: 'Scroll back',
    scrollForward: 'Scroll forward',
    securedAtFour: 'Secured at four wheels',
  },

  loadTypes: {
    everyday: {
      short: 'Everyday cars',
      hint: 'Sedans, coupes, SUVs',
    },
    auction: {
      short: 'Auction pickups',
      hint: 'Copart, IAA, ADESA yards',
    },
    exotic: {
      short: 'Exotic & sports',
      hint: 'McLaren, Lamborghini',
    },
    machinery: {
      short: 'Machinery',
      hint: 'Lathes, mills, equipment',
    },
  },


  photos: {
    'mclaren-side': { alt: 'Orange McLaren 720S Spider strapped by its wheels to the RPT car-hauler deck', caption: 'McLaren 720S Spider' },
    'mclaren-front': { alt: 'McLaren 720S Spider on the RPT trailer, front three-quarter view', caption: 'McLaren 720S Spider' },
    'mclaren-rear': { alt: 'McLaren 720S Spider from behind, with a strap running to each wheel', caption: 'McLaren 720S Spider, strapped' },
    'lamborghini-urus': { alt: 'White Lamborghini Urus secured on the RPT trailer behind a pickup truck', caption: 'Lamborghini Urus' },
    'bmw-alpina': { alt: 'Dusty silver BMW Alpina sedan strapped on the trailer', caption: 'BMW Alpina B10' },
    'mercedes-sedan': { alt: 'Black Mercedes-Benz sedan on the trailer', caption: 'Mercedes-Benz E-Class' },
    'vw-beetle': { alt: 'Silver Volkswagen Beetle on the trailer', caption: 'Volkswagen Beetle' },
    'volvo-c70': { alt: 'Light blue Volvo C70 convertible strapped on the trailer', caption: 'Volvo C70' },
    'cargo-van': { alt: 'White Ram ProMaster high-roof cargo van on the trailer', caption: 'Ram ProMaster van' },
    'milling-machine': { alt: 'Vertical milling machine chained and strapped to the trailer deck', caption: 'Vertical milling machine' },
    'lathe-forklift': { alt: 'Shrink-wrapped metal lathe on the trailer beside a forklift', caption: 'Engine lathe, forklift-loaded' },
    'lathe-secured': { alt: 'Wrapped metal lathe strapped down on the trailer', caption: 'Engine lathe, strapped' },
    'vintage-microtruck': { alt: 'Small vintage utility vehicle strapped on the trailer', caption: 'Vintage micro-truck' },
    'owner-serhii': { alt: 'Serhii Hoida, owner of Royal Prestige Towing', caption: 'Serhii Hoida' },
  },

  home: {
    seo: {
      title: 'Flatbed Towing & Vehicle Transport Sacramento | Royal Prestige Towing',
      description: 'Owner-operated flatbed vehicle transport based in Sacramento: everyday cars, auto auction pickups, exotics and equipment. Serving Greater Sacramento, Northern California and Bay Area routes. Call or text.',
    },
    hero: {
      kicker: 'Flatbed vehicle & equipment transport in Sacramento & Northern California',
      titleA: 'Every load,',
      titleB: 'handled like a McLaren.',
      lede: 'Owner-operated flatbed transport from Sacramento for everyday cars and SUVs, auction purchases, exotics and machinery — around Greater Sacramento and on routes across Northern California, including San Francisco. Loaded slowly, strapped at the wheels, delivered by the person you spoke to.',
    },
    indexLabel: 'What we transport',
    position: {
      title: 'Premium care isn’t only for premium cars.',
      body: 'A McLaren and a ten-year-old sedan ride on the same deck, get the same straps and the same attention. That’s the idea behind RPT: the care people expect for a six-figure car, applied to whatever you need moved.',
      principles: [
        { title: 'Straps at the wheels', text: 'Never hooked to suspension or frame.' },
        { title: 'Loaded slowly', text: 'Clearance checked before the ramp.' },
        { title: 'One person, start to finish', text: 'The owner quotes, loads and delivers.' },
      ],
    },
    exotic: {
      title: 'Low, wide and irreplaceable.',
      lede: 'Supercars ask for patience more than muscle. Here’s how they ride with us.',
      method: [
        { title: 'Tires, not frame', text: 'Ratchet straps loop over the wheels — as on this 720S. No hooks on suspension arms, no chains near paint.' },
        { title: 'Slow on the ramp', text: 'Clearance is checked before loading. If the approach is tight, we stop and solve it rather than scrape it.' },
        { title: 'Eyes on it the whole way', text: 'The person who strapped it down is the person driving it. No hand-offs between trucks.' },
      ],
      cta: 'Exotic car transport',
    },
    projects: {
      title: 'Selected transport projects',
      lede: 'Real loads, photographed on our deck.',
      more: 'More from the deck',
      featured: {
        'mclaren-front': 'Exotic · Low-clearance loading, wheel straps',
        'lamborghini-urus': 'Exotic SUV · Secured at four wheels',
        'lathe-forklift': 'Machinery · Forklift-loaded, wrapped, blocked',
      },
    },
    areas: {
      title: 'Based in Sacramento',
      body: 'Based in Sacramento, Royal Prestige Towing provides flatbed vehicle and equipment transport across Greater Sacramento and selected routes throughout Northern California, including San Francisco and the Bay Area. Tell us where your vehicle needs to go, and Serhii will confirm availability and give you a route-specific quote.',
      cta: 'Service areas',
    },
    process: {
      title: 'How a transport works',
      steps: [
        { title: 'Tell us the load', text: 'What it is, where it is and where it’s going. Photos help, especially for machinery.' },
        { title: 'Get a clear quote', text: 'A price for your route and load, and a pickup window that works for you.' },
        { title: 'Loaded and secured', text: 'Clearance checked, loaded slowly, strapped at the wheels or blocked and wrapped.' },
        { title: 'Delivered in person', text: 'Unloaded at the destination and handed over by the person who drove it.' },
      ],
    },
    faqTitle: 'Questions people ask',
  },

  owner: {
    title: 'You’ll deal with Serhii.',
    role: 'Owner, Royal Prestige Towing',
    lede: 'Royal Prestige Towing is Serhii Hoida’s own business. When you call, you reach the person who will quote your job, load your vehicle and hand it back at the other end.',
    steps: [
      { title: 'He answers', text: 'Your questions go to the owner, not a dispatch desk.' },
      { title: 'He loads', text: 'He checks clearance, loads and straps down your vehicle himself.' },
      { title: 'He delivers', text: 'The same person hands it over at the destination.' },
    ],
    note: 'If a load isn’t a good fit for our trailer, he’ll tell you up front.',
  },

  faq: [
    { q: 'Is RPT only for luxury cars?', a: 'No. Everyday cars are most of what we do, along with auction pickups, exotics and equipment — and every load gets the same care.' },
    { q: 'Can you pick up a car I bought at auction?', a: 'Yes. We pick up from participating auction yards around Sacramento, such as Copart and IAA locations, once the vehicle is released to you. Call or text with the auction, lot number and destination.' },
    { q: 'Do you use an open or enclosed trailer?', a: 'The loads on this site traveled on our open flatbed car-hauler. If your vehicle needs enclosed transport, mention it in your request and we’ll talk through options.' },
    { q: 'Can you move machinery that has to be lifted on?', a: 'Yes, when there’s a forklift or loading equipment on site — like the lathe in our photos. Send dimensions, weight and a photo, and we’ll tell you whether it fits.' },
    { q: 'Can you take a vehicle that doesn’t run?', a: 'Tell us whether it rolls, steers and brakes. We’ll confirm before pickup whether we can load it safely.' },
    { q: 'How is the price worked out?', a: 'By distance, the type of load and how easy pickup and drop-off are. Send a request and you’ll get one clear number.' },
    { q: 'Do you go to San Francisco and the Bay Area?', a: 'Yes. Sacramento to San Francisco and other Bay Area routes run as scheduled, longer-distance transport — planned in advance and quoted for your specific route.' },
    { q: 'How do I pay?', a: 'Zelle or cash. Payment is arranged directly with Serhii — there’s no online checkout.' },
  ],

  finalCta: {
    titleA: 'Tell us what’s going',
    titleB: 'on the deck.',
    lede: 'Call or text Serhii with the vehicle and the route. He’ll come back to you personally with a clear, route-specific quote.',
  },

  services: {
    seo: {
      title: 'Vehicle & Equipment Transport Services Sacramento | Royal Prestige Towing',
      description: 'Flatbed transport from Sacramento for everyday cars and SUVs, auto auction pickups, exotic cars and machinery — locally around Sacramento and on longer Northern California routes.',
    },
    title: 'Transport services',
    intro: 'One trailer, one owner, and the same careful method for every load — from a supercar to a shop lathe, around Sacramento or on a longer Northern California route. Choose a service to see how it works.',
    cardCta: 'How it works',
    otherServices: 'Other services',
    askTitle: 'What we’ll ask you',
    faqTitle: 'Common questions',
    photosTitle: 'From the deck',
    ctaTitle: 'Ready to plan this transport?',
    ctaText: 'Call or text Serhii with these details for a route-specific quote.',
    items: {
      'exotic-car-transport': {
        name: 'Luxury & exotic car transport',
        short: 'McLaren, Lamborghini and other low, wide, high-value cars — loaded slowly and strapped at the wheels.',
        seo: {
          title: 'Exotic & Luxury Car Transport, Sacramento & Northern California | Royal Prestige Towing',
          description: 'Luxury and exotic car transport from Sacramento across Northern California: low-clearance loading checked before the ramp, straps over the tires, one owner-driver from pickup to delivery.',
        },
        title: 'Luxury & exotic car transport',
        intro: 'A supercar asks for patience more than muscle. Every exotic we carry goes up the ramp slowly, rides on its tires, and stays with the person who loaded it until it’s handed back.',
        points: [
          { title: 'Clearance first', text: 'We look at the splitter, the approach angle and any nose lift before the car touches the ramp. If it’s tight, we stop and work it out.' },
          { title: 'Strapped at the wheels', text: 'Ratchet straps loop over the tires. Nothing is hooked to suspension arms or the frame, and no chains go near paint.' },
          { title: 'One set of hands', text: 'The person who loads your car drives it and unloads it. No yard, no transfer between trucks.' },
        ],
        ask: ['Year, make and model', 'Ground clearance and whether the car has a nose lift', 'Pickup and drop-off addresses, with any gate, ramp or garage limits'],
        faq: [
          { q: 'Is the trailer enclosed?', a: 'The exotics on this site rode on our open flatbed car-hauler. If you need enclosed transport, say so in your request and we’ll discuss it honestly.' },
          { q: 'Can I be there for loading?', a: 'Yes. Many owners like to watch the car go up the ramp, and you’re welcome to.' },
        ],
      },
      'vehicle-transport': {
        name: 'Vehicle transportation',
        short: 'Sedans, coupes, SUVs and daily drivers — moves, purchases, sales and cars that just need to be somewhere else.',
        seo: {
          title: 'Car & SUV Transport Sacramento — Flatbed Car Hauling | Royal Prestige Towing',
          description: 'Flatbed car hauling in Sacramento for sedans, SUVs and daily drivers: buying out of town, moving or selling. Wheel straps, slow loading and a personal handover.',
        },
        title: 'Vehicle transportation',
        intro: 'Bought a car out of town, selling one, moving, or simply done driving it? An everyday vehicle gets exactly the same handling as anything else on our deck.',
        points: [
          { title: 'Same method, every car', text: 'Wheel straps, slow loading and a final check before the trailer moves — whether it’s a Beetle or a Benz.' },
          { title: 'Running or not', text: 'Tell us if it runs, rolls and steers. We’ll confirm before pickup whether we can load it safely.' },
          { title: 'Handed over in person', text: 'You or the person you name receives the car directly from the driver.' },
        ],
        ask: ['Year, make and model', 'Whether it runs, rolls, steers and brakes', 'Pickup and drop-off addresses and a contact at each end'],
        faq: [
          { q: 'Do you transport cars bought from a dealer or auction?', a: 'Yes. For auction purchases, see auto auction pickup — we’ll need the yard, lot number and release details. For a dealer, tell us where the car is and how pickup works there.' },
          { q: 'Can I leave belongings in the car?', a: 'Please ask first. Loose items can shift in transit, so we prefer cars to be empty.' },
        ],
      },
      'auto-auction-transport': {
        name: 'Auto auction pickup & delivery',
        short: 'Vehicles bought at Copart, IAA and other auctions — collected from the yard and delivered where you need them.',
        seo: {
          title: 'Auto Auction Vehicle Pickup & Transport, Sacramento | Royal Prestige Towing',
          description: 'Auction vehicle pickup and delivery from Sacramento-area yards such as Copart and IAA, and on agreed Northern California routes. Call or text for a route-specific quote.',
        },
        title: 'Auto auction pickup & delivery',
        intro: 'Bought a vehicle at auction? Call or text Serhii to arrange pickup and delivery from participating auction locations in the Sacramento area and on agreed Northern California routes.',
        points: [
          { title: 'From the auction yard', text: 'Once the auction has released the vehicle to you, we collect it from the yard and haul it on our flatbed to the destination you choose.' },
          { title: 'Coordinated pickup', text: 'Pickup is scheduled around the yard’s hours and release process. We’ll ask for the location, lot number and any gate pass or release paperwork.' },
          { title: 'Running or not', text: 'Tell us whether it runs, rolls and steers. Some non-running vehicles need extra handling; we’ll confirm before booking whether we can load it.' },
        ],
        ask: ['Auction name and yard location', 'Lot or stock number, and the gate pass or release reference', 'Vehicle year, make and model', 'Whether it runs, rolls and steers', 'Delivery address and when you need it there'],
        faq: [
          { q: 'Can you pick up from any auction?', a: 'We pick up from participating auction locations around Sacramento and on agreed Northern California routes. Each auction sets its own release and pickup rules, so we confirm the details for your yard before booking.' },
          { q: 'What do you need from me for an auction pickup?', a: 'The auction and yard, the lot or stock number, and the release or gate pass the auction gives you. The vehicle must be paid for and released to you, and the auction may require your authorization for us to collect it.' },
          { q: 'Do the local rates apply to auction pickups?', a: 'Not automatically. Auction pickups are quoted per route, because yard location, vehicle condition and any auction fees vary. Call or text for a route-specific quote.' },
        ],
      },
      'equipment-machinery-hauling': {
        name: 'Equipment & machinery hauling',
        short: 'Lathes, mills and shop equipment — forklift-loaded, blocked on timber, wrapped and strapped.',
        seo: {
          title: 'Equipment & Machinery Hauling, Sacramento | Royal Prestige Towing',
          description: 'Equipment hauling from Sacramento for lathes, mills and shop machinery, subject to size, weight and loading equipment on site: forklift-loaded, blocked, wrapped and strapped.',
        },
        title: 'Equipment & machinery hauling',
        intro: 'Machinery doesn’t roll and doesn’t forgive. Shop machines go on by forklift, sit on timber, and are wrapped and strapped from several directions before the trailer moves.',
        points: [
          { title: 'Loaded by forklift', text: 'We need loading equipment on site at both ends. Tell us what’s available and we’ll plan around it.' },
          { title: 'Blocked and wrapped', text: 'Timber under the base, plastic wrap over exposed surfaces, and straps that pull in opposing directions.' },
          { title: 'Fit confirmed first', text: 'Send the footprint, height, weight and a photo. If it’s not right for our trailer, you’ll hear that before anything is booked.' },
        ],
        ask: ['What the machine is, with a photo', 'Footprint, height and weight', 'Whether a forklift or other loading equipment is available at both ends'],
        faq: [
          { q: 'Do you provide the forklift?', a: 'No — loading equipment is needed at pickup and delivery. Tell us what’s on site and we’ll confirm the plan.' },
          { q: 'What size of machine can you take?', a: 'It depends on footprint and weight. Send the specifications and we’ll give you a straight answer.' },
        ],
      },
      'long-distance-transport': {
        name: 'Long-distance vehicle transportation',
        short: 'Sacramento to San Francisco, the Bay Area and other agreed Northern California destinations — scheduled in advance and quoted per route.',
        seo: {
          title: 'Long-Distance Vehicle Transport, Sacramento to San Francisco | Royal Prestige Towing',
          description: 'Long-distance vehicle transport across Northern California, including Sacramento to San Francisco and the Bay Area. Scheduled in advance with a route-specific quote.',
        },
        title: 'Long-distance vehicle transportation',
        intro: 'Some vehicles need to go further than the next town. We run scheduled longer routes from Sacramento — to San Francisco, the Bay Area and other Northern California destinations — planned in advance and quoted for your route.',
        points: [
          { title: 'Planned in advance', text: 'Longer routes are scheduled ahead of time. Availability depends on the load, the route and the calendar, and the price is quoted for your trip.' },
          { title: 'The same handling', text: 'A longer trip doesn’t change the method: wheel straps, slow loading and regular checks along the way.' },
          { title: 'Clear timing', text: 'You’ll know the pickup window and the expected delivery day before you commit.' },
        ],
        ask: ['What you’re moving', 'Pickup and destination cities', 'When it needs to be there and how flexible the dates are'],
        faq: [
          { q: 'Do you go out of state?', a: 'Our longer routes are within Northern California, including San Francisco and the Bay Area. For anything further, ask about your route and you’ll get a straight answer.' },
          { q: 'How long does a long trip take?', a: 'It depends on distance and scheduling. You’ll get an expected delivery day with your quote.' },
        ],
      },
    },
  },

  work: {
    seo: {
      title: 'Our Work — Real Transport Projects | Royal Prestige Towing',
      description: 'Photos of real loads on the Royal Prestige Towing flatbed: everyday cars, McLaren and Lamborghini, classics and shop machinery.',
    },
    title: 'Our work',
    intro: 'Every photo here is a real load on our deck — daily drivers, supercars, classics and shop machinery.',
    filterLabel: 'Filter by category',
    all: 'All',
    showing: 'Showing {n} photos',
    pagination: 'Portfolio pages',
    page: 'Page {i} of {n}',
    pageN: 'Page {i}',
    prevPage: 'Previous',
    nextPage: 'Next',
    categories: { exotic: 'Exotic', everyday: 'Everyday', machinery: 'Machinery', special: 'Other vehicles' },
  },

  about: {
    seo: {
      title: 'About Royal Prestige Towing & Owner Serhii Hoida | Sacramento',
      description: 'Royal Prestige Towing is an owner-operated transport business based in Sacramento, run by Serhii Hoida. Meet the person who quotes, loads and delivers your vehicle.',
    },
    title: 'About Royal Prestige Towing',
    intro: 'Royal Prestige Towing is Serhii Hoida’s owner-operated transport business in Sacramento, built around one idea: whatever you need moved deserves the care people usually save for six-figure cars.',
    storyTitle: 'Why RPT exists',
    story: [
      'Most people choosing a transport company are deciding who to trust with something they value. Royal Prestige Towing keeps that decision simple: one owner, one trailer, and one consistent way of working.',
      'The range of what we carry — a McLaren one day, a family sedan or a shop lathe the next — is the point. Each load gets the same slow loading, the same straps and the same attention.',
    ],
    principlesTitle: 'How we work',
    principles: [
      { title: 'Honest about fit', text: 'If a load isn’t right for our trailer, we say so before anything is booked.' },
      { title: 'Careful by default', text: 'Clearance checked, wheels strapped, machinery blocked and wrapped.' },
      { title: 'Personal from start to finish', text: 'You deal with the owner, from the first question to the handover.' },
    ],
  },

  areas: {
    seo: {
      title: 'Service Areas — Sacramento, Northern California & Bay Area | Royal Prestige Towing',
      description: 'Based in Sacramento: flatbed vehicle and equipment transport across Greater Sacramento, regional Northern California routes along I-80 and scheduled trips to San Francisco and the Bay Area.',
    },
    title: 'Service areas',
    intro: 'Sacramento is our home base. From here we cover Greater Sacramento, regional routes across Northern California and scheduled longer trips to San Francisco and the Bay Area — each one confirmed with a route-specific quote.',
    legendTitle: 'Where we go',
    regions: [
      { tier: 'sacramento', status: 'home', name: 'Sacramento & Greater Sacramento', text: 'Home base. Local moves around Sacramento and nearby communities are our everyday work.' },
      { tier: 'norcal', status: 'near', name: 'Northern California & the I-80 corridor', text: 'Regional routes, for example toward Davis or along I-80. Availability depends on the load and schedule, and each route is quoted individually.' },
      { tier: 'bay', status: 'tbc', name: 'San Francisco & the Bay Area', text: 'Scheduled longer-distance transport, including Sacramento to San Francisco. Arranged in advance with a custom quote.' },
      { tier: 'longer', status: 'tbc', name: 'Other longer routes', text: 'Other Northern California destinations by arrangement. See long-distance transport for details.' },
    ],
    statuses: { home: 'Home base', near: 'Regional routes', tbc: 'By arrangement' },
    citiesNote: 'Serving Greater Sacramento, Northern California, and the San Francisco Bay Area. Availability, scheduling, and pricing are confirmed individually based on your pickup and delivery locations.',
    corridorsTitle: 'The roads out of Sacramento',
    corridors: 'Interstate 80, Interstate 5 and US Route 50 all meet in Sacramento, which makes routes along them a natural fit — I-80 runs straight to the Bay Area. Your specific route, timing and price are always confirmed before booking.',
    mapLabel: 'Schematic map: Sacramento home base, with regional routes toward Davis, Yuba City, Auburn, Placerville and Stockton, and scheduled routes to San Francisco and the Bay Area',
    mapCaption: 'Schematic, not to scale. Routes outside Sacramento are confirmed and quoted individually.',
    places: { sf: 'San Francisco', oakland: 'Oakland', sanjose: 'San Jose', davis: 'Davis', stockton: 'Stockton', auburn: 'Auburn', placerville: 'Placerville', yuba: 'Yuba City', sacramento: 'Sacramento' },
  },

  contact: {
    seo: {
      title: 'Contact Royal Prestige Towing — Call or Text Serhii | Sacramento',
      description: 'Call or text Serhii at Royal Prestige Towing for a route-specific transport quote: everyday cars, auction pickups, exotics and equipment around Sacramento and Northern California.',
    },
    title: 'Call or text Serhii',
    intro: 'No forms and no dispatch desk. Call or text and you’ll reach the owner, who quotes, loads and delivers your vehicle.',
    includeTitle: 'What to include in your message',
    include: ['Vehicle make and model (or what the equipment is)', 'Auction name or pickup location', 'Destination', 'Whether the vehicle runs, if you know', 'Lot number or pickup reference, for auction vehicles'],
    includeNote: 'Photos help, especially for equipment or a vehicle that doesn’t run.',
    coverageTitle: 'Where we go',
    coverage: 'Based in Sacramento, serving Greater Sacramento, Northern California and the San Francisco Bay Area. Availability, scheduling and pricing are confirmed for each route.',
  },

  auction: {
    kicker: 'Auto auction pickup & delivery',
    title: 'Bought it at auction? We’ll bring it home.',
    lede: 'Call or text Serhii to arrange pickup and delivery from participating auction locations in the Sacramento area and on agreed Northern California routes.',
    points: [
      { title: 'Pickup from the yard', text: 'We collect the vehicle from the auction lot once it’s released to you and deliver it to the address you choose.' },
      { title: 'Scheduled with you', text: 'Send the auction location, lot number and pickup details, and we’ll coordinate a pickup window that works with the yard.' },
      { title: 'Quoted per route', text: 'Every auction pickup gets a route-specific quote. Non-running vehicles may need extra handling, so tell us their condition up front.' },
    ],
    yardsTitle: 'Auction locations near Sacramento',
    areas: {
      sacramento: 'Greater Sacramento',
      corridor: 'I-80 & I-5 corridor',
      bay: 'San Francisco Bay Area',
    },
    note: 'Listed for convenience; we are not affiliated with these auctions. Pickup depends on each auction’s release rules, your buyer authorization and the lot’s status, and is confirmed for each location.',
    more: 'Auction pickup details',
  },

  pricing: {
    title: 'Local transport — estimated starting rates',
    intro: 'Starting rates for local moves around Sacramento.',
    range: '{from}–{to} miles',
    over: '{from}+ miles',
    custom: 'Custom Quote',
    note: 'Prices are estimates. Final pricing depends on distance, vehicle condition, pickup and delivery locations, and transportation requirements.',
  },

  payment: {
    label: 'Payment',
    methods: { zelle: 'Zelle', cash: 'Cash' },
    note: 'Arranged directly with Serhii — no online payment.',
  },

  footer: {
    tagline: 'Vehicle and equipment transport',
    location: 'Sacramento, California',
    services: 'Services',
    company: 'Company',
    contact: 'Contact',
    rights: 'Royal Prestige Towing',
    developedBy: 'Website by',
    languages: 'Languages',
  },

  notFound: {
    seo: { title: 'Page not found | Royal Prestige Towing', description: 'The page you were looking for could not be found.' },
    title: 'This page isn’t on our deck.',
    text: 'The link may be out of date. Try the home page or request a quote directly.',
    home: 'Back to home',
  },
};

export type Dict = typeof en;
