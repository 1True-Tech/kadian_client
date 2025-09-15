import preventEmpty from "../utils/preventEmpty";


const DATASET = preventEmpty({
  value: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  defaultMessage: "SANITY_STUDIO_DATASET variable is not available",
});

const PID = preventEmpty({
  value: process.env.NEXT_PUBLIC_SANITY_STUDIO_PID,
  defaultMessage: "SANITY_STUDIO_PID variable is not available",
});
const API_URL = preventEmpty({
  value: process.env.NEXT_PUBLIC_API_URL,
  defaultMessage: "API_URL variable is not available",
});

const env = {
  PID,
  DATASET,
  API_URL
};

export default env;
