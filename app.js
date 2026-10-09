'use strict';
const form = document.getElementById('assessment-form');
const completion = document.getElementById('completion');
const summary = document.getElementById('answer-summary');
let submission = null;
for (const field of form.querySelectorAll('input, textarea')) {
  field.addEventListener('input', () => field.setCustomValidity(''));
}
form.addEventListener('submit', event => {
  event.preventDefault();
  for (const field of form.querySelectorAll('input, textarea')) {
    field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
  }
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  submission = {
    assessment: 'UX Pre-Assessment',
    reference: 'Figma 3LkAyuynPuV0QxgTIhEKZR / 1022:2519',
    completed_at: new Date().toISOString(),
    name: values.get('name').trim(),
    email: values.get('email').trim(),
    improvements: values.get('improvements').trim(),
    design_rationale: values.get('rationale').trim()
  };
  summary.replaceChildren();
  for (const [label, value] of [['Nama', submission.name], ['Email', submission.email], ['What can be improved?', submission.improvements], ['Design Rationale', submission.design_rationale]]) {
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = label;
    detail.textContent = value;
    summary.append(term, detail);
  }
  form.hidden = true;
  completion.hidden = false;
  document.getElementById('completion-title').focus();
});
document.getElementById('download').addEventListener('click', () => {
  if (!submission) return;
  const blob = new Blob([JSON.stringify(submission, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ux-pre-assessment-' + submission.completed_at.slice(0,10) + '.json';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.getElementById('edit').addEventListener('click', () => {
  completion.hidden = true;
  form.hidden = false;
  document.getElementById('improvements').focus();
});
