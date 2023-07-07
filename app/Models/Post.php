<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory,Sluggable;

    protected $fillable = [
        'title',
        'image',
        'status',
        'body',
        'excerpt',
        'user_id'
    ];

    public function author(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function categories(){
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
    public function sluggable(): array
    {
        return [
            'slug'=>[
                'source'=>'title'
            ]
        ];
    }
}
