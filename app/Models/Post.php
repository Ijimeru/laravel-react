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
        'user_id',
        'published_at'
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
    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
