<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $table = 'transaksi';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    //public $timestamp = false

    //protected $attributes = [];

    protected $fillable = ['kode', 'tanggal_transaksi', 'status', 'keterangan', 'no_pesanan'];
}
