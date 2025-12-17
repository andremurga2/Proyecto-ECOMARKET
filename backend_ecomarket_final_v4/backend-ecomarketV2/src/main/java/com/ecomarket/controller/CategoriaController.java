package com.ecomarket.controller;

import com.ecomarket.dto.CategoriaDTO;
import com.ecomarket.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categorias")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaDTO> listarCategorias() {
        return categoriaService.listar();
    }

    // ADMIN: crear
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    public CategoriaDTO crearCategoria(@RequestBody CategoriaDTO dto) {
        return categoriaService.crear(dto);
    }

    // ADMIN: eliminar
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public void eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminar(id);
    }
}
