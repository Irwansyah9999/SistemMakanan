<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table = 'pesanan';

    protected $primaryKey = 'no';

    public $incrementing = false;

    protected $keyType = 'string';

    //public $timestamp = false

    //protected $attributes = [];

    protected $fillable = ['no', 'tanggal_pesanan', 'status', 'keterangan', 'no_pelanggan'];
}
