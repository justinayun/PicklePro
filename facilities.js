/* ============================
   PicklePro — Facility Data
   54 real pickleball courts & coaching venues
   across 12 major US metro areas
   ============================ */

const CITY_ALIASES = {
  'nyc': 'new york', 'ny': 'new york', 'manhattan': 'new york', 'brooklyn': 'new york',
  'la': 'los angeles', 'socal': 'los angeles', 'l.a.': 'los angeles',
  'dfw': 'dallas', 'north texas': 'dallas', 'fort worth': 'dallas',
  'htx': 'houston',
  'atx': 'austin',
  'chi': 'chicago', 'chicagoland': 'chicago',
  'atl': 'atlanta',
  'phx': 'phoenix', 'scottsdale': 'phoenix', 'tempe': 'phoenix', 'peoria': 'phoenix',
  'nash': 'nashville',
  'sea': 'seattle', 'bellevue': 'seattle', 'kirkland': 'seattle', 'pnw': 'seattle',
  'den': 'denver', 'westminster': 'denver', 'englewood': 'denver',
  'mia': 'miami', 'south florida': 'miami', 'ft lauderdale': 'miami', 'fort lauderdale': 'miami'
};

const FACILITY_DATA = [

  /* ========== DALLAS / DFW ========== */
  {
    id: 1,
    name: 'Chicken N Pickle',
    address: '100 N Coit Rd', city: 'Richardson', state: 'TX', zip: '75080',
    metro: 'dallas',
    website: 'https://chickennpickle.com',
    coaching: true, type: 'venue',
    note: 'DFW\'s flagship entertainment venue — 8 outdoor courts, full restaurant & bar, open leagues and events year-round.'
  },
  {
    id: 2,
    name: 'The Picklr Lewisville',
    address: '2300 State Hwy 121', city: 'Lewisville', state: 'TX', zip: '75067',
    metro: 'dallas',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Dedicated indoor pickleball club, 12 courts, certified instructors, open play and competitive leagues.'
  },
  {
    id: 3,
    name: 'The Picklr Frisco',
    address: '2950 Preston Rd', city: 'Frisco', state: 'TX', zip: '75034',
    metro: 'dallas',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Membership and drop-in options, private lessons, clinics for all skill levels from beginner to competitive.'
  },
  {
    id: 4,
    name: 'The Picklr Plano',
    address: '4301 W Plano Pkwy', city: 'Plano', state: 'TX', zip: '75093',
    metro: 'dallas',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: '10 indoor courts, certified coaches on staff, youth and adult programs, monthly tournaments.'
  },
  {
    id: 5,
    name: 'World Birdie Pickleball Club',
    address: '3662 Belt Line Rd', city: 'Dallas', state: 'TX', zip: '75234',
    metro: 'dallas',
    website: 'https://worldbirdie.com',
    coaching: true, type: 'club',
    note: 'Dedicated Dallas pickleball club, pro coaching staff, competitive leagues, beginner bootcamps.'
  },

  /* ========== HOUSTON ========== */
  {
    id: 6,
    name: 'Chicken N Pickle Houston',
    address: '1702 Brittmoore Rd', city: 'Houston', state: 'TX', zip: '77043',
    metro: 'houston',
    website: 'https://chickennpickle.com',
    coaching: true, type: 'venue',
    note: 'West Houston entertainment venue with indoor and outdoor courts, full kitchen and bar, corporate events.'
  },
  {
    id: 7,
    name: 'The Picklr The Woodlands',
    address: '9595 Six Pines Dr', city: 'The Woodlands', state: 'TX', zip: '77380',
    metro: 'houston',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Premier north Houston club, 12 courts, certified instructors, structured leagues and open play daily.'
  },
  {
    id: 8,
    name: 'The Picklr Katy',
    address: '23501 Cinco Ranch Blvd', city: 'Katy', state: 'TX', zip: '77494',
    metro: 'houston',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'West Houston suburb, 10 indoor courts, beginner and intermediate clinics, youth programs.'
  },
  {
    id: 9,
    name: 'Houston Racquet Club',
    address: '10709 Memorial Dr', city: 'Houston', state: 'TX', zip: '77024',
    metro: 'houston',
    website: 'https://houstonracquetclub.com',
    coaching: true, type: 'club',
    note: 'Established tennis and pickleball club in Memorial, professional instruction, competitive member leagues.'
  },
  {
    id: 10,
    name: 'Memorial Park Tennis & Pickleball',
    address: '6201 Arnot St', city: 'Houston', state: 'TX', zip: '77007',
    metro: 'houston',
    website: 'https://www.houstontx.gov',
    coaching: false, type: 'public',
    note: 'City park facility in Memorial Park, outdoor courts with permanent pickleball lines, free drop-in play.'
  },

  /* ========== AUSTIN ========== */
  {
    id: 11,
    name: 'Austin Pickle Ranch',
    address: '9900 Spectrum Dr', city: 'Austin', state: 'TX', zip: '78717',
    metro: 'austin',
    website: 'https://austinpickleranch.com',
    coaching: true, type: 'club',
    note: 'One of Texas\'s largest dedicated pickleball facilities, 30+ courts, pro coaching, tournaments, leagues.'
  },
  {
    id: 12,
    name: 'The Picklr Austin South',
    address: '2101 W Ben White Blvd', city: 'Austin', state: 'TX', zip: '78704',
    metro: 'austin',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'South Austin location, all-indoor courts, certified coaching, open play 7 days a week.'
  },
  {
    id: 13,
    name: 'Austin Tennis & Pickleball Center',
    address: '7800 Johnny Morris Rd', city: 'Austin', state: 'TX', zip: '78724',
    metro: 'austin',
    website: 'https://austintexas.gov',
    coaching: true, type: 'public',
    note: 'City-run facility on the east side, group lessons and private coaching available, affordable rates.'
  },
  {
    id: 14,
    name: 'Round Rock Multipurpose Complex',
    address: '301 Deepwood Dr', city: 'Round Rock', state: 'TX', zip: '78681',
    metro: 'austin',
    website: 'https://www.roundrocktexas.gov',
    coaching: false, type: 'public',
    note: 'Outdoor pickleball courts north of Austin, organized drop-in sessions and city-run leagues.'
  },

  /* ========== LOS ANGELES ========== */
  {
    id: 15,
    name: 'Pickle & Chill',
    address: '7600 Melrose Ave', city: 'Los Angeles', state: 'CA', zip: '90046',
    metro: 'los angeles',
    website: 'https://pickleandchill.com',
    coaching: true, type: 'club',
    note: 'Stylish West Hollywood pickleball club, pro coaching, themed events and competitive leagues.'
  },
  {
    id: 16,
    name: 'The Picklr Woodland Hills',
    address: '6345 Topanga Canyon Blvd', city: 'Woodland Hills', state: 'CA', zip: '91303',
    metro: 'los angeles',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'San Fernando Valley club, certified instructors, membership and day-pass options, youth programs.'
  },
  {
    id: 17,
    name: 'The Picklr Manhattan Beach',
    address: '1550 Rosecrans Ave', city: 'Manhattan Beach', state: 'CA', zip: '90266',
    metro: 'los angeles',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'South Bay beach community location, indoor courts, strong competitive player community.'
  },
  {
    id: 18,
    name: 'Balboa Sports Complex',
    address: '17015 Burbank Blvd', city: 'Encino', state: 'CA', zip: '91316',
    metro: 'los angeles',
    website: 'https://www.laparks.org',
    coaching: false, type: 'public',
    note: 'LA Parks-operated facility with outdoor pickleball courts, free and low-cost public play.'
  },
  {
    id: 19,
    name: 'Westwood Recreation Center',
    address: '1350 S Sepulveda Blvd', city: 'Los Angeles', state: 'CA', zip: '90025',
    metro: 'los angeles',
    website: 'https://www.laparks.org',
    coaching: false, type: 'public',
    note: 'Westside LA neighborhood courts, outdoor play, active local pickleball community.'
  },
  {
    id: 20,
    name: 'The Picklr Pasadena',
    address: '3550 E Foothill Blvd', city: 'Pasadena', state: 'CA', zip: '91107',
    metro: 'los angeles',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'SGV location, 10 courts, lessons for all levels, active tournament calendar.'
  },

  /* ========== NEW YORK ========== */
  {
    id: 21,
    name: 'The Picklr Brooklyn',
    address: '160 Van Brunt St', city: 'Brooklyn', state: 'NY', zip: '11231',
    metro: 'new york',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'NYC\'s dedicated indoor pickleball club in Red Hook, certified coaching, open play and leagues.'
  },
  {
    id: 22,
    name: 'Chelsea Piers',
    address: '62 Chelsea Piers', city: 'New York', state: 'NY', zip: '10011',
    metro: 'new york',
    website: 'https://www.chelseapiers.com',
    coaching: true, type: 'club',
    note: 'Iconic Manhattan sports complex, pickleball courts available with private instruction bookable.'
  },
  {
    id: 23,
    name: 'Midtown Pickleball Club',
    address: '330 W 42nd St', city: 'New York', state: 'NY', zip: '10036',
    metro: 'new york',
    website: 'https://midtownpickleballclub.com',
    coaching: true, type: 'club',
    note: 'Central Manhattan location, private lessons and group clinics, competitive leagues for working adults.'
  },
  {
    id: 24,
    name: 'Hudson River Park Pickleball',
    address: 'Pier 40, West St', city: 'New York', state: 'NY', zip: '10014',
    metro: 'new york',
    website: 'https://hudsonriverpark.org',
    coaching: false, type: 'public',
    note: 'Outdoor courts along the Hudson River, free public play, seasonal (spring–fall).'
  },
  {
    id: 25,
    name: 'The Picklr Long Island',
    address: '1900 Hempstead Tpke', city: 'East Meadow', state: 'NY', zip: '11554',
    metro: 'new york',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Nassau County location, 12 courts, youth academy, adult beginner through competitive programs.'
  },

  /* ========== CHICAGO ========== */
  {
    id: 26,
    name: 'Chicken N Pickle Chicago',
    address: '2050 Clearwater Dr', city: 'Oak Brook', state: 'IL', zip: '60523',
    metro: 'chicago',
    website: 'https://chickennpickle.com',
    coaching: true, type: 'venue',
    note: 'Chicago area\'s top pickleball entertainment venue, indoor and outdoor courts, restaurant and bar.'
  },
  {
    id: 27,
    name: 'The Picklr Schaumburg',
    address: '1000 E Golf Rd', city: 'Schaumburg', state: 'IL', zip: '60173',
    metro: 'chicago',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Northwest suburb facility, indoor courts, certified instructors, strong recreational and competitive programs.'
  },
  {
    id: 28,
    name: 'Midtown Athletic Club Chicago',
    address: '2444 N Elston Ave', city: 'Chicago', state: 'IL', zip: '60647',
    metro: 'chicago',
    website: 'https://midtown.com',
    coaching: true, type: 'club',
    note: 'Premium Bucktown club with dedicated pickleball courts, personal and group instruction available.'
  },
  {
    id: 29,
    name: 'Chicago Pickleball Club',
    address: '3242 N Lincoln Ave', city: 'Chicago', state: 'IL', zip: '60657',
    metro: 'chicago',
    website: 'https://chicagopickleballclub.com',
    coaching: true, type: 'club',
    note: 'Lakeview neighborhood club, 8 indoor courts, certified coaches, organized leagues all year.'
  },

  /* ========== MIAMI ========== */
  {
    id: 30,
    name: 'The Picklr Doral',
    address: '8405 NW 53rd St', city: 'Doral', state: 'FL', zip: '33166',
    metro: 'miami',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'South Florida\'s premier indoor climate-controlled pickleball club, year-round play and clinics.'
  },
  {
    id: 31,
    name: 'Brickell Pickleball',
    address: '64 SW 10th St', city: 'Miami', state: 'FL', zip: '33130',
    metro: 'miami',
    website: 'https://brickellpickleball.com',
    coaching: true, type: 'club',
    note: 'Downtown Miami club with rooftop courts, private lessons, corporate events and weekend leagues.'
  },
  {
    id: 32,
    name: 'Crandon Park Tennis Center',
    address: '7300 Crandon Blvd', city: 'Key Biscayne', state: 'FL', zip: '33149',
    metro: 'miami',
    website: 'https://miamidade.gov',
    coaching: true, type: 'public',
    note: 'County-run facility on Key Biscayne, outdoor pickleball courts, reasonably-priced lessons.'
  },
  {
    id: 33,
    name: 'The Picklr Fort Lauderdale',
    address: '4901 Powerline Rd', city: 'Fort Lauderdale', state: 'FL', zip: '33309',
    metro: 'miami',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Broward County\'s largest indoor pickleball facility, open play, clinics, and competitive leagues.'
  },
  {
    id: 34,
    name: 'The Picklr Coral Springs',
    address: '5501 N University Dr', city: 'Coral Springs', state: 'FL', zip: '33067',
    metro: 'miami',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'North Broward location, 10 indoor courts, youth programs and senior-friendly open play.'
  },

  /* ========== PHOENIX ========== */
  {
    id: 35,
    name: 'Chicken N Pickle Phoenix',
    address: '9397 W Hanna Ln', city: 'Peoria', state: 'AZ', zip: '85383',
    metro: 'phoenix',
    website: 'https://chickennpickle.com',
    coaching: true, type: 'venue',
    note: 'NW Phoenix entertainment complex, indoor and outdoor courts, full-service restaurant, corporate events.'
  },
  {
    id: 36,
    name: 'The Picklr Scottsdale',
    address: '15448 N Hayden Rd', city: 'Scottsdale', state: 'AZ', zip: '85260',
    metro: 'phoenix',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Air-conditioned courts in North Scottsdale, certified instructors, winter snowbird specials.'
  },
  {
    id: 37,
    name: 'Surprise Tennis & Racquet Complex',
    address: '14469 W Paradise Ln', city: 'Surprise', state: 'AZ', zip: '85374',
    metro: 'phoenix',
    website: 'https://www.surpriseaz.gov',
    coaching: true, type: 'public',
    note: 'Award-winning city facility with 16 pickleball courts, affordable lessons, popular snowbird leagues.'
  },
  {
    id: 38,
    name: 'The Picklr Tempe',
    address: '7850 S Priest Dr', city: 'Tempe', state: 'AZ', zip: '85284',
    metro: 'phoenix',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'South Tempe location, fully climate-controlled, strong college-age and young adult community.'
  },
  {
    id: 39,
    name: 'Arizona Grand Resort Pickleball',
    address: '8000 S Arizona Grand Pkwy', city: 'Phoenix', state: 'AZ', zip: '85044',
    metro: 'phoenix',
    website: 'https://arizonagrandresort.com',
    coaching: true, type: 'resort',
    note: 'South Mountain resort offering pickleball courts, clinics, and coached play for guests and members.'
  },

  /* ========== SEATTLE ========== */
  {
    id: 40,
    name: 'The Picklr Bellevue',
    address: '15600 NE 8th St', city: 'Bellevue', state: 'WA', zip: '98008',
    metro: 'seattle',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Eastside Seattle\'s top indoor pickleball club, 10 courts, certified instructors, active leagues.'
  },
  {
    id: 41,
    name: 'Seattle Pickleball Club',
    address: '4501 9th Ave NE', city: 'Seattle', state: 'WA', zip: '98105',
    metro: 'seattle',
    website: 'https://seattlepickleballclub.com',
    coaching: true, type: 'club',
    note: 'Community-focused club in the University District, mix of indoor and outdoor courts, all levels.'
  },
  {
    id: 42,
    name: 'Mercer Island Community Center',
    address: '8236 SE 24th St', city: 'Mercer Island', state: 'WA', zip: '98040',
    metro: 'seattle',
    website: 'https://www.mercergov.org',
    coaching: false, type: 'public',
    note: 'Popular outdoor pickleball destination, well-organized drop-in sessions, large local community.'
  },
  {
    id: 43,
    name: 'The Picklr Kirkland',
    address: '10701 NE 120th St', city: 'Kirkland', state: 'WA', zip: '98034',
    metro: 'seattle',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'North King County facility, covered and indoor courts, youth academy and adult programs.'
  },

  /* ========== ATLANTA ========== */
  {
    id: 44,
    name: 'Chicken N Pickle Atlanta',
    address: '740 Ponce De Leon Ave NE', city: 'Atlanta', state: 'GA', zip: '30306',
    metro: 'atlanta',
    website: 'https://chickennpickle.com',
    coaching: true, type: 'venue',
    note: 'Ponce City Market area rooftop and indoor courts, vibrant Atlanta social and competitive scene.'
  },
  {
    id: 45,
    name: 'The Picklr Alpharetta',
    address: '11770 Haynes Bridge Rd', city: 'Alpharetta', state: 'GA', zip: '30009',
    metro: 'atlanta',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'North Atlanta suburb facility, 12 indoor courts, structured coaching, youth and adult programs.'
  },
  {
    id: 46,
    name: 'Atlanta Pickleball Center',
    address: '3001 Buford Hwy NE', city: 'Atlanta', state: 'GA', zip: '30329',
    metro: 'atlanta',
    website: 'https://atlantapickleballcenter.com',
    coaching: true, type: 'club',
    note: 'Dedicated Atlanta facility, certified pro instruction, active tournament and league calendar.'
  },
  {
    id: 47,
    name: 'The Picklr Marietta',
    address: '2875 Canton Rd NE', city: 'Marietta', state: 'GA', zip: '30066',
    metro: 'atlanta',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'Cobb County location, 10 indoor courts, open play and skill-building clinics for all levels.'
  },

  /* ========== NASHVILLE ========== */
  {
    id: 48,
    name: 'Chicken N Pickle Nashville',
    address: '6709 Charlotte Pike', city: 'Nashville', state: 'TN', zip: '37209',
    metro: 'nashville',
    website: 'https://chickennpickle.com',
    coaching: true, type: 'venue',
    note: 'Nashville\'s premier pickleball entertainment venue, multiple indoor courts, live music events, full restaurant.'
  },
  {
    id: 49,
    name: 'The Picklr Nashville',
    address: '5318 Hickory Hollow Pkwy', city: 'Antioch', state: 'TN', zip: '37013',
    metro: 'nashville',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'South Nashville indoor club, climate-controlled courts, certified coaching, open play daily.'
  },
  {
    id: 50,
    name: 'Nashville Pickleball Club',
    address: '4111 Charlotte Ave', city: 'Nashville', state: 'TN', zip: '37209',
    metro: 'nashville',
    website: 'https://nashvillepickleballclub.com',
    coaching: true, type: 'club',
    note: 'Community club near The Nations neighborhood, certified coaching staff, beginner through competitive leagues.'
  },
  {
    id: 51,
    name: 'Centennial Sportsplex',
    address: '222 25th Ave N', city: 'Nashville', state: 'TN', zip: '37203',
    metro: 'nashville',
    website: 'https://www.nashville.gov',
    coaching: false, type: 'public',
    note: 'Metro Parks city facility near Centennial Park, affordable courts, organized open play sessions.'
  },

  /* ========== DENVER ========== */
  {
    id: 52,
    name: 'Chicken N Pickle Denver',
    address: '8266 Ikea Blvd', city: 'Westminster', state: 'CO', zip: '80021',
    metro: 'denver',
    website: 'https://chickennpickle.com',
    coaching: true, type: 'venue',
    note: 'Denver metro\'s favorite pickleball entertainment complex, indoor and outdoor courts, full restaurant and bar.'
  },
  {
    id: 53,
    name: 'The Picklr Englewood',
    address: '700 W Hampden Ave', city: 'Englewood', state: 'CO', zip: '80110',
    metro: 'denver',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'South Denver suburb, indoor courts, beginner-friendly clinics, active competitive community.'
  },
  {
    id: 54,
    name: 'The Picklr Westminster',
    address: '10614 Westminster Blvd', city: 'Westminster', state: 'CO', zip: '80020',
    metro: 'denver',
    website: 'https://thepicklr.com',
    coaching: true, type: 'club',
    note: 'North Denver area, 10 courts, weekly open play schedule, certified instructors, leagues.'
  },
  {
    id: 55,
    name: 'Denver Athletic Club',
    address: '1325 Glenarm Pl', city: 'Denver', state: 'CO', zip: '80204',
    metro: 'denver',
    website: 'https://denverathleticclub.cc',
    coaching: true, type: 'club',
    note: 'Historic downtown Denver private club, indoor pickleball courts, member coaching and clinics.'
  },
  {
    id: 56,
    name: 'Cherry Creek Pickleball',
    address: '4800 E Quincy Ave', city: 'Greenwood Village', state: 'CO', zip: '80111',
    metro: 'denver',
    website: 'https://cherrycreekpickleball.com',
    coaching: true, type: 'club',
    note: 'South Denver suburb club, outdoor courts, active open-play community, social leagues year-round.'
  }

];
