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
//     document.getElementById('alreadySubmittedMessage').style.display = 'block';d
// }
