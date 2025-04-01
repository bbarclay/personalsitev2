# Flow Configuration Documentation

## Node Types

### 1. Family Node (`type: "family"`)
A container node that can hold multiple child nodes.
```json
{
  "id": "unique_id",
  "type": "family",
  "data": {
    "type": "parent",
    "familyName": "Group Name",
    "layout": {
      "columns": 1-12 // Number of columns for child layout
    },
    "children": [] // Array of child nodes
  },
  "position": { "x": 0, "y": 0 },
  "draggable": true
}
```

### 2. Simple Node (`type: "simple"`)
A basic node with a label.
```json
{
  "id": "unique_id",
  "type": "simple",
  "data": {
    "label": "Node Label",
    "customClasses": "optional-tailwind-classes"
  },
  "position": { "x": 0, "y": 0 },
  "draggable": true
}
```

### 3. Image Node (`type: "image"`)
A node that displays an image with optional label.
```json
{
  "id": "unique_id",
  "type": "image",
  "data": {
    "imageUrl": "/path/to/image",
    "label": "Optional Label",
    "customClasses": "optional-tailwind-classes"
  },
  "position": { "x": 0, "y": 0 },
  "draggable": true
}
```

### 4. Icon Card Node (`type: "iconCard"`)
A node with an icon, title, and description. Supports all Lucide React icons.
```json
{
  "id": "unique_id",
  "type": "iconCard",
  "data": {
    "title": "Card Title",
    "description": "Card Description",
    "iconName": "User", // Any Lucide icon name (e.g., "Github", "Settings", "Mail")
    "iconSize": 24, // Optional: icon size in pixels
    "iconClassName": "optional-icon-classes", // Optional: additional classes for the icon
    "customClasses": "optional-tailwind-classes"
  },
  "position": { "x": 0, "y": 0 },
  "draggable": true
}
```

#### Available Icons
You can use any icon from the [Lucide Icons library](https://lucide.dev/icons/). Here are some common examples:

- Basic Icons: "User", "Home", "Settings", "Mail", "Phone"
- Tech Icons: "Github", "Code", "Database", "Server", "Cloud"
- UI Icons: "Check", "X", "Alert", "Info", "Search"
- Media Icons: "Image", "Video", "Music", "Camera", "Mic"
- Action Icons: "Edit", "Trash", "Download", "Upload", "Share"
- Direction Icons: "ArrowRight", "ChevronDown", "MoveLeft", "CornerUpRight"

The icon name should match the PascalCase name from the Lucide library (e.g., "ArrowRightCircle", "CheckCircle2").
```

### 5. Annotation Node (`type: "annotationNode"`)
A node for adding annotations/comments.
```json
{
  "id": "unique_id",
  "type": "annotationNode",
  "data": {
    "label": "Annotation Text",
    "level": 1-4, // Color theme level
    "arrow": "⤹", // Arrow character
    "arrowStyle": {
      "right": 20,
      "bottom": -25,
      "transform": "rotate(-45deg)"
    }
  },
  "position": { "x": 0, "y": 0 },
  "parentNode": "parent_node_id", // ID of the node this annotates
  "draggable": true
}
```

### 6. Tooltip Node (`type: "tooltip"`)
A node with hover tooltip functionality.
```json
{
  "id": "unique_id",
  "type": "tooltip",
  "data": {
    "label": "Node Label",
    "tooltip": {
      "label": "Tooltip Text",
      "position": "Top" | "Bottom" | "Left" | "Right"
    },
    "customClasses": "optional-tailwind-classes"
  },
  "position": { "x": 0, "y": 0 },
  "draggable": true
}
```

## Edge Animations

Edges can be animated using the `animatedSvg` type. Here are all available options:

```json
{
  "id": "edge_id",
  "source": "source_node_id",
  "target": "target_node_id",
  "type": "animatedSvg",
  "data": {
    "duration": 1-10, // Animation duration in seconds
    "direction": "forward" | "reverse" | "alternate" | "alternate-reverse",
    "path": "bezier" | "smoothstep" | "step" | "straight",
    "repeat": "indefinite" | number,
    "shape": "circle" | "package"
  }
}
```

### Edge Animation Options

1. **duration**: 
   - Range: 1-10 seconds
   - Controls animation speed

2. **direction**:
   - `forward`: Animates from source to target
   - `reverse`: Animates from target to source
   - `alternate`: Alternates between forward and reverse
   - `alternate-reverse`: Starts with reverse then alternates

3. **path**:
   - `bezier`: Curved path with smooth transitions
   - `smoothstep`: Gradual acceleration and deceleration
   - `step`: Sharp angles with sudden direction changes
   - `straight`: Direct line between points

4. **repeat**:
   - `indefinite`: Loops forever
   - number: Specific number of repetitions

5. **shape**:
   - `circle`: Circular animated element
   - `package`: Square/package animated element

## Nesting Example

Here's an example of a nested structure with various node types:

```json
{
  "nodes": [
    {
      "id": "parent1",
      "type": "family",
      "data": {
        "type": "parent",
        "familyName": "Main Group",
        "layout": { "columns": 3 },
        "children": [
          {
            "id": "child1",
            "type": "tooltip",
            "name": "Child 1",
            "tooltip": {
              "label": "First Child",
              "position": "Top"
            }
          },
          {
            "id": "child2",
            "type": "image",
            "imageUrl": "/image.jpg",
            "label": "Child 2"
          },
          {
            "id": "child3",
            "type": "iconCard",
            "data": {
              "title": "Child 3",
              "description": "Description"
            }
          }
        ]
      },
      "position": { "x": 100, "y": 100 },
      "draggable": true
    },
    {
      "id": "annotation1",
      "type": "annotationNode",
      "data": {
        "label": "Group Annotation",
        "level": 1
      },
      "position": { "x": -50, "y": -50 },
      "parentNode": "parent1"
    }
  ]
}
```

## Styling

Nodes can be styled using Tailwind CSS classes via the `customClasses` property:

```json
{
  "customClasses": "bg-blue-100 dark:bg-blue-900 border-2 border-blue-500"
}
```

Common styling patterns:
- Light/Dark themes: `bg-{color}-100 dark:bg-{color}-900`
- Borders: `border-2 border-{color}-500`
- Padding: `p-2 px-4 py-2`
- Rounded corners: `rounded-lg rounded-xl`
- Shadows: `shadow-md shadow-lg`