import type { StdlibType, TextVideo } from "../types";
import { play } from "../video";


import json from "./data/go.json?url";
import song from "./data/go.mp3?url";

const defaultOptions = {
  speed: 1,
};

export default function main(stdlib: StdlibType, inOptions = {}) {
  const options = { ...defaultOptions, ...inOptions };

  let speed = 1

  if (options.speed) {
    speed = options.speed
  }

  play(stdlib, json, song, speed);

}
