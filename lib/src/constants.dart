library wChaser.src.constants;

class LocalStorageConstants {
  static const String openPrKey = 'openPrs';
  static const String githubTokenKey = 'github';
  static const String atMentionKey = 'chaserAtMentionStorage';
  static const String atMentionUpdatedKey = 'atMentionUpdated';
  static const String totalPrsChased = 'totalPrsChased';
  static const String watchNotifications = 'watchNotifications';
  static const String ignoreNotifications = 'ignoreNotifications';
}

enum ChaserViews { atMentions, pullRequests }

final String localStorageKey = 'github';
final String mention = 'mention';

final int leftArrowKey = 37;
final int rightArrowKey = 39;
