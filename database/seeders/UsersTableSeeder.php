<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use DB;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data[]=
        [
                'name'=>'Админ.by',
                'email'=>'admin@admin.by',
                //   это начальный пароль для админа
                'password'=>bcrypt(11111),
               // 'email_verified_at'=>null,
               // 'remember_token'=>null
        ];
        $data[]=
        [
                'name'=>'Админ.ru',
                'email'=>'admin@admin.ru',
                //   это начальный пароль для админа
                'password'=>bcrypt(11111),
               // 'email_verified_at'=>null,
               // 'remember_token'=>null
        ];
        $data[]=
        [
                'name'=>'Админ.com',
                'email'=>'admin@admin.com',
                //   это начальный пароль для админа
                'password'=>bcrypt(11111),
               // 'email_verified_at'=>null,
               // 'remember_token'=>null
        ];
        DB::table('users')->insert($data);
    }
}
