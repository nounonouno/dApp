
import axios from "axios";

export const createStream = (apiKey: string): Promise<any> => {
    return axios.post(
      "/stream",
      {
        name: "test_stream",
        profiles: [
          {
            name: "720p",
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
          {
            name: "480p",
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
          },
          {
            name: "360p",
            bitrate: 500000,
            fps: 30,
            width: 640,
            height: 360,
          },
        ],
      },
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${apiKey}`,
        },
      }
    );
  };