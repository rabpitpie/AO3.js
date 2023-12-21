import { fileURLToPath } from "url";
import filenamify from "filenamify";
import fs from "fs";
import path from "path";
import { http, HttpResponse } from "msw";

const TAGS_DATA_DIR = path.resolve(
  fileURLToPath(import.meta.url),
  "../../../data/tags"
);
export default http.all(
  "https://archiveofourown.org/tags/:name/feed.atom",
  ({ params }) => {
    const html = fs.readFileSync(
      path.resolve(
        TAGS_DATA_DIR,
        filenamify(params.name as string),
        "feed.atom"
      )
    );

    return new HttpResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  }
);
