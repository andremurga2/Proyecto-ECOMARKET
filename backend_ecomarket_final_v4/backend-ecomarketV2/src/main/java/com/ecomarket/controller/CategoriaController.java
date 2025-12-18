package com.ecomarket.controller;

import com.ecomarket.dto.CategoriaDTO;
import com.ecomarket.service.CategoriaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categorias")
@RequiredArgsConstructor
@Tag(
    name = "Categorías",
    description = "Endpoints para la gestión y administración de categorías de productos"
)
public class CategoriaController {

    private final CategoriaService categoriaService;

    @Operation(
        summary = "Listar categorías",
        description = "Devuelve el listado completo de categorías disponibles en el sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Listado de categorías obtenido correctamente")
    })
    @GetMapping
    public List<CategoriaDTO> listarCategorias() {
        return categoriaService.listar();
    }

    @Operation(
        summary = "Crear categoría (ADMIN)",
        description = "Permite a un usuario con rol ADMIN crear una nueva categoría de productos"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categoría creada correctamente"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado. Requiere rol ADMIN")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    public CategoriaDTO crearCategoria(@RequestBody CategoriaDTO dto) {
        return categoriaService.crear(dto);
    }

    @Operation(
        summary = "Eliminar categoría (ADMIN)",
        description = "Permite a un usuario con rol ADMIN eliminar una categoría existente"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categoría eliminada correctamente"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado. Requiere rol ADMIN")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public void eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminar(id);
    }
}
