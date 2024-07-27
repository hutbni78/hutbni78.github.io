document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("hasSubmittedFormV2")) {
        disableFormV2();
        Swal.fire({
            icon: 'info',
            title: 'Informasi',
            text: 'Anda telah melakukan absensi.',
            confirmButtonText: 'Tutup'
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let welcomeMessageWrapper = document.createElement('div');
    welcomeMessageWrapper.className = 'welcome-message-wrapper';

    let welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = '<p class="text2">Selamat datang di acara wondr Parade Kantor Wilayah Surabaya</p>';
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

    var status = document.querySelector('input[name="status"]:checked').value;
    var formData = new FormData();
    
    if (status === 'Pegawai') {
        var nama = document.getElementById('nama').value.trim();
        var npp = document.getElementById('npp').value.trim();
        var kategori = document.getElementById('kategori').value;
        var kantorType = document.querySelector('input[name="kantor_type"]:checked');
        var kantor = '';
        var unit = document.getElementById('unit').value.trim();

        if (nama === '' || npp === '' || unit === '' || !kantorType) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Data tidak boleh kosong.',
                confirmButtonText: 'Tutup'
            });
            return;
        }

        if (npp === '') {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Harap lengkapi NPP anda sebelum mengirim data.',
                confirmButtonText: 'Tutup'
            });
            return;
        }
        var nppPattern = /^\d+$/;
        if (!nppPattern.test(npp)) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'NPP hanya boleh berisi angka.',
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

        formData.append('status', status);
        formData.append('nama', nama);
        formData.append('npp', npp);
        formData.append('kantor', kantor);
        formData.append('unit', unit);

    } else if (status === 'Non Pegawai') {
        var namaNonPegawai = document.getElementById('nama_non_pegawai').value.trim();
        var kategori = document.getElementById('kategori').value;

        if (namaNonPegawai === '' || kategori === '') {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Data tidak boleh kosong.',
                confirmButtonText: 'Tutup'
            });
            return;
        }

        formData.append('status', status);
        formData.append('nama_non_pegawai', namaNonPegawai);
        formData.append('kategori', kategori);
    }

    Swal.fire({
        title: 'Loading',
        html: 'Sedang mengirim data...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyBYcubQLntJzjA2k_uFyKAbtT4LnFgnzPtgwvmfmnKXKg_GmWTN1YkyV0xAJ-74Od5PQ/exec');
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
                        localStorage.setItem("hasSubmittedFormV2", "true");
                        disableFormV2();
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

function toggleForm() {
    var pegawaiForm = document.getElementById('pegawaiForm');
    var nonPegawaiForm = document.getElementById('nonPegawaiForm');
    var status = document.querySelector('input[name="status"]:checked').value;

    if (status === 'Pegawai') {
        pegawaiForm.style.display = 'block';
        nonPegawaiForm.style.display = 'none';
    } else if (status === 'Non Pegawai') {
        pegawaiForm.style.display = 'none';
        nonPegawaiForm.style.display = 'block';
    }
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

function disableFormV2() {
    document.getElementById('formData').style.display = 'none';
    document.getElementById('alreadySubmittedMessage').textContent = 'Anda telah melakukan absensi.';
    document.getElementById('alreadySubmittedMessage').style.display = 'block';
}
