package com.ecomarket.dto;

import lombok.Data;

@Data
public class PagoDTO {

    private Long id;
    private Long pedidoId;
    private double monto;
    private String metodo;
    private String estado;

    // ✅ Datos del cliente (solo útil para ADMIN al listar pagos)
    private Long clienteId;
    private String clienteNombre;
    private String clienteEmail;
}
