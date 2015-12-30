library wChaser.src.utils.utils;

import 'package:wChaser/src/models/models.dart';
import 'package:intl/intl.dart';
import 'package:wChaser/src/services/github.dart' as github;

// checks all comments for the current user's +1
bool isPlusOneNeeded(List<GitHubComment> gitHubComments, String userId) {
  bool plusOneNeeded = true;
  GitHubComment atMentionedComment;

  gitHubComments.forEach((GitHubComment gitHubComment) {
    if (gitHubComment.body.contains('@$userId')) {
      atMentionedComment = gitHubComment;
      plusOneNeeded = true;
    } else if (plusOneNeeded && gitHubComment.user.login == userId) {
      plusOneNeeded = !gitHubComment.body.contains('+1');
    }
  });

  return plusOneNeeded;
}

String formatDate(DateTime dateTime) {
  var formatter = new DateFormat('MM/dd/yyyy');
  String formatted = formatter.format(dateTime);
  return formatted;
}