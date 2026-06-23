---
name: Create new level
description: Creation of a new level and all supporting components in a11y-hard-mode repo.  
---

# Create new level
Build a brand new level in the existing a11y-hard-mode game. 

## When to Use
- Use this skill when prompted to create a new level in a11y hard mode

## Instructions
1. **Follow existing or come up with an idea**: If prompted with a specific level idea, build that specific level, if not, create a unique idea of a level that demonstrates the value of web accessibility. The levels should be "fun" but more importantly informative and give developers/designers/product managers the ah-ha moment on the value of accessibility.

2. **Add a new level route**: Within the `/src/routes/levels` folder, add a Tanstack Start route, one higher than the highest current level. 

3. **Build the level component**: Either build within the route component or build a separate component in `src/comopnents/levels/:levelId` if it makes sense for clarity. The component should consider/contain/cover the following:
- Styling of the page should be done with tailwind and should fit within the overal UI of the app (Create custom UI components if it makes sense and we have repetition of sets of utility classes)
- Determine a relevant "friction event" that makes sense for the specific a11y challenge. Add a title to the `FRICTION_EVENT_TITLES` constant.
- Separate components/custom hooks built when it makes sense for code reuse or readability.
- Vitest unit tests should be added for all new components/hooks
- On success of the level, the global `WinModal` component should be rendered. Fill it following the pattern of other levels (stat, reality, fix)

4. **Update the GameProvider and global types** : Both should be updated to reflect the newly added level. 
- `src/types/GameContext.ts` — add levelN to GameState
- `src/context/game/GameProvider.tsx` — add initial state entry + activeLevel route mapping
- `src/lib/constants/levels.ts` — add to LEVELS_IDS
- `src/lib/constants/copy.ts` — add to both LEVEL_TITLES and FRICTION_EVENT_TITLES