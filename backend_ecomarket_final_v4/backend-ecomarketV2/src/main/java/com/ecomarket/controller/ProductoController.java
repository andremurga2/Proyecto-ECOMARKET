package com.ecomarket.controller;

import com.ecomarket.dto.ProductoDTO;
import com.ecomarket.service.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/productos")
@RequiredArgsConstructor
@Tag(
    name = "Productos",
    description = "Endpoints para la consulta y administración de productos"
)
public class ProductoController {

    private final ProductoService productoService;

    @Operation(
        summary = "Listar productos",
        description = "Devuelve el listado completo de productos disponibles"
    )
    @GetMapping
    public List<ProductoDTO> listarProductos() {
        return productoService.listar();
    }

    @Operation(
        summary = "Obtener producto por ID",
        description = "Devuelve el detalle de un producto específico"
    )
    @GetMapping("/{id}")
    public ProductoDTO obtenerProducto(@PathVariable Long id) {
        return productoService.obtener(id);
    }

    @Operation(
        summary = "Listar productos por categoría",
        description = "Devuelve los productos asociados a una categoría específica"
    )
    @GetMapping("/categoria/{categoriaId}")
    public List<ProductoDTO> listarPorCategoria(@PathVariable Long categoriaId) {
        return productoService.listarPorCategoria(categoriaId);
    }

    @Operation(
        summary = "Crear producto (ADMIN)",
        description = "Permite al administrador crear un nuevo producto"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    public ProductoDTO crearProducto(@RequestBody ProductoDTO dto) {
        return productoService.crear(dto);
    }

    @Operation(
        summary = "Actualizar producto (ADMIN)",
        description = "Permite al administrador actualizar un producto existente"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{id}")
    public ProductoDTO actualizarProducto(@PathVariable Long id, @RequestBody ProductoDTO dto) {
        return productoService.actualizar(id, dto);
    }

    @Operation(
        summary = "Eliminar producto (ADMIN)",
        description = "Permite al administrador eliminar un producto del sistema"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoService.eliminar(id);
    }
}
