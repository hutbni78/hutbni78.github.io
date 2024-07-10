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
    welcomeMessage.innerHTML = '<p class="text2">Selamat datang di acara HUT BNI ke-78 Kantor Wilayah Surabaya</p>';
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
            triggerConfetti();
        });
        welcomeMessage.appendChild(playButton);
    });
});

function showInputText() {
    var radioCabang = document.getElementById('cabang');
    var radioLainnya = document.getElementById('lainnya');
    var inputKantor = document.getElementById('kantor');

    if (radioCabang.checked) {
        inputKantor.style.display = 'block';
        inputKantor.placeholder = 'Nama Cabang';
    } else if (radioLainnya.checked) {
        inputKantor.style.display = 'block';
        inputKantor.placeholder = 'Nama Lainnya';
    } else {
        inputKantor.style.display = 'none';
        inputKantor.value = '';
    }
}

function submitForm(event) {
    event.preventDefault();

    var nama = document.getElementById('nama').value.trim();
    var npp = document.getElementById('npp').value.trim();
    var kantorType = document.querySelector('input[name="kantor_type"]:checked');
    var kantor = '';
    var unit = document.getElementById('unit').value.trim();
    
    // Validasi untuk memeriksa apakah ada setidaknya satu bidang yang diisi
    if (nama === '' && npp === '' && unit === '' && !kantorType) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data tidak boleh kosong.',
            confirmButtonText: 'Tutup'
        });
        return;
    }

    var nppPattern = /^\d+$/;
    if (npp === '' || !nppPattern.test(npp)) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'NPP hanya boleh berisi angka dan tidak boleh kosong.',
            confirmButtonText: 'Tutup'
        });
        return;
    }

    if (nama === '') {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Harap lengkapi Nama anda sebelum mengirim data.',
            confirmButtonText: 'Tutup'
        });
        return;
    }

    if (unit === '') {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Harap lengkapi Nama unit sebelum mengirim data.',
            confirmButtonText: 'Tutup'
        });
        return;
    }

    if (kantorType) {
        if (kantorType.value === 'Cabang' || kantorType.value === 'Lainnya') {
            kantor = document.getElementById('kantor').value.trim();
            if (kantor === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Harap lengkapi kolom "Divisi / Wilayah / Cabang / Lainnya" sebelum mengirim data.',
                    confirmButtonText: 'Tutup'
                });
                return;
            }
        } else {
            kantor = kantorType.value; // Menggunakan nilai dari radio button langsung
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Harap pilih opsi "Divisi / Wilayah / Cabang / Lainnya" sebelum mengirim data.',
            confirmButtonText: 'Tutup'
        });
        return;
    }

    // Menampilkan indikator loading
    Swal.fire({
        title: 'Loading',
        html: 'Sedang mengirim data...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    var formData = new FormData();
    formData.append('nama', nama);
    formData.append('npp', npp);
    formData.append('kantor', kantor);
    formData.append('unit', unit);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzpYjltWxnc6MGEbH2VzPJY07WFYEAzbMrOnv43WeBcD6Te9k0nbMNKfcfPFQtWZQw6CA/exec');
    xhr.send(formData);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            Swal.close(); // Menutup SweetAlert setelah selesai

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

function triggerConfetti() {
    var end = Date.now() + (5 * 1000);

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function disableForm() {
    document.getElementById('formData').style.display = 'none';
    document.getElementById('alreadySubmittedMessage').style.display = 'block';
}
