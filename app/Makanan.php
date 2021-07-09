<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Makanan extends Model
{
    //
    protected $table = 'makanan';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    //public $timestamp = false

    //protected $attributes = [];

    protected $fillable = ['id', 'nama', 'jenis', 'status','harga', 'keterangan', 'gambar'];
}
