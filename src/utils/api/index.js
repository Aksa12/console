import axios from "axios";

export const getServerURL = () => {
  if (process.env.REACT_APP_ENV === "client") {
    return `${localStorage.getItem("CLIENT_URL")}/`;
  } else {
    return "/";
  }
};

export const get = (url) => {
  return axios.get(getServerURL() + url, {
    headers: {
      Authorization: "Basic " + localStorage.getItem("auth"),
    },
  });
};

export const post = (url, data, signal) => {
  return axios.post(
    getServerURL() + url,
    data,
    {
      headers: {
        Authorization: "Basic " + localStorage.getItem("auth"),
      },
    },
    { signal }
  );
};

export const getLogStream = () => {
  return get("api/v1/logstream");
};

export const queryLogs = (streamName, startTime, endTime) => {
  return post("api/v1/query", {
    query: `select * from ${streamName}`,
    startTime: startTime,
    endTime: endTime,
  });
};

export * from "./logstreams.js";
export * from "./query.js";
