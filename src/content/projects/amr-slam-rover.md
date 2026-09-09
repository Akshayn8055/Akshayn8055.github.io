---
title: "Autonomous SLAM Rover"
tagline: "ROS-based ground rover that maps, localizes, and navigates an unknown environment with zero prior knowledge."
role: "Research Assistant, COE Robotics & Automation"
dateRange: "Oct 2025 – Present"
order: 2
featured: true
tags: ["SLAM", "LiDAR", "ROS", "Sensor Fusion", "Raspberry Pi"]
stack: ["2D LiDAR", "Wheel Encoder Odometry", "Raspberry Pi", "ROS Navigation Stack", "RViz"]
links: {}
coverImage: "/media/photos/cover-amr.webp"
highlightVideo: "/media/highlights/amr.mp4"
demoVideo:
  type: youtube
  src: "https://youtu.be/GpKzsBTLB28"
gallery:
  - type: youtube
    src: "https://youtu.be/Qys0j_JvzeU"
  - type: image
    src: "/media/photos/lidar-map.webp"
  - type: image
    src: "/media/photos/workspace.webp"
---

## Overview

Built a ROS-based autonomous ground rover capable of navigating to a target location in an unknown environment. Integrated a 2D LiDAR for real-time occupancy mapping and localization, with wheel encoder odometry for dead-reckoning on a Raspberry Pi.

## What it does

- Deployed the **ROS navigation stack** for global and local path planning.
- Enables the rover to autonomously build a map, localize within it, and execute collision-free paths to given waypoints — without any prior environmental knowledge.
- Feeds into the COE's ongoing **Autonomous GPS-Denied Rover** research: navigating complex waypoints without GPS dependency using real-time mapping, localization, LiDAR, and sensor fusion.
