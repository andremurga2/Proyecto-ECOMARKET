package com.ecomarket.controller;

import com.ecomarket.dto.PagoDTO;
import com.ecomarket.service.PagoService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    // Crear pago
    @PostMapping
    public PagoDTO crear(@RequestBody PagoDTO dto) {
        return pagoService.crear(dto);
    }

    // Obtener pago por ID
    @GetMapping("/{id}")
    public PagoDTO obtener(@PathVariable Long id) {
        return pagoService.obtener(id);
    }

    // Listar todos los pagos
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<PagoDTO> listar() {
        return pagoService.listar();
    }
}