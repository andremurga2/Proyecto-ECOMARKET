package com.ecomarket.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Entity
@Table(name = "pedido_detalle")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedidoDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Pedido pedido;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private int cantidad;

    @Positive(message = "El precio unitario debe ser mayor que 0")
    private double precioUnitario;

    @Positive(message = "El subtotal debe ser mayor que 0")
    private double subtotal;
}
