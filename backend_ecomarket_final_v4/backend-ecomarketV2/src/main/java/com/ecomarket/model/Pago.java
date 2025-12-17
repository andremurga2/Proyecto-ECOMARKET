package com.ecomarket.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    private double monto;

    private String metodo; // Ej: "TARJETA", "TRANSFERENCIA"

    private String estado; // Ej: "COMPLETADO"
}
