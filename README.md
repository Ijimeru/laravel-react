# WEB HIMATEKIA

## 📑 Deskripsi

Ini adalah projek web himatekia dengan teknologi laravel(backend) dan react inertiaJS(frontend)(typescript)


## 🛠 Teknologi

-   [Laravel v9](https://github.com/laravel/framework)
-   [InertiaJS](https://github.com/inertiajs/inertia)
-   [React JS]((https://react.dev/))

## Minimum Requirement

Untuk menjalankan aplikasi ini, sistem minimal yang dibutuhkan adalah sebagai berikut:

-   PHP 8.0 atau yang lebih tinggi
-   MySQL 5.7 atau yang lebih tinggi
-   Composer
-   Node.js 16 atau yang lebih tinggi
-   NPM 7 atau yang lebih tinggi

## 💻 Cara Install dan Menjalankan Aplikasi

1. Clone repository ini dengan perintah

```
git clone https://github.com/Ijimeru/laravel-react.git
```

2. Masuk ke direktori aplikasi dengan perintah

```
cd laravel-react
```

3. Salin file .env.example menjadi .env dengan perintah

```
cp .env.example .env
```

4. Sesuaikan konfigurasi database pada file .env sesuai dengan database yang akan digunakan

5. Jalankan perintah

```
composer update
```

untuk menginstal semua package PHP yang dibutuhkan

6. Jalankan perintah

```
npm install
```

untuk menginstal semua package JavaScript yang dibutuhkan

7. Jalankan perintah

```
php artisan key:generate
```

untuk menghasilkan application key yang diperlukan

8. Jalankan perintah

```
php artisan storage:link
```

untuk membuat symbolic link ke direktori storage

9. Jalankan perintah

```
php artisan app:migrateseed
```

untuk menjalankan migrasi database dan menambahkan data awal. Kamu bisa merubah data awal pada file database/seeders/

10. Jalankan perintah

```
php artisan serve
```

untuk menjalankan aplikasi pada http://localhost:8000/

11. Jalankan perintah

```
npm run dev
// atau
npm run build
```

untuk mengkompilasi file-file React.tsx dan JavaScript

Sekarang kamu bisa mengakses aplikasi ini pada http://localhost:8000/

## ✌ Kontributor

-   [Habibi](https://instagram.com/habibinarendra)
-   Muhammad Habibi Wasi Narendra

## 🧾 License

[MIT license](https://opensource.org/licenses/MIT).
