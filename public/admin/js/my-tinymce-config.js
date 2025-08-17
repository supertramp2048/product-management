document.addEventListener('DOMContentLoaded', () => {
  tinymce.init({
    selector: 'textarea#descriptionCreateForm',
    plugins: 'image',
    license_key: 'gpl'
  });
});