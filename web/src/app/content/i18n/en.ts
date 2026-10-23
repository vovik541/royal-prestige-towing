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
    contact: 'Get a quote',
    quote: 'Request a quote',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    primary: 'Primary navigation',
    mobile: 'Site navigation',
    breadcrumb: 'Breadcrumb',
    homeLink: 'Royal Prestige Towing, home',
  },

  common: {
    planTransport: 'Plan your transport',
    seeLoads: 'See recent loads',
    allServices: 'All services',
    viewAllWork: 'View all projects',
    learnMore: 'Learn more',
    phone: 'Phone',
    callNow: 'Call Now',
    callSerhii: 'Call Serhii',
    getQuote: 'Get a Quote',
    callAria: 'Call Royal Prestige Towing at {phone}',
    textUs: 'Text Us',
    smsAria: 'Text Royal Prestige Towing at {phone}',
    contactActions: 'Call or text',
    preferToTalk: 'Prefer to talk? Call Serhii directly.',
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
    optional: 'optional',
    required: 'required',
  },

  loadTypes: {
    exotic: { name: 'Exotic & sports cars', short: 'Exotic & sports', hint: 'McLaren, Lamborghini' },
    everyday: { name: 'Everyday cars & SUVs', short: 'Everyday cars', hint: 'Sedans, coupes, SUVs' },
    commercial: { name: 'Vans & commercial vehicles', short: 'Vans & commercial', hint: 'Cargo and work vehicles' },
    machinery: { name: 'Machinery & equipment', short: 'Machinery', hint: 'Lathes, mills, equipment' },
    special: { name: 'Classics & the unusual', short: 'Classics & unusual', hint: 'Projects and oddities' },
  },

  configurator: {
    title: 'What are you moving?',
    intro: 'Choose a load to see how it rides on our deck and what we’ll need to know. Your choice carries into the quote request.',
    listLabel: 'Load type',
    askTitle: 'We’ll ask you about',
    continue: 'Continue to your request',
    loads: {
      exotic: {
        ride: 'Low cars go up slowly, with the approach checked before the nose reaches the ramp. Straps go over the tires, so nothing pulls on the suspension or bodywork.',
        ask: ['Year, make and model', 'Ground clearance, or whether it has a nose lift', 'Pickup and drop-off addresses, and any gate or garage limits'],
        placeholder: 'e.g. 2021 McLaren 720S Spider',
      },
      everyday: {
        ride: 'Moving, selling, buying out of town, or just done driving it? Your daily driver gets the same wheel straps and the same careful loading as anything else on our deck.',
        ask: ['Year, make and model', 'Whether it runs, rolls and steers', 'Pickup and drop-off addresses'],
        placeholder: 'e.g. 2016 Honda Accord',
      },
      commercial: {
        ride: 'High-roof vans and work vehicles are checked for height and weight before we confirm. Let us know about any racking or cargo still inside.',
        ask: ['Make, model and roof height', 'Approximate weight, and whether it is loaded', 'Pickup and drop-off addresses'],
        placeholder: 'e.g. Ram ProMaster 2500 high roof',
      },
      machinery: {
        ride: 'Shop machines go on by forklift, sit on timber, and are wrapped and strapped at several points so they can’t shift or tip.',
        ask: ['What the machine is, with a photo', 'Footprint, height and weight', 'Whether a forklift is available at both ends'],
        placeholder: 'e.g. Engine lathe, approx. 3,000 lb',
      },
      special: {
        ride: 'Project cars, classics, odd little vehicles that don’t fit anyone’s form. If it has wheels or a footprint, ask — we’ll tell you honestly whether it fits.',
        ask: ['What it is, with a photo or two', 'Whether it rolls and steers', 'Pickup and drop-off addresses'],
        placeholder: 'e.g. 1987 BMW Alpina B10, not running',
      },
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
      description: 'Owner-operated flatbed vehicle and equipment transport based in Sacramento. Serving Greater Sacramento, Northern California and San Francisco Bay Area routes. Request a quote.',
    },
    hero: {
      kicker: 'Flatbed vehicle & equipment transport in Sacramento & Northern California',
      titleA: 'Every load,',
      titleB: 'handled like a McLaren.',
      lede: 'Owner-operated flatbed transport from Sacramento for everyday cars and SUVs, exotics, work vans and machinery — around Greater Sacramento and on routes across Northern California, including San Francisco. Loaded slowly, strapped at the wheels, delivered by the person you spoke to.',
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
    { q: 'Is RPT only for luxury cars?', a: 'No. Exotics are a big part of what we do, but everyday vehicles, vans and equipment are just as welcome — and every one gets the same care.' },
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
    lede: 'Describe the load and the route. Serhii will come back to you personally with a clear quote.',
  },

  services: {
    seo: {
      title: 'Vehicle & Equipment Transport Services Sacramento | Royal Prestige Towing',
      description: 'Flatbed transport from Sacramento for everyday cars and SUVs, exotic cars, work vans and machinery — locally around Sacramento and on longer Northern California routes.',
    },
    title: 'Transport services',
    intro: 'One trailer, one owner, and the same careful method for every load — from a supercar to a shop lathe, around Sacramento or on a longer Northern California route. Choose a service to see how it works.',
    cardCta: 'How it works',
    otherServices: 'Other services',
    askTitle: 'What we’ll ask you',
    faqTitle: 'Common questions',
    photosTitle: 'From the deck',
    ctaTitle: 'Ready to plan this transport?',
    ctaText: 'Start a request with this service already selected.',
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
          { q: 'Do you transport cars bought from a dealer or auction?', a: 'Tell us where the car is and how pickup works there, and we’ll confirm whether we can collect it.' },
          { q: 'Can I leave belongings in the car?', a: 'Please ask first. Loose items can shift in transit, so we prefer cars to be empty.' },
        ],
      },
      'commercial-vehicle-transport': {
        name: 'Commercial vehicle transportation',
        short: 'Cargo vans and work vehicles, checked for height and weight before we confirm the job.',
        seo: {
          title: 'Commercial Vehicle & Work Van Transport, Sacramento | Royal Prestige Towing',
          description: 'Commercial vehicle hauling from Sacramento for cargo vans and work vehicles. Roof height and weight are checked before we confirm, and pickup is planned around your schedule.',
        },
        title: 'Commercial vehicle transportation',
        intro: 'A work van is a business tool, and when it’s off the road the business feels it. We check the vehicle’s size and weight up front so the day goes as planned.',
        points: [
          { title: 'Checked before we commit', text: 'Roof height, wheelbase and weight are confirmed against our trailer before we say yes.' },
          { title: 'Cargo and racking', text: 'Let us know what’s still inside. Shelving and loose tools change how a van rides.' },
          { title: 'Planned around your day', text: 'Pickup and delivery windows are agreed with you in advance.' },
        ],
        ask: ['Make, model and roof height', 'Approximate weight and whether it’s loaded', 'Pickup and drop-off addresses and access details'],
        faq: [
          { q: 'Can you move a high-roof van?', a: 'Often, yes. We confirm height and weight first — the ProMaster in our photos is a high-roof model.' },
          { q: 'Do you move box trucks?', a: 'Send the make, model and weight. We’ll tell you plainly whether it’s within what our trailer can carry.' },
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
      description: 'Photos of real loads on the Royal Prestige Towing trailer: McLaren and Lamborghini, everyday cars, commercial vans and shop machinery.',
    },
    title: 'Our work',
    intro: 'Every photo here is a real load on our deck — supercars, daily drivers, work vans and shop machinery.',
    filterLabel: 'Filter by category',
    all: 'All',
    showing: 'Showing {n} photos',
    pagination: 'Portfolio pages',
    page: 'Page {i} of {n}',
    pageN: 'Page {i}',
    prevPage: 'Previous',
    nextPage: 'Next',
    categories: { exotic: 'Exotic', everyday: 'Everyday', commercial: 'Commercial', machinery: 'Machinery', special: 'Classics & unusual' },
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

  quote: {
    seo: {
      title: 'Get a Transport Quote | Royal Prestige Towing',
      description: 'Request a flatbed transport quote from Royal Prestige Towing in Sacramento: share your vehicle or equipment, pickup and drop-off — around Sacramento, Northern California or the Bay Area.',
    },
    title: 'Request a transport quote',
    intro: 'Share the load, pickup and drop-off — around Sacramento, across Northern California or to the Bay Area. Four quick details; add more only if you want to.',
    formLabel: 'Transport quote request',
    fields: {
      load: { legend: 'What are we moving?' },
      pickup: { label: 'Pickup', placeholder: 'City or ZIP' },
      destination: { label: 'Drop-off', placeholder: 'City or ZIP' },
      phone: { label: 'Your phone', hint: 'US number, 10 digits.' },
      item: { label: 'Make and model' },
      condition: { legend: 'Does it run and roll?' },
      timing: { legend: 'When?' },
      date: { label: 'Preferred date' },
      notes: { label: 'Anything else we should know?', hint: 'Low clearance, weight, gate or garage limits.' },
      name: { label: 'Your name' },
      contactPref: { legend: 'Best way to reach you' },
    },
    more: { show: 'Add details', hide: 'Hide details', hint: 'Make, condition, timing, notes' },
    conditions: { runs: 'Runs and drives', rolls: 'Rolls, doesn’t run', static: 'Doesn’t roll', unsure: 'Not sure' },
    timings: { flexible: 'Flexible', week: 'Within a week', date: 'Specific date' },
    contactPrefs: { phone: 'Call', text: 'Text' },
    errors: {
      pickupRequired: 'Enter a pickup city or ZIP code.',
      destinationRequired: 'Enter a drop-off city or ZIP code.',
      phoneRequired: 'Enter a phone number so Serhii can reach you.',
      phoneInvalid: 'Enter a valid US phone number (10 digits).',
      dateRequired: 'Choose a preferred date.',
      summary: 'Please check the highlighted fields.',
    },
    review: {
      button: 'Review request',
      title: 'Your request',
      edit: 'Edit',
      loadType: 'Load',
      notProvided: 'Not provided',
      unavailableTitle: 'Online submission isn’t connected yet',
      unavailableText: 'Nothing has been sent. To get your quote now, call Serhii — you can copy these details to read them out or text them.',
      submitUnavailable: 'Sending is not available yet',
      submit: 'Send request',
      copy: 'Copy details',
      copied: 'Request details copied to your clipboard.',
      copyFailed: 'Copying isn’t available in this browser. Select the summary text to copy it.',
      startOver: 'Start over',
      privacyNotice: 'When you send this request, your information goes to Serhii by email and is used only to review and respond to your transport request. It will not be used for unrelated marketing.',
      consentLabel: 'I agree that Serhii may call or text me using the contact information I provided to respond to my request.',
      consentRequired: 'Please confirm that Serhii may call or text you about this request.',
      sending: 'Sending…',
      sent: 'Request sent. Serhii will contact you using the details you provided.',
      sendFailed: 'The request couldn’t be sent. Please call or text Serhii instead.',
    },
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
