-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2021 a las 09:43:49
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `manometros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `id_relacion`
--

CREATE TABLE `id_relacion` (
  `id` int(11) NOT NULL,
  `id_pozos` int(11) NOT NULL,
  `id_medida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `id_relacion`
--

INSERT INTO `id_relacion` (`id`, `id_pozos`, `id_medida`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 0),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 2, 12),
(13, 2, 13),
(14, 2, 14),
(15, 2, 15),
(16, 2, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medidas`
--

CREATE TABLE `medidas` (
  `id` int(11) NOT NULL,
  `lectura` float(7,2) NOT NULL,
  `fecha` varchar(12) NOT NULL DEFAULT '00-00-0000'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `medidas`
--

INSERT INTO `medidas` (`id`, `lectura`, `fecha`) VALUES
(1, 12.00, '2021-12-01'),
(2, 15.00, '2021-12-02'),
(3, 18.00, '2021-12-03'),
(4, 9.00, '2021-12-04'),
(5, 15.00, '2021-12-05'),
(6, 15.00, '2021-12-06'),
(7, 12.60, '2021-12-07'),
(8, 8.00, '2021-11-01'),
(9, 15.00, '2021-11-04'),
(10, 10.00, '2021-11-16'),
(11, 14.00, '2021-11-06'),
(12, 5.00, '2021-11-26'),
(13, 11.00, '2021-11-29'),
(14, 19.00, '2021-12-03'),
(15, 17.00, '2021-12-05'),
(16, 13.00, '2021-12-07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pozos`
--

CREATE TABLE `pozos` (
  `id` int(10) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `fecha` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pozos`
--

INSERT INTO `pozos` (`id`, `nombre`, `fecha`) VALUES
(1, 'Mi pozo hondo', '2021-12-07 09:11'),
(2, 'El pozo de pepe', '2021-12-07 09:19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `id_relacion`
--
ALTER TABLE `id_relacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pozos` (`id_pozos`),
  ADD KEY `id_medida` (`id_medida`);

--
-- Indices de la tabla `medidas`
--
ALTER TABLE `medidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pozos`
--
ALTER TABLE `pozos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `id_relacion`
--
ALTER TABLE `id_relacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `medidas`
--
ALTER TABLE `medidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `pozos`
--
ALTER TABLE `pozos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
