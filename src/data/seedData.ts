import { Tour, Review } from '../types';

export const INITIAL_TOURS: Omit<Tour, 'id'>[] = [
  {
    title: 'Magical Hunza & Attabad Lake Expedition',
    slug: 'magical-hunza-attabad-lake-expedition',
    destination: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    shortDescription: 'Traverse the ancient Silk Road, explore 800-year-old Baltit & Altit forts, boat across turquoise Attabad Lake, and reach the Khunjerab Pass China Border.',
    description: 'Experience the crown jewel of Northern Pakistan. Hunza is celebrated for its staggering jagged peaks, rich culture, apricot orchards, and crystal lakes. On this 7-day tour, you will travel along the Karakoram Highway (KKH), cruise through the turquoise waters of Attabad Lake, walk the dizzying Hussaini Suspension Bridge, admire the razor-sharp Passu Cones, and stand at 15,397 feet at the Khunjerab Pass—the world’s highest paved international border crossing.',
    pricePerPerson: 75000,
    originalPrice: 88000,
    durationDays: 7,
    durationNights: 6,
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Chilas / Naran',
        description: 'Departure from Islamabad via Hazara Motorway. Cross Babusar Pass (summer) or drive along Karakoram Highway beside the mighty Indus River.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Shangrila Indus View Hotel / River View Hotel'
      },
      {
        day: 2,
        title: 'Drive to Karimabad Hunza & View of Rakaposhi',
        description: 'Stop at the confluence of three great mountain ranges (Himalaya, Karakoram, and Hindu Kush) and viewpoint of Rakaposhi peak (7,788m). Arrive at Karimabad.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Serena Inn Hunza / Darbar Hotel Karimabad'
      },
      {
        day: 3,
        title: 'Baltit & Altit Forts Exploration',
        description: 'Guided tour of the UNESCO-recognized Baltit Fort (800 years old) and Altit Fort. Evening sunset at Duikar Eagle’s Nest overlooking the valley.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Serena Inn Hunza / Darbar Hotel Karimabad'
      },
      {
        day: 4,
        title: 'Attabad Lake Boating & Upper Hunza (Gojal)',
        description: 'Speedboat cruise across turquoise Attabad Lake. Walk the thrilling Hussaini suspension bridge and explore the iconic Passu Cones and glacier view.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Passu Ambassador Hotel / Gojal Sarai'
      },
      {
        day: 5,
        title: 'Khunjerab Pass (Pak-China Border) Excursion',
        description: 'Scenic drive through Khunjerab National Park to the Pak-China Border at 4,693m. Look out for Himalayan ibex and marmots.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Passu Ambassador Hotel'
      },
      {
        day: 6,
        title: 'Return Journey to Besham / Naran',
        description: 'Begin return journey southward along the Karakoram Highway with scenic stops for photography and local chai.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Besham Continental Hotel'
      },
      {
        day: 7,
        title: 'Arrival in Islamabad',
        description: 'Final drive back to Islamabad via Hazara Motorway. Drop-off at Islamabad International Airport or designated meeting point.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'Dedicated AC Grand Cabin / Coaster / 4x4 Prado transport',
      '6 Nights hotel accommodation on twin sharing basis',
      'Daily quality breakfast and buffet dinner',
      'Attabad Lake boating fees and national park entry permits',
      'Services of certified English/Urdu speaking licensed tour guide',
      'First aid kit and emergency oxygen cylinder support'
    ],
    excludedServices: [
      'Air tickets to/from Islamabad',
      'Lunch and personal snacks / mineral water outside meals',
      'Personal travel insurance',
      'Tips for driver and local porters'
    ],
    departureDates: [
      { date: '2026-11-05', seatsTotal: 20, seatsAvailable: 8, status: 'Filling Fast' },
      { date: '2026-11-15', seatsTotal: 20, seatsAvailable: 14, status: 'Available' },
      { date: '2026-12-01', seatsTotal: 20, seatsAvailable: 19, status: 'Available' }
    ],
    meetingPoint: 'I-8 Markaz / Islamabad International Airport',
    difficulty: 'Easy',
    rating: 4.9,
    reviewsCount: 148,
    published: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Skardu & Deosai Plains: Land of Giants',
    slug: 'skardu-deosai-plains-land-of-giants',
    destination: 'Skardu & Baltistan',
    region: 'Gilgit-Baltistan',
    shortDescription: 'Witness Shangrila Resort, Katpana Cold Desert dunes, majestic Shigar Fort, and the otherworldly high-altitude plateau of Deosai National Park.',
    description: 'Baltistan offers a landscape straight out of fantasy. Skardu is surrounded by towering granite towers and four of the world’s fourteen 8,000-meter peaks. This 8-day expedition visits Lower and Upper Kachura Lake (Shangrila), the white sand dunes of Katpana Cold Desert against snow-capped peaks, 400-year-old restored Shigar Fort, and the vast, undulating Deosai Plains (4,114m)—the second highest alpine plateau on Earth.',
    pricePerPerson: 92000,
    originalPrice: 105000,
    durationDays: 8,
    durationNights: 7,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Naran / Chilas',
        description: 'Early morning pickup. Traverse through Mansehra, Balakot, and Kaghan Valley to Chilas.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Indus View Chilas'
      },
      {
        day: 2,
        title: 'Drive along Indus River into Skardu Valley',
        description: 'Jaw-dropping drive through the Rondu Gorge into Skardu basin. Check-in and relax by the Indus.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Tibet Center Hotel / Dewanekhas Skardu'
      },
      {
        day: 3,
        title: 'Shangrila Resort & Upper Kachura Lake',
        description: 'Visit the world-famous Shangrila heart-shaped lake, followed by a short pine forest walk to crystal-clear Upper Kachura Lake.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Dewanekhas Skardu'
      },
      {
        day: 4,
        title: 'Deosai National Park & Sheosar Lake (4,114m)',
        description: 'Board 4x4 off-road jeeps to climb Ali Malik pass into Deosai National Park. Marvel at Sheosar Lake and Kala Pani river.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Dewanekhas Skardu / Glamping in Deosai'
      },
      {
        day: 5,
        title: 'Shigar Valley & Serena Shigar Fort',
        description: 'Explore the historic 17th-century Raja Palace (Fong-Khar) restored by Aga Khan Trust, plus the Blind Lake (Jarba Xho).',
        meal: 'Breakfast & Dinner',
        accommodation: 'Shigar Fort Hotel / Space Hotel Shigar'
      },
      {
        day: 6,
        title: 'Katpana Cold Desert Sunset & Kharpocho Fort',
        description: 'Walk on rolling white sand dunes surrounded by glaciers at Katpana Cold Desert. Sunset photography session.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Dewanekhas Skardu'
      },
      {
        day: 7,
        title: 'Skardu to Chilas / Besham Return Leg',
        description: 'Drive back along the Karakoram Highway route with scenic lunch stop.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Besham Hilton Hotel'
      },
      {
        day: 8,
        title: 'Besham to Islamabad & Farewell',
        description: 'Scenic motorway return to Islamabad. Tour concludes with fond memories.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'Luxury AC transport from Islamabad round-trip',
      'Dedicated 4x4 Mountain Jeeps for Deosai National Park',
      '7 Nights hotel stays in reputable 3-star and heritage hotels',
      'Breakfast and hearty dinners throughout',
      'All toll taxes, parking fees, and fuel',
      'Experienced mountain guide and driver allowances'
    ],
    excludedServices: [
      'Lunch, soft drinks, and laundry',
      'Boating and entry tickets at Shangrila Resort',
      'Any extra jeep charges due to roadblocks/landslides',
      'Personal emergency evacuation costs'
    ],
    departureDates: [
      { date: '2026-11-08', seatsTotal: 18, seatsAvailable: 5, status: 'Filling Fast' },
      { date: '2026-11-20', seatsTotal: 18, seatsAvailable: 12, status: 'Available' },
      { date: '2026-12-05', seatsTotal: 18, seatsAvailable: 18, status: 'Available' }
    ],
    meetingPoint: 'Islamabad G-9 Markaz / Airport',
    difficulty: 'Moderate',
    rating: 4.95,
    reviewsCount: 189,
    published: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Fairy Meadows & Nanga Parbat Base Camp Trek',
    slug: 'fairy-meadows-nanga-parbat-base-camp-trek',
    destination: 'Fairy Meadows',
    region: 'Gilgit-Baltistan',
    shortDescription: 'The ultimate adventure: thrilling 4x4 jeep track from Raikot Bridge, alpine pine forest trek, wooden cottages, and jaw-dropping views of Nanga Parbat (8,126m).',
    description: 'Ranked among the world’s most iconic mountain destinations, Fairy Meadows is an idyllic green pasture nestled right beneath the north face (Raikot Face) of Nanga Parbat—the ninth highest mountain in the world. This tour combines thrilling mountain off-roading, peaceful alpine hiking, crackling evening bonfires, and unforgettable starry night skies.',
    pricePerPerson: 65000,
    originalPrice: 75000,
    durationDays: 6,
    durationNights: 5,
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Chilas',
        description: 'Early morning departure via Hazara Motorway and Karakoram Highway.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Grace Continental Hotel Chilas'
      },
      {
        day: 2,
        title: 'Raikot Bridge, 4x4 Jeep Ride & Hike to Fairy Meadows',
        description: 'Switch to local 4x4 mountain jeeps at Raikot Bridge to Tattu village. Hike 3 to 4 hours through pine forest to Fairy Meadows.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Fairy Meadows Wooden Cottages'
      },
      {
        day: 3,
        title: 'Trek to Beyal Camp & Nanga Parbat Viewpoint',
        description: 'Moderate hike through birch forests to Beyal Camp (3,500m) and the Raikot Glacier viewpoint right under Nanga Parbat.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Fairy Meadows Wooden Cottages'
      },
      {
        day: 4,
        title: 'Leisure Day at Fairy Meadows & Bonfire',
        description: 'Explore the reflection pools of Fairy Meadows, horse riding, photography, and evening bonfire with local Balti music.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Fairy Meadows Wooden Cottages'
      },
      {
        day: 5,
        title: 'Hike Down to Tattu & Drive to Besham',
        description: 'Morning descent to Tattu village, jeep transfer to Raikot Bridge, and drive to Besham on the KKH.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Besham Continental'
      },
      {
        day: 6,
        title: 'Return to Islamabad',
        description: 'Drive back to Islamabad via Abbottabad. Tour completes by evening.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'AC Coaster / Grand Cabin transport from Islamabad to Raikot',
      '4x4 Jeep transfer from Raikot Bridge to Tattu village round-trip',
      '3 Nights wooden cottage stay at Fairy Meadows overlooking Nanga Parbat',
      '2 Nights transit hotel accommodation',
      'Daily breakfast and dinner with bonfire tea',
      'Certified local mountain guide and trek leader'
    ],
    excludedServices: [
      'Personal trekking gear and walking poles',
      'Porter or horse hire for personal luggage from Tattu to Fairy Meadows',
      'Lunch and extra beverage purchases'
    ],
    departureDates: [
      { date: '2026-11-10', seatsTotal: 16, seatsAvailable: 3, status: 'Filling Fast' },
      { date: '2026-11-25', seatsTotal: 16, seatsAvailable: 11, status: 'Available' }
    ],
    meetingPoint: 'Islamabad Daewoo Terminal / I-8',
    difficulty: 'Challenging',
    rating: 4.98,
    reviewsCount: 112,
    published: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Swat Emerald Valley & Malam Jabba Ski Resort',
    slug: 'swat-emerald-valley-malam-jabba-ski-resort',
    destination: 'Swat Valley',
    region: 'Khyber Pakhtunkhwa',
    shortDescription: 'Explore the Switzerland of the East: historic White Palace, chairlift rides at Malam Jabba, serene Kalam pine forests, and glacial Mahodand Lake.',
    description: 'Known historically as Uddiyana and praised by Queen Elizabeth II as the Switzerland of the East, Swat Valley offers lush emerald hills, roaring rivers, Buddhist archaeological treasures, and winter ski slopes. On this 5-day tour, explore the scenic resorts of Malam Jabba, the roaring Swat River, Ushu Forest, and the pristine waters of Lake Mahodand.',
    pricePerPerson: 42000,
    originalPrice: 49000,
    durationDays: 5,
    durationNights: 4,
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Swat via Swat Motorway & White Palace',
        description: 'Smooth drive through the Swat Express Motorway and tunnels. Visit the historical White Palace (Sufaid Mahal) in Marghuzar.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Serena Swat Hotel / Rock City Resort Mingora'
      },
      {
        day: 2,
        title: 'Malam Jabba Ski Resort & Chairlift Adventure',
        description: 'Drive up to Malam Jabba (2,800m). Enjoy the famous alpine chairlift, zipline, and panoramic vistas of the Hindu Raj mountain chain.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Rock City Resort / Malam Jabba Pearl Continental'
      },
      {
        day: 3,
        title: 'Journey to Upper Swat (Kalam Valley)',
        description: 'Follow the winding Swat river north to Kalam. Stop at Bahrain bazaar for local handicrafts and trout fish lunch.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Walnut Heights / Greens Hotel Kalam'
      },
      {
        day: 4,
        title: '4x4 Jeep Excursion to Mahodand Lake & Ushu Forest',
        description: 'Explore the towering deodar trees of Ushu Forest, Matiltan waterfall, and the turquoise waters of Mahodand Lake.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Greens Hotel Kalam'
      },
      {
        day: 5,
        title: 'Return to Islamabad with Souvenir Shopping',
        description: 'Drive back with shopping stops for Swati honey, handwoven shawls, and dried fruit.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'AC Saloon Coaster / Toyota Prado transport',
      '4 Nights hotel stay in top-tier family hotels',
      'Daily breakfast and buffet dinners',
      '4x4 Jeep transfer to Mahodand Lake & Ushu Forest',
      'Professional tour manager and fuel/toll charges'
    ],
    excludedServices: [
      'Malam Jabba chairlift and zipline tickets',
      'Lunch meals and personal shopping items'
    ],
    departureDates: [
      { date: '2026-11-06', seatsTotal: 22, seatsAvailable: 15, status: 'Available' },
      { date: '2026-11-13', seatsTotal: 22, seatsAvailable: 9, status: 'Filling Fast' },
      { date: '2026-11-27', seatsTotal: 22, seatsAvailable: 21, status: 'Available' }
    ],
    meetingPoint: 'Islamabad Faizabad Interchange / G-9',
    difficulty: 'Easy',
    rating: 4.88,
    reviewsCount: 96,
    published: true,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Naran, Kaghan & Mystical Saiful Muluk Lake',
    slug: 'naran-kaghan-mystical-saiful-muluk-lake',
    destination: 'Naran & Kaghan',
    region: 'Khyber Pakhtunkhwa',
    shortDescription: 'Witness the legendary fairytale lake of Saiful Muluk, cross Babusar Top (4,173m), and relax in the lush alpine meadows of Shogran & Siri Paye.',
    description: 'Naran and Kaghan valley remain the most beloved alpine retreat in Pakistan. Surrounded by snow-dusted peaks, roaring Kunhar river, and lush cedar woodlands, this 4-day tour takes you to Lake Saiful Muluk, associated with the classic folklore of Prince Saif and fairy Badr-ul-Jamal, plus the high-altitude viewpoints of Babusar Pass and Siri Paye.',
    pricePerPerson: 38000,
    originalPrice: 44000,
    durationDays: 4,
    durationNights: 3,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Shogran & Siri Paye Meadows',
        description: 'Drive along Hazara Motorway and Balakot. Transfer to 4x4 mountain jeeps for the steep climb to Shogran and Siri Paye.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Pine Park Hotel Shogran'
      },
      {
        day: 2,
        title: 'Drive to Naran & Lake Saiful Muluk Jeep Excursion',
        description: 'Drive along the Kunhar river to Naran bazaar. Take open-top jeeps to the mystical Lake Saiful Muluk (3,224m).',
        meal: 'Breakfast & Dinner',
        accommodation: 'Millennium Inn / Rose Valley Naran'
      },
      {
        day: 3,
        title: 'Babusar Top (4,173m) & Lulusar Lake Excursion',
        description: 'Scenic day trip up the Kaghan valley, passing Jalkhad, stopping at mirror-like Lulusar Lake and the Babusar Pass crest.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Millennium Inn Naran'
      },
      {
        day: 4,
        title: 'Rafting on Kunhar River & Return to Islamabad',
        description: 'Optional river rafting experience in Balakot, Khanpur lake viewpoint stop, and return to Islamabad.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'AC Saloon Coaster / Grand Cabin transport',
      '3 Nights standard hotel lodging',
      '4x4 Jeep to Saiful Muluk Lake and Siri Paye',
      'Daily breakfast and dinner',
      'Tour escort and all road tolls'
    ],
    excludedServices: [
      'Lake boating or river rafting fees',
      'Lunch and horse rides at Siri Paye'
    ],
    departureDates: [
      { date: '2026-11-07', seatsTotal: 20, seatsAvailable: 10, status: 'Available' },
      { date: '2026-11-21', seatsTotal: 20, seatsAvailable: 16, status: 'Available' }
    ],
    meetingPoint: 'Islamabad I-8 / Faizabad',
    difficulty: 'Easy',
    rating: 4.85,
    reviewsCount: 134,
    published: true,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Neelum Valley & Arang Kel Kashmir Escape',
    slug: 'neelum-valley-arang-kel-kashmir-escape',
    destination: 'Neelum Valley',
    region: 'Azad Kashmir',
    shortDescription: 'Explore the heavenly jewel of Azad Jammu & Kashmir: gushing waterfalls, historic Sharda Peeth university ruins, and the cable car village of Arang Kel.',
    description: 'Neelum Valley is often called Paradise on Earth. Snaking along the turquoise Neelum River that demarcates the Line of Control, this valley is blessed with dense pine forests, cascading waterfalls, wooden suspension bridges, and traditional timber houses. Visit Kutton Waterfall, Keran, Sharda Peeth—an ancient center of learning—and ride the cable car across the river to the green meadow hamlet of Arang Kel.',
    pricePerPerson: 45000,
    originalPrice: 52000,
    durationDays: 5,
    durationNights: 4,
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Muzaffarabad & Kutton Waterfall',
        description: 'Drive along Murree Expressway to Muzaffarabad. Visit the roaring Kutton Waterfall in Jagran Valley.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Kutton Jagran Resort'
      },
      {
        day: 2,
        title: 'Keran & Sharda Peeth Historical Ruins',
        description: 'Drive along the riverfront facing Indian-administered Kashmir. Explore the thousand-year-old stone temple ruins of Sharda Peeth.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Wadi Resort Sharda'
      },
      {
        day: 3,
        title: 'Kel & Cable Car to Arang Kel Alpine Village',
        description: 'Drive to Kel, ride the iconic chairlift dolly across the canyon, and hike to the breathtaking pastures of Arang Kel.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Arang Kel Wooden Lodges'
      },
      {
        day: 4,
        title: 'Morning in Arang Kel & Return to Keran',
        description: 'Wake up above the clouds. Morning photography and tea in the village. Descend and return to Keran for overnight stay.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Green Village Resort Keran'
      },
      {
        day: 5,
        title: 'Dhani Waterfall & Return to Islamabad',
        description: 'Visit the towering Dhani Waterfall and drive back to Islamabad through Murree Hills.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'Dedicated AC Hiace Grand Cabin or Coaster',
      '4 Nights hotel lodging across Neelum Valley',
      'Daily breakfast and hot dinners',
      'Arang Kel cable car lift passes',
      'Experienced mountain driver and guide'
    ],
    excludedServices: [
      'Lunch and mid-day refreshments',
      'Porter charges for luggage up to Arang Kel'
    ],
    departureDates: [
      { date: '2026-11-07', seatsTotal: 18, seatsAvailable: 7, status: 'Filling Fast' },
      { date: '2026-11-28', seatsTotal: 18, seatsAvailable: 15, status: 'Available' }
    ],
    meetingPoint: 'Islamabad Faizabad / Rawalpindi',
    difficulty: 'Moderate',
    rating: 4.91,
    reviewsCount: 88,
    published: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Lahore Walled City, Mughal Heritage & Food Trail',
    slug: 'lahore-walled-city-mughal-heritage-food-trail',
    destination: 'Lahore Heritage',
    region: 'Punjab',
    shortDescription: 'Immerse yourself in 1,000 years of history: Badshahi Mosque, Lahore Fort (Shahi Qila), Delhi Gate spice bazaars, Wazir Khan Mosque, and authentic culinary delights.',
    description: 'They say in Pakistan: "Whoever hasn\'t seen Lahore hasn\'t been born!" Lahore is the cultural heart of Pakistan, brimming with grandeur from the Mughal Empire, Sikh period, and British Raj. Experience the majestic Badshahi Mosque, Shish Mahal mirror palace inside Lahore Fort, the tile mosaics of Wazir Khan Mosque, mouth-watering street food at Fort Road, and the high-energy Wagah Border flag-lowering ceremony.',
    pricePerPerson: 25000,
    originalPrice: 30000,
    durationDays: 3,
    durationNights: 2,
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Walled City, Wazir Khan Mosque & Shahi Hammam',
        description: 'Walk through Delhi Gate into the Mughal walled city, restored royal baths (Shahi Hammam), and frescoed Wazir Khan Mosque.',
        meal: 'Dinner at Haveli Food Street',
        accommodation: 'Pearl Continental / Luxus Grand Lahore'
      },
      {
        day: 2,
        title: 'Lahore Fort, Badshahi Mosque & Wagah Border Ceremony',
        description: 'Morning exploration of UNESCO-listed Lahore Fort and Badshahi Mosque. Afternoon excursion to the thrilling Pak-India Wagah Border parade.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Luxus Grand Lahore'
      },
      {
        day: 3,
        title: 'Shalimar Gardens & Anarkali Bazaar Heritage Walk',
        description: 'Visit the Persian-style royal Shalimar Gardens, Lahore Museum, and iconic Anarkali Bazaar before drop-off.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'AC executive car / Hiace throughout tour',
      '2 Nights luxury 4-star hotel stay in Lahore',
      'Daily breakfast and traditional dinner at Fort Road Haveli',
      'Monument entry tickets and licensed heritage storyteller guide',
      'Reserved VIP seating for Wagah Border ceremony'
    ],
    excludedServices: [
      'Personal shopping and street snacks outside planned meals'
    ],
    departureDates: [
      { date: '2026-11-06', seatsTotal: 25, seatsAvailable: 18, status: 'Available' },
      { date: '2026-11-20', seatsTotal: 25, seatsAvailable: 22, status: 'Available' }
    ],
    meetingPoint: 'Allama Iqbal International Airport / Lahore Railway Station',
    difficulty: 'Easy',
    rating: 4.96,
    reviewsCount: 165,
    published: true,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Kumrat Valley & Jahaz Banda Alpine Trek',
    slug: 'kumrat-valley-jahaz-banda-alpine-trek',
    destination: 'Kumrat Valley',
    region: 'Khyber Pakhtunkhwa',
    shortDescription: 'Untouched alpine wilderness: towering deodar forests, roaring Panjkora river, 19th-century carved Thal wooden mosque, and the glacial bowl of Katora Lake.',
    description: 'Kumrat Valley in Upper Dir is one of Pakistan\'s most pristine forest sanctuaries. Surrounded by virgin deodar pine canopies and snow-crested peaks, this 5-day tour leads you through the historic wooden mosque in Thal, campfire sites by the Panjkora River, high meadows of Jahaz Banda (3,100m), and the jaw-dropping trek to Katora Lake (3,500m).',
    pricePerPerson: 48000,
    originalPrice: 55000,
    durationDays: 5,
    durationNights: 4,
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Upper Dir & Thal Village',
        description: 'Drive via Swat Motorway and Lowari Tunnel approach into Upper Dir. Explore the ancient wood-carved Thal mosque.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Kumrat River Camps / Panjkora Lodge'
      },
      {
        day: 2,
        title: 'Deep Kumrat Forest, Do Janga & Kala Chashma',
        description: 'Explore the dense deodar canopy, Kala Chashma (Black Spring) waterfall, and the roaring Do Janga river confluence in 4x4 jeeps.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Kumrat Alpine Resort'
      },
      {
        day: 3,
        title: '4x4 Jeep Climb & Hike to Jahaz Banda (3,100m)',
        description: 'Mountain jeep trail to Jaki Banda followed by a picturesque 3-hour hike through alpine flower meadows to Jahaz Banda.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Jahaz Banda Alpine Wooden Huts'
      },
      {
        day: 4,
        title: 'Trek to Katora Glacial Lake (3,500m)',
        description: 'Ascend to the breathtaking amphitheater of Katora Lake, shaped like an emerald bowl beneath towering jagged peaks.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Jahaz Banda Huts'
      },
      {
        day: 5,
        title: 'Descent to Thal & Motorway Return to Islamabad',
        description: 'Morning descent to Thal village and smooth return journey to Islamabad.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'AC Transport Islamabad to Thal round-trip',
      'Dedicated 4x4 offroad jeeps for Kumrat and Jahaz Banda',
      '4 Nights hotel and alpine hut accommodation',
      'Daily breakfast and hot dinners',
      'Experienced mountain guide and trek leaders'
    ],
    excludedServices: [
      'Personal trekking poles and sleeping bags',
      'Lunch and mid-day snacks'
    ],
    departureDates: [
      { date: '2026-11-09', seatsTotal: 18, seatsAvailable: 11, status: 'Available' },
      { date: '2026-11-23', seatsTotal: 18, seatsAvailable: 14, status: 'Available' }
    ],
    meetingPoint: 'Faizabad / Islamabad Daewoo',
    difficulty: 'Moderate',
    rating: 4.92,
    reviewsCount: 79,
    published: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Gwadar & Makran Coastal Highway Odyssey',
    slug: 'gwadar-makran-coastal-highway-odyssey',
    destination: 'Gwadar & Makran Coast',
    region: 'Balochistan',
    shortDescription: 'Cruise one of the world\'s most dramatic coastal highways: natural rock Sphinx of Balochistan, Princess of Hope, Ormara Turtle Beach, and Gwadar Hammerhead.',
    description: 'Experience the warm, sun-kissed coast of Pakistan. The Makran Coastal Highway (N-10) hugs the azure Arabian Sea and slices through Martian mud volcanoes and wind-carved stone monuments inside Hingol National Park. Marvel at the Princess of Hope rock sculpture, relax on the white sands of Ormara Beach, and climb Koh-e-Batil for sunset over Gwadar port.',
    pricePerPerson: 58000,
    originalPrice: 65000,
    durationDays: 4,
    durationNights: 3,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Karachi to Hingol National Park & Princess of Hope',
        description: 'Cruise along the scenic Coastal Highway. Visit Kund Malir Golden Beach, Princess of Hope, and the natural Sphinx.',
        meal: 'Breakfast & Seafood Dinner',
        accommodation: 'Ormara Beach Resort'
      },
      {
        day: 2,
        title: 'Ormara Beach to Gwadar Hammerhead',
        description: 'Morning swim at Ormara beach. Scenic drive through Buzi Pass to Gwadar. Sunset at Marine Drive.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Pearl Continental Gwadar (Koh-e-Batil)'
      },
      {
        day: 3,
        title: 'Koh-e-Batil Summit & Fisherman Boat Tour',
        description: 'Climb 600 steps of Koh-e-Batil cliff overlooking the crescent bays of Gwadar. Boat excursion across the bay.',
        meal: 'Breakfast & Dinner',
        accommodation: 'Pearl Continental Gwadar'
      },
      {
        day: 4,
        title: 'Return to Karachi via Mud Volcanoes',
        description: 'Return drive along Coastal Highway with stop at Chandragup mud volcano sacred Hindu pilgrimage site.',
        meal: 'Breakfast',
        accommodation: 'Trip Concludes'
      }
    ],
    includedServices: [
      'Luxury AC executive coaster / Saloon car',
      '3 Nights luxury 4-star and beachfront resort stays',
      'Daily breakfast and fresh coastal seafood dinners',
      'Gwadar boat cruise and park entrance passes',
      'Professional coastal guide'
    ],
    excludedServices: [
      'Air tickets to/from Karachi',
      'Personal water sports activities'
    ],
    departureDates: [
      { date: '2026-11-12', seatsTotal: 20, seatsAvailable: 15, status: 'Available' },
      { date: '2026-11-26', seatsTotal: 20, seatsAvailable: 18, status: 'Available' }
    ],
    meetingPoint: 'Jinnah International Airport / Clifton Karachi',
    difficulty: 'Easy',
    rating: 4.89,
    reviewsCount: 64,
    published: true,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Hamza Malik',
    location: 'Karachi, Pakistan',
    rating: 5,
    comment: 'Our 7-day Hunza trip with Traver was beyond magical! The vehicle was comfortable, our guide Naveed knew every story about Baltit Fort, and booking over WhatsApp made coordination effortless. 10/10 recommended!',
    tourTitle: 'Magical Hunza & Attabad Lake Expedition',
    date: 'October 2026'
  },
  {
    id: 'rev-2',
    authorName: 'Sarah Jenkins',
    location: 'Manchester, UK',
    rating: 5,
    comment: 'Visiting Skardu and Deosai was on my bucket list for years. The team arranged everything from 4x4 jeeps to wonderful hotels. The landscape of northern Pakistan is truly heaven on earth.',
    tourTitle: 'Skardu & Deosai Plains: Land of Giants',
    date: 'September 2026'
  },
  {
    id: 'rev-3',
    authorName: 'Bilal & Ayesha Tariq',
    location: 'Lahore, Pakistan',
    rating: 5,
    comment: 'We booked the Swat & Kalam honeymoon package. Transparent PKR pricing, no hidden costs, and prompt WhatsApp replies whenever we had questions about the departure date. Thank you Traver team!',
    tourTitle: 'Swat Emerald Valley & Malam Jabba Ski Resort',
    date: 'October 2026'
  }
];
