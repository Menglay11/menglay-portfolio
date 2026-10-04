# Kaing Menglay — 3D Modelling & Animation Portfolio

A static, GitHub Pages-compatible portfolio focused on Kaing Menglay’s real 3D modelling and animation work. The site uses semantic HTML, responsive CSS, vanilla JavaScript, and Google’s `<model-viewer>` web component. It loads one GLB at a time and detects animation clips from the active file at runtime.

## Project structure

```text
portfolio/
├── index.html
├── assets/
│   └── kaing-menglay-portrait.png
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── model-viewer.js
├── models/
│   ├── Animation.glb
│   ├── Blender_First.glb
│   ├── Car.glb
│   ├── Cup.glb
│   └── firstCharacterWithAnimation.glb
└── README.md
```

## Model files

Place the five real GLB files inside `models/`. Filenames and capitalization must match exactly:

- `Blender_First.glb`
- `Car.glb`
- `Cup.glb`
- `Animation.glb`
- `firstCharacterWithAnimation.glb`

Web servers and GitHub Pages can be case-sensitive. `Car.glb`, `car.glb`, and `CAR.glb` may be treated as three different paths, so changing capitalization without also changing the `src` value in `js/main.js` can produce a missing-model error.

The supplied GLB files in this project were copied unchanged. Keep their editable Blender (`.blend`) source files backed up separately; GLB is a delivery format and is not a replacement for the editable scene, materials, rig, or animation timeline.

## Replacing a model after editing it in Blender

1. Open the original `.blend` file and save a backup.
2. Make and test the changes in Blender.
3. Export a new GLB using the same exact filename as the file it replaces.
4. Replace only that matching file inside `models/`.
5. Run the portfolio through a local server and check the model, camera framing, materials, and animation controls.
6. Commit both the website change and the intended GLB replacement to version control.

No HTML change is needed when the path and filename remain the same.

## Exporting GLB from Blender with animation

In Blender:

1. Choose **File → Export → glTF 2.0**.
2. Choose **glTF Binary (`.glb`)** as the format.
3. In the export options, enable **Animation**.
4. Export the actions or NLA tracks you intend to publish. Give clips clear names in Blender because those names become the visitor-facing animation buttons.
5. If an animation depends on a rig, verify that the mesh, armature, and required actions are included in the export.
6. Reopen or test the exported GLB before replacing the portfolio copy.

The website reads `modelViewer.availableAnimations` after each model finishes loading. It creates one button per detected clip and does not hard-code clip names. A model with no clips receives a simple “This model does not contain animation clips” message.

## Editing project information

All project titles, categories, file paths, alternative text, and descriptions live in the `PROJECTS` array near the top of `js/main.js`.

The included descriptions are intentionally marked as placeholders because no project-specific process, inspiration, techniques, or outcomes were supplied. Replace them only with accurate information.

### Add another project

1. Copy the real `.glb` file into `models/`.
2. Add a new object to the `PROJECTS` array in `js/main.js`:

```js
{
  id: 'unique-project-id',
  title: 'Visitor-facing title',
  category: '3D Models',
  src: 'models/ExactFilename.glb',
  description: 'An accurate project description.',
  alt: 'A useful description of the interactive 3D model'
}
```

Use either an existing category or a new category name. The project navigation is generated automatically from the array order and category values.

## Run locally

Do not rely on opening `index.html` directly with a `file://` URL. Browsers can restrict module scripts, GLB requests, and related web features on local file URLs.

From the project directory, start any simple HTTP server. For example, with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

The `<model-viewer>` library and Google Fonts are loaded from the internet, so the first local test requires a network connection. The portfolio’s HTML, CSS, JavaScript, portrait, and GLB files remain local.

## Deploy with GitHub Pages

1. Create a GitHub repository and add this project at the repository root.
2. Push the files to the repository’s default branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the default branch and the root (`/`) folder, then save.
6. Wait for GitHub Pages to publish the site and open the provided URL.

All website asset paths are relative, so the site works from a GitHub Pages project subdirectory as well as from a custom domain.

## Test on mobile

- Open the local URL from a phone on the same network, using the computer’s local network IP instead of `localhost`, or use browser device emulation.
- Test portrait and landscape orientations.
- Confirm the navigation menu opens, closes, and returns focus correctly.
- Switch all five projects rapidly and confirm only the current model appears.
- Rotate with one finger, pinch to zoom, and scroll the page without horizontal overflow.
- Test animation selection, play, pause, resume, restart, and speed controls on both animated models.
- Test light and dark themes and reload to confirm the chosen theme persists.

## Replace the social placeholders

The Contact section deliberately displays non-clickable GitHub and LinkedIn placeholders because no profile URLs were supplied.

When real URLs are ready, replace each placeholder `<span>` in `index.html` with an anchor:

```html
<a href="https://github.com/your-real-username">GitHub</a>
```

Use only verified profile URLs and keep the visible label clear.

## Accessibility and fallback behavior

The site includes a skip link, semantic landmarks, visible focus indicators, keyboard-operable controls, live status announcements, reduced-motion support, touch-friendly controls, WebGL fallback messaging, actionable file errors, and a no-JavaScript summary. Test with keyboard-only navigation and at 200% browser zoom before publishing future changes.
