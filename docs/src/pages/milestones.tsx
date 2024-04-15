import {
  mdiEyeRefreshOutline,
  mdiAccountGroup,
  mdiAndroid,
  mdiAppleIos,
  mdiArchiveOutline,
  mdiBash,
  mdiBookSearchOutline,
  mdiCakeVariant,
  mdiCheckAll,
  mdiCheckboxMarked,
  mdiCollage,
  mdiContentCopy,
  mdiDevices,
  mdiExpansionCard,
  mdiFaceMan,
  mdiFaceManOutline,
  mdiFile,
  mdiFileSearch,
  mdiFolder,
  mdiForum,
  mdiHeart,
  mdiImage,
  mdiImageAlbum,
  mdiImageMultipleOutline,
  mdiImageSearch,
  mdiKeyboardSettingsOutline,
  mdiMagnify,
  mdiMap,
  mdiMaterialDesign,
  mdiMatrix,
  mdiMerge,
  mdiMonitor,
  mdiMotionPlayOutline,
  mdiPalette,
  mdiPanVertical,
  mdiPartyPopper,
  mdiPencil,
  mdiRaw,
  mdiRotate360,
  mdiSecurity,
  mdiServer,
  mdiShareAll,
  mdiShareCircle,
  mdiStar,
  mdiTag,
  mdiText,
  mdiThemeLightDark,
  mdiTrashCanOutline,
  mdiVectorCombine,
  mdiVideo,
  mdiWeb,
  mdiScaleBalance,
  mdiAllInclusive,
  mdiMagnifyScan,
} from '@mdi/js';
import Layout from '@theme/Layout';
import React from 'react';
import Timeline, { DateType, Item } from '../components/timeline';

const items: Item[] = [
  {
    icon: mdiMagnifyScan,
    description:
      'Advanced search with filters by date, location and more, also single search returns up to 5000 results compared to 100 in previous versions',
    title: 'Search enhancement with advanced filters',
    release: 'v1.95.0',
    tag: 'v1.95.0',
    date: new Date(2024, 1, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiScaleBalance,
    description: 'Immich switches to AGPLv3 license',
    title: 'AGPL License',
    release: 'v1.95.0',
    tag: 'v1.95.0',
    date: new Date(2024, 1, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiEyeRefreshOutline,
    description: 'Automatically import files in external libraries when the operating system detects changes.',
    title: 'Library watching',
    release: 'v1.94.0',
    tag: 'v1.94.0',
    date: new Date(2024, 0, 31),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiExpansionCard,
    description: 'Hardware acceleration support for Nvidia and Intel devices through CUDA and OpenVINO.',
    title: 'GPU acceleration for machine-learning',
    release: 'v1.94.0',
    tag: 'v1.94.0',
    date: new Date(2024, 0, 31),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMatrix,
    description: 'Moved the search from typesense to pgvecto.rs',
    title: 'Search improvement with pgvecto.rs',
    release: 'v1.91.0',
    tag: 'v1.91.0',
    date: new Date(2023, 11, 15),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiPencil,
    description: "Edit a photo or video's date, time, hours, timezone, and GPS information",
    title: 'Edit metadata',
    release: 'v1.90.0',
    tag: 'v1.90.0',
    date: new Date(2023, 11, 7),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiVectorCombine,
    description:
      'The serving of the web app is merged into the server image, allowing us to remove two containers from the stack.',
    title: 'Container consolidation',
    release: 'v1.88.0',
    tag: 'v1.88.0',
    date: new Date(2023, 10, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiBash,
    description: 'Version 2 of the Immich CLI is released, replacing the legacy v1 CLI.',
    title: 'CLI v2',
    release: 'v1.88.0',
    tag: 'v1.88.0',
    date: new Date(2023, 10, 19),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiForum,
    description: 'Comment a photo or a video in a shared album',
    title: 'Activity',
    release: 'v1.84.0',
    tag: 'v1.84.0',
    date: new Date(2023, 10, 1),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiStar,
    description: 'Reach 20K Stars on GitHub!',
    title: '20,000 Stars',
    release: 'v1.83.0',
    tag: 'v1.83.0',
    date: new Date(2023, 9, 28),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiContentCopy,
    title: 'Stack assets',
    description: 'Manual asset stacking for grouping and hiding related assets in the main timeline.',
    release: 'v1.83.0',
    tag: 'v1.83.0',
    date: new Date(2023, 9, 28),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiPalette,
    title: 'Custom theme',
    description: 'Apply your custom CSS for modifying fonts, colors, and styles in the web application.',
    release: 'v1.83.0',
    tag: 'v1.83.0',
    date: new Date(2023, 9, 28),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiTrashCanOutline,
    title: 'Trash Feature',
    description: 'Trash, restore from trash, and automatically empty the recycle bin after 30 days.',
    release: 'v1.82.0',
    tag: 'v1.82.0',
    date: new Date(2023, 9, 17),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiBookSearchOutline,
    title: 'External Libraries',
    description: 'Automatically import media into Immich based on imports paths and ignore patterns.',
    release: 'v1.79.0',
    tag: 'v1.79.0',
    date: new Date(2023, 8, 21),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMap,
    title: 'Map View (Mobile)',
    description: 'Heat map implementation in the mobile app.',
    release: 'v1.76.0',
    tag: 'v1.76.0',
    date: new Date(2023, 7, 29),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFile,
    title: 'Configuration File',
    description: 'Auto-configure an Immich installation via a configuration file.',
    release: 'v1.75.0',
    tag: 'v1.75.0',
    date: new Date(2023, 7, 26),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMonitor,
    title: 'Slideshow Mode (Web)',
    description: 'Start a full-screen slideshow from an Album on the web.',
    release: 'v1.75.0',
    tag: 'v1.75.0',
    date: new Date(2023, 7, 26),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiServer,
    title: 'Hardware Transcoding',
    description: 'Support hardware acceleration (QuickSync, VAAPI, and Nvidia) for video transcoding.',
    release: 'v1.72.0',
    tag: 'v1.72.0',
    date: new Date(2023, 7, 6),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiImageAlbum,
    title: 'View Albums via Time Buckets',
    description: 'Upgrade albums to use time buckets, an optimized virtual viewport.',
    release: 'v1.72.0',
    tag: 'v1.72.0',
    date: new Date(2023, 7, 6),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiImageAlbum,
    title: 'Album Description',
    description: 'Save an album description.',
    release: 'v1.72.0',
    tag: 'v1.72.0',
    date: new Date(2023, 7, 6),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiRotate360,
    title: '360° Photos (Web)',
    description: 'View 360° Photos on the web.',
    release: 'v1.71.0',
    tag: 'v1.71.0',
    date: new Date(2023, 6, 29),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMotionPlayOutline,
    title: 'Android Motion Photos',
    description: 'Add support for Android Motion Photos.',
    release: 'v1.69.0',
    tag: 'v1.69.0',
    date: new Date(2023, 6, 23),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFaceManOutline,
    title: 'Show/Hide Faces',
    description: 'Add the options to show or hide faces.',
    release: 'v1.68.0',
    tag: 'v1.68.0',
    date: new Date(2023, 6, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMerge,
    title: 'Merge Faces',
    description: 'Add the ability to merge multiple faces together.',
    release: 'v1.67.0',
    tag: 'v1.67.0',
    date: new Date(2023, 6, 14),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiImage,
    title: 'Feature Photo',
    description: 'Add the option to change the feature photo for a person.',
    release: 'v1.66.0',
    tag: 'v1.66.0',
    date: new Date(2023, 6, 4),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiKeyboardSettingsOutline,
    title: 'Multi-Select via SHIFT',
    description: 'Add the option to multi-select while holding SHIFT.',
    release: 'v1.66.0',
    tag: 'v1.66.0',
    date: new Date(2023, 6, 4),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiImageMultipleOutline,
    title: 'Memories (Mobile)',
    description: 'View "On this day..." memories in the mobile app.',
    release: 'v1.65.0',
    tag: 'v1.65.0',
    date: new Date(2023, 5, 30),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFaceMan,
    title: 'Facial Recognition (Mobile)',
    description: 'View detected faces in the mobile app.',
    release: 'v1.63.0',
    tag: 'v1.63.0',
    date: new Date(2023, 5, 24),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiImageMultipleOutline,
    title: 'Memories (Web)',
    description: 'View pictures taken in past years on this day on the web.',
    release: 'v1.61.0',
    tag: 'v1.61.0',
    date: new Date(2023, 5, 16),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiCollage,
    title: 'Justified Layout (Web)',
    description: 'Implement justified layout (collage) on the web.',
    release: 'v1.61.0',
    tag: 'v1.61.0',
    date: new Date(2023, 5, 16),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiRaw,
    title: 'RAW File Formats',
    description: 'Support for RAW file formats.',
    release: 'v1.61.0',
    tag: 'v1.61.0',
    date: new Date(2023, 5, 16),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiShareAll,
    title: 'Partner Sharing (Mobile)',
    description: 'View shared partner photos in the mobile app.',
    release: 'v1.58.0',
    tag: 'v1.58.0',
    date: new Date(2023, 4, 28),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFile,
    title: 'XMP Sidecar',
    description: 'Attach XMP Sidecar files to assets.',
    release: 'v1.58.0',
    tag: 'v1.58.0',
    date: new Date(2023, 4, 28),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFolder,
    title: 'Custom Storage Label',
    description: 'Replace the user UUID in the storage template with a custom label.',
    release: 'v1.57.0',
    tag: 'v1.57.0',
    date: new Date(2023, 4, 23),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiShareCircle,
    title: 'Partner Sharing',
    description: 'Share your entire collection with another user.',
    release: 'v1.56.0',
    tag: 'v1.56.0',
    date: new Date(2023, 4, 18),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFaceMan,
    title: 'Facial Recognition',
    description: 'Detect faces in pictures and cluster them together as people, which can be named.',
    release: 'v1.56.0',
    tag: 'v1.56.0',
    date: new Date(2023, 4, 18),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMap,
    title: 'Map View (Web)',
    description: 'View a global map, with clusters of photos based on corresponding GPS data.',
    release: 'v1.55.0',
    tag: 'v1.55.0',
    date: new Date(2023, 4, 9),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiDevices,
    title: 'Manage Auth Devices',
    description: 'Manage logged-in devices and revoke access from User Settings.',
    release: 'v1.55.0',
    tag: 'v1.55.0',
    date: new Date(2023, 4, 9),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiStar,
    description: 'Reach 10K Stars on GitHub!',
    title: '10,000 Stars',
    release: 'v1.54.0',
    tag: 'v1.54.0',
    date: new Date(2023, 3, 18),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiText,
    title: 'Asset Descriptions',
    description: 'Save an asset description',
    release: 'v1.54.0',
    tag: 'v1.54.0',
    date: new Date(2023, 3, 18),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiArchiveOutline,
    title: 'Archiving',
    description: 'Remove assets from the main timeline by archiving them.',
    release: 'v1.54.0',
    tag: 'v1.54.0',
    date: new Date(2023, 3, 18),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiDevices,
    title: 'Responsive Web App',
    description: 'Optimize the web app for small screen.',
    release: 'v1.54.0',
    tag: 'v1.54.0',
    date: new Date(2023, 3, 18),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFileSearch,
    title: 'Search By Metadata',
    description: 'Search images by filename, description, tagged people, make, model, and other metadata.',
    release: 'v1.52.0',
    tag: 'v1.52.0',
    date: new Date(2023, 2, 29),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiImageSearch,
    title: 'CLIP Search',
    description: 'Search images with free-form text like "Sunset at the beach".',
    release: 'v1.51.0',
    tag: 'v1.51.0',
    date: new Date(2023, 2, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMagnify,
    title: 'Explore Page',
    description: 'View tagged places, object, and people.',
    release: 'v1.51.0',
    tag: 'v1.51.0',
    date: new Date(2023, 2, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiAppleIos,
    title: 'iOS Background Uploads',
    description: 'Automatically backup pictures in the background on iOS.',
    release: 'v1.48.0',
    tag: 'v1.48.0',
    date: new Date(2023, 1, 21),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMotionPlayOutline,
    title: 'Auto-Link Live Photos',
    description: 'Automatically link live photos, even when uploaded as separate files.',
    release: 'v1.48.0',
    tag: 'v1.48.0',
    date: new Date(2023, 2, 21),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMaterialDesign,
    title: 'Material Design 3 (Mobile)',
    description: 'Upgrade the mobile app to Material Design 3.',
    release: 'v1.47.0',
    tag: 'v1.47.0',
    date: new Date(2023, 1, 13),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiHeart,
    title: 'Favorites (Mobile)',
    description: 'Show favorites on the mobile app.',
    release: 'v1.46.0',
    tag: 'v1.46.0',
    date: new Date(2023, 1, 9),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiCakeVariant,
    title: 'Immich Turns 1',
    description: 'Immich is officially one year old.',
    release: 'v1.43.0',
    tag: 'v1.43.0',
    date: new Date(2023, 1, 3),
    dateType: DateType.DATE,
  },
  {
    icon: mdiHeart,
    title: 'Favorites Page (Web)',
    description: 'Favorite and view favorites on the web.',
    release: 'v1.43.0',
    tag: 'v1.43.0',
    date: new Date(2023, 0, 27),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiShareCircle,
    title: 'Public Share Links',
    description: 'Share photos and albums publicly via a shared link.',
    release: 'v1.41.0',
    tag: 'v1.41.1_64-dev',
    date: new Date(2023, 0, 10),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiFolder,
    title: 'User-Defined Storage Structure',
    description: 'Support custom storage structures.',
    release: 'v1.39.0',
    tag: 'v1.39.0_61-dev',
    date: new Date(2022, 11, 19),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiMotionPlayOutline,
    title: 'iOS Live Photos',
    description: 'Backup and display iOS Live Photos.',
    release: 'v1.36.0',
    tag: 'v1.36.0_55-dev',
    date: new Date(2022, 10, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiSecurity,
    title: 'OAuth Integration',
    description: 'Support OAuth2 and OIDC capable identity providers.',
    release: 'v1.36.0',
    tag: 'v1.36.0_55-dev',
    date: new Date(2022, 10, 20),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiWeb,
    title: 'Documentation Site',
    description: 'Release an official documentation website.',
    release: 'v1.33.1',
    tag: 'v1.33.0_52-dev',
    date: new Date(2022, 9, 26),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiThemeLightDark,
    title: 'Dark Mode (Web)',
    description: 'Dark mode on the web.',
    release: 'v1.32.0',
    tag: 'v1.32.0_50-dev',
    date: new Date(2022, 9, 14),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiPanVertical,
    title: 'Virtual Scrollbar (Web)',
    description: 'View the main timeline with a virtual scrollbar, allowing to jump to any point in time, instantly.',
    release: 'v1.27.0',
    tag: 'v1.27.0_37-dev',
    date: new Date(2022, 8, 6),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiCheckAll,
    title: 'Checksum Duplication Check',
    description: 'Enforce per user sha1 checksum uniqueness.',
    release: 'v1.27.0',
    tag: 'v1.27.0_37-dev',
    date: new Date(2022, 8, 6),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiAndroid,
    title: 'Android Background Backup',
    description: 'Automatic backup in the background on Android.',
    release: 'v1.24.0',
    tag: 'v1.24.0_34-dev',
    date: new Date(2022, 7, 19),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiAccountGroup,
    title: 'Admin Portal',
    description: 'Manage users and admin settings from the web.',
    release: 'v1.10.0',
    tag: 'v1.10.0_15-dev',
    date: new Date(2022, 4, 29),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiShareCircle,
    title: 'Album Sharing',
    description: 'Share albums with other users.',
    release: 'v1.7.0',
    tag: 'v1.7.0_11-dev ',
    date: new Date(2022, 3, 24),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiTag,
    title: 'Image Tagging',
    description: 'Tag images with custom values.',
    release: 'v1.7.0',
    tag: 'v1.7.0_11-dev ',
    date: new Date(2022, 3, 24),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiImage,
    title: 'View Exif',
    description: 'View metadata about assets.',
    release: 'v1.3.0',
    tag: 'v1.3.0-dev ',
    date: new Date(2022, 2, 22),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiCheckboxMarked,
    title: 'Multi Select',
    description: 'Select and execute actions on multiple assets at the same time.',
    release: 'v1.2.0',
    tag: 'v0.2-dev ',
    date: new Date(2022, 1, 8),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiVideo,
    title: 'Video Player',
    description: 'Play videos in the web and on mobile.',
    release: 'v1.2.0',
    tag: 'v0.2-dev ',
    date: new Date(2022, 1, 8),
    dateType: DateType.RELEASE,
  },
  {
    icon: mdiPartyPopper,
    title: 'First Commit',
    description: 'First commit on GitHub, Immich is born.',
    release: 'v1.0.0',
    date: new Date(2022, 1, 3),
    dateType: DateType.DATE,
  },
];

export default function MilestonePage(): JSX.Element {
  return (
    <Layout title="Milestones" description="History of Immich">
      <section className="my-8">
        <h1 className="md:text-6xl text-center mb-10 text-immich-primary dark:text-immich-dark-primary px-2">
          Major Milestones
        </h1>
        <p className="text-center text-xl px-2">
          A list of project achievements and milestones, <br />
          by release date.
        </p>
        <div className="flex justify-around mt-8 w-full max-w-full">
          <Timeline items={items} />
        </div>
      </section>
    </Layout>
  );
}
