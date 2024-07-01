document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("hasSubmittedForm")) {
        disableForm();
        // Menampilkan SweetAlert
        Swal.fire({
            icon: 'info',
            title: 'Informasi',
            text: 'Anda sudah melakukan absensi.',
            confirmButtonText: 'Tutup'
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Menampilkan pesan Selamat Datang
    let welcomeMessage = document.createElement('div');
    welcomeMessage.innerHTML = '<p>Selamat datang di acara HUT BNI ke-78 Kantor Wilayah Surabaya</p>';
    welcomeMessage.style.textAlign = 'center';
    welcomeMessage.style.marginTop = '20px';
    welcomeMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    welcomeMessage.style.padding = '20px';
    welcomeMessage.style.fontSize = '20px';
    welcomeMessage.style.fontWeight = '800';
    welcomeMessage.style.borderRadius = '8px';
    welcomeMessage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    welcomeMessage.style.maxWidth = '300px';
    welcomeMessage.style.margin = '70px auto';
    document.body.appendChild(welcomeMessage);

    const music = document.getElementById('backgroundMusic');
    music.play().catch(() => {
    let playButton = document.createElement('button');
    playButton.textContent = 'Lanjut';
    playButton.style.position = 'absolute';
    playButton.style.top = '50%';
    playButton.style.left = '50%';
    playButton.style.transform = 'translate(-50%, -50%)';
    playButton.style.padding = '10px 20px';
    playButton.style.fontFamily = 'Arial, sans-serif';
    playButton.style.fontSize = '16px';
    playButton.style.backgroundColor = '#007bff';
    playButton.style.color = 'white';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '4px';
    playButton.style.cursor = 'pointer';
    playButton.style.transition = 'background-color 0.3s ease';
    
    playButton.addEventListener('mouseover', function() {
        playButton.style.backgroundColor = '#0073ee';
    });
    
    playButton.addEventListener('mouseout', function() {
        playButton.style.backgroundColor = '#007bff';
    });
    
    playButton.addEventListener('click', () => {
        music.play();
        playButton.remove();
        document.getElementById('formContainer').style.display = 'block';
        welcomeMessage.remove(); // Menghapus pesan Selamat Datang setelah tombol diklik
    });
        document.body.appendChild(playButton);
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
