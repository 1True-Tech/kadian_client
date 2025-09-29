import { createClient } from "next-sanity";
import env from "../constants/env";

export const client = createClient({
  projectId: env.PID,
  dataset: env.DATASET,
  useCdn: true,
});
