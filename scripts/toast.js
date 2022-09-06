export function showToast(message) {
    const toastElement = document.createElement('div');
    toastElement.style.position = 'fixed';
    toastElement.style.bottom = '2rem';
    toastElement.style.width = '100%';
    toastElement.style.paddingInline = '1rem';

    const toastElementInner = document.createElement('div');
    toastElementInner.style.width = 'fit-content';
    toastElementInner.style.marginInline = 'auto';
    toastElementInner.style.padding = '1rem';
    toastElementInner.style.borderRadius = '50px';
    toastElementInner.style.backgroundColor = '#22252d';
    toastElementInner.style.color = '#ffffff';
    toastElementInner.style.fontSize = '1rem';
    toastElementInner.style.fontWeight = '400';
    toastElementInner.style.textAlign = 'center';

    const textElement = document.createTextNode(message);
    toastElement.appendChild(toastElementInner);
    toastElementInner.appendChild(textElement);
    document.body.appendChild(toastElement);
    setTimeout(() => {
        document.body.removeChild(toastElement);
    }, 2000);
}