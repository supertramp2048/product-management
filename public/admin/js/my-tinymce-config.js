document.addEventListener('DOMContentLoaded', () => {
  tinymce.init({
    selector: 'textarea#descriptionCreateForm,textarea#description',
    plugins: 'image',
    license_key: 'gpl'
  });
});