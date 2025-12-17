package com.ecomarket.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Version
  private Long version;

  @NotBlank(message = "El nombre del producto es obligatorio")
  private String nombre;

  @Positive(message = "El precio debe ser mayor que cero")
  private double precio;

  @Min(value = 0, message = "El stock no puede ser negativo")
  private int stock;

  @Column(length = 500)
  private String imagenUrl; // ✅ NUEVO

  @ManyToOne(optional = false)
  @JoinColumn(name = "categoria_id")
  private Categoria categoria;
}
