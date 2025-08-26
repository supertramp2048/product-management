document.addEventListener('DOMContentLoaded', () => {
  const uploadHandler = (blobInfo, progress) => new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('file', blobInfo.blob(), blobInfo.filename());

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/admin/productsCategory/tiniMCE-img');
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) progress(e.loaded / e.total * 100); };
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && json.location) return resolve(json.location);
        reject(json.error || 'Upload failed');
      } catch {
        reject('Invalid JSON response');
      }
    };
    xhr.onerror = () => reject('XHR error');
    xhr.send(form);
  });

  tinymce.init({
    selector: '#description',
    license_key: 'gpl',
    plugins: 'image code',
    toolbar: 'undo redo | link image | code',
    automatic_uploads: true,
    file_picker_types: 'image',
    /* and here's our custom image picker*/
  file_picker_callback: (cb, value, meta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        const id = 'blobid' + (new Date()).getTime();
        const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      });
      reader.readAsDataURL(file);
    });

    input.click();
  },
    images_upload_handler: uploadHandler,
    convert_urls: true,
    relative_urls: false,
    remove_script_host: false,
    setup: (editor) => editor.on('change', () => editor.save()),
  });
});