import 'package:flutter/material.dart';

class ThumbnailPlaceholder extends StatelessWidget {
  final EdgeInsets margin;
  final double width;
  final double height;

  const ThumbnailPlaceholder({
    super.key,
    this.margin = EdgeInsets.zero,
    this.width = 250,
    this.height = 250,
  });

  static const _brightColors = [
    Color(0xFFF1F3F4),
    Color(0xFFB4B6B8),
  ];

  static const _darkColors = [
    Color(0xFF3B3F42),
    Color(0xFF2B2F32),
  ];

  @override
  Widget build(BuildContext context) {
    final brightness = MediaQuery.platformBrightnessOf(context);
    return Container(
      width: width,
      height: height,
      margin: margin,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: brightness == Brightness.light ? _brightColors : _darkColors,
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
    );
  }
}
