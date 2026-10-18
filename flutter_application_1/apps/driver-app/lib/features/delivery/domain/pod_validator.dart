import 'dart:math';

/// Geofence validator - blocks delivery confirmation if driver is outside
/// the configured radius around the destination.
class PodValidator {
  static const double defaultRadiusMeters = 150.0;
  static const double earthRadiusMeters = 6371000.0;

  /// Calculates the distance between two coordinates in meters using the Haversine formula.
  double calculateDistanceMeters({
    required double lat1,
    required double lng1,
    required double lat2,
    required double lng2,
  }) {
    final dLat = _toRadians(lat2 - lat1);
    final dLng = _toRadians(lng2 - lng1);

    final a = sin(dLat / 2) * sin(dLat / 2) +
        cos(_toRadians(lat1)) *
            cos(_toRadians(lat2)) *
            sin(dLng / 2) *
            sin(dLng / 2);

    final c = 2 * atan2(sqrt(a), sqrt(1 - a));

    return earthRadiusMeters * c;
  }

  /// Verifies if the driver's current position is within the geofence radius.
  bool isWithinGeofence({
    required double driverLat,
    required double driverLng,
    required double destLat,
    required double destLng,
    double radiusMeters = defaultRadiusMeters,
  }) {
    final distance = calculateDistanceMeters(
      lat1: driverLat,
      lng1: driverLng,
      lat2: destLat,
      lng2: destLng,
    );
    return distance <= radiusMeters;
  }

  double _toRadians(double degree) {
    return degree * pi / 180.0;
  }
}
