package com.ecomarket.config;

import com.ecomarket.model.*;
import com.ecomarket.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitConfig {

    @Bean
    CommandLineRunner initData(
            UsuarioRepository usuarioRepo,
            CategoriaRepository categoriaRepo,
            ProductoRepository productoRepo,
            PedidoRepository pedidoRepo,
            PagoRepository pagoRepo,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            if (usuarioRepo.count() == 0) {
                usuarioRepo.save(
                        Usuario.builder()
                                .nombre("Administrador EcoMarket")
                                .email("admin@ecomarket.cl")
                                .password(passwordEncoder.encode("admin123"))
                                .rol(Rol.ADMIN)
                                .build()
                );

                usuarioRepo.saveAll(List.of(
                        Usuario.builder().nombre("Juan Pérez").email("juan@ecomarket.cl")
                                .password(passwordEncoder.encode("123456")).rol(Rol.CLIENTE).build(),
                        Usuario.builder().nombre("María González").email("maria@ecomarket.cl")
                                .password(passwordEncoder.encode("123456")).rol(Rol.CLIENTE).build(),
                        Usuario.builder().nombre("Pedro López").email("pedro@ecomarket.cl")
                                .password(passwordEncoder.encode("123456")).rol(Rol.CLIENTE).build()
                ));
            }

            if (categoriaRepo.count() == 0) {
                categoriaRepo.saveAll(List.of(
                        Categoria.builder().nombre("Frutas").build(),
                        Categoria.builder().nombre("Verduras").build(),
                        Categoria.builder().nombre("Lácteos").build(),
                        Categoria.builder().nombre("Bebidas").build()
                ));
            }

            if (productoRepo.count() == 0) {
                Categoria frutas = categoriaRepo.findByNombre("Frutas");
                Categoria verduras = categoriaRepo.findByNombre("Verduras");
                Categoria lacteos = categoriaRepo.findByNombre("Lácteos");

                productoRepo.saveAll(List.of(
                        Producto.builder().nombre("Manzana Roja").precio(1490).stock(50)
                                .imagenUrl("/images/manzana.jpg").categoria(frutas).build(),
                        Producto.builder().nombre("Lechuga").precio(990).stock(40)
                                .imagenUrl("/images/lechuga.jpg").categoria(verduras).build(),
                        Producto.builder().nombre("Queso Gauda").precio(5990).stock(20)
                                .imagenUrl("/images/queso.jpg").categoria(lacteos).build()
                ));
            }
        };
    }
}
