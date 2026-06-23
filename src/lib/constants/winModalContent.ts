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
  level3: {
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
}
