import { formatTime } from '#/lib/helpers/formatTime'

export const WIN_MODAL_CONTENT = {
  level1: {
    statLine: (ms: number, misclicks: number) =>
      `It took you ${formatTime(ms)} to click a checkbox. You missed ${misclicks} time${misclicks === 1 ? '' : 's'}.`,
    reality:
      "For users with Parkinson's, hard-to-click targets create daily struggles across the web.",
    fix: 'Increase the target to at least 24×24px (WCAG 2.5.8 AA) or 44×44px (WCAG 2.5.5 AAA), and wrap the input in a <label> so clicking the text also toggles the checkbox.',
    codeBefore: `<!-- ❌ Before: 9px target, unlinked label -->
<input type="checkbox" class="size-[9px]" />
<span>I agree to the terms</span>`,
    codeAfter: `<!-- ✅ After: 24px+ target, clickable label -->
<label>
  <input type="checkbox" class="size-6" />
  I agree to the terms
</label>`,
  },
  level2: {
    statLine: (ms: number, attempts: number) =>
      `It took you ${formatTime(ms)} to submit a form. You hit submit ${attempts} time${attempts === 1 ? '' : 's'}.`,
    reality:
      'When a form silently rejects input, users with cognitive disabilities, anxiety, or low digital literacy are left completely guessing. They assume they did something wrong — but have no idea what.',
    fix: 'Use aria-live="polite" regions to announce validation errors the moment they are relevant. Requirements should be stated upfront, and errors must explain exactly what to fix.',
    codeBefore: `<!-- ❌ Before: submit fails silently, no error text -->
<input type="password" />
<!-- nothing announced, no requirements shown -->`,
    codeAfter: `<!-- ✅ After: requirements upfront + live error feedback -->
<p id="pw-hint">Must contain a number and a special character.</p>
<input type="password" aria-describedby="pw-hint pw-error" />
<p id="pw-error" role="alert" aria-live="polite">
  <!-- filled by JS when validation fails -->
</p>`,
  },
  level3: {
    statLine: (ms: number, destructions: number) =>
      `It took you ${formatTime(ms)} to save your pledge. Your text was deleted ${destructions} time${destructions === 1 ? '' : 's'}.`,
    reality:
      'Screen reader and keyboard users depend entirely on accessible names to understand controls. An icon-only button with no label is indistinguishable from any other button — or from nothing at all.',
    fix: 'Every interactive element needs an accessible name. Add aria-label to icon-only buttons, or pair the icon with visible text and aria-hidden="true" on the SVG.',
    codeBefore: `<!-- ❌ Before: icon-only button, no accessible name -->
<button>
  <svg>...</svg>
</button>`,
    codeAfter: `<!-- ✅ After: aria-label names the action -->
<button aria-label="Save">
  <svg aria-hidden="true">...</svg>
</button>

<!-- ✅ Or: visible label alongside the icon -->
<button>
  <svg aria-hidden="true">...</svg>
  Save
</button>`,
  },
}
