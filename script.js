document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('button');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.previousElementSibling; // Assumes button is immediately after pre/code
            let codeToCopy = '';

            if (codeBlock && codeBlock.tagName === 'PRE') {
                const codeElement = codeBlock.querySelector('code');
                if (codeElement) {
                    codeToCopy = codeElement.innerText;
                }
            } else {
                console.error('Could not find code block to copy');
                return;
            }

            if (codeToCopy) {
                navigator.clipboard.writeText(codeToCopy).then(() => {
                    // Optional: Provide visual feedback
                    const originalText = button.innerText;
                    button.innerText = 'Copied!';
                    setTimeout(() => {
                        button.innerText = originalText;
                    }, 2000); // Revert text after 2 seconds
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    // Fallback for older browsers or if navigator.clipboard is not available
                    // You could implement a textarea-based copy fallback here if needed
                    alert('Failed to copy. Please copy manually.');
                });
            }
        });
    });
});
