import api from './client';
import { USE_MOCK_API, delayedPromise } from './config';
import {
  SAMPLE_PROFILE,
  userProfileResponse,
  communityList,
  communityListResponse,
  sportsList,
  DUMMY_BATCHES,
  batchResponse,
  batchesResponse,
  CHILDREN,
  childrenResponse,
  DUMMY_DRILLS,
  PARENT_CHILDREN,
  parentChildrenResponse,
  feeds,
  classesListResponse
} from './mockData';
import {
  BATCH_UPDATE_REQ,
  SPORT,
  OPERATION,
  USER_UPDATE_REQ,
  CLASS_UPDATE_REQ
} from './apiConstants';

const IMAGE_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/kuber/image/upload';
const IMAGE_UPLOAD_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};

export const getCurrentUserProfile = () => {
  // if (USE_MOCK_API) { return delayedPromise(SAMPLE_PROFILE); }
  if (USE_MOCK_API) { return delayedPromise(userProfileResponse); }
  return api.get('/v1/users/get');
};

export const getCommunities = () => {
  if (USE_MOCK_API) { return delayedPromise(communityListResponse.items); }
  return api.get('/v1/community/get');
};

export const getSports = () => {
  if (USE_MOCK_API) { return delayedPromise(sportsList); }
  return api.get('/v1/sports/get');
};

const getBatches = (communityId, coachId) => {
  if (USE_MOCK_API) { return delayedPromise(batchesResponse.items); }
  return api.get('/v1/batch/get').then((response) => {
    const batches = response.data.items;
    return batches.filter((batch) => {
      if (communityId) { return batch.community === communityId; }
      return batch.head_instructor === coachId;
    });
  });
};

export const getBatchesByCommunity = communityId => getBatches(communityId, null);

export const getBatchesByCoach = coachId => getBatches(null, coachId);

export const getBatchClasses = (batchId) => {
  if (USE_MOCK_API) { return delayedPromise(classesListResponse.items); }
  return api.get('/v1/classes/get').then((response) => {
    const classes = response.data.items;
    return classes.filter(classObj => classObj.batch === batchId);
  });
};


export const getStudentBatches = (childId) => {
  if (USE_MOCK_API) { return ['batch_a']; }
  return null;
};

export const getMyChildren = () => {
  if (USE_MOCK_API) { return delayedPromise(parentChildrenResponse.items); }
  return getUserProfile().then((profile) => {
    const { children } = profile.parent;
    if (children.length > 0) {
      const queryString = children.map(childId => (`vals=${childId}`)).join('&');
      return api.get(`/v1/users/get?${queryString}`).then(response => response.data.items);
    }
    return [];
  });
};

export const getBatchChildren = (batchId) => {
  if (USE_MOCK_API) { return delayedPromise(childrenResponse.items); }
  return getBatchDetails(batchId).then((batch) => {
    const { students } = batch;
    if (students.length > 0) {
      const queryString = students.map(childId => (`vals=${childId}`)).join('&');
      return api.get(`/v1/users/get?${queryString}`).then(response => response.data.items);
    }
    return [];
  });
};

export const getBatchDetails = (batchId) => {
  if (USE_MOCK_API) { return delayedPromise(batchResponse.item); }
  return api.get(`/v1/batch/get?vals=${batchId}`).then(response => response.data.items[0]);
};

export const getDrills = () => {
  if (USE_MOCK_API) { return delayedPromise(DUMMY_DRILLS); }
  return null;
};

export const getFeeds = () => {
  if (USE_MOCK_API) { return delayedPromise(feeds); }
  return null;
};


export const uploadImage = (uri) => {
  if (!uri) return;
  const formData = new FormData();
  // const uri = this.state.fields.image;
  // const uri = convertLocalIdentifierToAssetLibrary(imageSource.file);
  formData.append('file', { uri, name: 'testtrainer', type: 'image/jpeg' });
  formData.append('upload_preset', 'users-preset');
  // this.setState({ uploading: true, uploadSuccess: null, uploadError: null });
  return api.post(IMAGE_UPLOAD_URL, formData, IMAGE_UPLOAD_HEADERS);
  // fetch(IMAGE_UPLOAD_URL, IMAGE_UPLOAD_CONFIG)
  //   .then(response => Promise.all([response.status, response.json()]))
  //   .then(([status, responseJson]) => {
  //     console.log(status, responseJson);
  //     if (status !== 200 && status !== 201) { throw new Error(responseJson.error.message); }
  //     // this.setState({ imageBrowserOpen: false, uploading: false, uploadSuccess: true });
  //   })
  //   .catch((exc) => {
  //     console.log('err', exc);
  //     // this.setState({
  //     //   imageBrowserOpen: false,
  //     //   uploading: false,
  //     //   uploadSuccess: false,
  //     //   uploadError: exc.message
  //     // });
  //   });
};

export const addChild = (child, parentId) => {
  if (USE_MOCK_API) { return delayedPromise(child); }
  const { name, age, gender, thumbnail } = child;
  return api.post('/users/v1/update', {
    map: USER_UPDATE_REQ.NEW,
    op: OPERATION.ADD,
    item: {
      name,
      age,
      sex: gender,
      thumbnail,
      student: {
        parent: parentId,
        current_batches: [],
        past_batches: []
      },
    }
  });
};


export const enrollChild = (childId, batchId) => {
  if (USE_MOCK_API) { return delayedPromise({ childId, batchId }); }
  return api.post('/batch/v1/update', {
    map: BATCH_UPDATE_REQ.STUDENTS,
    op: OPERATION.OVERWRITE,
    item: {
      id: batchId,
      students: [childId],
    }
  });
};

export const createBatch = (batch) => {
  if (USE_MOCK_API) { return delayedPromise(batch); }
  const { name, sport, community, slots, duration } = batch;
  return api.post('/batch/v1/update', {
    map: BATCH_UPDATE_REQ.NEW,
    op: OPERATION.ADD,
    item: {
      name,
      sport,
      community,
      slots,
      class_duration: duration
    }
  });
};

export const addDrill = (batchId, drill) => {
  if (USE_MOCK_API) { return delayedPromise(drill); }
  const drillObj = {}; // name, focus, description, count | duration
  return api.post('/batch/v1/update', {
    map: BATCH_UPDATE_REQ.DRILLS,
    op: OPERATION.OVERWRITE,
    item: {
      id: batchId,
      drills: [
        drill
      ]
    }
  });
};

export const addClassStats = (classId, studentId, drill, note) => {
  if (USE_MOCK_API) { return delayedPromise(drill); }
  return api.post('/class/v1/update', {
    map: CLASS_UPDATE_REQ.CLASS_UPDATE_REQ,
    op: OPERATION.OVERWRITE,
    item: {
      id: classId,
      student_drills: {
        studentId: drill
      },
      notes: {
        studentId: note
      }
    }
  });
};
export const getPosts = () => api.get('/posts');


export const updateUserProfile = (profile) => {
  if (USE_MOCK_API) { return delayedPromise(profile); }
  const { name, age, gender, id } = profile;
  return api.post('/users/v1/update', {
    map: USER_UPDATE_REQ.NEW,
    op: OPERATION.OVERWRITE,
    item: {
      id,
      name,
      age,
      sex: gender,
    }
  });
};

export const getUserProfile = (userId) => {
  if (USE_MOCK_API) { return delayedPromise(userProfileResponse); }
  return api.get(`/users/v1/get?vals=${userId}`).then(response => response.data.items[0]);
};

export const createUserProfile = ({ name, userId, email, isParent }) => {
  const item = {
    id: userId,
    name,
    email,
  };

  if (isParent) { item.parent = {}; } else { item.instructor = {}; }
  if (USE_MOCK_API) { return delayedPromise(item); }
  return api.post('/users/v1/update', {
    map: USER_UPDATE_REQ.NEW,
    op: OPERATION.ADD,
    item
  });
};
