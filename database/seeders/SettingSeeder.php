<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Setting::create([
            'name'=>'Sejarah',
            'content'=>'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel sapiente corporis atque, sit quibusdam neque, veniam accusamus maxime cupiditate optio minus doloremque sunt consectetur molestiae voluptas? Fugiat dolores tenetur commodi, facilis obcaecati laudantium enim corporis, eos odit totam, deserunt nisi.'
        ]);
        \App\Models\Setting::create([
            'name'=>'Visi',
            'content'=>'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse laborum ipsam delectus maiores eligendi repellendus error autem voluptatem sed? Soluta.'
        ]);
        \App\Models\Setting::create([
            'name'=>'Misi',
            'content'=>'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt magni non nam fugiat illum alias excepturi qui culpa voluptatibus!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt magni non nam fugiat illum alias excepturi qui culpa voluptatibus!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt magni non nam fugiat illum alias excepturi qui culpa voluptatibus!'
        ]);
        \App\Models\Setting::create([
            'name'=>'Logo',
            'content'=>'/img/logo-himatekia.png'
        ]);
        \App\Models\Setting::create([
            'name'=>'Kontak',
            'content'=>'{
                "identitasWebsite": "Himpunan Mahasiswa Teknik Kimia Institut Teknologi Sumatera",
                "telp": "(0896)24315277",
                "email": "habibiunyila@gmail.com",
                "alamat": "Jl. Terusan Ryacudu, Way Huwi, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35365, Indonesia",
                "linkAlamat": "https://www.google.com/maps/place/Institut+Teknologi+Sumatera/@-5.358264,105.314849,11z/data=!4m6!3m5!1s0x2e40c35634c1a611:0xcb3cf692dbb4f26!8m2!3d-5.3582643!4d105.3148495!16s%2Fg%2F119pgszv6?hl=id-ID&entry=ttu",
                "facebookLink": "",
                "twitterLink": "",
                "instagramLink": "",
                "youtubeLink": ""
            }'
        ]);
    }
}
