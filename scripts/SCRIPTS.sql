/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 8.0.22 : Database - db_pim
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_pim` /*!40100 DEFAULT CHARACTER SET utf8mb4*/ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `db_pim`;

/*Table structure for table `tbcliente` */

DROP TABLE IF EXISTS `tbcliente`;

CREATE TABLE `tbcliente` (
  `IdCliente` bigint unsigned NOT NULL AUTO_INCREMENT,
  `NomCli` varchar(40) NOT NULL,
  `Email` varchar(80) CHARACTER SET utf8mb4 NOT NULL,
  `TelCli_01` varchar(14) DEFAULT NULL,
  `TelCli_02` varchar(14) DEFAULT NULL,
  `DataCadastro` datetime DEFAULT NULL,
  `DataNascimento` datetime DEFAULT NULL,
  `IdEndereco` int DEFAULT NULL,
  `CpfCnpj` varchar(20) DEFAULT NULL,
  `CliAtivo` char(1) DEFAULT NULL,
  `IdUsuario` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdCliente`),
  UNIQUE KEY `uk_tbcliente_01` (`Email`),
  UNIQUE KEY `uk_tbcliente_02` (`CpfCnpj`),
  KEY `fk_tbcliente_01` (`IdUsuario`),
  KEY `fk_tbcliente_02` (`IdEndereco`),
  CONSTRAINT `fk_tbcliente_01` FOREIGN KEY (`IdUsuario`) REFERENCES `tbusuarios` (`IdUsuario`),
  CONSTRAINT `fk_tbcliente_02` FOREIGN KEY (`IdEndereco`) REFERENCES `tbendereco` (`IdEndereco`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 ;

/*Data for the table `tbcliente` */

insert  into `tbcliente`(`IdCliente`,`NomCli`,`Email`,`TelCli_01`,`TelCli_02`,`DataCadastro`,`DataNascimento`,`IdEndereco`,`CpfCnpj`,`CliAtivo`,`IdUsuario`) values 
(2,'Vinicius Dezem','vinicius@live.com','16982446230','1638362526','2020-10-23 00:00:00','1994-08-06 00:00:00',1,'43247798803','S',7),
(3,'Lucaz','lucaz@email.com','16993214848',NULL,'2020-10-23 00:00:00','2000-08-06 00:00:00',2,'23423423423','S',8),
(14,'dena','teste@gmil.com','1','1','2020-11-16 20:18:14','2020-10-10 00:00:00',1,'2342393423','S',6);

/*Table structure for table `tbendereco` */

DROP TABLE IF EXISTS `tbendereco`;

CREATE TABLE `tbendereco` (
  `IdEndereco` int NOT NULL,
  `CEP` varchar(10) DEFAULT NULL,
  `Logradouro` varchar(255) DEFAULT NULL,
  `Numero` varchar(255) DEFAULT NULL,
  `Complemento` varchar(255) DEFAULT NULL,
  `Cidade` varchar(255) DEFAULT NULL,
  `Estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdEndereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

/*Data for the table `tbendereco` */

insert  into `tbendereco`(`IdEndereco`,`CEP`,`Logradouro`,`Numero`,`Complemento`,`Cidade`,`Estado`) values 
(1,'14079320','JULIO FERRANTI','1294',NULL,'RIBEIRAO PRETO','SP'),
(2,'14021575','RUBEM BUIDA','200',NULL,'RIBEIRAO PRETO','SP');

/*Table structure for table `tbmovimentooperacoes` */

DROP TABLE IF EXISTS `tbmovimentooperacoes`;

CREATE TABLE `tbmovimentooperacoes` (
  `IdMovOpe` int unsigned NOT NULL AUTO_INCREMENT,
  `DataSolicitacao` datetime DEFAULT NULL,
  `DataBaixa` datetime DEFAULT NULL,
  `Status` char(1) DEFAULT NULL,
  `IdCliente` bigint unsigned NOT NULL,
  `IdOperacao` int DEFAULT NULL,
  PRIMARY KEY (`IdMovOpe`),
  KEY `fk_tbmovope_01` (`IdOperacao`),
  KEY `fk_tbmovope_02` (`IdCliente`),
  CONSTRAINT `fk_tbmovope_01` FOREIGN KEY (`IdOperacao`) REFERENCES `tbtipooperacoes` (`IDTIPOOPERACOES`),
  CONSTRAINT `fk_tbmovope_02` FOREIGN KEY (`IdCliente`) REFERENCES `tbcliente` (`IdCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;

/*Data for the table `tbmovimentooperacoes` */

insert  into `tbmovimentooperacoes`(`IdMovOpe`,`DataSolicitacao`,`DataBaixa`,`Status`,`IdCliente`,`IdOperacao`) values 
(1,'2020-10-30 00:00:00','2020-11-01 00:00:00','F',2,1),
(2,'2020-10-30 00:00:00',NULL,'P',3,1);

/*Table structure for table `tboperadores` */

DROP TABLE IF EXISTS `tboperadores`;

CREATE TABLE `tboperadores` (
  `IdOperadores` int unsigned NOT NULL,
  `NomeOperador` varchar(50) DEFAULT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `Cpf` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `IdUsuario` int DEFAULT NULL,
  PRIMARY KEY (`IdOperadores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

/*Data for the table `tboperadores` */

/*Table structure for table `tbsuboperacoes` */

DROP TABLE IF EXISTS `tbsuboperacoes`;

CREATE TABLE `tbsuboperacoes` (
  `IdSubOpe` int NOT NULL,
  `DescricaoOpe` varchar(100) DEFAULT NULL,
  `DataOpe` datetime DEFAULT NULL,
  `IdCliente` bigint unsigned DEFAULT NULL,
  `IdMovOpe` int unsigned DEFAULT NULL,
  PRIMARY KEY (`IdSubOpe`),
  KEY `fk_tbsubope_01` (`IdCliente`),
  KEY `fk_tbsubope_02` (`IdMovOpe`),
  CONSTRAINT `fk_tbsubope_01` FOREIGN KEY (`IdCliente`) REFERENCES `tbcliente` (`IdCliente`),
  CONSTRAINT `fk_tbsubope_02` FOREIGN KEY (`IdMovOpe`) REFERENCES `tbmovimentooperacoes` (`IdMovOpe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

/*Data for the table `tbsuboperacoes` */

/*Table structure for table `tbtipooperacoes` */

DROP TABLE IF EXISTS `tbtipooperacoes`;

CREATE TABLE `tbtipooperacoes` (
  `IDTIPOOPERACOES` int NOT NULL AUTO_INCREMENT,
  `DESCRICAO` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDTIPOOPERACOES`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ;

/*Data for the table `tbtipooperacoes` */

insert  into `tbtipooperacoes`(`IDTIPOOPERACOES`,`DESCRICAO`) values 
(1,'INTEGRACAO'),
(2,'CERITIFICADO'),
(3,'BLOCKCHAIN');

/*Table structure for table `tbusuarios` */

DROP TABLE IF EXISTS `tbusuarios`;

CREATE TABLE `tbusuarios` (
  `IdUsuario` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(50) DEFAULT NULL,
  `Senha` varchar(50) DEFAULT NULL,
  `TipoUsuario` char(1) DEFAULT NULL,
  PRIMARY KEY (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 ;

/*Data for the table `tbusuarios` */

insert  into `tbusuarios`(`IdUsuario`,`Usuario`,`Senha`,`TipoUsuario`) values 
(6,'admin','admin','1'),
(7,'vinicius','1111','2'),
(8,'lucaz','1111','2');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
