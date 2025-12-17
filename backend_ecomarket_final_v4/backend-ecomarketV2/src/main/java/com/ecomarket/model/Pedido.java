package com.ecomarket.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    /**
     * Detalle de líneas del pedido (producto + cantidad + precio histórico).
     * Cascade + orphanRemoval permite guardar/eliminar líneas junto al pedido.
     */
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PedidoDetalle> detalles = new ArrayList<>();

    private double total;

    /**
     * Estados sugeridos:
     * CREADO (pendiente de pago), PAGADO, ENVIADO, COMPLETADO, CANCELADO
     */
    private String estado;
}
