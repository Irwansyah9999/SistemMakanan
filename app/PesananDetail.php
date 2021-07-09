<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PesananDetail extends Model
{
    protected $table = 'pesanan_detail';

    protected $primaryKey = 'no';

    public $incrementing = false;

    protected $keyType = 'string';

    //public $timestamp = false

    //protected $attributes = [];

    protected $fillable = ['no_pesanan', 'id_makanan', 'jumlah_makanan', 'keterangan'];
}
