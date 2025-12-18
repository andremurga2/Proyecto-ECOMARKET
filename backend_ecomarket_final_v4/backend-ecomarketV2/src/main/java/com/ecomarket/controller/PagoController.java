package com.ecomarket.controller;

import com.ecomarket.dto.PagoDTO;
import com.ecomarket.service.PagoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(
    name = "Pagos",
    description = "Endpoints para el registro y consulta de pagos asociados a pedidos"
)
public class PagoController {

    private final PagoService pagoService;

    @Operation(
        summary = "Registrar pago",
        description = "Permite registrar un pago asociado a un pedido"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Pago registrado correctamente")
    })
    @PostMapping
    public PagoDTO crear(@RequestBody PagoDTO dto) {
        return pagoService.crear(dto);
    }

    @Operation(
        summary = "Obtener pago por ID",
        description = "Devuelve la información de un pago específico según su identificador"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Pago obtenido correctamente"),
        @ApiResponse(responseCode = "404", description = "Pago no encontrado")
    })
    @GetMapping("/{id}")
    public PagoDTO obtener(@PathVariable Long id) {
        return pagoService.obtener(id);
    }

    @Operation(
        summary = "Listar pagos (ADMIN)",
        description = "Permite a un usuario con rol ADMIN obtener el listado de todos los pagos del sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Listado de pagos obtenido correctamente"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado. Requiere rol ADMIN")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<PagoDTO> listar() {
        return pagoService.listar();
    }
}
