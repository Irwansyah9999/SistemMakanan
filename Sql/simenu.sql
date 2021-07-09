-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2021 at 09:33 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simenu`
--

-- --------------------------------------------------------

--
-- Table structure for table `makanan`
--

CREATE TABLE `makanan` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `jenis` varchar(15) NOT NULL,
  `status` varchar(15) NOT NULL,
  `harga` int(11) NOT NULL,
  `keterangan` text NOT NULL,
  `gambar` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `makanan`
--

INSERT INTO `makanan` (`id`, `nama`, `jenis`, `status`, `harga`, `keterangan`, `gambar`, `created_at`, `updated_at`) VALUES
('89g67', 'Es Jeruk', 'minuman', 'belum', 0, 'Iyaa Dong', 'Telor.jpeg', '2021-07-08 12:42:40', '2021-07-08 13:05:15'),
('ghfv5b6', 'Nasi Kucing', 'makanan', 'belum', 10000, 'Spesial', 'p9.jpeg', '2021-07-09 02:37:39', '2021-07-09 02:37:39'),
('uh76', 'Es Kelapa', 'minuman', 'ready', 0, 'Seger', 'p9.jpeg', '2021-07-08 13:51:26', '2021-07-08 14:11:42');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `nip` varchar(10) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `bagian` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telepon` varchar(15) NOT NULL,
  `alamat` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`nip`, `nama`, `bagian`, `email`, `telepon`, `alamat`, `created_at`, `updated_at`) VALUES
('12345', 'Uji', 'kasir', 'uji@gmail.com', '081112233', 'Kp. hhh', '2021-07-09 01:23:57', '2021-07-09 01:23:57'),
('20151212', 'Susi', 'kasir', 'susi@gmail.com', '08882313', 'Kp. Suka', '2021-07-08 15:50:55', '2021-07-08 15:57:17');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `no_pelanggan` varchar(20) NOT NULL,
  `status` varchar(15) NOT NULL,
  `keterangan` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`no_pelanggan`, `status`, `keterangan`, `created_at`, `updated_at`) VALUES
('P1625783060', 'pesan', 'tes', '2021-07-08 22:27:55', '2021-07-08 22:27:55'),
('P1625808138', 'pesan', 'gfvt', '2021-07-09 05:33:41', '2021-07-09 05:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `no` varchar(30) NOT NULL,
  `tanggal_pesanan` datetime NOT NULL,
  `status` varchar(15) NOT NULL,
  `keterangan` text NOT NULL,
  `no_pelanggan` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`no`, `tanggal_pesanan`, `status`, `keterangan`, `no_pelanggan`, `created_at`, `updated_at`) VALUES
('08072021', '2021-07-08 22:27:55', 'finish', 'tes', 'P1625783060', '2021-07-08 22:27:55', '2021-07-08 23:22:25'),
('09072021', '2021-07-09 05:33:41', 'aktif', 'jhgvf', 'P1625808138', '2021-07-09 05:33:41', '2021-07-09 05:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan_detail`
--

CREATE TABLE `pesanan_detail` (
  `no_pesanan` varchar(30) NOT NULL,
  `id_makanan` varchar(10) NOT NULL,
  `jumlah_pembelian` int(11) NOT NULL,
  `keterangan` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pesanan_detail`
--

INSERT INTO `pesanan_detail` (`no_pesanan`, `id_makanan`, `jumlah_pembelian`, `keterangan`, `created_at`, `updated_at`) VALUES
('09072021', 'uh76', 7, 'jhfvtrd', '2021-07-09 05:33:41', '2021-07-09 05:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `kode` varchar(20) NOT NULL,
  `tanggal_transaksi` datetime NOT NULL,
  `status` varchar(15) NOT NULL,
  `keterangan` text NOT NULL,
  `no_pesanan` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`kode`, `tanggal_transaksi`, `status`, `keterangan`, `no_pesanan`, `created_at`, `updated_at`) VALUES
('TR1625786459', '2021-07-08 23:22:25', 'bayar', 'Bayar', '08072021', '2021-07-08 23:22:25', '2021-07-08 23:22:25');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `akses` varchar(15) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `akses`, `created_at`, `updated_at`) VALUES
(1, 'Uji', 'uji@gmail.com', '12345', 'kasir', '2021-07-09 01:23:57', '2021-07-09 01:23:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `makanan`
--
ALTER TABLE `makanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`nip`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`no_pelanggan`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`no`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`kode`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
