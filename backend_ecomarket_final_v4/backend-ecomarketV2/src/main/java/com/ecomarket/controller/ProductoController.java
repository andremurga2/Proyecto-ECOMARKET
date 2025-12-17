package com.ecomarket.controller;

import com.ecomarket.dto.ProductoDTO;
import com.ecomarket.service.ProductoService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/v1/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    // 🟢 Público: listar todos
    @GetMapping
    public List<ProductoDTO> listarProductos() {
        return productoService.listar();
    }

    // 🟢 Público: obtener uno
    @GetMapping("/{id}")
    public ProductoDTO obtenerProducto(@PathVariable Long id) {
        return productoService.obtener(id);
    }

    // 🟢 Público: filtrar por categoría
    @GetMapping("/categoria/{categoriaId}")
    public List<ProductoDTO> listarPorCategoria(@PathVariable Long categoriaId) {
        return productoService.listarPorCategoria(categoriaId);
    }

    // 🔴 ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    public ProductoDTO crearProducto(@RequestBody ProductoDTO dto) {
        return productoService.crear(dto);
    }

    // 🔴 ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{id}")
    public ProductoDTO actualizarProducto(@PathVariable Long id, @RequestBody ProductoDTO dto) {
        return productoService.actualizar(id, dto);
    }

    // 🔴 ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoService.eliminar(id);
    }
}