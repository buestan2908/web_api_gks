-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS gksweb;
USE gksweb;

-- Tabla para almacenar las páginas
CREATE TABLE IF NOT EXISTS paginas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);

-- Tabla para almacenar los elementos del menú
CREATE TABLE IF NOT EXISTS `gksweb`.`elementos_menu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  `pagina_id` INT NULL DEFAULT NULL,
  `submenu` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `submenu` (`submenu` ASC) VISIBLE,
  INDEX `pagina_id` (`pagina_id` ASC) VISIBLE,
  CONSTRAINT `elementos_menu_ibfk_1`
    FOREIGN KEY (`submenu`)
    REFERENCES `gksweb`.`elementos_menu` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `elementos_menu_ibfk_2`
    FOREIGN KEY (`pagina_id`)
    REFERENCES `gksweb`.`paginas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- Tabla para almacenar imágenes y textos
CREATE TABLE IF NOT EXISTS `gksweb`.`contenido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo_contenido` ENUM('imagen', 'titulo', 'subtitulo', 'parrafo') NOT NULL,
  `contenido` TEXT NULL DEFAULT NULL,
  `pagina_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `pagina_id` (`pagina_id` ASC) VISIBLE,
  CONSTRAINT `contenido_ibfk_1`
    FOREIGN KEY (`pagina_id`)
    REFERENCES `gksweb`.`paginas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);