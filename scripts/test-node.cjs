const { truncate } = require('../dist/cjs/index.cjs');

console.log('Testing CommonJS build...\n');

const testCases = [
  {
    name: 'Simple HTML truncation',
    html: '<p>This is a <strong>very long</strong> HTML string that needs to be truncated</p>',
    maxLength: 50,
    options: {},
  },
  {
    name: 'Custom ellipsis',
    html: '<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>',
    maxLength: 30,
    options: { ellipsis: ' [...]' },
  },
  {
    name: 'Keep image tag',
    html: '<p>Some text <img src="image.jpg" alt="test"> more text</p>',
    maxLength: 20,
    options: { keepImageTag: true },
  },
  {
    name: 'No ellipsis',
    html: '<span>Short text that will be truncated</span>',
    maxLength: 15,
    options: { ellipsis: '' },
  },
  {
    name: 'Truncate last word',
    html: '<p>This is a sentence with many words</p>',
    maxLength: 25,
    options: { truncateLastWord: false },
  },
];

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`);
  console.log(`Max Length: ${testCase.maxLength}`);
  console.log(`Options: ${JSON.stringify(testCase.options)}`);
  console.log(`Original: ${testCase.html}`);

  try {
    const result = truncate(
      testCase.html,
      testCase.maxLength,
      testCase.options
    );
    console.log(`Result: ${result}`);
    console.log(`Result Length: ${result.replace(/<[^>]*>/g, '').length}`);
    console.log('✅ PASSED\n');
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}\n`);
  }
});

console.log('CommonJS test completed!');
