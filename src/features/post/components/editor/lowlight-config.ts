import { createLowlight } from "lowlight";

import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

const lowlight = createLowlight({
  bash,
  css,
  javascript,
  json,
  python,
  sql,
  typescript,
  xml,
});

export default lowlight;
