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
      title: 'Royal Prestige Towing — Vehicle & Equipment Transport, Sacramento',
      description: 'Owner-operated flatbed transport from Sacramento for exotic and everyday cars, vans and industrial machinery. Loaded slowly, strapped at the wheels, delivered in person.',
    },
    hero: {
      kicker: 'Royal Prestige Towing — Sacramento',
      titleA: 'Every load,',
      titleB: 'handled like a McLaren.',
      lede: 'Owner-operated flatbed transport for exotic and everyday cars, vans and industrial machinery. Loaded slowly, strapped at the wheels, and delivered by the person you spoke to.',
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
      body: 'Sacramento is home base. Routes along I-80, I-5 and US-50 are a natural fit, and we’re still confirming how far into the Bay Area and Northern California we run regularly. Share your route and you’ll get a straight answer.',
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
    { q: 'Do you go to the Bay Area?', a: 'We’re based in Sacramento and still confirming regular Bay Area coverage. Share your route and we’ll answer straight away.' },
  ],

  finalCta: {
    titleA: 'Tell us what’s going',
    titleB: 'on the deck.',
    lede: 'Describe the load and the route. Serhii will come back to you personally with a clear quote.',
  },

  services: {
    seo: {
      title: 'Transport Services — Exotic, Everyday, Commercial & Machinery | Royal Prestige Towing',
      description: 'Flatbed transport from Sacramento for exotic and sports cars, everyday vehicles, vans and work trucks, shop machinery, and longer routes on request.',
    },
    title: 'Transport services',
    intro: 'One trailer, one owner, and the same careful method for every load — from a supercar to a shop lathe. Choose a service to see how it works.',
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
          title: 'Exotic & Luxury Car Transport from Sacramento | Royal Prestige Towing',
          description: 'Flatbed transport for supercars and luxury vehicles: clearance checked before loading, ratchet straps over the tires, one owner-driver from pickup to delivery.',
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
          title: 'Car & SUV Transport in the Sacramento Area | Royal Prestige Towing',
          description: 'Careful flatbed transport for everyday cars and SUVs: buying out of town, moving, selling or relocating a vehicle. Same straps and attention as an exotic.',
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
          title: 'Commercial Van & Work Vehicle Transport, Sacramento | Royal Prestige Towing',
          description: 'Flatbed transport for cargo vans and work vehicles. Roof height and weight are checked before we confirm, and pickup is planned around your schedule.',
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
          title: 'Machinery & Equipment Hauling from Sacramento | Royal Prestige Towing',
          description: 'Flatbed hauling for shop machinery such as lathes and milling machines: forklift-loaded, set on timber, wrapped and strapped from several directions.',
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
        short: 'Longer routes beyond the Sacramento area, considered case by case with an honest answer on what’s possible.',
        seo: {
          title: 'Long-Distance Vehicle Transport from Sacramento | Royal Prestige Towing',
          description: 'Longer vehicle transport routes from Sacramento, considered case by case. Share your route and you’ll get an honest answer on timing and whether we can take it.',
        },
        title: 'Long-distance vehicle transportation',
        intro: 'Some vehicles need to go further than the next town. Longer routes are considered one at a time, and we’ll tell you honestly whether we can take yours and when.',
        points: [
          { title: 'Route by route', text: 'We’re still confirming which longer routes we run regularly. Share yours and we’ll answer directly.' },
          { title: 'The same handling', text: 'A longer trip doesn’t change the method: wheel straps, slow loading and regular checks along the way.' },
          { title: 'Clear timing', text: 'You’ll know the pickup window and the expected delivery day before you commit.' },
        ],
        ask: ['What you’re moving', 'Pickup and destination cities', 'When it needs to be there and how flexible the dates are'],
        faq: [
          { q: 'Do you go out of state?', a: 'Coverage beyond Northern California hasn’t been confirmed yet. Ask about your route and you’ll get a straight answer.' },
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
    categories: { exotic: 'Exotic', everyday: 'Everyday', commercial: 'Commercial', machinery: 'Machinery', special: 'Classics & unusual' },
  },

  about: {
    seo: {
      title: 'About Royal Prestige Towing & Owner Serhii Hoida | Sacramento',
      description: 'Royal Prestige Towing is an owner-operated transport business based in Sacramento, run by Serhii Hoida. Meet the person who quotes, loads and delivers your vehicle.',
    },
    title: 'About Royal Prestige Towing',
    intro: 'A Sacramento transport business built around one idea: whatever you need moved deserves the care people usually save for six-figure cars.',
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
      title: 'Service Areas — Sacramento Base & Northern California | Royal Prestige Towing',
      description: 'Royal Prestige Towing is based in Sacramento. See how we approach routes in Northern California and the Bay Area — coverage outside Sacramento is confirmed route by route.',
    },
    title: 'Service areas',
    intro: 'Sacramento is our home base. Beyond it, we confirm routes one at a time rather than promising coverage we haven’t yet established.',
    legendTitle: 'How coverage works',
    regions: [
      { status: 'home', name: 'Sacramento', text: 'Our home base and the center of everything we do.' },
      { status: 'near', name: 'Nearby Northern California', text: 'Places such as Davis, Auburn, Placerville and Stockton — ask and we’ll confirm your route.' },
      { status: 'tbc', name: 'Bay Area', text: 'We’re confirming regular coverage of the Bay Area. Share your route for a straight answer.' },
      { status: 'tbc', name: 'Longer routes', text: 'Considered case by case. See long-distance transport for details.' },
    ],
    statuses: { home: 'Home base', near: 'Ask to confirm', tbc: 'Being confirmed' },
    corridorsTitle: 'The roads out of Sacramento',
    corridors: 'Interstate 80, Interstate 5 and US Route 50 all meet in Sacramento, which makes routes along them a natural fit. That’s geography, not a promise — your specific route is always confirmed first.',
    mapLabel: 'Schematic map: Sacramento home base, with provisional routes toward Davis, Yuba City, Auburn, Placerville, Stockton and the Bay Area',
    mapCaption: 'Schematic, not to scale. Coverage outside Sacramento is provisional.',
    places: { sf: 'San Francisco', oakland: 'Oakland', sanjose: 'San Jose', davis: 'Davis', stockton: 'Stockton', auburn: 'Auburn', placerville: 'Placerville', yuba: 'Yuba City', sacramento: 'Sacramento' },
  },

  quote: {
    seo: {
      title: 'Get a Transport Quote | Royal Prestige Towing',
      description: 'Describe your vehicle or equipment and route to request a transport quote from Royal Prestige Towing in Sacramento.',
    },
    title: 'Request a transport quote',
    intro: 'Tell us what you’re moving, where, and the best number to reach you. The review step shows everything you entered.',
    stepsLabel: 'Request steps',
    steps: { load: 'Load', details: 'Details', contact: 'Contact', review: 'Review' },
    stepOf: 'Step {i} of {n}',
    back: 'Back',
    next: 'Continue',
    edit: 'Edit',
    fields: {
      item: { label: 'Vehicle or equipment', hint: 'Year, make and model, or what the machine is.' },
      pickup: { label: 'Pickup location', hint: 'City or ZIP code', placeholder: 'Sacramento, CA' },
      destination: { label: 'Destination', hint: 'City or ZIP code', placeholder: 'San Jose, CA' },
      condition: { label: 'Condition', legend: 'Does it run and roll?' },
      timing: { label: 'Timing' },
      date: { label: 'Preferred date' },
      notes: { label: 'Additional information', hint: 'Clearance, weight, access limits, anything we should know.' },
      name: { label: 'Your name' },
      phone: { label: 'Phone', hint: 'US number, 10 digits.' },
      contactPref: { label: 'Preferred contact method' },
    },
    conditions: { runs: 'Runs and drives', rolls: 'Rolls and steers, doesn’t run', static: 'Doesn’t roll', unsure: 'Not sure' },
    timings: { flexible: 'Flexible', week: 'Within a week', date: 'On a specific date' },
    contactPrefs: { phone: 'Phone call', text: 'Text message' },
    contactIntro: 'Leave a phone number so Serhii can reach you about your quote.',
    errors: {
      itemRequired: 'Tell us what we’re moving.',
      pickupRequired: 'Enter a pickup city or ZIP code.',
      destinationRequired: 'Enter a destination city or ZIP code.',
      conditionRequired: 'Choose the vehicle’s condition.',
      dateRequired: 'Choose a preferred date.',
      phoneRequired: 'Enter a phone number so Serhii can reach you.',
      phoneInvalid: 'Enter a valid US phone number (10 digits).',
      summary: 'Please fix the highlighted fields.',
    },
    review: {
      title: 'Review your request',
      intro: 'Check the details below. You can edit any section.',
      loadType: 'Load type',
      notProvided: 'Not provided',
      unavailableTitle: 'Online submission isn’t connected yet',
      unavailableText: 'This site doesn’t send requests yet, so nothing has been sent. To get your quote now, call Serhii — you can copy these details to read them out or text them.',
      submit: 'Send request',
      submitUnavailable: 'Sending is not available yet',
      copy: 'Copy request details',
      copied: 'Request details copied to your clipboard.',
      copyFailed: 'Copying isn’t available in this browser. Select the summary text to copy it.',
      startOver: 'Start a new request',
    },
  },

  footer: {
    tagline: 'Vehicle and equipment transport',
    location: 'Sacramento, California',
    services: 'Services',
    company: 'Company',
    contact: 'Contact',
    rights: 'Royal Prestige Towing',
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
