# Initialize raw2dto3D Project

## Goal Description
Create a new project named "raw2dto3D" in the current directory. The project will use Vite as the build tool and the "vanilla" template (HTML + JS, no frameworks), as requested.

## Proposed Changes
### Project Initialization
- Run `npx -y create-vite@latest raw2dto3D --template vanilla`
- Change directory to `raw2dto3D`
- Run `npm install` to install dependencies

### File Structure (Scaffolding Result)
[NEW] raw2dto3D/
    - index.html
    - main.js
    - style.css
    - package.json
    - vite.config.js (if applicable, or default)

## Verification Plan
### Automated Tests
- Run `npm run dev` to ensure the dev server starts without errors.
- Verify `package.json` does not contain React, Vue, or other framework dependencies.
