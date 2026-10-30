// src/data/initialClients.js

// ======================================================
// INITIAL CLIENT DATA
// ======================================================
//
// Monthly Target:
// Every client has a default target of 22 contents.
//
// Target Count Rule:
// Only "Posted" Reel + Post count toward the 22 target.
//
// Story and Carousel:
// They are saved in work history but do NOT count toward
// the monthly 22 target.
//
// Meta Ads:
// Stored separately inside the "ads" array.
//
// ======================================================

export const initialClients = [
  // ====================================================
  // CLIENT 01
  // ====================================================

  {
    id: 1,

    name: "Client 01",

    companyName: "sm interiors",

    category: "sm interiors",

    phone: "8280569656",

    email: "",

    instagram: "https://www.instagram.com/sminteriorsbbsr?stkn=dHdxMDgwejFxNzRp",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 02
  // ====================================================

  {
    id: 2,

    name: "Client 02",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 03
  // ====================================================

  {
    id: 3,

    name: "Client 03",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 04
  // ====================================================

  {
    id: 4,

    name: "Client 04",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 05
  // ====================================================

  {
    id: 5,

    name: "Client 05",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 06
  // ====================================================

  {
    id: 6,

    name: "Client 06",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 07
  // ====================================================

  {
    id: 7,

    name: "Client 07",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 08
  // ====================================================

  {
    id: 8,

    name: "Client 08",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 09
  // ====================================================

  {
    id: 9,

    name: "Client 09",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 10
  // ====================================================

  {
    id: 10,

    name: "Client 10",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 11
  // ====================================================

  {
    id: 11,

    name: "Client 11",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },

  // ====================================================
  // CLIENT 12
  // ====================================================

  {
    id: 12,

    name: "Client 12",

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],
  },
];

// ======================================================
// OPTIONAL HELPER
// ======================================================

// Creates a completely new blank client.
// We can use this later when adding "Add New Client".

export const createNewClient = (name = "New Client") => {
  return {
    id:
      typeof crypto !== "undefined" &&
      crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now(),

    name,

    companyName: "",

    category: "",

    phone: "",

    email: "",

    instagram: "",

    facebook: "",

    website: "",

    monthlyTarget: 22,

    works: [],

    ads: [],

    createdAt: new Date().toISOString(),
  };
};

// ======================================================
// OPTIONAL DEMO DATA
// ======================================================
//
// You do NOT need to use this.
// It is useful only if you want to test whether Dashboard,
// ClientCard and ClientFolder are calculating correctly.
//
// ======================================================

export const demoClient = {
  id: "demo-client",

  name: "Demo Interior Client",

  companyName: "Demo Interior",

  category: "Interior Design",

  phone: "",

  email: "",

  instagram: "@demointerior",

  facebook: "Demo Interior",

  website: "",

  monthlyTarget: 22,

  works: [
    {
      id: "work-1",

      month: "September 2026",

      date: "2026-09-01",

      type: "Reel",

      status: "Posted",

      title: "Living Room Transformation",

      instagram: true,

      facebook: true,

      instagramUrl:
        "https://www.instagram.com/",

      facebookUrl:
        "https://www.facebook.com/",

      notes: "Transformation reel",

      createdAt:
        "2026-09-01T10:00:00.000Z",
    },

    {
      id: "work-2",

      month: "September 2026",

      date: "2026-09-03",

      type: "Post",

      status: "Posted",

      title: "Modern Kitchen Design",

      instagram: true,

      facebook: true,

      instagramUrl:
        "https://www.instagram.com/",

      facebookUrl:
        "https://www.facebook.com/",

      notes: "Kitchen design post",

      createdAt:
        "2026-09-03T10:00:00.000Z",
    },

    {
      id: "work-3",

      month: "September 2026",

      date: "2026-09-05",

      type: "Reel",

      status: "Editing",

      title: "Bedroom Interior",

      instagram: true,

      facebook: true,

      instagramUrl: "",

      facebookUrl: "",

      notes: "Currently editing",

      createdAt:
        "2026-09-05T10:00:00.000Z",
    },

    {
      id: "work-4",

      month: "September 2026",

      date: "2026-09-07",

      type: "Post",

      status: "Ready",

      title: "Office Interior",

      instagram: true,

      facebook: true,

      instagramUrl: "",

      facebookUrl: "",

      notes: "Ready for publishing",

      createdAt:
        "2026-09-07T10:00:00.000Z",
    },

    {
      id: "work-5",

      month: "September 2026",

      date: "2026-09-10",

      type: "Story",

      status: "Posted",

      title: "Behind The Scenes",

      instagram: true,

      facebook: false,

      instagramUrl:
        "https://www.instagram.com/",

      facebookUrl: "",

      notes:
        "Story does not count toward target",

      createdAt:
        "2026-09-10T10:00:00.000Z",
    },
  ],

  ads: [
    {
      id: "ad-1",

      month: "September 2026",

      campaignName:
        "Interior Lead Campaign",

      startDate: "2026-09-01",

      endDate: "2026-09-15",

      platform: "Both",

      status: "Ended",

      budget: 5000,

      spend: 4750,

      adUrl:
        "https://www.facebook.com/",

      reach: 32000,

      impressions: 48000,

      leads: 62,

      notes:
        "Lead generation campaign",

      createdAt:
        "2026-09-01T10:00:00.000Z",
    },

    {
      id: "ad-2",

      month: "September 2026",

      campaignName:
        "Festival Offer Campaign",

      startDate: "2026-09-20",

      endDate: "2026-09-30",

      platform: "Instagram",

      status: "Running",

      budget: 8000,

      spend: 3200,

      adUrl:
        "https://www.instagram.com/",

      reach: 21000,

      impressions: 35000,

      leads: 38,

      notes:
        "Festival offer promotion",

      createdAt:
        "2026-09-20T10:00:00.000Z",
    },
  ],
};

export default initialClients;