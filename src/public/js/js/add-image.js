import { Dropzone } from 'dropzone';

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

Dropzone.options.myDropzone = {
    dictDefaultMessage: 'Sube tu imagen',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 3,

    maxFiles: 1,
    parallelUploads: 1,

    autoProcessQueue: false, //q no se suba en auto - requiere notificacion cuando subir
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El limite es 1 archivo',

    // se envia 1ro - dropzone se compunica via ajax - aqui se comunica con nuestro back
    headers: {
        'CSRF-Token': csrfToken,
    },

    paramName: 'image', // mismo q en multer en el router
    init: function () {
        const dropzone = this;
        const btnPublish = document.querySelector('#publish');

        btnPublish.addEventListener('click', function () {
            dropzone.processQueue(); // <- autoProcessQueue
        });

        dropzone.on('queuecomplete', () => {
            if (dropzone.getActiveFiles().length == 0) {
                window.location.href = '/properties/mine';
            }
        });
    },
};
