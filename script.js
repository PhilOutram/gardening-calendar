/* =============================================
   GARDEN PLANNER — script.js
   All plant data + calendar + settings logic
   ============================================= */

/* ══════════════════════════════
   CONSTANTS
══════════════════════════════ */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_FULL = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
const MONTH_ICONS = ['❄️','🌱','🌤️','🌸','🌼','☀️','🌻','🌿','🍂','🍁','🌧️','🎄'];

/* ══════════════════════════════
   PLANT DATA
   (months are 0-indexed: 0=Jan … 11=Dec)
   Fields:
     sowIndoor  : [month indices] or []
     sowOutdoor : [month indices] or []
     bloom      : [month indices] or []
     harvest    : [month indices] or []
══════════════════════════════ */
let plants = [

  /* ── BASKETS & CONTAINERS COLLECTION ── */
  {
    id: 'alyssum', name: 'Alyssum (Pastel Mix)', type: 'flower',
    variety: 'Pastel Mix', height: '15cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],   // Jan–Jun
    sowOutdoor: [3,4,5],          // Apr–Jun (direct once frost-free)
    bloom:      [5,6,7,8],        // Jun–Sep
    harvest:    [],
    instructions: 'Sow seeds indoors January to June in trays at 18–21°C. Sprinkle compost lightly over seeds. Move seedlings to a bright windowsill at 15°C. Transplant outdoors from May when weather is warmer. Deadhead regularly to extend flowering. Great for trailing over basket edges. Attracts butterflies and bees.'
  },
  {
    id: 'lobelia', name: 'Lobelia (Cascade Mix)', type: 'flower',
    variety: 'Cascade Mix', height: '30cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Sow indoors January to June. Do not cover seeds — they need light to germinate. Thin seedlings and transplant to hanging baskets from May. Water well in hot weather. Pinch back for bushy growth. Excellent trailer for containers.'
  },
  {
    id: 'marigold-dwarf', name: 'Marigold (Dwarf Mix)', type: 'flower',
    variety: 'Dwarf Mix', height: '25cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Sow indoors January to June at 18–21°C. Transplant after last frost. Deadhead to encourage continuous blooms. Marigolds deter whitefly and are ideal companion plants. Full sun preferred.'
  },
  {
    id: 'nasturtium', name: 'Nasturtium (Trailing Mix)', type: 'flower',
    variety: 'Trailing Mix', height: '200cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Sow indoors January to June or direct outdoors from April to June after frost risk has passed. Thrives in poor soil — avoid over-fertilising or you get more leaves than flowers. Flowers and leaves are edible. Excellent trailer for hanging baskets.'
  },
  {
    id: 'petunia', name: 'Petunia (Balcony Mix)', type: 'flower',
    variety: 'Balcony Mix', height: '35cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Surface-sow indoors January to June — do not cover seeds. Germination takes 10–14 days at 21°C. Transplant from May. Water regularly and feed fortnightly with a high-potash fertiliser. Remove spent flowers. Superb for containers and baskets.'
  },
  {
    id: 'viola-pansy', name: 'Viola Pansy (Swiss Giant Mix)', type: 'flower',
    variety: 'Swiss Giant Mix', height: '15cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [4,5,6,7,8,9],   // May–Oct
    harvest:    [],
    instructions: 'Sow indoors January to June at 18–21°C. Viola pansies tolerate cooler conditions and can bloom into October. Deadhead to extend the season. Excellent for containers, edging, and baskets. Edible flowers.'
  },

  /* ── EASY GROW COLLECTION ── */
  {
    id: 'candytuft', name: 'Candytuft (Fairy Mix)', type: 'flower',
    variety: 'Fairy Mix', height: '25cm', enabled: true,
    sowIndoor:  [0,1,2],          // Jan–Mar (indoor alternative)
    sowOutdoor: [2,3,4,5],        // Mar–Jun direct
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Direct sow outdoors March to June where it is to flower. Prepare ground by removing stones and weeds. Cover with fine compost. Water well. Alternatively sow indoors January to March, transplant outdoors from April. Flowers appear 12–14 weeks from sowing.'
  },
  {
    id: 'poppy', name: 'Poppy (Field Mixture)', type: 'flower',
    variety: 'Field Mixture', height: '40cm', enabled: true,
    sowIndoor:  [0,1,2],
    sowOutdoor: [2,3,4,5],        // Mar–Jun
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Direct sow outdoors March to June. Scatter seeds thinly and rake in lightly. Do not transplant — poppies dislike root disturbance. Thin to 15cm apart when large enough. Self-seeds freely. Deadhead to extend flowering.'
  },
  {
    id: 'cornflower', name: 'Cornflower (Dwarf Jubilee Gem)', type: 'flower',
    variety: 'Dwarf Jubilee Gem', height: '40cm', enabled: true,
    sowIndoor:  [0,1,2],
    sowOutdoor: [2,3,4,5],
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Direct sow March to June in well-prepared soil. Thin to 20cm apart. Cornflowers are drought-tolerant once established. Excellent for cutting and attract pollinators. Deadhead for continuous flowering. Can also be autumn-sown for earlier blooms.'
  },
  {
    id: 'morning-glory', name: 'Morning Glory (Convolvulus Tricolour)', type: 'flower',
    variety: 'Convolvulus Tricolour', height: '300cm', enabled: true,
    sowIndoor:  [0,1,2],
    sowOutdoor: [2,3,4,5],
    bloom:      [5,6,7,8,9],      // Jun–Oct
    harvest:    [],
    instructions: 'Sow indoors January to March or direct outdoors March to June after frost risk. Morning Glory will climb trellis or netting — provide support. Water well in hot weather. Flowers open in the morning. Avoid over-watering which can reduce blooms.'
  },
  {
    id: 'nigella', name: 'Nigella (Persian Jewels)', type: 'flower',
    variety: 'Persian Jewels', height: '40cm', enabled: true,
    sowIndoor:  [0,1,2],
    sowOutdoor: [2,3,4,5],
    bloom:      [4,5,6,7,8],
    harvest:    [],
    instructions: 'Direct sow outdoors March to June. Nigella dislikes being moved — do not transplant. Thin to 20cm. Self-seeds generously. Sow in autumn for earlier spring flowers. The decorative seed heads are excellent for dried arrangements.'
  },
  {
    id: 'sunflower', name: 'Sunflower (Russian Giant)', type: 'flower',
    variety: 'Russian Giant', height: '200cm', enabled: true,
    sowIndoor:  [2,3],            // Mar–Apr
    sowOutdoor: [3,4,5],          // Apr–Jun after frost
    bloom:      [6,7,8,9],        // Jul–Oct
    harvest:    [],
    instructions: 'Sow indoors March to April or direct outdoors from April after last frost. Grow in full sun in rich soil. Support tall stems with garden canes. Sunflowers attract bees and birds. Allow seed heads to mature for bird feed. Each plant usually produces one large bloom.'
  },

  /* ── SWEET PEA COLLECTION ── */
  {
    id: 'sweetpea-bijou', name: 'Sweet Pea (Bijou Mix)', type: 'flower',
    variety: 'Bijou Mix', height: '40cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5,6,7,8,9], // Jan–Oct
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8,9],
    harvest:    [],
    instructions: 'Soak seeds overnight in lukewarm water before sowing. Sow 4cm apart and 10cm deep in moist soil at 18–21°C. Bijou Mix is compact and suited to containers. Transplant from April. Deadhead to extend flowering. Support with trellis or netting for best display.'
  },
  {
    id: 'sweetpea-royal-blue', name: 'Sweet Pea (Royal Blue)', type: 'flower',
    variety: 'Royal Blue', height: '250cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5,6,7,8,9],
    sowOutdoor: [3,4,5],
    bloom:      [6,7,8,9],
    harvest:    [],
    instructions: 'Soak seeds overnight before sowing. Sow indoors or direct outdoors after frost risk. Climbing variety to 250cm — provide strong support. Highly scented. Remove fading flowers daily for continuous blooms throughout summer. Harden off before planting outside.'
  },
  {
    id: 'sweetpea-royal-white', name: 'Sweet Pea (Royal White)', type: 'flower',
    variety: 'Royal White', height: '250cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5,6,7,8,9],
    sowOutdoor: [3,4,5],
    bloom:      [6,7,8,9],
    harvest:    [],
    instructions: 'Soak seeds overnight before sowing. Sow January to October indoors or direct outdoors April to June. Climb to 250cm — needs trellis or netting. Fragrant white flowers. Deadhead regularly. Water well in dry periods. Excellent for cutting.'
  },
  {
    id: 'sweetpea-royal-maroon', name: 'Sweet Pea (Royal Maroon)', type: 'flower',
    variety: 'Royal Maroon', height: '250cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5,6,7,8,9],
    sowOutdoor: [3,4,5],
    bloom:      [6,7,8,9],
    harvest:    [],
    instructions: 'Soak seeds overnight before sowing. Deep maroon climbing sweet pea to 250cm. Sow indoors any time January–October. Transplant from April once hardened off. Provide support for climbing. Remove spent flowers for continuous blooming. Richly scented variety.'
  },
  {
    id: 'sweetpea-harlequin', name: 'Sweet Pea (Harlequin Mix)', type: 'flower',
    variety: 'Harlequin Mix', height: '250cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5,6,7,8,9],
    sowOutdoor: [3,4,5],
    bloom:      [6,7,8,9],
    harvest:    [],
    instructions: 'Mixed colour climbing sweet pea. Soak seeds overnight before sowing. Sow indoors January to October or direct from April. Provide support for climbing to 250cm. Deadhead daily to keep flowers coming. Excellent cut flower. Attractive to bees and butterflies.'
  },
  {
    id: 'sweetpea-scented', name: 'Sweet Pea (Scented Mix)', type: 'flower',
    variety: 'Scented Mix', height: '250cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5,6,7,8,9],
    sowOutdoor: [3,4,5],
    bloom:      [6,7,8,9],
    harvest:    [],
    instructions: 'Highly scented mixed sweet pea. Soak seeds overnight. Sow indoors January to October. Direct sow outdoors April to June after frost. Climb to 250cm on trellis. Deadhead to encourage more flowers. One of the most fragrant cut flowers you can grow.'
  },

  /* ── BUTTERFLY & BEE COLLECTION ── */
  {
    id: 'stock', name: 'Stock (Evening Scented)', type: 'flower',
    variety: 'Evening Scented', height: '50cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8],
    harvest:    [],
    instructions: 'Sow indoors January to June at 18–21°C, or direct outdoors April to June. Do not cover seeds — they need light to germinate. Transplant from May. Evening-scented stock releases its fragrance at dusk — ideal near seating areas. Attracts moths and other pollinators.'
  },
  {
    id: 'foxglove', name: 'Foxglove (Digitalis)', type: 'flower',
    variety: 'Digitalis', height: '120cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [4,5,6,7],        // May–Aug
    harvest:    [],
    instructions: 'CAUTION: Toxic if eaten. Sow indoors January to June or direct outdoors April to June. Do not cover seeds. Biennial — often flowers in second year. Transplant to final position in autumn or spring. Loved by bumblebees. Grows well in partial shade. Remove spent stems to encourage side shoots.'
  },
  {
    id: 'lavender', name: 'Lavender (Munstead)', type: 'herb',
    variety: 'Munstead', height: '50cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8,9],
    harvest:    [6,7,8],
    instructions: 'Sow indoors January to June at 15–18°C. Germination can be slow — 2–4 weeks. Direct sow outdoors from April. Full sun and well-drained soil essential. Trim after flowering to keep bushy. Harvest flower spikes just before fully open for best fragrance and drying. Loved by bees and butterflies.'
  },
  {
    id: 'agastache', name: 'Agastache (Mexicana)', type: 'flower',
    variety: 'Mexicana', height: '60cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8,9],
    harvest:    [],
    instructions: 'Sow indoors January to June at 18–21°C. Surface-sow and press lightly into compost. Transplant outdoors from May. Agastache thrives in full sun in well-drained soil. Long-blooming spikes attract bees and butterflies. Drought-tolerant once established.'
  },
  {
    id: 'echinops', name: 'Echinops (Ritro Blue)', type: 'flower',
    variety: 'Ritro Blue', height: '120cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [6,7],            // Jul–Aug
    harvest:    [],
    instructions: 'Sow indoors January to June. Direct sow outdoors April to June. Transplant to final position in autumn or spring — may not flower until second year. Globe thistle is a striking architectural plant. Loved by bees. Leaves and stems are spiky — handle with care. Excellent dried flower.'
  },
  {
    id: 'forget-me-not', name: 'Forget Me Not (Myosotis)', type: 'flower',
    variety: 'Myosotis', height: '15cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5],
    sowOutdoor: [3,4,5],
    bloom:      [5,6,7,8,9],
    harvest:    [],
    instructions: 'Sow indoors January to June or direct outdoors April to June. Thrives in partial shade and moist soil. Self-seeds prolifically. Biennial — best sown one year to flower the next. Beautiful for underplanting spring bulbs. Attracts early pollinators.'
  },

  /* ── VEGETABLES ── */
  {
    id: 'tomato', name: 'Tomato', type: 'vegetable',
    variety: 'General', height: '100–200cm', enabled: true,
    sowIndoor:  [1,2,3],          // Feb–Apr
    sowOutdoor: [],               // Tender — always start indoors
    bloom:      [],
    harvest:    [6,7,8,9],        // Jul–Oct
    instructions: 'Sow indoors February to April at 18–21°C. Pot on as plants grow. Harden off and transplant outdoors after last frost (late May). Grow in a sheltered, sunny spot or greenhouse. Feed with high-potash fertiliser once first flowers appear. Water regularly. Pinch out side-shoots on cordon varieties. Harvest when fruits are fully coloured.'
  },
  {
    id: 'courgette', name: 'Courgette', type: 'vegetable',
    variety: 'General', height: '60cm', enabled: true,
    sowIndoor:  [3,4],
    sowOutdoor: [4,5],
    bloom:      [],
    harvest:    [6,7,8,9],
    instructions: 'Sow indoors April (on edge) in small pots at 18–21°C. Direct sow outdoors from late May once frost risk has passed. Plant in a sheltered sunny spot in rich, moisture-retentive soil. One plant can produce 15–20 courgettes over summer. Harvest regularly when 10–15cm long to encourage more fruits. Water at base to avoid mildew.'
  },
  {
    id: 'runner-beans', name: 'Runner Beans', type: 'vegetable',
    variety: 'General', height: '250cm', enabled: true,
    sowIndoor:  [3,4],
    sowOutdoor: [4,5],
    bloom:      [],
    harvest:    [6,7,8,9],
    instructions: 'Sow indoors April to May or direct outdoors from late May after frost risk. Erect strong supports — wigwam or row of canes — before planting. Grow in full sun. Water well and feed regularly once in flower. Pick pods young and often (every 2–3 days) to encourage continuous cropping. Excellent for freezing.'
  },
  {
    id: 'carrots', name: 'Carrots', type: 'vegetable',
    variety: 'General', height: '30cm foliage', enabled: true,
    sowIndoor:  [],
    sowOutdoor: [1,2,3,4,5,6],   // Feb–Jul (under fleece Feb–Mar)
    bloom:      [],
    harvest:    [5,6,7,8,9,10],  // Jun–Nov
    instructions: 'Sow direct outdoors February to July (protect early sowings with fleece). Carrots dislike being transplanted. Sow thinly in rows 1cm deep in well-drained, stone-free soil. Thin to 5–7cm apart. Cover with fleece to deter carrot fly. Harvest from 3–4 months after sowing. Succession-sow every 3–4 weeks for continuous harvest.'
  },
  {
    id: 'lettuce', name: 'Lettuce', type: 'vegetable',
    variety: 'Mixed', height: '20cm', enabled: true,
    sowIndoor:  [0,1,2,3,4,5,6,7], // Jan–Aug
    sowOutdoor: [2,3,4,5,6,7],
    bloom:      [],
    harvest:    [4,5,6,7,8,9,10],
    instructions: 'Sow outdoors March to July or indoors from January. Sow thinly in rows or modules. Thin to 20–30cm. Succession-sow every 2–3 weeks for a continuous supply. Cut-and-come-again varieties give multiple harvests. Keep moist — bolts in dry conditions. Harvest outer leaves or whole heads. Grows well in containers.'
  },
  {
    id: 'peas', name: 'Peas', type: 'vegetable',
    variety: 'General', height: '60–150cm', enabled: true,
    sowIndoor:  [1,2,3],
    sowOutdoor: [2,3,4,5],
    bloom:      [],
    harvest:    [5,6,7,8],
    instructions: 'Sow indoors February to March or direct outdoors March to May in well-prepared soil. Provide netting or twiggy sticks for support. Water well once pods start to form. Harvest pods regularly when plump and sweet — picking encourages more pods. Eat fresh or freeze. Good companion for carrots. Fix nitrogen in soil.'
  },
  {
    id: 'broad-beans', name: 'Broad Beans', type: 'vegetable',
    variety: 'General', height: '90–120cm', enabled: true,
    sowIndoor:  [1,2,3,10],       // Feb–Mar or Nov indoor head start
    sowOutdoor: [1,2,3,4,10,11],  // Feb–Apr or Oct–Nov overwintering
    bloom:      [],
    harvest:    [5,6,7],
    instructions: 'Sow outdoors October to November (overwintering varieties) or February to April. Can start indoors in February for a head start. Sow 5cm deep in rows, 20cm apart. Pinch out growing tips when first pods form to deter blackfly. Support with canes and string. Harvest pods when plump but before they go leathery.'
  },
  {
    id: 'beetroot', name: 'Beetroot', type: 'vegetable',
    variety: 'General', height: '30cm foliage', enabled: true,
    sowIndoor:  [2,3,4],
    sowOutdoor: [3,4,5,6],
    bloom:      [],
    harvest:    [6,7,8,9,10],
    instructions: 'Sow indoors March to May or direct outdoors April to June. Sow in clumps of 2–3 seeds, 3cm deep. Thin to 10cm apart. Keep well watered. Harvest golf-ball size roots for best flavour. Leaves are also edible as salad. Good for successive sowing. Stores well in sand over winter.'
  },
  {
    id: 'potato', name: 'Potatoes', type: 'vegetable',
    variety: 'General', height: '60–90cm', enabled: true,
    sowIndoor:  [0,1],            // Jan–Feb (chitting)
    sowOutdoor: [2,3,4],          // Mar–May (planting out)
    bloom:      [],
    harvest:    [6,7,8,9],
    instructions: 'Chit seed potatoes January to February on a cool, bright windowsill. Plant out first earlies from mid-March, main crop from April to May. Plant 12cm deep in rows, earthing up as they grow. Water well once flowering. Harvest first earlies when plants flower; main crop in late summer when foliage dies back. Store in paper sacks in the dark.'
  },
  {
    id: 'spinach', name: 'Spinach', type: 'vegetable',
    variety: 'General', height: '20–30cm', enabled: true,
    sowIndoor:  [1,2,3],
    sowOutdoor: [2,3,4,5,6,7,8,9],
    bloom:      [],
    harvest:    [4,5,6,7,8,9,10,11],
    instructions: 'Sow direct outdoors March to September or indoors from February. Thin to 7–10cm apart. Keep well watered to prevent bolting. Harvest outer leaves from 6–8 weeks. Autumn sowings overwinter for early spring harvests. Prefers cooler weather — bolts quickly in heat. Grow in partial shade in summer.'
  },

  /* ── HERBS ── */
  {
    id: 'basil', name: 'Basil', type: 'herb',
    variety: 'Sweet Basil', height: '30–60cm', enabled: true,
    sowIndoor:  [2,3,4,5],        // Mar–Jun
    sowOutdoor: [4,5],            // May–Jun after frost
    bloom:      [],
    harvest:    [5,6,7,8,9],
    instructions: 'Sow indoors March to June at 18–21°C. Do not let temperatures drop below 15°C. Transplant outdoors only after last frost. Pinch out flower buds to keep leaves coming. Harvest from the top to encourage bushy growth. Keep away from draughts. Excellent companion to tomatoes — repels aphids.'
  },
  {
    id: 'parsley', name: 'Parsley', type: 'herb',
    variety: 'Flat-leaf & Curly', height: '30cm', enabled: true,
    sowIndoor:  [1,2,3,4],
    sowOutdoor: [3,4,5,6],
    bloom:      [],
    harvest:    [4,5,6,7,8,9,10],
    instructions: 'Sow indoors February to May at 18°C. Germination slow — up to 4 weeks. Direct sow outdoors from March. Thin to 20cm. Water regularly. Harvest outer leaves from 12 weeks. Biennial — sow each year for continuous supply. Parsley is rich in vitamins. Grows well in containers on a windowsill.'
  },
  {
    id: 'chives', name: 'Chives', type: 'herb',
    variety: 'Common Chives', height: '30cm', enabled: true,
    sowIndoor:  [1,2,3],
    sowOutdoor: [3,4],
    bloom:      [4,5,6],
    harvest:    [3,4,5,6,7,8,9,10],
    instructions: 'Sow indoors February to April or direct outdoors March to April. Divide clumps every 2–3 years. Snip leaves close to the base as needed. Allow some flowers to bloom to attract pollinators — they are also edible. Grows well in pots on a sunny windowsill. Hardy perennial.'
  },
  {
    id: 'mint', name: 'Mint', type: 'herb',
    variety: 'Spearmint', height: '60cm', enabled: true,
    sowIndoor:  [2,3,4],
    sowOutdoor: [3,4,5],
    bloom:      [6,7,8],
    harvest:    [4,5,6,7,8,9],
    instructions: 'Sow indoors March to May. Mint spreads vigorously by runners — grow in a container or sink a pot into the ground to contain spread. Harvest shoots regularly. Cut back hard after flowering to encourage fresh growth. Hardy perennial. Best used fresh but can be dried or frozen.'
  },
  {
    id: 'rosemary', name: 'Rosemary', type: 'herb',
    variety: 'Common Rosemary', height: '100cm', enabled: true,
    sowIndoor:  [2,3],
    sowOutdoor: [4,5],
    bloom:      [2,3,4,5],
    harvest:    [0,1,2,3,4,5,6,7,8,9,10,11], // year-round
    instructions: 'Sow indoors March to April at 18°C — germination is slow. Easier to grow from cuttings. Plant in a sunny, sheltered spot in well-drained soil. Hardy once established. Harvest sprigs throughout the year. Prune lightly after flowering. Excellent companion to brassicas — deters cabbage root fly. Drought-tolerant.'
  },
  {
    id: 'thyme', name: 'Thyme', type: 'herb',
    variety: 'Common Thyme', height: '20–30cm', enabled: true,
    sowIndoor:  [2,3,4],
    sowOutdoor: [4,5],
    bloom:      [5,6,7],
    harvest:    [0,1,2,3,4,5,6,7,8,9,10,11],
    instructions: 'Sow indoors March to May or buy young plants. Grow in full sun in well-drained soil — thrives in poor conditions. Harvest regularly to keep bushy. Trim after flowering. Evergreen perennial — harvest year-round in mild winters. Attractive to bees. Excellent companion plant. Grows well in pots or between paving stones.'
  },
  {
    id: 'coriander', name: 'Coriander', type: 'herb',
    variety: 'Common Coriander', height: '50cm', enabled: true,
    sowIndoor:  [2,3,4,5,6,7],
    sowOutdoor: [3,4,5,6,7],
    bloom:      [],
    harvest:    [4,5,6,7,8,9],
    instructions: 'Sow direct where it is to grow every 3–4 weeks from March to July for continuous supply. Coriander bolts quickly — avoid transplanting and keep well watered. Harvest leaves when young. Allow some plants to set seed — seeds are also used as a spice. Grow in a warm, sheltered spot in well-drained soil.'
  },
  {
    id: 'dill', name: 'Dill', type: 'herb',
    variety: 'Common Dill', height: '90cm', enabled: true,
    sowIndoor:  [3,4,5,6,7],     // direct or indoor Apr–Jul
    sowOutdoor: [3,4,5,6,7],
    bloom:      [],
    harvest:    [5,6,7,8],
    instructions: 'Sow direct outdoors April to July where it is to grow — dislikes transplanting. Water regularly. Harvest leaves as needed, leaving plenty of foliage. Harvest seeds in late summer when they turn brown. Excellent with fish and pickles. Self-seeds if flower heads are left to mature. Companion to brassicas.'
  },

];

/* ══════════════════════════════
   MONTHLY GARDENING TIPS
══════════════════════════════ */
const monthlyTips = [
  { // January
    tips: [
      'Order seeds and plan your growing year — check last year\'s notes for what worked well.',
      'Start chitting seed potatoes on a cool, bright windowsill to encourage sprouting before planting.',
      'Sow onions, leeks, and celery in a heated propagator or on a warm windowsill for an early start.',
      'Check stored vegetables (potatoes, squash) for rot and remove any affected ones immediately.',
      'On dry days, tidy borders and add a thick layer of compost or leaf mould as mulch.',
    ]
  },
  { // February
    tips: [
      'Sow tomatoes, peppers, aubergines, and chillies indoors in a heated propagator at 18–21°C.',
      'Plant garlic cloves and onion sets in well-prepared, free-draining soil.',
      'Sow early peas in pots in a cold greenhouse or polytunnel.',
      'Prune winter-flowering shrubs and roses once the worst frosts have passed.',
      'Start hardening off any overwintered seedlings on mild days to acclimatise them gradually.',
    ]
  },
  { // March
    tips: [
      'Direct sow carrots, parsnips, beetroot, peas, broad beans, and spring onions outdoors.',
      'Plant first early potatoes from mid-March once the soil begins to warm.',
      'Sow annual flowers indoors for summer colour — marigolds, cosmos, and antirrhinums are all good choices.',
      'Protect early sowings from late frosts using fleece or cloches.',
      'Divide established perennials and replant to improve vigour and create new plants.',
    ]
  },
  { // April
    tips: [
      'Sow courgettes, squash, sweetcorn, and cucumbers indoors on a warm windowsill.',
      'Direct sow lettuce, radishes, spinach, and spring onions outdoors — succession-sow every 2 weeks.',
      'Plant out hardy annual seedlings started indoors, hardening them off first.',
      'Watch for late frosts — keep fleece handy to protect tender seedlings overnight.',
      'Plant asparagus crowns in well-prepared, weed-free beds for a long-term productive crop.',
    ]
  },
  { // May
    tips: [
      'Plant out tender crops — tomatoes, courgettes, cucumbers — after the last frost risk has passed.',
      'Sow French and runner beans outdoors from mid-May and erect supports early.',
      'Harden off all indoor-raised seedlings before final planting out.',
      'Deadhead spring bulbs to direct energy into next year\'s flowers.',
      'Water new plantings well and apply a mulch around plants to retain moisture and suppress weeds.',
    ]
  },
  { // June
    tips: [
      'Harvest early salads, radishes, and peas — keep picking to encourage more growth.',
      'Tie in climbing plants — beans, sweet peas, cucumbers — as they grow.',
      'Begin a regular liquid feeding programme for fruiting plants such as tomatoes and courgettes.',
      'Sow more lettuce, spinach, and quick crops for an autumn harvest.',
      'Check plants daily for pests such as aphids, slugs, and caterpillars — act quickly before infestations build.',
    ]
  },
  { // July
    tips: [
      'Water consistently — containers and hanging baskets may need watering twice daily in hot weather.',
      'Harvest beans, courgettes, and cucumbers regularly to keep plants productive.',
      'Deadhead flowers daily to prolong the season — remove fading blooms before seed sets.',
      'Sow quick-maturing crops like radishes, beetroot, and spinach for autumn harvests.',
      'Pinch out the tops of outdoor tomatoes once four trusses have formed to direct energy into ripening fruit.',
    ]
  },
  { // August
    tips: [
      'Collect seeds from annuals and dry them thoroughly before storing in labelled envelopes.',
      'Sow spring cabbages, winter salads, and overwintering onion sets for next year.',
      'Continue harvesting regularly — courgettes, beans, tomatoes, and sweetcorn should be picked often.',
      'Begin cutting back herbaceous perennials once they\'ve finished flowering to keep borders tidy.',
      'Dry herbs such as lavender, thyme, and rosemary by hanging in small bunches in a warm, dry place.',
    ]
  },
  { // September
    tips: [
      'Harvest squash and pumpkins before the first frosts; cure in a sunny spot for a week to harden the skins.',
      'Plant spring-flowering bulbs — tulips, daffodils, hyacinths, and alliums.',
      'Sow winter salad leaves such as lamb\'s lettuce, rocket, and spinach for undercover growing.',
      'Dig up and store main crop potatoes on a dry day — leave to dry before storing.',
      'Plant garlic cloves from the autumn equinox onwards for next summer\'s harvest.',
    ]
  },
  { // October
    tips: [
      'Plant overwintering broad beans directly outdoors for an early crop next year.',
      'Plant garlic and spring onion sets — they establish roots over winter before growing strongly in spring.',
      'Clear spent summer crops and compost healthy plant material — add to the compost heap.',
      'Cut back herbaceous perennials and divide congested clumps to refresh planting.',
      'Protect tender perennials with fleece, straw, or horticultural fleece as temperatures drop.',
    ]
  },
  { // November
    tips: [
      'Tidy up the vegetable plot — clear remaining crops and add well-rotted manure or compost to rest over winter.',
      'Plant tulip bulbs now for the best spring display — they go in after other spring bulbs.',
      'Prune fruit trees and bushes during dormancy — remove dead, diseased, or crossing branches.',
      'In mild areas, sow Aquadulce Claudia broad beans for early crops next spring.',
      'Check outdoor containers and pot feet are in place to prevent waterlogging in winter rains.',
    ]
  },
  { // December
    tips: [
      'Plan next year\'s crop rotations, noting where each type of vegetable grew this season.',
      'Order seeds early — popular varieties sell out by late winter, so shop now for best choice.',
      'Clean and sharpen tools before storing — oil metal parts to prevent rust over winter.',
      'Protect vulnerable shrubs and container plants from severe frost with horticultural fleece.',
      "Enjoy the garden's winter structure — leave seedheads for birds and beneficial insects over the cold months.",
    ]
  }
];

/* ══════════════════════════════
   STATE
══════════════════════════════ */
let settingsFilter = 'all';

/* ══════════════════════════════
   PAGE SWITCHING
══════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`page-${name}`).classList.add('active');
  document.getElementById(`btn-${name}`).classList.add('active');
  if (name === 'calendar') renderCalendar();
  if (name === 'settings') { renderSettings(); buildMonthPickers(); }
}

/* ══════════════════════════════
   CALENDAR RENDERING
══════════════════════════════ */
function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  const now = new Date();
  const currentMonth = now.getMonth();

  // Header row
  let html = '<div class="cal-header">';
  html += '<div class="cal-header-cell">Plant</div>';
  MONTHS.forEach((m, i) => {
    const cls = i === currentMonth ? 'month-clickable current-month' : 'month-clickable';
    html += `<div class="cal-header-cell ${cls}" onclick="openMonthPopup(${i})">${m}</div>`;
  });
  html += '</div>';

  // Group by type
  const types = [
    { key: 'vegetable', label: '🥕 Vegetables',  },
    { key: 'herb',      label: '🌿 Herbs',       },
    { key: 'flower',    label: '🌸 Flowers',     },
  ];

  types.forEach(({ key, label }) => {
    const group = plants.filter(p => p.type === key && p.enabled);
    if (!group.length) return;

    html += `<div class="cal-section-label">${label}</div>`;

    group.forEach(plant => {
      // cal-row uses display:contents so its children slot directly into the parent grid
      html += `<div class="cal-row">`;
      html += `<div class="cal-plant-name" onclick="openPlantPopup('${plant.id}')">
                 <span class="plant-type-dot dot-${plant.type}"></span>
                 ${plant.name}
               </div>`;

      for (let m = 0; m < 12; m++) {
        const bars = [];
        if (plant.sowIndoor.includes(m))  bars.push({ cls: 'bar-sow-in',  label: 'Sow Indoors' });
        if (plant.sowOutdoor.includes(m)) bars.push({ cls: 'bar-sow-out', label: 'Sow Outdoors' });
        if (plant.bloom.includes(m))      bars.push({ cls: 'bar-bloom',   label: 'Bloom' });
        if (plant.harvest.includes(m))    bars.push({ cls: 'bar-harvest', label: 'Harvest' });

        if (bars.length === 0) {
          html += `<div class="cal-cell"></div>`;
        } else if (bars.length === 1) {
          html += `<div class="cal-cell" title="${bars[0].label}" onclick="openPlantPopup('${plant.id}')">
                     <div class="bar ${bars[0].cls}"></div>
                   </div>`;
        } else {
          const stackBars = bars.map(b =>
            `<div class="bar ${b.cls}" title="${b.label}"></div>`
          ).join('');
          html += `<div class="cal-cell" onclick="openPlantPopup('${plant.id}')">
                     <div class="bar-stack">${stackBars}</div>
                   </div>`;
        }
      }
      html += '</div>';
    });
  });

  if (!plants.some(p => p.enabled)) {
    html += '<div style="padding:40px;text-align:center;color:var(--text-muted)">No plants selected. Go to Settings to enable plants.</div>';
  }

  grid.innerHTML = html;
}

/* ══════════════════════════════
   SETTINGS RENDERING
══════════════════════════════ */
function renderSettings() {
  const container = document.getElementById('plant-list');
  const typeEmoji = { flower: '🌸', herb: '🌿', vegetable: '🥕' };

  let html = '';
  plants.forEach(plant => {
    const hidden = (settingsFilter !== 'all' && plant.type !== settingsFilter) ? 'hidden-item' : '';
    html += `<label class="plant-item ${hidden}" data-type="${plant.type}">
               <input type="checkbox" ${plant.enabled ? 'checked' : ''} onchange="togglePlant('${plant.id}', this.checked)" />
               <div class="plant-item-info">
                 <div class="plant-item-name">${plant.name}</div>
                 <div class="plant-item-type">${plant.type}</div>
               </div>
               <span class="plant-item-badge">${typeEmoji[plant.type]}</span>
             </label>`;
  });
  container.innerHTML = html;
}

function filterSettings(type) {
  settingsFilter = type;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderSettings();
}

function togglePlant(id, checked) {
  const plant = plants.find(p => p.id === id);
  if (plant) plant.enabled = checked;
}

function selectAll(state) {
  plants.forEach(p => {
    if (settingsFilter === 'all' || p.type === settingsFilter) p.enabled = state;
  });
  renderSettings();
}

/* ══════════════════════════════
   MONTH PICKERS IN ADD FORM
══════════════════════════════ */
const pickerIds = ['pick-sow-indoor', 'pick-sow-outdoor', 'pick-bloom', 'pick-harvest'];

function buildMonthPickers() {
  pickerIds.forEach(pid => {
    const el = document.getElementById(pid);
    if (!el || el.dataset.built) return;
    el.dataset.built = 'true';
    el.innerHTML = MONTHS.map((m, i) =>
      `<button type="button" class="mp-btn" data-idx="${i}" onclick="toggleMpBtn(this)">${m}</button>`
    ).join('');
  });
}

function toggleMpBtn(btn) {
  btn.classList.toggle('selected');
}

function getPickerMonths(pid) {
  return [...document.querySelectorAll(`#${pid} .mp-btn.selected`)]
    .map(b => parseInt(b.dataset.idx));
}

/* ══════════════════════════════
   ADD PLANT
══════════════════════════════ */
function addPlant() {
  const name  = document.getElementById('new-name').value.trim();
  const type  = document.getElementById('new-type').value;
  const instr = document.getElementById('new-instructions').value.trim();
  const errEl = document.getElementById('add-error');

  if (!name) { errEl.textContent = 'Please enter a plant name.'; return; }
  errEl.textContent = '';

  const id = 'custom-' + Date.now();
  plants.push({
    id, name, type,
    variety: 'Custom',
    height: '',
    enabled: true,
    sowIndoor:  getPickerMonths('pick-sow-indoor'),
    sowOutdoor: getPickerMonths('pick-sow-outdoor'),
    bloom:      getPickerMonths('pick-bloom'),
    harvest:    getPickerMonths('pick-harvest'),
    instructions: instr || 'No instructions provided.'
  });

  // Reset form
  document.getElementById('new-name').value = '';
  document.getElementById('new-instructions').value = '';
  pickerIds.forEach(pid => {
    document.querySelectorAll(`#${pid} .mp-btn.selected`).forEach(b => b.classList.remove('selected'));
  });

  renderSettings();
  showPage('calendar');
}

/* ══════════════════════════════
   POPUPS
══════════════════════════════ */
function openPlantPopup(id) {
  const plant = plants.find(p => p.id === id);
  if (!plant) return;

  const typeLabel = { flower: '🌸 Flower', herb: '🌿 Herb', vegetable: '🥕 Vegetable' };
  const barColors = {
    sowIndoor:  { cls: 'background:var(--sow-in)',  label: 'Sow Indoors'  },
    sowOutdoor: { cls: 'background:var(--sow-out)', label: 'Sow Outdoors' },
    bloom:      { cls: 'background:var(--bloom)',   label: 'Bloom'        },
    harvest:    { cls: 'background:var(--harvest)', label: 'Harvest'      },
  };

  function miniBars(monthArr, colorStyle) {
    return MONTHS.map((m, i) => {
      const active = monthArr.includes(i);
      return `<div class="mini-bar ${active ? 'has' : 'none'}" style="${active ? colorStyle : ''}" title="${active ? m : ''}"></div>`;
    }).join('');
  }

  const rows = [
    { label: 'Sow Indoors',  arr: plant.sowIndoor,  color: 'background:var(--sow-in)'  },
    { label: 'Sow Outdoors', arr: plant.sowOutdoor, color: 'background:var(--sow-out)' },
    { label: 'Bloom',        arr: plant.bloom,       color: 'background:var(--bloom)'   },
    { label: 'Harvest',      arr: plant.harvest,     color: 'background:var(--harvest)' },
  ].filter(r => r.arr.length > 0);

  let barsHtml = rows.map(r =>
    `<span>${r.label}</span><div class="mini-bar-wrap">${miniBars(r.arr, r.color)}</div>`
  ).join('');

  // Month label header for the mini bars
  const monthLabelRow = `<span></span><div class="mini-bar-wrap">${
    MONTHS.map(m => `<div style="width:20px;text-align:center;font-size:9px;color:var(--text-dim)">${m[0]}</div>`).join('')
  }</div>`;

  const details = [];
  if (plant.variety && plant.variety !== 'General' && plant.variety !== 'Custom') details.push(plant.variety);
  if (plant.height) details.push(plant.height);

  const html = `
    <div class="popup-title">${plant.name}</div>
    <div class="popup-meta">${typeLabel[plant.type] || plant.type}${details.length ? ' · ' + details.join(' · ') : ''}</div>

    ${rows.length ? `
    <div class="popup-section">
      <div class="popup-section-title">Growing Calendar</div>
      <div class="popup-bars">
        ${monthLabelRow}
        ${barsHtml}
      </div>
    </div>` : ''}

    <div class="popup-section">
      <div class="popup-section-title">Growing Instructions</div>
      <p class="popup-text">${plant.instructions}</p>
    </div>
  `;

  showPopup(html);
}

function openMonthPopup(monthIdx) {
  const tips = monthlyTips[monthIdx];
  const tipItems = tips.tips.map(t => `<li>${t}</li>`).join('');

  const html = `
    <div class="month-popup-header">
      <span class="month-icon">${MONTH_ICONS[monthIdx]}</span>
      <h2>${MONTH_FULL[monthIdx]}</h2>
    </div>
    <div class="popup-section">
      <div class="popup-section-title">Gardening Tips for ${MONTH_FULL[monthIdx]}</div>
      <ul class="tip-list">${tipItems}</ul>
    </div>
  `;
  showPopup(html);
}

function showPopup(html) {
  document.getElementById('popup-content').innerHTML = html;
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('popup').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePopup();
});

/* ══════════════════════════════
   INIT
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildMonthPickers();
  renderCalendar();
});

/* ══════════════════════════════
   INFO POPUP
══════════════════════════════ */
function openInfoPopup() {
  const html = `
    <div class="popup-title">About this App</div>
    <div class="popup-meta">🌿 Garden Planner — Feature Guide</div>

    <div class="popup-section">
      <div class="popup-section-title">📅 Calendar View</div>
      <ul class="tip-list">
        <li><strong>Colour-coded bars</strong> show at a glance when each plant should be sown indoors, sown outdoors, in bloom, or ready to harvest — across all 12 months.</li>
        <li><strong>Click any plant name or bar</strong> to open a detailed popup with sowing periods, bloom or harvest months, variety info, and full growing instructions.</li>
        <li><strong>Click any month header</strong> to see a curated list of seasonal gardening tips for that month.</li>
        <li>Plants are grouped by type — Flowers, Herbs, and Vegetables — with the <strong>current month highlighted</strong> in the header for quick reference.</li>
      </ul>
    </div>

    <div class="popup-section">
      <div class="popup-section-title">🔍 Colour Legend</div>
      <ul class="tip-list">
        <li><span style="display:inline-block;width:18px;height:10px;background:var(--sow-in);border-radius:3px;vertical-align:middle;margin-right:6px"></span><strong>Blue</strong> — Sow Indoors (trays, pots, propagator)</li>
        <li><span style="display:inline-block;width:18px;height:10px;background:var(--sow-out);border-radius:3px;vertical-align:middle;margin-right:6px"></span><strong>Green</strong> — Sow Outdoors (direct into ground or containers)</li>
        <li><span style="display:inline-block;width:18px;height:10px;background:var(--bloom);border-radius:3px;vertical-align:middle;margin-right:6px"></span><strong>Pink</strong> — Bloom period (flowers)</li>
        <li><span style="display:inline-block;width:18px;height:10px;background:var(--harvest);border-radius:3px;vertical-align:middle;margin-right:6px"></span><strong>Amber</strong> — Harvest period (vegetables &amp; herbs)</li>
      </ul>
    </div>

    <div class="popup-section">
      <div class="popup-section-title">⚙ Settings</div>
      <ul class="tip-list">
        <li><strong>Show or hide plants</strong> using the checkboxes — only ticked plants appear on the calendar.</li>
        <li><strong>Filter by type</strong> using the Flowers / Herbs / Vegetables buttons to quickly find what you need.</li>
        <li>Use <strong>Select all</strong> or <strong>Clear all</strong> to quickly toggle an entire filtered group.</li>
      </ul>
    </div>

    <div class="popup-section">
      <div class="popup-section-title">➕ Adding Your Own Plants</div>
      <ul class="tip-list">
        <li>Scroll to the bottom of Settings to find the <strong>Add a New Plant</strong> form.</li>
        <li>Enter a name, choose a type (Flower, Herb, or Vegetable), then click the month buttons to set sowing, bloom, and harvest periods.</li>
        <li>Add any growing notes in the instructions field, then click <strong>+ Add to Calendar</strong> — your plant appears immediately.</li>
      </ul>
    </div>

    <div class="popup-section">
      <div class="popup-section-title">🌱 Plant Data</div>
      <ul class="tip-list">
        <li>Includes all <strong>24 flowers</strong> from four seed collections: Baskets &amp; Containers, Easy Grow, Sweet Pea, and Butterfly &amp; Bee.</li>
        <li>Also includes <strong>10 common vegetables</strong> (tomato, courgette, carrots, peas, potatoes and more) and <strong>8 herbs</strong> (basil, mint, rosemary, thyme and more), with UK-specific timing.</li>
      </ul>
    </div>
  `;
  showPopup(html);
}
