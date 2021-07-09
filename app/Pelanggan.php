<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    protected $table = 'pelanggan';

    protected $primaryKey = 'no_pelanggan';

    public $incrementing = false;

    //protected $keyType = 'string';

    //public $timestamp = false

    //protected $attributes = [];

    protected $fillable = ['no_pelanggan', 'status', 'keterangan'];
}
