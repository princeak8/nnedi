import client from "./client";

const GET_TAG = "/admin/tag/all";
const SAVE_TAG = "/admin/tag/save";
const IMAGE_UPLOAD_URL = "/admin/file/save";
const SAVE_POST_URL = "/admin/post/save";
const LATEST_POST_URL = "/post/latest_posts";
const ALL_POST = "/post/posts/";
const PUBLISH = "/admin/post/toggle_publish/";
const DELETE_URL = "/admin/post/delete/";

// const getTags = (domain, accessToken) =>
//   client.apiPostClient.get(
//     domain + GET_TAG,
//     {},
//     {
//       headers: { Authorization: `bearer ${accessToken}` },
//     }
//   );

const getAllPosts = (domain, currentPage) =>
    client.apiPostClient.get(domain + ALL_POST + currentPage, {});

const getLatestPosts = (domain) =>
    client.apiPostClient.get(domain + LATEST_POST_URL, {});

// const saveTag = (domain, accessToken, tag) =>
//   client.apiPostClient.post(
//     domain + SAVE_TAG,
//     { name: tag },
//     {
//       headers: { Authorization: `bearer ${accessToken}` },
//     }
//   );

// const uploadImage = (domain, accessToken, image) =>
//   client.apiPostClient.post(domain + IMAGE_UPLOAD_URL, image, {
//     headers: { Authorization: `bearer ${accessToken}` },
//   });

// const savePost = (domain, accessToken, post) =>
//   client.apiPostClient.post(domain + SAVE_POST_URL, post, {
//     headers: { Authorization: `bearer ${accessToken}` },
//   });

// const updatePost = (domain, accessToken, post) =>
//   client.apiPostClient.post(domain + UPDATE_POST_URL, post, {
//     headers: { Authorization: `bearer ${accessToken}` },
//   });

// const deletePost = (id, domain, accessToken) =>
//   client.apiPostClient.delete(
//     domain + DELETE_URL + id,
//     {},
//     {
//       headers: { Authorization: `bearer ${accessToken}` },
//     }
//   );

export default {
  // getTags,
  getAllPosts,
  getLatestPosts,
  // togglePublish,
  // saveTag,
  // updatePost,
  // uploadImage,
  // savePost,
  // deletePost,
};
