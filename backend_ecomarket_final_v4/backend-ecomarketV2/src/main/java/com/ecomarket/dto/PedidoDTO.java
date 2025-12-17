package com.ecomarket.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PedidoDTO {

    private Long id;

    private Long usuarioId;

    /**
     * Compatibilidad hacia atrás: si el frontend aún envía solo IDs,
     * se asumirá cantidad = 1 por producto.
     */
    private List<Long> productos = new ArrayList<>();

    /**
     * Forma recomendada (producto + cantidad).
     */
    private List<PedidoItemDTO> items = new ArrayList<>();

    private double total;

    private String estado;

    // ✅ Para vista ADMIN (y útil también para reportes)
    private String clienteNombre;
    private String clienteEmail;
}
