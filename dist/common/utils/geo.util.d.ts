export interface LatLng {
    latitude: number;
    longitude: number;
}
export declare function haversineKm(a: LatLng, b: LatLng): number;
export declare function estimateEtaMinutes(distanceKm: number, avgSpeedKmh?: number): number;
