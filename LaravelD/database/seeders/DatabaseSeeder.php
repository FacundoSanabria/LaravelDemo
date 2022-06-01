<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->createUsers();
    }

    protected function createUsers(){
        User::create([
            'name' => "firstUser",
            'email' => "user@gmail.com",
            'email_verified_at' => Carbon::today(),
            'password' => hash::make("pwrd")
        ]);
    }
}
