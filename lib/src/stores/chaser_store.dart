library wChaser.src.stores.chaser_store;

import 'package:w_flux/w_flux.dart';

import 'package:wChaser/src/actions/actions.dart';
import 'package:wChaser/src/models/models.dart';
import 'package:wChaser/src/stores/chaser_stores.dart';
import 'package:wChaser/src/services/local_storage.dart';
import 'package:wChaser/src/services/github.dart';
import 'package:wChaser/src/services/status_service.dart';

class ChaserStore extends Store {
  String viewName;
  ChaserActions chaserActions;
  List<GitHubSearchResult> displayPullRequests;
  LocalStorageService localStorageService;
  LocationStore locationStore;
  DateTime updated;
  GitHubService gitHubService;
  bool showAll;
  bool rowsHideable;
  bool loading;
  StatusService _statusService;

  ChaserStore(StatusService this._statusService, this.localStorageService, this.gitHubService, this.chaserActions,
      this.locationStore) {
    _statusService.auth.listen((_) {
      if (locationStore.currentView.toString() != viewName) return;
      load();
    });

    locationStore.listen((_) {
      if (locationStore.currentView.toString() != viewName) return;
      load();
    });

    chaserActions.locationActions.refreshView.listen((e) {
      if (locationStore.currentView.toString() != viewName) return;
      load(force: true);
    });

    chaserActions.atMentionActions.toggleNotification.listen((GitHubSearchResult gsr) {
      if (locationStore.currentView.toString() != viewName) return;

      gsr.notificationsActive = !gsr.notificationsActive;
      localStorageService.watchForNotification(gsr);
      trigger();
    });
  }

  getPullRequestsStatus(List<GitHubSearchResult> searchResults) async {
    for (GitHubSearchResult gsr in searchResults) {
      gsr.githubPullRequest = await gitHubService.getPullRequest(gsr.pullRequestUrl);

      List<GitHubStatus> githubStatuses = await gitHubService.getPullRequestStatus(gsr.githubPullRequest);

      // first one in the list should be the current
      githubStatuses.forEach((GitHubStatus ghStatus) {
        gsr.githubPullRequest.githubStatus.putIfAbsent(ghStatus.context, () => ghStatus);
      });
    }
    trigger();
  }

  // to be overridden
  load({force: false}) {}
}
