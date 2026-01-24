# Tool Icons

This directory contains PNG icons for tools used in projects.

## Required Icons

Create PNG files (24x24px recommended) with the following names:

- `unity.png` - Unity game engine
- `godot.png` - Godot game engine
- `csharp.png` - C# programming language
- `blender.png` - Blender 3D software
- `figma.png` - Figma design tool
- `placeholder.png` - Fallback icon for missing tools

## Adding New Tools

1. Create a PNG file named `{tool-id}.png` in this directory
2. Add the tool ID to the `tools` array in `games-data.js` or `others-data.js`
3. Optionally add a label in `formatToolLabel()` in `projects-grid.js`

## Icon Specifications

- **Size**: 24x24px (or square aspect ratio)
- **Format**: PNG with transparency
- **Color**: Icons will be automatically converted to white via CSS filter
- **Background**: Transparent recommended
