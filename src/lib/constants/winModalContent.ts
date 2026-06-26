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
    statLine: (ms: number, resends: number) =>
      `It took you ${formatTime(ms)} to verify your email. You needed ${resends} code resend${resends === 1 ? '' : 's'}.`,
    reality:
      'Time limits on verification codes punish users who need longer to read, remember, or type — especially people with cognitive disabilities, anxiety, or motor difficulties.',
    fix: 'Let users extend or turn off time limits when timing is not essential. Make them sufficiently long when timing is essential. Give users enough time to read toasts before they auto-dismiss. Warn before expiry with aria-live regions.',
    codeBefore: `<!-- ❌ Before: code in auto-dismiss toast + hard timeout -->
<div role="status" class="toast-auto-hide">Code: K7mP2xQn</div>
<input maxlength="8" />
<!-- no extend, no warning -->`,
    codeAfter: `<!-- ✅ After: persistent code + adjustable timer -->
<p id="otp-code" aria-live="polite">Your code: K7mP2xQn</p>
<input aria-describedby="otp-code otp-timer" />
<button type="button">Extend time</button>
<p id="otp-timer" role="status" aria-live="polite">2:00 remaining</p>`,
  },
  level3: {
    statLine: (ms: number, destructions: number) =>
      `It took you ${formatTime(ms)} to save your pledge. You clicked the wrong button ${destructions} time${destructions === 1 ? '' : 's'}.`,
    reality:
      'Screen reader and keyboard users depend entirely on accessible names to understand controls. Without them they are left completely guessing. An icon-only button with no label is indistinguishable from any other button — or from nothing at all.',
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
