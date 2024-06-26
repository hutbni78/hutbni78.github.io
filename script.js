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
    // welcomeMessage.innerHTML = '<h3></h3>';
    welcomeMessage.style.textAlign = 'center';
    welcomeMessage.style.marginTop = '20px';
    welcomeMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Warna latar belakang transparan
    welcomeMessage.style.padding = '20px';
    welcomeMessage.style.fontSize = '20px';
    welcomeMessage.style.fontWeight = '800';
    welcomeMessage.style.borderRadius = '8px';
    welcomeMessage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)'; // Bayangan halus
    welcomeMessage.style.maxWidth = '300px'; // Lebar maksimum sesuai kebutuhan
    welcomeMessage.style.margin = '70px auto'; // Posisi di tengah horizontal
    document.body.appendChild(welcomeMessage);

    const music = document.getElementById('backgroundMusic');
    music.play().catch(() => {
        // Pemutaran otomatis mungkin diblokir. Tambahkan pesan atau tombol untuk memulai musik
        let playButton = document.createElement('button');
        playButton.textContent = 'Lanjut';
        playButton.style.position = 'absolute';
        playButton.style.top = '50%'; // Menempatkan tombol di tengah vertikal
        playButton.style.left = '50%'; // Menempatkan tombol di tengah horizontal
        playButton.style.transform = 'translate(-50%, -50%)'; // Membuat tombol berada di tengah layar
        playButton.style.padding = '10px 20px'; // Padding tombol
        playButton.style.fontFamily = 'Arial, sans-serif'; // Jenis font
        playButton.style.fontSize = '16px'; // Ukuran font
        playButton.style.backgroundColor = '#007bff'; // Warna latar belakang
        playButton.style.color = 'white'; // Warna teks
        playButton.style.border = 'none'; // Tanpa border
        playButton.style.borderRadius = '4px'; // Radius sudut
        playButton.style.cursor = 'pointer'; // Kursor pointer
        playButton.style.transition = 'background-color 0.3s ease'; // Animasi perubahan warna latar belakang
    
        // Efek hover
        playButton.addEventListener('mouseover', function() {
            playButton.style.backgroundColor = '#0073ee'; // Warna latar belakang saat dihover
            playButton.style.color = 'white'; // Warna teks saat dihover
        });
    
        playButton.addEventListener('mouseout', function() {
            playButton.style.backgroundColor = '#007bff'; // Kembali ke warna latar belakang awal saat tidak dihover
            playButton.style.color = 'white'; // Kembali ke warna teks awal saat tidak dihover
        });
    
        playButton.addEventListener('click', () => {
            music.play();
            playButton.remove();
            document.getElementById('formContainer').style.display = 'block'; // Menampilkan form setelah klik
            welcomeMessage.remove(); // Menghapus pesan Selamat Datang setelah tombol diklik
        });
        document.body.appendChild(playButton);
    });
    
});

function submitForm(event) {
    event.preventDefault(); // Mencegah pengiriman formulir secara default

    var nama = document.getElementById('nama').value.trim();
    var npp = document.getElementById('npp').value.trim();
    var unit = document.getElementById('unit').value.trim();

    // Validasi input kosong
    if (nama === '' || npp === '' || unit === '') {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Harap lengkapi semua kolom sebelum mengirim data.',
            confirmButtonText: 'Tutup'
        });
        return; // Menghentikan fungsi submitForm jika ada input yang kosong
    }

    var formData = new FormData(document.getElementById('formData'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyXMDevfNduNoE27ZZaoPSkjbcp2F7QbAvGd8NhQrwGdWRvjStTiYDm_09CjcsJ098sew/exec'); // Ganti dengan URL dari Google Apps Script
    xhr.send(formData);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById('formData').reset(); // Mengosongkan formulir setelah pengiriman berhasil
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
