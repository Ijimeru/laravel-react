<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class migrateseed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrateseed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrasi+seeding full';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->call('migrate:fresh',[
            '--seed' => true,
        ]);
        $this->call('db:seed',[
            '--class' => 'MetaCategorySeeder',
        ]);
        $this->call('db:seed',[
            '--class' => 'CategorySeeder',
        ]);
        $this->call('db:seed',[
            '--class' => 'PostSeeder',
        ]);
        $this->call('db:seed',[
            '--class' => 'BookSeeder',
        ]);
        $this->call('db:seed',[
            '--class' => 'RoleSeeder',
        ]);
        $this->call('db:seed',[
            '--class' => 'SettingSeeder',
        ]);
        $this->call('db:seed',[
            '--class' => 'KepengurusanSeeder',
        ]);
    }
}
