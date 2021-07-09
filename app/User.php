<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    //public $timestamp = false

    //protected $attributes = [];

    protected $fillable = [ 'name', 'email', 'password', 'akses'];
}
