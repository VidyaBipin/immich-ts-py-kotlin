import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:chewie/chewie.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/asset_viewer/hooks/chewiew_controller_hook.dart';
import 'package:immich_mobile/modules/asset_viewer/providers/show_controls.provider.dart';
import 'package:immich_mobile/modules/asset_viewer/providers/video_player_controls_provider.dart';
import 'package:immich_mobile/modules/asset_viewer/providers/video_player_value_provider.dart';
import 'package:immich_mobile/modules/asset_viewer/ui/custom_video_player_controls.dart';
import 'package:immich_mobile/shared/models/asset.dart';
import 'package:immich_mobile/shared/ui/delayed_loading_indicator.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

@RoutePage()
// ignore: must_be_immutable
class VideoViewerPage extends HookConsumerWidget {
  final Asset asset;
  final bool isMotionVideo;
  final Widget? placeholder;
  final Duration hideControlsTimer;
  final bool showControls;
  final bool showDownloadingIndicator;

  const VideoViewerPage({
    super.key,
    required this.asset,
    this.isMotionVideo = false,
    this.placeholder,
    this.showControls = true,
    this.hideControlsTimer = const Duration(seconds: 5),
    this.showDownloadingIndicator = true,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useChewieController(
      asset,
      controlsSafeAreaMinimum: const EdgeInsets.only(
        bottom: 100,
      ),
      placeholder: SizedBox.expand(child: placeholder),
      customControls: CustomVideoPlayerControls(
        hideTimerDuration: hideControlsTimer,
      ),
      showControls: showControls && !isMotionVideo,
      hideControlsTimer: hideControlsTimer,
    );

    // The last volume of the video used when mute is toggled
    final lastVolume = useState(0.0);

    // When the volume changes, set the volume
    ref.listen(videoPlayerControlsProvider.select((value) => value.mute),
        (_, mute) {
      if (mute) {
        controller?.setVolume(0.0);
      } else {
        controller?.setVolume(lastVolume.value);
      }
    });

    // When the position changes, seek to the position
    ref.listen(videoPlayerControlsProvider.select((value) => value.position),
        (_, position) {
      final video = controller?.videoPlayerController.value;
      if (video == null) {
        // No seeeking if there is no video
        return;
      }

      // Find the position to seek to
      final Duration seek = video.duration * (position / 100.0);
      controller?.seekTo(seek);
    });

    // When the custom video controls paus or plays
    ref.listen(videoPlayerControlsProvider.select((value) => value.pause),
        (_, pause) {
      if (pause) {
        controller?.pause();
      } else {
        controller?.play();
      }
    });

    // Updates the [videoPlaybackValueProvider] with the current
    // position and duration of the video from the Chewie [controller]
    // Also sets the error if there is an error in the playback
    void updateVideoPlayback() {
      final videoPlayback = VideoPlaybackValue.fromController(
        controller?.videoPlayerController,
      );
      ref.read(videoPlaybackValueProvider.notifier).value = videoPlayback;
      final state = videoPlayback.state;

      // Enable the WakeLock while the video is playing
      if (state == VideoPlaybackState.playing) {
        WakelockPlus.enable();
      } else {
        WakelockPlus.disable();
      }
    }

    // Adds and removes the listener to the video player
    useEffect(
      () {
        // Guard no controller
        if (controller == null) {
          return null;
        }

        // Hide the controls
        // Done in a microtask to avoid setting the state while the widget is building
        if (!isMotionVideo) {
          Future.microtask(
            () => ref.read(showControlsProvider.notifier).show = false,
          );
        }

        final video = controller.videoPlayerController.value;

        // Hold initial volume
        lastVolume.value = video.volume;

        // Subscribes to listener
        controller.videoPlayerController.addListener(updateVideoPlayback);
        return () {
          // Removes listener when we dispose
          controller.pause();
          controller.videoPlayerController.removeListener(updateVideoPlayback);
        };
      },
      [controller],
    );

    final size = MediaQuery.sizeOf(context);

    return PopScope(
      onPopInvoked: (pop) {
        ref.read(videoPlaybackValueProvider.notifier).value =
            VideoPlaybackValue.uninitialized();
      },
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 400),
        child: Stack(
          children: [
            Visibility(
              visible: controller == null,
              child: Stack(
                children: [
                  if (placeholder != null) placeholder!,
                  const Positioned.fill(
                    child: Center(
                      child: DelayedLoadingIndicator(
                        fadeInDuration: Duration(milliseconds: 500),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            if (controller != null)
              SizedBox(
                height: size.height,
                width: size.width,
                child: Chewie(
                  controller: controller,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
