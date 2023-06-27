<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function posts(){
        return $this->belongsToMany(Post::class);
    }
    public function books(){
        return $this->belongsToMany(Book::class);
    }
    public function meta_category(){
        return $this->belongsTo(MetaCategory::class);
    }
}
