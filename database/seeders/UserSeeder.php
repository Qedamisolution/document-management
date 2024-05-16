<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'id' => Str::uuid()->toString(),
            'firstName' => 'Admin',
            'lastName' => 'User',
            'isDeleted' => false,
            'userName' => 'admin',
            'normalizedUserName' => 'ADMIN',
            'email' => 'admin@example.com',
            'normalizedEmail' => 'ADMIN@EXAMPLE.COM',
            'emailConfirmed' => true,
            'password' => bcrypt('password'), // Use bcrypt to hash the password
            'securityStamp' => Str::random(10),
            'concurrencyStamp' => Str::random(10),
            'phoneNumber' => null,
            'phoneNumberConfirmed' => false,
            'twoFactorEnabled' => false,
            'lockoutEnd' => null,
            'lockoutEnabled' => true,
            'accessFailedCount' => 0,
        ]);
    }
}
