"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideEventActorType = exports.RideDriverOfferStatus = exports.RideBookingNotes = exports.RideLocationType = exports.RideStatus = exports.RideType = void 0;
var RideType;
(function (RideType) {
    RideType["PRIVATE"] = "private";
    RideType["CARPOOL"] = "carpool";
})(RideType || (exports.RideType = RideType = {}));
var RideStatus;
(function (RideStatus) {
    RideStatus["REQUESTED"] = "requested";
    RideStatus["DRIVER_OFFERED"] = "driver_offered";
    RideStatus["CUSTOMER_SELECTED"] = "customer_selected";
    RideStatus["CONFIRMED"] = "confirmed";
    RideStatus["DRIVER_EN_ROUTE"] = "driver_en_route";
    RideStatus["ARRIVED"] = "arrived";
    RideStatus["IN_PROGRESS"] = "in_progress";
    RideStatus["COMPLETED"] = "completed";
    RideStatus["CANCELLED_BY_CUSTOMER"] = "cancelled_by_customer";
    RideStatus["CANCELLED_BY_DRIVER"] = "cancelled_by_driver";
    RideStatus["EXPIRED"] = "expired";
})(RideStatus || (exports.RideStatus = RideStatus = {}));
var RideLocationType;
(function (RideLocationType) {
    RideLocationType["PICKUP"] = "pickup";
    RideLocationType["DROPOFF"] = "dropoff";
    RideLocationType["WAYPOINT"] = "waypoint";
    RideLocationType["DRIVER_LOCATION"] = "driver_location";
})(RideLocationType || (exports.RideLocationType = RideLocationType = {}));
var RideBookingNotes;
(function (RideBookingNotes) {
    RideBookingNotes["CONFIRMED"] = "Ride Confirmed";
    RideBookingNotes["ACCEPTED"] = "Ride Accepted by Driver";
    RideBookingNotes["ARRIVED"] = "Driver Arrived at Pickup";
    RideBookingNotes["STARTED"] = "Ride Started";
    RideBookingNotes["COMPLETED"] = "Ride Completed";
    RideBookingNotes["CANCELLED"] = "Ride Cancelled";
})(RideBookingNotes || (exports.RideBookingNotes = RideBookingNotes = {}));
var RideDriverOfferStatus;
(function (RideDriverOfferStatus) {
    RideDriverOfferStatus["ACTIVE"] = "active";
    RideDriverOfferStatus["SELECTED"] = "selected";
    RideDriverOfferStatus["REJECTED"] = "rejected";
    RideDriverOfferStatus["EXPIRED"] = "expired";
    RideDriverOfferStatus["WITHDRAWN"] = "withdrawn";
})(RideDriverOfferStatus || (exports.RideDriverOfferStatus = RideDriverOfferStatus = {}));
var RideEventActorType;
(function (RideEventActorType) {
    RideEventActorType["CUSTOMER"] = "customer";
    RideEventActorType["DRIVER"] = "driver";
    RideEventActorType["SYSTEM"] = "system";
})(RideEventActorType || (exports.RideEventActorType = RideEventActorType = {}));
//# sourceMappingURL=ride-booking.enum.js.map