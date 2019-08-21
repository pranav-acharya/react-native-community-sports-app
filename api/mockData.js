export const SAMPLE_PROFILE = {
  name: 'Mohan Reddy',
  email: 'mohan.reddy@gmail.com',
  contact: '9851441563'
};

export const userProfileResponse = {
  id: '123',
  name: 'Mohan Reddy',
  email: 'mohan.reddy@gmail.com',
  mobile: '9851441563',
  age: 40,
  sex: 'MALE',
  thumbnail: '',
  parent: {
    community: '123', // assuming ids
    children: ['string'] // assuming ids
  },
  inactive: true,
  created: 'string',
  updated: 'string'
};

export const communityList = [
  {
    name: 'Brigade Lakefront',
    subtitle: 'Hoodi'
  },
  {
    name: 'Prestige Shantiniketan',
    subtitle: 'Whitefield'
  },

];

export const communityListResponse = {
  items: [
    {
      id: '123',
      name: 'Brigade Lakefront',
      location: {
        address: {
          address_street: 'string',
          address_street_2: 'string',
          city: 'string',
          state: 'string',
          zip: 'string',
          country: 'string'
        },
        location: {
          latitude: 'string',
          longitude: 'string',
          radius: 'string'
        }
      },
      facilities: ['string'],
      batches: ['string'],
      members: ['string'],
      created: 'string',
      updated: 'string'
    },
    {
      id: '124',
      name: 'Prestige Shantiniketan',
      location: {
        address: {
          address_street: 'string',
          address_street_2: 'string',
          city: 'string',
          state: 'string',
          zip: 'string',
          country: 'string'
        },
        location: {
          latitude: 'string',
          longitude: 'string',
          radius: 'string'
        }
      },
      facilities: ['string'],
      batches: ['string'],
      members: ['string'],
      created: 'string',
      updated: 'string'
    }
  ]
};

export const sportsList = [
  {
    id: 'Football',
    name: 'Football',
  },
  {
    id: 'Badmintom',
    name: 'Badminton',
  }
];

export const classesListResponse = {
  items: [
    {
      id: '1',
      name: 'Class 1',
      batch: 'string',
      timing: 'string',
      duration: 'string',
      instructor: 'string',
      students: ['string'],
      plan: {
        items: [
          {
            name: 'string',
            focus: 'string',
            description: 'string',
            count: 0,
            duration: 'string'
          }
        ]
      },
      images: [
        'https://stbadmintonacademy.sg/wp-content/uploads/2018/02/children-badminton-class-st-badminton-academy-sg.jpg',
        'https://content3.jdmagicbox.com/comp/jalandhar/m4/0181px181.x181.160319165709.a9m4/catalogue/dynamic-badminton-sports-academy-jalandhar-city-jalandhar-badminton-classes-ntrcn-250.jpg'
      ],
      stats: {
        student_drills: {
          student_id_1: {
            name: 'running',
            focus: 'stamina',
            description: 'minutes of running',
            duration: 120
          }
        },
        notes: {}
      },
      created: 'string',
      updated: 'string'
    },
    {
      id: '2',
      name: 'Class 2',
      batch: 'string',
      timing: 'string',
      duration: 'string',
      instructor: 'string',
      students: ['string'],
      plan: {
        items: [
          {
            name: 'string',
            focus: 'string',
            description: 'string',
            count: 0,
            duration: 'string'
          }
        ]
      },
      images: [
        'https://warwick.ac.uk/services/sport/active/run-jog-walk/parkrun.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCDpiAqGpbxFuzHQTNiaeAv6XUKckVwISwBlULXfthzFXH8hUZ'
      ],
      stats: {
        student_drills: {
          student_id_1: {
            name: 'jogging',
            focus: 'stamina',
            description: 'minutes of running',
            duration: 120
          }
        },
        notes: {}
      },
      created: 'string',
      updated: 'string'
    }
  ]
};

export const DUMMY_BATCHES = [
  {
    id: 'batch1',
    name: 'Batch A',
    description: 'Under 12',
    sport: {
      name: 'badminton'
    },
    community: {
      name: 'Brigade lakefront'
    }
  }
];


export const CHILDREN = {
  items: [{
    name: 'Ananya',
    id: '1234',
    avatar: ''
  },
  {
    name: 'Raj',
    id: '1235',
    thumbnail: ''
  },
  {
    name: 'Ananya',
    id: '1238',
    thumbnail: ''
  },
  {
    name: 'Raj',
    id: '1236',
    thumbnail: ''
  },
  {
    name: 'Ananya',
    id: '1237',
    thumbnail: ''
  },
  {
    name: 'Raj',
    id: '1239',
    thumbnail: ''
  }]
};

export const childrenResponse = {
  items: [
    {
      id: '123',
      name: 'Raj',
      email: 'string',
      mobile: 'string',
      age: 0,
      sex: 'MALE',
      thumbnail: '',
      student: {
        parent: 'string',
        community: 'string',
        current_batches: ['string'],
        past_batches: ['string']
      },
      inactive: true,
      created: 'string',
      updated: 'string'
    },
    {
      id: '1234',
      name: 'Ananya',
      email: 'string',
      mobile: 'string',
      age: 0,
      sex: 'FEMALE',
      thumbnail: '',
      student: {
        parent: 'string',
        community: 'string',
        current_batches: ['string'],
        past_batches: ['string']
      },
      inactive: true,
      created: 'string',
      updated: 'string'
    }
  ]
};

export const DUMMY_DRILLS = [
  {
    id: 'drillid',
    name: 'dril name',
    description: 'drill description'
  }
];

export const PARENT_CHILDREN = [
  {
    id: '10',
    name: 'Ananya',
    age: '9',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    gender: 'Female'
  }
];

export const parentChildrenResponse = {
  items: childrenResponse.items
};

export const feeds = [
  {
    type: 'accomplishment',
    shortDescription: '',
    longDescription: '',
    image: null
  },
  {
    type: 'accomplishment',
    shortDescription: '',
    longDescription: '',
    image: ''
  }
];

export const loginResponse = {
  user_id: 'string',
  access_token: 'string',
  refresh_token: 'string'
};

export const batchesResponse = {
  items: [
    {
      id: 'string',
      name: 'string',
      sport: 'INVALID',
      community: 'string',
      facility: 'string',
      slots: 0,
      active: true,
      head_instructor: 'string',
      students: [
        'string'
      ],
      announcements: [
        'string'
      ],
      classes: [
        'string'
      ],
      drills: [
        {
          name: 'string',
          focus: 'string',
          description: 'string',
          count: 0,
          duration: 'string'
        }
      ],
      rates: [
        {
          type: 'RATE_RESERVED',
          amount: 'string',
          currency: 'RESERVED'
        }
      ],
      timings: {
        items: {}
      },
      upcoming: 'string',
      class_duration: 'string',
      created: 'string',
      updated: 'string'
    }
  ]
};

export const batchResponse = { item: batchesResponse.items[0] };
export const signupResponse = {};
