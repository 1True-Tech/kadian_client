import { activityStatus } from "@/types";

export interface healthChecker {
    mongoDbStatus: activityStatus;
    sanityStatus: activityStatus;
}