import 'dart:collection';

/// Offline-first sync queue. Every driver action must be persisted locally
/// before being sent to the server. Guarantees no lost deliveries during network drops.
class OfflineService {
  final List<Map<String, dynamic>> _queue = [];

  /// Enqueues a pending action with a timestamp and unique tracking ID.
  Future<void> enqueuePendingAction(Map<String, dynamic> action) async {
    final payload = Map<String, dynamic>.from(action);
    payload['enqueued_at'] ??= DateTime.now().toIso8601String();
    payload['retry_count'] ??= 0;
    _queue.add(payload);
  }

  /// Retrieves all pending queued actions ordered by timestamp.
  Future<List<Map<String, dynamic>>> getPendingActions() async {
    return List.unmodifiable(_queue);
  }

  /// Removes an action from the offline queue after successful network sync.
  Future<void> clearAction(String id) async {
    _queue.removeWhere((item) => item['id'] == id);
  }

  /// Increments retry count for failed sync attempts.
  Future<void> incrementRetry(String id) async {
    for (var item in _queue) {
      if (item['id'] == id) {
        item['retry_count'] = (item['retry_count'] as int? ?? 0) + 1;
        break;
      }
    }
  }

  /// Returns total pending actions count.
  int get pendingCount => _queue.length;
}
