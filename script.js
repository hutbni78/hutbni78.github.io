document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("hasSubmittedForm")) {
        disableForm();
        Swal.fire({
            icon: 'info',
            title: 'Informasi',
            text: 'Anda sudah melakukan absensi.',
            confirmButtonText: 'Tutup'
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let welcomeMessageWrapper = document.createElement('div');
    welcomeMessageWrapper.className = 'welcome-message-wrapper';

    let welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = '<p>Selamat datang di acara HUT BNI ke-78 Kantor Wilayah Surabaya</p>';
    welcomeMessageWrapper.appendChild(welcomeMessage);
    document.body.appendChild(welcomeMessageWrapper);

    const music = document.getElementById('backgroundMusic');
    music.play().catch(() => {
        let playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.textContent = 'Lanjut';
        
        playButton.addEventListener('click', () => {
            music.play();
            playButton.remove();
            document.getElementById('formContainer').style.display = 'block';
            welcomeMessageWrapper.remove();
        });
        welcomeMessage.appendChild(playButton);
    });
});

function submitForm(event) {
    event.preventDefault();

    var nama = document.getElementById('nama').value.trim();
    var npp = document.getElementById('npp').value.trim();
    var unit = document.getElementById('unit').value.trim();

    if (nama === '' || npp === '' || unit === '') {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Harap lengkapi semua kolom sebelum mengirim data.',
            confirmButtonText: 'Tutup'
        });
        return;
    }

    var formData = new FormData(document.getElementById('formData'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyXMDevfNduNoE27ZZaoPSkjbcp2F7QbAvGd8NhQrwGdWRvjStTiYDm_09CjcsJ098sew/exec');
    xhr.send(formData);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById('formData').reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data berhasil dikirim!',
                    confirmButtonText: 'Tutup'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("hasSubmittedForm", "true");
                        disableForm();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Terjadi kesalahan saat mengirim data.',
                    confirmButtonText: 'Tutup'
                });
            }
        }
    };
}

// function disableForm() {
//     document.getElementById('formData').style.display = 'none';
//     document.getElementById('alreadySubmittedMessage').style.display = 'block';
// }
