export declare enum RideType {
    PRIVATE = "private",
    CARPOOL = "carpool"
}
export declare enum RideStatus {
    REQUESTED = "requested",
    DRIVER_OFFERED = "driver_offered",
    CUSTOMER_SELECTED = "customer_selected",
    CONFIRMED = "confirmed",
    DRIVER_EN_ROUTE = "driver_en_route",
    ARRIVED = "arrived",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED_BY_CUSTOMER = "cancelled_by_customer",
    CANCELLED_BY_DRIVER = "cancelled_by_driver",
    EXPIRED = "expired"
}
export declare enum RideLocationType {
    PICKUP = "pickup",
    DROPOFF = "dropoff",
    WAYPOINT = "waypoint",
    DRIVER_LOCATION = "driver_location"
}
export declare enum RideBookingNotes {
    CONFIRMED = "Ride Confirmed",
    ACCEPTED = "Ride Accepted by Driver",
    ARRIVED = "Driver Arrived at Pickup",
    STARTED = "Ride Started",
    COMPLETED = "Ride Completed",
    CANCELLED = "Ride Cancelled"
}
export declare enum RideDriverOfferStatus {
    ACTIVE = "active",
    SELECTED = "selected",
    REJECTED = "rejected",
    EXPIRED = "expired",
    WITHDRAWN = "withdrawn"
}
export declare enum RideEventActorType {
    CUSTOMER = "customer",
    DRIVER = "driver",
    SYSTEM = "system"
}
